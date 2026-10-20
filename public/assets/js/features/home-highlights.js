"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const PH_AREAS = ["featured", "top-mid", "top-right", "bot-mid", "bot-right"];
  const MAX_TAGS = 3;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderCard(item, index) {
    const isFeaturedLayout = index === 0;
    const area = item.phArea || PH_AREAS[index] || PH_AREAS[PH_AREAS.length - 1];
    const tone = item.mockupTone || "purple";
    const cardClass = isFeaturedLayout
      ? "ph-card ph-card--featured ph-reveal"
      : "ph-card ph-reveal";
    const stageClass = isFeaturedLayout
      ? "ph-mockup-stage si-skel-wrap h-100"
      : "ph-mockup-stage";
    const imgLoading = index === 0 ? "eager" : "lazy";
    const tagList = (item.tags || []).slice(0, MAX_TAGS);
    const tags = tagList
      .map((tag) => `<span class="ph-tag">${escapeHtml(tag)}</span>`)
      .join("");
    const tagsTitle =
      tagList.length > 0 ? ` title="${escapeHtml(tagList.join(", "))}"` : "";

    const badge = item.featured
      ? `<span class="ph-featured-badge" aria-label="Featured project">
          <span class="icon" data-icon="siStarfill"></span>
          Featured
        </span>`
      : "";

    const imageBlock = item.imageUrl
      ? `<img
          src="${escapeHtml(item.imageUrl)}"
          alt="${escapeHtml(item.imageAlt || item.title)}"
          class="ph-mockup-img"
          loading="${imgLoading}"
        />`
      : "";

    return `
      <article
        class="${cardClass}"
        data-ph-area="${escapeHtml(area)}"
        tabindex="0"
        role="listitem"
        aria-label="${escapeHtml(item.title)} — ${item.featured ? "featured " : ""}project"
      >
        <div class="ph-mockup ph-mockup--${escapeHtml(tone)}">
          ${badge}
          <div class="${stageClass}">
            ${imageBlock}
          </div>
        </div>
        <div class="ph-body">
          <p class="ph-category">${escapeHtml(item.category)}</p>
          <h3 class="ph-title">${escapeHtml(item.title)}</h3>
          <p class="ph-desc">${escapeHtml(item.description)}</p>
          <div class="ph-footer">
            <div class="ph-tags"${tagsTitle}>${tags}</div>
            <a
              href="${escapeHtml(item.detailUrl)}"
              class="ph-cta"
              aria-label="View ${escapeHtml(item.title)} project"
            >
              <span class="icon" data-icon="siArrowRight"></span>
            </a>
          </div>
        </div>
      </article>`;
  }

  function renderGrid(items) {
    const grid = document.getElementById("homePortfolioHighlightsGrid");
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML =
        '<p class="ph-load-empty">No featured projects to show yet.</p>';
      return;
    }

    grid.innerHTML = items.map((item, index) => renderCard(item, index)).join("");

    const section = document.getElementById("projects");
    if (section) {
      delete section.dataset.phScrollReady;
    }

    Portfolio.ICONS?.hydrateAll?.(grid);
    if (Portfolio.ANIMATIONS?.initScrollReveal) {
      Portfolio.ANIMATIONS.initScrollReveal();
    }
    Portfolio.HIGHLIGHTS?.init?.();
  }

  function init() {
    const grid = document.getElementById("homePortfolioHighlightsGrid");
    if (!grid) return;

    fetch("/api/portfolio/highlights", { credentials: "same-origin" })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok) throw new Error(data.error || "Failed to load highlights");
        renderGrid(data.highlights || []);
      })
      .catch((err) => {
        console.error("[home-highlights]", err);
        grid.innerHTML =
          '<p class="ph-load-error">Could not load portfolio highlights.</p>';
      });
  }

  Portfolio.HOME_HIGHLIGHTS = { init, renderGrid };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
