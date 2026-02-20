# Digi-Locker Verifier Backend API

Employer/Verifier role APIs for credential verification. Uses Node.js, SHA-256, blockchain (ethers.js), and cryptography.

## Setup

1. Install dependencies: `npm install` (adds: pdfkit, csv-parse, csv-stringify)
2. Configure `.env`: RPC_URL, CONTRACT_ADDRESS, PRIVATE_KEY for blockchain; optional AUDITOR_SECRET for receipt signing
3. Deploy `contract/CredentialRegistry.sol` to Sepolia or local Hardhat

## Endpoints

### Verify (Public)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/verifier/verify` | Unified verify: `hash`, `file` (multipart), `link`, or `qrPayload` |
| GET | `/api/verifier/verify/:hash` | Verify by credential hash (for links/QR) |

**Response card:** `{ status: "Verified"|"Tampered"|"Revoked", issuerId, issuedAt, txHash, copyReceiptUrl, message }`

**Microcopy (Verified):** *"This file matches an on-chain record anchored by [issuer]. Tx: 0x… (copied)."*

### Saved Verifications (Audit Trail)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/verifier/saved` | List saved verifications (`?limit=100`) |
| GET | `/api/verifier/saved/export` | Export audit trail as CSV |

### Batch Verify

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/verifier/batch` | Upload CSV with `hash` or `payloadHash` column; returns annotated CSV |

### API Key Manager

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/verifier/apikeys` | List API keys |
| POST | `/api/verifier/apikeys` | Create key; returns raw key once + example curl |
| DELETE | `/api/verifier/apikeys/:id` | Revoke key |

**Auth:** `?api_key=xxx` or `Authorization: Bearer xxx`

### Receipt Generator

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/verifier/receipt/:id` | Download signed verification receipt PDF |

### Offline QR Verify

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/verifier/qr-offline` | Verify from QR payload `{ issuerPubKey, ipfsHash, payloadHash }`; indicates if full online verification required |

### Employer Integration Snippets

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/verifier/snippets` | SDK code blocks (Node, Python, Java, curl) + embed verify button HTML |

## MetaMask Integration

The backend stores credential hashes on-chain and verifies transactions. MetaMask is used **client-side** to:
- Connect wallet for verifier identity
- Sign messages for audit trails
- Submit issuer transactions (issuer flow)

Backend supports wallet signatures via `ethers.verifyMessage()` for future verifier auth.
