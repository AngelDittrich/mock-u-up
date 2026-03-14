// -------------- Controlador general del hub --------------

const ENTRIES = [
    {
        id: 'user',
        title: 'User Profile',
        description: 'Personal data and goals',
        icon: 'ph-user' 
    },
    {
        id: 'measurements',
        title: 'Body Measurements',
        description: 'Weight, circumeferences and folds',
        icon: 'ph-ruler'
    },
    {
        id: 'calisthenics',
        title: 'Calisthenics',
        description: 'Bodyweight training records',
        icon: 'ph-activity'
    },
    {
        id: 'strength',
        title: 'Strenght',
        description: 'Weighted exercises and progression',
        icon: 'ph-barbell'
    }
];

const hub = document.getElementById('entries-hub');

hub.innerHTML = ENTRIES.map(e => `
    <div class="entry-card" data-entry="${e.id}">
        <i class="ph ${e.icon}"></i>
        <h3>${e.title}</h3>
        <p>${e.description}</p>
    </div>
`).join('');

// Sistema de apertura y cierres de las modales 

const overlay = document.getElementById('entries-overlay');
const modal = document.getElementById('entries-modal');

hub.addEventListener('click', e => {
    const card = e.target.closest('.entry-card');

    if (!card) return;

    openEntry(card.dataset.entry);
});

function openEntry(type) {
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => overlay.classList.add('active'));

    loadForm(type);
}

function closeEntry() {
    overlay.classList.remove('active');
    setTimeout(() => overlay.classList.add('hidden'), 400);
}

overlay.addEventListener('click', e => {
    if (e.target === overlay) closeEntry();
});

// ----- Carga dinamica de los formularios -----

async function loadForm(type) {
    modal.innerHTML = '';

    switch(type) {
        case 'user' :
            await import ('./user-form.js').then(m => m.renderUserForm(modal));
            break;
    
        case 'measurements' :
            await import ('./measurements-form.js').then(m => m.renderMeasurementsForm(modal));
            break;
        
        case 'strength' :
            await import ('./strength-form.js').then(m => m.renderStrengthForm(modal));
            break;

        case 'calisthenics' :
            await import ('./calisthenics-form.js').then(m => m.renderCalisthenicsForm(modal));
            break;
    }
} 