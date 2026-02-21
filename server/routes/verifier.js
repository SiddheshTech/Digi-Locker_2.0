/**
 * routes/verifier.js
 * Employer / Verifier (third-party verification) APIs
 *
 * - Verify Page: upload PDF, paste link, scan QR → hash → on-chain query → response card
 * - Saved Verifications: audit trail, export CSV
 * - Batch Verify: CSV upload → annotated CSV
 * - API Key Manager: issue keys for programmatic access
 * - Receipt Generator: signed PDF receipt
 * - Offline QR Verify: verify from QR payload (issuer pubkey + IPFS hash)
 * - Employer Integration Snippets: SDK code blocks
 */

import express from 'express';
const router = express.Router();
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import store, { persist } from '../data/store.js';
import { sha256 } from '../utils/crypto.js';
import { verifyTransaction, queryCredentialOnChain } from '../utils/blockchain.js';
import { generateApiKey, hashApiKey } from '../utils/apiKeyAuth.js';
import { generateReceiptPDF } from '../utils/receiptGenerator.js';

const upload = multer({ storage: multer.memoryStorage() });
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

// ── Unified Verify (public) ───────────────────────────────────────────────────
// POST /api/verifier/verify
// Body: { hash?, file?, link?, qrPayload? } — one of these
// Returns: response card { status: Verified|Tampered|Revoked, issuer, issuedDate, txHash, copyReceiptUrl, ... }

