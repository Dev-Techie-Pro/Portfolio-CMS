import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionDuration } from '../duration';
import {
  expIndexFromProgress,
  expProgressForIndex,
  expSnapProgressValues,
} from './exp-hscroll-progress';

gsap.registerPlugin(ScrollTrigger);

export type ExpHscrollMountApi = {
  section: HTMLElement;
  root: HTMLElement;
  intro: HTMLElement | null;
  stage: HTMLElement;
  cards: HTMLElement[];
  pinOffset: () => number;
  introHeight: () => number;
  scrollTravel: () => number;
  canPin: () => boolean;
  measure: () => void;
  setActive: (index: number, fromScroll: boolean) => void;
  moveIndicator: (card: HTMLElement | null) => void;
  prefersReduced: () => boolean;
};

type Driver = {
  kill: () => void;
  scrollToProgress: (progress: number, onComplete?: () => void) => void;
  syncActive: () => void;
};

const drivers = new WeakMap<HTMLElement, Driver>();
const roleTransitionTimelines = new WeakMap<HTMLElement, gsap.core.Timeline>();
const timelineCardTimelines = new WeakMap<HTMLElement, gsap.core.Timeline>();

function expMotionReduced(): boolean {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('si-animations-off')
  );
}

function expDurationScale(variable: string, baseDuration: number): number {
  const configuredDuration = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(variable),
  );
  return Number.isFinite(configuredDuration) && configuredDuration > 0
    ? configuredDuration / baseDuration
    : 1;
}

export function animateExpRoleTransition(
  section: HTMLElement,
  previousPanel: HTMLElement | null,
  nextPanel: HTMLElement,
  direction: 'next' | 'prev',
) {
  if (expMotionReduced()) return;

  const durationScale = expDurationScale('--exp-switch-dur', 0.68);
  const stage = section.querySelector<HTMLElement>('.exp-role-stage');
  if (!stage) return;

  roleTransitionTimelines.get(stage)?.kill();
  const panels = Array.from(section.querySelectorAll<HTMLElement>('.exp-role'));
  const animatedElements = panels.flatMap((panel) => [
    panel,
    ...panel.querySelectorAll<HTMLElement>(
      '.exp-role-company, .exp-role-main, .exp-role-aside, .exp-tech-chip, .exp-role-impact li, .exp-role-achievements-list li, .exp-role-cases',
    ),
  ]);
  gsap.killTweensOf(animatedElements);
  gsap.set(animatedElements, {
    clearProps: 'transform,opacity,filter,visibility',
  });

  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.set(animatedElements, {
        clearProps: 'transform,opacity,filter,visibility',
      });
      roleTransitionTimelines.delete(stage);
    },
  });
  roleTransitionTimelines.set(stage, timeline);

  if (previousPanel && previousPanel !== nextPanel) {
    timeline.fromTo(
      previousPanel,
      { autoAlpha: 1, x: 0, y: 0, rotateY: 0, scale: 1, filter: 'blur(0px)' },
      {
        autoAlpha: 0,
        x: direction === 'next' ? -22 : 22,
        y: -8,
        rotateY: direction === 'next' ? 2 : -2,
        scale: 0.99,
        filter: 'blur(5px)',
        duration: 0.36 * durationScale,
        ease: 'power2.in',
      },
      0,
    );
  }

  timeline.fromTo(
    nextPanel,
    {
      autoAlpha: 0,
      x: direction === 'next' ? 28 : -28,
      y: 16,
      rotateY: direction === 'next' ? -3 : 3,
      scale: 0.985,
      filter: 'blur(8px)',
    },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.68 * durationScale,
      ease: 'power3.out',
      clearProps: 'transform,opacity,filter,visibility',
    },
    0,
  );

  const columns = nextPanel.querySelectorAll<HTMLElement>(
    '.exp-role-company, .exp-role-main, .exp-role-aside',
  );
  timeline.fromTo(
    columns,
    { autoAlpha: 0, y: 12, filter: 'blur(4px)' },
    {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.42 * durationScale,
      stagger: 0.05 * durationScale,
      ease: 'power3.out',
      clearProps: 'transform,opacity,filter,visibility',
    },
    0.12 * durationScale,
  );

  const details = nextPanel.querySelectorAll<HTMLElement>(
    '.exp-tech-chip, .exp-role-impact li, .exp-role-achievements-list li, .exp-role-cases',
  );
  timeline.fromTo(
    details,
    { autoAlpha: 0, y: 9, scale: 0.97 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.25 * durationScale,
      stagger: 0.006 * durationScale,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    },
    0.26 * durationScale,
  );
}

