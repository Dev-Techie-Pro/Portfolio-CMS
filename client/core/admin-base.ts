// @ts-nocheck
export const ADMIN_BASE = '/admin';

export const STAFF_APP_FIRST_SEGMENTS = new Set([
  'settings',
  'projects',
  'project-tags',
  'project-technologies',
  'project-categories',
  'categories',
  'tags',
  'tool-categories',
  'technologies',
  'tools',
  'media-library',
  'testimonials',
  'blog-post',
  'blog-categories',
  'blog-tags',
  'blog-engagement',
  'experience',
  'faqs',
  'contact-messages',
  'access-requests',
  'users',
  'recent-activities',
  'icon-registry',
  'login',
  'forget-password',
  'reset-password',
]);

/** @param {string} path */
export function adminPath(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) {
    return normalized;
  }
  if (normalized === '/') return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}

/** @param {string} href */
export function resolveStaffAppHref(href) {
  if (!href || href.startsWith('//') || /^[a-z][a-z\d+\-.]*:/i.test(href)) return null;
  if (href.startsWith(`${ADMIN_BASE}/`) || href === ADMIN_BASE) return null;
  if (href === '/') return ADMIN_BASE;
  try {
    const url = new URL(href, 'http://staff.local');
    const seg = url.pathname.split('/').filter(Boolean)[0];
    if (!seg || !STAFF_APP_FIRST_SEGMENTS.has(seg)) return null;
    return adminPath(url.pathname) + url.search + url.hash;
  } catch {
    return null;
  }
}
