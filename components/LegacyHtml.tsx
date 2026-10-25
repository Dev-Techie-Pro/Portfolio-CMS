'use client';

import { useLayoutEffect, useRef } from 'react';

/** Stable key so React remounts legacy markup on client-side route changes. */
export function legacyPageKey(html: string): string {
  if (html.includes('id="paBody"') && html.includes('pa-dash-stats-grid')) {
    return 'dashboard';
  }
  if (html.includes('id="paActBody"')) {
    return 'recent-activities';
  }
  const panel = html.match(
    /id="(pa(?:Tech|Project|Cat|Media|Blog|Exp|Tool|Settings|Msg|Contact|Dash)[^"]*)"/,
  );
  return panel?.[1] ?? `legacy-${html.length}`;
}

/**
 * Legacy admin HTML is injected client-side only so React does not hydrate
 * large HTML strings (avoids minified error #418).
 */
type LegacyHtmlProps = { html: string };

export default function LegacyHtml({ html }: LegacyHtmlProps) {
  const pageKey = legacyPageKey(html);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    el.innerHTML = html;
  }, [html, pageKey]);

  return <div ref={hostRef} key={pageKey} suppressHydrationWarning />;
}
