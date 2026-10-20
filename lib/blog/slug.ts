const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LEN = 120;

export function parseBlogSlug(raw: string): string | null {
  const slug = raw.trim().toLowerCase();
  if (slug.length < 3 || slug.length > MAX_SLUG_LEN) return null;
  if (!SLUG_RE.test(slug)) return null;
  return slug;
}
