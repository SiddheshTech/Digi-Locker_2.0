import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, FileCheck, Users, Eye, ArrowRight, Check, Lock, Shield, Cpu, Link2 } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Building2,
        title: 'Institution Onboarding & Identity Verification',
        description: 'Universities and educational institutions register on the DigiLocker 2.0 platform. Our dedicated onboarding team guides you through KYC/KYB identity verification, legal documentation, and technical setup. Each institution receives a unique cryptographic identity key stored on the blockchain — this key is what makes your credential issuances trustworthy.',
        details: [
            'Submit institutional documents & accreditation proofs',
            'Legal team review and compliance check',
            'Cryptographic key pair generated and secured in HSM',
            'Test environment access and integration walkthrough',
            'Go-live approval within 5 business days',
        ],
        color: '#6366f1',
    },
    {
        number: '02',
        icon: FileCheck,
        title: 'Credential Creation & Blockchain Anchoring',
        description: 'When a student completes a program, the institution uses DigiLocker 2.0\'s dashboard or API to create a digital credential. The system standardizes the credential metadata (name, degree, grades, date, institution), computes a SHA-256 cryptographic hash, and records this hash permanently on the blockchain via a smart contract.',
        details: [
            'Credential data entered via dashboard or API',
            'Metadata normalized to W3C Verifiable Credentials standard',
            'SHA-256 hash computed of the full credential document',
            'Smart contract transaction anchors hash to blockchain',
            'IPFS stores encrypted full document with CID link',
        ],
        color: '#a855f7',
    },
    {
        number: '03',
        icon: Users,
        title: 'Student Receives Digital Wallet',
        description: 'The student is notified via email and receives their credential in their personal DigiLocker 2.0 digital wallet. The wallet is non-custodial, meaning only the student holds the private keys. Students can view all credentials, manage sharing permissions, generate time-limited or permanent verification links, and even revoke access.',
        details: [
            'Student account created with secure wallet addresses',
            'Credential minted as a Verifiable Credential (VC)',
            'Immutable QR code and shareable verification URL generated',
            'Student controls sharing: name-only, full, or redacted view',
            'Credential portfolio with academic history timeline',
        ],
        color: '#06b6d4',
    },
    {
        number: '04',
        icon: Eye,
        title: 'Universal Instant Verification',
        description: 'An employer, another institution, or any verifying party receives the verification link or scans the QR code. DigiLocker 2.0 fetches the blockchain record, recalculates the document hash, compares it against the on-chain hash, and confirms authenticity in under 2 seconds. No emails to registrars, no delays, no uncertainty.',
        details: [
            'Verifier clicks link or scans QR — no account required',
            'System fetches blockchain transaction record',
            'Live hash comparison confirms document integrity',
            'Issuing institution signature verified cryptographically',
            'Real-time verification report generated with audit trail',
        ],
        color: '#10b981',
    },
];

const techStack = [
    { name: 'Hyperledger Fabric', role: 'Permissioned blockchain network for institutional data' },
    { name: 'Ethereum (EVM)', role: 'Public verification anchoring for global accessibility' },
    { name: 'IPFS / Filecoin', role: 'Decentralized, censorship-resistant document storage' },
    { name: 'W3C DID Standard', role: 'Decentralized identifiers for institutions and students' },
    { name: 'W3C VC Standard', role: 'Verifiable credentials format (JSON-LD)' },
    { name: 'zk-SNARKs', role: 'Zero-knowledge proofs for privacy-preserving verification' },
    { name: 'HSM (Hardware Security)', role: 'Secure key storage for institutional signing keys' },
    { name: 'REST API + SDK', role: 'Easy integration with existing LMS and ERP systems' },
];

export default function HowItWorks() {
    return (
        <div>
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-glow" />
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Link2 size={12} /> The Process</div>
                        <h1>How DigiLocker 2.0 <span className="text-gradient">Works</span></h1>
                        <p>From institution onboarding to instant credential verification — a complete, end-to-end journey through our blockchain-powered academic credential system.</p>
                    </motion.div>
                </div>
            </section>

            {/* Steps */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                className="step-detail"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="step-detail-header">
                                    <div className="step-number-large" style={{ color: step.color }}>{step.number}</div>
                                    <div className="step-icon-large" style={{ background: `${step.color}20`, color: step.color }}>
                                        <step.icon size={30} />
                                    </div>
                                    <div>
                                        <h2 className="step-title">{step.title}</h2>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>
                                <div className="step-details-list">
                                    {step.details.map((d, j) => (
                                        <motion.div
                                            key={j}
                                            className="step-detail-item"
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: j * 0.08 }}
                                        >
                                            <div className="step-check" style={{ background: `${step.color}20`, color: step.color }}>
                                                <Check size={12} />
                                            </div>
                                            <span>{d}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <div className="section-label"><Cpu size={12} /> Technology Stack</div>
                        <h2 className="section-title">Powered by <span className="text-gradient">Cutting-Edge Blockchain</span></h2>
                        <p className="section-subtitle mx-auto">We combine the best of public and permissioned blockchain technology with industry-standard credential formats for maximum security and interoperability.</p>
                    </div>
                    <div className="tech-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '3rem' }}>
                        {techStack.map((item, i) => (
                            <motion.div
                                key={item.name}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}><Cpu size={10} /> Tech</div>
                                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.name}</h4>
                                <p style={{ fontSize: '0.8rem' }}>{item.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security guarantees */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <div className="section-label"><Lock size={12} /> Security Architecture</div>
                            <h2 className="section-title">Why Blockchain Makes <span className="text-gradient">Fraud Impossible</span></h2>
                            <p>Once a credential hash is recorded on the blockchain, no one — not even DigiLocker 2.0 or the issuing institution — can alter it. The blockchain's decentralized consensus mechanism means tampering with one node has no effect; thousands of nodes around the world hold the same record.</p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['Decentralization eliminates single points of failure', 'Cryptographic hash means any document change is immediately detectable', 'Smart contract logic is publicly auditable', 'Immutable ledger provides permanent, timestamped audit trail'].map(item => (
                                    <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                        <Shield size={14} style={{ color: 'var(--primary-400)', marginTop: '3px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/security" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                                Full Security Details <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Verification Speed Comparison</h3>
                            {[
                                { method: 'DigiLocker 2.0', time: '2 seconds', color: '#10b981', width: '5%' },
                                { method: 'Direct to institution', time: '2–5 days', color: '#f59e0b', width: '40%' },
                                { method: 'Third-party background check', time: '5–10 days', color: '#f43f5e', width: '70%' },
                                { method: 'Manual document check', time: '1–3 weeks', color: '#6366f1', width: '100%' },
                            ].map((row) => (
                                <div key={row.method} style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.method}</span>
                                        <span style={{ fontSize: '0.85rem', color: row.color, fontWeight: 600 }}>{row.time}</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                                        <div style={{ width: row.width, height: '100%', background: row.color, borderRadius: '3px', transition: 'width 1s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container text-center">
                    <div className="cta-inner" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-2xl)', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
                        <div className="cta-bg-glow" />
                        <h2 className="section-title">See It in Action</h2>
                        <p className="section-subtitle mx-auto mb-8">Schedule a live demo with our team and see the complete credential lifecycle from issuance to verification in real-time.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">Request Live Demo <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
