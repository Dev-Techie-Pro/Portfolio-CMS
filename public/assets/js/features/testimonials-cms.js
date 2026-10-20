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

  function initials(name) {
    return String(name || "?")
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  }

  function roleLine(item) {
    const parts = [item.role, item.company].filter(Boolean);
    return parts.join(", ") || "Client";
  }

  function slugify(value) {
    return String(value || "general")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "general";
  }

  function serviceMeta(item) {
    const label = item.company || item.role || "Web Development";
    return { slug: slugify(label), label };
  }

  function renderStars(rating) {
    const count = Math.max(0, Math.min(5, parseInt(rating, 10) || 5));
    const stars = Array.from({ length: count }, () => '<span class="star">★</span>').join("");
    return `<div class="testi-stars" aria-label="${count} out of 5 stars">${stars}</div>`;
  }

  function renderHeroStars(rating) {
    const count = Math.max(0, Math.min(5, parseInt(rating, 10) || 5));
    return Array.from({ length: count }, () => '<span class="icon" data-icon="siStarfill"></span>').join("");
  }

  function setAvatar(el, name, imageUrl) {
    if (!el) return;
    const letters = initials(name);
    el.innerHTML = "";
    if (imageUrl && imageUrl.trim()) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = `${name}'s avatar`;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.borderRadius = "50%";
      img.onerror = function () {
        el.textContent = letters;
      };
      el.appendChild(img);
    } else {
      el.textContent = letters;
    }
  }

  function renderHomeCard(item) {
    return `
      <div class="testimonial-card reveal">
        <p class="testimonial-text">${escapeHtml(item.quote)}</p>
        <div class="testimonial-author">
          <div class="author-avatar" aria-hidden="true">${escapeHtml(initials(item.name))}</div>
          <div>
            <p class="author-name">${escapeHtml(item.name)}</p>
            <p class="author-role">${escapeHtml(roleLine(item))}</p>
          </div>
        </div>
      </div>`;
  }

  function renderPageCard(item, order) {
    const service = serviceMeta(item);
    const date = item.createdAt || "";
    return `
      <div class="testi-card reveal" data-service="${escapeHtml(service.slug)}" data-client="${escapeHtml(item.name)}" data-rating="${escapeHtml(item.rating)}" data-order="${order}" data-date="${escapeHtml(date)}">
        <div class="trv-card-top">
          <span class="testi-card-quote" aria-hidden="true">&ldquo;</span>
          <span class="trv-service-tag">${escapeHtml(service.label)}</span>
        </div>
        <p class="testi-card-text">${escapeHtml(item.quote)}</p>
        <div class="testi-card-author">
          <div class="testi-card-avatar" aria-hidden="true">${escapeHtml(initials(item.name))}</div>
          <div>
            <p class="testi-card-name">${escapeHtml(item.name)}</p>
            <p class="testi-card-role">${escapeHtml(roleLine(item))}</p>
          </div>
          ${renderStars(item.rating)}
        </div>
      </div>`;
  }

  function heroSlides(items) {
    const featured = items.filter((t) => t.featured);
    const pool = featured.length ? featured : items;
    return pool.slice(0, Math.min(5, pool.length));
  }

  function renderHeroSlider(items) {
    const slides = heroSlides(items);
    const slider = document.getElementById("thSlider");
    const dotsWrap = document.getElementById("thDots");
    const starsEl = document.querySelector(".ht-testi-card .ht-stars");
    const plusBadge = document.querySelector(".ht-plus-badge");
    if (!slider || !slides.length) return [];

    slider.innerHTML = slides
      .map(
        (item, index) => `
        <div class="th-quote-slide${index === 0 ? " active" : ""}" data-index="${index}">
          <p class="th-quote-text">${escapeHtml(item.quote)}</p>
        </div>`,
      )
      .join("");

    if (dotsWrap) {
      dotsWrap.innerHTML = slides
        .map(
          (item, index) => `
          <button type="button" class="th-dot${index === 0 ? " active" : ""}" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-label="Testimonial ${index + 1}" data-index="${index}"></button>`,
        )
        .join("");
    }

    if (starsEl) {
      starsEl.innerHTML = renderHeroStars(slides[0].rating);
      starsEl.setAttribute("aria-label", `${slides[0].rating} out of 5 stars`);
    }

    const nameEl = document.getElementById("thClientName");
    const roleEl = document.getElementById("thClientRole");
    if (nameEl) nameEl.textContent = slides[0].name;
    if (roleEl) roleEl.textContent = roleLine(slides[0]);

    const avatarEl =
      document.getElementById("thClientAvatar") ||
      document.querySelector(".ht-testi-avatar");
    setAvatar(avatarEl, slides[0].name, slides[0].imageUrl);

    if (plusBadge) {
      const extra = Math.max(0, items.length - slides.length);
      plusBadge.textContent = extra > 0 ? `+${extra}` : "";
      plusBadge.hidden = extra <= 0;
    }

    Portfolio.ICONS?.hydrateAll?.(slider.closest(".ht-testi-card") || slider);
    return slides;
  }

  function bindHeroSlider(slides) {
    const hero = document.querySelector(".hero-testi");
    if (!hero || !slides.length) return;

    const { $$: queryAll, on: bind } = Portfolio.UTILS;
    const slideEls = queryAll(".th-quote-slide", hero);
    const dotEls = queryAll(".th-dot", hero);
    const nameEl = document.getElementById("thClientName");
    const roleEl = document.getElementById("thClientRole");
    const starsEl = document.querySelector(".ht-testi-card .ht-stars");
    let index = 0;
    let timer = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function avatarEl() {
      return (
        document.getElementById("thClientAvatar") ||
        document.querySelector(".ht-testi-avatar")
      );
    }

    function goTo(next) {
      if (!slideEls.length || !dotEls.length) return;
      if (next === index) return;
      slideEls[index].classList.remove("active");
      dotEls[index].classList.remove("active");
      dotEls[index].setAttribute("aria-selected", "false");
      index = (next + slides.length) % slides.length;
      slideEls[index].classList.add("active");
      dotEls[index].classList.add("active");
      dotEls[index].setAttribute("aria-selected", "true");
      const item = slides[index];
      if (nameEl) nameEl.textContent = item.name;
      if (roleEl) roleEl.textContent = roleLine(item);
      if (starsEl) {
        starsEl.innerHTML = renderHeroStars(item.rating);
        starsEl.setAttribute("aria-label", `${item.rating} out of 5 stars`);
      }
      setAvatar(avatarEl(), item.name, item.imageUrl);
      Portfolio.ICONS?.hydrateAll?.(hero);
    }

    function startAutoplay() {
      if (reducedMotion || slideEls.length < 2) return;
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 5500);
    }

    dotEls.forEach((dot) => {
      bind(dot, "click", () => {
        goTo(parseInt(dot.getAttribute("data-index"), 10));
        startAutoplay();
      });
    });

    const card = hero.querySelector(".ht-testi-card");
    if (card) {
      bind(card, "mouseenter", () => clearInterval(timer));
      bind(card, "mouseleave", () => startAutoplay());
    }

    startAutoplay();
  }

  function populateFilters(items) {
    const serviceSelect = document.getElementById("trvServiceFilter");
    const clientSelect = document.getElementById("trvClientFilter");
    if (!serviceSelect && !clientSelect) return;

    const services = new Map();
    items.forEach((item) => {
      const meta = serviceMeta(item);
      services.set(meta.slug, meta.label);
    });

    if (serviceSelect) {
      const keep = serviceSelect.value;
      serviceSelect.innerHTML =
        '<option value="all">All Services</option>' +
        Array.from(services.entries())
          .sort((a, b) => a[1].localeCompare(b[1]))
          .map(
            ([slug, label]) =>
              `<option value="${escapeHtml(slug)}">${escapeHtml(label)}</option>`,
          )
          .join("");
      if (keep && keep !== "all" && services.has(keep)) serviceSelect.value = keep;
    }

    if (clientSelect) {
      const keep = clientSelect.value;
      const names = [...new Set(items.map((t) => t.name))].sort((a, b) =>
        a.localeCompare(b),
      );
      clientSelect.innerHTML =
        '<option value="all">All Clients</option>' +
        names
          .map(
            (name) =>
              `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`,
          )
          .join("");
      if (keep && keep !== "all" && names.includes(keep)) clientSelect.value = keep;
    }
  }

  function updateMetrics(items) {
    const metrics = document.querySelector(".trv-metrics");
    if (!metrics || !items.length) return;

    const avg =
      items.reduce((sum, t) => sum + (parseInt(t.rating, 10) || 5), 0) / items.length;
    const avgRounded = (Math.round(avg * 10) / 10).toFixed(1);
    const avgNum = metrics.querySelector(".trv-metric-card .trv-metric-num");
    if (avgNum && !avgNum.hasAttribute("data-target")) {
      avgNum.textContent = avgRounded;
    }

    const reviewCounter = metrics.querySelector('[data-target="25"]');
    if (reviewCounter) {
      reviewCounter.setAttribute("data-target", String(items.length));
      reviewCounter.textContent = `0${reviewCounter.getAttribute("data-suffix") || "+"}`;
    }

    const clientCounter = metrics.querySelector('[data-target="20"]');
    if (clientCounter) {
      const uniqueClients = new Set(items.map((t) => t.name)).size;
      clientCounter.setAttribute("data-target", String(uniqueClients));
      clientCounter.textContent = `0${clientCounter.getAttribute("data-suffix") || "+"}`;
    }
  }

  function renderReviewsGrid(items) {
    const grid = document.getElementById("trvGrid");
    if (!grid) return;
    const moreCard = document.getElementById("trvMoreCard");
    const noResults = document.getElementById("trvNoResults");

    if (!items.length) {
      grid.querySelectorAll(".testi-card").forEach((card) => card.remove());
      if (noResults) {
        noResults.hidden = false;
        noResults.textContent = "No reviews published yet.";
      }
      return;
    }

    grid.querySelectorAll(".testi-card").forEach((card) => card.remove());
    const html = items.map((item, index) => renderPageCard(item, index)).join("");
    if (moreCard) {
      moreCard.insertAdjacentHTML("beforebegin", html);
    } else {
      grid.insertAdjacentHTML("afterbegin", html);
    }
    if (noResults) noResults.hidden = true;
  }

  function renderHomeGrid(items) {
    const grid = document.getElementById("homeTestimonialsGrid");
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML =
        '<p class="testi-load-empty">No testimonials published yet.</p>';
      return;
    }
    grid.innerHTML = items.map(renderHomeCard).join("");
    Portfolio.ICONS?.hydrateAll?.(grid);
    if (Portfolio.ANIMATIONS?.initScrollReveal) {
      Portfolio.ANIMATIONS.initScrollReveal();
    }
    Portfolio.CAROUSEL?.initTestimonialsCarousel?.();
  }

  function initReviewsPage() {
    Portfolio.UTILS?.ensureSharedFilters?.();
    if (!Portfolio.TESTIMONIALS_PAGE) return;
    if (Portfolio.TESTIMONIALS_PAGE.initReviews) {
      Portfolio.TESTIMONIALS_PAGE.initReviews();
    } else if (Portfolio.TESTIMONIALS_PAGE.init) {
      Portfolio.TESTIMONIALS_PAGE.init();
    }
  }

  function bootstrapTestimonialsPage() {
    return Portfolio.ensureTestimonials()
      .then((items) => {
        const slides = renderHeroSlider(items);
        bindHeroSlider(slides);
        populateFilters(items);
        updateMetrics(items);
        renderReviewsGrid(items);
        initReviewsPage();
        if (Portfolio.ANIMATIONS?.initScrollReveal) {
          Portfolio.ANIMATIONS.initScrollReveal();
        }
      })
      .catch(() => {
        const grid = document.getElementById("trvGrid");
        if (grid) {
          const msg = document.getElementById("trvNoResults");
          if (msg) {
            msg.hidden = false;
            msg.textContent = "Could not load reviews. Please try again later.";
          }
        }
      });
  }

  function initHome() {
    const grid = document.getElementById("homeTestimonialsGrid");
    if (!grid) return;
    Portfolio.ensureTestimonials()
      .then((items) => renderHomeGrid(items))
      .catch(() => {
        grid.innerHTML =
          '<p class="testi-load-error">Could not load testimonials. Please try again later.</p>';
      });
  }

  Portfolio.TESTIMONIALS_CMS = {
    bootstrapTestimonialsPage,
    initHome,
    renderHeroSlider,
    bindHeroSlider,
  };

  if (document.getElementById("homeTestimonialsGrid")) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initHome, { once: true });
    } else {
      initHome();
    }
  }
})();
