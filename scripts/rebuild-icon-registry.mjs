/**
 * Rebuilds client/utils/icon-registry.ts and public/assets/js/data/icon-registry.js
 */
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";

const ROOT = path.resolve(import.meta.dirname, "..");
const REGISTRY_TS = path.join(ROOT, "client/utils/icon-registry.ts");
const REGISTRY_JS = path.join(ROOT, "public/assets/js/data/icon-registry.js");
const UPLOAD_PATH = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/e-My-Work-Web-Designs-Poerfolio-CMS/uploads/Untitled-3-L1-L2777-2.txt",
);

const REMOVE_KEYS = new Set(
  `siArrowUp siColse siCheckmark siArrowTilt siTheme siArrowRight siDownload siBriefcase siUsers siStar siStarfill siPhone siPen siSpark siMonitor siSend siGithub siLinkedin siXcom siInstagram siCode siExclamination siExternalLink siEnvelope siLocationPin siMinus siHeart siBriefcaseA siRocket siUser siAward siCalendar siBuilding siSearch siChevronDown siFilters siRefresh siFile siApps siBars siMansnory siAngleLeft siAngleRight siMeshWrap siRench siShieldCheck siEye siBookOpen siClock siSmartphone siCalendarCheck siSmile siChat siListView siChevronLeft siChevronRight siShield siHeadphone siEmail siSettings siPlay siFlag siFaceEmoji siBarsChart siLock siDocument siPhoneScreen siBell siDoubleSquare siSun siEdit siGrid siTrending siCart siMessage siFacebook siLink siPlus siFaqChat siHome siReview`.split(
    " ",
  ),
);

const KEEP_EXTRA = new Set([
  "siMariaDB",
  "siWordpress",
  "siPhpFill",
  "siDoubleCircle",
]);

const NEW_ICON_SPECS = [
  { key: "siAspNetCore", title: "ASP.NET Core" },
  { key: "siAdoNet", title: "ADO .NET" },
  { key: "siWpf", title: "WPF" },
  { key: "siEntityFramework", title: "Entity Framwork" },
  { key: "siWebApiBrand", title: "Web API" },
  { key: "siWindowsForms", title: "Windows Forms" },
  { key: "siXaml", title: "XAML" },
  { key: "siAws", title: "AWS" },
  { key: "siSnowflake", title: "Snowflake" },
  { key: "siSelenium", title: "Selenium" },
  { key: "siAppium", title: "Appium" },
  { key: "siJMeter", title: "JMeter" },
  { key: "siWebForms", title: "WebForms" },
  { key: "siStripe", title: "stripe" },
  { key: "siPaypal", title: "paypal" },
  { key: "siPayoneer", title: "payoneer" },
  { key: "siMastercard", title: "Mastercard" },
  { key: "siVisa", title: "Visa" },
  { key: "siRazorpay", title: "Razorpay" },
  { key: "siStripeLink", title: "Stripe link" },
  { key: "siEasypaisa", title: "Easypaisa" },
  { key: "siJazzcash", title: "Jazzcash" },
  { key: "siAntigravity", title: "Antigravity" },
];

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
  const exports = module.exports;
  // eslint-disable-next-line no-new-func
  new Function("module", "exports", result.outputFiles[0].text)(module, exports);
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

function escapeForTsSingleQuoted(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r/g, "");
}

function normalizeSvg(svg) {
  return String(svg).replace(/\s+/g, " ").trim();
}

function formatSvgValue(svg) {
  const oneLine = normalizeSvg(svg);
  return `'${escapeForTsSingleQuoted(oneLine)}'`;
}

function formatEntry(key, svg) {
  const val = formatSvgValue(svg);
  return `  ${key}:\n    ${val},`;
}

function parseNewIconsFromUpload(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const out = new Map();
  for (const spec of NEW_ICON_SPECS) {
    const titleRe = new RegExp(
      `\\n\\d+\\.\\s*${spec.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n`,
      "i",
    );
    const titleMatch = titleRe.exec(text);
    if (!titleMatch) throw new Error(`Could not find section for ${spec.title}`);
    const svgStart = text.indexOf("<svg", titleMatch.index);
    const svgEnd = text.indexOf("</svg>", svgStart);
    let svg = text.slice(svgStart, svgEnd + "</svg>".length);
    svg = svg.replace(/\s+xmlns:c2pa="[^"]*"/g, "");
    out.set(spec.key, svg);
  }
  return out;
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

const ICONS = await loadBuiltInIconsFromTs();
const techMod = loadCjsBundle(
  path.join(ROOT, "lib/portfolio/tech-brand-icons.ts"),
);
const TECH_BRAND_ICONS = techMod.TECH_BRAND_ICONS || {};
const techKeys = new Set(Object.keys(TECH_BRAND_ICONS));

const builtIn = new Map();
for (const [key, svg] of Object.entries(ICONS)) {
  if (techKeys.has(key)) continue;
  if (REMOVE_KEYS.has(key)) continue;
  builtIn.set(key, svg);
}

for (const key of KEEP_EXTRA) {
  if (ICONS[key] && !REMOVE_KEYS.has(key)) builtIn.set(key, ICONS[key]);
}

if (!fs.existsSync(UPLOAD_PATH)) {
  console.error("Missing upload:", UPLOAD_PATH);
  process.exit(1);
}
for (const [key, svg] of parseNewIconsFromUpload(UPLOAD_PATH)) {
  builtIn.set(key, svg);
}

const techBrand = new Map(Object.entries(TECH_BRAND_ICONS));

writeRegistryFiles(builtIn, techBrand);
console.log(
  `Wrote icon registry: ${builtIn.size} built-in + ${techBrand.size} tech-brand icons.`,
);
