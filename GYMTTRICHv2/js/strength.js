import { getAllStrength } from "./db.js";

document.addEventListener('DOMContentLoaded', initStrength);

async function initStrength() {
    const records = await getAllStrength();

    if (!records || records.length === 0) return;

    // Orden cronológico
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderStrengthTable(records);
    renderStrengthCharts(records);
}

// -------- Tablas --------

function renderStrengthTable(records) {
    const tbody = document.querySelector('#strength-table tbody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    [...records].reverse().forEach(r => {
        const e = r.exercises;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ r.date }</td>
            <td>${ e.militar ?? '-' }</td>
            <td>${ e.bench_press ?? '-' }</td>
            <td>${ e.pull_ups ?? '-' }</td>
            <td>${ e.curl ?? '-' }</td>
            <td>${ e.extension ?? '-' }</td>
            <td>${ e.deadlift ?? '-' }</td>
            <td>${ e.press ?? '-' }</td>
            <td>${ e.squat ?? '-' }</td>
        `;

        tbody.appendChild(tr);
    });
}

// -------- Gráficas --------
function renderStrengthCharts(records) {
    const dates = records.map(r => r.date);

    renderChart('bigThreeChart', {
        labels: dates, 
        datasets: [
            {
                label: 'Bench Press',
                data: records.map(r => r.exercises.bench_press),
                borderColor: '#5e6ad2'
            },
            {
                label: 'Press',
                data: records.map(r => r.exercises.press),
                borderColor: '#ff7043'
            },
            {
                label: 'Deadlift',
                data: records.map(r => r.exercises.deadlift),
                borderColor: '#26c6da'
            }
        ]
    });

    renderChart('accessoryChart', {
        labels: dates,
        datasets: [
            {
                label: 'Militar',
                data: records.map(r => r.exercises.militar),
                borderColor: '#ff7043'
            },
            {
                label: 'Pull',
                data: records.map(r => r.exercises.pull_ups),
                borderColor: '#26c6da'
            },
            {
                label: 'Curl',
                data: records.map(r => r.exercises.curl),
                borderColor: '#e91e63'
            },
            {
                label: 'Extension',
                data: records.map(r => r.exercises.extension),
                borderColor: '#9c27b0'
            },
            {
                label: 'Squat',
                data: records.map(r => r.exercises.squat),
                borderColor: '#ffffff'
            }
        ]
    }); 
}

// -------------- Chart helper --------------

function renderChart(canvasId, dataConfig) {
    const ctx = document.getElementById(canvasId);

    if (!ctx) return;

    if (window.charts && window.charts[canvasId]) {
        window.charts[canvasId].destroy();
    }

    window.charts = window.charts || {};

    window.charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: dataConfig,
        options: {
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
        }
    });
}