/**
 * utils/fraud.js — Fraud/anomaly detection
 */
const store = require('../data/store');

const RATE_LIMIT_PER_HOUR = 20;
const DUPLICATE_WINDOW_MS = 60000;

function detectAnomalies(payload, issuerId) {
    const alerts = [];
    const now = Date.now();
    const windowStart = now - 60 * 60 * 1000;

    // 1. Rate limit — too many credentials in 1 hour
    const recentByIssuer = store.credentials.filter(
        c => c.payload.issuerId === issuerId && new Date(c.issuedAt).getTime() > windowStart
    );
    if (recentByIssuer.length >= RATE_LIMIT_PER_HOUR) {
        alerts.push({
            type: 'RATE_LIMIT', severity: 'HIGH', confidence: 0.95,
            message: `Issuer ${issuerId} issued ${recentByIssuer.length} credentials in the last hour (limit: ${RATE_LIMIT_PER_HOUR}).`,
            suggestedAction: 'Temporarily suspend issuance and verify issuer identity.'
        });
    }

    // 2. Duplicate — same student+degree within 60s
    const duplicate = store.credentials.find(
        c => c.payload.rollNo === payload.rollNo &&
            c.payload.degree === payload.degree &&
            new Date(c.issuedAt).getTime() > now - DUPLICATE_WINDOW_MS
    );
    if (duplicate) {
        alerts.push({
            type: 'DUPLICATE_ISSUANCE', severity: 'HIGH', confidence: 0.99,
            message: `Duplicate credential for ${payload.studentName} (${payload.rollNo}) within ${DUPLICATE_WINDOW_MS / 1000}s.`,
            suggestedAction: 'Review and cancel one of the duplicate credentials.'
        });
    }

    // 3. Suspicious serial number (non-alphanumeric chars)
    if (payload.serialNo && /[^a-zA-Z0-9\-]/.test(payload.serialNo)) {
        alerts.push({
            type: 'SUSPICIOUS_SERIAL', severity: 'MEDIUM', confidence: 0.7,
            message: `Serial number "${payload.serialNo}" contains unusual characters.`,
            suggestedAction: 'Verify the serial number format before issuing.'
        });
    }

    // 4. Future graduation year
    const currentYear = new Date().getFullYear();
    if (Number(payload.year) > currentYear + 1) {
        alerts.push({
            type: 'FUTURE_DATE', severity: 'MEDIUM', confidence: 0.85,
            message: `Year "${payload.year}" is in the future (current: ${currentYear}).`,
            suggestedAction: 'Verify the graduation year.'
        });
    }

    return alerts;
}

function saveAlerts(alerts, payloadHash, issuerId) {
    const ts = new Date().toISOString();
    alerts.forEach(a => store.alerts.push({ ...a, payloadHash, issuerId, timestamp: ts, resolved: false }));
}

module.exports = { detectAnomalies, saveAlerts };
