
import { getUser } from "./db.js";
import { getAllStrength } from "./db.js";
import { getAllCalisthenics } from "./db.js";
import { getAllMeasurements } from "./db.js";

document.addEventListener('DOMContentLoaded', initDashboard);

async function initDashboard() {
  updateDate();
  loadWeightStats();
  loadBMI();
  loadKeyGains();
  renderWeightChart();
  loadInsights();
  calculateIdeals();
}

function updateDate() {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("current-date-display").textContent = formatted;
  document.getElementById("insights-date").textContent = formatted;
}

// ---------- Renderizar Peso ----------

async function loadWeightStats() {
  const measurements = await getAllMeasurements();
  if (!measurements.length) return;

  const sorted = measurements.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const current = sorted.at(-1);
  const previous = sorted.at(-2);

  document.getElementById("dash-weight").textContent = current.weight_kg.toFixed(1);

  const trendEl = document.getElementById('dash-weight-trend');

  if (previous) {
    const diff = (current.weight_kg - previous.weight_kg).toFixed(1);
    const sign = diff > 0 ? "+" : "";
    document.getElementById("dash-weight-trend").textContent =
      `${sign}${diff} kg vs last`;
    trendEl.className = diff > 0 ? 'trend up' : (diff < 0 ? 'trend down' : 'trend');
  } else {
    document.getElementById("dash-weight-trend").textContent = "First record";
  }
  console.log("Los resultados de loadWeightStats son: ", current, previous);
}

// -------------- Indice de masa corporal --------------

