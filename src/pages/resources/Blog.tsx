import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import '../features/FeatureLayout.css'; // Reuse layout

const posts = [
    {
        title: 'The Future of Academic Credentialing is Decentralized',
        excerpt: 'Why universities are moving away from paper and centralized databases to blockchain-anchored records.',
        date: 'May 15, 2024',
        author: 'Dr. Sarah Chen'
    },
    {
        title: 'How Zero-Knowledge Proofs Protect Student Privacy',
        excerpt: 'Explaining the cryptographic magic that allows verification without revealing sensitive personal data.',
        date: 'May 10, 2024',
        author: 'Alex Rivera'
    },
    {
        title: 'Case Study: MIT\'s Pilot Program Results',
        excerpt: 'A look at how one of the world\'s leading institutions reduced issuance time by 90%.',
        date: 'May 02, 2024',
        author: 'DigiLocker Team'
    },
];

export default function Blog() {
    return (
        <div className="feature-subpage pt-32 pb-20">
            <div className="container">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold mb-4">Latest <span className="text-gradient">Insights</span></h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">News, updates, and deep dives into the world of verifiable credentials.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.div
                            key={i}
                            className="card hover:border-primary-500 transition-colors cursor-pointer group flex flex-col h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="h-48 bg-gray-800 rounded-t-lg mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                            </div>
                            <div className="p-6 pt-0 flex flex-col flex-1">
                                <div className="flex gap-4 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{post.title}</h3>
                                <p className="text-secondary text-sm mb-4 flex-1">{post.excerpt}</p>
                                <span className="text-primary-400 text-sm font-semibold flex items-center gap-1 mt-auto">Read Article <ArrowRight size={14} /></span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
