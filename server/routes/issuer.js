/**
 * routes/issuer.js
 * GET  /api/issue/stats      — dashboard metrics
 * POST /api/issue/prepare    — canonicalize + SHA-256 hash (Step 1)
 * POST /api/issue/finalize   — sign + anchor on-chain (Step 2) — accepts MetaMask signature
 * POST /api/issue/batch      — CSV → Merkle Root batch issuance
 * GET  /api/issue/batch/:id  — get batch job result
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream');
const { v4: uuidv4 } = require('uuid');

const store = require('../data/store');
const { buildCredentialPayload, buildMerkleTree, getMerkleProof } = require('../utils/crypto');
const { signPayloadHash, issueOnChain } = require('../utils/blockchain');
const { buildVerifiableCredential } = require('../utils/vc');
const { generateQRCode } = require('../utils/qr');
const { detectAnomalies, saveAlerts } = require('../utils/fraud');

const upload = multer({ storage: multer.memoryStorage() });

// ── Dashboard Stats ──────────────────────────────────────────────────────────
router.get('/stats', (req, res) => {
    const total = store.credentials.length;
    const revoked = store.credentials.filter(c => c.revoked).length;
    const pending = store.credentials.filter(c => c.status === 'pending').length;
    const issued = store.credentials.filter(c => c.status === 'issued').length;
    const recentVerifications = store.credentials
        .filter(c => c.lastVerified)
        .sort((a, b) => new Date(b.lastVerified) - new Date(a.lastVerified))
        .slice(0, 5)
        .map(c => ({ id: c.id, studentName: c.payload.studentName, lastVerified: c.lastVerified }));

    res.json({ totalIssued: total, issued, pending, revoked, alertCount: store.alerts.filter(a => !a.resolved).length, recentVerifications });
});

// ── Step 1: Prepare Issuance ─────────────────────────────────────────────────
// Client hashes file via MetaMask/browser. Sends: { studentName, rollNo, degree, year, serialNo, fileHash }
// Server builds canonical payload + SHA-256 hash for MetaMask to sign
router.post('/prepare', async (req, res) => {
    try {
        const { studentName, rollNo, degree, year, serialNo, fileHash } = req.body;
        if (!studentName || !rollNo || !degree || !year || !fileHash) {
            return res.status(400).json({ error: 'Missing fields: studentName, rollNo, degree, year, fileHash' });
        }
        const issuerId = req.headers['x-issuer-address'] || '0xMOCK_ISSUER';
        const { payload, canonical, payloadHash } = buildCredentialPayload({ studentName, rollNo, degree, year, serialNo }, fileHash, issuerId);
        const anomalies = detectAnomalies(payload, issuerId);

        res.json({
            payload,
            canonical,
            payloadHash,
            onChainPreview: {
                issuerId, hash: payloadHash, timestamp: payload.timestamp, revocationFlag: false,
                note: 'No PII on-chain. Only: issuerId, hash, timestamp, revocationFlag.'
            },
            anomalyWarnings: anomalies
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Step 2: Finalize Issuance ────────────────────────────────────────────────
// Client sends: { payload, payloadHash, signature (from MetaMask), asVC? }
router.post('/finalize', async (req, res) => {
    try {
        const { payload, payloadHash, signature, asVC } = req.body;
        if (!payload || !payloadHash || !signature) {
            return res.status(400).json({ error: 'Missing payload, payloadHash, or signature' });
        }

        // Anchor on-chain (mock or real via ethers.js)
        const chainResult = await issueOnChain(payloadHash, payload.issuerId);
        // Server also signs (double-proof of issuance)
        const serverSignature = await signPayloadHash(payloadHash);

        const id = uuidv4();
        const { qrDataUrl, url: verificationUrl } = await generateQRCode(payloadHash);

        const record = {
            id, payload, payloadHash,
            signature,       // MetaMask wallet signature
            serverSignature, // Server wallet signature
            txHash: chainResult.txHash,
            blockNumber: chainResult.blockNumber,
            chainMock: chainResult.mock,
            status: 'issued', revoked: false,
            revokedReason: null, revokedAt: null,
            issuedAt: new Date().toISOString(),
            lastVerified: null, verificationUrl, qrDataUrl
        };

        const anomalies = detectAnomalies(payload, payload.issuerId);
        if (anomalies.length) saveAlerts(anomalies, payloadHash, payload.issuerId);
        store.credentials.push(record);

        const vc = asVC ? buildVerifiableCredential(record) : undefined;

        res.status(201).json({
            success: true, credentialId: id, payloadHash,
            txHash: chainResult.txHash, verificationUrl, qrDataUrl,
            vc
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Batch Issuance: CSV → Merkle Root ───────────────────────────────────────
// POST /api/issue/batch  multipart: file=students.csv
// CSV columns: studentName, rollNo, degree, year, serialNo, fileHash
router.post('/batch', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No CSV file uploaded' });
        const issuerId = req.headers['x-issuer-address'] || '0xMOCK_ISSUER';
        const rows = [];

        await new Promise((resolve, reject) => {
            Readable.from(req.file.buffer.toString())
                .pipe(csv())
                .on('data', row => rows.push(row))
                .on('end', resolve)
                .on('error', reject);
        });

        if (!rows.length) return res.status(400).json({ error: 'CSV is empty' });

        const leaves = rows.map(row => buildCredentialPayload(
            { studentName: row.studentName, rollNo: row.rollNo, degree: row.degree, year: row.year, serialNo: row.serialNo || '' },
            row.fileHash || 'no-file', issuerId
        ));

        const { tree, root } = buildMerkleTree(leaves.map(l => l.canonical));

        const studentsWithProofs = leaves.map((leaf, i) => ({
            index: i,
            studentName: leaf.payload.studentName,
            rollNo: leaf.payload.rollNo,
            payloadHash: leaf.payloadHash,
            merkleProof: getMerkleProof(tree, leaf.canonical)
        }));

        const chainResult = await issueOnChain(root, issuerId);
        const batchId = uuidv4();
        store.batchJobs.push({ id: batchId, merkleRoot: root, txHash: chainResult.txHash, studentCount: rows.length, students: studentsWithProofs, issuedAt: new Date().toISOString(), issuerId });

        res.status(201).json({ success: true, batchId, merkleRoot: root, txHash: chainResult.txHash, studentCount: rows.length, students: studentsWithProofs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Get Batch Job ─────────────────────────────────────────────────────────────
router.get('/batch/:batchId', (req, res) => {
    const job = store.batchJobs.find(j => j.id === req.params.batchId);
    if (!job) return res.status(404).json({ error: 'Batch job not found' });
    res.json(job);
});

module.exports = router;
