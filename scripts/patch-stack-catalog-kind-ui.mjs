import fs from 'fs';

function escForTsx(html) {
  return html.trim().replace(/\n/g, '\\n').replace(/"/g, '\\"');
}

const toolsKind = (id) => escForTsx(`
      <div class="pa-form-group">
        <label class="pa-form-label" for="${id}">Catalog type</label>
        <select class="pa-form-input" id="${id}">
          <option value="tool" selected>Tool</option>
          <option value="technology">Technology</option>
        </select>
        <p class="pa-form-hint">Choose Technology if this item belongs on the Technologies page instead.</p>
      </div>
`);

const techKind = (id) => escForTsx(`
      <div class="pa-form-group">
        <label class="pa-form-label" for="${id}">Catalog type</label>
        <select class="pa-form-select" id="${id}">
          <option value="technology" selected>Technology</option>
          <option value="tool">Tool</option>
        </select>
        <p class="pa-form-hint">Choose Tool if this item belongs on the Tools page instead.</p>
      </div>
`);

function patchFile(filePath, replacements, doneMarker) {
  let s = fs.readFileSync(filePath, 'utf8');
  if (doneMarker && s.includes(doneMarker)) {
    console.log('Already patched', filePath);
    return;
  }
  for (const [from, to] of replacements) {
    if (!s.includes(from)) {
      console.error(`Missing anchor in ${filePath}:`, from.slice(0, 100));
      process.exit(1);
    }
    s = s.replace(from, to);
  }
  fs.writeFileSync(filePath, s);
  console.log('Patched', filePath);
}

patchFile('app/admin/tools/bodyHtml.tsx', [
  [
    '<label class=\\"pa-form-label\\" for=\\"toolsAddSort\\">Sort order</label>',
    `${toolsKind('toolsAddCatalogKind')}\\n        <label class=\\"pa-form-label\\" for=\\"toolsAddSort\\">Sort order</label>`,
  ],
  [
    '<label class=\\"pa-form-label\\" for=\\"toolsEditSort\\">Sort order</label>',
    `${toolsKind('toolsEditCatalogKind')}\\n        <label class=\\"pa-form-label\\" for=\\"toolsEditSort\\">Sort order</label>`,
  ],
], 'toolsAddCatalogKind');

patchFile('app/admin/technologies/bodyHtml.tsx', [
  [
    '<label class=\\"pa-form-label\\" for=\\"techAddLevel\\">',
    `${techKind('techAddCatalogKind')}\\n\\n      <label class=\\"pa-form-label\\" for=\\"techAddLevel\\">`,
  ],
  [
    '<label class=\\"pa-form-label\\" for=\\"techEditLevel\\">',
    `${techKind('techEditCatalogKind')}\\n\\n      <label class=\\"pa-form-label\\" for=\\"techEditLevel\\">`,
  ],
], 'techAddCatalogKind');
