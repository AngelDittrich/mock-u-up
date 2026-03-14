/**
 * Menu functionality - Toggle mobile menu
 */
export function initMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const dropdown = document.getElementById("menuDropdown");

  if (!menuBtn || !dropdown) return;

  menuBtn.addEventListener("click", () => {
    const isActive = menuBtn.classList.toggle("active");
    dropdown.classList.toggle("active");
    
    // Update aria-expanded for accessibility
    menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
  });
}

