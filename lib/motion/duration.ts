export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Murmura `G(duration)` — keeps timing proportional but snaps to ~0 when reduced. */
export function motionDuration(seconds: number): number {
  return prefersReducedMotion() ? 0.001 : seconds;
}

export function motionStagger(seconds: number): number {
  return prefersReducedMotion() ? 0 : seconds;
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function isNarrowViewport(maxWidth = 760): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}
