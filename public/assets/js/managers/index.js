"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.SHARED_FILTERS = (function () {
    const { debounce: debounceFn, on: bind } = window.Portfolio.UTILS;

    class SearchManager {
      constructor(options = {}) {
        this.query = "";
        this.debounceMs = options.debounceMs || 200;
        this.onSearch = options.onSearch || (() => {});
        this._input = null;
        this._handler = null;
        this.getSearchableText =
          options.getSearchableText ||
          ((item) => (item.textContent || "").toLowerCase());
      }

      setQuery(query) {
        this.query = (query || "").trim().toLowerCase();
        return this;
      }

      getQuery() {
        return this.query;
      }

      matches(item) {
        if (!this.query) return true;
        return this.getSearchableText(item).includes(this.query);
      }

      filter(items) {
        if (!this.query) return items.slice();
        return items.filter((item) => this.matches(item));
      }

      bindInput(inputEl, options = {}) {
        if (!inputEl) return this;
        this._input = inputEl;
        const resetPage = options.resetPage;
        this._handler = debounceFn(() => {
          this.setQuery(inputEl.value);
          if (typeof resetPage === "function") resetPage();
          this.onSearch(this.query);
        }, this.debounceMs);
        bind(inputEl, "input", this._handler);

        if (options.ctrlK) {
          bind(document, "keydown", (event) => {
            if (
              (event.ctrlKey || event.metaKey) &&
              event.key.toLowerCase() === "k"
            ) {
              event.preventDefault();
              inputEl.focus();
            }
          });
        }
        return this;
      }

      clear() {
        this.query = "";
        if (this._input) this._input.value = "";
        return this;
      }
    }

    class FilterManager {
      constructor(options = {}) {
        this.filters = options.initial || {};
        this.onFilter = options.onFilter || (() => {});
        this.predicate =
          options.predicate ||
          ((item, filters) => {
            const category = filters.category || "all";
            if (category === "all") return true;
            const itemCat = item.dataset?.category || "";
            return itemCat === category;
          });
      }

      set(key, value) {
        this.filters[key] = value;
        return this;
      }

      get(key) {
        return this.filters[key];
      }

      reset(partial) {
        this.filters = { ...(partial || { category: "all" }) };
        return this;
      }

      apply(items) {
        return items.filter((item) => this.predicate(item, this.filters));
      }

      bindOptions(options, config) {
        const { key, onSelect, getValue } = config;
        options.forEach((option) => {
          bind(option, "click", () => {
            const value = getValue ? getValue(option) : option.dataset.value;
            this.set(key, value || "all");
            if (typeof onSelect === "function") onSelect(value, option);
            this.onFilter(this.filters);
          });
        });
        return this;
      }

      bindSelect(selectEl, key, onChange) {
        if (!selectEl) return this;
        bind(selectEl, "change", () => {
          this.set(key, selectEl.value);
          if (typeof onChange === "function") onChange(selectEl.value);
          this.onFilter(this.filters);
        });
        return this;
      }
    }

    class SortManager {
      constructor(options = {}) {
        this.sortKey = options.initial || "latest";
        this.onSort = options.onSort || (() => {});
        this.strategies = {
          latest: (a, b) =>
            (b.dataset?.date || "").localeCompare(a.dataset?.date || ""),
          oldest: (a, b) =>
            (a.dataset?.date || "").localeCompare(b.dataset?.date || ""),
          "name-asc": (a, b) =>
            (a.dataset?.title || a.dataset?.name || "").localeCompare(
              b.dataset?.title || b.dataset?.name || "",
            ),
          "name-desc": (a, b) =>
            (b.dataset?.title || b.dataset?.name || "").localeCompare(
              a.dataset?.title || a.dataset?.name || "",
            ),
          "title-asc": (a, b) =>
            (a.dataset?.title || "").localeCompare(b.dataset?.title || ""),
          newest: (a, b) =>
            (b.dataset?.date || b.dataset?.order || "").localeCompare(
              a.dataset?.date || a.dataset?.order || "",
            ),
          "rating-high": (a, b) =>
            parseInt(b.dataset?.rating || "0", 10) -
            parseInt(a.dataset?.rating || "0", 10),
          "name-az": (a, b) =>
            (a.dataset?.client || a.dataset?.title || "").localeCompare(
              b.dataset?.client || b.dataset?.title || "",
            ),
          ...(options.strategies || {}),
        };
      }

      setSort(key) {
        this.sortKey = key;
        return this;
      }

      sort(items) {
        const strategy = this.strategies[this.sortKey];
        if (!strategy) return items.slice();
        return items.slice().sort(strategy);
      }

      bindSelect(selectEl, onChange) {
        if (!selectEl) return this;
        bind(selectEl, "change", () => {
          this.setSort(selectEl.value);
          if (typeof onChange === "function") onChange(this.sortKey);
          this.onSort(this.sortKey);
        });
        return this;
      }
    }

    class PaginationManager {
      constructor(options = {}) {
        this.page = 1;
        this.perPage = options.perPage || 12;
        this.onPageChange = options.onPageChange || (() => {});
        this.renderMode = options.renderMode || "numbered";
        this.maxVisible = options.maxVisible || 5;
      }

      setPage(page) {
        this.page = Math.max(1, page);
        return this;
      }

      setPerPage(perPage) {
        this.perPage = perPage === "all" ? Infinity : perPage;
        return this;
      }

      getTotalPages(totalItems) {
        if (!Number.isFinite(this.perPage)) return 1;
        return Math.max(1, Math.ceil(totalItems / this.perPage));
      }

      clampPage(totalItems) {
        const totalPages = this.getTotalPages(totalItems);
        if (this.page > totalPages) this.page = totalPages;
        if (this.page < 1) this.page = 1;
        return this;
      }

      slice(items) {
        const totalPages = this.getTotalPages(items.length);
        this.clampPage(items.length);
        if (!Number.isFinite(this.perPage)) return items.slice();
        const start = (this.page - 1) * this.perPage;
        return items.slice(start, start + this.perPage);
      }

      renderControls(container, totalItems, config = {}) {
        if (!container) return;
        const totalPages = this.getTotalPages(totalItems);
        const prevBtn = config.prevBtn;
        const nextBtn = config.nextBtn;
        const pageLabel = config.pageLabel;
        const onNavigate =
          config.onNavigate ||
          (() => {
            this.onPageChange(this.page);
          });

        if (this.renderMode === "simple") {
          if (pageLabel) {
            pageLabel.textContent = `${this.page} / ${totalPages}`;
          }
          if (prevBtn) prevBtn.disabled = this.page <= 1;
          if (nextBtn) nextBtn.disabled = this.page >= totalPages;
          return;
        }

        if (this.renderMode === "blog-recent") {
          container.innerHTML = "";
          const prev = document.createElement("button");
          prev.type = "button";
          prev.className = "blog-page-btn";
          prev.textContent = "Previous";
          prev.disabled = this.page <= 1;
          prev.addEventListener("click", () => {
            this.page -= 1;
            onNavigate();
          });
          container.appendChild(prev);

          for (let p = 1; p <= totalPages; p += 1) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `blog-page-btn${p === this.page ? " is-active" : ""}`;
            btn.textContent = String(p);
            btn.addEventListener("click", () => {
              this.page = p;
              onNavigate();
            });
            container.appendChild(btn);
          }

          const next = document.createElement("button");
          next.type = "button";
          next.className = "blog-page-btn";
          next.textContent = "Next";
          next.disabled = this.page >= totalPages;
          next.addEventListener("click", () => {
            this.page += 1;
            onNavigate();
          });
          container.appendChild(next);
          return;
        }

        const existing = container.querySelectorAll(".pg-page-num");
        existing.forEach((el) => el.remove());

        let start = Math.max(1, this.page - Math.floor(this.maxVisible / 2));
        let end = Math.min(totalPages, start + this.maxVisible - 1);
        start = Math.max(1, end - this.maxVisible + 1);

        const fragment = document.createDocumentFragment();
        for (let p = start; p <= end; p += 1) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `pg-page-num${p === this.page ? " active" : ""}`;
          btn.dataset.page = String(p);
          btn.textContent = String(p);
          if (p === this.page) btn.setAttribute("aria-current", "page");
          btn.addEventListener("click", () => {
            this.page = p;
            onNavigate();
          });
          fragment.appendChild(btn);
        }

        if (nextBtn) {
          container.insertBefore(fragment, nextBtn);
          prevBtn && (prevBtn.disabled = this.page <= 1);
          nextBtn.disabled = this.page >= totalPages;
        } else {
          container.appendChild(fragment);
        }
      }
    }

    class ViewToggleManager {
      constructor(options = {}) {
        this.view = options.initial || "grid";
        this.gridEl = options.gridEl || null;
        this.buttons = options.buttons || [];
        this.classMap = options.classMap || {
          list: "pg-grid--list",
          masonry: "pg-grid--masonry",
        };
        this.onChange = options.onChange || (() => {});
      }

      setView(view) {
        this.view = view;
        if (this.gridEl) {
          Object.values(this.classMap).forEach((cls) => {
            this.gridEl.classList.remove(cls);
          });
          const cls = this.classMap[view];
          if (cls) this.gridEl.classList.add(cls);
        }
        this.buttons.forEach((btn) => {
          const isActive = btn.dataset.view === view;
          btn.classList.toggle("active", isActive);
          btn.setAttribute("aria-pressed", String(isActive));
        });
        this.onChange(view);
        return this;
      }

      bindButtons() {
        this.buttons.forEach((btn) => {
          bind(btn, "click", () => {
            const view = btn.dataset.view;
            if (view) this.setView(view);
          });
        });
        return this;
      }
    }

    class DropdownManager {
      constructor(options = {}) {
        this.dropdowns = options.dropdowns || [];
        this.onSelect = options.onSelect || (() => {});
        this.keyMap = options.keyMap || {};
      }

      closeAll(except) {
        this.dropdowns.forEach((dropdown) => {
          if (dropdown === except) return;
          dropdown.classList.remove("open");
          const btn = dropdown.querySelector(".pf-dropdown-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
      }

      bind() {
        this.dropdowns.forEach((dropdown) => {
          const type = dropdown.dataset.dropdown;
          const btn = dropdown.querySelector(".pf-dropdown-btn");
          const menu = dropdown.querySelector(".pf-dropdown-menu");
          const label = dropdown.querySelector(".pf-dropdown-label");
          if (!btn || !menu) return;

          bind(btn, "click", (event) => {
            event.stopPropagation();
            const isOpen = dropdown.classList.contains("open");
            this.closeAll();
            dropdown.classList.toggle("open", !isOpen);
            btn.setAttribute("aria-expanded", String(!isOpen));
          });

          menu.querySelectorAll('li[role="option"]').forEach((option) => {
            bind(option, "click", () => {
              const value = option.dataset.value;
              if (label) label.textContent = option.textContent;
              menu.querySelectorAll('li[role="option"]').forEach((el) => {
                el.setAttribute(
                  "aria-selected",
                  el === option ? "true" : "false",
                );
              });
              dropdown.classList.remove("open");
              btn.setAttribute("aria-expanded", "false");
              this.onSelect(type, value, option);
            });
          });
        });

        bind(document, "click", () => this.closeAll());
        bind(document, "keydown", (event) => {
          if (event.key === "Escape") this.closeAll();
        });
        return this;
      }
    }

    class NewsletterManager {
      constructor(formId, message) {
        this.formId = formId;
        this.message = message || "Thanks for subscribing!";
      }

      init() {
        const form = document.getElementById(this.formId);
        if (!form) return this;
        bind(form, "submit", (event) => {
          event.preventDefault();
          const input = form.querySelector("input[type='Email']");
          if (!input || !input.value.trim()) {
            input?.focus();
            return;
          }
          input.value = "";
          if (window.Portfolio.CUSTOMIZE?.toast) {
            window.Portfolio.CUSTOMIZE.toast(this.message);
          } else if (window.Portfolio.UTILS?.toast) {
            window.Portfolio.UTILS.toast(this.message);
          } else {
            alert(this.message);
          }
        });
        return this;
      }
    }

    return {
      SearchManager,
      FilterManager,
      SortManager,
      PaginationManager,
      ViewToggleManager,
      DropdownManager,
      NewsletterManager,
    };
  })()));
