import gsap from 'gsap';
import { isNarrowViewport, motionDuration } from './duration';

const CLEAR = 'transform,opacity';

export function animateOverlayPanel(panel: HTMLElement) {
  const mobile = isNarrowViewport(760);
  return gsap.fromTo(
    panel,
    mobile ? { opacity: 0, y: 80 } : { opacity: 0, y: 18, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: motionDuration(0.45),
      ease: 'power3.out',
      clearProps: CLEAR,
    },
  );
}

export function animateToastEnter(el: HTMLElement) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: motionDuration(0.35),
      ease: 'power3.out',
      clearProps: CLEAR,
    },
  );
}

export function animateToastExit(el: HTMLElement, onComplete?: () => void) {
  return gsap.to(el, {
    opacity: 0,
    y: 8,
    duration: motionDuration(0.2),
    ease: 'power2.in',
    clearProps: CLEAR,
    onComplete,
  });
}
