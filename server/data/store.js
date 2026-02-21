import { loadStore, saveStore } from './persistence.js';

/**
 * data/store.js — In-memory data store with JSON persistence
 */
const initialStore = {
    credentials: [],
    revocations: [],
    verifierSavedVerifications: [],
    verifierApiKeys: [],
    templates: [
        {
            id: 'tpl-001',
            name: 'Bachelor of Technology',
            fields: ['studentName', 'rollNo', 'degree', 'year', 'serialNo', 'specialization'],
            createdAt: new Date().toISOString()
        },
        {
            id: 'tpl-002',
            name: 'Academic Transcript',
            fields: ['studentName', 'rollNo', 'gpa', 'year', 'courses'],
            createdAt: new Date().toISOString()
        }
    ],
    multiSigProposals: [],
    alerts: [],
    batchJobs: []
};

const store = loadStore(initialStore);

export const persist = () => saveStore(store);
export default store;
