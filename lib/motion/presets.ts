import gsap from 'gsap';
import { motionDuration, motionStagger } from './duration';

const CLEAR = 'transform,opacity';

export function animateTitleChars(
  titleEl: HTMLElement | null,
  delay = 0,
): gsap.core.Animation {
  if (!titleEl) return gsap.timeline();
  const chars = titleEl.querySelectorAll<HTMLElement>('.ch');
  if (!chars.length) return gsap.timeline();
  return gsap.fromTo(
    chars,
    { yPercent: 115, rotation: 6 },
    {
      yPercent: 0,
      rotation: 0,
      duration: motionDuration(0.85),
      ease: 'power4.out',
      stagger: motionStagger(0.022),
      delay: motionDuration(delay),
      clearProps: CLEAR,
    },
  );
}

export function fadeUp(
  targets: gsap.TweenTarget,
  opts: { y?: number; scale?: number; stagger?: number; delay?: number; duration?: number } = {},
): gsap.core.Animation {
  const { y = 34, scale = 0.985, stagger = 0.07, delay = 0, duration = 0.9 } = opts;
  const list = gsap.utils.toArray(targets) as HTMLElement[];
  if (!list.length) return gsap.timeline();
  return gsap.fromTo(
    list,
    { opacity: 0, y, scale },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: motionDuration(duration),
      ease: 'power3.out',
      stagger: motionStagger(stagger),
      delay: motionDuration(delay),
      clearProps: CLEAR,
    },
  );
}

export function fadeSlide(
  targets: gsap.TweenTarget,
  opts: { x?: number; y?: number; stagger?: number; delay?: number; duration?: number } = {},
): gsap.core.Animation {
  const { x = 0, y = 12, stagger = 0.045, delay = 0, duration = 0.55 } = opts;
  const list = gsap.utils.toArray(targets) as HTMLElement[];
  if (!list.length) return gsap.timeline();
  return gsap.fromTo(
    list,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: motionDuration(duration),
      ease: 'power3.out',
      stagger: motionStagger(stagger),
      delay: motionDuration(delay),
      clearProps: CLEAR,
    },
  );
}

export function animatePageHead(root: HTMLElement, delay = 0): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: motionDuration(delay) });
  const title = root.querySelector<HTMLElement>('.head__title');
  tl.add(animateTitleChars(title), 0);

  const back = root.querySelector<HTMLElement>('.head__back');
  if (back) {
    tl.fromTo(
      back,
      { opacity: 0, x: -14 },
      {
        opacity: 1,
        x: 0,
        duration: motionDuration(0.6),
        ease: 'power3.out',
        clearProps: CLEAR,
      },
      0,
    );
  }

  const stats = root.querySelectorAll('.head .stat, .head__actions > *');
  tl.add(fadeSlide(stats, { y: 14, stagger: 0.08 }), 0.12);
  return tl;
}

export function animateMeterFills(
  root: HTMLElement,
  selector = '.meter__fill[data-fill]',
): gsap.core.Timeline {
  const fills = [...root.querySelectorAll<HTMLElement>(selector)];
  const tl = gsap.timeline();
  fills.forEach((el, i) => {
    const raw = el.dataset.fill ?? '1';
    const target = Math.max(0, Math.min(1, Number(raw) || 0));
    gsap.set(el, { transformOrigin: '0 50%', scaleX: 0 });
    tl.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: target,
        duration: motionDuration(0.7),
        ease: 'power3.out',
        clearProps: 'transform',
      },
      motionDuration(0.8 + i * 0.06),
    );
  });
  return tl;
}
