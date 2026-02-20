/**
 * utils/blockchain.js
 * ethers.js interactions — sign, issue/revoke on-chain, verify tx
 *
 * MOCK MODE: if RPC_URL / PRIVATE_KEY / CONTRACT_ADDRESS are empty in .env,
 * all blockchain calls return realistic mock responses so the app works
 * without a real node.
 *
 * REAL MODE: fill in .env and deploy CredentialRegistry.sol to Sepolia/Hardhat.
 */

const { ethers } = require('ethers');

// Minimal ABI matching CredentialRegistry.sol
const CONTRACT_ABI = [
    'function issueCredential(bytes32 payloadHash, string memory issuerId) public returns (bool)',
    'function revokeCredential(bytes32 payloadHash, string memory reason) public returns (bool)',
    'function isRevoked(bytes32 payloadHash) public view returns (bool)',
    'function isIssued(bytes32 payloadHash) public view returns (bool)',
    'function getCredential(bytes32 payloadHash) public view returns (string memory issuerId, uint256 timestamp, bool revoked, string memory reason)',
    'event CredentialIssued(bytes32 indexed payloadHash, string issuerId, uint256 timestamp)',
    'event CredentialRevoked(bytes32 indexed payloadHash, string reason, uint256 timestamp)'
];

function getProvider() {
    const rpcUrl = process.env.RPC_URL;
    if (rpcUrl) return new ethers.JsonRpcProvider(rpcUrl);
    return null;
}

function getSigner(provider) {
    const pk = process.env.PRIVATE_KEY;
    if (!pk || !provider) return null;
    return new ethers.Wallet(pk, provider);
}

function getContract(signer) {
    const addr = process.env.CONTRACT_ADDRESS;
    if (!addr || !signer) return null;
    return new ethers.Contract(addr, CONTRACT_ABI, signer);
}

/** Sign a payloadHash with server wallet (proof of issuance) */
async function signPayloadHash(payloadHash) {
    const provider = getProvider();
    const signer = getSigner(provider);
    if (!signer) return '0xMOCK_SERVER_SIG_' + payloadHash.substring(0, 16);
    return await signer.signMessage(Buffer.from(payloadHash, 'hex'));
}

/** Issue credential on-chain (or mock) */
async function issueOnChain(payloadHash, issuerId) {
    const provider = getProvider();
    const signer = getSigner(provider);
    const contract = getContract(signer);

    if (!contract) {
        return {
            txHash: '0x' + mockHash(),
            blockNumber: Math.floor(Math.random() * 100000) + 5000000,
            mock: true,
            network: 'mock'
        };
    }
    const bytes32 = '0x' + payloadHash.padStart(64, '0');
    const tx = await contract.issueCredential(bytes32, issuerId);
    const receipt = await tx.wait();
    return { txHash: receipt.hash, blockNumber: receipt.blockNumber, mock: false };
}

/** Revoke credential on-chain (or mock) */
async function revokeOnChain(payloadHash, reason) {
    const provider = getProvider();
    const signer = getSigner(provider);
    const contract = getContract(signer);

    if (!contract) {
        return { txHash: '0x' + mockHash(), blockNumber: Math.floor(Math.random() * 100000) + 5000000, mock: true };
    }
    const bytes32 = '0x' + payloadHash.padStart(64, '0');
    const tx = await contract.revokeCredential(bytes32, reason);
    const receipt = await tx.wait();
    return { txHash: receipt.hash, blockNumber: receipt.blockNumber, mock: false };
}

/** Query credential directly from on-chain contract (read-only, no signer needed) */
async function queryCredentialOnChain(payloadHash) {
    const provider = getProvider();
    const addr = process.env.CONTRACT_ADDRESS;
    if (!provider || !addr) return { found: false, mock: true, message: 'Mock mode — no RPC/contract configured' };
    try {
        const contract = new ethers.Contract(addr, CONTRACT_ABI, provider);
        const bytes32 = '0x' + payloadHash.replace(/^0x/, '').padStart(64, '0');
        const isIssued = await contract.isIssued(bytes32);
        if (!isIssued) return { found: false, mock: false, issued: false };
        const [issuerId, timestamp, revoked, reason] = await contract.getCredential(bytes32);
        return {
            found: true, mock: false,
            issuerId: String(issuerId),
            issuedAt: new Date(Number(timestamp) * 1000).toISOString(),
            revoked: Boolean(revoked),
            revocationReason: String(reason)
        };
    } catch (err) {
        return { found: false, error: err.message };
    }
}

/** Verify a transaction hash on-chain */
async function verifyTransaction(txHash) {
    const provider = getProvider();
    if (!provider) return { verified: true, mock: true, txHash, message: 'Mock mode — no RPC configured' };
    try {
        const receipt = await provider.getTransactionReceipt(txHash);
        return { verified: !!receipt && receipt.status === 1, txHash, blockNumber: receipt?.blockNumber, mock: false };
    } catch (err) {
        return { verified: false, error: err.message };
    }
}

/** Get wallet info */
async function getWalletInfo() {
    const provider = getProvider();
    const signer = getSigner(provider);
    if (!signer) {
        return { address: '0xMOCK_ISSUER_ADDRESS', balance: '0.0 ETH', network: 'Mock (no RPC configured)', mock: true };
    }
    const address = await signer.getAddress();
    const bal = await provider.getBalance(address);
    const network = await provider.getNetwork();
    return { address, balance: ethers.formatEther(bal) + ' ETH', network: network.name, chainId: network.chainId.toString(), mock: false };
}

function mockHash() {
    return Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

module.exports = {
    signPayloadHash,
    issueOnChain,
    revokeOnChain,
    verifyTransaction,
    queryCredentialOnChain,
    getWalletInfo,
    mockHash
};
