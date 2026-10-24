/** Fraction of scrub range where index 0 stays locked (easier to read first role). */
export const EXP_HSCROLL_FIRST_HOLD = 0.14;

/** Active index = snap point closest to current scrub progress (stable clicks + scroll). */
export function expIndexFromProgress(progress: number, count: number): number {
  if (count <= 1) return 0;
  const p = Math.max(0, Math.min(1, progress));
  const snaps = expSnapProgressValues(count);
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < snaps.length; i++) {
    const d = Math.abs(p - snaps[i]);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

export function expProgressForIndex(index: number, count: number): number {
  if (count <= 1) return 0;
  const i = Math.max(0, Math.min(count - 1, index));
  if (i === 0) return 0;
  if (i === count - 1) return 1;
  const slot = (i + 0.5) / count;
  return EXP_HSCROLL_FIRST_HOLD + slot * (1 - EXP_HSCROLL_FIRST_HOLD);
}

export function expSnapProgressValues(count: number): number[] {
  if (count <= 1) return [0];
  return Array.from({ length: count }, (_, i) => expProgressForIndex(i, count));
}
