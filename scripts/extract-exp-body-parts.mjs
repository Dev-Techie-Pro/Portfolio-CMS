import fs from 'fs';
import path from 'path';

const bodyPath = path.join(path.resolve(import.meta.dirname, '..'), 'app/admin/experience/bodyHtml.tsx');
const src = fs.readFileSync(bodyPath, 'utf8');
const start = src.indexOf('export const BODY_HTML = "') + 'export const BODY_HTML = "'.length;
const end = src.lastIndexOf('";');
const escaped = src.slice(start, end);
const html = escaped.replace(/\\n/g, '\n').replace(/\\"/g, '"');

const panelStart = html.indexOf('<div class="pa-panel" id="paExpAddPanel"');
const shellStart = html.indexOf('<div class="pa-shell">');
const overlays = html.slice(0, panelStart);
const shell = html.slice(shellStart);

const outDir = path.join(path.resolve(import.meta.dirname, '..'), 'app/admin/experience');
fs.writeFileSync(path.join(outDir, '_bodyOverlaysSnippet.txt'), overlays, 'utf8');
fs.writeFileSync(path.join(outDir, '_bodyShellSnippet.txt'), shell, 'utf8');
console.log('Wrote snippets', { overlaysLen: overlays.length, shellLen: shell.length });
