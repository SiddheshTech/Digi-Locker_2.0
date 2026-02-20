/**
 * utils/qr.js — QR code + verification URL
 */
const QRCode = require('qrcode');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

function getVerificationUrl(payloadHash) {
    return `${BASE_URL}/api/verify/${payloadHash}`;
}

async function generateQRCode(payloadHash) {
    const url = getVerificationUrl(payloadHash);
    const qrDataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 300 });
    return { url, qrDataUrl };
}

async function generateQRCodeSVG(payloadHash) {
    const url = getVerificationUrl(payloadHash);
    const svg = await QRCode.toString(url, { type: 'svg' });
    return { url, svg };
}

module.exports = { getVerificationUrl, generateQRCode, generateQRCodeSVG };
