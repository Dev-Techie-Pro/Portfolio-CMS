'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import type gsap from 'gsap';
import { gsap as gsapClient } from '@/lib/gsap/client';

type EnterFn = (root: HTMLElement, ctx: { sameRoute: boolean }) => gsap.core.Timeline | void;

export function usePageEnter(enter: EnterFn, deps: unknown[] = []) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      tlRef.current?.kill();
      const tl = enter(root, { sameRoute: false });
      if (tl) tlRef.current = tl;

      return () => {
        tlRef.current?.kill();
        tlRef.current = null;
      };
    },
    { dependencies: deps, scope: rootRef },
  );

  return rootRef;
}

export { gsapClient as gsap };
