import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Building2, GraduationCap, ShieldCheck, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Auth.css';

type Role = 'institution' | 'student' | 'verifier';

export default function Login() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialRole = (queryParams.get('role') as Role) || 'student';

    const [role, setRole] = useState<Role>(initialRole);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            const redirectPath = role === 'institution' ? '/issuer' : (role === 'student' ? '/student' : '/verify');
            window.location.href = redirectPath;
        }, 1500);
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-header">
                    <h1>Welcome <span className="text-gradient">Back</span></h1>
                    <p>Enter your credentials to access your account</p>
                </div>

                <div className="role-tabs">
                    <button
                        className={`role-tab ${role === 'institution' ? 'active' : ''}`}
                        onClick={() => setRole('institution')}
                    >
                        <Building2 size={18} />
                        <span>Institution</span>
                        {role === 'institution' && <motion.div layoutId="tab-indicator" className="role-tab-indicator" />}
                    </button>
                    <button
                        className={`role-tab ${role === 'student' ? 'active' : ''}`}
                        onClick={() => setRole('student')}
                    >
                        <GraduationCap size={18} />
                        <span>Student</span>
                        {role === 'student' && <motion.div layoutId="tab-indicator" className="role-tab-indicator" />}
                    </button>
                    <button
                        className={`role-tab ${role === 'verifier' ? 'active' : ''}`}
                        onClick={() => setRole('verifier')}
                    >
                        <ShieldCheck size={18} />
                        <span>Verifier</span>
                        {role === 'verifier' && <motion.div layoutId="tab-indicator" className="role-tab-indicator" />}
                    </button>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="form-group">
                                <label>{role === 'institution' ? 'Institution Email' : 'Email Address'}</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        type="email"
                                        className="auth-input"
                                        placeholder={role === 'institution' ? 'admin@university.edu' : 'john@example.com'}
                                        required
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="social-auth">
                    <div className="social-auth-divider">
                        <div className="divider-line"></div>
                        <span>Or continue with</span>
                        <div className="divider-line"></div>
                    </div>
                    <div className="social-btns">
                        <button className="btn-social">
                            <Chrome size={18} />
                            <span>Google</span>
                        </button>
                        <button className="btn-social">
                            <Github size={18} />
                            <span>Github</span>
                        </button>
                    </div>
                </div>

                <div className="auth-footer">
                    Don't have an account?
                    <Link to={`/signup?role=${role}`} className="auth-link">Sign Up</Link>
                </div>
            </motion.div>
        </div>
    );
}
