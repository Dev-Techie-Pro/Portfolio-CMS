export class Navbar {
  static selector = ".navbar";

  static applyActiveState(root = document) {
    const navbar = root.querySelector(this.selector);
    const utils = window.Portfolio?.UTILS;
    if (!navbar || !utils?.isNavLinkActive) return navbar;

    const selectors = window.Portfolio.ELEMENTS?.SELECTORS || {};
    const linkSelector = `${selectors.NAV_LINK || ".nav-link"}, ${selectors.MOBILE_NAV_LINK || ".mobile-nav-link"}`;
    const currentRoute = utils.resolveNavRouteFromLocation();

    navbar.querySelectorAll(linkSelector).forEach((link) => {
      const href = link.getAttribute("href") || "";
      const active = utils.isNavLinkActive(href, currentRoute);
      link.classList.toggle("active", active);
      if (active) link.style.removeProperty("color");
    });

    return navbar;
  }

  static mount(root = document) {
    const navbar = root.querySelector(this.selector);
    if (!navbar) return null;

    const utils = window.Portfolio?.UTILS;
    if (!utils?.isNavLinkActive) return null;

    this.applyActiveState(root);

    if (navbar.dataset.componentReady === "true") return navbar;

    const update = () =>
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    window.addEventListener("scroll", update, { passive: true });
    update();

    navbar.dataset.componentReady = "true";
    return navbar;
  }
}
