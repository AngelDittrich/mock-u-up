
// ============================================================================
// 🔔 NOTIFICATIONS MANAGER
// ============================================================================

export function initNotifications() {
    const btnEnable = document.getElementById('btn-enable-notifications');
    const btnTest = document.getElementById('btn-test-notification');
    const statusText = document.getElementById('notification-status');

    if (!btnEnable || !statusText) return;

    // Check support
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        statusText.textContent = "Your device does not support notifications.";
        statusText.className = "trend down"; // red
        btnEnable.disabled = true;
        return;
    }

    // Check current permission
    updateUI(Notification.permission);

    // Event Listeners
    btnEnable.addEventListener('click', async () => {
        try {
            const permission = await Notification.requestPermission();
            updateUI(permission);
            if (permission === 'granted') {
                sendLocalNotification("¡Notificaciones Activadas!", "Ahora recibirás alertas de tus entrenamientos.");
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    });

    if (btnTest) {
        btnTest.addEventListener('click', () => {
            sendLocalNotification("Prueba de Sistema", "Si ves esto, las notificaciones funcionan correctamente. 🚀");
        });
    }
}

function updateUI(permission) {
    const btnEnable = document.getElementById('btn-enable-notifications');
    const btnTest = document.getElementById('btn-test-notification');
    const statusText = document.getElementById('notification-status');
    const panel = document.getElementById('notification-panel');

    switch (permission) {
        case 'granted':
            statusText.textContent = "Notificaciones Activas";
            statusText.className = "trend up"; // green
            btnEnable.style.display = 'none';
            if (btnTest) btnTest.style.display = 'inline-block';
            if (panel) panel.classList.add('active-permission');
            break;
        case 'denied':
            statusText.textContent = "Notificaciones Bloqueadas";
            statusText.className = "trend down"; // red
            btnEnable.textContent = "Habilitar en Ajustes";
            btnEnable.disabled = true;
            if (btnTest) btnTest.style.display = 'none';
            break;
        default: // 'default'
            statusText.textContent = "No Habilitadas";
            statusText.className = "trend"; // gray
            btnEnable.style.display = 'inline-block';
            if (btnTest) btnTest.style.display = 'none';
            break;
    }
}

export async function sendLocalNotification(title, body) {
    if (Notification.permission === 'granted') {
        const reg = await navigator.serviceWorker.ready;
        try {
            await reg.showNotification(title, {
                body: body,
                icon: './css/assets/logo-pwa.png',
                badge: './css/assets/logo-pwa-maskable.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                tag: 'gym-notification'
            });
        } catch (e) {
            console.error("Notification failed:", e);
            // Fallback for non-SW context (desktop standard)
            new Notification(title, { body, icon: './css/assets/logo-pwa.png' });
        }
    }
}

// Auto-init if module loaded
document.addEventListener('DOMContentLoaded', initNotifications);
