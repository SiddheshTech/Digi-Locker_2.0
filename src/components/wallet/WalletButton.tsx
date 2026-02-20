/**
 * components/wallet/WalletButton.tsx
 * MetaMask connect / disconnect button with status badge
 */
import { useState } from 'react';
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../../context/WalletContext';

interface WalletButtonProps {
    compact?: boolean;
}

export default function WalletButton({ compact = false }: WalletButtonProps) {
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
            <div className="flex flex-col gap-1">
                <button
                    onClick={connect}
                    disabled={isConnecting}
                    className={`flex items-center gap-2 font-semibold rounded-xl transition-all duration-200
                        bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
                        text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-60
                        ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
                >
                    <Wallet size={compact ? 14 : 16} className={isConnecting ? 'animate-pulse' : ''} />
                    {isConnecting ? 'Connecting...' : compact ? 'Connect' : 'Connect MetaMask'}
                </button>
                {error && (
                    <p className="text-xs text-red-400 max-w-[200px] leading-tight flex items-center gap-1">
                        <AlertTriangle size={12} /> {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 rounded-xl border transition-all duration-200
                    ${isRightNetwork
                        ? 'bg-gray-800/80 border-green-500/30 hover:border-green-400/50'
                        : 'bg-gray-800/80 border-orange-500/40 hover:border-orange-400/60'
                    }
                    text-white backdrop-blur-sm
                    ${compact ? 'px-2.5 py-1.5 text-xs gap-1.5' : 'px-3 py-2 text-sm'}`}
            >
                {/* Status dot */}
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isRightNetwork ? 'bg-green-400 shadow-[0_0_6px_#4ade80]' : 'bg-orange-400 animate-pulse'}`} />

                {/* Address */}
                <span className="font-mono font-medium">{shortAddress}</span>

                {/* Chain badge (only when not compact) */}
                {!compact && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${isRightNetwork ? 'bg-green-500/15 text-green-400' : 'bg-orange-500/15 text-orange-400'}`}>
                        {chainName}
                    </span>
                )}

                <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-72 z-50 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className={`p-4 border-b border-gray-800 ${isRightNetwork ? 'bg-green-500/5' : 'bg-orange-500/5'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {isRightNetwork
                                        ? <CheckCircle2 size={16} className="text-green-400" />
                                        : <AlertTriangle size={16} className="text-orange-400" />
                                    }
                                    <span className={`text-sm font-semibold ${isRightNetwork ? 'text-green-400' : 'text-orange-400'}`}>
                                        {isRightNetwork ? 'Connected' : 'Wrong Network'}
                                    </span>
                                    <span className="ml-auto text-xs text-gray-500">{chainName}</span>
                                </div>
                                <p className="text-xs font-mono text-gray-400 truncate">{address}</p>
                                {balance && (
                                    <p className="text-xs text-gray-500 mt-0.5">{balance} ETH</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-2 space-y-1">
                                <button onClick={copyAddress} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                    {copied ? <CheckCircle2 size={15} className="text-green-400" /> : <Copy size={15} />}
                                    {copied ? 'Copied!' : 'Copy Address'}
                                </button>

                                {chainId !== 31337 && (
                                    <button onClick={() => { switchToHardhat(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                        <ExternalLink size={15} className="text-purple-400" />
                                        Switch to Hardhat Local
                                    </button>
                                )}

                                {chainId !== 11155111 && (
                                    <button onClick={() => { switchToSepolia(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                        <ExternalLink size={15} className="text-blue-400" />
                                        Switch to Sepolia Testnet
                                    </button>
                                )}

                                <div className="border-t border-gray-800 my-1" />

                                <button onClick={() => { disconnect(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <LogOut size={15} />
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