export function animateExpTimelineCard(card: HTMLElement) {
  if (expMotionReduced()) return;

  const durationScale = expDurationScale('--exp-card-dur', 0.45);
  const section = card.closest<HTMLElement>('.exp-work--hscroll');
  const cards = section?.querySelectorAll<HTMLElement>('.exp-tl-card') ?? [
    card,
  ];
  cards.forEach((previousCard) => {
    timelineCardTimelines.get(previousCard)?.kill();
    timelineCardTimelines.delete(previousCard);
    const previousTargets = [
      previousCard,
      ...previousCard.querySelectorAll<HTMLElement>(
        '.exp-tl-num, .exp-tl-role, .exp-tl-company, .exp-tl-meta',
      ),
    ];
    gsap.killTweensOf(previousTargets);
    gsap.set(previousTargets, {
      clearProps: 'transform,opacity,filter,visibility',
    });
  });
  const number = card.querySelector<HTMLElement>('.exp-tl-num');
  const text = card.querySelectorAll<HTMLElement>(
    '.exp-tl-role, .exp-tl-company, .exp-tl-meta',
  );
  const targets = [card, number, ...text].filter(
    (target): target is HTMLElement => target !== null,
  );
  gsap.killTweensOf(targets);
  gsap.set(targets, { clearProps: 'transform,opacity,filter,visibility' });

  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.set(targets, {
        clearProps: 'transform,opacity,filter,visibility',
      });
      timelineCardTimelines.delete(card);
    },
  });
  timelineCardTimelines.set(card, timeline);
  timeline.fromTo(
    card,
    { y: 4, scale: 0.985 },
    {
      y: -2,
      scale: 1.02,
      duration: 0.46 * durationScale,
      ease: 'power3.out',
      clearProps: 'transform',
    },
    0,
  );
  if (number) {
    timeline.fromTo(
      number,
      { scale: 0.84, rotate: -8 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.52 * durationScale,
        ease: 'back.out(1.7)',
        clearProps: 'transform',
      },
      0,
    );
  }
  timeline.fromTo(
    text,
    { autoAlpha: 0.55, y: 7 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.36 * durationScale,
      stagger: 0.035 * durationScale,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    },
    0.06,
  );
}

export function mountExpHscrollGsap(api: ExpHscrollMountApi): Driver | null {
  const existing = drivers.get(api.section);
  existing?.kill();

  if (api.prefersReduced() || !api.canPin()) {
    return null;
  }

  api.measure();

  let scrollTrigger: ScrollTrigger | null = null;
  let introTrigger: ScrollTrigger | null = null;

  const snapPoints = expSnapProgressValues(api.cards.length);

  scrollTrigger = ScrollTrigger.create({
    trigger: api.root,
    // Match native scrub math in experience-cards.js (intro offsets progress 0).
    start: () => `top ${api.pinOffset() - api.introHeight()}px`,
    end: () => `+=${api.scrollTravel()}`,
    scrub: 0.85,
    invalidateOnRefresh: true,
    snap: {
      snapTo: snapPoints,
      duration: { min: 0.12, max: 0.4 },
      delay: 0.04,
      ease: 'power2.inOut',
    },
    onUpdate: (self) => {
      const idx = expIndexFromProgress(self.progress, api.cards.length);
      api.setActive(idx, true);
    },
  });

  if (api.intro) {
    introTrigger = ScrollTrigger.create({
      trigger: api.intro,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          api.intro.querySelectorAll('.exp-work-header > *'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: motionDuration(0.75),
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
        );
      },
    });
  }

  const driver: Driver = {
    kill: () => {
      scrollTrigger?.kill();
      introTrigger?.kill();
      scrollTrigger = null;
      introTrigger = null;
      drivers.delete(api.section);
    },
    syncActive: () => {
      if (!scrollTrigger) return;
      const idx = expIndexFromProgress(
        scrollTrigger.progress,
        api.cards.length,
      );
      api.setActive(idx, true);
    },
    scrollToProgress: (progress, onComplete) => {
      if (!scrollTrigger) {
        onComplete?.();
        return;
      }
      const start = scrollTrigger.start;
      const end = scrollTrigger.end;
      const targetY = start + (end - start) * progress;
      const startY = window.scrollY;
      const proxy = { y: startY };
      gsap.to(proxy, {
        y: targetY,
        duration: motionDuration(0.65),
        ease: 'power3.inOut',
        overwrite: 'auto',
        onUpdate: () => {
          window.scrollTo(0, proxy.y);
        },
        onComplete: () => {
          ScrollTrigger.update();
          onComplete?.();
        },
      });
    },
  };

  drivers.set(api.section, driver);
  ScrollTrigger.refresh();

  return driver;
}

