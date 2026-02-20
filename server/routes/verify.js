/**
 * routes/verify.js
 * GET  /api/verify/:payloadHash — verify by hash (tamper detection)
 * POST /api/verify/file         — verify by uploaded document file
 * POST /api/verify/vc           — verify a W3C VC JSON
 */

import express from 'express';
const router = express.Router();
import multer from 'multer';
import store from '../data/store.js';
import { sha256 } from '../utils/crypto.js';
import { verifyTransaction } from '../utils/blockchain.js';
import { verifyVCStructure } from '../utils/vc.js';

const upload = multer({ storage: multer.memoryStorage() });

// Verify by Payload Hash — tamper detection
router.get('/:payloadHash', async (req, res) => {
    const { payloadHash } = req.params;
    const cred = store.credentials.find(c => c.payloadHash === payloadHash);

    if (!cred) {
        return res.status(404).json({
            verified: false, authentic: false, tampered: true,
            message: 'No credential found with this hash. Document may be tampered or never issued here.'
        });
    }

    cred.lastVerified = new Date().toISOString();
    const txCheck = await verifyTransaction(cred.txHash);

    res.json({
        verified: true,
        authentic: !cred.revoked,
        tampered: false,
        credentialId: cred.id,
        payloadHash: cred.payloadHash,
        studentName: cred.payload.studentName,
        rollNo: cred.payload.rollNo,
        degree: cred.payload.degree,
        year: cred.payload.year,
        issuerId: cred.payload.issuerId,
        issuedAt: cred.issuedAt,
        revoked: cred.revoked,
        revokedReason: cred.revokedReason || null,
        revokedAt: cred.revokedAt || null,
        txHash: cred.txHash,
        blockchainVerification: txCheck
    });
});

// Verify by File Upload — computes SHA-256 of uploaded file and checks registry
router.post('/file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const uploadedHash = sha256(req.file.buffer);
        const cred = store.credentials.find(c => c.payload.fileHash === uploadedHash);

        if (!cred) {
            return res.json({
                verified: false, authentic: false, tampered: true,
                uploadedFileHash: uploadedHash,
                message: 'No credential matches this document. The file may be tampered or was never issued.'
            });
        }
        cred.lastVerified = new Date().toISOString();
        res.json({
            verified: true, authentic: !cred.revoked, tampered: false,
            uploadedFileHash: uploadedHash,
            credentialId: cred.id, payloadHash: cred.payloadHash,
            studentName: cred.payload.studentName, degree: cred.payload.degree,
            issuedAt: cred.issuedAt, revoked: cred.revoked, txHash: cred.txHash
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify a W3C VC JSON
router.post('/vc', async (req, res) => {
    try {
        const vc = req.body;
        const structureCheck = verifyVCStructure(vc);
        if (!structureCheck.valid) return res.status(400).json({ valid: false, errors: structureCheck.errors });

        const payloadHash = vc?.proof?.payloadHash;
        const cred = payloadHash ? store.credentials.find(c => c.payloadHash === payloadHash) : null;

        if (!cred) {
            return res.json({ valid: true, registered: false, message: 'VC structure is valid but not found in our registry.' });
        }
        res.json({ valid: true, registered: true, authentic: !cred.revoked, credentialId: cred.id, payloadHash, issuedAt: cred.issuedAt, revoked: cred.revoked, txHash: cred.txHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
