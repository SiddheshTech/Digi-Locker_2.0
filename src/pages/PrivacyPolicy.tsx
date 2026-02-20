import { motion } from 'framer-motion';
import "./features/FeatureLayout.css"; // Reuse for layout

export default function PrivacyPolicy() {
    return (
        <div className="feature-subpage pt-32 pb-20">
            <div className="container max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose text-gray-300">
                        <p className="lead text-lg mb-8">Last Updated: May 20, 2024</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-4">We collect minimal information necessary to provide our credentialing service:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Institutional account details (Name, Email, Organization).</li>
                                <li>Credential metadata (Recipient DID, Schema Type).</li>
                                <li>Usage logs (API calls, verification requests).</li>
                            </ul>
                            <p><strong>Note:</strong> We do NOT store the sensitive PII content of credentials on our servers. This data may be stored on your own infrastructure or encrypted on IPFS/Filecoin.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Blockchain & Public Data</h2>
                            <p className="mb-4">Interactions with the blockchain are public. When you issue a credential:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>A cryptographic hash of the credential is recorded on the ledger.</li>
                                <li>The issuer's DID and signature are public.</li>
                                <li>No personal data is written to the blockchain in plain text.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                            <p className="mb-4">We implement industry-standard security measures including:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>AES-256 encryption for data at rest.</li>
                                <li>TLS 1.3 for data in transit.</li>
                                <li>Strict access controls for internal tools.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
                            <p>For privacy concerns, please contact our Data Protection Officer at privacy@digilocker2.com.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
