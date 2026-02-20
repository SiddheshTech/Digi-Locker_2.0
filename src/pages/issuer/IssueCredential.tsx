import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { Upload, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnomalyWarning {
    reason: string;
}

interface PreviewData {
    payload: Record<string, unknown>;
    payloadHash: string;
    canonical: string;
    onChainPreview: Record<string, unknown>;
    anomalyWarnings: AnomalyWarning[];
}

interface ResultData {
    txHash: string;
    credentialId: string;
    verificationUrl: string;
    qrDataUrl: string;
}

interface FormState {
    studentName: string;
    rollNo: string;
    degree: string;
    year: string;
    serialNo?: string;
}

export default function IssueCredential() {
    const [form, setForm] = useState<FormState>({ studentName: '', rollNo: '', degree: '', year: '', serialNo: '' });
    const [fileHash, setFileHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Form, 2: Preview, 3: Success
    const [previewData, setPreviewData] = useState<PreviewData | null>(null);
    const [result, setResult] = useState<ResultData | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const binary = evt.target?.result;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const wordArray = CryptoJS.lib.WordArray.create(binary as any);
                const hash = CryptoJS.SHA256(wordArray).toString();
                setFileHash(hash);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handlePrepare = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/issue/prepare', { ...form, fileHash: fileHash || 'no-file-hash' });
            setPreviewData(res.data);
            setStep(2);
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

    const handleFinalize = async () => {
        if (!previewData) return;
        setLoading(true);
        try {
            if (!window.ethereum) throw new Error('MetaMask not found');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(ethers.getBytes(previewData.payloadHash));

            const res = await axios.post('http://localhost:5000/api/issue/finalize', {
                payload: previewData.payload,
                payloadHash: previewData.payloadHash,
                signature
            });

            setResult(res.data);
            setStep(3);
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

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Issue New Credential</h1>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handlePrepare}
                        className="space-y-6 bg-gray-800 p-8 rounded-xl border border-gray-700"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Student Name</label>
                                <input type="text" required className="form-input w-full bg-gray-900 border-gray-700 text-white rounded-lg px-4 py-2"
                                    value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Roll Number</label>
                                <input type="text" required className="form-input w-full bg-gray-900 border-gray-700 text-white rounded-lg px-4 py-2"
                                    value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Degree / Certificate</label>
                                <input type="text" required className="form-input w-full bg-gray-900 border-gray-700 text-white rounded-lg px-4 py-2"
                                    value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Year of Passing</label>
                                <input type="text" required className="form-input w-full bg-gray-900 border-gray-700 text-white rounded-lg px-4 py-2"
                                    value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Document File (Optional)</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400">
                                        {fileHash ? 'File hashed successfully' : 'Click to upload or drag and drop'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFile} />
                            </label>
                            {fileHash && <p className="text-xs text-green-400 mt-2 font-mono break-all">Hash: {fileHash}</p>}
                        </div>

                        <button type="submit" disabled={loading} className="w-full btn btn-primary py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Review & Sign'}
                        </button>
                    </motion.form>
                )}

                {step === 2 && previewData && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-6"
                    >
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <CheckCircle className="text-green-400" />
                            Confirm Issuance
                        </h2>

                        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-2">
                            <p><span className="text-purple-400">Payload Hash:</span> {previewData.payloadHash}</p>
                            <p><span className="text-purple-400">Canonical:</span> {previewData.canonical}</p>
                        </div>

                        {previewData.anomalyWarnings?.length > 0 && (
                            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="text-orange-400 shrink-0" />
                                <div>
                                    <h4 className="text-orange-400 font-bold text-sm">Anomaly Detected</h4>
                                    <ul className="list-disc list-inside text-sm text-orange-200 mt-1">
                                        {previewData.anomalyWarnings.map((w, i) => <li key={i}>{w.reason}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="flex-1 btn btn-ghost border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg py-2">Back</button>
                            <button onClick={handleFinalize} disabled={loading} className="flex-1 btn btn-primary bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 flex justify-center items-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : 'Sign with MetaMask'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800 p-8 rounded-xl border border-green-500/30 text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Issuance Successful!</h2>
                        <p className="text-gray-400">The credential has been anchored on-chain.</p>

                        <div className="bg-gray-900 p-4 rounded-lg text-left space-y-2">
                            <p className="text-sm"><span className="text-gray-500">Tx Hash:</span> <a href="#" className="text-blue-400 hover:underline">{result.txHash}</a></p>
                            <p className="text-sm"><span className="text-gray-500">Credential ID:</span> <span className="text-white font-mono">{result.credentialId}</span></p>
                            <p className="text-sm"><span className="text-gray-500">Verification URL:</span> <a href={result.verificationUrl} target="_blank" className="text-blue-400 hover:underline">{result.verificationUrl}</a></p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={() => { setStep(1); setForm({ studentName: '', rollNo: '', degree: '', year: '', serialNo: '' }); setFileHash(''); setResult(null); }} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                                Issue Another
                            </button>
                            <a href={result.qrDataUrl} download="credential-qr.png" className="px-6 py-2 border border-gray-600 hover:bg-gray-700 text-white rounded-lg">
                                Download QR
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
