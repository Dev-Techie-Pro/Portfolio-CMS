import { parseBlogContentField } from "@/lib/blog/content";

export function normalizeHiddenSectionIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids
    .map((id) => String(id || "").trim())
    .filter(Boolean);
}

export function mergeHiddenSectionsIntoContent(
  rawContent: string | null | undefined,
  hiddenSections: string[],
): string {
  const trimmed = String(rawContent ?? "").trim();
  const normalized = normalizeHiddenSectionIds(hiddenSections);

  if (!trimmed) {
    return JSON.stringify({ content: [], hiddenSections: normalized });
  }

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return JSON.stringify({
        ...parsed,
        hiddenSections: normalized,
      });
    }
  } catch {
    /* fall through */
  }

  const legacy = parseBlogContentField(trimmed);
  return JSON.stringify({
    content: legacy.content,
    ...(legacy.detailTemplate ? { detailTemplate: legacy.detailTemplate } : {}),
    ...(legacy.author ? { author: legacy.author } : {}),
    ...(legacy.readTime ? { readTime: legacy.readTime } : {}),
    ...(legacy.sidebarCta ? { sidebarCta: legacy.sidebarCta } : {}),
    ...(legacy.preFooter ? { preFooter: legacy.preFooter } : {}),
    hiddenSections: normalized,
  });
}

export function hiddenSectionsFromContent(
  rawContent: string | null | undefined,
): string[] {
  const trimmed = String(rawContent ?? "").trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return normalizeHiddenSectionIds(parsed.hiddenSections);
    }
  } catch {
    /* ignore */
  }
  return [];
}
