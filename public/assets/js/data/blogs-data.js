"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.BLOGS = {}),
  (window.Portfolio.BLOG_ORDER = []),
  (window.Portfolio.BLOG_GALLERY_ORDER = []));

function _resolveBlogIcon(key) {
  if (!key) return "siGrid";
  if (key.startsWith("si")) return key;
  return "siGrid";
}

function _iconHtml(registryName, extraClass) {
  const cls = extraClass ? `icon ${extraClass}` : "icon";
  return `<span class="${cls}" data-icon="${registryName}" aria-hidden="true"></span>`;
}

function _hydrateBlogIcons(root) {
  window.Portfolio?.ICONS?.hydrateAll?.(root || document);
}

function _categorySlug(category, categoryKey) {
  if (categoryKey) {
    return String(categoryKey).toLowerCase();
  }
  return (
    window.Portfolio?.UTILS?.blogCategoryToSlug?.(category) ||
    String(category || "")
      .toLowerCase()
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}

function _findBlogId(slug) {
  if (!slug) return null;
  const blogs = window.Portfolio.BLOGS || {};
  if (blogs[slug]) return slug;
  const lower = String(slug).toLowerCase();
  for (const id of Object.keys(blogs)) {
    if (id.toLowerCase() === lower) return id;
  }
  return null;
}

function _inferDetailTemplate(content) {
  const sections = (content || []).filter((b) => b && b.type === "section");
  const richTypes = new Set([
    "compare-grid",
    "feature-grid",
    "benefits-row",
    "examples-row",
  ]);
  let hasRich = false;
  const walk = (blocks) => {
    (blocks || []).forEach((block) => {
      if (!block) return;
      if (richTypes.has(block.type)) hasRich = true;
      if (Array.isArray(block.blocks)) walk(block.blocks);
    });
  };
  walk(content);
  if ((content || []).some((b) => b && b.type === "stat-box") || hasRich) {
    return "case-study";
  }
  if (sections.length <= 1) return "minimal";
  if (sections.length >= 4) return "longform";
  return "standard";
}

function _resolveDetailTemplate(post) {
  return post.detailTemplate && post.detailTemplate !== "auto"
    ? post.detailTemplate
    : _inferDetailTemplate(post.content);
}

function _setHeroTitle(title, tpl) {
  const el = document.getElementById("bdTitle");
  if (!el || !title) return;
  const accentTemplates = new Set(["standard", "minimal", "longform", "case-study"]);
  if (!accentTemplates.has(tpl)) {
    el.textContent = title;
    return;
  }
  const words = String(title).trim().split(/\s+/);
  if (words.length < 3) {
    el.textContent = title;
    return;
  }
  const accentLen = Math.min(3, Math.max(2, Math.ceil(words.length / 4)));
  const main = words.slice(0, -accentLen).join(" ");
  const accent = words.slice(-accentLen).join(" ");
  el.innerHTML = `${main} <span class="hero-title-accent">${accent}</span>`;
}

function _toggleHidden(id, hidden) {
  const el = document.getElementById(id);
  if (el) el.hidden = hidden;
}

function _extractHeroStats(content) {
  const stats = [];
  (content || []).forEach((block) => {
    if (block.type === "stat-box" && stats.length < 4) {
      stats.push({
        value: block.value,
        label: block.text,
        icon: block.icon || "siFlash",
      });
    }
  });
  return stats;
}

function _renderHeroStatItem(item) {
  return `
    <div class="bd-hero-stat">
      <span class="bd-hero-stat-icon" aria-hidden="true">${_iconHtml(_resolveBlogIcon(item.icon))}</span>
      <span class="bd-hero-stat-value">${item.value}</span>
      <span class="bd-hero-stat-label">${item.label}</span>
    </div>`;
}

function _defaultHeroStats(post) {
  return [
    { value: "5", label: "Key sections", icon: "ri-grid-line" },
    { value: post.readTime || "8 min", label: "Estimated read", icon: "ri-time-line" },
    { value: "100%", label: "Production ready", icon: "ri-shield-line" },
    { value: "99.9%", label: "Reliability target", icon: "ri-trending-up-line" },
  ];
}

function _configureDetailLayout(post, tpl, blogId) {
  const showTocMeta = tpl === "longform" || tpl === "case-study";
  const showQuickLinks = tpl === "standard";
  const showSidebarCta = tpl === "standard";
  const showHeroStats = tpl === "case-study";
  const showCaseLeftCta = tpl === "case-study";
  const showCaseHireCard = tpl === "case-study";
  const showRelatedBelow = tpl === "minimal";
  const showPreFooter = tpl !== "minimal";
  const showInlineCta = tpl === "minimal";

  _toggleHidden("bdTocMeta", !showTocMeta);
  _toggleHidden("bdQuickLinksCard", !showQuickLinks);
  _toggleHidden("bdSidebarCta", !showSidebarCta);
  _toggleHidden("bdHeroStatsBar", !showHeroStats);
  _toggleHidden("bdSidebarLeftProjectCta", !showCaseLeftCta);
  _toggleHidden("bdSidebarHireMini", !showCaseHireCard);
  _toggleHidden("bdTagsCard", tpl === "case-study");
  _toggleHidden("bdNewsletterCard", tpl === "case-study");
  _toggleHidden("bdRelatedBelow", !showRelatedBelow);
  _toggleHidden("bdPreFooter", tpl === "case-study" ? true : !showPreFooter);
  _toggleHidden("bdInlineCtaSection", !showInlineCta);

  if (showTocMeta) {
    const read = document.getElementById("bdTocReadTime");
    if (read) read.textContent = post.readTime || "—";
    const updated = document.getElementById("bdTocUpdated");
    if (updated) updated.textContent = post.dateLabel || "—";
  }

  if (showHeroStats) {
    const bar = document.getElementById("bdHeroStats");
    if (bar) {
      const fromContent = _extractHeroStats(post.content);
      const items = fromContent.length >= 2 ? fromContent : _defaultHeroStats(post);
      bar.innerHTML = items.map(_renderHeroStatItem).join("");
    }
  }

  if (showRelatedBelow) {
    const grid = document.getElementById("bdRelatedBelowGrid");
    if (grid) {
      const id = blogId || post.id;
      const others = window.Portfolio.BLOG_ORDER.filter((blogId) => blogId !== id)
        .slice(0, 3)
        .map((blogId) => window.Portfolio.BLOGS[blogId]);
      grid.innerHTML = others.map(_renderRelatedGridCard).join("");
    }
  }
}

function _applyDetailTemplate(post, blogId) {
  const root = document.querySelector(".blog-details-page");
  if (!root) return;
  const tpl = _resolveDetailTemplate(post);
  const classes = [
    "bd-tpl-standard",
    "bd-tpl-minimal",
    "bd-tpl-case-study",
    "bd-tpl-longform",
  ];
  root.classList.remove(...classes);
  root.classList.add(`bd-tpl-${tpl}`);
  root.setAttribute("data-bd-template", tpl);
  _configureDetailLayout(post, tpl, blogId || post.id);
}

function _blogUrl(id) {
  const resolvedId = _findBlogId(id) || id;
  const post = window.Portfolio.BLOGS?.[resolvedId];
  if (!post) return "/blogs";
  const category = _categorySlug(post.category, post.categoryKey);
  return `/blogs/${encodeURIComponent(category)}/${encodeURIComponent(resolvedId)}`;
}

function _resolveBlogId() {
  const slugFromPath = window.Portfolio.UTILS?.getBlogSlugFromPath?.();
  if (slugFromPath) {
    const fromCatalog = _findBlogId(slugFromPath);
    if (fromCatalog) return fromCatalog;
    if (Object.keys(window.Portfolio.BLOGS || {}).length === 0) {
      return slugFromPath;
    }
  }
  const fromQuery = new URLSearchParams(window.location.search).get("id");
  if (fromQuery) {
    const fromCatalog = _findBlogId(fromQuery);
    if (fromCatalog) return fromCatalog;
    if (Object.keys(window.Portfolio.BLOGS || {}).length === 0) {
      return fromQuery;
    }
  }
  return null;
}

function _categoryLabel(category) {
  if (category === "Frontend") return "frontend";
  return category;
}

function _thumbUrl(url) {
  return url;
}

function _searchBlob(post) {
  const parts = [post.title, post.excerpt, post.category, ...(post.tags || [])];
  (post.content || []).forEach((block) => {
    if (block.type === "section") {
      parts.push(block.title);
      (block.blocks || []).forEach((b) => {
        if (b.text) parts.push(b.text);
        if (b.items) parts.push(b.items.join(" "));
        if (b.columns)
          b.columns.forEach((c) => parts.push(c.title, ...(c.items || [])));
      });
    } else if (block.text) {
      parts.push(block.text);
    }
  });
  return parts.join(" ").toLowerCase();
}

function _compareColumnVariant(title, columnIndex, columnCount) {
  const t = String(title || "").toLowerCase();
  if (t.includes("before")) return "before";
  if (t.includes("after")) return "after";
  if (columnCount === 2) return columnIndex === 0 ? "before" : "after";
  return null;
}

function _compareColumnItemClass(col, columnIndex, columnCount) {
  const variant = _compareColumnVariant(col?.title, columnIndex, columnCount);
  if (variant === "before") return "danger-item";
  if (variant === "after") return "success-item";
  return "";
}

function _compareCardOpeningTag(col, columnIndex, columnCount) {
  const variant = _compareColumnVariant(col?.title, columnIndex, columnCount);
  if (variant === "before") {
    return '<div class="compare-card before-card compare-card--before">';
  }
  if (variant === "after") {
    return '<div class="compare-card after-card compare-card--after">';
  }
  return '<div class="compare-card">';
}

function _applyCompareCardVariantClasses(card, variant) {
  if (!variant) return;
  const before = variant === "before";
  card.classList.toggle("before-card", before);
  card.classList.toggle("after-card", !before);
  card.classList.toggle("compare-card--before", before);
  card.classList.toggle("compare-card--after", !before);
}

function _checkListItemParts(item, fallbackClass = "") {
  if (item && typeof item === "object") {
    const text = item.text ?? item.label ?? "";
    const cls =
      item.class ||
      item.className ||
      item.itemClass ||
      fallbackClass ||
      "";
    return { text: String(text), className: String(cls).trim() };
  }
  return { text: String(item ?? ""), className: fallbackClass };
}

function _enhanceCompareCheckListItems(root) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  root.querySelectorAll(".compare-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".compare-card");
    cards.forEach((card, index) => {
      const heading = (card.querySelector("h3")?.textContent || "")
        .trim()
        .toLowerCase();
      const variant = _compareColumnVariant(heading, index, cards.length);
      _applyCompareCardVariantClasses(card, variant);
      let itemClass = "";
      if (variant === "before") itemClass = "danger-item";
      else if (variant === "after") itemClass = "success-item";
      card.querySelectorAll(".check-list li").forEach((li) => {
        if (li.classList.contains("danger-item") || li.classList.contains("success-item")) {
          return;
        }
        if (itemClass) li.classList.add(itemClass);
      });
    });
  });
}

