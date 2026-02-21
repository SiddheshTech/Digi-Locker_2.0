import store, { persist } from './server/data/store.js';
import fs from 'fs';
import path from 'path';

console.log('--- Persistence Test ---');
console.log('Initial credentials count:', store.credentials.length);

const testCred = {
    id: 'test-' + Date.now(),
    payloadHash: '0xTEST_HASH',
    payload: { studentName: 'Test Student', fileHash: 'TEST_FILE_HASH' },
    issuedAt: new Date().toISOString()
};

store.credentials.push(testCred);
console.log('Added test credential. New count:', store.credentials.length);

persist();
console.log('Called persist().');

const dbPath = './server/data/db.json';
if (fs.existsSync(dbPath)) {
    console.log('Success: db.json created!');
    const content = fs.readFileSync(dbPath, 'utf8');
    console.log('db.json content length:', content.length);
} else {
    console.log('Failure: db.json NOT created.');
}
