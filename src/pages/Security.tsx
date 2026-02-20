import { motion } from 'framer-motion';
import { Shield, Lock, Database, FileKey, CheckCircle } from 'lucide-react';
import './Security.css';

const securityLayers = [
    {
        icon: Lock,
        title: 'Layer 1: Access Control',
        desc: 'Multi-factor authentication (MFA), Role-Based Access Control (RBAC), and biometrics ensure only authorized personnel can access the system.',
        color: '#6366f1'
    },
    {
        icon: Shield,
        title: 'Layer 2: Application Security',
        desc: 'WAF (Web Application Firewall), DDoS protection, and regular penetration testing secure the platform against external attacks.',
        color: '#a855f7'
    },
    {
        icon: FileKey,
        title: 'Layer 3: Data Encryption',
        desc: 'AES-256 for data at rest and TLS 1.3 for data in transit. Your data is unreadable to anyone without the decryption keys.',
        color: '#06b6d4'
    },
    {
        icon: Database,
        title: 'Layer 4: Blockchain Immutability',
        desc: 'Cryptographic hashing prevents data tampering. Once recorded, the unparalleled security of the blockchain protects the integrity of every record.',
        color: '#10b981'
    }
];

const complianceBadges = [
    { name: 'ISO 27001', desc: 'Information Security Management' },
    { name: 'SOC 2 Type II', desc: 'Security, Availability & Confidentiality' },
    { name: 'GDPR Compliant', desc: 'General Data Protection Regulation' },
    { name: 'DPDP Act', desc: 'Digital Personal Data Protection' },
];

export default function Security() {
    return (
        <div className="security-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-glow" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)' }} />
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Shield size={12} /> Uncompromised Security</div>
                        <h1>Defense in <span className="text-gradient">Depth</span></h1>
                        <p>Our security architecture is built on the principle of "Verify, then Trust". We combine military-grade encryption with the immutable trust of blockchain technology.</p>
                    </motion.div>
                </div>
            </section>

            {/* Security Architecture Layers */}
            <section className="section">
                <div className="container">
                    <div className="security-layers-grid">
                        {securityLayers.map((layer, i) => (
                            <motion.div
                                key={layer.title}
                                className="security-layer-card card"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="layer-number">{i + 1}</div>
                                <div className="layer-icon" style={{ background: `${layer.color}15`, color: layer.color }}>
                                    <layer.icon size={28} />
                                </div>
                                <div className="layer-content">
                                    <h3>{layer.title}</h3>
                                    <p>{layer.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                        {/* Visual connector line in teh middle (via CSS) */}
                        <div className="security-connector-line"></div>
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Global <span className="text-gradient">Compliance</span></h2>
                        <p className="section-subtitle mx-auto">We adhere to the strictest international standards for data privacy and security.</p>
                    </div>
                    <div className="compliance-grid">
                        {complianceBadges.map((badge, i) => (
                            <motion.div
                                key={badge.name}
                                className="compliance-badge card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="badge-check"><CheckCircle size={20} /></div>
                                <h3>{badge.name}</h3>
                                <p>{badge.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Details / FAQ */}
            <section className="section">
                <div className="container">
                    <div className="grid-2 gap-xl">
                        <div className="security-faq">
                            <h3>Common Security Questions</h3>
                            <div className="faq-item">
                                <h4>Where is the data stored?</h4>
                                <p>Document metadata is hashed and stored on the blockchain. The actual documents are encrypted and stored in decentralized IPFS nodes or secure cloud storage (AWS/Azure) depending on institutional preference.</p>
                            </div>
                            <div className="faq-item">
                                <h4>What if a private key is lost?</h4>
                                <p>Institutions use HSMs (Hardware Security Modules) so keys never leave secure hardware. We also have a multi-sig recovery process for institutional accounts.</p>
                            </div>
                        </div>
                        <div className="security-visual-3d">
                            <div className="lock-animation-container">
                                <Lock size={120} className="lock-main" />
                                <div className="lock-ring ring-inner"></div>
                                <div className="lock-ring ring-outer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
