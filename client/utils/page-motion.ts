// @ts-nocheck
import gsap from 'gsap';
import { animateAdminCards, animateAdminPageHead, animateAdminStatNumbers } from '../../lib/motion/admin-presets.js';
import { fadeSlide, fadeUp } from '../../lib/motion/presets.js';
import { isNarrowViewport, motionDuration } from '../../lib/motion/duration.js';

let activeTimeline: gsap.core.Timeline | null = null;
let activeContext: gsap.Context | null = null;

function pageRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('.pa-body')
    || document.querySelector<HTMLElement>('.pa-main')
    || document.querySelector<HTMLElement>('.pa-auth-page')
  );
}

function killPageMotion() {
  activeTimeline?.kill();
  activeTimeline = null;
  activeContext?.revert();
  activeContext = null;
}

function runTimeline(build: (root: HTMLElement, tl: gsap.core.Timeline) => void) {
  const root = pageRoot();
  if (!root) return;

  killPageMotion();
  activeContext = gsap.context(() => {
    const tl = gsap.timeline();
    build(root, tl);
    activeTimeline = tl;
  }, root);
}

function runDashboardEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(animateAdminCards(root), 0.05);
  tl.add(animateAdminStatNumbers(root), 0.15);
  const heroImg = root.querySelector<HTMLElement>('.pa-dash-cta-banner');
  if (heroImg) {
    tl.fromTo(
      heroImg,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: motionDuration(0.7),
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      },
      0.45,
    );
  }
}

function runCrudEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(
    fadeUp(root.querySelectorAll('.pa-stat-card, .pa-cat-stats .pa-dash-stat-card'), {
      stagger: 0.06,
    }),
    0.1,
  );
  tl.add(
    fadeUp(root.querySelectorAll('.pa-card, .pa-table-wrap, .pa-grid'), { stagger: 0.05, y: 24 }),
    0.16,
  );
  tl.add(
    fadeSlide(root.querySelectorAll('.pa-list-row, .pa-cat-card, .pa-proj-card, [data-flip]'), {
      y: 10,
      stagger: 0.025,
    }),
    0.22,
  );
}

function runSettingsEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(fadeUp(root.querySelectorAll('.pa-settings-nav, .pa-tab-panel.active'), { y: 20 }), 0.1);
  tl.add(fadeUp(root.querySelectorAll('.pa-card-settings, .pa-env-card'), { stagger: 0.06 }), 0.18);
  tl.add(fadeSlide(root.querySelectorAll('.pa-env-field-row'), { y: 8, stagger: 0.03 }), 0.26);
}

function runWorkspaceEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(fadeUp(root.querySelectorAll('.pa-blog-ws-panel, .pa-proj-ws-panel, .pa-ws-sidebar'), { y: 22 }), 0.12);
  tl.add(fadeSlide(root.querySelectorAll('.pa-form-group, .pa-ws-section'), { y: 10, stagger: 0.03 }), 0.2);
}

function runAuthEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  const mobile = isNarrowViewport();
  tl.fromTo(
    root,
    mobile ? { opacity: 0, y: 40 } : { opacity: 0, y: 24, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: motionDuration(0.55),
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    },
    0,
  );
  tl.add(
    fadeUp(root.querySelectorAll('.pa-auth-card, .pa-auth-form-wrap, .pa-auth-brand'), {
      y: 28,
      stagger: 0.08,
    }),
    0.08,
  );
}

function runDefaultEnter(root: HTMLElement, tl: gsap.core.Timeline) {
  tl.add(animateAdminPageHead(root), 0);
  tl.add(animateAdminCards(root), 0.08);
}

const PAGE_BUILDERS: Record<string, (root: HTMLElement, tl: gsap.core.Timeline) => void> = {
  dashboard: runDashboardEnter,
  login: runAuthEnter,
  'forgot-password': runAuthEnter,
  'reset-password': runAuthEnter,
  settings: runSettingsEnter,
  blogposts: runWorkspaceEnter,
  projects: runCrudEnter,
  categories: runCrudEnter,
  tags: runCrudEnter,
  'project-tags': runCrudEnter,
  'project-technologies': runCrudEnter,
  'blog-tags': runCrudEnter,
  'blog-categories': runCrudEnter,
  technologies: runCrudEnter,
  'tool-categories': runCrudEnter,
  tools: runCrudEnter,
  media: runCrudEnter,
  testimonials: runCrudEnter,
  experience: runCrudEnter,
  faqs: runCrudEnter,
  'contact-messages': runCrudEnter,
  'blog-engagement': runCrudEnter,
  'access-requests': runCrudEnter,
  users: runCrudEnter,
  'recent-activities': runCrudEnter,
};

export function runPageEnter(page: string) {
  const builder = PAGE_BUILDERS[page] || runDefaultEnter;
  runTimeline((root, tl) => builder(root, tl));
}

/** Targeted list/grid refresh — does not replay full page enter. */
export function patchListMotion(root: HTMLElement | null, selector = '.pa-list-row, .pa-cat-card, .pa-proj-card, [data-flip]') {
  if (!root) return;
  fadeSlide(root.querySelectorAll(selector), { y: 8, stagger: 0.04, duration: 0.45 });
}

export { killPageMotion };
