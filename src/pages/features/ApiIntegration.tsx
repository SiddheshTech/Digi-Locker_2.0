import { motion } from 'framer-motion';
import { Terminal, Code, Webhook } from 'lucide-react';
import './FeatureLayout.css';

export default function ApiIntegration() {
    return (
        <div className="feature-subpage">
            <section className="feature-hero">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Code size={12} /> Developer First</div>
                        <h1>Powerful <span className="text-gradient">API & SDKs</span></h1>
                        <p className="feature-hero-lead">Integrate issuance and verification into your existing applications with just a few lines of code.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className="feature-block">
                    <div>
                        <div className="section-label"><Terminal size={12} /> REST API</div>
                        <h2>Simple, Clean Endpoints</h2>
                        <p>Our REST API follows standard conventions. Issue credentials, check status, and manage webhooks programmatically.</p>
                        <div className="flex gap-4 mt-4">
                            <span className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-green-400">POST /v1/issue</span>
                            <span className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-blue-400">GET /v1/verify/:id</span>
                        </div>
                    </div>
                    <div className="feature-visual">
                        <div className="code-window">
                            <span className="text-gray-500"># Issue a new credential</span><br />
                            curl -X POST https://api.digilocker2.com/v1/issue \<br />
                            &nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                            &nbsp;&nbsp;-d '&#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"recipient"</span>: <span className="text-yellow-400">"student@uni.edu"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"credentialType"</span>: <span className="text-yellow-400">"DegreeCertificate"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"data"</span>: &#123; ... &#125;<br />
                            &nbsp;&nbsp;&#125;'
                        </div>
                    </div>
                </div>

                <div className="feature-block reverse">
                    <div>
                        <div className="section-label"><Webhook size={12} /> Real-time Events</div>
                        <h2>Webhooks</h2>
                        <p>Subscribe to events like <span className="text-code">credential.issued</span>, <span className="text-code">verification.success</span>, or <span className="text-code">revocation.processed</span> to keep your local database in sync.</p>
                    </div>
                    <div className="feature-visual">
                        <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                            <div className="text-yellow-400 mb-2">Payload Received</div>
                            <div className="text-gray-400">
                                &#123;<br />
                                &nbsp;&nbsp;"event": "verification.success",<br />
                                &nbsp;&nbsp;"timestamp": 1714582920,<br />
                                &nbsp;&nbsp;"data": &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;"verifier": "Company Inc",<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;"credentialId": "cr_83920"<br />
                                &nbsp;&nbsp;&#125;<br />
                                &#125;
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tech-specs rounded-xl mt-16 p-8">
                    <h3 className="text-center text-2xl font-bold mb-8 text-white">SDK Support</h3>
                    <div className="specs-grid">
                        <div className="spec-card">
                            <h4>Node.js</h4>
                            <p className="text-sm text-gray-400 mt-2">npm install @digilocker/sdk</p>
                        </div>
                        <div className="spec-card">
                            <h4>Python</h4>
                            <p className="text-sm text-gray-400 mt-2">pip install digilocker-py</p>
                        </div>
                        <div className="spec-card">
                            <h4>Go</h4>
                            <p className="text-sm text-gray-400 mt-2">go get github.com/digilocker/go-sdk</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
