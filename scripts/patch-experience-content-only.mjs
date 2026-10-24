import fs from 'fs';
import path from 'path';

const filePath = path.join(path.resolve(import.meta.dirname, '..'), 'components/pages/ExperienceContent.tsx');
let src = fs.readFileSync(filePath, 'utf8');

if (!src.includes('EXPERIENCE_TIMELINE_SECTION_HTML')) {
  src = src.replace(
    'import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";',
    'import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";\nimport { EXPERIENCE_TIMELINE_SECTION_HTML } from "@/lib/portfolio/experience-timeline-shell-html";',
  );
}

const open = 'const PAGE_HTML = `';
const startIdx = src.indexOf(open);
const exportIdx = src.indexOf('export function ExperienceContent');
if (startIdx < 0 || exportIdx < 0) throw new Error('PAGE_HTML bounds not found');
const endIdx = src.lastIndexOf('`;', exportIdx);
if (endIdx < startIdx) throw new Error('PAGE_HTML close backtick not found');

let pageHtml = src.slice(startIdx + open.length, endIdx);
const startMarker = '<section class="exp-work exp-work--hscroll"';
const sectionStart = pageHtml.indexOf(startMarker);
const sectionEnd = pageHtml.indexOf('</section>', sectionStart) + '</section>'.length;
pageHtml = pageHtml.slice(0, sectionStart) + '${EXPERIENCE_TIMELINE_SECTION_HTML}' + pageHtml.slice(sectionEnd);

const newSrc =
  src.slice(0, startIdx + open.length) + pageHtml + src.slice(endIdx);

fs.writeFileSync(filePath, newSrc, 'utf8');
console.log('Patched ExperienceContent');
