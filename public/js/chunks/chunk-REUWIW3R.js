import {
  $id,
  animateOverlayPanel
} from "./chunk-HFEWIT3P.js";

// client/utils/focus-trap.ts
var FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function trapFocus(container, event) {
  if (event.key !== "Tab") return;
  const nodes = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
  );
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
function bindFocusTrap(container) {
  if (!container) return () => {
  };
  const onKeyDown = (event) => trapFocus(container, event);
  container.addEventListener("keydown", onKeyDown);
  return () => container.removeEventListener("keydown", onKeyDown);
}

// lib/auth/cms-write-controls.ts
var CMS_WRITE_CONTROL_IDS = [
  "paQuickAddPanel",
  "paMsgReplyPanel"
];
var CMS_VIEWER_STRIP_PANEL_IDS = [
  "paAddPanel",
  "paEditPanel",
  "paQuickAddPanel",
  "paCatAddPanel",
  "paCatEditPanel",
  "paTagAddPanel",
  "paTagEditPanel",
  "paBlogAddPanel",
  "paBlogEditPanel",
  "paBlogCatAddPanel",
  "paBlogCatEditPanel",
  "paExpAddPanel",
  "paExpEditPanel",
  "paTestiAddPanel",
  "paTestiEditPanel",
  "paTechAddPanel",
  "paTechEditPanel",
  "paToolsAddPanel",
  "paToolsEditPanel",
  "paToolCatAddPanel",
  "paToolCatEditPanel",
  "paUploadPanel",
  "paEditDetailsPanel",
  "paMsgReplyPanel",
  "paAddUserPanel",
  "paUserCredentialsPanel"
];
var CMS_WRITE_DOM_SELECTORS = [
  ".pa-msg-reply-panel",
  '[id$="AddSubmit"]',
  '[id$="EditSubmit"]',
  '[id$="EditDelete"]'
];
var CMS_WRITE_MENU_ACTIONS = /* @__PURE__ */ new Set([
  "edit",
  "delete",
  "duplicate",
  "mark-read",
  "mark-unread",
  "toggle-spam",
  "reset-credentials",
  "reply",
  "reply-edit",
  "reply-delete"
]);
function isCmsEmptyAddButton(el) {
  if (!el.classList.contains("pa-empty-state-btn")) return false;
  const id = el.id || "";
  if (/reset/i.test(id)) return false;
  return /add|emptyadd/i.test(id);
}

// lib/auth/constants.ts
var STAFF_ROLES = ["super_admin", "admin", "editor", "viewer"];
var ADMIN_ROLES = ["super_admin", "admin"];
var EDITOR_ROLES = ["super_admin", "admin", "editor"];
var SESSION_LIFETIME_SECONDS = 24 * 60 * 60;
var SESSION_LIFETIME_MS = SESSION_LIFETIME_SECONDS * 1e3;
var ELEVATION_DEFAULT_HOURS = 3;
var ELEVATION_DURATION_MS = ELEVATION_DEFAULT_HOURS * 60 * 60 * 1e3;

// lib/auth/capabilities.ts
function isElevationActive(elevatedUntil) {
  if (!elevatedUntil) return false;
  return new Date(elevatedUntil).getTime() > Date.now();
}
var VIEWER_SETTINGS_TABS = ["profile", "security", "notifications"];
var ADMIN_SETTINGS_TABS = ["icon-registry", "system"];
var SITE_SETTINGS_STORAGE_KEYS = /* @__PURE__ */ new Set([
  "pa_settings",
  "pa_msg_column_visibility"
]);
function isSiteSettingsStorageKey(key) {
  return SITE_SETTINGS_STORAGE_KEYS.has(key);
}
function canAccessSettingsTab(tab, capabilities) {
  if (ADMIN_SETTINGS_TABS.includes(tab)) {
    return capabilities.isAdmin;
  }
  if (capabilities.canManageContent) return true;
  return VIEWER_SETTINGS_TABS.includes(tab);
}
function deriveAccessCapabilities(role, elevatedUntil) {
  const normalized = typeof role === "string" ? role : "viewer";
  const isStaff = STAFF_ROLES.includes(normalized);
  const isAdmin = ADMIN_ROLES.includes(normalized);
  const baseEditor = EDITOR_ROLES.includes(normalized);
  const isViewer = normalized === "viewer";
  const elevated = !isAdmin && isElevationActive(elevatedUntil ?? null);
  const elevatedUntilIso = elevated && elevatedUntil ? elevatedUntil : null;
  const editorLike = baseEditor || elevated;
  return {
    isAdmin,
    isEditor: editorLike,
    isViewer: isViewer && !elevated,
    canManageContent: editorLike,
    canManageSiteSettings: isAdmin,
    canLogoutAllDevices: isAdmin,
    canClearAllNotifications: editorLike,
    canShowRoleRequestCard: isStaff && !isAdmin && !elevated,
    canAccessBlogEngagement: editorLike,
    canViewAllStaffActivity: isAdmin,
    canManageOwnAccountSettings: isStaff,
    isElevated: elevated,
    elevatedUntil: elevatedUntilIso
  };
}

