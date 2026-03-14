/* ---------------- TextSliderUpper (sin cambios funcionales) ---------------- */
class TextSliderUpper {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.delay = 40; // ms entre "letras"
    this._wrapContent();
  }

  _wrapContent() {
    // Simple wrapping por caracteres (maneja palabras y espacios)
    const text = this.wrapper.textContent.trim();
    let delay = 0;
    const out = text.split(' ').map(word => {
      const chars = Array.from(word).map(ch => {
        delay += this.delay;
        return `<span style="animation-delay:${delay}ms">${ch}</span>`;
      }).join('');
      return `<span class="word-wrap">${chars}</span>`;
    }).join(' ');
    this.wrapper.innerHTML = out;
  }

  init() {
    this.wrapper.classList.add('show');
  }
}

/* ================= Botón de Menu y Drop down menu================= */
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("menuDropdown");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  dropdown.classList.toggle("active");
});

/* ---------------- DOM ready -> inicializaciones ---------------- */
document.addEventListener("DOMContentLoaded", () => {

  /* ====== 1) Texto animado (IntersectionObserver + TextSliderUpper) ====== */
  const headers = document.querySelectorAll('[data-animate]');
  if (headers.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const header = entry.target;
        // Crea y lanza
        const slider = new TextSliderUpper(header);
        const delay = parseInt(header.dataset.delay || 0, 10) || 0;
        setTimeout(() => slider.init(), delay);
        obs.unobserve(header);
      });
    }, { threshold: 0.6 }); // se activa cuando ~60% es visible

    headers.forEach(h => observer.observe(h));
  }

  /* ================= 2) Parallax JS (robusto) ================= */
  (() => {
    // SOLO seleccionamos las imágenes con la clase parallax-effect
    const targets = document.querySelectorAll(".parallax img");
    if (!targets.length) return;

    // Sugerencias de rendimiento (sin modificar tu CSS base)
    targets.forEach(el => { el.style.willChange = "transform"; });

    // Ajustes del efecto
    const SPEED_PX = 40;   // cuánto se mueve (ajústalo a gusto)
    const ZOOM = 1.12;     // leve zoom para cubrir bordes (1 = desactiva el zoom)
    const OFFSET_Y = -0;  // offset inicial para mover la imagen hacia arriba (ajusta según necesites)

    function update() {
      const vh = window.innerHeight;

      targets.forEach(el => {
        const rect = el.getBoundingClientRect();

        // Si está completamente fuera del viewport, no hacemos nada
        if (rect.bottom < 0 || rect.top > vh) return;

        // Progreso relativo: negativo arriba, positivo abajo
        const center = rect.top + rect.height / 2;
        const delta = (center - vh / 2) / vh;   // entre -0.5 .. 0.5 aprox

        // Convertimos delta en movimiento y añadimos el offset inicial
        const translateY = -delta * SPEED_PX * 2 + OFFSET_Y;

        // Aplicamos translateY + scale SIN tocar tus estilos base
        el.style.transform = `translateY(${translateY}px) scale(${ZOOM})`;
      });
    }

    // rAF para scroll suave
    let ticking = false;
    function onScrollOrResize() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    update(); // primer render
  })();

}); // end DOMContentLoaded

/* ================= 3) Efecto letras "flip" al hacer scroll ================= */

window.addEventListener("scroll", () => {
  const letters = document.querySelectorAll(".letter");
  const windowHeight = window.innerHeight;

  letters.forEach((letter, i) => {
    const rect = letter.getBoundingClientRect();
    const front = letter.querySelector(".first-letter");
    const back = letter.querySelector(".absolute-letter");

    // rango base
    const start = windowHeight * 0.7;
    const end = windowHeight * 0.45;

    // offset: cada letra empieza un poco antes o después
    const offset = (i % 2 === 0 ? -100 : 100) + i * 10;
    // ej: letras pares empiezan antes, impares después

    // aplicar offset
    let progress = (start - (rect.top + offset)) / (start - end);
    progress = Math.min(Math.max(progress, 0), 1);

    front.style.transform = `translateY(${progress * 100}%)`;
    back.style.transform = `translateY(${(1 - progress) * -100}%)`;
  });
});

/* ================= 4) Efecto hover en iconos de tecnologías ================= */
const techIcons = document.querySelectorAll(".tech-icon");
const highlight = document.querySelector(".highlight");
const grid = document.querySelector(".skills-grid.desktop");

