/**
 * Scroll-driven infinite columns for the workshop page
 * Moves columns based on mouse/touch scroll events (wheel)
 */
export function initInfiniteColumns() {
    // Only run on workshop page
    const container = document.querySelector('.workshop-container');
    if (!container) return;

    const columns = Array.from(document.querySelectorAll('.workshop-column'));
    if (!columns.length) return;

    // Check if columns have content before proceeding
    const hasContent = columns.some(col => col.children.length > 0);
    if (!hasContent) {
        console.warn('Workshop columns have no content, skipping infinite scroll');
        return;
    }

    console.log('Initializing infinite columns...');

    // Configs: Speed multipliers
    const configs = [
        { el: columns[0], speed: 1.2, y: 0 },
        { el: columns[1], speed: -0.9, y: 0 },
        { el: columns[2], speed: 1.0, y: 0 }
    ];

    // Store original children before cloning
    const originalChildren = columns.map(col => Array.from(col.children));

    // 1. Clone content for infinite loop
    columns.forEach((col, index) => {
        const children = originalChildren[index];

        console.log(`Column ${index} has ${children.length} original children`);

        // Create 3 additional copies (total 4 sets)
        for (let i = 0; i < 3; i++) {
            children.forEach(child => {
                const clone = child.cloneNode(true);
                col.appendChild(clone);
            });
        }

        console.log(`Column ${index} now has ${col.children.length} total children`);
    });

    // Use setTimeout to ensure DOM has fully updated
    setTimeout(() => {
        // Initialize positions after cloning
        configs.forEach((config, index) => {
            const col = config.el;

            // Get actual height after cloning
            config.totalHeight = col.scrollHeight;
            config.singleHeight = config.totalHeight / 4;

            console.log(`Column ${index}: totalHeight=${config.totalHeight}, singleHeight=${config.singleHeight}`);

            // Start at position 0 (visible content)
            config.y = 0;
            col.style.transform = `translate3d(0, 0px, 0)`;
        });

        // 2. Scroll Interaction
        let targetScroll = 0;
        let currentScroll = 0;

        // Touch support for iPad/Safari
        let touchStartY = 0;
        let touchLastY = 0;
        let isTouching = false;

        // Add wheel listener for "virtual" scroll (desktop)
        window.addEventListener('wheel', (e) => {
            // Only capture scroll when over the workshop container
            if (container.contains(e.target) || e.target === container) {
                targetScroll += e.deltaY;
            }
        }, { passive: true });

        // Add touch listeners for mobile/iPad
        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchLastY = touchStartY;
            isTouching = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isTouching) return;

            const touchCurrentY = e.touches[0].clientY;
            const deltaY = touchLastY - touchCurrentY;

            // Apply delta to scroll (multiply for better feel)
            targetScroll += deltaY * 2;

            touchLastY = touchCurrentY;
        }, { passive: true });

        container.addEventListener('touchend', () => {
            isTouching = false;
        }, { passive: true });

        // Animation Loop
        function tick() {
            // Smooth lerp for Apple-like feel
            currentScroll += (targetScroll - currentScroll) * 0.08;

            const isMobile = window.innerWidth <= 768;

            configs.forEach((config, i) => {
                if (isMobile && i !== 0) return;

                const singleH = config.singleHeight;

                if (singleH === 0) return; // Skip if height is 0

                // Calculate movement
                const move = currentScroll * config.speed;

                // Wrap using modulo to create infinite loop
                // Normalize move to always be positive for modulo
                const normalizedMove = ((move % singleH) + singleH) % singleH;

                // Apply transform (moving up means negative Y)
                const newY = -normalizedMove;

                config.el.style.transform = `translate3d(0, ${newY}px, 0)`;
            });

            requestAnimationFrame(tick);
        }

        console.log('Starting animation loop...');
        requestAnimationFrame(tick);
    }, 100); // Small delay to ensure DOM is ready
}
