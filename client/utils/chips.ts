// @ts-nocheck
import { escapeHtml } from './dom.js';

/** Split pasted or typed lists: "A, B, C," → ["A", "B", "C"] */
export function splitChipInputItems(raw: string): string[] {
  if (!raw || !String(raw).trim()) return [];
  return String(raw)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

export function addChipsFromText(chipContainer, raw: string): number {
  if (!chipContainer) return 0;
  let added = 0;
  splitChipInputItems(raw).forEach((item) => {
    const before = chipContainer.children.length;
    addChip(chipContainer, item);
    if (chipContainer.children.length > before) added += 1;
  });
  return added;
}

export function addChip(chipContainer, text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const existing = Array.from(chipContainer.children).map((c) => c.dataset.value?.toLowerCase());
  if (existing.includes(trimmed.toLowerCase())) return;
  const span = document.createElement('span');
  span.className = 'pa-chip';
  span.dataset.value = trimmed;
  span.innerHTML = `<span>${escapeHtml(trimmed)}</span>`;
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'pa-chip-remove';
  removeBtn.setAttribute('aria-label', `Remove ${trimmed}`);
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}

export function getChipValues(container) {
  return Array.from(container.children).map((c) => c.dataset.value);
}

export function populateChips(container, tags) {
  container.innerHTML = '';
  tags.forEach((t) => addChip(container, t));
}

/** Fixed project category keys (chip stores key; label is shown in UI). */
export function addProjectCategoryChip(chipContainer, key, label) {
  const catKey = String(key || '').trim();
  const catLabel = String(label || catKey).trim();
  if (!catKey || !chipContainer) return;
  const existing = Array.from(chipContainer.children).map((c) => c.dataset.catKey);
  if (existing.includes(catKey)) return;
  const span = document.createElement('span');
  span.className = 'pa-chip pa-chip--category';
  span.dataset.catKey = catKey;
  span.dataset.value = catLabel;
  span.innerHTML = `<span>${escapeHtml(catLabel)}</span>`;
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'pa-chip-remove';
  removeBtn.setAttribute('aria-label', `Remove ${catLabel}`);
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}

export function getProjectCategoryChipKeys(container) {
  if (!container) return [];
  return Array.from(container.children)
    .map((c) => c.dataset.catKey)
    .filter(Boolean);
}

export function populateProjectCategoryChips(
  container,
  keys,
  meta: Record<string, { label?: string }>,
) {
  if (!container) return;
  container.innerHTML = '';
  (keys || []).forEach((key) => {
    const k = String(key).trim();
    if (!k) return;
    addProjectCategoryChip(container, k, meta[k]?.label || k);
  });
}

export type StackChipKind = 'technology' | 'tool';

function chipKey(kind: StackChipKind, legacyId: string) {
  return `${kind}:${legacyId}`;
}

/** Local-only stack chip (persisted when the project is saved). */
export function addPendingStackChip(chipContainer, kind: StackChipKind, name: string) {
  const label = String(name || '').trim();
  const chipKind: StackChipKind = kind === 'tool' ? 'tool' : 'technology';
  if (!label || !chipContainer) return;
  const pendingKey = `${chipKind}:pending:${label.toLowerCase()}`;
  const existing = Array.from(chipContainer.children).map((c) => {
    if (c.dataset.pending === 'true') {
      const k = c.dataset.chipKind === 'tool' ? 'tool' : 'technology';
      return `${k}:pending:${(c.dataset.value || '').toLowerCase()}`;
    }
    return chipKey((c.dataset.chipKind as StackChipKind) || 'technology', c.dataset.legacyId || '');
  });
  if (existing.includes(pendingKey)) return;
  const span = document.createElement('span');
  span.className = 'pa-chip pa-chip--pending';
  span.dataset.pending = 'true';
  span.dataset.chipKind = chipKind;
  span.dataset.value = label;
  span.innerHTML = `<span>${escapeHtml(label)}</span>`;
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'pa-chip-remove';
  removeBtn.setAttribute('aria-label', `Remove ${label}`);
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}

export function hasProjectStackChips(container) {
  return !!container && container.children.length > 0;
}

/** Stack chips (technology or tool) store kind + legacy_id; display name in UI. */
export function addStackChip(chipContainer, kind: StackChipKind, legacyId, name) {
  const id = String(legacyId);
  const label = String(name || '').trim();
  const chipKind: StackChipKind = kind === 'tool' ? 'tool' : 'technology';
  if (!id || !label) return;
  const existing = Array.from(chipContainer.children).map(
    (c) => chipKey((c.dataset.chipKind as StackChipKind) || 'technology', c.dataset.legacyId || ''),
  );
  if (existing.includes(chipKey(chipKind, id))) return;
  const span = document.createElement('span');
  span.className = 'pa-chip';
  span.dataset.chipKind = chipKind;
  span.dataset.legacyId = id;
  span.dataset.value = label;
  span.innerHTML = `<span>${escapeHtml(label)}</span>`;
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'pa-chip-remove';
  removeBtn.setAttribute('aria-label', `Remove ${label}`);
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}

/** @deprecated Use addStackChip */
export function addTechChip(chipContainer, legacyId, name) {
  addStackChip(chipContainer, 'technology', legacyId, name);
}

export function getStackChipSelections(container) {
  return Array.from(container.children).map((c) => ({
    kind: (c.dataset.chipKind === 'tool' ? 'tool' : 'technology') as StackChipKind,
    id: c.dataset.pending === 'true' ? NaN : Number(c.dataset.legacyId),
    name: c.dataset.value || '',
    pending: c.dataset.pending === 'true',
  }));
}

export function getProjectStackFromChips(container) {
  const selections = getStackChipSelections(container);
  const resolved = selections.filter((s) => !s.pending && !Number.isNaN(s.id));
  return {
    technologies: resolved.filter((s) => s.kind === 'technology').map((s) => s.id),
    tools: resolved.filter((s) => s.kind === 'tool').map((s) => s.id),
  };
}

export function getTechChipLegacyIds(container) {
  return getProjectStackFromChips(container).technologies;
}

export function populateProjectStackChips(
  container,
  technologiesCatalog,
  toolsCatalog,
  technologyIds,
  toolIds,
) {
  container.innerHTML = '';
  const techById = new Map((technologiesCatalog || []).map((t) => [String(t.id), t]));
  const toolById = new Map((toolsCatalog || []).map((t) => [String(t.id), t]));
  (technologyIds || []).forEach((legacyId) => {
    const tech = techById.get(String(legacyId));
    if (tech) addStackChip(container, 'technology', tech.id, tech.name);
  });
  (toolIds || []).forEach((legacyId) => {
    const tool = toolById.get(String(legacyId));
    if (tool) addStackChip(container, 'tool', tool.id, tool.name);
  });
}

export function populateTechChips(container, technologiesCatalog, legacyIds) {
  populateProjectStackChips(container, technologiesCatalog, [], legacyIds, []);
}
