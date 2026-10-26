import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const src = fs.readFileSync(path.join(root, 'app/admin/project-technologies/bodyHtml.tsx'), 'utf8');
let html = src.slice(src.indexOf('export const BODY_HTML'));

html = html.replace(/id="paProjTechBody"/, 'id="paIconRegistryBody"');
html = html.replace(/Search technologies/g, 'Search icons');
html = html.replace(/placeholder="Search technologies[^"]*"/, 'placeholder="Search icons…"');
html = html.replace(/aria-label="Search technologies"/, 'aria-label="Search icons"');

const pageBlock =
  /      <div class="pa-header-page">[\s\S]*?      <div class="pa-toolbar pa-cat-toolbar">/;
const newHeader = `      <div class="pa-header-page">
        <div class="pa-header-page-left">
          <button class="pa-mobile-toggle" id="paMobileToggle" aria-label="Toggle menu"><i class="ri-menu-line"></i></button>
          <div class="pa-header-title-block">
            <span class="pa-header-accent" aria-hidden="true"></span>
            <div class="pa-header-left">
              <div class="pa-page-title">Icon Manager</div>
              <div class="pa-page-subtitle">Search, rename, edit, reorder, and hide portfolio SVG icons.</div>
            </div>
          </div>
        </div>
        <div class="pa-header-page-right">
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistrySaveBtn"><i class="ri-save-line"></i> <span>Save</span></button>
          <button class="pa-btn-add" type="button" id="paIconRegistryAddBtn"><i class="ri-add-line"></i> <span>Add icon</span></button>
        </div>
      </div>

      <div class="pa-toolbar pa-cat-toolbar">`;

html = html.replace(pageBlock, newHeader);
html = html.replace(
  /      <div class="pa-stats-grid[\s\S]*?      <div class="pa-toolbar pa-cat-toolbar">/,
  '      <div class="pa-toolbar pa-cat-toolbar">',
);

const toolStart = html.indexOf('<div class="pa-toolbar pa-cat-toolbar">');
const toolEnd = html.indexOf('<div class="pa-grid pa-cat-grid"');
const newToolbar = `<div class="pa-toolbar pa-cat-toolbar">
        <div class="pa-view-toggle pa-cat-view-toggle" role="group" aria-label="View mode">
          <button class="pa-view-btn active" id="paListViewBtn" title="List view" aria-label="List view"><i class="ri-list-unordered"></i></button><button class="pa-view-btn" id="paGridViewBtn" title="Grid view" aria-label="Grid view"><i class="ri-layout-grid-fill"></i></button>
        </div>
        <select class="pa-filter-select" id="paIconRegistrySort" aria-label="Sort icons" name="paIconRegistrySort">
          <option value="label">Sort: Label A–Z</option>
          <option value="key">Sort: Key A–Z</option>
          <option value="custom">Sort: Custom order</option>
        </select>
        <div class="pa-toolbar-spacer"></div>
        <div class="pa-result-count" id="paIconRegistryCount"></div>
      </div>

      `;

html = html.slice(0, toolStart) + newToolbar + html.slice(toolEnd);
html = html.replace('id="paProjTechGrid"', 'id="paIconRegistryGrid"');
html = html.replace(/aria-label="Project technologies"/, 'aria-label="Icon registry"');
html = html.replace(
  /      <div class="pa-pagination" id="paProjTechPagination">[\s\S]*?      <\/div>\n    <\/div>\n  <\/div>\n<\/div>`;/,
  '    </div>\n  </div>\n</div>`;',
);

const outDir = path.join(root, 'app/admin/icon-registry');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'bodyHtml.tsx'),
  `// @ts-nocheck\n/** Static shell; sidebar is personalized server-side (\`personalizePageHtml\`). */\n${html}`,
);
console.log('Wrote app/admin/icon-registry/bodyHtml.tsx');
