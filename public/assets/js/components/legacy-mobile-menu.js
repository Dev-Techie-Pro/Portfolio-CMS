export class LegacyMobileMenu {
  static selector = ".mobile-menu";

  static mount(root = document) {
    const menu = root.querySelector(this.selector);
    if (!menu || menu.dataset.componentReady === "true") return menu;

    const SELECTORS = window.Portfolio?.ELEMENTS?.SELECTORS || {};
    const toggle = root.querySelector(SELECTORS.HAMBURGER || ".hamburger");
    if (!toggle) return menu;

    const setOpen = (open) => {
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () =>
      setOpen(!menu.classList.contains("open")),
    );
    menu.addEventListener("click", (event) => {
      if (event.target.closest(".mobile-nav-link")) setOpen(false);
    });

    menu.dataset.componentReady = "true";
    return menu;
  }
}
