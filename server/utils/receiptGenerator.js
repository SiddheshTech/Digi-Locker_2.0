/**
 * utils/receiptGenerator.js
 * Generate signed verification receipt PDF
 * Uses crypto for auditor signature + PDFKit for PDF output
 */

const crypto = require('crypto');
const PDFDocument = require('pdfkit');

const AUDITOR_SECRET = process.env.AUDITOR_SECRET || 'digilocker-auditor-default-secret';

/** Create a deterministic auditor signature for receipt data */
function signReceipt(data) {
    const keys = Object.keys(data).filter(k => k !== 'auditorSignature').sort();
    const payload = JSON.stringify(keys.map(k => data[k]));
    return crypto.createHmac('sha256', AUDITOR_SECRET).update(payload).digest('hex');
}

/** Build receipt data and signature */
function buildReceiptData(verification) {
    const data = {
        verificationId: verification.id,
        payloadHash: verification.payloadHash || verification.uploadedFileHash,
        status: verification.verified ? (verification.revoked ? 'REVOKED' : 'VERIFIED') : 'TAMPERED',
        issuerId: verification.issuerId || 'unknown',
        issuedAt: verification.issuedAt || null,
        txHash: verification.txHash || null,
        verifiedAt: verification.verifiedAt || new Date().toISOString(),
        verifier: verification.verifier || 'Digi-Locker Verifier'
    };
    data.auditorSignature = signReceipt(data);
    return data;
}

/** Generate PDF receipt buffer */
async function generateReceiptPDF(verification) {
    const data = buildReceiptData(verification);
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        doc.fontSize(18).text('DIGI-LOCKER VERIFICATION RECEIPT', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10);
        doc.text(`Verification ID:   ${data.verificationId}`);
        doc.text(`Payload Hash:      ${data.payloadHash}`);
        doc.text(`Status:            ${data.status}`);
        doc.text(`Issuer:            ${data.issuerId}`);
        doc.text(`Issued:            ${data.issuedAt || 'N/A'}`);
        doc.text(`Tx Hash:           ${data.txHash || 'N/A'}`);
        doc.text(`Verified At:       ${data.verifiedAt}`);
        doc.text(`Verifier:          ${data.verifier}`);
        doc.moveDown();
        doc.text(`Auditor Signature: ${data.auditorSignature}`);
        doc.moveDown();
        doc.fontSize(8).text('This receipt certifies the verification result above. Signature can be verified server-side.', { align: 'center' });
        doc.end();
    });
}

/** Plain text receipt fallback */
function generateReceiptBuffer(verification) {
    const data = buildReceiptData(verification);
    const lines = [
        'DIGI-LOCKER VERIFICATION RECEIPT',
        '--------------------------------',
        `Verification ID:  ${data.verificationId}`,
        `Payload Hash:     ${data.payloadHash}`,
        `Status:           ${data.status}`,
        `Issuer:           ${data.issuerId}`,
        `Issued:           ${data.issuedAt || 'N/A'}`,
        `Tx Hash:          ${data.txHash || 'N/A'}`,
        `Verified At:      ${data.verifiedAt}`,
        `Auditor Signature: ${data.auditorSignature}`
    ];
    return Buffer.from(lines.join('\n'), 'utf8');
}

module.exports = {
    signReceipt,
    buildReceiptData,
    generateReceiptPDF,
    generateReceiptBuffer
};
