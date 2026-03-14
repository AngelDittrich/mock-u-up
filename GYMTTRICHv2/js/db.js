// import { openDB } from 'https://unpkg.com/idb?module';
import { openDB } from './idb.js';

export const dbPromise = openDB('gymttrich', 1, {
    upgrade(db) {

        // EL REGISTRO DE MI USUARIO (1)
        if (!db.objectStoreNames.contains('user')) {
            const userStore = db.createObjectStore('user', {
                keyPath: 'id',
                autoIncrement: false
            });
        }

        // MEDIDAS CORPORALES 
        if (!db.objectStoreNames.contains('measurements')) {
            const measurementsStore = db.createObjectStore('measurements', {
                keyPath: 'id',
                autoIncrement: true
            });
            measurementsStore.createIndex('date', 'date', { unique: true });
        }

        // MEDIDAS DE FUERZA
        if (!db.objectStoreNames.contains('strength')) {
            const strengthStore = db.createObjectStore('strength', {
                keyPath: 'id',
                autoIncrement: true
            });
            strengthStore.createIndex('date', 'date', { unique: true });
        }

        // RECORDS DE CALISTENIA
        if (!db.objectStoreNames.contains('calisthenics')) {
            const calisthenicsStore = db.createObjectStore('calisthenics', {
                keyPath: 'id',
                autoIncrement: true
            });
            calisthenicsStore.createIndex('date', 'date', { unique: true });
        }

        // SECCION DE LOS TIPS
        if (!db.objectStoreNames.contains('tips')) {
            db.createObjectStore('tips', {
                keyPath: 'id',
                autoIncrement: true
            });
        }
    }
});

(async () => {
    const db = await dbPromise;
    console.log('DB Abierta: ', db.name);
})();

// Jalar toda la información de las tablas

export async function getAllStrength() {
    const db = await dbPromise;
    return db.getAll('strength');
};

export async function getAllCalisthenics() {
    const db = await dbPromise;
    return db.getAll('calisthenics');
};

export async function getAllMeasurements() {
    const db = await dbPromise;
    return db.getAll('measurements');
}

export async function getUser() {
    const db = await dbPromise;
    return db.getAll('user');
}

export async function saveUser(user) {
    if (!user || typeof user !== 'object') { throw new Error('saveUser requiere un objeto user válido'); }

    const db = await dbPromise;
    const tx = db.transaction('user', 'readwrite');
    const store = tx.objectStore('user');

    await store.put(user);
    await tx.done;
}

// Guardar una medición
export async function saveMeasurement(measurement) {
    if (!measurement?.date) {
        throw new Error('Las medidas requiere fecha');
    }

    const db = await dbPromise;
    const tx = db.transaction('measurements', 'readwrite');
    const store = tx.objectStore('measurements');

    await store.add(measurement);
    await tx.done;
}


// Obtener todas las mediciones (orden cronológico)
export async function getAllMeasurementsSorted() {
    const db = await dbPromise;
    const data = await db.getAll('measurements');

    return data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
}


// Obtener medición por fecha
export async function getMeasurementByDate(date) {
    const db = await dbPromise;
    const tx = db.transaction('measurements', 'readonly');
    const store = tx.objectStore('measurements');
    const index = store.index('date');

    return index.get(date);
}

export async function saveCalisthenics(entry) {
    const db = await dbPromise;
    const tx = db.transaction('calisthenics', 'readwrite');
    const store = tx.objectStore('calisthenics');

    await store.add(entry);
    await tx.done;
}

export async function saveStrength(entry) {
    const db = await dbPromise;
    const tx = db.transaction('strength', 'readwrite');
    const store = tx.objectStore('strength');

    await store.add(entry);
    await tx.done;
}
