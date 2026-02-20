import QRCode from 'qrcode';

/**
 * utils/qr.js — QR code + verification URL
 */
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

export function getVerificationUrl(payloadHash) {
    const h = payloadHash.replace(/^0x/, '');
    return `${BASE_URL}/api/verify/${h}`;
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
