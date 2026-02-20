import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Globe } from 'lucide-react';
import './Pricing.css';

const plans = [
    {
        name: 'Starter',
        price: 0,
        period: 'Free Forever',
        desc: 'For small institutions issuing < 100 credentials/year.',
        features: [
            'Up to 100 credentials/year',
            'Basic email support',
            'Standard certificate templates',
            'Manual CSV upload',
            'Public verification page'
        ],
        cta: 'Start for Free',
        highlight: false,
        icon: Zap
    },
    {
        name: 'Institution',
        price: 499,
        period: '/month',
        desc: 'Perfect for colleges and mid-sized universities.',
        features: [
            'Up to 10,000 credentials/year',
            'Priority email & chat support',
            'Custom branded templates',
            'API access & SIS integration',
            'Bulk issuance tools',
            'Analytics dashboard'
        ],
        cta: 'Start 30-Day Trial',
        highlight: true,
        icon: Building2
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        desc: 'For large universities and national bodies.',
        features: [
            'Unlimited credentials',
            'Dedicated account manager',
            'On-premise deployment option',
            'Custom smart contract logic',
            'SLA with 99.99% uptime',
            'Single Sign-On (SSO)'
        ],
        cta: 'Contact Sales',
        highlight: false,
        icon: Globe
    }
];

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="pricing-page">
            <section className="page-hero">
                <div className="page-hero-glow" style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 70%)' }} />
                <div className="container">
                    <motion.div className="page-hero-content text-center mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Zap size={12} /> Simple Pricing</div>
                        <h1>Transparent, Predictable <span className="text-gradient">Costs</span></h1>
                        <p>Choose the plan that fits your institution's size. No hidden fees for verification.</p>

                        <div className="pricing-toggle">
                            <span className={!isAnnual ? 'active' : ''}>Monthly</span>
                            <button
                                className={`toggle-switch ${isAnnual ? 'on' : ''}`}
                                onClick={() => setIsAnnual(!isAnnual)}
                            >
                                <div className="toggle-thumb" />
                            </button>
                            <span className={isAnnual ? 'active' : ''}>Annual <span className="discount-badge">-20%</span></span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="pricing-grid">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                className={`pricing-card card ${plan.highlight ? 'highlighted' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {plan.highlight && <div className="popular-badge">Most Popular</div>}
                                <div className="plan-icon">
                                    <plan.icon size={24} />
                                </div>
                                <h3>{plan.name}</h3>
                                <div className="plan-price">
                                    {typeof plan.price === 'number' ? (
                                        <>
                                            <span className="currency">$</span>
                                            {isAnnual && plan.price > 0 ? (plan.price * 0.8).toFixed(0) : plan.price}
                                        </>
                                    ) : plan.price}
                                    <span className="period">{plan.period}</span>
                                </div>
                                <p className="plan-desc">{plan.desc}</p>
                                <ul className="plan-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j}><Check size={16} /> {f}</li>
                                    ))}
                                </ul>
                                <Link to="/contact" className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} w-full`}>
                                    {plan.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pricing-faq">
                        <h3 className="text-center mb-8">Frequently Asked Questions</h3>
                        <div className="grid-2">
                            <div className="faq-card card">
                                <h4>Do verifiers pay?</h4>
                                <p>No. Verification is always free for employers, other universities, and third parties.</p>
                            </div>
                            <div className="faq-card card">
                                <h4>Can I upgrade later?</h4>
                                <p>Yes, you can upgrade your plan at any time. We'll prorate the remaining time on your current subscription.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
