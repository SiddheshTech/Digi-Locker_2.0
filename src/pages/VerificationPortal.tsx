import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import './VerificationPortal.css';

export default function VerificationPortal() {
    const [credentialId, setCredentialId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<'success' | 'error' | null>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Mock validation logic
            if (credentialId.length > 5) {
                setResult('success');
            } else {
                setResult('error');
            }
        }, 2000);
    };

    return (
        <div className="verification-page">
            <div className="container min-h-screen pt-32 pb-20 flex flex-col items-center">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="section-label mx-auto mb-4"><ShieldCheck size={12} /> Public Verification</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Verify a <span className="text-gradient">Credential</span></h1>
                    <p className="text-secondary text-lg">Enter the unique Credential ID or upload a JSON file to verify its authenticity against the blockchain ledger.</p>
                </motion.div>

                <motion.div
                    className="verification-card card p-8 w-full max-w-xl border-t-4 border-t-primary-500"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleVerify} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    className="form-input pl-12"
                                    placeholder="e.g. b64-a9c-2f1-88d"
                                    value={credentialId}
                                    onChange={(e) => setCredentialId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Now'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <a href="#" className="underline hover:text-white">Upload JSON File</a> instead
                    </div>
                </motion.div>

                {/* Results Area */}
                {result === 'success' && (
                    <motion.div
                        className="mt-8 bg-green-900/20 border border-green-500/30 rounded-xl p-6 w-full max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Valid Credential</h3>
                                <p className="text-green-200/70 text-sm mb-4">This credential was issued by a verified institution and has not been revoked.</p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase">Issued To</span>
                                        <span className="text-white font-medium">John Doe</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase">Issue Date</span>
                                        <span className="text-white font-medium">May 20, 2024</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase">Issuer</span>
                                        <span className="text-white font-medium">University of Tech</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase">Course</span>
                                        <span className="text-white font-medium">B.Sc. Computer Science</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {result === 'error' && (
                    <motion.div
                        className="mt-8 bg-red-900/20 border border-red-500/30 rounded-xl p-6 w-full max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-red-500/20 p-3 rounded-full text-red-400">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Invalid ID</h3>
                                <p className="text-red-200/70 text-sm">We could not find a credential with this ID on the blockchain. Please check the ID and try again.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
