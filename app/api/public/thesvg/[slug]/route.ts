// @ts-nocheck
import { loadThesvgSvg, normalizeThesvgVariant } from '@/lib/thesvg/load-icon';
import { isThesvgSlug } from '@/lib/thesvg/slug';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(String(rawSlug || '').trim());
  if (!isThesvgSlug(slug)) {
    return new Response('Invalid icon slug', { status: 400 });
  }

  const url = new URL(_request.url);
  const variant = normalizeThesvgVariant(url.searchParams.get('variant') || 'default');
  const svg = await loadThesvgSvg(slug, variant);
  if (!svg) {
    return new Response('Icon not found', { status: 404 });
  }

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
