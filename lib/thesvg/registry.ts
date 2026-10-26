// @ts-nocheck

const REGISTRY_URL = 'https://thesvg.org/api/registry.json';
const REGISTRY_CDN_URL =
  'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/src/data/icons.json';

export type ThesvgRegistryIcon = {
  slug: string;
  title: string;
  aliases: string[];
  categories: string[];
  hex: string;
};

export function normalizeThesvgRegistry(data: unknown): ThesvgRegistryIcon[] {
  const icons = Array.isArray((data as { icons?: unknown })?.icons)
    ? (data as { icons: unknown[] }).icons
    : [];
  return icons
    .filter((icon) => icon && typeof icon === 'object' && (icon as { slug?: string }).slug)
    .map((icon) => {
      const row = icon as {
        slug: string;
        title?: string;
        aliases?: string[];
        categories?: string[];
        hex?: string;
      };
      return {
        slug: row.slug,
        title: row.title || row.slug,
        aliases: Array.isArray(row.aliases) ? row.aliases : [],
        categories: Array.isArray(row.categories) ? row.categories : [],
        hex: row.hex || '',
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

let registryCache: ThesvgRegistryIcon[] | null = null;
let registryPromise: Promise<ThesvgRegistryIcon[]> | null = null;

async function fetchRegistryJson(url: string): Promise<ThesvgRegistryIcon[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Registry fetch failed (${res.status})`);
  const data = await res.json();
  return normalizeThesvgRegistry(data);
}

/** Server-side cached theSVG registry metadata (slug list, titles, categories). */
export async function loadThesvgRegistry(): Promise<ThesvgRegistryIcon[]> {
  if (registryCache) return registryCache;
  if (!registryPromise) {
    registryPromise = fetchRegistryJson(REGISTRY_URL)
      .catch(() => fetchRegistryJson(REGISTRY_CDN_URL))
      .then((icons) => {
        registryCache = icons;
        return icons;
      })
      .catch((err) => {
        registryPromise = null;
        throw err;
      });
  }
  return registryPromise;
}
