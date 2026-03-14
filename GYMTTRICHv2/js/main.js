// Global State
let appData = {};
let charts = {}; // Store chart instances to destroy/update them

// Constants
const PRIMARY_COLOR = '#5e6ad2';
const SECONDARY_COLOR = '#26c6da';
const ACCENT_COLOR = '#ff7043';
const BG_GRID = 'rgba(255, 255, 255, 0.05)';
const FONT_FAMILY = 'Inter, sans-serif';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    setupNavigation();
    renderAll();
}

/**
 * Navigation Handling
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Update Nav State
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show Section
            const targetId = link.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

function renderAll() {
    renderDashboard();
    renderStrength();
    renderCalisthenics();
    renderInsights();
}

/**
 * Dashboard Rendering
 */
function renderDashboard() {
    // Dates
    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('current-date-display').textContent = today;

    if (!appData.measurements || appData.measurements.length === 0) return;

    // Latest Data
    const latest = appData.measurements[appData.measurements.length - 1];
    const previous = appData.measurements.length > 1 ? appData.measurements[appData.measurements.length - 2] : null;

    // Weight
    document.getElementById('dash-weight').textContent = latest.weight_kg;

    // Weight Trend
    const trendEl = document.getElementById('dash-weight-trend');
    if (previous) {
        const diff = (latest.weight_kg - previous.weight_kg).toFixed(1);
        const sign = diff > 0 ? '+' : '';
        trendEl.textContent = `${sign}${diff}kg vs last`;
        trendEl.className = diff > 0 ? 'trend up' : (diff < 0 ? 'trend down' : 'trend');
    }

    // BMI Calculation
    const heightM = appData.profile.height_cm / 100;
    const bmi = (latest.weight_kg / (heightM * heightM)).toFixed(1);
    document.getElementById('dash-bmi').textContent = bmi;

    const bmiStatus = document.getElementById('dash-bmi-status');
    if (bmi < 18.5) bmiStatus.textContent = 'Underweight';
    else if (bmi < 25) bmiStatus.textContent = 'Normal Weight';
    else if (bmi < 30) bmiStatus.textContent = 'Overweight';
    else bmiStatus.textContent = 'Obese';

    // Key Measurements
    document.getElementById('dash-arm').textContent = latest.body.arm + ' cm';
    document.getElementById('dash-chest').textContent = latest.body.chest + ' cm';
    document.getElementById('dash-leg').textContent = latest.body.leg + ' cm';

    // Chart: Weight History
    renderChart('weightChart', {
        labels: appData.measurements.map(m => m.date),
        datasets: [{
            label: 'Weight (kg)',
            data: appData.measurements.map(m => m.weight_kg),
            borderColor: PRIMARY_COLOR,
            backgroundColor: 'rgba(94, 106, 210, 0.1)',
            fill: true,
            tension: 0.4
        }]
    });
}

/**
 * Profile Rendering
 */
// function renderProfile() {
//     // Basic Info
//     document.getElementById('profile-height').textContent = appData.profile.height_cm;
//     document.getElementById('profile-type').textContent = appData.profile.body_type;
//     document.getElementById('profile-goal').textContent = appData.profile.goal;

//     // Measurements Table
//     const tbody = document.querySelector('#measurements-table tbody');
//     tbody.innerHTML = '';

//     // Sort reverse chronological
//     const sorted = [...appData.measurements].reverse();

//     sorted.forEach(m => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${m.date}</td>
//             <td><strong>${m.weight_kg}</strong></td>
//             <td>${m.body.arm}</td>
//             <td>${m.body.chest}</td>
//             <td>${m.body.abdomen}</td>
//             <td>${m.body.hip}</td>
//             <td>${m.body.leg}</td>
//         `;
//         tbody.appendChild(tr);
//     });

//     // Charts
//     const dates = appData.measurements.map(m => m.date);

//     renderChart('upperBodyChart', {
//         labels: dates,
//         datasets: [
//             { label: 'Chest', data: appData.measurements.map(m => m.body.chest), borderColor: ACCENT_COLOR },
//             { label: 'Arm', data: appData.measurements.map(m => m.body.arm), borderColor: SECONDARY_COLOR },
//             { label: 'Abdomen', data: appData.measurements.map(m => m.body.abdomen), borderColor: '#ffffff' }
//         ]
//     });

//     renderChart('lowerBodyChart', {
//         labels: dates,
//         datasets: [
//             { label: 'Leg', data: appData.measurements.map(m => m.body.leg), borderColor: PRIMARY_COLOR },
//             { label: 'Hip', data: appData.measurements.map(m => m.body.hip), borderColor: SECONDARY_COLOR },
//             { label: 'Calf', data: appData.measurements.map(m => m.body.calf), borderColor: '#ffffff' }
//         ]
//     });

