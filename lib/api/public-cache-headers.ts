import { PUBLIC_CACHE_MAX_AGE_SEC } from "@/lib/cms/server-cache";

/** CDN-friendly Cache-Control for public portfolio JSON APIs. */
export function publicJsonCacheControl(
  maxAgeSec = PUBLIC_CACHE_MAX_AGE_SEC.publicContent,
): string {
  const edge = Math.max(maxAgeSec * 2, 120);
  return `public, max-age=${maxAgeSec}, s-maxage=${edge}, stale-while-revalidate=600`;
}
