import { TextSliderUpper } from '../ui/textSlider.js';

/**
 * Initialize IntersectionObserver for animated elements
 */
export function initIntersectionObserver() {
  const headers = document.querySelectorAll('[data-animate]');
  if (!headers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const header = entry.target;
      const slider = new TextSliderUpper(header);
      const delay = parseInt(header.dataset.delay || 0, 10) || 0;
      
      setTimeout(() => slider.init(), delay);
      obs.unobserve(header);
    });
  }, { threshold: 0.6 });

  headers.forEach(h => observer.observe(h));
}

