// @ts-nocheck
import { escapeHtml } from '../../../utils/dom.js';
import { timeAgo } from '../../../utils/format.js';
import { showToast } from '../../shell/toast.js';
import { requestBulkAction } from '../../shell/confirm.js';
import { getAccessCapabilities } from '../../../core/access.js';

const DEFAULT_DURATION_HOURS = 3;

function formatRoleLabel(role) {
  return String(role || 'viewer').replace(/_/g, ' ');
}

function roleInitials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function setPendingBadge(badge, count) {
  if (!badge) return;
  const n = Math.max(0, Number(count) || 0);
  if (n > 0) {
    badge.textContent = `${n} pending`;
    badge.removeAttribute('hidden');
  } else {
    badge.setAttribute('hidden', '');
  }
}

function requestedRoleLabel(item) {
  const explicit = item.requestedRole || item.requested_role;
  if (explicit) return formatRoleLabel(explicit);
  return 'editor';
}

/**
 * @returns {{ destroy: () => void, refresh: () => Promise<void> }} | null
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
      setPendingBadge(badge, pendingCount);
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
    const rawName = item.requesterName || item.requesterEmail || 'Staff';
    const name = escapeHtml(rawName);
    const email = escapeHtml(item.requesterEmail || item.contactEmail || '');
    const fromRole = formatRoleLabel(item.roleBeforeElevation || item.requesterRole);
    const toRole = requestedRoleLabel(item);
    const when = escapeHtml(timeAgo(item.createdAt) || '');
    const init = escapeHtml(roleInitials(rawName));
    const id = escapeHtml(item.id);

    return `<article class="pa-dash-role-item" data-access-id="${id}">
      <div class="pa-dash-role-item-avatar" aria-hidden="true">${init}</div>
      <div class="pa-dash-role-item-body">
        <div class="pa-dash-role-item-name">${name}</div>
        ${email ? `<div class="pa-dash-role-item-email">${email}</div>` : ''}
        <div class="pa-dash-role-item-change">
          <span class="pa-dash-role-tag pa-dash-role-tag--from">${escapeHtml(fromRole)}</span>
          <span class="pa-dash-role-item-to">to</span>
          <span class="pa-dash-role-tag pa-dash-role-tag--to">${escapeHtml(toRole)}</span>
          <span class="pa-dash-role-item-time">${when}</span>
        </div>
      </div>
      <div class="pa-dash-role-item-actions">
        <button type="button" class="pa-dash-role-approve" data-dash-access-approve="${id}" aria-label="Approve request from ${name}">
          <i class="ri-check-line" aria-hidden="true"></i>
          Approve
        </button>
        <button type="button" class="pa-dash-role-reject" data-dash-access-reject="${id}" aria-label="Reject request from ${name}">
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
