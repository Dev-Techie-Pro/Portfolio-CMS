"use strict";

/** Keep in sync with lib/portfolio/resolve-tech-icon.ts (public site fallback). */
(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const ALIASES = {
    siCSS: "siCss3",
    sicss: "siCss3",
    "siC#": "siCsharp",
    siCSharp: "siCsharp",
    siSQLServer: "siMsSqlBrand",
    siSqlServer: "siMsSqlBrand",
    siMssql: "siMsSqlBrand",
    siADO: "siAdoNet",
    siAdo: "siAdoNet",
    siNETFramework: "siNetFramework",
    siDotnetFramework: "siNetFramework",
  };

  const EXACT_TECH_ICON = {
    csharp: "siCsharp",
    css: "siCss3",
    css3: "siCss3",
    sass: "siCss3",
    scss: "siCss3",
    nextjs: "siNextJs",
    sql: "siMsSqlBrand",
    "sql server": "siMsSqlBrand",
    "tailwind css": "siTailwindcss",
    tailwindcss: "siTailwindcss",
  };

  const ICON_RULES = [
    [/\bnext\s*js\b|\bnext\.?js\b|nextjs/, "siNextJs"],
    [/\bms\s*sql\b|\bmssql\b|\bsql\s*server\b/, "siMsSqlBrand"],
    [/\basp\s+net(\s+mvc)?\b/, "siASPNet"],
    [/\basp\.?net(\s+mvc)?\b/, "siASPNet"],
    [/\bado\s+net\b/, "siAdoNet"],
    [/\bado\.?net\b/, "siAdoNet"],
    [/\.net\s*framework|dotnet\s*framework|net\s*framework/, "siNetFramework"],
    [/\.net\s*core|net\s*core|asp\.?net\s*core/, "siAspNetCore"],
    [/^dotnet$|^\.net$/, "siDotNet"],
    [/\bcsharp\b|c\s*sharp|c-sharp/, "siCsharp"],
    [/\bsass\b|\bscss\b/, "siCss3"],
    [/\bcss\s*3\b|\bcss3\b/, "siCss3"],
    [/\bcss\b/, "siCss3"],
    [/\btailwind(\s*css)?\b/, "siTailwindcss"],
    [/\bgithub\b/, "siGithub"],
    [/(?<![a-z])git(?![a-z]|hub)/, "siGitScm"],
    [/\brestful\s*apis?\b/, "siRestfulApi"],
    [/\brest\s*apis?\b/, "siRestfulApi"],
  ];

  function normalizeTechNameForIcon(name) {
    let raw = String(name ?? "").trim();
    if (!raw) return "";
    raw = raw.replace(/\s*·\s*[\d.]+%?\s*$/i, "").trim();
    if (/c\s*#|c♯|c\s*sharp|c-sharp|csharp/i.test(raw)) return "csharp";
    let s = raw.toLowerCase();
    s = s
      .replace(/\bado\.net\b/g, "ado net")
      .replace(/\basp\.net\b/g, "asp net")
      .replace(/\bentity\s+framework\b/g, "entity framework")
      .replace(/\bnet\s+framework\b/g, "net framework")
      .replace(/\bnet\s+core\b/g, "net core");
    if (s === ".net" || s === "net") return "dotnet";
    s = s
      .replace(/c\s*#/g, "csharp")
      .replace(/#/g, " ")
      .replace(/\//g, " ")
      .replace(/\\/g, " ")
      .replace(/[+&,|]/g, " ")
      .replace(/[_\-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (s === "next js" || s === "nextjs") return "nextjs";
    if (s === "sql server" || s === "ms sql" || s === "mssql") return "sql server";
    if (s === "css 3" || s === "css3") return "css3";
    if (s === "sass" || s === "scss") return "sass";
    if (s === "tailwind css" || s === "tailwindcss") return "tailwindcss";
    return s;
  }

  function normalizePortfolioIconKey(key) {
    const trimmed = String(key || "").trim();
    if (!trimmed) return "ri-code-line";
    if (ALIASES[trimmed]) return ALIASES[trimmed];
    const lower = trimmed.toLowerCase();
    for (const alias of Object.keys(ALIASES)) {
      if (alias.toLowerCase() === lower) return ALIASES[alias];
    }
    return trimmed;
  }

  function resolveTechIconFromName(name) {
    const n = normalizeTechNameForIcon(name);
    if (!n) return "ri-code-line";
    if (EXACT_TECH_ICON[n]) return normalizePortfolioIconKey(EXACT_TECH_ICON[n]);
    if (/\bsass\b|\bscss\b/.test(n)) return normalizePortfolioIconKey("siCss3");
    if (/\bcss\s*3?\b/.test(n) && !/\bpostcss\b/.test(n)) {
      return normalizePortfolioIconKey("siCss3");
    }
    if (/\btailwind(\s*css)?\b/.test(n)) {
      return normalizePortfolioIconKey("siTailwindcss");
    }
    for (const [pattern, icon] of ICON_RULES) {
      if (pattern.test(n)) return normalizePortfolioIconKey(icon);
    }
    if (n === "sql" || n.includes("sql server") || n === "mssql") {
      return normalizePortfolioIconKey("siMsSqlBrand");
    }
    return "ri-code-line";
  }

  Portfolio.normalizeTechNameForIcon = normalizeTechNameForIcon;
  Portfolio.normalizePortfolioIconKey = normalizePortfolioIconKey;
  Portfolio.resolveTechIconFromName = resolveTechIconFromName;
})();