//     // Skinfolds Chart
//     // Get all keys from the first skinfold entry to be dynamic
//     const keys = Object.keys(appData.measurements[0].skinfolds);
//     const datasets = keys.map((key, i) => {
//         const colors = [PRIMARY_COLOR, SECONDARY_COLOR, ACCENT_COLOR, '#e91e63', '#9c27b0', '#ffeb3b'];
//         return {
//             label: key.charAt(0).toUpperCase() + key.slice(1),
//             data: appData.measurements.map(m => m.skinfolds[key]),
//             borderColor: colors[i % colors.length],
//             hidden: i > 2 // Hide some by default if too many
//         };
//     });

//     renderChart('skinfoldsChart', {
//         labels: dates,
//         datasets: datasets
//     });
// }

/**
 * Strength Rendering
 */
function renderStrength() {
    if (!appData.strength || appData.strength.length === 0) return;

    // Table
    const tbody = document.querySelector('#strength-table tbody');
    tbody.innerHTML = '';
    const sorted = [...appData.strength].reverse();

    sorted.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.date}</td>
            <td>${s.exercises.bench_press || '-'}</td>
            <td>${s.exercises.squat || '-'}</td>
            <td>${s.exercises.deadlift || '-'}</td>
            <td>${s.exercises.row || '-'}</td>
            <td>${s.exercises.incline_press || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    // Charts
    const dates = appData.strength.map(s => s.date);

    renderChart('bigThreeChart', {
        labels: dates,
        datasets: [
            { label: 'Bench Press', data: appData.strength.map(s => s.exercises.bench_press), borderColor: ACCENT_COLOR },
            { label: 'Squat', data: appData.strength.map(s => s.exercises.squat), borderColor: PRIMARY_COLOR },
            { label: 'Deadlift', data: appData.strength.map(s => s.exercises.deadlift), borderColor: SECONDARY_COLOR }
        ]
    });

    renderChart('accessoryChart', {
        labels: dates,
        datasets: [
            { label: 'Row', data: appData.strength.map(s => s.exercises.row), borderColor: '#ffffff' },
            { label: 'Bicep Curl', data: appData.strength.map(s => s.exercises.bicep_curl), borderColor: '#e91e63' },
            { label: 'Tricep Pushdown', data: appData.strength.map(s => s.exercises.tricep_pushdown), borderColor: '#9c27b0' }
        ]
    });
}

/**
 * Chart.js Helper
 */
function renderChart(canvasId, dataConfig) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Destroy previous instance
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    // Default Config
    const config = {
        type: 'line',
        data: dataConfig,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', font: { family: FONT_FAMILY } }
                }
            },
            scales: {
                x: {
                    grid: { color: BG_GRID, drawBorder: false },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { color: BG_GRID, drawBorder: false },
                    ticks: { color: '#94a3b8' },
                    beginAtZero: false
                }
            },
            elements: {
                line: { borderWidth: 3 },
                point: { radius: 4, hitRadius: 10 }
            }
        }
    };

    charts[canvasId] = new Chart(ctx, config);
}

/**
 * Performance Insights System
 * Logic-based analysis of training data trends.
 */
/**
 * Performance Insights System - Pro Edition
 * Human-centric analysis with actionable steps.
 */
