/**
 * utils/vc.js — W3C Verifiable Credential (JSON-LD) builder
 */
import { getVerificationUrl } from './qr.js';
import { sha256 } from './crypto.js';

export function buildVerifiableCredential(record) {
    const { payload, payloadHash, txHash, signature, id } = record;
    return {
        '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://www.w3.org/2018/credentials/examples/v1'
        ],
        id: `urn:uuid:${id}`,
        type: ['VerifiableCredential', 'AcademicCredential'],
        issuer: {
            id: payload.issuerDID || `did:ethr:${payload.issuerId}`,
            name: 'Digi-Locker Institution'
        },
        issuanceDate: payload.timestamp,
        credentialSubject: {
            id: `did:student:${sha256(payload.rollNo)}`,
            name: payload.studentName,
            rollNo: payload.rollNo,
            degree: payload.degree,
            year: payload.year,
            serialNo: payload.serialNo || ''
        },
        credentialStatus: {
            id: getVerificationUrl(payloadHash),
            type: 'CredentialStatusList2017'
        },
        proof: {
            type: 'EthereumSignature2021',
            created: payload.timestamp,
            verificationMethod: `${payload.issuerDID || `did:ethr:${payload.issuerId}`}#key-1`,
            proofPurpose: 'assertionMethod',
            jws: signature,
            txHash,
            payloadHash
        }
    };
}

export function verifyVCStructure(vc) {
    const errors = [];
    if (!vc['@context']) errors.push('Missing @context');
    if (!vc['type'] || !vc['type'].includes('VerifiableCredential')) errors.push('Missing VerifiableCredential type');
    if (!vc['issuer']) errors.push('Missing issuer');
    if (!vc['credentialSubject']) errors.push('Missing credentialSubject');
    if (!vc['proof']) errors.push('Missing proof');
    return { valid: errors.length === 0, errors };
}
