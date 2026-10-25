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
  (window as Window & { __paTeardownSkillsExplorerGsap?: (root?: HTMLElement | null) => void })
    .__paTeardownSkillsExplorerGsap?.();
  const skillsExplorerEl = document.querySelector<HTMLElement>('[data-cms-skills-layout="explorer"]');
  if (skillsExplorerEl) {
    (window.Portfolio as { SKILLS_EXPLORER?: { teardown?: (el: HTMLElement) => void } })?.SKILLS_EXPLORER?.teardown?.(
      skillsExplorerEl,
    );
  }
  (window.Portfolio as { resetExperience?: () => void })?.resetExperience?.();
  (window.Portfolio as { EXP_CARDS?: { teardown?: (el?: Element) => void } })?.EXP_CARDS?.teardown?.();
  window.Portfolio?.COMPONENT_LOADER?.reset?.();
  window.Portfolio?.BLOG_DETAILS?.reset?.();
  if (window.Portfolio?.BLOG_ENGAGEMENT) {
    window.Portfolio.BLOG_ENGAGEMENT._activeSlug = "";
  }

  document
    .querySelectorAll(".reveal.visible, .reveal-left.visible, .reveal-right.visible")
    .forEach((el) => el.classList.remove("visible"));
}

function redirectPublicAuthLandingFromHash() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.pathname.startsWith("/auth/callback")) return;
  const hash = url.hash.replace(/^#/, "");
  if (!hash) return;
  const params = new URLSearchParams(hash);
  if (
    params.get("access_token")
    || params.get("refresh_token")
    || params.get("error")
    || params.get("message")
    || params.get("type")
  ) {
    window.location.replace(`/auth/callback${url.search}${url.hash}`);
  }
}

export async function initPortfolioPage(route: PortfolioRoute) {
  if (typeof window === "undefined") return;
  redirectPublicAuthLandingFromHash();
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
  const experienceCms = (P as { EXPERIENCE_CMS?: { hydrateAll?: () => Promise<void> } }).EXPERIENCE_CMS;
  if (document.querySelector("[data-cms-experience]") && experienceCms?.hydrateAll) {
    await experienceCms.hydrateAll();
  }

  const skillsCms = (P as { SKILLS_CMS?: { hydrateAll?: () => Promise<void> } }).SKILLS_CMS;
  if (document.querySelector("[data-cms-skills-grid]") && skillsCms?.hydrateAll) {
    await skillsCms.hydrateAll();
  }

  const socialCms = (P as { SOCIAL_CMS?: { hydrateAll?: () => Promise<void> } }).SOCIAL_CMS;
  if (document.querySelector(".footer-social-list") && socialCms?.hydrateAll) {
    await socialCms.hydrateAll();
  }

  const contactCms = (P as { CONTACT_CMS?: { hydrateAll?: () => Promise<void> } }).CONTACT_CMS;
  if (contactCms?.hydrateAll) {
    await contactCms.hydrateAll();
  }

  P.CAROUSEL?.init?.();
  (window as unknown as { Portfolio?: { TICKER?: { initTickers?: () => void } } }).Portfolio?.TICKER?.initTickers?.();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pa:public-page-ready", { detail: { route } }));
  }
}
