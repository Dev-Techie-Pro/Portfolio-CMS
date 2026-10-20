"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.UTILS = {
    ...(window.Portfolio.UTILS || {}),
    NAV_ROUTE_ALIASES: {
      "project-details": "projects",
      "blog-details": "blogs",
    },
    parseFileStem: function (locationLike = window.location) {
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
      // Next.js App Router: bare segments like /about (no .html)
      return (file || "index").toLowerCase();
    },
    resolvePageRoute: function (stem) {
      const routes = window.Portfolio?.CONSTANTS?.PAGE_ROUTES;
      let route = String(stem || "index").toLowerCase();
      if (routes && Object.prototype.hasOwnProperty.call(routes, route)) {
        route = routes[route];
      }
      if (!route || route === "index") route = "home";
      return route;
    },
    getProjectSlugFromPath: function (locationLike = window.location) {
      let path = "";
      try {
        path = decodeURIComponent(String(locationLike?.pathname ?? ""));
      } catch {
        path = String(locationLike?.pathname ?? "");
      }
      const segments = path
        .replace(/\\/g, "/")
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean);
      if (segments.length >= 2 && segments[0] === "projects") {
        const slug = segments[1].toLowerCase();
        const projects = window.Portfolio?.PROJECTS;
        if (projects && Object.prototype.hasOwnProperty.call(projects, slug)) {
          return slug;
        }
      }
      return null;
    },
    blogCategoryToSlug: function (category) {
      const map = {
        Backend: "backend",
        Frontend: "frontend",
        WordPress: "wordpress",
        Architecture: "architecture",
        "UI/UX Design": "ui-ux",
        "Designs System": "designs-system",
        "Web Development": "web-development",
      };
      return (
        map[category] ||
        String(category || "")
          .toLowerCase()
          .replace(/\//g, "-")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    },
    getBlogSlugFromPath: function (locationLike = window.location) {
      let path = "";
      try {
        path = decodeURIComponent(String(locationLike?.pathname ?? ""));
      } catch {
        path = String(locationLike?.pathname ?? "");
      }
      const segments = path
        .replace(/\\/g, "/")
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean);
      if (segments.length >= 2 && segments[0] === "blogs") {
        const slug = segments[segments.length - 1].toLowerCase();
        if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
          return slug;
        }
      }
      return null;
    },
    resolveNavRouteFromLocation: function (locationLike = window.location) {
      const utils = window.Portfolio.UTILS;
      if (utils.getProjectSlugFromPath(locationLike)) {
        return "projects";
      }
      if (utils.getBlogSlugFromPath(locationLike)) {
        return "blogs";
      }
      return utils.resolvePageRoute(utils.parseFileStem(locationLike));
    },
    resolveNavRouteFromHref: function (href) {
      const utils = window.Portfolio.UTILS;
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        return "";
      }
      try {
        const url = new URL(href, window.location.href);
        if (utils.getProjectSlugFromPath(url)) {
          return "projects";
        }
        if (utils.getBlogSlugFromPath(url)) {
          return "blogs";
        }
        return utils.resolvePageRoute(utils.parseFileStem(url));
      } catch {
        const stem = String(href)
          .split("?")[0]
          .split("#")[0]
          .split("/")
          .pop()
          .replace(/\.html?$/i, "")
          .toLowerCase();
        return utils.resolvePageRoute(stem || "index");
      }
    },
    normalizeNavRoute: function (route) {
      const aliases = window.Portfolio.UTILS.NAV_ROUTE_ALIASES || {};
      return aliases[route] || route;
    },
    isNavLinkActive: function (href, currentRoute) {
      const utils = window.Portfolio.UTILS;
      const linkRoute = utils.normalizeNavRoute(
        utils.resolveNavRouteFromHref(href),
      );
      const activeRoute = utils.normalizeNavRoute(
        currentRoute || utils.resolveNavRouteFromLocation(),
      );
      return Boolean(linkRoute && linkRoute === activeRoute);
    },
    getActivePage: function () {
      const utils = window.Portfolio.UTILS;
      if (utils.getProjectSlugFromPath()) {
        return "project-details";
      }
      if (utils.getBlogSlugFromPath()) {
        return "blog-details";
      }
      const stem = utils.parseFileStem(window.location);
      const routes = window.Portfolio?.CONSTANTS?.PAGE_ROUTES;
      if (routes && Object.prototype.hasOwnProperty.call(routes, stem)) {
        return routes[stem];
      }
      return stem || "home";
    },
    rand: (min, max) => min + Math.random() * (max - min),
    loadScriptSync: function (src) {
      const normalized = src.replace(/^\.\//, "");
      if (document.querySelector(`script[data-src="${normalized}"]`)) return;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", src, false);
      xhr.send();
      if (xhr.status >= 200 && xhr.status < 300) {
        const el = document.createElement("script");
        el.setAttribute("data-src", normalized);
        el.textContent = xhr.responseText;
        document.head.appendChild(el);
      }
    },
    ensureSharedFilters: function () {
      if (window.Portfolio.SHARED_FILTERS) return;
      window.Portfolio.UTILS.loadScriptSync(
        "/assets/js/managers/index.js",
      );
    },
  }));
