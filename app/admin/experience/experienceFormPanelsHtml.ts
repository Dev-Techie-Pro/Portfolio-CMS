// @ts-nocheck

function expFormFields(prefix: 'expAdd' | 'expEdit', tabGroup: 'expAdd' | 'expEdit', mode: 'add' | 'edit') {
  const rolePh = mode === 'add' ? 'e.g. Full Stack Web Developer' : '';
  const companyPh = mode === 'add' ? 'e.g. Web-Tech' : '';
  const locPh = mode === 'add' ? 'e.g. Islamabad, Pakistan' : '';
  const teamPh = mode === 'add' ? 'e.g. 8+ Members' : '';
  const domainPh = mode === 'add' ? 'e.g. Web Development' : '';
  const descPh = mode === 'add' ? 'What did you build, ship, or lead in this role…' : '';

  return `
    <div class="pa-tab-panel active" data-panel="${tabGroup}" data-content="details">
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Company">
          Company name <span class="pa-form-required">*</span>
        </label>
        <input class="pa-form-input" type="text" id="${prefix}Company" placeholder="${companyPh}" maxlength="80" autocomplete="off" />
        <div class="pa-form-error-msg" id="${prefix}CompanyError">
          <i class="ri-error-warning-line"></i> Company name is required
        </div>
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Location">
          Location <span class="pa-form-hint">— optional</span>
        </label>
        <input class="pa-form-input" type="text" id="${prefix}Location" placeholder="${locPh}" maxlength="80" />
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Type">
          Type <span class="pa-form-required">*</span>
        </label>
        <select class="pa-form-select" id="${prefix}Type">
          <option value="">Select type…</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
          <option value="internship">Internship</option>
        </select>
        <div class="pa-form-error-msg" id="${prefix}TypeError">
          <i class="ri-error-warning-line"></i> Employment type is required
        </div>
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Mode">
          Mode <span class="pa-form-hint">— optional</span>
        </label>
        <select class="pa-form-select" id="${prefix}Mode">
          <option value="">Select mode…</option>
          <option value="on-site">On-site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}TeamSize">
          Team size <span class="pa-form-hint">— optional</span>
        </label>
        <input class="pa-form-input" type="text" id="${prefix}TeamSize" placeholder="${teamPh}" maxlength="40" />
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Domain">
          Domain <span class="pa-form-hint">— optional</span>
        </label>
        <input class="pa-form-input" type="text" id="${prefix}Domain" placeholder="${domainPh}" maxlength="80" />
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Title">
          Role <span class="pa-form-required">*</span>
        </label>
        <input class="pa-form-input" type="text" id="${prefix}Title" placeholder="${rolePh}" maxlength="80" autocomplete="off" />
        <div class="pa-form-error-msg" id="${prefix}TitleError">
          <i class="ri-error-warning-line"></i> Role is required
        </div>
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Desc">
          Description <span class="pa-form-hint">— optional</span>
        </label>
        <textarea class="pa-form-textarea" id="${prefix}Desc" placeholder="${descPh}" maxlength="2000" rows="5"></textarea>
        <div class="pa-char-count"><span id="${prefix}DescCount">0</span>/2000</div>
      </div>
    </div>

    <div class="pa-tab-panel" data-panel="${tabGroup}" data-content="highlights">
      <p class="pa-form-label">Key achievements <span class="pa-form-hint">— up to 3, max 20 words each</span></p>
      ${[1, 2, 3]
        .map(
          (n) => `
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Achievement${n}">Achievement ${n}</label>
        <input class="pa-form-input" type="text" id="${prefix}Achievement${n}" placeholder="Max 20 words" maxlength="240" data-exp-word-max="20" />
        <div class="pa-form-error-msg" id="${prefix}Achievement${n}Error">
          <i class="ri-error-warning-line"></i> Max 20 words
        </div>
      </div>`,
        )
        .join('')}
      <p class="pa-form-label">Role impact <span class="pa-form-hint">— up to 3, label max 3 words each</span></p>
      ${[1, 2, 3]
        .map(
          (n) => `
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Impact${n}Value">Impact ${n} — value</label>
        <input class="pa-form-input" type="text" id="${prefix}Impact${n}Value" placeholder="e.g. 10+" maxlength="24" />
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Impact${n}Label">Impact ${n} — label</label>
        <input class="pa-form-input" type="text" id="${prefix}Impact${n}Label" placeholder="Max 3 words" maxlength="48" data-exp-word-max="3" />
        <div class="pa-form-error-msg" id="${prefix}Impact${n}LabelError">
          <i class="ri-error-warning-line"></i> Max 3 words
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="pa-tab-panel" data-panel="${tabGroup}" data-content="dates">
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}StartDate">
          From <span class="pa-form-required">*</span>
        </label>
        <input class="pa-form-input" type="month" id="${prefix}StartDate" />
        <div class="pa-form-error-msg" id="${prefix}StartDateError">
          <i class="ri-error-warning-line"></i> Start date is required
        </div>
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Current">I currently work here</label>
        <select class="pa-form-select" id="${prefix}Current">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div class="pa-form-group" id="${prefix}EndDateGroup">
        <label class="pa-form-label" for="${prefix}EndDate">
          To <span class="pa-form-hint">— optional if still ongoing</span>
        </label>
        <input class="pa-form-input" type="month" id="${prefix}EndDate" />
      </div>
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}Sort">
          Display order <span class="pa-form-hint">— lower number = higher on list</span>
        </label>
        <input class="pa-form-input" type="number" id="${prefix}Sort" placeholder="e.g. 1" min="1" max="999" step="1" />
      </div>
    </div>

    <div class="pa-tab-panel" data-panel="${tabGroup}" data-content="tech">
      <div class="pa-form-group">
        <label class="pa-form-label" for="${prefix}TechInput">Technologies used</label>
        <div class="pa-tech-suggest">
          <div class="pa-chip-field">
            <div class="pa-chip-list" id="${prefix}TechChips"></div>
            <input class="pa-form-input pa-chip-input" type="text" id="${prefix}TechInput" placeholder="Search technologies…" autocomplete="off" aria-autocomplete="list" />
          </div>
          <div class="pa-tech-suggest-list" id="${prefix}TechSuggestList" role="listbox" hidden></div>
        </div>
        <button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" id="${prefix}TechAddBtn">Add technology</button>
      </div>
    </div>`;
}

function expPanel(
  id: string,
  titleId: string,
  title: string,
  tabGroup: 'expAdd' | 'expEdit',
  prefix: 'expAdd' | 'expEdit',
  mode: 'add' | 'edit',
  footerHtml: string,
) {
  return `
