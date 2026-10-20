"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.PROJECTS_PAGE = (function () {
    const { $: qs, $$: qsa, on: bind } = window.Portfolio.UTILS;
    const {
      SearchManager,
      SortManager,
      PaginationManager,
      ViewToggleManager,
      DropdownManager,
    } = window.Portfolio.SHARED_FILTERS;

    function init() {
      const cards = qsa(".pg-card");
      const grid = qs("#projectsGrid");
      if (!cards.length || !grid) {
        window.Portfolio.TEXTURES.createPageParticles(
          ".projects-hero",
          "floatPP",
          "@keyframes floatPP{0%{transform:translate(0,0);opacity:.5;}100%{transform:translate(10px,-30px);opacity:0;}}",
          14,
        );
        return;
      }

      const catAll = qs("#pfCatAll");
      const catInputs = qsa('input[name="pf-category"]');
      const techInputs = qsa('input[name="pf-tech"]');
      const industryInputs = qsa('input[name="pf-industry"]');
      const clientInputs = qsa('input[name="pf-client"]');
      const statusInputs = qsa('input[name="pf-status"]');
      const yearSlider = qs("#pfYearSlider");
      const yearLabel = qs("#pfYearMinLabel");
      const sortSelect = qs("#pfSortSelect");
      const perPageSelect = qs("#pfPerPage");
      const resultsCount = qs("#pfResultsCount");
      const paginationInfo = qs("#pfPaginationInfo");
      const paginationControls = qs("#pfPaginationControls");
      const pagePrev = qs("#pfPagePrev");
      const pageNext = qs("#pfPageNext");
      const resetBtn = qs("#pfResetFilters");
      const clearAllBtn = qs("#pfClearAll");
      const viewBtns = qsa(".pg-view-btn");
      const quickLinks = qsa(".pf-quicklink[data-quick-filter]");
      const refreshBtn = qs("#pfRefreshBtn");
      const techBarRows = qsa(".pf-tech-bar-row[data-tech-filter]");
      const dropdowns = qsa(".pf-dropdown[data-dropdown]");
      const moreFiltersBtn = qs("#pfMoreFiltersBtn");
      const sidebar = qs(".pg-sidebar");

      const state = {
        search: "",
        sort: "latest",
        perPage: 12,
        page: 1,
        topCategory: "all",
        topTechnology: "all",
        topIndustry: "all",
        topPlatform: "all",
      };

      const yearMin = yearSlider ? parseInt(yearSlider.min, 10) : 2021;
      const yearMax = yearSlider ? parseInt(yearSlider.max, 10) : 2024;

      const items = cards.map((card, index) => {
        const num =
          parseInt(card.querySelector(".pg-num")?.textContent || "0", 10) ||
          index + 1;
        const total = cards.length;
        const span = yearMax - yearMin;
        return {
          card,
          index,
          num,
          year:
            span > 0
              ? yearMin +
                Math.round(((num - 1) / Math.max(total - 1, 1)) * span)
              : yearMax,
          name:
            card.querySelector(".pg-name")?.textContent.trim().toLowerCase() ||
            "",
          desc:
            card.querySelector(".pg-desc")?.textContent.trim().toLowerCase() ||
            "",
          cats: (card.dataset.category || "").split(" ").filter(Boolean),
          tags: qsa(".pg-tag", card).map((tag) =>
            tag.textContent.trim().toLowerCase(),
          ),
        };
      });

      const pagination = new PaginationManager({ perPage: 12, maxVisible: 5 });

      const sortManager = new SortManager({
        initial: "latest",
        strategies: {
          latest: (a, b) => b.num - a.num,
          oldest: (a, b) => a.num - b.num,
          "name-asc": (a, b) => a.name.localeCompare(b.name),
          "name-desc": (a, b) => b.name.localeCompare(a.name),
        },
      });

      function checkedValues(inputs) {
        return inputs
          .filter((input) => input.checked && input.value !== "all")
          .map((input) => input.value);
      }

      function filterItems() {
        return items.filter(
          (item) =>
            matchesCategory(item) &&
            matchesTech(item) &&
            matchesIndustry(item) &&
            !checkedValues(clientInputs).length &&
            matchesStatus() &&
            matchesYear(item) &&
            matchesSearch(item),
        );
      }

      function matchesCategory(item) {
        const selected = checkedValues(catInputs)
          .map((val) => val.split(" "))
          .flat();
        const sidebarOk =
          !selected.length || selected.some((cat) => item.cats.includes(cat));
        const topOk =
          state.topCategory === "all" ||
          state.topCategory.split(" ").some((cat) => item.cats.includes(cat));
        const platformOk =
          state.topPlatform === "all" || item.cats.includes(state.topPlatform);
        return sidebarOk && topOk && platformOk;
      }

      function matchesTech(item) {
        const selected = checkedValues(techInputs);
        const sidebarOk =
          !selected.length || selected.some((tag) => item.tags.includes(tag));
        const topOk =
          state.topTechnology === "all" ||
          item.tags.includes(state.topTechnology);
        return sidebarOk && topOk;
      }

      function matchesIndustry(item) {
        const flags = {
          ecommerce: item.cats.includes("ecommerce"),
          education:
            item.tags.includes("education") ||
            item.desc.includes("education") ||
            item.desc.includes("course"),
          enterprise:
            item.desc.includes("enterprise") || item.desc.includes("business"),
          inventory:
            item.desc.includes("inventory") || item.desc.includes("stock"),
          tools: item.cats.includes("tools"),
        };
        const selected = checkedValues(industryInputs);
        const sidebarOk =
          !selected.length || selected.some((key) => flags[key]);
        const topOk = state.topIndustry === "all" || flags[state.topIndustry];
        return sidebarOk && topOk;
      }

      function matchesStatus() {
        const selected = checkedValues(statusInputs);
        return !selected.length || selected.includes("completed");
      }

      function matchesYear(item) {
        if (!yearSlider) return true;
        return item.year >= parseInt(yearSlider.value, 10);
      }

      function matchesSearch(item) {
        if (!state.search) return true;
        return (
          item.name.includes(state.search) ||
          item.desc.includes(state.search) ||
          item.tags.some((tag) => tag.includes(state.search))
        );
      }

      function render() {
        const filteredMeta = sortManager.sort(filterItems());
        const total = filteredMeta.length;
        const perPage = state.perPage === "all" ? total || 1 : state.perPage;
        pagination.setPerPage(perPage);
        pagination.setPage(state.page);
        pagination.clampPage(total);
        state.page = pagination.page;

        const start = (pagination.page - 1) * perPage;
        const pageSlice = filteredMeta.slice(start, start + perPage);
        const visible = new Set(pageSlice.map((entry) => entry.index));
        let animIndex = 0;

        items.forEach((entry) => {
          const { card } = entry;
          const show = visible.has(entry.index);
          const order = pageSlice.findIndex((row) => row.index === entry.index);
          card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          card.style.transitionDelay = show ? `${0.06 * animIndex}s` : "0s";
          if (show) {
            card.style.order = order >= 0 ? order : 0;
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            card.classList.remove("hidden");
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }),
            );
            animIndex += 1;
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            setTimeout(() => card.classList.add("hidden"), 300);
          }
        });

        if (resultsCount) {
          resultsCount.textContent = `${total} Project${total === 1 ? "" : "s"} Found`;
        }
        if (paginationInfo) {
          if (!total) {
            paginationInfo.textContent = "No projects match your filters";
          } else {
            const from = start + 1;
            const to = start + pageSlice.length;
            paginationInfo.textContent = `Showing ${from} to ${to} of ${total} project${total === 1 ? "" : "s"}`;
          }
        }

        pagination.renderControls(paginationControls, total, {
          prevBtn: pagePrev,
          nextBtn: pageNext,
          onNavigate: () => {
            state.page = pagination.page;
            render();
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
          },
        });
      }

      function resetFilters() {
        catInputs.forEach((input) => {
          input.checked = input.value === "all";
        });
        [techInputs, industryInputs, clientInputs].forEach((group) => {
          group.forEach((input) => {
            input.checked = false;
          });
        });
        statusInputs.forEach((input) => {
          input.checked = input.value === "completed";
        });
        if (yearSlider) {
          yearSlider.value = yearSlider.min;
          if (yearLabel) yearLabel.textContent = yearSlider.min;
        }
        const searchInput = qs("#pfSearchInput");
        if (searchInput) searchInput.value = "";
        if (sortSelect) sortSelect.value = "latest";
        if (perPageSelect) perPageSelect.value = "12";
        techBarRows.forEach((row) => row.classList.remove("active"));
        dropdowns.forEach((dropdown) => {
          const type = dropdown.dataset.dropdown;
          const menu = qs(".pf-dropdown-menu", dropdown);
          const label = qs(".pf-dropdown-label", dropdown);
          const allOption = menu ? qs('li[data-value="all"]', menu) : null;
          if (menu) {
            qsa('li[role="option"]', menu).forEach((option) => {
              option.setAttribute(
                "aria-selected",
                option === allOption ? "true" : "false",
              );
            });
          }
          if (label && allOption) label.textContent = allOption.textContent;
          const keyMap = {
            category: "topCategory",
            technology: "topTechnology",
            industry: "topIndustry",
            platform: "topPlatform",
          };
          if (type && keyMap[type]) state[keyMap[type]] = "all";
        });
        state.search = "";
        state.sort = "latest";
        state.perPage = 12;
        state.page = 1;
        sortManager.setSort("latest");
        render();
      }

      const searchManager = new SearchManager({
        onSearch: (query) => {
          state.search = query;
          state.page = 1;
          render();
        },
      });
      searchManager.bindInput(qs("#pfSearchInput"), {
        ctrlK: true,
        resetPage: () => {
          state.page = 1;
        },
      });

      sortManager.bindSelect(sortSelect, (key) => {
        state.sort = key;
        render();
      });

      new ViewToggleManager({
        gridEl: grid,
        buttons: viewBtns,
      }).bindButtons();

      const dropdownKeyMap = {
        category: "topCategory",
        technology: "topTechnology",
        industry: "topIndustry",
        platform: "topPlatform",
      };
      new DropdownManager({
        dropdowns,
        onSelect: (type, value) => {
          const key = dropdownKeyMap[type];
          if (key) {
            state[key] = value;
            state.page = 1;
            render();
          }
        },
      }).bind();

      catInputs.forEach((input) => {
        bind(input, "change", () => {
          if (input.value === "all") {
            if (input.checked) {
              catInputs.forEach((other) => {
                if (other !== input) other.checked = false;
              });
            }
          } else if (input.checked) {
            if (catAll) catAll.checked = false;
          } else if (
            !catInputs.some((other) => other !== catAll && other.checked)
          ) {
            if (catAll) catAll.checked = true;
          }
          state.page = 1;
          render();
        });
      });

      [techInputs, industryInputs, clientInputs, statusInputs].forEach(
        (group) => {
          group.forEach((input) => {
            bind(input, "change", () => {
              state.page = 1;
              render();
            });
          });
        },
      );

      if (yearSlider) {
        bind(yearSlider, "input", () => {
          if (yearLabel) yearLabel.textContent = yearSlider.value;
          state.page = 1;
          render();
        });
      }

      const showMoreTech = qs("#pfShowMoreTech");
      if (showMoreTech) {
        bind(showMoreTech, "click", () => {
          const targetId = showMoreTech.dataset.collapseTarget;
          const target = targetId ? document.getElementById(targetId) : null;
          if (!target) return;
          const collapsed = target.classList.contains("pf-collapsed");
          target.classList.toggle("pf-collapsed", !collapsed);
          showMoreTech.setAttribute("aria-expanded", String(collapsed));
          if (showMoreTech.id === "pfShowMoreTech") {
            showMoreTech.textContent = collapsed
              ? "- Show Less"
              : "+ Show More";
          }
        });
      }

      const viewAllTech = qs("#pfViewAllTech");
      if (viewAllTech) {
        bind(viewAllTech, "click", () => {
          const targetId = viewAllTech.dataset.collapseTarget;
          const target = targetId ? document.getElementById(targetId) : null;
          if (target) target.classList.remove("pf-collapsed");
          if (showMoreTech) {
            showMoreTech.setAttribute("aria-expanded", "true");
            showMoreTech.textContent = "- Show Less";
          }
          const techList = qs("#pfTechList");
          techList?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }

      techBarRows.forEach((row) => {
        bind(row, "click", () => {
          const tech = row.dataset.techFilter;
          techInputs.forEach((input) => {
            input.checked = input.value === tech;
          });
          row.classList.toggle("active");
          techBarRows.forEach((other) => {
            if (other !== row) other.classList.remove("active");
          });
          state.page = 1;
          render();
        });
      });

      qsa(".pf-group-head").forEach((head) => {
        bind(head, "click", () => {
          const expanded = head.getAttribute("aria-expanded") === "true";
          head.setAttribute("aria-expanded", String(!expanded));
          const targetId = head.dataset.collapseTarget;
          const target = targetId ? document.getElementById(targetId) : null;
          if (target) target.classList.toggle("pf-collapsed", expanded);
        });
      });

      if (moreFiltersBtn && sidebar) {
        bind(moreFiltersBtn, "click", () => {
          const open = sidebar.classList.toggle("pf-sidebar-open");
          moreFiltersBtn.setAttribute("aria-pressed", String(open));
          if (open) {
            sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }

      if (refreshBtn) {
        bind(refreshBtn, "click", () => {
          refreshBtn.classList.add("is-spinning");
          render();
          setTimeout(() => refreshBtn.classList.remove("is-spinning"), 500);
        });
      }

      if (perPageSelect) {
        bind(perPageSelect, "change", () => {
          const value = perPageSelect.value;
          state.perPage = value === "all" ? "all" : parseInt(value, 10);
          state.page = 1;
          render();
        });
      }

      if (pagePrev) {
        bind(pagePrev, "click", () => {
          if (state.page > 1) {
            state.page -= 1;
            pagination.setPage(state.page);
            render();
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }

      if (pageNext) {
        bind(pageNext, "click", () => {
          state.page += 1;
          pagination.setPage(state.page);
          render();
          grid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }

      if (resetBtn) bind(resetBtn, "click", resetFilters);
      if (clearAllBtn) bind(clearAllBtn, "click", resetFilters);

      quickLinks.forEach((link) => {
        bind(link, "click", (event) => {
          if (link.dataset.quickFilter === "all") {
            event.preventDefault();
            resetFilters();
          }
        });
      });

      render();
      window.Portfolio.TEXTURES.createPageParticles(
        ".projects-hero",
        "floatPP",
        "@keyframes floatPP{0%{transform:translate(0,0);opacity:.5;}100%{transform:translate(10px,-30px);opacity:0;}}",
        14,
      );
    }

    return { init };
  })()));
