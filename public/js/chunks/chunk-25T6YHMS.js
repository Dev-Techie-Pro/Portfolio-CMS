import {
  animateTitleChars,
  fadeSlide,
  fadeUp
} from "./chunk-VXJMB3CY.js";
import {
  gsapWithCSS,
  isNarrowViewport,
  motionDuration
} from "./chunk-HFEWIT3P.js";

// lib/motion/split-title-dom.ts
var SPLIT_ATTR = "data-pa-title-split";
function splitTitleElement(titleEl) {
  if (titleEl.getAttribute(SPLIT_ATTR) === "1") return;
  const text = titleEl.textContent?.trim() ?? "";
  if (!text) return;
  titleEl.setAttribute(SPLIT_ATTR, "1");
  titleEl.classList.add("head__title");
  titleEl.setAttribute("aria-label", text);
  titleEl.textContent = "";
  text.split(/\s+/).forEach((word, wi) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.setAttribute("aria-hidden", "true");
    [...word].forEach((ch) => {
      const chSpan = document.createElement("span");
      chSpan.className = "ch";
      chSpan.textContent = ch;
      wordSpan.appendChild(chSpan);
    });
    titleEl.appendChild(wordSpan);
    if (wi < text.split(/\s+/).length - 1) {
      titleEl.appendChild(document.createTextNode(" "));
    }
  });
}

// lib/motion/admin-presets.ts
var CLEAR = "transform,opacity";
function animateAdminPageHead(root, delay = 0) {
  const tl = gsapWithCSS.timeline({ delay: motionDuration(delay) });
  const header = root.querySelector(".pa-header-page") ?? root;
  const title = header.querySelector(".pa-page-title");
  if (title) {
    splitTitleElement(title);
    tl.add(animateTitleChars(title), 0);
  }
  const subtitle = header.querySelector(".pa-page-subtitle");
  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: motionDuration(0.55),
        ease: "power3.out",
        clearProps: CLEAR
      },
      0.08
    );
  }
  const actions = header.querySelectorAll(".pa-header-page-right > *");
  tl.add(fadeSlide(actions, { y: 14, stagger: 0.08 }), 0.12);
  const mobileToggle = header.querySelector(".pa-mobile-toggle");
  if (mobileToggle) {
    tl.fromTo(
      mobileToggle,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: motionDuration(0.45),
        ease: "power3.out",
        clearProps: CLEAR
      },
      0
    );
  }
  return tl;
}
function animateAdminStatNumbers(root, delay = 0.15) {
  const tl = gsapWithCSS.timeline({ delay: motionDuration(delay) });
  const nums = root.querySelectorAll(".pa-dash-stat-number, .pa-dash-overview-value");
  nums.forEach((el, index) => {
    const raw = (el.textContent ?? "").replace(/[^\d.-]/g, "");
    const target = Number(raw);
    if (Number.isNaN(target)) return;
    const proxy = { n: 0 };
    tl.to(
      proxy,
      {
        n: target,
        duration: motionDuration(1.2),
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.n));
        }
      },
      index * motionDuration(0.06)
    );
  });
  return tl;
}
function animateAdminCards(root) {
  const tl = gsapWithCSS.timeline();
  tl.add(
    fadeUp(root.querySelectorAll(".pa-dash-stat-card, .pa-stat-card"), {
      stagger: 0.06,
      y: 28
    }),
    0.1
  );
  tl.add(
    fadeUp(root.querySelectorAll(".pa-dash-chart, .pa-card, .pa-dash-panel"), {
      stagger: 0.05,
      y: 26
    }),
    0.18
  );
  tl.add(
    fadeSlide(root.querySelectorAll(".pa-dash-recent-project, .pa-dash-activity-item, .pa-list-row"), {
      y: 10,
      stagger: 0.025
    }),
    0.28
  );
  return tl;
}

