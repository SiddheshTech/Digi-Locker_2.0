/**
 * index.js — Digi-Locker Issuer Backend v2.0
 *
 * Technology Stack:
 *   - Node.js + Express
 *   - SHA-256 Cryptographic Hashing (Node crypto module)
 *   - Merkle Tree (merkletreejs + keccak256)
 *   - Blockchain Integration via ethers.js (Sepolia/Hardhat)
 *   - MetaMask signature verification support
 *   - W3C Verifiable Credentials (JSON-LD)
 *   - QR Code generation
 *   - Fraud/Anomaly detection
 *
 * API Routes:
 *   /api/issue/*     — issuer.js   (prepare, finalize, batch, stats)
 *   /api/records/*   — records.js  (list, revoke, VC export, QR)
 *   /api/verify/*    — verify.js   (hash check, file upload, VC verify)
 *   /api/keys/*      — keys.js     (wallet, rotate, multi-sig)
 *   /api/templates/* — templates.js (CRUD templates)
 *   /api/alerts/*    — alerts.js   (fraud alerts)
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const issuerRoutes = require('./routes/issuer');
const recordsRoutes = require('./routes/records');
const verifyRoutes = require('./routes/verify');
const verifierRoutes = require('./routes/verifier');
const keysRoutes = require('./routes/keys');
const templatesRoutes = require('./routes/templates');
const alertsRoutes = require('./routes/alerts');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/issue', issuerRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/verifier', verifierRoutes);
app.use('/api/keys', keysRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/alerts', alertsRoutes);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Digi-Locker Issuer Backend',
        version: '2.0.0',
        mode: process.env.RPC_URL ? 'BLOCKCHAIN (real)' : 'MOCK (demo)',
        timestamp: new Date().toISOString(),
        endpoints: {
            issue: ['GET /api/issue/stats', 'POST /api/issue/prepare', 'POST /api/issue/finalize', 'POST /api/issue/batch'],
            records: ['GET /api/records', 'GET /api/records/:id', 'POST /api/records/:id/revoke', 'GET /api/records/:id/vc', 'GET /api/records/:id/qr'],
            verify: ['GET /api/verify/:hash', 'POST /api/verify/file', 'POST /api/verify/vc'],
            verifier: ['POST /api/verifier/verify', 'GET /api/verifier/verify/:hash', 'GET /api/verifier/saved', 'GET /api/verifier/saved/export', 'POST /api/verifier/batch', 'GET/POST/DELETE /api/verifier/apikeys', 'GET /api/verifier/receipt/:id', 'POST /api/verifier/qr-offline', 'GET /api/verifier/snippets'],
            keys: ['GET /api/keys/info', 'POST /api/keys/rotate', 'GET /api/keys/multisig', 'POST /api/keys/multisig/propose'],
            templates: ['GET /api/templates', 'POST /api/templates', 'PUT /api/templates/:id', 'DELETE /api/templates/:id'],
            alerts: ['GET /api/alerts', 'POST /api/alerts/:i/resolve']
        }
    });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Digi-Locker Issuer Backend running on http://localhost:${PORT}`);
    console.log(`📋 Health: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Mode: ${process.env.RPC_URL ? 'BLOCKCHAIN (real)' : 'MOCK (demo)'}\n`);
});

module.exports = app;
