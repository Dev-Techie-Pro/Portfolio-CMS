import gsap from 'gsap';
import { motionDuration, prefersReducedMotion } from './duration';

type LrState = { __lr?: [number, number] };

function clipInset(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 999px)`;
}

export function moveSegmentPill(
  pill: HTMLElement,
  track: HTMLElement,
  activeBtn: HTMLElement,
  animate = true,
) {
  const trackW = track.offsetWidth;
  const trackH = track.offsetHeight;
  const left = activeBtn.offsetLeft;
  const right = trackW - (activeBtn.offsetLeft + activeBtn.offsetWidth);
  const top = activeBtn.offsetTop;
  const bottom = trackH - (activeBtn.offsetTop + activeBtn.offsetHeight);
  const clip = (l: number, r: number) => clipInset(top, r, bottom, l);

  const pillState = pill as HTMLElement & LrState;
  const prev = pillState.__lr;
  pillState.__lr = [left, right];

  if (!animate || prefersReducedMotion() || !prev) {
    gsap.set(pill, { clipPath: clip(left, right), opacity: 1 });
    return;
  }

  const state = { l: prev[0], r: prev[1] };
  const movingRight = left > prev[0];
  gsap.killTweensOf(state);
  gsap.to(state, {
    l: left,
    duration: motionDuration(movingRight ? 0.55 : 0.36),
    ease: movingRight ? 'power3.inOut' : 'power3.out',
    onUpdate: () => gsap.set(pill, { clipPath: clip(state.l, state.r) }),
  });
  gsap.to(state, {
    r: right,
    duration: motionDuration(movingRight ? 0.36 : 0.55),
    ease: movingRight ? 'power3.out' : 'power3.inOut',
    onUpdate: () => gsap.set(pill, { clipPath: clip(state.l, state.r) }),
  });
}
