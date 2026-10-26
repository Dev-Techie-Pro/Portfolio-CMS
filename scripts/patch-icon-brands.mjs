/**
 * Patch specific brand SVGs in icon-registry.ts / icon-registry.js without full rebuild.
 */
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";

const ROOT = path.resolve(import.meta.dirname, "..");
const REGISTRY_TS = path.join(ROOT, "client/utils/icon-registry.ts");
const REGISTRY_JS = path.join(ROOT, "public/assets/js/data/icon-registry.js");
const DATA_DIR = path.join(ROOT, "scripts/data");
const CACHE_DIR = path.join(ROOT, ".cache/icon-registry");

function loadCjsBundle(entry) {
  const result = esbuild.buildSync({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    logLevel: "silent",
  });
  const module = { exports: {} };
  new Function("module", "exports", result.outputFiles[0].text)(
    module,
    module.exports,
  );
  return module.exports;
}

async function loadBuiltInIconsFromTs() {
  let src = fs.readFileSync(REGISTRY_TS, "utf8");
  src = src.replace(/^import\s+.*tech-brand-icons.*\n/m, "");
  src = src.replace(/\.\.\.TECH_BRAND_ICONS,?\s*/g, "");
  src = src.replace("export const ICONS", "export const BUILT_IN_ICONS");
  const tmp = path.join(CACHE_DIR, "icon-builtin-entry.ts");
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(tmp, src, "utf8");
  const mod = loadCjsBundle(tmp);
  return mod.BUILT_IN_ICONS || {};
}

function normalizeSvg(svg) {
  return String(svg).replace(/\s+/g, " ").trim();
}

function escapeForTsSingleQuoted(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r/g, "");
}

function formatEntry(key, svg) {
  const oneLine = `'${escapeForTsSingleQuoted(normalizeSvg(svg))}'`;
  return `  ${key}:\n    ${oneLine},`;
}

function writeRegistryFiles(builtIn, techBrand) {
  const builtInLines = [...builtIn.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, svg]) => formatEntry(key, svg));
  const techLines = [...techBrand.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, svg]) => formatEntry(key, svg));

  const tsBody = `// @ts-nocheck
/** Built-in portfolio SVG icons (custom marks + tech brands). UI glyphs use Remix Icon (ri-*) on the public site. */

export const TECH_BRAND_ICONS = {
${techLines.join("\n")}
};

export const ICONS = {
${builtInLines.join("\n")}
  ...TECH_BRAND_ICONS,
};
`;

  const jsBody = `export const TECH_BRAND_ICONS = {
${techLines.join("\n")}
};

export const ICONS = {
${builtInLines.join("\n")}
  ...TECH_BRAND_ICONS,
};
`;

  fs.writeFileSync(REGISTRY_TS, tsBody, "utf8");
  fs.writeFileSync(REGISTRY_JS, jsBody, "utf8");
}

function readSvgFile(name) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) throw new Error(`Missing ${p}`);
  return fs.readFileSync(p, "utf8");
}

const PATCH_FILES = {
  siGit: "siGit.svg",
  siMsSqlBrand: "siMsSqlBrand.svg",
  siCloudflare: "siCloudflare.svg",
};

const ICONS = await loadBuiltInIconsFromTs();
const techMod = loadCjsBundle(
  path.join(ROOT, "lib/portfolio/tech-brand-icons.ts"),
);
const TECH_BRAND_ICONS = techMod.TECH_BRAND_ICONS || {};
const techKeys = new Set(Object.keys(TECH_BRAND_ICONS));

const builtIn = new Map();
for (const [key, svg] of Object.entries(ICONS)) {
  if (techKeys.has(key)) continue;
  builtIn.set(key, svg);
}

for (const [key, file] of Object.entries(PATCH_FILES)) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) {
    console.warn(`Skip ${key}: missing ${p}`);
    continue;
  }
  builtIn.set(key, readSvgFile(file));
}

if (!builtIn.has("siNetFramework") && builtIn.has("siDotNet")) {
  builtIn.set("siNetFramework", builtIn.get("siDotNet"));
}

for (const [key, svg] of Object.entries(builtIn)) {
  if (key === "siAdoNet" && typeof svg === "string" && !/viewBox=/i.test(svg)) {
    builtIn.set(
      key,
      svg.replace(/<svg\b/i, '<svg viewBox="0 0 512 512"'),
    );
  }
}

const techBrand = new Map(Object.entries(TECH_BRAND_ICONS));
writeRegistryFiles(builtIn, techBrand);
console.log("Patched icon registry:", Object.keys(PATCH_FILES).join(", "), "+ siNetFramework/viewBox fix");
