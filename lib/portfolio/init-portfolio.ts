import type { PortfolioRoute } from "./script-config";

declare global {
  interface Window {
    Portfolio?: {
      SKELETON?: { init?: () => void };
      INTERACTIONS?: Record<string, (...args: unknown[]) => void>;
      ANIMATIONS?: Record<string, (...args: unknown[]) => void>;
      TEXTURES?: Record<string, (...args: unknown[]) => void>;
      PAGES?: { initByRoute?: () => void };
      COMPONENT_LOADER?: { mount?: (root?: Document) => void; reset?: () => void };
      CUSTOMIZE?: { init?: () => void; reapplySpeed?: () => void };
      ICONS?: { hydrateAll?: (root?: Document | Element) => void; init?: (root?: Document) => void };
      PROJECTS_PAGE?: { init?: () => void };
      PROJECT_DETAILS?: { init?: () => void };
      PROJECT_DETAILS_V2?: { init?: () => void };
      PROJECT_LINKS?: { init?: () => void };
      BLOGS_PAGE?: { init?: () => void };
      BLOG_LIST?: { init?: () => void };
      BLOG_DETAILS?: { init?: () => void; reset?: () => void };
      BLOG_LINKS?: { init?: () => void };
      TESTIMONIALS_PAGE?: { init?: () => void };
      CAROUSEL?: { init?: () => void };
      UTILS?: {
        resolveNavRouteFromLocation?: () => string;
        isNavLinkActive?: (href: string, route: string) => boolean;
      };
      __nextReset?: () => void;
    };
  }
}

export function resetPortfolioForNavigation() {
  if (typeof window === "undefined") return;

  window.Portfolio?.__nextReset?.();
  (window.Portfolio as { resetExperience?: () => void })?.resetExperience?.();
  window.Portfolio?.COMPONENT_LOADER?.reset?.();
  window.Portfolio?.BLOG_DETAILS?.reset?.();
  if (window.Portfolio?.BLOG_ENGAGEMENT) {
    window.Portfolio.BLOG_ENGAGEMENT._activeSlug = "";
  }

  document
    .querySelectorAll(".reveal.visible, .reveal-left.visible, .reveal-right.visible")
    .forEach((el) => el.classList.remove("visible"));
}

export function initPortfolioPage(route: PortfolioRoute) {
  if (typeof window === "undefined") return;
  const P = window.Portfolio;
  if (!P) return;

  P.SKELETON?.init?.();

  P.INTERACTIONS?.initSmoothScroll?.();

  if (document.querySelector(".ch-hero")) {
    P.INTERACTIONS?.initContactHero?.();
  }

  P.INTERACTIONS?.initTiltEffects?.();
  P.ANIMATIONS?.initScrollReveal?.();
  P.ANIMATIONS?.initCounters?.();
  P.ANIMATIONS?.initSkillBars?.();

  if (document.getElementById("contactForm")) {
    P.INTERACTIONS?.initContactPage?.();
  }

  P.TEXTURES?.initUniversalAnimations?.();
  P.PAGES?.initByRoute?.();

  P.COMPONENT_LOADER?.mount?.(document);
  P.CUSTOMIZE?.init?.();

  const navbar = document.querySelector(".navbar");
  const utils = P.UTILS;
  if (navbar && utils?.isNavLinkActive && utils?.resolveNavRouteFromLocation) {
    const activeRoute = utils.resolveNavRouteFromLocation();
    navbar.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const active = utils.isNavLinkActive!(href, activeRoute);
      link.classList.toggle("active", active);
      if (active) (link as HTMLElement).style.removeProperty("color");
    });
  }

  P.CUSTOMIZE?.reapplySpeed?.();
  P.ICONS?.hydrateAll?.(document);

  P.PROJECTS_PAGE?.init?.();
  P.PROJECT_DETAILS?.init?.();
  P.PROJECT_DETAILS_V2?.init?.();
  P.PROJECT_LINKS?.init?.();
  P.BLOG_LIST?.init?.();
  P.BLOG_DETAILS?.init?.();
  P.BLOG_LINKS?.init?.();
  P.BLOGS_PAGE?.init?.();
  P.TESTIMONIALS_PAGE?.init?.();
  void (P as { EXPERIENCE_CMS?: { hydrateAll?: () => Promise<void> } }).EXPERIENCE_CMS?.hydrateAll?.();
  P.CAROUSEL?.init?.();
  (window as unknown as { Portfolio?: { TICKER?: { initTickers?: () => void } } }).Portfolio?.TICKER?.initTickers?.();

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pa:public-page-ready', { detail: { route } }));
  }
}
