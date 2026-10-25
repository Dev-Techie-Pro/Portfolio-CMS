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

  function resolveVariant(ul) {
    if (ul.classList.contains("bd-author-social")) return "author";
    if (ul.closest(".hero-v2-inner")) return "hero";
    if (ul.closest("#contact")) return "contact";
    return "footer";
  }

  function renderLink(link) {
    const href = escapeHtml(link.href);
    const label = escapeHtml(link.label || "Link");
    const icon = escapeHtml(link.icon || "siGlobe");
    const external = link.external !== false && !String(link.href || "").startsWith("mailto:");
    const rel = external ? ' rel="noopener noreferrer"' : "";
    const target = external ? ' target="_blank"' : "";
    return `<li>
      <a href="${href}" class="social-icon" aria-label="${label}"${target}${rel}>
        <span class="icon" data-icon="${icon}"></span>
      </a>
    </li>`;
  }

  function hydrateList(ul, links) {
    if (!ul || !Array.isArray(links)) return;
    ul.innerHTML = links.map(renderLink).join("");
    ul.setAttribute("data-cms-social-hydrated", "true");
    Portfolio.ICONS?.hydrateAll?.(ul);
  }

  async function hydrateAll() {
    const lists = document.querySelectorAll(".footer-social-list:not([data-cms-social-hydrated])");
    if (!lists.length) return;

    let variants = {};
    try {
      const payload = await Portfolio.ensurePortfolioSocial();
      variants = payload?.variants || {};
    } catch (err) {
      console.error("[social-cms] load failed — keeping static links", err);
      return;
    }

    lists.forEach((ul) => {
      const variant = resolveVariant(ul);
      const links = variants[variant] || variants.footer || [];
      try {
        hydrateList(ul, links);
      } catch (err) {
        console.error("[social-cms] hydrate failed", err);
      }
    });
  }

  Portfolio.SOCIAL_CMS = {
    hydrateAll,
    resolveVariant,
  };
})();