function _renderCheckList(items, itemClass = "") {
  return `<ul class="check-list">${(items || [])
    .map((item) => {
      const { text, className } = _checkListItemParts(item, itemClass);
      const cls = className ? ` class="${className}"` : "";
      return `<li${cls}>${_iconHtml("ri-check-line")}${text}</li>`;
    })
    .join("")}</ul>`;
}

function _renderCompareGrid(columns) {
  const list = Array.isArray(columns) ? columns : [];
  return `<div class="compare-grid">${list
    .map(
      (col, index) => `
    ${_compareCardOpeningTag(col, index, list.length)}
      <h3>${col.title}</h3>
      ${_renderCheckList(col.items, _compareColumnItemClass(col, index, list.length))}
    </div>`,
    )
    .join("")}</div>`;
}

function _renderFeatureGrid(items) {
  return `<div class="feature-grid">${items
    .map(
      (item) => `
    <div class="feature-card">
      <div class="feature-icon">${_iconHtml(_resolveBlogIcon(item.icon))}</div>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>`,
    )
    .join("")}</div>`;
}

function _renderBenefitsRow(items) {
  return `<div class="benefits-row">${items
    .map(
      (item) => `
    <div class="benefit-item">
      <div class="benefit-icon">${_iconHtml(_resolveBlogIcon(item.icon))}</div>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>`,
    )
    .join("")}</div>`;
}

