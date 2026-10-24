import assert from 'node:assert/strict';

const ADMIN_BASE = '/admin';

const STAFF_APP_FIRST_SEGMENTS = new Set([
  'settings', 'projects', 'experience', 'blog-engagement', 'access-requests',
]);

function adminPath(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) return normalized;
  if (normalized === '/') return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}

function resolveStaffAppHref(href) {
  if (!href || href.startsWith('//') || /^[a-z][a-z\d+\-.]*:/i.test(href)) return null;
  if (href.startsWith(`${ADMIN_BASE}/`) || href === ADMIN_BASE) return null;
  if (href === '/') return ADMIN_BASE;
  const url = new URL(href, 'http://staff.local');
  const seg = url.pathname.split('/').filter(Boolean)[0];
  if (!seg || !STAFF_APP_FIRST_SEGMENTS.has(seg)) return null;
  return adminPath(url.pathname) + url.search + url.hash;
}

function sanitizeRedirectPath(raw, fallback = ADMIN_BASE) {
  if (raw == null || raw === '') return fallback;
  const path = String(raw).trim();
  if (!path.startsWith('/') || path.startsWith('//')) return fallback;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)) return fallback;
  if (path.includes('\\')) return fallback;
  if (path.includes('\0')) return fallback;
  return path;
}

function sanitizeStaffRedirectPath(raw, fallback = ADMIN_BASE) {
  const path = sanitizeRedirectPath(raw, fallback);
  if (path.startsWith(`${ADMIN_BASE}/`) || path === ADMIN_BASE) return path;
  if (path.startsWith('/auth/')) return path;
  const mapped = resolveStaffAppHref(path);
  if (mapped) return mapped;
  if (path === '/' || path === '') return fallback;
  return fallback;
}

assert.equal(sanitizeRedirectPath('/admin/projects'), '/admin/projects');
assert.equal(sanitizeRedirectPath('//evil.com'), ADMIN_BASE);
assert.equal(sanitizeRedirectPath(null), ADMIN_BASE);

assert.equal(sanitizeStaffRedirectPath('/admin/experience'), '/admin/experience');
assert.equal(sanitizeStaffRedirectPath('/experience'), '/admin/experience');
assert.equal(sanitizeStaffRedirectPath('/blogs'), ADMIN_BASE);
assert.equal(sanitizeStaffRedirectPath(null), ADMIN_BASE);
assert.equal(sanitizeStaffRedirectPath('/'), ADMIN_BASE);

console.log('OK: safe redirect path regression (P2).');
