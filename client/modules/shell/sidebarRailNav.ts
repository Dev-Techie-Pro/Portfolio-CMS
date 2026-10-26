// @ts-nocheck
import { hideNavFlyout, isSidebarCollapsedDesktop, showNavFlyout } from './sidebarCollapse.js';

const ROUTE_RAIL: [string, string][] = [
  ['/admin/icon-registry', 'settings'],
  ['/admin/settings', 'settings'],
  ['/admin/tool-categories', 'tools'],
  ['/admin/technologies', 'tools'],
  ['/admin/tools', 'tools'],
  ['/admin/blog-categories', 'content'],
  ['/admin/blog-engagement', 'content'],
  ['/admin/blog-tags', 'content'],
  ['/admin/blog-post', 'content'],
  ['/admin/testimonials', 'content'],
  ['/admin/experience', 'content'],
  ['/admin/faqs', 'content'],
  ['/admin/media-library', 'content'],
  ['/admin/project-technologies', 'projects'],
  ['/admin/project-tags', 'projects'],
  ['/admin/project-categories', 'projects'],
  ['/admin/categories', 'projects'],
  ['/admin/tags', 'projects'],
  ['/admin/projects', 'projects'],
  ['/admin/recent-activities', 'home'],
  ['/admin/contact-messages', 'home'],
  ['/admin/access-requests', 'home'],
  ['/admin/users', 'home'],
];

const ROUTE_RAIL_SORTED = [...ROUTE_RAIL].sort((a, b) => b[0].length - a[0].length);

function resolveRailSection(path = window.location.pathname) {
  if (path === '/admin' || path === '/admin/' || path === '/' || path === '') return 'home';
  for (const [needle, section] of ROUTE_RAIL_SORTED) {
    if (path.includes(needle)) return section;
  }
  return 'home';
}

function getRailButton(section: string) {
  return document.querySelector(`.pa-rail-btn[data-rail-target="${section}"]`);
}

function getNavGroup(section: string) {
  return document.querySelector(`.pa-nav-group[data-nav-group="${section}"]`);
}

export function syncSidebarRailActive() {
  const section = resolveRailSection();
  document.querySelectorAll('.pa-rail-btn[data-rail-target]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.railTarget === section);
  });
}

function setGroupExpanded(group, open) {
  if (!group) return;
  group.classList.add('pa-nav-anim-ready');
  group.classList.toggle('open', open);
  group.querySelector(':scope > .pa-nav-parent-row .pa-nav-toggle')
    ?.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleNavGroup(section: string) {
  const group = getNavGroup(section);
  if (!group) return;

  if (isSidebarCollapsedDesktop()) {
    const flyout = document.getElementById('paNavFlyout');
    if (flyout?.classList.contains('visible') && group.classList.contains('flyout-open')) {
      hideNavFlyout();
      return;
    }
    showNavFlyout(group);
    return;
  }

  hideNavFlyout();
  const nextOpen = !group.classList.contains('open');
  setGroupExpanded(group, nextOpen);
  if (nextOpen) {
    group.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

let railBound = false;

export function initSidebarRailNav() {
  syncSidebarRailActive();
  if (railBound) return;
  railBound = true;

  document.querySelectorAll('.pa-rail-btn[data-rail-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const section = btn.dataset.railTarget;
      if (!section) return;
      toggleNavGroup(section);
      syncSidebarRailActive();
    });
  });

  window.addEventListener('popstate', syncSidebarRailActive);
}
