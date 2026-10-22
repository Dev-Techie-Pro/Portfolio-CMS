export type BlogContentBlock = Record<string, unknown>;

export type ParsedBlogContent = {
  content: BlogContentBlock[];
  author?: string;
  readTime?: string;
  detailTemplate?: string;
  hiddenSections?: string[];
  sidebarCta?: Record<string, unknown>;
  preFooter?: Record<string, unknown>;
};

export function parseBlogContentField(raw: string | null): ParsedBlogContent {
  if (!raw || !raw.trim()) {
    return { content: [] };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return { content: parsed as BlogContentBlock[] };
    }
    if (parsed && typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;
      const blocks = obj.content ?? obj.sections ?? obj.blocks;
      if (Array.isArray(blocks)) {
        return {
          content: blocks as BlogContentBlock[],
          author: typeof obj.author === "string" ? obj.author : undefined,
          readTime: typeof obj.readTime === "string" ? obj.readTime : undefined,
          detailTemplate:
            typeof obj.detailTemplate === "string"
              ? obj.detailTemplate
              : typeof obj.template === "string"
                ? obj.template
                : undefined,
          sidebarCta:
            obj.sidebarCta && typeof obj.sidebarCta === "object"
              ? (obj.sidebarCta as Record<string, unknown>)
              : undefined,
          preFooter:
            obj.preFooter && typeof obj.preFooter === "object"
              ? (obj.preFooter as Record<string, unknown>)
              : undefined,
          hiddenSections: Array.isArray(obj.hiddenSections)
            ? obj.hiddenSections
                .map((id) => String(id || "").trim())
                .filter(Boolean)
            : undefined,
        };
      }
    }
  } catch {
    // fall through to plain text
  }

  return {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text: raw.trim() }],
      },
    ],
  };
}

/** Rough read time from plain text (excerpt/title) when full article body is not loaded. */
export function estimateReadTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function estimateReadTime(content: BlogContentBlock[]): string {
  const textParts: string[] = [];
  const walk = (blocks: unknown) => {
    if (!Array.isArray(blocks)) return;
    for (const block of blocks) {
      if (!block || typeof block !== "object") continue;
      const b = block as Record<string, unknown>;
      if (typeof b.text === "string") textParts.push(b.text);
      if (Array.isArray(b.items)) {
        textParts.push(b.items.filter((i) => typeof i === "string").join(" "));
      }
      if (Array.isArray(b.blocks)) walk(b.blocks);
      if (Array.isArray(b.columns)) {
        for (const col of b.columns) {
          if (col && typeof col === "object" && Array.isArray(col.items)) {
            textParts.push(col.items.join(" "));
          }
        }
      }
    }
  };
  walk(content);
  const words = textParts.join(" ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
