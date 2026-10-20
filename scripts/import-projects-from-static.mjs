/**
 * Import window.Portfolio.PROJECTS from public/assets/js/projects-data.js into Supabase.
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE_ID = process.env.SUPABASE_SITE_ID || '00000000-0000-4000-8000-000000000001';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const raw = fs.readFileSync(
  path.join(ROOT, 'public/assets/js/data/projects-data.js'),
  'utf8',
);
const sandbox = { window: { Portfolio: {} } };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);
const projects = sandbox.window.Portfolio.PROJECTS || {};
const entries = Object.entries(projects);
if (!entries.length) {
  console.error('No projects found in static file.');
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let sort = 0;
for (const [slug, detail] of entries) {
  sort += 1;
  const p = detail;
  const title = String(p.name || p.title || slug);
  const short = String(p.desc || p.subtitle || '').slice(0, 500);
  const full = String(p.overviewParagraphs?.[0] || short);
  const legacyNum = Number(p.num?.replace(/\D/g, '')) || sort;

  const row = {
    site_id: SITE_ID,
    legacy_id: legacyNum,
    slug,
    title,
    category_key: 'general',
    short_description: short || title,
    full_description: full || short || title,
    featured_image_url: p.heroImage || null,
    live_url: p.liveUrl && p.liveUrl !== '#' ? p.liveUrl : null,
    repo_url: p.githubUrl || null,
    status: 'Completed',
    sort_order: sort,
    is_featured: false,
    detail_payload: p,
  };

  const { error } = await sb.from('projects').upsert(row, {
    onConflict: 'site_id,slug',
  });
  if (error) {
    console.warn(`[skip] ${slug}:`, error.message);
  } else {
    console.log(`[ok] ${slug}`);
  }
}

console.log(`Imported ${entries.length} projects.`);
