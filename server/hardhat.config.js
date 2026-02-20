require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.19',
        settings: {
            optimizer: { enabled: true, runs: 200 }
        }
    },
    networks: {
        // Local Hardhat node — npx hardhat node
        localhost: {
            url: 'http://127.0.0.1:8545',
            chainId: 31337
        },
        // Sepolia testnet — free ETH from https://sepoliafaucet.com
        sepolia: {
            url: process.env.RPC_URL || '',
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11155111
        }
    },
    paths: {
        sources: './contract',
        artifacts: './artifacts'
    }
};
