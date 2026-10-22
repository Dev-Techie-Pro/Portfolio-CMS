// @ts-nocheck
/** Collect public-site section targets from article HTML (mirrors blog-article-ui.js). */

export function collectSectionTargetsFromHtml(html) {
  const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
  const root = doc.body;
  const items = [];
  const seen = new Set();

  root.querySelectorAll('section[id]').forEach((section) => {
    const id = section.getAttribute('id');
    if (!id || seen.has(id)) return;
    const title =
      section.querySelector('h2')?.textContent?.trim() ||
      section.querySelector('h3')?.textContent?.trim() ||
      id;
    items.push({ id, title });
    seen.add(id);
  });

  root.querySelectorAll('[data-bd-segment-id]').forEach((node) => {
    const id = node.getAttribute('data-bd-segment-id');
    if (!id || seen.has(id)) return;
    const title =
      node.getAttribute('data-bd-segment-title') ||
      node.querySelector('.stat-value')?.textContent?.trim() ||
      id;
    items.push({ id, title });
    seen.add(id);
  });

  return items;
}

export function normalizeHiddenSectionIds(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const raw of list) {
    const id = String(raw || '').trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export function pruneHiddenSections(hiddenSections, validIds) {
  const valid = validIds instanceof Set ? validIds : new Set(validIds || []);
  return normalizeHiddenSectionIds(hiddenSections).filter((id) => valid.has(id));
}
