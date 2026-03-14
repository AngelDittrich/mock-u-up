import { dbPromise } from '../db.js';

async function seedMeasurements() {
    const db = await dbPromise;

    const data = [
        {
            date: '2025-10-01',
            weight_kg: 54.5,
            body: {
                arm: 27.5,
                forearm: 20,
                chest: 86,
                abdomen: 72,
                hip: 84.5,
                leg: 46,
                calf: 29
            },
            skinfolds: {
                biceps: 4,
                forearm: 4,
                subscapular: 10,
                iliac_crest: 16,
                abdominal: 21,
                femoral: 10
            }
        },
        {
            date: '2025-11-01',
            weight_kg: 57,
            body: {
                arm: 30.5,
                forearm: 23,
                chest: 94,
                abdomen: 71,
                hip: 86.5,
                leg: 48,
                calf: 30
            },
            skinfolds: {
                biceps: 4,
                forearm: 4,
                subscapular: 10,
                iliac_crest: 19,
                abdominal: 22,
                femoral: 11
            }
        },
        {
            date: '2025-12-01',
            weight_kg: 60.3,
            body: {
                arm: 30.5,
                forearm: 23,
                chest: 97,
                abdomen: 70,
                hip: 89.5,
                leg: 49,
                calf: 30
            },
            skinfolds: {
                biceps: 4,
                forearm: 4,
                subscapular: 10,
                iliac_crest: 19,
                abdominal: 22,
                femoral: 11
            }
        }
    ];

    const tx = db.transaction('measurements', 'readwrite');
    const store = tx.objectStore('measurements');

    for (const entry of data) {
        try {
            await store.add(entry);
        } catch (err) {
            console.warn(`Measurement for ${entry.date} skipped:`, err.message);
        }
    }

    await tx.done;
    console.log('Measurements seeded');
}

seedMeasurements();
