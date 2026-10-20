const BLOG_DETAIL_TEMPLATE_META = [
  { id: "auto", label: "Auto", description: "Detect from sections and blocks (default)." },
  { id: "standard", label: "Standard", description: "Full layout \u2014 TOC left, article center, sidebar right." },
  { id: "minimal", label: "Minimal", description: "Centered article only \u2014 no sidebars." },
  { id: "case-study", label: "Case study", description: "Stronger hero and emphasis on stats and grids." },
  { id: "longform", label: "Longform", description: "TOC on the left \u2014 no right sidebar." }
];
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
export {
  BLOG_DETAIL_TEMPLATE_META,
  extractBlogAdminFields,
  serializeBlogContentForStorage
};
//# sourceMappingURL=blogContentPayload.js.map
