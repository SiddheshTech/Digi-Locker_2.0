import { loadStore, saveStore } from './persistence.js';

/**
 * data/store.js — In-memory data store with JSON persistence
 */
const initialStore = {
    credentials: [
        {
            id: 'cred-001',
            studentWallet: '0x1234567890123456789012345678901234567890',
            issuerId: '0xISSUER_U_OF_TECH',
            status: 'issued',
            createdAt: '2025-01-15T10:00:00Z',
            payloadHash: '0x88f572c8...',
            merkleRoot: '0x99a215b1...',
            metadata: {
                title: 'Bachelor of Science in Computer Science',
                studentName: 'John Doe',
                rollNo: 'CS-2021-001',
                year: '2025',
                gpa: '3.9',
                specialization: 'Artificial Intelligence'
            }
        },
        {
            id: 'cred-002',
            studentWallet: '0x1234567890123456789012345678901234567890',
            issuerId: '0xISSUER_AWS',
            status: 'issued',
            createdAt: '2025-02-10T14:30:00Z',
            payloadHash: '0x44d21e8a...',
            merkleRoot: '0x55c32f9b...',
            metadata: {
                title: 'AWS Certified Solutions Architect',
                studentName: 'John Doe',
                certificateId: 'AWS-990-112',
                issuedDate: '2025-02-10'
            }
        }
    ],
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
    batchJobs: [],
    shares: [],
    consents: [],
    students: [
        {
            address: '0x1234567890123456789012345678901234567890',
            name: 'John Doe',
            bio: 'Aspiring Blockchain Developer | CS Senior at Tech University',
            skills: ['Ethereum', 'React', 'Node.js', 'Cryptography'],
            badges: [
                { title: 'Top Coder 2024', issuer: 'HackerRank', icon: '🏆' },
                { title: 'Open Source Contributor', issuer: 'GitHub', icon: '🌟' }
            ],
            microCredentials: [
                { title: 'Solidity Advanced', hash: '0xabc123...', date: '2024-11-20' }
            ],
            experience: [
                { role: 'Blockchain Intern', company: 'CryptoSolutions', duration: '3 months' }
            ],
            updatedAt: new Date().toISOString()
        }
    ],
    requests: []
};

const store = loadStore(initialStore);

export const persist = () => saveStore(store);
export default store;
