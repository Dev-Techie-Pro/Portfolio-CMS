// @ts-nocheck
import { escapeHtml } from '../../../utils/dom.js';
import { timeAgo } from '../../../utils/format.js';
import { showToast } from '../../shell/toast.js';
import { requestBulkAction } from '../../shell/confirm.js';
import { getAccessCapabilities } from '../../../core/access.js';

const DEFAULT_DURATION_HOURS = 3;

function formatRole(role) {
  return String(role || 'viewer').replace(/_/g, ' ');
}

/**
 * @typedef {{ destroy: () => void, refresh: () => Promise<void> }} AccessWidgetHandle
 */

/**
 * @returns {AccessWidgetHandle | null}
 */
export function mountAccessRequestsWidget() {
  const caps = getAccessCapabilities();
  if (!caps.isAdmin) return null;

  const widget = document.getElementById('paDashAccessWidget');
  const list = document.getElementById('paDashAccessList');
  const empty = document.getElementById('paDashAccessEmpty');
  const badge = document.getElementById('paDashAccessBadge');
  const skeleton = document.getElementById('paDashAccessSkeleton');
  if (!widget || !list) return null;

  widget.removeAttribute('hidden');

  let items = [];

  async function fetchPending() {
    skeleton?.removeAttribute('hidden');
    empty?.setAttribute('hidden', '');
    list.innerHTML = '';
    try {
      const res = await fetch(
        `/api/admin/access-requests?status=pending&limit=8`,
        { credentials: 'include', headers: { Accept: 'application/json' } },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load requests.');
      items = Array.isArray(data.items)
        ? data.items.filter((i) => i.status === 'pending')
        : [];
      const pendingCount = data.pendingCount ?? items.length;
      if (badge) {
        if (pendingCount > 0) {
          badge.textContent = String(pendingCount);
          badge.removeAttribute('hidden');
        } else {
          badge.setAttribute('hidden', '');
        }
      }
    } catch (err) {
      showToast(err?.message || 'Could not load access requests.', 'danger');
      items = [];
    } finally {
      skeleton?.setAttribute('hidden', '');
      render();
    }
  }

  function render() {
    if (!items.length) {
      list.innerHTML = '';
      empty?.removeAttribute('hidden');
      return;
    }
    empty?.setAttribute('hidden', '');
    list.innerHTML = items.map((item) => renderRow(item)).join('');
  }

  function renderRow(item) {
    const name = escapeHtml(item.requesterName || item.requesterEmail || 'Staff');
    const email = escapeHtml(item.requesterEmail || item.contactEmail || '');
    const role = formatRole(item.requesterRole);
    const msg = escapeHtml((item.message || '').slice(0, 120));
    const when = escapeHtml(timeAgo(item.createdAt) || '');
    return `<article class="pa-dash-quick-item" data-access-id="${escapeHtml(item.id)}">
      <div class="pa-dash-quick-item-main">
        <div class="pa-dash-quick-item-title">${name}</div>
        <div class="pa-dash-quick-item-meta">${escapeHtml(role)} → <strong>editor</strong> · ${when}</div>
        ${email ? `<div class="pa-dash-quick-item-sub">${email}</div>` : ''}
        ${msg ? `<p class="pa-dash-quick-item-excerpt">${msg}${(item.message || '').length > 120 ? '…' : ''}</p>` : ''}
      </div>
      <div class="pa-dash-quick-item-actions">
        <button type="button" class="pa-btn pa-btn-primary pa-btn-sm" data-dash-access-approve="${escapeHtml(item.id)}" aria-label="Approve request from ${name}">
          <i class="ri-check-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" data-dash-access-reject="${escapeHtml(item.id)}" aria-label="Reject request from ${name}">
          <i class="ri-close-line" aria-hidden="true"></i>
        </button>
      </div>
    </article>`;
  }

  async function patchReview(id, action) {
    const payload = { action };
    if (action === 'approve') payload.durationHours = DEFAULT_DURATION_HOURS;
    const res = await fetch(`/api/admin/access-requests/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Request failed.');
  }

  function onListClick(e) {
    const approve = e.target.closest('[data-dash-access-approve]');
    const reject = e.target.closest('[data-dash-access-reject]');
    const id = approve?.getAttribute('data-dash-access-approve') ||
      reject?.getAttribute('data-dash-access-reject');
    if (!id) return;

    if (approve) {
      requestBulkAction({
        title: 'Approve temporary editor access?',
        message: `Grant <strong>editor</strong> access for <strong>${DEFAULT_DURATION_HOURS} hours</strong> (default). User management stays restricted.`,
        confirmLabel: 'Approve',
        danger: false,
        iconClass: 'ri-check-line',
        iconTone: 'warning',
        onConfirm: async () => {
          try {
            await patchReview(id, 'approve');
            showToast('Access approved.', 'success');
            await fetchPending();
          } catch (err) {
            showToast(err?.message || 'Could not approve.', 'danger');
          }
        },
      });
      return;
    }

    requestBulkAction({
      title: 'Reject access request?',
      message: 'The requester will be notified.',
      confirmLabel: 'Reject',
      iconClass: 'ri-close-circle-line',
      onConfirm: async () => {
        try {
          await patchReview(id, 'reject');
          showToast('Request rejected.', 'success');
          await fetchPending();
        } catch (err) {
          showToast(err?.message || 'Could not reject.', 'danger');
        }
      },
    });
  }

  list.addEventListener('click', onListClick);
  void fetchPending();

  return {
    refresh: fetchPending,
    destroy() {
      list.removeEventListener('click', onListClick);
      list.innerHTML = '';
    },
  };
}
