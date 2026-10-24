// @ts-nocheck
import { escapeHtml } from '../../../utils/dom.js';
import { timeAgo } from '../../../utils/format.js';
import { showToast } from '../../shell/toast.js';
import { requestBulkAction } from '../../shell/confirm.js';
import { getAccessCapabilities } from '../../../core/access.js';
import { optimisticSave } from '../../../core/optimistic-save.js';

const EXCERPT_LEN = 140;

/**
 * @typedef {{ destroy: () => void, refresh: () => Promise<void> }} CommentsWidgetHandle
 */

/**
 * @returns {CommentsWidgetHandle | null}
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
      const res = await fetch(`/api/blog-engagement/comments?${params}`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load comments.');
      let rows = Array.isArray(data.items) ? data.items : [];
      if (tab === 'recent') {
        rows = rows.filter((c) => c.status === 'pending' || c.status === 'spam');
      }
      items = rows.slice(0, 8);
      const pendingN = tab === 'pending' ? (data.total ?? items.length) : items.length;
      if (badge) {
        if (pendingN > 0 && tab === 'pending') {
          badge.textContent = String(pendingN);
          badge.removeAttribute('hidden');
        } else {
          badge.setAttribute('hidden', '');
        }
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
    const name = escapeHtml(c.authorName || 'Guest');
    const body = escapeHtml(c.body || '');
    const excerpt =
      body.length > EXCERPT_LEN ? `${body.slice(0, EXCERPT_LEN)}…` : body;
    const post = escapeHtml(c.postTitle || 'Post');
    const postHref = '/blog-engagement';
    const when = escapeHtml(timeAgo(c.createdAt) || '');
    const expanded = body.length > EXCERPT_LEN;
    return `<article class="pa-dash-quick-item" data-comment-id="${escapeHtml(c.id)}">
      <div class="pa-dash-quick-item-main">
        <div class="pa-dash-quick-item-title">${name}</div>
        <div class="pa-dash-quick-item-meta">${when} · <a href="${postHref}" class="pa-dash-quick-link">${post}</a></div>
        <p class="pa-dash-quick-item-excerpt" ${expanded ? `title="${body}"` : ''}>${excerpt}</p>
      </div>
      <div class="pa-dash-quick-item-actions pa-dash-quick-item-actions--icons">
        <button type="button" class="pa-icon-btn" data-dash-comment-action="approve" data-id="${escapeHtml(c.id)}" title="Approve" aria-label="Approve comment">
          <i class="ri-check-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-icon-btn" data-dash-comment-action="spam" data-id="${escapeHtml(c.id)}" title="Spam" aria-label="Mark as spam">
          <i class="ri-spam-2-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-icon-btn" data-dash-comment-action="hide" data-id="${escapeHtml(c.id)}" title="Hide" aria-label="Hide comment">
          <i class="ri-eye-off-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-icon-btn pa-icon-btn--danger" data-dash-comment-action="delete" data-id="${escapeHtml(c.id)}" title="Delete" aria-label="Delete comment">
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
    await optimisticSave({
      apply: () => removeLocal(id),
      rollback: () => {
        items = prev;
        render();
      },
      persist: () => patchStatus(id, status),
    });
    showToast('Comment updated', 'success');
    if (badge && tab === 'pending') {
      const n = Math.max(0, parseInt(badge.textContent || '0', 10) - 1);
      if (n > 0) badge.textContent = String(n);
      else badge.setAttribute('hidden', '');
    }
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
            await deleteComment(id);
            removeLocal(id);
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
