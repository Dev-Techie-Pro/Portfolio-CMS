// @ts-nocheck
import * as prettier from 'prettier/standalone';
import * as pluginHtml from 'prettier/plugins/html';

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

export function formatHtmlWithPrettier(source: string) {
  const input = String(source ?? '');
  if (!input.trim()) return input;
  try {
    return prettier.format(input, {
      parser: 'html',
      plugins: [pluginHtml],
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: 'ignore',
    });
  } catch {
    return formatHtmlFallback(input);
  }
}

/** Lightweight indent when Prettier rejects malformed markup. */
export function formatHtmlFallback(html: string) {
  const raw = String(html ?? '').replace(/\r\n/g, '\n');
  const tokens = raw.split(/(<[^>]+>)/g).filter((t) => t.length);
  const indent = '  ';
  let depth = 0;
  const lines: string[] = [];
  let textBuf = '';

  const flushText = () => {
    const t = textBuf.replace(/\s+/g, ' ').trim();
    if (t) lines.push(`${indent.repeat(depth)}${t}`);
    textBuf = '';
  };

  for (const token of tokens) {
    if (!token.startsWith('<')) {
      textBuf += token;
      continue;
    }
    flushText();
    const tag = token.match(/^<\/?([a-zA-Z0-9:-]+)/);
    const name = tag?.[1]?.toLowerCase() || '';
    const isClose = token.startsWith('</');
    const isSelfClose = /\/>$/.test(token) || VOID_TAGS.has(name);
    const isOpen = !isClose && !isSelfClose && !token.startsWith('<!') && !token.startsWith('<?');

    if (isClose) depth = Math.max(0, depth - 1);
    lines.push(`${indent.repeat(depth)}${token.trim()}`);
    if (isOpen) depth += 1;
  }
  flushText();
  return `${lines.join('\n').trim()}\n`;
}

export function minifyHtml(html: string) {
  return String(html ?? '')
    .replace(/<!--[\s\S]*?-->/g, (m) => m)
    .replace(/\n\s*/g, '')
    .replace(/>\s+</g, '><')
    .trim();
}

function getSelection(el: HTMLTextAreaElement) {
  const start = el.selectionStart ?? 0;
  const end = el.selectionEnd ?? 0;
  return { start, end, text: el.value.slice(start, end) };
}

