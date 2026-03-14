/**
 * Video hover effect for service media elements
 */
export function initVideoHover() {
  const serviceMediaElements = document.querySelectorAll(".service-media");

  serviceMediaElements.forEach(container => {
    const video = container.querySelector("video");
    if (!video) return;

    // Preload video for better performance
    video.preload = "auto";

    container.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play().catch(err => {
        // Silently handle playback errors
        console.warn("Error playing video:", err);
      });
    });

    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

