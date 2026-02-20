import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Lock, Database, Globe, BarChart } from 'lucide-react';
import './SolutionLayout.css';

const stats = [
    { value: '100%', label: 'Compliance' },
    { value: 'Real-time', label: 'Policy Data' },
    { value: 'Secure', label: 'Infrastructure' },
    { value: 'Unified', label: 'Standard' },
];

export default function ForGovernment() {
    return (
        <div className="solution-subpage">
            <section className="solution-hero">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Building size={12} /> For Government</div>
                        <h1>National <span className="text-gradient">Education Infrastructure</span></h1>
                        <p className="solution-hero-lead">Build a unified, interoperable, and secure digital backbone for the nation's academic records. Ensure policy compliance and data-driven governance.</p>
                        <div className="flex justify-center gap-md">
                            <Link to="/contact" className="btn btn-primary btn-lg">Schedule Consultation</Link>
                            <Link to="/security" className="btn btn-secondary btn-lg">Review Security Specs</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="solution-stats">
                        {stats.map((stat, i) => (
                            <div key={i} className="sol-stat-item">
                                <div className="sol-stat-value">{stat.value}</div>
                                <div className="sol-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title text-center mb-8">Governance & Oversight</h2>
                    <div className="solution-features-grid">
                        <motion.div
                            className="solution-feature-card card"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        >
                            <div className="solution-feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                                <Globe size={28} />
                            </div>
                            <h3>National Registry</h3>
                            <p className="text-secondary">A single source of truth for all academic institutions, degrees, and accreditations across the country.</p>
                        </motion.div>

                        <motion.div
                            className="solution-feature-card card"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        >
                            <div className="solution-feature-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                                <Database size={28} />
                            </div>
                            <h3>Interoperability Standard</h3>
                            <p className="text-secondary">Based on W3C Verifiable Credentials standards, ensuring compatibility across states and international borders.</p>
                        </motion.div>

                        <motion.div
                            className="solution-feature-card card"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        >
                            <div className="solution-feature-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                                <BarChart size={28} />
                            </div>
                            <h3>Policy Analytics</h3>
                            <p className="text-secondary">Real-time dashboards on graduation rates, skill gaps, and institutional performance to inform policy decisions.</p>
                        </motion.div>
                        <motion.div
                            className="solution-feature-card card"
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        >
                            <div className="solution-feature-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                                <Lock size={28} />
                            </div>
                            <h3>Data Sovereignty</h3>
                            <p className="text-secondary">Ensures all student data resides within national borders, complying with DPDP and GDPR regulations.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
