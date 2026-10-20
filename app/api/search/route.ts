// @ts-nocheck
import { guardStaff } from '@/lib/auth/guard';
import { searchCmsContent } from '@/lib/cms/content-search';
import { CMS_CACHE_TTL, getCached } from '@/lib/cms/server-cache';
import { jsonGet, jsonGetCached } from '@/lib/api/json-response';

export async function GET(request: Request) {
  const auth = await guardStaff();
  if (!auth.ok) return auth.response;

  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const limit = parseInt(url.searchParams.get('limit') || '20', 10);

  try {
    const cacheKey = `cms:search:${q.toLowerCase()}:${limit}`;
    const results = await getCached(cacheKey, CMS_CACHE_TTL.search, () =>
      searchCmsContent(q, limit),
    );
    return jsonGetCached({ results }, 15);
  } catch (error) {
    return jsonGet({ error: 'Search failed.' }, { status: 500 });
  }
}
