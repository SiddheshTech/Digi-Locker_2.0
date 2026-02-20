/**
 * context/WalletContext.tsx
 * Global MetaMask wallet state — connect, disconnect, auto-reconnect
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletState {
    address: string | null;
    shortAddress: string | null;
    balance: string | null;
    chainId: number | null;
    chainName: string | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

interface WalletContextType extends WalletState {
    connect: () => Promise<void>;
    disconnect: () => void;
    getSigner: () => Promise<ethers.Signer | null>;
    switchToHardhat: () => Promise<void>;
    switchToSepolia: () => Promise<void>;
}

const CHAIN_NAMES: Record<number, string> = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    31337: 'Hardhat Local',
    5: 'Goerli',
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<WalletState>({
        address: null, shortAddress: null, balance: null,
        chainId: null, chainName: null,
        isConnected: false, isConnecting: false, error: null,
    });

    const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    const loadBalance = useCallback(async (addr: string) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const bal = await provider.getBalance(addr);
            return parseFloat(ethers.formatEther(bal)).toFixed(4);
        } catch { return '0.0000'; }
    }, []);

    const updateState = useCallback(async (addr: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        const balance = await loadBalance(addr);
        setState({
            address: addr, shortAddress: shortAddr(addr), balance,
            chainId, chainName: CHAIN_NAMES[chainId] || `Chain #${chainId}`,
            isConnected: true, isConnecting: false, error: null,
        });
    }, [loadBalance]);

    // Auto-reconnect if already authorized
    useEffect(() => {
        if (!window.ethereum) return;
        window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
            if (accounts[0]) updateState(accounts[0]);
        });

        const onAccounts = (accounts: string[]) => {
            if (accounts[0]) updateState(accounts[0]);
            else setState(s => ({ ...s, address: null, shortAddress: null, isConnected: false }));
        };
        const onChain = () => window.location.reload();

        window.ethereum.on('accountsChanged', onAccounts);
        window.ethereum.on('chainChanged', onChain);
        return () => {
            window.ethereum?.removeListener('accountsChanged', onAccounts);
            window.ethereum?.removeListener('chainChanged', onChain);
        };
    }, [updateState]);

    const connect = useCallback(async () => {
        if (!window.ethereum) {
            setState(s => ({ ...s, error: 'MetaMask not found. Please install the extension.' }));
            return;
        }
        setState(s => ({ ...s, isConnecting: true, error: null }));
        try {
            const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await updateState(accounts[0]);
        } catch (err: unknown) {
            setState(s => ({ ...s, isConnecting: false, error: (err as Error).message || 'Rejected' }));
        }
    }, [updateState]);

    const disconnect = useCallback(() => {
        setState({ address: null, shortAddress: null, balance: null, chainId: null, chainName: null, isConnected: false, isConnecting: false, error: null });
    }, []);

    const getSigner = useCallback(async () => {
        if (!window.ethereum) return null;
        const provider = new ethers.BrowserProvider(window.ethereum);
        return provider.getSigner();
    }, []);

    const switchToHardhat = useCallback(async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: '0x7A69', chainName: 'Hardhat Local', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }, rpcUrls: ['http://127.0.0.1:8545'] }]
            });
        } catch { /* user cancelled */ }
    }, []);

    const switchToSepolia = useCallback(async () => {
        try {
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0xaa36a7' }] });
        } catch { /* user cancelled */ }
    }, []);

    return (
        <WalletContext.Provider value={{ ...state, connect, disconnect, getSigner, switchToHardhat, switchToSepolia }}>
            {children}
        </WalletContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWallet() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error('useWallet must be inside WalletProvider');
    return ctx;
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum?: any;
    }
}
