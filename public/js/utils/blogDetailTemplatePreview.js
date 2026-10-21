const SHELL_CLASS = "bd-tpl-standard";
function resolveBlogDetailPreviewClass(detailTemplate) {
  if (detailTemplate && detailTemplate !== "auto") {
    return `bd-tpl-${detailTemplate}`;
  }
  return SHELL_CLASS;
}
function buildTocHtmlFromArticle(articleHtml) {
  const doc = new DOMParser().parseFromString(articleHtml || "", "text/html");
  const sections = [];
  doc.querySelectorAll("section[id]").forEach((section) => {
    const id = section.getAttribute("id") || "";
    const h2 = section.querySelector("h2");
    const title = h2?.textContent?.trim() || id;
    if (id) sections.push({ id, title });
  });
  if (!sections.length) {
    doc.querySelectorAll("h2[id]").forEach((h2) => {
      const id = h2.getAttribute("id") || "";
      const title = h2.textContent?.trim() || id;
      if (id) sections.push({ id, title });
    });
  }
  if (!sections.length) {
    doc.querySelectorAll("h2").forEach((h2, index) => {
      const title = h2.textContent?.trim() || `Section ${index + 1}`;
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || `section-${index + 1}`;
      sections.push({ id: slug, title });
    });
  }
  if (!sections.length) {
    return '<span class="pa-blog-ws-preview-toc-empty">Add <code>&lt;section id="\u2026"&gt;</code> with <code>&lt;h2&gt;</code> for TOC entries.</span>';
  }
  return sections.map(
    (section, index) => `<a href="#${section.id}"><span class="toc-num">${String(index + 1).padStart(2, "0")}</span> ${section.title}</a>`
  ).join("");
}
function syncBlogDetailRtePreview({
  detailTemplate,
  articleHtml,
  shellId = "blogWsRteDetailPreviewShell",
  articleId = "blogWsRtePreview",
  tocId = "blogWsRtePreviewToc",
  layoutLabelId = "blogWsRtePreviewLayoutLabel",
  layoutLabel
}) {
  const shell = document.getElementById(shellId);
  const article = document.getElementById(articleId);
  const toc = document.getElementById(tocId);
  const labelEl = document.getElementById(layoutLabelId);
  if (labelEl && layoutLabel) labelEl.textContent = layoutLabel;
  if (shell) {
    shell.classList.remove(
      "bd-tpl-standard",
      "bd-tpl-minimal",
      "bd-tpl-longform",
      "bd-tpl-case-study"
    );
    shell.classList.add(resolveBlogDetailPreviewClass(detailTemplate));
  }
  if (article) article.innerHTML = articleHtml || "";
  if (toc) toc.innerHTML = buildTocHtmlFromArticle(articleHtml || "");
}
export {
  buildTocHtmlFromArticle,
  resolveBlogDetailPreviewClass,
  syncBlogDetailRtePreview
};
//# sourceMappingURL=blogDetailTemplatePreview.js.map