techIcons.forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    // Safety check: if grid is hidden (mobile), do nothing
    if (window.getComputedStyle(grid).display === 'none') return;

    // Quitar active de todos
    techIcons.forEach(i => i.classList.remove("active"));
    icon.classList.add("active");

    // Rectángulos
    const iconRect = icon.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();

    // Calculamos posición relativa al grid
    const left = iconRect.left - gridRect.left;
    const top = iconRect.top - gridRect.top;

    highlight.style.width = `${iconRect.width}px`;
    highlight.style.height = `${iconRect.height}px`;
    highlight.style.transform = `translate(${left}px, ${top}px)`;
  });
});

// ------------------ ANIMACION PARA EL HERO QUE SE MUEVE AL SCROLLEAR Y AL CURSOR EN EL EJE X ---------------

(function () {
  const hero = document.querySelector(".hero");
  const sectionOne = document.querySelector("#section-one");
  if (!hero || !sectionOne) return;

  // Si es móvil (<490px), desactivar animación
  const isMobile = window.matchMedia("(max-width: 490px)").matches;
  if (isMobile) {
    // Fijar valores iniciales y salir
    hero.style.setProperty("--shiftX", "0px");
    hero.style.setProperty("--scale", "1");
    hero.style.setProperty("--ty", "0vh");
    return;
  }

  // parámetros ajustables
  const START_SCALE = 0.52;
  const END_SCALE = 1;
  const START_TY_VH = -106; // -130vh
  const MAX_SHIFT_PCT = 0.12; // máximo desplazamiento X relativo al ancho (12%)

  // estado
  let lastMouseX = window.innerWidth / 2;
  let followFactor = 1; // 1 = sigue completo, 0 = no sigue
  let ticking = false;

  // clamp helper
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // actualiza variables CSS (llamado en rAF desde eventos)
  function updateFromState() {
    // progress: 0 → 1 ; 0 = sectionOne fully visible (top), 1 = sectionOne scrolled past
    const rect = sectionOne.getBoundingClientRect();
    const windowH = window.innerHeight;
    let progress = 1 - rect.bottom / windowH;
    progress = clamp(progress, 0, 1);

    // escala: START_SCALE → END_SCALE
    const scale = START_SCALE + (END_SCALE - START_SCALE) * progress;
    hero.style.setProperty("--scale", scale.toFixed(3));

    // translateY en vh: -130vh → 0vh
    const tyVh = START_TY_VH + (10 - START_TY_VH) * progress; // -130 + 130*progress
    hero.style.setProperty("--ty", `${tyVh}vh`);

    // follow factor disminuye con progress (cuando progress = 1, follow = 0)
    followFactor = 1 - progress;

    // compute X offset from lastMouseX
    const mouseProgress = lastMouseX / window.innerWidth; // 0..1
    const centered = (mouseProgress - 0.5) * 1.9; // -1 .. 1

    // ancho disponible para que el hero se mueva sin salirse
    const heroWidth = window.innerWidth * 0.95 * scale; // 95vw * escala actual
    const available = (window.innerWidth - heroWidth) / 2;

    // desplazamiento: llega hasta los bordes según tamaño actual
    const offsetX = centered * available * followFactor;

    hero.style.setProperty("--shiftX", `${Math.round(offsetX)}px`);

  }

  // rAF-safed redraw to avoid heavy work on continuous events
  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateFromState();
        ticking = false;
      });
    }
  }

  // mousemove: actualiza lastMouseX y requestUpdate
  window.addEventListener("mousemove", (e) => {
    lastMouseX = e.clientX;
    requestUpdate();
  }, { passive: true });

  // scroll: requestUpdate (throttled via rAF)
  window.addEventListener("scroll", () => requestUpdate(), { passive: true });

  // resize: recalcula (y mantiene mouse dentro de bounds)
  window.addEventListener("resize", () => {
    lastMouseX = clamp(lastMouseX, 0, window.innerWidth);
    requestUpdate();
  });

  // inicializa estado al cargar
  requestUpdate();
})();

/* ================= 5) Video hover en service-media ================= */
document.addEventListener("DOMContentLoaded", () => {
  const serviceMediaElements = document.querySelectorAll(".service-media");

  serviceMediaElements.forEach(container => {
    const video = container.querySelector("video");
    if (!video) return;

    // Preload del video para mejor rendimiento
    video.preload = "auto";

    container.addEventListener("mouseenter", () => {
      video.currentTime = 0; // Reinicia el video al inicio
      video.play().catch(err => {
        // Maneja errores de reproducción silenciosamente
        console.log("Error al reproducir video:", err);
      });
    });

    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0; // Reinicia al salir
    });
  });
});

