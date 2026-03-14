import { throttleRAF } from '../utils/helpers.js';

/**
 * Parallax effect for images with .parallax class
 */
export function initParallax() {
  const targets = document.querySelectorAll(".parallax img");
  if (!targets.length) return;

  // Performance optimization
  targets.forEach(el => {
    el.style.willChange = "transform";
  });

  // Configuration
  const SPEED_PX = 40;
  const ZOOM = 1.12;
  const OFFSET_Y = 0;

  /**
   * Update parallax transform for all targets
   */
  function update() {
    const vh = window.innerHeight;

    targets.forEach(el => {
      const rect = el.getBoundingClientRect();

      // Skip if completely outside viewport
      if (rect.bottom < 0 || rect.top > vh) return;

      // Calculate relative progress
      const center = rect.top + rect.height / 2;
      const delta = (center - vh / 2) / vh;

      // Apply transform with offset
      const translateY = -delta * SPEED_PX * 2 + OFFSET_Y;
      el.style.transform = `translateY(${translateY}px) scale(${ZOOM})`;
    });
  }

  // Throttled scroll and resize handlers
  const onScrollOrResize = throttleRAF(update);

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  
  // Initial render
  update();
}

