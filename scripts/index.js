/**
 * Main entry point for all scripts
 * Initializes all modules when DOM is ready
 */

// UI Components
import { initMenu } from './ui/menu.js';
import { initTechIcons } from './ui/techIcons.js';
import { initVideoHover } from './ui/videoHover.js';

// Animations
import { initParallax } from './animations/parallax.js';
import { initLetterFlip } from './animations/letterFlip.js';
import { initHeroAnimation } from './animations/heroAnimation.js';
import { initWordShift } from './animations/wordShift.js';
import { initSmoothScroll } from './animations/smoothScroll.js';

// Utils
import { initIntersectionObserver } from './utils/intersectionObserver.js';
import { initInfiniteColumns } from './animations/infiniteColumns.js';

/**
 * Initialize all modules
 */
function init() {
  // UI Components
  initMenu();
  initTechIcons();
  initVideoHover();

  // Animations
  initParallax();
  initLetterFlip();
  initHeroAnimation();
  // initSmoothScroll();
  initInfiniteColumns();

  // Utils
  initIntersectionObserver();

  // GSAP animations (wait for GSAP to load)
  if (typeof gsap !== 'undefined') {
    initWordShift();
  } else {
    // Wait for GSAP to load from CDN
    window.addEventListener('load', () => {
      if (typeof gsap !== 'undefined') {
        initWordShift();
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded
  init();
}
