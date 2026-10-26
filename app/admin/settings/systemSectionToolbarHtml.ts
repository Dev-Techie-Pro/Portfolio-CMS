// @ts-nocheck
/** System sub-section tabs (Database, Deployment, Environment, Icons). */
export const SYSTEM_SECTION_TOOLBAR_HTML = `
<div class="pa-settings-toolbar pa-system-section-toolbar" id="systemSectionTabs">
  <div class="pa-view-toggle pa-system-section-toggle" role="tablist" aria-label="System sections">
    <button type="button" class="pa-view-btn active" data-panel="system-section" data-tab="database" role="tab" aria-selected="true"><i class="ri-database-2-line" aria-hidden="true"></i><span>Database</span></button>
    <button type="button" class="pa-view-btn" data-panel="system-section" data-tab="ops" role="tab" aria-selected="false"><i class="ri-shield-check-line" aria-hidden="true"></i><span>Deployment</span></button>
    <button type="button" class="pa-view-btn" data-panel="system-section" data-tab="env" role="tab" aria-selected="false"><i class="ri-terminal-box-line" aria-hidden="true"></i><span>Environment</span></button>
    <button type="button" class="pa-view-btn" data-panel="system-section" data-tab="icons" role="tab" aria-selected="false"><i class="ri-palette-line" aria-hidden="true"></i><span>Icons</span></button>
  </div>
</div>`;
