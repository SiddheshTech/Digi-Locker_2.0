import { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, RefreshCw, ShieldCheck, Loader2 } from 'lucide-react';

interface KeyInfo {
    address: string;
    balance: string;
    network: string;
    provider: string;
}

export default function KeyManagement() {
    const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchKeyInfo = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/keys/info');
            setKeyInfo(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRotate = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/keys/rotate');
            alert('Key rotation simulated successfully');
            fetchKeyInfo();
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            alert('Error: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeyInfo();
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Key Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Wallet className="text-purple-400" /> Current Wallet
                    </h3>
                    {keyInfo ? (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Address</label>
                                <p className="text-mono text-gray-300 break-all">{keyInfo.address}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Network</label>
                                <p className="text-gray-300">{keyInfo.network}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Balance</label>
                                <p className="text-gray-300">{keyInfo.balance} ETH</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-24 flex items-center justify-center text-gray-500">Loading wallet info...</div>
                    )}
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-center items-center text-center">
                    <ShieldCheck className="text-green-500 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-white mb-2">Security Status</h3>
                    <p className="text-gray-400 text-sm mb-6">Your keys are managed securely. Periodic rotation is recommended.</p>
                    <button
                        onClick={handleRotate}
                        disabled={loading}
                        className="btn btn-secondary border border-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                        Rotate Keys (Simulated)
                    </button>
                </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl flex gap-4 items-start">
                <ShieldCheck className="text-orange-400 shrink-0 mt-1" />
                <div>
                    <h4 className="text-orange-400 font-bold mb-1">Multi-Signature (Coming Soon)</h4>
                    <p className="text-sm text-gray-400">
                        Future updates will enforce M-of-N signatures for critical actions like Revocation and Key Rotation.
                    </p>
                </div>
            </div>
        </div>
    );
}
