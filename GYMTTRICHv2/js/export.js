import { dbPromise } from "./db.js";

export async function exportAllData() {
    try {
        const db = await dbPromise;

        const stores = [
            'user',
            'measurements',
            'calisthenics',
            'strength'
        ];

        const data = {};

        for (const storeName of stores) {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            data[storeName] = await store.getAll();
            await tx.done;
        }

        const payload = {
            app: 'FitTrack',
            version: '1.0.0',
            exported_at: new Date().toISOString(),
            data
        };

        downloadJSON(payload);

        // Show success message
        setTimeout(() => {
            alert('✅ Backup exported successfully!');
        }, 100);
    } catch (error) {
        alert(`❌ Export failed: ${error.message}`);
        console.error('Export error:', error);
    }
}

function downloadJSON(payload) {
    const blob = new Blob(
        [JSON.stringify(payload, null, 2)],
        { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `fittrack-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
}
