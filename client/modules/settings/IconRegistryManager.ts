// @ts-nocheck
import { $id, escapeHtml } from '../../utils/dom.js';
import { showToast, showStatusToast } from '../shell/toast.js';
import { requestConfirm } from '../shell/confirm.js';
import { renderIconHtml } from '../../utils/icon-utils.js';

export class IconRegistryManager {
  constructor() {
    this.state = { overrides: {}, removed: [], labels: {}, sortOrder: [] };
    this.items = [];
    this.filtered = [];
    this.sortMode = 'label';
    this.search = '';
    this._bound = false;
  }

  mount() {
    const root = $id('paIconRegistryRoot');
    if (!root || this._bound) return;
    this._bound = true;
    root.innerHTML = this.shellHtml();
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
    this.load();
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
      <div class="pa-toolbar mb-16">
        <input class="pa-form-input" type="search" id="paIconRegistrySearch" placeholder="Search by label or key…" style="max-width:320px" />
        <select class="pa-filter-select" id="paIconRegistrySort" aria-label="Sort icons">
          <option value="label">Sort: Label A–Z</option>
          <option value="key">Sort: Key A–Z</option>
          <option value="custom">Sort: Custom order</option>
        </select>
        <div class="pa-toolbar-spacer"></div>
        <span class="pa-result-count" id="paIconRegistryCount"></span>
      </div>
      <div class="pa-grid pa-cat-grid" id="paIconRegistryGrid" aria-live="polite"></div>
      <div class="pa-panel" id="paIconRegistryEditPanel" role="dialog" aria-modal="true" hidden>
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
            <textarea class="pa-form-textarea" id="paIconRegistryEditSvg" rows="10" placeholder="<svg …></svg>"></textarea>
          </div>
        </div>
        <div class="pa-panel-footer">
          <button class="pa-btn pa-btn-cancel" type="button" id="paIconRegistryEditCancel">Cancel</button>
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistryEditSave">Apply</button>
        </div>
      </div>`;
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
    if (!this.filtered.length) {
      grid.innerHTML = '<p class="pa-text-mute">No icons match your search.</p>';
      return;
    }
    grid.innerHTML = this.filtered
      .map((item, index) => {
        const preview = item.svg
          ? `<span class="pa-icon-registry-preview">${item.svg}</span>`
          : renderIconHtml(item.key, { className: 'icon' });
        return `<article class="pa-cat-card" data-icon-key="${escapeHtml(item.key)}">
          <div class="pa-cat-card-top">
            <span class="pa-cat-card-icon" aria-hidden="true">${preview}</span>
            <div class="pa-cat-card-text">
              <h3 class="pa-cat-card-title">${escapeHtml(item.label || item.key)}</h3>
              <p class="pa-cat-card-meta"><code>${escapeHtml(item.key)}</code>${item.isCustom ? ' · customized' : ''}</p>
            </div>
          </div>
          <div class="pa-cat-card-actions">
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="up" data-idx="${index}" title="Move up"><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="down" data-idx="${index}" title="Move down"><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm" data-act="edit" data-key="${escapeHtml(item.key)}">Edit</button>
            <button type="button" class="pa-btn pa-btn-danger pa-btn-sm" data-act="delete" data-key="${escapeHtml(item.key)}">Hide</button>
          </div>
        </article>`;
      })
      .join('');
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
    const panel = $id('paIconRegistryEditPanel');
    if (!panel) return;
    const isNew = !key;
    const item = isNew ? null : this.items.find((i) => i.key === key);
    $id('paIconRegistryEditTitle').textContent = isNew ? 'Add icon' : 'Edit icon';
    $id('paIconRegistryEditKey').value = item?.key || '';
    $id('paIconRegistryEditKey').disabled = !isNew;
    $id('paIconRegistryEditLabel').value = item?.label || '';
    $id('paIconRegistryEditSvg').value = item?.svg || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>';
    panel.hidden = false;
    const close = () => {
      panel.hidden = true;
    };
    const closeBtn = $id('paIconRegistryEditClose');
    const cancelBtn = $id('paIconRegistryEditCancel');
    const saveBtn = $id('paIconRegistryEditSave');
    if (closeBtn) closeBtn.onclick = close;
    if (cancelBtn) cancelBtn.onclick = close;
    if (saveBtn) saveBtn.onclick = () => {
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
