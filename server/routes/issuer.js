/**
 * routes/issuer.js
 * GET  /api/issue/stats      — dashboard metrics
 * POST /api/issue/prepare    — canonicalize + SHA-256 hash (Step 1)
 * POST /api/issue/finalize   — sign + anchor on-chain (Step 2) — accepts MetaMask signature
 * POST /api/issue/batch      — CSV → Merkle Root batch issuance
 * GET  /api/issue/batch/:id  — get batch job result
 */

import express from 'express';
const router = express.Router();
import multer from 'multer';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import store, { persist } from '../data/store.js';
import { buildCredentialPayload, buildMerkleTree, getMerkleProof, canonicalizeCredential } from '../utils/crypto.js';
import { signPayloadHash, issueOnChain } from '../utils/blockchain.js';
import { buildVerifiableCredential } from '../utils/vc.js';
import { generateQRCode } from '../utils/qr.js';
import { detectAnomalies, saveAlerts } from '../utils/fraud.js';

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
        const { payload, payloadHash } = buildCredentialPayload({ studentName, rollNo, degree, year, serialNo }, fileHash, issuerId);
        const anomalies = detectAnomalies(payload, issuerId);

        res.json({
            payload,
            payloadHash,
            canonical: JSON.stringify(payload),
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
        persist();

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
router.post('/batch', upload.single('file'), async (req, res) => {
    try {
        console.log('[BATCH] Starting batch issuance...');
        if (!req.file) {
            console.error('[BATCH] Error: No file uploaded');
            return res.status(400).json({ error: 'No CSV file uploaded' });
        }
        const issuerId = req.headers['x-issuer-address'] || '0xMOCK_ISSUER';
        const rows = [];

        await new Promise((resolve, reject) => {
            Readable.from(req.file.buffer.toString())
                .pipe(csv())
                .on('data', row => {
                    // Check if row is empty or object
                    if (row && typeof row === 'object' && Object.keys(row).length) {
                        rows.push(row);
                    }
                })
                .on('end', resolve)
                .on('error', err => {
                    console.error('[BATCH] CSV Parser Error:', err.message);
                    reject(err);
                });
        });

        console.log(`[BATCH] Parsed ${rows.length} rows from CSV.`);
        if (!rows.length) {
            console.error('[BATCH] Error: CSV is empty or invalid header.');
            return res.status(400).json({ error: 'CSV is empty or invalid header. Expected: studentName, rollNo, degree, year, serialNo, fileHash' });
        }

        const leaves = rows.map((row, i) => {
            try {
                return buildCredentialPayload(
                    { studentName: row.studentName, rollNo: row.rollNo || '', degree: row.degree || '', year: row.year || '', serialNo: row.serialNo || '' },
                    row.fileHash || 'no-file', issuerId
                );
            } catch (err) {
                console.error(`[BATCH] Error building payload for row ${i}:`, err.message);
                throw err;
            }
        });

        const leafHashes = leaves.map(l => l.payloadHash);
        const tree = buildMerkleTree(leafHashes);
        const root = tree.getHexRoot();
        console.log(`[BATCH] Merkle Tree built. Root: ${root}`);

        const chainResult = await issueOnChain(root, issuerId);
        const batchId = uuidv4();

        const studentsWithProofs = leaves.map((leaf, i) => {
            const proof = getMerkleProof(tree, leaf.payloadHash);

            // PUSH INDIVIDUAL RECORDS TO STORE so they are searchable by hash
            const record = {
                id: uuidv4(),
                ...leaf,
                txHash: chainResult.txHash,
                batchId,
                status: 'issued',
                revoked: false,
                issuedAt: new Date().toISOString(),
                isBatch: true,
                merkleProof: proof,
                merkleRoot: root
            };
            store.credentials.push(record);

            return {
                index: i,
                studentName: leaf.payload.studentName,
                rollNo: leaf.payload.rollNo,
                payloadHash: leaf.payloadHash,
                merkleProof: proof
            };
        });

        store.batchJobs.push({
            id: batchId,
            merkleRoot: root,
            txHash: chainResult.txHash,
            studentCount: rows.length,
            students: studentsWithProofs,
            issuedAt: new Date().toISOString(),
            issuerId
        });

        console.log(`[BATCH] Successfully completed batch ${batchId}. Persisting...`);
        persist();

        res.status(201).json({ success: true, batchId, merkleRoot: root, txHash: chainResult.txHash, studentCount: rows.length, students: studentsWithProofs });
    } catch (err) {
        console.error('[BATCH] Critical Error:', err.stack);
        res.status(500).json({ error: err.message });
    }
});

// ── Get Batch Job ─────────────────────────────────────────────────────────────
router.get('/batch/:batchId', (req, res) => {
    const job = store.batchJobs.find(j => j.id === req.params.batchId);
    if (!job) return res.status(404).json({ error: 'Batch job not found' });
    res.json(job);
});

export default router;
