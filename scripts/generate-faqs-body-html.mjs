import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = path.join(root, 'app/admin/experience/bodyHtml.tsx');
const src = fs.readFileSync(srcPath, 'utf8');
const match = src.match(/export const BODY_HTML = "([\s\S]*)";/);
if (!match) throw new Error('BODY_HTML not found');

let html = match[1]
  .replace(/\\n/g, '\n')
  .replace(/\\"/g, '"')
  .replace(/\\\\/g, '\\');

const FAQ_PANELS = `<div class="pa-panel" id="paFaqAddPanel" role="dialog" aria-modal="true" aria-labelledby="paFaqAddPanelTitle">
  <div class="pa-panel-head">
    <span class="pa-panel-title" id="paFaqAddPanelTitle">Add FAQ</span>
    <button class="pa-panel-close" id="paFaqAddPanelClose" aria-label="Close panel">
      <i class="ri-close-line"></i>
    </button>
  </div>
  <div class="pa-panel-body">
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqAddQuestion">
        Question <span class="pa-form-required">*</span>
      </label>
      <input class="pa-form-input" type="text" id="faqAddQuestion" placeholder="e.g. What services do you offer?" maxlength="200" autocomplete="off" />
      <div class="pa-form-error-msg" id="faqAddQuestionError">
        <i class="ri-error-warning-line"></i> Question is required
      </div>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqAddAnswer">
        Answer <span class="pa-form-required">*</span>
      </label>
      <textarea class="pa-form-textarea" id="faqAddAnswer" placeholder="Write a clear, helpful answer…" maxlength="2000" rows="6"></textarea>
      <div class="pa-char-count"><span id="faqAddAnswerCount">0</span>/2000</div>
      <div class="pa-form-error-msg" id="faqAddAnswerError">
        <i class="ri-error-warning-line"></i> Answer is required
      </div>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqAddPublished">Status</label>
      <select class="pa-form-select" id="faqAddPublished">
        <option value="1">Published</option>
        <option value="0">Draft</option>
      </select>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqAddSort">
        Display Order <span class="pa-form-hint">— lower number appears first</span>
      </label>
      <input class="pa-form-input" type="number" id="faqAddSort" placeholder="e.g. 1" min="1" max="999" step="1" />
    </div>
  </div>
  <div class="pa-panel-footer">
    <button class="pa-btn pa-btn-cancel" id="paFaqAddCancel">Cancel</button>
    <button class="pa-btn pa-btn-primary" id="paFaqAddSubmit">
      <span class="pa-spinner"></span>
      <span class="pa-btn-label">Add FAQ</span>
    </button>
  </div>
</div>
<div class="pa-panel" id="paFaqEditPanel" role="dialog" aria-modal="true" aria-labelledby="paFaqEditPanelTitle">
  <div class="pa-panel-head">
    <span class="pa-panel-title" id="paFaqEditPanelTitle">Edit FAQ</span>
    <button class="pa-panel-close" id="paFaqEditPanelClose" aria-label="Close panel">
      <i class="ri-close-line"></i>
    </button>
  </div>
  <div class="pa-panel-body">
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqEditQuestion">
        Question <span class="pa-form-required">*</span>
      </label>
      <input class="pa-form-input" type="text" id="faqEditQuestion" maxlength="200" autocomplete="off" />
      <div class="pa-form-error-msg" id="faqEditQuestionError">
        <i class="ri-error-warning-line"></i> Question is required
      </div>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqEditAnswer">
        Answer <span class="pa-form-required">*</span>
      </label>
      <textarea class="pa-form-textarea" id="faqEditAnswer" maxlength="2000" rows="6"></textarea>
      <div class="pa-char-count"><span id="faqEditAnswerCount">0</span>/2000</div>
      <div class="pa-form-error-msg" id="faqEditAnswerError">
        <i class="ri-error-warning-line"></i> Answer is required
      </div>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqEditPublished">Status</label>
      <select class="pa-form-select" id="faqEditPublished">
        <option value="1">Published</option>
        <option value="0">Draft</option>
      </select>
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="faqEditSort">Display Order</label>
      <input class="pa-form-input" type="number" id="faqEditSort" min="1" max="999" step="1" />
    </div>
  </div>
  <div class="pa-panel-footer">
    <button class="pa-btn pa-btn-cancel" id="paFaqEditCancel">Cancel</button>
    <button class="pa-btn pa-btn-danger" id="paFaqEditDelete">Delete</button>
    <button class="pa-btn pa-btn-primary" id="paFaqEditSubmit">
      <span class="pa-spinner"></span>
      <span class="pa-btn-label">Save Changes</span>
    </button>
  </div>
</div>`;

html = html.replace(
  /<div class="pa-panel" id="paExpAddPanel"[\s\S]*?<\/div>\s*<div class="pa-shell">/,
  `${FAQ_PANELS}\n<div class="pa-shell">`,
);

html = html
  .replace(/experience entry/gi, 'FAQ')
  .replace(/Delete experience\?/g, 'Delete FAQ?')
  .replace(/this experience entry/gi, 'this FAQ')
  .replace(/paExp/g, 'paFaq')
  .replace(/data-exp-id/g, 'data-faq-id')
  .replace(/Search experience…/g, 'Search FAQs…')
  .replace(/Search experience entries/g, 'Search FAQs')
  .replace(/Manage your work history timeline/g, 'Manage questions shown on your portfolio homepage')
  .replace(/<div class="pa-page-title">Experience<\/div>/g, '<div class="pa-page-title">FAQs</div>')
  .replace(/Add Experience/g, 'Add FAQ')
  .replace(/Total Experience/g, 'Total FAQs')
  .replace(/id="paFaqStatCurrent"/g, 'id="paFaqStatPublished"')
  .replace(/id="paFaqStatCurrentTrend"/g, 'id="paFaqStatPublishedTrend"')
  .replace(/<div class="pa-dash-stat-label">Current<\/div>/g, '<div class="pa-dash-stat-label">Published</div>')
  .replace(/id="paFaqStatFullTime"/g, 'id="paFaqStatDraft"')
  .replace(/id="paFaqStatFullTimeTrend"/g, 'id="paFaqStatDraftTrend"')
  .replace(/<div class="pa-dash-stat-label">Full-time<\/div>/g, '<div class="pa-dash-stat-label">Draft</div>')
  .replace(/id="paFaqStatOther"/g, 'id="paFaqStatOrdered"')
  .replace(/id="paFaqStatOtherTrend"/g, 'id="paFaqStatOrderedTrend"')
  .replace(/<div class="pa-dash-stat-label">Other Types<\/div>/g, '<div class="pa-dash-stat-label">Ordered</div>')
  .replace(/id="paFaqTypeFilter"/g, 'id="paFaqStatusFilter"')
  .replace(/Filter by employment type/g, 'Filter by status')
  .replace(
    /<select class="pa-filter-select" id="paFaqStatusFilter"[\s\S]*?<\/select>/,
    `<select class="pa-filter-select" id="paFaqStatusFilter" aria-label="Filter by status">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>`,
  )
  .replace(/ri-briefcase-line/g, 'ri-question-answer-line')
  .replace(
    '<a class="pa-nav-subitem" href="/experience" data-nav="Experience"><i class="ri-question-answer-line"></i> Experience</a>',
    '<a class="pa-nav-subitem" href="/experience" data-nav="Experience"><i class="ri-briefcase-line"></i> Experience</a>',
  );

if (!html.includes('href="/faqs"')) {
  html = html.replace(
    '<a class="pa-nav-subitem" href="/media-library"',
    '<a class="pa-nav-subitem" href="/faqs" data-nav="FAQs"><i class="ri-question-answer-line"></i> FAQs</a>\n            <a class="pa-nav-subitem" href="/media-library"',
  );
}

const outDir = path.join(root, 'app/admin/faqs');
fs.mkdirSync(outDir, { recursive: true });
const out = `// @ts-nocheck\nexport const BODY_HTML = ${JSON.stringify(html)};\n`;
fs.writeFileSync(path.join(outDir, 'bodyHtml.tsx'), out);
console.log('Wrote app/admin/faqs/bodyHtml.tsx');
