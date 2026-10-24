/** URL prefix for the staff dashboard (unified app). */
export const ADMIN_BASE = '/admin';

/** First path segment for in-app CMS routes (without `/admin` prefix in legacy HTML). */
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
  'login',
  'forget-password',
  'reset-password',
]);

export function adminPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) {
    return normalized;
  }
  if (normalized === '/') return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}

/** Map legacy `/experience` style paths to `/admin/experience`. */
export function resolveStaffAppHref(href: string): string | null {
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
