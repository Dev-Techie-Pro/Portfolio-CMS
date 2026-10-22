// @ts-nocheck

const SHELL_CLASS = 'bd-tpl-standard';

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
  const shell = document.getElementById(shellId);
  const article = document.getElementById(articleId);
  const toc = document.getElementById(tocId);
  const labelEl = document.getElementById(layoutLabelId);

  if (labelEl && layoutLabel) labelEl.textContent = layoutLabel;

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

/** Match public blog detail compare-grid list styling (Before/After). */
export function enhanceCompareCheckListItems(root: ParentNode | null) {
  if (!root || typeof (root as Element).querySelectorAll !== 'function') return;
  const scope = root as ParentNode;
  scope.querySelectorAll('.compare-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.compare-card');
    cards.forEach((card, index) => {
      const heading = (card.querySelector('h3')?.textContent || '').trim().toLowerCase();
      let itemClass = '';
      if (heading.includes('before')) itemClass = 'danger-item';
      else if (heading.includes('after')) itemClass = 'success-item';
      else if (cards.length === 2) {
        itemClass = index === 0 ? 'danger-item' : 'success-item';
      }
      card.querySelectorAll('.check-list li').forEach((li) => {
        if (li.classList.contains('danger-item') || li.classList.contains('success-item')) return;
        if (itemClass) li.classList.add(itemClass);
      });
    });
  });
}
