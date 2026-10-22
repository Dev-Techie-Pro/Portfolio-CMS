import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const shellPath = path.join(root, "lib/blog/detail-page-templates/static-shell.ts");
const shell = await import(pathToFileURL(shellPath).href);

const files = [
  ["template-standard.html", "standardLayoutHtml"],
  ["template-minimal.html", "minimalLayoutHtml"],
  ["template-longform.html", "longformLayoutHtml"],
  ["template-case-study.html", "caseStudyLayoutHtml"],
];

for (const [name, fn] of files) {
  const html = shell[fn]();
  fs.writeFileSync(path.join(root, name), html, "utf8");
  fs.writeFileSync(path.join(root, "public", name), html, "utf8");
  console.log("Wrote", name);
}
