/**
 * utils/apiKeyAuth.js
 * API Key validation for programmatic verification
 * Verifier API endpoints can accept ?api_key=xxx or Authorization: Bearer xxx
 */

const store = require('../data/store');
const crypto = require('crypto');

/** Generate a new API key (prefix dlk_ for identification) */
function generateApiKey() {
    return 'dlk_' + crypto.randomBytes(24).toString('hex');
}

/** Hash API key for storage (never store raw keys) */
function hashApiKey(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
}

/** Extract API key from request: query param or Authorization header */
function extractApiKey(req) {
    const query = req.query?.api_key;
    const auth = req.headers?.authorization;
    if (query && typeof query === 'string') return query;
    if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
    return null;
}

/** Middleware: optional API key — validates if present, continues either way */
function optionalApiKey(req, res, next) {
    const key = extractApiKey(req);
    if (!key) return next();
    const hashed = hashApiKey(key);
    const found = store.verifierApiKeys.find(k => k.keyHash === hashed);
    if (found) {
        req.apiKey = found;
        req.apiKeyId = found.id;
    }
    next();
}

/** Middleware: require API key for programmatic access (used for rate-limited endpoints) */
function requireApiKey(req, res, next) {
    const key = extractApiKey(req);
    if (!key) return res.status(401).json({ error: 'API key required. Use ?api_key=xxx or Authorization: Bearer xxx' });
    const hashed = hashApiKey(key);
    const found = store.verifierApiKeys.find(k => k.keyHash === hashed && !k.revoked);
    if (!found) return res.status(401).json({ error: 'Invalid or revoked API key' });
    req.apiKey = found;
    req.apiKeyId = found.id;
    next();
}

module.exports = {
    generateApiKey,
    hashApiKey,
    extractApiKey,
    optionalApiKey,
    requireApiKey
};
