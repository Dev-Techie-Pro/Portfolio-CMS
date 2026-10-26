import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import { normalizePortfolioIconKey, resolveTechIconName } from "@/lib/portfolio/resolve-tech-icon";

export type PortfolioExperienceImpact = {
  value: string;
  label: string;
};

export type PortfolioExperienceTechnology = {
  id: number;
  name: string;
  icon: string;
};

export type PortfolioExperienceEntry = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  mode: string;
  teamSize: string;
  domain: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  impacts: PortfolioExperienceImpact[];
  technologies: PortfolioExperienceTechnology[];
  sortOrder: number;
};

function normalizeImpacts(raw: unknown): PortfolioExperienceImpact[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 3)
    .map((item) => {
      const row = item as { value?: string; label?: string };
      return {
        value: String(row?.value ?? "").trim(),
        label: String(row?.label ?? "").trim(),
      };
    })
    .filter((item) => item.value || item.label);
}

export async function fetchPortfolioExperience(): Promise<PortfolioExperienceEntry[]> {
  const sb = createAdminClient();

  const [{ data: rows, error }, { data: techRows, error: techError }] = await Promise.all([
    sb
      .from("experience_entries")
      .select(
        "legacy_id, job_title, company, location, employment_type, work_mode, team_size, domain, start_date, end_date, is_current, description, key_achievements, role_impacts, technology_ids, sort_order",
      )
      .eq("site_id", SITE_ID)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("start_date", { ascending: false }),
    sb
      .from("technologies")
      .select("legacy_id, name")
      .eq("site_id", SITE_ID)
      .is("deleted_at", null),
  ]);

  if (error) throw error;
  if (techError) throw techError;

  const techById = new Map<number, { name: string; icon: string }>();
  for (const t of techRows || []) {
    if (t.legacy_id == null) continue;
    const legacyId = Number(t.legacy_id);
    if (!Number.isFinite(legacyId)) continue;
    const name = String(t.name || "").trim();
    techById.set(legacyId, {
      name,
      icon: normalizePortfolioIconKey(resolveTechIconName(name)),
    });
  }

  return (rows || []).map((row, index) => {
    const ids = Array.isArray(row.technology_ids) ? row.technology_ids : [];
    const seenNames = new Set<string>();
    const technologies: PortfolioExperienceTechnology[] = [];
    for (const rawId of ids) {
      const id = typeof rawId === "number" ? rawId : Number(rawId);
      if (!Number.isFinite(id)) continue;
      const tech = techById.get(id);
      if (!tech) continue;
      const norm = tech.name.trim().toLowerCase();
      if (!norm || seenNames.has(norm)) continue;
      seenNames.add(norm);
      technologies.push({
        id,
        name: tech.name,
        icon: normalizePortfolioIconKey(tech.icon),
      });
    }

    return {
      id: typeof row.legacy_id === "number" ? row.legacy_id : index + 1,
      title: row.job_title,
      company: row.company,
      location: row.location || "",
      type: row.employment_type,
      mode: row.work_mode || "",
      teamSize: row.team_size || "",
      domain: row.domain || "",
      startDate: row.start_date,
      endDate: row.end_date || null,
      current: !!row.is_current,
      description: row.description || "",
      achievements: Array.isArray(row.key_achievements)
        ? row.key_achievements.filter(Boolean)
        : [],
      impacts: normalizeImpacts(row.role_impacts),
      technologies,
      sortOrder: row.sort_order ?? 0,
    };
  });
}
