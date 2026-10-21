import gsap from 'gsap';
import { motionDuration } from './duration';
import { animateTitleChars, fadeSlide, fadeUp } from './presets';
import { splitTitleElement } from './split-title-dom';

const CLEAR = 'transform,opacity';

export function animateAdminPageHead(root: HTMLElement, delay = 0): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: motionDuration(delay) });
  const header = root.querySelector<HTMLElement>('.pa-header-page') ?? root;

  const title = header.querySelector<HTMLElement>('.pa-page-title');
  if (title) {
    splitTitleElement(title);
    tl.add(animateTitleChars(title), 0);
  }

  const subtitle = header.querySelector<HTMLElement>('.pa-page-subtitle');
  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: motionDuration(0.55),
        ease: 'power3.out',
        clearProps: CLEAR,
      },
      0.08,
    );
  }

  const actions = header.querySelectorAll('.pa-header-page-right > *');
  tl.add(fadeSlide(actions, { y: 14, stagger: 0.08 }), 0.12);

  const mobileToggle = header.querySelector<HTMLElement>('.pa-mobile-toggle');
  if (mobileToggle) {
    tl.fromTo(
      mobileToggle,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: motionDuration(0.45),
        ease: 'power3.out',
        clearProps: CLEAR,
      },
      0,
    );
  }

  return tl;
}

export function animateAdminStatNumbers(root: HTMLElement, delay = 0.15): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: motionDuration(delay) });
  const nums = root.querySelectorAll<HTMLElement>('.pa-dash-stat-number, .pa-dash-overview-value');
  nums.forEach((el, index) => {
    const raw = (el.textContent ?? '').replace(/[^\d.-]/g, '');
    const target = Number(raw);
    if (Number.isNaN(target)) return;
    const proxy = { n: 0 };
    tl.to(
      proxy,
      {
        n: target,
        duration: motionDuration(1.2),
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.n));
        },
      },
      index * motionDuration(0.06),
    );
  });
  return tl;
}

export function animateAdminCards(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.add(
    fadeUp(root.querySelectorAll('.pa-dash-stat-card, .pa-stat-card'), {
      stagger: 0.06,
      y: 28,
    }),
    0.1,
  );
  tl.add(
    fadeUp(root.querySelectorAll('.pa-dash-chart, .pa-card, .pa-dash-panel'), {
      stagger: 0.05,
      y: 26,
    }),
    0.18,
  );
  tl.add(
    fadeSlide(root.querySelectorAll('.pa-dash-recent-project, .pa-dash-activity-item, .pa-list-row'), {
      y: 10,
      stagger: 0.025,
    }),
    0.28,
  );
  return tl;
}
