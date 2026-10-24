// @ts-nocheck
import { escapeHtml } from '../../../utils/dom.js';
import { timeAgo } from '../../../utils/format.js';
import { showToast } from '../../shell/toast.js';
import { requestBulkAction } from '../../shell/confirm.js';
import { getAccessCapabilities } from '../../../core/access.js';
import { optimisticSave } from '../../../core/optimistic-save.js';

const EXCERPT_LEN = 200;

const AVATAR_COLORS = ['#3b82f6', '#7c3aed', '#b45309', '#e5484d', '#22c55e', '#38bdf8', '#a78bfa', '#f472b6'];

function commentInitials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function commentAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
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

/**
 * @returns {{ destroy: () => void, refresh: () => Promise<void> }} | null
 */
export function mountCommentsModerationWidget() {
  const caps = getAccessCapabilities();
  if (!caps.canAccessBlogEngagement) return null;

  const widget = document.getElementById('paDashCommentsWidget');
  const list = document.getElementById('paDashCommentsList');
  const empty = document.getElementById('paDashCommentsEmpty');
  const badge = document.getElementById('paDashCommentsBadge');
  const skeleton = document.getElementById('paDashCommentsSkeleton');
  if (!widget || !list) return null;

  widget.removeAttribute('hidden');

  let tab = 'pending';
  let items = [];
  let pendingTotal = 0;

  const tabs = widget.querySelectorAll('[data-dash-comment-tab]');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-dash-comment-tab');
      if (!next || next === tab) return;
      tab = next;
      tabs.forEach((el) => {
        const on = el.getAttribute('data-dash-comment-tab') === tab;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      void fetchComments();
    });
  });

  async function fetchPendingTotal() {
    try {
      const res = await fetch('/api/blog-engagement/comments?limit=1&status=pending', {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return pendingTotal;
      pendingTotal = data.total ?? 0;
      setPendingBadge(badge, pendingTotal);
      return pendingTotal;
    } catch {
      return pendingTotal;
    }
  }

  async function fetchComments() {
    skeleton?.removeAttribute('hidden');
    empty?.setAttribute('hidden', '');
    list.innerHTML = '';
    const params = new URLSearchParams({ limit: '8' });
    if (tab === 'pending') {
      params.set('status', 'pending');
    } else {
      params.set('time', 'week');
      params.set('status', 'all');
    }
    try {
      const [res] = await Promise.all([
        fetch(`/api/blog-engagement/comments?${params}`, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        }),
        fetchPendingTotal(),
      ]);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load comments.');
      let rows = Array.isArray(data.items) ? data.items : [];
      if (tab === 'recent') {
        rows = rows.filter((c) => c.status === 'pending' || c.status === 'spam');
      }
      items = rows.slice(0, 8);
      if (tab === 'pending') {
        pendingTotal = data.total ?? items.length;
        setPendingBadge(badge, pendingTotal);
      }
    } catch (err) {
      showToast(err?.message || 'Could not load comments.', 'danger');
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
    list.innerHTML = items.map((c) => renderRow(c)).join('');
  }

  function renderRow(c) {
    const name = c.authorName || 'Guest';
    const body = escapeHtml(c.body || '');
    const excerpt =
      body.length > EXCERPT_LEN ? `${body.slice(0, EXCERPT_LEN)}…` : body;
    const post = escapeHtml(c.postTitle || 'Post');
    const when = escapeHtml(timeAgo(c.createdAt) || '');
    const init = escapeHtml(commentInitials(name));
    const avatarBg = commentAvatarColor(name);
    const isSpam = c.status === 'spam';
    const spamBtnClass = isSpam ? ' is-flagged' : '';
    const rowClass = isSpam ? ' is-spam' : '';

    return `<article class="pa-dash-comments-item${rowClass}" data-comment-id="${escapeHtml(c.id)}">
      <div class="pa-dash-comments-item-avatar" style="background:${avatarBg}">${init}</div>
      <div class="pa-dash-comments-item-body">
        <div class="pa-dash-comments-item-head">
          <span class="pa-dash-comments-item-name">${escapeHtml(name)}</span>
          <span class="pa-dash-comments-item-time">· ${when}</span>
        </div>
        <p class="pa-dash-comments-item-text">${excerpt}</p>
        <p class="pa-dash-comments-item-post">on: <span>${post}</span></p>
      </div>
      <div class="pa-dash-comments-item-actions" role="group" aria-label="Moderate comment">
        <button type="button" class="pa-dash-comments-act-btn" data-dash-comment-action="approve" data-id="${escapeHtml(c.id)}" title="Approve" aria-label="Approve comment">
          <i class="ri-check-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn is-spam${spamBtnClass}" data-dash-comment-action="spam" data-id="${escapeHtml(c.id)}" title="Mark as spam" aria-label="Mark as spam">
          <i class="ri-shield-flash-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn" data-dash-comment-action="hide" data-id="${escapeHtml(c.id)}" title="Hide" aria-label="Hide comment">
          <i class="ri-eye-off-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn is-delete" data-dash-comment-action="delete" data-id="${escapeHtml(c.id)}" title="Delete" aria-label="Delete comment">
          <i class="ri-delete-bin-line" aria-hidden="true"></i>
        </button>
      </div>
    </article>`;
  }

  const actionStatus = {
    approve: 'approved',
    spam: 'spam',
    hide: 'rejected',
  };

  async function patchStatus(id, status) {
    const res = await fetch('/api/blog-engagement/comments', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ids: [id], status }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Update failed');
    }
  }

  async function deleteComment(id) {
    const res = await fetch('/api/blog-engagement/comments', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [id], delete: true }),
    });
    if (!res.ok) throw new Error('Delete failed');
  }

  function removeLocal(id) {
    items = items.filter((c) => c.id !== id);
    render();
    if (!items.length) empty?.removeAttribute('hidden');
  }

  async function moderate(id, action) {
    const status = actionStatus[action];
    if (!status) return;
    const prev = items;
    const wasPending = prev.some((c) => c.id === id && c.status === 'pending');
    await optimisticSave({
      apply: () => {
        removeLocal(id);
        if (wasPending) {
          pendingTotal = Math.max(0, pendingTotal - 1);
          setPendingBadge(badge, pendingTotal);
        }
      },
      rollback: () => {
        items = prev;
        render();
        void fetchPendingTotal();
      },
      persist: () => patchStatus(id, status),
    });
    showToast('Comment updated', 'success');
  }

  function onListClick(e) {
    const btn = e.target.closest('[data-dash-comment-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-dash-comment-action');
    if (!id || !action) return;
    if (action === 'delete') {
      requestBulkAction({
        title: 'Delete comment?',
        message: 'This will permanently remove this comment.',
        confirmLabel: 'Delete',
        onConfirm: async () => {
          try {
            const wasPending = items.some((c) => c.id === id && c.status === 'pending');
            await deleteComment(id);
            removeLocal(id);
            if (wasPending) {
              pendingTotal = Math.max(0, pendingTotal - 1);
              setPendingBadge(badge, pendingTotal);
            }
            showToast('Comment removed', 'success');
          } catch {
            showToast('Could not delete comment', 'danger');
            void fetchComments();
          }
        },
      });
      return;
    }
    void moderate(id, action).catch(() => {
      showToast('Could not update comment', 'danger');
      void fetchComments();
    });
  }

  list.addEventListener('click', onListClick);
  void fetchComments();

  return {
    refresh: fetchComments,
    destroy() {
      list.removeEventListener('click', onListClick);
      list.innerHTML = '';
    },
  };
}
