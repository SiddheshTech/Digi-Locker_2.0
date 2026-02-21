import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');

export function saveStore(store) {
    try {
        console.log(`[PERSISTENCE] Saving store to ${DB_PATH}...`);
        console.log(`[PERSISTENCE] Credentials count: ${store.credentials.length}`);
        fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2));
        console.log(`[PERSISTENCE] Save successful.`);
    } catch (err) {
        console.error('[PERSISTENCE] Failed to save store:', err.message);
    }
}

export function loadStore(defaultStore) {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            const saved = JSON.parse(data);
            return { ...defaultStore, ...saved };
        }
    } catch (err) {
        console.error('Failed to load store:', err.message);
    }
    return defaultStore;
}
