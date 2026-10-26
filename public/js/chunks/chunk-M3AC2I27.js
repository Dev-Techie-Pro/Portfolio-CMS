import {
  addPendingStackChip,
  addStackChip,
  getStackChipSelections,
  splitChipInputItems
} from "./chunk-JFWNZ4BR.js";
import {
  mountFloatingLayer
} from "./chunk-777AU2J4.js";
import {
  sortByNewestFirst
} from "./chunk-JWEJ6YLS.js";
import {
  storage
} from "./chunk-4NBARMWE.js";
import {
  escapeHtml
} from "./chunk-HFEWIT3P.js";

// client/utils/stackCatalog.ts
async function loadStackCatalog() {
  storage.invalidate("pa_technologies");
  storage.invalidate("pa_tools");
  const [technologies, tools] = await Promise.all([
    storage.get("pa_technologies", []),
    storage.get("pa_tools", [])
  ]);
  const items = [];
  (Array.isArray(technologies) ? technologies : []).forEach((row) => {
    if (!row?.name) return;
    const id = Number(row.id);
    if (Number.isNaN(id)) return;
    items.push({ kind: "technology", id, name: String(row.name) });
  });
  (Array.isArray(tools) ? tools : []).forEach((row) => {
    if (!row?.name) return;
    const id = Number(row.id);
    if (Number.isNaN(id)) return;
    items.push({ kind: "tool", id, name: String(row.name) });
  });
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

// client/utils/technologyCategorySelect.ts
async function loadToolCategories() {
  const rows = await storage.get("pa_tool_categories", []);
  return Array.isArray(rows) ? sortByNewestFirst(rows) : [];
}
function defaultTechnologyCategoryId(categories) {
  const other = categories.find((c) => String(c.key).toLowerCase() === "other");
  const pick = other ?? categories[0];
  return pick?.id != null ? Number(pick.id) : null;
}

// client/utils/technologyResolve.ts
async function resolveTechnologyByName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return null;
  storage.invalidate("pa_technologies");
  let techs = await storage.get("pa_technologies", []);
  if (!Array.isArray(techs)) techs = [];
  const hit = techs.find((t) => String(t.name || "").toLowerCase() === trimmed.toLowerCase());
  if (hit) return hit;
  const categories = await loadToolCategories();
  const defaultCat = defaultTechnologyCategoryId(categories);
  const newId = Math.max(0, ...techs.map((t) => Number(t.id) || 0)) + 1;
  const newTech = {
    id: newId,
    name: trimmed,
    level: "intermediate",
    url: "",
    desc: "",
    years: null,
    featured: false,
    sortOrder: newId,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (defaultCat != null) {
    newTech.categoryId = defaultCat;
  }
  await storage.set("pa_technologies", techs.concat(newTech));
  storage.invalidate("pa_recent_activities");
  return newTech;
}

// client/utils/toolResolve.ts
async function resolveToolByName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return null;
  storage.invalidate("pa_tools");
  let tools = await storage.get("pa_tools", []);
  if (!Array.isArray(tools)) tools = [];
  const hit = tools.find((t) => String(t.name || "").toLowerCase() === trimmed.toLowerCase());
  if (hit) return hit;
  const categories = await loadToolCategories();
  const defaultCat = defaultTechnologyCategoryId(categories);
  if (defaultCat == null) return null;
  const newId = Math.max(0, ...tools.map((t) => Number(t.id) || 0)) + 1;
  const newTool = {
    id: newId,
    name: trimmed,
    categoryId: defaultCat,
    iconClass: "ri-checkbox-blank-circle-line",
    iconUrl: "",
    sortOrder: newId,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await storage.set("pa_tools", tools.concat(newTool));
  storage.invalidate("pa_recent_activities");
  return newTool;
}

// client/utils/stackResolve.ts
function toStackItem(kind, row) {
  return { kind, id: Number(row.id), name: String(row.name) };
}
async function resolveStackItemByName(name, preferredKind) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  const catalog = await loadStackCatalog();
  const techHit = catalog.find((i) => i.kind === "technology" && i.name.toLowerCase() === lower);
  const toolHit = catalog.find((i) => i.kind === "tool" && i.name.toLowerCase() === lower);
  if (techHit && toolHit) {
    if (preferredKind === "tool") return toolHit;
    if (preferredKind === "technology") return techHit;
    return techHit;
  }
  if (toolHit) return toolHit;
  if (techHit) return techHit;
  storage.invalidate("pa_tools");
  storage.invalidate("pa_technologies");
  const [tools, technologies] = await Promise.all([
    storage.get("pa_tools", []),
    storage.get("pa_technologies", [])
  ]);
  const toolRow = (Array.isArray(tools) ? tools : []).find(
    (t) => String(t.name || "").toLowerCase() === lower
  );
  const techRow = (Array.isArray(technologies) ? technologies : []).find(
    (t) => String(t.name || "").toLowerCase() === lower
  );
  if (toolRow) return toStackItem("tool", toolRow);
  if (techRow) return toStackItem("technology", techRow);
  if (preferredKind === "tool") {
    const created = await resolveToolByName(trimmed);
    return created ? toStackItem("tool", created) : null;
  }
  if (preferredKind === "technology") {
    const created = await resolveTechnologyByName(trimmed);
    return created ? toStackItem("technology", created) : null;
  }
  return null;
}
async function resolveProjectStackFromChips(container, options = {}) {
  const technologies = [];
  const tools = [];
  if (!container) return { technologies, tools };
  for (const chip of Array.from(container.children)) {
    const el = chip;
    const kind = el.dataset.chipKind === "tool" ? "tool" : "technology";
    const name = String(el.dataset.value || "").trim();
    if (!name) continue;
    if (el.dataset.pending === "true") {
      const created = await resolveStackItemByName(name, kind);
      if (!created) {
        options.onCreateFailed?.(`Could not save "${name}". Add a tool category under Tech & Tools if needed.`);
        throw new Error("stack-resolve-failed");
      }
      options.onItemCreated?.(created);
      if (kind === "tool") tools.push(created.id);
      else technologies.push(created.id);
      continue;
    }
    const id = Number(el.dataset.legacyId);
    if (Number.isNaN(id)) continue;
    if (kind === "tool") tools.push(id);
    else technologies.push(id);
  }
  return { technologies, tools };
}

