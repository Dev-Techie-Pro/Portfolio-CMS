import { Preloader } from "../components/preloader.js";
import { Cursor } from "../components/cursor.js";
import { BackToTop } from "../components/back-to-top.js";
import { AppearancePanel } from "../components/appearance-panel.js";
import { MobileNav } from "../components/mobile-nav.js";
import { Navbar } from "../components/navbar.js";
import { LegacyMobileMenu } from "../components/legacy-mobile-menu.js";

const COMPONENTS = [
  Preloader,
  Cursor,
  BackToTop,
  AppearancePanel,
  MobileNav,
  Navbar,
  LegacyMobileMenu,
];

let initialized = false;

function resetComponentLoader() {
  initialized = false;
}

function depsReady() {
  return Boolean(
    window.Portfolio?.UTILS?.getActivePage &&
    window.Portfolio?.CUSTOMIZE?.init,
  );
}

export {
  Preloader,
  Cursor,
  BackToTop,
  AppearancePanel,
  MobileNav,
  Navbar,
  LegacyMobileMenu,
};

export function mountGlobalComponents(root = document) {
  if (initialized) return;
  if (!root?.body) {
    console.warn(
      "[Portfolio.COMPONENT_LOADER] DOM body is not ready; mount skipped.",
    );
    return;
  }
  if (!depsReady()) return;

  initialized = true;

  const Portfolio = (window.Portfolio = window.Portfolio || {});
  Portfolio.ICONS?.init?.(root);
  Portfolio.COMPONENT_LOADER = {
    mount: mountGlobalComponents,
    reset: resetComponentLoader,
    components: COMPONENTS,
  };

  COMPONENTS.forEach((Component) => {
    try {
      Component.mount(root);
    } catch (error) {
      console.error(
        `[Portfolio.COMPONENT_LOADER] Failed to mount ${Component.name}.`,
        error,
      );
    }
  });
}

function boot() {
  const attempt = () => {
    mountGlobalComponents();
    if (!initialized) requestAnimationFrame(attempt);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attempt, { once: true });
    return;
  }
  attempt();
}

Portfolio.__nextReset = resetComponentLoader;

boot();
