/**
 * routes/keys.js
 * GET  /api/keys/info                — wallet info (address, balance, network)
 * POST /api/keys/rotate              — simulate key rotation
 * GET  /api/keys/multisig            — multi-sig status + pending proposals
 * POST /api/keys/multisig/propose    — propose action
 * POST /api/keys/multisig/:id/approve — approve
 * POST /api/keys/multisig/:id/execute — execute
 */

import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { getWalletInfo, mockHash } from '../utils/blockchain.js';
import store from '../data/store.js';

// Wallet Info
router.get('/info', async (req, res) => {
    try {
        res.json(await getWalletInfo());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Simulate Key Rotation
router.post('/rotate', (req, res) => {
    const newAddr = '0x' + mockHash().substring(0, 40);
    res.json({ success: true, message: 'Key rotation simulated', newAddress: newAddr, note: 'In production: update authorized keys on the smart contract.' });
});

// Multi-sig Status
router.get('/multisig', (req, res) => {
    res.json({
        enabled: true, threshold: 2,
        signers: [
            { address: '0xABC123...', label: 'Primary Issuer', approved: true },
            { address: '0xDEF456...', label: 'Secondary Approver', approved: false }
        ],
        pendingProposals: store.multiSigProposals.filter(p => p.status === 'pending')
    });
});

// Propose Multi-sig Action
router.post('/multisig/propose', (req, res) => {
    const { action, payloadHash, proposedBy, description } = req.body;
    if (!action || !proposedBy) return res.status(400).json({ error: 'action and proposedBy required' });

    const proposal = {
        id: uuidv4(), action, payloadHash, description, proposedBy,
        proposedAt: new Date().toISOString(),
        approvals: [proposedBy], status: 'pending',
        timeline: [{ event: 'proposed', by: proposedBy, at: new Date().toISOString() }]
    };
    store.multiSigProposals.push(proposal);
    res.status(201).json({ success: true, proposal });
});

// Approve Proposal
router.post('/multisig/:id/approve', (req, res) => {
    const { approver, signature } = req.body;
    const proposal = store.multiSigProposals.find(p => p.id === req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    if (proposal.status !== 'pending') return res.status(400).json({ error: 'Not pending' });
    if (proposal.approvals.includes(approver)) return res.status(400).json({ error: 'Already approved' });

    proposal.approvals.push(approver);
    proposal.timeline.push({ event: 'approved', by: approver, signature, at: new Date().toISOString() });
    if (proposal.approvals.length >= 2) {
        proposal.status = 'ready-to-execute';
        proposal.timeline.push({ event: 'threshold-met', at: new Date().toISOString() });
    }
    res.json({ success: true, proposal });
});

// Execute Proposal
router.post('/multisig/:id/execute', (req, res) => {
    const proposal = store.multiSigProposals.find(p => p.id === req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    if (proposal.status !== 'ready-to-execute') return res.status(400).json({ error: 'Not ready to execute' });

    const txHash = '0x' + mockHash();
    proposal.status = 'executed';
    proposal.executedAt = new Date().toISOString();
    proposal.executionTxHash = txHash;
    proposal.timeline.push({ event: 'executed', txHash, at: new Date().toISOString() });
    res.json({ success: true, txHash, proposal });
});

export default router;
