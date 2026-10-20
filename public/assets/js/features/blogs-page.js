"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.BLOG_PAGE = (function () {
    const {
      SearchManager,
      FilterManager,
      SortManager,
      PaginationManager,
      ViewToggleManager,
      DropdownManager,
      NewsletterManager,
    } = window.Portfolio.SHARED_FILTERS;

    const GALLERY_PER_PAGE = 8;

    const DROPDOWN_CATEGORY_MAP = {
      all: null,
      web: ["backend", "frontend", "wordpress"],
      "ui/ux": ["frontend"],
      "product-design": ["designs-system"],
      career: ["career"],
      tools: ["backend"],
      tutorials: ["backend", "frontend", "wordpress"],
    };

    function matchesBlogCategory(item, filterValue) {
      if (!filterValue || filterValue === "all") return true;
      const slug = item.dataset.category || "";
      const dropdownSlugs = DROPDOWN_CATEGORY_MAP[filterValue];
      if (dropdownSlugs) {
        return dropdownSlugs.includes(slug);
      }
      if (filterValue === "ui-ux") {
        return slug === "frontend";
      }
      if (filterValue === "designs-system") {
        return false;
      }
      return slug === filterValue;
    }

    function getSearchText(item) {
      return (item.dataset.search || item.textContent || "").toLowerCase();
    }

    function wireGalleryCards(cards) {
      cards.forEach((card) => {
        card.addEventListener("click", (event) => {
          if (event.target.closest("a")) return;
          const link = card.querySelector(".pg-link");
          if (link) link.click();
        });
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const link = card.querySelector(".pg-link");
            if (link) link.click();
          }
        });
      });
    }

    function init() {
      if (window.Portfolio.UTILS.getActivePage() !== "blogs") return;

      const galleryGrid = document.getElementById("blogsGrid");
      const recentList = document.getElementById("blogRecentList");
      const galleryCards = galleryGrid
        ? Array.from(galleryGrid.querySelectorAll(".pg-card"))
        : [];
      const recentItems = recentList
        ? Array.from(recentList.querySelectorAll(".blog-recent-item"))
        : [];

      const sharedState = {
        category: "all",
        topicCategory: null,
      };

      const galleryPagination = new PaginationManager({
        perPage: GALLERY_PER_PAGE,
      });

      const searchManager = new SearchManager({
        getSearchableText: getSearchText,
        onSearch: () => {
          galleryPagination.setPage(1);
          renderGallery();
          renderRecent();
        },
      });

      const filterManager = new FilterManager({
        initial: { category: "all" },
        predicate: (item, filters) =>
          matchesBlogCategory(item, filters.category),
        onFilter: () => {
          galleryPagination.setPage(1);
          renderGallery();
          renderRecent();
        },
      });

      const sortManager = new SortManager({
        initial: "latest",
        onSort: () => {
          renderGallery();
          renderRecent();
        },
      });

      function getFilteredGallery() {
        let items = galleryCards.slice();
        items = filterManager.apply(items);
        items = searchManager.filter(items);
        return sortManager.sort(items);
      }

      function getFilteredRecent() {
        let items = recentItems.slice();
        items = filterManager.apply(items);
        items = searchManager.filter(items);
        return sortManager.sort(items);
      }

      function showGalleryCards(visibleSet) {
        galleryCards.forEach((card) => {
          const show = visibleSet.has(card);
          card.classList.toggle("hidden", !show);
          card.style.display = show ? "" : "none";
        });
      }

      function renderGallery() {
        const filtered = getFilteredGallery();
        galleryPagination.clampPage(filtered.length);
        const pageItems = galleryPagination.slice(filtered);
        const visible = new Set(pageItems);
        showGalleryCards(visible);

        const controls = document.getElementById("blPaginationControls");
        galleryPagination.renderControls(controls, filtered.length, {
          prevBtn: document.getElementById("blPagePrev"),
          nextBtn: document.getElementById("blPageNext"),
          onNavigate: () => {
            renderGallery();
            galleryGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
        });
      }

      function renderRecent() {
        const filtered = getFilteredRecent();
        const visible = new Set(filtered);
        const noResults = document.getElementById("blogNoResults");

        recentItems.forEach((item) => {
          item.classList.toggle("is-hidden", !visible.has(item));
        });

        if (noResults) noResults.hidden = filtered.length > 0;
      }

      function setCategory(value, source) {
        sharedState.category = value || "all";
        sharedState.topicCategory = source === "topic" ? value : null;
        filterManager.set("category", sharedState.category);

        const dropdownLabel = document.getElementById(
          "blDropdownLabelCategory",
        );
        const dropdownMenu = document.getElementById("blDropdownMenuCategory");
        if (dropdownMenu && source === "topic") {
          const allOption = dropdownMenu.querySelector('li[data-value="all"]');
          if (dropdownLabel && allOption) {
            dropdownLabel.textContent = allOption.textContent;
          }
          dropdownMenu.querySelectorAll('li[role="option"]').forEach((el) => {
            el.setAttribute(
              "aria-selected",
              el.dataset.value === "all" ? "true" : "false",
            );
          });
        }

        document.querySelectorAll(".blog-topic-card").forEach((card) => {
          const isActive =
            source === "topic" && card.dataset.category === value;
          card.classList.toggle("is-active", isActive);
        });

        galleryPagination.setPage(1);
        renderGallery();
        renderRecent();
      }

      searchManager.bindInput(document.getElementById("blSearchInput"), {
        ctrlK: true,
        resetPage: () => {
          galleryPagination.setPage(1);
        },
      });

      sortManager.bindSelect(document.getElementById("blSortSelect"), () => {
        galleryPagination.setPage(1);
      });

      const categoryDropdown = document.querySelector(
        '.pf-dropdown[data-dropdown="category"]',
      );
      if (categoryDropdown) {
        new DropdownManager({
          dropdowns: [categoryDropdown],
          onSelect: (_type, value) => {
            sharedState.topicCategory = null;
            document
              .querySelectorAll(".blog-topic-card")
              .forEach((card) => card.classList.remove("is-active"));
            setCategory(value, "dropdown");
          },
        }).bind();
      }

      const viewToggle = new ViewToggleManager({
        gridEl: galleryGrid,
        buttons: Array.from(
          document.querySelectorAll(".bl-view-toggle .pg-view-btn"),
        ),
        classMap: {
          list: "pg-grid--list",
          masonry: "pg-grid--masonry",
        },
      });
      viewToggle.bindButtons();

      const prevBtn = document.getElementById("blPagePrev");
      const nextBtn = document.getElementById("blPageNext");
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (galleryPagination.page > 1) {
            galleryPagination.setPage(galleryPagination.page - 1);
            renderGallery();
            galleryGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          galleryPagination.setPage(galleryPagination.page + 1);
          renderGallery();
          galleryGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }

      document.querySelectorAll(".blog-topic-card").forEach((card) => {
        card.addEventListener("click", () => {
          const cat = card.dataset.category;
          if (cat) {
            setCategory(cat, "topic");
            document.getElementById("blog-recent")?.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      });

      wireGalleryCards(galleryCards);
      new NewsletterManager("blogNewsletterForm").init();

      renderGallery();
      renderRecent();
    }

    function initDetail(_post) {
      new NewsletterManager("bdNewsletterForm").init();

      const toastEl = document.getElementById("toast");
      let toastTimer;

      function showToast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3000);
      }

      document.querySelectorAll("[data-share]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const type = btn.getAttribute("data-share");
          const url = window.location.href;
          const title = document.title;
          if (type === "copy") {
            if (navigator.clipboard) {
              navigator.clipboard
                .writeText(url)
                .then(() => showToast("Link copied to clipboard!"));
            } else {
              showToast(url);
            }
          } else if (type === "twitter") {
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
              "_blank",
              "noopener,noreferrer",
            );
          } else if (type === "linkedin") {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
              "_blank",
              "noopener,noreferrer",
            );
          } else if (type === "facebook") {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
              "_blank",
              "noopener,noreferrer",
            );
          }
        });
      });

      const tocLinks = document.querySelectorAll("#tocNav a");
      const sections = document.querySelectorAll(
        ".article-content section[id]",
      );

      if (
        tocLinks.length &&
        sections.length &&
        "IntersectionObserver" in window
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const id = entry.target.id;
              tocLinks.forEach((link) => {
                link.classList.toggle(
                  "active",
                  link.getAttribute("href") === `#${id}`,
                );
              });
            });
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
        );
        sections.forEach((section) => observer.observe(section));
      }

      tocLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const target = document.querySelector(link.getAttribute("href"));
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: "smooth" });
        });
      });

      if (window.Portfolio.BLOG_ENGAGEMENT?.init) {
        window.Portfolio.BLOG_ENGAGEMENT.init(_post);
      }
    }

    return { init, initDetail };
  })()));
