/**
 * utils/crypto.js
 * SHA-256 hashing, payload canonicalization, Merkle Tree
 */

const crypto = require('crypto');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

/** SHA-256 hash of any string or Buffer */
function sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

/** Canonicalize credential metadata into a deterministic JSON string */
function canonicalizeCredential(metadata) {
    const ordered = {
        studentName: metadata.studentName,
        rollNo: metadata.rollNo,
        degree: metadata.degree,
        year: String(metadata.year),
        serialNo: metadata.serialNo || '',
        issuerId: metadata.issuerId,
        issuerDID: metadata.issuerDID || `did:ethr:${metadata.issuerId}`,
        fileHash: metadata.fileHash,
        timestamp: metadata.timestamp
    };
    return JSON.stringify(ordered);
}

/** Build a full credential payload */
function buildCredentialPayload(metadata, fileHash, issuerId) {
    const timestamp = new Date().toISOString();
    const payload = {
        studentName: metadata.studentName,
        rollNo: metadata.rollNo,
        degree: metadata.degree,
        year: metadata.year,
        serialNo: metadata.serialNo || '',
        issuerId,
        issuerDID: `did:ethr:${issuerId}`,
        fileHash,
        timestamp,
        revocationFlag: false
    };
    const canonical = canonicalizeCredential(payload);
    const payloadHash = sha256(canonical);
    return { payload, canonical, payloadHash };
}

/** Build a Merkle Tree from an array of leaf data strings */
function buildMerkleTree(leaves) {
    const hashedLeaves = leaves.map(l => keccak256(l));
    const tree = new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
    const root = tree.getRoot().toString('hex');
    return { tree, root, hashedLeaves };
}

/** Get Merkle proof for a specific leaf */
function getMerkleProof(tree, leafData) {
    const leaf = keccak256(leafData);
    return tree.getProof(leaf).map(p => ({
        data: p.data.toString('hex'),
        position: p.position
    }));
}

module.exports = {
    sha256,
    canonicalizeCredential,
    buildCredentialPayload,
    buildMerkleTree,
    getMerkleProof
};
