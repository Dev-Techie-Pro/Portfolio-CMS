"use strict";

((window.Portfolio = window.Portfolio || {}),
  (function () {
    var DEFAULT_ACCENT = "#22c55e";
    var DEFAULT_BG = "#0c0c0d";
    var lastFaviconKey = "";

    function normalizeHex(hex, fallback) {
      return typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex)
        ? hex
        : fallback;
    }

    function getThemeBackground() {
      var fromCss = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg")
        .trim();
      if (fromCss) return fromCss;
      return document.documentElement.classList.contains("theme-light")
        ? "#f5f5f5"
        : DEFAULT_BG;
    }

    /** Public site tab icon (SI monogram) — not the admin pixel logo. */
    function buildPublicFaviconSvg(accent, bg) {
      var markColor = normalizeHex(accent, DEFAULT_ACCENT);
      var bgColor = bg || DEFAULT_BG;
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
        '<rect width="32" height="32" fill="' +
        bgColor +
        '"/>' +
        '<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" ' +
        'font-family="Outfit, Poppins, sans-serif" font-weight="800" font-size="13" fill="' +
        markColor +
        '">SI</text></svg>'
      );
    }

    function buildFaviconHref(accent, bg) {
      return (
        "data:image/svg+xml," +
        encodeURIComponent(buildPublicFaviconSvg(accent, bg))
      );
    }

    function markPublicFaviconLinks() {
      document
        .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
        .forEach(function (node) {
          if (node.getAttribute("data-pa-dynamic-favicon") === "true") return;
          node.setAttribute("data-si-public-favicon", "true");
        });
    }

    function ensurePublicFaviconLink() {
      var link = document.querySelector('link[data-si-public-favicon="true"]');
      if (link) return link;
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.setAttribute("data-si-public-favicon", "true");
      document.head.appendChild(link);
      return link;
    }

    function updateFavicon(accent, bg) {
      if (
        typeof window !== "undefined" &&
        /^\/admin(\/|$)/.test(window.location.pathname)
      ) {
        return;
      }
      markPublicFaviconLinks();
      var markColor = normalizeHex(accent, DEFAULT_ACCENT);
      var bgColor = bg != null ? bg : getThemeBackground();
      var key = markColor + "|" + bgColor;
      if (key === lastFaviconKey) return;
      lastFaviconKey = key;
      var href = buildFaviconHref(markColor, bgColor);
      var links = document.querySelectorAll(
        'link[data-si-public-favicon="true"]',
      );
      if (!links.length) {
        ensurePublicFaviconLink().href = href;
        return;
      }
      links.forEach(function (node) {
        node.href = href;
        node.type = "image/svg+xml";
      });
    }

    markPublicFaviconLinks();

    window.Portfolio.FAVICON = {
      updateFavicon: updateFavicon,
      getThemeBackground: getThemeBackground,
    };
  })());
