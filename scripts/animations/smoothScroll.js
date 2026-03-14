import { normalizeDeltaY, clamp } from '../utils/helpers.js';

/**
 * Smooth scroll with momentum (ice-like scroll effect)
 * Provides smooth, physics-based scrolling
 */
export function initSmoothScroll() {
  // Configuration
  const WHEEL_SCALE = 1 / 40;
  const IMMEDIATE_SCROLL = 0.16;
  const MAX_VEL = 1.2;
  const FRICTION = 0.003;
  const STOP_THRESHOLD = 0.02;

  // State
  let pos = window.scrollY;
  let vel = 0;
  let anim = false;
  let lastTime = performance.now();

  /**
   * Animation loop
   */
  function loop(now) {
    const dt = Math.max(1, now - lastTime);
    lastTime = now;

    // Integrate position
    pos += vel * dt;

    // Apply boundaries
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (pos <= 0) {
      pos = 0;
      vel = 0;
    }
    if (pos >= maxScroll) {
      pos = maxScroll;
      vel = 0;
    }

    // Apply position
    window.scrollTo(0, Math.round(pos));

    // Apply friction
    vel *= Math.exp(-FRICTION * dt);

    // Continue or stop animation
    if (Math.abs(vel) > STOP_THRESHOLD) {
      requestAnimationFrame(loop);
    } else {
      anim = false;
      vel = 0;
    }
  }

  /**
   * Wheel event handler
   */
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const now = performance.now();
    lastTime = now;
    const delta = normalizeDeltaY(e);

    // Sync virtual position with real scroll
    pos = window.scrollY;

    // Immediate response
    pos += delta * IMMEDIATE_SCROLL;

    // Add momentum
    vel += delta * WHEEL_SCALE;
    vel = clamp(vel, -MAX_VEL, MAX_VEL);

    // Apply immediate movement
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    pos = clamp(pos, 0, maxScroll);
    window.scrollTo(0, Math.round(pos));

    // Start animation loop if not running
    if (!anim) {
      anim = true;
      requestAnimationFrame(loop);
    }
  }, { passive: false });

  // Sync position when using other scroll methods (keyboard, links)
  window.addEventListener('scroll', () => {
    if (!anim) pos = window.scrollY;
  }, { passive: true });
}

