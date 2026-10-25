// @ts-nocheck
import { withStaffGet } from '@/lib/api/with-staff-get';
import { loadRemixIconNames } from '@/lib/remix-icon-glyph';

const TAGS_URL = 'https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/tags.json';

let tagsCache: Record<string, unknown> | null = null;
let tagsLoadPromise: Promise<Record<string, unknown>> | null = null;
let iconNamesCache: string[] | null = null;

async function loadTags(): Promise<Record<string, unknown>> {
  if (tagsCache) return tagsCache;
  if (!tagsLoadPromise) {
    tagsLoadPromise = fetch(TAGS_URL)
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
      .then((data) => {
        tagsCache = data && typeof data === 'object' ? data : {};
        return tagsCache;
      });
  }
  return tagsLoadPromise;
}

async function loadIcons(): Promise<string[]> {
  if (iconNamesCache) return iconNamesCache;
  iconNamesCache = await loadRemixIconNames();
  return iconNamesCache;
}

export async function GET() {
  return withStaffGet(async () => {
    const [icons, tags] = await Promise.all([loadIcons(), loadTags()]);
    return { icons, tags };
  }, { maxAgeSec: 86400 });
}
