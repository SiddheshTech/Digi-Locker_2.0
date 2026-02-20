import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Award, Globe, Users, Target, Eye, ArrowRight, CheckCircle, Cpu } from 'lucide-react';
import './About.css';

const team = [
    { name: 'Arjun Nair', role: 'Chief Executive Officer', avatar: 'AN', bg: '#6366f1' },
    { name: 'Dr. Priya Singh', role: 'Chief Technology Officer', avatar: 'PS', bg: '#a855f7' },
    { name: 'Rohit Sharma', role: 'Chief Product Officer', avatar: 'RS', bg: '#06b6d4' },
    { name: 'Anjali Verma', role: 'Head of Blockchain', avatar: 'AV', bg: '#10b981' },
    { name: 'Vikram Patel', role: 'Head of Partnerships', avatar: 'VP', bg: '#f59e0b' },
    { name: 'Sneha Kapoor', role: 'Head of Security', avatar: 'SK', bg: '#f43f5e' },
];

const milestones = [
    { year: '2020', event: 'Company founded with seed funding from MEITY', icon: Award },
    { year: '2021', event: 'First 10 universities onboarded; 50,000 credentials issued', icon: Users },
    { year: '2022', event: 'Product launched in 5 states with government partnership', icon: Globe },
    { year: '2023', event: 'DigiLocker 2.0 launched with full blockchain integration', icon: Cpu },
    { year: '2024', event: '500+ institutions, 2M+ credentials, Series B funding secured', icon: Shield },
    { year: '2025', event: 'Global expansion to 50+ countries, API ecosystem launched', icon: Target },
];

const values = [
    { icon: Shield, title: 'Security First', desc: 'Every decision is made with security and privacy as the primary consideration.' },
    { icon: Eye, title: 'Radical Transparency', desc: 'We believe in open processes, auditable systems, and honest communication.' },
    { icon: Globe, title: 'Universal Access', desc: 'Credentials should be accessible and verifiable by anyone, anywhere.' },
    { icon: CheckCircle, title: 'Uncompromising Integrity', desc: 'The immutability of blockchain reflects our commitment to truth.' },
];

export default function About() {
    return (
        <div className="about-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-glow" />
                <div className="container">
                    <motion.div
                        className="page-hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="section-label"><Award size={12} /> Our Story</div>
                        <h1>Building the Future of <span className="text-gradient">Academic Trust</span></h1>
                        <p>DigiLocker 2.0 was born from a simple vision: academic credentials should be as trustworthy and immutable as the knowledge they represent. We're a team of technologists, educators, and policy experts united by the mission to eliminate credential fraud and democratize access to verifiable education records.</p>
                        <div className="hero-cta" style={{ marginTop: '2rem' }}>
                            <Link to="/contact" className="btn btn-primary">Join Our Mission <ArrowRight size={16} /></Link>
                            <Link to="/how-it-works" className="btn btn-secondary">See How It Works</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section">
                <div className="container">
                    <div className="mission-grid">
                        {[
                            { icon: Target, title: 'Our Mission', color: '#6366f1', content: 'To create a world where every academic achievement is permanently verifiable, student-owned, and universally recognized — eliminating fraud and democratizing credential access globally.' },
                            { icon: Eye, title: 'Our Vision', color: '#a855f7', content: 'A global education ecosystem where a student\'s lifetime of learning, achievements, and credentials are owned by them, stored securely on blockchain, and instantly shareable with anyone in the world.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="mission-card card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className="mission-icon" style={{ background: `${item.color}20`, color: item.color }}>
                                    <item.icon size={28} />
                                </div>
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <div className="section-label"><CheckCircle size={12} /> Core Values</div>
                        <h2 className="section-title">What We <span className="text-gradient">Stand For</span></h2>
                    </div>
                    <div className="values-grid">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                className="value-card card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="value-icon"><v.icon size={22} /></div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <div className="section-label"><Cpu size={12} /> Our Journey</div>
                        <h2 className="section-title">From Idea to <span className="text-gradient">Impact</span></h2>
                    </div>
                    <div className="timeline">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="timeline-year">{m.year}</div>
                                <div className="timeline-dot">
                                    <m.icon size={16} />
                                </div>
                                <div className="timeline-content card">
                                    <p>{m.event}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <div className="section-label"><Users size={12} /> Leadership Team</div>
                        <h2 className="section-title">The People Behind <span className="text-gradient">DigiLocker 2.0</span></h2>
                        <p className="section-subtitle mx-auto">A diverse team of blockchain engineers, education policy experts, cybersecurity professionals, and product designers — all united by one purpose.</p>
                    </div>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                className="team-card card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                            >
                                <div className="team-avatar" style={{ background: member.bg }}>{member.avatar}</div>
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="section-title">Want to Be Part of This Journey?</h2>
                        <p className="section-subtitle mx-auto mb-8">We're always looking for passionate individuals to join our mission of making academic credentials universally trustworthy.</p>
                        <div className="hero-cta" style={{ justifyContent: 'center' }}>
                            <Link to="/contact" className="btn btn-primary btn-lg">Get in Touch <ArrowRight size={16} /></Link>
                            <Link to="/solutions" className="btn btn-secondary btn-lg">Our Solutions</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
