import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield, Layers, Users, BookOpen, LogIn, Lock } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    {
        label: 'Features',
        href: '/features',
        dropdown: [
            { label: 'Credential Issuance', href: '/features/credential-issuance', icon: Shield },
            { label: 'Credential Verification', href: '/features/credential-verification', icon: Lock },
            { label: 'Document Storage', href: '/features/document-storage', icon: Layers },
            { label: 'API Integration', href: '/features/api-integration', icon: BookOpen },
        ],
    },
    {
        label: 'Solutions',
        href: '/solutions',
        dropdown: [
            { label: 'For Universities', href: '/solutions/universities', icon: BookOpen },
            { label: 'For Students', href: '/solutions/students', icon: Users },
            { label: 'For Employers', href: '/solutions/employers', icon: Layers },
            { label: 'For Government', href: '/solutions/government', icon: Shield },
        ],
    },
    { label: 'How It Works', href: '/how-it-works' },
    {
        label: 'Resources',
        href: '#',
        dropdown: [
            { label: 'Documentation', href: '/resources/documentation', icon: BookOpen },
            { label: 'Blog', href: '/resources/blog', icon: Layers },
            { label: 'Case Studies', href: '/resources/case-studies', icon: Users },
            { label: 'FAQ', href: '/resources/faq', icon: Shield },
        ],
    },
    { label: 'Security', href: '/security' },
    { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Setting state on navigation is required here
        if (mobileOpen) setMobileOpen(false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Setting state on navigation is required here
        if (activeDropdown) setActiveDropdown(null);
    }, [location, mobileOpen, activeDropdown]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <defs>
                                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="0.5" stopColor="#a855f7" />
                                    <stop offset="1" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                            <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
                            <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="24" cy="20" r="3" fill="white" opacity="0.9" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">DigiLocker</span>
                        <span className="logo-version">2.0</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="navbar-links" ref={dropdownRef}>
                    {navLinks.map((link) => (
                        <div
                            key={link.label}
                            className="nav-item"
                            onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                to={link.href}
                                className={`nav-link ${location.pathname.startsWith(link.href) && link.href !== '#' ? 'active' : ''}`}
                            >
                                {link.label}
                                {link.dropdown && <ChevronDown size={14} className={`nav-chevron ${activeDropdown === link.label ? 'rotated' : ''}`} />}
                            </Link>

                            {link.dropdown && activeDropdown === link.label && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-inner">
                                        {link.dropdown.map((item) => (
                                            <Link key={item.href} to={item.href} className="dropdown-item">
                                                <div className="dropdown-icon">
                                                    <item.icon size={16} />
                                                </div>
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="navbar-cta">
                    <Link to="/verify" className="btn btn-ghost nav-verify">
                        <Shield size={14} />
                        Verify
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-sm">
                        <LogIn size={14} />
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-sm">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <div key={link.label} className="mobile-nav-section">
                            <Link to={link.href !== '#' ? link.href : '/features'} className="mobile-nav-link">
                                {link.label}
                            </Link>
                            {link.dropdown && (
                                <div className="mobile-subnav">
                                    {link.dropdown.map((item) => (
                                        <Link key={item.href} to={item.href} className="mobile-subnav-link">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mobile-cta">
                        <Link to="/verify" className="btn btn-secondary btn-sm w-full">Verify Credential</Link>
                        <Link to="/contact" className="btn btn-primary btn-sm w-full">Get Started</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
