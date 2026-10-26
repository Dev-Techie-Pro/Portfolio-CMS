"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function padNum(index) {
    return String(index).padStart(2, "0");
  }

  function normalizeTechLabel(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  const BRAND_LABEL_ALIASES = [
    ["vs code", "VS Code"],
    ["vscode", "VS Code"],
    ["visual studio code", "VS Code"],
    ["claude ai", "Claude AI"],
    ["claude", "Claude AI"],
    ["cursor ai", "Cursor AI"],
    ["cursor", "Cursor AI"],
    ["github copilot", "GitHub Copilot"],
    ["copilot", "GitHub Copilot"],
    ["google antigravity", "Google Antigravity"],
    ["antigravity", "Google Antigravity"],
    ["stable diffusion", "Stable Diffusion"],
    ["runway", "Runway ML"],
    ["notion", "Notion AI"],
    ["express.js", "Express.js"],
    ["expressjs", "Express.js"],
    ["next.js", "Next.js"],
    ["nextjs", "Next.js"],
    ["next js", "Next.js"],
    ["node.js", "Node.js"],
    ["nodejs", "Node.js"],
    [".net core", ".NET Core"],
    ["dotnet core", ".NET Core"],
    ["asp.net", ".NET Core"],
    ["sql server", "SQL Server"],
    ["mssql", "SQL Server"],
    ["adobe xd", "Adobe XD"],
    ["webpack", "Webpack"],
    ["swagger", "Swagger"],
    ["nginx", "Nginx"],
    ["jira", "Jira"],
    ["midjourney", "Midjourney"],
    ["perplexity", "Perplexity"],
    ["codeium", "Codeium"],
    ["adobe premiere", "Adobe Premiere"],
    ["premiere pro", "Adobe Premiere"],
    ["wp bakery", "WPBakery"],
    ["wpbakery", "WPBakery"],
    ["pagefly", "PageFly"],
    ["livecharts", "LiveCharts"],
    ["mariadb", "MariaDB"],
    ["jwt", "JWT"],
    ["eclipse", "Eclipse IDE"],
    ["crystal reports", "Crystal Reports"],
    ["barcode", "Barcode Scanner"],
    ["mongoose", "Mongoose"],
    ["restful apis", "RESTful APIs"],
    ["restful api", "RESTful API"],
    ["ms sql", "MS SQL"],
    ["itextsharp", "iTextSharp"],
    ["closedxml", "ClosedXML"],
    ["acf", "ACF"],
    ["advanced custom fields", "ACF"],
  ];

  function siteIconsRegistry() {
    return Portfolio.CONSTANTS && Portfolio.CONSTANTS.ICONS;
  }

  function skillNameForIcon(name) {
    return normalizeTechLabel(name)
      .replace(/\s*·\s*[\d.]+%?\s*$/i, "")
      .trim();
  }

  /** Client fallback when API icon key is missing or stale (mirrors resolve-tech-icon.ts). */
  function resolveIconKeyFromName(name) {
    const n = skillNameForIcon(name);
    if (!n) return "ri-code-line";
    if (/\brestful\s*apis?\b/.test(n) || /\brest\s*apis?\b/.test(n)) {
      return "siRestfulApi";
    }
    if (/\bms\s*sql\b/.test(n) || /\bmssql\b/.test(n) || /\bsql\s*server\b/.test(n)) {
      return "siMsSqlBrand";
    }
    if (n === "sql") return "siSql";
    return "ri-code-line";
  }

  function svgFromIconKey(key) {
    const icons = siteIconsRegistry();
    if (!icons || !key) return null;
    const svg = icons[key];
    return svg && String(svg).trim().startsWith("<svg") ? svg : null;
  }

  function resolveSkillIconKey(item) {
    const fromApi = String(item.portfolioIcon || "").trim();
    if (fromApi && fromApi !== "siCode") {
      if (fromApi === "siMsSqlBrand" && !svgFromIconKey(fromApi)) return "siSql";
      return fromApi;
    }
    const fromName = resolveIconKeyFromName(item.name);
    if (fromName === "siMsSqlBrand" && !svgFromIconKey(fromName)) return "siSql";
    return fromName;
  }

  function lookupBrandSvg(name) {
    const registry = Portfolio.TICKER && Portfolio.TICKER.icons;
    if (!registry || !name) return null;
    if (registry[name]) return registry[name];
    const norm = normalizeTechLabel(name);
    const exactKey = Object.keys(registry).find(
      (key) => normalizeTechLabel(key) === norm,
    );
    if (exactKey) return registry[exactKey];
    for (const [needle, label] of BRAND_LABEL_ALIASES) {
      if (norm.includes(needle) && registry[label]) return registry[label];
    }
    const partial = Object.keys(registry).find((key) => {
      const kn = normalizeTechLabel(key);
      return kn.length > 2 && (norm.includes(kn) || kn.includes(norm));
    });
    return partial ? registry[partial] : null;
  }

  function categoryIconHtml(cat) {
    const iconClass = (cat.iconClass || "").trim();
    if (iconClass.startsWith("<svg") || iconClass.startsWith("&lt;svg")) {
      return iconClass;
    }
    if (iconClass.startsWith("ri-")) {
      return `<i class="${escapeHtml(iconClass)}" aria-hidden="true"></i>`;
    }
    const si = cat.portfolioIcon || "siCode";
    return `<span class="icon" data-icon="${escapeHtml(si)}"></span>`;
  }

  function itemIconHtml(item) {
    if (item.iconUrl && String(item.iconUrl).trim()) {
      const url = escapeHtml(item.iconUrl);
      return `<img src="${url}" alt="" loading="lazy" />`;
    }
    const si = resolveSkillIconKey(item);
    const icons = siteIconsRegistry();
    if (icons && icons[si]) {
      return `<span class="icon" data-icon="${escapeHtml(si)}"></span>`;
    }
    const brandSvg = lookupBrandSvg(item.name);
    if (brandSvg) {
      return `<span class="skill-brand-svg" aria-hidden="true">${brandSvg}</span>`;
    }
    return `<span class="icon" data-icon="${escapeHtml(si)}"></span>`;
  }

  const MAX_SKILLS_PER_CARD = 8;

  function maxItemsForRoot(root) {
    if (root.getAttribute("data-cms-skills-layout") === "explorer") return 0;
    return MAX_SKILLS_PER_CARD;
  }

  function renderCategory(cat, index, maxItems) {
    const pct = Math.min(100, Math.max(0, Number(cat.proficiencyPct) || 0));
    const desc = cat.description
      ? escapeHtml(cat.description)
      : "Technologies and tools in this area";
    const list = cat.items || [];
    const items = (maxItems > 0 ? list.slice(0, maxItems) : list)
      .map(
        (item) =>
          `<li class="skill-item">
      <span class="skill-icon" aria-hidden="true">${itemIconHtml(item)}</span>${escapeHtml(item.name)}
    </li>`,
      )
      .join("");

    return `<div class="skill-category">
      <span class="skill-cat-num" aria-hidden="true">${padNum(index)}</span>
      <div class="skill-cat-header">
        <span class="skill-cat-icon" aria-hidden="true">${categoryIconHtml(cat)}</span>
        <div class="skill-cat-text">
          <span class="skill-cat-name">${escapeHtml(cat.label)}</span>
          <span class="skill-cat-desc">${desc}</span>
        </div>
        <div class="skill-cat-ring" data-percent="${pct}" role="img" aria-label="${pct} percent proficiency">
          <span class="icon" data-icon="siRing"></span>
          <div class="ring-label">
            <span class="ring-value">${pct} <small>%</small> </span>
            <span class="ring-caption">Proficiency</span>
          </div>
        </div>
      </div>
      <ul class="skill-list" aria-label="${escapeHtml(cat.label)} skills">${items}</ul>
    </div>`;
  }

  function renderGrid(categories, limit, maxItems) {
    const list = Array.isArray(categories) ? categories : [];
    const slice = limit > 0 ? list.slice(0, limit) : list;
    if (!slice.length) {
      return `<p class="exp-cms-placeholder">No skills published yet.</p>`;
    }
    return slice.map((cat, i) => renderCategory(cat, i + 1, maxItems)).join("");
  }

  function lookupTickerSvg(label, registry) {
    if (!registry || !label) return null;
    if (registry[label]) return registry[label];
    const norm = String(label).trim().toLowerCase();
    const key = Object.keys(registry).find((k) => k.trim().toLowerCase() === norm);
    if (key) return registry[key];
    const iconKey = resolveIconKeyFromName(label);
    if (iconKey !== "siCode") {
      const fromSite = svgFromIconKey(iconKey);
      if (fromSite) return fromSite;
    }
    return lookupBrandSvg(label);
  }

  function tickerItemsFromLabels(labels, registry) {
    const out = [];
    (labels || []).forEach((row) => {
      const label = row && row.label ? String(row.label) : "";
      if (!label) return;
      const svg = lookupTickerSvg(label, registry);
      if (svg) out.push({ label, svg });
    });
    return out;
  }

  function mountTickers(tickers) {
    const registry = Portfolio.TICKER && Portfolio.TICKER.icons ? Portfolio.TICKER.icons : {};
    const toolsEl = document.getElementById("ticker-tools");
    const techEl = document.getElementById("ticker-technologies");
    const aiEl = document.getElementById("ticker-ai");
    if (!toolsEl && !techEl && !aiEl) return;

    const tools = tickerItemsFromLabels(tickers?.tools, registry);
    const techs = tickerItemsFromLabels(tickers?.technologies, registry);
    const ai = tickerItemsFromLabels(tickers?.ai, registry);

    if (typeof Portfolio.TICKER?.mountTickerRow === "function") {
      Portfolio.TICKER.mountTickerRow(toolsEl, tools);
      Portfolio.TICKER.mountTickerRow(techEl, techs);
      Portfolio.TICKER.mountTickerRow(aiEl, ai.length ? ai : tools.slice(0, 8));
    }
  }

  async function hydrateExplorer(root) {
    const data = await Portfolio.ensurePortfolioSkills();
    const categories = (data.categories || []).filter(
      (cat) => (cat.items && cat.items.length) || cat.label,
    );
    Portfolio.SKILLS_EXPLORER?.mount?.(root, categories);
    root.classList.add("visible");
    Portfolio.ANIMATIONS?.initScrollReveal?.();
  }

  async function hydrateGrid(root) {
    const layout = root.getAttribute("data-cms-skills-layout");
    if (layout === "explorer") {
      return hydrateExplorer(root);
    }
    const limitAttr = root.getAttribute("data-cms-skills-limit");
    const limit = limitAttr ? parseInt(limitAttr, 10) : 0;
    const maxItems = maxItemsForRoot(root);
    const data = await Portfolio.ensurePortfolioSkills();
    root.innerHTML = renderGrid(data.categories, limit, maxItems);
    Portfolio.ICONS?.hydrateAll?.(root);
    Portfolio.TICKER?.hydrateSkillIcons?.();
    root.classList.add("visible");
    Portfolio.ANIMATIONS?.initSkillBars?.();
    Portfolio.ANIMATIONS?.initScrollReveal?.();
  }

  async function hydrateAll() {
    const grids = document.querySelectorAll("[data-cms-skills-grid]");
    const data = await Portfolio.ensurePortfolioSkills();
    for (const grid of grids) {
      try {
        await hydrateGrid(grid);
      } catch (err) {
        console.error("[skills-cms] grid hydrate failed", err);
        grid.innerHTML = `<p class="exp-cms-placeholder">Could not load skills.</p>`;
      }
    }
    mountTickers(data.tickers);
    Portfolio.TICKER?.hydrateSkillIcons?.();
  }

  Portfolio.SKILLS_CMS = {
    hydrateAll,
    renderGrid,
    categoryIconHtml,
    itemIconHtml,
  };
})();
