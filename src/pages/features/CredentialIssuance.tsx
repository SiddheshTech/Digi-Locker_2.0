import { motion } from 'framer-motion';
import { FileCheck, Upload, Key, Send, CheckCircle, Shield } from 'lucide-react';
import './FeatureLayout.css';

export default function CredentialIssuance() {
    return (
        <div className="feature-subpage">
            <section className="feature-hero">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><FileCheck size={12} /> Core Feature</div>
                        <h1>Secure Credential <span className="text-gradient">Issuance</span></h1>
                        <p className="feature-hero-lead">Mint academic credentials on the blockchain with a few clicks. Tamper-proof, permanent, and instantly delivered to students.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* Step 1 */}
                <div className="feature-block">
                    <div>
                        <div className="section-label"><Upload size={12} /> Step 1</div>
                        <h2>Bulk Data Import</h2>
                        <p>Upload student data via CSV, Excel, or connect directly to your Student Information System (SIS). Our intelligent mapper handles the rest.</p>
                        <ul className="list-disc pl-5 text-secondary space-y-2">
                            <li>Drag-and-drop interface</li>
                            <li>Auto-validation of data fields</li>
                            <li>Preview certificates before minting</li>
                        </ul>
                    </div>
                    <div className="feature-visual bg-glass">
                        <div className="p-6 w-full max-w-sm">
                            <div className="h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400">
                                <Upload size={32} />
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="feature-block reverse">
                    <div>
                        <div className="section-label"><Key size={12} /> Step 2</div>
                        <h2>Cryptographic Signing</h2>
                        <p>Each credential is digitally signed using your institution's private key. This creates an unalterable proof of origin.</p>
                        <p>We use industry-standard W3C Verifiable Credentials data models.</p>
                    </div>
                    <div className="feature-visual">
                        <div className="code-window">
                            <span className="text-blue-400">const</span> credential = &#123;<br />
                            &nbsp;&nbsp;<span className="text-purple-400">issuer</span>: <span className="text-green-400">"did:web:university.edu"</span>,<br />
                            &nbsp;&nbsp;<span className="text-purple-400">issuanceDate</span>: <span className="text-green-400">"2024-05-20"</span>,<br />
                            &nbsp;&nbsp;<span className="text-purple-400">credentialSubject</span>: &#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">id</span>: <span className="text-green-400">"did:key:z6Mk..."</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">degree</span>: <span className="text-green-400">"B.Sc. Computer Science"</span><br />
                            &nbsp;&nbsp;&#125;,<br />
                            &nbsp;&nbsp;<span className="text-purple-400">proof</span>: &#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">type</span>: <span className="text-green-400">"Ed25519Signature2020"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">jws</span>: <span className="text-yellow-400">"eyJhbGciOiJFZERT..."</span><br />
                            &nbsp;&nbsp;&#125;<br />
                            &#125;
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="feature-block">
                    <div>
                        <div className="section-label"><Send size={12} /> Step 3</div>
                        <h2>Instant Delivery</h2>
                        <p>Upon minting, credentials are instantly sent to the student's DigiLocker wallet. They receive an email notification with a magic link to claim it.</p>
                    </div>
                    <div className="feature-visual">
                        <div className="p-6 bg-gray-800 rounded-xl shadow-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Credential Issued</h4>
                                <p className="text-sm text-gray-400">Sent to student@university.edu</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tech-specs rounded-xl mt-16 p-8">
                    <h3 className="text-center text-2xl font-bold mb-8 text-white">Technical Specifications</h3>
                    <div className="specs-grid">
                        <div className="spec-card">
                            <h4><Shield size={18} /> Signing Algorithm</h4>
                            <p className="text-sm text-gray-400 mt-2">Ed25519 (Edwards-curve Digital Signature Algorithm) for high-speed, high-security signing.</p>
                        </div>
                        <div className="spec-card">
                            <h4><FileCheck size={18} /> Data Standard</h4>
                            <p className="text-sm text-gray-400 mt-2">Fully compliant with W3C Verifiable Credentials Data Model v1.1.</p>
                        </div>
                        <div className="spec-card">
                            <h4><Upload size={18} /> Throughput</h4>
                            <p className="text-sm text-gray-400 mt-2">Capable of minting up to 10,000 credentials per minute via batch API.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