function renderInsights() {
    if (!appData.measurements || appData.measurements.length < 2) return;

    const insightsContainer = document.getElementById('insights-container');
    if (!insightsContainer) return;

    insightsContainer.innerHTML = ''; // Clear previous
    const insights = [];

    // Sort chronological: [old, ..., new]
    const history = [...appData.measurements].sort((a, b) => new Date(a.date) - new Date(b.date));
    const latest = history[history.length - 1];
    const previous = history[history.length - 2];

    const dateEl = document.getElementById('insights-date');
    const countEl = document.getElementById('insights-count');
    if (dateEl) dateEl.textContent = `Actualizado: ${latest.date}`;

    // Helper: Growth %
    const getGrowth = (current, prev) => {
        if (!prev) return 0;
        return ((current - prev) / prev) * 100;
    };

    // --- LOGIC CALCULATIONS ---

    // 1. Priority Focus (Upper vs Lower)
    const upperGrowth = (getGrowth(latest.body.arm, previous.body.arm) + getGrowth(latest.body.chest, previous.body.chest)) / 2;
    const lowerGrowth = (getGrowth(latest.body.leg, previous.body.leg) + getGrowth(latest.body.calf, previous.body.calf)) / 2;

    if (lowerGrowth < (upperGrowth * 0.7) && upperGrowth > 0.5) {
        insights.push({
            level: 'warning',
            icon: 'ph-person-simple-walk',
            headline: 'Las piernas se están quedando atrás',
            explanation: `Tu torso está creciendo bien (+${upperGrowth.toFixed(1)}%), pero el tren inferior lleva un ritmo más lento (+${lowerGrowth.toFixed(1)}%) en este periodo.`,
            actions: [
                'Aumenta la frecuencia de pierna a 2x/semana',
                'Añade una serie extra a tus sentadillas',
                'Prioriza la progresión de cargas en tren inferior'
            ],
            metrics: `Torso +${upperGrowth.toFixed(1)}% | Pierna +${lowerGrowth.toFixed(1)}%`
        });
    } else if (upperGrowth < (lowerGrowth * 0.7) && lowerGrowth > 0.5) {
        insights.push({
            level: 'warning',
            icon: 'ph-person-arms-spread',
            headline: 'El tren superior necesita más trabajo',
            explanation: `Tus piernas están respondiendo excelente (+${lowerGrowth.toFixed(1)}%), pero el crecimiento de brazos y pecho es menor (+${upperGrowth.toFixed(1)}%).`,
            actions: [
                'Revisa tu técnica en preses y remos',
                'Considera añadir un día extra de empuje/tirón',
                'Asegúrate de llegar cerca del fallo en torso'
            ],
            metrics: `Pierna +${lowerGrowth.toFixed(1)}% | Torso +${upperGrowth.toFixed(1)}%`
        });
    }

    // 2. Growth Quality (Weight vs Muscle)
    const weightGrowth = getGrowth(latest.weight_kg, previous.weight_kg);
    const avgMuscleGrowth = (getGrowth(latest.body.arm, previous.body.arm) +
        getGrowth(latest.body.chest, previous.body.chest) +
        getGrowth(latest.body.leg, previous.body.leg)) / 3;

    if (weightGrowth > 1.5 && avgMuscleGrowth < 0.2) {
        insights.push({
            level: 'info',
            icon: 'ph-scales',
            headline: 'Cuidado con el aumento de peso rápido',
            explanation: `Tu peso corporal subió (+${weightGrowth.toFixed(1)}%), pero tus medidas musculares casi no cambiaron (+${avgMuscleGrowth.toFixed(1)}%). Podría ser ganancia de grasa.`,
            actions: [
                'Reduce ligeramente tu superávit calórico',
                'Aumenta tu ingesta diaria de proteínas (2g/kg)',
                'Mejora la calidad de tu sueño para ganar músculo'
            ],
            metrics: `Peso +${weightGrowth.toFixed(1)}% | Músculo +${avgMuscleGrowth.toFixed(1)}%`
        });
    } else if (weightGrowth > 0.5 && avgMuscleGrowth > 1.0) {
        insights.push({
            level: 'success',
            icon: 'ph-trophy',
            headline: '¡Excelente calidad de ganancias!',
            explanation: `Estás ganando músculo sólido (+${avgMuscleGrowth.toFixed(1)}%) a un ritmo mayor que tu peso corporal (+${weightGrowth.toFixed(1)}%). Esto es ideal.`,
            actions: [
                'Mantén exactamente esta nutrición',
                'Sigue aplicando sobrecarga progresiva',
                'No cambies nada, ¡funciona perfecto!'
            ],
            metrics: `Peso +${weightGrowth.toFixed(1)}% | Músculo +${avgMuscleGrowth.toFixed(1)}%`
        });
    }

    // 3. Fat Distribution
    const centralSum = latest.skinfolds.abdominal + latest.skinfolds.iliac_crest;
    const peripheralSum = latest.skinfolds.biceps + latest.skinfolds.forearm;
    const distRatio = centralSum / peripheralSum;

    if (distRatio > 1.6) {
        insights.push({
            level: 'warning',
            icon: 'ph-heartbeat',
            headline: 'Acumulación de grasa central detectada',
            explanation: `Tus pliegues indican que estás almacenando más grasa en la zona abdominal (ratio ${distRatio.toFixed(1)}) en comparación con extremidades.`,
            actions: [
                'Modera el consumo de carbohidratos simples',
                'Incorpora 15 min de actividad post-entrenamiento',
                'Prioriza alimentos de bajo índice glucémico'
            ],
            metrics: `Ratio Central/Periférico: ${distRatio.toFixed(2)}`
        });
    }

    // 4. Stagnation
    const stagnantLimbs = [];
    if (latest.body.arm === previous.body.arm) stagnantLimbs.push('Brazos');
    if (latest.body.chest === previous.body.chest) stagnantLimbs.push('Pecho');
    if (latest.body.leg === previous.body.leg) stagnantLimbs.push('Piernas');

    if (stagnantLimbs.length >= 2) {
        insights.push({
            level: 'neutral',
            icon: 'ph-traffic-cone',
            headline: 'Posible estancamiento detectado',
            explanation: `No hubo cambios en las medidas de ${stagnantLimbs.join(' y ')} desde la última revisión. Es normal, pero requiere atención.`,
            actions: [
                'Implementa una semana de descarga (Deload)',
                'Cambia el rango de repeticiones por 3 semanas',
                'Revisa si estás descansando lo suficiente'
            ],
            metrics: `${stagnantLimbs.length} grupos sin cambios`
        });
    }

    // Default Success
    if (insights.length === 0) {
        insights.push({
            level: 'success',
            icon: 'ph-check-circle',
            headline: 'Progreso balanceado y constante',
            explanation: 'Todo crece en armonía. No hay desbalances, estancamientos ni aumentos de grasa desproporcionados.',
            actions: [
                'Continúa con tu plan actual',
                'Intenta batir récords personales esta semana',
                'Asegura la constancia en el gimnasio'
            ],
            metrics: 'Estado: Óptimo'
        });
    }

    // Update count
    if (countEl) countEl.textContent = `${insights.length} insight${insights.length !== 1 ? 's' : ''}`;

    // Render Cards
    insights.forEach(insight => {
        const card = document.createElement('div');
        card.className = `insight-card ${insight.level}`;

        // Render Action List
        const actionsHtml = insight.actions.map(action => `<li>${action}</li>`).join('');

        card.innerHTML = `
            <div class="insight-header">
                <i class="ph ${insight.icon}"></i>
                <h3>${insight.headline}</h3>
            </div>
            <p class="insight-explanation">
                ${insight.explanation}
            </p>
            <ul class="insight-actions">
                ${actionsHtml}
            </ul>
            <div class="insight-metrics">
                ${insight.metrics}
            </div>
        `;
        insightsContainer.appendChild(card);
    });
}

