/**
 * routes/records.js
 * GET    /api/records            — list (search, filter, paginate)
 * GET    /api/records/:id        — single credential
 * POST   /api/records/:id/revoke — revoke (reason + MetaMask sig + on-chain)
 * GET    /api/records/:id/vc     — W3C VC export
 * GET    /api/records/:id/qr     — QR code for verification
 */

import express from 'express';
const router = express.Router();
import store, { persist } from '../data/store.js';
import { revokeOnChain } from '../utils/blockchain.js';
import { buildVerifiableCredential } from '../utils/vc.js';
import { generateQRCode } from '../utils/qr.js';

// List All Records
router.get('/', (req, res) => {
    const { search, status, page = 1, limit = 20 } = req.query;
    let results = [...store.credentials];

    if (search) {
        const s = search.toLowerCase();
        results = results.filter(c =>
            c.payload.studentName.toLowerCase().includes(s) ||
            c.payload.rollNo.toLowerCase().includes(s) ||
            c.payload.degree.toLowerCase().includes(s)
        );
    }
    if (status === 'revoked') results = results.filter(c => c.revoked);
    else if (status === 'issued') results = results.filter(c => !c.revoked && c.status === 'issued');
    else if (status === 'pending') results = results.filter(c => c.status === 'pending');

    const total = results.length;
    const p = parseInt(page), l = parseInt(limit);
    const paginated = results.slice((p - 1) * l, p * l);
    res.json({ total, page: p, limit: l, results: paginated });
});

// Single Record
router.get('/:id', (req, res) => {
    const cred = store.credentials.find(c => c.id === req.params.id);
    if (!cred) return res.status(404).json({ error: 'Credential not found' });
    res.json(cred);
});

// Revoke Credential
// Body: { reason, effectiveDate, signature } — signature comes from MetaMask on the frontend
router.post('/:id/revoke', async (req, res) => {
    try {
        const { reason, effectiveDate, signature } = req.body;
        const cred = store.credentials.find(c => c.id === req.params.id);
        if (!cred) return res.status(404).json({ error: 'Credential not found' });
        if (cred.revoked) return res.status(400).json({ error: 'Already revoked' });
        if (!reason) return res.status(400).json({ error: 'Revocation reason is required' });

        // Anchor revocation on-chain
        const chainResult = await revokeOnChain(cred.payloadHash, reason);

        cred.revoked = true;
        cred.status = 'revoked';
        cred.revokedReason = reason;
        cred.revokedAt = effectiveDate || new Date().toISOString();
        cred.revocationTxHash = chainResult.txHash;
        cred.revocationSignature = signature;
        cred.payload.revocationFlag = true;
        persist();

        res.json({ success: true, credentialId: cred.id, revocationTxHash: chainResult.txHash, revokedAt: cred.revokedAt });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// W3C VC Export
router.get('/:id/vc', (req, res) => {
    const cred = store.credentials.find(c => c.id === req.params.id);
    if (!cred) return res.status(404).json({ error: 'Credential not found' });
    res.json(buildVerifiableCredential(cred));
});

// QR Code
router.get('/:id/qr', async (req, res) => {
    try {
        const cred = store.credentials.find(c => c.id === req.params.id);
        if (!cred) return res.status(404).json({ error: 'Credential not found' });
        const { url, qrDataUrl } = await generateQRCode(cred.payloadHash);
        res.json({ credentialId: cred.id, verificationUrl: url, qrDataUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
