const BLOG_DETAIL_TEMPLATE_META = [
  { id: "auto", label: "Auto", description: "Detect from sections and blocks (default)." },
  { id: "standard", label: "Standard", description: "Full layout \u2014 TOC left, article center, sidebar right." },
  { id: "minimal", label: "Minimal", description: "Centered article only \u2014 no sidebars." },
  { id: "case-study", label: "Case study", description: "Stronger hero and emphasis on stats and grids." },
  { id: "longform", label: "Longform", description: "TOC on the left \u2014 no right sidebar." }
];
function getBlogDetailTemplateLabel(templateId) {
  const id = String(templateId || "auto").trim() || "auto";
  const meta = BLOG_DETAIL_TEMPLATE_META.find((m) => m.id === id);
  return meta?.label || id;
}
function resolvePostDetailTemplate(post) {
  if (post?.detailTemplate) return String(post.detailTemplate);
  if (post?.content) {
    return extractBlogAdminFields(post.content).detailTemplate || "auto";
  }
  return "auto";
}
const TEMPLATE_IDS = /* @__PURE__ */ new Set(["standard", "minimal", "case-study", "longform"]);
function parseContentField(raw) {
  if (!raw || !String(raw).trim()) return { content: [], detailTemplate: void 0 };
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { content: parsed };
    if (parsed && typeof parsed === "object") {
      const blocks = parsed.content ?? parsed.sections ?? parsed.blocks;
      return {
        content: Array.isArray(blocks) ? blocks : [],
        detailTemplate: typeof parsed.detailTemplate === "string" ? parsed.detailTemplate : void 0
      };
    }
  } catch {
  }
  const text = String(raw).trim();
  return {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text }]
      }
    ]
  };
}
function extractHtmlFromBlocks(blocks) {
  const parts = [];
  for (const block of blocks || []) {
    if (!block) continue;
    if (block.type === "section" && Array.isArray(block.blocks)) {
      for (const inner of block.blocks) {
        if (inner?.type === "p" && inner.text) parts.push(inner.text);
      }
    } else if (block.type === "p" && block.text) {
      parts.push(block.text);
    }
  }
  return parts.join("");
}
function extractBlogAdminFields(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return { html: "", detailTemplate: "auto" };
  const parsed = parseContentField(trimmed);
  const html = extractHtmlFromBlocks(parsed.content);
  if (parsed.detailTemplate && TEMPLATE_IDS.has(parsed.detailTemplate)) {
    return { html, detailTemplate: parsed.detailTemplate };
  }
  if (html) return { html, detailTemplate: "auto" };
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return { html: trimmed, detailTemplate: "auto" };
  }
  return { html, detailTemplate: "auto" };
}
function serializeBlogContentForStorage(html, detailTemplate) {
  const choice = String(detailTemplate || "auto").trim();
  const payload = {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text: html }]
      }
    ]
  };
  if (choice !== "auto" && TEMPLATE_IDS.has(choice)) {
    payload.detailTemplate = choice;
  }
  return JSON.stringify(payload);
}
function walkBlogBlocks(blocks, visit) {
  for (const block of blocks || []) {
    if (!block) continue;
    visit(block);
    if (Array.isArray(block.blocks)) walkBlogBlocks(block.blocks, visit);
  }
}
function normalizeBlogContentJsonEditor(raw, detailTemplate) {
  const parsed = parseContentField(raw);
  const choice = String(detailTemplate || "auto").trim();
  const payload = { content: parsed.content || [] };
  const tpl = parsed.detailTemplate && TEMPLATE_IDS.has(parsed.detailTemplate) ? parsed.detailTemplate : choice !== "auto" && TEMPLATE_IDS.has(choice) ? choice : void 0;
  if (tpl) payload.detailTemplate = tpl;
  return JSON.stringify(payload);
}
function prettyPrintBlogJson(raw) {
  try {
    return JSON.stringify(JSON.parse(String(raw)), null, 2);
  } catch {
    return String(raw ?? "");
  }
}
function blogContentJsonHasText(raw) {
  const parsed = parseContentField(raw);
  const parts = [];
  walkBlogBlocks(parsed.content, (b) => {
    if (typeof b.text === "string") parts.push(b.text.replace(/<[^>]+>/g, " "));
    if (typeof b.value === "string") parts.push(b.value);
    if (Array.isArray(b.items)) {
      for (const item of b.items) {
        if (typeof item === "string") parts.push(item);
        else if (item && typeof item === "object") {
          if (item.text) parts.push(String(item.text));
          if (item.title) parts.push(String(item.title));
        }
      }
    }
    if (Array.isArray(b.columns)) {
      for (const col of b.columns) {
        if (col?.title) parts.push(String(col.title));
        if (Array.isArray(col?.items)) parts.push(col.items.join(" "));
      }
    }
  });
  return parts.join(" ").replace(/\s+/g, " ").trim().length > 0;
}
function prepareBlogContentForStorageClient(raw, detailTemplate) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return serializeBlogContentForStorage("", detailTemplate);
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = parseContentField(trimmed);
      if (parsed.content?.length) {
        return normalizeBlogContentJsonEditor(trimmed, detailTemplate);
      }
    } catch {
    }
  }
  return serializeBlogContentForStorage(trimmed, detailTemplate);
}
function renderBlogContentPreviewHtml(raw) {
  const parsed = parseContentField(raw);
  const chunks = [];
  for (const block of parsed.content || []) {
    if (!block) continue;
    if (block.type === "section") {
      chunks.push(`<section><h2>${block.title || "Section"}</h2>`);
      for (const inner of block.blocks || []) {
        if (inner?.type === "p" && inner.text) chunks.push(inner.text.startsWith("<") ? inner.text : `<p>${inner.text}</p>`);
        else if (inner?.type === "bullet-list" && inner.items) {
          chunks.push(`<ul>${inner.items.map((i) => `<li>${i}</li>`).join("")}</ul>`);
        } else if (inner?.type === "quote-box" && inner.text) {
          chunks.push(`<blockquote>${inner.text}</blockquote>`);
        } else if (inner?.type) {
          chunks.push(`<p class="pa-blog-json-preview-placeholder">[${inner.type} block]</p>`);
        }
      }
      chunks.push("</section>");
    } else if (block.type === "stat-box") {
      chunks.push(
        `<div class="pa-blog-json-preview-stat"><strong>${block.value || ""}</strong> ${block.text || ""}</div>`
      );
    } else {
      chunks.push(`<p class="pa-blog-json-preview-placeholder">[${block.type} block]</p>`);
    }
  }
  return chunks.join("\n");
}
export {
  BLOG_DETAIL_TEMPLATE_META,
  blogContentJsonHasText,
  extractBlogAdminFields,
  getBlogDetailTemplateLabel,
  normalizeBlogContentJsonEditor,
  prepareBlogContentForStorageClient,
  prettyPrintBlogJson,
  renderBlogContentPreviewHtml,
  resolvePostDetailTemplate,
  serializeBlogContentForStorage
};
//# sourceMappingURL=blogContentPayload.js.map
