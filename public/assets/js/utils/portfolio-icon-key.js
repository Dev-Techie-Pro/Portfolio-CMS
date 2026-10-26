"use strict";

/** Mirrors lib/portfolio/resolve-tech-icon.ts normalizePortfolioIconKey (public bundle). */
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

  Portfolio.normalizePortfolioIconKey = normalizePortfolioIconKey;
})();