// client/utils/page-motion.ts
var activeTimeline = null;
var activeContext = null;
function pageRoot() {
  return document.querySelector(".pa-body") || document.querySelector(".pa-main") || document.querySelector(".pa-auth-page");
}
function killPageMotion() {
  activeTimeline?.kill();
  activeTimeline = null;
  activeContext?.revert();
  activeContext = null;
}
function runTimeline(build) {
  const root = pageRoot();
  if (!root) return;
  killPageMotion();
  activeContext = gsapWithCSS.context(() => {
    const tl = gsapWithCSS.timeline();
    build(root, tl);
    activeTimeline = tl;
  }, root);
}
function runDashboardEnter(root, tl) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(animateAdminCards(root), 0.05);
  tl.add(animateAdminStatNumbers(root), 0.15);
  const heroImg = root.querySelector(".pa-dash-cta-banner");
  if (heroImg) {
    tl.fromTo(
      heroImg,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: motionDuration(0.7),
        ease: "power3.out",
        clearProps: "transform,opacity"
      },
      0.45
    );
  }
}
function runCrudEnter(root, tl) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(
    fadeUp(root.querySelectorAll(".pa-stat-card, .pa-cat-stats .pa-dash-stat-card"), {
      stagger: 0.06
    }),
    0.1
  );
  tl.add(
    fadeUp(root.querySelectorAll(".pa-card, .pa-table-wrap, .pa-grid"), { stagger: 0.05, y: 24 }),
    0.16
  );
  tl.add(
    fadeSlide(root.querySelectorAll(".pa-list-row, .pa-cat-card, .pa-proj-card, [data-flip]"), {
      y: 10,
      stagger: 0.025
    }),
    0.22
  );
}
function runSettingsEnter(root, tl) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(fadeUp(root.querySelectorAll(".pa-settings-nav, .pa-tab-panel.active"), { y: 20 }), 0.1);
  tl.add(fadeUp(root.querySelectorAll(".pa-card-settings, .pa-env-card"), { stagger: 0.06 }), 0.18);
  tl.add(fadeSlide(root.querySelectorAll(".pa-env-field-row"), { y: 8, stagger: 0.03 }), 0.26);
}
function runWorkspaceEnter(root, tl) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(fadeUp(root.querySelectorAll(".pa-blog-ws-panel, .pa-proj-ws-panel, .pa-ws-sidebar"), { y: 22 }), 0.12);
  tl.add(fadeSlide(root.querySelectorAll(".pa-form-group, .pa-ws-section"), { y: 10, stagger: 0.03 }), 0.2);
}
function runAuthEnter(root, tl) {
  const mobile = isNarrowViewport();
  tl.fromTo(
    root,
    mobile ? { opacity: 0, y: 40 } : { opacity: 0, y: 24, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: motionDuration(0.55),
      ease: "power3.out",
      clearProps: "transform,opacity"
    },
    0
  );
  tl.add(
    fadeUp(root.querySelectorAll(".pa-auth-card, .pa-auth-form-wrap, .pa-auth-brand"), {
      y: 28,
      stagger: 0.08
    }),
    0.08
  );
}
function runDefaultEnter(root, tl) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(animateAdminCards(root), 0.08);
}
var PAGE_BUILDERS = {
  dashboard: runDashboardEnter,
  login: runAuthEnter,
  "forgot-password": runAuthEnter,
  "reset-password": runAuthEnter,
  settings: runSettingsEnter,
  blogposts: runWorkspaceEnter,
  projects: runCrudEnter,
  categories: runCrudEnter,
  tags: runCrudEnter,
  "project-tags": runCrudEnter,
  "project-technologies": runCrudEnter,
  "blog-tags": runCrudEnter,
  "blog-categories": runCrudEnter,
  technologies: runCrudEnter,
  "tool-categories": runCrudEnter,
  tools: runCrudEnter,
  media: runCrudEnter,
  testimonials: runCrudEnter,
  experience: runCrudEnter,
  faqs: runCrudEnter,
  "contact-messages": runCrudEnter,
  "blog-engagement": runCrudEnter,
  "access-requests": runCrudEnter,
  users: runCrudEnter,
  "recent-activities": runCrudEnter
};
function runPageEnter(page) {
  const builder = PAGE_BUILDERS[page] || runDefaultEnter;
  runTimeline((root, tl) => builder(root, tl));
}
function patchListMotion(root, selector = ".pa-list-row, .pa-cat-card, .pa-proj-card, [data-flip]") {
  if (!root) return;
  fadeSlide(root.querySelectorAll(selector), { y: 8, stagger: 0.04, duration: 0.45 });
}

export {
  killPageMotion,
  runPageEnter,
  patchListMotion
};
//# sourceMappingURL=chunk-25T6YHMS.js.map
