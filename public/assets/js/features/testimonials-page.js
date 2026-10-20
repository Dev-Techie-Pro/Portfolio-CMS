"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.TESTIMONIALS_PAGE = (function () {
    const { $: qs, $$: qsa, on: bind } = window.Portfolio.UTILS;
    window.Portfolio.UTILS.ensureSharedFilters();
    const {
      SearchManager,
      FilterManager,
      SortManager,
      PaginationManager,
      ViewToggleManager,
    } = window.Portfolio.SHARED_FILTERS;

    function initReviews() {
      const grid = qs("#trvGrid");
      if (!grid) return;

      const searchInput = qs("#trvSearch");
      const serviceFilter = qs("#trvServiceFilter");
      const clientFilter = qs("#trvClientFilter");
      const ratingFilter = qs("#trvRatingFilter");
      const sortSelect = qs("#trvSortSelect");
      const perPageSelect = qs("#trvPerPage");
      const clearBtn = qs("#trvClearFilters");
      const viewBtns = qsa(".trv-view-btn", grid.closest(".testi-section"));
      const resultsCount = qs("#trvResultsCount");
      const footerCount = qs("#trvFooterCount");
      const noResults = qs("#trvNoResults");
      const moreCard = qs("#trvMoreCard");
      const pagePrev = qs("#trvPagePrev");
      const pageNext = qs("#trvPageNext");
      const pagerPage = qs("#trvPagerPage");

      const cards = qsa(".testi-card", grid);
      let page = 1;

      const filterManager = new FilterManager({
        initial: {
          service: "all",
          client: "all",
          rating: "all",
        },
        predicate: (card, filters) => {
          if (
            filters.service !== "all" &&
            card.dataset.service !== filters.service
          ) {
            return false;
          }
          if (
            filters.client !== "all" &&
            card.dataset.client !== filters.client
          ) {
            return false;
          }
          const minRating =
            filters.rating === "all" ? 0 : parseInt(filters.rating, 10);
          if (parseInt(card.dataset.rating, 10) < minRating) return false;
          return true;
        },
      });

      const searchManager = new SearchManager({
        getSearchableText: (card) => (card.textContent || "").toLowerCase(),
        onSearch: () => {
          page = 1;
          render();
        },
      });

      const sortManager = new SortManager({ initial: "newest" });

      const pagination = new PaginationManager({
        perPage: 6,
        renderMode: "simple",
      });

      function getFiltered() {
        let items = cards.slice();
        items = filterManager.apply(items);
        items = searchManager.filter(items);
        return sortManager.sort(items);
      }

      function render() {
        const filtered = getFiltered();
        const perPage = parseInt(perPageSelect?.value || "6", 10);
        pagination.setPerPage(perPage);
        pagination.setPage(page);
        pagination.clampPage(filtered.length);
        page = pagination.page;

        const pageItems = pagination.slice(filtered);
        const visible = new Set(pageItems);

        cards.forEach((card) => {
          card.hidden = !visible.has(card);
        });

        pageItems.forEach((card) => {
          grid.insertBefore(card, moreCard || null);
        });

        const totalPages = pagination.getTotalPages(filtered.length);
        if (moreCard) {
          moreCard.hidden = filtered.length === 0 || page !== totalPages;
        }
        if (noResults) noResults.hidden = filtered.length !== 0;

        if (resultsCount) resultsCount.textContent = String(filtered.length);

        if (footerCount) {
          if (!filtered.length) {
            footerCount.textContent = "No reviews found";
          } else {
            const start = (page - 1) * perPage;
            const from = start + 1;
            const to = Math.min(start + perPage, filtered.length);
            footerCount.textContent = `Showing ${from} to ${to} of ${filtered.length} reviews`;
          }
        }

        pagination.renderControls(null, filtered.length, {
          pageLabel: pagerPage,
          prevBtn: pagePrev,
          nextBtn: pageNext,
        });
        if (pagerPage) pagerPage.textContent = `${page} / ${totalPages}`;
      }

      searchManager.bindInput(searchInput, {
        ctrlK: true,
        resetPage: () => {
          page = 1;
        },
      });

      filterManager.bindSelect(serviceFilter, "service", () => {
        page = 1;
        render();
      });
      filterManager.bindSelect(clientFilter, "client", () => {
        page = 1;
        render();
      });
      filterManager.bindSelect(ratingFilter, "rating", () => {
        page = 1;
        render();
      });

      sortManager.bindSelect(sortSelect, () => {
        page = 1;
        render();
      });

      if (perPageSelect) {
        bind(perPageSelect, "change", () => {
          page = 1;
          render();
        });
      }

      if (clearBtn) {
        bind(clearBtn, "click", () => {
          searchManager.clear();
          if (serviceFilter) serviceFilter.value = "all";
          if (clientFilter) clientFilter.value = "all";
          if (ratingFilter) ratingFilter.value = "all";
          if (sortSelect) sortSelect.value = "newest";
          filterManager.reset({
            service: "all",
            client: "all",
            rating: "all",
          });
          sortManager.setSort("newest");
          page = 1;
          render();
        });
      }

      if (pagePrev) {
        bind(pagePrev, "click", () => {
          if (page > 1) {
            page -= 1;
            render();
          }
        });
      }

      if (pageNext) {
        bind(pageNext, "click", () => {
          page += 1;
          render();
        });
      }

      new ViewToggleManager({
        gridEl: grid,
        buttons: viewBtns,
        classMap: {},
        onChange: (view) => {
          grid.dataset.view = view;
        },
      }).bindButtons();

      bind(document, "keydown", (event) => {
        if (
          (event.ctrlKey || event.metaKey) &&
          event.key.toLowerCase() === "k" &&
          document.body.contains(searchInput) &&
          window.Portfolio.UTILS.isInViewport(grid)
        ) {
          event.preventDefault();
          searchInput.focus();
        }
      });

      render();

      const metrics = qs(".trv-metrics");
      if (
        metrics &&
        window.Portfolio.ANIMATIONS &&
        typeof IntersectionObserver !== "undefined"
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target
                .querySelectorAll("[data-target]")
                .forEach(window.Portfolio.ANIMATIONS.animateCounter);
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.4 },
        );
        observer.observe(metrics);
      }
    }

    return { init: initReviews, initReviews };
  })()));
