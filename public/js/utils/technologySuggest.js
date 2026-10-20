import { escapeHtml } from "./dom.js";
import { mountFloatingLayer } from "./floatingLayer.js";
import {
  addPendingStackChip,
  addStackChip,
  getStackChipSelections,
  splitChipInputItems
} from "./chips.js";
import { loadStackCatalog } from "./stackCatalog.js";
import { resolveStackItemByName } from "./stackResolve.js";
import { promptStackKind } from "./stackKindPrompt.js";
const MAX_SUGGESTIONS = 8;
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
  bindTechnologySuggest
};
//# sourceMappingURL=technologySuggest.js.map
