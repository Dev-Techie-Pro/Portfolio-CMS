import {
  bindTechnologySuggest,
  resolveProjectStackFromChips
} from "./chunk-IBKEZKLB.js";
import {
  getTechChipLegacyIds,
  populateTechChips
} from "./chunk-JFWNZ4BR.js";
import "./chunk-777AU2J4.js";
import {
  renderPaCatCard,
  renderPaCatListRow
} from "./chunk-V7ZPEMLL.js";
import {
  CrudCardModule
} from "./chunk-32QF3LCW.js";
import {
  setStatTrend,
  setStatValue
} from "./chunk-NAHW6JXX.js";
import "./chunk-25T6YHMS.js";
import "./chunk-VXJMB3CY.js";
import {
  categoryKeyFromAccentHex
} from "./chunk-FRUJZYET.js";
import "./chunk-PD6FJZHW.js";
import "./chunk-6FXKQLBA.js";
import {
  formatMonthYear,
  parseSortInput,
  sortByNewestFirst
} from "./chunk-JWEJ6YLS.js";
import "./chunk-WNHYA5Z5.js";
import {
  PAGE
} from "./chunk-47N5NP2E.js";
import "./chunk-IZ7T64RP.js";
import "./chunk-UHXU6UPR.js";
import {
  storage
} from "./chunk-7KTA4S5K.js";
import {
  activateTab,
  canManageContent,
  openPanel
} from "./chunk-FTMH3SUW.js";
import "./chunk-HWSNCMVP.js";
import {
  $id,
  escapeHtml
} from "./chunk-HFEWIT3P.js";
import "./chunk-MTDZJ6X7.js";

