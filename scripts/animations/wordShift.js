/**
 * Word shift animation using GSAP ScrollTrigger
 * Requires GSAP and ScrollTrigger to be loaded
 */
export function initWordShift() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Word shift animation disabled.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Shift values for each word class
  const SHIFT = {
    word0: "0em",
    word1: "-0.8em",
    word2: "1.6em",
    word3: "-2.4em"
  };

  const elements = document.querySelectorAll("#section-two .animated-text span");
  
  elements.forEach((el) => {
    el.style.display = "inline-block";

    const wordClass = [...el.classList].find(c => /^word[0-3]$/.test(c));
    if (!wordClass) return;

    gsap.fromTo(
      el,
      { x: "0em" },
      {
        x: SHIFT[wordClass],
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 65%",
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );
  });
}

