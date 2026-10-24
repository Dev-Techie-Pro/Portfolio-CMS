/** Mirror of lib/auth/safe-redirect-path.ts for browser post-login redirects. */
import { ADMIN_BASE, resolveStaffAppHref } from '../core/admin-base.js';

export function sanitizeRedirectPath(raw: string | null | undefined, fallback = ADMIN_BASE): string {
  if (raw == null || raw === '') return fallback;
  const path = String(raw).trim();
  if (!path.startsWith('/') || path.startsWith('//')) return fallback;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)) return fallback;
  if (path.includes('\\')) return fallback;
  if (path.includes('\0')) return fallback;
  return path;
}

export function sanitizeStaffRedirectPath(
  raw: string | null | undefined,
  fallback = ADMIN_BASE,
): string {
  const path = sanitizeRedirectPath(raw, fallback);
  if (path.startsWith(`${ADMIN_BASE}/`) || path === ADMIN_BASE) return path;
  if (path.startsWith('/auth/')) return path;
  const mapped = resolveStaffAppHref(path);
  if (mapped) return mapped;
  if (path === '/' || path === '') return fallback;
  return fallback;
}