// client/utils/expHighlightsForm.ts
var EXP_HIGHLIGHT_MAX_ACH = 3;
var EXP_HIGHLIGHT_MAX_IMPACT = 3;
function achievementRowHtml(prefix, index, value = "", canRemove) {
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
      ${canRemove ? `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm pa-exp-dynamic-row__remove" data-exp-remove-achievement aria-label="Remove achievement"><i class="ri-close-line"></i></button>` : ""}
    </div>`;
}
function impactRowHtml(prefix, index, value = "", label = "", canRemove) {
  const valueId = `${prefix}Impact${index}Value`;
  const labelId = `${prefix}Impact${index}Label`;
  return `
    <div class="pa-exp-dynamic-row pa-exp-dynamic-row--impact" data-exp-impact-row="${index}">
      <div class="pa-exp-dynamic-row__impact-fields">
        <div class="pa-form-group">
          <label class="pa-form-label" for="${valueId}">Impact ${index + 1} \u2014 value</label>
          <input class="pa-form-input" type="text" id="${valueId}" value="${escapeHtml(value)}" placeholder="e.g. 10+" maxlength="24" />
        </div>
        <div class="pa-form-group">
          <label class="pa-form-label" for="${labelId}">Impact ${index + 1} \u2014 label</label>
          <input class="pa-form-input" type="text" id="${labelId}" value="${escapeHtml(label)}" placeholder="Max 3 words" maxlength="48" data-exp-word-max="3" />
          <div class="pa-form-error-msg" id="${labelId}Error">
            <i class="ri-error-warning-line"></i> Max 3 words
          </div>
        </div>
      </div>
      ${canRemove ? `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm pa-exp-dynamic-row__remove" data-exp-remove-impact aria-label="Remove impact"><i class="ri-close-line"></i></button>` : ""}
    </div>`;
}

// client/utils/expHighlightsSuggest.ts
var MAX_ACH = 3;
var MAX_IMPACT = 3;
var MAX_ACH_WORDS = 20;
var MAX_LABEL_WORDS = 3;
function trimWords(text, maxWords) {
  const parts = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length <= maxWords) return parts.join(" ");
  return parts.slice(0, maxWords).join(" ");
}
function sentencesFromDesc(desc) {
  return String(desc || "").split(/(?<=[.!?])\s+|\n+/).map((s) => s.replace(/^[\s\-•]+/, "").trim()).filter((s) => s.length >= 12);
}
function suggestExperienceHighlights(details) {
  const desc = details.desc || "";
  const sentences = sentencesFromDesc(desc);
  const achievements = [];
  for (const sentence of sentences) {
    if (achievements.length >= MAX_ACH) break;
    const line = trimWords(sentence, MAX_ACH_WORDS);
    if (line.length >= 12) achievements.push(line);
  }
  if (!achievements.length && desc.trim()) {
    achievements.push(trimWords(desc, MAX_ACH_WORDS));
  }
  if (!achievements.length && details.title) {
    achievements.push(
      trimWords(`Delivered results as ${details.title} at ${details.company || "the company"}`, MAX_ACH_WORDS)
    );
  }
  const impacts = [];
  const pctMatches = desc.match(/\d+(?:\.\d+)?%/g) || [];
  pctMatches.slice(0, 2).forEach((value) => {
    impacts.push({ value, label: trimWords("Performance improvement", MAX_LABEL_WORDS) });
  });
  const plusMatches = desc.match(/\d+\+/g) || [];
  plusMatches.slice(0, MAX_IMPACT - impacts.length).forEach((value) => {
    impacts.push({ value, label: trimWords("Items delivered", MAX_LABEL_WORDS) });
  });
  if (details.teamSize && impacts.length < MAX_IMPACT) {
    const team = details.teamSize.trim();
    impacts.push({ value: team.replace(/\s*members?/i, "").trim() || team, label: "Team size" });
  }
  if (details.domain && impacts.length < MAX_IMPACT) {
    impacts.push({ value: "Core", label: trimWords(details.domain, MAX_LABEL_WORDS) });
  }
  if (!impacts.length) {
    impacts.push({ value: "100%", label: "Delivery focus" });
  }
  return {
    achievements: achievements.slice(0, MAX_ACH),
    impacts: impacts.slice(0, MAX_IMPACT)
  };
}

// client/modules/experience/ExperienceModule.ts
var EXP_TYPE_META = {
  "full-time": { label: "Full-time", icon: "ri-briefcase-line", color: "#60a5fa" },
  "part-time": { label: "Part-time", icon: "ri-time-line", color: "#34d399" },
  contract: { label: "Contract", icon: "ri-file-list-3-line", color: "#fb923c" },
  freelance: { label: "Freelance", icon: "ri-quill-pen-line", color: "#a78bfa" },
  internship: { label: "Internship", icon: "ri-graduation-cap-line", color: "#f472b6" }
};
var SEED_EXPERIENCE = [];
function countWords(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}
var ExperienceModule = class extends CrudCardModule {
  constructor() {
    super({
      name: "Experience",
      storageKey: "pa_experience",
      deleteType: "experience",
      page: "experience",
      pageSize: 9,
      listTable: true,
      cardIdAttr: "data-exp-id",
      bulkLabel: "experience entry",
      defaultFilters: { type: "all" },
      filterSelectIds: [{ id: "paExpTypeFilter", key: "type" }],
      addFocusId: "expAddCompany",
      editFocusId: "expEditCompany",
      ids: {
        grid: "paExpGrid",
        resultCount: "paExpResultCount",
        paginationBtns: "paExpPaginationBtns",
        paginationInfo: "paExpPaginationInfo",
        pagePrev: "paExpPagePrev",
        pageNext: "paExpPageNext",
        bodyScroll: "paExpBody",
        emptyResetBtn: "paExpEmptyResetBtn",
        emptyAddBtn: "paExpEmptyAddBtn",
        addPanel: "paExpAddPanel",
        editPanel: "paExpEditPanel",
        addSubmit: "paExpAddSubmit",
        editSubmit: "paExpEditSubmit",
        editDelete: "paExpEditDelete",
        addNewBtn: "paExpAddNewBtn",
        addPanelClose: "paExpAddPanelClose",
        editPanelClose: "paExpEditPanelClose",
        addCancel: "paExpAddCancel",
        editCancel: "paExpEditCancel"
      },
      menuActions: { "copy-title": function copyTitle(id) {
        this.copyTitle(id);
      } }
    });
    this.technologiesCatalog = [];
    this.addTechSuggest = null;
    this.editTechSuggest = null;
  }
  async init() {
    await super.init();
    this.technologiesCatalog = await storage.get("pa_technologies", []);
    this.setupTechSuggest("expAdd", "add");
    this.setupTechSuggest("expEdit", "edit");
  }
  techSuggestOptions() {
    return {
      onStackItemCreated: (item) => {
        if (item.kind === "technology") {
          this.toast(`"${item.name}" added to Technologies.`, "success", 3500);
          void this.refreshTechnologiesCatalog();
        }
      },
      onCreateFailed: (msg) => this.toast(msg, "danger")
    };
  }
  async refreshTechnologiesCatalog() {
    this.technologiesCatalog = await storage.get("pa_technologies", []);
    await this.addTechSuggest?.refreshCatalog();
    await this.editTechSuggest?.refreshCatalog();
  }
  setupTechSuggest(prefix, mode) {
    const binding = bindTechnologySuggest(
      $id(`${prefix}TechInput`),
      $id(`${prefix}TechChips`),
      $id(`${prefix}TechSuggestList`),
      this.techSuggestOptions()
    );
    if (mode === "add") this.addTechSuggest = binding;
    else this.editTechSuggest = binding;
    const addBtn = $id(`${prefix}TechAddBtn`);
    if (addBtn) {
      this.on(addBtn, "click", () => {
        void binding?.commit();
      });
    }
  }
  seedData() {
    return [];
  }
  sortRecords(records) {
    return sortByNewestFirst(records);
  }
  matchesFilters(record, filters) {
    return filters.type === "all" || record.type === filters.type;
  }
  matchesSearch(record, query) {
    const q = query.trim().toLowerCase();
    return record.title.toLowerCase().includes(q) || (record.company || "").toLowerCase().includes(q) || (record.location || "").toLowerCase().includes(q) || (record.domain || "").toLowerCase().includes(q) || (record.desc || "").toLowerCase().includes(q);
  }
  getDeleteName(record) {
    return record.title;
  }
  renderStats() {
    const records = this.store.get("records");
    setStatValue("paExpStatTotal", records.length);
    setStatValue("paExpStatCurrent", records.filter((e) => e.current).length);
    setStatValue("paExpStatFullTime", records.filter((e) => e.type === "full-time").length);
    setStatValue("paExpStatOther", records.filter((e) => e.type && e.type !== "full-time").length);
    setStatTrend("paExpStatTotalTrend", records);
    setStatTrend("paExpStatCurrentTrend", records, (e) => e.current);
    setStatTrend("paExpStatFullTimeTrend", records, (e) => e.type === "full-time");
    setStatTrend("paExpStatOtherTrend", records, (e) => e.type && e.type !== "full-time");
  }
  renderCardMenu(e) {
    const id = escapeHtml(String(e.id));
    const title = escapeHtml(e.title);
    return `<div class="pa-card-menu" data-exp-id="${id}">
      <div class="pa-card-menu-item" data-action="duplicate" data-exp-id="${id}"><i class="ri-file-copy-line"></i> Duplicate</div>
      <div class="pa-card-menu-item" data-action="copy-title" data-exp-id="${id}"><i class="ri-clipboard-line"></i> Copy title</div>
    </div>`;
  }
  renderListRow(e, rowIndex) {
    const tm = EXP_TYPE_META[e.type] || EXP_TYPE_META["full-time"];
    const dateRange = `${formatMonthYear(e.startDate)} \u2014 ${e.current ? "Present" : formatMonthYear(e.endDate) || "\u2014"}`;
    return renderPaCatListRow({
      rowIndex,
      idAttr: "data-exp-id",
      id: e.id,
      iconHtml: `<i class="${escapeHtml(tm.icon)}"></i>`,
      title: e.title,
      category: e.company || "\u2014",
      status: e.current ? "Active" : "Completed",
      created: dateRange,
      cardClass: this.bulkSelect?.cardClass(e.id) || ""
    });
  }
  renderCard(e, index) {
    const tm = EXP_TYPE_META[e.type] || EXP_TYPE_META["full-time"];
    const dateRange = `${formatMonthYear(e.startDate)} \u2014 ${e.current ? "Present" : formatMonthYear(e.endDate) || "\u2014"}`;
    const badge = e.current ? '<span class="pa-cat-card__builtin">Current</span>' : "";
    const meta = [e.domain, e.mode].filter(Boolean).join(" \xB7 ");
    return renderPaCatCard({
      idAttr: "data-exp-id",
      id: e.id,
      catKey: categoryKeyFromAccentHex(tm.color),
      cardClass: this.bulkSelect?.cardClass(e.id) || "",
      animationDelay: 0,
      bulkCheckbox: this.bulkSelect?.checkboxHtml(e.id, `Select ${escapeHtml(e.title)}`) || "",
      iconHtml: `<i class="${escapeHtml(tm.icon)}"></i>`,
      badge,
      title: e.title,
      slug: e.company || "\u2014",
      desc: e.desc || meta || "",
      countIcon: "ri-calendar-line",
      countLabel: dateRange,
      status: tm.label,
      dateLabel: e.location ? "Location" : "Period",
      dateValue: e.location || dateRange,
      menuHtml: this.renderCardMenu(e)
    });
  }
  copyTitle(id) {
    const e = this.findById(id);
    if (!e) return;
    navigator.clipboard?.writeText(e.title).then(() => this.toast("Title copied to clipboard", "success"));
  }
  buildDuplicate(record, newId) {
    return { ...record, id: newId, title: `${record.title} (Copy)` };
  }
  openAddPanel() {
    this.resetAddForm();
    openPanel(this.config.ids.addPanel, [this.config.ids.editPanel]);
    activateTab("expAdd", "details");
    setTimeout(() => $id("expAddCompany")?.focus(), 320);
  }
  openEditPanel(id) {
    const record = this.findById(id);
    if (!record) return;
    this.currentEditId = id;
    this.populateEditForm(record);
    openPanel(this.config.ids.editPanel, [this.config.ids.addPanel]);
    activateTab("expEdit", "details");
    setTimeout(() => $id("expEditCompany")?.focus(), 320);
  }
  bindEvents() {
    super.bindEvents();
    ["expAddCurrent", "expEditCurrent"].forEach((id) => {
      this.on($id(id), "change", (e) => {
        const prefix = id.replace("Current", "");
        const endDateGroup = $id(`${prefix}EndDateGroup`);
        if (endDateGroup) endDateGroup.style.display = e.target.value === "1" ? "none" : "block";
      });
    });
    this.bindHighlightListEvents("expAdd");
    this.bindHighlightListEvents("expEdit");
    this.renderAchievementsList("expAdd", [""]);
    this.renderImpactsList("expAdd", [{ value: "", label: "" }]);
  }
  bindHighlightListEvents(prefix) {
    const achAdd = $id(`${prefix}AchievementAdd`);
    const impactAdd = $id(`${prefix}ImpactAdd`);
    const suggest = $id(`${prefix}SuggestHighlights`);
    const achList = $id(`${prefix}AchievementsList`);
    const impactList = $id(`${prefix}ImpactsList`);
    if (achAdd) {
      this.on(achAdd, "click", () => {
        const values = this.collectAchievementValues(prefix);
        if (values.length >= EXP_HIGHLIGHT_MAX_ACH) {
          this.toast(`You can add up to ${EXP_HIGHLIGHT_MAX_ACH} achievements`, "info");
          return;
        }
        values.push("");
        this.renderAchievementsList(prefix, values);
      });
    }
    if (impactAdd) {
      this.on(impactAdd, "click", () => {
        const rows = this.collectImpactValues(prefix);
        if (rows.length >= EXP_HIGHLIGHT_MAX_IMPACT) {
          this.toast(`You can add up to ${EXP_HIGHLIGHT_MAX_IMPACT} impact metrics`, "info");
          return;
        }
        rows.push({ value: "", label: "" });
        this.renderImpactsList(prefix, rows);
      });
    }
    if (suggest) {
      this.on(suggest, "click", () => this.suggestHighlightsFromDetails(prefix));
    }
    if (achList) {
      this.on(achList, "click", (e) => {
        const btn = e.target.closest("[data-exp-remove-achievement]");
        if (!btn) return;
        const values = this.collectAchievementValues(prefix);
        if (values.length <= 1) return;
        const row = btn.closest("[data-exp-achievement-row]");
        const idx = Number(row?.getAttribute("data-exp-achievement-row"));
        if (!Number.isNaN(idx)) values.splice(idx, 1);
        else values.pop();
        this.renderAchievementsList(prefix, values.length ? values : [""]);
      });
    }
    if (impactList) {
      this.on(impactList, "click", (e) => {
        const btn = e.target.closest("[data-exp-remove-impact]");
        if (!btn) return;
        const rows = this.collectImpactValues(prefix);
        if (rows.length <= 1) return;
        const row = btn.closest("[data-exp-impact-row]");
        const idx = Number(row?.getAttribute("data-exp-impact-row"));
        if (!Number.isNaN(idx)) rows.splice(idx, 1);
        else rows.pop();
        this.renderImpactsList(prefix, rows.length ? rows : [{ value: "", label: "" }]);
      });
    }
  }
  collectAchievementValues(prefix) {
    const list = $id(`${prefix}AchievementsList`);
    if (!list) return [];
    return Array.from(list.querySelectorAll("input")).map((el) => el.value);
  }
  collectImpactValues(prefix) {
    const list = $id(`${prefix}ImpactsList`);
    if (!list) return [];
    return Array.from(list.querySelectorAll("[data-exp-impact-row]")).map((row) => ({
      value: row.querySelector('[id$="Value"]')?.value || "",
      label: row.querySelector('[id$="Label"]')?.value || ""
    }));
  }
  renderAchievementsList(prefix, values) {
    const list = $id(`${prefix}AchievementsList`);
    const addBtn = $id(`${prefix}AchievementAdd`);
    if (!list) return;
    const items = (values.length ? values : [""]).slice(0, EXP_HIGHLIGHT_MAX_ACH);
    list.innerHTML = items.map((value, index) => achievementRowHtml(prefix, index, value, items.length > 1)).join("");
    if (addBtn) addBtn.disabled = items.length >= EXP_HIGHLIGHT_MAX_ACH;
  }
  renderImpactsList(prefix, rows) {
    const list = $id(`${prefix}ImpactsList`);
    const addBtn = $id(`${prefix}ImpactAdd`);
    if (!list) return;
    const items = (rows.length ? rows : [{ value: "", label: "" }]).slice(0, EXP_HIGHLIGHT_MAX_IMPACT);
    list.innerHTML = items.map((row, index) => impactRowHtml(prefix, index, row.value, row.label, items.length > 1)).join("");
    if (addBtn) addBtn.disabled = items.length >= EXP_HIGHLIGHT_MAX_IMPACT;
  }
  suggestHighlightsFromDetails(prefix) {
    const desc = ($id(`${prefix}Desc`)?.value || "").trim();
    const title = ($id(`${prefix}Title`)?.value || "").trim();
    const company = ($id(`${prefix}Company`)?.value || "").trim();
    if (!desc && !title) {
      this.toast("Add a role and description on the Details tab first", "info");
      activateTab(prefix, "details");
      return;
    }
    const suggested = suggestExperienceHighlights({
      title,
      company,
      domain: ($id(`${prefix}Domain`)?.value || "").trim(),
      teamSize: ($id(`${prefix}TeamSize`)?.value || "").trim(),
      desc
    });
    this.renderAchievementsList(
      prefix,
      suggested.achievements.length ? suggested.achievements : [""]
    );
    this.renderImpactsList(
      prefix,
      suggested.impacts.length ? suggested.impacts : [{ value: "", label: "" }]
    );
    activateTab(prefix, "highlights");
    this.toast("Suggestions added \u2014 review and edit before saving", "success");
  }
  clearExtendedFields(prefix) {
    ["Mode", "TeamSize", "Domain"].forEach((f) => {
      const el = $id(`${prefix}${f}`);
      if (el) el.value = "";
    });
    this.renderAchievementsList(prefix, [""]);
    this.renderImpactsList(prefix, [{ value: "", label: "" }]);
    const chips = $id(`${prefix}TechChips`);
    if (chips) chips.innerHTML = "";
    const techInput = $id(`${prefix}TechInput`);
    if (techInput) techInput.value = "";
  }
  resetAddForm() {
    ["expAddTitle", "expAddCompany", "expAddLocation", "expAddStartDate", "expAddEndDate", "expAddDesc", "expAddSort"].forEach((id) => {
      const el = $id(id);
      if (el) el.value = "";
    });
    $id("expAddType").value = "";
    $id("expAddCurrent").value = "0";
    const endGroup = $id("expAddEndDateGroup");
    if (endGroup) endGroup.style.display = "block";
    this.clearExtendedFields("expAdd");
    ["Title", "Company", "Type", "StartDate"].forEach((f) => {
      $id(`expAdd${f}Error`)?.classList.remove("visible");
      $id(`expAdd${f}`)?.classList.remove("error");
    });
    const descCount = $id("expAddDescCount");
    if (descCount) descCount.textContent = "0";
  }
  populateEditForm(e) {
    $id("expEditTitle").value = e.title;
    $id("expEditCompany").value = e.company;
    $id("expEditLocation").value = e.location || "";
    $id("expEditType").value = e.type;
    $id("expEditMode").value = e.mode || "";
    $id("expEditTeamSize").value = e.teamSize || "";
    $id("expEditDomain").value = e.domain || "";
    $id("expEditStartDate").value = e.startDate;
    $id("expEditEndDate").value = e.endDate || "";
    $id("expEditCurrent").value = e.current ? "1" : "0";
    $id("expEditDesc").value = e.desc || "";
    $id("expEditSort").value = e.sortOrder != null ? String(e.sortOrder) : "";
    const endGroup = $id("expEditEndDateGroup");
    if (endGroup) endGroup.style.display = e.current ? "none" : "block";
    const achievements = (e.achievements || []).slice(0, EXP_HIGHLIGHT_MAX_ACH);
    this.renderAchievementsList("expEdit", achievements.length ? achievements : [""]);
    const impacts = (e.impacts || []).slice(0, EXP_HIGHLIGHT_MAX_IMPACT);
    this.renderImpactsList(
      "expEdit",
      impacts.length ? impacts : [{ value: "", label: "" }]
    );
    populateTechChips($id("expEditTechChips"), this.technologiesCatalog, e.technologies || []);
    const descCount = $id("expEditDescCount");
    if (descCount) descCount.textContent = String((e.desc || "").length);
    ["Title", "Company", "Type", "StartDate"].forEach((f) => {
      $id(`expEdit${f}Error`)?.classList.remove("visible");
      $id(`expEdit${f}`)?.classList.remove("error");
    });
  }
  readAchievements(prefix) {
    return this.collectAchievementValues(prefix).map((val) => val.trim()).filter(Boolean).slice(0, EXP_HIGHLIGHT_MAX_ACH);
  }
  readImpacts(prefix) {
    return this.collectImpactValues(prefix).map((row) => ({
      value: String(row.value || "").trim(),
      label: String(row.label || "").trim()
    })).filter((row) => row.value || row.label).slice(0, EXP_HIGHLIGHT_MAX_IMPACT);
  }
  validateWordLimits(prefix) {
    let valid = true;
    const achList = $id(`${prefix}AchievementsList`);
    if (achList) {
      achList.querySelectorAll("input").forEach((input) => {
        const max = Number(input.dataset.expWordMax || 20);
        const tooMany = countWords(input.value) > max;
        const id = input.id;
        if (id) this._err(id, tooMany);
        if (tooMany) valid = false;
      });
    }
    const impactList = $id(`${prefix}ImpactsList`);
    if (impactList) {
      impactList.querySelectorAll("input[data-exp-word-max]").forEach((input) => {
        const max = Number(input.dataset.expWordMax || 3);
        const tooMany = countWords(input.value) > max;
        const id = input.id;
        if (id) this._err(id, tooMany);
        if (tooMany) valid = false;
      });
    }
    return valid;
  }
  validateForm(prefix) {
    let valid = true;
    const p = prefix === "add" ? "expAdd" : "expEdit";
    const title = $id(`${p}Title`).value.trim();
    this._err(`${p}Title`, !title);
    if (!title) valid = false;
    const company = $id(`${p}Company`).value.trim();
    this._err(`${p}Company`, !company);
    if (!company) valid = false;
    const type = $id(`${p}Type`).value;
    this._err(`${p}Type`, !type);
    if (!type) valid = false;
    const startDate = $id(`${p}StartDate`).value;
    this._err(`${p}StartDate`, !startDate);
    if (!startDate) valid = false;
    if (!this.validateWordLimits(p)) valid = false;
    if (!valid) {
      if (!title || !company || !type) activateTab(p, "details");
      else if (!startDate) activateTab(p, "dates");
      else activateTab(p, "highlights");
    }
    return { valid, title, company, type, startDate };
  }
  _err(id, isError) {
    $id(id)?.classList.toggle("error", isError);
    $id(`${id}Error`)?.classList.toggle("visible", isError);
  }
  readCommonFields(prefix, f) {
    const current = $id(`${prefix}Current`).value === "1";
    return {
      title: f.title,
      company: f.company,
      location: $id(`${prefix}Location`).value.trim(),
      type: f.type,
      mode: $id(`${prefix}Mode`).value || "",
      teamSize: $id(`${prefix}TeamSize`).value.trim(),
      domain: $id(`${prefix}Domain`).value.trim(),
      startDate: f.startDate,
      endDate: current ? "" : $id(`${prefix}EndDate`).value,
      current,
      desc: $id(`${prefix}Desc`).value.trim(),
      achievements: this.readAchievements(prefix),
      impacts: this.readImpacts(prefix),
      technologies: getTechChipLegacyIds($id(`${prefix}TechChips`))
    };
  }
  buildNewRecord(f) {
    return {
      ...this.readCommonFields("expAdd", f),
      sortOrder: parseSortInput($id("expAddSort").value, this.store.get("records").length + 1),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  applyEditToRecord(record, f) {
    Object.assign(record, this.readCommonFields("expEdit", f));
    record.sortOrder = parseSortInput($id("expEditSort").value, record.sortOrder);
  }
  async resolveTechBeforeSave(prefix) {
    const suggest = prefix === "expAdd" ? this.addTechSuggest : this.editTechSuggest;
    await suggest?.commit?.();
    try {
      const stack = await resolveProjectStackFromChips($id(`${prefix}TechChips`), this.techSuggestOptions());
      if (stack) return stack.technologies;
    } catch {
      return null;
    }
    return getTechChipLegacyIds($id(`${prefix}TechChips`));
  }
  async handleAddSubmit() {
    if (!canManageContent()) return;
    if (PAGE !== this.config.page) return;
    const techIds = await this.resolveTechBeforeSave("expAdd");
    if (techIds === null) {
      this.toast("Could not save technologies. Please try again.", "danger");
      return;
    }
    const result = this.validateForm("add");
    if (!result.valid) {
      this.toast("Please fix the highlighted fields", "danger");
      return;
    }
    const newRecord = this.buildNewRecord(result);
    newRecord.technologies = techIds;
    newRecord.id = this.nextId++;
    const prev = this.store.get("records");
    this.store.set("records", prev.concat(newRecord));
    const { closePanels } = await import("./panels-QMGI3P7U.js");
    closePanels();
    this.resetFilters();
    this.render();
    this.statusToast("Saving\u2026", "info", 12e4);
    try {
      await this.persist();
      this.statusToast(`"${this.getDeleteName(newRecord)}" added successfully!`, "success");
      this.notify(`New item "${this.getDeleteName(newRecord)}" was added.`, "ri-add-circle-line");
    } catch {
      this.store.set("records", prev);
      this.render();
      this.statusToast("Could not save item. Please try again.", "danger");
    }
  }
  async handleEditSubmit() {
    if (!canManageContent()) return;
    if (PAGE !== this.config.page) return;
    const techIds = await this.resolveTechBeforeSave("expEdit");
    if (techIds === null) {
      this.toast("Could not save technologies. Please try again.", "danger");
      return;
    }
    if (this.currentEditId == null) return;
    const result = this.validateForm("edit");
    if (!result.valid) {
      this.toast("Please fix the highlighted fields", "danger");
      return;
    }
    const record = this.findById(this.currentEditId);
    if (!record) return;
    const snapshot = { ...record };
    this.applyEditToRecord(record, result);
    record.technologies = techIds;
    this.store.set("records", this.store.get("records").slice());
    const { closePanels } = await import("./panels-QMGI3P7U.js");
    closePanels();
    this.render();
    this.statusToast("Saving\u2026", "info", 12e4);
    try {
      await this.persist();
      this.statusToast("Changes saved successfully!", "success");
    } catch {
      Object.assign(record, snapshot);
      this.render();
      this.statusToast("Could not save changes. Please try again.", "danger");
    }
  }
};
export {
  EXP_TYPE_META,
  ExperienceModule,
  SEED_EXPERIENCE
};
//# sourceMappingURL=ExperienceModule-LKFLPYGG.js.map
