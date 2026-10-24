// @ts-nocheck
import { escapeHtml } from './dom.js';

export const EXP_HIGHLIGHT_MAX_ACH = 3;
export const EXP_HIGHLIGHT_MAX_IMPACT = 3;

export function achievementRowHtml(prefix: string, index: number, value = '', canRemove: boolean) {
  const id = `${prefix}Achievement${index}`;
  return `
    <div class="pa-exp-dynamic-row" data-exp-achievement-row="${index}">
      <div class="pa-form-group pa-exp-dynamic-row__field">
        <label class="pa-form-label" for="${id}">Achievement ${index + 1}</label>
        <input class="pa-form-input" type="text" id="${id}" value="${escapeHtml(value)}" placeholder="Max 20 words" maxlength="240" data-exp-word-max="20" />
        <div class="pa-form-error-msg" id="${id}Error">
          <i class="ri-error-warning-line"></i> Max 20 words
        </div>
      </div>
      ${canRemove ? `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm pa-exp-dynamic-row__remove" data-exp-remove-achievement aria-label="Remove achievement"><i class="ri-close-line"></i></button>` : ''}
    </div>`;
}

export function impactRowHtml(prefix: string, index: number, value = '', label = '', canRemove: boolean) {
  const valueId = `${prefix}Impact${index}Value`;
  const labelId = `${prefix}Impact${index}Label`;
  return `
    <div class="pa-exp-dynamic-row pa-exp-dynamic-row--impact" data-exp-impact-row="${index}">
      <div class="pa-exp-dynamic-row__impact-fields">
        <div class="pa-form-group">
          <label class="pa-form-label" for="${valueId}">Impact ${index + 1} — value</label>
          <input class="pa-form-input" type="text" id="${valueId}" value="${escapeHtml(value)}" placeholder="e.g. 10+" maxlength="24" />
        </div>
        <div class="pa-form-group">
          <label class="pa-form-label" for="${labelId}">Impact ${index + 1} — label</label>
          <input class="pa-form-input" type="text" id="${labelId}" value="${escapeHtml(label)}" placeholder="Max 3 words" maxlength="48" data-exp-word-max="3" />
          <div class="pa-form-error-msg" id="${labelId}Error">
            <i class="ri-error-warning-line"></i> Max 3 words
          </div>
        </div>
      </div>
      ${canRemove ? `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm pa-exp-dynamic-row__remove" data-exp-remove-impact aria-label="Remove impact"><i class="ri-close-line"></i></button>` : ''}
    </div>`;
}
