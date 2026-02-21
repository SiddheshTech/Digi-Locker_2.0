import express from 'express';
import store, { persist } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from '../utils/crypto.js';
import { generateQRFromText } from '../utils/qr.js';

const router = express.Router();

/**
 * student.js — Digi-Locker Student Roles & Features Backend
 * 
 * Features:
 * - Student Dashboard (Stats & Recent Activity)
 * - Credentials Management (List, View, Share)
 * - Selective Disclosure Logic (ZK-lite mock)
 * - Consent Log (History of access)
 * - SkillChain Profile (Micro-credentials & Badges)
 * - Share Analytics (Tracking clicks & verifiers)
 */

// Helper to get student credentials from store
const getStudentCredentials = (address) => {
    if (!address) return [];
    return store.credentials.filter(c =>
        c.studentWallet?.toLowerCase() === address.toLowerCase() ||
        (c.metadata && c.metadata.studentWallet?.toLowerCase() === address.toLowerCase())
    );
};

// ── Dashboard ────────────────────────────────────────────────────────────────
// GET /api/student/dashboard?address=0x...
router.get('/dashboard', (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const credentials = getStudentCredentials(address);
    const shares = store.shares.filter(s => s.studentAddress.toLowerCase() === address.toLowerCase());
    const requests = store.requests.filter(r => r.studentAddress?.toLowerCase() === address.toLowerCase());

    res.json({
        stats: {
            totalCredentials: credentials.length,
            activeShares: shares.filter(s => !s.expiresAt || new Date(s.expiresAt) > new Date()).length,
            pendingRequests: requests.filter(r => r.status === 'pending').length
        },
        recentActivity: [
            ...shares.map(s => ({ type: 'share', date: s.createdAt, title: `Shared "${s.credentialTitle}"` })),
            ...requests.map(r => ({ type: 'request', date: r.createdAt, title: `Requested ${r.type}` }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
    });
});

// ── Credentials Management ───────────────────────────────────────────────────
// GET /api/student/credentials?address=0x...
router.get('/credentials', (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const credentials = getStudentCredentials(address);
    res.json(credentials);
});

// POST /api/student/credentials/:id/revoke-request
router.post('/credentials/:id/revoke-request', (req, res) => {
    const { id } = req.params;
    const { address, reason } = req.body;

    const cred = store.credentials.find(c => c.id === id);
    if (!cred) return res.status(404).json({ error: 'Credential not found' });

    const request = {
        id: uuidv4(),
        credentialId: id,
        studentAddress: address,
        type: 'revocation',
        reason: reason || 'No reason provided',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    store.requests.push(request);
    persist();

    res.json({ message: 'Revocation request submitted to issuer', requestId: request.id });
});

// ── Share Modal / Selective Disclosure ──────────────────────────────────────
// POST /api/student/share
router.post('/share', async (req, res) => {
    const { credentialId, address, expiresAt, verifiers, selectiveFields, oneClickVerify } = req.body;

    if (!credentialId || !address) return res.status(400).json({ error: 'CredentialId and address required' });

    const cred = store.credentials.find(c => c.id === credentialId);
    if (!cred) return res.status(404).json({ error: 'Credential not found' });

    const shareId = uuidv4();
    const shareLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/v/${shareId}`;
    const qrDataUrl = await generateQRFromText(shareLink);

    const share = {
        id: shareId,
        credentialId,
        credentialTitle: cred.metadata?.title || cred.metadata?.name || 'Credential',
        studentAddress: address,
        expiresAt: expiresAt || null,
        verifiers: verifiers || [], // Targeted verifiers (emails or ids)
        selectiveFields: selectiveFields || [], // Specific fields to share
        oneClickVerify: !!oneClickVerify,
        createdAt: new Date().toISOString(),
        analytics: {
            clicks: 0,
            logs: []
        }
    };

    store.shares.push(share);
    persist();

    res.json({
        shareId,
        shareLink,
        qrCode: qrDataUrl,
        message: 'Share link created successfully'
    });
});

// ── Consent Log ──────────────────────────────────────────────────────────────
// GET /api/student/consents?address=0x...
router.get('/consents', (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const logs = store.consents.filter(c => c.studentAddress.toLowerCase() === address.toLowerCase())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(logs);
});

// ── SkillChain Profile (Extreme Feature: Micro-credentials & Badges) ─────────
// GET /api/student/profile?address=0x...
router.get('/profile', (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });

    let profile = store.students.find(s => s.address.toLowerCase() === address.toLowerCase());

    if (!profile) {
        profile = {
            address: address.toLowerCase(),
            name: 'Student',
            bio: 'Professional SkillChain Profile',
            skills: ['Blockchain', 'Security'],
            badges: [],
            microCredentials: [],
            experience: [],
            updatedAt: new Date().toISOString()
        };
        store.students.push(profile);
        persist();
    }

    res.json(profile);
});

// POST /api/student/profile/update
router.post('/profile/update', (req, res) => {
    const { address, profileData } = req.body;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const index = store.students.findIndex(s => s.address.toLowerCase() === address.toLowerCase());

    if (index === -1) {
        store.students.push({
            address: address.toLowerCase(),
            ...profileData,
            updatedAt: new Date().toISOString()
        });
    } else {
        store.students[index] = {
            ...store.students[index],
            ...profileData,
            updatedAt: new Date().toISOString()
        };
    }
    persist();
    res.json({ message: 'SkillChain Profile updated successfully' });
});

// ── Share Analytics ──────────────────────────────────────────────────────────
// GET /api/student/shares/analytics?address=0x...
router.get('/shares/analytics', (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const shares = store.shares.filter(s => s.studentAddress.toLowerCase() === address.toLowerCase());

    const summary = shares.map(s => ({
        id: s.id,
        title: s.credentialTitle,
        clicks: s.analytics.clicks,
        lastAccessed: s.analytics.logs.length > 0 ? s.analytics.logs[0].timestamp : null,
        logs: s.analytics.logs.slice(0, 5), // Recent 5 logs
        selectiveFields: s.selectiveFields,
        status: (!s.expiresAt || new Date(s.expiresAt) > new Date()) ? 'active' : 'expired'
    })).sort((a, b) => (b.lastAccessed || 0) > (a.lastAccessed || 0) ? 1 : -1);

    res.json(summary);
});

// ── Selective Disclosure Logic (Public Verifier Endpoint) ───────────────────
// This route is called by employers/verifiers when they click a share link
router.get('/public/share/:shareId', (req, res) => {
    const { shareId } = req.params;
    const share = store.shares.find(s => s.id === shareId);

    if (!share) return res.status(404).json({ error: 'Share link not found' });

    // 1. Check expiry
    if (share.expiresAt && new Date() > new Date(share.expiresAt)) {
        return res.status(410).json({ error: 'This share link has expired' });
    }

    const cred = store.credentials.find(c => c.id === share.credentialId);
    if (!cred) return res.status(404).json({ error: 'Underlying credential has been revoked or deleted' });

    // 2. Selective Disclosure Logic
    const disclosedData = {};
    if (share.selectiveFields && share.selectiveFields.length > 0) {
        share.selectiveFields.forEach(field => {
            if (cred.metadata && cred.metadata[field] !== undefined) {
                disclosedData[field] = cred.metadata[field];
            }
        });
    } else {
        // Share all fields if none selected
        Object.assign(disclosedData, cred.metadata);
    }

    // 3. Analytics Tracking
    const accessLog = {
        timestamp: new Date().toISOString(),
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'],
        location: 'Mock Geo (US)' // In real app, resolve via geoip-lite
    };
    share.analytics.clicks++;
    share.analytics.logs.unshift(accessLog);

    // 4. Update Consent Log
    store.consents.push({
        id: uuidv4(),
        studentAddress: share.studentAddress,
        credentialId: share.credentialId,
        credentialTitle: share.credentialTitle,
        accessedBy: 'Verifier/Employer',
        timestamp: accessLog.timestamp,
        fieldsDisclosed: Object.keys(disclosedData),
        ip: accessLog.ip
    });

    persist();

    res.json({
        title: share.credentialTitle,
        issuerId: cred.issuerId,
        issuedDate: cred.createdAt,
        status: cred.status,
        disclosedData,
        oneClickVerify: share.oneClickVerify,
        proof: {
            hash: cred.payloadHash,
            merkleRoot: cred.merkleRoot,
            blockchainTx: cred.blockchainTx || '0x0...mocktx',
            algorithm: 'SHA-256',
            verified: true
        }
    });
});

export default router;
