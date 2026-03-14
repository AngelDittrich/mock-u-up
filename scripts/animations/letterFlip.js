import { throttleRAF } from '../utils/helpers.js';

/**
 * Letter flip effect for stack section
 */
export function initLetterFlip() {
  const letters = document.querySelectorAll(".letter");
  if (!letters.length) return;

  const windowHeight = window.innerHeight;
  const start = windowHeight * 0.7;
  const end = windowHeight * 0.45;

  function update() {
    letters.forEach((letter, i) => {
      const rect = letter.getBoundingClientRect();
      const front = letter.querySelector(".first-letter");
      const back = letter.querySelector(".absolute-letter");

      if (!front || !back) return;

      // Offset: each letter starts slightly before or after
      const offset = (i % 2 === 0 ? -100 : 100) + i * 10;

      // Calculate progress
      let progress = (start - (rect.top + offset)) / (start - end);
      progress = Math.min(Math.max(progress, 0), 1);

      // Apply transforms
      front.style.transform = `translateY(${progress * 100}%)`;
      back.style.transform = `translateY(${(1 - progress) * -100}%)`;
    });
  }

  // Throttled scroll handler
  const onScroll = throttleRAF(update);
  window.addEventListener("scroll", onScroll, { passive: true });
  
  // Initial update
  update();
}

