// // Este archivo: Lee el formulario, guarda el perfil, carga el perfil al iniciar y siempre usa "id = 1" que soy yo.

// import { dbPromise } from "./db.js";

// const form = document.getElementById('userForm');

// const heightInput = document.getElementById('height_cm');
// const bodyTypeInput = document.getElementById('body_type');
// const goalInput = document.getElementById('goal');
// const startDateInput = document.getElementById('start_date');

// // Guardar el usuario.
// // form.addEventListener('submit', async (e) => {
// //     e.preventDefault();
// //     console.log('Submit disparado');

// //     const userData = {
// //         id: 1, 
// //         height_cm: Number(heightInput.value),
// //         body_type: bodyTypeInput.value,
// //         goal: goalInput.value,
// //         start_date: startDateInput.value 
// //     };

// //     const db = await dbPromise;
// //     await db.put('user', userData);

// //     console.log('¡Perfil guardado!', userData);
// // });

// // Cargar usuario.
// async function loadUser() {
//     const db = await dbPromise;
//     const user = await db.get('user', 1);

//     if (!user) return;

//     heightInput.value = user.height_cm ?? '';
//     bodyTypeInput.value = user.body_type ?? '';
//     goalInput.value = user.goal ?? '';
//     startDateInput.value = user.start_date ?? '';
// }

// loadUser();