"use strict";

document.addEventListener("DOMContentLoaded", () => {
  Portfolio.INTERACTIONS.initSmoothScroll();
});

Portfolio.UTILS.injectStyles(
  "si-univ-kf",
  "\n  @keyframes siHeroFloat {\n    0%   { transform: translateY(0)      rotate(0deg);  opacity: 0; }\n    7%   { opacity: 1; }\n    93%  { opacity: 1; }\n    100% { transform: translateY(-110vh) rotate(14deg); opacity: 0; }\n  }\n  @keyframes siFooterFloat {\n    0%   { transform: translateY(65px);  opacity: 0; }\n    10%  { opacity: 1; }\n    90%  { opacity: 1; }\n    100% { transform: translateY(-50px); opacity: 0; }\n  }\n  @keyframes siDotPan {\n    0%   { background-position: 0 0; }\n    100% { background-position: 36px 36px; }\n  }\n  @keyframes siScan {\n    0%   { top: -2px; opacity: 0; }\n    4%   { opacity: 1; }\n    96%  { opacity: 1; }\n    100% { top: 100%; opacity: 0; }\n  }\n  @keyframes siBlob {\n    0%   { transform: translate(0, 0)       scale(1);   }\n    100% { transform: translate(22px, 30px) scale(1.1); }\n  }\n  @keyframes siBracket {\n    0%, 100% { opacity: .12; }\n    50%       { opacity: .32; }\n  }\n  @keyframes siRipple {\n    0%   { width: 6px;  height: 6px;  opacity: 1;   border-width: 1.5px; }\n    40%  {               opacity: 0.7;               border-width: 1px;   }\n    100% { width: 64px; height: 64px; opacity: 0;   border-width: 0.5px; }\n  }\n  @keyframes siBurst {\n    0%   { transform: translate(-50%,-50%) translate(0px, 0px)          scale(1);   opacity: 1; }\n    60%  { opacity: 0.8; }\n    100% { transform: translate(-50%,-50%) translate(var(--tx), var(--ty)) scale(0.3); opacity: 0; }\n  }\n  @keyframes siGlowPop {\n    0%   { transform: translate(-50%,-50%) scale(0.3); opacity: 0.9; }\n    50%  { transform: translate(-50%,-50%) scale(1.2); opacity: 0.5; }\n    100% { transform: translate(-50%,-50%) scale(2);   opacity: 0;   }\n  }\n\n  /* Ensure hero content sits above injected canvas layers */\n  #home > .container,        #home > .hero-grid-bg,\n  #home > .hero-glow,        .about-hero > .container,\n  .skills-hero > .container, .skills-hero > .sh-hero-grid, .projects-hero > .container,\n  .testi-hero > .container,  .contact-hero > .container,\n  .pd-hero > .container,     .project-details-hero > .container,\n  footer > .container,       footer > .footer-inner-wrap {\n    position: relative !important;\n    z-index: 2 !important;\n  }\n",
);

document.addEventListener("DOMContentLoaded", () => {
  Portfolio.SKELETON?.init?.();

  if (document.querySelector(".ch-hero")) {
    Portfolio.INTERACTIONS.initContactHero();
  }

  Portfolio.INTERACTIONS.initTiltEffects();
  Portfolio.ANIMATIONS.initScrollReveal();
  Portfolio.ANIMATIONS.initCounters();
  Portfolio.ANIMATIONS.initSkillBars();

  if (document.getElementById("contactForm")) {
    Portfolio.INTERACTIONS.initContactPage();
  }

  Portfolio.TEXTURES.initUniversalAnimations();
  Portfolio.PAGES.initByRoute();

  Portfolio.COMPONENT_LOADER?.mount?.();
  Portfolio.CUSTOMIZE?.init?.();

  const navbar = document.querySelector(".navbar");
  const utils = window.Portfolio?.UTILS;
  if (navbar && utils?.isNavLinkActive) {
    const route = utils.resolveNavRouteFromLocation();
    navbar.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      const active = utils.isNavLinkActive(link.getAttribute("href"), route);
      link.classList.toggle("active", active);
      if (active) link.style.removeProperty("color");
    });
  }

  if (Portfolio.CUSTOMIZE?.reapplySpeed) {
    Portfolio.CUSTOMIZE.reapplySpeed();
  }

  console.log(
    "%c M SOHAIB ISHAQUE — Portfolio",
    "color:#22c55e;font-size:1.6rem;font-weight:bold;",
  );
  console.log(
    "%c Full Stack Web Developer",
    "color:#888;font-size:1.2rem;",
  );
});

(function initCtaSphere() {
  const canvas = document.getElementById("ctaSphereCanvas");
  if (!canvas) return;

  canvas.classList.add("si-texture-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let width = canvas.width;
  let height = canvas.height;
  let angle = 0;
  let lastTime = null;
  let rafId = null;

  function draw(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    const speed =
      Portfolio.TEXTURES && Portfolio.TEXTURES.getAnimSpeed
        ? Portfolio.TEXTURES.getAnimSpeed()
        : 1;
    angle += 4e-4 * delta * speed;
    ctx.clearRect(0, 0, width, height);
    const cx = 0.52 * width;
    const cy = 0.5 * height;
    const radius = 0.38 * Math.min(width, height);
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#22c55e";
    let hex = accent.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    for (let i = 5; i >= 1; i--) {
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        0.1 * radius,
        cx,
        cy,
        radius * (1 + 0.2 * i),
      );
      grad.addColorStop(0, `rgba(${r},${g},${b},${0.06 / i})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    for (let i = 0; i <= 14; i++) {
      const theta = (i / 14) * Math.PI;
      const y = cy + radius * Math.cos(theta);
      const rx = radius * Math.sin(theta);
      if (rx < 2) continue;
      const alpha =
        0.08 + 0.18 * Math.sin(theta) * (0.6 + 0.4 * Math.sin(1.5 * angle + theta));
      ctx.beginPath();
      ctx.ellipse(cx, y, rx, 0.3 * rx, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    for (let i = 0; i < 18; i++) {
      const phase = (i / 18) * Math.PI * 2 + 0.5 * angle;
      const alpha = 0.06 + 0.14 * Math.abs(Math.cos(phase + angle));
      ctx.beginPath();
      for (let j = 0; j <= 60; j++) {
        const t = (j / 60) * Math.PI;
        const x = cx + radius * Math.sin(t) * Math.cos(phase);
        const y = cy + radius * Math.cos(t);
        const px = cx + (x - cx) * (0.88 + 0.12 * (Math.sin(t) * Math.sin(phase)));
        if (j === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, 0.28 * radius, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let i = 0; i < 30; i++) {
      const phase = (i / 30) * Math.PI * 2 + 0.3 * angle;
      const dist = radius * (1.05 + 0.15 * Math.sin(3 * phase + angle));
      const x = cx + dist * Math.cos(phase);
      const y = cy + 0.4 * dist * Math.sin(phase);
      const dotR = 1 + 0.8 * Math.sin(i + 2 * angle);
      const dotA = 0.3 + 0.4 * Math.sin(0.7 * i + angle);
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${r},${g},${b},${dotA})`;
      ctx.fill();
    }

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 0.5 * radius);
    glow.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    rafId = reduceMotion ? null : requestAnimationFrame(draw);
  }

  if (reduceMotion) {
    draw(performance.now());
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && rafId === null) {
          rafId = requestAnimationFrame(draw);
        } else if (!visible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.01 },
    ).observe(canvas);
  } else {
    rafId = requestAnimationFrame(draw);
  }
})();
