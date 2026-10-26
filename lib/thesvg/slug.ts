/** theSVG icon slug (lowercase kebab-case, e.g. `github`, `next-dot-js`). */
export const THESVG_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isThesvgSlug(value: string): boolean {
  const slug = String(value || '').trim();
  return !!(slug && THESVG_SLUG_RE.test(slug));
}
