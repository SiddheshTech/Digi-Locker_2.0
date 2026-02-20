import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FilePlus,
    FileText,
    Files,
    Key,
    FileCode,
    ShieldAlert,
    Menu,
    X,
    Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IssuerLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { path: '/issuer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/issuer/issue', label: 'Issue Credential', icon: FilePlus },
        { path: '/issuer/records', label: 'Records', icon: FileText },
        { path: '/issuer/batch', label: 'Batch Issue', icon: Files },
        { path: '/issuer/keys', label: 'Key Management', icon: Key },
        { path: '/issuer/templates', label: 'Templates', icon: FileCode },
        { path: '/issuer/alerts', label: 'Fraud Alerts', icon: ShieldAlert },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        exit={{ x: -250 }}
                        className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed md:relative z-20 h-full"
                    >
                        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                DigiLocker
                            </span>
                            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                                : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700/30 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">
                                    IS
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium truncate">Issuer Admin</p>
                                    <p className="text-xs text-gray-400">University</p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-6">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            System Operational
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 text-sm cursor-pointer hover:bg-purple-500/20 transition-colors">
                            <Wallet size={16} />
                            <span>0xMOCK...ISSUER</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-900">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
