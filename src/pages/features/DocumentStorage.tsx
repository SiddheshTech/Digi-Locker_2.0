import { motion } from 'framer-motion';
import { Database, Server, Cloud, Shield, File } from 'lucide-react';
import './FeatureLayout.css';

export default function DocumentStorage() {
    return (
        <div className="feature-subpage">
            <section className="feature-hero">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><Database size={12} /> Decentralized Storage</div>
                        <h1>Permanent <span className="text-gradient">Data Integrity</span></h1>
                        <p className="feature-hero-lead">We use IPFS (InterPlanetary File System) to ensure documents are distributed, censorship-resistant, and permanently accessible.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className="feature-block">
                    <div>
                        <div className="section-label"><Server size={12} /> Architecture</div>
                        <h2>How It Works</h2>
                        <p>Unlike traditional centralized servers, IPFS chunks your file, hashes it, and distributes it across a global network of nodes.</p>
                        <ul className="list-disc pl-5 text-secondary space-y-2">
                            <li>Content-addressing based on cryptographic hash</li>
                            <li>No single point of failure</li>
                            <li>Automatic redundancy and replication</li>
                        </ul>
                    </div>
                    <div className="feature-visual relative">
                        {/* Abstract Node Network Visual */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border border-dashed border-blue-500/30 rounded-full animate-spin-slow flex items-center justify-center">
                                <div className="w-40 h-40 border border-purple-500/30 rounded-full animate-reverse-spin flex items-center justify-center">
                                    <Database className="text-blue-400" size={48} />
                                </div>
                            </div>
                            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>

                <div className="feature-block reverse">
                    <div>
                        <div className="section-label"><Shield size={12} /> Security</div>
                        <h2>Encryption at Rest</h2>
                        <p>Before any document touches the IPFS network, it is encrypted using AES-256. Only the holder of the private key (the student) can decrypt and view it.</p>
                    </div>
                    <div className="feature-visual">
                        <div className="flex items-center gap-4 text-gray-400">
                            <File size={48} />
                            <div className="h-1 w-16 bg-gray-600 rounded"></div>
                            <div className="p-4 border-2 border-green-500 rounded-lg text-green-500 font-mono">
                                AES-256
                            </div>
                            <div className="h-1 w-16 bg-gray-600 rounded"></div>
                            <Cloud size={48} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
