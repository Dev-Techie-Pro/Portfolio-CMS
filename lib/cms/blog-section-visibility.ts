import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import {
  mergeHiddenSectionsIntoContent,
  normalizeHiddenSectionIds,
} from "@/lib/blog/hidden-sections";
import { parseBlogSlug } from "@/lib/blog/slug";
import { invalidateCmsReadCaches } from "@/lib/cms/server-cache";

export async function updateBlogHiddenSectionsBySlug(
  slug: string,
  hiddenSections: string[],
) {
  const parsedSlug = parseBlogSlug(slug);
  if (!parsedSlug) {
    return { ok: false as const, error: "Invalid post.", status: 400 };
  }

  const sb = createAdminClient();
  const { data: row, error: loadErr } = await sb
    .from("blog_posts")
    .select("id, content")
    .eq("site_id", SITE_ID)
    .eq("slug", parsedSlug)
    .is("deleted_at", null)
    .maybeSingle();

  if (loadErr) throw loadErr;
  if (!row) {
    return { ok: false as const, error: "Post not found.", status: 404 };
  }

  const nextContent = mergeHiddenSectionsIntoContent(
    row.content,
    normalizeHiddenSectionIds(hiddenSections),
  );

  const { error: updateErr } = await sb
    .from("blog_posts")
    .update({ content: nextContent })
    .eq("id", row.id);

  if (updateErr) throw updateErr;
  invalidateCmsReadCaches();

  return {
    ok: true as const,
    hiddenSections: normalizeHiddenSectionIds(hiddenSections),
  };
}
