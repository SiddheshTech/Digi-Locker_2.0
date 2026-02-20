import { motion } from 'framer-motion';
import "./features/FeatureLayout.css"; // Reuse for layout

export default function TermsOfService() {
    return (
        <div className="feature-subpage pt-32 pb-20">
            <div className="container max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose text-gray-300">
                        <p className="lead text-lg mb-8">Last Updated: May 20, 2024</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">By accessing or using DigiLocker 2.0, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                            <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on DigiLocker 2.0's website for personal, non-commercial transitory viewing only.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                            <p className="mb-4">The materials on DigiLocker 2.0's website are provided on an 'as is' basis. DigiLocker 2.0 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                            <p>In no event shall DigiLocker 2.0 or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DigiLocker 2.0's website.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
