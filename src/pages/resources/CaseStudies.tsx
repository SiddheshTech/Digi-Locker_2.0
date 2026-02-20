import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import "../features/FeatureLayout.css"; // Reuse layout

const cases = [
    { university: 'University of Delhi', title: 'Digitizing 50,000 Graduates per Year', stat: '90% Cost Reduction' },
    { university: 'IIT Bombay', title: 'Blockchain-based Degree Issuance', stat: '0 Fraud Incidents' },
    { university: 'State Board of Tech Ed', title: 'State-wide Diploma Registry', stat: '2s Verification Time' },
];

export default function CaseStudies() {
    return (
        <div className="feature-subpage pt-32 pb-20">
            <div className="container">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold mb-4">Success <span className="text-gradient">Stories</span></h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">See how leading institutions are transforming their credentialing process.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            className="card p-8 group hover:bg-gray-800/50 transition-colors"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-primary-500/10 text-primary-400 px-3 py-1 rounded text-sm font-semibold">{c.university}</div>
                                <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{c.title}</h3>
                            <div className="mt-8 pt-8 border-t border-gray-700">
                                <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">Key Result</span>
                                <span className="text-3xl font-bold text-green-400">{c.stat}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
