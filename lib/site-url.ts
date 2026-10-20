// @ts-nocheck
/**
 * Canonical public origin for links in emails and notifications.
 * Prefer NEXT_PUBLIC_SITE_URL; fall back to proxy headers (Vercel, etc.).
 */
export function getSiteUrl(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  const origin = request.headers.get('origin')?.trim()?.replace(/\/$/, '');
  if (origin) return origin;

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (host) {
    const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'https';
    return `${proto}://${host}`.replace(/\/$/, '');
  }

  return 'http://localhost:3000';
}

export function getSiteUrlFromEnv() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim()?.replace(/\/$/, '') || 'http://localhost:3000';
}

/** When the public portfolio is on a different origin than this admin app (split deploy / CORS). */
export function getExplicitPortfolioPublicUrl(): string | null {
  const fromList = process.env.PORTFOLIO_PUBLIC_ORIGINS?.split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);
  if (fromList?.[0]) return fromList[0];
  const single = process.env.NEXT_PUBLIC_PORTFOLIO_URL?.trim()?.replace(/\/$/, '');
  if (single) return single;
  return null;
}

function readOriginFromHeaders(headerStore: Headers): string | null {
  const origin = headerStore.get('origin')?.trim()?.replace(/\/$/, '');
  if (origin) return origin;

  const hostHeader =
    headerStore.get('x-forwarded-host')
    || headerStore.get('x-vercel-forwarded-host')
    || headerStore.get('host');
  if (!hostHeader) return null;

  const host = hostHeader.split(',')[0]?.trim();
  if (!host) return null;

  const hostname = host.split(':')[0].toLowerCase();
  const isLocal =
    hostname === 'localhost'
    || hostname === '127.0.0.1'
    || hostname.endsWith('.localhost');

  const proto =
    headerStore.get('x-forwarded-proto')?.split(',')[0]?.trim()
    || (isLocal ? 'http' : 'https');
  return `${proto}://${host}`.replace(/\/$/, '');
}

/** Current request origin (ignores NEXT_PUBLIC_SITE_URL). */
export function getRequestPublicOrigin(request: Request): string {
  return readOriginFromHeaders(request.headers) ?? getSiteUrlFromEnv();
}

/**
 * Admin “View Public Portfolio” href.
 * Unified deploy: `/` (browser resolves to current host — localhost, Vercel, custom domain).
 * Split deploy: full URL when portfolio env origin differs from this request.
 */
export function getAdminViewPortfolioHref(headerStore: Headers): string {
  const requestOrigin = readOriginFromHeaders(headerStore);
  const explicit = getExplicitPortfolioPublicUrl();

  if (explicit) {
    if (requestOrigin) {
      try {
        const explicitHost = new URL(explicit).host;
        const requestHost = new URL(requestOrigin).host;
        if (explicitHost !== requestHost) return explicit.replace(/\/$/, '');
      } catch {
        return explicit.replace(/\/$/, '');
      }
    } else {
      return explicit.replace(/\/$/, '');
    }
  }

  return '/';
}

/** @deprecated Use getAdminViewPortfolioHref */
export function getAdminViewPortfolioUrlFromHeaders(headerStore: Headers): string {
  const href = getAdminViewPortfolioHref(headerStore);
  if (href === '/') {
    const origin = readOriginFromHeaders(headerStore);
    return origin ?? getSiteUrlFromEnv();
  }
  return href;
}

/** Base URL for portfolio-facing links (sitemap/RSS). */
export function getPortfolioPublicBaseUrl() {
  const explicit = getExplicitPortfolioPublicUrl();
  if (explicit) return explicit;
  return getSiteUrlFromEnv();
}

/** Normalize optional runtime / request-derived portfolio URL for admin shell links. */
export function resolvePublicPortfolioUrl(url?: string | null): string {
  const raw = url?.trim();
  if (raw === '/') return '/';
  const trimmed = raw?.replace(/\/$/, '');
  if (trimmed) return trimmed;
  return '/';
}
