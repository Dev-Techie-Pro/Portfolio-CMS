import gsap from 'gsap';
import { motionDuration } from './duration';

export function flipReorder(root: HTMLElement, mutate: () => void) {
  const items = [...root.querySelectorAll<HTMLElement>('[data-flip]')];
  const first = new Map(items.map((el) => [el, el.getBoundingClientRect()]));

  mutate();

  items.forEach((el) => {
    if (!el.isConnected) return;
    const a = first.get(el);
    if (!a) return;
    const b = el.getBoundingClientRect();
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    gsap.fromTo(
      el,
      { x: dx, y: dy },
      {
        x: 0,
        y: 0,
        duration: motionDuration(0.6),
        ease: 'power3.inOut',
        clearProps: 'transform',
      },
    );
  });
}
