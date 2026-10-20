"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.CUSTOMIZE = (function () {
    var e = "si-appearance",
      n = {
        "0px": { none: "0px", sml: "0px", md: "0px", lg: "0px" },
        "5px": { none: "0px", sml: "4px", md: "5px", lg: "12px" },
        "14px": { none: "0px", sml: "6px", md: "12px", lg: "20px" },
        "25px": { none: "0px", sml: "8px", md: "18px", lg: "30px" },
      },
      o = { "0px": "None", "6px": "Small", "16px": "Medium", "30px": "Large" },
      s = { "5px": "0.5rem", "10px": "1rem", "15px": "1.75rem" },
      i = { slow: 0.5, normal: 1, fast: 1.75 },
      r = { slow: "Slow", normal: "Normal", fast: "Fast" };
    var l = Object.keys(n),
      d = Object.keys(s),
      f = ["light", "dark", "system"],
      p = Object.keys(i),
      prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      g = Object.assign(
        {},
        {
          theme: "dark",
          accent: "#22c55e",
          cornerRadius: "0",
          cardSpacing: "10px",
          texturesOn: !prefersReducedMotion,
          symbolsOn: !0,
          animationsOn: !prefersReducedMotion,
          animSpeed: "normal",
        },
      ),
      v = window.matchMedia("(prefers-color-scheme: dark)"),
      y = null;
    function h(e) {
      return document.getElementById(e);
    }
    function S() {
      try {
        localStorage.setItem(e, JSON.stringify(g));
      } catch (e) {}
    }
    function x(e) {
      document.documentElement.classList.toggle("theme-light", !e);
    }
    function k(e) {
      var t = document.documentElement;
      (y && (v.removeEventListener("change", y), (y = null)),
        t.setAttribute("data-theme", e),
        "light" === e
          ? t.classList.add("theme-light")
          : "dark" === e
            ? t.classList.remove("theme-light")
            : "system" === e &&
              (x(v.matches),
              (y = function (e) {
                x(e.matches);
              }),
              v.addEventListener("change", y)));
    }
    function E(e) {
      var t = document.documentElement;
      t.style.setProperty("--accent", e);
      var n = (function (e) {
        3 === (e = e.replace(/^#/, "")).length &&
          (e = e
            .split("")
            .map(function (e) {
              return e + e;
            })
            .join(""));
        var t = parseInt(e.substring(0, 2), 16),
          n = parseInt(e.substring(2, 4), 16),
          o = parseInt(e.substring(4, 6), 16);
        return isNaN(t) || isNaN(n) || isNaN(o) ? null : { r: t, g: n, b: o };
      })(e);
      n &&
        (t.style.setProperty(
          "--accent-dim",
          "rgba(" + n.r + ", " + n.g + ", " + n.b + ", 0.12)",
        ),
        t.style.setProperty(
          "--accent-dimmer",
          "rgba(" + n.r + ", " + n.g + ", " + n.b + ", 0.44)",
        ));
      var o =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='" +
          e.replace("#", "%23") +
          "'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23000'%3ESI%3C/text%3E%3C/svg%3E",
        a = document.querySelector("link[rel='icon']");
      (a ||
        (((a = document.createElement("link")).rel = "icon"),
        (a.type = "image/svg+xml"),
        document.head.appendChild(a)),
        (a.href = o),
        document.dispatchEvent(
          new CustomEvent("si:accentChanged", { detail: { colour: e } }),
        ));
    }
    function O(e) {
      var t = -1 !== l.indexOf(e) ? e : "14px",
        o = document.documentElement;
      o.style.setProperty("--br-none", t);
    }
    function T(e) {
      var t = { "5px": 0.6, "10px": 1, "15px": 1.5 },
        a = t[e] || t["10px"],
        o = document.documentElement;
      (o.style.setProperty("--card-gap-sm", Math.round(6 * a) + "px"),
        o.style.setProperty("--card-gap-md", Math.round(12 * a) + "px"),
        o.style.setProperty("--card-gap-lg", Math.round(16 * a) + "px"));
    }
    function A(e) {
      window.Portfolio.TEXTURES &&
        window.Portfolio.TEXTURES.setTexturesVisible &&
        window.Portfolio.TEXTURES.setTexturesVisible(e);
    }
    function P(e) {
      window.Portfolio.TEXTURES &&
        window.Portfolio.TEXTURES.setSymbolsVisible &&
        window.Portfolio.TEXTURES.setSymbolsVisible(e);
    }
    function F(e) {
      window.Portfolio.TEXTURES &&
        window.Portfolio.TEXTURES.setAnimationsEnabled &&
        window.Portfolio.TEXTURES.setAnimationsEnabled(e);
    }
    function R(e) {
      var t = i[e] || i.normal;
      window.Portfolio.TEXTURES &&
        window.Portfolio.TEXTURES.setAnimSpeed &&
        window.Portfolio.TEXTURES.setAnimSpeed(t);
    }
    function M(e) {
      var t = h("paCustomToastWrap");
      if (t) {
        var n = document.createElement("div");
        ((n.className = "pa-toast info"),
          (n.innerHTML =
            '<svg class="pa-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/><path d="M19.4 15.05L18.3 17.05C18.1 17.4 17.7 17.6 17.3 17.5L15.3 16.95C14.9 17.2 14.5 17.4 14.1 17.55L13.7 19.6C13.6 20 13.3 20.3 12.9 20.3H11.1C10.7 20.3 10.4 20 10.3 19.6L9.9 17.55C9.5 17.4 9.1 17.2 8.7 16.95L6.7 17.5C6.3 17.6 5.9 17.4 5.7 17.05L4.6 15.05C4.4 14.7 4.5 14.3 4.8 14.1L6.4 12.9C6.3 12.6 6.3 12.3 6.3 12C6.3 11.7 6.3 11.4 6.4 11.1L4.8 9.9C4.5 9.7 4.4 9.3 4.6 8.95L5.7 6.95C5.9 6.6 6.3 6.4 6.7 6.5L8.7 7.05C9.1 6.8 9.5 6.6 9.9 6.45L10.3 4.4C10.4 4 10.7 3.7 11.1 3.7H12.9C13.3 3.7 13.6 4 13.7 4.4L14.1 6.45C14.5 6.6 14.9 6.8 15.3 7.05L17.3 6.5C17.7 6.4 18.1 6.6 18.3 6.95L19.4 8.95C19.6 9.3 19.5 9.7 19.2 9.9L17.6 11.1C17.7 11.4 17.7 11.7 17.7 12C17.7 12.3 17.7 12.6 17.6 12.9L19.2 14.1C19.5 14.3 19.6 14.7 19.4 15.05Z"/></svg><span></span><button class="pa-toast-close" aria-label="Dismiss"><svg viewBox="0 0 14 14" fill="none"><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>'),
          (n.querySelector("span").textContent = e));
        var o = function () {
          (n.classList.add("removing"),
            setTimeout(function () {
              n.remove();
            }, 200));
        };
        (n.querySelector(".pa-toast-close").addEventListener("click", o),
          t.appendChild(n),
          setTimeout(function () {
            n.parentElement && o();
          }, 2500));
      }
    }
    function D() {
      (document.querySelectorAll(".custom-theme-card").forEach(function (e) {
        var t = e.dataset.theme === g.theme;
        (e.classList.toggle("active", t),
          e.setAttribute("aria-checked", String(t)));
      }),
        document.querySelectorAll(".custom-swatch").forEach(function (e) {
          var t = e.dataset.color.toLowerCase() === g.accent.toLowerCase();
          (e.classList.toggle("active", t),
            e.setAttribute("aria-checked", String(t)));
        }),
        document
          .querySelectorAll(".custom-fs-btn[data-spacing]")
          .forEach(function (e) {
            var t = e.dataset.spacing === g.cardSpacing;
            (e.classList.toggle("active", t),
              e.setAttribute("aria-checked", String(t)));
          }),
        document.querySelectorAll(".custom-cr-btn").forEach(function (e) {
          var t = e.dataset.radius === g.cornerRadius;
          (e.classList.toggle("active", t),
            e.setAttribute("aria-checked", String(t)));
        }));
      var e = h("customTexturesToggle");
      e &&
        (e.classList.toggle("on", g.texturesOn),
        e.setAttribute("aria-checked", String(g.texturesOn)));
      var t = h("customSymbolsToggle");
      t &&
        (t.classList.toggle("on", g.symbolsOn),
        t.setAttribute("aria-checked", String(g.symbolsOn)));
      var a = h("customAnimationsToggle");
      (a &&
        (a.classList.toggle("on", g.animationsOn),
        a.setAttribute("aria-checked", String(g.animationsOn))),
        document
          .querySelectorAll(".custom-fs-btn[data-speed]")
          .forEach(function (e) {
            var t = e.dataset.speed === g.animSpeed;
            (e.classList.toggle("active", t),
              e.setAttribute("aria-checked", String(t)));
          }));
      var c = h("customSpeedGroup");
      c && c.classList.toggle("disabled", !g.animationsOn);
    }
    function U(e) {
      (document
        .querySelectorAll('.pa-panel-tab[data-panel="custom"]')
        .forEach(function (t) {
          t.classList.toggle("active", t.dataset.tab === e);
        }),
        document
          .querySelectorAll('.pa-tab-panel[data-panel="custom"]')
          .forEach(function (t) {
            t.classList.toggle("active", t.dataset.content === e);
          }));
      var t = document.getElementById("paCustomPanelBody");
      t && (t.scrollTop = 0);
    }
    function W() {
      var e = h("paCustomPanel"),
        t = h("customizeBtn");
      e &&
        (e.classList.remove("visible"), e.setAttribute("aria-hidden", "true"));
      var n = h("paPanelOverlay");
      (n && n.classList.remove("visible"),
        t &&
          (t.classList.remove("active"),
          t.setAttribute("aria-expanded", "false")),
        (document.body.style.overflow = ""));
    }
    function N() {
      var e = h("customizeBtn");
      e &&
        e.addEventListener("click", function (e) {
          (e.preventDefault(),
            e.stopPropagation(),
            (function () {
              var e = h("paCustomPanel"),
                t = h("customizeBtn");
              if (e)
                if (e.classList.contains("visible")) W();
                else {
                  (e.classList.add("visible"),
                    e.setAttribute("aria-hidden", "false"));
                  var n = h("paPanelOverlay");
                  (n && n.classList.add("visible"),
                    t &&
                      (t.classList.add("active"),
                      t.setAttribute("aria-expanded", "true")),
                    (document.body.style.overflow = "hidden"),
                    D(),
                    U("theme"),
                    setTimeout(function () {
                      var t = e.querySelector("button, input, select");
                      t && t.focus();
                    }, 100));
                }
            })());
        });
      var t = h("paCustomPanelClose");
      t &&
        t.addEventListener("click", function (e) {
          (e.stopPropagation(), W());
        });
      var n = h("paCustomCancel");
      n &&
        n.addEventListener("click", function (e) {
          (e.stopPropagation(), W());
        });
      var a = h("paPanelOverlay");
      (a &&
        a.addEventListener("click", function (e) {
          "paPanelOverlay" === e.target.id && W();
        }),
        document.addEventListener("keydown", function (t) {
          var n = h("paCustomPanel");
          "Escape" === t.key &&
            n &&
            n.classList.contains("visible") &&
            (W(), e && e.focus());
        }),
        document.querySelectorAll(".custom-theme-card").forEach(function (e) {
          (e.addEventListener("click", function () {
            ((g.theme = e.dataset.theme),
              k(g.theme),
              D(),
              S(),
              M("Theme → " + g.theme));
          }),
            e.addEventListener("keydown", function (t) {
              ("Enter" !== t.key && " " !== t.key) ||
                (t.preventDefault(), e.click());
            }));
        }),
        document.querySelectorAll(".custom-swatch").forEach(function (e) {
          e.addEventListener("click", function () {
            ((g.accent = e.dataset.color),
              E(g.accent),
              D(),
              S(),
              M("Accent color updated"));
          });
        }),
        document.querySelectorAll(".custom-fs-btn").forEach(function (e) {
          e.addEventListener("click", function () {
            (e.dataset.spacing &&
              ((g.cardSpacing = e.dataset.spacing),
              T(g.cardSpacing),
              D(),
              S(),
              M("Spacing → " + g.cardSpacing)),
              e.dataset.speed &&
                ((g.animSpeed = e.dataset.speed),
                R(g.animSpeed),
                D(),
                S(),
                M("Animation speed → " + (r[g.animSpeed] || g.animSpeed))));
          });
        }),
        document.querySelectorAll(".custom-cr-btn").forEach(function (e) {
          (e.addEventListener("click", function () {
            ((g.cornerRadius = e.dataset.radius),
              O(g.cornerRadius),
              D(),
              S(),
              M("Border Radius → " + (o[g.cornerRadius] || g.cornerRadius)));
          }),
            e.addEventListener("keydown", function (t) {
              var n = Array.from(document.querySelectorAll(".custom-cr-btn")),
                o = n.indexOf(e);
              if ("siArrowRight" === t.key || "ArrowDown" === t.key) {
                t.preventDefault();
                var a = n[(o + 1) % n.length];
                a && a.focus();
              } else if ("siAngleLeft" === t.key || "siArrowUp" === t.key) {
                t.preventDefault();
                var s = n[(o - 1 + n.length) % n.length];
                s && s.focus();
              } else
                (" " !== t.key && "Enter" !== t.key) ||
                  (t.preventDefault(), e.click());
            }));
        }));
      var s = h("customTexturesToggle");
      s &&
        s.addEventListener("click", function () {
          ((g.texturesOn = !g.texturesOn),
            A(g.texturesOn),
            D(),
            S(),
            M("Background Textures → " + (g.texturesOn ? "On" : "Off")));
        });
      var i = h("customSymbolsToggle");
      i &&
        i.addEventListener("click", function () {
          ((g.symbolsOn = !g.symbolsOn),
            P(g.symbolsOn),
            D(),
            S(),
            M("Background Symbols → " + (g.symbolsOn ? "On" : "Off")));
        });
      var c = h("customAnimationsToggle");
      c &&
        c.addEventListener("click", function () {
          ((g.animationsOn = !g.animationsOn),
            F(g.animationsOn),
            D(),
            S(),
            M("Animations → " + (g.animationsOn ? "On" : "Off")));
        });
      (v.addEventListener("change", function () {
        "system" === g.theme && k("system");
      }),
        document
          .querySelectorAll('.pa-panel-tab[data-panel="custom"]')
          .forEach(function (e) {
            e.addEventListener("click", function () {
              (U(e.dataset.tab), D());
            });
          }));
    }
    return {
      init: function () {
        if (window.Portfolio.CUSTOMIZE._ready) return;
        var t = h("paCustomPanel"),
          n = h("customizeBtn");
        if (!t || !n) return;
        window.Portfolio.CUSTOMIZE._ready = true;
        (!(function () {
            try {
              var t = localStorage.getItem(e);
              if (!t) return;
              var n = JSON.parse(t);
              if (!n || "object" != typeof n) return;
              (-1 !== f.indexOf(n.theme) && (g.theme = n.theme),
                /^#[0-9a-fA-F]{6}$/.test(n.accent) && (g.accent = n.accent),
                -1 !== l.indexOf(n.cornerRadius) &&
                  (g.cornerRadius = n.cornerRadius),
                -1 !== d.indexOf(n.cardSpacing) &&
                  (g.cardSpacing = n.cardSpacing),
                "boolean" == typeof n.texturesOn &&
                  (g.texturesOn = n.texturesOn),
                "boolean" == typeof n.symbolsOn && (g.symbolsOn = n.symbolsOn),
                "boolean" == typeof n.animationsOn &&
                  (g.animationsOn = n.animationsOn),
                -1 !== p.indexOf(n.animSpeed) && (g.animSpeed = n.animSpeed));
            } catch (e) {}
          })(),
          k(g.theme),
          E(g.accent),
          O(g.cornerRadius),
          T(g.cardSpacing),
          A(g.texturesOn),
          P(g.symbolsOn),
          F(g.animationsOn),
          R(g.animSpeed),
          N(),
          D());
      },
      reapplySpeed: function () {
        R(g.animSpeed);
      },
    };
  })()));