function replaceRange(el: HTMLTextAreaElement, start: number, end: number, insert: string) {
  const before = el.value.slice(0, start);
  const after = el.value.slice(end);
  el.value = before + insert + after;
  const pos = start + insert.length;
  el.selectionStart = pos;
  el.selectionEnd = pos;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function insertAtCursor(el: HTMLTextAreaElement, insert: string) {
  const { start, end } = getSelection(el);
  replaceRange(el, start, end, insert);
}

function getLineBounds(value: string, index: number) {
  const before = value.lastIndexOf('\n', index - 1);
  const start = before === -1 ? 0 : before + 1;
  const after = value.indexOf('\n', index);
  const end = after === -1 ? value.length : after;
  return { start, end, line: value.slice(start, end) };
}

function updateCursorMeta(el: HTMLTextAreaElement, metaEl: HTMLElement | null) {
  if (!metaEl) return;
  const pos = el.selectionStart ?? 0;
  const before = el.value.slice(0, pos);
  const lines = before.split('\n');
  const line = lines.length;
  const col = (lines[lines.length - 1]?.length ?? 0) + 1;
  const len = el.value.length;
  metaEl.textContent = `Ln ${line}, Col ${col} · ${len.toLocaleString()} chars`;
}

function runClipboard(cmd: string, el: HTMLTextAreaElement) {
  el.focus();
  try {
    document.execCommand(cmd);
  } catch {
    /* ignore */
  }
}

function toggleLineComment(el: HTMLTextAreaElement) {
  const { start, end, text } = getSelection(el);
  if (!text.trim()) return;
  if (text.trim().startsWith('<!--')) {
    const unwrapped = text.replace(/^<!--\s?/, '').replace(/\s?-->$/, '');
    replaceRange(el, start, end, unwrapped);
    return;
  }
  replaceRange(el, start, end, `<!-- ${text} -->`);
}

function duplicateLine(el: HTMLTextAreaElement) {
  const pos = el.selectionStart ?? 0;
  const { start, end, line } = getLineBounds(el.value, pos);
  const insert = `${line}\n`;
  replaceRange(el, end, end, insert);
}

function deleteLine(el: HTMLTextAreaElement) {
  const pos = el.selectionStart ?? 0;
  const { start, end } = getLineBounds(el.value, pos);
  const removeEnd = end < el.value.length ? end + 1 : end;
  replaceRange(el, start, removeEnd, '');
}

function findInCode(el: HTMLTextAreaElement) {
  const query = window.prompt('Find in HTML');
  if (!query) return;
  const idx = el.value.indexOf(query, el.selectionEnd ?? 0);
  const fromStart = idx === -1 ? el.value.indexOf(query, 0) : idx;
  if (fromStart === -1) {
    window.alert('No matches found.');
    return;
  }
  el.focus();
  el.selectionStart = fromStart;
  el.selectionEnd = fromStart + query.length;
  el.scrollTop =
    (el.value.slice(0, fromStart).split('\n').length - 1) * (parseInt(getComputedStyle(el).lineHeight, 10) || 18);
}

const SNIPPETS: Record<string, string> = {
  section: `<section id="section-id">
  <h2>Section title</h2>
  <p>Content…</p>
</section>
`,
  pre: `<pre><code class="language-javascript">// code</code></pre>
`,
  figure: `<figure class="pa-rte-figure">
  <img src="" alt="" loading="lazy" />
</figure>
`,
};

type MenuItem = {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
};

function buildContextMenuItems(): MenuItem[] {
  return [
    { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
    { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' },
    { divider: true, id: '_d1', label: '' },
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    { id: 'selectAll', label: 'Select all', shortcut: 'Ctrl+A' },
    { divider: true, id: '_d2', label: '' },
    { id: 'format', label: 'Format HTML (Prettier)', shortcut: 'Ctrl+Shift+F' },
    { id: 'minify', label: 'Minify HTML' },
    { id: 'comment', label: 'Toggle HTML comment', shortcut: 'Ctrl+/' },
    { divider: true, id: '_d3', label: '' },
    { id: 'dupLine', label: 'Duplicate line', shortcut: 'Ctrl+Shift+D' },
    { id: 'delLine', label: 'Delete line', shortcut: 'Ctrl+Shift+K' },
    { id: 'find', label: 'Find…', shortcut: 'Ctrl+F' },
    { divider: true, id: '_d4', label: '' },
    { id: 'snippet-section', label: 'Insert section block' },
    { id: 'snippet-pre', label: 'Insert code block' },
    { id: 'snippet-figure', label: 'Insert figure / image' },
    { divider: true, id: '_d5', label: '' },
    { id: 'wrap', label: 'Toggle line wrap' },
  ];
}

type CodePaneOptions = {
  onChange?: () => void;
};

export function setupBlogRteCodePane(
  wrap: HTMLElement,
  codeEl: HTMLTextAreaElement,
  options: CodePaneOptions = {},
) {
  const shell = codeEl.closest('.pa-rte-code-shell') as HTMLElement | null;
  const metaEl = shell?.querySelector('.pa-rte-code-meta') as HTMLElement | null;
  let wrapLines = true;
  codeEl.classList.toggle('pa-rte-code-pane--wrap', wrapLines);

  let menuEl: HTMLElement | null = null;

  const notify = () => {
    updateCursorMeta(codeEl, metaEl);
    options.onChange?.();
  };

  const applyFormat = () => {
    const formatted = formatHtmlWithPrettier(codeEl.value);
    codeEl.value = formatted;
    notify();
  };

  const applyMinify = () => {
    codeEl.value = minifyHtml(codeEl.value);
    notify();
  };

  const hideMenu = () => {
    if (menuEl) menuEl.hidden = true;
  };

  const showMenu = (clientX: number, clientY: number) => {
    if (!menuEl) {
      menuEl = document.createElement('div');
      menuEl.className = 'pa-rte-code-context-menu';
      menuEl.setAttribute('role', 'menu');
      menuEl.hidden = true;
      document.body.appendChild(menuEl);
      menuEl.addEventListener('mousedown', (e) => e.preventDefault());
      document.addEventListener('click', () => hideMenu());
      document.addEventListener('scroll', () => hideMenu(), true);
    }

    menuEl.innerHTML = buildContextMenuItems()
      .map((item) => {
        if (item.divider) return '<div class="pa-rte-code-context-menu__divider" role="separator"></div>';
        const dis = item.disabled ? ' aria-disabled="true"' : '';
        const sc = item.shortcut
          ? `<span class="pa-rte-code-context-menu__shortcut">${item.shortcut}</span>`
          : '';
        return `<button type="button" class="pa-rte-code-context-menu__item" data-code-menu="${item.id}" role="menuitem"${dis}>${item.label}${sc}</button>`;
      })
      .join('');

    menuEl.hidden = false;
    const pad = 8;
    const rect = menuEl.getBoundingClientRect();
    let left = clientX;
    let top = clientY;
    if (left + rect.width > window.innerWidth - pad) left = window.innerWidth - rect.width - pad;
    if (top + rect.height > window.innerHeight - pad) top = window.innerHeight - rect.height - pad;
    menuEl.style.left = `${Math.max(pad, left)}px`;
    menuEl.style.top = `${Math.max(pad, top)}px`;

    menuEl.querySelectorAll('[data-code-menu]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-code-menu');
        hideMenu();
        runMenuAction(id, codeEl, wrap, {
          applyFormat,
          applyMinify,
          toggleWrap: () => {
            wrapLines = !wrapLines;
            codeEl.classList.toggle('pa-rte-code-pane--wrap', wrapLines);
          },
        });
        notify();
      });
    });
  };

  shell?.querySelectorAll('[data-code-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.getAttribute('data-code-action');
      if (action === 'format') applyFormat();
      else if (action === 'minify') applyMinify();
      else if (action === 'wrap') {
        wrapLines = !wrapLines;
        codeEl.classList.toggle('pa-rte-code-pane--wrap', wrapLines);
        btn.classList.toggle('is-active', wrapLines);
      } else if (action === 'find') findInCode(codeEl);
      else if (action === 'comment') toggleLineComment(codeEl);
      notify();
    });
  });

  codeEl.addEventListener('contextmenu', (e) => {
    if (!wrap.classList.contains('pa-rte--code-mode')) return;
    e.preventDefault();
    showMenu(e.clientX, e.clientY);
  });

  codeEl.addEventListener('keydown', (e) => {
    if (!wrap.classList.contains('pa-rte--code-mode')) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      insertAtCursor(codeEl, e.shiftKey ? '' : '  ');
      notify();
      return;
    }

    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    if (e.key === 's') {
      e.preventDefault();
      return;
    }
    if (e.key === 'f' && !e.shiftKey) {
      e.preventDefault();
      findInCode(codeEl);
      return;
    }
    if (e.key === '/' || e.key === '?') {
      e.preventDefault();
      toggleLineComment(codeEl);
      notify();
      return;
    }
    if (e.shiftKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      applyFormat();
      return;
    }
    if (e.shiftKey && e.key === 'D') {
      e.preventDefault();
      duplicateLine(codeEl);
      notify();
      return;
    }
    if (e.shiftKey && e.key === 'K') {
      e.preventDefault();
      deleteLine(codeEl);
      notify();
      return;
    }
  });

  codeEl.addEventListener('input', notify);
  codeEl.addEventListener('click', notify);
  codeEl.addEventListener('keyup', notify);
  codeEl.addEventListener('select', notify);

  wrap.addEventListener('pa-rte-code-refresh-meta', () => updateCursorMeta(codeEl, metaEl));
}

