import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import {
  getCached,
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTL,
} from "@/lib/cms/server-cache";

type PortfolioProjectRecord = Record<string, unknown>;

async function loadPortfolioProjectsMap(): Promise<PortfolioProjectRecord> {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("projects")
    .select(
      "legacy_id, slug, title, short_description, full_description, featured_image_url, live_url, repo_url, status, detail_payload",
    )
    .eq("site_id", SITE_ID)
    .is("deleted_at", null)
    .eq("status", "Completed")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  const map: PortfolioProjectRecord = {};
  for (const row of data || []) {
    const key =
      (typeof row.slug === "string" && row.slug.trim()) ||
      String(row.legacy_id ?? "");
    if (!key) continue;

    const payload = row.detail_payload;
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      map[key] = payload as PortfolioProjectRecord;
      continue;
    }

    map[key] = {
      id: key,
      name: row.title,
      desc: row.short_description,
      liveUrl: row.live_url || "#",
      githubUrl: row.repo_url || "#",
      heroImage: row.featured_image_url || "",
    };
  }

  return map;
}

export async function fetchPortfolioProjectsMap(): Promise<PortfolioProjectRecord> {
  return getCached(
    PUBLIC_CACHE_KEYS.portfolioProjects,
    PUBLIC_CACHE_TTL.publicContent,
    () => loadPortfolioProjectsMap(),
  );
}