// client/utils/stackKindPrompt.ts
var activeOverlay = null;
function removeOverlay() {
  activeOverlay?.remove();
  activeOverlay = null;
}
function promptStackKind(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return Promise.resolve(null);
  return new Promise((resolve) => {
    removeOverlay();
    const overlay = document.createElement("div");
    overlay.className = "pa-confirm-overlay visible pa-stack-kind-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <div class="pa-confirm-box" role="dialog" aria-modal="true" aria-labelledby="paStackKindTitle">
        <div class="pa-confirm-icon pa-confirm-icon--warning">
          <i class="ri-question-line" aria-hidden="true"></i>
        </div>
        <div class="pa-confirm-title" id="paStackKindTitle">Add "${escapeHtml(trimmed)}" as</div>
        <div class="pa-confirm-text">This name was not found in Tools or Technologies. Choose where to save it.</div>
        <div class="pa-confirm-actions pa-stack-kind-actions">
          <button type="button" class="pa-btn pa-btn-cancel flex-1" data-stack-kind-cancel>Cancel</button>
          <button type="button" class="pa-btn pa-btn-secondary flex-1" data-stack-kind="tool">Tool</button>
          <button type="button" class="pa-btn pa-btn-primary flex-1" data-stack-kind="technology">Technology</button>
        </div>
      </div>
    `;
    const finish = (kind) => {
      removeOverlay();
      resolve(kind);
    };
    overlay.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest("[data-stack-kind-cancel]")) {
        finish(null);
        return;
      }
      const btn = target.closest("[data-stack-kind]");
      if (!btn) return;
      const kind = btn.getAttribute("data-stack-kind");
      if (kind === "tool" || kind === "technology") finish(kind);
    });
    document.body.appendChild(overlay);
    activeOverlay = overlay;
    overlay.querySelector('[data-stack-kind="technology"]')?.focus();
  });
}

// client/utils/technologySuggest.ts
var MAX_SUGGESTIONS = 8;
function selectedKeys(chipsEl) {
  return new Set(
    getStackChipSelections(chipsEl).map((row) => {
      if (row.pending) return `${row.kind}:pending:${row.name.toLowerCase()}`;
      return `${row.kind}:${row.id}`;
    })
  );
}
function kindLabel(kind) {
  return kind === "tool" ? "Tool" : "Technology";
}
function bindTechnologySuggest(inputEl, chipsEl, listEl, options = {}) {
  if (!inputEl || !chipsEl || !listEl) return null;
  let catalog = [];
  let visible = [];
  let highlight = -1;
  let hideTimer = null;
  let floating = null;
  const wrap = inputEl.closest(".pa-tech-suggest") || inputEl.parentElement;
  if (!listEl.id) {
    listEl.id = `pa-tech-suggest-${Math.random().toString(36).slice(2, 9)}`;
  }
  async function refreshCatalog() {
    catalog = await loadStackCatalog();
  }
  function positionList() {
    if (listEl.hidden) return;
    if (!floating) {
      floating = mountFloatingLayer(listEl, inputEl, { maxHeight: 220, align: "match-width" });
    } else {
      floating.reposition();
    }
    inputEl.setAttribute("aria-expanded", "true");
  }
  function renderSuggestionList(items, highlightIndex) {
    if (!items.length) {
      listEl.hidden = true;
      listEl.innerHTML = "";
      floating?.release();
      floating = null;
      inputEl.setAttribute("aria-expanded", "false");
      return;
    }
    listEl.hidden = false;
    listEl.innerHTML = items.map((item, i) => {
      const active = i === highlightIndex ? " active" : "";
      const name = escapeHtml(item.name || "");
      const badge = escapeHtml(kindLabel(item.kind));
      return `<button type="button" class="pa-tech-suggest-item${active}" role="option" aria-selected="${i === highlightIndex}" data-chip-kind="${escapeHtml(item.kind)}" data-legacy-id="${escapeHtml(String(item.id))}"><span class="pa-tech-suggest-name">${name}</span><span class="pa-tech-suggest-kind">${badge}</span></button>`;
    }).join("");
    requestAnimationFrame(() => positionList());
  }
  function hideList() {
    floating?.release();
    floating = null;
    listEl.hidden = true;
    listEl.innerHTML = "";
    highlight = -1;
    visible = [];
    inputEl.setAttribute("aria-expanded", "false");
  }
  function filterVisible(query) {
    const q = query.trim().toLowerCase();
    const taken = selectedKeys(chipsEl);
    visible = catalog.filter((item) => !taken.has(`${item.kind}:${item.id}`)).filter((item) => !taken.has(`${item.kind}:pending:${String(item.name).toLowerCase()}`)).filter((item) => !q || String(item.name).toLowerCase().includes(q)).slice(0, MAX_SUGGESTIONS);
    highlight = visible.length ? 0 : -1;
    renderSuggestionList(visible, highlight);
  }
  function scheduleHide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => hideList(), 180);
  }
  function cancelHide() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }
  function pickItem(item) {
    if (!item) return;
    addStackChip(chipsEl, item.kind, item.id, item.name);
    inputEl.value = "";
    hideList();
    inputEl.focus();
  }
  async function commitSingleFreeText(raw, { useSuggestion = true } = {}) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    const exactTech = catalog.find((i) => i.kind === "technology" && i.name.toLowerCase() === lower);
    const exactTool = catalog.find((i) => i.kind === "tool" && i.name.toLowerCase() === lower);
    if (exactTech && exactTool) {
      pickItem(highlight >= 0 && visible[highlight] ? visible[highlight] : exactTech);
      return;
    }
    if (exactTool) {
      pickItem(exactTool);
      return;
    }
    if (exactTech) {
      pickItem(exactTech);
      return;
    }
    if (useSuggestion && highlight >= 0 && visible[highlight]) {
      pickItem(visible[highlight]);
      return;
    }
    try {
      const kind = await promptStackKind(trimmed);
      if (!kind) return;
      if (options.deferStackPersist !== false) {
        addPendingStackChip(chipsEl, kind, trimmed);
        inputEl.value = "";
        hideList();
        inputEl.focus();
        return;
      }
      const created = await resolveStackItemByName(trimmed, kind);
      if (created) {
        options.onStackItemCreated?.(created);
        await refreshCatalog();
        pickItem(created);
        return;
      }
      options.onCreateFailed?.("Could not add item. Add a tool category under Tech & Tools first.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not save item.";
      options.onCreateFailed?.(msg);
    }
  }
  async function commitFreeText() {
    const parts = splitChipInputItems(inputEl.value);
    if (!parts.length) return;
    inputEl.value = "";
    hideList();
    highlight = -1;
    for (const part of parts) {
      await commitSingleFreeText(part, { useSuggestion: false });
    }
  }
  function onInput() {
    cancelHide();
    filterVisible(inputEl.value);
  }
  function onFocus() {
    cancelHide();
    void refreshCatalog().then(() => filterVisible(inputEl.value));
  }
  function onBlur() {
    scheduleHide();
  }
  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!visible.length) {
        void refreshCatalog().then(() => {
          filterVisible(inputEl.value);
          if (visible.length) highlight = 0;
          renderSuggestionList(visible, highlight);
        });
        return;
      }
      highlight = Math.min(visible.length - 1, highlight + 1);
      renderSuggestionList(visible, highlight);
      return;
    }
    if (e.key === "ArrowUp") {
      if (!visible.length) return;
      e.preventDefault();
      highlight = Math.max(0, highlight - 1);
      renderSuggestionList(visible, highlight);
      return;
    }
    if (e.key === "Escape") {
      hideList();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      void commitFreeText();
      return;
    }
    if (e.key === ",") {
      e.preventDefault();
      const piece = inputEl.value.trim();
      if (!piece) return;
      inputEl.value = "";
      hideList();
      void commitSingleFreeText(piece);
      return;
    }
  }
  function onPaste(e) {
    const pasted = e.clipboardData?.getData("text/plain") ?? "";
    if (!pasted.includes(",")) return;
    e.preventDefault();
    const combined = `${inputEl.value}${pasted}`;
    inputEl.value = combined;
    void commitFreeText();
  }
  function onListMouseDown(e) {
    e.preventDefault();
    cancelHide();
  }
  function onListClick(e) {
    const btn = e.target.closest(".pa-tech-suggest-item");
    if (!btn) return;
    const kind = btn.getAttribute("data-chip-kind") === "tool" ? "tool" : "technology";
    const id = Number(btn.getAttribute("data-legacy-id"));
    const item = catalog.find((i) => i.kind === kind && Number(i.id) === id) || visible.find((i) => i.kind === kind && Number(i.id) === id);
    if (item) pickItem(item);
  }
  function onDocClick(e) {
    const t = e.target;
    if (!(t instanceof Node)) return;
    if (wrap?.contains(t) || listEl.contains(t)) return;
    if (t instanceof Element && t.closest(".pa-tech-suggest-list, .pa-tech-suggest-item")) return;
    hideList();
  }
  inputEl.setAttribute("autocomplete", "off");
  inputEl.setAttribute("role", "combobox");
  inputEl.setAttribute("aria-expanded", "false");
  inputEl.setAttribute("aria-controls", listEl.id);
  listEl.setAttribute("role", "listbox");
  inputEl.addEventListener("input", onInput);
  inputEl.addEventListener("focus", onFocus);
  inputEl.addEventListener("blur", onBlur);
  inputEl.addEventListener("keydown", onKeyDown);
  inputEl.addEventListener("paste", onPaste);
  listEl.addEventListener("mousedown", onListMouseDown);
  listEl.addEventListener("click", onListClick);
  document.addEventListener("click", onDocClick, true);
  void refreshCatalog();
  return {
    refreshCatalog,
    commit: commitFreeText,
    destroy: () => {
      inputEl.removeEventListener("input", onInput);
      inputEl.removeEventListener("focus", onFocus);
      inputEl.removeEventListener("blur", onBlur);
      inputEl.removeEventListener("keydown", onKeyDown);
      inputEl.removeEventListener("paste", onPaste);
      listEl.removeEventListener("mousedown", onListMouseDown);
      listEl.removeEventListener("click", onListClick);
      document.removeEventListener("click", onDocClick, true);
      if (hideTimer) clearTimeout(hideTimer);
      hideList();
    }
  };
}

export {
  resolveProjectStackFromChips,
  bindTechnologySuggest
};
//# sourceMappingURL=chunk-M3AC2I27.js.map
