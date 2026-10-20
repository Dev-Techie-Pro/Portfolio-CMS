/**
 * One-time / repeatable seed: static catalog → Supabase blog_posts + blog_post_tags
 *
 * Usage: npx tsx scripts/seed-blogs.ts
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { categoryLabelToKey } from "../lib/blog/category";

type SeedPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags: string[];
  content: unknown[];
  sidebarCta?: unknown;
  preFooter?: unknown;
  readTime?: string;
  author?: string;
  detailTemplate?: string;
};

type SeedFile = {
  blogs: Record<string, SeedPost>;
  order: string[];
  galleryOrder: string[];
};

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const PORTFOLIO_BLOG_CATEGORIES: { key: string; label: string }[] = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "wordpress", label: "WordPress" },
  { key: "architecture", label: "Architecture" },
  { key: "ui-ux", label: "UI/UX Design" },
  { key: "designs-system", label: "Designs System" },
];

type BlogCategoryRow = { key: string; legacy_id: number | null };
type BlogPostIdRow = { id: string; legacy_id: number | null };

async function ensureBlogCategories(
  supabase: ReturnType<typeof createClient>,
  siteId: string,
) {
  const { data: existing } = await supabase
    .from("blog_categories")
    .select("key, legacy_id")
    .eq("site_id", siteId)
    .is("deleted_at", null);

  const rows = (existing ?? []) as BlogCategoryRow[];
  const keys = new Set(rows.map((r) => r.key));
  let maxLegacy = Math.max(0, ...rows.map((r) => Number(r.legacy_id || 0)));

  for (const cat of PORTFOLIO_BLOG_CATEGORIES) {
    if (keys.has(cat.key)) continue;
    maxLegacy += 1;
    const { error } = await supabase.from("blog_categories").insert({
      site_id: siteId,
      legacy_id: maxLegacy,
      key: cat.key,
      label: cat.label,
      description: `${cat.label} articles`,
      sort_order: maxLegacy,
    });
    if (error) throw new Error(`category ${cat.key}: ${error.message}`);
  }
}

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const siteId =
    process.env.SUPABASE_SITE_ID || "00000000-0000-4000-8000-000000000001";

  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const seedPath = resolve(process.cwd(), "scripts/blogs-catalog.seed.json");
  const seed = JSON.parse(readFileSync(seedPath, "utf8")) as SeedFile;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  await ensureBlogCategories(supabase, siteId);

  const slugs = seed.order.filter((slug) => seed.blogs[slug]);

  const { data: maxLegacyRow } = await supabase
    .from("blog_posts")
    .select("legacy_id")
    .eq("site_id", siteId)
    .not("legacy_id", "is", null)
    .order("legacy_id", { ascending: false })
    .limit(1)
    .maybeSingle();

  let legacy = Number(maxLegacyRow?.legacy_id || 0);

  for (const slug of slugs) {
    const post = seed.blogs[slug];
    const sortOrder = slugs.indexOf(slug);
    const isFeatured = seed.galleryOrder.indexOf(slug) < 4;

    const contentPayload = JSON.stringify({
      content: post.content,
      detailTemplate: post.detailTemplate,
      sidebarCta: post.sidebarCta,
      preFooter: post.preFooter,
      readTime: post.readTime,
      author: post.author,
    });

    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id, legacy_id")
      .eq("site_id", siteId)
      .eq("slug", slug)
      .maybeSingle();

    const existing = existingPost as BlogPostIdRow | null;
    const legacyId =
      existing?.legacy_id != null ? Number(existing.legacy_id) : ++legacy;

    const row = {
      site_id: siteId,
      legacy_id: legacyId,
      title: post.title,
      slug,
      excerpt: post.excerpt,
      content: contentPayload,
      category_key: categoryLabelToKey(post.category),
      status: "Published" as const,
      is_featured: isFeatured,
      featured_image_url: post.image,
      featured_image_alt: post.imageAlt,
      published_at: post.date,
      sort_order: sortOrder,
      comments_enabled: true,
      likes_enabled: true,
      comments_auto_approve: false,
    };

    let postId = existing?.id as string | undefined;

    if (postId) {
      const { error } = await supabase
        .from("blog_posts")
        .update(row)
        .eq("id", postId);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(row)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      postId = data.id as string;
    }

    await supabase.from("blog_post_tags").delete().eq("blog_post_id", postId);

    const tagRows = (post.tags || []).map((tag, index) => ({
      blog_post_id: postId,
      tag,
      sort_order: index,
    }));

    if (tagRows.length) {
      const { error: tagError } = await supabase
        .from("blog_post_tags")
        .insert(tagRows);
      if (tagError) throw new Error(tagError.message);
    }

    console.log("Seeded:", slug);
  }

  console.log(`Done. ${slugs.length} posts synced to site ${siteId}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
