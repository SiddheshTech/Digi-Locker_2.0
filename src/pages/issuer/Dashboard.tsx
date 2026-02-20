import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileCheck, Clock, FileX, ShieldAlert, Activity } from 'lucide-react';

interface Stats {
    totalIssued: number;
    issued: number;
    pending: number;
    revoked: number;
    alertCount: number;
    recentVerifications: Array<{ id: string; studentName: string; lastVerified: string }>;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/issue/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Issued', value: stats?.totalIssued || 0, icon: FileCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { title: 'Pending', value: stats?.pending || 0, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { title: 'Revoked', value: stats?.revoked || 0, icon: FileX, color: 'text-red-400', bg: 'bg-red-500/10' },
        { title: 'Fraud Alerts', value: stats?.alertCount || 0, icon: ShieldAlert, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    ];

    if (loading) return <div className="text-white">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${card.bg} ${card.color}`}>
                                +0% this week
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Verifications */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Activity size={20} className="text-purple-400" />
                        Recent Verifications
                    </h2>
                    <span className="text-xs text-gray-400">Last 24 hours</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Credential ID</th>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Verified At</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {stats?.recentVerifications.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No recent verifications found on-chain.
                                    </td>
                                </tr>
                            ) : (
                                stats?.recentVerifications.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-purple-400">{v.id.substring(0, 8)}...</td>
                                        <td className="px-6 py-4 text-sm text-white">{v.studentName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{new Date(v.lastVerified).toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                                                Verified
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
