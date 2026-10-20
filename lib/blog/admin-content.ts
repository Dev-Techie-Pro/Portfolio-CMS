import { parseBlogContentField } from "@/lib/blog/content";
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
