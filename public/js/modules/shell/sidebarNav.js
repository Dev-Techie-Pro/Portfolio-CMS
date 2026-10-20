import { getSettingsTabFromPath } from "../../core/router.js";
import { syncSidebarGroupNav } from "./sidebarGroupNav.js";
import { syncSidebarRailActive } from "./sidebarRailNav.js";
const NAV_BY_PATH = [
  ["/admin/tool-categories", "Tool Categories"],
  ["/admin/recent-activities", "Recent Activities"],
  ["/admin/access-requests", "Access Requests"],
  ["/admin/users", "Users"],
  ["/admin/contact-messages", "Contact Messages"],
  ["/admin/media-library", "Media Library"],
  ["/admin/technologies", "Technologies"],
  ["/admin/blog-categories", "Blog Categories"],
  ["/admin/project-categories", "Project Categories"],
  ["/admin/categories", "Project Categories"],
  ["/admin/project-technologies", "Project Technologies"],
  ["/admin/project-tags", "Project Tags"],
  ["/admin/blog-tags", "Blog Tags"],
  ["/admin/blog-engagement", "Comments & Likes"],
  ["/admin/blog-post", "Blog Posts"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/experience", "Experience"],
  ["/admin/faqs", "FAQs"],
  ["/admin/tags", "Project Tags"],
  ["/admin/projects", "Projects"],
  ["/admin/settings", "Settings"],
  ["/admin/tools", "Tools"]
];
const NAV_BY_PATH_SORTED = [...NAV_BY_PATH].sort((a, b) => b[0].length - a[0].length);
function resolveActiveNav(path = window.location.pathname) {
  if (path === "/admin" || path === "/admin/" || path === "/" || path === "") return "Dashboard";
  for (const [needle, label] of NAV_BY_PATH_SORTED) {
    if (path.includes(needle)) return label;
  }
  return null;
}
function syncSidebarActiveNav() {
  const active = resolveActiveNav();
  if (!active) return;
  document.querySelectorAll(".pa-nav-subitem[data-nav]").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === active);
  });
  if (active === "Settings" && window.location.pathname.includes("/admin/settings")) {
    const tab = getSettingsTabFromPath();
    document.querySelectorAll(".pa-nav-subitem[data-settings-tab]").forEach((item) => {
      item.classList.toggle("active", item.dataset.settingsTab === tab);
    });
  } else {
    document.querySelectorAll(".pa-nav-subitem[data-settings-tab]").forEach((item) => {
      item.classList.remove("active");
    });
  }
  syncSidebarGroupNav();
  syncSidebarRailActive();
}
let sidebarNavBound = false;
function bindSidebarPrefetch() {
  const warm = typeof window.__paWarmPrefetchPath === "function" ? window.__paWarmPrefetchPath : null;
  if (!warm) return;
  document.querySelectorAll(".pa-nav-subitem[href], .pa-logo-link[href]").forEach((link) => {
    link.addEventListener("pointerenter", () => {
      const href = link.getAttribute("href");
      if (href) warm(href);
    }, { passive: true });
  });
}
function initSidebarNav() {
  syncSidebarActiveNav();
  if (!sidebarNavBound) {
    window.addEventListener("popstate", syncSidebarActiveNav);
    bindSidebarPrefetch();
    sidebarNavBound = true;
  }
}
function syncSettingsNavTab(tab) {
  if (window.location.pathname.includes("/admin/settings")) {
    syncSidebarActiveNav();
  }
}
export {
  initSidebarNav,
  resolveActiveNav,
  syncSettingsNavTab,
  syncSidebarActiveNav
};
//# sourceMappingURL=sidebarNav.js.map
