// @ts-nocheck
import { moveSegmentPill } from '../../lib/motion/segment-pill.js';

const BOUND = 'data-pa-seg-pill-bound';

function ensurePill(track: HTMLElement) {
  let pill = track.querySelector<HTMLElement>('.seg__pill');
  if (!pill) {
    pill = document.createElement('span');
    pill.className = 'seg__pill';
    pill.setAttribute('aria-hidden', 'true');
    track.prepend(pill);
  }
  track.classList.add('seg');
  return pill;
}

function activeButton(track: HTMLElement) {
  return track.querySelector<HTMLElement>('.pa-view-btn.active') ?? track.querySelector<HTMLElement>('.pa-view-btn');
}

function syncTrack(track: HTMLElement, animate = false) {
  const btn = activeButton(track);
  if (!btn) return;
  const pill = ensurePill(track);
  moveSegmentPill(pill, track, btn, animate);
}

function bindTrack(track: HTMLElement) {
  if (track.getAttribute(BOUND) === '1') return;
  track.setAttribute(BOUND, '1');
  syncTrack(track, false);

  track.addEventListener('click', (e) => {
    const target = e.target instanceof HTMLElement ? e.target.closest('.pa-view-btn') : null;
    if (!target || !track.contains(target)) return;
    requestAnimationFrame(() => syncTrack(track, true));
  });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => syncTrack(track, false));
    ro.observe(track);
  }
}

export function initSegmentPills(root: ParentNode = document) {
  root
    .querySelectorAll<HTMLElement>(
      '.pa-view-toggle:not(.pa-system-section-toggle):not([data-pa-seg-pill="off"])',
    )
    .forEach(bindTrack);
}
