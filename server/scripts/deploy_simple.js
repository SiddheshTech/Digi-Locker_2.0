import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const rpcUrl = "http://127.0.0.1:8545";
    const privateKey = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const artifactPath = path.join(__dirname, '..', 'artifacts', 'contract', 'CredentialRegistry.sol', 'CredentialRegistry.json');
    if (!fs.existsSync(artifactPath)) {
        console.error("Artifact not found at:", artifactPath);
        process.exit(1);
    }
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    console.log(`\n🚀 Deploying CredentialRegistry using pure ethers to http://127.0.0.1:8545...`);
    console.log(`   Deployer: ${wallet.address}`);

    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log(`✅ CredentialRegistry deployed to: ${address}`);

    // Update .env
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('CONTRACT_ADDRESS=')) {
            envContent = envContent.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${address}`);
        } else {
            envContent += `\nCONTRACT_ADDRESS=${address}\n`;
        }
        fs.writeFileSync(envPath, envContent);
        console.log("   .env updated with CONTRACT_ADDRESS");
    } else {
        console.log("   .env not found, skip auto-update.");
    }
}

main().catch(err => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
});
