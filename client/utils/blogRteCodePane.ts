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
    return beautifyHtml(input);
  }
}

/** Indent / tidy when Prettier cannot parse the markup. */
export function beautifyHtml(html: string) {
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

function updateCursorMeta(el: HTMLTextAreaElement, metaEl: HTMLElement | null) {
  if (!metaEl) return;
  const pos = el.selectionStart ?? 0;
  const before = el.value.slice(0, pos);
  const lines = before.split('\n');
  const line = lines.length;
  const col = (lines[lines.length - 1]?.length ?? 0) + 1;
  metaEl.textContent = `Ln ${line}, Col ${col}`;
}

function scrollSelectionIntoView(el: HTMLTextAreaElement, index: number) {
  const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 18;
  el.scrollTop = (el.value.slice(0, index).split('\n').length - 1) * lineHeight;
}

function findMatchIndices(haystack: string, needle: string) {
  const indices: number[] = [];
  if (!needle) return indices;
  let pos = 0;
  while (true) {
    const idx = haystack.indexOf(needle, pos);
    if (idx === -1) break;
    indices.push(idx);
    pos = idx + needle.length;
  }
  return indices;
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
  const searchBar = shell?.querySelector('#blogWsCodeSearch') as HTMLElement | null;
  const searchInput = shell?.querySelector('#blogWsCodeSearchInput') as HTMLInputElement | null;
  const searchStatus = shell?.querySelector('#blogWsCodeSearchStatus') as HTMLElement | null;
  const searchToggleBtn = shell?.querySelector('[data-code-action="search-toggle"]') as HTMLButtonElement | null;

  codeEl.classList.add('pa-rte-code-pane--wrap');

  const notify = () => {
    updateCursorMeta(codeEl, metaEl);
    options.onChange?.();
  };

  const applyFormat = () => {
    codeEl.value = formatHtmlWithPrettier(codeEl.value);
    notify();
  };

  const applyBeautify = () => {
    codeEl.value = beautifyHtml(codeEl.value);
    notify();
  };

  const setSearchStatus = (message: string, kind = '') => {
    if (!searchStatus) return;
    searchStatus.textContent = message;
    searchStatus.classList.remove('is-error', 'is-match');
    if (kind) searchStatus.classList.add(kind);
  };

  const isSearchOpen = () => searchBar && !searchBar.hidden;

  const setSearchOpen = (open: boolean) => {
    if (!searchBar) return;
    searchBar.hidden = !open;
    searchToggleBtn?.classList.toggle('is-active', open);
    searchToggleBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      window.requestAnimationFrame(() => searchInput?.focus());
    } else {
      setSearchStatus('');
    }
  };

  const selectMatchAt = (index: number, query: string, total: number, ordinal: number) => {
    codeEl.focus();
    codeEl.selectionStart = index;
    codeEl.selectionEnd = index + query.length;
    scrollSelectionIntoView(codeEl, index);
    if (total > 0) {
      setSearchStatus(`${ordinal} of ${total}`, 'is-match');
    }
  };

  const runSearch = (direction: 'next' | 'prev') => {
    const query = (searchInput?.value ?? '').trim();
    if (!query) {
      setSearchStatus('Enter text to search', 'is-error');
      searchInput?.focus();
      return;
    }

    const indices = findMatchIndices(codeEl.value, query);
    if (!indices.length) {
      setSearchStatus('No matches', 'is-error');
      return;
    }

    const caret = codeEl.selectionStart ?? 0;
    const selEnd = codeEl.selectionEnd ?? 0;
    let index = indices[0];

    if (direction === 'next') {
      const next = indices.find((idx) => idx >= selEnd);
      index = next !== undefined ? next : indices[0];
    } else {
      const prev = [...indices].reverse().find((idx) => idx < caret);
      index = prev !== undefined ? prev : indices[indices.length - 1];
    }

    const ordinal = indices.indexOf(index) + 1;
    selectMatchAt(index, query, indices.length, ordinal);
  };

  searchInput?.addEventListener('input', () => {
    setSearchStatus('');
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setSearchOpen(false);
      codeEl.focus();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch(e.shiftKey ? 'prev' : 'next');
    }
  });

  shell?.querySelectorAll('[data-code-search]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.getAttribute('data-code-search');
      if (action === 'close') {
        setSearchOpen(false);
        codeEl.focus();
        return;
      }
      if (action === 'prev') runSearch('prev');
      if (action === 'next') runSearch('next');
    });
  });

  shell?.querySelectorAll('[data-code-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.getAttribute('data-code-action');
      if (action === 'format') applyFormat();
      else if (action === 'beautify') applyBeautify();
      else if (action === 'search-toggle') {
        setSearchOpen(!isSearchOpen());
      }
      notify();
    });
  });

  codeEl.addEventListener('keydown', (e) => {
    if (!wrap.classList.contains('pa-rte--code-mode')) return;
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    if (e.key === 'f' && !e.shiftKey) {
      e.preventDefault();
      setSearchOpen(true);
      if (searchInput?.value.trim()) runSearch('next');
      return;
    }
    if (e.shiftKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      applyFormat();
    }
  });

  codeEl.addEventListener('input', notify);
  codeEl.addEventListener('click', notify);
  codeEl.addEventListener('keyup', notify);
  codeEl.addEventListener('select', notify);

  wrap.addEventListener('pa-rte-code-refresh-meta', () => updateCursorMeta(codeEl, metaEl));
}
