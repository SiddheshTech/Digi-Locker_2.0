/**
 * components/wallet/WalletButton.tsx
 * MetaMask connect/disconnect button with status dropdown
 */
import { useState } from 'react';
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';

export default function WalletButton() {
    const { isConnected, isConnecting, address, shortAddress, balance, chainName, chainId, error, connect, disconnect, switchToHardhat, switchToSepolia } = useWallet();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const isRightNetwork = chainId === 31337 || chainId === 11155111;

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-end gap-1">
                <Button
                    onClick={connect}
                    disabled={isConnecting}
                    size="sm"
                    className="accent-gradient text-accent-foreground border-0 gap-2"
                >
                    <Wallet className="w-3.5 h-3.5" />
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
                {error && (
                    <p className="text-xs text-destructive flex items-center gap-1 max-w-[220px] text-right">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all
          ${isRightNetwork
                        ? 'bg-accent/5 border-accent/20 text-foreground hover:bg-accent/10'
                        : 'bg-orange-500/5 border-orange-500/30 text-foreground hover:bg-orange-500/10'
                    }`}
            >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isRightNetwork ? 'bg-green-400 shadow-[0_0_6px_#4ade80]' : 'bg-orange-400 animate-pulse'}`} />
                <span className="font-mono text-xs font-medium">{shortAddress}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">{chainName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-0 top-full mt-2 w-72 z-50 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className={`p-4 border-b border-border ${isRightNetwork ? 'bg-accent/5' : 'bg-orange-500/5'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {isRightNetwork
                                        ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        : <AlertTriangle className="w-4 h-4 text-orange-400" />
                                    }
                                    <span className={`text-sm font-semibold ${isRightNetwork ? 'text-green-500' : 'text-orange-400'}`}>
                                        {isRightNetwork ? 'Connected' : 'Wrong Network'}
                                    </span>
                                    <span className="ml-auto text-xs text-muted-foreground">{chainName}</span>
                                </div>
                                <p className="text-xs font-mono text-muted-foreground truncate">{address}</p>
                                {balance && <p className="text-xs text-muted-foreground mt-0.5">{balance} ETH</p>}
                            </div>

                            {/* Actions */}
                            <div className="p-2 space-y-0.5">
                                <button onClick={copyAddress} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                                    {copied ? 'Copied!' : 'Copy Address'}
                                </button>

                                {chainId !== 31337 && (
                                    <button onClick={() => { switchToHardhat(); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                                        <ExternalLink className="w-4 h-4 text-accent" />
                                        Switch to Hardhat Local
                                    </button>
                                )}
                                {chainId !== 11155111 && (
                                    <button onClick={() => { switchToSepolia(); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                                        <ExternalLink className="w-4 h-4 text-blue-400" />
                                        Switch to Sepolia
                                    </button>
                                )}

                                <div className="border-t border-border my-1" />
                                <button onClick={() => { disconnect(); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Disconnect
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
