import { saveStrength } from "../db.js";

export async function renderStrengthForm(container) {
    container.innerHTML = `
        <div class="form-header">
            <h2>Strength entry</h2>
            <button class="form-close" id="close-strength-form">
                <i class="ph ph-x"></i>
            </button>
        </div>

        <form id="strength-form" class="entry-form">

            <div class="form-group">
                <label>Date</label>
                <input 
                    type="date" 
                    name="date"
                    value="${new Date().toISOString().slice(0,10)}"
                    required
                >
            </div>

            <div class="form-section-title">
                <i class="ph ph-arrows-out"></i>
                Upper body – push
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Bench press</label>
                    <input type="number" name="bench_press" min="0" placeholder="kg">
                </div>

                <div class="form-group">
                    <label>Overhead press</label>
                    <input type="number" name="press" min="0" placeholder="kg">
                </div>

                <div class="form-group">
                    <label>Military press</label>
                    <input type="number" name="militar" min="0" placeholder="kg">
                </div>
            </div>

            <div class="form-section-title">
                <i class="ph ph-hand-fist"></i>
                Pull & arms
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Pull-ups (weighted)</label>
                    <input type="number" name="pull_ups" min="0" placeholder="kg">
                </div>

                <div class="form-group">
                    <label>Biceps curl</label>
                    <input type="number" name="curl" min="0" placeholder="kg">
                </div>

                <div class="form-group">
                    <label>Triceps extension</label>
                    <input type="number" name="extension" min="0" placeholder="kg">
                </div>
            </div>

            <div class="form-section-title">
                <i class="ph ph-barbell"></i>
                Lower body
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Squat</label>
                    <input type="number" name="squat" min="0" placeholder="kg">
                </div>

                <div class="form-group">
                    <label>Deadlift</label>
                    <input type="number" name="deadlift" min="0" placeholder="kg">
                </div>
            </div>

            <button type="submit" class="form-submit">
                Save strength entry
            </button>
        </form>
    `;

    bindStrengthFormEvents();
}

function bindStrengthFormEvents() {
    const form = document.getElementById('strength-form');
    const closeBtn = document.getElementById('close-strength-form');

    closeBtn.addEventListener('click', closeEntriesModal);

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        const payload = {
            date: data.date,
            exercises: {
                militar: Number(data.militar || 0),
                bench_press: Number(data.bench_press || 0),
                pull_ups: Number(data.pull_ups || 0),
                curl: Number(data.curl || 0),
                extension: Number(data.extension || 0),
                deadlift: Number(data.deadlift || 0),
                press: Number(data.press || 0),
                squat: Number(data.squat || 0),
            }
        };

        await saveStrength(payload);
        closeEntriesModal();
    });
}

function closeEntriesModal() {
    document
        .getElementById('entries-overlay')
        .dispatchEvent(new Event('click'));
}