function _renderBulletList(items) {
  return `<ul class="bullet-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function _renderExamplesRow(items) {
  return `<div class="examples-row">${items
    .map(
      (item) => `
    <div class="example-card">
      <div class="feature-icon">${_iconHtml(_resolveBlogIcon(item.icon))}</div>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>`,
    )
    .join("")}</div>`;
}

function _renderBlock(block, post) {
  switch (block.type) {
    case "p":
      if (block.text && /<[a-z][\s\S]*>/i.test(block.text)) {
        return block.text;
      }
      return `<p>${block.text}</p>`;
    case "compare-grid":
      return _renderCompareGrid(block.columns);
    case "feature-grid":
      return _renderFeatureGrid(block.items);
    case "benefits-row":
      return _renderBenefitsRow(block.items);
    case "bullet-list":
      return _renderBulletList(block.items);
    case "examples-row":
      return _renderExamplesRow(block.items);
    case "quote-box":
      return `<div class="quote-box">${_iconHtml(_resolveBlogIcon(block.icon))}<p>${block.text}</p></div>`;
    default:
      return "";
  }
}

function _renderStatBox(block, tpl) {
  const perf =
    tpl === "longform" ? " stat-box--perf" : tpl === "case-study" ? " stat-box--case" : "";
  return `
    <div class="stat-box${perf}">
      <div class="stat-icon">${_iconHtml(_resolveBlogIcon(block.icon))}</div>
      <div class="stat-box__body">
        <div class="stat-value">${block.value}</div>
        <p class="stat-text">${block.text}</p>
      </div>
    </div>`;
}

function _slugifyHeading(text) {
  const base = String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || "section";
}

function _collectHtmlFromContent(content) {
  const parts = [];
  (content || []).forEach((block) => {
    if (block.type === "section" && Array.isArray(block.blocks)) {
      block.blocks.forEach((inner) => {
        if (inner?.type === "p" && typeof inner.text === "string") {
          parts.push(inner.text);
        }
      });
    } else if (block.type === "p" && typeof block.text === "string") {
      parts.push(block.text);
    }
  });
  return parts.join("");
}

function _isWrappedHtmlArticle(content) {
  const sections = _getTocSections(content);
  const html = _collectHtmlFromContent(content);
  if (!html || !/<(?:section|h[2-4])\b/i.test(html)) return false;
  if (!sections.length) return true;
  if (sections.length !== 1) return false;
  const only = sections[0];
  return (
    only.id === "content" ||
    only.title === "Article" ||
    (only.blocks || []).every(
      (b) => b.type === "p" && typeof b.text === "string",
    )
  );
}

function _ensureArticleHeadingIds(root) {
  const used = new Set();
  root.querySelectorAll("[id]").forEach((el) => {
    if (el.id) used.add(el.id);
  });

  const claimId = (base) => {
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    used.add(id);
    return id;
  };

  root.querySelectorAll("section").forEach((section, index) => {
    if (section.id) return;
    const h2 = section.querySelector("h2");
    const base = h2
      ? _slugifyHeading(h2.textContent)
      : `section-${index + 1}`;
    section.id = claimId(base);
  });

  root.querySelectorAll("h2").forEach((h2, index) => {
    if (h2.id) return;
    const section = h2.closest("section[id]");
    if (section) return;
    h2.id = claimId(_slugifyHeading(h2.textContent) || `heading-${index + 1}`);
  });
}

function _tocEntriesFromArticleRoot(root) {
  const entries = [];
  const seen = new Set();

  root.querySelectorAll("section[id]").forEach((section) => {
    const id = section.getAttribute("id");
    if (!id || seen.has(id)) return;
    const h2 = section.querySelector("h2");
    const title = (h2?.textContent || id).trim();
    entries.push({ id, title, heading: h2 });
    seen.add(id);
  });

  if (entries.length) return entries;

  root.querySelectorAll("h2[id]").forEach((h2) => {
    const id = h2.getAttribute("id");
    if (!id || seen.has(id)) return;
    entries.push({ id, title: (h2.textContent || id).trim(), heading: h2 });
    seen.add(id);
  });

  return entries;
}

function _applyLongformNumsToEntries(entries) {
  entries.forEach((entry, index) => {
    const h2 = entry.heading;
    if (!h2) return;
    h2.setAttribute(
      "data-section-num",
      String(index + 1).padStart(2, "0"),
    );
  });
}

function _hiddenSectionSet(post) {
  const list = post?.hiddenSections;
  return new Set(Array.isArray(list) ? list.filter(Boolean) : []);
}

function _filterTocEntries(entries, hiddenSet) {
  if (!hiddenSet?.size) return entries;
  return (entries || []).filter((entry) => !hiddenSet.has(entry.id));
}

function _renderHtmlArticleMain(html, post) {
  const tpl = _resolveDetailTemplate(post);
  const numberedSections = tpl === "longform" || tpl === "case-study";
  const hiddenSet = _hiddenSectionSet(post);
  const doc = new DOMParser().parseFromString(html || "", "text/html");
  const root = doc.body;
  _ensureArticleHeadingIds(root);
  let entries = _tocEntriesFromArticleRoot(root);
  entries = _filterTocEntries(entries, hiddenSet);
  if (numberedSections) _applyLongformNumsToEntries(entries);
  _enhanceCompareCheckListItems(root);
  return { html: root.innerHTML, tocEntries: entries };
}

function _renderArticleFooter(post) {
  return `
    <div class="author-footer">
      <div class="nav-logo" aria-label="Author">
        <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
        <div class="logo-text">
          <span class="logo-name">${post.author}</span>
          <span class="logo-role">Full Stack Web Developer</span>
        </div>
      </div>
      <div class="author-footer-actions">
        <button
          type="button"
          class="bd-like-btn"
          id="bdLikeBtn"
          aria-pressed="false"
          aria-label="Like this article"
          hidden
        >
          <span class="icon" data-icon="ri-heart-line"></span>
          <span class="bd-like-count" id="bdLikeCount">0</span>
          <span class="bd-like-label">Like</span>
        </button>
      <div class="share-row">
        <span class="share-label">Share this article</span>
        <a href="#" class="share-btn" aria-label="Share on Twitter" data-share="twitter">
          ${_iconHtml("ri-twitter-x-fill")}
        </a>
        <a href="#" class="share-btn" aria-label="Share on LinkedIn" data-share="linkedin">
          ${_iconHtml("ri-linkedin-fill")}
        </a>
        <a href="#" class="share-btn" aria-label="Share on Facebook" data-share="facebook">
          ${_iconHtml("ri-facebook-fill")}
        </a>
        <a href="#" class="share-btn" aria-label="Copy link" data-share="copy">
          ${_iconHtml("ri-link")}
        </a>
      </div>
      </div>
    </div>`;
}

function _renderArticleMain(content, post) {
  if (_isWrappedHtmlArticle(content)) {
    const html = _collectHtmlFromContent(content);
    const { html: mainHtml, tocEntries } = _renderHtmlArticleMain(html, post);
    return { mainHtml, tocEntries };
  }

  const tpl = _resolveDetailTemplate(post);
  const numberedSections = tpl === "longform" || tpl === "case-study";
  let sectionIndex = 0;
  let html = "";
  const tocEntries = [];

  const hiddenSet = _hiddenSectionSet(post);

  (content || []).forEach((block) => {
    if (block.type === "section") {
      if (hiddenSet.has(block.id)) return;
      sectionIndex += 1;
      tocEntries.push({ id: block.id, title: block.title });
      const figure = block.figureFirst
        ? `<figure class="article-figure"><img src="${post.image}" alt="${post.imageAlt}" width="900" height="400" loading="eager" /></figure>`
        : "";
      const inner = (block.blocks || [])
        .map((b) => _renderBlock(b, post))
        .join("");
      const sectionNum = numberedSections
        ? String(sectionIndex).padStart(2, "0")
        : "";
      const h2NumAttr = sectionNum
        ? ` data-section-num="${sectionNum}"`
        : "";
      const sectionHead =
        tpl === "case-study" && block.subtitle
          ? `<header class="bd-section-head"><h2${h2NumAttr}>${block.title}</h2><p class="bd-section-sub">${block.subtitle}</p></header>`
          : `<h2${h2NumAttr}>${block.title}</h2>`;
      html += `
        <section id="${block.id}">
          ${figure}
          ${sectionHead}
          ${inner}
        </section>`;
    } else if (block.type === "stat-box") {
      const segId = block.segmentId || block.id;
      if (segId && hiddenSet.has(segId)) return;
      html += _renderStatBox(block, tpl);
    }
  });

  const doc = new DOMParser().parseFromString(html, "text/html");
  _enhanceCompareCheckListItems(doc.body);
  return { mainHtml: doc.body.innerHTML, tocEntries };
}

function _renderArticleBody(content, post) {
  const { mainHtml } = _renderArticleMain(content, post);
  return mainHtml + _renderArticleFooter(post);
}

function _getTocSections(content) {
  return (content || []).filter((block) => block.type === "section");
}

function _renderTocLinks(entries) {
  return (entries || [])
    .map(
      (entry, index) =>
        `<a href="#${entry.id}"><span class="toc-num">${String(index + 1).padStart(2, "0")}</span> ${entry.title}</a>`,
    )
    .join("");
}

function _renderToc(content, post) {
  const { tocEntries } = _renderArticleMain(content, post);
  if (tocEntries.length) {
    const filtered = tocEntries.filter(
      (e) => !(e.id === "content" && e.title === "Article"),
    );
    if (filtered.length) return _renderTocLinks(filtered);
  }
  const sections = _getTocSections(content);
  return _renderTocLinks(
    sections.map((section) => ({ id: section.id, title: section.title })),
  );
}

function _renderPreFooterFeatures(features) {
  return (features || [])
    .map(
      (f) => `
    <div class="pre-footer-feature">
      <div class="benefit-icon">${_iconHtml(_resolveBlogIcon(f.icon))}</div>
      <h4>${f.title}</h4>
      <p>${f.text}</p>
    </div>`,
    )
    .join("");
}

function _renderGalleryCard(post) {
  const slug = _categorySlug(post.category, post.categoryKey);
  const searchData = _searchBlob(post);
  return `
    <article
      class="pg-card reveal"
      data-category="${slug}"
      data-id="${post.id}"
      data-title="${post.title.toLowerCase()}"
      data-date="${post.date}"
      data-search="${searchData.replace(/"/g, "&quot;")}"
      tabindex="0"
      aria-label="${post.title}"
    >
      <div class="pg-thumb">
        <div class="pg-thumb-grid" aria-hidden="true"></div>
        <img
          src="${post.image}"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 400px"
          alt="${post.imageAlt}"
          class="pg-thumb-screenshot"
          loading="lazy"
        />
        <div class="pg-overlay" aria-hidden="true">
          <div class="pg-overlay-icon">
            ${_iconHtml("ri-external-link-line")}
          </div>
        </div>
      </div>
      <div class="pg-body">
        <h3 class="pg-name">${post.title}</h3>
        <p class="pg-category">${_categoryLabel(post.category)}</p>
        <p class="pg-desc">${post.excerpt}</p>
        <a href="${_blogUrl(post.id)}" class="pg-link">
          Read article ${_iconHtml("ri-arrow-right-line")}
        </a>
      </div>
    </article>`;
}

function _renderRecentItem(post) {
  return `
    <a
      href="${_blogUrl(post.id)}"
      class="blog-recent-item"
      role="listitem"
      data-category="${_categorySlug(post.category, post.categoryKey)}"
      data-id="${post.id}"
      data-title="${post.title.toLowerCase()}"
      data-date="${post.date}"
      data-search="${_searchBlob(post).replace(/"/g, "&quot;")}"
    >
      <div class="blog-recent-thumb">
        <img src="${_thumbUrl(post.image)}" alt="${post.imageAlt}" class="blog-recent-img" loading="lazy" />
      </div>
      <div class="bd-related-body">
        <div class="bd-related-header">
          <h3 class="blog-recent-title">${post.title}</h3>
          <span class="blog-post-category">${post.category}</span>
          <p class="blog-recent-excerpt">${post.excerpt}</p>
        </div>
        <div class="bd-related-footer">
          <div class="blog-recent-meta">
            <time datetime="${post.date}">${post.dateLabel}</time>
            <span>${post.readTime}</span>
          </div>
          <span class="blog-feat-read">Read More ${_iconHtml("ri-arrow-right-line")}</span>
        </div>
      </div>
    </a>`;
}

function _renderTopicCard(category, count, slugOverride) {
  const slug = slugOverride || _categorySlug(category);
  const abbrMap = {
    backend: "BA",
    frontend: "FR",
    wordpress: "WO",
    "ui-ux": "UX",
    "designs-system": "DS",
    architecture: "AR",
  };
  const abbr = abbrMap[slug] || category.slice(0, 2).toUpperCase();
  return `
    <button type="button" class="blog-topic-card" data-category="${slug}">
      <span class="blog-topic-icon" aria-hidden="true">${abbr}</span>
      <span class="blog-topic-name">${category}</span>
      <span class="blog-topic-count">${count} Article${count === 1 ? "" : "s"}</span>
    </button>`;
}

function _renderTopRead(post) {
  return `
    <li>
      <a href="${_blogUrl(post.id)}">
        <div>
          <p class="blog-top-read-title">${post.title}</p>
          <span class="blog-top-read-meta">${post.readTime}</span>
        </div>
      </a>
    </li>`;
}

function _renderHomeBlogCard(post) {
  return `
    <article
      class="blog-card reveal"
      role="listitem"
      tabindex="0"
      aria-label="${post.title}"
    >
      <div class="blog-card-thumb">
        <img
          src="${post.image}"
          alt="${post.imageAlt}"
          class="blog-card-img"
          loading="lazy"
        />
        <span class="blog-card-category">${post.category}</span>
      </div>
      <div class="blog-card-body">
        <time class="blog-card-siCalendar" datetime="${post.date}">${post.dateLabel}</time>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <a href="${_blogUrl(post.id)}" class="blog-card-read" aria-label="Read more: ${post.title}">
          Read More
          ${_iconHtml("ri-arrow-right-line")}
        </a>
      </div>
    </article>`;
}

function _renderRelatedGridCard(post) {
  return `
    <a href="${_blogUrl(post.id)}" class="bd-related-grid-card">
      <div class="bd-related-grid-thumb">
        <img src="${post.image}" alt="${post.imageAlt}" loading="lazy" />
      </div>
      <span class="blog-post-category">${post.category}</span>
      <h3 class="bd-related-grid-title">${post.title}</h3>
      <span class="bd-related-grid-meta">${post.dateLabel}</span>
      <span class="bd-related-grid-arrow" aria-hidden="true">${_iconHtml("ri-arrow-right-line")}</span>
    </a>`;
}

function _renderRelatedCard(post) {
  return `
    <a href="${_blogUrl(post.id)}" class="bd-related-item">
      <div class="bd-related-thumb">
        <img src="${post.image}" alt="${post.imageAlt}" loading="lazy" />
      </div>
      <div class="bd-related-body">
        <span class="blog-post-category">${post.category}</span>
        <p class="bd-related-title">${post.title}</p>
        <span class="bd-related-meta">${post.dateLabel} · ${post.readTime}</span>
      </div>
    </a>`;
}

function _collectTagCounts(posts) {
  const counts = {};
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function _getPosts() {
  return window.Portfolio.BLOG_ORDER.map(
    (id) => window.Portfolio.BLOGS[id],
  ).filter(Boolean);
}

function _getGalleryPosts() {
  return window.Portfolio.BLOG_GALLERY_ORDER.map(
    (id) => window.Portfolio.BLOGS[id],
  ).filter(Boolean);
}

function _refreshSkeleton(root) {
  const scope =
    root && typeof root.querySelectorAll === "function" ? root : document;
  window.Portfolio?.SKELETON?.refresh?.(scope);
  document.dispatchEvent(new CustomEvent("si:contentUpdated"));
}

((window.Portfolio.BLOG_LIST = (function () {
  function init() {
    if (window.Portfolio.UTILS.getActivePage() !== "blogs") return;

    const run = () => {
    const posts = _getPosts();
    const gallery = document.getElementById("blogsGrid");
    const recent = document.getElementById("blogRecentList");
    const topics = document.getElementById("blogTopicsGrid");
    const topReads = document.getElementById("blogTopReads");

    if (gallery && posts.length) {
      gallery.innerHTML = _getGalleryPosts()
        .map((post) => _renderGalleryCard(post))
        .join("");
    }

    if (recent) {
      recent.innerHTML = posts.map(_renderRecentItem).join("");
    }

    if (topics) {
      const categoryCounts = {};
      posts.forEach((post) => {
        const slug = _categorySlug(post.category, post.categoryKey);
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      });
      const topicConfig = Object.entries(categoryCounts)
        .map(([slug, count]) => {
          const sample = posts.find(
            (p) => _categorySlug(p.category, p.categoryKey) === slug,
          );
          return {
            slug,
            name: sample ? sample.category : slug,
            count,
          };
        })
        .sort((a, b) => b.count - a.count);
      topics.innerHTML = topicConfig
        .map((topic) => _renderTopicCard(topic.name, topic.count, topic.slug))
        .join("");
    }

    if (topReads) {
      topReads.innerHTML = posts
        .slice(0, 3)
        .map((post) => _renderTopRead(post))
        .join("");
    }

    if (window.Portfolio.ANIMATIONS?.initScrollReveal) {
      window.Portfolio.ANIMATIONS.initScrollReveal();
    }

    if (window.Portfolio.BLOG_PAGE?.init) {
      window.Portfolio.BLOG_PAGE.init();
    }

    _hydrateBlogIcons(document.querySelector(".blog-page") || document);
    _refreshSkeleton(document.querySelector(".blog-page") || document);
    };

    window.Portfolio.ensureBlogCatalog().then(run).catch(() => {
      const gallery = document.getElementById("blogsGrid");
      if (gallery) {
        gallery.innerHTML =
          '<p class="blog-load-error">Could not load blogs. Please try again later.</p>';
      }
    });
  }

  return { init };
})()),
  (window.Portfolio.BLOG_DETAILS = (function () {
    let detailInitKey = "";

    function init() {
      if (window.Portfolio.UTILS.getActivePage() !== "blog-details") return;

      const initKey =
        window.location.pathname.replace(/\/+$/, "") +
        window.location.search;
      if (detailInitKey === initKey) return;
      detailInitKey = initKey;

      const runDetail = () => {
      const id = _resolveBlogId();
      const post = id ? window.Portfolio.BLOGS[id] : null;

      const hasBody =
        post &&
        Array.isArray(post.content) &&
        post.content.length > 0;

      if (!post || !hasBody) {
        console.warn("[blogs-data.js] Unknown blog id:", id, "— redirecting.");
        window.location.href = "/blogs";
        return;
      }

      const tpl = _resolveDetailTemplate(post);
      _applyDetailTemplate(post, id);

      const canonicalTarget = _blogUrl(id);
      const normalizedPath = window.location.pathname.replace(/\/+$/, "");
      const currentPath = normalizedPath + window.location.search;
      if (currentPath !== canonicalTarget) {
        window.history.replaceState(null, "", canonicalTarget);
      }

      document.title = `${post.title} — M Sohaib Ishaque`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.excerpt);

      const setText = (elId, text) => {
        const el = document.getElementById(elId);
        if (el) el.textContent = text;
      };

      setText("bdBreadcrumbCategory", post.category);
      setText("bdBreadcrumbTitle", post.title);
      const catBadge = document.getElementById("bdCategory");
      if (catBadge) {
        catBadge.classList.toggle("bd-hero-badge--case-study", tpl === "case-study");
        catBadge.textContent =
          tpl === "case-study" ? "CASE STUDY" : post.category;
      }
      _setHeroTitle(post.title, tpl);
      setText("bdExcerpt", post.excerpt);
      setText("bdAuthor", post.author);
      setText("bdReadTime", post.readTime);

      const dateEl = document.getElementById("bdsiCalendar");
      if (dateEl) {
        dateEl.textContent = post.dateLabel;
        dateEl.setAttribute("datetime", post.date);
      }

      const hero = document.getElementById("bdHero");
      if (hero) {
        hero.style.setProperty("--bd-hero-image", `url("${post.image}")`);
      }

      const heroTags = document.getElementById("bdHeroTags");
      if (heroTags) {
        heroTags.innerHTML = (post.tags || [])
          .slice(0, 3)
          .map((tag) => `<span class="meta-tag">${tag}</span>`)
          .join("");
      }

      const body = document.getElementById("bdArticleBody");
      const { mainHtml, tocEntries } = _renderArticleMain(post.content, post);
      if (body) {
        body.innerHTML = mainHtml + _renderArticleFooter(post);
      }

      const toc = document.getElementById("tocNav");
      if (toc) {
        let entries = tocEntries;
        if (
          entries.length === 1 &&
          entries[0].id === "content" &&
          entries[0].title === "Article"
        ) {
          entries = [];
        }
        if (!entries.length) {
          entries = _getTocSections(post.content).map((section) => ({
            id: section.id,
            title: section.title,
          }));
        }
        toc.innerHTML = entries.length
          ? _renderTocLinks(entries)
          : '<span class="bd-toc-empty">Add sections with headings to build a table of contents.</span>';
      }

      if (post.sidebarCta) {
        setText("bdSidebarCtaTitle", post.sidebarCta.title);
        setText("bdSidebarCtaText", post.sidebarCta.text);
        const ctaLink = document.getElementById("bdSidebarCtaLink");
        if (ctaLink) {
          ctaLink.textContent = post.sidebarCta.linkText;
          ctaLink.href = post.sidebarCta.href || "/contact";
        }
      }

      const engagement = document.getElementById("bdEngagement");
      if (engagement) {
        engagement.setAttribute("data-post-id", post.id);
      }

      if (post.preFooter) {
        setText("bdPreFooterTitle", post.preFooter.title);
        setText("bdPreFooterText", post.preFooter.text);
        const features = document.getElementById("bdPreFooterFeatures");
        if (features) {
          features.innerHTML = _renderPreFooterFeatures(
            post.preFooter.features,
          );
        }
        const preFooterCta = document.getElementById("bdPreFooterCta");
        if (preFooterCta) {
          preFooterCta.textContent = post.preFooter.ctaText;
          preFooterCta.href = post.preFooter.ctaHref || "/contact";
        }
      }

      const related = document.getElementById("bdRelated");
      if (related) {
        const others = window.Portfolio.BLOG_ORDER.filter(
          (blogId) => blogId !== id,
        )
          .slice(0, 3)
          .map((blogId) => window.Portfolio.BLOGS[blogId]);
        related.innerHTML = others.map(_renderRelatedCard).join("");
      }

      const tagsEl = document.getElementById("bdTags");
      if (tagsEl) {
        const allTags = _collectTagCounts(_getPosts());
        tagsEl.innerHTML = allTags
          .slice(0, 8)
          .map(
            ([tag, count]) =>
              `<span class="bd-tag">${tag} <span class="bd-tag-count">${count}</span></span>`,
          )
          .join("");
      }

      const nav = document.getElementById("bdPostNav");
      if (nav) {
        const prev = post.prevBlog
          ? (() => {
              const p = window.Portfolio.BLOGS[post.prevBlog.id];
              return `
            <a href="${_blogUrl(post.prevBlog.id)}" class="bd-post-nav-card">
              <div class="bd-post-nav-arrow" aria-hidden="true">${_iconHtml("ri-arrow-left-s-line")}</div>
              <div class="bd-post-nav-thumb"><img src="${_thumbUrl(p.image)}" alt="" loading="lazy" /></div>
              <div>
                <span class="bd-post-nav-label">Previous Article</span>
                <span class="bd-post-nav-title">${post.prevBlog.title}</span>
              </div>
            </a>`;
            })()
          : "<div></div>";
        const next = post.nextBlog
          ? (() => {
              const n = window.Portfolio.BLOGS[post.nextBlog.id];
              return `
            <a href="${_blogUrl(post.nextBlog.id)}" class="bd-post-nav-card bd-post-nav-card--next">
              <div class="bd-post-nav-arrow" aria-hidden="true">${_iconHtml("ri-arrow-right-s-line")}</div>
              <div class="bd-post-nav-thumb"><img src="${_thumbUrl(n.image)}" alt="" loading="lazy" /></div>
              <div>
                <span class="bd-post-nav-label">Next Article</span>
                <span class="bd-post-nav-title">${post.nextBlog.title}</span>
              </div>
            </a>`;
            })()
          : "<div></div>";
        nav.innerHTML = prev + next;
      }

      if (window.Portfolio.ANIMATIONS?.initScrollReveal) {
        window.Portfolio.ANIMATIONS.initScrollReveal();
      }
      if (window.Portfolio.BLOG_PAGE?.initDetail) {
        window.Portfolio.BLOG_PAGE.initDetail(post);
      }

      const articleRoot = document.getElementById("bdArticleBody");
      if (window.Portfolio.BLOG_ARTICLE_UI && articleRoot) {
        const hiddenSet = _hiddenSectionSet(post);
        window.Portfolio.BLOG_ARTICLE_UI.applyHiddenToDom(articleRoot, hiddenSet);
        window.Portfolio.BLOG_ARTICLE_UI.filterTocLinks(hiddenSet);
        window.Portfolio.BLOG_ARTICLE_UI.enhanceCodeBlocks(articleRoot);
        window.Portfolio.BLOG_ARTICLE_UI.initSectionVisibility(post);
      }

      _hydrateBlogIcons(
        document.querySelector(".blog-details-page") || document,
      );
      _refreshSkeleton(
        document.querySelector(".blog-details-page") || document,
      );
      };

      const id = _resolveBlogId();
      window.Portfolio.ensureBlogCatalog()
        .then(() =>
          id && window.Portfolio.ensureBlogPost
            ? window.Portfolio.ensureBlogPost(id)
            : null,
        )
        .then(runDetail)
        .catch(() => {
        window.location.href = "/blogs";
      });
    }

    return {
      init,
      reset: function () {
        detailInitKey = "";
      },
    };
  })()),
  (window.Portfolio.BLOG_LINKS = (function () {
    function buildTitleMap() {
      const titleMap = {};
      Object.values(window.Portfolio.BLOGS || {}).forEach((post) => {
        titleMap[post.title.trim().toLowerCase()] = post.id;
      });
      return titleMap;
    }

    function wireCard(card, titleMap) {
      const titleEl = card.querySelector(".blog-card-title");
      const linkEl = card.querySelector(".blog-card-read");
      if (!titleEl || !linkEl) return;
      const slug = titleMap[titleEl.textContent.trim().toLowerCase()];
      if (slug) linkEl.href = _blogUrl(slug);
    }

    function bindCards(section, titleMap) {
      const { $$: queryAll } = window.Portfolio.UTILS;
      queryAll(".blog-card", section).forEach((card) => {
        wireCard(card, titleMap);
        const readLink = card.querySelector(".blog-card-read");
        card.addEventListener("click", (event) => {
          if (event.target.closest(".blog-card-read")) return;
          if (readLink) readLink.click();
        });
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (readLink) readLink.click();
          }
        });
      });
    }

    function renderHomeSection(section) {
      const grid = document.getElementById("homeBlogsGrid");
      if (!grid) return;

      const posts = _getPosts().slice(0, 4);
      grid.innerHTML = posts.map(_renderHomeBlogCard).join("");

      if (window.Portfolio.ANIMATIONS?.initScrollReveal) {
        window.Portfolio.ANIMATIONS.initScrollReveal();
      }

      _hydrateBlogIcons(section);
      bindCards(section, buildTitleMap());
    }

    return {
      init: function () {
        const page = window.Portfolio.UTILS.getActivePage();
        const start = () => {
          if (page === "home") {
            const section = document.getElementById("blogs");
            if (section) renderHomeSection(section);
            const viewAll = section && section.querySelector(".blogs-footer a");
            if (viewAll) viewAll.href = "/blogs";
          }
        };
        window.Portfolio.ensureBlogCatalog().then(start).catch(() => {});
      },
    };
  })()));
