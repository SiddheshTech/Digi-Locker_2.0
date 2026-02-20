import { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentData {
    rollNo: string;
    studentName: string;
    payloadHash: string;
}

interface BatchResult {
    studentCount: number;
    batchId: string;
    merkleRoot: string;
    txHash: string;
    students: StudentData[];
}

export default function BatchIssue() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<BatchResult | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/issue/batch', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (err: unknown) { // Changed from any to unknown for better type safety
            let errorMessage = 'An unknown error occurred.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            alert('Batch Upload Failed: ' + errorMessage);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Batch Issuance (CSV)</h1>

            {!result ? (
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
                    <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload size={32} className="text-purple-400" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">Upload Student CSV</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                        CSV Format: <code className="bg-gray-900 px-2 py-1 rounded text-purple-300">studentName, rollNo, degree, year, serialNo</code>
                    </p>

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFile}
                        className="block w-full text-sm text-gray-400
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-500/10 file:text-purple-400
                            hover:file:bg-purple-500/20 mb-4 cursor-pointer"
                    />

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="btn btn-primary px-8 py-3 rounded-lg flex items-center gap-2 mx-auto disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="animate-spin" /> : 'Process Batch'}
                    </button>

                    {uploading && <p className="text-xs text-gray-500 mt-4 animate-pulse">Generating Merkle Tree & Anchoring on-chain...</p>}
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 p-8 rounded-xl border border-green-500/30">
                    <div className="flex items-center gap-4 mb-6">
                        <CheckCircle size={32} className="text-green-400" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Batch Processed Successfully!</h2>
                            <p className="text-sm text-gray-400">{result.studentCount} credentials processed.</p>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg space-y-3 font-mono text-sm border border-gray-700">
                        <p><span className="text-gray-500">Batch ID:</span> {result.batchId}</p>
                        <p><span className="text-gray-500">Merkle Root:</span> <span className="text-purple-400 break-all">{result.merkleRoot}</span></p>
                        <p><span className="text-gray-500">Tx Hash:</span> <span className="text-blue-400 break-all">{result.txHash}</span></p>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-8 mb-4">Processed Records</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-gray-500 border-b border-gray-700">
                                <tr>
                                    <th className="pb-2">Roll No</th>
                                    <th className="pb-2">Name</th>
                                    <th className="pb-2">Payload Hash</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 text-gray-300">
                                {result.students.map((s, i) => (
                                    <tr key={i}>
                                        <td className="py-2">{s.rollNo}</td>
                                        <td className="py-2">{s.studentName}</td>
                                        <td className="py-2 font-mono text-xs text-gray-500 truncate max-w-xs">{s.payloadHash}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button onClick={() => { setResult(null); setFile(null); }} className="mt-8 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
                        Process Another Batch
                    </button>
                </motion.div>
            )}
        </div>
    );
}
