import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Share2, Award,
    Download, ShieldCheck,
    UserCheck, Globe, Clock, Plus,
    CheckCircle2, QrCode, Zap, MapPin,
    Lock, ExternalLink
} from 'lucide-react';

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

// --- Mocks ---
const mockCredentials = [
    { id: 'VC-101', type: 'Bachelor of Technology', issuer: 'Global City University', date: 'June 2024', status: 'Active' },
    { id: 'VC-102', type: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: 'Jan 2024', status: 'Active' },
    { id: 'VC-103', type: 'Internship Excellence', issuer: 'TechCorp Labs', date: 'Dec 2023', status: 'Active' },
];

const mockConsents = [
    { target: 'Microsoft Corp', asset: 'B.Tech Degree', date: '2h ago', status: 'Verified', location: 'Seattle, US' },
    { target: 'LinkedIn', asset: 'AWS Cert', date: '1d ago', status: 'Connected', location: 'Cloud' },
];

// --- Views ---

export const StudentOverview = () => (
    <motion.div
        className="max-w-7xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.header className="flex flex-col md:flex-row md:items-end justify-between gap-6" variants={itemVariants}>
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Portfolio Overview</h1>
                <p className="text-slate-500 font-medium tracking-tight">Your decentralized identity and academic footprint.</p>
            </div>
            <motion.div className="flex gap-4" variants={itemVariants}>
                <button className="btn-extreme btn-extreme-primary px-10 py-4">
                    <Share2 size={16} /> New Share Link
                </button>
            </motion.div>
        </motion.header>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
            {[
                { label: 'Credentials', val: '12', icon: FileText, color: 'indigo' },
                { label: 'Network Hits', val: '482', icon: Zap, color: 'sky' },
                { label: 'Trust Index', val: '99.8', icon: ShieldCheck, color: 'emerald' },
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    className="student-card group status-border-active"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className={`p-3 bg-${stat.color}-500/10 rounded-2xl w-fit mb-6 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                        <stat.icon size={24} />
                    </div>
                    <div className="text-4xl font-black text-white mb-1 tabular-nums tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
            ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.section className="student-card glass-panel" variants={itemVariants}>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white font-black flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                        <Clock size={16} className="text-indigo-400" />
                        Audit Log
                    </h3>
                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                    {mockConsents.map((c, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center justify-between p-6 bg-slate-900/30 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all group"
                            whileHover={{ x: 5 }}
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                    <UserCheck size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-white uppercase tracking-tight">{c.target}</div>
                                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tighter">Access: {c.asset} • {c.date}</div>
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded-full tracking-widest border border-emerald-400/20">{c.status}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section className="student-card flex flex-col items-center justify-center text-center py-12 relative overflow-hidden group glass-panel" variants={itemVariants}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
                <motion.div
                    className="p-10 bg-white rounded-[48px] shadow-2xl shadow-indigo-500/10 mb-8 relative z-10"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                >
                    <QrCode size={160} className="text-slate-950" />
                    <div className="absolute inset-0 border-8 border-indigo-500/5 rounded-[48px] pointer-events-none"></div>
                </motion.div>
                <h3 className="text-white font-black text-2xl mb-2 tracking-tighter uppercase italic">Identity Broadcast</h3>
                <p className="text-[11px] text-slate-500 max-w-[260px] leading-relaxed font-bold uppercase tracking-tight">Active session encrypted. Present to verifier for zero-knowledge transit.</p>
            </motion.section>
        </div>
    </motion.div>
);

export const MyCredentials = () => {
    const [selectedVC, setSelectedVC] = useState<any>(null);

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header variants={itemVariants}>
                <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Identity Vault</h1>
                <p className="text-slate-500 font-medium tracking-tight">Cryptographically secured proofs of your academic journey.</p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockCredentials.map((vc) => (
                    <motion.div
                        key={vc.id}
                        className="credential-display-card group glass-panel"
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                    >
                        <div className="credential-top-strip" />
                        <div className="credential-content">
                            <div className="flex justify-between items-start mb-10">
                                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                    <ShieldCheck size={32} />
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">v2.0 CANONICAL</div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors uppercase leading-none tracking-tighter">{vc.type}</h3>
                            <p className="text-[11px] text-slate-500 font-bold mb-10 uppercase tracking-widest">{vc.issuer}</p>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Issuance</span>
                                    <span className="text-xs font-black text-white tracking-tight">{vc.date}</span>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Network Status</span>
                                    <span className="trust-badge verified status-border-active px-4">Verified</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedVC(vc)}
                                    className="btn-extreme btn-extreme-primary flex-1 py-4"
                                >
                                    Selective Share
                                </button>
                                <button className="btn-extreme !p-4">
                                    <Download size={20} className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedVC && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl" onClick={() => setSelectedVC(null)} />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotateX: 20 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} exit={{ scale: 0.9, opacity: 0, rotateX: -20 }}
                            className="bg-slate-900/50 border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden relative shadow-2xl glass-panel"
                        >
                            <div className="p-12 border-b border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-indigo-400">
                                    <Lock size={120} />
                                </div>
                                <h3 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic">ZK-Lite Reveal</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-bold uppercase tracking-tight max-w-sm">Encryption active. Select components to inject into the verification stream.</p>
                            </div>

                            <div className="p-12 space-y-4">
                                {[
                                    { label: 'Name & Student ID', desc: 'Required for core verification', active: true, forced: true },
                                    { label: 'Degree & Program', desc: 'Basic academic proof', active: true },
                                    { label: 'Final Grade Point', desc: 'Academic performance', active: false },
                                    { label: 'Detailed Transcripts', desc: 'Subject-wise breakdown', active: false },
                                ].map((field, i) => (
                                    <motion.div
                                        key={i}
                                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${field.active ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-white/5 bg-white/2 hover:border-white/10'}`}
                                        whileHover={{ x: 10 }}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${field.active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : 'bg-slate-800 text-slate-600'}`}>
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div>
                                                <div className={`text-sm font-black uppercase tracking-tight ${field.active ? 'text-white' : 'text-slate-500'}`}>{field.label}</div>
                                                <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.1em]">{field.desc}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-12 bg-slate-950/80 flex items-center justify-between gap-10">
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">TTL: <strong className="text-indigo-400">168 HOURS</strong></div>
                                <button className="btn-extreme btn-extreme-primary flex-1 py-5">
                                    Generate Proof & Link
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const ConsentLog = () => (
    <motion.div
        className="max-w-7xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.header variants={itemVariants}>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Consent Transparency</h1>
            <p className="text-slate-500 font-medium tracking-tight">A real-time ledger of who, when, and where accessed your proofs.</p>
        </motion.header>

        <div className="space-y-6">
            {mockConsents.map((c, i) => (
                <motion.div
                    key={i}
                    className="glass-panel p-12 rounded-[40px] flex flex-col md:flex-row md:items-center justify-between gap-10 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-indigo-500 to-transparent opacity-20" />
                    <div className="flex gap-10 items-start">
                        <div className="p-6 bg-indigo-500/10 rounded-3xl text-indigo-400 group-hover:scale-110 transition-transform">
                            <Lock size={40} />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">{c.target}</h4>
                            <p className="text-[11px] text-slate-500 font-bold mb-8 uppercase tracking-[0.15em]">Authenticated access to <span className="text-indigo-400 font-black underline decoration-indigo-500/30 underline-offset-4">{c.asset}</span></p>
                            <div className="flex flex-wrap gap-12">
                                {[
                                    { label: 'Region', val: c.location, icon: MapPin },
                                    { label: 'Network Time', val: c.date, icon: Clock },
                                    { label: 'Status', val: c.status, icon: ShieldCheck, color: 'text-emerald-400' },
                                ].map((stat, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em]">{stat.label}</div>
                                        <div className={`text-[12px] font-black uppercase tracking-tight flex items-center gap-2 ${stat.color || 'text-slate-200'}`}>
                                            <stat.icon size={14} className="opacity-50" /> {stat.val}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="btn-extreme bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 px-10">
                        Revoke Stream
                    </button>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export const SkillChain = () => (
    <motion.div
        className="max-w-7xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.header className="flex justify-between items-end" variants={itemVariants}>
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">SkillChain.OS</h1>
                <p className="text-slate-500 font-medium tracking-tight">Your verified professional profile powered by blockchain proofs.</p>
            </div>
            <button className="btn-extreme btn-extreme-primary px-8">
                <Plus size={16} /> Inject Achievement
            </button>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
                <motion.section className="student-card glass-panel" variants={itemVariants}>
                    <h3 className="text-white font-black mb-12 text-[10px] uppercase tracking-[0.3em] opacity-40 italic">Badges & Micro-Stamps</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { name: 'Gold Medal', sub: 'GCU Academic', icon: Award, color: 'text-amber-400' },
                            { name: 'Kernel Dev', sub: 'Open-Source', icon: Globe, color: 'text-sky-400' },
                            { name: 'Lead Architect', sub: 'Team Proof', icon: ShieldCheck, color: 'text-indigo-400' },
                            { name: 'Growth Hack', sub: 'Market Verified', icon: Zap, color: 'text-emerald-400' },
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center text-center group cursor-help"
                                whileHover={{ y: -5 }}
                            >
                                <div className="skill-badge mb-6 !w-20 !h-20 !rounded-3xl group-hover:rotate-12 transition-all duration-300 status-border-active">
                                    <b.icon size={32} className={b.color} />
                                </div>
                                <div className="text-[12px] font-black text-white uppercase mb-1 tracking-tighter">{b.name}</div>
                                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter opacity-60">{b.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="student-card glass-panel" variants={itemVariants}>
                    <h3 className="text-white font-black mb-12 text-[10px] uppercase tracking-[0.3em] opacity-40 italic">Global Validation Propagation</h3>
                    <div className="space-y-12">
                        {[
                            { label: 'Academic Validity', p: 98, color: 'bg-indigo-500' },
                            { label: 'Cryptographic Age', p: 72, color: 'bg-sky-500' },
                            { label: 'Consensus Strength', p: 94, color: 'bg-emerald-500' },
                        ].map((s, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em]">
                                    <span className="text-slate-500">{s.label}</span>
                                    <span className="text-white">{s.p}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                                    <motion.div
                                        className={`h-full ${s.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${s.p}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>

            <aside className="space-y-8">
                <motion.div
                    className="student-card bg-indigo-600 shadow-2xl shadow-indigo-600/30 border-none group cursor-pointer hover:bg-indigo-500 transition-all p-12"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6 leading-none italic">Apply Pro</h3>
                    <p className="text-[13px] text-indigo-100/70 mb-12 leading-relaxed font-bold uppercase tracking-tight">
                        Instantly synchronize your verified SkillChain with global terminal partners.
                    </p>
                    <div className="space-y-4">
                        {['Google Labs', 'Microsoft Research', 'SpaceX'].map((corp) => (
                            <div key={corp} className="btn-extreme w-full !bg-white/10 !border-white/10 !justify-between !px-6 !py-5 group-hover:!bg-white/20">
                                <span className="text-sm font-black text-white uppercase tracking-tighter">{corp}</span>
                                <ExternalLink size={16} className="text-white/60" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="student-card glass-panel border-dashed flex items-center justify-between p-10" variants={itemVariants}>
                    <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Global Hits</div>
                    <div className="text-3xl font-black text-white tabular-nums tracking-tighter italic">24.5K</div>
                </motion.div>
            </aside>
        </div>
    </motion.div>
);

export const ShareAnalytics = () => (
    <motion.div
        className="max-w-7xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.header variants={itemVariants}>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Registry Telemetry</h1>
            <p className="text-slate-500 font-medium tracking-tight">Real-time propagation and verification metrics for your digital assets.</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div className="lg:col-span-2 glass-panel border-none bg-slate-900/40 relative overflow-hidden min-h-[560px] flex items-center justify-center rounded-[48px]" variants={itemVariants}>
                <Globe size={320} className="text-indigo-500/5 absolute animate-pulse rotate-[22deg]" />
                <div className="text-center relative z-10 px-12">
                    <motion.div
                        className="w-24 h-24 bg-indigo-500/10 rounded-[36px] flex items-center justify-center mx-auto mb-10 border border-indigo-500/20 text-indigo-400 shadow-2xl shadow-indigo-500/10"
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <MapPin size={40} />
                    </motion.div>
                    <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter leading-none italic">Identity Broadcast</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-bold uppercase tracking-tight">Your proofs are currently cached in <span className="text-white font-black">14 edge locations</span> globally with active consensus hits.</p>
                </div>

                {/* Visual Telemetry Overlays */}
                <div className="absolute top-1/4 left-1/4 w-40 h-[1px] bg-slate-800 rotate-45 opacity-30" />
                <div className="absolute bottom-1/3 right-1/4 w-60 h-[1px] bg-slate-800 -rotate-12 opacity-30" />
                <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
                <div className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-sky-500 rounded-full animate-ping" />
                <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </motion.div>

            <div className="space-y-10">
                <motion.section className="student-card glass-panel" variants={itemVariants}>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12 italic opacity-40">Terminal Sources</h4>
                    <div className="space-y-12">
                        {[
                            { d: 'Cloud Verifiers', p: 72, icon: Globe, color: 'indigo' },
                            { d: 'QR Terminals', p: 24, icon: QrCode, color: 'sky' },
                            { d: 'Direct API', p: 4, icon: Zap, color: 'emerald' },
                        ].map((s, i) => (
                            <div key={i} className="flex gap-6 items-center">
                                <div className={`p-4 bg-${s.color}-500/10 rounded-2xl text-${s.color}-400 border border-${s.color}-500/10`}><s.icon size={22} /></div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.15em] mb-3">
                                        <span className="text-slate-400">{s.d}</span>
                                        <span className="text-white">{s.p}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-${s.color}-500`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${s.p}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.2 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="student-card glass-panel" variants={itemVariants}>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 italic opacity-40">Active Links</h4>
                    <div className="space-y-5">
                        {[
                            { name: 'Redmond-Job-Pack', hits: '14 hits', color: 'indigo' },
                            { name: 'Uni-Admission-L1', hits: '42 hits', color: 'sky' },
                        ].map((l, i) => (
                            <motion.div
                                key={i}
                                className="flex justify-between items-center p-6 bg-slate-950/60 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-3 h-3 rounded-full bg-${l.color}-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse`} />
                                    <span className="text-sm font-black text-white uppercase tracking-tighter truncate max-w-[120px]">{l.name}</span>
                                </div>
                                <span className="text-[11px] font-black text-slate-500 group-hover:text-indigo-400 uppercase tracking-widest transition-colors">{l.hits}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    </motion.div>
);
