// Archivo para la lectura del perfil - Código de lectura y renderizado.

import { getUser } from "./db.js";

async function renderUserProfile() {
    const users = await getUser();
    const user = users?.[0];

    console.log("Profile-view: usuarios obtenidos:", users, "usuario seleccionado:", user);

    if (!user) return;

    // Sección del perfil
    const heightEl = document.getElementById('profile-height');
    const typeEl = document.getElementById('profile-type');
    const goalEl = document.getElementById('profile-goal');

    if (heightEl) heightEl.textContent = user.height_cm ?? '--';
    if (typeEl) typeEl.textContent = user.body_type ?? '--';
    if (goalEl) goalEl.textContent = user.goal ?? '--';

    // Sidebar - Mini perfil
    const roleEl = document.querySelector('.user-mini-profile .role');
    if (roleEl) roleEl.textContent = user.body_type ?? '--'
}

renderUserProfile();