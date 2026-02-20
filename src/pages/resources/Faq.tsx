import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import "../features/FeatureLayout.css"; // Reuse layout

const faqs = [
    {
        q: 'is DigiLocker 2.0 compatible with existing LMS?',
        a: 'Yes, we provide plugins for Moodle, Blackboard, and Canvas. Additionally, our REST API allows for custom integration with any SIS or HR system.'
    },
    {
        q: 'How secure is the blockchain storage?',
        a: 'Extremely secure. We use a permissioned blockchain consortium where only authorized nodes can write data. All data is cryptographically hashed and signed.'
    },
    {
        q: 'Do students need to pay to access their wallet?',
        a: 'No, the student wallet is completely free for life. Students can store, view, and share their credentials without any cost.'
    },
    {
        q: 'What happens if a private key is lost?',
        a: 'Institutions use managed HSMs (Hardware Security Modules) or multi-signature wallets to prevent key loss. We also have a recovery protocol for institutional accounts.'
    },
    {
        q: 'Is this compliant with GDPR and data privacy laws?',
        a: 'Yes. We do not store PII (Personally Identifiable Information) on the blockchain. Only cryptographic hashes are stored on-chain. The actual data is stored in compliant off-chain storage.'
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="feature-subpage pt-32 pb-20">
            <div className="container max-w-3xl">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked <span className="text-gradient">Questions</span></h1>
                    <p className="text-secondary text-lg">Everything you need to know about the platform.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <motion.div
                            key={i}
                            className="card overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <button
                                className="w-full flex justify-between items-center p-6 text-left"
                                onClick={() => setOpenIndex(active => active === i ? null : i)}
                            >
                                <span className="font-semibold text-lg text-white">{item.q}</span>
                                {openIndex === i ? <Minus size={20} className="text-primary-400" /> : <Plus size={20} className="text-gray-500" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-secondary leading-relaxed"
                                    >
                                        {item.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
