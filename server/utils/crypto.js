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
    const keys = Object.keys(metadata).sort();
    return keys.map(k => `${k}:${metadata[k]}`).join('|');
}

/** 
 * Build the data payload and its hash 
 * Returns { payload, payloadHash }
 */
export function buildCredentialPayload(metadata, fileHash, issuerId) {
    const payload = {
        ...metadata,
        fileHash,
        issuerId,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    const canonicalString = canonicalizeCredential(payload);
    const payloadHash = sha256(canonicalString);
    return { payload, payloadHash: '0x' + payloadHash };
}

/** Build Merkle Tree from leaves */
export function buildMerkleTree(leaves) {
    return new MerkleTree(leaves, keccak256, { sortPairs: true });
}

/** Get Merkle Proof for a leaf */
export function getMerkleProof(tree, leafData) {
    const leaf = keccak256(leafData);
    return tree.getHexProof(leaf);
}
