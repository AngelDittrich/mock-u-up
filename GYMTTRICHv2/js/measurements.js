import { dbPromise, getAllMeasurements } from "./db.js";

document.addEventListener('DOMContentLoaded', initMeasurements);

async function initMeasurements() {
    const records = await getAllMeasurements();

    if (!records) return;

    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderMeasurementsCharts(records);
    renderMeasurementsTables(records);
}

// -------------- Gráficas --------------

function renderMeasurementsCharts(records) {
    const dates = records.map(r => r.date);

    createMultiLineChart({
        id: 'upperBodyChart',
        labels: dates,
        datasets: [
            { label: 'Arm', data: records.map(r => r.body.arm), color: '#26c6da' },
            { label: 'Forearm', data: records.map(r => r.body.forearm), color: '#5e6ad2' },
            { label: 'Chest', data: records.map(r => r.body.chest), color: '#ff7043' }
        ]
    });

    createMultiLineChart({
        id: 'lowerBodyChart',
        labels: dates,
        datasets: [
            { label: 'Abdomen', data: records.map(r => r.body.abdomen), color: '#fbbf24' },
            { label: 'Hip', data: records.map(r => r.body.hip), color: '#00e676' },
            { label: 'Leg', data: records.map(r => r.body.leg), color: '#ffffff' },
            { label: 'Calf', data: records.map(r => r.body.calf), color: '#94a3b8' },
        ]
    });

    createMultiLineChart({
        id: 'skinfoldsChart',
        labels: dates,
        datasets: [
            { label: 'Biceps', data: records.map(r => r.skinfolds.biceps), color: '#26c6da' },
            { label: 'Forearm', data: records.map(r => r.skinfolds.forearm), color: '#5e6ad2' },
            { label: 'Subscapular', data: records.map(r => r.skinfolds.subscapular), color: '#ff7043' },
            { label: 'Iliac Crest', data: records.map(r => r.skinfolds.iliac_crest), color: '#f97316' },
            { label: 'Abdominal', data: records.map(r => r.skinfolds.abdominal), color: '#00e676' },
            { label: 'Femoral', data: records.map(r => r.skinfolds.femoral), color: '#ffffff' }
        ]
    });
}

function createMultiLineChart( { id, labels, datasets } ) {
    const ctx = document.getElementById(id);

    if (!ctx) return;

    window.charts = window.charts || {};
    if (window.charts[id]) window.charts[id].destroy();

    window.charts[id] = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: datasets.map(ds => ({
                label: ds.label,
                data: ds.data,
                borderColor: ds.color,
                backgroundColor: ds.color + '1a',
                fill: false,
                tension: 0.3
            }))
        },
        options: chartOptions()
    });
}

// ---------------- Renderizar Tablas ------------------

function renderMeasurementsTables(records) {
    
    renderTable({
        tableId: 'measurements-table',
        records,
        columns: [
            { label: 'Date', value: r => r.date },
            { label: 'Weight', value: r => r.weight_kg },
            { label: 'Arm', value: r => r.body.arm },
            { label: 'Forearm', value: r => r.body.forearm },
            { label: 'Chest', value: r => r.body.chest },
            { label: 'Abdomen', value: r => r.body.abdomen },
            { label: 'Hip', value: r => r.body.hip },
            { label: 'Leg', value: r => r.body.leg },
            { label: 'Calf', value: r => r.body.calf }
        ]
    });
    
    renderTable({
        tableId: 'skinfolds-table',
        records,
        columns: [
            { label: 'Date', value: r => r.date },
            { label: 'Biceps', value: r => r.skinfolds.biceps },
            { label: 'Forearm', value: r => r.skinfolds.forearm },
            { label: 'Subscapular', value: r => r.skinfolds.subscapular },
            { label: 'Iliac Crest', value: r => r.skinfolds.iliac_crest },
            { label: 'Abdominal', value: r => r.skinfolds.abdominal },
            { label: 'Femoral', value: r => r.skinfolds.femoral }
        ]
    });
    

}

// ---------------- Opciones compartidas ------------------

function chartOptions() {
    return {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#94a3b8' }
            }
        },
        scales: {
            x: { ticks: { color: '#94a3b8' } },
            y: { ticks: { color: '#94a3b8' } }
        }
    };
}

// ---------------- Plantilla de tabla ----------------

function renderTable({ tableId, records, columns }) {
    const tbody = document.querySelector(`#${tableId} tbody`);

    if (!tbody) return;

    tbody.innerHTML = '';

    records.forEach(record => {
        const tr = document.createElement('tr');

        tr.innerHTML = columns.map(col => {
            const value = col.value(record);
            return `<td>${value ?? '--'}</td>`;
        }).join('');

        tbody.appendChild(tr);
    });
}