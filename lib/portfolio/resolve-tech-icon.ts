import { normalizeTechNameForIcon } from "@/lib/portfolio/normalize-tech-name";

/** Maps a technology name to portfolio site-icon registry keys (si*). */
type IconRule = [RegExp, string];

/** Exact normalized names → icon keys (after normalizeTechNameForIcon). */
const EXACT_TECH_ICON: Record<string, string> = {
  csharp: "siCsharp",
  css: "siCss3",
  css3: "siCss3",
  sass: "siCss3",
  scss: "siCss3",
  "tailwind css": "siTailwindcss",
  tailwindcss: "siTailwindcss",
  nextjs: "siNextJs",
  sql: "siSql",
  "sql server": "siSql",
  "ms sql": "siMsSqlBrand",
  mssql: "siMsSqlBrand",
};

/** Legacy or mistyped registry keys → canonical keys used on the public site. */
const PORTFOLIO_ICON_KEY_ALIASES: Record<string, string> = {
  siCSS: "siCss3",
  sicss: "siCss3",
  "siC#": "siCsharp",
  siCSharp: "siCsharp",
  siSQLServer: "siSql",
  siSqlServer: "siSql",
  siMssql: "siMsSqlBrand",
  siMsSQL: "siMsSqlBrand",
  siADO: "siAdoNet",
  siAdo: "siAdoNet",
  siNETFramework: "siNetFramework",
  siDotnetFramework: "siNetFramework",
};

export function normalizePortfolioIconKey(key: string): string {
  const trimmed = String(key || "").trim();
  if (!trimmed) return "ri-code-line";
  if (PORTFOLIO_ICON_KEY_ALIASES[trimmed]) {
    return PORTFOLIO_ICON_KEY_ALIASES[trimmed];
  }
  const lower = trimmed.toLowerCase();
  for (const [alias, canonical] of Object.entries(PORTFOLIO_ICON_KEY_ALIASES)) {
    if (alias.toLowerCase() === lower) return canonical;
  }
  return trimmed;
}

