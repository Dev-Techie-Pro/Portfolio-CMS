import { escapeHtml } from "./dom.js";
function splitChipInputItems(raw) {
  if (!raw || !String(raw).trim()) return [];
  return String(raw).split(",").map((part) => part.trim()).filter(Boolean);
}
function addChipsFromText(chipContainer, raw) {
  if (!chipContainer) return 0;
  let added = 0;
  splitChipInputItems(raw).forEach((item) => {
    const before = chipContainer.children.length;
    addChip(chipContainer, item);
    if (chipContainer.children.length > before) added += 1;
  });
  return added;
}
function addChip(chipContainer, text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const existing = Array.from(chipContainer.children).map((c) => c.dataset.value?.toLowerCase());
  if (existing.includes(trimmed.toLowerCase())) return;
  const span = document.createElement("span");
  span.className = "pa-chip";
  span.dataset.value = trimmed;
  span.innerHTML = `<span>${escapeHtml(trimmed)}</span>`;
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "pa-chip-remove";
  removeBtn.setAttribute("aria-label", `Remove ${trimmed}`);
  removeBtn.innerHTML = "&times;";
  removeBtn.addEventListener("click", () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}
function getChipValues(container) {
  return Array.from(container.children).map((c) => c.dataset.value);
}
function populateChips(container, tags) {
  container.innerHTML = "";
  tags.forEach((t) => addChip(container, t));
}
function addProjectCategoryChip(chipContainer, key, label) {
  const catKey = String(key || "").trim();
  const catLabel = String(label || catKey).trim();
  if (!catKey || !chipContainer) return;
  const existing = Array.from(chipContainer.children).map((c) => c.dataset.catKey);
  if (existing.includes(catKey)) return;
  const span = document.createElement("span");
  span.className = "pa-chip pa-chip--category";
  span.dataset.catKey = catKey;
  span.dataset.value = catLabel;
  span.innerHTML = `<span>${escapeHtml(catLabel)}</span>`;
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "pa-chip-remove";
  removeBtn.setAttribute("aria-label", `Remove ${catLabel}`);
  removeBtn.innerHTML = "&times;";
  removeBtn.addEventListener("click", () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}
function getProjectCategoryChipKeys(container) {
  if (!container) return [];
  return Array.from(container.children).map((c) => c.dataset.catKey).filter(Boolean);
}
function populateProjectCategoryChips(container, keys, meta) {
  if (!container) return;
  container.innerHTML = "";
  (keys || []).forEach((key) => {
    const k = String(key).trim();
    if (!k) return;
    addProjectCategoryChip(container, k, meta[k]?.label || k);
  });
}
function chipKey(kind, legacyId) {
  return `${kind}:${legacyId}`;
}
function addPendingStackChip(chipContainer, kind, name) {
  const label = String(name || "").trim();
  const chipKind = kind === "tool" ? "tool" : "technology";
  if (!label || !chipContainer) return;
  const pendingKey = `${chipKind}:pending:${label.toLowerCase()}`;
  const existing = Array.from(chipContainer.children).map((c) => {
    if (c.dataset.pending === "true") {
      const k = c.dataset.chipKind === "tool" ? "tool" : "technology";
      return `${k}:pending:${(c.dataset.value || "").toLowerCase()}`;
    }
    return chipKey(c.dataset.chipKind || "technology", c.dataset.legacyId || "");
  });
  if (existing.includes(pendingKey)) return;
  const span = document.createElement("span");
  span.className = "pa-chip pa-chip--pending";
  span.dataset.pending = "true";
  span.dataset.chipKind = chipKind;
  span.dataset.value = label;
  span.innerHTML = `<span>${escapeHtml(label)}</span>`;
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "pa-chip-remove";
  removeBtn.setAttribute("aria-label", `Remove ${label}`);
  removeBtn.innerHTML = "&times;";
  removeBtn.addEventListener("click", () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}
function hasProjectStackChips(container) {
  return !!container && container.children.length > 0;
}
function addStackChip(chipContainer, kind, legacyId, name) {
  const id = String(legacyId);
  const label = String(name || "").trim();
  const chipKind = kind === "tool" ? "tool" : "technology";
  if (!id || !label) return;
  const existing = Array.from(chipContainer.children).map(
    (c) => chipKey(c.dataset.chipKind || "technology", c.dataset.legacyId || "")
  );
  if (existing.includes(chipKey(chipKind, id))) return;
  const span = document.createElement("span");
  span.className = "pa-chip";
  span.dataset.chipKind = chipKind;
  span.dataset.legacyId = id;
  span.dataset.value = label;
  span.innerHTML = `<span>${escapeHtml(label)}</span>`;
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "pa-chip-remove";
  removeBtn.setAttribute("aria-label", `Remove ${label}`);
  removeBtn.innerHTML = "&times;";
  removeBtn.addEventListener("click", () => span.remove());
  span.appendChild(removeBtn);
  chipContainer.appendChild(span);
}
function addTechChip(chipContainer, legacyId, name) {
  addStackChip(chipContainer, "technology", legacyId, name);
}
function getStackChipSelections(container) {
  return Array.from(container.children).map((c) => ({
    kind: c.dataset.chipKind === "tool" ? "tool" : "technology",
    id: c.dataset.pending === "true" ? NaN : Number(c.dataset.legacyId),
    name: c.dataset.value || "",
    pending: c.dataset.pending === "true"
  }));
}
function getProjectStackFromChips(container) {
  const selections = getStackChipSelections(container);
  const resolved = selections.filter((s) => !s.pending && !Number.isNaN(s.id));
  return {
    technologies: resolved.filter((s) => s.kind === "technology").map((s) => s.id),
    tools: resolved.filter((s) => s.kind === "tool").map((s) => s.id)
  };
}
function getTechChipLegacyIds(container) {
  return getProjectStackFromChips(container).technologies;
}
function populateProjectStackChips(container, technologiesCatalog, toolsCatalog, technologyIds, toolIds) {
  container.innerHTML = "";
  const techById = new Map((technologiesCatalog || []).map((t) => [String(t.id), t]));
  const toolById = new Map((toolsCatalog || []).map((t) => [String(t.id), t]));
  (technologyIds || []).forEach((legacyId) => {
    const tech = techById.get(String(legacyId));
    if (tech) addStackChip(container, "technology", tech.id, tech.name);
  });
  (toolIds || []).forEach((legacyId) => {
    const tool = toolById.get(String(legacyId));
    if (tool) addStackChip(container, "tool", tool.id, tool.name);
  });
}
function populateTechChips(container, technologiesCatalog, legacyIds) {
  populateProjectStackChips(container, technologiesCatalog, [], legacyIds, []);
}
export {
  addChip,
  addChipsFromText,
  addPendingStackChip,
  addProjectCategoryChip,
  addStackChip,
  addTechChip,
  getChipValues,
  getProjectCategoryChipKeys,
  getProjectStackFromChips,
  getStackChipSelections,
  getTechChipLegacyIds,
  hasProjectStackChips,
  populateChips,
  populateProjectCategoryChips,
  populateProjectStackChips,
  populateTechChips,
  splitChipInputItems
};
//# sourceMappingURL=chips.js.map
