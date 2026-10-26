// @ts-nocheck
import { Module } from '../../core/Module.js';
import { hydratePageViewMode, effectiveViewMode, setPageViewOverride } from '../../utils/listGridView.js';
import { $id, $input } from '../../utils/dom.js';
import { IconRegistryManager } from './IconRegistryManager.js';

export class IconRegistryModule extends Module {
  constructor() {
    super({
      name: 'Icon Manager',
      storageKey: 'pa_icon_registry_ui',
      initialState: { viewMode: 'list', page: 1 },
    });
    this.manager = new IconRegistryManager();
  }

  setViewModeFromStore() {
    const mode = effectiveViewMode(this.store.get('viewMode'));
    this.manager.setViewMode(mode, true);
  }

  async init() {
    await hydratePageViewMode('icon-registry', (mode) => this.store.set('viewMode', mode));
    this.setViewModeFromStore();
    this.manager.bindPage(this);
    await this.manager.load();
    this.bindEvents();
  }

  bindEvents() {
    const gridBtn = $id('paGridViewBtn');
    const listBtn = $id('paListViewBtn');
    if (gridBtn) {
      this.on(gridBtn, 'click', () => {
        this.store.set('viewMode', 'grid');
        setPageViewOverride('icon-registry', 'grid');
        this.manager.setViewMode('grid', true);
      });
    }
    if (listBtn) {
      this.on(listBtn, 'click', () => {
        this.store.set('viewMode', 'list');
        setPageViewOverride('icon-registry', 'list');
        this.manager.setViewMode('list', true);
      });
    }

    const searchInput = $input('paSearchInput');
    if (searchInput) {
      this.on(searchInput, 'input', () => {
        this.manager.search = searchInput.value || '';
        this.store.set('page', 1);
        $id('paSearchWrap')?.classList.toggle('has-value', !!searchInput.value);
        this.manager.renderList();
      });
    }
    this.on($id('paSearchClear'), 'click', () => {
      if (!searchInput) return;
      searchInput.value = '';
      this.manager.search = '';
      this.store.set('page', 1);
      $id('paSearchWrap')?.classList.remove('has-value');
      this.manager.renderList();
    });
  }
}
