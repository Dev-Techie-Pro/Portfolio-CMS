"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.SKELETON = (function () {
    const C = window.Portfolio.CONSTANTS || {};
    const SKEL = C.SKELETON || {};
    const CLS = C.CSS_CLASSES || {};

    const WRAP_CLASS = CLS.SKEL_WRAP || "si-skel-wrap";
    const READY_ATTR = SKEL.READY_ATTR || "data-skel-ready";
    const FADE_MS = SKEL.FADE_MS || 350;
    const MIN_DISPLAY_MS = SKEL.MIN_DISPLAY_MS || 280;
    const SKEL_CLASS = CLS.SKEL || "si-skel";
    const SKEL_CIRCLE_CLASS = CLS.SKEL_CIRCLE || "si-skel-circle";
    const SKEL_IMG_CLASS = CLS.SKEL_IMG || "si-skel-img";
    const SKEL_LOADED_CLASS = CLS.SKEL_LOADED || "si-skel-loaded";
    const CIRCLE_PATTERN =
      /(?:^|\s)(?:avatar|portrait|rounded|circle|photo|thumb|face|hv2-portrait|ph-mockup-img|pg-thumb|pg-thumb-screenshot|blog-thumb|blog-card-img|blog-recent-img|bd-related-thumb|bd-post-nav-thumb|blogs-portrait-wrap|article-figure|pd-gallery|proj-screen|testi-avatar|ht-node-avatar|ht-testi-avatar|trv-avatar|exp-card-logo)(?:\s|$)|border-radius:\s*50%/i;

    let observer = null;
    let initialized = false;
    const wrapped = new WeakSet();

    function isLoaded(img) {
      return img.complete && img.naturalWidth > 0;
    }

    function shouldSkip(img) {
      if (!img || img.tagName !== "IMG") return true;
      if (wrapped.has(img) || img.hasAttribute(READY_ATTR)) return true;
      if (img.closest("[data-skel-skip]")) return true;
      return false;
    }

    function detectShape(img) {
      const classNames = [
        img.className,
        img.parentElement?.className,
        img.closest("figure, picture, .avatar, .portrait-wrap")?.className,
      ]
        .filter(Boolean)
        .join(" ");

      if (CIRCLE_PATTERN.test(classNames)) return "circle";

      try {
        const radius = getComputedStyle(img).borderRadius;
        if (radius && (radius.includes("50%") || parseFloat(radius) > 20)) {
          return "circle";
        }
      } catch {}

      return null;
    }

    function ensureWrapContainer(img) {
      const parent = img.parentElement;
      if (!parent) return null;

      if (parent.classList.contains(WRAP_CLASS)) return parent;

      const parentPosition = getComputedStyle(parent).position;
      if (parentPosition === "static") {
        const container = document.createElement("span");
        container.className = WRAP_CLASS;
        parent.insertBefore(container, img);
        container.appendChild(img);
        return container;
      }

      parent.classList.add(WRAP_CLASS);
      return parent;
    }

    function wrap(img, options = {}) {
      if (shouldSkip(img)) return;

      const container = ensureWrapContainer(img);
      if (!container) return;

      wrapped.add(img);
      img.setAttribute(READY_ATTR, "1");

      const shape = options.shape || detectShape(img);
      const placeholder = document.createElement("span");
      placeholder.className =
        SKEL_CLASS + (shape === "circle" ? ` ${SKEL_CIRCLE_CLASS}` : "");
      placeholder.setAttribute("aria-hidden", "true");
      container.appendChild(placeholder);

      img.classList.add(SKEL_IMG_CLASS);

      const startedAt = performance.now();
      let revealed = false;

      function reveal() {
        if (revealed) return;
        revealed = true;

        const elapsed = performance.now() - startedAt;
        const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

        window.setTimeout(() => {
          img.classList.add(SKEL_LOADED_CLASS);
          window.setTimeout(() => placeholder.remove(), FADE_MS);
        }, delay);
      }

      img.addEventListener("load", reveal, { once: true });
      img.addEventListener("error", reveal, { once: true });

      if (isLoaded(img)) {
        reveal();
      } else if (img.complete) {
        window.requestAnimationFrame(reveal);
      }

      if (!img.getAttribute("src") && !img.getAttribute("srcset")) {
        const srcObserver = new MutationObserver(() => {
          if (img.getAttribute("src") || img.getAttribute("srcset")) {
            srcObserver.disconnect();
            if (!isLoaded(img) && !revealed) {
              img.addEventListener("load", reveal, { once: true });
              img.addEventListener("error", reveal, { once: true });
            }
          }
        });
        srcObserver.observe(img, {
          attributes: true,
          attributeFilter: ["src", "srcset"],
        });
      }
    }

    function wrapAll(root = document) {
      const scope = root.querySelectorAll ? root : document;
      scope.querySelectorAll(`img:not([${READY_ATTR}])`).forEach((img) => {
        wrap(img);
      });
    }

    function processNode(node) {
      if (!node) return;

      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        node.querySelectorAll?.("img").forEach((img) => wrap(img));
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (node.tagName === "IMG") {
        wrap(node);
        return;
      }

      if (node.querySelectorAll) wrapAll(node);
    }

    function observe(root) {
      if (!root || observer) return observer;

      observer = new MutationObserver((records) => {
        records.forEach((record) => {
          record.addedNodes.forEach(processNode);

          if (
            record.type === "attributes" &&
            record.target instanceof HTMLImageElement
          ) {
            if (
              record.attributeName === "src" ||
              record.attributeName === "srcset"
            ) {
              const img = record.target;
              if (!img.hasAttribute(READY_ATTR)) {
                wrap(img);
                return;
              }
              img.classList.remove(SKEL_LOADED_CLASS);
              const container = img.closest(`.${WRAP_CLASS}`);
              if (container && !container.querySelector(`.${SKEL_CLASS}`)) {
                img.removeAttribute(READY_ATTR);
                wrapped.delete(img);
                wrap(img);
              }
            }
          }
        });
      });

      observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"],
      });

      return observer;
    }

    function refresh(root = document) {
      wrapAll(root);
    }

    function init() {
      wrapAll(document);
      if (!initialized) {
        initialized = true;
        observe(document.documentElement);
        window.addEventListener("load", () => wrapAll(document), {
          once: true,
        });
        document.addEventListener("si:contentUpdated", () =>
          wrapAll(document),
        );
      }
    }

    return { init, wrap, wrapAll, observe, refresh };
  })()));

(function bootSkeletonUniversal() {
  function run() {
    window.Portfolio.SKELETON?.init?.();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  window.addEventListener("load", () => {
    window.Portfolio.SKELETON?.wrapAll?.(document);
  });
})();
