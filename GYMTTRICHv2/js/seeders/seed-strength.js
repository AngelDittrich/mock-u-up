import { dbPromise } from "../db.js";

async function seedStrength() {
    const db = await dbPromise;

    const data = [
        {
            date: '2025-10-01',
            exercises: {
                militar: 0,
                bench_press: 10,
                pull_ups: 20,
                curl: 5,
                extension: 12,
                deadlift: 35,
                press: 90,
                squat: 25,
            }
        },
        {
            date: '2025-11-01',
            exercises: {
                militar: 10,
                bench_press: 20,
                pull_ups: 32,
                curl: 10,
                extension: 20,
                deadlift: 45,
                press: 135,
                squat: 35,
            }
        },
        {
            date: '2025-11-24',
            exercises: {
                militar: 10,
                bench_press: 35,
                pull_ups: 86,
                curl: 15,
                extension: 24,
                deadlift: 55,
                press: 180,
                squat: 45,
            }
        },
        {
            date: '2025-12-10',
            exercises: {
                militar: 15,
                bench_press: 45,
                pull_ups: 110,
                curl: 20,
                extension: 32,
                deadlift: 65,
                press: 225,
                squat: 55,
            }
        },
    ];

    const tx = db.transaction('strength', 'readwrite');
    const store = tx.objectStore('strength');

    for (const entry of data) {
        await store.add(entry);
    }

    await tx.done;
    console.log('Strength seeded');
}

seedStrength();