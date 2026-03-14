import { getUser, saveUser } from "../db.js";
import { renderPersonalizedTips } from "../tips.js";

export async function renderUserForm(container) {
    const users = await getUser();
    const user = users?.[0] || null;
    const isEdit = Boolean(user);

    container.innerHTML = `
        <div class="form-header">
            <h2>${isEdit ? 'Edit profile' : 'Create profile'}</h2>
            <button class="form-close" id="close-user-form">
                <i class="ph ph-x"></i>
            </button>
        </div>

        <form id="user-form" class="entry-form">
            <div class="form-group">
                <label>Height (cm)</label>
                <input type="number" name="height_cm" required min="100" max="230"
                    value="${user?.height_cm ?? ''}">
            </div>

            <div class="form-group">
                <label>Body type</label>
                <select name="body_type">
                    <option value="Ectomorph" ${user?.body_type === 'Ectomorph' ? 'selected' : ''}>Ectomorph</option>
                    <option value="Mesomorph" ${user?.body_type === 'Mesomorph' ? 'selected' : ''}>Mesomorph</option>
                    <option value="Endomorph" ${user?.body_type === 'Endomorph' ? 'selected' : ''}>Endomorph</option>
                </select>
            </div>

            <div class="form-group">
                <label>Goal</label>
                <select name="goal">
                    <option value="Hypertrophy" ${user?.goal === 'Hypertrophy' ? 'selected' : ''}>Hypertrophy</option>
                    <option value="Recomposition" ${user?.goal === 'Recomposition' ? 'selected' : ''}>Recomposition</option>
                    <option value="Fat loss" ${user?.goal === 'Fat loss' ? 'selected' : ''}>Fat loss</option>
                </select>
            </div>

            <button type="submit" class="form-submit">
                ${isEdit ? 'Update profile' : 'Save profile'}
            </button>
        </form>
    `;

    bindUserFormEvents(user);
}

function bindUserFormEvents(existingUser) {
    const form = document.getElementById('user-form');
    const closeBtn = document.getElementById('close-user-form');

    closeBtn.addEventListener('click', () => {
        document.getElementById('entries-overlay')
            .dispatchEvent(new Event('click'));
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        const payload = {
            id: existingUser?.id ?? Date.now(),
            height_cm: Number(data.height_cm),
            body_type: data.body_type,
            goal: data.goal,
            created_at: existingUser?.created_at ?? new Date().toISOString()
        };

        await saveUser(payload);

        // Re-render personalized tips with new user data
        await renderPersonalizedTips();

        document.getElementById('entries-overlay')
            .dispatchEvent(new Event('click'));
    });
}
