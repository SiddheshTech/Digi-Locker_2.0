import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './VerificationPortal.css'; // Reuse styles

export default function InstitutionPortal() {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = '/dashboard'; // Mock redirect
        }, 1500);
    };

    return (
        <div className="verification-page">
            <div className="container min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
                <motion.div
                    className="verification-card card p-8 w-full max-w-md border-t-4 border-t-purple-500"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                            <Building2 size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Institution Login</h1>
                        <p className="text-secondary text-sm mt-2">Access your issuance dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Institution Email</label>
                            <input
                                type="email"
                                className="form-input w-full"
                                placeholder="admin@university.edu"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                className="form-input w-full"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded bg-gray-700 border-gray-600" /> Remember me
                            </label>
                            <a href="#" className="hover:text-purple-400">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full flex justify-center items-center gap-2 mt-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'} <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 pt-6 border-t border-gray-800">
                        Not registered yet? <Link to="/contact" className="text-purple-400 hover:text-purple-300">Request Access</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