router.post('/verify', upload.single('file'), async (req, res) => {
    try {
        let payloadHash = null;
        let source = 'hash';

        if (req.body?.hash) {
            payloadHash = String(req.body.hash).replace(/^0x/, '').replace(/\s/g, '');
            source = 'hash';
        } else if (req.file) {
            payloadHash = sha256(req.file.buffer);
            source = 'file';
        } else if (req.body?.link) {
            const link = String(req.body.link).trim();
            const response = await fetch(link, { redirect: 'follow' });
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            const buffer = Buffer.from(await response.arrayBuffer());
            payloadHash = sha256(buffer);
            source = 'link';
        } else if (req.body?.qrPayload) {
            const qr = typeof req.body.qrPayload === 'string' ? JSON.parse(req.body.qrPayload) : req.body.qrPayload;
            payloadHash = qr.payloadHash || qr.hash || qr.ipfsHash; // QR may contain hash or IPFS ref
            if (!payloadHash) throw new Error('QR payload must contain payloadHash, hash, or ipfsHash');
            source = 'qr';
        } else {
            return res.status(400).json({
                error: 'Provide one of: hash, file (multipart), link, or qrPayload'
            });
        }

        const cred = store.credentials.find(c => {
            const h = '0x' + payloadHash.replace(/^0x/, '');
            return c.payloadHash === h || c.payload?.fileHash === payloadHash || c.payload?.fileHash === h;
        });

        let onChain = null;
        if (process.env.CONTRACT_ADDRESS && process.env.RPC_URL) {
            onChain = await queryCredentialOnChain(payloadHash);
        }
        const txCheck = cred?.txHash ? await verifyTransaction(cred.txHash) : null;

        let status, authentic, tampered, revoked;
        let issuerId = 'unknown', issuedAt = null, txHash = null;

        if (cred) {
            issuerId = cred.payload?.issuerId || cred.issuerId || 'unknown';
            issuedAt = cred.issuedAt;
            txHash = cred.txHash;
            revoked = cred.revoked;
            tampered = false;
            authentic = !cred.revoked;
            status = cred.revoked ? 'Revoked' : 'Verified';
        } else if (onChain?.found) {
            issuerId = onChain.issuerId;
            issuedAt = onChain.issuedAt;
            revoked = onChain.revoked;
            tampered = false;
            authentic = !onChain.revoked;
            status = onChain.revoked ? 'Revoked' : 'Verified';
            txHash = null;
        } else {
            status = 'Tampered';
            tampered = true;
            authentic = false;
            revoked = false;
        }

        const verificationId = uuidv4();
        const savedRecord = {
            id: verificationId,
            payloadHash,
            source,
            status,
            verified: status === 'Verified',
            tampered,
            revoked,
            authentic,
            issuerId,
            issuedAt,
            txHash,
            verifiedAt: new Date().toISOString(),
            onChain,
            credentialId: cred?.id
        };
        store.verifierSavedVerifications.push(savedRecord);
        persist();

        const verifiedMessage = status === 'Verified'
            ? `This file matches an on-chain record anchored by ${issuerId}. Tx: ${txHash || 'N/A'}`
            : status === 'Revoked'
                ? 'This credential has been revoked.'
                : 'No matching credential found. Document may be tampered or never issued.';

        res.json({
            status,
            verified: status === 'Verified',
            tampered,
            revoked,
            authentic,
            payloadHash,
            issuerId,
            issuedAt,
            txHash,
            credentialId: cred?.id,
            verificationId,
            message: verifiedMessage,
            copyReceiptUrl: `${BASE_URL}/api/verifier/receipt/${verificationId}`,
            blockchainVerification: txCheck || onChain
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/verifier/verify/:hash — verify by hash (public, for links/QR)
router.get('/verify/:hash', async (req, res) => {
    const rawHash = String(req.params.hash).trim();
    const payloadHash = '0x' + rawHash.replace(/^0x/, '');

    const cred = store.credentials.find(c =>
        c.payloadHash === payloadHash ||
        c.payload?.fileHash === rawHash ||
        c.payload?.fileHash === payloadHash
    );
    let onChain = null;
    if (process.env.CONTRACT_ADDRESS && process.env.RPC_URL) {
        onChain = await queryCredentialOnChain(payloadHash);
    }

    let status, issuerId, issuedAt, txHash, revoked;
    if (cred) {
        status = cred.revoked ? 'Revoked' : 'Verified';
        issuerId = cred.payload?.issuerId || 'unknown';
        issuedAt = cred.issuedAt;
        txHash = cred.txHash;
        revoked = cred.revoked;
    } else if (onChain?.found) {
        status = onChain.revoked ? 'Revoked' : 'Verified';
        issuerId = onChain.issuerId;
        issuedAt = onChain.issuedAt;
        txHash = null;
        revoked = onChain.revoked;
    } else {
        status = 'Tampered';
        issuerId = null;
        issuedAt = null;
        txHash = null;
        revoked = false;
    }

    const verificationId = uuidv4();
    store.verifierSavedVerifications.push({
        id: verificationId,
        payloadHash,
        source: 'hash',
        status,
        verified: status === 'Verified',
        tampered: status === 'Tampered',
        revoked,
        authentic: status === 'Verified',
        issuerId,
        issuedAt,
        txHash,
        verifiedAt: new Date().toISOString(),
        credentialId: cred?.id
    });
    persist();

    res.json({
        status,
        verified: status === 'Verified',
        tampered: status === 'Tampered',
        revoked,
        payloadHash,
        issuerId,
        issuedAt,
        txHash,
        verificationId,
        message: status === 'Verified'
            ? `This file matches an on-chain record anchored by ${issuerId}. Tx: ${txHash || 'N/A'}`
            : status === 'Tampered'
                ? 'No matching credential found.'
                : 'This credential has been revoked.',
        copyReceiptUrl: `${BASE_URL}/api/verifier/receipt/${verificationId}`
    });
});

// ── Offline QR Verify ────────────────────────────────────────────────────────
// POST /api/verifier/qr-offline
// Body: { issuerPubKey, ipfsHash, payloadHash?, signedMetadata? }
// QR payload typically contains issuer pubkey + IPFS hash; backend verifies hash on-chain

router.post('/qr-offline', async (req, res) => {
    try {
        const { issuerPubKey, ipfsHash, payloadHash: qrPayloadHash, signedMetadata } = req.body;
        const payloadHash = qrPayloadHash || ipfsHash;
        if (!payloadHash) return res.status(400).json({ error: 'QR payload must include payloadHash or ipfsHash' });

        const cred = store.credentials.find(c =>
            c.payloadHash === payloadHash || c.payload?.fileHash === payloadHash
        );
        const onChain = process.env.CONTRACT_ADDRESS && process.env.RPC_URL
            ? await queryCredentialOnChain(payloadHash)
            : null;

        const found = !!cred || (onChain && onChain.found);
        const revoked = cred?.revoked ?? onChain?.revoked ?? false;

        res.json({
            offlineVerifiable: true,
            fullOnlineVerificationRequired: !found,
            payloadHash,
            issuerPubKey: issuerPubKey || null,
            found,
            revoked,
            status: !found ? 'ONLINE_REQUIRED' : revoked ? 'REVOKED' : 'VERIFIED',
            message: !found
                ? 'Hash not in registry. Full online verification recommended.'
                : revoked
                    ? 'Credential revoked.'
                    : 'Verified from on-chain registry.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Saved Verifications ──────────────────────────────────────────────────────
// GET /api/verifier/saved/export — export CSV (must be before /saved)
router.get('/saved/export', async (req, res) => {
    const list = store.verifierSavedVerifications.slice().reverse();
    const rows = [
        ['id', 'payloadHash', 'source', 'status', 'issuerId', 'issuedAt', 'txHash', 'verifiedAt'],
        ...list.map(v => [v.id, v.payloadHash, v.source, v.status, v.issuerId || '', v.issuedAt || '', v.txHash || '', v.verifiedAt])
    ];
    const csv = stringify(rows);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="verifications.csv"');
    res.send(csv);
});

// GET /api/verifier/saved — audit trail
router.get('/saved', async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 100, 500);
    const list = store.verifierSavedVerifications.slice(-limit).reverse();
    res.json({ verifications: list, total: store.verifierSavedVerifications.length });
});

// ── Batch Verify ─────────────────────────────────────────────────────────────
// POST /api/verifier/batch — CSV upload with column "hash" or "payloadHash"
router.post('/batch', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'CSV file required' });
        const csvText = req.file.buffer.toString('utf8');
        const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

        const hashCol = rows[0] && (rows[0].hash !== undefined ? 'hash' : rows[0].payloadHash !== undefined ? 'payloadHash' : Object.keys(rows[0])[0]);
        const results = [];
        for (const row of rows) {
            const h = (row.hash || row.payloadHash || row[hashCol] || '').toString().replace(/^0x/, '').trim();
            if (!h) {
                results.push({ ...row, _status: 'INVALID', _message: 'No hash' });
                continue;
            }
            const cred = store.credentials.find(c => c.payloadHash === h || c.payload?.fileHash === h);
            const onChain = process.env.CONTRACT_ADDRESS && process.env.RPC_URL ? await queryCredentialOnChain(h) : null;
            let status = 'Tampered';
            if (cred) status = cred.revoked ? 'Revoked' : 'Verified';
            else if (onChain?.found) status = onChain.revoked ? 'Revoked' : 'Verified';
            results.push({
                ...row,
                _status: status,
                _issuerId: cred?.payload?.issuerId || onChain?.issuerId || '',
                _txHash: cred?.txHash || ''
            });
        }

        const outRows = results.map(r => {
            const { _status, _issuerId, _txHash, ...rest } = r;
            return { ...rest, status: _status, issuerId: _issuerId, txHash: _txHash };
        });
        const outCsv = stringify(outRows, { header: true });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="batch-verify-result.csv"');
        res.send(outCsv);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── API Key Manager ──────────────────────────────────────────────────────────
// GET /api/verifier/apikeys — list keys (requires wallet auth in prod; demo: returns list)
// POST /api/verifier/apikeys — create new key
// DELETE /api/verifier/apikeys/:id — revoke key

router.get('/apikeys', (req, res) => {
    const list = store.verifierApiKeys.map(k => ({
        id: k.id,
        name: k.name,
        prefix: k.keyPrefix,
        createdAt: k.createdAt,
        revoked: k.revoked,
        lastUsed: k.lastUsed
    }));
    res.json({ apiKeys: list });
});

router.post('/apikeys', (req, res) => {
    const { name } = req.body || {};
    const rawKey = generateApiKey();
    const keyHash = hashApiKey(rawKey);
    const keyPrefix = rawKey.substring(0, 12) + '...';
    const key = {
        id: uuidv4(),
        name: name || 'Default',
        keyHash,
        keyPrefix,
        createdAt: new Date().toISOString(),
        revoked: false,
        lastUsed: null
    };
    store.verifierApiKeys.push(key);
    res.status(201).json({
        success: true,
        apiKey: rawKey,
        prefix: keyPrefix,
        id: key.id,
        example: `curl -H "Authorization: Bearer ${rawKey}" "${BASE_URL}/api/verifier/verify/YOUR_HASH"`,
        note: 'Store this key securely. It will not be shown again.'
    });
});

router.delete('/apikeys/:id', (req, res) => {
    const k = store.verifierApiKeys.find(x => x.id === req.params.id);
    if (!k) return res.status(404).json({ error: 'API key not found' });
    k.revoked = true;
    k.revokedAt = new Date().toISOString();
    res.json({ success: true, message: 'API key revoked' });
});

// ── Receipt Generator ────────────────────────────────────────────────────────
// GET /api/verifier/receipt/:id — download signed PDF receipt
router.get('/receipt/:id', async (req, res) => {
    const v = store.verifierSavedVerifications.find(x => x.id === req.params.id);
    if (!v) return res.status(404).json({ error: 'Verification not found' });

    const data = {
        ...v,
        payloadHash: v.payloadHash || v.uploadedFileHash
    };
    const pdfBuffer = await generateReceiptPDF(data);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="verification-receipt-${v.id}.pdf"`);
    res.send(pdfBuffer);
});

// ── Employer Integration Snippets ────────────────────────────────────────────
// GET /api/verifier/snippets — SDK code blocks (Node, Java, Python) + embed button
router.get('/snippets', (req, res) => {
    const base = BASE_URL;
    res.json({
        verifyEndpoint: `${base}/api/verifier/verify`,
        hashEndpoint: (h) => `${base}/api/verifier/verify/${h}`,
        snippets: {
            node: `// Node.js - verify by hash
const hash = 'YOUR_CREDENTIAL_HASH';
const res = await fetch(\`${base}/api/verifier/verify/\${hash}\`);
const data = await res.json();
console.log(data.status); // Verified | Tampered | Revoked`,

            python: `# Python - verify by hash
import requests
hash_val = "YOUR_CREDENTIAL_HASH"
r = requests.get(f"${base}/api/verifier/verify/{hash_val}")
data = r.json()
print(data["status"])  # Verified | Tampered | Revoked`,

            java: `// Java - verify by hash
String hash = "YOUR_CREDENTIAL_HASH";
HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder()
    .uri(URI.create("${base}/api/verifier/verify/" + hash))
    .GET()
    .build();
HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
// Parse JSON from resp.body()`,

            curl: `curl "${base}/api/verifier/verify/YOUR_HASH"`,

            embedButton: `<a href="${base}/verify" target="_blank" rel="noopener"
  style="display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
  Verify Credential
</a>`
        }
    });
});

export default router;
