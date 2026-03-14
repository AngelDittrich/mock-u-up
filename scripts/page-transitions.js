/**
 * Page Transitions Script
 * Handles smooth transitions between pages.
 */

(function () {
    // CONFIGURATION
    const TRANSITION_DURATION = 400; // ms, match with CSS

    // 1. ENTER ANIMATION
    // Immediately add the 'start' class to body to ensure it starts hidden/translated
    // This script must be loaded in <head> or very early to avoid FOUC.
    // Ideally, CSS starts 'body' with opacity 0, but we want to avoid 
    // users without JS seeing nothing. So we add the class via JS.

    // However, if we add it here, the body might already be parsing.
    // Let's check if we can add it immediately.
    document.body.classList.add('page-transition-enter-start');

    window.addEventListener('load', () => {
        // Wait a frame to ensure the class is applied and style re-calc
        requestAnimationFrame(() => {
            // Remove the class to trigger the transition to default state (opacity 1, transform none)
            document.body.classList.remove('page-transition-enter-start');
        });
    });

    // Handle back/forward cache (bfcache) in some browsers
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-transition-enter-start');
            document.body.classList.remove('page-transition-out');
        }
    });

    // 2. EXIT ANIMATION
    document.addEventListener('DOMContentLoaded', () => {
        const anchors = document.querySelectorAll('a');

        anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetUrl = anchor.href;
                const targetTarget = anchor.target;

                // Ignore clicks if:
                // 1. Modifier keys (ctrl, shift, etc.)
                // 2. Target is _blank
                // 3. Anchor is local hash link (#section)
                // 4. Anchor is mailto/tel
                if (
                    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
                    targetTarget === '_blank' ||
                    targetUrl.includes('#') ||
                    targetUrl.startsWith('mailto:') ||
                    targetUrl.startsWith('tel:') ||
                    targetUrl === window.location.href
                ) {
                    return; // Let default behavior happen
                }

                // Check if it's same origin
                if (anchor.hostname !== window.location.hostname) {
                    return; // External links - optional: animate them too? let's stick to internal for now.
                }

                e.preventDefault();

                // Apply exit class
                document.body.classList.add('page-transition-out');

                // Wait for animation then navigate
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, TRANSITION_DURATION);
            });
        });
    });

})();
