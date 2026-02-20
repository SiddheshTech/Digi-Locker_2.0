import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Share2, Shield, Lock, Smartphone, FileText, Zap, Globe } from 'lucide-react';
import './SolutionLayout.css';

const benefits = [
    { title: 'Lifetime Ownership', desc: 'Your credentials are yours forever. stored decentralizely, meaning no institution can revoke access or lose your records.', icon: Shield },
    { title: 'Instant Sharing', desc: 'Share your verified degree with a simple link or QR code. No more paying for transcripts or waiting days for verification.', icon: Share2 },
    { title: 'Privacy Controls', desc: 'Control exactly who sees your data and for how long. Revoke access at any time with a single click.', icon: Lock },
    { title: 'Global Portability', desc: 'Your blockchain credentials are recognized worldwide. Apply for jobs or further education anywhere without friction.', icon: Globe },
];

export default function ForStudents() {
    return (
        <div className="solution-subpage">
            <section className="solution-hero">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><GraduationCap size={12} /> For Students</div>
                        <h1>Own Your <span className="text-gradient">Achievements</span></h1>
                        <p className="solution-hero-lead">Your hard work deserves a credential that lasts forever. Secure, portable, and instantly verifiable proofs of your education.</p>
                        <div className="flex justify-center gap-md">
                            <Link to="/contact" className="btn btn-primary btn-lg">Get Your Wallet</Link>
                            <Link to="/how-it-works" className="btn btn-secondary btn-lg">See How It Works</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="solution-stats">
                        {[
                            { value: '100%', label: 'Student Owned' },
                            { value: '$0', label: 'Storage Cost' },
                            { value: 'Global', label: 'Accepted' },
                            { value: 'Instant', label: 'Sharing' },
                        ].map((stat, i) => (
                            <div key={i} className="sol-stat-item">
                                <div className="sol-stat-value">{stat.value}</div>
                                <div className="sol-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title text-center mb-8">Empowering Your Career</h2>
                    <div className="solution-features-grid">
                        {benefits.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="solution-feature-card card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="solution-feature-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
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
                        <div className="order-2 md:order-1">
                            <div className="visual-card-mockup" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Smartphone size={120} strokeWidth={1} />
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="section-label"><Smartphone size={12} /> Mobile First</div>
                            <h2 className="section-title">Credentials in Your <span className="text-gradient">Pocket</span></h2>
                            <p className="mb-8 text-secondary">Download our mobile app to access your certificates anytime, anywhere. Even offline.</p>
                            <ul className="solution-benefit-list">
                                <li className="solution-benefit-item">
                                    <div className="benefit-icon"><Zap color="#f59e0b" size={20} /></div>
                                    <div><h4>One-tap Sharing</h4><p className="text-sm text-secondary">Send verified links via WhatsApp, Email, or LinkedIn.</p></div>
                                </li>
                                <li className="solution-benefit-item">
                                    <div className="benefit-icon"><FileText color="#3b82f6" size={20} /></div>
                                    <div><h4>Consolidated Portfolio</h4><p className="text-sm text-secondary">Keep diplomas, certificates, and transcripts in one place.</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
