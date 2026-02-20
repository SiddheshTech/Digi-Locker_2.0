import { motion } from 'framer-motion';
import {
    Bell,
    Search,
    ChevronDown,
    MoreHorizontal,
    Download,
    Plus,
    Filter,
    LayoutDashboard,
    FileText,
    Users,
    CheckCircle,
    BarChart3,
    Settings,
    UserPlus,
    ShieldCheck,
    Clock
} from 'lucide-react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import './DashboardPreview.css';

const recentCredentials = [
    { id: 'CID-8293', name: 'Bachelor of Computer Science', recipient: 'John Doe', date: '2 mins ago', status: 'Issued' },
    { id: 'CID-8292', name: 'Master of Business Admin', recipient: 'Sarah Smith', date: '15 mins ago', status: 'Pending' },
    { id: 'CID-8291', name: 'Data Science Certificate', recipient: 'Mike Ross', date: '1 hour ago', status: 'Issued' },
    { id: 'CID-8290', name: 'Advanced AI Diploma', recipient: 'Jessica Lee', date: '3 hours ago', status: 'Failed' },
    { id: 'CID-8289', name: 'Web Development Bootcamp', recipient: 'David Kim', date: '5 hours ago', status: 'Issued' },
];

// --- Sub-Views ---

const OverviewView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Dashboard Overview</h1>
            <button className="dash-btn-primary"><Plus size={16} /> Issue Credential</button>
        </div>

        <div className="dash-stats-grid">
            <motion.div className="dash-stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3>Total Credentials</h3>
                <div className="stat-value">12,450</div>
                <div className="stat-change positive">+12% this month</div>
            </motion.div>
            <motion.div className="dash-stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3>Active Students</h3>
                <div className="stat-value">8,320</div>
                <div className="stat-change positive">+5% this month</div>
            </motion.div>
            <motion.div className="dash-stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3>Verification Requests</h3>
                <div className="stat-value">458</div>
                <div className="stat-change neutral">0% this month</div>
            </motion.div>
            <motion.div className="dash-stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3>Failed Issuances</h3>
                <div className="stat-value">12</div>
                <div className="stat-change negative">-2 this month</div>
            </motion.div>
        </div>

        <div className="dash-table-card">
            <div className="table-header">
                <h3>Recent Activity</h3>
                <div className="table-actions">
                    <button className="dash-btn-ghost"><Filter size={16} /> Filter</button>
                    <button className="dash-btn-ghost"><Download size={16} /> Export</button>
                </div>
            </div>
            <div className="dash-table-wrapper">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Credential Name</th>
                            <th>Recipient</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentCredentials.map((row, i) => (
                            <tr key={i}>
                                <td className="font-mono text-sm">{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.recipient}</td>
                                <td className="text-secondary text-sm">{row.date}</td>
                                <td>
                                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td><MoreHorizontal size={16} className="cursor-pointer text-secondary" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const CredentialsView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Credentials Registry</h1>
            <div className="flex gap-2">
                <button className="dash-btn-ghost"><Download size={16} /> Batch Issue</button>
                <button className="dash-btn-primary"><Plus size={16} /> New Credential</button>
            </div>
        </div>
        <div className="dash-table-card p-12 text-center">
            <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-400">
                <FileText size={32} />
            </div>
            <h3 className="text-white text-lg mb-2">No credentials found</h3>
            <p className="text-secondary mb-6">Start by issuing your first verifiable academic certificate on the blockchain.</p>
            <button className="btn btn-primary btn-sm mx-auto">Create Template</button>
        </div>
    </div>
);

const RecipientsView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Students & Recipients</h1>
            <button className="dash-btn-primary"><UserPlus size={16} /> Add Recipient</button>
        </div>
        <div className="dash-stats-grid mb-8">
            <div className="dash-stat-card">
                <h3>Verified Profiles</h3>
                <div className="stat-value">6,240</div>
            </div>
            <div className="dash-stat-card">
                <h3>Pending Activation</h3>
                <div className="stat-value">1,080</div>
            </div>
        </div>
        <div className="dash-table-card p-12 text-center text-secondary">
            <Users size={48} className="mx-auto mb-4 opacity-20" />
            <p>Your student directory will appear here once you've added or imported recipients.</p>
        </div>
    </div>
);

