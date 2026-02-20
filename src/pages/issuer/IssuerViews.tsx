import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Plus, FileText, Download, Filter,
    Upload, Search, ShieldCheck, AlertCircle,
    Trash2, Copy, ChevronRight,
    Database, Globe,
    Activity, ArrowUpRight, ArrowDownRight,
    Lock, BarChart3, Fingerprint,
    CircleDashed, Scan, ShieldAlert, Users
} from 'lucide-react';

// --- Mocks Data ---
const mockRecords = [
    { id: 'REC-9012', name: 'Bachelor of Arts', recipient: 'Alice Thorne', date: '2026-02-18', status: 'Issued', hash: '0x3a2...f8d1', verified: 14 },
    { id: 'REC-9011', name: 'M.Sc. Physics', recipient: 'Bob Vance', date: '2026-02-15', status: 'Revoked', hash: '0x7b4...a221', verified: 0 },
    { id: 'REC-9010', name: 'MBA General', recipient: 'Charlie Day', date: '2026-02-14', status: 'Issued', hash: '0x9e1...c440', verified: 42 },
];

const mockAlerts = [
    { id: 1, type: 'Velocity Anomaly', detail: '142 B.Tech degrees issued in 3 minutes (Avg: 2/min)', confidence: 94, risk: 'High', time: '10m ago' },
    { id: 2, type: 'Hash Conflict', detail: 'Hash e3b0c... exists in 2 different credentials (CID-901 vs CID-112)', confidence: 99, risk: 'Critical', time: '2h ago' },
    { id: 3, type: 'Geographic Drift', detail: 'Login from unauthorized region (Eastern Europe VPN) with high-tier private key.', confidence: 78, risk: 'Medium', time: '5h ago' },
];

// --- Sub-Components ---

const PremiumStatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
    <motion.div
        className="issuer-card relative overflow-hidden group"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-${color}-500/20 transition-all`} />

        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
                <Icon size={18} />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {change}
            </div>
        </div>

        <span className="text-secondary text-[11px] uppercase tracking-wider font-bold opacity-70">{title}</span>
        <div className="text-2xl font-black text-white mt-1 tabular-nums">{value}</div>
    </motion.div>
);

// --- Primary Views ---

export const IssuerOverview = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-white tracking-tight">Institutional Dashboard</h1>
                    <p className="issuer-subtitle">Real-time cryptographic telemetry and issuance analytics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="dash-btn-ghost text-xs"><Download size={14} /> Export Dataset</button>
                    <Link to="/issuer/issue" className="dash-btn-primary text-xs h-9"><Plus size={14} /> New Issuance</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <PremiumStatCard title="Total Certificates" value="12,450" change="+12.4%" trend="up" icon={FileText} color="indigo" />
                <PremiumStatCard title="Unique Students" value="8,320" change="+5.2%" trend="up" icon={Users} color="purple" />
                <PremiumStatCard title="Verifications" value="2,841" change="+8.1%" trend="up" icon={Scan} color="sky" />
                <PremiumStatCard title="Risk Score" value="0.04" change="-0.01" trend="down" icon={ShieldAlert} color="emerald" />
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                    <div className="issuer-card flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                <Activity size={14} className="text-primary-400" />
                                Live Network Propagation
                            </h3>
                            <div className="flex gap-4 text-[10px] font-bold text-secondary uppercase">
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Issuance</span>
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verification</span>
                            </div>
                        </div>
                        <div className="h-48 w-full flex items-end justify-between gap-1 px-2">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-full bg-primary-500/20 rounded-t-sm relative group"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${20 + Math.random() * 80}%` }}
                                    transition={{ delay: i * 0.02, duration: 1 }}
                                >
                                    <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="issuer-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-sm">Recent Ledger Entries</h3>
                            <Link to="/issuer/records" className="text-[11px] text-primary-400 font-bold hover:underline">View Audit Log</Link>
                        </div>
                        <div className="dash-table-wrapper">
                            <table className="dash-table">
                                <thead className="text-[10px]">
                                    <tr>
                                        <th>Student</th>
                                        <th>Credential</th>
                                        <th>Status</th>
                                        <th>Network Hash</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {mockRecords.map((rec, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="font-bold">{rec.recipient}</td>
                                            <td className="text-secondary">{rec.name}</td>
                                            <td>
                                                <span className={`status-badge ${rec.status.toLowerCase()}`}>
                                                    <div className={`w-1 h-1 rounded-full bg-current`} />
                                                    {rec.status}
                                                </span>
                                            </td>
                                            <td className="font-mono text-[10px] text-primary-400/50">{rec.hash}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="issuer-card border-rose-500/20 bg-rose-500/5">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldAlert size={16} className="text-rose-500" />
                            <h3 className="text-white font-bold text-sm">Security Command Center</h3>
                        </div>
                        <div className="space-y-3">
                            {mockAlerts.slice(0, 2).map((alert) => (
                                <div key={alert.id} className="p-3 rounded-lg bg-black/40 border border-white/5 group hover:border-rose-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[11px] font-black text-rose-400 uppercase tracking-tighter">{alert.type}</span>
                                        <span className="text-[9px] text-secondary">{alert.time}</span>
                                    </div>
                                    <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed">{alert.detail}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/issuer/alerts" className="block text-center text-[10px] font-bold text-primary-400 mt-4 hover:underline">Full Risk Assessment</Link>
                    </div>

                    <div className="issuer-card">
                        <h3 className="text-white font-bold text-sm mb-4">Cryptographic Nodes</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Ethereum Mainnet', status: 'In Sync', delay: '12ms', color: 'emerald' },
                                { name: 'Polygon PoS', status: 'Healthy', delay: '8ms', color: 'emerald' },
                                { name: 'IPFS Cluster', status: 'Maintenance', delay: '240ms', color: 'amber' },
                            ].map((node, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-${node.color}-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                                        <span className="text-xs text-secondary">{node.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold text-${node.color}-400`}>{node.delay}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const IssueCredential = () => {
    const [isIssuing, setIsIssuing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [step] = useState(1);

    const handleIssue = () => {
        setIsIssuing(true);
        setTimeout(() => {
            setShowModal(true);
            setIsIssuing(false);
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto py-4">
            <div className="mb-8 text-center max-w-2xl mx-auto">
                <h1 className="text-2xl font-black text-white tracking-tighter">Credential Foundry</h1>
                <p className="issuer-subtitle">Transform academic excellence into immutable blockchain assets.</p>

                <div className="flex items-center justify-center gap-4 mt-6">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= s ? 'bg-primary-500 text-white' : 'bg-white/10 text-secondary'}`}>
                                {s}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-primary-400' : 'text-secondary'}`}>
                                {s === 1 ? 'Data Entry' : 'Encryp & Anchor'}
                            </span>
                            {s === 1 && <div className="w-8 h-[1px] bg-white/10 mx-2" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
                <div className="col-span-12 lg:col-span-7 space-y-6">
                    <div className="issuer-card">
                        <div className="flex items-center gap-2 mb-6 p-3 bg-primary-500/5 rounded-xl border border-primary-500/10">
                            <div className="p-2 bg-primary-500/10 text-primary-400 rounded-lg"><Database size={16} /></div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-tighter">Academic Metadata</h4>
                                <p className="text-[10px] text-secondary">Inputs will be canonicalized before hashing.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Student Full Name</label>
                                <input type="text" className="issuer-input" placeholder="e.g. Maximilian Thorne" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Roll Number</label>
                                <input type="text" className="issuer-input" placeholder="UNI-BK-2024-042" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-secondary uppercase tracking-widest">GPA / Grade</label>
                                <input type="text" className="issuer-input" placeholder="3.92 / 4.0" />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Degree Program</label>
                                <select className="issuer-input">
                                    <option>B.Sc. in Blockchain Engineering</option>
                                    <option>M.S. in Cryptography</option>
                                    <option>Professional Cert: Web3 Security</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 dash-btn-ghost h-11 text-xs font-bold">Save Draft</button>
                            <button
                                onClick={handleIssue}
                                disabled={isIssuing}
                                className="flex-[2] btn btn-primary h-11 text-xs font-black tracking-widest uppercase overflow-hidden relative"
                            >
                                {isIssuing ? (
                                    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-2 font-mono">
                                        <CircleDashed size={16} className="animate-spin" /> CANONICALIZING...
                                    </motion.div>
                                ) : (
                                    <>Generate On-Chain Proof</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <div className="issuer-card border-dashed p-10 flex flex-col items-center group cursor-pointer hover:bg-primary-500/[0.02]">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full scale-150 group-hover:scale-200 transition-transform" />
                            <div className="relative w-20 h-20 bg-primary-900/40 rounded-3xl border border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:rotate-6 transition-transform">
                                <Upload size={32} />
                            </div>
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-tighter mb-1">Source Certificate</h3>
                        <p className="text-[10px] text-secondary text-center max-w-[200px] leading-relaxed">Drag original PDF/JSON to generate verifiable binding.</p>
                        <div className="mt-6 px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold text-secondary border border-white/5">
                            Auto-calculating SHA-256...
                        </div>
                    </div>

                    <div className="issuer-card bg-black/60 border-primary-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Crypto Preview</span>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-primary-500" />
                                <div className="w-1 h-1 rounded-full bg-primary-500 opacity-50" />
                                <div className="w-1 h-1 rounded-full bg-primary-500 opacity-20" />
                            </div>
                        </div>
                        <div className="p-4 bg-black rounded-lg border border-white/5 font-mono text-[10px] text-emerald-400/80 leading-loose break-all">
                            <span className="text-secondary tracking-widest">HASH:</span> 7e92b8c...f2d4<br />
                            <span className="text-secondary tracking-widest">NONCE:</span> 0x8a1...<br />
                            <span className="text-secondary tracking-widest">SCHEMA:</span> DL-V2-CORE
                        </div>
                    </div>
                </div>
            </div>

            {/* Anchoring Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)} />
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="issuer-card w-full max-w-lg relative z-10 border-primary-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[100px] -mr-32 -mt-32" />

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary-500/30 group active-glow">
                                    <ShieldCheck size={32} className="text-primary-400" />
                                </div>
                                <h3 className="text-xl font-black text-white tracking-tighter uppercase mb-2">Blockchain Finalization</h3>
                                <p className="text-secondary text-[11px] font-medium leading-relaxed px-12">Confirm the cryptographic root from <strong>Digi-Signature Node A</strong>. This record will be immutable.</p>
                            </div>

                            <div className="space-y-2 mb-8">
                                {[
                                    { label: 'Issuer Identity', value: 'INST_DL_071 (Authorized)', type: 'default' },
                                    { label: 'Merkle Proof', value: '0x8f2a...d1c4', type: 'mono' },
                                    { label: 'Blockchain', value: 'Ethereum Sepolia Testnet', type: 'default' },
                                    { label: 'Payload Tags', value: 'AcademicRecord, V2_Standard', type: 'mono' },
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{row.label}</span>
                                        <span className={`text-[11px] font-bold ${row.type === 'mono' ? 'font-mono text-primary-400' : 'text-white'}`}>{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 p-2 bg-black/40 rounded-2xl border border-white/5">
                                <button className="flex-1 dash-btn-ghost h-12 text-xs font-bold" onClick={() => setShowModal(false)}>Recalibrate</button>
                                <button className="flex-[2] btn btn-primary h-12 text-xs font-black tracking-widest" onClick={() => {
                                    alert('TRANSACTION SUBMITTED: TXID 0x4f2...7d81');
                                    setShowModal(false);
                                }}>Confirm & Broadcast</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const RecordsList = () => {
    const [viewingVC, setViewingVC] = useState<any>(null);
    const [isJSON, setIsJSON] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-white tracking-tighter">Issuance Ledger</h1>
                    <p className="issuer-subtitle">Audit every verifiable asset registered by this institution.</p>
                </div>
                <div className="flex gap-2">
                    <div className="dash-search group">
                        <Search size={14} className="group-focus-within:text-primary-400 transition-colors" />
                        <input type="text" placeholder="Search hash, name, ID..." className="text-xs h-9 w-64 bg-black/40 border border-white/5" />
                    </div>
                    <button className="dash-btn-ghost h-9 text-xs"><Filter size={14} /> Filter</button>
                </div>
            </div>

            <div className="issuer-card p-0 overflow-hidden border-white/5">
                <div className="dash-table-wrapper">
                    <table className="dash-table">
                        <thead className="bg-black/20 text-[10px] uppercase font-black tracking-widest">
                            <tr>
                                <th className="pl-8 py-5">Recipient Identity</th>
                                <th>Credential Class</th>
                                <th>Issued On</th>
                                <th>Verifications</th>
                                <th>Status</th>
                                <th className="pr-8 text-right">Vault Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-medium">
                            {mockRecords.map((rec, i) => (
                                <tr key={i} className="group hover:bg-white/[0.02] border-b border-white/[0.02] last:border-0 transition-colors">
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 font-black text-[10px]">
                                                {rec.recipient[0]}
                                            </div>
                                            <span className="text-white font-bold">{rec.recipient}</span>
                                        </div>
                                    </td>
                                    <td className="text-secondary font-bold">{rec.name}</td>
                                    <td className="text-secondary opacity-60 tabular-nums">{rec.date}</td>
                                    <td className="tabular-nums font-black text-primary-400">{rec.verified} Hits</td>
                                    <td>
                                        <span className={`status-badge ${rec.status.toLowerCase()}`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setViewingVC(rec)} className="p-2 hover:bg-primary-500/10 rounded-lg text-primary-500" title="Inspect VC Payload"><Scan size={14} /></button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-secondary" title="View Ledger Explorer"><Globe size={14} /></button>
                                            <button className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500" title="Revoke Certificate"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* VC Preview - High Impact UI */}
            <AnimatePresence>
                {viewingVC && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setViewingVC(null)} />
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
                            className="issuer-card w-full max-w-4xl relative z-10 border-white/5 bg-[#080c14] overflow-hidden"
                        >
                            <div className="flex h-[600px]">
                                <div className="flex-1 p-8 overflow-y-auto border-r border-white/5">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={18} className="text-primary-500" />
                                            <h3 className="text-lg font-black text-white uppercase tracking-tighter">W3C VC INSPECTOR</h3>
                                        </div>
                                        <button
                                            onClick={() => setIsJSON(!isJSON)}
                                            className="px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 text-[10px] font-black text-primary-400 rounded-lg uppercase tracking-widest hover:bg-primary-500/20 transition-all"
                                        >
                                            {isJSON ? 'Visual View' : 'Raw Data (JSON-LD)'}
                                        </button>
                                    </div>

                                    {isJSON ? (
                                        <div className="vc-json-preview scrollbar-hide">
                                            <pre>{JSON.stringify({
                                                "@context": ["https://www.w3.org/2018/credentials/v1"],
                                                "id": `urn:uuid:${viewingVC.id}`,
                                                "type": ["VerifiableCredential"],
                                                "issuer": "did:dl:0x71C...",
                                                "issuanceDate": viewingVC.date,
                                                "credentialSubject": {
                                                    "id": `did:ethr:${viewingVC.recipient.replace(' ', '.')}`,
                                                    "name": viewingVC.name
                                                },
                                                "proof": {
                                                    "type": "EcdsaSecp256k1Signature2019",
                                                    "jws": "eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJ..."
                                                }
                                            }, null, 2)}</pre>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest block mb-1.5">Recipient DID</span>
                                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 font-mono text-[10px] text-primary-400 truncate">
                                                        did:dl:user:0x892...f2d4
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest block mb-1.5">Issuance Level</span>
                                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 font-bold text-xs text-white">
                                                        Level 3 (Academic Core)
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="issuer-card bg-emerald-500/[0.02] border-emerald-500/10 p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><ShieldCheck size={12} /></div>
                                                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Verification Passed</span>
                                                </div>
                                                <p className="text-[10px] text-secondary leading-relaxed">Proof generated using ECDSA on Secp256k1. Verified on-chain via smart contract v2.1.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black text-white uppercase tracking-tighter">Subject Metadata</h4>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {Object.entries({ Program: viewingVC.name, Status: viewingVC.status, GlobalID: viewingVC.id }).map(([k, v]) => (
                                                        <div key={k} className="p-3 bg-white/[0.02] rounded-lg border border-white/5">
                                                            <div className="text-[9px] text-secondary font-bold uppercase mb-1">{k}</div>
                                                            <div className="text-[10px] text-white font-bold">{v}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="w-[320px] bg-white p-8 flex flex-col items-center justify-center text-slate-800">
                                    <div className="text-[8px] font-black text-blue-600/30 uppercase tracking-[0.3em] mb-8 rotate-90 absolute -right-8 top-1/2 -translate-y-1/2">
                                        W3C COMPLIANT CREDENTIAL
                                    </div>
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-4 shadow-xl">DA</div>
                                    <h4 className="text-center font-black text-sm uppercase tracking-tight mb-8">DigiLocker Academy</h4>

                                    <div className="w-full space-y-6 pt-6 border-t border-slate-100">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Holder</p>
                                            <p className="font-black text-lg truncate">{viewingVC.recipient}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Achievement</p>
                                            <p className="font-bold text-xs text-blue-700 leading-snug">{viewingVC.name}</p>
                                        </div>
                                        <div className="pt-8 flex justify-between items-end">
                                            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-1.5 opacity-40">
                                                <div className="w-full h-full bg-slate-200 rounded-sm" />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Valid Since</p>
                                                <p className="font-black text-xs">{viewingVC.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setViewingVC(null)} className="mt-auto text-[10px] font-black text-slate-300 hover:text-slate-500 transition-colors">CLOSE INSPECTOR</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const KeyManagement = () => (
    <div className="space-y-6 max-w-5xl">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-xl font-black text-white tracking-tighter">Trust Fabric Keys</h1>
                <p className="issuer-subtitle">Manage decentralized identities and signing authorities.</p>
            </div>
            <button className="dash-btn-primary h-9 text-xs font-bold"><Fingerprint size={14} /> Rotate Signing Key</button>
        </div>

        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                <div className="issuer-card relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 blur-[60px]" />
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><ShieldCheck size={20} /></div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Active DID Authority</h3>
                                <p className="text-[10px] text-secondary">Authorized to sign for Academic Sub-District 07.</p>
                            </div>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded uppercase tracking-widest">Active</span>
                    </div>

                    <div className="p-4 bg-black rounded-xl border border-white/5 font-mono text-xs text-primary-400 flex justify-between items-center group">
                        <span className="truncate">did:dl:0x71C7656EC7ab88b098defB751B7401B5f6</span>
                        <button className="p-1 hover:text-white transition-colors"><Copy size={12} /></button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                        {[
                            { label: 'Created', val: 'Oct 2025' },
                            { label: 'Expiry', val: 'Oct 2027' },
                            { label: 'Algo', val: 'Ed25519' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="text-[9px] text-secondary font-black uppercase tracking-widest mb-0.5">{s.label}</div>
                                <div className="text-[11px] text-white font-bold">{s.val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="issuer-card">
                    <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                        <Users size={14} className="text-secondary" />
                        Authorized Signers (Multi-Sig 2/3)
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Dr. Sarah Jenkins', role: 'Principal Registrar', status: 'Active', key: '0x8f2...7c1' },
                            { name: 'Blockchain Admin', role: 'IT Infrastructure', status: 'Active', key: '0x321...9a2' },
                            { name: 'University Provost', role: 'Secondary Signer', status: 'Standby', key: '0xUnknown' },
                        ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-primary-500/20 transition-all">
                                <div className="flex gap-3 items-center">
                                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-secondary group-hover:text-primary-400 transition-colors">
                                        <Lock size={14} />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-white leading-tight">{s.name}</div>
                                        <div className="text-[9px] text-secondary tracking-tight">{s.role}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] font-black text-primary-400 tracking-widest uppercase">{s.status}</div>
                                    <div className="text-[9px] font-mono text-secondary opacity-40">{s.key}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                <div className="issuer-card border-amber-500/20 bg-amber-500/5">
                    <h3 className="text-white font-bold text-sm mb-4">Cryptographic Health</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-secondary uppercase tracking-widest">Entropy Score</span>
                                <span className="text-white">99.2%</span>
                            </div>
                            <div className="h-1.5 bg-black rounded-full overflow-hidden">
                                <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={{ width: '99%' }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-secondary uppercase tracking-widest">Key Exposure Risk</span>
                                <span className="text-emerald-400">Zero</span>
                            </div>
                            <div className="h-1.5 bg-black rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[4%]" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 p-3 bg-black/40 rounded-xl border border-white/5 flex gap-3 items-start">
                        <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-secondary leading-relaxed">System recommends key rotation in <strong>142 days</strong> to maintain quantum-resistant compliance level Q3.</p>
                    </div>
                </div>

                <div className="issuer-card flex-1 p-0 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-white/5 font-bold text-xs uppercase tracking-widest text-secondary bg-black/20">Security Timeline</div>
                    <div className="p-6 space-y-4">
                        {[
                            { ev: 'Identity Anchored', time: 'Oct 12', desc: 'Mainnet registration complete.' },
                            { ev: 'Key Shared', time: 'Oct 14', desc: 'Multi-sig consensus established.' },
                            { ev: 'Audited', time: 'Nov 02', desc: 'External compliance check: PASS.' },
                        ].map((t, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                                    {i < 2 && <div className="w-[1px] h-full bg-white/10 group-last:hidden" />}
                                </div>
                                <div className="pb-4">
                                    <div className="text-[10px] font-black text-white">{t.ev} <span className="text-secondary font-bold ml-2 opacity-50">{t.time}</span></div>
                                    <p className="text-[10px] text-secondary mt-0.5">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const BatchIssue = () => {
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const startProcessing = () => {
        setIsProcessing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    return 100;
                }
                return p + 2;
            });
        }, 50);
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-white tracking-tighter">Batch Merkle Factory</h1>
                    <p className="issuer-subtitle">Anchor thousands of records with a single cryptographic root.</p>
                </div>
                <button className="dash-btn-ghost h-9 text-xs"><Download size={14} /> Batch Template.csv</button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <div className="issuer-card border-dashed p-12 text-center group cursor-pointer hover:border-primary-500/40 transition-colors">
                        <div className="w-16 h-16 bg-primary-500/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={24} className="text-primary-400" />
                        </div>
                        <h3 className="text-white font-black text-sm uppercase tracking-tighter mb-1">Source Dataset</h3>
                        <p className="text-[10px] text-secondary max-w-[200px] mx-auto mb-8">Upload CSV with student records (Max 5,000 rows).</p>
                        <button onClick={startProcessing} className="btn btn-primary btn-sm px-8 font-black tracking-widest">INGEST CLUSTER</button>
                    </div>

                    <AnimatePresence>
                        {isProcessing && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="issuer-card border-primary-500/20">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 size={14} className="text-primary-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Processing Ingest</span>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-primary-400">{progress}%</span>
                                </div>
                                <div className="h-1.5 bg-black rounded-full overflow-hidden mb-6">
                                    <motion.div className="h-full bg-primary-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] text-secondary font-bold uppercase tracking-widest">
                                        <span>Canonicalizing Rows</span>
                                        <span className="text-emerald-400">Done</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-secondary font-bold uppercase tracking-widest">
                                        <span>Hashing Leaves</span>
                                        <span className={progress > 40 ? "text-emerald-400" : "animate-pulse capitalize"}>{progress > 40 ? "Done" : "Pending"}</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-secondary font-bold uppercase tracking-widest">
                                        <span>Merkle Construction</span>
                                        <span className={progress > 90 ? "text-emerald-400" : "animate-pulse capitalize"}>{progress > 90 ? "Done" : "Pending"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="col-span-12 lg:col-span-7 flex flex-col">
                    <div className="issuer-card flex-1 bg-black/40 border-white/5 relative overflow-hidden flex flex-col p-8">
                        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div>
                                <h3 className="text-white font-black text-sm uppercase tracking-tighter">Merkle Projection</h3>
                                <p className="text-[10px] text-secondary">Cryptographic hierarchy visualizer.</p>
                            </div>
                            {progress >= 100 && (
                                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 rounded-lg animate-fade-in uppercase tracking-widest">
                                    Cluster Verified
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center gap-12 relative z-10">
                            <div className="relative group">
                                <div className={`absolute inset-0 bg-primary-500/20 blur-3xl transition-opacity ${progress >= 100 ? 'opacity-100' : 'opacity-0'}`} />
                                <div className="merkle-node bg-primary-600/20 border-primary-500/40 px-6 py-3 font-mono text-[11px] text-white tabular-nums relative active-glow">
                                    {progress >= 100 ? 'ROOT: 0x8f2a...d1c4' : 'RECOMPUTING...'}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 w-full">
                                <div className="flex justify-center gap-24 relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/10" />
                                    <div className="merkle-node text-[9px] px-3 py-1.5 opacity-60">L1_H1: 0x2e...</div>
                                    <div className="merkle-node text-[9px] px-3 py-1.5 opacity-60">L1_H2: 0x7c...</div>
                                </div>
                                <div className="flex justify-center gap-8 relative">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="merkle-node text-[8px] p-2 opacity-30 border-white/10">LEAF_{i + 1}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500/10 text-primary-400 rounded-lg"><Activity size={16} /></div>
                                <div className="text-[10px] text-secondary"><span className="text-white font-bold">142 Records</span> indexed in current cluster.</div>
                            </div>
                            <button disabled={progress < 100} className="dash-btn-primary h-9 text-xs px-6 disabled:opacity-20 transition-all">Publish Batch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TemplateManager = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-xl font-black text-white tracking-tighter">Credential Blueprints</h1>
                <p className="issuer-subtitle">Manage reusable JSON-LD schemas and visual certificate templates.</p>
            </div>
            <button className="dash-btn-primary h-9 text-xs font-bold"><Plus size={14} /> Design New Template</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
                { name: 'Engineering Degree', records: '2,481', fields: 12, risk: 'Low', color: 'indigo' },
                { name: 'Short Verification', records: '840', fields: 4, risk: 'Min', color: 'emerald' },
                { name: 'Academic Transcript', records: '1,102', fields: 24, risk: 'Med', color: 'amber' },
            ].map((t, i) => (
                <div key={i} className="issuer-card group hover:border-primary-500/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-10 h-10 bg-${t.color}-500/10 rounded-xl flex items-center justify-center text-${t.color}-400 group-hover:scale-110 transition-transform`}>
                            <FileText size={20} />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-secondary tracking-widest uppercase">Usage</span>
                            <div className="text-xs font-black text-white">{t.records}</div>
                        </div>
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-primary-400 transition-colors">{t.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] font-bold text-secondary">{t.fields} Data Fields</span>
                        <span className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] font-bold text-secondary">JSON-LD V1.1</span>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Risk Assessment: <span className={`text-${t.color}-400`}>{t.risk}</span></span>
                        <ChevronRight size={14} className="text-secondary" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const FraudAlerts = () => (
    <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-xl font-black text-white tracking-tighter">Security Command Center</h1>
                <p className="issuer-subtitle">AI-driven neural audit for issuance anomalies & fraudulent attempts.</p>
            </div>
            <div className="flex gap-2">
                <button className="dash-btn-ghost h-9 text-xs"><ShieldCheck size={14} /> Full Audit</button>
                <button className="dash-btn-primary h-9 text-xs font-bold"><Scan size={14} /> Rescan Ledger</button>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-4">
                {mockAlerts.map((alert, i) => (
                    <div key={i} className={`issuer-card flex justify-between items-center border-l-4 ${alert.risk === 'Critical' ? 'border-rose-600 bg-rose-600/5' : alert.risk === 'High' ? 'border-amber-600 bg-amber-600/5' : 'border-primary-600 bg-primary-600/5'}`}>
                        <div className="flex gap-4 items-start">
                            <div className={`p-3 rounded-xl ${alert.risk === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                <ShieldAlert size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-sm font-black text-white uppercase tracking-tighter">{alert.type}</h3>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${alert.risk === 'Critical' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                        {alert.confidence}% MATCH
                                    </span>
                                </div>
                                <p className="text-xs text-secondary leading-relaxed max-w-md">{alert.detail}</p>
                                <div className="mt-3 flex gap-4 text-[10px] font-bold text-secondary opacity-60">
                                    <span>TIMESTAMP: {alert.time}</span>
                                    <span>RISK: {alert.risk}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-bold uppercase transition-all">Dismiss</button>
                            <button className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${alert.risk === 'Critical' ? 'bg-rose-600 text-white' : 'bg-white/10 text-white'}`}>Investigate</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="issuer-card">
                    <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                        <BarChart3 size={14} className="text-primary-400" />
                        Risk Metrics
                    </h3>
                    <div className="space-y-6">
                        <div className="flex flex-col items-center py-8">
                            <div className="relative">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 * 0.9} className="text-emerald-500" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center font-black">
                                    <div className="text-2xl text-white">96%</div>
                                    <div className="text-[9px] text-secondary uppercase tracking-widest">Trust</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Auth Success Rate', val: '99.9%' },
                                { label: 'Revocation Ratio', val: '0.04%' },
                                { label: 'Neural Flag Hits', val: '3' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center text-[11px]">
                                    <span className="text-secondary font-bold uppercase tracking-widest">{s.label}</span>
                                    <span className="text-white font-black">{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="issuer-card bg-primary-500/5 border-primary-500/20 text-center py-8">
                    <ShieldCheck size={24} className="mx-auto mb-4 text-primary-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Continuous Audit</h4>
                    <p className="text-[10px] text-secondary px-6 leading-relaxed">System is performing neural scan of ledger v2.04. Every hash is verified against trust root.</p>
                </div>
            </div>
        </div>
    </div>
);
