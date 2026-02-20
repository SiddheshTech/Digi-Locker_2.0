import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Building2, GraduationCap, ShieldCheck, ArrowRight, User, Hash } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Auth.css';

type Role = 'institution' | 'student' | 'verifier';

export default function SignUp() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialRole = (queryParams.get('role') as Role) || 'student';

    const [role, setRole] = useState<Role>(initialRole);
    const [loading, setLoading] = useState(false);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            setLoading(false);
            window.location.href = '/login';
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
                    <h1>Create <span className="text-gradient">Account</span></h1>
                    <p>Join the future of verifiable credentials</p>
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

                <form onSubmit={handleSignUp} className="auth-form">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="auth-form"
                        >
                            <div className="form-group">
                                <label>{role === 'institution' ? 'Institution Name' : 'Full Name'}</label>
                                <div className="input-wrapper">
                                    <User className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        className="auth-input"
                                        placeholder={role === 'institution' ? 'Global City University' : 'John Doe'}
                                        required
                                    />
                                </div>
                            </div>

                            {role === 'student' && (
                                <div className="form-group">
                                    <label>Student ID / Enrollment No.</label>
                                    <div className="input-wrapper">
                                        <Hash className="input-icon" size={18} />
                                        <input
                                            type="text"
                                            className="auth-input"
                                            placeholder="STU-12345"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>{role === 'institution' ? 'Official Email' : 'Email Address'}</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        type="email"
                                        className="auth-input"
                                        placeholder={role === 'institution' ? 'contact@university.edu' : 'john@example.com'}
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
                    </div>

                    <p className="text-xs text-secondary text-center px-4">
                        By signing up, you agree to our <Link to="/terms" className="text-primary-400">Terms of Service</Link> and <Link to="/privacy" className="text-primary-400">Privacy Policy</Link>.
                    </p>

                    <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to={`/login?role=${role}`} className="auth-link">Sign In</Link>
                </div>
            </motion.div>
        </div>
    );
}
