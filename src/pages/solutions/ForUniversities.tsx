import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle, Upload, Users, ShieldCheck, BarChart3, AlertTriangle } from 'lucide-react';
import './SolutionLayout.css';

const features = [
    { title: 'Bulk Credential Issuance', desc: 'Issue thousands of degrees and certificates in minutes using CSV uploads or API integration.', icon: Upload },
    { title: 'Blockchain Security', desc: 'Every credential is cryptographically signed and anchored to the blockchain, making it impossible to forge.', icon: ShieldCheck },
    { title: 'Digital Wallet Delivery', desc: 'Students receive credentials instantly in their DigiLocker 2.0 wallet, accessible on mobile and web.', icon: Users },
    { title: 'Real-time Analytics', desc: 'Track issuance stats, student engagement, and verification requests from a comprehensive dashboard.', icon: BarChart3 },
];

const painPoints = [
    { problem: 'Manual Verification Requests', solution: 'Automated instant verification saves 100s of admin hours.' },
    { problem: 'Paper Certificate Printing Costs', solution: 'Digital issuance reduces costs by up to 90%.' },
    { problem: 'Credential Fraud & Forgery', solution: 'Blockchain immutability eliminates fake degrees entirely.' },
    { problem: 'Lost Certificates', solution: 'Permanent, redundant decentralized storage ensures zero data loss.' },
];

export default function ForUniversities() {
    return (
        <div className="solution-subpage">
            <section className="solution-hero">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Building2 size={12} /> For Universities</div>
                        <h1>Modernize Your <span className="text-gradient">Credential System</span></h1>
                        <p className="solution-hero-lead">Stop printing paper. Start issuing tamper-proof, instantly verifiable digital credentials that students and employers trust.</p>
                        <div className="flex justify-center gap-md">
                            <Link to="/contact" className="btn btn-primary btn-lg">Request Demo</Link>
                            <Link to="/features" className="btn btn-secondary btn-lg">View Features</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="solution-stats">
                        {[
                            { value: '90%', label: 'Cost Reduction' },
                            { value: '0s', label: 'Verification Time' },
                            { value: '100%', label: 'Fraud Prevention' },
                            { value: '24/7', label: 'Availability' },
                        ].map((stat, i) => (
                            <div key={i} className="sol-stat-item">
                                <div className="sol-stat-value">{stat.value}</div>
                                <div className="sol-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title text-center mb-8">Why Universities Choose DigiLocker 2.0</h2>
                    <div className="solution-features-grid">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="solution-feature-card card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="solution-feature-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                                    <f.icon size={28} />
                                </div>
                                <h3>{f.title}</h3>
                                <p className="text-secondary">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="grid-2 gap-xl items-center">
                        <div>
                            <div className="section-label"><AlertTriangle size={12} /> Solves Real Problems</div>
                            <h2 className="section-title">Eliminate Administrative <span className="text-gradient">Headaches</span></h2>
                            <p className="mb-8 text-secondary">Traditional credential management is slow, expensive, and insecure. We fix that.</p>
                            <ul className="solution-benefit-list">
                                {painPoints.map((p, i) => (
                                    <motion.li
                                        key={i}
                                        className="solution-benefit-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="benefit-icon"><CheckCircle color="#10b981" size={20} /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{p.solution}</h4>
                                            <p className="text-sm text-secondary">Solves: {p.problem}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="card p-8 bg-glass">
                            <h3>Ready to transform your institution?</h3>
                            <p className="mt-4 mb-6 text-secondary">Join 500+ forward-thinking universities today.</p>
                            <form className="flex flex-col gap-md">
                                <input type="email" placeholder="University Email" className="form-input" />
                                <button className="btn btn-primary w-full">Get Started</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
