import { getAllCalisthenics } from "./db.js";

document.addEventListener('DOMContentLoaded', initCalisthenics);

// ---------------- Inicializar el archivo y funciones ----------------

async function initCalisthenics() {
    const records = await getAllCalisthenics();

    if (!records || records.length === 0) return;

    // Orden crónologico
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderCurrentStats(records.at(-1));
    renderCalisthenicsCharts(records);
    setupTipsToggle(); // Add tips toggle functionality
}

// ---------------- Tips Toggle Button ----------------

function setupTipsToggle() {
    const tipsBtn = document.getElementById('toggle-tips-btn');
    const tipsContent = document.getElementById('calisthenics-tips');

    if (!tipsBtn || !tipsContent) return;

    tipsBtn.addEventListener('click', () => {
        tipsContent.classList.toggle('hidden');
        const isHidden = tipsContent.classList.contains('hidden');
        tipsBtn.innerHTML = isHidden
            ? '<i class="ph ph-lightbulb"></i> View Complete Calisthenics Guide'
            : '<i class="ph ph-x"></i> Hide Guide';
    });
}

// ---------------- Estadísticas actuales ---------------- 

function renderCurrentStats(latest) {
    setText('cali-handstand', formatSeconds(latest.handstand_sec));
    setText('cali-lsit', formatSeconds(latest.l_sit_sec));
    setText('cali-vsit', formatSeconds(latest.v_sit_sec));

    setText('cali-pushups', latest.push_ups_reps ?? '--');
    setText('cali-pullups', latest.pull_ups_reps ?? '--');
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function formatSeconds(sec) {
    if (!sec || sec === 0) return '--:--.--';
    return sec.toFixed(2);
}

// ---------------- Gráficas de ejercicios ----------------

function renderCalisthenicsCharts(records) {
    const dates = records.map(r => r.date);

    createCaliChart({
        id: 'handstandChart',
        label: 'Handstand (sec)',
        data: records.map(d => d.handstand_sec),
        color: '#26c6da',
        dates
    });

    createCaliChart({
        id: 'lsitChart',
        label: 'L-Sit (sec)',
        data: records.map(d => d.l_sit_sec),
        color: '#ff7042',
        dates
    });

    createCaliChart({
        id: 'vsitChart',
        label: 'V-Sit (sec)',
        data: records.map(d => d.v_sit_sec),
        color: '#00e676',
        dates
    });

    createCaliChart({
        id: 'pushupsChart',
        label: 'Push-Ups (reps)',
        data: records.map(d => d.push_ups_reps),
        color: '#5e6ad2',
        dates
    });

    createCaliChart({
        id: 'pullupsChart',
        label: 'Pull-Ups (reps)',
        data: records.map(d => d.pull_ups_reps),
        color: '#ffffff',
        dates
    });
}

// ---------------- Función plantilla de creación de gráficas ----------------

function createCaliChart({ id, label, data, color, dates }) {
    renderChart(id, {
        labels: dates,
        datasets: [{
            label,
            data,
            borderColor: color,
            backgroundColor: color + '1a',
            fill: true,
            tension: 0.3
        }]
    });
}

function renderChart(canvasId, chartData) {
    const ctx = document.getElementById(canvasId);

    if (!ctx) return;

    window.charts = window.charts || {};

    if (window.charts[canvasId]) {
        window.charts[canvasId].destroy();
    }

    window.charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: chartData,
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
