import { motion } from 'framer-motion';
import { ShieldCheck, Scan, Globe, Lock, CheckCircle, Search } from 'lucide-react';
import './FeatureLayout.css';

export default function CredentialVerification() {
    return (
        <div className="feature-subpage">
            <section className="feature-hero">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><ShieldCheck size={12} /> Instant Trust</div>
                        <h1>Global <span className="text-gradient">Verification</span></h1>
                        <p className="feature-hero-lead">Verify any credential issued on our platform in seconds. No login required for public verifiers. 100% accurate.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* Method 1 */}
                <div className="feature-block">
                    <div>
                        <div className="section-label"><Scan size={12} /> Method 1</div>
                        <h2>QR Code Scan</h2>
                        <p>Every certificate comes with a unique, cryptographically signed QR code. Verifiers can simply scan it with any standard QR reader to see the real-time status.</p>
                        <ul className="list-disc pl-5 text-secondary space-y-2">
                            <li>Works offline for initial validation</li>
                            <li>Redirects to secured domain for deep check</li>
                            <li>Shows "Revoked" status instantly if applicable</li>
                        </ul>
                    </div>
                    <div className="feature-visual bg-glass flex-col gap-4">
                        <div className="w-48 h-48 bg-white p-2 rounded-lg">
                            {/* Simulated QR Code */}
                            <div className="w-full h-full bg-black" style={{ maskImage: 'radial-gradient(circle, transparent 40%, black 45%)', background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 50% / 20px 20px' }}></div>
                        </div>
                        <p className="text-sm text-center text-gray-400">Scan to Verify</p>
                    </div>
                </div>

                {/* Method 2 */}
                <div className="feature-block reverse">
                    <div>
                        <div className="section-label"><Globe size={12} /> Method 2</div>
                        <h2>Public Verification Portal</h2>
                        <p>Verifiers can visit our portal and enter the unique Credential ID manually. This checks directly against the blockchain ledger.</p>
                    </div>
                    <div className="feature-visual">
                        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md border border-gray-700">
                            <div className="flex gap-2 mb-4">
                                <input type="text" value="b64-a9c-2f1" readOnly className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono" />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded">Verify</button>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/50 p-4 rounded flex items-start gap-3">
                                <CheckCircle className="text-green-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-green-400 font-bold">Valid Credential</h4>
                                    <p className="text-sm text-green-200/70">Issued by University of Tech</p>
                                    <p className="text-xs text-green-200/50 mt-1">Block #120492 • Confirmed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tech-specs rounded-xl mt-16 p-8">
                    <h3 className="text-center text-2xl font-bold mb-8 text-white">Verification Tech Stack</h3>
                    <div className="specs-grid">
                        <div className="spec-card">
                            <h4><Lock size={18} /> Zero-Knowledge Proofs</h4>
                            <p className="text-sm text-gray-400 mt-2">Verify attributes (e.g. "Over 18") without revealing the underlying data.</p>
                        </div>
                        <div className="spec-card">
                            <h4><Search size={18} /> Universal Resolver</h4>
                            <p className="text-sm text-gray-400 mt-2">Compatible with DID (Decentralized Identifier) methods across different blockchains.</p>
                        </div>
                        <div className="spec-card">
                            <h4><Globe size={18} /> GDPR Compliant</h4>
                            <p className="text-sm text-gray-400 mt-2">Verification logs do not store PII (Personally Identifiable Information) of the verifier.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
