// @ts-nocheck
import { ICONS } from './icon-registry.js';

export const DEFAULT_TOOL_ICON = 'ri-tools-line';
export const DEFAULT_CATEGORY_ICON = 'ri-tools-line';

const LEGACY_ICON_KEYS = Object.keys(ICONS).sort((a, b) => a.localeCompare(b));
const REMIX_ICON_RE = /^ri-[a-z0-9][a-z0-9-]*$/;

export function isRemixIconKey(key) {
  return !!(key && REMIX_ICON_RE.test(key));
}

export function isLegacyIconKey(key) {
  return !!(key && ICONS[key]);
}

/** @deprecated Kept for callers; always false now that theSVG slugs are unsupported. */
export function isRegistryIconKey(_key) {
  return false;
}

export function listLegacyIconKeys() {
  return LEGACY_ICON_KEYS;
}

export function resolveIconKey(value, fallback = DEFAULT_TOOL_ICON) {
  if (value && (isRemixIconKey(value) || isLegacyIconKey(value))) {
    return value;
  }
  if (fallback && (isRemixIconKey(fallback) || isLegacyIconKey(fallback))) {
    return fallback;
  }
  return DEFAULT_TOOL_ICON;
}

export function getIconSvg(key, fallback = DEFAULT_TOOL_ICON) {
  const resolved = resolveIconKey(key, fallback);
  return ICONS[resolved] || '';
}

export function getIconLabel(key, fallback = DEFAULT_TOOL_ICON) {
  const resolved = resolveIconKey(key, fallback);
  return resolved;
}

export function renderIconHtml(key, { color, className = 'pa-svg-icon' } = {}) {
  const resolved = resolveIconKey(key);
  const style = color ? ` style="color:${color}"` : '';
  const cls = className ? ` class="${className}"` : '';

  if (isRemixIconKey(resolved)) {
    return `<span${cls}${style} aria-hidden="true"><i class="${resolved}"></i></span>`;
  }

  const svg = ICONS[resolved] || '';
  if (!svg) return '';
  return `<span${cls}${style} aria-hidden="true">${svg}</span>`;
}

export function renderIconPreviewHtml(key, fallback = DEFAULT_TOOL_ICON) {
  return renderIconHtml(resolveIconKey(key, fallback), { className: 'pa-svg-icon pa-svg-icon--preview' });
}
