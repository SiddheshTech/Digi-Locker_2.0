import { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Alert {
    id?: string;
    index?: number;
    type: string;
    severity: string;
    status: string;
    resolved: boolean;
    details?: {
        reason: string;
        [key: string]: unknown;
    };
    message?: string;
    timestamp: string;
}

export default function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAlerts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/alerts');
            // API returns { total, alerts } — map with index for resolve calls
            const alertsWithIndex = (res.data.alerts || []).map((a: Alert, i: number) => ({ ...a, index: i }));
            setAlerts(alertsWithIndex);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleResolve = async (index: number, resolvedBy: string) => {
        try {
            await axios.post(`http://localhost:5000/api/alerts/${index}/resolve`, { resolvedBy });
            fetchAlerts();
        } catch {
            alert('Failed to resolve alert');
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Fraud & Anomaly Alerts</h1>

            <div className="space-y-4">
                {loading ? (
                    <p className="text-gray-400">Loading alerts...</p>
                ) : alerts.length === 0 ? (
                    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center text-gray-400">
                        <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
                        No active alerts. System is secure.
                    </div>
                ) : (
                    alerts.map((alert, i) => (
                        <motion.div
                            key={alert.index ?? i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-xl border ${alert.severity?.toLowerCase() === 'high' ? 'bg-red-500/10 border-red-500/30' :
                                'bg-yellow-500/10 border-yellow-500/30'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <AlertTriangle className={alert.severity?.toLowerCase() === 'high' ? 'text-red-400' : 'text-yellow-400'} size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wide">{alert.type}</h3>
                                        <p className="text-gray-300 mt-1">{alert.message || alert.details?.reason}</p>
                                        <span className="text-xs text-gray-500 mt-2 block">{new Date(alert.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                                {!alert.resolved ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleResolve(alert.index ?? i, 'admin')}
                                            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                        <button
                                            onClick={() => handleResolve(alert.index ?? i, 'admin')}
                                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                        >
                                            Mark Resolved
                                        </button>
                                    </div>
                                ) : (
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                                        Resolved
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
