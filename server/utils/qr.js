import QRCode from 'qrcode';

/**
 * utils/qr.js — QR code + verification URL
 */
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export function getVerificationUrl(payloadHash) {
    const h = payloadHash.replace(/^0x/, '');
    return `${FRONTEND_URL}/verify?hash=${h}`;
}

export async function generateQRCode(payloadHash) {
    const url = getVerificationUrl(payloadHash);
    const qrDataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 300 });
    return { url, qrDataUrl };
}

export async function generateQRCodeSVG(payloadHash) {
    const url = getVerificationUrl(payloadHash);
    const svg = await QRCode.toString(url, { type: 'svg' });
    return { url, svg };
}

export async function generateQRFromText(text) {
    const qrDataUrl = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H', width: 300 });
    return qrDataUrl;
}
