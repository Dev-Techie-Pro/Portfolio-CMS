// @ts-nocheck
import { $id, escapeHtml } from '../../utils/dom.js';
import { showToast, showStatusToast } from '../shell/toast.js';
import { requestConfirm } from '../shell/confirm.js';
import { closePanels, openPanel, registerPanel } from '../shell/panels.js';
import { renderIconHtml } from '../../utils/icon-utils.js';

const VIEW_LS_KEY = 'pa_icon_registry_view';

export class IconRegistryManager {
  constructor() {
    this.state = { overrides: {}, removed: [], labels: {}, sortOrder: [] };
    this.items = [];
    this.filtered = [];
    this.sortMode = 'label';
    this.search = '';
    this.viewMode = this.readViewMode();
    this._bound = false;
    this._panelReady = false;
  }

  readViewMode() {
    try {
      const v = localStorage.getItem(VIEW_LS_KEY);
      return v === 'list' ? 'list' : 'grid';
    } catch {
      return 'grid';
    }
  }

  persistViewMode() {
    try {
      localStorage.setItem(VIEW_LS_KEY, this.viewMode);
    } catch {
      /* ignore */
    }
  }

  mount() {
    const root = $id('paIconRegistryRoot');
    if (!root || this._bound) return;
    this._bound = true;
    root.innerHTML = this.shellHtml();
    this.ensureEditPanel();
    $id('paIconRegistrySearch')?.addEventListener('input', (e) => {
      this.search = e.target.value || '';
      this.renderList();
    });
    $id('paIconRegistrySort')?.addEventListener('change', (e) => {
      this.sortMode = e.target.value || 'label';
      this.renderList();
    });
    $id('paIconRegistrySaveBtn')?.addEventListener('click', () => this.save());
    $id('paIconRegistryAddBtn')?.addEventListener('click', () => this.openEditor(null));
    $id('paIconRegistryListViewBtn')?.addEventListener('click', () => this.setViewMode('list'));
    $id('paIconRegistryGridViewBtn')?.addEventListener('click', () => this.setViewMode('grid'));
    this.syncViewToggle();
    this.load();
  }

  setViewMode(mode) {
    this.viewMode = mode === 'list' ? 'list' : 'grid';
    this.persistViewMode();
    this.syncViewToggle();
    this.renderList();
  }

  syncViewToggle() {
    const listBtn = $id('paIconRegistryListViewBtn');
    const gridBtn = $id('paIconRegistryGridViewBtn');
    listBtn?.classList.toggle('active', this.viewMode === 'list');
    gridBtn?.classList.toggle('active', this.viewMode === 'grid');
    const grid = $id('paIconRegistryGrid');
    if (grid) {
      grid.classList.toggle('list-view', this.viewMode === 'list');
      grid.classList.toggle('pa-grid', this.viewMode === 'grid');
    }
  }

