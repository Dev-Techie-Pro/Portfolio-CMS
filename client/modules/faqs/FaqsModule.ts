// @ts-nocheck
import { CrudCardModule } from '../../core/CrudCardModule.js';
import { escapeHtml, $id } from '../../utils/dom.js';
import { formatDate, parseSortInput } from '../../utils/format.js';
import { openPanel } from '../../modules/shell/panels.js';
import { renderPaCatCard, renderPaCatListRow } from '../../utils/paCatCard.js';
import { categoryKeyFromAccentHex } from '../../utils/categoryClassOptions.js';
import { setStatTrend, setStatValue } from '../../utils/pageStats.js';

const FAQ_ACCENT = '#38bdf8';

export class FaqsModule extends CrudCardModule {
  constructor() {
    super({
      name: 'FAQs',
      storageKey: 'pa_faqs',
      deleteType: 'faq',
      page: 'faqs',
      pageSize: 9,
      listTable: true,
      cardIdAttr: 'data-faq-id',
      bulkLabel: 'FAQ',
      defaultFilters: { status: 'all' },
      filterSelectIds: [{ id: 'paFaqStatusFilter', key: 'status' }],
      addFocusId: 'faqAddQuestion',
      editFocusId: 'faqEditQuestion',
      ids: {
        grid: 'paFaqGrid',
        resultCount: 'paFaqResultCount',
        paginationBtns: 'paFaqPaginationBtns',
        paginationInfo: 'paFaqPaginationInfo',
        pagePrev: 'paFaqPagePrev',
        pageNext: 'paFaqPageNext',
        bodyScroll: 'paFaqBody',
        emptyResetBtn: 'paFaqEmptyResetBtn',
        emptyAddBtn: 'paFaqEmptyAddBtn',
        addPanel: 'paFaqAddPanel',
        editPanel: 'paFaqEditPanel',
        addSubmit: 'paFaqAddSubmit',
        editSubmit: 'paFaqEditSubmit',
        editDelete: 'paFaqEditDelete',
        addNewBtn: 'paFaqAddNewBtn',
        addPanelClose: 'paFaqAddPanelClose',
        editPanelClose: 'paFaqEditPanelClose',
        addCancel: 'paFaqAddCancel',
        editCancel: 'paFaqEditCancel',
      },
      menuActions: {
        'copy-question': function copyQuestion(id) {
          this.copyQuestion(id);
        },
      },
    });
  }

  seedData() {
    return [];
  }

  sortRecords(records) {
    return [...records].sort((a, b) => {
      const ao = a.sortOrder ?? 0;
      const bo = b.sortOrder ?? 0;
      if (ao !== bo) return ao - bo;
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    });
  }

  matchesFilters(record, filters) {
    if (filters.status === 'published') return !!record.published;
    if (filters.status === 'draft') return !record.published;
    return true;
  }

  matchesSearch(record, query) {
    const q = query.trim().toLowerCase();
    return (
      record.question.toLowerCase().includes(q)
      || (record.answer || '').toLowerCase().includes(q)
    );
  }

  getDeleteName(record) {
    return record.question;
  }

  renderStats() {
    const records = this.store.get('records');
    setStatValue('paFaqStatTotal', records.length);
    setStatValue('paFaqStatPublished', records.filter((f) => f.published).length);
    setStatValue('paFaqStatDraft', records.filter((f) => !f.published).length);
    setStatValue('paFaqStatOrdered', records.filter((f) => (f.sortOrder ?? 0) > 0).length);
    setStatTrend('paFaqStatTotalTrend', records);
    setStatTrend('paFaqStatPublishedTrend', records, (f) => f.published);
    setStatTrend('paFaqStatDraftTrend', records, (f) => !f.published);
    setStatTrend('paFaqStatOrderedTrend', records, (f) => (f.sortOrder ?? 0) > 0);
  }

  renderCardMenu(f) {
    const id = escapeHtml(String(f.id));
    const question = escapeHtml(f.question);
    return `<div class="pa-card-menu" data-faq-id="${id}">
      <div class="pa-card-menu-item" data-action="duplicate" data-faq-id="${id}"><i class="ri-file-copy-line"></i> Duplicate</div>
      <div class="pa-card-menu-item" data-action="copy-question" data-faq-id="${id}"><i class="ri-clipboard-line"></i> Copy question</div>
    </div>`;
  }

  renderListRow(f, rowIndex) {
    const status = f.published ? 'Published' : 'Draft';
    return renderPaCatListRow({
      rowIndex,
      idAttr: 'data-faq-id',
      id: f.id,
      iconHtml: '<i class="ri-question-answer-line"></i>',
      title: f.question,
      category: status,
      status,
      created: formatDate(f.createdAt),
      cardClass: this.bulkSelect?.cardClass(f.id) || '',
    });
  }