async function loadBMI() {
  const users = await getUser();
  const measurements = await getAllMeasurements();

  console.log("loadBMI: usuarios:", users, "mediciones:", measurements);

  if (!users?.length || !measurements.length) return;

  const user = users[0];

  const heightCm = Number(user.height_cm);
  const weightKg = Number(measurements.at(-1).weight_kg);

  if (!heightCm || heightCm < 100 || !weightKg) {
    console.warn('Invalid BMI data', { heightCm, weightKg });
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  const bmiEl = document.getElementById("dash-bmi");
  const statusEl = document.getElementById("dash-bmi-status");

  if (!bmiEl || !statusEl) return;

  bmiEl.textContent = bmi.toFixed(1);

  statusEl.textContent =
    bmi < 18.5 ? "Underweight" :
      bmi < 25 ? "Normal" :
        bmi < 30 ? "Overweight" : "Obese";

  statusEl.className =
    bmi < 18.5 ? "trend down" :
      bmi < 25 ? "trend up" :
        bmi < 30 ? "trend down" : "trend down";
}



// -------------- Ganancias clave --------------

async function loadKeyGains() {
  const measurements = await getAllMeasurements();

  console.log("loadKeyGains: mediciones obtenidas:", measurements);

  if (!measurements.length) return;

  const last = measurements.at(-1);
  const body = last.body;

  document.getElementById("dash-arm").textContent =
    body.arm ? `${body.arm} cm` : "--";

  document.getElementById("dash-chest").textContent =
    body.chest ? `${body.chest} cm` : "--";

  document.getElementById("dash-leg").textContent =
    body.leg ? `${body.leg} cm` : "--";
}

let weightChartInstance = null;

async function renderWeightChart() {
  const measurements = await getAllMeasurements();

  if (measurements.length < 2) return;

  const labels = measurements.map(m => m.date);
  const data = measurements.map(m => m.weight_kg);

  const ctx = document.getElementById('weightChart').getContext("2d");

  if (weightChartInstance) {
    weightChartInstance.destroy();
  }

  weightChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Weight (kg)",
        data,
        borderColor: 'rgb(94, 106, 210)',
        backgroundColor: 'rgba(94, 106, 210, 0.1)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// ------------------ Cargar consejos, destacados, advertencias ------------------

// ============================================================================
// 🧠 ADVANCED INSIGHTS ENGINE (Frontend Implementation)
// ============================================================================

const InsightLevel = {
  CRITICAL: { id: 'critical', score: 4, label: 'Atención Requerida', icon: 'ph-warning-octagon', class: 'critical' },
  IMPORTANT: { id: 'important', score: 3, label: 'Importante', icon: 'ph-warning', class: 'warning' },
  POSITIVE: { id: 'positive', score: 2, label: 'Buen Progreso', icon: 'ph-check-circle', class: 'success' },
  INFO: { id: 'info', score: 1, label: 'Información', icon: 'ph-info', class: 'info' }
};

async function loadInsights() {
  const insightsContainer = document.getElementById("insights-container");
  const dateEl = document.getElementById("insights-date");
  const countEl = document.getElementById("insights-count");

  if (!insightsContainer) return;
  insightsContainer.innerHTML = ""; // Clear current

  // 1. Data Ingestion
  const measurements = await getAllMeasurements();
  if (!measurements || measurements.length < 3) {
    renderEmptyState(insightsContainer, measurements.length);
    return;
  }

  // Sort and Windowing (Last 5 records for trend analysis)
  const history = [...measurements].sort((a, b) => new Date(a.date) - new Date(b.date));
  const WINDOW_SIZE = 5;
  const recentData = history.slice(-WINDOW_SIZE);
  const latest = recentData.at(-1);

  if (dateEl) dateEl.textContent = `Análisis basado en ${recentData.length} mediciones (Última: ${latest.date})`;

  // 2. Insight Generation
  let insights = [];

  // Run Analyzers
  insights.push(...analyzeProgressConsistency(recentData));
  insights.push(...analyzeGainQuality(recentData));
  insights.push(...analyzeBodyBalance(recentData));
  insights.push(...analyzeStagnation(recentData));

  // 3. Prioritization & Selection
  // Sort by Score (Desc) -> Then by Date/Recency if needed
  insights.sort((a, b) => b.level.score - a.level.score);

  // Limit output to avoid overwhelming user (Max 4 top priority insights)
  const topInsights = insights.slice(0, 4);

  // Fallback if no specific insights generated
  if (topInsights.length === 0) {
    topInsights.push({
      level: InsightLevel.POSITIVE,
      headline: "Progreso Estable",
      explanation: "Tus métricas se mantienen dentro de rangos normales. Sigue acumulando datos para detectar tendencias más específicas.",
      actions: ["Mantén tu rutina actual", "Asegura el registro quincenal"],
      metrics: "Datos insuficientes para tendencias complejas"
    });
  }

  // 4. Rendering
  renderInsights(insightsContainer, topInsights);
  if (countEl) countEl.textContent = `${topInsights.length} clave`;
}

// ----------------------------------------------------------------------------
// 📊 ANALYZERS (The Logic)
// ----------------------------------------------------------------------------

/**
 * 1. Consistency & Muscle Rate
 * Checks if growth is consistent or erratic.
 */
function analyzeProgressConsistency(data) {
  const insights = [];
  if (data.length < 3) return insights;

  const latest = data.at(-1);
  const prev = data.at(-2);
  const windowStart = data[0];

  // Calculate Muscle Score (Sum of key perimeters)
  const getMuscleScore = (rec) => (rec.body.chest || 0) + (rec.body.arm || 0) + (rec.body.leg || 0);

  const currentScore = getMuscleScore(latest);
  const startScore = getMuscleScore(windowStart);

  // Growth over the window period
  const totalGrowth = ((currentScore - startScore) / startScore) * 100;
  const avgGrowthPerPeriod = totalGrowth / (data.length - 1);

  // Thresholds (Biweekly approx)
  if (avgGrowthPerPeriod > 1.0) {
    insights.push({
      level: InsightLevel.POSITIVE,
      headline: "Ritmo de Crecimiento Acelerado",
      explanation: `Estás creciendo a un ritmo de +${avgGrowthPerPeriod.toFixed(1)}% promedio por periodo.`,
      actions: ["Aprovecha este momento anabólico", "Cuida no ganar demasiada grasa"],
      metrics: `Crecimiento total ventana: +${totalGrowth.toFixed(1)}%`
    });
  } else if (avgGrowthPerPeriod < -0.2) {
    insights.push({
      level: InsightLevel.CRITICAL,
      headline: "Tendencia de Pérdida Muscular",
      explanation: "Tus medidas musculares clave muestran una tendencia a la baja en las últimas mediciones.",
      actions: ["Revisa tu ingesta proteica (2g/kg)", "Reduce volumen de cardio", "Evalúa niveles de estrés"],
      metrics: `Contracción: ${totalGrowth.toFixed(1)}%`
    });
  }

  return insights;
}

/**
 * 2. Gain Quality (Dirty Bulk Detection)
 * Compares Weight Trend vs Muscle Trend
 */
function analyzeGainQuality(data) {
  const insights = [];
  if (data.length < 3) return insights;

  const latest = data.at(-1);
  const start = data[0];

  const weightDeltaPercent = ((latest.weight_kg - start.weight_kg) / start.weight_kg) * 100;

  // Approximate muscle gain proxy
  const getAvgMuscle = (r) => ((r.body.chest || 0) + (r.body.arm || 0) + (r.body.leg || 0)) / 3;
  const muscleDeltaPercent = ((getAvgMuscle(latest) - getAvgMuscle(start)) / getAvgMuscle(start)) * 100;

  // Rule: High Weight Gain + Low Muscle Gain = Dirty Bulk
  if (weightDeltaPercent > 2.5 && muscleDeltaPercent < 0.5) {
    insights.push({
      level: InsightLevel.IMPORTANT,
      headline: "Alerta de Calidad de Ganancia",
      explanation: `Tu peso ha subido considerablemente (+${weightDeltaPercent.toFixed(1)}%) pero las medidas musculares no acompañan el ritmo (+${muscleDeltaPercent.toFixed(1)}%).`,
      actions: ["Reduce ligeramente las calorías (200-300 kcal)", "Limpia la calidad de los alimentos", "Aumenta pasos diarios"],
      metrics: `Peso ++ vs Músculo =`
    });
  }

  // Rule: Recomp (Stable Weight + Muscle Up)
  if (Math.abs(weightDeltaPercent) < 1.0 && muscleDeltaPercent > 1.0) {
    insights.push({
      level: InsightLevel.POSITIVE,
      headline: "Recomposición Exitosa",
      explanation: "Estás ganando músculo mientras mantienes tu peso estable. ¡El santo grial!",
      actions: ["Mantén exactamente lo que estás haciendo", "No fuerces comer más por ahora"],
      metrics: `Músculo +${muscleDeltaPercent.toFixed(1)}% | Peso Estable`
    });
  }

  return insights;
}

/**
 * 3. Body Balance (Upper vs Lower)
 */
function analyzeBodyBalance(data) {
  const insights = [];
  const latest = data.at(-1);
  const start = data[0];

  const calcGrowth = (part) => {
    const s = start.body[part] || 0;
    const e = latest.body[part] || 0;
    if (s === 0) return 0;
    return ((e - s) / s) * 100;
  };

  const upperGrowth = (calcGrowth('chest') + calcGrowth('arm')) / 2;
  const lowerGrowth = (calcGrowth('leg') + calcGrowth('calf')) / 2;

  // Threshold: One grows 50% less than the other (and diff is absolute > 1%)
  if (lowerGrowth < upperGrowth * 0.5 && upperGrowth > 1.0) {
    insights.push({
      level: InsightLevel.IMPORTANT,
      headline: "Piernas Rezagadas (Tendencia)",
      explanation: `En este periodo, tu torso creció el doble de rápido que tus piernas.`,
      actions: ["Prioriza pierna al inicio de la semana", "Añade volumen semanal a cuádriceps/femoral"],
      metrics: `Torso +${upperGrowth.toFixed(1)}% vs Pierna +${lowerGrowth.toFixed(1)}%`
    });
  }

  return insights;
}

/**
 * 4. True Stagnation (3+ periods flat)
 */
function analyzeStagnation(data) {
  const insights = [];
  // Need at least 3 records to call it a "Trend" of stagnation
  if (data.length < 3) return insights;

  // Check last 3 records
  const subset = data.slice(-3);
  const vari = (vals) => {
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    return max - min;
  };

  const chestVar = vari(subset.map(r => r.body.chest || 0));
  const legVar = vari(subset.map(r => r.body.leg || 0));
  const weightVar = vari(subset.map(r => r.weight_kg));

  // If variations are minimal (< 0.3 cm or kg) across 3 measurements
  if (chestVar < 0.3 && legVar < 0.3 && weightVar < 0.5) {
    insights.push({
      level: InsightLevel.CRITICAL,
      headline: "Estancamiento Detectado",
      explanation: "No ha habido cambios significativos en peso ni medidas en las últimas 3 mediciones.",
      actions: ["Implementa una semana de descarga (Deload)", "Cambia el rango de repeticiones", "Aumenta 200 kcal si buscas masa"],
      metrics: "3 periodos sin cambios reales"
    });
  }

  return insights;
}


// ----------------------------------------------------------------------------
// 🎨 RENDERERS
// ----------------------------------------------------------------------------

function renderInsights(container, insights) {
  insights.forEach((insight) => {
    const card = document.createElement("div");
    card.className = `insight-card ${insight.level.class}`; // uses css class

    card.innerHTML = `
      <div class="insight-header">
        <i class="ph ${insight.level.icon}"></i>
        <h3>${insight.headline}</h3>
      </div>
      <p class="insight-explanation">${insight.explanation}</p>
      <ul class="insight-actions">
        ${insight.actions.map((a) => `<li>${a}</li>`).join("")}
      </ul>
      <div class="insight-metrics">${insight.metrics}</div>
    `;

    container.appendChild(card);
  });
}

function renderEmptyState(container, count) {
  container.innerHTML = `
    <div class="insight-card info">
      <div class="insight-header">
        <i class="ph ph-database"></i>
        <h3>Recopilando Datos</h3>
      </div>
      <p class="insight-explanation">
        Necesitamos al menos 3 mediciones para generar insights de alta precisión y tendencias.
        Actualmente tienes <strong>${count}</strong>.
      </p>
      <div class="insight-metrics">Sigue registrando tu progreso quincenal.</div>
    </div>
  `;
}

// --------------------- Highlight peso y grasa ---------------------

const WEIGHT_STEP_KG = 4;   // kg por barra
const BODYFAT_STEP = 3;    // % por barra

async function calculateIdeals() {
  const users = await getUser();
  const measurements = await getAllMeasurements();

  if (!users?.length || !measurements?.length) {
    document
      .querySelectorAll('.user-marker')
      .forEach(el => el.classList.add('hide'));
    return;
  }

  // --- Datos base ---
  const { height_cm } = users[0];
  const latest = measurements.at(-1);
  const { weight_kg, skinfolds } = latest;

  const heightMeters = height_cm / 100;

  // --- Peso ideal ---
  const idealWeight = 22 * (heightMeters ** 2);
  const weightIndex = getWeightIndex(weight_kg, idealWeight, WEIGHT_STEP_KG);

  placeMarker(
    '#weightGrid',
    weightIndex,
    `<strong>Peso actual:</strong> ${weight_kg.toFixed(1)} kg<br>
         <strong>Peso ideal:</strong> ${idealWeight.toFixed(1)} kg`
  );

  // --- Grasa corporal ---
  const totalSkinfolds =
    skinfolds.abdominal +
    skinfolds.iliac_crest +
    skinfolds.subscapular;

  const estimatedBodyFat = 0.15 * totalSkinfolds + 5;
  const idealBodyFat = 14;

  const bodyFatIndex = getWeightIndex(
    estimatedBodyFat,
    idealBodyFat,
    BODYFAT_STEP
  );

  placeMarker(
    '#bodyfatGrid',
    bodyFatIndex,
    `<strong>Grasa estimada:</strong> ${estimatedBodyFat.toFixed(1)}%<br>
         <strong>Óptimo:</strong> 14%`
  );
}


function getWeightIndex(current, ideal, STEP) {
  const diff = current - ideal;

  if (diff <= -4 * STEP) return 1;
  if (diff <= -3 * STEP) return 2;
  if (diff <= -2 * STEP) return 3;
  if (diff <= -1 * STEP) return 4;
  if (Math.abs(diff) < STEP) return 5;
  if (diff <= 2 * STEP) return 6;
  if (diff <= 3 * STEP) return 7;
  if (diff <= 4 * STEP) return 8;
  return 9;
}

function placeMarker(gridSelector, index, tooltipText = null) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;

  const bars = [...grid.querySelectorAll('.weight-bar')];
  const marker = grid.querySelector('.user-marker');

  if (!bars.length || !marker) return;

  // index viene de 1 a 9
  const targetBar = bars[index - 1];
  if (!targetBar) return;

  const barRect = targetBar.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();

  const x =
    barRect.left -
    gridRect.left +
    barRect.width / 2 -
    marker.offsetWidth / 2;

  marker.style.transform = `translateX(${x}px)`;

  // -------- TOOLTIP --------
  if (tooltipText) {
    let tooltip = marker.querySelector('.marker-tooltip');

    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'marker-tooltip';
      marker.appendChild(tooltip);
    }

    tooltip.innerHTML = tooltipText;

    // -------- CLICK SUPPORT FOR MOBILE --------
    // Remove existing listeners to avoid duplicates
    marker.replaceWith(marker.cloneNode(true));
    const newMarker = grid.querySelector('.user-marker');
    const newTooltip = newMarker.querySelector('.marker-tooltip');

    // Toggle tooltip on marker click
    newMarker.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click from immediately hiding

      // Hide all other tooltips first
      document.querySelectorAll('.marker-tooltip.active').forEach(t => {
        if (t !== newTooltip) {
          t.classList.remove('active');
        }
      });

      // Toggle this tooltip
      newTooltip.classList.toggle('active');
    });

    // Hide tooltip when clicking outside
    document.addEventListener('click', (e) => {
      if (!newMarker.contains(e.target)) {
        newTooltip.classList.remove('active');
      }
    });
  }
}


