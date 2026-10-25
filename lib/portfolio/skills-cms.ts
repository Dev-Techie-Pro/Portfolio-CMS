import { getTechnologies, getToolCategories, getToolItems } from "@/lib/cms/repository";
import { resolveTechIconName } from "@/lib/portfolio/resolve-tech-icon";

export type PortfolioSkillItem = {
  id: number;
  name: string;
  kind: "technology" | "tool";
  portfolioIcon: string;
  iconUrl: string;
  sortOrder: number;
};

export type PortfolioSkillCategory = {
  id: number;
  key: string;
  label: string;
  description: string;
  proficiencyPct: number;
  iconClass: string;
  portfolioIcon: string;
  sortOrder: number;
  items: PortfolioSkillItem[];
};

export type PortfolioSkillsTickers = {
  tools: { label: string }[];
  technologies: { label: string }[];
  ai: { label: string }[];
};

export type PortfolioSkillsPayload = {
  categories: PortfolioSkillCategory[];
  tickers: PortfolioSkillsTickers;
};

const CATEGORY_PORTFOLIO_ICON: Record<string, string> = {
  frontend: "siCode",
  backend: "siBackend",
  database: "siServer",
  devops: "siServer",
  design: "siFigma",
  "ai-tools": "siSpark",
  "ai-tools-ide": "siSpark",
};

function categoryPortfolioIcon(key: string, iconClass: string): string {
  const token = String(key || "").trim().toLowerCase();
  if (CATEGORY_PORTFOLIO_ICON[token]) return CATEGORY_PORTFOLIO_ICON[token];
  const short = token.split("-")[0];
  if (CATEGORY_PORTFOLIO_ICON[short]) return CATEGORY_PORTFOLIO_ICON[short];
  if (iconClass && iconClass.trim().startsWith("ri-")) return "siCode";
  return "siCode";
}

function isAiCategory(key: string, label: string): boolean {
  const blob = `${key} ${label}`.toLowerCase();
  return blob.includes("ai") || blob.includes("artificial");
}

type NamedCmsRecord = { name: string; categoryId?: number | null };

function tickerLabelsFromNamed(rows: ReadonlyArray<NamedCmsRecord>): { label: string }[] {
  return rows
    .map((row) => ({ label: row.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function fetchPortfolioSkills(): Promise<PortfolioSkillsPayload> {
  const [categories, technologies, tools] = await Promise.all([
    getToolCategories(),
    getTechnologies(),
    getToolItems(),
  ]);

  const sortedCategories = [...categories].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || String(a.label).localeCompare(String(b.label)),
  );

  const techByCat = new Map<number, PortfolioSkillItem[]>();
  for (const tech of technologies) {
    if (tech.categoryId == null) continue;
    const catId = Number(tech.categoryId);
    const list = techByCat.get(catId) || [];
    list.push({
      id: Number(tech.id),
      name: tech.name,
      kind: "technology",
      portfolioIcon: resolveTechIconName(tech.name),
      iconUrl: "",
      sortOrder: tech.sortOrder ?? 0,
    });
    techByCat.set(catId, list);
  }

  const toolsByCat = new Map<number, PortfolioSkillItem[]>();
  for (const tool of tools) {
    if (tool.categoryId == null) continue;
    const catId = Number(tool.categoryId);
    const list = toolsByCat.get(catId) || [];
    list.push({
      id: Number(tool.id),
      name: tool.name,
      kind: "tool",
      portfolioIcon: resolveTechIconName(tool.name),
      iconUrl: tool.iconUrl || "",
      sortOrder: tool.sortOrder ?? 0,
    });
    toolsByCat.set(catId, list);
  }

  const payloadCategories: PortfolioSkillCategory[] = sortedCategories
    .map((cat) => {
      const catId = Number(cat.id);
      const items = [
        ...(techByCat.get(catId) || []),
        ...(toolsByCat.get(catId) || []),
      ].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
      );
      return {
        id: catId,
        key: cat.key,
        label: cat.label,
        description: cat.description || "",
        proficiencyPct: Math.min(100, Math.max(0, Number(cat.proficiencyPct) || 0)),
        iconClass: cat.iconClass || "",
        portfolioIcon: categoryPortfolioIcon(cat.key, cat.iconClass || ""),
        sortOrder: cat.sortOrder ?? 0,
        items,
      };
    })
    .filter((cat) => cat.items.length > 0 || cat.label);

  const tickerTools = tickerLabelsFromNamed(tools as NamedCmsRecord[]);
  const tickerTechnologies = tickerLabelsFromNamed(technologies as NamedCmsRecord[]);

  const aiLabels = new Set<string>();
  for (const cat of sortedCategories) {
    if (!isAiCategory(cat.key, cat.label)) continue;
    for (const t of (tools as NamedCmsRecord[]).filter(
      (x) => Number(x.categoryId) === Number(cat.id),
    )) {
      aiLabels.add(t.name);
    }
    for (const t of (technologies as NamedCmsRecord[]).filter(
      (x) => Number(x.categoryId) === Number(cat.id),
    )) {
      aiLabels.add(t.name);
    }
  }
  const tickerAi = [...aiLabels].sort((a, b) => a.localeCompare(b)).map((label) => ({ label }));

  return {
    categories: payloadCategories.filter((c) => c.items.length > 0),
    tickers: {
      tools: tickerTools,
      technologies: tickerTechnologies,
      ai: tickerAi,
    },
  };
}