// client/core/access.ts
var activeCapabilities = deriveAccessCapabilities("viewer");
function setAccessCapabilities(capabilities) {
  activeCapabilities = capabilities;
}
function getAccessCapabilities() {
  return activeCapabilities;
}
function setElementAccessible(el, allowed) {
  if (allowed) {
    el.removeAttribute("hidden");
    el.removeAttribute("aria-hidden");
    el.style.removeProperty("display");
  } else {
    el.setAttribute("hidden", "");
    el.setAttribute("aria-hidden", "true");
    el.style.display = "none";
  }
}
function applyCapabilityGatedElements(capabilities = activeCapabilities) {
  document.querySelectorAll(".pa-admin-only-item").forEach((el) => {
    setElementAccessible(el, capabilities.isAdmin);
  });
  document.querySelectorAll(".pa-editor-only-item").forEach((el) => {
    setElementAccessible(el, capabilities.isEditor);
  });
  document.querySelectorAll(".pa-staff-only-item").forEach((el) => {
    setElementAccessible(el, capabilities.canShowRoleRequestCard);
  });
  ["logoutAllBtn", "logoutAllDevicesBtn"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) setElementAccessible(el, capabilities.canLogoutAllDevices);
  });
  const clearBtn = document.getElementById("paNotifClearBtn");
  if (clearBtn) setElementAccessible(clearBtn, capabilities.canClearAllNotifications);
  if (capabilities.canManageContent) {
    restoreCmsWriteControls(document);
  } else {
    stripCmsWriteControls(document);
    installViewerWriteGuard();
  }
}

