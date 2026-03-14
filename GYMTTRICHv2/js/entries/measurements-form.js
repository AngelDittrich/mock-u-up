import {
    getAllMeasurementsSorted,
    getMeasurementByDate,
    saveMeasurement
} from '../db.js';

export async function renderMeasurementsForm(container) {

    // Por ahora: modo CREATE
    // (el modo EDIT lo activaremos cuando elijas fecha desde UI)
    const isEdit = false;

    container.innerHTML = `
        <div class="form-header">
            <h2>${isEdit ? 'Edit measurements' : 'New measurements'}</h2>
            <button class="form-close" id="close-measurements-form">
                <i class="ph ph-x"></i>
            </button>
        </div>

        <form id="measurements-form" class="entry-form">

            <div class="form-group">
                <label>Date</label>
                <input type="date" name="date" required>
            </div>

            <div class="form-group">
                <label>Weight (kg)</label>
                <input type="number" step="0.1" name="weight_kg" required>
            </div>

            <h3 class="form-section-title">Body measurements (cm)</h3>

            <div class="form-grid">
                <input type="number" name="body_arm" placeholder="Arm">
                <input type="number" name="body_forearm" placeholder="Forearm">
                <input type="number" name="body_chest" placeholder="Chest">
                <input type="number" name="body_abdomen" placeholder="Abdomen">
                <input type="number" name="body_hip" placeholder="Hip">
                <input type="number" name="body_leg" placeholder="Leg">
                <input type="number" name="body_calf" placeholder="Calf">
            </div>

            <h3 class="form-section-title">Skinfolds (mm)</h3>

            <div class="form-grid">
                <input type="number" name="sf_biceps" placeholder="Biceps">
                <input type="number" name="sf_forearm" placeholder="Forearm">
                <input type="number" name="sf_subscapular" placeholder="Subscapular">
                <input type="number" name="sf_iliac_crest" placeholder="Iliac crest">
                <input type="number" name="sf_abdominal" placeholder="Abdominal">
                <input type="number" name="sf_femoral" placeholder="Femoral">
            </div>

            <button type="submit" class="form-submit">
                Save measurements
            </button>
        </form>
    `;

    bindMeasurementsFormEvents();
}

function bindMeasurementsFormEvents() {

    const form = document.getElementById('measurements-form');
    const closeBtn = document.getElementById('close-measurements-form');

    if (!form || !closeBtn) {
        throw new Error('Measurements form elements not found');
    }

    closeBtn.addEventListener('click', () => {
        document.getElementById('entries-overlay')
            .dispatchEvent(new Event('click'));
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        const payload = {
            date: data.date,
            weight_kg: Number(data.weight_kg),

            body: {
                arm: Number(data.body_arm),
                forearm: Number(data.body_forearm),
                chest: Number(data.body_chest),
                abdomen: Number(data.body_abdomen),
                hip: Number(data.body_hip),
                leg: Number(data.body_leg),
                calf: Number(data.body_calf)
            },

            skinfolds: {
                biceps: Number(data.sf_biceps),
                forearm: Number(data.sf_forearm),
                subscapular: Number(data.sf_subscapular),
                iliac_crest: Number(data.sf_iliac_crest),
                abdominal: Number(data.sf_abdominal),
                femoral: Number(data.sf_femoral)
            }
        };

        try {
            await saveMeasurement(payload);

            document.getElementById('entries-overlay')
                .dispatchEvent(new Event('click'));

        } catch (err) {
            if (err.name === 'ConstraintError') {
                alert('Measurements for this date already exist');
            } else {
                console.error(err);
            }
        }
    });
}