export function scrollExpHscrollToIndex(
  api: ExpHscrollMountApi,
  index: number,
  onComplete?: () => void,
) {
  const driver = drivers.get(api.section);
  const progress = expProgressForIndex(index, api.cards.length);
  if (driver) {
    driver.scrollToProgress(progress, onComplete);
    return;
  }
  const travel = api.scrollTravel();
  const rectTop = window.scrollY + api.root.getBoundingClientRect().top;
  const y = rectTop - api.pinOffset() + api.introHeight() + progress * travel;
  window.scrollTo({
    top: y,
    behavior: api.prefersReduced() ? 'auto' : 'smooth',
  });
}

export function teardownExpHscrollGsap(section: HTMLElement) {
  drivers.get(section)?.kill();
  const stage = section.querySelector<HTMLElement>('.exp-role-stage');
  if (stage) {
    roleTransitionTimelines.get(stage)?.kill();
    roleTransitionTimelines.delete(stage);
  }
  const panels = section.querySelectorAll<HTMLElement>('.exp-role');
  panels.forEach((panel) => {
    const targets = [
      panel,
      ...panel.querySelectorAll<HTMLElement>(
        '.exp-role-company, .exp-role-main, .exp-role-aside, .exp-tech-chip, .exp-role-impact li, .exp-role-achievements-list li, .exp-role-cases',
      ),
    ];
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'transform,opacity,filter,visibility' });
  });
  section.querySelectorAll<HTMLElement>('.exp-tl-card').forEach((card) => {
    timelineCardTimelines.get(card)?.kill();
    timelineCardTimelines.delete(card);
    const targets = [
      card,
      ...card.querySelectorAll<HTMLElement>(
        '.exp-tl-num, .exp-tl-role, .exp-tl-company, .exp-tl-meta',
      ),
    ];
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'transform,opacity,filter,visibility' });
  });
}

export function refreshExpHscrollGsap() {
  ScrollTrigger.refresh();
}

export function animateExpTimelineIndicator(
  indicator: HTMLElement,
  track: HTMLElement,
  card: HTMLElement,
) {
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const x = cardRect.left - trackRect.left + track.scrollLeft;
  gsap.to(indicator, {
    width: cardRect.width,
    x,
    duration: motionDuration(0.5),
    ease: 'power3.out',
    overwrite: 'auto',
  });
}

const sectionApis = new WeakMap<HTMLElement, ExpHscrollMountApi>();

export function registerExpHscrollApi(
  section: HTMLElement,
  api: ExpHscrollMountApi,
) {
  sectionApis.set(section, api);
}

export function scrollExpHscrollSectionToIndex(
  section: HTMLElement,
  index: number,
  onComplete?: () => void,
) {
  const api = sectionApis.get(section);
  if (!api) {
    onComplete?.();
    return;
  }
  scrollExpHscrollToIndex(api, index, onComplete);
}

export function syncExpHscrollSectionActive(section: HTMLElement) {
  drivers.get(section)?.syncActive();
}
