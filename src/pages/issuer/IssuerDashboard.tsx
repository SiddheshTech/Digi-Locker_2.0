import { Bell, Search, ChevronDown, LayoutDashboard, FileText, Key, Filter, Download, Plus, Settings } from 'lucide-react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { IssuerOverview, IssueCredential, RecordsList, KeyManagement, BatchIssue, TemplateManager, FraudAlerts } from './IssuerViews';
import './Issuer.css';
import WalletButton from '../../components/wallet/WalletButton';

export default function IssuerDashboard() {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/issuer' && (location.pathname === '/issuer' || location.pathname === '/issuer/')) return true;
        return location.pathname.startsWith(path) && path !== '/issuer';
    };

    return (
        <div className="issuer-page">
            <div className="issuer-container">
                {/* Sidebar */}
                <aside className="issuer-sidebar">
                    <Link to="/" className="issuer-brand">
                        <div className="issuer-logo-icon">D</div>
                        <span className="font-bold">Issuer Portal</span>
                    </Link>
                    <nav className="issuer-nav">
                        <Link to="/issuer" className={`issuer-nav-item ${isActive('/issuer') ? 'active' : ''}`}>
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/issuer/issue" className={`issuer-nav-item ${isActive('/issuer/issue') ? 'active' : ''}`}>
                            <Plus size={18} />
                            <span>Issue Credential</span>
                        </Link>
                        <Link to="/issuer/batch" className={`issuer-nav-item ${isActive('/issuer/batch') ? 'active' : ''}`}>
                            <Filter size={18} />
                            <span>Batch Issuance</span>
                        </Link>
                        <Link to="/issuer/records" className={`issuer-nav-item ${isActive('/issuer/records') ? 'active' : ''}`}>
                            <FileText size={18} />
                            <span>Issued Records</span>
                        </Link>
                        <Link to="/issuer/templates" className={`issuer-nav-item ${isActive('/issuer/templates') ? 'active' : ''}`}>
                            <Download size={18} />
                            <span>Templates</span>
                        </Link>
                        <Link to="/issuer/keys" className={`issuer-nav-item ${isActive('/issuer/keys') ? 'active' : ''}`}>
                            <Key size={18} />
                            <span>Key Management</span>
                        </Link>
                        <Link to="/issuer/alerts" className={`issuer-nav-item ${isActive('/issuer/alerts') ? 'active' : ''}`}>
                            <Bell size={18} />
                            <span>Fraud Alerts</span>
                        </Link>
                        <Link to="/issuer/settings" className="issuer-nav-item mt-auto">
                            <Settings size={18} />
                            <span>Settings</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="issuer-main">
                    <header className="issuer-header">
                        <div className="dash-search">
                            <Search size={16} />
                            <input type="text" placeholder="Search records, TX hashes..." />
                        </div>
                        <div className="dash-user">
                            <WalletButton />
                            <div className="dash-icon"><Bell size={18} /></div>
                            <div className="dash-avatar" style={{ background: 'var(--primary-600)' }}>IP</div>
                            <span>Institution Admin</span>
                            <ChevronDown size={14} />
                        </div>
                    </header>

                    <div className="issuer-content">
                        <Routes>
                            <Route index element={<IssuerOverview />} />
                            <Route path="issue" element={<IssueCredential />} />
                            <Route path="records" element={<RecordsList />} />
                            <Route path="keys" element={<KeyManagement />} />
                            <Route path="batch" element={<BatchIssue />} />
                            <Route path="templates" element={<TemplateManager />} />
                            <Route path="alerts" element={<FraudAlerts />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
