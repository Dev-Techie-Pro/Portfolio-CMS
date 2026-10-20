import type { SupabaseClient } from "@supabase/supabase-js";
import { getSiteId, getSupabaseAdmin } from "@/lib/supabase/admin";

export type BlogPostRow = {
  id: string;
  slug: string;
  status: string;
  comments_enabled: boolean;
  likes_enabled: boolean;
  comments_auto_approve: boolean;
};

export async function getPublishedBlogPostBySlug(
  slug: string,
  supabase?: SupabaseClient,
): Promise<BlogPostRow | null> {
  const client = supabase ?? getSupabaseAdmin();
  const siteId = getSiteId();

  const { data, error } = await client
    .from("blog_posts")
    .select(
      "id, slug, status, comments_enabled, likes_enabled, comments_auto_approve",
    )
    .eq("site_id", siteId)
    .eq("slug", slug)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.status !== "Published") {
    return null;
  }

  return data as BlogPostRow;
}

export async function nextCommentLegacyId(
  supabase: SupabaseClient,
  siteId: string,
): Promise<number> {
  const { data: maxRow } = await supabase
    .from("blog_post_comments")
    .select("legacy_id")
    .eq("site_id", siteId)
    .not("legacy_id", "is", null)
    .is("deleted_at", null)
    .order("legacy_id", { ascending: false })
    .limit(1)
    .maybeSingle();

  return Number(maxRow?.legacy_id || 0) + 1;
}
