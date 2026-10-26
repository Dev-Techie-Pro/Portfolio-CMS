import {
  open as open2
} from "./chunk-4KJHPB7M.js";
import {
  open
} from "./chunk-NGM67PQZ.js";
import "./chunk-HT4C2QOZ.js";
import {
  ICONS,
  decodeIconOverride,
  encodeIconOverride,
  overrideTypeLabel,
  renderIconHtml,
  renderStoredIconMarkup,
  validateIconOverride
} from "./chunk-EM3TMBP5.js";
import {
  renderPaCatCard
} from "./chunk-GIH3II4S.js";
import "./chunk-FRUJZYET.js";
import "./chunk-JWEJ6YLS.js";
import {
  applyListGridClasses,
  closeListRow,
  listActionBtn,
  renderListActionsCell,
  renderListIconProjectCell,
  renderListIndexCell,
  renderListRowStart,
  renderListStatusCell,
  renderListTableShell,
  renderListTextCell,
  syncListPaginationChrome
} from "./chunk-5C5ORR3Y.js";
import {
  closeAllCardMenus,
  toggleCardMenu
} from "./chunk-IZ7T64RP.js";
import {
  effectiveViewMode,
  hydratePageViewMode,
  setPageViewOverride
} from "./chunk-GJQ27CYF.js";
import {
  Module
} from "./chunk-4NBARMWE.js";
import {
  closePanels,
  openPanel,
  registerPanel,
  requestConfirm
} from "./chunk-REUWIW3R.js";
import {
  showStatusToast,
  showToast
} from "./chunk-HWSNCMVP.js";
import {
  $id,
  $input,
  escapeHtml
} from "./chunk-HFEWIT3P.js";
import "./chunk-MTDZJ6X7.js";

