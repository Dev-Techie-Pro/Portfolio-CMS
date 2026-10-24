// @ts-nocheck
import { ADMIN_BASE, adminPath } from './admin-base.js';

const ROUTES = [
  [`${ADMIN_BASE}/projects`, 'projects'],
  [`${ADMIN_BASE}/project-tags`, 'project-tags'],
  [`${ADMIN_BASE}/project-technologies`, 'project-technologies'],
  [`${ADMIN_BASE}/project-categories`, 'categories'],
  [`${ADMIN_BASE}/blog-tags`, 'blog-tags'],
  [`${ADMIN_BASE}/tags`, 'project-tags'],
  [`${ADMIN_BASE}/blog-categories`, 'blog-categories'],
  [`${ADMIN_BASE}/tool-categories`, 'tool-categories'],
  [`${ADMIN_BASE}/categories`, 'categories'],
  [`${ADMIN_BASE}/technologies`, 'technologies'],
  [`${ADMIN_BASE}/tools`, 'tools'],
  [`${ADMIN_BASE}/media-library`, 'media'],
  [`${ADMIN_BASE}/testimonials`, 'testimonials'],
  [`${ADMIN_BASE}/blog-post`, 'blogposts'],
  [`${ADMIN_BASE}/blog-engagement`, 'blog-engagement'],
  [`${ADMIN_BASE}/experience`, 'experience'],
  [`${ADMIN_BASE}/faqs`, 'faqs'],
  [`${ADMIN_BASE}/contact-messages`, 'contact-messages'],
  [`${ADMIN_BASE}/access-requests`, 'access-requests'],
  [`${ADMIN_BASE}/users`, 'users'],
  [`${ADMIN_BASE}/recent-activities`, 'recent-activities'],
  [`${ADMIN_BASE}/settings`, 'settings'],
  [`${ADMIN_BASE}/login`, 'login'],
  [`${ADMIN_BASE}/forget-password`, 'forgot-password'],
  [`${ADMIN_BASE}/reset-password`, 'reset-password'],
];

export const SETTINGS_TABS = ['general', 'profile', 'security', 'notifications', 'system'];

export const SETTINGS_PAGE_META = {
  general: {
    title: 'General Settings',
    subtitle: 'Site title, timezone, and display defaults',
  },
  profile: {
    title: 'Profile',
    subtitle: 'Your public profile and account details',
  },
  security: {
    title: 'Security',
    subtitle: 'Password, two-factor authentication, and sessions',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Email alerts, channels, and quiet hours',
  },
  system: {
    title: 'System',
    subtitle: 'Database export and environment configuration',
  },
};

/** @param {string} [path] */
export function getSettingsTabFromPath(path = window.location.pathname) {
  const match = path.match(/\/admin\/settings\/([^/]+)\/?$/);
  const tab = match?.[1];
  return SETTINGS_TABS.includes(tab) ? tab : 'general';
}

/** @param {string} tab */
export function getSettingsPageMeta(tab) {
  const resolved = SETTINGS_TABS.includes(tab) ? tab : 'general';
  return SETTINGS_PAGE_META[resolved];
}

/** @param {string} tab */
export function getSettingsTabPath(tab) {
  const resolved = SETTINGS_TABS.includes(tab) ? tab : 'general';
  return adminPath(`/settings/${resolved}`);
}

/** @returns {string} the current page key, defaulting to "dashboard". */
export function getCurrentPage(path = window.location.pathname) {
  if (path === ADMIN_BASE || path === `${ADMIN_BASE}/`) return 'dashboard';
  if (path.includes('/admin/login')) return 'login';
  if (path.includes('/admin/forget-password')) return 'forgot-password';
  if (path.includes('/admin/reset-password')) return 'reset-password';

  const routes = [...ROUTES].sort((a, b) => b[0].length - a[0].length);
  for (const [needle, page] of routes) {
    if (path.includes(needle)) return page;
  }
  return 'dashboard';
}

/** @deprecated Use getCurrentPage() — this is fixed at first module load and stale after client navigation. */
export const PAGE = getCurrentPage();

export function getLoginPath() {
  return adminPath('/login');
}

/** @param {string} page */
export function getAuthPath(page) {
  const map = {
    'login.html': adminPath('/login'),
    'forget-password.html': adminPath('/forget-password'),
    'reset-password.html': adminPath('/reset-password'),
  };
  return map[page] || adminPath('/login');
}