  ensureEditPanel() {
    if (this._panelReady) return;
    let panel = $id('paIconRegistryEditPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'paIconRegistryEditPanel';
      panel.className = 'pa-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.innerHTML = `
        <div class="pa-panel-head">
          <span class="pa-panel-title" id="paIconRegistryEditTitle">Edit icon</span>
          <button class="pa-panel-close" type="button" id="paIconRegistryEditClose" aria-label="Close"><i class="ri-close-line"></i></button>
        </div>
        <div class="pa-panel-body">
          <div class="pa-form-group">
            <label class="pa-form-label" for="paIconRegistryEditKey">Registry key</label>
            <input class="pa-form-input" id="paIconRegistryEditKey" placeholder="siMyBrand" />
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="paIconRegistryEditLabel">Display name</label>
            <input class="pa-form-input" id="paIconRegistryEditLabel" placeholder="My Brand" />
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="paIconRegistryEditSvg">SVG markup</label>
            <textarea class="pa-form-textarea" id="paIconRegistryEditSvg" rows="12" placeholder="<svg …></svg>"></textarea>
          </div>
        </div>
        <div class="pa-panel-footer">
          <button class="pa-btn pa-btn-cancel" type="button" id="paIconRegistryEditCancel">Cancel</button>
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistryEditSave">Apply</button>
        </div>`;
      document.body.appendChild(panel);
    }
    registerPanel('paIconRegistryEditPanel');
    this._panelReady = true;
  }

  shellHtml() {
    return `
      <div class="pa-bkp-header pa-bkp-layout-head mb-16">
        <div class="pa-bkp-header-copy">
          <div class="pa-bkp-header-icon" aria-hidden="true"><i class="ri-palette-line"></i></div>
          <div>
            <h2 class="pa-bkp-title">Portfolio icon registry</h2>
            <p class="pa-bkp-subtitle">Search, rename, edit SVG markup, reorder, add, or hide built-in portfolio icons. Changes apply on the public site after save.</p>
          </div>
        </div>
        <div class="pa-bkp-header-actions">
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistrySaveBtn"><i class="ri-save-line"></i> Save</button>
          <button class="pa-btn pa-btn-secondary" type="button" id="paIconRegistryAddBtn"><i class="ri-add-line"></i> Add icon</button>
        </div>
      </div>
      <div class="pa-toolbar pa-cat-toolbar mb-16">
        <div class="pa-view-toggle pa-cat-view-toggle" role="group" aria-label="View mode">
          <button class="pa-view-btn active" type="button" id="paIconRegistryGridViewBtn" title="Grid view" aria-label="Grid view"><i class="ri-layout-grid-fill"></i></button>
          <button class="pa-view-btn" type="button" id="paIconRegistryListViewBtn" title="List view" aria-label="List view"><i class="ri-list-unordered"></i></button>
        </div>
        <div class="pa-search pa-icon-registry-search">
          <i class="ri-search-line" aria-hidden="true"></i>
          <input type="search" id="paIconRegistrySearch" placeholder="Search by label or key…" aria-label="Search icons" autocomplete="off" />
        </div>
        <select class="pa-filter-select" id="paIconRegistrySort" aria-label="Sort icons">
          <option value="label">Sort: Label A–Z</option>
          <option value="key">Sort: Key A–Z</option>
          <option value="custom">Sort: Custom order</option>
        </select>
        <div class="pa-toolbar-spacer"></div>
        <span class="pa-result-count" id="paIconRegistryCount"></span>
      </div>
      <div class="pa-icon-registry-grid pa-grid" id="paIconRegistryGrid" aria-live="polite"></div>`;
  }

  previewHtml(item) {
    const inner = item.svg
      ? item.svg
      : renderIconHtml(item.key, { className: 'pa-svg-icon' });
    return `<div class="pa-icon-registry-thumb">${inner}</div>`;
  }

  normalizeThumbs(root) {
    root?.querySelectorAll('.pa-icon-registry-thumb svg').forEach((svg) => {
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      if (!svg.getAttribute('viewBox')) {
        const w = svg.getAttribute('width');
        const h = svg.getAttribute('height');
        if (w && h) svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      }
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    });
  }

  async load() {
    const grid = $id('paIconRegistryGrid');
    if (grid) grid.innerHTML = '<div class="pa-bkp-loading"><span class="pa-spinner"></span> Loading icons…</div>';
    try {
      const res = await fetch('/api/admin/icon-registry', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      this.state = data.state || this.state;
      this.items = data.items || [];
      this.syncViewToggle();
      this.renderList();
    } catch {
      if (grid) grid.innerHTML = '<p class="pa-text-mute">Could not load icon registry.</p>';
      showToast('Could not load icon registry.', 'danger');
    }
  }

  sortItems(list) {
    const mode = this.sortMode;
    const order = this.state.sortOrder || [];
    const orderMap = new Map(order.map((k, i) => [k, i]));
    return [...list].sort((a, b) => {
      if (mode === 'custom') {
        const ai = orderMap.has(a.key) ? orderMap.get(a.key) : 1e9;
        const bi = orderMap.has(b.key) ? orderMap.get(b.key) : 1e9;
        if (ai !== bi) return ai - bi;
      }
      if (mode === 'key') return a.key.localeCompare(b.key);
      return (a.label || a.key).localeCompare(b.label || b.key);
    });
  }

  renderList() {
    const q = this.search.trim().toLowerCase();
    this.filtered = this.sortItems(
      this.items.filter(
        (item) =>
          !q ||
          item.key.toLowerCase().includes(q) ||
          String(item.label || '').toLowerCase().includes(q),
      ),
    );
    const grid = $id('paIconRegistryGrid');
    const count = $id('paIconRegistryCount');
    if (count) count.textContent = `${this.filtered.length} icon${this.filtered.length === 1 ? '' : 's'}`;
    if (!grid) return;
    this.syncViewToggle();
    if (!this.filtered.length) {
      grid.innerHTML = '<p class="pa-text-mute pa-icon-registry-empty">No icons match your search.</p>';
      return;
    }
    const listMode = this.viewMode === 'list';
    grid.innerHTML = this.filtered
      .map((item, index) => {
        const preview = this.previewHtml(item);
        const badge = item.isCustom ? '<span class="pa-tag pa-icon-registry-tag">Custom</span>' : '';
        if (listMode) {
          return `<article class="pa-icon-registry-card pa-icon-registry-card--list" data-icon-key="${escapeHtml(item.key)}">
            ${preview}
            <div class="pa-icon-registry-card__main">
              <div class="pa-icon-registry-card__title-row">
                <h3 class="pa-icon-registry-card__title">${escapeHtml(item.label || item.key)}</h3>
                ${badge}
              </div>
              <p class="pa-icon-registry-card__key"><code>${escapeHtml(item.key)}</code></p>
            </div>
            <div class="pa-icon-registry-card__actions">
              <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="up" data-idx="${index}" title="Move up"><i class="ri-arrow-up-line"></i></button>
              <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="down" data-idx="${index}" title="Move down"><i class="ri-arrow-down-line"></i></button>
              <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="edit" data-key="${escapeHtml(item.key)}">Edit</button>
              <button type="button" class="pa-btn pa-btn-danger pa-btn-sm" data-act="delete" data-key="${escapeHtml(item.key)}">Hide</button>
            </div>
          </article>`;
        }
        return `<article class="pa-icon-registry-card" data-icon-key="${escapeHtml(item.key)}">
          <div class="pa-icon-registry-card__preview-wrap">${preview}</div>
          <div class="pa-icon-registry-card__body">
            <div class="pa-icon-registry-card__title-row">
              <h3 class="pa-icon-registry-card__title">${escapeHtml(item.label || item.key)}</h3>
              ${badge}
            </div>
            <p class="pa-icon-registry-card__key"><code>${escapeHtml(item.key)}</code></p>
          </div>
          <div class="pa-icon-registry-card__actions pa-icon-registry-card__actions--grid">
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="up" data-idx="${index}" title="Move up"><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="down" data-idx="${index}" title="Move down"><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="edit" data-key="${escapeHtml(item.key)}">Edit</button>
            <button type="button" class="pa-btn pa-btn-danger pa-btn-sm" data-act="delete" data-key="${escapeHtml(item.key)}">Hide</button>
          </div>
        </article>`;
      })
      .join('');
    this.normalizeThumbs(grid);
    grid.querySelectorAll('button[data-act]').forEach((btn) => {
      btn.addEventListener('click', () => this.onCardAction(btn));
    });
  }

  onCardAction(btn) {
    const act = btn.getAttribute('data-act');
    const key = btn.getAttribute('data-key');
    const idx = parseInt(btn.getAttribute('data-idx'), 10);
    if (act === 'edit') return this.openEditor(key);
    if (act === 'delete') return this.hideIcon(key);
    if (act === 'up' || act === 'down') return this.moveIcon(idx, act === 'up' ? -1 : 1);
  }

  moveIcon(index, delta) {
    const list = this.filtered;
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const order = [...(this.state.sortOrder?.length ? this.state.sortOrder : list.map((i) => i.key))];
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
    this.sortMode = 'custom';
    const sortEl = $id('paIconRegistrySort');
    if (sortEl) sortEl.value = 'custom';
    this.renderList();
  }

  async hideIcon(key) {
    if (!key) return;
    const ok = await requestConfirm({
      title: 'Hide icon?',
      text: `Remove "${key}" from the public registry (you can restore by re-adding SVG).`,
      confirmLabel: 'Hide',
    });
    if (!ok) return;
    this.state.removed = [...new Set([...(this.state.removed || []), key])];
    delete this.state.overrides?.[key];
    this.items = this.items.filter((i) => i.key !== key);
    this.renderList();
  }

  openEditor(key) {
    this.ensureEditPanel();
    const isNew = !key;
    const item = isNew ? null : this.items.find((i) => i.key === key);
    $id('paIconRegistryEditTitle').textContent = isNew ? 'Add icon' : 'Edit icon';
    $id('paIconRegistryEditKey').value = item?.key || '';
    $id('paIconRegistryEditKey').disabled = !isNew;
    $id('paIconRegistryEditLabel').value = item?.label || '';
    $id('paIconRegistryEditSvg').value =
      item?.svg || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>';

    const close = () => closePanels();
    const closeBtn = $id('paIconRegistryEditClose');
    const cancelBtn = $id('paIconRegistryEditCancel');
    const saveBtn = $id('paIconRegistryEditSave');
    if (closeBtn) closeBtn.onclick = close;
    if (cancelBtn) cancelBtn.onclick = close;
    if (saveBtn) {
      saveBtn.onclick = () => {
        const k = String($id('paIconRegistryEditKey')?.value || '').trim();
        const label = String($id('paIconRegistryEditLabel')?.value || '').trim();
        const svg = String($id('paIconRegistryEditSvg')?.value || '').trim();
        if (!k || !/^si[A-Za-z0-9]+$/.test(k)) {
          showToast('Key must start with si (e.g. siCloudflare).', 'danger');
          return;
        }
        if (!/^\s*<svg[\s\S]*<\/svg>\s*$/i.test(svg)) {
          showToast('SVG must be a single <svg>…</svg> element.', 'danger');
          return;
        }
        this.state.overrides = { ...(this.state.overrides || {}), [k]: svg };
        if (label) this.state.labels = { ...(this.state.labels || {}), [k]: label };
        this.state.removed = (this.state.removed || []).filter((r) => r !== k);
        const existing = this.items.find((i) => i.key === k);
        const row = {
          key: k,
          label: label || k,
          svg,
          isCustom: true,
          isBuiltIn: !!existing?.isBuiltIn,
        };
        if (existing) Object.assign(existing, row);
        else this.items.push(row);
        close();
        this.renderList();
      };
    }
    openPanel('paIconRegistryEditPanel');
  }

  async save() {
    showStatusToast('Saving icon registry…', 'info', 60000);
    try {
      const res = await fetch('/api/admin/icon-registry', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: this.state }),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      this.state = data.state || this.state;
      this.items = data.items || this.items;
      showStatusToast('Icon registry saved.', 'success');
      this.renderList();
    } catch {
      showToast('Could not save icon registry.', 'danger');
    }
  }
}
