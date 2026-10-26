import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const mapPath = path.join(ROOT, "public/assets/js/data/legacy-icon-remix-map.js");
const mapSource = fs.readFileSync(mapPath, "utf8");
const map = {};
for (const m of mapSource.matchAll(/^\s+(si[A-Za-z0-9]+):\s*"(ri-[^"]+)"/gm)) {
  map[m[1]] = m[2];
}

const GLOBS = [
  "components",
  "lib/portfolio",
  "public/assets/js",
  "public/standalone",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts|js|html)$/.test(name)) out.push(full);
  }
  return out;
}

let files = [];
for (const rel of GLOBS) walk(path.join(ROOT, rel), files);

let total = 0;
for (const file of files) {
  if (file.includes("legacy-icon-remix-map")) continue;
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of Object.entries(map)) {
    const patterns = [
      [`data-icon="${from}"`, `data-icon="${to}"`],
      [`data-icon='${from}'`, `data-icon='${to}'`],
      [`icon: "${from}"`, `icon: "${to}"`],
      [`icon: '${from}'`, `icon: '${to}'`],
      [`_iconHtml("${from}"`, `_iconHtml("${to}"`],
      [`icon || "${from}"`, `icon || "${to}"`],
    ];
    for (const [a, b] of patterns) {
      if (text.includes(a)) {
        text = text.split(a).join(b);
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(file, text, "utf8");
    total++;
  }
}
console.log(`Updated ${total} files with Remix icon keys.`);
