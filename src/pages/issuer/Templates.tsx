import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Plus, Trash2, FileText, Loader2 } from 'lucide-react';

interface Template {
    id: string;
    name: string;
    schema: Record<string, unknown>;
    createdAt: string;
}

export default function Templates() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', schema: '{}' });

    const fetchTemplates = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/templates');
            setTemplates(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:5000/api/templates', {
                name: newTemplate.name,
                schema: JSON.parse(newTemplate.schema)
            });
            setShowModal(false);
            setNewTemplate({ name: '', schema: '{}' });
            fetchTemplates();
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            alert('Error: ' + errorMessage);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        await axios.delete(`http://localhost:5000/api/templates/${id}`);
        fetchTemplates();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Credential Templates</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={18} /> New Template
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-purple-500" size={48} />
                </div>
            ) : templates.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-gray-800 rounded-xl border border-gray-700">
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No templates found. Create your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(t => (
                        <div key={t.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                                    <FileText size={24} />
                                </div>
                                <button onClick={() => handleDelete(t.id)} className="text-gray-500 hover:text-red-400">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                            <p className="text-xs text-gray-500 mb-4">Created: {new Date(t.createdAt).toLocaleDateString()}</p>
                            <div className="bg-gray-900 p-3 rounded text-xs font-mono text-gray-400 overflow-hidden h-24 relative">
                                <pre>{JSON.stringify(t.schema, null, 2)}</pre>
                                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-900 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">New Template</h2>
                        <input
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 mb-4"
                            placeholder="Template Name"
                            value={newTemplate.name}
                            onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        />
                        <textarea
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 mb-4 h-32 font-mono text-sm"
                            placeholder="JSON Schema"
                            value={newTemplate.schema}
                            onChange={e => setNewTemplate({ ...newTemplate, schema: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={handleCreate} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
