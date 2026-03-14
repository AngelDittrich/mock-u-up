document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index if needed, but keeping it simple for now
                // as CSS handles the transition duration.
                entry.target.classList.add('visible');

                // Stop observing once visible to keep the experience calm and stable
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.slide-in');
    elementsToAnimate.forEach(el => observer.observe(el));
});
