// @ts-nocheck
import gsap from 'gsap';
import { fadeUp } from '../../lib/motion/presets.js';
import { prefersReducedMotion } from '../../lib/motion/duration.js';

export { prefersReducedMotion } from '../../lib/motion/duration.js';

/**
 * Stagger-reveal direct children or a selector under `root`.
 * Adds `is-motion-ready` on the stagger container when finished (or immediately if reduced motion).
 */
export function staggerReveal(
  root: HTMLElement | null,
  childSelector?: string,
  options?: { startDelay?: number; staggerBy?: number; duration?: number },
) {
  if (!root) return;

  const startDelay = options?.startDelay ?? 0.04;
  const staggerBy = options?.staggerBy ?? 0.07;
  const duration = options?.duration ?? 0.42;

  if (prefersReducedMotion()) {
    root.classList.add('is-motion-ready');
    return;
  }

  root.classList.remove('is-motion-ready');
  root.classList.add('pa-motion-controlled');
  const targets = childSelector
    ? Array.from(root.querySelectorAll<HTMLElement>(childSelector))
    : Array.from(root.children) as HTMLElement[];

  if (!targets.length) {
    root.classList.add('is-motion-ready');
    return;
  }

  const tl = fadeUp(targets, {
    y: 10,
    scale: 1,
    stagger: staggerBy,
    delay: startDelay,
    duration,
  });

  tl.eventCallback('onComplete', () => {
    root.classList.add('is-motion-ready');
  });
  tl.eventCallback('onInterrupt', () => {
    root.classList.add('is-motion-ready');
  });
}

/** Quick patch animation for newly inserted rows/cards (no full page enter). */
export function revealNewNodes(nodes: HTMLElement | HTMLElement[]) {
  const list = gsap.utils.toArray(nodes) as HTMLElement[];
  if (!list.length) return;
  fadeUp(list, { y: 8, stagger: 0.04, duration: 0.45 });
}
