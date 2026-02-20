/**
 * routes/alerts.js — Fraud/Anomaly Alerts
 * GET  /api/alerts              — list alerts
 * POST /api/alerts/:i/resolve   — resolve alert
 */

const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/', (req, res) => {
    const { resolved } = req.query;
    let alerts = store.alerts;
    if (resolved === 'false') alerts = alerts.filter(a => !a.resolved);
    else if (resolved === 'true') alerts = alerts.filter(a => a.resolved);
    res.json({ total: alerts.length, alerts });
});

router.post('/:index/resolve', (req, res) => {
    const idx = parseInt(req.params.index);
    if (isNaN(idx) || idx < 0 || idx >= store.alerts.length) {
        return res.status(404).json({ error: 'Alert not found' });
    }
    store.alerts[idx].resolved = true;
    store.alerts[idx].resolvedAt = new Date().toISOString();
    store.alerts[idx].resolvedBy = req.body.resolvedBy || 'admin';
    res.json({ success: true, alert: store.alerts[idx] });
});

module.exports = router;