<div class="pa-panel" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
  <div class="pa-panel-head">
    <span class="pa-panel-title" id="${titleId}">${title}</span>
    <button class="pa-panel-close" id="${id}Close" aria-label="Close panel">
      <i class="ri-close-line"></i>
    </button>
  </div>
  <div class="pa-panel-tabs">
    <button class="pa-panel-tab active" data-panel="${tabGroup}" data-tab="details">Details</button>
    <button class="pa-panel-tab" data-panel="${tabGroup}" data-tab="highlights">Highlights</button>
    <button class="pa-panel-tab" data-panel="${tabGroup}" data-tab="dates">Dates</button>
    <button class="pa-panel-tab" data-panel="${tabGroup}" data-tab="tech">Technologies</button>
  </div>
  <div class="pa-panel-body">
    ${expFormFields(prefix, tabGroup, mode)}
  </div>
  ${footerHtml}
</div>`;
}

const addFooter = `
  <div class="pa-panel-footer">
    <button class="pa-btn pa-btn-cancel" id="paExpAddCancel">Cancel</button>
    <button class="pa-btn pa-btn-primary" id="paExpAddSubmit">
      <span class="pa-spinner"></span>
      <span class="pa-btn-label">Add Experience</span>
    </button>
  </div>`;

const editFooter = `
  <div class="pa-panel-footer">
    <button class="pa-btn pa-btn-cancel" id="paExpEditCancel">Cancel</button>
    <button class="pa-btn pa-btn-danger" id="paExpEditDelete">Delete</button>
    <button class="pa-btn pa-btn-primary" id="paExpEditSubmit">
      <span class="pa-spinner"></span>
      <span class="pa-btn-label">Save Changes</span>
    </button>
  </div>`;

export const EXPERIENCE_FORM_PANELS_HTML =
  expPanel('paExpAddPanel', 'paExpAddPanelTitle', 'Add Experience', 'expAdd', 'expAdd', 'add', addFooter)
  + expPanel('paExpEditPanel', 'paExpEditPanelTitle', 'Edit Experience', 'expEdit', 'expEdit', 'edit', editFooter);
