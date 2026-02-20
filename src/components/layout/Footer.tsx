import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail, Phone, MapPin, Award, ChevronRight } from 'lucide-react';
import './Footer.css';

const footerLinks = {
    product: [
        { label: 'Features', href: '/features' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Security', href: '/security' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dashboard', href: '/dashboard' },
    ],
    solutions: [
        { label: 'For Universities', href: '/solutions/universities' },
        { label: 'For Students', href: '/solutions/students' },
        { label: 'For Employers', href: '/solutions/employers' },
        { label: 'For Government', href: '/solutions/government' },
    ],
    resources: [
        { label: 'Documentation', href: '/resources/documentation' },
        { label: 'Blog', href: '/resources/blog' },
        { label: 'Case Studies', href: '/resources/case-studies' },
        { label: 'FAQ', href: '/resources/faq' },
        { label: 'API Reference', href: '/resources/documentation' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
    ],
};

export default function Footer() {
    return (
        <footer className="footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <div className="footer-logo-icon">
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                                        <defs>
                                            <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#6366f1" />
                                                <stop offset="0.5" stopColor="#a855f7" />
                                                <stop offset="1" stopColor="#06b6d4" />
                                            </linearGradient>
                                        </defs>
                                        <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)" />
                                        <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="24" cy="20" r="3" fill="white" opacity="0.9" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="footer-logo-name">DigiLocker <span>2.0</span></div>
                                    <div className="footer-logo-tagline">Blockchain Academic Credentials</div>
                                </div>
                            </Link>
                            <p className="footer-desc">
                                Empowering educational institutions and students with immutable, instantly verifiable academic credentials powered by blockchain technology.
                            </p>

                            {/* Trust Badges */}
                            <div className="footer-badges">
                                <div className="trust-badge">
                                    <Award size={14} />
                                    <span>ISO 27001 Certified</span>
                                </div>
                                <div className="trust-badge">
                                    <Shield size={14} />
                                    <span>SOC 2 Type II</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="footer-social">
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <Twitter size={16} />
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <Linkedin size={16} />
                                </a>
                                <a href="#" className="social-link" aria-label="GitHub">
                                    <Github size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div className="footer-links-section">
                            <h4>Product</h4>
                            <ul>
                                {footerLinks.product.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href}>
                                            <ChevronRight size={12} />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Solutions</h4>
                            <ul>
                                {footerLinks.solutions.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href}>
                                            <ChevronRight size={12} />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Resources</h4>
                            <ul>
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href}>
                                            <ChevronRight size={12} />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Company</h4>
                            <ul>
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href}>
                                            <ChevronRight size={12} />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Contact Info */}
                            <div className="footer-contact">
                                <div className="contact-item">
                                    <Mail size={13} />
                                    <span>support@digilocker2.com</span>
                                </div>
                                <div className="contact-item">
                                    <Phone size={13} />
                                    <span>+91 1800 123 4567</span>
                                </div>
                                <div className="contact-item">
                                    <MapPin size={13} />
                                    <span>New Delhi, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Bar */}
            <div className="footer-newsletter">
                <div className="container">
                    <div className="newsletter-inner">
                        <div className="newsletter-text">
                            <h4>Stay ahead of credential innovation</h4>
                            <p>Get the latest updates on blockchain credentials, industry insights, and platform news.</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email address" className="form-input" />
                            <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <p>© {new Date().getFullYear()} DigiLocker 2.0. All rights reserved. Powered by Blockchain Technology.</p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/terms">Terms</Link>
                            <a href="#">Cookies</a>
                            <a href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