// client/core/EventBus.ts
var EventBus = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
    this._owners = /* @__PURE__ */ new Map();
  }
  /**
   * Subscribe to an event.
   * @param {string} event
   * @param {(payload:any)=>void} handler
   * @param {object} [opts]
   * @param {any} [opts.owner] Optional owner token for bulk unsubscribe.
   * @returns {() => void} unsubscribe function
   */
  on(event, handler, opts = {}) {
    if (typeof handler !== "function") {
      throw new TypeError(`EventBus.on("${event}") requires a function handler`);
    }
    if (!this._listeners.has(event)) this._listeners.set(event, /* @__PURE__ */ new Set());
    this._listeners.get(event).add(handler);
    if (opts.owner) {
      if (!this._owners.has(opts.owner)) this._owners.set(opts.owner, /* @__PURE__ */ new Set());
      this._owners.get(opts.owner).add(() => this.off(event, handler));
    }
    return () => this.off(event, handler);
  }
  /**
   * Subscribe for exactly one invocation.
   * @param {string} event
   * @param {(payload:any)=>void} handler
   * @param {object} [opts]
   */
  once(event, handler, opts = {}) {
    const wrapped = (payload) => {
      this.off(event, wrapped);
      handler(payload);
    };
    return this.on(event, wrapped, opts);
  }
  /**
   * Unsubscribe a specific handler.
   * @param {string} event
   * @param {Function} handler
   */
  off(event, handler) {
    this._listeners.get(event)?.delete(handler);
  }
  /**
   * Emit an event to all subscribers. Handler errors are caught and logged
   * individually so one bad listener can't break the others.
   * @param {string} event
   * @param {any} [payload]
   */
  emit(event, payload) {
    const set = this._listeners.get(event);
    if (!set || set.size === 0) return;
    for (const handler of Array.from(set)) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[EventBus] listener for "${event}" threw:`, err);
      }
    }
  }
  /**
   * Remove every listener registered with a given owner token.
   * Call this from a Module's `destroy()` for automatic cleanup.
   * @param {any} owner
   */
  unsubscribeAll(owner) {
    const cleaners = this._owners.get(owner);
    if (!cleaners) return;
    cleaners.forEach((cleanup) => cleanup());
    this._owners.delete(owner);
  }
  clear() {
    this._listeners.clear();
    this._owners.clear();
  }
};
var eventBus = new EventBus();

// client/modules/shell/confirm.ts
var pendingId = null;
var pendingType = null;
var pendingBulkConfirm = null;
var pendingBulkCancel = null;
var pendingLogoutConfirm = null;
var confirmDefaultsBackup = null;
var dialogBound = false;
function getConfirmIconEl() {
  return document.querySelector("#paConfirmOverlay .pa-confirm-icon i");
}
function getConfirmIconWrap() {
  return document.querySelector("#paConfirmOverlay .pa-confirm-icon");
}
function captureConfirmDefaults() {
  if (confirmDefaultsBackup) return;
  const titleEl = $id("paConfirmTitle");
  const okEl = $id("paConfirmOk");
  const iconEl = getConfirmIconEl();
  const iconWrap = getConfirmIconWrap();
  confirmDefaultsBackup = {
    title: titleEl?.textContent || "",
    okText: okEl?.textContent || "",
    okDanger: okEl?.classList.contains("--pa-red"),
    iconClass: iconEl?.className || "ri-delete-bin-line",
    iconWrapClass: iconWrap?.className || "pa-confirm-icon"
  };
}
function restoreConfirmDefaults() {
  if (!confirmDefaultsBackup) return;
  const titleEl = $id("paConfirmTitle");
  const okEl = $id("paConfirmOk");
  const iconEl = getConfirmIconEl();
  const iconWrap = getConfirmIconWrap();
  if (titleEl) titleEl.textContent = confirmDefaultsBackup.title;
  if (okEl) {
    okEl.textContent = confirmDefaultsBackup.okText;
    okEl.classList.toggle("--pa-red", confirmDefaultsBackup.okDanger);
  }
  if (iconEl) iconEl.className = confirmDefaultsBackup.iconClass;
  if (iconWrap) iconWrap.className = confirmDefaultsBackup.iconWrapClass;
  confirmDefaultsBackup = null;
}
function applyConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  iconClass = "ri-delete-bin-line",
  danger = true,
  iconTone = "danger"
}) {
  captureConfirmDefaults();
  const titleEl = $id("paConfirmTitle");
  const textEl = $id("paConfirmText");
  const okEl = $id("paConfirmOk");
  const iconEl = getConfirmIconEl();
  const iconWrap = getConfirmIconWrap();
  if (titleEl && title) titleEl.textContent = title;
  if (textEl && message) textEl.innerHTML = message;
  if (okEl) {
    okEl.textContent = confirmLabel;
    okEl.classList.toggle("--pa-red", danger);
  }
  if (iconEl) iconEl.className = iconClass;
  if (iconWrap) {
    iconWrap.className = "pa-confirm-icon";
    if (iconTone === "warning") iconWrap.classList.add("pa-confirm-icon--warning");
  }
}
function requestDelete(id, type, name, extraInfo = "") {
  pendingLogoutConfirm = null;
  restoreConfirmDefaults();
  pendingBulkConfirm = null;
  pendingBulkCancel = null;
  pendingId = id;
  pendingType = type;
  let text = `This will permanently remove <strong>${name}</strong>.`;
  if (extraInfo) text += ` ${extraInfo}`;
  text += " This action cannot be undone.";
  const textEl = $id("paConfirmText");
  if (textEl) textEl.innerHTML = text;
  $id("paConfirmOverlay")?.classList.add("visible");
}
function requestBulkAction({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  iconClass = "ri-delete-bin-line",
  danger = true,
  iconTone = "danger"
}) {
  pendingLogoutConfirm = null;
  restoreConfirmDefaults();
  pendingId = null;
  pendingType = null;
  pendingBulkConfirm = onConfirm;
  pendingBulkCancel = onCancel || null;
  applyConfirmDialog({ title, message, confirmLabel, iconClass, danger, iconTone });
  $id("paConfirmOverlay")?.classList.add("visible");
}
function requestConfirm(opts) {
  return requestBulkAction(opts);
}
function closeConfirm() {
  $id("paConfirmOverlay")?.classList.remove("visible");
  pendingId = null;
  pendingType = null;
  if (pendingBulkConfirm) {
    pendingBulkCancel?.();
    pendingBulkConfirm = null;
    pendingBulkCancel = null;
    restoreConfirmDefaults();
  } else if (pendingBulkCancel) {
    pendingBulkCancel = null;
  }
  if (pendingLogoutConfirm) {
    pendingLogoutConfirm = null;
    restoreConfirmDefaults();
  }
}
function requestLogout(onConfirm) {
  pendingLogoutConfirm = onConfirm;
  pendingId = null;
  pendingType = null;
  pendingBulkConfirm = null;
  pendingBulkCancel = null;
  restoreConfirmDefaults();
  applyConfirmDialog({
    title: "Logout?",
    message: "Are you sure you want to logout? You will need to sign in again to access the admin panel.",
    confirmLabel: "Logout",
    iconClass: "ri-logout-circle-line",
    danger: false,
    iconTone: "warning"
  });
  $id("paConfirmOverlay")?.classList.add("visible");
}
function hitConfirmControl(target, id) {
  if (!target) return false;
  if (target.id === id) return true;
  return typeof target.closest === "function" && !!target.closest(`#${id}`);
}
async function performDelete() {
  if (pendingLogoutConfirm) {
    const cb = pendingLogoutConfirm;
    pendingLogoutConfirm = null;
    $id("paConfirmOverlay")?.classList.remove("visible");
    restoreConfirmDefaults();
    await Promise.resolve(cb());
    return;
  }
  if (pendingBulkConfirm) {
    const cb = pendingBulkConfirm;
    pendingBulkConfirm = null;
    pendingBulkCancel = null;
    $id("paConfirmOverlay")?.classList.remove("visible");
    restoreConfirmDefaults();
    await Promise.resolve(cb());
    return;
  }
  if (pendingId == null || pendingType == null) return;
  const { id, type } = { id: pendingId, type: pendingType };
  closeConfirm();
  closePanels();
  eventBus.emit("confirm:confirmed", { id, type });
}
function onConfirmDocumentClick(e) {
  const overlay = document.getElementById("paConfirmOverlay");
  if (!overlay?.classList.contains("visible")) return;
  if (hitConfirmControl(e.target, "paConfirmCancel")) {
    e.preventDefault();
    closeConfirm();
    return;
  }
  if (hitConfirmControl(e.target, "paConfirmOk")) {
    e.preventDefault();
    void performDelete();
    return;
  }
  if (e.target.id === "paConfirmOverlay") {
    closeConfirm();
  }
}
function initConfirmDialog() {
  if (dialogBound) return;
  dialogBound = true;
  document.addEventListener("click", onConfirmDocumentClick);
}
function isConfirmOpen() {
  return !!document.getElementById("paConfirmOverlay")?.classList.contains("visible");
}
var PERMISSION_DENIED_MESSAGE = `You don't have permission to do that. <a href="/admin/settings/security">Contact admin for access</a> from Settings \u2192 Security.`;
function showPermissionDeniedDialog() {
  requestBulkAction({
    title: "Permission required",
    message: PERMISSION_DENIED_MESSAGE,
    confirmLabel: "OK",
    iconClass: "ri-lock-line",
    danger: false,
    iconTone: "warning",
    onConfirm: () => {
    }
  });
}

