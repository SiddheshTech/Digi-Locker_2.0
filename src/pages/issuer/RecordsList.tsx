import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Search, Trash2, QrCode, Download, Loader2, X } from 'lucide-react';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';

interface Record {
    id: string;
    payload: {
        studentName: string;
        rollNo: string;
        degree: string;
    };
    issuedAt: string;
    status: string;
    revoked: boolean;
}

interface QRData {
    qrDataUrl: string;
    verificationUrl: string;
}

export default function RecordsList() {
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Revoke Modal
    const [revokeId, setRevokeId] = useState<string | null>(null);
    const [revokeReason, setRevokeReason] = useState('');
    const [revoking, setRevoking] = useState(false);

    // QR Modal
    const [qrData, setQrData] = useState<QRData | null>(null);

    const fetchRecords = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/records', {
                params: { search, status: statusFilter }
            });
            setRecords(res.data.results);
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    const handleRevoke = async () => {
        if (!revokeId || !revokeReason) return;
        setRevoking(true);
        try {
            if (!window.ethereum) throw new Error('MetaMask not found');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(`Revoke credential ${revokeId} for reason: ${revokeReason}`);

            await axios.post(`http://localhost:5000/api/records/${revokeId}/revoke`, {
                reason: revokeReason,
                signature
            });

            alert('Credential Revoked Successfully');
            setRevokeId(null);
            setRevokeReason('');
            fetchRecords();
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            alert('Revocation Failed: ' + errorMessage);
        } finally {
            setRevoking(false);
        }
    };

    const handleViewQR = async (id: string) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/records/${id}/qr`);
            setQrData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Issued Records</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, roll no..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg outline-none"
                    value={statusFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="issued">Issued</option>
                    <option value="revoked">Revoked</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Degree</th>
                            <th className="px-6 py-4">Issued At</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading records...</td></tr>
                        ) : records.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No records found.</td></tr>
                        ) : (
                            records.map((rec) => (
                                <tr key={rec.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium">{rec.payload.studentName}</div>
                                        <div className="text-xs text-gray-500">{rec.payload.rollNo}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{rec.payload.degree}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{new Date(rec.issuedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full border ${rec.status === 'revoked' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            'bg-green-500/10 text-green-400 border-green-500/20'
                                            }`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleViewQR(rec.id)} className="p-2 hover:bg-gray-600 rounded-lg text-blue-400" title="View QR">
                                            <QrCode size={18} />
                                        </button>
                                        {!rec.revoked && (
                                            <button onClick={() => setRevokeId(rec.id)} className="p-2 hover:bg-gray-600 rounded-lg text-red-400" title="Revoke">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Revoke Modal */}
            <AnimatePresence>
                {revokeId && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-800 p-6 rounded-xl border border-red-500/30 w-full max-w-md"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Revoke Credential</h3>
                            <p className="text-gray-400 text-sm mb-4">This action cannot be undone. Please provide a reason.</p>
                            <textarea
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3 mb-4 h-24"
                                placeholder="Reason for revocation..."
                                value={revokeReason}
                                onChange={(e) => setRevokeReason(e.target.value)}
                            ></textarea>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setRevokeId(null)} className="px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
                                <button onClick={handleRevoke} disabled={revoking || !revokeReason} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2">
                                    {revoking && <Loader2 className="animate-spin" size={16} />} Revoke & Sign
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* QR Modal */}
            <AnimatePresence>
                {qrData && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-sm text-center"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white">Verification QR</h3>
                                <button onClick={() => setQrData(null)}><X className="text-gray-400 hover:text-white" /></button>
                            </div>
                            <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <img src={qrData.qrDataUrl} alt="QR Code" className="w-48 h-48" />
                            </div>
                            <p className="text-xs text-gray-500 mb-4 break-all">{qrData.verificationUrl}</p>
                            <a href={qrData.qrDataUrl} download="qr.png" className="w-full flex items-center justify-center gap-2 btn btn-primary py-2 rounded-lg">
                                <Download size={16} /> Download Image
                            </a>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
