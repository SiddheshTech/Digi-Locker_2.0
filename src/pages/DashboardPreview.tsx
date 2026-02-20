import { motion } from 'framer-motion';
import {
    Bell,
    Search,
    ChevronDown,
    MoreHorizontal,
    Download,
    Plus,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './DashboardPreview.css';

const recentCredentials = [
    { id: 'CID-8293', name: 'Bachelor of Computer Science', recipient: 'John Doe', date: '2 mins ago', status: 'Issued' },
    { id: 'CID-8292', name: 'Master of Business Admin', recipient: 'Sarah Smith', date: '15 mins ago', status: 'Pending' },
    { id: 'CID-8291', name: 'Data Science Certificate', recipient: 'Mike Ross', date: '1 hour ago', status: 'Issued' },
    { id: 'CID-8290', name: 'Advanced AI Diploma', recipient: 'Jessica Lee', date: '3 hours ago', status: 'Failed' },
    { id: 'CID-8289', name: 'Web Development Bootcamp', recipient: 'David Kim', date: '5 hours ago', status: 'Issued' },
];

export default function DashboardPreview() {
    return (
        <div className="dashboard-preview-page">
            <div className="dashboard-container">
                {/* Sidebar Mockup */}
                <aside className="dash-sidebar">
                    <div className="dash-brand">
                        <div className="dash-logo-icon">D</div>
                        <span>DigiLocker</span>
                    </div>
                    <nav className="dash-nav">
                        <div className="dash-nav-item active">Dashboard</div>
                        <div className="dash-nav-item">Credentials</div>
                        <div className="dash-nav-item">Recipients</div>
                        <div className="dash-nav-item">Verification</div>
                        <div className="dash-nav-item">Analytics</div>
                        <div className="dash-nav-item mt-auto">Settings</div>
                    </nav>
                </aside>

                {/* Main Content Mockup */}
                <main className="dash-main">
                    <header className="dash-header">
                        <div className="dash-search">
                            <Search size={16} />
                            <input type="text" placeholder="Search..." disabled />
                        </div>
                        <div className="dash-user">
                            <div className="dash-icon"><Bell size={18} /></div>
                            <div className="dash-avatar">AD</div>
                            <span>Admin</span>
                            <ChevronDown size={14} />
                        </div>
                    </header>

                    <div className="dash-content">
                        <div className="dash-title-row">
                            <h1>Dashboard Overview</h1>
                            <button className="dash-btn-primary"><Plus size={16} /> Issue Credential</button>
                        </div>

                        {/* Stats Grid */}
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

                        {/* Recent Activity Table */}
                        <div className="dash-table-card">
                            <div className="table-header">
                                <h3>Recent Credentials</h3>
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
                </main>

                {/* Overlay CTA */}
                <div className="dashboard-overlay-cta">
                    <div className="cta-content">
                        <h2>Experience the Full Power</h2>
                        <p>This is just a preview. Sign in to access your institution's live dashboard.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">Request Access</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
