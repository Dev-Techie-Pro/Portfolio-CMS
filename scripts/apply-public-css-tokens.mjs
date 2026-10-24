/**
 * Snap font-size, font-weight, and gap in public CSS bundles to nearest
 * :root tokens parsed from public/assets/css/styles.css
 */
import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const projectRoot = cwd();
const tokensRel = 'public/assets/css/styles.css';
const tokensPath = path.join(projectRoot, tokensRel);
const REM_BASE = 16;

const PUBLIC_CSS_FILES = [
  tokensRel,
  'public/assets/css/blog-pages.css',
  'public/assets/css/carousel.css',
];

const SKIP_FONT =
  /^(clamp\(|calc\(|inherit|unset|initial|revert|max\(|min\()/i;

function normalizeValue(raw) {
  return raw.trim().replace(/\s+/g, ' ');
}

function parsePxFromTokenValue(val) {
  const v = normalizeValue(val);
  if (v.endsWith('px')) return parseFloat(v);
  if (v.endsWith('rem')) return parseFloat(v) * REM_BASE;
  return null;
}

/** @returns {{ fs: {name:string,px:number}[], gap: {name:string,px:number}[], fw: {name:string,value:number}[], fsNames:Set, gapNames:Set, fwNames:Set, gapRem4: string|null }} */
function parseTokenScales(css) {
  const fs = [];
  const gap = [];
  const fw = [];
  const fsNames = new Set();
  const gapNames = new Set();
  const fwNames = new Set();
  let gapRem4 = null;

  const m = css.match(/:root\s*\{([^}]*)\}/);
  if (!m) throw new Error(':root not found in styles.css');

  for (const line of m[1].split('\n')) {
    const def = line.match(/^\s*(--[a-z0-9_-]+)\s*:\s*([^;]+);/i);
    if (!def) continue;
    const name = def[1];
    const val = normalizeValue(def[2]);

    if (/^--fs-/i.test(name)) {
      const px = parsePxFromTokenValue(val);
      if (px != null) {
        fs.push({ name, px });
        fsNames.add(name);
      }
    }
    if (/^--fw-/i.test(name)) {
      const n = parseInt(val, 10);
      if (!Number.isNaN(n)) {
        fw.push({ name, value: n });
        fwNames.add(name);
      }
    }
    if (/^--card-gap-/i.test(name)) {
      const px = parsePxFromTokenValue(val);
      if (px != null) {
        gap.push({ name, px });
        gapNames.add(name);
      }
    }
    if (name === '--gap') {
      const px = parsePxFromTokenValue(val);
      if (px != null && Math.abs(px - 4 * REM_BASE) < 0.5) {
        gapRem4 = name;
        gap.push({ name, px });
        gapNames.add(name);
      }
    }
  }

  for (const t of fs) {
    if (!gap.some((g) => g.name === t.name)) {
      gap.push({ name: t.name, px: t.px });
    }
  }

  fs.sort((a, b) => a.px - b.px);
  gap.sort((a, b) => a.px - b.px);
  fw.sort((a, b) => a.value - b.value);

  return { fs, gap, fw, fsNames, gapNames, fwNames, gapRem4 };
}

function lengthToPx(part) {
  const p = part.trim();
  if (p === '0') return 0;
  const pxM = p.match(/^(-?[\d.]+)px$/);
  if (pxM) return parseFloat(pxM[1]);
  const remM = p.match(/^(-?[\d.]+)rem$/);
  if (remM) return parseFloat(remM[1]) * REM_BASE;
  const emM = p.match(/^(-?[\d.]+)em$/);
  if (emM) return parseFloat(emM[1]) * REM_BASE;
  return null;
}

function nearestByPx(px, scale) {
  if (!scale.length) return null;
  let best = scale[0];
  let bestDist = Math.abs(px - best.px);
  for (const item of scale) {
    const d = Math.abs(px - item.px);
    if (d < bestDist) {
      best = item;
      bestDist = d;
    }
  }
  return best.name;
}

function nearestFw(n, fwScale) {
  if (!fwScale.length) return null;
  let best = fwScale[0];
  let bestDist = Math.abs(n - best.value);
  for (const item of fwScale) {
    const d = Math.abs(n - item.value);
    if (d < bestDist) {
      best = item;
      bestDist = d;
    }
  }
  return best.name;
}

function isKnownGapVar(name, scales) {
  return (
    scales.gapNames.has(name) ||
    scales.fsNames.has(name) ||
    name === scales.gapRem4
  );
}

function snapFontSizeValue(raw, scales) {
  const v = normalizeValue(raw);
  if (SKIP_FONT.test(v)) return null;
  if (v.startsWith('var(')) {
    const inner = v.match(/^var\((--[a-z0-9_-]+)\)$/i);
    if (!inner) return null;
    const name = inner[1];
    if (scales.fsNames.has(name)) return null;
    let px = null;
    const token = scales.fs.find((t) => t.name === name);
    if (token) px = token.px;
    if (px == null) return null;
    return `var(${nearestByPx(px, scales.fs)})`;
  }
  const px = lengthToPx(v);
  if (px == null) return null;
  return `var(${nearestByPx(px, scales.fs)})`;
}

function snapGapFromPx(px, scales) {
  if (px === 0) return '0';
  if (scales.gapRem4 && Math.abs(px - 4 * REM_BASE) < 0.5) {
    return `var(${scales.gapRem4})`;
  }
  const name = nearestByPx(px, scales.gap);
  return name ? `var(${name})` : `${px}px`;
}

function snapGapPart(part, scales) {
  const p = part.trim();
  if (p === '0' || p === 'unset' || p === 'initial') return p;
  if (p.startsWith('var(')) {
    const inner = p.match(/^var\((--[a-z0-9_-]+)\)$/i);
    if (!inner) return p;
    const name = inner[1];
    if (isKnownGapVar(name, scales)) return p;
    let px = null;
    const g = scales.gap.find((t) => t.name === name);
    if (g) px = g.px;
    else {
      const f = scales.fs.find((t) => t.name === name);
      if (f) px = f.px;
    }
    if (px == null) return p;
    return snapGapFromPx(px, scales);
  }
  if (p === '4rem' && scales.gapRem4) return `var(${scales.gapRem4})`;
  const px = lengthToPx(p);
  if (px == null) return p;
  return snapGapFromPx(px, scales);
}

function replaceFontSizes(line, scales) {
  return line.replace(/font-size:\s*([^;{}]+)/gi, (full, raw) => {
    const imp = raw.includes('!important') ? ' !important' : '';
    const v = normalizeValue(raw.replace(/\s*!important\s*/i, ''));
    const snapped = snapFontSizeValue(v, scales);
    if (!snapped) return full;
    return `font-size: ${snapped}${imp}`;
  });
}

function replaceFontWeights(line, scales) {
  if (/^\s*--fw-/i.test(line)) return line;
  return line.replace(/font-weight:\s*([^;{}]+)/gi, (full, raw) => {
    const imp = raw.includes('!important') ? ' !important' : '';
    const v = normalizeValue(raw.replace(/\s*!important\s*/i, ''));
    if (v.includes('var(--')) {
      const inner = v.match(/^var\((--fw-[a-z0-9_-]+)\)$/i);
      if (inner && scales.fwNames.has(inner[1])) return full;
      if (inner) {
        const tok = scales.fw.find((t) => t.name === inner[1]);
        const n = tok ? tok.value : 400;
        return `font-weight: var(${nearestFw(n, scales.fw)})${imp}`;
      }
      return full;
    }
    if (!/^\d{3}$/.test(v)) return full;
    const name = nearestFw(parseInt(v, 10), scales.fw);
    return name ? `font-weight: var(${name})${imp}` : full;
  });
}

function isRootTokenDef(line) {
  return /^\s*--(fs|fw|card-gap|gap)\b/i.test(line);
}

function replaceGaps(line, scales) {
  if (/^\s*--/.test(line)) return line;
  return line.replace(
    /(?:^|[^\w-])(gap|row-gap|column-gap):\s*([^;{}]+)/gi,
    (full, prop, raw) => {
      const imp = raw.includes('!important') ? ' !important' : '';
      const v = normalizeValue(raw.replace(/\s*!important\s*/i, ''));
      if (v.includes('calc(')) return full;
      const parts = v.split(/\s+/);
      const out = parts.map((part) => snapGapPart(part, scales));
      if (out.join(' ') === parts.join(' ')) return full;
      const prefix = full.match(/^[^\w-]*/)?.[0] ?? '';
      return `${prefix}${prop}: ${out.join(' ')}${imp}`;
    },
  );
}

const tokensCss = fs.readFileSync(tokensPath, 'utf8');
const scales = parseTokenScales(tokensCss);

let totalUpdates = 0;
for (const rel of PUBLIC_CSS_FILES) {
  const filePath = path.join(projectRoot, rel);
  const before = fs.readFileSync(filePath, 'utf8');
  const after = before
    .split('\n')
    .map((line) => {
      if (filePath === tokensPath && isRootTokenDef(line)) return line;
      let out = replaceFontWeights(line, scales);
      out = replaceFontSizes(out, scales);
      out = replaceGaps(out, scales);
      return out;
    })
    .join('\n');
  if (before !== after) {
    fs.writeFileSync(filePath, after, 'utf8');
    totalUpdates++;
  }
  console.log(`${rel}: ${before === after ? 'no changes' : 'updated'}`);
}

console.log(`\nDone. ${totalUpdates} file(s) updated.`);
console.log(
  `Tokens: ${scales.fs.length} fs, ${scales.gap.length} gap candidates, ${scales.fw.length} fw`,
);
