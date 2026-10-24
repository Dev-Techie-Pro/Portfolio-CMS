import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const shellPath = path.join(root, 'lib/portfolio/experience-timeline-shell-html.ts');
const shellSrc = fs.readFileSync(shellPath, 'utf8');
const shellMatch = shellSrc.match(/export const EXPERIENCE_TIMELINE_SECTION_HTML = `([\s\S]*)`;/);
if (!shellMatch) throw new Error('Shell HTML not found');
const shellHtml = shellMatch[1];

const importLine =
  'import { EXPERIENCE_TIMELINE_SECTION_HTML } from "@/lib/portfolio/experience-timeline-shell-html";\n';

const files = [
  'components/pages/HomeContent.tsx',
  'components/pages/ExperienceContent.tsx',
];

const startMarker = '<section class="exp-work exp-work--hscroll"';
const endMarker = '</section>';

for (const rel of files) {
  const filePath = path.join(root, rel);
  let src = fs.readFileSync(filePath, 'utf8');
  const pageMatch = src.match(/const PAGE_HTML = `([\s\S]*)`;\s*\n\nexport function/);
  if (!pageMatch) throw new Error(`PAGE_HTML block not found in ${rel}`);
  let pageHtml = pageMatch[1];
  const start = pageHtml.indexOf(startMarker);
  const end = pageHtml.indexOf(endMarker, start) + endMarker.length;
  if (start < 0 || end <= start) throw new Error(`exp-work section bounds invalid in ${rel}`);
  pageHtml = pageHtml.slice(0, start) + '${EXPERIENCE_TIMELINE_SECTION_HTML}' + pageHtml.slice(end);

  let newSrc = src.replace(/const PAGE_HTML = `[\s\S]*`;\s*\n\nexport function/, `const PAGE_HTML = \`${pageHtml}\`;\n\nexport function`);

  if (!newSrc.includes('EXPERIENCE_TIMELINE_SECTION_HTML')) {
    newSrc = newSrc.replace(
      /("use client";\n\n)/,
      `$1${importLine}`,
    );
  }

  fs.writeFileSync(filePath, newSrc, 'utf8');
  console.log('Patched', rel);
}
