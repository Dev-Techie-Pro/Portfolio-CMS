// @ts-nocheck

const SHELL_CLASS = 'bd-tpl-standard';
const PREVIEW_FRAME_ID = 'blogWsRtePreviewFrame';

export function resolveBlogDetailPreviewClass(detailTemplate: string): string {
  if (detailTemplate && detailTemplate !== 'auto') {
    return `bd-tpl-${detailTemplate}`;
  }
  return SHELL_CLASS;
}

/** Build TOC links from &lt;section id&gt; + h2, matching public blog detail behavior. */
export function buildTocHtmlFromArticle(articleHtml: string): string {
  const doc = new DOMParser().parseFromString(articleHtml || '', 'text/html');
  const sections: { id: string; title: string }[] = [];

  doc.querySelectorAll('section[id]').forEach((section) => {
    const id = section.getAttribute('id') || '';
    const h2 = section.querySelector('h2');
    const title = h2?.textContent?.trim() || id;
    if (id) sections.push({ id, title });
  });

  if (!sections.length) {
    doc.querySelectorAll('h2[id]').forEach((h2) => {
      const id = h2.getAttribute('id') || '';
      const title = h2.textContent?.trim() || id;
      if (id) sections.push({ id, title });
    });
  }

  if (!sections.length) {
    doc.querySelectorAll('h2').forEach((h2, index) => {
      const title = h2.textContent?.trim() || `Section ${index + 1}`;
      const slug =
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-') || `section-${index + 1}`;
      sections.push({ id: slug, title });
    });
  }

  if (!sections.length) {
    return '<span class="pa-blog-ws-preview-toc-empty">Add <code>&lt;section id="…"&gt;</code> with <code>&lt;h2&gt;</code> for TOC entries.</span>';
  }

  return sections
    .map(
      (section, index) =>
        `<a href="#${section.id}"><span class="toc-num">${String(index + 1).padStart(2, '0')}</span> ${section.title}</a>`,
    )
    .join('');
}

function previewFrameDoc(): Document | null {
  const frame = document.getElementById(PREVIEW_FRAME_ID) as HTMLIFrameElement | null;
  if (!frame) return null;
  return ensureBlogDetailPreviewFrame(frame);
}

function ensureBlogDetailPreviewFrame(frame: HTMLIFrameElement): Document | null {
  const doc = frame.contentDocument;
  if (!doc) return null;

  if (frame.dataset.previewReady === '1') {
    return doc;
  }

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
  <link rel="stylesheet" href="/assets/css/blog-pages.css" />
  <link rel="stylesheet" href="/vendor/remixicon/remixicon.css" />
  <style>
    body { margin: 0; padding: 12px; background: var(--bg); }
    .pa-blog-ws-rte-preview-main { margin-top: 0; }
    .pa-blog-ws-preview-sidebar-note {
      font-size: var(--fs-14);
      color: var(--gray);
      line-height: 1.45;
      margin: 0;
    }
    .pa-blog-ws-preview-toc-empty { font-size: var(--fs-12); color: var(--gray); }
  </style>
</head>
<body>
  <div class="blog-details-page bd-tpl-standard" id="blogWsRteDetailPreviewShell">
    <div class="container" style="max-width: 100%; padding: 0;">
      <div class="main-layout pa-blog-ws-rte-preview-main">
        <aside class="sidebar-left pa-blog-ws-rte-preview-aside" aria-label="Table of contents preview">
          <div class="bd-sidebar-card card-tbl-content">
            <h2 class="card-title">Table of Contents</h2>
            <nav class="toc-list" id="blogWsRtePreviewToc" aria-label="Table of contents"></nav>
          </div>
        </aside>
        <div class="article-main">
          <article class="article-content pa-blog-ws-rte-preview-article" id="blogWsRtePreview" aria-label="Article preview"></article>
        </div>
        <aside class="sidebar-right pa-blog-ws-rte-preview-aside" aria-label="Sidebar preview">
          <div class="bd-sidebar-card">
            <h2 class="card-title">Related &amp; author</h2>
            <p class="pa-blog-ws-preview-sidebar-note">Widgets and related posts render on your live portfolio detail page.</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</body>
</html>`);
  doc.close();
  frame.dataset.previewReady = '1';
  return frame.contentDocument;
}

export function syncBlogDetailRtePreview({
  detailTemplate,
  articleHtml,
  shellId = 'blogWsRteDetailPreviewShell',
  articleId = 'blogWsRtePreview',
  tocId = 'blogWsRtePreviewToc',
  layoutLabelId = 'blogWsRtePreviewLayoutLabel',
  layoutLabel,
}: {
  detailTemplate: string;
  articleHtml: string;
  shellId?: string;
  articleId?: string;
  tocId?: string;
  layoutLabelId?: string;
  layoutLabel?: string;
}) {
  const previewDoc = previewFrameDoc();
  const root: Document | HTMLElement = previewDoc ?? document;

  const labelEl = document.getElementById(layoutLabelId);
  if (labelEl && layoutLabel) labelEl.textContent = layoutLabel;

  const shell = root.getElementById(shellId);
  const article = root.getElementById(articleId);
  const toc = root.getElementById(tocId);

  if (shell) {
    shell.classList.remove(
      'bd-tpl-standard',
      'bd-tpl-minimal',
      'bd-tpl-longform',
      'bd-tpl-case-study',
    );
    shell.classList.add(resolveBlogDetailPreviewClass(detailTemplate));
  }

  if (article) {
    article.innerHTML = articleHtml || '';
    enhanceCompareCheckListItems(article);
  }
  if (toc) toc.innerHTML = buildTocHtmlFromArticle(articleHtml || '');
}

function resolveCompareCardVariant(
  heading: string,
  index: number,
  cardCount: number,
): 'before' | 'after' | null {
  if (heading.includes('before')) return 'before';
  if (heading.includes('after')) return 'after';
  if (cardCount === 2) return index === 0 ? 'before' : 'after';
  return null;
}

function applyCompareCardVariantClasses(card: Element, variant: 'before' | 'after' | null) {
  if (!variant) return;
  const before = variant === 'before';
  card.classList.toggle('before-card', before);
  card.classList.toggle('after-card', !before);
  card.classList.toggle('compare-card--before', before);
  card.classList.toggle('compare-card--after', !before);
}

/** Match public blog detail compare-grid list styling (Before/After). */
export function enhanceCompareCheckListItems(root: ParentNode | null) {
  if (!root || typeof (root as Element).querySelectorAll !== 'function') return;
  const scope = root as ParentNode;
  scope.querySelectorAll('.compare-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.compare-card');
    cards.forEach((card, index) => {
      const heading = (card.querySelector('h3')?.textContent || '').trim().toLowerCase();
      const variant = resolveCompareCardVariant(heading, index, cards.length);
      applyCompareCardVariantClasses(card, variant);

      let itemClass = '';
      if (variant === 'before') itemClass = 'danger-item';
      else if (variant === 'after') itemClass = 'success-item';

      card.querySelectorAll('.check-list li').forEach((li) => {
        if (li.classList.contains('danger-item') || li.classList.contains('success-item')) return;
        if (itemClass) li.classList.add(itemClass);
      });
    });
  });
}