/**
 * Calisthenics Logic
 */
function renderCalisthenics() {
    if (!appData.calisthenics || appData.calisthenics.length === 0) return;

    const latest = appData.calisthenics[appData.calisthenics.length - 1];

    // Helper to format seconds to MM:SS.ms
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 100);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    // Populate Bento Cards
    document.getElementById('cali-handstand').textContent = formatTime(latest.handstand_sec);
    document.getElementById('cali-pushups').textContent = latest.push_ups_reps;
    document.getElementById('cali-lsit').textContent = formatTime(latest.l_sit_sec);
    document.getElementById('cali-pullups').textContent = latest.pull_ups_reps;
    document.getElementById('cali-vsit').textContent = formatTime(latest.v_sit_sec);

    // Tips Toggle
    const tipsBtn = document.getElementById('toggle-tips-btn');
    const tipsContent = document.getElementById('calisthenics-tips');

    // Remove existing listener to avoid duplicates if re-rendering
    const newBtn = tipsBtn.cloneNode(true);
    tipsBtn.parentNode.replaceChild(newBtn, tipsBtn);

    newBtn.addEventListener('click', () => {
        tipsContent.classList.toggle('hidden');
        const isHidden = tipsContent.classList.contains('hidden');
        newBtn.innerHTML = isHidden
            ? '<i class="ph ph-lightbulb"></i> View Complete Calisthenics Guide'
            : '<i class="ph ph-x"></i> Hide Guide';
    });

    // Charts
    const dates = appData.calisthenics.map(d => d.date);
    const borderColor = '#26c6da';

    const createCaliChart = (id, label, data, color) => {
        renderChart(id, {
            labels: dates,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: color + '1a', // 10% opacity
                fill: true,
                tension: 0.3
            }]
        });
    };

    createCaliChart('handstandChart', 'Handstand (sec)', appData.calisthenics.map(d => d.handstand_sec), '#26c6da');
    createCaliChart('lsitChart', 'L-Sit (sec)', appData.calisthenics.map(d => d.l_sit_sec), '#ff7043');
    createCaliChart('pushupsChart', 'Push-Ups (reps)', appData.calisthenics.map(d => d.push_ups_reps), '#5e6ad2');
    createCaliChart('pullupsChart', 'Pull-Ups (reps)', appData.calisthenics.map(d => d.pull_ups_reps), '#ffffff');
    createCaliChart('vsitChart', 'V-Sit (sec)', appData.calisthenics.map(d => d.v_sit_sec), '#00e676');
}
