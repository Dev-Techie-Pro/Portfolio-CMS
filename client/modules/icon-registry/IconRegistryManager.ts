// @ts-nocheck
import { $id, escapeHtml } from '../../utils/dom.js';
import { showToast, showStatusToast } from '../shell/toast.js';
import { requestConfirm } from '../shell/confirm.js';
import { closePanels, openPanel, registerPanel } from '../shell/panels.js';
import { renderIconHtml } from '../../utils/icon-utils.js';
import { renderPaCatCard } from '../../utils/paCatCard.js';
import { closeAllCardMenus, toggleCardMenu } from '../shell/cardMenu.js';
import {
  applyListGridClasses,
  closeListRow,
  listActionBtn,
  renderListActionsCell,
  renderListIconProjectCell,
  renderListIndexCell,
  renderListRowStart,
  renderListTableShell,
  renderListTextCell,
  renderListStatusCell,
  syncListPaginationChrome,
} from '../../utils/listDataTable.js';

const PAGE_SIZE = 12;

export class IconRegistryManager {
  constructor() {
    this.state = { overrides: {}, removed: [], labels: {}, sortOrder: [] };
    this.items = [];
    this.filtered = [];
    this.sortMode = 'label';
    this.search = '';
    this.viewMode = 'list';
    this._bound = false;
    this._panelReady = false;
  }

  bindPage(module) {
    if (this._bound || !$id('paIconRegistryGrid')) return;
    this._bound = true;
    this._module = module;
    this.ensureEditPanel();
    module.on($id('paIconRegistrySort'), 'change', (e) => {
      this.sortMode = e.target.value || 'label';
      module.store.set('page', 1);
      this.renderList();
    });
    module.on($id('paIconRegistrySaveBtn'), 'click', () => { void this.save(); });
    module.on($id('paIconRegistryAddBtn'), 'click', () => this.openEditor(null));
  }

  setViewMode(mode, syncButtons = true) {
    this.viewMode = mode === 'list' ? 'list' : 'grid';
    if (syncButtons) {
      $id('paListViewBtn')?.classList.toggle('active', this.viewMode === 'list');
      $id('paGridViewBtn')?.classList.toggle('active', this.viewMode === 'grid');
    }
    this.syncViewToggle();
    this.renderList();
  }

