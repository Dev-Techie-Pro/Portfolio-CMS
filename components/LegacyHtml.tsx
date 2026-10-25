'use client';


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

/** Injects legacy page HTML. Route key forces a clean swap on client navigation. */
type LegacyHtmlProps = { html: string };

export default function LegacyHtml({ html }: LegacyHtmlProps) {
  const pageKey = legacyPageKey(html);

  return (
    <div
      key={pageKey}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
