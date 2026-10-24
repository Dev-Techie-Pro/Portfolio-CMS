// @ts-nocheck
import { resolveStaffAppHref } from '../core/admin-base.js';

/**
 * Fix legacy dashboard HTML that omits the `/admin` prefix on in-app links.
 */
export function normalizeAdminDocumentLinks(root: ParentNode = document) {
  root.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href.includes('__PORTFOLIO_PUBLIC_URL__')) return;
    const fixed = resolveStaffAppHref(href);
    if (fixed) anchor.setAttribute('href', fixed);
  });
}
