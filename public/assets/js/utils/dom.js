"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.UTILS = {
    ...(window.Portfolio.UTILS || {}),
    $: (selector, root = document) => root.querySelector(selector),
    $$: (selector, root = document) =>
      Array.from(root.querySelectorAll(selector)),
    addClass: (el, ...classes) => el && el.classList.add(...classes),
    removeClass: (el, ...classes) => el && el.classList.remove(...classes),
    toggleClass: (el, className, force) =>
      el && el.classList.toggle(className, force),
    hasClass: (el, className) => el && el.classList.contains(className),
    isInViewport: function (el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    },
    injectStyles: function (id, css) {
      if (document.getElementById(id)) return;
      const style = document.createElement("style");
      style.id = id;
      style.textContent = css;
      document.head.appendChild(style);
    },
    createLayer: function (cssText, ariaHidden = true) {
      const layer = document.createElement("div");
      if (ariaHidden) layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = cssText;
      return layer;
    },
  }));
