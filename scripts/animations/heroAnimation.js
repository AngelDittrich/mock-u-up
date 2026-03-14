import { clamp, throttleRAF, isMobile } from '../utils/helpers.js';

/**
 * Hero animation - scales and moves based on scroll and mouse position
 */
export function initHeroAnimation() {
  const hero = document.querySelector(".hero");
  const sectionOne = document.querySelector("#section-one");
  
  if (!hero || !sectionOne) return;

  // Disable on mobile
  if (isMobile()) {
    hero.style.setProperty("--shiftX", "0px");
    hero.style.setProperty("--scale", "1");
    hero.style.setProperty("--ty", "0vh");
    return;
  }

  // Configuration
  const START_SCALE = 0.52;
  const END_SCALE = 1;
  const START_TY_VH = -106;
  const MAX_SHIFT_PCT = 0.12;

  // State
  let lastMouseX = window.innerWidth / 2;
  let followFactor = 1;
  let ticking = false;

  /**
   * Update hero CSS variables based on scroll and mouse position
   */
  function updateFromState() {
    const rect = sectionOne.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    // Calculate scroll progress
    let progress = 1 - rect.bottom / windowH;
    progress = clamp(progress, 0, 1);

    // Scale interpolation
    const scale = START_SCALE + (END_SCALE - START_SCALE) * progress;
    hero.style.setProperty("--scale", scale.toFixed(3));

    // TranslateY interpolation
    const tyVh = START_TY_VH + (10 - START_TY_VH) * progress;
    hero.style.setProperty("--ty", `${tyVh}vh`);

    // Follow factor decreases with progress
    followFactor = 1 - progress;

    // Calculate X offset from mouse position
    const mouseProgress = lastMouseX / window.innerWidth;
    const centered = (mouseProgress - 0.5) * 1.9;

    // Available width for movement
    const heroWidth = window.innerWidth * 0.95 * scale;
    const available = (window.innerWidth - heroWidth) / 2;

    // Apply X offset
    const offsetX = centered * available * followFactor;
    hero.style.setProperty("--shiftX", `${Math.round(offsetX)}px`);
  }

  // Throttled update function
  const requestUpdate = throttleRAF(updateFromState);

  // Mouse move handler
  window.addEventListener("mousemove", (e) => {
    lastMouseX = e.clientX;
    requestUpdate();
  }, { passive: true });

  // Scroll handler
  window.addEventListener("scroll", requestUpdate, { passive: true });

  // Resize handler
  window.addEventListener("resize", () => {
    lastMouseX = clamp(lastMouseX, 0, window.innerWidth);
    requestUpdate();
  });

  // Initial update
  requestUpdate();
}

