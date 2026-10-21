/**
 * Copy Remix Icon CSS + font files into public/ for static templates and CSP-safe font-src 'self'.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'node_modules/remixicon/fonts');
const destDir = path.join(root, 'public/vendor/remixicon');

const fontExt = /\.(css|woff2?|ttf|eot|svg)$/i;

if (!fs.existsSync(srcDir)) {
  console.warn('sync-remixicon-vendor: node_modules/remixicon/fonts missing — run npm install');
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

for (const name of fs.readdirSync(srcDir)) {
  if (!fontExt.test(name)) continue;
  fs.copyFileSync(path.join(srcDir, name), path.join(destDir, name));
}

console.log(`sync-remixicon-vendor: → public/vendor/remixicon (${fs.readdirSync(destDir).length} files)`);
