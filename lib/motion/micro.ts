import gsap from 'gsap';
import { isCoarsePointer, motionDuration } from './duration';

export function animateButtonPress(el: HTMLElement) {
  gsap.killTweensOf(el);
  gsap.to(el, {
    scale: 0.97,
    duration: motionDuration(0.08),
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
    clearProps: 'transform',
  });
}

type MagneticHandle = { kill: () => void };

export function bindMagnetic(el: HTMLElement, strength = 0.22): MagneticHandle | null {
  if (isCoarsePointer()) return null;

  const quick = gsap.quickSetter(el, 'transform', 'px');
  let bounds: DOMRect | null = null;

  const onEnter = () => {
    bounds = el.getBoundingClientRect();
    el.classList.add('is-magnetic');
  };

  const onMove = (e: PointerEvent) => {
    if (!bounds) return;
    const cx = bounds.left + bounds.width / 2;
    const cy = bounds.top + bounds.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    quick(`translate(${dx}px, ${dy}px)`);
  };

  const onLeave = () => {
    bounds = null;
    el.classList.remove('is-magnetic');
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: motionDuration(0.35),
      ease: 'power3.out',
      clearProps: 'transform',
    });
  };

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return {
    kill: () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    },
  };
}
