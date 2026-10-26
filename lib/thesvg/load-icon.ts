// @ts-nocheck
import 'server-only';

import { isThesvgSlug } from './slug.js';

const VARIANT_RE = /^[a-z][a-z0-9]*$/;

export function normalizeThesvgVariant(variant: string): string {
  const v = String(variant || 'default').trim();
  if (!v || !VARIANT_RE.test(v)) return 'default';
  return v;
}

/**
 * Load raw SVG markup for a theSVG slug from the installed `thesvg` package.
 */
export async function loadThesvgSvg(slug: string, variant = 'default'): Promise<string | null> {
  if (!isThesvgSlug(slug)) return null;
  const v = normalizeThesvgVariant(variant);

  try {
    const mod = await import(`thesvg/${slug}`);
    const icon = mod?.default ?? mod;
    if (!icon || typeof icon !== 'object') return null;
    const variants = icon.variants;
    if (variants && typeof variants === 'object' && variants[v]) {
      return String(variants[v]);
    }
    if (v === 'default' && icon.svg) return String(icon.svg);
    return null;
  } catch {
    return null;
  }
}
