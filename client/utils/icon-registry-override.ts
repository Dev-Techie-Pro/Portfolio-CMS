// @ts-nocheck
import { escapeHtml } from './dom.js';

export const ICON_OVERRIDE_REMIX_PREFIX = '@remix:';
export const ICON_OVERRIDE_IMAGE_PREFIX = '@img:';

export type IconOverrideKind = 'svg' | 'remix' | 'image';

const REMIX_RE = /^ri-[a-z0-9][a-z0-9-]*$/;
const SVG_RE = /^\s*<svg[\s\S]*<\/svg>\s*$/i;

export function decodeIconOverride(stored: unknown): { kind: IconOverrideKind; value: string } {
  const s = String(stored ?? '').trim();
  if (s.startsWith(ICON_OVERRIDE_REMIX_PREFIX)) {
    return { kind: 'remix', value: s.slice(ICON_OVERRIDE_REMIX_PREFIX.length).trim() };
  }
  if (s.startsWith(ICON_OVERRIDE_IMAGE_PREFIX)) {
    return { kind: 'image', value: s.slice(ICON_OVERRIDE_IMAGE_PREFIX.length).trim() };
  }
  return { kind: 'svg', value: s };
}

export function encodeIconOverride(kind: IconOverrideKind, value: string): string {
  const v = String(value ?? '').trim();
  if (kind === 'remix') return `${ICON_OVERRIDE_REMIX_PREFIX}${v}`;
  if (kind === 'image') return `${ICON_OVERRIDE_IMAGE_PREFIX}${v}`;
  return v;
}

export function validateIconOverride(kind: IconOverrideKind, value: string): string | null {
  const v = String(value ?? '').trim();
  if (!v) return 'Icon content is required.';
  if (kind === 'remix') {
    if (!REMIX_RE.test(v)) return 'Remix icon must be a class like ri-code-line.';
    return null;
  }
  if (kind === 'image') {
    if (v.startsWith('javascript:') || v.startsWith('data:text/html')) return 'Invalid image URL.';
    if (!/^https?:\/\//i.test(v) && !v.startsWith('/')) {
      return 'Image URL must be absolute (https://…) or a site path (/…).';
    }
    return null;
  }
  if (!SVG_RE.test(v)) return 'SVG must be a single <svg>…</svg> element.';
  return null;
}

export function overrideTypeLabel(stored: unknown): string {
  const { kind } = decodeIconOverride(stored);
  if (kind === 'remix') return 'Remix icon';
  if (kind === 'image') return 'Image';
  return 'SVG';
}

export function renderStoredIconMarkup(stored: unknown, className = 'pa-svg-icon'): string {
  const { kind, value } = decodeIconOverride(stored);
  if (!value) return '';
  const cls = className ? ` class="${escapeHtml(className)}"` : '';

  if (kind === 'remix') {
    return `<span${cls} aria-hidden="true"><i class="${escapeHtml(value)}"></i></span>`;
  }
  if (kind === 'image') {
    const src = escapeHtml(value);
    return `<img class="pa-site-icon-img ${escapeHtml(className)}" src="${src}" alt="" loading="lazy" decoding="async" />`;
  }
  if (SVG_RE.test(value)) {
    return `<span${cls} aria-hidden="true">${value}</span>`;
  }
  return '';
}
