// @ts-nocheck
export const ADMIN_BASE = '/admin';

/** @param {string} path */
export function adminPath(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) {
    return normalized;
  }
  if (normalized === '/') return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}
