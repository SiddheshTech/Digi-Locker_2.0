import { Bell, Search, LayoutDashboard, FileText, History, Award, BarChart2, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { StudentOverview, MyCredentials, ConsentLog, SkillChain, ShareAnalytics } from './StudentViews';
import './Student.css';

export default function StudentDashboard() {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/student' && (location.pathname === '/student' || location.pathname === '/student/')) return true;
        return location.pathname.startsWith(path) && path !== '/student';
    };

    return (
        <div className="student-page">
            <div className="student-container">
                {/* Sidebar */}
                <aside className="student-sidebar glass-panel">
                    <Link to="/" className="student-brand">
                        <motion.div
                            className="student-logo"
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            D
                        </motion.div>
                        <span className="text-gradient">Student Vault</span>
                    </Link>

                    <nav className="student-nav">
                        {[
                            { to: '/student', icon: LayoutDashboard, label: 'Dashboard' },
                            { to: '/student/credentials', icon: FileText, label: 'My Credentials' },
                            { to: '/student/consents', icon: History, label: 'Consent Log' },
                            { to: '/student/skillchain', icon: Award, label: 'SkillChain Profile' },
                            { to: '/student/analytics', icon: BarChart2, label: 'Share Analytics' },
                        ].map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`student-nav-item ${isActive(item.to) ? 'active' : ''}`}
                            >
                                <item.icon size={19} />
                                <span>{item.label}</span>
                                {isActive(item.to) && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <div className="mt-auto pt-10">
                            <Link to="/student/settings" className={`student-nav-item ${isActive('/student/settings') ? 'active' : ''}`}>
                                <Settings size={19} />
                                <span>Settings</span>
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="student-main">
                    <header className="student-header">
                        <div className="flex items-center gap-12 flex-1">
                            <h2 className="text-xl font-black text-white hidden xl:block tracking-tighter uppercase italic opacity-80">Vault.OS</h2>
                            <div className="relative max-w-sm w-full group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={15} />
                                <input
                                    type="text"
                                    placeholder="Execute search command..."
                                    className="search-field-extreme"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="btn-extreme !p-2.5">
                                <Bell size={18} className="text-slate-400" />
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                            </button>
                            <div className="h-8 w-[1px] bg-white/5 mx-2"></div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] font-black text-white uppercase tracking-tighter mb-0.5">Alice Thorne</div>
                                    <div className="text-[9px] text-indigo-400 font-bold uppercase tracking-[0.1em]">Level 42 Verified</div>
                                </div>
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/30 transition-all shadow-xl shadow-black/20">
                                    <User size={20} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="student-content">
                        <Routes>
                            <Route index element={<StudentOverview />} />
                            <Route path="credentials" element={<MyCredentials />} />
                            <Route path="consents" element={<ConsentLog />} />
                            <Route path="skillchain" element={<SkillChain />} />
                            <Route path="analytics" element={<ShareAnalytics />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
