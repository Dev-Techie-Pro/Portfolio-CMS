"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.HIGHLIGHTS = (function () {
    const { $$: queryAll, debounce: debounce } = window.Portfolio.UTILS,
      READY = "phScrollReady",
      STAGGER_MS = 130;

    function prefersReduced() {
      return (
        (window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
        document.documentElement.classList.contains("si-animations-off")
      );
    }

    function animSpeed() {
      return window.Portfolio.TEXTURES && window.Portfolio.TEXTURES.getAnimSpeed
        ? window.Portfolio.TEXTURES.getAnimSpeed()
        : 1;
    }

    function revealCard(card, index) {
      const delay = prefersReduced()
        ? 0
        : Math.round((index * STAGGER_MS) / animSpeed());
      const apply = () => {
        card.classList.add("visible");
        card.style.transitionDelay = prefersReduced() ? "0s" : "0s";
      };
      if (delay <= 0) {
        apply();
      } else {
        window.setTimeout(apply, delay);
      }
    }

    function revealSequential(cards) {
      cards.forEach((card, index) => {
        revealCard(card, index);
      });
    }

    function bindCardInteractions(section) {
      queryAll(".ph-card", section).forEach((card) => {
        const cta = card.querySelector(".ph-cta");

        card.addEventListener("click", (event) => {
          if (event.target.closest(".ph-cta")) return;
          if (cta) cta.click();
        });

        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (cta) cta.click();
          }
        });
      });
    }

    function setup(section) {
      if (section.dataset[READY] === "1") return;

      const grid = section.querySelector(".ph-grid");
      if (!grid) return;

      const cards = queryAll(".ph-card.ph-reveal", grid);
      if (!cards.length) return;

      section.dataset[READY] = "1";
      let revealed = false;

      const triggerReveal = () => {
        if (revealed) return;
        revealed = true;
        revealSequential(cards);
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                triggerReveal();
                observer.disconnect();
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );
        observer.observe(grid);
      } else {
        let raf = null;
        const onScroll = () => {
          if (raf !== null || revealed) return;
          raf = window.requestAnimationFrame(() => {
            raf = null;
            if (window.Portfolio.UTILS.isInViewport(grid)) {
              triggerReveal();
              window.removeEventListener("scroll", onScroll);
            }
          });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }

      bindCardInteractions(section);

      window.addEventListener(
        "resize",
        debounce(() => {
          if (!revealed && window.Portfolio.UTILS.isInViewport(grid)) {
            triggerReveal();
          }
        }, 150),
        { passive: true },
      );
    }

    function init() {
      const section = document.getElementById("projects");
      if (section) setup(section);
    }

    return { init };
  })()),
  (function () {
    const run = () => window.Portfolio.HIGHLIGHTS.init();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
  })());