// client/modules/icon-registry/IconRegistryManager.ts
var PAGE_SIZE = 12;
var IconRegistryManager = class {
  constructor() {
    this.state = { overrides: {}, removed: [], labels: {}, sortOrder: [] };
    this.items = [];
    this.filtered = [];
    this.sortMode = "label";
    this.search = "";
    this.viewMode = "list";
    this._bound = false;
    this._panelReady = false;
    this._editHandlersBound = false;
    this._editKind = "svg";
    this._editRemix = "ri-palette-line";
    this._editImageUrl = "";
  }
  bindPage(module) {
    if (this._bound || !$id("paIconRegistryGrid")) return;
    this._bound = true;
    this._module = module;
    this.ensureEditPanel();
    module.on($id("paIconRegistrySort"), "change", (e) => {
      this.sortMode = e.target.value || "label";
      module.store.set("page", 1);
      this.renderList();
    });
    module.on($id("paIconRegistrySaveBtn"), "click", () => {
      void this.save();
    });
    module.on($id("paIconRegistryAddBtn"), "click", () => this.openEditor(null));
  }
  setViewMode(mode, syncButtons = true) {
    this.viewMode = mode === "list" ? "list" : "grid";
    if (syncButtons) {
      $id("paListViewBtn")?.classList.toggle("active", this.viewMode === "list");
      $id("paGridViewBtn")?.classList.toggle("active", this.viewMode === "grid");
    }
    this.syncViewToggle();
    this.renderList();
  }
  syncViewToggle() {
    applyListGridClasses($id("paIconRegistryGrid"), this.viewMode === "list");
  }
  ensureEditPanel() {
    if (this._panelReady) return;
    let panel = $id("paIconRegistryEditPanel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "paIconRegistryEditPanel";
      panel.className = "pa-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.innerHTML = `
        <div class="pa-panel-head">
          <span class="pa-panel-title" id="paIconRegistryEditTitle">Edit icon</span>
          <button class="pa-panel-close" type="button" id="paIconRegistryEditClose" aria-label="Close"><i class="ri-close-line"></i></button>
        </div>
        <div class="pa-panel-body">
          <div class="pa-form-group">
            <label class="pa-form-label" for="paIconRegistryEditKey">Registry key</label>
            <input class="pa-form-input" id="paIconRegistryEditKey" placeholder="siMyBrand" />
            <p class="pa-form-hint">Used as <code>data-icon</code> on the public site (e.g. siCloudflare).</p>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="paIconRegistryEditLabel">Display name</label>
            <input class="pa-form-input" id="paIconRegistryEditLabel" placeholder="My Brand" />
          </div>
          <div class="pa-form-group">
            <span class="pa-form-label">Icon source</span>
            <div class="pa-view-toggle pa-icon-registry-source-toggle" role="group" aria-label="Icon source type">
              <button type="button" class="pa-view-btn active" data-icon-source-kind="svg">SVG markup</button>
              <button type="button" class="pa-view-btn" data-icon-source-kind="remix">Remix icon</button>
              <button type="button" class="pa-view-btn" data-icon-source-kind="image">Image</button>
            </div>
          </div>
          <div class="pa-icon-registry-edit-preview" id="paIconRegistryEditPreview" aria-live="polite"></div>
          <div id="paIconRegistrySourceSvg" class="pa-icon-registry-source-panel">
            <div class="pa-form-group">
              <label class="pa-form-label" for="paIconRegistryEditSvg">SVG markup</label>
              <textarea class="pa-form-textarea" id="paIconRegistryEditSvg" rows="10" placeholder="<svg \u2026></svg>"></textarea>
            </div>
          </div>
          <div id="paIconRegistrySourceRemix" class="pa-icon-registry-source-panel" hidden>
            <div class="pa-form-group">
              <label class="pa-form-label">Remix icon class</label>
              <div class="pa-icon-registry-pick-row">
                <code class="pa-icon-registry-pick-value" id="paIconRegistryRemixValue">ri-palette-line</code>
                <button type="button" class="pa-btn pa-btn-secondary" id="paIconRegistryPickRemixBtn"><i class="ri-palette-line"></i> Choose icon</button>
              </div>
              <p class="pa-form-hint">Rendered with Remix Icon on the public site (same as admin UI icons).</p>
            </div>
          </div>
          <div id="paIconRegistrySourceImage" class="pa-icon-registry-source-panel" hidden>
            <div class="pa-form-group">
              <label class="pa-form-label">Image URL</label>
              <div class="pa-icon-registry-pick-row">
                <span class="pa-icon-registry-pick-value pa-icon-registry-image-path" id="paIconRegistryImageValue">No image selected</span>
                <button type="button" class="pa-btn pa-btn-secondary" id="paIconRegistryPickImageBtn"><i class="ri-image-line"></i> Media library</button>
              </div>
              <input class="pa-form-input" type="url" id="paIconRegistryImageUrl" placeholder="https://\u2026 or /path/to/image.png" aria-label="Image URL" />
              <p class="pa-form-hint">PNG, SVG, or WebP from your media library or any public URL.</p>
            </div>
          </div>
        </div>
        <div class="pa-panel-footer">
          <button class="pa-btn pa-btn-cancel" type="button" id="paIconRegistryEditCancel">Cancel</button>
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistryEditSave">Apply</button>
        </div>`;
      document.body.appendChild(panel);
    }
    registerPanel("paIconRegistryEditPanel");
    this._panelReady = true;
    this.bindEditPanelHandlers();
  }
  bindEditPanelHandlers() {
    if (this._editHandlersBound) return;
    this._editHandlersBound = true;
    const panel = $id("paIconRegistryEditPanel");
    panel?.querySelectorAll("[data-icon-source-kind]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setEditSourceKind(btn.getAttribute("data-icon-source-kind"));
      });
    });
    $id("paIconRegistryPickRemixBtn")?.addEventListener("click", () => this.openRemixPicker());
    $id("paIconRegistryPickImageBtn")?.addEventListener("click", () => this.openImagePicker());
    $id("paIconRegistryEditSvg")?.addEventListener("input", () => this.syncEditPreview());
    $id("paIconRegistryImageUrl")?.addEventListener("input", (e) => {
      this._editImageUrl = e.target.value || "";
      const label = $id("paIconRegistryImageValue");
      if (label) label.textContent = this._editImageUrl || "No image selected";
      this.syncEditPreview();
    });
  }
  setEditSourceKind(kind) {
    this._editKind = kind === "remix" || kind === "image" ? kind : "svg";
    $id("paIconRegistryEditPanel")?.querySelectorAll("[data-icon-source-kind]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-icon-source-kind") === this._editKind);
    });
    const svgPanel = $id("paIconRegistrySourceSvg");
    const remixPanel = $id("paIconRegistrySourceRemix");
    const imagePanel = $id("paIconRegistrySourceImage");
    if (svgPanel) svgPanel.hidden = this._editKind !== "svg";
    if (remixPanel) remixPanel.hidden = this._editKind !== "remix";
    if (imagePanel) imagePanel.hidden = this._editKind !== "image";
    this.syncEditPreview();
  }
  syncEditPreview() {
    const box = $id("paIconRegistryEditPreview");
    if (!box) return;
    const markup = renderStoredIconMarkup(this.readEditPayloadRaw());
    box.innerHTML = markup ? `<div class="pa-icon-registry-thumb">${markup}</div>` : '<span class="pa-text-mute">Preview unavailable</span>';
  }
  readEditPayloadRaw() {
    if (this._editKind === "remix") {
      return encodeIconOverride("remix", this._editRemix || "ri-palette-line");
    }
    if (this._editKind === "image") {
      const url = String($id("paIconRegistryImageUrl")?.value || this._editImageUrl || "").trim();
      return encodeIconOverride("image", url);
    }
    return String($id("paIconRegistryEditSvg")?.value || "").trim();
  }
  readEditPayloadForSave() {
    if (this._editKind === "remix") {
      return { kind: "remix", value: this._editRemix || "" };
    }
    if (this._editKind === "image") {
      const url = String($id("paIconRegistryImageUrl")?.value || this._editImageUrl || "").trim();
      return { kind: "image", value: url };
    }
    return { kind: "svg", value: String($id("paIconRegistryEditSvg")?.value || "").trim() };
  }
  populateEditorFromItem(item) {
    const stored = item?.svg || item?.key && ICONS[item.key] || "";
    const { kind, value } = decodeIconOverride(stored);
    this._editKind = kind;
    this._editRemix = kind === "remix" ? value : "ri-palette-line";
    this._editImageUrl = kind === "image" ? value : "";
    const svgDefault = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>';
    if ($id("paIconRegistryEditSvg")) {
      $id("paIconRegistryEditSvg").value = kind === "svg" ? value || svgDefault : ICONS[item?.key] && decodeIconOverride(ICONS[item.key]).kind === "svg" ? decodeIconOverride(ICONS[item.key]).value : svgDefault;
    }
    const remixEl = $id("paIconRegistryRemixValue");
    if (remixEl) remixEl.textContent = this._editRemix;
    const imageLabel = $id("paIconRegistryImageValue");
    if (imageLabel) imageLabel.textContent = this._editImageUrl || "No image selected";
    if ($id("paIconRegistryImageUrl")) $id("paIconRegistryImageUrl").value = this._editImageUrl;
    this.setEditSourceKind(this._editKind);
  }
  openRemixPicker() {
    open2({
      current: this._editRemix || "ri-palette-line",
      defaultIcon: "ri-palette-line",
      returnFocus: $id("paIconRegistryPickRemixBtn"),
      onSelect: (icon) => {
        if (!/^ri-[a-z0-9][a-z0-9-]*$/.test(icon)) {
          showToast("Pick a Remix icon (class starts with ri-).", "danger");
          return;
        }
        this._editRemix = icon;
        const label = $id("paIconRegistryRemixValue");
        if (label) label.textContent = icon;
        this.syncEditPreview();
      }
    });
  }
  openImagePicker() {
    open({
      mode: "featured",
      folder: "icons",
      mediaFilter: "images",
      returnFocus: $id("paIconRegistryPickImageBtn"),
      onSelect: (item) => {
        const url = String(item?.url || "").trim();
        if (!url) return;
        this._editImageUrl = url;
        if ($id("paIconRegistryImageUrl")) $id("paIconRegistryImageUrl").value = url;
        const label = $id("paIconRegistryImageValue");
        if (label) label.textContent = url;
        this.syncEditPreview();
      }
    });
  }
  previewHtml(item) {
    const inner = item.svg ? renderStoredIconMarkup(item.svg) || renderIconHtml(item.key, { className: "pa-svg-icon" }) : renderIconHtml(item.key, { className: "pa-svg-icon" });
    return `<div class="pa-icon-registry-thumb">${inner}</div>`;
  }
  typeLabel(item) {
    if (item.sourceLabel) return item.sourceLabel;
    if (item.isCustom) return overrideTypeLabel(item.svg);
    return "Built-in";
  }
  renderCardMenu(item, index) {
    const key = escapeHtml(item.key);
    return `<div class="pa-card-menu" data-icon-key="${key}">
      <div class="pa-card-menu-item" data-act="up" data-idx="${index}"><i class="ri-arrow-up-line"></i> Move up</div>
      <div class="pa-card-menu-item" data-act="down" data-idx="${index}"><i class="ri-arrow-down-line"></i> Move down</div>
      <div class="pa-card-menu-item" data-act="edit" data-key="${key}"><i class="ri-pencil-line"></i> Edit</div>
      <div class="pa-card-menu-item danger" data-act="delete" data-key="${key}"><i class="ri-eye-off-line"></i> Hide</div>
    </div>`;
  }
  renderGridCard(item, index) {
    const preview = this.previewHtml(item);
    const badge = item.isCustom ? '<span class="pa-cat-card__builtin">Custom</span>' : "";
    return renderPaCatCard({
      idAttr: "data-icon-key",
      id: item.key,
      iconHtml: preview,
      badge,
      title: item.label || item.key,
      slug: item.key,
      desc: item.isCustom ? `Custom \xB7 ${overrideTypeLabel(item.svg)}` : "Built-in portfolio icon",
      countIcon: "ri-brush-line",
      countLabel: this.typeLabel(item),
      status: "Active",
      dateLabel: "Registry key",
      dateValue: item.key,
      menuHtml: this.renderCardMenu(item, index)
    });
  }
  getListTableColumns() {
    return [
      { label: "#", className: "pa-lv-col-num" },
      { label: "Icon", className: "pa-lv-col-project" },
      { label: "Registry key" },
      { label: "Type", className: "pa-lv-col-status" },
      { label: "Actions", className: "pa-lv-col-actions" }
    ];
  }
  renderListRow(item, rowIndex, index) {
    const title = item.label || item.key;
    const preview = this.previewHtml(item);
    const up = `<button type="button" class="pa-lv-action pa-action-btn" data-act="up" data-idx="${index}" title="Move up" aria-label="Move up"><i class="ri-arrow-up-line"></i></button>`;
    const down = `<button type="button" class="pa-lv-action pa-action-btn" data-act="down" data-idx="${index}" title="Move down" aria-label="Move down"><i class="ri-arrow-down-line"></i></button>`;
    const edit = listActionBtn("pa-action-edit", "ri-pencil-line", "Edit", "data-icon-key", item.key, "Edit");
    const hide = listActionBtn("pa-action-delete", "ri-eye-off-line", "Hide", "data-icon-key", item.key, "Hide");
    return `${renderListRowStart()}
    ${renderListIndexCell(rowIndex)}
    ${renderListIconProjectCell(title, preview)}
    ${renderListTextCell(item.key)}
    ${renderListStatusCell(this.typeLabel(item), item.isCustom ? "planning" : "active")}
    ${renderListActionsCell(`${up}${down}${edit}${hide}`)}
  ${closeListRow()}`;
  }
  normalizeThumbs(root) {
    root?.querySelectorAll(".pa-icon-registry-thumb svg").forEach((svg) => {
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      if (!svg.getAttribute("viewBox")) {
        const w = svg.getAttribute("width");
        const h = svg.getAttribute("height");
        if (w && h) svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    });
  }
  attachActionListeners(scope) {
    if (!scope) return;
    scope.querySelectorAll(".pa-action-more").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const host = btn.closest(".pa-cat-card__list-actions, .pa-cat-card__footer-more, .pa-card-actions");
        const menu = host?.querySelector(".pa-card-menu") || btn.parentElement?.querySelector(".pa-card-menu");
        if (menu) toggleCardMenu(menu, btn);
      });
    });
    scope.querySelectorAll("[data-act]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllCardMenus();
        this.onCardAction(btn);
      });
    });
    scope.querySelectorAll(".pa-action-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = btn.getAttribute("data-icon-key");
        if (key) this.openEditor(key);
      });
    });
    scope.querySelectorAll(".pa-action-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = btn.getAttribute("data-icon-key");
        if (key) void this.hideIcon(key);
      });
    });
  }
  async load() {
    const grid = $id("paIconRegistryGrid");
    if (grid) grid.innerHTML = '<div class="pa-bkp-loading"><span class="pa-spinner"></span> Loading icons\u2026</div>';
    try {
      const res = await fetch("/api/admin/icon-registry", { credentials: "same-origin" });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      this.state = data.state || this.state;
      this.items = data.items || [];
      this.syncViewToggle();
      this.renderList();
    } catch {
      if (grid) grid.innerHTML = '<p class="pa-text-mute">Could not load icon registry.</p>';
      showToast("Could not load icon registry.", "danger");
    }
  }
  sortItems(list) {
    const mode = this.sortMode;
    const order = this.state.sortOrder || [];
    const orderMap = new Map(order.map((k, i) => [k, i]));
    return [...list].sort((a, b) => {
      if (mode === "custom") {
        const ai = orderMap.has(a.key) ? orderMap.get(a.key) : 1e9;
        const bi = orderMap.has(b.key) ? orderMap.get(b.key) : 1e9;
        if (ai !== bi) return ai - bi;
      }
      if (mode === "key") return a.key.localeCompare(b.key);
      return (a.label || a.key).localeCompare(b.label || b.key);
    });
  }
  getPageState() {
    const totalItems = this.filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    let page = this._module?.store?.get("page") ?? 1;
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    if (this._module && page !== this._module.store.get("page")) {
      this._module.store.set("page", page);
    }
    const start = (page - 1) * PAGE_SIZE;
    return { page, totalPages, totalItems, start, pageItems: this.filtered.slice(start, start + PAGE_SIZE) };
  }
  renderPagination(totalItems, totalPages, page) {
    const btnsWrap = $id("paIconRegistryPaginationBtns");
    const info = $id("paIconRegistryPaginationInfo");
    const pagRoot = $id("paIconRegistryPagination");
    if (!btnsWrap || !info) return;
    syncListPaginationChrome(this.viewMode === "list" && totalItems > 0, pagRoot);
    if (totalItems === 0) {
      btnsWrap.innerHTML = "";
      info.textContent = "Showing 0 of 0";
      return;
    }
    let html = `<div class="pa-page-nav ${page === 1 ? "disabled" : ""}" id="paIconRegistryPagePrev" role="button" aria-label="Previous page"><i class="ri-arrow-left-s-line"></i></div>`;
    let lastShown = 0;
    for (let p = 1; p <= totalPages; p += 1) {
      const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
      if (!show) continue;
      if (p - lastShown > 1) {
        html += '<span style="color:var(--pa-text-faint); padding:0 4px; font-size:12px;">\u2026</span>';
      }
      html += `<button class="pa-page-btn ${p === page ? "active" : ""}" data-page="${p}">${p}</button>`;
      lastShown = p;
    }
    html += `<div class="pa-page-nav ${page === totalPages ? "disabled" : ""}" id="paIconRegistryPageNext" role="button" aria-label="Next page"><i class="ri-arrow-right-s-line"></i></div>`;
    btnsWrap.innerHTML = html;
    const startN = (page - 1) * PAGE_SIZE + 1;
    const endN = Math.min(page * PAGE_SIZE, totalItems);
    info.textContent = `Showing ${startN} to ${endN} of ${totalItems}`;
    const goPage = (nextPage) => {
      if (!this._module) return;
      this._module.store.set("page", nextPage);
      this.renderList();
      $id("paIconRegistryBody")?.scrollTo({ top: 0, behavior: "smooth" });
    };
    btnsWrap.querySelectorAll(".pa-page-btn").forEach((btn) => {
      btn.addEventListener("click", () => goPage(parseInt(btn.getAttribute("data-page") ?? "", 10)));
    });
    const prevBtn = $id("paIconRegistryPagePrev");
    const nextBtn = $id("paIconRegistryPageNext");
    if (prevBtn && !prevBtn.classList.contains("disabled")) {
      prevBtn.addEventListener("click", () => goPage(page - 1));
    }
    if (nextBtn && !nextBtn.classList.contains("disabled")) {
      nextBtn.addEventListener("click", () => goPage(page + 1));
    }
  }
  renderList() {
    const q = this.search.trim().toLowerCase();
    this.filtered = this.sortItems(
      this.items.filter(
        (item) => !q || item.key.toLowerCase().includes(q) || String(item.label || "").toLowerCase().includes(q)
      )
    );
    const grid = $id("paIconRegistryGrid");
    const count = $id("paIconRegistryCount");
    if (count) count.textContent = `${this.filtered.length} icon${this.filtered.length === 1 ? "" : "s"}`;
    if (!grid) return;
    this.syncViewToggle();
    const { page, totalPages, totalItems, start, pageItems } = this.getPageState();
    if (!this.filtered.length) {
      grid.innerHTML = '<p class="pa-text-mute pa-icon-registry-empty">No icons match your search.</p>';
      this.renderPagination(0, 1, 1);
      return;
    }
    const listMode = this.viewMode === "list";
    if (listMode) {
      const rows = pageItems.map((item, i) => this.renderListRow(item, start + i + 1, start + i)).join("");
      grid.innerHTML = renderListTableShell(this.getListTableColumns(), rows);
    } else {
      grid.innerHTML = pageItems.map((item, i) => this.renderGridCard(item, start + i)).join("");
    }
    this.normalizeThumbs(grid);
    this.attachActionListeners(grid);
    this.renderPagination(totalItems, totalPages, page);
  }
  onCardAction(btn) {
    const act = btn.getAttribute("data-act");
    const key = btn.getAttribute("data-key") || btn.getAttribute("data-icon-key");
    const idx = parseInt(btn.getAttribute("data-idx"), 10);
    if (act === "edit") return this.openEditor(key);
    if (act === "delete") return this.hideIcon(key);
    if (act === "up" || act === "down") return this.moveIcon(idx, act === "up" ? -1 : 1);
  }
  moveIcon(index, delta) {
    const list = this.filtered;
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const order = [...this.state.sortOrder?.length ? this.state.sortOrder : list.map((i) => i.key)];
    const a = list[index].key;
    const b = list[target].key;
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1) order.splice(target, 0, a);
    else if (bi === -1) order.splice(ai, 0, b);
    else {
      order[ai] = b;
      order[bi] = a;
    }
    this.state.sortOrder = order;
    this.sortMode = "custom";
    const sortEl = $id("paIconRegistrySort");
    if (sortEl) sortEl.value = "custom";
    this.renderList();
  }
  async hideIcon(key) {
    if (!key) return;
    const ok = await requestConfirm({
      title: "Hide icon?",
      text: `Remove "${key}" from the public registry (you can restore by re-adding SVG).`,
      confirmLabel: "Hide"
    });
    if (!ok) return;
    this.state.removed = [.../* @__PURE__ */ new Set([...this.state.removed || [], key])];
    delete this.state.overrides?.[key];
    this.items = this.items.filter((i) => i.key !== key);
    this.renderList();
  }
  openEditor(key) {
    this.ensureEditPanel();
    const isNew = !key;
    const item = isNew ? null : this.items.find((i) => i.key === key);
    $id("paIconRegistryEditTitle").textContent = isNew ? "Add icon" : "Edit icon";
    $id("paIconRegistryEditKey").value = item?.key || "";
    $id("paIconRegistryEditKey").disabled = !isNew;
    $id("paIconRegistryEditLabel").value = item?.label || "";
    this.populateEditorFromItem(item);
    const close = () => closePanels();
    const closeBtn = $id("paIconRegistryEditClose");
    const cancelBtn = $id("paIconRegistryEditCancel");
    const saveBtn = $id("paIconRegistryEditSave");
    if (closeBtn) closeBtn.onclick = close;
    if (cancelBtn) cancelBtn.onclick = close;
    if (saveBtn) {
      saveBtn.onclick = () => {
        const k = String($id("paIconRegistryEditKey")?.value || "").trim();
        const label = String($id("paIconRegistryEditLabel")?.value || "").trim();
        const { kind, value } = this.readEditPayloadForSave();
        if (!k || !/^si[A-Za-z0-9]+$/.test(k)) {
          showToast("Key must start with si (e.g. siCloudflare).", "danger");
          return;
        }
        const validationError = validateIconOverride(kind, value);
        if (validationError) {
          showToast(validationError, "danger");
          return;
        }
        const stored = encodeIconOverride(kind, value);
        this.state.overrides = { ...this.state.overrides || {}, [k]: stored };
        if (label) this.state.labels = { ...this.state.labels || {}, [k]: label };
        this.state.removed = (this.state.removed || []).filter((r) => r !== k);
        const existing = this.items.find((i) => i.key === k);
        const row = {
          key: k,
          label: label || k,
          svg: stored,
          sourceKind: kind,
          sourceLabel: overrideTypeLabel(stored),
          isCustom: true,
          isBuiltIn: !!existing?.isBuiltIn
        };
        if (existing) Object.assign(existing, row);
        else this.items.push(row);
        close();
        this.renderList();
      };
    }
    openPanel("paIconRegistryEditPanel");
  }
  async save() {
    showStatusToast("Saving icon registry\u2026", "info", 6e4);
    try {
      const res = await fetch("/api/admin/icon-registry", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: this.state })
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      this.state = data.state || this.state;
      this.items = data.items || this.items;
      showStatusToast("Icon registry saved.", "success");
      this.renderList();
    } catch {
      showToast("Could not save icon registry.", "danger");
    }
  }
};

// client/modules/icon-registry/IconRegistryModule.ts
var IconRegistryModule = class extends Module {
  constructor() {
    super({
      name: "Icon Manager",
      storageKey: "pa_icon_registry_ui",
      initialState: { viewMode: "list", page: 1 }
    });
    this.manager = new IconRegistryManager();
  }
  setViewModeFromStore() {
    const mode = effectiveViewMode(this.store.get("viewMode"));
    this.manager.setViewMode(mode, true);
  }
  async init() {
    await hydratePageViewMode("icon-registry", (mode) => this.store.set("viewMode", mode));
    this.setViewModeFromStore();
    this.manager.bindPage(this);
    await this.manager.load();
    this.bindEvents();
  }
  bindEvents() {
    const gridBtn = $id("paGridViewBtn");
    const listBtn = $id("paListViewBtn");
    if (gridBtn) {
      this.on(gridBtn, "click", () => {
        this.store.set("viewMode", "grid");
        setPageViewOverride("icon-registry", "grid");
        this.manager.setViewMode("grid", true);
      });
    }
    if (listBtn) {
      this.on(listBtn, "click", () => {
        this.store.set("viewMode", "list");
        setPageViewOverride("icon-registry", "list");
        this.manager.setViewMode("list", true);
      });
    }
    const searchInput = $input("paSearchInput");
    if (searchInput) {
      this.on(searchInput, "input", () => {
        this.manager.search = searchInput.value || "";
        this.store.set("page", 1);
        $id("paSearchWrap")?.classList.toggle("has-value", !!searchInput.value);
        this.manager.renderList();
      });
    }
    this.on($id("paSearchClear"), "click", () => {
      if (!searchInput) return;
      searchInput.value = "";
      this.manager.search = "";
      this.store.set("page", 1);
      $id("paSearchWrap")?.classList.remove("has-value");
      this.manager.renderList();
    });
  }
};
export {
  IconRegistryModule
};
//# sourceMappingURL=IconRegistryModule-GCZML5E2.js.map
