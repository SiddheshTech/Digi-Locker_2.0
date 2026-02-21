import crypto from 'crypto';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

/** Standard SHA-256 hash */
export function sha256(data) {
    const input = Buffer.isBuffer(data) ? data : String(data);
    return crypto.createHash('sha256').update(input).digest('hex');
}

/** Canonicalize credential metadata for hashing */
export function canonicalizeCredential(metadata) {
    if (!metadata) return '';
    const keys = Object.keys(metadata).sort();
    return keys.map(k => {
        const val = (metadata[k] === undefined || metadata[k] === null) ? '' : String(metadata[k]);
        return `${k}:${val}`;
    }).join('|');
}

/** 
 * Build the data payload and its hash 
 * Returns { payload, payloadHash }
 */
export function buildCredentialPayload(metadata, fileHash, issuerId) {
    const payload = {
        ...metadata,
        fileHash: fileHash || 'no-file',
        issuerId: issuerId || '0xMOCK_ISSUER',
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    const canonicalString = canonicalizeCredential(payload);
    // Use Keccak-256 for both single AND batch to stay consistent with Ethereum standards
    const payloadHash = keccak256(canonicalString).toString('hex');
    return { payload, payloadHash: '0x' + payloadHash };
}

/** Build Merkle Tree from leaves (which should be hashed already or will be hashed here) */
export function buildMerkleTree(leafHashes) {
    // Ensure all leaves are buffers for merkletreejs
    const hashedLeaves = leafHashes.map(h => Buffer.isBuffer(h) ? h : Buffer.from(h.replace(/^0x/, ''), 'hex'));
    return new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
}

/** Get Merkle Proof for a leafHash */
export function getMerkleProof(tree, leafHash) {
    const h = leafHash.replace(/^0x/, '');
    return tree.getHexProof(Buffer.from(h, 'hex'));
}
