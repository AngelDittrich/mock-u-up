import { getAllCalisthenics, saveCalisthenics } from "../db.js";

export async function renderCalisthenicsForm(container) {
    container.innerHTML = `
        <div class="form-header">
            <h2>Calisthenics entry</h2>
            <button class="form-close" id="close-calisthenics-form">
                <i class="ph ph-x"></i>
            </button>
        </div>

        <form id="calisthenics-form" class="entry-form">

            <div class="form-group">
                <label>Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value="${new Date().toISOString().slice(0, 10)}"
                    required
                >
            </div>

            <div class="form-section-title">
                Static holds (seconds)
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Handstand</label>
                    <input type="number" name="handstand_sec" min="0" step="0.01" placeholder="0.00">
                </div>

                <div class="form-group">
                    <label>L-Sit</label>
                    <input type="number" name="l_sit_sec" min="0" step="0.01" placeholder="0.00">
                </div>

                <div class="form-group">
                    <label>V-Sit</label>
                    <input type="number" name="v_sit_sec" min="0" step="0.01" placeholder="0.00">
                </div>
            </div>

            <div class="form-section-title">
                Dynamic reps
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Push-ups</label>
                    <input type="number" name="push_ups_reps" min="0" placeholder="0">
                </div>

                <div class="form-group">
                    <label>Pull-ups</label>
                    <input type="number" name="pull_ups_reps" min="0" placeholder="0">
                </div>
            </div>

            <button type="submit" class="form-submit">
                Save calisthenics entry
            </button>
        </form>
    `;

    bindCalisthenicsFormEvents();
}

function bindCalisthenicsFormEvents() {
    const form = document.getElementById('calisthenics-form');
    const closeBtn = document.getElementById('close-calisthenics-form');

    closeBtn.addEventListener('click', closeEntriesModal);

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        const payload = {
            date: data.date,
            handstand_sec: Number(data.handstand_sec || 0),
            l_sit_sec: Number(data.l_sit_sec || 0),
            v_sit_sec: Number(data.v_sit_sec || 0),
            push_ups_reps: Number(data.push_ups_reps || 0),
            pull_ups_reps: Number(data.pull_ups_reps || 0)
        };

        await saveCalisthenics(payload);
        closeEntriesModal();
    });
}

function closeEntriesModal() {
    document
        .getElementById('entries-overlay')
        .dispatchEvent(new Event('click'));
}
