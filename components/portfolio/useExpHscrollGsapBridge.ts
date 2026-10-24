'use client';

import { useEffect } from 'react';
import {
  animateExpTimelineIndicator,
  mountExpHscrollGsap,
  refreshExpHscrollGsap,
  registerExpHscrollApi,
  scrollExpHscrollSectionToIndex,
  syncExpHscrollSectionActive,
  teardownExpHscrollGsap,
  type ExpHscrollMountApi,
} from '@/lib/motion/portfolio/exp-hscroll-gsap';

declare global {
  interface Window {
    __paExpHscrollUseGsap?: boolean;
    __paMountExpHscrollGsap?: (api: ExpHscrollMountApi) => unknown;
    __paExpHscrollScrollTo?: (
      section: HTMLElement,
      index: number,
      onComplete?: () => void,
    ) => void;
    __paExpHscrollAnimateIndicator?: (
      indicator: HTMLElement,
      track: HTMLElement,
      card: HTMLElement,
    ) => void;
    __paTeardownExpHscrollGsap?: (section: HTMLElement) => void;
    __paExpHscrollSyncActive?: (section: HTMLElement) => void;
    Portfolio?: { EXP_CARDS?: { init?: () => void } };
  }
}

export function useExpHscrollGsapBridge() {
  useEffect(() => {
    window.__paExpHscrollUseGsap = true;
    window.__paMountExpHscrollGsap = (api) => {
      registerExpHscrollApi(api.section, api);
      api.section.dataset.expGsapDriver = '1';
      return mountExpHscrollGsap(api);
    };
    window.__paExpHscrollScrollTo = (section, index, onComplete) => {
      scrollExpHscrollSectionToIndex(section, index, onComplete);
    };
    window.__paExpHscrollAnimateIndicator = (indicator, track, card) => {
      animateExpTimelineIndicator(indicator, track, card);
    };
    window.__paTeardownExpHscrollGsap = (section) => {
      teardownExpHscrollGsap(section);
    };
    window.__paExpHscrollSyncActive = (section) => {
      syncExpHscrollSectionActive(section);
    };

    const refresh = () => {
      refreshExpHscrollGsap();
      window.Portfolio?.EXP_CARDS?.init?.();
    };

    window.addEventListener('pa:public-page-ready', refresh);
    refresh();

    return () => {
      window.__paExpHscrollUseGsap = false;
      delete window.__paMountExpHscrollGsap;
      delete window.__paExpHscrollScrollTo;
      delete window.__paExpHscrollAnimateIndicator;
      delete window.__paExpHscrollSyncActive;
      document.querySelectorAll<HTMLElement>('.exp-work--hscroll').forEach((section) => {
        delete section.dataset.expGsapDriver;
        teardownExpHscrollGsap(section);
      });
      window.removeEventListener('pa:public-page-ready', refresh);
    };
  }, []);
}
