import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import {
  getCached,
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTL,
} from "@/lib/cms/server-cache";

const PROJECT_TAG_LINK_COLUMNS = "sort_order, project_tag_labels(name)";

const PH_AREAS = ["featured", "top-mid", "top-right", "bot-mid", "bot-right"] as const;
const MOCKUP_TONES = ["purple", "green", "cyan", "blue", "orange"] as const;
export const HIGHLIGHT_MAX_TAGS = 3;

export type PortfolioHighlightItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  phArea: string;
  mockupTone: string;
  detailUrl: string;
};

type ProjectTagLinkRow = {
  sort_order?: number;
  project_tag_labels?: { name?: string } | { name?: string }[] | null;
};

function projectTagLabelName(
  labels: ProjectTagLinkRow["project_tag_labels"],
): string | undefined {
  if (!labels) return undefined;
  if (Array.isArray(labels)) return labels[0]?.name;
  return labels.name;
}

function mapTagLinks(tagLinks: ProjectTagLinkRow[] = []) {
  return tagLinks
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((l) => projectTagLabelName(l.project_tag_labels))
    .filter((name): name is string => Boolean(name));
}

function categoryLabel(
  row: { category_key?: string | null; category_keys?: string[] | null; detail_payload?: unknown },
  categoryMap: Record<string, { label?: string }>,
): string {
  const payload = row.detail_payload;
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const line = (payload as Record<string, unknown>).highlightCategory
      ?? (payload as Record<string, unknown>).categoryLine;
    if (typeof line === "string" && line.trim()) return line.trim();
  }
  const keys =
    Array.isArray(row.category_keys) && row.category_keys.length
      ? row.category_keys
      : row.category_key
        ? [row.category_key]
        : [];
  const primary = keys[0];
  if (primary && categoryMap[primary]?.label) return categoryMap[primary].label!;
  if (primary) {
    return String(primary)
      .split(/[-_]/)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
  }
  return "Project";
}

async function loadPortfolioHighlights(limit = 5): Promise<PortfolioHighlightItem[]> {
  const sb = createAdminClient();

  const { data: categoryRows, error: catError } = await sb
    .from("categories")
    .select("key, label")
    .eq("site_id", SITE_ID)
    .is("deleted_at", null);
  if (catError) throw catError;

  const categoryMap: Record<string, { label?: string }> = {};
  for (const row of categoryRows || []) {
    if (row.key) categoryMap[row.key] = { label: row.label };
  }

  const { data, error } = await sb
    .from("projects")
    .select(
      `legacy_id, slug, title, category_key, category_keys, short_description, featured_image_url, is_featured, sort_order, detail_payload, project_tag_links(${PROJECT_TAG_LINK_COLUMNS})`,
    )
    .eq("site_id", SITE_ID)
    .is("deleted_at", null)
    .eq("status", "Completed")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  const rows = [...(data || [])].sort((a, b) => {
    const af = a.is_featured ? 1 : 0;
    const bf = b.is_featured ? 1 : 0;
    if (bf !== af) return bf - af;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

  return rows.slice(0, limit).map((row, index) => {
    const slug =
      (typeof row.slug === "string" && row.slug.trim()) || String(row.legacy_id ?? index + 1);
    const title = row.title || "Project";
    const imageUrl = row.featured_image_url || "";
    return {
      id: String(row.legacy_id ?? slug),
      slug,
      title,
      category: categoryLabel(row, categoryMap),
      description: row.short_description || "",
      imageUrl,
      imageAlt: `${title} project preview`,
      tags: mapTagLinks(row.project_tag_links || []).slice(0, HIGHLIGHT_MAX_TAGS),
      featured: !!row.is_featured,
      phArea: PH_AREAS[index] || PH_AREAS[PH_AREAS.length - 1],
      mockupTone: MOCKUP_TONES[index % MOCKUP_TONES.length],
      detailUrl: `/projects/${encodeURIComponent(slug)}`,
    };
  });
}

export async function fetchPortfolioHighlights(
  limit = 5,
): Promise<PortfolioHighlightItem[]> {
  return getCached(
    `${PUBLIC_CACHE_KEYS.portfolioHighlights}:${limit}`,
    PUBLIC_CACHE_TTL.publicContent,
    () => loadPortfolioHighlights(limit),
  );
}