const ICON_RULES: IconRule[] = [
  [/cursor\s*agent|^cursor\b/, "siCursor"],
  [/\bclaude\b/, "siClaude"],
  [/\bcodex\b/, "siCodex"],
  [/\bchatgpt\b|openai/, "siChatGPT"],
  [/\bgemini\b/, "siGemini"],
  [/\bdeepseek\b/, "siDeepseek"],
  [/\bkimi\b/, "siKimi"],
  [/\blovable\b|loveable/, "siLoveable"],
  [/\bnext\s*js\b|\bnext\.?js\b|nextjs/, "siNextJs"],
  [/\bvercel\b/, "siVercel"],
  [/\bsupabase\b/, "siSupabase"],
  [/\bfirebase\b/, "siFirebase"],
  [/\bdocker\b/, "siDocker"],
  [/\bcloudflare\b/, "siCloudflare"],
  [/\bpostman\b/, "siPostman"],
  [/\bxampp\b/, "siXampp"],
  [/\bgithub\b/, "siGithub"],
  [/\bgitlab\b/, "ri-gitlab-fill"],
  [/(?<![a-z])git(?![a-z]|hub)/, "siGitScm"],
  [/\bfigma\b/, "siFigma"],
  [/\bphotoshop\b/, "siPhotoshop"],
  [/\billustrator\b/, "siIllustrator"],
  [/\badobe xd\b|\bxd design\b/, "siUIUx"],
  [/\bcanva\b/, "siCanva"],
  [/\bsketch\b/, "siSketch"],
  [/\bui\/?ux\b|user experience/, "siUIUx"],
  [/\belementor\b/, "siElementor"],
  [/\bwoocommerce\b|woo\s*commerce/, "siWoocom"],
  [/\bwordpress\b/, "siWordpress"],
  [/\badobe\s*premiere|premiere\s*pro\b/, "siAdobePremiere"],
  [/\bwp\s*bakery\b|wpbakery/, "siWpBakery"],
  [/\bpagefly\b/, "siPagefly"],
  [/\blivecharts\b/, "siLiveCharts"],
  [/\bjwt\b/, "siJwt"],
  [/visual studio code|vscode|vs\s*code/, "siVsCode"],
  [/\beclipse\b/, "siEclipse"],
  [/\bcrystal\s*report/, "siCrystalReports"],
  [/\bbarcode\b/, "siBarcodeSdk"],
  [/\bcustom\s*plugin/, "siWpPluginDev"],
  [/\bcustom\s*theme/, "siWpThemeDev"],
  [/\bcustom\s*post/, "siWpCpt"],
  [/\bmongoose\b/, "siMongooseOdm"],
  [/\brestful\s*apis?\b/, "siRestfulApi"],
  [/\bitextsharp\b|\bitext\b/, "siITextSharp"],
  [/\bclosedxml\b/, "siClosedXml"],
  [/\bacf\b|advanced\s*custom\s*fields/, "siAcf"],
  [/\bsublime\b/, "siSublimeIDE"],
  [/\bvisual studio\b/, "siVisualStudio"],
  [/entity\s*framework|ef\s*core|ef6\b/, "siEntityFramework"],
  [/\basp\s+net(\s+mvc)?\b/, "siASPNet"],
  [/\basp\.?net(\s+mvc)?\b/, "siASPNet"],
  [/\bwinforms\b|windows forms/, "siWindowsForms"],
  [/\bado\s+net\b/, "siAdoNet"],
  [/\bado\.?net\b/, "siAdoNet"],
  [/\.net\s*framework|dotnet\s*framework|net\s*framework/, "siNetFramework"],
  [/\.net\s*core|net\s*core|asp\.?net\s*core/, "siAspNetCore"],
  [/^dotnet$|^\.net$/, "siDotNet"],
  [/\bcsharp\b|c\s*sharp|c-sharp/, "siCsharp"],
  [/\bangular\b/, "siAngularJs"],
  [/\breact\b/, "siReactJs"],
  [/\bexpress\b/, "siExpressJs"],
  [/\bnode\.?js\b|\bnode\b/, "siNodeJs"],
  [/\bmongo(db)?\b/, "siMongodB"],
  [/\bpostgres(ql)?\b/, "siPostgreSql"],
  [/\bmariadb\b/, "siMariaDbDolphin"],
  [/\bmysql\b/, "siMySql"],
  [/\bms\s*sql\b|\bmssql\b/, "siMsSqlBrand"],
  [/\bsql\s*server\b/, "siSql"],
  [/\bsqlite\b/, "siSqlite"],
  [/\bazure\b/, "siMicrosoftAzure"],
  [/\btailwind(\s*css)?\b/, "siTailwindcss"],
  [/\bbootstrap\b/, "siBootstrap"],
  [/\btypescript\b/, "siTypescript"],
  [/\bjavascript\b/, "siJavascript"],
  [/\bphpmyadmin\b/, "siPhpMyAdmin"],
  [/\bphp\b/, "siPhpFill"],
  [/\bjquery\b/, "siJavascript"],
  [/\bhtml\b/, "siHTML5"],
  [/\bsass\b|\bscss\b/, "siCss3"],
  [/\bcss\s*3\b|\bcss3\b/, "siCss3"],
  [/\bcss\b/, "siCss3"],
  [/\brxjs\b/, "siJavascript"],
  [/\bjson\b/, "ri-braces-line"],
  [/\bstripe\b/, "siStripe"],
  [/\bpaypal\b/, "siPaypal"],
  [/\bmailchimp\b/, "ri-mail-line"],
  [/\bgraphql\b/, "siBackend"],
  [/\brest\s*apis?\b/, "siRestfulApi"],
  [/\bswagger\b/, "ri-file-line"],
  [/\bnginx\b/, "siServer"],
  [/\bwebpack\b/, "ri-grid-line"],
  [/\bjira\b/, "ri-list-check"],
  [/\baws\b|amazon web services/, "siAws"],
  [/\bperplexity\b/, "ri-search-line"],
  [/\bmidjourney\b/, "ri-flashlight-line"],
  [/\bnotion\b/, "ri-file-line"],
  [/\bcodeium\b/, "ri-flashlight-line"],
  [/\brunway\b/, "ri-play-line"],
  [/\bcopilot\b/, "siGit"],
  [/\bantigravity\b/, "siAntigravity"],
  [/\bstable diffusion\b/, "siAI"],
  [/\bprimeng\b|prime ng/, "siAngularJs"],
  [/\bprimereact\b/, "siReactJs"],
  [/\bredux\b/, "siReactJs"],
  [/\bnest\.?js\b/, "siNodeJs"],
  [/\bprisma\b/, "siPostgreSql"],
  [/\bredis\b/, "ri-database-2-line"],
  [/\bkubernetes\b|\bk8s\b/, "siDocker"],
  [/\bterraform\b/, "siGlobe"],
  [/\bansible\b/, "siServer"],
  [/\bjenkins\b/, "siServer"],
];

export function resolveTechIconName(name: string): string {
  const n = normalizeTechNameForIcon(name);
  if (!n) return "ri-code-line";

  if (EXACT_TECH_ICON[n]) {
    return normalizePortfolioIconKey(EXACT_TECH_ICON[n]);
  }

  if (/\bsass\b|\bscss\b/.test(n)) {
    return normalizePortfolioIconKey("siCss3");
  }
  if (/\bcss\s*3?\b/.test(n) && !/\bpostcss\b/.test(n)) {
    return normalizePortfolioIconKey("siCss3");
  }
  if (/\btailwind(\s*css)?\b/.test(n)) {
    return normalizePortfolioIconKey("siTailwindcss");
  }

  for (const [pattern, icon] of ICON_RULES) {
    if (pattern.test(n)) return normalizePortfolioIconKey(icon);
  }

  if (n === "ms sql" || n === "mssql") {
    return normalizePortfolioIconKey("siMsSqlBrand");
  }
  if (n === "sql" || n === "sql server" || n.includes("sql server")) {
    return normalizePortfolioIconKey("siSql");
  }

  return "ri-code-line";
}
