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
      const idx = expIndexFromProgress(scrollTrigger.progress, api.cards.length);
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
  window.scrollTo({ top: y, behavior: api.prefersReduced() ? 'auto' : 'smooth' });
}

export function teardownExpHscrollGsap(section: HTMLElement) {
  drivers.get(section)?.kill();
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

export function registerExpHscrollApi(section: HTMLElement, api: ExpHscrollMountApi) {
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
