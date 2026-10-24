/**
 * Extract .pa-rte-body--blog rules from blog-pages.css into admin-only stylesheet.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogPages = fs.readFileSync(
  path.join(root, 'public/assets/css/blog-pages.css'),
  'utf8',
);

const TOKEN_HEADER = `/**
 * Admin blog workspace RTE — public article prose tokens + rules (isolated from full blog-pages.css).
 * Regenerate: node scripts/extract-admin-blog-rte-css.mjs
 */
.pa-rte-body--blog {
  --accent: #22c55e;
  --accent-dim: #22c55e7c;
  --accent-orange: #ff7a1a;
  --accent-green: #22c55e;
  --accent-blue-dim: #2464cabb;
  --danger: #f3232e;
  --danger-dim: #f36f23a2;
  --bg: #080808;
  --bg-card: #111111;
  --bg-card-hover: #161616;
  --white: #ffffff;
  --white-dim: rgba(255, 255, 255, 0.9);
  --gray: #888888;
  --font-body: "Poppins", sans-serif;
  --font-mono: "Figtree", sans-serif;
  --br-none: 0;
  --sh3: 0 12px 40px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(34, 197, 94, 0.48);
  --card-gap-sm: 6px;
  --card-gap-md: 12px;
  --card-gap-lg: 16px;
  --fs-8: 8px;
  --fs-10: 10px;
  --fs-12: 12px;
  --fs-14: 14px;
  --fs-16: 16px;
  --fs-22: 22px;
  color: var(--white-dim);
  font-family: var(--font-body);
}

`;

function stripArticleContentSelectors(selector) {
  return selector
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.includes('.pa-rte-body--blog'))
    .join(', ');
}

const blocks = [];
let i = 0;
const n = blogPages.length;
while (i < n) {
  if (blogPages[i] === '/' && blogPages[i + 1] === '*') {
    i = blogPages.indexOf('*/', i) + 2;
    continue;
  }
  const brace = blogPages.indexOf('{', i);
  if (brace === -1) break;
  const prelude = blogPages.slice(i, brace).trim();
  if (!prelude.includes('.pa-rte-body--blog')) {
    i = blogPages.indexOf('}', brace) + 1;
    continue;
  }
  let depth = 0;
  let j = brace;
  for (; j < n; j++) {
    if (blogPages[j] === '{') depth++;
    else if (blogPages[j] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  const body = blogPages.slice(brace + 1, j);
  const cleaned = stripArticleContentSelectors(prelude);
  if (cleaned) blocks.push(`${cleaned} {\n${body}\n}`);
  i = j + 1;
}

const out = TOKEN_HEADER + blocks.join('\n\n') + '\n';
const outPath = path.join(root, 'app/admin/styles/blog-rte-prose.css');
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${blocks.length} rules)`);
