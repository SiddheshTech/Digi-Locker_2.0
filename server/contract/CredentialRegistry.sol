// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CredentialRegistry
 * @notice On-chain registry for academic credential hashes
 *         Stores ONLY: hash, issuerId, timestamp, revocationFlag
 *         NO personal data (privacy by design)
 *
 * Deploy to Sepolia or local Hardhat, then set CONTRACT_ADDRESS in .env
 */
contract CredentialRegistry {

    struct Credential {
        string issuerId;
        uint256 timestamp;
        bool revoked;
        string revocationReason;
    }

    mapping(bytes32 => Credential) private credentials;

    event CredentialIssued(bytes32 indexed payloadHash, string issuerId, uint256 timestamp);
    event CredentialRevoked(bytes32 indexed payloadHash, string reason, uint256 timestamp);

    function issueCredential(bytes32 payloadHash, string memory issuerId) external returns (bool) {
        require(credentials[payloadHash].timestamp == 0, "Already issued");
        credentials[payloadHash] = Credential({ issuerId: issuerId, timestamp: block.timestamp, revoked: false, revocationReason: "" });
        emit CredentialIssued(payloadHash, issuerId, block.timestamp);
        return true;
    }

    function revokeCredential(bytes32 payloadHash, string memory reason) external returns (bool) {
        require(credentials[payloadHash].timestamp != 0, "Not issued");
        require(!credentials[payloadHash].revoked, "Already revoked");
        credentials[payloadHash].revoked = true;
        credentials[payloadHash].revocationReason = reason;
        emit CredentialRevoked(payloadHash, reason, block.timestamp);
        return true;
    }

    function getCredential(bytes32 payloadHash) external view returns (string memory issuerId, uint256 timestamp, bool revoked, string memory reason) {
        Credential memory c = credentials[payloadHash];
        return (c.issuerId, c.timestamp, c.revoked, c.revocationReason);
    }

    function isRevoked(bytes32 payloadHash) external view returns (bool) {
        return credentials[payloadHash].revoked;
    }

    function isIssued(bytes32 payloadHash) external view returns (bool) {
        return credentials[payloadHash].timestamp != 0;
    }
}