// client/core/cms-access.ts
function canManageContent() {
  return getAccessCapabilities().canManageContent;
}
function canManageSiteSettings() {
  return getAccessCapabilities().canManageSiteSettings;
}
var CMS_WRITE_HIDDEN_ATTR = "data-pa-cms-write-hidden";
function hideForViewer(el) {
  if (!el || el.hasAttribute(CMS_WRITE_HIDDEN_ATTR)) return;
  el.setAttribute(CMS_WRITE_HIDDEN_ATTR, "true");
  el.setAttribute("hidden", "");
  if (el instanceof HTMLElement) {
    el.style.display = "none";
  }
}
function elementByIdWithinRoot(root, id) {
  return root instanceof Document ? root.getElementById(id) : root.querySelector(`#${CSS.escape(id)}`);
}
function restoreCmsWriteControls(root = document) {
  root.querySelectorAll(`[${CMS_WRITE_HIDDEN_ATTR}]`).forEach((el) => {
    el.removeAttribute(CMS_WRITE_HIDDEN_ATTR);
    el.removeAttribute("hidden");
    if (el instanceof HTMLElement) {
      el.style.removeProperty("display");
    }
  });
}
function stripCmsWriteControls(root = document) {
  if (canManageContent()) return;
  for (const id of CMS_WRITE_CONTROL_IDS) {
    hideForViewer(elementByIdWithinRoot(root, id));
  }
  for (const id of CMS_VIEWER_STRIP_PANEL_IDS) {
    hideForViewer(elementByIdWithinRoot(root, id));
  }
  for (const selector of CMS_WRITE_DOM_SELECTORS) {
    root.querySelectorAll(selector).forEach((el) => hideForViewer(el));
  }
  root.querySelectorAll('.pa-panel[role="dialog"]').forEach((panel) => {
    const id = panel.id;
    if (id && id !== "paCustomPanel") hideForViewer(panel);
  });
}
var writeGuardInstalled = false;
var VIEWER_SELF_SERVICE_ROOT_SELECTOR = [
  '.pa-tab-panel[data-content="profile"]',
  '.pa-tab-panel[data-content="security"]',
  '.pa-tab-panel[data-content="notifications"]'
].join(", ");
function isViewerSelfServiceClick(target) {
  return !!target.closest(VIEWER_SELF_SERVICE_ROOT_SELECTOR);
}
var WRITE_GUARD_SELECTOR = [
  '[data-action="edit"]',
  '[data-action="delete"]',
  '[data-action="duplicate"]',
  '[data-action="mark-read"]',
  '[data-action="mark-unread"]',
  '[data-action="toggle-spam"]',
  '[data-action="reply"]',
  '[data-action="reply-edit"]',
  '[data-action="reply-delete"]',
  '[data-action="reset-credentials"]',
  ".pa-btn-add",
  ".pa-action-edit",
  ".pa-action-delete",
  ".pa-action-duplicate",
  ".pa-proj-card__details-btn",
  "#paAddNewBtn",
  "#paSelectModeBtn",
  "#paBlogEngSelectModeBtn",
  "#paBulkDeleteBtn",
  "#paBulkSelectAllBtn",
  "#paBulkClearBtn",
  "#paMsgExportBtn",
  "#paMsgDetailDelete",
  "#paMsgDetailStar",
  "#paMsgReplyBtn",
  ".pa-msg-reply-again-btn",
  "[data-reply-edit]",
  "[data-reply-delete]",
  "[data-cms-write]",
  ".pa-select-checkbox",
  ".pa-msg-bulk-checkbox",
  '.pa-panel [id$="AddSubmit"]',
  '.pa-panel [id$="EditSubmit"]',
  '.pa-panel [id$="EditDelete"]'
].join(", ");
function findBlockedWriteControl(target) {
  if (isViewerSelfServiceClick(target)) return null;
  const menuItem = target.closest(".pa-card-menu-item[data-action]");
  if (menuItem) {
    const action = menuItem.getAttribute("data-action");
    if (action && CMS_WRITE_MENU_ACTIONS.has(action)) return menuItem;
  }
  const emptyAddBtn = target.closest(".pa-empty-state-btn");
  if (isCmsEmptyAddButton(target) || emptyAddBtn && isCmsEmptyAddButton(emptyAddBtn)) {
    return emptyAddBtn || target;
  }
  return target.closest(WRITE_GUARD_SELECTOR);
}
function installViewerWriteGuard() {
  if (writeGuardInstalled || canManageContent()) return;
  writeGuardInstalled = true;
  document.addEventListener(
    "click",
    (e) => {
      if (canManageContent()) return;
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const blocked = findBlockedWriteControl(target);
      if (!blocked) return;
      e.preventDefault();
      e.stopPropagation();
      showPermissionDeniedDialog();
    },
    true
  );
}

