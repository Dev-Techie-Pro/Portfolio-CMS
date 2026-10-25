'use client';

import { useEffect } from 'react';
import {
  mountSkillsExplorerGsap,
  teardownSkillsExplorerGsap,
  type SkillsExplorerGsapApi,
} from '@/lib/motion/portfolio/skills-explorer-gsap';

declare global {
  interface Window {
    __paMountSkillsExplorerGsap?: (api: SkillsExplorerGsapApi) => unknown;
    __paTeardownSkillsExplorerGsap?: (root?: HTMLElement | null) => void;
  }
}

export function useSkillsExplorerGsapBridge() {
  useEffect(() => {
    window.__paMountSkillsExplorerGsap = (api) => mountSkillsExplorerGsap(api);
    window.__paTeardownSkillsExplorerGsap = (root) => {
      if (root) {
        teardownSkillsExplorerGsap(root);
        return;
      }
      document.querySelectorAll<HTMLElement>('[data-cms-skills-layout="explorer"]').forEach((el) => {
        teardownSkillsExplorerGsap(el);
      });
    };

    return () => {
      window.__paTeardownSkillsExplorerGsap?.();
      delete window.__paMountSkillsExplorerGsap;
      delete window.__paTeardownSkillsExplorerGsap;
    };
  }, []);
}
