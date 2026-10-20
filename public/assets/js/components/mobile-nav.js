export class MobileNav {
  static selector = ".mobile-nav-wrapper";
  static hostSelector = "[data-mobile-nav-root], #mobile-nav-root";

  static ITEMS = [
    { where: "home", label: "Home", href: "/", icon: "siHome" },
    { where: "about", label: "About", href: "/about", icon: "siUser" },
    { where: "skills", label: "Skills", href: "/skills", icon: "siGrowth" },
    {
      where: "expertise",
      label: "Expertise",
      href: "/experience",
      icon: "siHome",
    },
    {
      where: "projects",
      label: "Projects",
      href: "/projects",
      icon: "siApps",
    },
    {
      where: "reviews",
      label: "Reviews",
      href: "/testimonials",
      icon: "siReview",
    },
    {
      where: "contatc",
      label: "Contact",
      href: "/contact",
      icon: "siPhone",
    },
  ];

  static ROUTE_TO_WHERE = {
    home: "home",
    about: "about",
    skills: "skills",
    experience: "expertise",
    expertise: "expertise",
    projects: "projects",
    "project-details": "projects",
    blogs: "home",
    "blog-details": "home",
    testimonials: "reviews",
    reviews: "reviews",
    contact: "contatc",
    contatc: "contatc",
  };

  static markup() {
    const items = Array.isArray(this.ITEMS) ? this.ITEMS : [];
    if (!items.length) {
      console.error(
        "[Portfolio.MobileNav] ITEMS is empty; markup not generated.",
      );
      return "";
    }

    const list = items
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        const where = this.#escapeAttr(item.where);
        const label = this.#escapeAttr(item.label);
        const href = this.#escapeAttr(item.href);
        const icon = this.#escapeAttr(item.icon);
        const text = this.#escapeText(item.label);
        if (!where || !href) {
          console.warn(
            "[Portfolio.MobileNav] Skipping malformed nav item.",
            item,
          );
          return "";
        }
        return `
          <li data-where="${where}" data-label="${label}">
            <a href="${href}">
              <span class="icon icon-wrap" data-icon="${icon}"></span>
              <span class="nav-label">${text}</span>
            </a>
          </li>`;
      })
      .join("");

    if (!list.trim()) {
      console.error("[Portfolio.MobileNav] No valid items to render.");
      return "";
    }

    return `
      <nav class="mobile-nav-wrapper">
        <div class="tabbar" id="tabbar">
          <ul class="mobile-nav-list">${list}
          </ul>
        </div>
      </nav>`;
  }

  static mount(root = document) {
    if (!root) {
      console.warn(
        "[Portfolio.MobileNav] Cannot mount: root document is missing.",
      );
      return null;
    }

    const body = root.body;
    const host = root.querySelector?.(this.hostSelector);

    if (!body && !host) {
      console.warn(
        "[Portfolio.MobileNav] Cannot mount: missing body and #mobile-nav-root / [data-mobile-nav-root].",
      );
      return null;
    }

    let element = root.querySelector(this.selector);

    if (!element) {
      const html = this.markup();
      if (!html) return null;

      try {
        if (host) {
          host.insertAdjacentHTML("beforeend", html);
        } else {
          body.insertAdjacentHTML("afterbegin", html);
        }
      } catch (error) {
        console.error("[Portfolio.MobileNav] Failed to inject markup.", error);
        return null;
      }

      element = root.querySelector(this.selector);
    }

    if (!element) {
      console.error(
        "[Portfolio.MobileNav] Markup inserted but .mobile-nav-wrapper was not found.",
      );
      return null;
    }

    if (element.dataset.componentReady === "true") {
      this.applyActiveState(element);
      return element;
    }

    this.applyActiveState(element);
    this.#ensureIcons(element);
    element.dataset.componentReady = "true";
    return element;
  }

  static resolveActiveWhere(locationLike = window.location) {
    const stem = this.parseFileStem(locationLike);
    const routes = window.Portfolio?.CONSTANTS?.PAGE_ROUTES;
    let route = stem;

    if (routes && typeof routes === "object") {
      if (Object.prototype.hasOwnProperty.call(routes, stem)) {
        route = routes[stem];
      } else if (
        stem === "index" &&
        Object.prototype.hasOwnProperty.call(routes, "")
      ) {
        route = routes[""];
      }
    }

    if (!route || route === "index") route = "home";

    const mapped = this.ROUTE_TO_WHERE[route];
    return mapped || route;
  }

  static parseFileStem(locationLike = window.location) {
    let path = "";
    try {
      path = String(locationLike?.pathname ?? "");
    } catch {
      path = "";
    }

    try {
      path = decodeURIComponent(path);
    } catch {}

    path = path.split("?")[0].split("#")[0];
    path = path.replace(/\\/g, "/").replace(/\/+$/, "");
    let file = path.split("/").pop() || "";
    file = file.trim();

    if (!file || file === "." || file === "..") return "index";

    file = file.replace(/\.html?$/i, "");
    return (file || "index").toLowerCase();
  }

  static applyActiveState(wrapper) {
    if (!(wrapper instanceof Element)) return;

    const list = wrapper.querySelector(".mobile-nav-list");
    if (!list) {
      console.warn(
        "[Portfolio.MobileNav] .mobile-nav-list missing; active state skipped.",
      );
      return;
    }

    const items = list.querySelectorAll("li[data-where]");
    if (!items.length) {
      console.warn("[Portfolio.MobileNav] No li[data-where] items found.");
      return;
    }

    const where = this.resolveActiveWhere();
    let matched = false;

    items.forEach((item) => {
      const key = (item.getAttribute("data-where") || "").trim().toLowerCase();
      const href = item.querySelector("a")?.getAttribute("href") || "";
      const hrefStem = this.#hrefStem(href);
      const isMatch =
        key === String(where).toLowerCase() ||
        this.ROUTE_TO_WHERE[hrefStem] === where ||
        hrefStem === where;

      item.classList.toggle("active", Boolean(isMatch && !matched));
      if (isMatch && !matched) matched = true;
    });

    if (!matched) {
      console.warn(
        `[Portfolio.MobileNav] No tab matched data-where="${where}".`,
      );
    }
  }

  static #hrefStem(href) {
    if (!href || href.startsWith("#") || href.startsWith("javascript:"))
      return "";
    try {
      const url = new URL(href, window.location.href);
      return this.parseFileStem(url);
    } catch {
      return String(href)
        .split("?")[0]
        .split("#")[0]
        .split("/")
        .pop()
        .replace(/\.html?$/i, "")
        .toLowerCase();
    }
  }

  static #ensureIcons(wrapper) {
    const icons = window.Portfolio?.ICONS;
    if (typeof icons?.hydrateAll === "function") {
      try {
        icons.hydrateAll(wrapper);
      } catch (error) {
        console.error("[Portfolio.MobileNav] Icon hydration failed.", error);
      }
    }
  }

  static #escapeAttr(value) {
    if (value == null) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  static #escapeText(value) {
    if (value == null) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
