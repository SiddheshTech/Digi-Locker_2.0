import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, Database, Smartphone, FileCheck, Server, Key, ArrowRight, CheckCircle } from 'lucide-react';
import './Features.css';

const featuresList = [
    {
        id: 'issuance',
        title: 'Secure Credential Issuance',
        desc: 'Mint tamper-proof academic credentials directly to the blockchain. Support for degrees, diplomas, transcripts, and provisional certificates.',
        icon: FileCheck,
        color: '#6366f1',
        link: '/features/credential-issuance'
    },
    {
        id: 'verification',
        title: 'Instant Global Verification',
        desc: 'Verify any credential in under 2 seconds from anywhere in the world. No login required for verifiers. 100% accurate and fraud-proof.',
        icon: Zap,
        color: '#a855f7',
        link: '/features/credential-verification'
    },
    {
        id: 'storage',
        title: 'Decentralized Storage',
        desc: 'Documents are stored using IPFS (InterPlanetary File System) ensuring redundancy, permanence, and censorship resistance.',
        icon: Database,
        color: '#06b6d4',
        link: '/features/document-storage'
    },
    {
        id: 'privacy',
        title: 'Self-Sovereign Identity',
        desc: 'Students own their data. Credentials are stored in non-custodial wallets. Zero-knowledge proofs allow verification without data exposure.',
        icon: Lock,
        color: '#10b981',
        link: '/features/document-storage'
    },
    {
        id: 'api',
        title: 'Developer API & SDK',
        desc: 'Seamlessly integrate credential issuance and verification into your existing LMS, ERM, or HR platforms with our robust REST APIs.',
        icon: Server,
        color: '#f59e0b',
        link: '/features/api-integration'
    },
    {
        id: 'mobile',
        title: 'Mobile Wallet App',
        desc: 'Students can carry their credentials in their pocket. Support for offline verification and QR code sharing via our iOS and Android apps.',
        icon: Smartphone,
        color: '#f43f5e',
        link: '/features'
    }
];

const comparisonData = [
    { feature: 'Tamper-Proof', traditional: false, digilocker: true },
    { feature: 'Instant Verification', traditional: false, digilocker: true },
    { feature: 'Global Accessibility', traditional: false, digilocker: true },
    { feature: 'Student Ownership', traditional: false, digilocker: true },
    { feature: 'Paperless', traditional: false, digilocker: true },
    { feature: 'Privacy Preserving', traditional: false, digilocker: true },
    { feature: 'Cost Efficient', traditional: false, digilocker: true },
];

export default function Features() {
    return (
        <div className="features-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-glow" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)' }} />
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Zap size={12} /> Powerful Capabilities</div>
                        <h1>The Ultimate <span className="text-gradient">Credential Engine</span></h1>
                        <p>DigiLocker 2.0 isn't just a database; it's a complete decentralized infrastructure for the lifecycle of academic credentials.</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="section">
                <div className="container">
                    <div className="features-main-grid">
                        {featuresList.map((feature, i) => (
                            <motion.div
                                key={feature.id}
                                className="feature-detail-card card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="feature-icon-lg" style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}>
                                    <feature.icon size={32} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                                <Link to={feature.link} className="btn-link">Learn more <ArrowRight size={14} /></Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Dive Section 1: Issuance */}
            <section className="section feature-split">
                <div className="container">
                    <div className="split-layout">
                        <motion.div
                            className="split-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="section-label"><Key size={12} /> Institutional Control</div>
                            <h2>Effortless, Bulk <span className="text-gradient">Issuance</span></h2>
                            <p>Universities can issue thousands of credentials in minutes using CSV upload or API integration. Each credential is cryptographically signed by the institution's private key.</p>
                            <ul className="feature-list">
                                <li><CheckCircle size={16} color="var(--primary-400)" /> Bulk CSV/Excel Processing</li>
                                <li><CheckCircle size={16} color="var(--primary-400)" /> Custom Certificate Templates</li>
                                <li><CheckCircle size={16} color="var(--primary-400)" /> Multi-signature approvals</li>
                                <li><CheckCircle size={16} color="var(--primary-400)" /> Revocation management</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="split-visual"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="visual-card-mockup">
                                <div className="mockup-header">
                                    <div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div>
                                </div>
                                <div className="mockup-body">
                                    <div className="code-block">
                                        <span className="code-line">Issuing batch #2024-GRAD...</span>
                                        <span className="code-line success">✓ 1,240 credentials processed</span>
                                        <span className="code-line success">✓ Hashing documents... 100%</span>
                                        <span className="code-line success">✓ Anchoring to Blockchain...</span>
                                        <span className="code-line highlight">{'>'} Transaction Hash: 0x8f...2a9c</span>
                                        <span className="code-line success">✓ Emails sent to students</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Section 2: Verification */}
            <section className="section feature-split alt-bg">
                <div className="container">
                    <div className="split-layout reverse">
                        <motion.div
                            className="split-content"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="section-label"><Shield size={12} /> Fraud Prevention</div>
                            <h2>Unbreakable <span className="text-gradient">Trust</span></h2>
                            <p>Stop credential fraud securely. Blockchain verification relies on mathematics, not manual checks. Even if the issuing institution closes down, the credentials remain verifiable forever.</p>
                            <ul className="feature-list">
                                <li><CheckCircle size={16} color="var(--primary-400)" /> No central database to hack</li>
                                <li><CheckCircle size={16} color="var(--primary-400)" /> Permanent audit trail</li>
                                <li><CheckCircle size={16} color="var(--primary-400)" /> 99.99% Guaranteed Uptime</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="split-visual"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="visual-shield-mockup">
                                <Shield size={120} strokeWidth={1} className="floating-shield" />
                                <div className="verified-badge">
                                    <CheckCircle size={20} /> Verified
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Old Way vs. <span className="text-gradient">The New Way</span></h2>
                        <p className="section-subtitle mx-auto">Why upgraded institutions are switching to blockchain.</p>
                    </div>
                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th className="text-center text-muted">Paper / PDF</th>
                                    <th className="text-center brand-col">DigiLocker 2.0</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.feature}</td>
                                        <td className="text-center"><div className="status-icon cross">✕</div></td>
                                        <td className="text-center"><div className="status-icon check">✓</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="section-title">Ready to Upgrade?</h2>
                    <div className="hero-cta" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                        <Link to="/contact" className="btn btn-primary btn-lg">Get Started <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
