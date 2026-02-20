import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, Search, ShieldCheck, UserCheck, Zap, Target, Clock } from 'lucide-react';
import './SolutionLayout.css';

const features = [
    { title: 'Instant Verification', desc: 'Verify candidate credentials in under 2 seconds. No more waiting days for university registrars to respond.', icon: Zap },
    { title: 'Zero False Positives', desc: 'Cryptographic proof ensures 100% accuracy. Eliminate fake degrees and resume fraud from your pipeline.', icon: ShieldCheck },
    { title: 'Automated Screening', desc: 'Integrate verification into your ATS workflow via API. Automatically flag unverified credentials.', icon: UserCheck },
    { title: 'Global Reach', desc: 'Verify degrees from universities worldwide without international calling or translation services.', icon: Target },
];

export default function ForEmployers() {
    return (
        <div className="solution-subpage">
            <section className="solution-hero">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Briefcase size={12} /> For Employers</div>
                        <h1>Hire with <span className="text-gradient">Total Confidence</span></h1>
                        <p className="solution-hero-lead">Screen candidates faster and eliminate credential fraud with instant, blockchain-powered verification.</p>
                        <div className="flex justify-center gap-md">
                            <Link to="/verify" className="btn btn-primary btn-lg">Verify a Credential</Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">Partner With Us</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="solution-stats">
                        {[
                            { value: '95%', label: 'Faster Hiring' },
                            { value: '100%', label: 'Risk Reduction' },
                            { value: '$0', label: 'Verification Cost' },
                            { value: 'API', label: 'Integration' },
                        ].map((stat, i) => (
                            <div key={i} className="sol-stat-item">
                                <div className="sol-stat-value">{stat.value}</div>
                                <div className="sol-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title text-center mb-8">Why Recruiters Trust DigiLocker 2.0</h2>
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
                                <div className="solution-feature-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
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
                            <div className="section-label"><Clock size={12} /> Speed Matters</div>
                            <h2 className="section-title">Reduce Time-to-Hire by <span className="text-gradient">Days</span></h2>
                            <p className="mb-8 text-secondary">Traditional background checks take 5-10 business days. With DigiLocker 2.0, you verify instantly at the point of application.</p>
                            <ul className="solution-benefit-list">
                                <li className="solution-benefit-item">
                                    <div className="benefit-icon"><Search color="#6366f1" size={20} /></div>
                                    <div><h4>ATS Integration</h4><p className="text-sm text-secondary">Seamlessly connects with Workday, Greenhouse, Lever, and SAP SuccessFactors.</p></div>
                                </li>
                                <li className="solution-benefit-item">
                                    <div className="benefit-icon"><CheckCircle color="#10b981" size={20} /></div>
                                    <div><h4>Candidate Experience</h4><p className="text-sm text-secondary">Candidates love the instant result. No more waiting for background check clearance.</p></div>
                                </li>
                            </ul>
                        </div>
                        <div className="card p-8 bg-glass">
                            <h3>Start Verifying Today</h3>
                            <p className="mt-4 mb-6 text-secondary">It's free to verify credentials manually. Contact us for bulk API access.</p>
                            <Link to="/verify" className="btn btn-primary w-full">Go to Verification Portal</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
