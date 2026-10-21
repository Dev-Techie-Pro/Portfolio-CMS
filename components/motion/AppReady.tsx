'use client';

import { useEffect } from 'react';

/** Toggles `html.is-ready` after first paint (Murmura app boot visibility). */
export function AppReady() {
  useEffect(() => {
    const mark = () => document.documentElement.classList.add('is-ready');
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(mark);
    } else {
      mark();
    }
  }, []);

  return null;
}
