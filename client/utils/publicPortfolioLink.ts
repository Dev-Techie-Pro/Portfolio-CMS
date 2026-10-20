// @ts-nocheck
/** Keep “View Public Portfolio” on the current site origin (or external portfolio when configured). */
export function syncPublicPortfolioLinks() {
  const meta = document.querySelector('meta[name="pa-public-portfolio-href"]');
  const configured = meta?.getAttribute('content')?.trim();
  const href =
    configured && configured !== '/'
      ? configured
      : '/';

  const selectors = [
    '#paViewPublicPortfolioBtn',
    'a.pa-view-public-portfolio',
    'a[data-nav="View Public Portfolio"]',
  ].join(',');

  document.querySelectorAll(selectors).forEach((el) => {
    if (el instanceof HTMLAnchorElement) {
      el.href = href;
    }
  });
}
