import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Shield, Lock, Globe, Award, CheckCircle, ArrowRight, Star,
    Zap, Users, Building2, ChevronRight, Play, Cpu,
    Link2, FileCheck, Eye, TrendingUp, RefreshCw
} from 'lucide-react';
import './Home.css';
import TextReveal from '../components/animations/TextReveal';
import BlockchainNetwork from '../components/animations/BlockchainNetwork';

import CountUp from 'react-countup';

// ===================== ANIMATED COUNTER =====================
function Counter({ end, suffix = '', prefix = '', decimals = 0 }: { end: number; suffix?: string; prefix?: string; decimals?: number }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <span ref={ref}>
            {inView ? (
                <CountUp
                    start={0}
                    end={end}
                    duration={2.5}
                    suffix={suffix}
                    prefix={prefix}
                    decimals={decimals}
                    separator=","
                />
            ) : (
                <span>{prefix}0{suffix}</span>
            )}
        </span>
    );
}

// ===================== BLOCKCHAIN SVG ANIMATION =====================
function BlockchainAnimation() {
    const nodes = [
        { x: 200, y: 80, label: 'University' },
        { x: 480, y: 60, label: 'DigiLocker' },
        { x: 720, y: 100, label: 'Blockchain' },
        { x: 140, y: 240, label: 'Student' },
        { x: 380, y: 260, label: 'Validator' },
        { x: 620, y: 240, label: 'Employer' },
        { x: 820, y: 200, label: 'Verifier' },
    ];

    const edges = [
        [0, 1], [1, 2], [1, 4], [0, 3], [3, 4],
        [4, 5], [2, 6], [5, 6], [2, 4],
    ];

    return (
        <svg className="blockchain-svg" viewBox="0 0 960 360" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                </linearGradient>
                <filter id="nodeGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                </radialGradient>
            </defs>

            {/* Grid background */}
            <g opacity="0.05">
                {[...Array(12)].map((_, i) => (
                    <line key={`hg-${i}`} x1="0" y1={i * 30} x2="960" y2={i * 30} stroke="#6366f1" strokeWidth="1" />
                ))}
                {[...Array(32)].map((_, i) => (
                    <line key={`vg-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="360" stroke="#6366f1" strokeWidth="1" />
                ))}
            </g>

            {/* Edges */}
            {edges.map(([from, to], i) => (
                <g key={`edge-${i}`}>
                    <line
                        x1={nodes[from].x} y1={nodes[from].y}
                        x2={nodes[to].x} y2={nodes[to].y}
                        stroke="url(#edgeGrad)"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        strokeDasharray="6 4"
                    />
                    {/* Animated data packet */}
                    <circle r="4" fill="#a855f7" opacity="0.9">
                        <animateMotion
                            dur={`${2.5 + i * 0.7}s`}
                            repeatCount="indefinite"
                            path={`M${nodes[from].x},${nodes[from].y} L${nodes[to].x},${nodes[to].y}`}
                        />
                    </circle>
                </g>
            ))}

            {/* Nodes */}
            {nodes.map((node, i) => (
                <g key={`node-${i}`}>
                    {/* Outer ring */}
                    <circle
                        cx={node.x} cy={node.y} r="28"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        strokeDasharray="4 4"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${node.x} ${node.y}`}
                            to={`360 ${node.x} ${node.y}`}
                            dur={`${8 + i}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                    {/* Glow */}
                    <circle cx={node.x} cy={node.y} r="20" fill="url(#nodeGrad)" opacity="0.2">
                        <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="r" values="20;26;20" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Main node */}
                    <circle cx={node.x} cy={node.y} r="16" fill="url(#nodeGrad)" opacity="0.9" />
                    {/* Icon placeholder */}
                    <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                        {i + 1}
                    </text>
                    {/* Label */}
                    <text x={node.x} y={node.y + 38} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="500">
                        {node.label}
                    </text>
                </g>
            ))}

            {/* Floating blocks */}
            {[
                { x: 60, y: 150 },
                { x: 880, y: 120 },
                { x: 450, y: 310 },
            ].map((pos, i) => (
                <g key={`block-${i}`}>
                    <rect
                        x={pos.x - 20} y={pos.y - 14}
                        width="40" height="28"
                        rx="6"
                        fill="rgba(99,102,241,0.1)"
                        stroke="rgba(99,102,241,0.3)"
                        strokeWidth="1"
                    >
                        <animate attributeName="y" values={`${pos.y - 14};${pos.y - 22};${pos.y - 14}`} dur={`${3 + i}s`} repeatCount="indefinite" />
                    </rect>
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#6366f1" fontSize="9" fontWeight="600">
                        BLOCK
                    </text>
                </g>
            ))}
        </svg>
    );
}

// ===================== HERO SECTION =====================
function HeroSection() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const words = ['Academic', 'Professional', 'Verified', 'Trusted'];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            {/* Background */}
            <div className="hero-bg">
                <BlockchainNetwork />
                <div className="hero-glow hero-glow-1" />
                <div className="hero-glow hero-glow-2" />
                <div className="hero-glow hero-glow-3" />
                <div className="bg-grid hero-grid-overlay" />
            </div>

            <div className="container">
                <motion.div className="hero-content" style={{ y, opacity }}>
                    {/* Badge */}
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero-badge-dot" />
                        <span>Blockchain-Powered Academic Credentials</span>
                        <span className="hero-badge-new">New v2.0</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="hero-title-container">
                        <TextReveal
                            text="Secure Your"
                            className="hero-title"
                        />
                        <div className="hero-rotating-word-row">
                            <span className="hero-rotating-word">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={wordIndex}
                                        className="text-gradient"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {words[wordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                            <TextReveal
                                text="Credentials"
                                className="hero-title inline"
                                delay={0.5}
                            />
                        </div>
                        <TextReveal
                            text="on the Blockchain"
                            className="hero-title"
                            delay={1}
                        />
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        DigiLocker 2.0 enables universities, colleges, and educational institutions to issue
                        tamper-proof digital certificates, degrees, and academic records — verifiable by
                        anyone, anywhere, instantly.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Start Issuing Credentials
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/verify" className="btn btn-secondary btn-lg">
                            <Play size={16} />
                            Verify a Credential
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        className="hero-trust"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="trust-item">
                            <CheckCircle size={14} />
                            <span>NITI Aayog Recognized</span>
                        </div>
                        <div className="trust-sep" />
                        <div className="trust-item">
                            <CheckCircle size={14} />
                            <span>ISO 27001 Certified</span>
                        </div>
                        <div className="trust-sep" />
                        <div className="trust-item">
                            <CheckCircle size={14} />
                            <span>Ministry of Education Partner</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div className="hero-visual-wrapper">
                        <BlockchainAnimation />
                        {/* Floating cards */}
                        <div className="floating-card floating-card-1 animate-float">
                            <CheckCircle size={16} />
                            <div>
                                <div className="fc-title">Credential Verified</div>
                                <div className="fc-sub">B.Tech — IIT Delhi, 2024</div>
                            </div>
                        </div>
                        <div className="floating-card floating-card-2 animate-float" style={{ animationDelay: '2s' }}>
                            <Lock size={16} />
                            <div>
                                <div className="fc-title">Blockchain Secured</div>
                                <div className="fc-sub">Hash: 0x4f3a...d7e2</div>
                            </div>
                        </div>
                        <div className="floating-card floating-card-3 animate-float" style={{ animationDelay: '4s' }}>
                            <Eye size={16} />
                            <div>
                                <div className="fc-title">Instantly Verifiable</div>
                                <div className="fc-sub">Zero-knowledge proof</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Banner */}
            <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
            >
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { value: 500, suffix: '+', label: 'Universities', icon: Building2 },
                            { value: 2000000, suffix: '+', label: 'Credentials Issued', icon: Award },
                            { value: 99.9, suffix: '%', label: 'Uptime SLA', icon: Zap, decimals: 1 },
                            { value: 180, suffix: '+', label: 'Countries Supported', icon: Globe },
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-icon">
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <div className="stat-value">
                                        <Counter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ===================== FEATURES SECTION =====================
function FeaturesSection() {
    const features = [
        {
            icon: Shield,
            title: 'Tamper-Proof Certificates',
            description: 'Every academic credential is cryptographically hashed and recorded on an immutable blockchain ledger, making forgery mathematically impossible.',
            color: '#6366f1',
            href: '/features/credential-issuance',
        },
        {
            icon: Eye,
            title: 'Instant Verification',
            description: 'Employers, institutions, and governments can verify the authenticity of any credential in seconds with a simple scan or link click.',
            color: '#a855f7',
            href: '/features/credential-verification',
        },
        {
            icon: Lock,
            title: 'Privacy-First Design',
            description: 'Students control who sees their credentials. Zero-knowledge proofs enable verification without revealing sensitive personal data.',
            color: '#06b6d4',
            href: '/features/document-storage',
        },
        {
            icon: Globe,
            title: 'Global Portability',
            description: 'Credentials are universally recognized and accessible from anywhere in the world, breaking down international credential barriers.',
            color: '#10b981',
            href: '/features',
        },
        {
            icon: Cpu,
            title: 'Smart Contracts',
            description: 'Automated credential issuance through smart contracts — no manual processing, no delays, no human error in the verification chain.',
            color: '#f59e0b',
            href: '/features/api-integration',
        },
        {
            icon: RefreshCw,
            title: 'Seamless Integration',
            description: 'REST APIs and SDKs for easy integration with existing LMS, ERP, and HR systems at universities and organizations worldwide.',
            color: '#f43f5e',
            href: '/features/api-integration',
        },
    ];

    const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="section home-features">
            <div className="container">
                <div className="section-header text-center">
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Zap size={12} />
                        Core Platform Features
                    </motion.div>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Everything You Need to{' '}
                        <span className="text-gradient">Modernize Credentials</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        From issuance to verification, DigiLocker 2.0 provides a complete ecosystem for managing
                        academic credentials at scale with enterprise-grade security.
                    </motion.p>
                </div>

                <div className="features-grid" ref={ref}>
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Link to={feature.href} className="feature-card-inner">
                                <div className="feature-icon-wrap" style={{ '--icon-color': feature.color } as React.CSSProperties}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.description}</p>
                                <div className="feature-link">
                                    Learn More <ChevronRight size={14} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ===================== HOW IT WORKS SECTION =====================
function HowItWorksSection() {
    const steps = [
        {
            number: '01',
            icon: Building2,
            title: 'Institution Registers',
            description: 'Universities and colleges sign up on the DigiLocker 2.0 platform, verify their identity through our KYC process, and receive their blockchain identity key for credential issuance.',
        },
        {
            number: '02',
            icon: FileCheck,
            title: 'Credential is Issued',
            description: 'Upon graduation or course completion, the institution mints a digital credential NFT. The credential details are hashed, signed, and anchored to the blockchain permanently.',
        },
        {
            number: '03',
            icon: Users,
            title: 'Student Receives',
            description: "The student receives their digital credential in their secure DigiLocker 2.0 wallet. They can view all credentials, control sharing permissions, and generate verification links.",
        },
        {
            number: '04',
            icon: Eye,
            title: 'Anyone Verifies Instantly',
            description: 'Employers, institutions, or governments click the verification link or scan a QR code. The blockchain confirms authenticity in under 2 seconds — no emails, no delays, no doubt.',
        },
    ];

    return (
        <section className="section how-it-works-preview">
            <div className="container">
                <div className="section-header text-center">
                    <div className="section-label">
                        <Link2 size={12} />
                        Simple 4-Step Process
                    </div>
                    <h2 className="section-title">
                        How DigiLocker 2.0{' '}
                        <span className="text-gradient">Works</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        From credential issuance to verification, the entire process is automated,
                        secure, and takes less than 24 hours end-to-end.
                    </p>
                </div>

                <div className="hiw-steps">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            className="hiw-step"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <div className="hiw-step-number">{step.number}</div>
                            <div className="hiw-step-connector" />
                            <div className="hiw-step-content card">
                                <div className="hiw-step-icon">
                                    <step.icon size={22} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link to="/how-it-works" className="btn btn-secondary">
                        See Full Process <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ===================== SOLUTIONS SECTION =====================
function SolutionsSection() {
    const solutions = [
        {
            icon: Building2,
            title: 'Universities & Colleges',
            desc: 'Automate degree and certificate issuance. Eliminate manual verification requests. Reduce administrative overhead by 80%.',
            href: '/solutions/universities',
            stats: '500+ institutions',
        },
        {
            icon: Users,
            title: 'Students & Alumni',
            desc: 'Own your credentials forever. Share verified certificates with employers globally. Build a trusted digital credential portfolio.',
            href: '/solutions/students',
            stats: '2M+ students served',
        },
        {
            icon: TrendingUp,
            title: 'Employers & HR Teams',
            desc: "Verify candidate credentials instantly. No more calling registrars. Eliminate fraudulent applicants from your recruitment pipeline.",
            href: '/solutions/employers',
            stats: '10K+ employers',
        },
        {
            icon: Globe,
            title: 'Government & Regulators',
            desc: 'Standardize credential formats across institutions. Enable national credential registries. Ensure regulatory compliance at scale.',
            href: '/solutions/government',
            stats: '15 state governments',
        },
    ];

    return (
        <section className="section solutions-preview">
            <div className="container">
                <div className="solutions-header">
                    <div>
                        <div className="section-label">
                            <Globe size={12} />
                            Solutions for Everyone
                        </div>
                        <h2 className="section-title">
                            Built for Every{' '}
                            <span className="text-gradient">Stakeholder</span>
                        </h2>
                    </div>
                    <Link to="/solutions" className="btn btn-secondary">
                        Explore All Solutions <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="solutions-grid">
                    {solutions.map((sol, i) => (
                        <motion.div
                            key={sol.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={sol.href} className="solution-card card">
                                <div className="solution-card-top">
                                    <div className="solution-icon">
                                        <sol.icon size={20} />
                                    </div>
                                    <span className="badge badge-primary">{sol.stats}</span>
                                </div>
                                <h3 className="solution-title">{sol.title}</h3>
                                <p>{sol.desc}</p>
                                <div className="solution-cta">
                                    Learn More <ChevronRight size={14} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ===================== SECURITY SECTION =====================
function SecuritySection() {
    const features = [
        'SHA-256 Cryptographic Hashing',
        'Ethereum / Hyperledger Blockchain',
        'Zero-Knowledge Proofs',
        'End-to-End Encryption (AES-256)',
        'Multi-Signature Verification',
        'Decentralized Storage (IPFS)',
        'SOC 2 Type II Audited',
        'GDPR & DPDP Compliant',
        'ISO 27001 Certified',
        'Role-Based Access Control',
    ];

    return (
        <section className="section security-section">
            <div className="container">
                <div className="security-inner">
                    <motion.div
                        className="security-visual"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="security-shield">
                            <div className="shield-rings">
                                {[1, 2, 3].map((r) => (
                                    <div key={r} className={`shield-ring ring-${r}`} />
                                ))}
                            </div>
                            <div className="shield-center animate-pulse-glow">
                                <Lock size={48} />
                            </div>
                        </div>
                        <div className="security-badges-float">
                            {['AES-256', 'SHA-256', 'Zero-KP', 'IPFS'].map((badge, i) => (
                                <div
                                    key={badge}
                                    className="sec-badge animate-float"
                                    style={{ animationDelay: `${i * 1.5}s` }}
                                >
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="security-content"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-label">
                            <Shield size={12} />
                            Enterprise Security
                        </div>
                        <h2 className="section-title">
                            Security Is Our{' '}
                            <span className="text-gradient">Foundation</span>
                        </h2>
                        <p className="section-subtitle">
                            Built with military-grade cryptography and enterprise compliance standards,
                            DigiLocker 2.0 ensures your academic credentials are protected against
                            any form of tampering or fraud.
                        </p>
                        <div className="security-features">
                            {features.map((f, i) => (
                                <motion.div
                                    key={f}
                                    className="security-feature-item"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <CheckCircle size={14} />
                                    <span>{f}</span>
                                </motion.div>
                            ))}
                        </div>
                        <Link to="/security" className="btn btn-primary mt-8">
                            View Security Architecture <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ===================== TESTIMONIALS SECTION =====================
function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Dr. Ananya Sharma',
            role: 'Registrar',
            institution: 'IIT Bombay',
            quote: 'DigiLocker 2.0 has eliminated over 2,000 manual verification requests per month. Our administrative staff can now focus on more meaningful work.',
            rating: 5,
            avatar: 'AS',
        },
        {
            name: 'Rajesh Kumar',
            role: 'VP Human Resources',
            institution: 'Infosys Limited',
            quote: "We've caught 12 fraudulent degree certificates in the first month alone using DigiLocker 2.0 verification. It's an indispensable hiring tool.",
            rating: 5,
            avatar: 'RK',
        },
        {
            name: 'Priya Mehta',
            role: 'Alumna',
            institution: 'Delhi University, 2023',
            quote: 'I shared my degree with an employer in Germany directly through DigiLocker 2.0. The verification took 3 seconds. I got the internship!',
            rating: 5,
            avatar: 'PM',
        },
        {
            name: 'Prof. Suresh Patel',
            role: 'Dean of Academics',
            institution: 'NIT Surat',
            quote: 'The implementation was seamless with our existing systems. Our graduates now have globally verifiable credentials from day one of graduation.',
            rating: 5,
            avatar: 'SP',
        },
    ];

    return (
        <section className="section testimonials-section">
            <div className="container">
                <div className="section-header text-center">
                    <div className="section-label">
                        <Star size={12} />
                        Success Stories
                    </div>
                    <h2 className="section-title">
                        Loved by <span className="text-gradient">Institutions Worldwide</span>
                    </h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            className="testimonial-card card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="testimonial-stars">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                                ))}
                            </div>
                            <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                            <div className="testimonial-author">
                                <div className="avatar">{t.avatar}</div>
                                <div>
                                    <div className="author-name">{t.name}</div>
                                    <div className="author-role">{t.role} — {t.institution}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ===================== CTA SECTION =====================
function CTASection() {
    return (
        <section className="cta-section">
            <div className="container">
                <motion.div
                    className="cta-inner"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="cta-bg-glow" />
                    <div className="section-label" style={{ marginBottom: '1.5rem' }}>
                        <Zap size={12} />
                        Get Started Today
                    </div>
                    <h2 className="section-title">
                        Ready to Transform Your{' '}
                        <span className="text-gradient">Credential System?</span>
                    </h2>
                    <p className="section-subtitle mx-auto" style={{ marginBottom: '2.5rem' }}>
                        Join 500+ educational institutions that have already modernized their credential
                        management. Get started in under 30 minutes.
                    </p>
                    <div className="cta-actions">
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Request a Demo <ArrowRight size={18} />
                        </Link>
                        <Link to="/pricing" className="btn btn-secondary btn-lg">
                            View Pricing
                        </Link>
                    </div>
                    <div className="cta-note">
                        <CheckCircle size={14} />
                        <span>Free 30-day trial • No credit card required • Setup in under 30 minutes</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ===================== MAIN EXPORT =====================
export default function Home() {
    return (
        <div className="home">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <SolutionsSection />
            <SecuritySection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
}
