"use client";

type PortfolioHtmlContentProps = {
  page: string;
  html: string;
  className?: string;
};

/**
 * Legacy portfolio markup via dangerouslySetInnerHTML.
 * suppressHydrationWarning avoids false positives when browsers normalize
 * boolean attributes (e.g. data-mobile-nav-root vs data-mobile-nav-root="").
 */
export function PortfolioHtmlContent({
  page,
  html,
  className,
}: PortfolioHtmlContentProps) {
  return (
    <div
      data-portfolio-page={page}
      className={className}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
