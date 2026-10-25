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

const PICKER_ID = 'paSocialPlatformPicker';

function ensurePlatformPicker() {
  let overlay = document.getElementById(PICKER_ID);
  if (overlay) return overlay;

  const optionsHtml = PROFILE_SOCIAL_PLATFORM_OPTIONS.map(
    (opt) => `<button type="button" class="pa-social-platform-option" data-platform="${escapeHtml(opt.id)}" title="${escapeHtml(opt.label)}">
      <i class="${escapeHtml(opt.iconClass)}" aria-hidden="true"></i>
      <span>${escapeHtml(opt.label)}</span>
    </button>`,
  ).join('');

  overlay = document.createElement('div');
  overlay.id = PICKER_ID;
  overlay.className = 'pa-modal-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<div class="pa-modal pa-social-platform-modal" role="dialog" aria-modal="true" aria-labelledby="paSocialPlatformPickerTitle">
    <div class="pa-modal-header">
      <h3 class="pa-modal-title" id="paSocialPlatformPickerTitle">Choose social icon</h3>
      <button type="button" class="pa-modal-close" data-close aria-label="Close"><i class="ri-close-line"></i></button>
    </div>
    <div class="pa-social-platform-grid">${optionsHtml}</div>
  </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * @returns {Promise<{ platform: string, iconClass?: string } | null>}
 */
export function openSocialPlatformPicker({ returnFocus } = {}) {
  const overlay = ensurePlatformPicker();
  const modal = overlay.querySelector('.pa-modal');

  return new Promise((resolve) => {
    const finish = (value) => {
      overlay.hidden = true;
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onKeydown);
      resolve(value);
      if (returnFocus && typeof returnFocus.focus === 'function') {
        returnFocus.focus();
      }
    };

    const onOverlayClick = (e) => {
      if (e.target === overlay || e.target.closest('[data-close]')) {
        finish(null);
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
      if (e.key === 'Escape') finish(null);
    };

    overlay.hidden = false;
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydown);
    modal?.querySelector('[data-close]')?.focus();
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
