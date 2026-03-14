/**
 * Utility helper functions
 */

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Throttle function calls using requestAnimationFrame
 * @param {Function} callback - Function to throttle
 * @returns {Function} Throttled function
 */
export function throttleRAF(callback) {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback.apply(this, args);
        ticking = false;
      });
    }
  };
}

/**
 * Throttle function calls with custom delay
 * @param {Function} callback - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(callback, delay = 16) {
  let lastCall = 0;
  let timeoutId = null;
  
  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    } else {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Schedule next call
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        callback.apply(this, args);
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Normalize wheel event deltaY based on deltaMode
 * @param {WheelEvent} event - Wheel event
 * @returns {number} Normalized delta
 */
export function normalizeDeltaY(event) {
  let delta = event.deltaY;
  if (event.deltaMode === 1) {
    // Line mode: approximate 1 line ≈ 16px
    delta *= 16;
  } else if (event.deltaMode === 2) {
    // Page mode: use viewport height
    delta *= window.innerHeight;
  }
  return delta;
}

/**
 * Check if device is mobile based on viewport width
 * @param {number} breakpoint - Breakpoint in pixels (default: 490)
 * @returns {boolean} True if mobile
 */
export function isMobile(breakpoint = 490) {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}

/**
 * Check if device is a touch device (tablet, iPad, etc.)
 * @returns {boolean} True if touch device
 */
export function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Check if device is iPad specifically
 * @returns {boolean} True if iPad
 */
export function isiPad() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Debounce function calls
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(callback, delay = 100) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
}

