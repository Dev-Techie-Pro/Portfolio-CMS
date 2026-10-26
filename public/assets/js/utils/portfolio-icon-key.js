"use strict";

/** Keep in sync with lib/portfolio/resolve-tech-icon.ts (public site fallback). */
(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const ALIASES = {
    siCSS: "ri-css3-fill",
    sicss: "ri-css3-fill",
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
    css: "ri-css3-fill",
    css3: "ri-css3-fill",
    sass: "ri-css3-fill",
    scss: "ri-css3-fill",
    nextjs: "siNextJs",
    sql: "siMsSqlBrand",
    "sql server": "siMsSqlBrand",
  };

  const ICON_RULES = [
    [/\bnext\s*js\b|\bnext\.?js\b|nextjs/, "siNextJs"],
    [/\bms\s*sql\b|\bmssql\b|\bsql\s*server\b/, "siMsSqlBrand"],
    [/\bcsharp\b|c\s*sharp|c-sharp/, "siCsharp"],
    [/\bsass\b|\bscss\b/, "ri-css3-fill"],
    [/\bcss\s*3\b|\bcss3\b/, "ri-css3-fill"],
    [/\bcss\b/, "ri-css3-fill"],
    [/\brestful\s*apis?\b/, "siRestfulApi"],
    [/\brest\s*apis?\b/, "siRestfulApi"],
    [/\bgithub\b/, "siGithub"],
    [/\btypescript\b/, "siTypescript"],
    [/\bjavascript\b/, "siJavascript"],
    [/\breact\b/, "siReactJs"],
    [/\bnode\.?js\b|\bnode\b/, "siNodeJs"],
    [/\bhtml\b/, "siHTML5"],
  ];

  function normalizeTechNameForIcon(name) {
    let raw = String(name ?? "").trim();
    if (!raw) return "";
    raw = raw.replace(/\s*·\s*[\d.]+%?\s*$/i, "").trim();
    if (/c\s*#|c♯|c\s*sharp|c-sharp|csharp/i.test(raw)) return "csharp";
    let s = raw
      .toLowerCase()
      .replace(/\.net/g, "dotnet")
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
    if (/\bsass\b|\bscss\b/.test(n)) return normalizePortfolioIconKey("ri-css3-fill");
    if (/\bcss\s*3?\b/.test(n) && !/\bpostcss\b/.test(n)) {
      return normalizePortfolioIconKey("ri-css3-fill");
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
