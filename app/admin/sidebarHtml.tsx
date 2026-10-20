// @ts-nocheck
import {
  canAccessSettingsTab,
  deriveAccessCapabilities,
  type AccessCapabilities,
} from '@/lib/auth/capabilities';
import { getPortfolioPublicBaseUrl } from '@/lib/site-url';

const LOGO_SVG = `<svg class="pa-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" shape-rendering="crispEdges">
        <rect class="pa-logo-svg-bg" width="96" height="96"/>
        <g class="pa-logo-svg-mark" id="logo">
          <rect x="11" y="22" width="4" height="3"/>
          <rect x="11" y="29" width="3" height="4"/>
          <rect x="12" y="21" width="2" height="1"/>
          <rect x="14" y="26" width="4" height="2"/>
          <rect x="15" y="25" width="3" height="1"/>
          <rect x="15" y="28" width="3" height="1"/>
          <rect x="18" y="29" width="4" height="3"/>
          <rect x="18" y="32" width="31" height="1"/>
          <rect x="18" y="33" width="32" height="1"/>
          <rect x="18" y="34" width="33" height="1"/>
          <rect x="18" y="35" width="34" height="1"/>
          <rect x="18" y="36" width="35" height="1"/>
          <rect x="18" y="45" width="35" height="2"/>
          <rect x="18" y="47" width="34" height="1"/>
          <rect x="18" y="48" width="32" height="2"/>
          <rect x="18" y="50" width="30" height="1"/>
          <rect x="18" y="51" width="29" height="1"/>
          <rect x="18" y="52" width="28" height="1"/>
          <rect x="18" y="53" width="8" height="11"/>
          <rect x="18" y="64" width="6" height="1"/>
          <rect x="18" y="65" width="5" height="1"/>
          <rect x="18" y="66" width="4" height="1"/>
          <rect x="18" y="67" width="2" height="1"/>
          <rect x="18" y="68" width="1" height="1"/>
          <rect x="21" y="26" width="4" height="3"/>
          <rect x="22" y="25" width="2" height="1"/>
          <rect x="25" y="29" width="20" height="1"/>
          <rect x="25" y="30" width="22" height="1"/>
          <rect x="25" y="31" width="23" height="1"/>
          <rect x="36" y="67" width="36" height="1"/>
          <rect x="37" y="66" width="38" height="1"/>
          <rect x="38" y="65" width="39" height="1"/>
          <rect x="39" y="64" width="40" height="1"/>
          <rect x="40" y="63" width="40" height="1"/>
          <rect x="41" y="62" width="40" height="1"/>
          <rect x="42" y="37" width="12" height="1"/>
          <rect x="42" y="61" width="40" height="1"/>
          <rect x="43" y="38" width="12" height="1"/>
          <rect x="43" y="44" width="12" height="1"/>
          <rect x="43" y="60" width="40" height="1"/>
          <rect x="44" y="43" width="12" height="1"/>
          <rect x="44" y="59" width="4" height="1"/>
          <rect x="45" y="39" width="11" height="1"/>
          <rect x="45" y="42" width="11" height="1"/>
          <rect x="45" y="58" width="3" height="1"/>
          <rect x="46" y="40" width="11" height="1"/>
          <rect x="46" y="41" width="12" height="1"/>
          <rect x="46" y="57" width="2" height="1"/>
          <rect x="47" y="56" width="1" height="1"/>
          <rect x="50" y="29" width="24" height="1"/>
          <rect x="51" y="30" width="25" height="1"/>
          <rect x="52" y="31" width="26" height="1"/>
          <rect x="53" y="32" width="26" height="1"/>
          <rect x="54" y="33" width="26" height="1"/>
          <rect x="55" y="34" width="26" height="1"/>
          <rect x="56" y="35" width="26" height="1"/>
          <rect x="56" y="53" width="3" height="1"/>
          <rect x="56" y="54" width="4" height="4"/>
          <rect x="56" y="58" width="3" height="1"/>
          <rect x="57" y="36" width="26" height="1"/>
          <rect x="61" y="48" width="4" height="1"/>
          <rect x="61" y="49" width="5" height="9"/>
          <rect x="61" y="58" width="4" height="1"/>
          <rect x="67" y="42" width="5" height="16"/>
          <rect x="67" y="58" width="4" height="1"/>
          <rect x="68" y="41" width="3" height="1"/>
          <rect x="70" y="59" width="13" height="1"/>
          <rect x="71" y="37" width="13" height="1"/>
          <rect x="73" y="38" width="11" height="1"/>
          <rect x="73" y="58" width="11" height="1"/>
          <rect x="74" y="39" width="11" height="1"/>
          <rect x="74" y="57" width="11" height="1"/>
          <rect x="75" y="40" width="10" height="1"/>
          <rect x="75" y="56" width="10" height="1"/>
          <rect x="76" y="41" width="10" height="1"/>
          <rect x="76" y="55" width="9" height="1"/>
          <rect x="77" y="42" width="9" height="2"/>
          <rect x="77" y="53" width="9" height="2"/>
          <rect x="78" y="44" width="8" height="2"/>
          <rect x="78" y="46" width="9" height="4"/>
          <rect x="78" y="50" width="8" height="3"/>
        </g>
      </svg>`;

