import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, Briefcase, Globe, CheckCircle, ArrowRight, Layers, Server } from 'lucide-react';
import './Solutions.css';

const solutionsData = [
    {
        id: 'universities',
        title: 'For Universities & Schools',
        subtitle: 'Digitize your entire credentialing lifecycle.',
        desc: 'Eliminate paper, reduce administrative burden, and prevent fraud. DigiLocker 2.0 integrates with your existing Student Information Systems (SIS) to automate credential issuance.',
        details: [
            'Bulk issuance via API or CSV upload',
            'Bank-grade security for student data',
            'Real-time issuance tracking dashboard',
            'Zero cost for verification inquiries'
        ],
        icon: Building2,
        color: '#6366f1',
        link: '/solutions/universities',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 'students',
        title: 'For Students & Graduates',
        subtitle: 'Your achievements, owned by you forever.',
        desc: 'No more lost certificates or expensive transcripts. Store all your academic credentials in a secure, portable digital wallet that you control.',
        details: [
            'Lifetime access to your credentials',
            'Share verifiable links instantly',
            'Privacy controls on who sees what',
            'Mobile app for on-the-go access'
        ],
        icon: GraduationCap,
        color: '#a855f7',
        link: '/solutions/students',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 'employers',
        title: 'For Employers & Recruiters',
        subtitle: 'Trust, but verify instantly.',
        desc: 'Screen candidates faster with 100% confidence. Verify degrees and certifications in seconds without third-party background check agencies.',
        details: [
            'Instant verification via QR or Link',
            'Eliminate fake resume fraud',
            'reduce time-to-hire by days',
            'API for ATS integration'
        ],
        icon: Briefcase,
        color: '#06b6d4',
        link: '/solutions/employers',
        image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 'government',
        title: 'For Government & Regulators',
        subtitle: 'Standardized, transparent education infrastructure.',
        desc: 'Build a national-level credential repository. Monitor educational outcomes and ensure compliance with real-time data access.',
        details: [
            'Tamper-proof national registry',
            'Real-time data for policy making',
            'Interoperability across states',
            'GDPR and DPDP compliant'
        ],
        icon: Globe,
        color: '#10b981',
        link: '/solutions/government',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    }
];

export default function Solutions() {
    return (
        <div className="solutions-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-glow" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)' }} />
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Layers size={12} /> Ecosystem Solutions</div>
                        <h1>Empowering Every <span className="text-gradient">Stakeholder</span></h1>
                        <p>Whether you issue, earn, or verify credentials, DigiLocker 2.0 provides a tailored solution to modernize your academic workflow.</p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions List */}
            <section className="section">
                <div className="container">
                    <div className="solutions-list">
                        {solutionsData.map((solution, i) => (
                            <motion.div
                                key={solution.id}
                                className={`solution-row ${i % 2 !== 0 ? 'reverse' : ''}`}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="solution-content">
                                    <div className="solution-icon-lg" style={{ background: `${solution.color}15`, color: solution.color }}>
                                        <solution.icon size={32} />
                                    </div>
                                    <h2>{solution.title}</h2>
                                    <h4 className="solution-subtitle">{solution.subtitle}</h4>
                                    <p>{solution.desc}</p>
                                    <ul className="solution-features">
                                        {solution.details.map((d, j) => (
                                            <li key={j}><CheckCircle size={16} color={solution.color} /> {d}</li>
                                        ))}
                                    </ul>
                                    <Link to={solution.link} className="btn btn-secondary mt-8">
                                        Explore Solution <ArrowRight size={16} />
                                    </Link>
                                </div>
                                <div className="solution-image-container">
                                    <div className="solution-image-wrapper card">
                                        <img src={solution.image} alt={solution.title} className="solution-img" />
                                        <div className="solution-overlay" />
                                    </div>
                                    {/* Floating abstract elements */}
                                    <div className="floating-badge top-right" style={{ borderColor: solution.color }}>
                                        <solution.icon size={20} color={solution.color} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Banner */}
            <section className="section integration-banner">
                <div className="container">
                    <div className="integration-box card">
                        <div className="integration-content">
                            <div className="section-label"><Server size={12} /> Developer Ready</div>
                            <h2>Seamless <span className="text-gradient">API Integration</span></h2>
                            <p>Connect your existing LMS or HR software in minutes with our extensive API documentation and SDKs.</p>
                            <Link to="/resources/documentation" className="btn btn-primary mt-4">View Documentation</Link>
                        </div>
                        <div className="integration-logos">
                            <div className="logo-placeholder">Moodle</div>
                            <div className="logo-placeholder">Blackboard</div>
                            <div className="logo-placeholder">Canvas</div>
                            <div className="logo-placeholder">SAP</div>
                            <div className="logo-placeholder">Workday</div>
                            <div className="logo-placeholder">Oracle</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