function runMenuAction(
  id: string | null,
  el: HTMLTextAreaElement,
  wrap: HTMLElement,
  helpers: {
    applyFormat: () => void;
    applyMinify: () => void;
    toggleWrap: () => void;
  },
) {
  switch (id) {
    case 'undo':
      runClipboard('undo', el);
      break;
    case 'redo':
      runClipboard('redo', el);
      break;
    case 'cut':
      runClipboard('cut', el);
      break;
    case 'copy':
      runClipboard('copy', el);
      break;
    case 'paste':
      runClipboard('paste', el);
      break;
    case 'selectAll':
      el.focus();
      el.select();
      break;
    case 'format':
      helpers.applyFormat();
      break;
    case 'minify':
      helpers.applyMinify();
      break;
    case 'comment':
      toggleLineComment(el);
      break;
    case 'dupLine':
      duplicateLine(el);
      break;
    case 'delLine':
      deleteLine(el);
      break;
    case 'find':
      findInCode(el);
      break;
    case 'wrap':
      helpers.toggleWrap();
      break;
    case 'snippet-section':
      insertAtCursor(el, SNIPPETS.section);
      break;
    case 'snippet-pre':
      insertAtCursor(el, SNIPPETS.pre);
      break;
    case 'snippet-figure':
      insertAtCursor(el, SNIPPETS.figure);
      break;
    default:
      break;
  }
}