  renderCard(f) {
    const status = f.published ? 'Published' : 'Draft';
    const preview = (f.answer || '').slice(0, 120);
    const catKey = categoryKeyFromAccentHex(FAQ_ACCENT);

    return renderPaCatCard({
      idAttr: 'data-faq-id',
      id: f.id,
      catKey,
      cardClass: this.bulkSelect?.cardClass(f.id) || '',
      animationDelay: 0,
      bulkCheckbox: this.bulkSelect?.checkboxHtml(f.id, `Select ${escapeHtml(f.question)}`) || '',
      iconHtml: '<i class="ri-question-answer-line"></i>',
      badge: f.published ? '' : '<span class="pa-cat-card__builtin">Draft</span>',
      title: f.question,
      slug: `Order #${f.sortOrder ?? '—'}`,
      desc: preview,
      countIcon: 'ri-sort-asc',
      countLabel: `Order ${f.sortOrder ?? '—'}`,
      status,
      dateLabel: 'Updated',
      dateValue: formatDate(f.createdAt),
      menuHtml: this.renderCardMenu(f),
    });
  }

  copyQuestion(id) {
    const f = this.findById(id);
    if (!f) return;
    navigator.clipboard?.writeText(f.question).then(() => this.toast('Question copied to clipboard', 'success'));
  }

  buildDuplicate(record, newId) {
    return {
      ...record,
      id: newId,
      question: `${record.question} (Copy)`,
      published: false,
    };
  }

  openAddPanel() {
    this.resetAddForm();
    openPanel(this.config.ids.addPanel, [this.config.ids.editPanel]);
    setTimeout(() => $id('faqAddQuestion')?.focus(), 320);
  }

  openEditPanel(id) {
    const record = this.findById(id);
    if (!record) return;
    this.currentEditId = id;
    this.populateEditForm(record);
    openPanel(this.config.ids.editPanel, [this.config.ids.addPanel]);
    setTimeout(() => $id('faqEditQuestion')?.focus(), 320);
  }

  bindEvents() {
    super.bindEvents();
    ['faqAddAnswer', 'faqEditAnswer'].forEach((id) => {
      this.on($id(id), 'input', () => {
        const prefix = id.startsWith('faqAdd') ? 'faqAdd' : 'faqEdit';
        const countEl = $id(`${prefix}AnswerCount`);
        if (countEl) countEl.textContent = String($id(id)?.value.length || 0);
      });
    });
  }

  resetAddForm() {
    ['faqAddQuestion', 'faqAddAnswer', 'faqAddSort'].forEach((id) => {
      const el = $id(id);
      if (el) el.value = '';
    });
    $id('faqAddPublished').value = '1';
    const addCount = $id('faqAddAnswerCount');
    if (addCount) addCount.textContent = '0';
    ['Question', 'Answer'].forEach((f) => {
      $id(`faqAdd${f}Error`)?.classList.remove('visible');
      $id(`faqAdd${f}`)?.classList.remove('error');
    });
  }

  populateEditForm(f) {
    $id('faqEditQuestion').value = f.question;
    $id('faqEditAnswer').value = f.answer || '';
    $id('faqEditPublished').value = f.published ? '1' : '0';
    $id('faqEditSort').value = f.sortOrder != null ? String(f.sortOrder) : '';
    const editCount = $id('faqEditAnswerCount');
    if (editCount) editCount.textContent = String((f.answer || '').length);
    ['Question', 'Answer'].forEach((field) => {
      $id(`faqEdit${field}Error`)?.classList.remove('visible');
      $id(`faqEdit${field}`)?.classList.remove('error');
    });
  }

  validateForm(prefix) {
    let valid = true;
    const p = prefix === 'add' ? 'faqAdd' : 'faqEdit';

    const question = $id(`${p}Question`).value.trim();
    this._err(`${p}Question`, !question);
    if (!question) valid = false;

    const answer = $id(`${p}Answer`).value.trim();
    this._err(`${p}Answer`, !answer);
    if (!answer) valid = false;

    return { valid, question, answer };
  }

  _err(id, isError) {
    $id(id)?.classList.toggle('error', isError);
    $id(`${id}Error`)?.classList.toggle('visible', isError);
  }

  buildNewRecord(f) {
    return {
      question: f.question,
      answer: f.answer,
      published: $id('faqAddPublished').value === '1',
      sortOrder: parseSortInput($id('faqAddSort').value, this.store.get('records').length + 1),
      createdAt: new Date().toISOString(),
    };
  }

  applyEditToRecord(record, f) {
    record.question = f.question;
    record.answer = f.answer;
    record.published = $id('faqEditPublished').value === '1';
    record.sortOrder = parseSortInput($id('faqEditSort').value, record.sortOrder);
  }
}
