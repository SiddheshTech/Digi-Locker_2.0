import { useState } from 'react';
import { Book, Terminal, ChevronRight, Search, Menu } from 'lucide-react';
import './Documentation.css';

const sidebarItems = [
    { section: 'Getting Started', items: ['Introduction', 'Quick Start', 'Architecture', 'Authentication'] },
    { section: 'Core Concepts', items: ['Credentials', 'Schemas', 'DID Methods', 'Verifiable Presentations'] },
    { section: 'API Reference', items: ['Issuance API', 'Verification API', 'Wallet API', 'Webhooks'] },
    { section: 'SDKs', items: ['Node.js', 'Python', 'Go', 'React Native'] },
];

export default function Documentation() {
    const [activeItem, setActiveItem] = useState('Introduction');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="docs-page">
            <div className="docs-container">
                {/* Sidebar */}
                <aside className={`docs-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="docs-brand">
                        <Book size={20} className="text-primary-400" />
                        <span>Developer Docs</span>
                    </div>
                    <div className="docs-search">
                        <Search size={16} />
                        <input type="text" placeholder="Search documentation..." />
                    </div>
                    <nav className="docs-nav">
                        {sidebarItems.map((group) => (
                            <div key={group.section} className="docs-nav-group">
                                <h3>{group.section}</h3>
                                <ul>
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className={activeItem === item ? 'active' : ''}
                                            onClick={() => { setActiveItem(item); setMobileMenuOpen(false); }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="docs-content">
                    <button className="docs-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu size={24} />
                    </button>

                    <div className="docs-header">
                        <div className="breadcrumbs">Docs <ChevronRight size={14} /> Getting Started <ChevronRight size={14} /> {activeItem}</div>
                        <h1>{activeItem}</h1>
                    </div>

                    <div className="prose">
                        <p className="lead">
                            Welcome to the DigiLocker 2.0 API documentation. This guide will help you integrate strict, blockchain-based credential issuance and verification into your applications.
                        </p>

                        <div className="callout-info">
                            <h4><Terminal size={18} /> specific versions</h4>
                            <p>Current API Version: <strong>v2.1.0</strong> (Released May 2024)</p>
                        </div>

                        <h2>Integration Flow</h2>
                        <p>Integrating with DigiLocker 2.0 involves three main steps:</p>
                        <ol>
                            <li><strong>Register your DID:</strong> Create a decentralized identifier for your institution.</li>
                            <li><strong>Define Schemas:</strong> Create data models for the credentials you want to issue (e.g., Degree, Transcript).</li>
                            <li><strong>Issue via API:</strong> Use our REST API to issue credentials to standard DIDs.</li>
                        </ol>

                        <h2>Quick Start</h2>
                        <p>Install our Node.js SDK to get started immediately:</p>
                        <div className="code-block-wrapper">
                            <div className="code-header">
                                <span>bash</span>
                                <button className="copy-btn">Copy</button>
                            </div>
                            <pre><code>npm install @digilocker/sdk</code></pre>
                        </div>

                        <p>Initialize the client with your API key:</p>
                        <div className="code-block-wrapper">
                            <div className="code-header">
                                <span>javascript</span>
                                <button className="copy-btn">Copy</button>
                            </div>
                            <pre><code>{`const { DigiLocker } = require('@digilocker/sdk');

const client = new DigiLocker({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

await client.connect();`}</code></pre>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
