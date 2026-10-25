// @ts-nocheck
import { escapeHtml } from './dom.js';
import {
  PROFILE_SOCIAL_PLATFORM_OPTIONS,
  detectSocialPlatformFromUrl,
  parseProfileSocialLink,
  serializeProfileSocialLink,
  socialLinkIconClass,
} from '../../lib/profile/social-link-form.js';
import * as svgIconPicker from './SvgIconPicker.js';

const OVERLAY_ID = 'paSocialPlatformPicker';
const MODAL_ID = 'paSocialPlatformPickerModal';
const GRID_ID = 'paSocialPlatformPickerGrid';

let gridPopulated = false;

function mountOverlayOnBody(overlay) {
  if (!overlay) return;
  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }
}

function populatePlatformGrid() {
  if (gridPopulated) return;
  const grid = document.getElementById(GRID_ID);
  if (!grid) return;
  grid.innerHTML = PROFILE_SOCIAL_PLATFORM_OPTIONS.map(
    (opt) => `<button type="button" class="pa-social-platform-option" data-platform="${escapeHtml(opt.id)}" title="${escapeHtml(opt.label)}" role="option">
      <i class="${escapeHtml(opt.iconClass)}" aria-hidden="true"></i>
      <span>${escapeHtml(opt.label)}</span>
    </button>`,
  ).join('');
  gridPopulated = true;
}

function buildFallbackOverlay() {
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.className = 'pa-icon-picker-overlay';
  overlay.setAttribute('inert', '');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `<div class="pa-icon-picker-modal pa-social-platform-picker-modal" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="paSocialPlatformPickerTitle">
    <div class="pa-icon-picker-head">
      <h3 class="pa-icon-picker-title" id="paSocialPlatformPickerTitle">Choose social icon</h3>
      <button type="button" class="pa-icon-picker-close" data-close aria-label="Close"><i class="ri-close-line"></i></button>
    </div>
    <div class="pa-icon-picker-body pa-social-platform-picker-body">
      <div class="pa-social-platform-grid" id="${GRID_ID}" role="listbox" aria-label="Social platforms"></div>
    </div>
    <div class="pa-icon-picker-foot pa-icon-picker-footer">
      <button type="button" class="pa-btn pa-btn-cancel" data-close>Cancel</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  gridPopulated = false;
  return overlay;
}

function getOverlay() {
  let overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) overlay = buildFallbackOverlay();
  mountOverlayOnBody(overlay);
  populatePlatformGrid();
  return overlay;
}

function openOverlay(overlay) {
  overlay.removeAttribute('inert');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('visible');
}

function closeOverlay(overlay) {
  overlay.classList.remove('visible');
  overlay.setAttribute('aria-hidden', 'true');
  requestAnimationFrame(() => {
    if (!overlay.classList.contains('visible')) {
      overlay.setAttribute('inert', '');
    }
  });
}

/**
 * @returns {Promise<{ platform: string, iconClass?: string } | null>}
 */
export function openSocialPlatformPicker({ returnFocus } = {}) {
  const overlay = getOverlay();
  const modal = document.getElementById(MODAL_ID) || overlay.querySelector('.pa-icon-picker-modal');

  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      closeOverlay(overlay);
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onKeydown);
      resolve(value);
      if (returnFocus && typeof returnFocus.focus === 'function') {
        requestAnimationFrame(() => returnFocus.focus());
      }
    };

    const onOverlayClick = (e) => {
      if (e.target.closest('[data-close]')) {
        finish(null);
        return;
      }
      if (e.target === overlay) {
        finish(null);
        return;
      }
      const btn = e.target.closest('.pa-social-platform-option');
      if (!btn) return;
      const platform = btn.getAttribute('data-platform');
      if (platform === 'custom') {
        svgIconPicker.open({
          current: 'ri-link',
          defaultIcon: 'ri-link',
          returnFocus: btn,
          onSelect: (iconClass) => finish({ platform: 'custom', iconClass }),
        });
        return;
      }
      finish({ platform });
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        finish(null);
      }
    };

    openOverlay(overlay);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydown);
    overlay.querySelector('[data-close]')?.focus();
  });
}

export function ensureSocialIconButton(group) {
  if (!group) return null;
  let btn = group.querySelector('.pa-social-icon-btn');
  if (btn) return btn;

  const legacy = group.querySelector('.pa-social-icon');
  btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pa-social-icon pa-social-icon-btn';
  btn.setAttribute('aria-label', 'Choose social icon');
  if (legacy) {
    btn.innerHTML = legacy.innerHTML || '<i class="ri-link" aria-hidden="true"></i>';
    legacy.replaceWith(btn);
  } else {
    btn.innerHTML = '<i class="ri-link" aria-hidden="true"></i>';
    const input = group.querySelector('.pa-form-input');
    group.insertBefore(btn, input || group.firstChild);
  }
  return btn;
}

export function applySocialLinkToGroup(group, record) {
  if (!group) return;
  const parsed = record ? serializeProfileSocialLink(record) : null;
  const input = group.querySelector('.pa-form-input');
  const platform = parsed?.platform || 'auto';
  const iconClass = socialLinkIconClass(
    platform,
    parsed?.iconClass,
  );

  group.dataset.socialPlatform = platform;
  if (parsed?.iconClass) group.dataset.socialIcon = parsed.iconClass;
  else delete group.dataset.socialIcon;

  if (input && parsed?.url) input.value = parsed.url;

  const btn = ensureSocialIconButton(group);
  if (btn) btn.innerHTML = `<i class="${escapeHtml(iconClass)}" aria-hidden="true"></i>`;
}

export function readSocialLinkFromGroup(group) {
  const input = group.querySelector('.pa-form-input');
  const url = input?.value?.trim() || '';
  if (!url) return null;

  let platform = group.dataset.socialPlatform || 'auto';
  let iconClass = group.dataset.socialIcon || '';

  if (platform === 'auto') {
    platform = detectSocialPlatformFromUrl(url);
  }

  return serializeProfileSocialLink({
    url,
    platform,
    ...(iconClass ? { iconClass } : {}),
  });
}

export function syncSocialIconFromUrl(group) {
  if (!group) return;
  const platform = group.dataset.socialPlatform || 'auto';
  if (platform !== 'auto') return;
  const input = group.querySelector('.pa-form-input');
  const url = input?.value?.trim() || '';
  const detected = detectSocialPlatformFromUrl(url);
  group.dataset.socialPlatform = detected;
  const btn = ensureSocialIconButton(group);
  if (btn) {
    btn.innerHTML = `<i class="${escapeHtml(socialLinkIconClass(detected))}" aria-hidden="true"></i>`;
  }
}

export function parseStoredSocialLinks(links) {
  if (!Array.isArray(links)) return [];
  return links.map((raw) => parseProfileSocialLink(raw)).filter(Boolean);
}
