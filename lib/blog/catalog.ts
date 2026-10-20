import {
  applyPrevNextLinks,
  buildCatalogIndexes,
  mapRowToPortfolioPost,
} from "@/lib/blog/map";
import type { BlogCatalogResponse, PortfolioBlogPost } from "@/lib/blog/types";
import {
  getCached,
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTL,
} from "@/lib/cms/server-cache";
import { getSiteId, getSupabaseAdmin } from "@/lib/supabase/admin";

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

type TagRow = {
  blog_post_id: string;
  sort_order: number | null;
  blog_tags: { name: string | null } | null;
};

const LIST_COLUMNS =
  "id, legacy_id, title, slug, excerpt, category_key, featured_image_url, featured_image_alt, published_at, sort_order, is_featured";

const DETAIL_COLUMNS = `${LIST_COLUMNS}, content`;

async function loadCategoryLabels(siteId: string): Promise<Map<string, string>> {
  const supabase = getSupabaseAdmin();
  const { data: categoryRows } = await supabase
    .from("blog_categories")
    .select("key, label")
    .eq("site_id", siteId)
    .is("deleted_at", null);

  const categoryLabelByKey = new Map<string, string>();
  for (const row of categoryRows || []) {
    if (row.key && row.label) {
      categoryLabelByKey.set(String(row.key).toLowerCase(), row.label);
    }
  }
  return categoryLabelByKey;
}

async function loadTagsByPostId(postIds: string[]): Promise<Map<string, string[]>> {
  const tagsByPost = new Map<string, string[]>();
  if (!postIds.length) return tagsByPost;

  const supabase = getSupabaseAdmin();
  const { data: tagRows, error: tagError } = await supabase
    .from("blog_post_tags")
    .select("blog_post_id, sort_order, blog_tags(name)")
    .in("blog_post_id", postIds)
    .order("sort_order", { ascending: true });

  if (tagError) {
    throw new Error(tagError.message);
  }

  for (const row of (tagRows || []) as unknown as TagRow[]) {
    const tag = row.blog_tags?.name?.trim();
    if (!tag) continue;
    const list = tagsByPost.get(row.blog_post_id) || [];
    list.push(tag);
    tagsByPost.set(row.blog_post_id, list);
  }
  return tagsByPost;
}

function buildCatalogResponse(
  postRows: DbBlogRow[],
  tagsByPost: Map<string, string[]>,
  categoryLabelByKey: Map<string, string>,
  includeContent: boolean,
): BlogCatalogResponse {
  const posts: PortfolioBlogPost[] = postRows.map((row) =>
    mapRowToPortfolioPost(
      row,
      tagsByPost.get(row.id) || [],
      categoryLabelByKey.get((row.category_key || "").toLowerCase()),
      { includeContent },
    ),
  );

  const postsById: Record<string, PortfolioBlogPost> = {};
  for (const post of posts) {
    postsById[post.id] = post;
  }

  const { order, galleryOrder } = buildCatalogIndexes(posts);
  applyPrevNextLinks(postsById, order);

  return {
    posts: order.map((id) => postsById[id]).filter(Boolean),
    order,
    galleryOrder,
  };
}

async function loadPublishedBlogCatalogFromDb(
  includeContent: boolean,
): Promise<BlogCatalogResponse> {
  const supabase = getSupabaseAdmin();
  const siteId = getSiteId();

  const filters = (select: string) =>
    supabase
      .from("blog_posts")
      .select(select)
      .eq("site_id", siteId)
      .eq("status", "Published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false });

  const { data: rows, error } = includeContent
    ? await filters(DETAIL_COLUMNS)
    : await filters(LIST_COLUMNS);

  if (error) {
    throw new Error(error.message);
  }

  const postRows = (rows || []) as unknown as DbBlogRow[];
  const [categoryLabelByKey, tagsByPost] = await Promise.all([
    loadCategoryLabels(siteId),
    loadTagsByPostId(postRows.map((r) => r.id)),
  ]);

  return buildCatalogResponse(
    postRows,
    tagsByPost,
    categoryLabelByKey,
    includeContent,
  );
}

export type FetchPublishedBlogCatalogOptions = {
  /** When false (default), omits article bodies — smaller DB reads and JSON payloads. */
  includeContent?: boolean;
};

export async function fetchPublishedBlogCatalog(
  options: FetchPublishedBlogCatalogOptions = {},
): Promise<BlogCatalogResponse> {
  const includeContent = options.includeContent ?? false;

  if (includeContent) {
    return loadPublishedBlogCatalogFromDb(true);
  }

  return getCached(PUBLIC_CACHE_KEYS.blogCatalog, PUBLIC_CACHE_TTL.publicContent, () =>
    loadPublishedBlogCatalogFromDb(false),
  );
}

async function loadPublishedSlugOrder(
  siteId: string,
): Promise<{ slug: string; title: string }[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, sort_order, published_at")
    .eq("site_id", siteId)
    .eq("status", "Published")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || [])
    .map((row) => ({
      slug: String(row.slug || "").toLowerCase(),
      title: String(row.title || ""),
    }))
    .filter((row) => row.slug);
}

export async function fetchPublishedBlogBySlug(
  slug: string,
): Promise<PortfolioBlogPost | null> {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return null;

  return getCached(
    `public:blog-post:${normalized}`,
    PUBLIC_CACHE_TTL.publicContent,
    async () => {
      const supabase = getSupabaseAdmin();
      const siteId = getSiteId();
      const { data: row, error } = await supabase
        .from("blog_posts")
        .select(DETAIL_COLUMNS)
        .eq("site_id", siteId)
        .eq("slug", normalized)
        .eq("status", "Published")
        .is("deleted_at", null)
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!row) return null;

      const [tagsByPost, categoryLabelByKey, order] = await Promise.all([
        loadTagsByPostId([row.id]),
        loadCategoryLabels(siteId),
        loadPublishedSlugOrder(siteId),
      ]);

      const full = mapRowToPortfolioPost(
        row as DbBlogRow,
        tagsByPost.get(row.id) || [],
        categoryLabelByKey.get((row.category_key || "").toLowerCase()),
        { includeContent: true },
      );

      const index = order.findIndex((item) => item.slug === normalized);
      const prev =
        index > 0
          ? { id: order[index - 1].slug, title: order[index - 1].title }
          : null;
      const next =
        index >= 0 && index < order.length - 1
          ? { id: order[index + 1].slug, title: order[index + 1].title }
          : null;

      return {
        ...full,
        prevBlog: prev,
        nextBlog: next,
      };
    },
  );
}
