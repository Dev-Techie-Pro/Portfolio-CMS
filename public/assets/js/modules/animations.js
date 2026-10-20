"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.ANIMATIONS = (function () {
    const { $: t, $$: e, on: n } = window.Portfolio.UTILS,
      { ANIM: o } = window.Portfolio.CONSTANTS;
    function r(t) {
      const e = parseInt(t.dataset.target, 10),
        n = e / (o.counterDuration / o.counterStep);
      let r = 0;
      const i = setInterval(() => {
        ((r += n),
          r >= e && ((r = e), clearInterval(i)),
          (t.textContent = Math.floor(r) + (t.dataset.suffix || "")));
      }, o.counterStep);
    }
    function i() {
      return document.documentElement.classList.contains("si-animations-off");
    }
    function s() {
      return window.Portfolio.TEXTURES && window.Portfolio.TEXTURES.getAnimSpeed
        ? window.Portfolio.TEXTURES.getAnimSpeed()
        : 1;
    }
    return {
      initScrollReveal: function () {
        const t = new IntersectionObserver(
          (e) => {
            e.forEach((e) => {
              e.isIntersecting &&
                (e.target.classList.add("visible"), t.unobserve(e.target));
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );
        e(".reveal, .reveal-left, .reveal-right").forEach((e, n) => {
          ((e.style.transitionDelay = (n % 4) * 0.1 + "s"), t.observe(e));
        });
      },
      animateCounter: r,
      initCounters: function () {
        const e = new IntersectionObserver(
            (t) => {
              t.forEach((t) => {
                t.isIntersecting &&
                  (t.target.querySelectorAll("[data-target]").forEach(r),
                  e.unobserve(t.target));
              });
            },
            { threshold: 0.4 },
          ),
          n = document.getElementById("metrics"),
          o = t(".about-mini-stats"),
          i = t(".exp-highlights-grid");
        (n && e.observe(n), o && e.observe(o), i && e.observe(i));
      },
      initSkillBars: function () {
        const t = new IntersectionObserver(
            (e) => {
              e.forEach((e) => {
                e.isIntersecting &&
                  (e.target
                    .querySelectorAll(".skill-cat-bar-fill, .skill-bar-fill")
                    .forEach((t) => {
                      const e = t.dataset.width || t.dataset.w || "85%";
                      setTimeout(() => {
                        t.style.width = e + (e.includes("%") ? "" : "%");
                      }, 200);
                    }),
                  t.unobserve(e.target));
              });
            },
            { threshold: 0.25 },
          ),
          n = document.getElementById("skills");
        (n && t.observe(n), e(".skill-cat-box").forEach((e) => t.observe(e)));
      },
      glitchEffect: function () {
        const e = t(".hero-headline");
        if (!e) return;
        const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        e.querySelectorAll(".glitch-word").forEach((t) => {
          const e = t.dataset.orig;
          if (i()) return void (t.textContent = e);
          let r = 0;
          const l = setInterval(
            () => {
              if (r >= e.length) {
                t.textContent = e;
                clearInterval(l);
                return;
              }
              const a = e
                .split("")
                .map((t, o) =>
                  o < r
                    ? e[o]
                    : " " === t
                      ? " "
                      : n[Math.floor(Math.random() * n.length)],
                )
                .join("");
              ((t.textContent = a), (r += 1));
            },
            Math.max(16, o.glitchInterval / s()),
          );
        });
      },
      typeWriter: function (t, e, n = o.typewriterSpeed) {
        if (!t) return;
        if (i()) return void (t.textContent = e);
        t.textContent = "";
        let r = 0;
        const l = () => {
          r < e.length && ((t.textContent += e[r++]), setTimeout(l, n / s()));
        };
        l();
      },
      initParallaxNumbers: function () {
        const t = e(".section-num");
        if (!t.length) return;
        let n = !1;
        function o() {
          const e = `translateY(${0.04 * window.scrollY}px)`;
          for (let n = 0; n < t.length; n++) t[n].style.transform = e;
          n = !1;
        }
        window.addEventListener(
          "scroll",
          () => {
            n || ((n = !0), requestAnimationFrame(o));
          },
          { passive: !0 },
        );
      },
    };
  })()));
