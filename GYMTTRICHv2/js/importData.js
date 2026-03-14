import { dbPromise } from "./db.js";

export async function importBackup(json) {
    try {
        validateBackup(json);

        const confirmed = confirm(
            '⚠️ This will overwrite ALL existing data. Continue?'
        );

        if (!confirmed) return;

        const db = await dbPromise;
        const stores = Object.keys(json.data);

        for (const storeName of stores) {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);

            await store.clear();

            for (const item of json.data[storeName]) {
                await store.add(item);
            }

            await tx.done;
        }

        alert('✅ Backup imported successfully! The page will reload.');
        window.location.reload();
    } catch (error) {
        alert(`❌ Import failed: ${error.message}`);
        console.error('Import error:', error);
    }
}

function validateBackup(json) {
    if (!json?.app || json.app !== 'FitTrack') {
        throw new Error('Invalid backup file - not a FitTrack backup');
    }

    if (!json?.data) {
        throw new Error('Malformed backup structure - missing data');
    }

    const requiredStores = [
        'user',
        'measurements',
        'calisthenics',
        'strength'
    ];

    for (const store of requiredStores) {
        if (!Array.isArray(json.data[store])) {
            throw new Error(`Missing or invalid store: ${store}`);
        }
    }

    return true;
}