const VerificationLogView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Verification Traffic</h1>
            <div className="flex gap-2">
                <button className="dash-btn-ghost"><Clock size={16} /> History</button>
                <button className="dash-btn-primary"><ShieldCheck size={16} /> Real-time Nodes</button>
            </div>
        </div>
        <div className="dash-table-card">
            <div className="table-header">
                <h3>Latest Requests</h3>
            </div>
            <div className="p-12 text-center text-secondary">
                <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p>Waiting for verification requests from employers or third-party verifiers.</p>
            </div>
        </div>
    </div>
);

const AnalyticsView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Platform Analytics</h1>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="dash-stat-card h-64 flex items-center justify-center text-secondary border-dashed">
                Chart Placeholder: Issuance Volume
            </div>
            <div className="dash-stat-card h-64 flex items-center justify-center text-secondary border-dashed">
                Chart Placeholder: Verification Success Rate
            </div>
        </div>
    </div>
);

const SettingsView = () => (
    <div className="dash-content">
        <div className="dash-title-row">
            <h1>Institution Settings</h1>
        </div>
        <div className="dash-table-card p-8">
            <div className="space-y-6">
                <div>
                    <h4 className="text-white mb-4">Blockchain Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="text-xs text-secondary mb-1">Network</label>
                            <input type="text" className="form-input opacity-50" value="DigiLocker Mainnet (Local)" disabled />
                        </div>
                        <div className="form-group">
                            <label className="text-xs text-secondary mb-1">Issuer Address</label>
                            <input type="text" className="form-input opacity-50" value="0x71C765...d897" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Component ---

export default function DashboardPreview() {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path === '/dashboard' && location.pathname === '/dashboard/') return true;
        return location.pathname.startsWith(path) && path !== '/dashboard';
    };

    return (
        <div className="dashboard-preview-page">
            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="dash-sidebar">
                    <Link to="/" className="dash-brand">
                        <div className="dash-logo-icon">D</div>
                        <span>DigiLocker</span>
                    </Link>
                    <nav className="dash-nav">
                        <Link to="/dashboard" className={`dash-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/dashboard/credentials" className={`dash-nav-item ${isActive('/dashboard/credentials') ? 'active' : ''}`}>
                            <FileText size={18} />
                            <span>Credentials</span>
                        </Link>
                        <Link to="/dashboard/recipients" className={`dash-nav-item ${isActive('/dashboard/recipients') ? 'active' : ''}`}>
                            <Users size={18} />
                            <span>Recipients</span>
                        </Link>
                        <Link to="/dashboard/verification" className={`dash-nav-item ${isActive('/dashboard/verification') ? 'active' : ''}`}>
                            <CheckCircle size={18} />
                            <span>Verification</span>
                        </Link>
                        <Link to="/dashboard/analytics" className={`dash-nav-item ${isActive('/dashboard/analytics') ? 'active' : ''}`}>
                            <BarChart3 size={18} />
                            <span>Analytics</span>
                        </Link>
                        <Link to="/dashboard/settings" className={`dash-nav-item ${isActive('/dashboard/settings') ? 'active' : ''} mt-auto`}>
                            <Settings size={18} />
                            <span>Settings</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="dash-main">
                    <header className="dash-header">
                        <div className="dash-search">
                            <Search size={16} />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="dash-user">
                            <div className="dash-icon"><Bell size={18} /></div>
                            <div className="dash-avatar">AD</div>
                            <span>Admin</span>
                            <ChevronDown size={14} />
                        </div>
                    </header>

                    <Routes>
                        <Route index element={<OverviewView />} />
                        <Route path="credentials" element={<CredentialsView />} />
                        <Route path="recipients" element={<RecipientsView />} />
                        <Route path="verification" element={<VerificationLogView />} />
                        <Route path="analytics" element={<AnalyticsView />} />
                        <Route path="settings" element={<SettingsView />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
