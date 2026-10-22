// @ts-nocheck
import { promptUrl } from './url-prompt.js';
import { getRteHtml, setRteHtml, updateRteButtonStates } from './rte.js';
import { setupBlogRteCodePane } from './blogRteCodePane.js';

type BlogRteOptions = {
  onInsertImage?: () => void;
  /** Outer preview wrapper (e.g. layout shell + article column). */
  previewPaneId?: string;
  onRefreshPreview?: () => void;
};

function escapeAttr(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

export function insertBlogImageHtml(body: HTMLElement, url: string, alt = '') {
  if (!body || !url) return;
  body.focus();
  const html = `<figure class="pa-rte-figure"><img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy" /></figure><p><br></p>`;
  document.execCommand('insertHTML', false, html);
}

function syncCodeFromVisual(body: HTMLElement, codeEl: HTMLTextAreaElement | null) {
  if (!codeEl || !body) return;
  codeEl.value = getRteHtml(body);
}

function syncVisualFromCode(body: HTMLElement, codeEl: HTMLTextAreaElement | null) {
  if (!codeEl || !body) return;
  setRteHtml(body, codeEl.value);
}

export type BlogRteEditorMode = 'editor' | 'code' | 'preview';

function getPreviewPane(wrap: HTMLElement, previewPaneId?: string) {
  if (previewPaneId) return document.getElementById(previewPaneId);
  return wrap.querySelector('.pa-rte-preview-pane') as HTMLElement | null;
}

export function getBlogRteActiveMode(wrapId: string): BlogRteEditorMode {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return 'editor';
  if (wrap.classList.contains('pa-rte--preview-mode')) return 'preview';
  if (wrap.classList.contains('pa-rte--code-mode')) return 'code';
  return 'editor';
}

function refreshPreviewPane(
  body: HTMLElement,
  codeEl: HTMLTextAreaElement | null,
  onRefreshPreview?: () => void,
) {
  syncCodeFromVisual(body, codeEl);
  onRefreshPreview?.();
}

function setRteEditorMode(
  wrap: HTMLElement,
  body: HTMLElement,
  codeEl: HTMLTextAreaElement | null,
  mode: BlogRteEditorMode,
  options: BlogRteOptions = {},
) {
  wrap.querySelectorAll('.pa-rte-mode-btn').forEach((btn) => {
    const m = btn.getAttribute('data-rte-mode');
    const active = m === mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  const toolbar = wrap.querySelector('.pa-rte-toolbar');
  const previewEl = getPreviewPane(wrap, options.previewPaneId);

  wrap.classList.remove('pa-rte--code-mode', 'pa-rte--preview-mode');

  const codeShell = codeEl?.closest('.pa-rte-code-shell') as HTMLElement | null;

  if (mode === 'preview') {
    syncCodeFromVisual(body, codeEl);
    body.hidden = true;
    if (codeShell) codeShell.hidden = true;
    if (codeEl) {
      codeEl.classList.remove('is-active');
    }
    if (previewEl) {
      previewEl.hidden = false;
      refreshPreviewPane(body, codeEl, options.onRefreshPreview);
    }
    toolbar?.setAttribute('hidden', '');
    wrap.classList.add('pa-rte--preview-mode');
    return;
  }

  if (previewEl) previewEl.hidden = true;

  if (mode === 'code') {
    syncCodeFromVisual(body, codeEl);
    body.hidden = true;
    if (codeShell) codeShell.hidden = false;
    if (codeEl) {
      codeEl.classList.add('is-active');
    }
    toolbar?.setAttribute('hidden', '');
    wrap.classList.add('pa-rte--code-mode');
    wrap.dispatchEvent(new CustomEvent('pa-rte-code-refresh-meta'));
    codeEl?.focus();
    return;
  }

  if (codeShell) codeShell.hidden = true;

  syncVisualFromCode(body, codeEl);
  if (codeEl) {
    codeEl.classList.remove('is-active');
  }
  body.hidden = false;
  toolbar?.removeAttribute('hidden');
  body.focus();
}

function handleBlogPaste(e: ClipboardEvent, body: HTMLElement) {
  const html = e.clipboardData?.getData('text/html')?.trim();
  const text = e.clipboardData?.getData('text/plain')?.trim();
  e.preventDefault();
  body.focus();
  if (html) {
    document.execCommand('insertHTML', false, html);
  } else if (text) {
    document.execCommand('insertText', false, text);
  }
}

function runRteCommand(
  body: HTMLElement,
  wrap: HTMLElement,
  btn: HTMLElement,
) {
  body.focus();
  const cmd = btn.dataset.cmd;
  if (!cmd) return;

  if (cmd === 'createLink') {
    const sel = window.getSelection();
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    let existing = '';
    if (range) {
      let node = range.commonAncestorContainer;
      if (node?.nodeType === 3) node = node.parentElement;
      const anchor = node?.closest?.('a');
      if (anchor && body.contains(anchor)) {
        existing = anchor.getAttribute('href') || '';
      }
    }
    void promptUrl({
      defaultValue: existing,
      title: existing ? 'Edit link' : 'Insert link',
      confirmLabel: existing ? 'Save link' : 'Insert link',
    }).then((url) => {
      if (url === null) return;
      if (!url) {
        document.execCommand('unlink', false, null);
      } else if (range && !range.collapsed) {
        document.execCommand('createLink', false, url);
      } else {
        document.execCommand(
          'insertHTML',
          false,
          `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeAttr(url)}</a>`,
        );
      }
      updateRteButtonStates(wrap);
    });
    return;
  }

  if (cmd === 'formatBlock') {
    const tag = btn.dataset.value || 'p';
    document.execCommand('formatBlock', false, tag);
  } else {
    document.execCommand(cmd, false, null);
  }
  updateRteButtonStates(wrap);
}

function ensureRteFullscreenButton(wrap: HTMLElement, body: HTMLElement) {
  const toolbar = wrap.querySelector('.pa-rte-toolbar');
  if (!toolbar || toolbar.querySelector('.pa-rte-fullscreen-wrap')) return;

  const group = document.createElement('div');
  group.className = 'pa-rte-fullscreen-wrap';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pa-rte-btn pa-rte-fullscreen-btn';
  btn.title = 'Full screen';
  btn.setAttribute('aria-label', 'Full screen');
  btn.innerHTML = '<i class="ri-fullscreen-line"></i>';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const active = !wrap.classList.contains('pa-rte--fullscreen');
    wrap.classList.toggle('pa-rte--fullscreen', active);
    document.body.classList.toggle('pa-rte-fullscreen-active', active);
    btn.innerHTML = active
      ? '<i class="ri-fullscreen-exit-line"></i>'
      : '<i class="ri-fullscreen-line"></i>';
    if (active) body.focus();
  });
  group.appendChild(btn);
  toolbar.appendChild(group);
}

/**
 * WordPress-style rich editor for blog posts (editor + HTML code + preview).
 */
export function setupBlogPostRte(
  wrapId: string,
  bodyId: string,
  codeId: string,
  options: BlogRteOptions = {},
) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId) as HTMLElement | null;
  const codeEl = document.getElementById(codeId) as HTMLTextAreaElement | null;
  if (!wrap || !body) return;

  wrap.classList.add('pa-rte--blog-pro');
  ensureRteFullscreenButton(wrap, body);

  wrap.querySelectorAll('.pa-rte-mode-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = btn.getAttribute('data-rte-mode');
      if (mode === 'editor' || mode === 'code' || mode === 'preview') {
        setRteEditorMode(wrap, body, codeEl, mode, options);
      }
    });
  });

  wrap.querySelectorAll('.pa-rte-btn[data-cmd]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      runRteCommand(body, wrap, btn as HTMLElement);
    });
  });

  const imageBtn = wrap.querySelector('[data-rte-action="insertImage"]');
  if (imageBtn && options.onInsertImage) {
    imageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      options.onInsertImage?.();
    });
  }

  body.addEventListener('keyup', () => updateRteButtonStates(wrap));
  body.addEventListener('mouseup', () => updateRteButtonStates(wrap));
  body.addEventListener('input', () => syncCodeFromVisual(body, codeEl));
  body.addEventListener('paste', (e) => handleBlogPaste(e, body));

  if (codeEl) {
    setupBlogRteCodePane(wrap, codeEl, {
      onChange: () => {
        if (!wrap.classList.contains('pa-rte--code-mode')) return;
        options.onRefreshPreview?.();
      },
    });
  }

  setRteEditorMode(wrap, body, codeEl, 'editor', options);
}

export function getBlogRteHtml(bodyId: string, codeId: string, wrapId: string) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId) as HTMLTextAreaElement | null;
  if (wrap?.classList.contains('pa-rte--code-mode') && codeEl) {
    return codeEl.value.trim();
  }
  return getRteHtml(body);
}

export function refreshBlogRtePreview(
  bodyId: string,
  codeId: string,
  onRefreshPreview?: () => void,
) {
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId) as HTMLTextAreaElement | null;
  if (!body) return;
  refreshPreviewPane(body, codeEl, onRefreshPreview);
}

export function setBlogRteHtml(
  bodyId: string,
  codeId: string,
  wrapId: string,
  html: string,
) {
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId) as HTMLTextAreaElement | null;
  const wrap = document.getElementById(wrapId);
  setRteHtml(body, html);
  if (codeEl) codeEl.value = html || '';
  if (wrap && wrap.classList.contains('pa-rte--code-mode') && body && codeEl) {
    syncVisualFromCode(body, codeEl);
  }
}
