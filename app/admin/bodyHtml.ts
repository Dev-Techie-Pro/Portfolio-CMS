// @ts-nocheck
import { BODY_HTML_PREFIX, BODY_HTML_SUFFIX } from './bodyHtmlParts';
import { getPortfolioPublicBaseUrl } from '@/lib/site-url';

const PORTFOLIO_PUBLIC_URL = getPortfolioPublicBaseUrl();

/** Quick-add and add-user panels are appended server-side when allowed (`StaffLegacyBody`). */
export const BODY_HTML = (BODY_HTML_PREFIX + BODY_HTML_SUFFIX).replaceAll(
  '__PORTFOLIO_PUBLIC_URL__',
  PORTFOLIO_PUBLIC_URL,
);