  syncViewToggle() {
    applyListGridClasses($id('paIconRegistryGrid'), this.viewMode === 'list');
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

  previewHtml(item) {
    const inner = item.svg
      ? item.svg
      : renderIconHtml(item.key, { className: 'pa-svg-icon' });
    return `<div class="pa-icon-registry-thumb">${inner}</div>`;
  }

  typeLabel(item) {
    return item.isCustom ? 'Custom' : 'Built-in';
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
    const badge = item.isCustom ? '<span class="pa-cat-card__builtin">Custom</span>' : '';
    return renderPaCatCard({
      idAttr: 'data-icon-key',
      id: item.key,
      iconHtml: preview,
      badge,
      title: item.label || item.key,
      slug: item.key,
      desc: item.isCustom ? 'Custom SVG override' : 'Built-in portfolio icon',
      countIcon: 'ri-brush-line',
      countLabel: this.typeLabel(item),
      status: 'Active',
      dateLabel: 'Registry key',
      dateValue: item.key,
      menuHtml: this.renderCardMenu(item, index),
    });
  }

  getListTableColumns() {
    return [
      { label: '#', className: 'pa-lv-col-num' },
      { label: 'Icon', className: 'pa-lv-col-project' },
      { label: 'Registry key' },
      { label: 'Type', className: 'pa-lv-col-status' },
      { label: 'Actions', className: 'pa-lv-col-actions' },
    ];
  }

  renderListRow(item, rowIndex, index) {
    const title = item.label || item.key;
    const preview = this.previewHtml(item);
    const up = `<button type="button" class="pa-lv-action pa-action-btn" data-act="up" data-idx="${index}" title="Move up" aria-label="Move up"><i class="ri-arrow-up-line"></i></button>`;
    const down = `<button type="button" class="pa-lv-action pa-action-btn" data-act="down" data-idx="${index}" title="Move down" aria-label="Move down"><i class="ri-arrow-down-line"></i></button>`;
    const edit = listActionBtn('pa-action-edit', 'ri-pencil-line', 'Edit', 'data-icon-key', item.key, 'Edit');
    const hide = listActionBtn('pa-action-delete', 'ri-eye-off-line', 'Hide', 'data-icon-key', item.key, 'Hide');
    return `${renderListRowStart()}
    ${renderListIndexCell(rowIndex)}
    ${renderListIconProjectCell(title, preview)}
    ${renderListTextCell(item.key)}
    ${renderListStatusCell(this.typeLabel(item), item.isCustom ? 'planning' : 'active')}
    ${renderListActionsCell(`${up}${down}${edit}${hide}`)}
  ${closeListRow()}`;
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

  attachActionListeners(scope) {
    if (!scope) return;
    scope.querySelectorAll('.pa-action-more').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const host = btn.closest('.pa-cat-card__list-actions, .pa-cat-card__footer-more, .pa-card-actions');
        const menu = host?.querySelector('.pa-card-menu') || btn.parentElement?.querySelector('.pa-card-menu');
        if (menu) toggleCardMenu(menu, btn);
      });
    });
    scope.querySelectorAll('[data-act]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllCardMenus();
        this.onCardAction(btn);
      });
    });
    scope.querySelectorAll('.pa-action-edit').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-icon-key');
        if (key) this.openEditor(key);
      });
    });
    scope.querySelectorAll('.pa-action-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-icon-key');
        if (key) void this.hideIcon(key);
      });
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

  getPageState() {
    const totalItems = this.filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    let page = this._module?.store?.get('page') ?? 1;
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    if (this._module && page !== this._module.store.get('page')) {
      this._module.store.set('page', page);
    }
    const start = (page - 1) * PAGE_SIZE;
    return { page, totalPages, totalItems, start, pageItems: this.filtered.slice(start, start + PAGE_SIZE) };
  }

  renderPagination(totalItems, totalPages, page) {
    const btnsWrap = $id('paIconRegistryPaginationBtns');
    const info = $id('paIconRegistryPaginationInfo');
    const pagRoot = $id('paIconRegistryPagination');
    if (!btnsWrap || !info) return;

    syncListPaginationChrome(this.viewMode === 'list' && totalItems > 0, pagRoot);

    if (totalItems === 0) {
      btnsWrap.innerHTML = '';
      info.textContent = 'Showing 0 of 0';
      return;
    }

    let html = `<div class="pa-page-nav ${page === 1 ? 'disabled' : ''}" id="paIconRegistryPagePrev" role="button" aria-label="Previous page"><i class="ri-arrow-left-s-line"></i></div>`;
    let lastShown = 0;
    for (let p = 1; p <= totalPages; p += 1) {
      const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
      if (!show) continue;
      if (p - lastShown > 1) {
        html += '<span style="color:var(--pa-text-faint); padding:0 4px; font-size:12px;">…</span>';
      }
      html += `<button class="pa-page-btn ${p === page ? 'active' : ''}" data-page="${p}">${p}</button>`;
      lastShown = p;
    }
    html += `<div class="pa-page-nav ${page === totalPages ? 'disabled' : ''}" id="paIconRegistryPageNext" role="button" aria-label="Next page"><i class="ri-arrow-right-s-line"></i></div>`;
    btnsWrap.innerHTML = html;

    const startN = (page - 1) * PAGE_SIZE + 1;
    const endN = Math.min(page * PAGE_SIZE, totalItems);
    info.textContent = `Showing ${startN} to ${endN} of ${totalItems}`;

    const goPage = (nextPage) => {
      if (!this._module) return;
      this._module.store.set('page', nextPage);
      this.renderList();
      $id('paIconRegistryBody')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    btnsWrap.querySelectorAll('.pa-page-btn').forEach((btn) => {
      btn.addEventListener('click', () => goPage(parseInt(btn.getAttribute('data-page') ?? '', 10)));
    });
    const prevBtn = $id('paIconRegistryPagePrev');
    const nextBtn = $id('paIconRegistryPageNext');
    if (prevBtn && !prevBtn.classList.contains('disabled')) {
      prevBtn.addEventListener('click', () => goPage(page - 1));
    }
    if (nextBtn && !nextBtn.classList.contains('disabled')) {
      nextBtn.addEventListener('click', () => goPage(page + 1));
    }
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

    const { page, totalPages, totalItems, start, pageItems } = this.getPageState();

    if (!this.filtered.length) {
      grid.innerHTML = '<p class="pa-text-mute pa-icon-registry-empty">No icons match your search.</p>';
      this.renderPagination(0, 1, 1);
      return;
    }

    const listMode = this.viewMode === 'list';
    if (listMode) {
      const rows = pageItems
        .map((item, i) => this.renderListRow(item, start + i + 1, start + i))
        .join('');
      grid.innerHTML = renderListTableShell(this.getListTableColumns(), rows);
    } else {
      grid.innerHTML = pageItems
        .map((item, i) => this.renderGridCard(item, start + i))
        .join('');
    }
    this.normalizeThumbs(grid);
    this.attachActionListeners(grid);
    this.renderPagination(totalItems, totalPages, page);
  }

  onCardAction(btn) {
    const act = btn.getAttribute('data-act');
    const key = btn.getAttribute('data-key') || btn.getAttribute('data-icon-key');
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
