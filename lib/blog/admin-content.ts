import { parseBlogContentField, type ParsedBlogContent } from "@/lib/blog/content";
import { sanitizeCmsHtml } from "@/lib/validation/sanitize-html";
import type { BlogDetailTemplate } from "@/lib/blog/detail-template";
import { isBlogDetailTemplate } from "@/lib/blog/detail-template";

export type BlogDetailTemplateChoice = "auto" | BlogDetailTemplate;

export const BLOG_DETAIL_TEMPLATE_META: {
  id: BlogDetailTemplateChoice;
  label: string;
  description: string;
}[] = [
  {
    id: "auto",
    label: "Auto",
    description: "Detect from sections and blocks (default).",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Full layout — TOC left, article center, sidebar right.",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Centered article only — no sidebars.",
  },
  {
    id: "case-study",
    label: "Case study",
    description: "Stronger hero and emphasis on stats and grids.",
  },
  {
    id: "longform",
    label: "Longform",
    description: "TOC on the left — no right sidebar.",
  },
];

function extractHtmlFromBlocks(
  blocks: Record<string, unknown>[],
): string {
  const parts: string[] = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    if (block.type === "section" && Array.isArray(block.blocks)) {
      for (const inner of block.blocks as Record<string, unknown>[]) {
        if (inner?.type === "p" && typeof inner.text === "string") {
          parts.push(inner.text);
        }
      }
    } else if (block.type === "p" && typeof block.text === "string") {
      parts.push(block.text);
    }
  }
  return parts.join("");
}

export function extractBlogAdminFields(raw: string | null | undefined): {
  html: string;
  detailTemplate: BlogDetailTemplateChoice;
} {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) {
    return { html: "", detailTemplate: "auto" };
  }

  const parsed = parseBlogContentField(trimmed);
  const html = extractHtmlFromBlocks(
    parsed.content as Record<string, unknown>[],
  );

  if (parsed.detailTemplate && isBlogDetailTemplate(parsed.detailTemplate)) {
    return { html, detailTemplate: parsed.detailTemplate };
  }

  if (html) {
    return { html, detailTemplate: "auto" };
  }

  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return { html: trimmed, detailTemplate: "auto" };
  }

  return { html, detailTemplate: "auto" };
}

function walkBlogBlocks(
  blocks: Record<string, unknown>[],
  visit: (block: Record<string, unknown>) => void,
) {
  for (const block of blocks || []) {
    if (!block || typeof block !== "object") continue;
    visit(block);
    if (Array.isArray(block.blocks)) {
      walkBlogBlocks(block.blocks as Record<string, unknown>[], visit);
    }
  }
}

function sanitizeBlogContentPayload(
  parsed: ParsedBlogContent,
  detailTemplate: BlogDetailTemplateChoice | string | undefined,
): Record<string, unknown> {
  const choice = String(detailTemplate || "auto").trim() as BlogDetailTemplateChoice;
  const payload: Record<string, unknown> = {
    content: parsed.content,
  };

  const tpl =
    parsed.detailTemplate && isBlogDetailTemplate(parsed.detailTemplate)
      ? parsed.detailTemplate
      : choice !== "auto" && isBlogDetailTemplate(choice)
        ? choice
        : undefined;
  if (tpl) payload.detailTemplate = tpl;

  if (parsed.hiddenSections?.length) {
    payload.hiddenSections = parsed.hiddenSections;
  }

  walkBlogBlocks(parsed.content as Record<string, unknown>[], (block) => {
    if (typeof block.text === "string") {
      block.text = sanitizeCmsHtml(block.text);
    }
    if (typeof block.value === "string") {
      block.value = sanitizeCmsHtml(block.value);
    }
  });

  return payload;
}

/** True when stored value is JSON with a non-empty content array (not plain HTML). */
export function isBlogContentJson(raw: string | null | undefined): boolean {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
  try {
    const parsed = parseBlogContentField(trimmed);
    return Array.isArray(parsed.content) && parsed.content.length > 0;
  } catch {
    return false;
  }
}

export function prepareBlogContentForStorage(
  raw: string,
  detailTemplate: BlogDetailTemplateChoice | string | undefined,
): string {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) {
    return serializeBlogContentForStorage("", detailTemplate);
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = parseBlogContentField(trimmed);
      if (parsed.content?.length) {
        return JSON.stringify(
          sanitizeBlogContentPayload(parsed, detailTemplate),
        );
      }
    } catch {
      /* fall through */
    }
  }

  return serializeBlogContentForStorage(
    sanitizeCmsHtml(trimmed),
    detailTemplate,
  );
}

export function serializeBlogContentForStorage(
  html: string,
  detailTemplate: BlogDetailTemplateChoice | string | undefined,
): string {
  const choice = String(detailTemplate || "auto").trim() as BlogDetailTemplateChoice;
  const payload: Record<string, unknown> = {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text: html }],
      },
    ],
  };

  if (choice !== "auto" && isBlogDetailTemplate(choice)) {
    payload.detailTemplate = choice;
  }

  return JSON.stringify(payload);
}
