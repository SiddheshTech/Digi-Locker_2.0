# DigiLocker 2.0 – Verifiable Academic Credential System

DigiLocker 2.0 is a state-of-the-art, blockchain-based system designed for the secure issuance and verification of academic credentials. By leveraging Ethereum smart contracts and cryptographic hashing, it ensures the integrity, privacy, and immutability of student records.

---

## 🚀 Key Features

- **On-Chain Registry**: Cryptographic hashes of credentials are stored on the Ethereum blockchain for tamper-proof verification.
- **Privacy by Design**: No personal data is stored on-chain; only hashes and metadata are recorded.
- **Merkle Tree Integration**: Supports efficient batch issuance and verification using Merkle proofs.
- **Revocation Mechanism**: Issuers can instantly revoke credentials with a reason, reflected in real-time on-chain.
- **W3C Verifiable Credentials**: Exports industry-standard JSON-LD verifiable credentials.
- **Secure Dashboard**: Separate portals for Issuers (Universities/Boards) and Students.
- **Offline Verification**: QR-code-based verification support for quick validation.
- **Fraud Detection**: Integrated anomaly detection for suspicious issuance patterns.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS & Shadcn UI
- **Animations**: Framer Motion & GSAP
- **State Management**: TanStack Query (React Query)
- **Web3**: Ethers.js for blockchain interaction

### Backend
- **Runtime**: Node.js with Express
- **Blockchain**: Hardhat (Solidity Smart Contracts)
- **Hashing**: SHA-256 & Keccak256
- **Storage**: JSON-based local storage (for demo metadata)

---

## 📁 Project Structure

```text
Digi-Locker_2.0/
├── client/           # Modern React + Shadcn UI Frontend
├── server/           # Express Backend & Hardhat Environment
│   ├── contract/     # Solidity Smart Contracts (CredentialRegistry.sol)
│   ├── routes/       # API endpoints (issue, verify, keys, etc.)
│   └── scripts/      # Blockchain deployment scripts
└── src/              # Legacy or supplementary frontend components
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MetaMask (for browser interaction)

### 1. Server Setup
```bash
cd server
npm install
```
*Create a `.env` file in the `server` directory:*
```env
PORT=5000
PRIVATE_KEY=your_private_key
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=deployed_contract_address
```

### 2. Blockchain (Local)
Start a local Hardhat node and deploy the contract:
```bash
# In server directory
npm run chain           # Start Hardhat node
npm run deploy:local    # Deploy to local node
```

### 3. Client Setup
```bash
cd client
npm install
npm run dev
```

---

## 📄 API Overview

- `POST /api/issue/prepare`: Hash data and prepare for issuance.
- `POST /api/issue/finalize`: Register hash on the blockchain.
- `GET /api/records`: List issued credentials.
- `POST /api/records/:id/revoke`: Revoke a specific credential.
- `POST /api/verify/file`: Verify an uploaded certificate against the blockchain.

---

## 📜 Smart Contract
The core logic resides in `CredentialRegistry.sol`, which maintains a mapping of `payloadHash` to its issuance status, issuer, and revocation state.

---

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
