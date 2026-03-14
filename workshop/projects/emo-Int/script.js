document.addEventListener('DOMContentLoaded', () => {
    // Basic Intersection Observer for .slide-in elements (Sections, Headers)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.slide-in');
    elementsToAnimate.forEach(el => sectionObserver.observe(el));


    // Advanced Observer for the Story Sequence (.slide-up elements)
    // We want them to fade in sequentially as the user reaches the Application Case section
    const storyOptions = {
        root: null,
        rootMargin: '0px -10%', // Trigger slightly earlier
        threshold: 0.3
    };

    const storyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all steps within this visible container
                const steps = entry.target.querySelectorAll('.slide-up');

                steps.forEach((step, index) => {
                    // Add dynamic inline delay so they stagger in naturally
                    // (Overriding CSS classes delay-1, delay-2 to ensure robustness)
                    step.style.transitionDelay = `${index * 0.25}s`;

                    // Force reflow
                    void step.offsetWidth;

                    step.classList.add('visible');
                });

                // Unobserve the parent container
                observer.unobserve(entry.target);
            }
        });
    }, storyOptions);

    // Observe the story sequence container
    const storySequences = document.querySelectorAll('.story-sequence');
    storySequences.forEach(seq => storyObserver.observe(seq));

    // Optional: Add simple parallax to the glob for an extra emotional, interactive feel
    const glob = document.querySelector('.background-glob');
    if (glob) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Move gently opposite to cursor
            glob.style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }
});
