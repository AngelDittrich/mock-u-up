import { throttle, isTouchDevice, isiPad } from '../utils/helpers.js';

/**
 * Tech icons hover effect - Highlights icons on hover
 * Optimized for touch devices (iPad, tablets) to prevent jittery behavior
 * Uses fixed sizes captured at initialization to prevent layout shifts
 */
export function initTechIcons() {
  const techIcons = document.querySelectorAll(".tech-icon");
  const highlight = document.querySelector(".highlight");
  const grid = document.querySelector(".skills-grid.desktop");

  if (!techIcons.length || !highlight || !grid) return;

  // Safety check: if grid is hidden (mobile), do nothing
  if (window.getComputedStyle(grid).display === 'none') return;

  // Detect if device is touch-based (iPad, tablet)
  const isTouch = isTouchDevice() || isiPad();
  
  // DISABLE effect on iPad/tablet to prevent layout issues
  // The hover effect causes layout shifts on touch devices
  if (isTouch) {
    // Simply return without initializing the effect
    // This prevents all hover-related issues on iPad
    return;
  }
  
  // Desktop: 16ms (60fps) for smooth experience
  const throttleDelay = 16;
  
  // Store fixed sizes for each icon to prevent layout shifts
  const iconSizes = new Map();
  let gridRect = null;
  
  /**
   * Capture initial sizes of all icons - called once at initialization
   * This prevents layout shifts when highlight changes size
   */
  function captureIconSizes() {
    // Wait for layout to be stable
    requestAnimationFrame(() => {
      gridRect = grid.getBoundingClientRect();
      
      techIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        // Store fixed size and position relative to grid
        iconSizes.set(icon, {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left - gridRect.left),
          top: Math.round(rect.top - gridRect.top)
        });
      });
    });
  }
  
  // Capture sizes on initialization and after resize
  captureIconSizes();
  window.addEventListener('resize', () => {
    // Re-capture on resize to handle orientation changes
    setTimeout(captureIconSizes, 100);
  }, { passive: true });
  
  let lastIcon = null;
  let isUpdating = false;

  /**
   * Update highlight position and size using pre-captured fixed values
   * @param {HTMLElement} icon - Icon element to highlight
   */
  function updateHighlight(icon) {
    // Prevent concurrent updates
    if (isUpdating) return;

    // Skip if same icon (prevents unnecessary recalculations)
    if (icon === lastIcon) return;
    
    // Get fixed size from map (fallback to current size if not captured yet)
    const fixedSize = iconSizes.get(icon);
    if (!fixedSize) {
      // If size not captured yet, capture it now
      const rect = icon.getBoundingClientRect();
      if (!gridRect) gridRect = grid.getBoundingClientRect();
      iconSizes.set(icon, {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left - gridRect.left),
        top: Math.round(rect.top - gridRect.top)
      });
      return updateHighlight(icon);
    }

    isUpdating = true;

    // Remove active from all icons
    techIcons.forEach(i => i.classList.remove("active"));
    icon.classList.add("active");

    // Use requestAnimationFrame to ensure stable updates
    requestAnimationFrame(() => {
      try {
        // Use pre-captured fixed values to prevent layout shifts
        highlight.style.width = `${fixedSize.width}px`;
        highlight.style.height = `${fixedSize.height}px`;
        highlight.style.transform = `translate(${fixedSize.left}px, ${fixedSize.top}px)`;
        
        lastIcon = icon;
      } catch (error) {
        console.warn('Error updating tech icon highlight:', error);
      } finally {
        isUpdating = false;
      }
    });
  }

  // Throttled update function with appropriate delay for device type
  const throttledUpdate = throttle(updateHighlight, throttleDelay);

  techIcons.forEach(icon => {
    // Use both mouseenter and touchstart for better touch support
    const handleEnter = (e) => {
      // Prevent default on touch to avoid conflicts
      if (e.type === 'touchstart') {
        e.preventDefault();
      }
      throttledUpdate(icon);
    };

    icon.addEventListener("mouseenter", handleEnter, { passive: true });
    
    // Add touch support for better iPad/tablet experience
    if (isTouch) {
      icon.addEventListener("touchstart", handleEnter, { passive: false });
    }

    // Reset on mouseleave/touchend
    const handleLeave = () => {
      // Small delay to allow smooth transitions
      setTimeout(() => {
        if (!icon.matches(':hover') && !icon.matches(':active')) {
          lastIcon = null;
        }
      }, 100);
    };

    icon.addEventListener("mouseleave", handleLeave, { passive: true });
    
    if (isTouch) {
      icon.addEventListener("touchend", handleLeave, { passive: true });
    }
  });
}

