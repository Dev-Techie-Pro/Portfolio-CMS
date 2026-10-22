import { categoryKeyToLabel } from "@/lib/blog/category";
import { resolveDetailTemplate } from "@/lib/blog/detail-template";
import {
  estimateReadTime,
  estimateReadTimeFromText,
  parseBlogContentField,
} from "@/lib/blog/content";
import type { PortfolioBlogPost } from "@/lib/blog/types";

type DbBlogRow = {
  id: string;
  legacy_id: number | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category_key: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  sort_order: number | null;
  is_featured: boolean | null;
};

function formatDateLabel(isoDate: string | null): { date: string; dateLabel: string } {
  if (!isoDate) {
    return { date: "", dateLabel: "—" };
  }
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return { date: isoDate.slice(0, 10), dateLabel: isoDate };
  }
  const date = d.toISOString().slice(0, 10);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
  return { date, dateLabel };
}

function asSidebarCta(
  raw: Record<string, unknown> | undefined,
): PortfolioBlogPost["sidebarCta"] {
  if (!raw) return undefined;
  const title = typeof raw.title === "string" ? raw.title : "";
  const text = typeof raw.text === "string" ? raw.text : "";
  const linkText = typeof raw.linkText === "string" ? raw.linkText : "Contact";
  const href = typeof raw.href === "string" ? raw.href : "/contact";
  if (!title && !text) return undefined;
  return { title, text, linkText, href };
}

function asPreFooter(
  raw: Record<string, unknown> | undefined,
): PortfolioBlogPost["preFooter"] {
  if (!raw) return undefined;
  const title = typeof raw.title === "string" ? raw.title : "";
  const text = typeof raw.text === "string" ? raw.text : "";
  const ctaText = typeof raw.ctaText === "string" ? raw.ctaText : "Contact";
  const ctaHref = typeof raw.ctaHref === "string" ? raw.ctaHref : "/contact";
  const features = Array.isArray(raw.features)
    ? raw.features
        .filter((f) => f && typeof f === "object")
        .map((f) => {
          const item = f as Record<string, unknown>;
          return {
            icon: typeof item.icon === "string" ? item.icon : "siSpark",
            title: typeof item.title === "string" ? item.title : "",
            text: typeof item.text === "string" ? item.text : "",
          };
        })
        .filter((f) => f.title)
    : [];
  if (!title && !text && !features.length) return undefined;
  return { title, text, features, ctaText, ctaHref };
}

export function mapRowToPortfolioPost(
  row: DbBlogRow,
  tags: string[],
  categoryLabel?: string | null,
  options?: { includeContent?: boolean },
): PortfolioBlogPost {
  const includeContent = options?.includeContent ?? true;
  const parsed = includeContent
    ? parseBlogContentField(row.content)
    : { content: [] as Record<string, unknown>[] };
  const categoryKey = (row.category_key || "general").toLowerCase();
  const category =
    categoryLabel?.trim() || categoryKeyToLabel(categoryKey);
  const { date, dateLabel } = formatDateLabel(row.published_at);
  const readTime =
    parsed.readTime ||
    (includeContent
      ? estimateReadTime(parsed.content as Record<string, unknown>[])
      : estimateReadTimeFromText(row.excerpt || row.title || ""));

  const contentBlocks = includeContent
    ? (parsed.content as Record<string, unknown>[])
    : [];

  return {
    id: row.slug,
    title: row.title,
    category,
    categoryKey,
    detailTemplate: resolveDetailTemplate(parsed.detailTemplate, contentBlocks),
    date,
    dateLabel,
    readTime,
    author: parsed.author || "M Sohaib Ishaque",
    image: row.featured_image_url || "",
    imageAlt: row.featured_image_alt || row.title,
    excerpt: row.excerpt || "",
    tags,
    sidebarCta: includeContent ? asSidebarCta(parsed.sidebarCta) : undefined,
    preFooter: includeContent ? asPreFooter(parsed.preFooter) : undefined,
    hiddenSections: includeContent ? parsed.hiddenSections || [] : undefined,
    content: contentBlocks,
    isFeatured: Boolean(row.is_featured),
    sortOrder: row.sort_order ?? 0,
  };
}

export function buildCatalogIndexes(posts: PortfolioBlogPost[]): {
  order: string[];
  galleryOrder: string[];
} {
  const sorted = [...posts].sort((a, b) => {
    const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return (b.date || "").localeCompare(a.date || "");
  });

  const order = sorted.map((p) => p.id);

  const galleryOrder = [...posts]
    .sort((a, b) => {
      const featDiff = Number(b.isFeatured) - Number(a.isFeatured);
      if (featDiff !== 0) return featDiff;
      const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      if (orderDiff !== 0) return orderDiff;
      return (b.date || "").localeCompare(a.date || "");
    })
    .map((p) => p.id);

  return { order, galleryOrder };
}

export function applyPrevNextLinks(
  postsById: Record<string, PortfolioBlogPost>,
  order: string[],
): void {
  order.forEach((id, index) => {
    const post = postsById[id];
    if (!post) return;
    post.prevBlog =
      index > 0
        ? { id: order[index - 1], title: postsById[order[index - 1]]?.title || "" }
        : null;
    post.nextBlog =
      index < order.length - 1
        ? {
            id: order[index + 1],
            title: postsById[order[index + 1]]?.title || "",
          }
        : null;
  });
}