// client/modules/shell/panels.ts
var disposeFocusTrap = null;
var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
var VIEWER_PANEL_IDS = /* @__PURE__ */ new Set(["paCustomPanel"]);
var registeredPanelIds = /* @__PURE__ */ new Set();
function registerPanel(id) {
  registeredPanelIds.add(id);
}
function anyPanelOpen() {
  return Array.from(registeredPanelIds).some((id) => $id(id)?.classList.contains("visible"));
}
function closePanels() {
  disposeFocusTrap?.();
  disposeFocusTrap = null;
  $id("paPanelOverlay")?.classList.remove("visible");
  registeredPanelIds.forEach((id) => $id(id)?.classList.remove("visible"));
  $id("paCustomToggle")?.classList.remove("active");
  document.querySelector(".pa-custom-toggle")?.classList.remove("active");
  document.body.style.overflow = "";
}
function openPanel(panelId, hidePanelIds = []) {
  if (!canManageContent() && !VIEWER_PANEL_IDS.has(panelId)) return;
  hidePanelIds.forEach((id) => $id(id)?.classList.remove("visible"));
  const overlay = $id("paPanelOverlay");
  overlay?.classList.add("visible");
  const panel = $id(panelId);
  panel?.classList.add("visible");
  if (panel) animateOverlayPanel(panel);
  disposeFocusTrap?.();
  disposeFocusTrap = bindFocusTrap(panel);
  const firstFocus = panel?.querySelector(FOCUSABLE_SELECTOR);
  if (firstFocus instanceof HTMLElement) firstFocus.focus();
}
function setButtonLoading(btnId, loading) {
  const btn = $id(btnId);
  if (!btn) return;
  btn.classList.toggle("loading", loading);
  btn.disabled = loading;
}
function activateTab(panel, tab) {
  document.querySelectorAll(
    `.pa-panel-tab[data-panel="${panel}"], .pa-view-btn[data-panel="${panel}"]`
  ).forEach((btn) => {
    const isActive = btn.dataset.tab === tab;
    btn.classList.toggle("active", isActive);
    if (btn.getAttribute("role") === "tab") {
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
  });
  document.querySelectorAll(`.pa-qa-top-tab[data-panel="${panel}"], .pa-qa-bottom-tab[data-panel="${panel}"]`).forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  document.querySelectorAll(`.pa-tab-panel[data-panel="${panel}"]`).forEach((pane) => {
    pane.classList.toggle("active", pane.dataset.content === tab);
  });
  const panelId = document.querySelector(`.pa-panel[data-panel="${panel}"]`)?.id || document.querySelector(`#${panel}`)?.id || panel;
  const scrollRoot = document.querySelector(`#${panelId} .pa-qa-content`) || document.querySelector(`#${panelId} .pa-panel-body`);
  if (scrollRoot) scrollRoot.scrollTop = 0;
}
function activateWizardStep(entity, step) {
  const root = document.querySelector(`.pa-qa-wizard[data-qa-entity="${entity}"]`);
  if (!root) return;
  root.querySelectorAll("[data-wizard-step]").forEach((el) => {
    const isStep = el.dataset.wizardStep === step;
    if (el.classList.contains("pa-qa-step")) el.classList.toggle("active", isStep);
    if (el.classList.contains("pa-qa-step-panel")) el.classList.toggle("active", isStep);
  });
  const body = root.querySelector(".pa-qa-wizard-body");
  if (body) body.scrollTop = 0;
}

export {
  eventBus,
  isSiteSettingsStorageKey,
  canAccessSettingsTab,
  deriveAccessCapabilities,
  setAccessCapabilities,
  getAccessCapabilities,
  applyCapabilityGatedElements,
  registerPanel,
  anyPanelOpen,
  closePanels,
  openPanel,
  setButtonLoading,
  activateTab,
  activateWizardStep,
  requestDelete,
  requestBulkAction,
  requestConfirm,
  closeConfirm,
  requestLogout,
  initConfirmDialog,
  isConfirmOpen,
  canManageContent,
  canManageSiteSettings
};
//# sourceMappingURL=chunk-REUWIW3R.js.map
