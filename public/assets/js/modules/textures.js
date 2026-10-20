"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.TEXTURES = (function () {
    const {
        $: t,
        $$: e,
        rand: n,
        injectStyles: o,
        createLayer: a,
      } = window.Portfolio.UTILS,
      {
        CANVAS: r,
        SYMS: i,
        FOOTER_SYMS: s,
        EXP_HERO_SYMS: l,
        ANIM: d,
      } = window.Portfolio.CONSTANTS;
    let c = 1;
    function h(t) {
      return (function (t) {
        const e = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-dim")
          .trim();
        if (e && "" !== e) {
          const n = e.match(/rgba?\(([^,]+),([^,]+),([^,]+),?([^)]+)?\)/);
          if (n) return `rgba(${n[1]},${n[2]},${n[3]},${t})`;
        }
        const n = u(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim() || "#22c55e",
        );
        return `rgba(${n.r},${n.g},${n.b},${t})`;
      })(t);
    }
    function u(t) {
      3 === (t = t.replace(/^#/, "")).length &&
        (t = t
          .split("")
          .map((t) => t + t)
          .join(""));
      const e = parseInt(t.substring(0, 2), 16),
        n = parseInt(t.substring(2, 4), 16),
        o = parseInt(t.substring(4, 6), 16);
      return isNaN(e) || isNaN(n) || isNaN(o) ? null : { r: e, g: n, b: o };
    }
    function m(t, e) {
      const o = document.createElement("canvas");
      (o.setAttribute("aria-hidden", "true"),
        (o.className = "si-texture-canvas"),
        (o.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"),
        t.insertBefore(o, t.firstChild));
      const a = o.getContext("2d"),
        i = e ? r.footer : r.hero,
        s = window.innerWidth < 768,
        reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
      let l = 0,
        d = 0;
      const u = () => {
        ((l = o.width = t.offsetWidth || 1200),
          (d = o.height = t.offsetHeight || 600));
      };
      try {
        new ResizeObserver(u).observe(t);
      } catch (t) {
        u();
      }
      u();
      const m = s ? i.countMobile : i.countDesktop,
        p = Array.from({ length: m }, () => {
          const t = Math.random() * Math.PI * 2,
            e = n(i.speedRange[0], i.speedRange[1]);
          return {
            x: Math.random() * l,
            y: Math.random() * d,
            r: n(i.radiusRange[0], i.radiusRange[1]),
            vx: Math.cos(t) * e,
            vy: Math.sin(t) * e,
            pulse: Math.random() * Math.PI * 2,
            pSpd: 0.013 + 0.018 * Math.random(),
            variant: Math.random() < 0.72 ? 0 : Math.random() < 0.55 ? 1 : 2,
          };
        });
      let f = null;
      function x() {
        (a.clearRect(0, 0, l, d),
          p.forEach((t) => {
            ((t.x += t.vx * c),
              (t.y += t.vy * c),
              (t.pulse += t.pSpd * c),
              t.x < -12 && (t.x = l + 12),
              t.x > l + 12 && (t.x = -12),
              t.y < -12 && (t.y = d + 12),
              t.y > d + 12 && (t.y = -12));
          }));
        for (let t = 0; t < p.length; t++)
          for (let e = t + 1; e < p.length; e++) {
            const n = p[t].x - p[e].x,
              o = p[t].y - p[e].y,
              r = Math.sqrt(n * n + o * o);
            r < i.linkDist &&
              (a.beginPath(),
              (a.strokeStyle = h((1 - r / i.linkDist) * i.maxAlpha)),
              (a.lineWidth = 0.65),
              a.moveTo(p[t].x, p[t].y),
              a.lineTo(p[e].x, p[e].y),
              a.stroke());
          }
        (p.forEach((t) => {
          const n = 0.3 + 0.24 * Math.sin(t.pulse);
          if (!e) {
            const e = a.createRadialGradient(t.x, t.y, 0, t.x, t.y, 6.5 * t.r);
            (e.addColorStop(0, h(0.38 * n)),
              e.addColorStop(1, h(0)),
              a.beginPath(),
              a.arc(t.x, t.y, 6.5 * t.r, 0, 2 * Math.PI),
              (a.fillStyle = e),
              a.fill());
          }
          if (((a.fillStyle = h(e ? 0.52 * n : n)), e || 1 !== t.variant))
            if (e || 2 !== t.variant)
              (a.beginPath(), a.arc(t.x, t.y, t.r, 0, 2 * Math.PI), a.fill());
            else {
              const e = 4 * t.r;
              ((a.strokeStyle = h(n)),
                (a.lineWidth = 0.7),
                a.strokeRect(t.x - e / 2, t.y - e / 2, e, e),
                a.beginPath(),
                a.moveTo(t.x - e, t.y),
                a.lineTo(t.x + e, t.y),
                a.moveTo(t.x, t.y - e),
                a.lineTo(t.x, t.y + e),
                a.stroke());
            }
          else {
            const e = 3.5 * t.r;
            (a.fillRect(t.x - e / 2, t.y - e / 2, e, e),
              (a.strokeStyle = h(0.5 * n)),
              (a.lineWidth = 0.6),
              a.beginPath(),
              a.moveTo(t.x + e / 2, t.y),
              a.lineTo(t.x + 1.6 * e, t.y),
              a.moveTo(t.x, t.y - e / 2),
              a.lineTo(t.x, t.y - 1.6 * e),
              a.stroke());
          }
        }),
          (f = reduceMotion ? null : requestAnimationFrame(x)));
      }
      if (reduceMotion) {
        x();
      } else if ("IntersectionObserver" in window) {
        new IntersectionObserver(
          (t) => {
            const e = t[0].isIntersecting;
            e || null === f
              ? e && null === f && (f = requestAnimationFrame(x))
              : (cancelAnimationFrame(f), (f = null));
          },
          { threshold: 0.01 },
        ).observe(t);
      } else f = requestAnimationFrame(x);
    }
    function p(t, e, n) {
      const o = document.createElement("div");
      (o.setAttribute("aria-hidden", "true"),
        (o.style.cssText = `position:absolute;left:${e}px;top:${n}px;width:6px;height:6px;\n      border-radius:50%;background:transparent;border:1.5px solid ${h(0.85)};\n      transform:translate(-50%,-50%) scale(1);pointer-events:none;z-index:10;\n      animation:siRipple 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards;`),
        t.appendChild(o),
        o.addEventListener("animationend", () => o.remove()));
    }
    function f(t, e, n) {
      const o = ["+", "×", "·", "◆", "▸", "○", "◇"];
      for (let a = 0; a < 7; a++) {
        const r = document.createElement("span");
        r.setAttribute("aria-hidden", "true");
        const i = (a / 7) * Math.PI * 2,
          s = 28 + 22 * Math.random(),
          l = Math.cos(i) * s,
          d = Math.sin(i) * s;
        ((r.textContent = o[Math.floor(Math.random() * o.length)]),
          (r.style.cssText = `position:absolute;left:${e}px;top:${n}px;\n        font-family:'JetBrains Mono',monospace;\n        font-size:${0.5 + 0.4 * Math.random()}rem;\n        color:${h(0.7 + 0.3 * Math.random())};\n        pointer-events:none;z-index:10;transform:translate(-50%,-50%);\n        animation:siBurst 0.65s cubic-bezier(0.25,0.46,0.45,0.94) forwards;\n        --tx:${l}px;--ty:${d}px;`),
          t.appendChild(r),
          r.addEventListener("animationend", () => r.remove()));
      }
    }
    function x(t, e, n) {
      const o = document.createElement("div");
      (o.setAttribute("aria-hidden", "true"),
        (o.style.cssText = `position:absolute;left:${e}px;top:${n}px;\n      width:60px;height:60px;border-radius:50%;\n      background:radial-gradient(circle,${h(0.35)} 0%,transparent 70%);\n      transform:translate(-50%,-50%) scale(0.4);pointer-events:none;z-index:9;\n      filter:blur(6px);animation:siGlowPop 0.5s ease-out forwards;`),
        t.appendChild(o),
        o.addEventListener("animationend", () => o.remove()));
    }
    function y(t, e, n, o) {
      ((t.style.pointerEvents = "auto"),
        (t.style.cursor = "crosshair"),
        (t.style.transition =
          "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), color 0.2s, text-shadow 0.2s, filter 0.2s"),
        t.addEventListener("mouseenter", (n) => {
          ((t.style.transform = "scale(0.35) rotate(-8deg)"),
            (t.style.color = h(0.95)),
            (t.style.textShadow = `0 0 12px ${h(0.9)}, 0 0 24px ${h(0.5)}`));
          const o = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim();
          t.style.filter = `brightness(1.6) drop-shadow(0 0 6px ${o || "#22c55e"})`;
          const a = e.getBoundingClientRect();
          (p(e, n.clientX - a.left, n.clientY - a.top),
            f(e, n.clientX - a.left, n.clientY - a.top),
            x(e, n.clientX - a.left, n.clientY - a.top));
        }),
        t.addEventListener("mouseleave", () => {
          ((t.style.transform = ""),
            (t.style.color = h(o)),
            (t.style.textShadow = ""),
            (t.style.filter = ""));
        }));
    }
    function b(t, e, n, o) {
      const a = o ? "siFooterFloat" : "siHeroFloat";
      for (let r = 0; r < n; r++) {
        const n = document.createElement("span"),
          r = 0.5 + 0.55 * Math.random(),
          i = 0.06 + 0.16 * Math.random(),
          s = (o ? 20 : 14) + 22 * Math.random(),
          l = 24 * Math.random();
        (n.setAttribute("aria-hidden", "true"),
          (n.className = "si-symbol"),
          (n.textContent = e[Math.floor(Math.random() * e.length)]),
          (n.style.cssText = `\n        position:absolute;font-family:'JetBrains Mono','Courier New',monospace;\n        font-size:${r}rem;color:${h(i)};white-space:nowrap;user-select:none;\n        pointer-events:${o ? "none" : "auto"};\n        left:${(93 * Math.random()).toFixed(1)}%;\n        ${o ? "bottom:0" : `top:${(86 + 22 * Math.random()).toFixed(0)}%`};\n        animation:${a} ${s.toFixed(1)}s linear -${l.toFixed(1)}s infinite;\n        z-index:0;letter-spacing:0.05em;`),
          (n.dataset.siBaseDur = s.toFixed(1)),
          (n.dataset.siBaseDelay = l.toFixed(1)),
          (n.dataset.siAnimName = a),
          t.appendChild(n),
          n.addEventListener("animationiteration", () => {
            ((n.style.left = (93 * Math.random()).toFixed(1) + "%"),
              (n.textContent = e[Math.floor(Math.random() * e.length)]));
          }),
          o || y(n, t, 0, i));
      }
    }
    function g(t, e, n) {
      const o = 0.62 * n,
        r = a(
          `\n      position:absolute;inset:0;pointer-events:none;z-index:0;\n      background-image:radial-gradient(circle,${h(e)} 1px,transparent 1px);\n      background-size:${n}px ${n}px;\n      animation:siDotPan ${o.toFixed(0)}s linear infinite;`,
        );
      (r.classList.add("si-texture-layer"),
        (r.dataset.siBaseDur = o.toFixed(0)),
        (r.dataset.siAnimName = "siDotPan"),
        t.insertBefore(r, t.firstChild));
    }
    function M(t) {
      [
        { w: 420, top: "-90px", left: "-70px", delay: "0s" },
        {
          w: 300,
          top: "auto",
          left: "auto",
          right: "4%",
          bottom: "0",
          delay: "-4s",
        },
      ].forEach(({ w: e, top: n, left: o, right: r, bottom: i, delay: s }) => {
        const l = 8 + 5 * Math.random(),
          d = a(
            `\n        position:absolute;border-radius:50%;pointer-events:none;z-index:0;\n        width:${e}px;height:${e}px;\n        background:radial-gradient(circle,${h(0.055)} 0%,transparent 70%);\n        filter:blur(80px);\n        top:${n || "auto"};left:${o || "auto"};\n        right:${r || "auto"};bottom:${i || "auto"};\n        animation:siBlob ${l.toFixed(1)}s ease-in-out ${s} infinite alternate;`,
          );
        (d.classList.add("si-texture-layer"),
          (d.dataset.siBaseDur = l.toFixed(1)),
          (d.dataset.siAnimName = "siBlob"),
          t.appendChild(d));
      });
    }
    function v(t) {
      const e = a(
        `\n      position:absolute;left:0;right:0;height:1px;\n      background:linear-gradient(90deg,transparent,${h(0.24)},transparent);\n      pointer-events:none;z-index:0;animation:siScan 7s linear infinite;`,
      );
      (e.classList.add("si-texture-layer"),
        (e.dataset.siBaseDur = "7"),
        (e.dataset.siAnimName = "siScan"),
        t.appendChild(e));
    }
    function w(t) {
      const e = "calc(var(--nav-h, 70px) + 14px)";
      [
        [
          `top:${e}`,
          "left:60px",
          "border-top:1px solid",
          "border-left:1px solid",
        ],
        [
          `top:${e}`,
          "right:60px",
          "border-top:1px solid",
          "border-right:1px solid",
        ],
        [
          "bottom:12px",
          "left:60px",
          "border-bottom:1px solid",
          "border-left:1px solid",
        ],
        [
          "bottom:12px",
          "right:60px",
          "border-bottom:1px solid",
          "border-right:1px solid",
        ],
      ].forEach(([e, n, o, r], i) => {
        const s = a(
          `\n        position:absolute;${e};${n};width:48px;height:48px;\n        ${o} ${h(0.22)};${r} ${h(0.22)};\n        pointer-events:none;z-index:0;\n        animation:siBracket 4.5s ease-in-out ${1.1 * i}s infinite;`,
        );
        (s.classList.add("si-texture-layer"),
          (s.dataset.siBaseDur = "4.5"),
          (s.dataset.siAnimName = "siBracket"),
          t.appendChild(s));
      });
    }
    function $(t) {
      if (!t || t.dataset.siAnim) return;
      if (t.querySelector("canvas")) return void (t.dataset.siAnim = "1");
      ((t.dataset.siAnim = "1"),
        (t.style.position = "relative"),
        (t.style.overflow = "hidden"),
        m(t, !1),
        g(t, 0.055, 36));
      const e = a(
        "position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden;",
      );
      (t.appendChild(e),
        b(
          e,
          (function (t) {
            const e = t.id || "",
              n = t.className || "";
            if (n.includes("about-hero")) return i.about;
            if (n.includes("skills-hero")) return i.skills;
            if (n.includes("projects-hero")) return i.projects;
            if (n.includes("testi-hero") || n.includes("hero-testi"))
              return i.testimonials;
            if (n.includes("pd-hero")) return i["project-details"];
            if (n.includes("contact-hero")) return i.contact;
            if ("home" === e)
              return window.location.pathname.toLowerCase().includes("contact")
                ? i.contact
                : i.home;
            return i.home;
          })(t),
          44,
          !1,
        ),
        M(t),
        v(t),
        w(t));
    }
    function F(t) {
      if (!t || t.dataset.siHexNet) return;
      if (t.querySelector("canvas")) return void (t.dataset.siHexNet = "1");
      t.dataset.siHexNet = "1";
      const e = document.createElement("canvas");
      (e.setAttribute("aria-hidden", "true"),
        (e.className = "si-texture-canvas"),
        (e.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.15;"),
        t.insertBefore(e, t.firstChild));
      const o = e.getContext("2d"),
        a = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        r = [
          { cxF: 0.66, cyF: 0.12, rxF: 0.33, ryF: 0.4 },
          { cxF: 0.27, cyF: 0.92, rxF: 0.35, ryF: 0.42 },
        ];
      let i = [],
        s = [],
        l = [],
        d = 32,
        u = Math.max(1, window.devicePixelRatio || 1),
        m = 0,
        p = 0,
        f = null,
        x = null,
        y = performance.now();
      const b = { x: 0, y: 0, active: !1 };
      let g = 0;
      function M(t, e, n) {
        let o = 43758.5453 * Math.sin(12.9898 * t + 78.233 * e + 37.719 * n);
        return o - Math.floor(o);
      }
      function v(t, e, n) {
        return { x: 1.5 * n * t, y: n * (Math.sqrt(3) * (e + t / 2)) };
      }
      function w(t, e, n, o) {
        const a = (Math.PI / 180) * (60 * o);
        return { x: t + n * Math.cos(a), y: e + n * Math.sin(a) };
      }
      function $(t, e, n) {
        let o = 0;
        for (const a of n) {
          const n = (t - a.cx) / a.rx,
            r = (e - a.cy) / a.ry,
            i = Math.sqrt(n * n + r * r),
            s = Math.max(0, 1 - i);
          s > o && (o = s);
        }
        return o;
      }
      function F(t, e) {
        return {
          x: t.bx + Math.sin(e * t.freq + t.phase) * t.ampX,
          y: t.by + Math.cos(e * t.freq * 0.85 + t.phase) * t.ampY,
        };
      }
      function A(t, e) {
        o.clearRect(0, 0, m, p);
        const n = new Array(i.length);
        for (let e = 0; e < i.length; e++) n[e] = F(i[e], t);
        const a = 1 - Math.exp(-8 * Math.max(0.001, e));
        g += ((b.active ? 1 : 0) - g) * a;
        const r = 4.5 * d,
          c = r * r;
        for (let t = 0; t < i.length; t++) {
          const e = i[t];
          let o = 0;
          if (b.active) {
            const e = n[t].x - b.x,
              a = n[t].y - b.y,
              i = e * e + a * a;
            if (i < c) {
              const t = 1 - Math.sqrt(i) / r;
              o = t * t * (3 - 2 * t);
            }
          }
          e.glow += (o - e.glow) * a;
        }
        if (g > 0.01) {
          const t = 1.7 * r,
            e = o.createRadialGradient(b.x, b.y, 0, b.x, b.y, t);
          (e.addColorStop(0, h(0.1 * g)),
            e.addColorStop(1, h(0)),
            (o.fillStyle = e),
            o.beginPath(),
            o.arc(b.x, b.y, t, 0, 2 * Math.PI),
            o.fill());
        }
        for (const [t, e] of s) {
          const a = n[t],
            r = n[e],
            s = Math.max(i[t].glow, i[e].glow),
            l = i[t].r < 1.7 && i[e].r < 1.7;
          (s > 0.02
            ? ((o.strokeStyle = h(0.22 + 0.55 * s)),
              (o.lineWidth = 1 + 1.3 * s))
            : ((o.strokeStyle = h(l ? 0.12 : 0.18)), (o.lineWidth = 1)),
            o.beginPath(),
            o.moveTo(a.x, a.y),
            o.lineTo(r.x, r.y),
            o.stroke());
        }
        for (let e = 0; e < i.length; e++) {
          const a = i[e],
            r = n[e],
            s = 0.75 + 0.25 * Math.sin(0.6 * t + a.pulsePhase),
            l = a.hub ? 1 : 0.7,
            d = Math.min(1, a.baseAlpha * s * l * (1 + 0.7 * a.glow)),
            c = a.r * (1 + 0.85 * a.glow);
          (a.glow > 0.03 &&
            (o.beginPath(),
            (o.fillStyle = h(0.22 * a.glow)),
            o.arc(r.x, r.y, 2.6 * c, 0, 2 * Math.PI),
            o.fill()),
            o.beginPath(),
            (o.fillStyle = h(d)),
            o.arc(r.x, r.y, c, 0, 2 * Math.PI),
            o.fill());
        }
        for (const t of l) {
          const [e, a] = s[t.edgeIndex] || [];
          if (void 0 === e) continue;
          const r = n[e],
            i = n[a],
            l = r.x + (i.x - r.x) * t.t,
            d = r.y + (i.y - r.y) * t.t,
            c = Math.sin(t.t * Math.PI);
          (o.beginPath(),
            (o.fillStyle = h(0.8 * c)),
            o.arc(l, d, 1.6 + 0.8 * c, 0, 2 * Math.PI),
            o.fill());
        }
      }
      let S = performance.now(),
        k = 0;
      function E(t) {
        const e = ((t - S) / 1e3) * c;
        ((S = t),
          (k += e),
          (function (t) {
            for (const e of l)
              ((e.t += e.speed * t),
                e.t >= 1 &&
                  ((e.t = 0), (e.edgeIndex = Math.floor(n(0, s.length)))));
          })(e),
          A(k, e),
          (x = requestAnimationFrame(E)));
      }
      function P() {
        ((m = Math.max(1, t.offsetWidth)),
          (p = Math.max(1, t.offsetHeight)),
          (u = Math.max(1, window.devicePixelRatio || 1)),
          (e.width = Math.round(m * u)),
          (e.height = Math.round(p * u)),
          (e.style.width = m + "px"),
          (e.style.height = p + "px"),
          o.setTransform(u, 0, 0, u, 0, 0),
          (function (t, e) {
            ((i = []), (s = []), (l = []));
            const n = Math.min(46, Math.max(22, t / 32));
            d = n;
            const o = r.map((n) => ({
                cx: n.cxF * t,
                cy: n.cyF * e,
                rx: n.rxF * t,
                ry: n.ryF * e,
              })),
              a = Math.ceil(t / (1.5 * n)) + 3,
              c = -3 - Math.ceil(a / 2),
              h = Math.ceil(e / (n * Math.sqrt(3))) + 3 + Math.ceil(a / 2),
              u = new Map();
            function m(t, e) {
              const n = Math.round(t) + "," + Math.round(e);
              let o = u.get(n);
              if (void 0 !== o) return o;
              const a = M(t, e, 3) > 0.92;
              return (
                (o = i.length),
                i.push({
                  bx: t,
                  by: e,
                  r: a ? 3.4 + 2.2 * M(t, e, 4) : 1.3 + 1.6 * M(t, e, 5),
                  phase: M(t, e, 6) * Math.PI * 2,
                  freq: 0.25 + 0.35 * M(t, e, 7),
                  ampX: 1.2 + 1.6 * M(t, e, 8),
                  ampY: 1.2 + 1.6 * M(t, e, 9),
                  pulsePhase: M(t, e, 10) * Math.PI * 2,
                  hub: a,
                  baseAlpha: 0.7 + 0.3 * M(t, e, 11),
                  glow: 0,
                }),
                u.set(n, o),
                o
              );
            }
            const p = new Set();
            function f(t, e) {
              if (t === e) return;
              const n = t < e ? t + "_" + e : e + "_" + t;
              p.has(n) || (p.add(n), s.push([t, e]));
            }
            for (let r = -5; r <= a; r++)
              for (let a = c; a <= h; a++) {
                const i = v(r, a, n),
                  s = i.x,
                  l = i.y,
                  d = 4 * n;
                if (s < -d || s > t + d || l < -d || l > e + d) continue;
                const c = $(s, l, o);
                if (c < 0.16) continue;
                const h = 0.42 + 0.55 * Math.pow(c, 1.15);
                if (M(r, a, 1) > h) continue;
                const u = 0.9 + 0.16 * M(r, a, 2),
                  p = [];
                for (let t = 0; t < 6; t++) {
                  const e = w(s, l, n * u, t);
                  p.push(m(e.x, e.y));
                }
                for (let t = 0; t < 6; t++) f(p[t], p[(t + 1) % 6]);
              }
            const x = t * e,
              y = Math.min(140, Math.max(30, Math.round(x / 9e3))),
              b = [];
            for (let a = 0; a < y; a++) {
              const r = M(a, 101, 21) * (t + 4 * n) - 2 * n,
                s = M(a, 202, 22) * (e + 4 * n) - 2 * n;
              if ($(r, s, o) > 0.2 && M(a, 303, 23) > 0.08) continue;
              const l = i.length;
              (i.push({
                bx: r,
                by: s,
                r: 1 + 1.6 * M(r, s, 24),
                phase: M(r, s, 25) * Math.PI * 2,
                freq: 0.2 + 0.3 * M(r, s, 26),
                ampX: 1 + 1.4 * M(r, s, 27),
                ampY: 1 + 1.4 * M(r, s, 28),
                pulsePhase: M(r, s, 29) * Math.PI * 2,
                hub: !1,
                baseAlpha: 0.4 + 0.3 * M(r, s, 30),
                glow: 0,
              }),
                b.push(l));
            }
            const g = 2.1 * n;
            for (let t = 0; t < b.length; t++) {
              const e = i[b[t]];
              let n = 0,
                o = [];
              for (let n = 0; n < b.length; n++) {
                if (t === n) continue;
                const a = i[b[n]],
                  r = e.bx - a.bx,
                  s = e.by - a.by,
                  l = Math.sqrt(r * r + s * s);
                l < g && o.push([l, b[n]]);
              }
              o.sort((t, e) => t[0] - e[0]);
              for (const [, e] of o) {
                if (n >= 2) break;
                (f(b[t], e), n++);
              }
            }
            const F = i.length - b.length;
            for (const t of b) {
              if (M(t, 404, 31) > 0.1) continue;
              const e = i[t];
              let o = 1 / 0,
                a = -1;
              const r = Math.max(1, Math.floor(F / 60));
              for (let t = 0; t < F; t += r) {
                const n = i[t],
                  r = e.bx - n.bx,
                  s = e.by - n.by,
                  l = r * r + s * s;
                l < o && ((o = l), (a = t));
              }
              -1 !== a && Math.sqrt(o) < 2.2 * n && f(t, a);
            }
            const A = Math.min(16, Math.max(4, Math.round(s.length / 14)));
            for (let t = 0; t < A; t++)
              l.push({
                edgeIndex: Math.floor(M(t, 505, 41) * s.length),
                t: M(t, 606, 42),
                speed: 0.12 + 0.18 * M(t, 707, 43),
              });
          })(m, p),
          A(k, 0.016),
          a ||
            null !== x ||
            ((S = performance.now()), (x = requestAnimationFrame(E))));
      }
      function C() {
        (clearTimeout(f), (f = setTimeout(P, 150)));
      }
      try {
        new ResizeObserver(C).observe(t);
      } catch (t) {
        window.addEventListener("resize", C);
      }
      function I(t, n) {
        const o = e.getBoundingClientRect();
        ((b.x = t - o.left), (b.y = n - o.top), (b.active = !0));
      }
      function L() {
        null === x && A((performance.now() - y) / 1e3, 0.05);
      }
      if (
        (t.addEventListener("mousemove", (t) => {
          (I(t.clientX, t.clientY), L());
        }),
        t.addEventListener("mouseenter", (t) => {
          (I(t.clientX, t.clientY), L());
        }),
        t.addEventListener("mouseleave", () => {
          ((b.active = !1), L());
        }),
        t.addEventListener(
          "touchstart",
          (t) => {
            (t.touches[0] && I(t.touches[0].clientX, t.touches[0].clientY),
              L());
          },
          { passive: !0 },
        ),
        t.addEventListener(
          "touchmove",
          (t) => {
            (t.touches[0] && I(t.touches[0].clientX, t.touches[0].clientY),
              L());
          },
          { passive: !0 },
        ),
        t.addEventListener("touchend", () => {
          ((b.active = !1), L());
        }),
        t.addEventListener("touchcancel", () => {
          ((b.active = !1), L());
        }),
        "IntersectionObserver" in window)
      ) {
        new IntersectionObserver(
          (t) => {
            const e = t[0].isIntersecting;
            e || null === x
              ? e &&
                null === x &&
                !a &&
                ((S = performance.now()), (x = requestAnimationFrame(E)))
              : (cancelAnimationFrame(x), (x = null));
          },
          { threshold: 0.01 },
        ).observe(t);
      }
      P();
    }
    function A() {
      (document
        .querySelectorAll(
          '#home [aria-hidden="true"], .about-hero [aria-hidden="true"], .skills-hero [aria-hidden="true"], .projects-hero [aria-hidden="true"], .testi-hero [aria-hidden="true"], .pd-hero [aria-hidden="true"], .contact-hero [aria-hidden="true"], .project-details-hero [aria-hidden="true"], footer [aria-hidden="true"]',
        )
        .forEach((t) => {
          const e = t.tagName.toLowerCase();
          if ("span" === e && t.style.fontFamily && t.style.color) {
            const e = t.style.color.match(
                /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
              ),
              n = e ? parseFloat(e[1]) : 0.1;
            t.style.color = h(n);
          }
          if (
            "div" === e &&
            t.style.backgroundImage &&
            t.style.backgroundImage.includes("radial-gradient")
          ) {
            const e = t.style.backgroundImage.match(
                /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
              ),
              n = e ? parseFloat(e[1]) : 0.055,
              o = t.style.backgroundSize
                ? t.style.backgroundSize.match(/(\d+)px/)
                : null;
            o && parseInt(o[1]);
            t.style.backgroundImage = `radial-gradient(circle,${h(n)} 1px,transparent 1px)`;
          }
          if (
            "div" === e &&
            t.style.background &&
            t.style.background.includes("radial-gradient") &&
            t.style.filter &&
            t.style.filter.includes("blur")
          ) {
            const e = t.style.background.match(
                /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
              ),
              n = e ? parseFloat(e[1]) : 0.055;
            t.style.background = `radial-gradient(circle,${h(n)} 0%,transparent 70%)`;
          }
          if (
            "div" === e &&
            t.style.background &&
            t.style.background.includes("linear-gradient") &&
            "1px" === t.style.height
          ) {
            const e = t.style.background.match(
                /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
              ),
              n = e ? parseFloat(e[1]) : 0.24;
            t.style.background = `linear-gradient(90deg,transparent,${h(n)},transparent)`;
          }
          if (
            "div" === e &&
            "48px" === t.style.width &&
            "48px" === t.style.height
          ) {
            ["borderTop", "borderBottom", "borderLeft", "borderRight"].forEach(
              (e) => {
                if (t.style[e] && t.style[e].includes("rgba")) {
                  const n = t.style[e].match(
                      /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
                    ),
                    o = n ? parseFloat(n[1]) : 0.22;
                  t.style[e] = `1px solid ${h(o)}`;
                }
              },
            );
          }
          if (
            "div" === e &&
            "50%" === t.style.borderRadius &&
            t.style.background &&
            !t.style.filter
          ) {
            const e = t.style.background.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            );
            if (e) {
              const n = parseFloat(e[1]);
              t.style.background = h(n);
            }
          }
        }),
        document.querySelectorAll(".fgeo-circle-solid").forEach((t) => {
          const e = t.style.background.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            ),
            n = e ? parseFloat(e[1]) : 0.75;
          t.style.background = h(n);
        }),
        document.querySelectorAll(".fgeo-circle-outline").forEach((t) => {
          const e = t.style.borderColor.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            ),
            n = e ? parseFloat(e[1]) : 0.6;
          t.style.borderColor = h(n);
        }),
        document.querySelectorAll(".fgeo-dot").forEach((t) => {
          const e = t.style.backgroundColor.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            ),
            n = e ? parseFloat(e[1]) : 0.5;
          t.style.backgroundColor = h(n);
        }),
        document.querySelectorAll(".fgeo-dash").forEach((t) => {
          const e = t.style.background.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            ),
            n = e ? parseFloat(e[1]) : 0.4;
          t.style.background = h(n);
        }),
        document.querySelectorAll(".fgeo-bar").forEach((t) => {
          const e = t.style.background.match(
              /rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/,
            ),
            n = e ? parseFloat(e[1]) : 0.6;
          t.style.background = h(n);
        }),
        document.querySelectorAll(".fgeo-tri-outline polygon").forEach((t) => {
          const e = t.getAttribute("fill");
          if (e && e.includes("rgba")) {
            const n = e.match(/rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/),
              o = n ? parseFloat(n[1]) : 0.75;
            t.setAttribute("fill", h(o));
          }
          const n = t.getAttribute("stroke");
          if (n && n.includes("rgba")) {
            const e = n.match(/rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/),
              o = e ? parseFloat(e[1]) : 0.6;
            t.setAttribute("stroke", h(o));
          }
        }),
        document.querySelectorAll("#heroSymbols .hsym").forEach((t) => {
          const e =
              t.style.color &&
              t.style.color.match(/rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/),
            n = e ? parseFloat(e[1]) : 0.12;
          t.style.color = h(n);
        }));
    }
    return (
      document.addEventListener("si:accentChanged", A),
      {
        createCanvas: m,
        spawnRipple: p,
        spawnBurst: f,
        spawnGlow: x,
        makeSymbolInteractive: y,
        spawnSymbols: b,
        addDotGrid: g,
        addGlowBlobs: M,
        addScanLine: v,
        addBrackets: w,
        augmentHero: $,
        initFooterHexNetwork: F,
        createPageParticles: function (t, e, n, a) {
          const r = document.querySelector(t);
          if (r) {
            o("kf-" + e, n);
            for (let t = 0; t < a; t++) {
              const t = document.createElement("div");
              t.setAttribute("aria-hidden", "true");
              const n = 5 * Math.random() + 5,
                o = 3 * Math.random();
              ((t.style.cssText = `\n        position:absolute;border-radius:50%;pointer-events:none;z-index:0;\n        width:${3 * Math.random() + 1}px;height:${3 * Math.random() + 1}px;\n        background:${h(0.25 * Math.random() + 0.05)};\n        top:${100 * Math.random()}%;left:${100 * Math.random()}%;\n        animation:${e} ${n.toFixed(2)}s ease-in-out ${o.toFixed(2)}s infinite alternate;`),
                t.classList.add("si-texture-layer"),
                (t.dataset.siBaseDur = n.toFixed(2)),
                (t.dataset.siAnimName = e),
                r.appendChild(t));
            }
          }
        },
        buildSkillsHeroMesh: function () {
          const t = document.getElementById("sh-mesh-svg");
          if (!t || t.dataset.built) return;
          t.dataset.built = "1";
          const e =
              window.matchMedia &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            n = [];
          for (let t = 0; t < 14; t++)
            for (let e = 0; e < 46; e++) {
              const o = e / 45,
                a = t / 13,
                r = 1400 * o,
                i =
                  48 +
                  320 * a * 0.85 +
                  26 * Math.sin(o * Math.PI * 2.2 + 1.4 * a) * (1 - 0.4 * a),
                s = 0.25 + 0.85 * a;
              n.push({ x: r, y: i, depth: s, row: t, col: e });
            }
          const o = "http://www.w3.org/2000/svg",
            a = document.createDocumentFragment(),
            r = (t, e) => 46 * t + e,
            i = document.createElementNS(o, "g");
          (i.setAttribute("stroke", "var(--accent-dimmer)"),
            i.setAttribute("stroke-width", "0.6"));
          for (let t = 0; t < 14; t++)
            for (let e = 0; e < 46; e++) {
              const a = n[r(t, e)];
              if (e < 45) {
                const s = n[r(t, e + 1)],
                  l = document.createElementNS(o, "line");
                (l.setAttribute("x1", a.x),
                  l.setAttribute("y1", a.y),
                  l.setAttribute("x2", s.x),
                  l.setAttribute("y2", s.y),
                  l.setAttribute("opacity", (0.04 + 0.14 * a.depth).toFixed(3)),
                  i.appendChild(l));
              }
              if (t < 13) {
                const s = n[r(t + 1, e)],
                  l = document.createElementNS(o, "line");
                (l.setAttribute("x1", a.x),
                  l.setAttribute("y1", a.y),
                  l.setAttribute("x2", s.x),
                  l.setAttribute("y2", s.y),
                  l.setAttribute("opacity", (0.04 + 0.14 * a.depth).toFixed(3)),
                  i.appendChild(l));
              }
            }
          a.appendChild(i);
          const s = document.createElementNS(o, "g");
          (n.forEach((t, n) => {
            const a = document.createElementNS(o, "circle"),
              r = (0.6 + 1.8 * t.depth).toFixed(2);
            (a.setAttribute("cx", t.x),
              a.setAttribute("cy", t.y),
              a.setAttribute("r", r));
            const i = (t.col + 3 * t.row) % 11 == 0 && t.depth > 0.5;
            if (
              (a.setAttribute(
                "fill",
                i ? "var(--accent-dim)" : "var(--accent-dimmer)",
              ),
              a.setAttribute(
                "opacity",
                Math.min(0.9, 0.12 + 0.65 * t.depth).toFixed(2),
              ),
              !e && n % 4 == 0)
            ) {
              (a.classList.add("sh-particle"),
                a.classList.add("si-texture-layer"));
              const e = 3 + 3 * Math.random();
              (a.style.setProperty("--p-op", (0.3 + 0.5 * t.depth).toFixed(2)),
                a.style.setProperty(
                  "--p-dx",
                  (6 * (Math.random() - 0.5)).toFixed(1) + "px",
                ),
                a.style.setProperty(
                  "--p-dy",
                  (6 * (Math.random() - 0.5)).toFixed(1) + "px",
                ),
                a.style.setProperty("--p-dur", e.toFixed(1) + "s"),
                (a.dataset.siBaseDur = e.toFixed(1)),
                (a.dataset.siAnimName = "sh-particle-drift"),
                (a.dataset.siDurProp = "--p-dur"),
                (a.style.transformOrigin = t.x + "px " + t.y + "px"));
            }
            s.appendChild(a);
          }),
            a.appendChild(s),
            t.appendChild(a));
        },
        createIndexParticles: function () {
          const t = document.getElementById("home");
          if (t) {
            o(
              "kf-floatDot",
              `@keyframes floatDot {\n      0%   { transform: translate(0,0) scale(1);   opacity:0.5; }\n      100% { transform: translate(${30 * Math.random() - 15}px,${-40 * Math.random() - 10}px) scale(1.5); opacity:0; }\n    }`,
            );
            for (let e = 0; e < 18; e++) {
              const e = document.createElement("div");
              e.setAttribute("aria-hidden", "true");
              const n = 6 * Math.random() + 5,
                o = 3 * Math.random();
              ((e.style.cssText = `\n        position:absolute;border-radius:50%;pointer-events:none;z-index:0;\n        width:${3 * Math.random() + 1}px;height:${3 * Math.random() + 1}px;\n        background:${h(0.3 * Math.random() + 0.05)};\n        top:${100 * Math.random()}%;left:${100 * Math.random()}%;\n        animation:floatDot ${n.toFixed(2)}s ease-in-out ${o.toFixed(2)}s infinite alternate;`),
                e.classList.add("si-texture-layer"),
                (e.dataset.siBaseDur = n.toFixed(2)),
                (e.dataset.siAnimName = "floatDot"),
                t.appendChild(e));
            }
          }
        },
        initExperienceCanvas: function () {
          const t = document.getElementById("hero-canvas");
          if (!t) return;
          t.classList.add("si-texture-canvas");
          const e = t.getContext("2d"),
            n = r.experience,
            reduceMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
          let o,
            a,
            i = [];
          const s = () => {
            ((o = t.width = t.offsetWidth), (a = t.height = t.offsetHeight));
          };
          (window.addEventListener("resize", s), s());
          const l = window.innerWidth < 768 ? n.countMobile : n.countDesktop;
          function d() {
            const t = 0.18 + 0.28 * Math.random(),
              e = Math.random() * Math.PI * 2;
            return {
              x: Math.random() * o,
              y: Math.random() * a,
              r: 1 + 1.8 * Math.random(),
              vx: Math.cos(e) * t,
              vy: Math.sin(e) * t,
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + 0.02 * Math.random(),
            };
          }
          for (let t = 0; t < l; t++) i.push(d());
          let u = null;
          function m() {
            (e.clearRect(0, 0, o, a),
              i.forEach((t) => {
                ((t.x += t.vx * c),
                  (t.y += t.vy * c),
                  (t.pulse += t.pulseSpeed * c),
                  t.x < -10 && (t.x = o + 10),
                  t.x > o + 10 && (t.x = -10),
                  t.y < -10 && (t.y = a + 10),
                  t.y > a + 10 && (t.y = -10));
              }));
            for (let t = 0; t < i.length; t++)
              for (let o = t + 1; o < i.length; o++) {
                const a = i[t].x - i[o].x,
                  r = i[t].y - i[o].y,
                  s = Math.sqrt(a * a + r * r);
                s < n.linkDist &&
                  (e.beginPath(),
                  (e.strokeStyle = h(0.18 * (1 - s / n.linkDist))),
                  (e.lineWidth = 0.6),
                  e.moveTo(i[t].x, i[t].y),
                  e.lineTo(i[o].x, i[o].y),
                  e.stroke());
              }
            (i.forEach((t) => {
              const n = 0.35 + 0.25 * Math.sin(t.pulse),
                o = e.createRadialGradient(t.x, t.y, 0, t.x, t.y, 5 * t.r);
              (o.addColorStop(0, h(0.5 * n)),
                o.addColorStop(1, h(0)),
                e.beginPath(),
                e.arc(t.x, t.y, 5 * t.r, 0, 2 * Math.PI),
                (e.fillStyle = o),
                e.fill(),
                e.beginPath(),
                e.arc(t.x, t.y, t.r, 0, 2 * Math.PI),
                (e.fillStyle = h(n)),
                e.fill());
            }),
              (u = reduceMotion ? null : requestAnimationFrame(m)));
          }
          if (reduceMotion) {
            m();
          } else if ("IntersectionObserver" in window) {
            new IntersectionObserver(
              (t) => {
                const e = t[0].isIntersecting;
                e || null === u
                  ? e && null === u && (u = requestAnimationFrame(m))
                  : (cancelAnimationFrame(u), (u = null));
              },
              { threshold: 0.01 },
            ).observe(t);
          } else u = requestAnimationFrame(m);
        },
        initExperienceHeroSymbols: function () {
          const t = document.getElementById("heroSymbols");
          if (t) for (let t = 0; t < 38; t++) e();
          function e() {
            const e = document.createElement("span");
            ((e.className = "hsym si-symbol"),
              (e.textContent = l[Math.floor(Math.random() * l.length)]));
            const n = 0.6 + 0.6 * Math.random(),
              o = 0.1 + 0.18 * Math.random(),
              a = 14 + 20 * Math.random(),
              r = 18 * Math.random();
            ((e.style.cssText = `\n        left:${2 + 96 * Math.random()}%;\n        top:${90 + 20 * Math.random()}%;\n        font-size:${n}rem;\n        color:${h(o)};\n        animation-duration:${a.toFixed(1)}s;\n        animation-delay:-${r.toFixed(1)}s;`),
              (e.dataset.siBaseDur = a.toFixed(1)),
              (e.dataset.siDurProp = "animation-duration"),
              t.appendChild(e),
              e.addEventListener("animationiteration", () => {
                e.style.left = 2 + 96 * Math.random() + "%";
              }),
              y(e, t, 0, o));
          }
        },
        initUniversalAnimations: function () {
          [
            "#home",
            ".about-hero",
            ".skills-hero",
            ".projects-hero",
            ".testi-hero",
            ".hero-testi",
            ".pd-hero",
            ".contact-hero",
            ".project-details-hero",
          ].forEach((t) => e(t).forEach($));
          const t = document.querySelector("footer");
          t && F(t);
        },
        refreshTextureColors: A,
        setAnimSpeed: function (t) {
          ((c = t),
            (function (t) {
              document.querySelectorAll("[data-si-base-dur]").forEach((e) => {
                const n = parseFloat(e.dataset.siBaseDur);
                if (!n || !isFinite(n)) return;
                const o = (n / t).toFixed(2) + "s",
                  a = e.dataset.siDurProp;
                a && 0 === a.indexOf("--")
                  ? e.style.setProperty(a, o)
                  : (e.style.animationDuration = o);
              });
            })(t));
        },
        getAnimSpeed: function () {
          return c;
        },
        setTexturesVisible: function (t) {
          document.documentElement.classList.toggle("si-textures-off", !t);
        },
        setSymbolsVisible: function (t) {
          document.documentElement.classList.toggle("si-symbols-off", !t);
        },
        setAnimationsEnabled: function (t) {
          document.documentElement.classList.toggle("si-animations-off", !t);
        },
      }
    );
  })()));
