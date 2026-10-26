// @ts-nocheck
import { ICONS } from './icon-registry.js';
import {
  DEFAULT_PUBLIC_REMIX_ICON,
  getPublicThesvgUrl,
  isLocalSvgIconKey,
  isRemixIconClass,
  resolvePublicIconKey,
  resolvePublicSiteIcon,
} from '../../lib/portfolio/public-icon-resolve.js';

export const DEFAULT_TOOL_ICON = DEFAULT_PUBLIC_REMIX_ICON;
export const DEFAULT_CATEGORY_ICON = DEFAULT_PUBLIC_REMIX_ICON;

const LEGACY_ICON_KEYS = Object.keys(ICONS).sort((a, b) => a.localeCompare(b));

export function isRemixIconKey(key) {
  return isRemixIconClass(key);
}

export function isLegacyIconKey(key) {
  return !!(key && isLocalSvgIconKey(key) && ICONS[key]);
}

export function isRegistryIconKey(key) {
  const resolved = resolvePublicSiteIcon(key);
  return resolved.kind === 'thesvg';
}

export function listLegacyIconKeys() {
  return LEGACY_ICON_KEYS;
}

export function resolveIconKey(value, fallback = DEFAULT_TOOL_ICON) {
  return resolvePublicIconKey(value, fallback);
}

export function getIconSvg(key, fallback = DEFAULT_TOOL_ICON) {
  const resolved = resolvePublicSiteIcon(key, fallback);
  if (resolved.kind === 'localSvg') {
    return ICONS[resolved.key] || '';
  }
  return '';
}

export function getIconLabel(key, fallback = DEFAULT_TOOL_ICON) {
  return resolveIconKey(key, fallback);
}

export function renderIconHtml(key, { color, className = 'pa-svg-icon' } = {}) {
  const resolved = resolvePublicSiteIcon(key);
  const style = color ? ` style="color:${color}"` : '';
  const cls = className ? ` class="${className}"` : '';

  if (resolved.kind === 'remix') {
    return `<span${cls}${style} aria-hidden="true"><i class="${resolved.className}"></i></span>`;
  }

  if (resolved.kind === 'localSvg') {
    const svg = ICONS[resolved.key] || '';
    if (!svg) return '';
    return `<span${cls}${style} aria-hidden="true">${svg}</span>`;
  }

  if (resolved.kind === 'thesvg') {
    const src = getPublicThesvgUrl(resolved.slug);
    if (!src) return '';
    const imgStyle = color ? ` style="color:${color}"` : '';
    return `<span${cls}${style} aria-hidden="true"><img class="pa-svg-icon-img pa-brand-icon-img" src="${src}" alt="" loading="lazy" decoding="async"${imgStyle} /></span>`;
  }

  return '';
}

export function renderIconPreviewHtml(key, fallback = DEFAULT_TOOL_ICON) {
  return renderIconHtml(resolveIconKey(key, fallback), { className: 'pa-svg-icon pa-svg-icon--preview' });
}
