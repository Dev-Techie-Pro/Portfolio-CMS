import { ADMIN_BASE, resolveStaffAppHref } from '../admin-paths';

const DEFAULT_SAFE_REDIRECT = ADMIN_BASE;

/**
 * Post-login redirect target: same-origin path only (no protocol-relative or absolute URLs).
 */
export function sanitizeRedirectPath(raw: string | null | undefined, fallback = DEFAULT_SAFE_REDIRECT): string {
  if (raw == null || raw === '') return fallback;
  const path = String(raw).trim();
  if (!path.startsWith('/') || path.startsWith('//')) return fallback;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)) return fallback;
  if (path.includes('\\')) return fallback;
  if (path.includes('\0')) return fallback;
  return path;
}

/** Staff dashboard redirects only — never send editors to public portfolio routes after login. */
export function sanitizeStaffRedirectPath(
  raw: string | null | undefined,
  fallback = DEFAULT_SAFE_REDIRECT,
): string {
  const path = sanitizeRedirectPath(raw, fallback);
  if (path.startsWith(`${ADMIN_BASE}/`) || path === ADMIN_BASE) return path;
  if (path.startsWith('/auth/')) return path;
  const mapped = resolveStaffAppHref(path);
  if (mapped) return mapped;
  if (path === '/' || path === '') return fallback;
  return fallback;
}
