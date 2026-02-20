/**
 * scripts/deploy.js
 * Deploy CredentialRegistry to local Hardhat or Sepolia.
 *
 * LOCAL:   npx hardhat run scripts/deploy.js --network localhost
 * SEPOLIA: npx hardhat run scripts/deploy.js --network sepolia
 *
 * After running, copy the printed CONTRACT_ADDRESS into server/.env
 */

import hre from 'hardhat';
const { ethers, network } = hre;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('\n🚀 Deploying CredentialRegistry...');
    console.log('   Network:', network.name);
    console.log('   Deployer:', deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log('   Balance: ', ethers.formatEther(balance), 'ETH\n');

    const Registry = await ethers.getContractFactory('CredentialRegistry');
    const registry = await Registry.deploy();
    await registry.waitForDeployment();

    const address = await registry.getAddress();

    console.log('✅ CredentialRegistry deployed!');
    console.log('   Contract address:', address);
    console.log('\n📋 Add these to server/.env:');
    console.log(`   RPC_URL=${network.name === 'localhost' ? 'http://127.0.0.1:8545' : '(your RPC URL)'}`);
    console.log(`   CONTRACT_ADDRESS=${address}`);

    if (network.name === 'sepolia') {
        console.log(`\n🔍 View on Etherscan: https://sepolia.etherscan.io/address/${address}`);
    }

    // Auto-patch .env file if running locally
    if (network.name === 'localhost') {
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = fs.readFileSync(envPath, 'utf-8');
        // Update or append CONTRACT_ADDRESS
        if (envContent.includes('CONTRACT_ADDRESS=')) {
            envContent = envContent.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${address}`);
        } else {
            envContent += `\nCONTRACT_ADDRESS=${address}\n`;
        }
        // Update or append RPC_URL
        if (envContent.includes('RPC_URL=')) {
            envContent = envContent.replace(/RPC_URL=.*/g, 'RPC_URL=http://127.0.0.1:8545');
        } else {
            envContent += '\nRPC_URL=http://127.0.0.1:8545\n';
        }
        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ .env auto-updated with contract address and RPC URL!');
    }
}

main().catch((err) => {
    console.error('❌ Deploy failed:', err);
    process.exit(1);
});