function navSubItem(href, nav, icon, label, extraClass = '', capabilities: AccessCapabilities) {
  if (extraClass.includes('pa-admin-only-item') && !capabilities.isAdmin) return '';
  if (extraClass.includes('pa-editor-only-item') && !capabilities.isEditor) return '';
  const classes = ['pa-nav-subitem', extraClass].filter(Boolean).join(' ');
  return `<a class="${classes}" href="${href}" data-nav="${nav}"><i class="${icon}"></i> ${label}</a>`;
}

function navSettingsSubItem(href, tab, icon, label, extraClass = '', capabilities: AccessCapabilities) {
  if (extraClass.includes('pa-admin-only-item') && !capabilities.isAdmin) return '';
  if (!canAccessSettingsTab(tab, capabilities)) return '';
  const classes = ['pa-nav-subitem', extraClass].filter(Boolean).join(' ');
  return `<a class="${classes}" href="${href}" data-settings-tab="${tab}"><i class="${icon}"></i> ${label}</a>`;
}

function navMainSubItem(href, nav, icon, label, capabilities: AccessCapabilities) {
  return navSubItem(href, nav, icon, label, '', capabilities);
}

function navPublicPortfolioItem(publicUrl: string) {
  const href = publicUrl.replace(/"/g, '&quot;');
  return `<a class="pa-nav-subitem pa-nav-external" href="${href}" target="_blank" rel="noopener noreferrer" data-nav="View Public Portfolio"><i class="ri-external-link-line"></i> View Public Portfolio</a>`;
}

function navGroup(groupId, parent, subItems, capabilities: AccessCapabilities, defaultOpen = false) {
  const openClass = defaultOpen ? ' open' : '';
  const expanded = defaultOpen ? 'true' : 'false';
  const parentItem = parent.href
    ? navMainSubItem(parent.href, parent.nav, parent.submenuIcon || parent.icon, parent.submenuLabel || parent.label, capabilities)
    : '';
  const submenuItems = parentItem
    ? `${parentItem}\n            ${subItems}`
    : subItems;
  return `<div class="pa-nav-section">
        <div class="pa-nav-group${openClass}" data-nav-group="${groupId}">
          <div class="pa-nav-parent-row">
            <button type="button" class="pa-nav-item pa-nav-item--parent" aria-label="Toggle ${parent.label} submenu"><i class="${parent.icon}"></i><span class="pa-nav-item-label">${parent.label}</span></button>
            <button type="button" class="pa-nav-toggle pa-nav-toggle--expand" aria-label="Toggle ${parent.label} submenu" aria-expanded="${expanded}"><i class="ri-arrow-down-s-line"></i></button>
          </div>
          <div class="pa-nav-submenu" role="group" aria-label="${parent.label} submenu">
            <div class="pa-nav-submenu-inner">${submenuItems}</div>
          </div>
        </div>
      </div>`;
}

function railBtn(section, icon, label) {
  return `<button type="button" class="pa-rail-btn" data-rail-target="${section}" aria-label="${label}"><i class="${icon}"></i></button>`;
}

export function buildSidebarInnerHtml(
  capabilities: AccessCapabilities,
  publicPortfolioUrl = getPortfolioPublicBaseUrl(),
) {
  return `<aside class="pa-sidebar" id="paSidebar">
      <div class="pa-sidebar-rail" aria-label="Primary navigation">
        <a href="/admin/settings/profile" class="pa-rail-avatar" id="paRailAvatar" aria-label="Profile">
          <span class="pa-rail-profile" aria-hidden="true">
            <span class="pa-rail-profile-mark"><i class="ri-user-3-fill"></i></span>
          </span>
        </a>
        <div class="pa-rail-nav">
          ${railBtn('home', 'ri-home-5-line', 'Dashboard')}
          ${railBtn('projects', 'ri-layout-grid-line', 'Projects')}
          ${railBtn('tools', 'ri-tools-line', 'Tech & Tools')}
          ${railBtn('content', 'ri-article-line', 'Content & Media')}
          ${railBtn('settings', 'ri-settings-3-line', 'Settings')}
        </div>
        <div class="pa-rail-collapse-wrap">
          <div class="pa-sidebar-collapse-host" id="paSidebarCollapseHost"></div>
        </div>
        <div class="pa-rail-bottom">
          <button type="button" class="pa-rail-btn pa-rail-logout" id="paLogoutBtn" aria-label="Logout"><i class="ri-logout-box-r-line"></i></button>
        </div>
      </div>
      <div class="pa-sidebar-panel">
        <header class="pa-sidebar-panel-head">
          <a href="/admin" class="pa-sidebar-brand pa-logo-link" aria-label="Portfolio Dashboard home">
            <span class="pa-sidebar-brand-icon" aria-hidden="true">${LOGO_SVG}</span>
            <span class="pa-sidebar-brand-text">
              <span class="pa-sidebar-brand-title">Portfolio</span>
              <span class="pa-sidebar-brand-sub">Dashboard</span>
            </span>
          </a>
        </header>
      <nav class="pa-nav" aria-label="Main navigation">
        ${navGroup('home', {
          href: '/admin',
          nav: 'Dashboard',
          icon: 'ri-dashboard-line',
          label: 'Dashboard',
        }, [
          navPublicPortfolioItem(publicPortfolioUrl),
          navSubItem('/admin/recent-activities', 'Recent Activities', 'ri-history-line', 'Recent Activities', '', capabilities),
          navSubItem('/admin/contact-messages', 'Contact Messages', 'ri-mail-line', 'Contact Messages', '', capabilities),
          navSubItem('/admin/access-requests', 'Access Requests', 'ri-shield-user-line', 'Access Requests', 'pa-admin-only-item', capabilities),
          navSubItem('/admin/users', 'Users', 'ri-group-line', 'Users', 'pa-admin-only-item', capabilities),
        ].join('\n            '), capabilities)}
        ${navGroup('projects', {
          href: '/admin/projects',
          nav: 'Projects',
          icon: 'ri-apps-line',
          label: 'Projects',
        }, [
          navSubItem('/admin/project-categories', 'Project Categories', 'ri-folder-line', 'Project Categories', '', capabilities),
          navSubItem('/admin/project-technologies', 'Project Technologies', 'ri-code-s-slash-line', 'Project Technologies', '', capabilities),
          navSubItem('/admin/project-tags', 'Project Tags', 'ri-price-tag-3-line', 'Project Tags', '', capabilities),
        ].join('\n            '), capabilities)}
        ${navGroup('tools', {
          href: '/admin/tool-categories',
          nav: 'Tool Categories',
          icon: 'ri-tools-line',
          label: 'Tech & Tools',
          submenuLabel: 'Categories',
          submenuIcon: 'ri-folder-settings-line',
        }, [
          navSubItem('/admin/technologies', 'Technologies', 'ri-code-s-slash-line', 'Technologies', '', capabilities),
          navSubItem('/admin/tools', 'Tools', 'ri-tools-line', 'Tools', '', capabilities),
        ].join('\n            '), capabilities)}
        ${navGroup('content', {
          href: '/admin/blog-categories',
          nav: 'Blog Categories',
          icon: 'ri-article-line',
          label: 'Content & Media',
          submenuLabel: 'Categories',
          submenuIcon: 'ri-price-tag-3-line',
        }, [
          navSubItem('/admin/blog-post', 'Blog Posts', 'ri-article-line', 'Blog Posts', '', capabilities),
          navSubItem('/admin/blog-tags', 'Blog Tags', 'ri-hashtag', 'Blog Tags', '', capabilities),
          navSubItem('/admin/blog-engagement', 'Comments & Likes', 'ri-chat-heart-line', 'Comments & Likes', 'pa-editor-only-item', capabilities),
          navSubItem('/admin/testimonials', 'Testimonials', 'ri-chat-quote-line', 'Testimonials', '', capabilities),
          navSubItem('/admin/experience', 'Experience', 'ri-briefcase-line', 'Experience', '', capabilities),
          navSubItem('/admin/faqs', 'FAQs', 'ri-question-answer-line', 'FAQs', '', capabilities),
          navSubItem('/admin/media-library', 'Media Library', 'ri-image-line', 'Media Library', '', capabilities),
        ].join('\n            '), capabilities)}
        ${navGroup('settings', {
          icon: 'ri-settings-line',
          label: 'Settings',
        }, [
          navSettingsSubItem('/admin/settings/general', 'general', 'ri-settings-3-line', 'General', '', capabilities),
          navSettingsSubItem('/admin/settings/profile', 'profile', 'ri-user-settings-line', 'Profile', '', capabilities),
          navSettingsSubItem('/admin/settings/security', 'security', 'ri-shield-keyhole-line', 'Security', '', capabilities),
          navSettingsSubItem('/admin/settings/notifications', 'notifications', 'ri-notification-3-line', 'Notifications', '', capabilities),
          navSettingsSubItem('/admin/settings/system', 'system', 'ri-server-line', 'System', 'pa-admin-only-item', capabilities),
        ].join('\n            '), capabilities)}
      </nav>
      </div>
    </aside>`;
}

/** Full sidebar markup for static HTML export scripts (super-admin view). */
export const SIDEBAR_INNER_HTML = buildSidebarInnerHtml(deriveAccessCapabilities('super_admin'));

export function sidebarAsideForBodyHtml() {
  return SIDEBAR_INNER_HTML
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}
