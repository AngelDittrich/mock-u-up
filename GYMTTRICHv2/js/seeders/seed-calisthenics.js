import { dbPromise } from "../db.js";

async function seedCalisthenics() {
    const db = await dbPromise;

    const data = [
        {
            date: '2025-10-01',
            handstand_sec: 0,
            l_sit_sec: 0,
            push_ups_reps: 12,
            pull_ups_reps: 3,
            v_sit_sec: 0
        },
        {
            date: '2025-12-10',
            handstand_sec: 2.4,
            l_sit_sec: 1,
            push_ups_reps: 22,
            pull_ups_reps: 7,
            v_sit_sec: 1.2
        },
        {
            date: '2026-01-04',
            handstand_sec: 5.4,
            l_sit_sec: 2.87,
            push_ups_reps: 51,
            pull_ups_reps: 8,
            v_sit_sec: 21.67
        }

    ];

    const tx = db.transaction('calisthenics', 'readwrite');
    const store = tx.objectStore('calisthenics');

    for (const entry of data) {
        await store.add(entry);
    }

    await tx.done;
    console.log('Calisthenics seeded.');
}

seedCalisthenics();