import {
  applyRoleBasedAccess,
  applyUserDisplay,
  hideNavFlyout,
  initSettingsNav,
  initSidebarCollapse,
  initSidebarGroupNav,
  isSidebarCollapsedDesktop,
  previewUserAvatar,
  showNavFlyout,
  syncSidebarGroupNav
} from "./chunks/chunk-FWZIT5QG.js";
import {
  initPasswordToggles
} from "./chunks/chunk-HSBA7GYU.js";
import {
  clearUserCredentials,
  formatStaffRoleLabel,
  initStaffInviteLinkModal,
  initUserCredentialsPanel,
  notifyCredentialsEmailStatus,
  populateStaffRoleSelect,
  showUserCredentialsPanel
} from "./chunks/chunk-IIC4VDHS.js";
import {
  authService
} from "./chunks/chunk-IRZPJAKT.js";
import {
  debounce
} from "./chunks/chunk-NGJCAR7D.js";
import {
  getThemeBackground,
  updateFavicon
} from "./chunks/chunk-3JOTZRJK.js";
import {
  initAllPaSelects
} from "./chunks/chunk-HYF3MIUV.js";
import {
  handleFileValidation,
  uploadCmsFileWithPreview
} from "./chunks/chunk-XZ5R2AN2.js";
import "./chunks/chunk-777AU2J4.js";
import {
  killPageMotion,
  runPageEnter
} from "./chunks/chunk-25T6YHMS.js";
import "./chunks/chunk-VXJMB3CY.js";
import {
  PAGE,
  getCurrentPage,
  getLoginPath,
  getSettingsTabFromPath
} from "./chunks/chunk-47N5NP2E.js";
import {
  closeAllCardMenus
} from "./chunks/chunk-IZ7T64RP.js";
import {
  clearLegacyPersistedViewOverrides,
  syncModuleViewModeFromSettings
} from "./chunks/chunk-UHXU6UPR.js";
import {
  Module,
  addNotification,
  clearNotifications,
  loadNotifications,
  markNotificationRead,
  renderNotifications,
  storage
} from "./chunks/chunk-7KTA4S5K.js";
import {
  activateTab,
  anyPanelOpen,
  applyCapabilityGatedElements,
  closeConfirm,
  closePanels,
  eventBus,
  getAccessCapabilities,
  initConfirmDialog,
  isConfirmOpen,
  openPanel,
  registerPanel,
  requestLogout
} from "./chunks/chunk-FTMH3SUW.js";
import {
  showStatusToast,
  showToast
} from "./chunks/chunk-HWSNCMVP.js";
import {
  $all,
  $id,
  clearDomCache,
  escapeHtml,
  gsapWithCSS,
  isCoarsePointer,
  motionDuration,
  prefersReducedMotion
} from "./chunks/chunk-HFEWIT3P.js";
import "./chunks/chunk-MTDZJ6X7.js";

// client/core/BodyLoader.ts
var BodyLoader = class {
  constructor() {
    this._count = 0;
    this._host = null;
    this._el = null;
    this._labelEl = null;
    this._defaultMessage = "Loading your data\u2026";
    this._hideTimer = null;
    this._showFrame = null;
    this._EXIT_MS = 220;
  }
  _resolveHost() {
    return document.body;
  }
  _findLoader() {
    return document.getElementById("paBodyLoader");
  }
  _ensureOnBody(el) {
    if (el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }
  _cancelShowFrame() {
    if (this._showFrame) {
      cancelAnimationFrame(this._showFrame);
      this._showFrame = null;
    }
  }
  mount() {
    if (typeof window.__paEnsureBodyLoader === "function") {
      this._el = window.__paEnsureBodyLoader(false);
      this._host = this._resolveHost();
      if (this._el) {
        this._labelEl = this._el.querySelector(".pa-body-loader__label");
      }
      return;
    }
    this._host = this._resolveHost();
    if (!this._host) return;
    const existing = this._findLoader();
    if (existing) {
      this._ensureOnBody(existing);
      this._el = existing;
      this._labelEl = existing.querySelector(".pa-body-loader__label");
      return;
    }
    const el = document.createElement("div");
    el.className = "pa-body-loader";
    el.id = "paBodyLoader";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-busy", "true");
    el.innerHTML = `
      <div class="pa-body-loader__veil" aria-hidden="true"></div>
      <div class="pa-body-loader__panel">
        <div class="pa-body-loader__orbit" aria-hidden="true">
          <span class="pa-body-loader__ring"></span>
          <span class="pa-body-loader__ring pa-body-loader__ring--delay"></span>
          <span class="pa-body-loader__core"><i class="ri-database-2-line"></i></span>
        </div>
        <p class="pa-body-loader__label">${this._defaultMessage}</p>
        <div class="pa-body-loader__stream" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="pa-body-loader__skeleton" aria-hidden="true">
          <div class="pa-body-loader__skel-card"></div>
          <div class="pa-body-loader__skel-card"></div>
          <div class="pa-body-loader__skel-card"></div>
          <div class="pa-body-loader__skel-card"></div>
        </div>
      </div>
    `;
    this._host.appendChild(el);
    this._el = el;
    this._labelEl = el.querySelector(".pa-body-loader__label");
  }
  begin(message) {
    const msg = message || this._defaultMessage;
    if (typeof window.__paEnsureBodyLoader === "function") {
      this._el = window.__paEnsureBodyLoader(true, msg);
      this._host = this._resolveHost();
      this._labelEl = this._el?.querySelector(".pa-body-loader__label") || null;
    } else {
      this.mount();
    }
    if (!this._host || !this._el) return;
    this._cancelShowFrame();
    if (this._hideTimer) {
      clearTimeout(this._hideTimer);
      this._hideTimer = null;
    }
    if (msg && this._labelEl) this._labelEl.textContent = msg;
    this._count += 1;
    document.body.classList.add("pa-loading-active");
    this._el.classList.remove("is-hiding");
    this._el.classList.add("visible");
    this._el.setAttribute("aria-busy", "true");
  }
  end() {
    if (!this._el) return;
    this._count = Math.max(0, this._count - 1);
    if (this._count === 0) this._hide();
  }
  reset() {
    this._count = 0;
    this._hide();
  }
  _hide() {
    this._cancelShowFrame();
    this._host = this._resolveHost();
    if (!this._host || !this._el) return;
    this._el.classList.add("is-hiding");
    this._el.classList.remove("visible");
    if (this._count === 0) document.body.classList.remove("pa-loading-active");
    if (this._labelEl) this._labelEl.textContent = this._defaultMessage;
    this._el.setAttribute("aria-busy", "false");
    if (this._hideTimer) clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => {
      this._el?.classList.remove("is-hiding");
      this._hideTimer = null;
    }, this._EXIT_MS);
  }
  async wrap(promise, message) {
    this.begin(message);
    try {
      return await promise;
    } finally {
      this.end();
    }
  }
};
var bodyLoader = new BodyLoader();

// client/modules/shell/AddUserManager.ts
var ADMIN_ROLES = ["super_admin", "admin"];
var AddUserManager = class {
  /**
   * @param {object} opts
   * @param {(el: Element, event: string, handler: Function) => void} opts.on
   * @param {() => void} [opts.closeUserMenu]
   */
  constructor({ on, closeUserMenu }) {
    this.on = on;
    this.closeUserMenu = closeUserMenu;
    this._profileRole = null;
  }
  bindEvents() {
    registerPanel("paAddUserPanel");
    const menuBtn = $id("paAddUserMenuBtn");
    if (menuBtn) {
      this.on(menuBtn, "click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeUserMenu?.();
        void this.openAddUserPanel();
      });
    }
    this.on($id("paAddUserPanelClose"), "click", () => this.closeAddUserPanel());
    this.on($id("paAddUserCancelBtn"), "click", () => this.closeAddUserPanel());
    this.on($id("paAddUserSubmitBtn"), "click", () => {
      void this.submitAddUser();
    });
    this.on($id("paPanelOverlay"), "click", (e) => {
      if (e.target.id !== "paPanelOverlay") return;
      if ($id("paUserCredentialsPanel")?.classList.contains("visible")) {
        this.closeCredentialsPanel();
      } else if ($id("paAddUserPanel")?.classList.contains("visible")) {
        this.closeAddUserPanel();
      }
    });
  }
  setProfileRole(role) {
    this._profileRole = role || null;
  }
  isAdmin() {
    return ADMIN_ROLES.includes(this._profileRole);
  }
  async ensureAdminAccess() {
    if (this.isAdmin()) return true;
    try {
      const profile = await authService.getProfile();
      this._profileRole = profile?.role || null;
    } catch {
      this._profileRole = null;
    }
    if (!this.isAdmin()) {
      showToast("Only administrators can add users.", "danger");
      return false;
    }
    return true;
  }
  resetAddUserForm() {
    const set = (id, value) => {
      const el = $id(id);
      if (el) el.value = value;
    };
    set("addUserFullName", "");
    set("addUserUsername", "");
    set("addUserEmail", "");
    populateStaffRoleSelect($id("addUserRole"), { selected: "editor" });
  }
  openAddUserPanel() {
    this.resetAddUserForm();
    openPanel("paAddUserPanel", ["paUserCredentialsPanel"]);
    window.setTimeout(() => $id("addUserFullName")?.focus(), 120);
    void this.guardAddUserPanelAccess();
  }
  async guardAddUserPanelAccess() {
    if (this.isAdmin()) return;
    if (!await this.ensureAdminAccess()) {
      this.closeAddUserPanel();
    }
  }
  closeAddUserPanel() {
    closePanels();
  }
  closeCredentialsPanel() {
    closePanels();
    clearUserCredentials();
  }
  collectFormPayload() {
    return {
      fullName: $id("addUserFullName")?.value?.trim() || "",
      username: $id("addUserUsername")?.value?.trim() || "",
      email: $id("addUserEmail")?.value?.trim() || "",
      role: $id("addUserRole")?.value || "editor"
    };
  }
  async fetchJson(url, options) {
    const res = await fetch(url, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        ...options?.body ? { "Content-Type": "application/json" } : {},
        ...options?.headers || {}
      },
      ...options
    });
    if (res.status === 401) {
      window.location.href = "/admin/login";
      throw new Error("Unauthorized");
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText || "Request failed");
    return data;
  }
  async submitAddUser() {
    if (!await this.ensureAdminAccess()) return;
    const payload = this.collectFormPayload();
    if (!payload.fullName) {
      showToast("Full name is required.", "danger");
      $id("addUserFullName")?.focus();
      return;
    }
    if (!payload.email) {
      showToast("Email is required.", "danger");
      $id("addUserEmail")?.focus();
      return;
    }
    showStatusToast("Creating user\u2026", "info", 12e4);
    try {
      const result = await this.fetchJson("/api/users", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      this.showCredentials(result.credentials, result);
      addNotification(`User ${result.user?.fullName || result.user?.email || payload.email} was created`, "ri-user-add-line");
      notifyCredentialsEmailStatus(result);
    } catch (error) {
      showStatusToast(error.message || "Could not create user.", "danger");
    }
  }
  formatRoleLabel(role) {
    return formatStaffRoleLabel(role);
  }
  showCredentials(credentials, emailMeta = {}) {
    if (!credentials) return;
    showUserCredentialsPanel(credentials, {
      closePanelIds: ["paAddUserPanel"],
      emailSent: emailMeta.emailSent,
      emailError: emailMeta.emailError
    });
  }
};

// client/utils/customFonts.ts
var MAX_CUSTOM_FONTS = 5;
var MAX_FONT_BYTES = 2 * 1024 * 1024;
var FONT_MIME_TYPES = /* @__PURE__ */ new Set([
  "font/woff",
  "font/woff2",
  "font/ttf",
  "font/otf",
  "application/font-woff",
  "application/font-woff2",
  "application/x-font-woff",
  "application/x-font-ttf",
  "application/x-font-otf",
  "application/octet-stream"
]);
var FONT_EXTENSIONS = {
  woff: "woff",
  woff2: "woff2",
  ttf: "truetype",
  otf: "opentype"
};
var CUSTOM_FONT_STYLE_ID = "pa-custom-fonts-style";
function isCustomFontId(id) {
  return typeof id === "string" && id.startsWith("custom-");
}
function deriveFontFormat(file) {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  return FONT_EXTENSIONS[ext] || "woff2";
}
function deriveFontName(file) {
  const base = file.name.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 60) || "Custom Font";
}
function deriveFamilyName(displayName) {
  const safe = String(displayName || "Custom Font").replace(/[^\w\s-]/g, "").trim().slice(0, 50) || "Custom Font";
  return `PA Custom ${safe}`;
}
function createCustomFontId() {
  const rand = Math.random().toString(36).slice(2, 8);
  return `custom-${Date.now().toString(36)}${rand}`;
}
function validateFontFile(file) {
  if (!file) return "No file selected.";
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!FONT_EXTENSIONS[ext]) {
    return `"${file.name}" \u2014 only WOFF, WOFF2, TTF, or OTF files are supported.`;
  }
  if (!FONT_MIME_TYPES.has(file.type) && file.type !== "") {
    return `"${file.name}" \u2014 unsupported file type.`;
  }
  if (file.size > MAX_FONT_BYTES) {
    return `"${file.name}" \u2014 file exceeds the 2MB limit.`;
  }
  return null;
}
function normalizeCustomFonts(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((f) => f && isCustomFontId(f.id) && f.url && f.familyName).slice(0, MAX_CUSTOM_FONTS).map((f) => ({
    id: f.id,
    name: String(f.name || f.familyName).slice(0, 60),
    familyName: String(f.familyName).slice(0, 80),
    url: f.url,
    format: f.format || "woff2",
    fileName: typeof f.fileName === "string" ? f.fileName.slice(0, 120) : "",
    uploadedAt: f.uploadedAt || null
  }));
}
function customFontToOption(font) {
  const stack = `'${font.familyName}', sans-serif`;
  return {
    id: font.id,
    name: font.name,
    stack,
    sample: "Your custom typeface",
    isCustom: true
  };
}
function registerCustomFonts(customFonts = []) {
  if (typeof document === "undefined") return;
  let style = document.getElementById(CUSTOM_FONT_STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = CUSTOM_FONT_STYLE_ID;
    document.head.appendChild(style);
  }
  const rules = normalizeCustomFonts(customFonts).map((font) => {
    const format = font.format || "woff2";
    const escapedFamily = font.familyName.replace(/'/g, "\\'");
    const escapedUrl = font.url.replace(/"/g, '\\"');
    return `@font-face{font-family:'${escapedFamily}';src:url("${escapedUrl}") format('${format}');font-display:swap;}`;
  });
  style.textContent = rules.join("\n");
}
async function buildCustomFontFromFile(file) {
  const error = validateFontFile(file);
  if (error) throw new Error(error);
  const { uploadCustomFontFile } = await import("./chunks/media-upload-SWWSZNEP.js");
  const uploaded = await uploadCustomFontFile(file);
  const url = uploaded.url;
  const name = deriveFontName(file);
  const familyName = deriveFamilyName(name);
  return {
    id: createCustomFontId(),
    name,
    familyName,
    url,
    format: deriveFontFormat(file),
    fileName: file.name,
    uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}

// client/utils/googleFonts.ts
var LAYOUT_PRELOADED = /* @__PURE__ */ new Set(["outfit", "figtree", "poppins"]);
var GOOGLE_FONT_SPECS = {
  "plus-jakarta-sans": { family: "Plus+Jakarta+Sans", weights: "300;400;600;700" },
  manrope: { family: "Manrope", weights: "300;400;600;700" },
  figtree: { family: "Figtree", weights: "300;400;600;700" },
  "dm-sans": { family: "DM+Sans", weights: "400;500;600;700" },
  sora: { family: "Sora", weights: "300;400;600;700" },
  "instrument-sans": { family: "Instrument+Sans", weights: "400;500;600;700" },
  "space-grotesk": { family: "Space+Grotesk", weights: "400;500;600;700" },
  onest: { family: "Onest", weights: "300;400;600;700" },
  fraunces: { family: "Fraunces", weights: "400;600;700" },
  "source-serif-4": { family: "Source+Serif+4", weights: "400;600;700" },
  literata: { family: "Literata", weights: "400;600;700" },
  "jetbrains-mono": { family: "JetBrains+Mono", weights: "400;500;700" },
  "ibm-plex-mono": { family: "IBM+Plex+Mono", weights: "400;500;700" },
  "fira-code": { family: "Fira+Code", weights: "400;500;700" },
  "source-code-pro": { family: "Source+Code+Pro", weights: "400;500;700" },
  "dm-mono": { family: "DM+Mono", weights: "400;500" }
};
function ensureGoogleFontLoaded(fontId) {
  if (!fontId || typeof document === "undefined") return;
  if (LAYOUT_PRELOADED.has(fontId) || fontId.startsWith("custom-")) return;
  const spec = GOOGLE_FONT_SPECS[fontId];
  if (!spec) return;
  const linkId = `pa-gf-${fontId}`;
  if (document.getElementById(linkId)) return;
  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${spec.family}:wght@${spec.weights}&display=swap`;
  document.head.appendChild(link);
}

// client/utils/appearanceCache.ts
var APPEARANCE_CACHE_KEY = "pa_appearance_settings_v2";
var APPEARANCE_DEFAULTS = {
  theme: "dark",
  accent: "#ff6600",
  fontSize: "14px",
  fontFamily: "inter",
  fontWeight: "400",
  cornerRadius: "14px",
  cardSpacing: "10px",
  iconSize: "medium",
  customFonts: []
};
var ICON_SIZE_PRESETS = {
  small: {
    nav: "12px",
    action: "14px",
    stat: "18px",
    header: "16px",
    empty: "32px",
    toggle: "14px",
    circle: "38px",
    btn: "34px"
  },
  medium: {
    nav: "14px",
    action: "16px",
    stat: "22px",
    header: "18px",
    empty: "40px",
    toggle: "16px",
    circle: "44px",
    btn: "38px"
  },
  large: {
    nav: "18px",
    action: "20px",
    stat: "26px",
    header: "22px",
    empty: "48px",
    toggle: "20px",
    circle: "52px",
    btn: "44px"
  }
};
var ICON_PREVIEW_SIZES = { small: "12px", medium: "16px", large: "20px" };
var CUSTOM_FONTS = [
  { group: "Sans-serif", fonts: [
    { id: "inter", name: "Inter", stack: "'Inter', sans-serif", sample: "The quick brown fox" },
    { id: "outfit", name: "Outfit", stack: "'Outfit', sans-serif", sample: "Clean and modern" },
    { id: "plus-jakarta-sans", name: "Plus Jakarta Sans", stack: "'Plus Jakarta Sans', sans-serif", sample: "Modern admin dashboard" },
    { id: "manrope", name: "Manrope", stack: "'Manrope', sans-serif", sample: "Clear and balanced" },
    { id: "figtree", name: "Figtree", stack: "'Figtree', sans-serif", sample: "Friendly and professional" },
    { id: "dm-sans", name: "DM Sans", stack: "'DM Sans', sans-serif", sample: "The quick brown fox" },
    { id: "sora", name: "Sora", stack: "'Sora', sans-serif", sample: "Tech-forward clarity" },
    { id: "instrument-sans", name: "Instrument Sans", stack: "'Instrument Sans', sans-serif", sample: "Crisp UI typography" },
    { id: "space-grotesk", name: "Space Grotesk", stack: "'Space Grotesk', sans-serif", sample: "Geometric precision" },
    { id: "onest", name: "Onest", stack: "'Onest', sans-serif", sample: "Designed for interfaces" }
  ] },
  { group: "Serif", fonts: [
    { id: "fraunces", name: "Fraunces", stack: "'Fraunces', serif", sample: "Elegant and literary" },
    { id: "source-serif-4", name: "Source Serif 4", stack: "'Source Serif 4', serif", sample: "Readable long-form text" },
    { id: "literata", name: "Literata", stack: "'Literata', serif", sample: "Warm editorial tone" }
  ] },
  { group: "Monospace", fonts: [
    { id: "jetbrains-mono", name: "JetBrains Mono", stack: "'JetBrains Mono', monospace", sample: "const app = true;" },
    { id: "ibm-plex-mono", name: "IBM Plex Mono", stack: "'IBM Plex Mono', monospace", sample: "function() { }" },
    { id: "fira-code", name: "Fira Code", stack: "'Fira Code', monospace", sample: "const data = [];" },
    { id: "source-code-pro", name: "Source Code Pro", stack: "'Source Code Pro', monospace", sample: "export default {};" },
    { id: "dm-mono", name: "DM Mono", stack: "'DM Mono', monospace", sample: "npm run dev" }
  ] }
];
var FONT_SIZE_MAP = {
  "10px": "10px",
  "14px": "14px",
  "16px": "16px"
};
var FONT_SIZE_TOKEN_BASE = {
  xm: 8,
  sm: 10,
  xmd: 12,
  md: 14,
  lg: 16,
  xl: 22,
  xxl: 42
};
var FONT_WEIGHT_MAP = {
  300: "300",
  400: "400",
  600: "600",
  700: "700"
};
var FONT_WEIGHT_OFFSETS = {
  xs: -200,
  sm: -100,
  md: 0,
  lg: 100,
  xl: 200
};
function clampFontWeight(value) {
  return String(Math.min(900, Math.max(100, value)));
}
function applyFontSizeTokens(root, fontSize) {
  const basePx = parseFloat(FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP["14px"]);
  const scale2 = basePx / FONT_SIZE_TOKEN_BASE.md;
  Object.entries(FONT_SIZE_TOKEN_BASE).forEach(([token, px2]) => {
    root.style.setProperty(`--pa-fs-${token}`, `${Math.round(px2 * scale2 * 100) / 100}px`);
  });
  root.style.fontSize = `${basePx}px`;
  root.dataset.fontSize = fontSize;
}
function applyFontWeightTokens(root, fontWeight) {
  const base = parseInt(FONT_WEIGHT_MAP[fontWeight] || FONT_WEIGHT_MAP["400"], 10);
  Object.entries(FONT_WEIGHT_OFFSETS).forEach(([token, offset]) => {
    root.style.setProperty(`--pa-fw-${token}`, clampFontWeight(base + offset));
  });
  if (document.body) document.body.style.fontWeight = String(base);
  root.dataset.fontWeight = fontWeight;
}
var SPACING_MAP = {
  "5px": "5px",
  "10px": "10px",
  "15px": "15px"
};
var RADIUS_MAP = {
  "0px": { sm: "0px", md: "0px", lg: "0px", xl: "0px" },
  "5px": { sm: "5px", md: "10px", lg: "15px", xl: "20px" },
  "14px": { sm: "8px", md: "15px", lg: "18px", xl: "24px" },
  "25px": { sm: "14px", md: "18px", lg: "20px", xl: "30px" }
};
var ALL_FONT_IDS = CUSTOM_FONTS.flatMap((g) => g.fonts.map((f) => f.id));
var VALID_RADII = Object.keys(RADIUS_MAP);
var VALID_FONT_SIZES = Object.keys(FONT_SIZE_MAP);
function migrateFontSize(size) {
  if (typeof size === "string" && VALID_FONT_SIZES.includes(size)) return size;
  const px2 = parseFloat(String(size)) || 14;
  if (px2 <= 11) return "10px";
  if (px2 <= 15) return "14px";
  return "16px";
}
var VALID_FONT_WEIGHTS = Object.keys(FONT_WEIGHT_MAP);
var VALID_SPACINGS = Object.keys(SPACING_MAP);
var VALID_ICON_SIZES = Object.keys(ICON_SIZE_PRESETS);
function applyIconSizeVariables(root, iconSize) {
  const preset = ICON_SIZE_PRESETS[iconSize] || ICON_SIZE_PRESETS.medium;
  root.style.setProperty("--pa-icon-nav", preset.nav);
  root.style.setProperty("--pa-icon-action", preset.action);
  root.style.setProperty("--pa-icon-stat", preset.stat);
  root.style.setProperty("--pa-icon-header", preset.header);
  root.style.setProperty("--pa-icon-empty", preset.empty);
  root.style.setProperty("--pa-icon-toggle", preset.toggle);
  root.style.setProperty("--pa-icon-circle", preset.circle);
  root.style.setProperty("--pa-icon-btn", preset.btn);
  root.dataset.iconSize = VALID_ICON_SIZES.includes(iconSize) ? iconSize : "medium";
}
function hexToRgb(hex2) {
  return [parseInt(hex2.slice(1, 3), 16), parseInt(hex2.slice(3, 5), 16), parseInt(hex2.slice(5, 7), 16)].join(",");
}
function applyAccentCssVariables(root, accent) {
  const hex2 = /^#[0-9a-fA-F]{6}$/.test(accent) ? accent : APPEARANCE_DEFAULTS.accent;
  const rgb = hexToRgb(hex2);
  root.style.setProperty("--pa-orange", hex2);
  root.style.setProperty("--pa-orange-rgb", rgb);
  root.style.setProperty("--pa-orange-dim", `rgba(${rgb}, 0.12)`);
  root.style.setProperty("--pa-orange-hover", hex2);
  root.style.setProperty("--pa-orange-glow", `rgba(${rgb}, 0.22)`);
  root.style.setProperty("--pa-orange-border", `rgba(${rgb}, 0.28)`);
  root.style.setProperty("--pa-orange-lighter", `rgba(${rgb}, 0.5)`);
}
function isValidFontFamilyId(id, customFonts = []) {
  return ALL_FONT_IDS.includes(id) || customFonts.some((f) => f.id === id);
}
function getFontGroups(customFonts = []) {
  const groups = CUSTOM_FONTS.map((group) => ({ ...group, fonts: [...group.fonts] }));
  const normalized = normalizeCustomFonts(customFonts);
  if (normalized.length) {
    groups.unshift({
      group: "Your Uploads",
      fonts: normalized.map(customFontToOption)
    });
  }
  return groups;
}
function getFontById(id, customFonts = []) {
  for (const g of CUSTOM_FONTS) {
    const f = g.fonts.find((x) => x.id === id);
    if (f) return f;
  }
  const custom = normalizeCustomFonts(customFonts).find((f) => f.id === id);
  if (custom) return customFontToOption(custom);
  return CUSTOM_FONTS[0].fonts[0];
}
function normalizeAppearanceSettings(raw) {
  const settings = { ...APPEARANCE_DEFAULTS, customFonts: [] };
  if (!raw || typeof raw !== "object") return settings;
  if (["light", "dark", "system"].includes(raw.theme)) settings.theme = raw.theme;
  if (/^#[0-9a-fA-F]{6}$/.test(raw.accent)) settings.accent = raw.accent;
  if (raw.fontSize) settings.fontSize = migrateFontSize(raw.fontSize);
  settings.customFonts = normalizeCustomFonts(raw.customFonts);
  if (typeof raw.fontFamily === "string" && isValidFontFamilyId(raw.fontFamily, settings.customFonts)) {
    settings.fontFamily = raw.fontFamily;
  } else if (isCustomFontId(raw.fontFamily)) {
    settings.fontFamily = APPEARANCE_DEFAULTS.fontFamily;
  }
  const weight = String(raw.fontWeight);
  if (VALID_FONT_WEIGHTS.includes(weight)) settings.fontWeight = weight;
  if (typeof raw.cornerRadius === "string" && VALID_RADII.includes(raw.cornerRadius)) {
    settings.cornerRadius = raw.cornerRadius;
  }
  if (VALID_SPACINGS.includes(raw.cardSpacing)) settings.cardSpacing = raw.cardSpacing;
  if (VALID_ICON_SIZES.includes(raw.iconSize)) settings.iconSize = raw.iconSize;
  return settings;
}
function readAppearanceCache() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(APPEARANCE_CACHE_KEY);
    if (!raw) return null;
    return normalizeAppearanceSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}
function writeAppearanceCache(settings) {
  if (typeof window === "undefined" || !settings) return;
  try {
    localStorage.setItem(APPEARANCE_CACHE_KEY, JSON.stringify(normalizeAppearanceSettings(settings)));
  } catch (err) {
    console.warn("[appearanceCache] could not write localStorage:", err);
  }
}
function applyAppearanceSettings(settings, options = {}) {
  if (!settings || typeof document === "undefined") return;
  const normalized = normalizeAppearanceSettings(settings);
  const systemDark = options.systemDark ?? window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = normalized.theme === "system" ? systemDark : normalized.theme === "dark";
  document.body?.classList.toggle("light", !dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  const root = document.documentElement;
  applyAccentCssVariables(root, normalized.accent);
  applyFontSizeTokens(root, normalized.fontSize);
  registerCustomFonts(normalized.customFonts);
  ensureGoogleFontLoaded(normalized.fontFamily);
  const font = getFontById(normalized.fontFamily, normalized.customFonts);
  if (document.body) document.body.style.fontFamily = font.stack;
  applyFontWeightTokens(root, normalized.fontWeight);
  const radius = RADIUS_MAP[normalized.cornerRadius] || RADIUS_MAP["14px"];
  root.style.setProperty("--pa-radius", normalized.cornerRadius);
  root.style.setProperty("--pa-radius-sm", radius.sm);
  root.style.setProperty("--pa-radius-md", radius.md);
  root.style.setProperty("--pa-radius-lg", radius.lg);
  root.style.setProperty("--pa-radius-xl", radius.xl);
  const spacing = SPACING_MAP[normalized.cardSpacing] || "10px";
  root.style.setProperty("--pa-card-gap", spacing);
  root.dataset.cardSpacing = normalized.cardSpacing;
  applyIconSizeVariables(root, normalized.iconSize);
  eventBus.emit("appearance:updated", { settings: normalized });
  return normalized;
}
function bootstrapAppearanceFromCache() {
  const cached = readAppearanceCache();
  if (cached) applyAppearanceSettings(cached);
  if (typeof window !== "undefined") {
    window.__paWriteAppearanceCache = writeAppearanceCache;
  }
  return cached;
}

// client/modules/shell/CustomizationModule.ts
var CustomizationModule = class extends Module {
  constructor() {
    super({ name: "Customization" });
    this.settings = { ...APPEARANCE_DEFAULTS };
    this.systemMq = window.matchMedia("(prefers-color-scheme: dark)");
  }
  async init() {
    this.ensureFontSizeUI();
    this.ensureFontUploadUI();
    this.ensureIconSizeUI();
    this.bindEvents();
    await this.load();
    this.render();
  }
  async load() {
    const cached = readAppearanceCache();
    if (cached) {
      this.settings = normalizeAppearanceSettings(cached);
    }
  }
  async save() {
    writeAppearanceCache(this.settings);
  }
  render() {
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
    this.syncFavicon();
    this.syncUI();
  }
  applyTheme(t) {
    this.settings.theme = t;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
    this.syncFavicon();
  }
  applyAccent(hex2) {
    this.settings.accent = hex2;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
    this.syncFavicon();
  }
  syncFavicon() {
    updateFavicon(this.settings.accent, getThemeBackground());
  }
  applyFontSize(fs) {
    this.settings.fontSize = fs;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  applyFontFamily(id) {
    this.settings.fontFamily = id;
    const font = getFontById(id, this.settings.customFonts);
    const nameEl = $id("customFontTriggerName");
    const previewEl = $id("customFontTriggerPreview");
    if (nameEl) nameEl.textContent = font.name;
    if (previewEl) {
      previewEl.textContent = font.sample;
      previewEl.style.fontFamily = font.stack;
    }
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  applyFontWeight(weight) {
    this.settings.fontWeight = weight;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  applyCornerRadius(val) {
    this.settings.cornerRadius = val;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  applyCardSpacing(spacing) {
    this.settings.cardSpacing = spacing;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  applyIconSize(size) {
    this.settings.iconSize = size;
    applyAppearanceSettings(this.settings, { systemDark: this.systemMq.matches });
  }
  /** Normalize font-size controls to 10px / 14px / 16px on every page panel. */
  ensureFontSizeUI() {
    document.querySelectorAll('[data-panel="custom"][data-content="typography"]').forEach((panel) => {
      const sizeBtn = panel.querySelector(".custom-fs-btn[data-size]");
      const seg = sizeBtn?.closest(".custom-fs-seg");
      if (!seg || seg.dataset.fontSizeNormalized === "true") return;
      seg.dataset.fontSizeNormalized = "true";
      seg.innerHTML = VALID_FONT_SIZES.map((size) => `<button type="button" class="custom-fs-btn" data-size="${size}" role="radio" aria-checked="false">${size}</button>`).join("");
    });
  }
  ensureIconSizeUI() {
    const typographyPanel = document.querySelector('[data-panel="custom"][data-content="typography"]');
    if (!typographyPanel || $id("customIconSizeSection")) return;
    const section = document.createElement("div");
    section.className = "pa-form-group mt-8";
    section.id = "customIconSizeSection";
    section.innerHTML = `
      <label class="pa-form-label">Icon Size</label>
      <div class="custom-icon-size-group" id="customIconSizeGroup" role="radiogroup" aria-label="Icon size">
        ${VALID_ICON_SIZES.map((size) => {
      const label = size.charAt(0).toUpperCase() + size.slice(1);
      const preview = ICON_PREVIEW_SIZES[size];
      return `
          <button type="button" class="custom-icon-size-card" data-icon-size="${size}" role="radio" aria-checked="false" aria-label="${label} icon size">
            <div class="custom-icon-size-preview" aria-hidden="true">
              <i class="ri-home-4-line" style="font-size:${preview}"></i>
              <i class="ri-settings-3-line" style="font-size:${preview}"></i>
              <i class="ri-notification-3-line" style="font-size:${preview}"></i>
            </div>
            <span class="custom-icon-size-label">${label}</span>
          </button>`;
    }).join("")}
      </div>`;
    typographyPanel.appendChild(section);
  }
  ensureFontUploadUI() {
    const typographyPanel = document.querySelector('[data-panel="custom"][data-content="typography"]');
    if (!typographyPanel || $id("customFontUploadSection")) return;
    const section = document.createElement("div");
    section.className = "pa-form-group mt-8";
    section.id = "customFontUploadSection";
    section.innerHTML = `
      <label class="pa-form-label">Upload Custom Font</label>
      <div class="pa-font-upload" id="customFontUpload" role="button" tabindex="0" aria-label="Upload a custom font file">
        <i class="ri-font-size-2" aria-hidden="true"></i>
        <div class="pa-media-upload-text">Click or drag a font file here</div>
        <div class="pa-media-upload-hint">WOFF, WOFF2, TTF, OTF \u2014 Max 2MB (up to ${MAX_CUSTOM_FONTS} fonts)</div>
        <input type="file" id="customFontFileInput" name="customFontFileInput" accept=".woff,.woff2,.ttf,.otf,font/woff,font/woff2,font/ttf,font/otf" hidden aria-label="Upload custom font file" />
      </div>
      <div class="custom-font-upload-list" id="customFontUploadList" aria-live="polite"></div>`;
    const fontSizeGroup = typographyPanel.querySelector(".pa-form-group.mt-8");
    if (fontSizeGroup) typographyPanel.insertBefore(section, fontSizeGroup);
    else typographyPanel.appendChild(section);
  }
  renderUploadedFontsList() {
    const list = $id("customFontUploadList");
    const dropzone = $id("customFontUpload");
    if (!list) return;
    const fonts = this.settings.customFonts || [];
    if (!fonts.length) {
      list.innerHTML = "";
      dropzone?.classList.remove("is-full");
      return;
    }
    dropzone?.classList.toggle("is-full", fonts.length >= MAX_CUSTOM_FONTS);
    list.innerHTML = fonts.map((font) => `
      <div class="custom-font-upload-item" data-font-id="${escapeHtml(font.id)}">
        <div class="custom-font-upload-item-main">
          <span class="custom-font-upload-item-name" style="font-family:'${escapeHtml(font.familyName)}', sans-serif">${escapeHtml(font.name)}</span>
          <span class="custom-font-upload-item-meta">${escapeHtml(font.fileName || "Custom font")}</span>
        </div>
        <div class="custom-font-upload-item-actions">
          <button type="button" class="custom-font-upload-use" data-font-id="${escapeHtml(font.id)}" title="Use this font" aria-label="Use ${escapeHtml(font.name)}">Use</button>
          <button type="button" class="custom-font-upload-delete" data-font-id="${escapeHtml(font.id)}" title="Remove font" aria-label="Remove ${escapeHtml(font.name)}"><i class="ri-delete-bin-line"></i></button>
        </div>
      </div>`).join("");
  }
  async handleFontUpload(fileList) {
    const file = Array.from(fileList || [])[0];
    if (!file) return;
    const current = this.settings.customFonts || [];
    if (current.length >= MAX_CUSTOM_FONTS) {
      this.showCustomToast(`Maximum of ${MAX_CUSTOM_FONTS} custom fonts reached`);
      return;
    }
    const dropzone = $id("customFontUpload");
    dropzone?.classList.add("is-uploading");
    try {
      const entry = await buildCustomFontFromFile(file);
      this.settings.customFonts = [...current, entry];
      this.settings.fontFamily = entry.id;
      this.applyFontFamily(entry.id);
      this.renderUploadedFontsList();
      this.buildFontList($id("customFontSearch")?.value);
      await this.save();
      this.showCustomToast(`Font uploaded \u2192 ${entry.name}`);
    } catch (err) {
      this.showCustomToast(err?.message || "Could not upload font", "danger");
    } finally {
      dropzone?.classList.remove("is-uploading");
      const input = $id("customFontFileInput");
      if (input) input.value = "";
    }
  }
  async removeCustomFont(id) {
    const fonts = this.settings.customFonts || [];
    const next = fonts.filter((f) => f.id !== id);
    if (next.length === fonts.length) return;
    this.settings.customFonts = next;
    if (this.settings.fontFamily === id) {
      this.settings.fontFamily = APPEARANCE_DEFAULTS.fontFamily;
      this.applyFontFamily(this.settings.fontFamily);
    }
    this.renderUploadedFontsList();
    this.buildFontList($id("customFontSearch")?.value);
    await this.save();
    this.showCustomToast("Custom font removed");
  }
  buildFontList(query) {
    const list = $id("customFontList");
    const noRes = $id("customFontNoResults");
    if (!list) return;
    list.innerHTML = "";
    const q = (query || "").toLowerCase().trim();
    let total = 0;
    getFontGroups(this.settings.customFonts).forEach((group) => {
      const filtered = group.fonts.filter(
        (f) => !q || f.name.toLowerCase().includes(q) || f.sample.toLowerCase().includes(q)
      );
      if (!filtered.length) return;
      const groupEl = document.createElement("div");
      groupEl.className = "custom-font-group-label";
      groupEl.textContent = group.group;
      list.appendChild(groupEl);
      filtered.forEach((font) => {
        total++;
        const btn = document.createElement("button");
        btn.className = "custom-font-option" + (font.id === this.settings.fontFamily ? " active" : "");
        btn.setAttribute("role", "option");
        btn.setAttribute("aria-selected", String(font.id === this.settings.fontFamily));
        btn.setAttribute("data-font-id", font.id);
        btn.innerHTML = `
          <div class="custom-font-option-left">
            <span class="custom-font-option-name">${escapeHtml(font.name)}</span>
            <span class="custom-font-option-sample" style="font-family:${font.stack}">${escapeHtml(font.sample)}</span>
          </div>
          <div class="custom-font-option-right">
            <span class="custom-font-option-tag">${font.isCustom ? "custom" : escapeHtml(font.id)}</span>
            <svg class="custom-font-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </div>`;
        this.on(btn, "click", () => {
          this.settings.fontFamily = font.id;
          this.applyFontFamily(font.id);
          this.buildFontList($id("customFontSearch")?.value);
          this.closeFontDropdown();
          this.save();
          this.showCustomToast(`Font \u2192 ${font.name}`);
        });
        list.appendChild(btn);
      });
    });
    if (noRes) noRes.style.display = total === 0 ? "block" : "none";
  }
  openFontDropdown() {
    const wrap2 = $id("customFontDropdownWrap");
    const trigger = $id("customFontTrigger");
    const search = $id("customFontSearch");
    if (!wrap2) return;
    wrap2.classList.add("open");
    trigger?.setAttribute("aria-expanded", "true");
    this.buildFontList("");
    setTimeout(() => search?.focus(), 60);
  }
  closeFontDropdown() {
    $id("customFontDropdownWrap")?.classList.remove("open");
    $id("customFontTrigger")?.setAttribute("aria-expanded", "false");
  }
  toggleFontDropdown() {
    $id("customFontDropdownWrap")?.classList.contains("open") ? this.closeFontDropdown() : this.openFontDropdown();
  }
  syncUI() {
    document.querySelectorAll(".custom-theme-card").forEach((el) => {
      const active = el.dataset.theme === this.settings.theme;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-swatch").forEach((el) => {
      const active = el.dataset.color === this.settings.accent;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-fs-btn[data-size]").forEach((el) => {
      const active = el.dataset.size === this.settings.fontSize;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-fs-btn[data-weight]").forEach((el) => {
      const active = el.dataset.weight === this.settings.fontWeight;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-fs-btn[data-spacing]").forEach((el) => {
      const active = el.dataset.spacing === this.settings.cardSpacing;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-cr-btn").forEach((el) => {
      const active = el.dataset.radius === this.settings.cornerRadius;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    document.querySelectorAll(".custom-icon-size-card").forEach((el) => {
      const active = el.dataset.iconSize === this.settings.iconSize;
      el.classList.toggle("active", active);
      el.setAttribute("aria-checked", String(active));
    });
    const font = getFontById(this.settings.fontFamily, this.settings.customFonts);
    const nameEl = $id("customFontTriggerName");
    const previewEl = $id("customFontTriggerPreview");
    if (nameEl) nameEl.textContent = font.name;
    if (previewEl) {
      previewEl.textContent = font.sample;
      previewEl.style.fontFamily = font.stack;
    }
    this.renderUploadedFontsList();
  }
  showCustomToast(msg, variant = "info") {
    const wrap2 = $id("paCustomToastWrap");
    if (!wrap2) return;
    const el = document.createElement("div");
    el.className = `pa-toast ${variant}`;
    el.innerHTML = `<i class="pa-toast-icon ri-palette-line"></i><span>${msg}</span><button class="pa-toast-close" aria-label="Dismiss"><i class="ri-close-line"></i></button>`;
    const dismiss = () => {
      el.classList.add("removing");
      setTimeout(() => el.remove(), 200);
    };
    el.querySelector(".pa-toast-close").addEventListener("click", dismiss);
    wrap2.appendChild(el);
    setTimeout(() => {
      if (el.parentElement) dismiss();
    }, 2500);
  }
  togglePanel() {
    const panel = $id("paCustomPanel");
    const toggleBtn = $id("paCustomToggle") || document.querySelector(".pa-custom-toggle");
    if (!panel) return;
    if (panel.classList.contains("visible")) {
      this.closePanel();
    } else {
      closePanels();
      panel.classList.add("visible");
      $id("paPanelOverlay")?.classList.add("visible");
      toggleBtn?.classList.add("active");
      document.body.style.overflow = "hidden";
      this.syncUI();
      activateTab("custom", "theme");
      setTimeout(() => panel.querySelector("button, input, select")?.focus(), 100);
    }
  }
  closePanel() {
    $id("paCustomPanel")?.classList.remove("visible");
    $id("paPanelOverlay")?.classList.remove("visible");
    ($id("paCustomToggle") || document.querySelector(".pa-custom-toggle"))?.classList.remove("active");
    document.body.style.overflow = "";
    this.closeFontDropdown();
  }
  bindFontUploadEvents() {
    const dropzone = $id("customFontUpload");
    const fileInput = $id("customFontFileInput");
    const list = $id("customFontUploadList");
    if (!dropzone || !fileInput) return;
    this.on(dropzone, "click", (e) => {
      if (e.target.closest(".custom-font-upload-delete, .custom-font-upload-use")) return;
      if (dropzone.classList.contains("is-full")) {
        this.showCustomToast(`Maximum of ${MAX_CUSTOM_FONTS} custom fonts reached`);
        return;
      }
      fileInput.click();
    });
    this.on(dropzone, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dropzone.click();
      }
    });
    this.on(fileInput, "change", (e) => this.handleFontUpload(e.target.files));
    ["dragenter", "dragover"].forEach((evt) => {
      this.on(dropzone, evt, (e) => {
        e.preventDefault();
        if (!dropzone.classList.contains("is-full")) dropzone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((evt) => {
      this.on(dropzone, evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
      });
    });
    this.on(dropzone, "drop", (e) => {
      if (dropzone.classList.contains("is-full")) return;
      const files = e.dataTransfer?.files;
      if (files?.length) this.handleFontUpload(files);
    });
    if (list) {
      this.on(list, "click", (e) => {
        const useBtn = e.target.closest(".custom-font-upload-use");
        const deleteBtn = e.target.closest(".custom-font-upload-delete");
        if (useBtn) {
          const id = useBtn.dataset.fontId;
          this.settings.fontFamily = id;
          this.applyFontFamily(id);
          this.syncUI();
          this.save();
          this.showCustomToast(`Font \u2192 ${getFontById(id, this.settings.customFonts).name}`);
        } else if (deleteBtn) {
          this.removeCustomFont(deleteBtn.dataset.fontId);
        }
      });
    }
  }
  bindEvents() {
    registerPanel("paCustomPanel");
    this.bindFontUploadEvents();
    const toggleBtn = $id("paCustomToggle") || document.querySelector(".pa-custom-toggle");
    this.on(toggleBtn, "click", () => this.togglePanel());
    this.on($id("paCustomPanelClose"), "click", () => this.closePanel());
    this.on($id("paCustomCancel"), "click", () => this.closePanel());
    this.on($id("paPanelOverlay"), "click", (e) => {
      if (e.target.id === "paPanelOverlay" && $id("paCustomPanel")?.classList.contains("visible")) {
        this.closePanel();
      }
    });
    this.on(document, "keydown", (e) => {
      if (e.key === "Escape" && $id("paCustomPanel")?.classList.contains("visible")) this.closePanel();
    });
    document.querySelectorAll(".custom-theme-card").forEach((btn) => {
      this.on(btn, "click", () => {
        this.settings.theme = btn.dataset.theme;
        this.applyTheme(this.settings.theme);
        this.syncUI();
        this.save();
        this.showCustomToast(`Theme \u2192 ${this.settings.theme}`);
      });
    });
    document.querySelectorAll(".custom-swatch").forEach((btn) => {
      this.on(btn, "click", () => {
        this.settings.accent = btn.dataset.color;
        this.applyAccent(this.settings.accent);
        this.syncUI();
        this.save();
        this.showCustomToast("Accent color updated");
      });
    });
    const customPanel = $id("paCustomPanel");
    this.on(customPanel, "click", (e) => {
      const btn = e.target.closest(".custom-fs-btn");
      if (!btn || !customPanel?.contains(btn)) return;
      if (btn.dataset.size && VALID_FONT_SIZES.includes(btn.dataset.size)) {
        this.settings.fontSize = btn.dataset.size;
        this.applyFontSize(this.settings.fontSize);
        this.syncUI();
        this.save();
        this.showCustomToast(`Font size \u2192 ${this.settings.fontSize}`);
      } else if (btn.dataset.weight && VALID_FONT_WEIGHTS.includes(btn.dataset.weight)) {
        this.settings.fontWeight = btn.dataset.weight;
        this.applyFontWeight(this.settings.fontWeight);
        this.syncUI();
        this.save();
        this.showCustomToast(`Font weight \u2192 ${this.settings.fontWeight}`);
      } else if (btn.dataset.spacing && VALID_SPACINGS.includes(btn.dataset.spacing)) {
        this.settings.cardSpacing = btn.dataset.spacing;
        this.applyCardSpacing(this.settings.cardSpacing);
        this.syncUI();
        this.save();
        this.showCustomToast(`Card spacing \u2192 ${this.settings.cardSpacing}`);
      }
    });
    document.querySelectorAll(".custom-icon-size-card").forEach((btn) => {
      this.on(btn, "click", () => {
        if (!VALID_ICON_SIZES.includes(btn.dataset.iconSize)) return;
        this.settings.iconSize = btn.dataset.iconSize;
        this.applyIconSize(this.settings.iconSize);
        this.syncUI();
        this.save();
        const label = btn.dataset.iconSize.charAt(0).toUpperCase() + btn.dataset.iconSize.slice(1);
        this.showCustomToast(`Icon size \u2192 ${label}`);
      });
    });
    const radiusLabels = { "0px": "None", "5px": "Small", "14px": "Medium", "25px": "Large" };
    document.querySelectorAll(".custom-cr-btn").forEach((btn) => {
      this.on(btn, "click", () => {
        this.settings.cornerRadius = btn.dataset.radius;
        this.applyCornerRadius(this.settings.cornerRadius);
        this.syncUI();
        this.save();
        this.showCustomToast(`Corner radius \u2192 ${radiusLabels[this.settings.cornerRadius] || this.settings.cornerRadius}`);
      });
      this.on(btn, "keydown", (e) => {
        const all = [...document.querySelectorAll(".custom-cr-btn")];
        const idx = all.indexOf(btn);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          all[(idx + 1) % all.length]?.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          all[(idx - 1 + all.length) % all.length]?.focus();
        } else if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });
    });
    this.on($id("customFontTrigger"), "click", () => this.toggleFontDropdown());
    this.on($id("customFontSearch"), "input", (e) => this.buildFontList(e.target.value));
    this.on(document, "click", (e) => {
      const wrap2 = $id("customFontDropdownWrap");
      if (wrap2 && !wrap2.contains(e.target)) this.closeFontDropdown();
    });
    this.on($id("customFontDropdownWrap"), "keydown", (e) => {
      if (e.key === "Escape") {
        this.closeFontDropdown();
        $id("customFontTrigger")?.focus();
      }
    });
    this.on(this.systemMq, "change", () => {
      if (this.settings.theme === "system") this.applyTheme("system");
    });
    document.querySelectorAll('.pa-panel-tab[data-panel="custom"]').forEach((btn) => {
      this.on(btn, "click", () => {
        activateTab("custom", btn.dataset.tab);
        this.syncUI();
      });
    });
    const observer = new MutationObserver(() => {
      if ($id("paCustomPanel")?.classList.contains("visible")) this.syncUI();
    });
    const panel = $id("paCustomPanel");
    if (panel) observer.observe(panel, { attributes: true, attributeFilter: ["class"] });
    this._observer = observer;
  }
  destroy() {
    this._observer?.disconnect();
    super.destroy();
  }
};

// client/utils/avatar-upload.ts
async function uploadUserAvatar(file, opts = {}) {
  if (!file) return null;
  if (!handleFileValidation(file)) return null;
  const previousImg = document.querySelector("#paUserDropdownAvatar .pa-avatar img");
  const previousAvatarUrl = previousImg?.src || null;
  const previewUrl = URL.createObjectURL(file);
  previewUserAvatar(previewUrl);
  opts.onPreview?.(previewUrl);
  const avatarBtn = document.getElementById("paUserDropdownAvatar");
  avatarBtn?.classList.add("is-uploading");
  try {
    const uploaded = await uploadCmsFileWithPreview(file, {
      folder: "avatars",
      page: "shell",
      purpose: "user-avatar"
    });
    const data = await authService.updateProfile({ avatarUrl: uploaded.url });
    const profile = data?.profile ?? data;
    if (!profile || typeof profile !== "object") {
      throw new Error("Server did not return an updated profile.");
    }
    applyUserDisplay({
      fullName: profile.fullName,
      username: profile.username,
      email: profile.email,
      role: profile.role,
      avatarUrl: profile.avatarUrl
    });
    eventBus.emit("profile:updated", profile);
    showToast("Avatar updated!", "success", 2200);
    opts.onComplete?.(profile);
    return profile;
  } catch (err) {
    if (previousAvatarUrl) {
      previewUserAvatar(previousAvatarUrl);
    } else {
      try {
        const profile = await authService.getProfile();
        applyUserDisplay(profile);
      } catch {
      }
    }
    showToast(err?.message || "Could not save avatar.", "danger");
    opts.onComplete?.(null);
    return null;
  } finally {
    URL.revokeObjectURL(previewUrl);
    avatarBtn?.classList.remove("is-uploading");
  }
}

// client/modules/shell/mobileHeaderSearch.ts
var MOBILE_SEARCH_MAX = 899;
var abortController = null;
var headerTop = null;
function getSearchWrap() {
  return document.querySelector(".pa-header-top-left .pa-search, .pa-header-right .pa-search");
}
function getSearchInput() {
  return getSearchWrap()?.querySelector("input");
}
function isMobileSearchViewport() {
  return window.innerWidth <= MOBILE_SEARCH_MAX;
}
function isMobileHeaderSearchOpen() {
  return headerTop?.classList.contains("pa-header-top--search-open") ?? false;
}
function closeMobileHeaderSearch() {
  if (!headerTop) return;
  headerTop.classList.remove("pa-header-top--search-open");
  document.documentElement.classList.remove("pa-mobile-search-active");
  const toggle = document.getElementById("paMobileSearchToggle");
  toggle?.setAttribute("aria-expanded", "false");
}
function openMobileHeaderSearch() {
  const wrap2 = getSearchWrap();
  if (!wrap2 || !headerTop || !isMobileSearchViewport()) return false;
  document.getElementById("paNotifWrap")?.classList.remove("open");
  headerTop.classList.add("pa-header-top--search-open");
  document.documentElement.classList.add("pa-mobile-search-active");
  const toggle = document.getElementById("paMobileSearchToggle");
  toggle?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => getSearchInput()?.focus());
  return true;
}
function initMobileHeaderSearch() {
  abortController?.abort();
  abortController = new AbortController();
  const { signal } = abortController;
  headerTop = document.querySelector(".pa-header-top");
  const searchWrap = getSearchWrap();
  const headerTopRight = document.querySelector(".pa-header-top-right");
  if (!headerTop || !searchWrap || !headerTopRight) {
    headerTop = null;
    return;
  }
  closeMobileHeaderSearch();
  let toggle = document.getElementById("paMobileSearchToggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.id = "paMobileSearchToggle";
    toggle.className = "pa-mobile-search-toggle";
    toggle.setAttribute("aria-label", "Open search");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", searchWrap.id || "paSearchWrap");
    toggle.innerHTML = '<i class="ri-search-line" aria-hidden="true"></i>';
    headerTopRight.insertBefore(toggle, headerTopRight.firstChild);
  }
  let dismiss = searchWrap.querySelector(".pa-mobile-search-dismiss");
  if (!dismiss) {
    dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "pa-mobile-search-dismiss";
    dismiss.setAttribute("aria-label", "Close search");
    dismiss.innerHTML = '<i class="ri-close-line" aria-hidden="true"></i>';
    searchWrap.appendChild(dismiss);
  }
  toggle.addEventListener("click", () => {
    if (isMobileHeaderSearchOpen()) closeMobileHeaderSearch();
    else openMobileHeaderSearch();
  }, { signal });
  dismiss.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileHeaderSearch();
  }, { signal });
  window.addEventListener("resize", () => {
    if (!isMobileSearchViewport()) closeMobileHeaderSearch();
  }, { signal });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !isMobileHeaderSearchOpen()) return;
    e.preventDefault();
    e.stopPropagation();
    closeMobileHeaderSearch();
  }, { signal, capture: true });
}

// client/modules/shell/roleAccessModal.ts
var BRIEFING_VERSION = "v1";
var STORAGE_PREFIX = "pa_role_access_briefing";
var ROLE_BRIEFINGS = {
  editor: {
    title: "Editor account",
    subtitle: "You can manage portfolio content and update selected settings.",
    icon: "ri-edit-box-line",
    allowed: [
      "View every dashboard and content page",
      "Create, edit, and delete projects, media, blog posts, and other CMS data",
      "Moderate blog comments and likes on the Comments & Likes page",
      "Update General, Notifications, Profile, and Security settings",
      "Use appearance and customization options"
    ],
    restricted: [
      "User management or adding new staff accounts",
      "System settings and database tools",
      "Admin-only sidebar links stay hidden for your role"
    ]
  },
  viewer: {
    title: "Viewer account",
    subtitle: "Your access is read-only across the portfolio dashboard.",
    icon: "ri-eye-line",
    allowed: [
      "View dashboard stats and all content pages",
      "Browse projects, media, messages, and other records",
      "Update Notifications, Profile, and Security settings",
      "Use appearance and customization options"
    ],
    restricted: [
      "Create, edit, or delete any content or records",
      "Access the Comments & Likes moderation page",
      "Dashboard add actions, bulk actions, and edit panels",
      "Changing General site settings (view only)",
      "User management and system settings"
    ]
  }
};
var bindingsReady = false;
function storageKey(userId, role) {
  return `${STORAGE_PREFIX}_${BRIEFING_VERSION}_${userId}_${role}`;
}
function hasSeenBriefing(userId, role) {
  try {
    return localStorage.getItem(storageKey(userId, role)) === "1";
  } catch {
    return false;
  }
}
function markBriefingSeen(userId, role) {
  try {
    localStorage.setItem(storageKey(userId, role), "1");
  } catch {
  }
}
function formatRoleLabel(role) {
  return (role || "staff").replace(/_/g, " ");
}
function renderList(items, variant) {
  return items.map((item) => `<li class="pa-role-access-item pa-role-access-item--${variant}">
      <i class="${variant === "allowed" ? "ri-check-line" : "ri-close-line"}" aria-hidden="true"></i>
      <span>${item}</span>
    </li>`).join("");
}
function ensureModalInDom() {
  if ($id("paRoleAccessOverlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "pa-role-access-overlay";
  overlay.id = "paRoleAccessOverlay";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "paRoleAccessTitle");
  overlay.innerHTML = `
    <div class="pa-role-access-box">
      <div class="pa-role-access-head">
        <div class="pa-role-access-icon" id="paRoleAccessIcon" aria-hidden="true">
          <i class="ri-shield-user-line"></i>
        </div>
        <div>
          <div class="pa-role-access-eyebrow" id="paRoleAccessEyebrow">Account access</div>
          <div class="pa-role-access-title" id="paRoleAccessTitle">Your permissions</div>
          <div class="pa-role-access-subtitle" id="paRoleAccessSubtitle"></div>
        </div>
      </div>
      <div class="pa-role-access-body">
        <div class="pa-role-access-section">
          <div class="pa-role-access-section-title allowed"><i class="ri-check-double-line"></i> You can</div>
          <ul class="pa-role-access-list" id="paRoleAccessAllowed"></ul>
        </div>
        <div class="pa-role-access-section">
          <div class="pa-role-access-section-title restricted"><i class="ri-forbid-line"></i> You cannot</div>
          <ul class="pa-role-access-list" id="paRoleAccessRestricted"></ul>
        </div>
      </div>
      <div class="pa-role-access-foot">
        <p class="pa-role-access-note">These limits are enforced in the sidebar, settings, and API. To request a role change, open Settings \u2192 Security and use the "Request role update" form.</p>
        <button type="button" class="pa-btn pa-btn-primary w-100" id="paRoleAccessOk">Got it</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}
function bindModalEvents() {
  if (bindingsReady) return;
  bindingsReady = true;
  const overlay = $id("paRoleAccessOverlay");
  const okBtn = $id("paRoleAccessOk");
  if (!overlay || !okBtn) return;
  const close = () => {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    document.body.classList.remove("pa-role-access-open");
    overlay.dataset.userId = "";
    overlay.dataset.role = "";
  };
  okBtn.addEventListener("click", () => {
    const userId = overlay.dataset.userId;
    const role = overlay.dataset.role;
    if (userId && role) markBriefingSeen(userId, role);
    close();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("visible")) close();
  });
}
function populateModal(role) {
  const briefing = ROLE_BRIEFINGS[role];
  if (!briefing) return;
  const iconWrap = $id("paRoleAccessIcon");
  const eyebrow = $id("paRoleAccessEyebrow");
  const title = $id("paRoleAccessTitle");
  const subtitle = $id("paRoleAccessSubtitle");
  const allowed = $id("paRoleAccessAllowed");
  const restricted = $id("paRoleAccessRestricted");
  if (iconWrap) iconWrap.innerHTML = `<i class="${briefing.icon}"></i>`;
  if (eyebrow) eyebrow.textContent = `${formatRoleLabel(role)} access`;
  if (title) title.textContent = briefing.title;
  if (subtitle) subtitle.textContent = briefing.subtitle;
  if (allowed) allowed.innerHTML = renderList(briefing.allowed, "allowed");
  if (restricted) restricted.innerHTML = renderList(briefing.restricted, "restricted");
}
function openModal(userId, role) {
  ensureModalInDom();
  bindModalEvents();
  const overlay = $id("paRoleAccessOverlay");
  if (!overlay) return;
  populateModal(role);
  overlay.dataset.userId = userId;
  overlay.dataset.role = role;
  overlay.hidden = false;
  overlay.classList.add("visible");
  document.body.classList.add("pa-role-access-open");
  $id("paRoleAccessOk")?.focus();
}
async function maybeShowRoleAccessModal(profile = null) {
  if (typeof window === "undefined") return;
  if (window.location.pathname.includes("/admin/login")) return;
  let userId = profile?.id;
  let role = profile?.role;
  if (!role || !userId) {
    try {
      const session = await authService.session();
      userId = userId || session?.user?.id;
      if (!role) {
        const loaded = await authService.getProfile().catch(() => null);
        role = loaded?.role || session?.user?.role;
        userId = userId || loaded?.id;
      }
    } catch {
      return;
    }
  }
  if (!userId || !role || !ROLE_BRIEFINGS[role]) return;
  if (hasSeenBriefing(userId, role)) return;
  requestAnimationFrame(() => {
    openModal(userId, role);
  });
}

// client/modules/shell/elevationBanner.ts
var BANNER_ID = "paElevationBanner";
var expiryTimer = null;
function clearExpiryTimer() {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
}
function formatUntil(iso) {
  try {
    return new Date(iso).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}
async function refreshSessionAfterExpiry() {
  try {
    const data = await authService.session();
    const user = data?.user;
    if (user) {
      applyUserDisplay(user);
      applyRoleBasedAccess(user.role, user.capabilities);
      applyCapabilityGatedElements(user.capabilities);
    }
  } catch {
  }
  syncElevationBanner();
}
function syncElevationBanner() {
  clearExpiryTimer();
  const caps = getAccessCapabilities();
  const main = document.querySelector(".pa-main");
  if (!main) return;
  const existing = $id(BANNER_ID);
  if (!caps.isElevated || !caps.elevatedUntil) {
    existing?.remove();
    return;
  }
  let banner = existing;
  if (!banner) {
    banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.className = "pa-elevation-banner";
    banner.setAttribute("role", "status");
    main.insertBefore(banner, main.firstChild);
  }
  banner.innerHTML = `<i class="ri-shield-check-line" aria-hidden="true"></i>
    <span>Temporary <strong>editor</strong> role active until <strong>${formatUntil(caps.elevatedUntil)}</strong>, then your account reverts automatically.</span>`;
  const ms = new Date(caps.elevatedUntil).getTime() - Date.now();
  if (ms > 0 && ms < 24 * 60 * 60 * 1e3) {
    expiryTimer = setTimeout(() => {
      void refreshSessionAfterExpiry();
    }, ms + 500);
  }
}

// client/modules/shell/globalSearch.ts
var listEl = null;
var inputEl = null;
var documentClickBound = false;
function findHeaderSearchInput() {
  return document.querySelector(
    ".pa-header-top-left .pa-global-search input, .pa-header-top .pa-global-search input, .pa-header-top-left .pa-search input"
  );
}
function ensureResultsList() {
  if (!inputEl) return null;
  const wrap2 = inputEl.closest(".pa-search");
  if (!wrap2) return null;
  let panel = wrap2.querySelector(".pa-global-search-results");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "pa-global-search-results";
    panel.setAttribute("role", "listbox");
    panel.hidden = true;
    wrap2.appendChild(panel);
  }
  listEl = panel;
  return panel;
}
function renderResults(results) {
  const panel = ensureResultsList();
  if (!panel) return;
  if (!results.length) {
    panel.innerHTML = '<div class="pa-global-search-empty">No matches</div>';
    panel.hidden = false;
    return;
  }
  panel.innerHTML = results.map(
    (item) => `<a class="pa-global-search-item" role="option" href="${item.href}">
        <span class="pa-global-search-item-title">${item.title}</span>
        <span class="pa-global-search-item-meta">${item.type}${item.subtitle ? ` \xB7 ${item.subtitle}` : ""}</span>
      </a>`
  ).join("");
  panel.hidden = false;
}
async function runSearch(query) {
  const q = query.trim();
  if (q.length < 2) {
    if (listEl) listEl.hidden = true;
    return;
  }
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=12`, {
      credentials: "same-origin"
    });
    if (!res.ok) return;
    const data = await res.json();
    renderResults(data.results || []);
  } catch {
  }
}
var debouncedSearch = debounce((value) => {
  void runSearch(value);
}, 280);
function ensureHeaderSearchInput() {
  const left = document.querySelector(".pa-header-top-left");
  if (!left || left.querySelector(".pa-search input")) return;
  const wrap2 = document.createElement("div");
  wrap2.id = "paGlobalSearchWrap";
  wrap2.className = "pa-search pa-global-search";
  wrap2.innerHTML = '<i class="ri-search-line" aria-hidden="true"></i><input type="search" id="paGlobalSearchInput" name="paGlobalSearchInput" placeholder="Search CMS\u2026" aria-label="Search CMS" autocomplete="off" />';
  left.appendChild(wrap2);
}
function bindDocumentDismiss() {
  if (documentClickBound) return;
  documentClickBound = true;
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!inputEl?.closest(".pa-search")?.contains(target) && listEl && !listEl.contains(target)) {
      listEl.hidden = true;
    }
  });
}
function bindSearchInput(input) {
  inputEl = input;
  if (input.dataset.paGlobalSearchBound === "1") return;
  input.dataset.paGlobalSearchBound = "1";
  input.setAttribute("autocomplete", "off");
  input.addEventListener("input", () => debouncedSearch(input.value || ""));
  input.addEventListener("focus", () => {
    if ((input.value || "").trim().length >= 2) debouncedSearch(input.value || "");
  });
}
function getGlobalSearchInput() {
  ensureHeaderSearchInput();
  return findHeaderSearchInput();
}
function focusGlobalSearch() {
  const input = getGlobalSearchInput();
  if (!input) return false;
  bindSearchInput(input);
  input.focus();
  return true;
}
function initGlobalSearch() {
  ensureHeaderSearchInput();
  bindDocumentDismiss();
  const input = findHeaderSearchInput();
  if (!input) return;
  bindSearchInput(input);
}

// client/modules/shell/ShellModule.ts
var ShellModule = class extends Module {
  constructor() {
    super({ name: "Shell" });
    this._sessionExpiryTimer = null;
    this.customization = new CustomizationModule();
    this.addUser = new AddUserManager({
      on: this.on.bind(this),
      closeUserMenu: () => {
        this._userMenuWrap?.classList.remove("open");
        $id("paUserMenu")?.setAttribute("aria-expanded", "false");
      }
    });
  }
  async init() {
    initConfirmDialog();
    this.bindEvents();
    this.addUser.bindEvents();
    this.onBus("profile:updated", (profile) => {
      applyUserDisplay(profile);
      applyRoleBasedAccess(profile?.role);
      this.addUser.setProfileRole(profile?.role);
    });
    await Promise.all([
      this.loadUserSession(),
      this.customization.init(),
      loadNotifications({ force: true })
    ]);
    renderNotifications();
    initSettingsNav();
    initSidebarGroupNav();
    initSidebarCollapse();
    initGlobalSearch();
  }
  async loadUserSession() {
    try {
      const { user, sessionExpiresAt } = await authService.session();
      if (!user) return;
      this.scheduleSessionExpiry(sessionExpiresAt);
      try {
        const profile = await authService.getProfile();
        applyUserDisplay({
          fullName: profile.fullName,
          username: profile.username,
          email: profile.email || user.email,
          role: profile.role || user.role,
          avatarUrl: profile.avatarUrl
        });
        applyRoleBasedAccess(profile.role || user.role, user.capabilities);
        syncElevationBanner();
        storage.reconcileRecentActivitiesScope({
          user: { id: profile.id || user.id, capabilities: user.capabilities }
        });
        this.addUser.setProfileRole(profile.role || user.role);
        void maybeShowRoleAccessModal({
          id: profile.id || user.id,
          role: profile.role || user.role
        });
      } catch {
        applyUserDisplay(user);
        applyRoleBasedAccess(user.role, user.capabilities);
        syncElevationBanner();
        storage.reconcileRecentActivitiesScope({ user });
        this.addUser.setProfileRole(user.role);
        void maybeShowRoleAccessModal({ id: user.id, role: user.role });
      }
    } catch (err) {
      console.warn("[Shell] session load failed:", err);
    }
  }
  scheduleSessionExpiry(sessionExpiresAt) {
    if (this._sessionExpiryTimer) {
      window.clearTimeout(this._sessionExpiryTimer);
      this._sessionExpiryTimer = null;
    }
    if (!sessionExpiresAt) return;
    const ms = new Date(sessionExpiresAt).getTime() - Date.now();
    if (ms <= 0) {
      void this.expireSessionNow();
      return;
    }
    this._sessionExpiryTimer = window.setTimeout(() => {
      void this.expireSessionNow();
    }, ms);
  }
  async expireSessionNow() {
    try {
      await authService.logout();
    } catch {
    }
    window.location.assign(`${getLoginPath()}?session=expired`);
  }
  bindEvents() {
    const sidebar = $id("paSidebar");
    const overlay = $id("paSidebarOverlay");
    const toggle = $id("paMobileToggle");
    const closeMobileSidebar = () => {
      sidebar?.classList.remove("mobile-open");
      overlay?.classList.remove("visible");
    };
    this._closeMobileSidebar = closeMobileSidebar;
    this.on(toggle, "click", () => {
      sidebar?.classList.add("mobile-open");
      overlay?.classList.add("visible");
    });
    this.on(overlay, "click", closeMobileSidebar);
    const handleNavSelection = (item) => {
      const href = item.getAttribute("href");
      if (href === "#") return;
      document.querySelectorAll(".pa-nav-subitem").forEach((i) => i.classList.remove("active"));
      document.querySelectorAll(".pa-nav-toggle").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      closeMobileSidebar();
    };
    document.querySelectorAll(".pa-nav-subitem[data-nav], .pa-nav-subitem[data-settings-tab]").forEach((item) => {
      this.on(item, "click", (e) => {
        if (item.getAttribute("href") === "#") e.preventDefault();
        handleNavSelection(item);
      });
    });
    const userMenuWrap = $id("paUserMenuWrap");
    const userMenuBtn = $id("paUserMenu");
    this._userMenuWrap = userMenuWrap;
    if (userMenuBtn && userMenuWrap) {
      this.on(userMenuBtn, "click", (e) => {
        e.stopPropagation();
        const isOpen = userMenuWrap.classList.toggle("open");
        userMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (isOpen) notifWrap?.classList.remove("open");
      });
      this.on(userMenuBtn, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const isOpen = userMenuWrap.classList.toggle("open");
          userMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
      });
    }
    this.bindHeaderAvatarUpload();
    const userDropdownLogout = $id("paUserDropdownLogout");
    if (userDropdownLogout) {
      this.on(userDropdownLogout, "click", (e) => {
        e.stopPropagation();
        userMenuWrap?.classList.remove("open");
        userMenuBtn?.setAttribute("aria-expanded", "false");
        this.handleLogout();
      });
    }
    const logoutBtn = $id("paLogoutBtn");
    if (logoutBtn) {
      this.on(logoutBtn, "click", () => this.handleLogout());
    }
    const notifWrap = $id("paNotifWrap");
    const notifBtn = $id("paNotifBtn");
    this._notifWrap = notifWrap;
    if (notifBtn && notifWrap) {
      this.on(notifBtn, "click", (e) => {
        e.stopPropagation();
        const opening = !notifWrap.classList.contains("open");
        notifWrap.classList.toggle("open");
        if (notifWrap.classList.contains("open")) {
          userMenuWrap?.classList.remove("open");
          userMenuBtn?.setAttribute("aria-expanded", "false");
          if (opening) void loadNotifications({ force: true });
        }
      });
      this.on(notifBtn, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const opening = !notifWrap.classList.contains("open");
          notifWrap.classList.toggle("open");
          if (opening) void loadNotifications({ force: true });
        }
      });
      this.on($id("paNotifClearBtn"), "click", (e) => {
        e.stopPropagation();
        if (!getAccessCapabilities().canClearAllNotifications) {
          showToast("You do not have permission to clear notifications.", "warning", 2200);
          return;
        }
        void clearNotifications().then(() => {
          showToast("Notifications cleared", "info", 1800);
        }).catch((err) => {
          showToast(err?.message || "Could not clear notifications.", "danger", 2200);
        });
      });
      const notifList = $id("paNotifList");
      if (notifList) {
        this.on(notifList, "click", (e) => {
          const item = e.target.closest("[data-notif-id]");
          if (!item) return;
          const id = item.dataset.notifId;
          const link = item.dataset.notifLink;
          void markNotificationRead(id).then(() => {
            if (link) window.location.href = link;
          });
        });
      }
    }
    this.onBus("notifications:updated", () => {
      renderNotifications();
    });
    this.onBus("storage:invalidated", (key) => {
      if (key === "pa_notifications" || key === "pa_recent_activities") {
        void loadNotifications({ silent: true });
      }
    });
    this.on(document, "click", (e) => {
      if (notifWrap && !notifWrap.contains(e.target)) notifWrap.classList.remove("open");
      if (userMenuWrap && !userMenuWrap.contains(e.target)) {
        if (!userMenuWrap.classList.contains("pa-user-menu--locked")) {
          userMenuWrap.classList.remove("open");
          userMenuBtn?.setAttribute("aria-expanded", "false");
        }
      }
      if (!e.target.closest(".pa-card-actions, .pa-lv-more-wrap, .pa-lv-actions, .pa-cat-card__list-actions, .pa-cat-card__footer-more, .pa-proj-card__head-more, .pa-proj-card__list-more, .pa-proj-card__list-actions, .pa-media-card__thumb-more, .pa-media-card__footer-more, .pa-media-card__list-more, .pa-media-card__list-actions")) closeAllCardMenus();
    });
    this.on(document, "keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        if (window.innerWidth <= 899) {
          if (!openMobileHeaderSearch()) focusGlobalSearch();
        } else {
          focusGlobalSearch();
        }
      }
      if (e.key === "Escape") {
        if (isMobileHeaderSearchOpen()) {
          closeMobileHeaderSearch();
        } else if (isConfirmOpen()) {
          closeConfirm();
        } else if ($id("paBulkConfirmOverlay")?.classList.contains("visible")) {
          eventBus.emit("bulk-confirm:close");
        } else if (anyPanelOpen()) {
          closePanels();
        } else {
          closeAllCardMenus();
          notifWrap?.classList.remove("open");
          userMenuWrap?.classList.remove("open");
          userMenuBtn?.setAttribute("aria-expanded", "false");
          closeMobileSidebar();
        }
      }
      if (e.key?.toLowerCase() === "n" && !anyPanelOpen() && !document.activeElement.matches("input, textarea, select, [contenteditable]")) {
        eventBus.emit("shortcut:new-item", { page: PAGE });
      }
    });
  }
  bindHeaderAvatarUpload() {
    const avatarBtn = $id("paUserDropdownAvatar");
    const userMenuWrap = this._userMenuWrap || $id("paUserMenuWrap");
    const userMenuBtn = $id("paUserMenu");
    if (!avatarBtn) return;
    let avatarInput = $id("paHeaderAvatarInput");
    if (!avatarInput) {
      avatarInput = document.createElement("input");
      avatarInput.type = "file";
      avatarInput.id = "paHeaderAvatarInput";
      avatarInput.accept = "image/png,image/jpeg,image/webp";
      avatarInput.hidden = true;
      document.body.appendChild(avatarInput);
    }
    const lockMenu = () => {
      userMenuWrap?.classList.add("pa-user-menu--locked", "open");
      userMenuBtn?.setAttribute("aria-expanded", "true");
    };
    const unlockMenu = (closeAfter = false) => {
      userMenuWrap?.classList.remove("pa-user-menu--locked");
      if (closeAfter) {
        userMenuWrap?.classList.remove("open");
        userMenuBtn?.setAttribute("aria-expanded", "false");
      }
    };
    this.on(avatarBtn, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      lockMenu();
      avatarInput.click();
    });
    this.on(avatarInput, "cancel", () => {
      unlockMenu(false);
      avatarInput.value = "";
    });
    this.on(window, "focus", () => {
      if (!userMenuWrap?.classList.contains("pa-user-menu--locked")) return;
      window.setTimeout(() => {
        if (!avatarInput.files?.length && !avatarBtn.classList.contains("is-uploading")) {
          unlockMenu(false);
        }
      }, 280);
    });
    this.on(avatarInput, "change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        unlockMenu(false);
        e.target.value = "";
        return;
      }
      lockMenu();
      await uploadUserAvatar(file, {
        onComplete: (profile) => unlockMenu(!!profile)
      });
      e.target.value = "";
    });
  }
  handleLogout() {
    requestLogout(async () => {
      showToast("Logging out...", "info", 1500);
      try {
        await authService.logout();
      } catch (err) {
        console.warn("[Shell] logout failed:", err);
      }
      try {
        await storage.clearPersistentCache();
      } catch (err) {
        console.warn("[Shell] cache clear failed:", err);
      }
      window.location.href = getLoginPath();
    });
  }
  destroy() {
    this.customization.destroy();
    super.destroy();
  }
};

// client/modules/shell/sidebarRailNav.ts
var ROUTE_RAIL = [
  ["/admin/settings", "settings"],
  ["/admin/tool-categories", "tools"],
  ["/admin/technologies", "tools"],
  ["/admin/tools", "tools"],
  ["/admin/blog-categories", "content"],
  ["/admin/blog-engagement", "content"],
  ["/admin/blog-tags", "content"],
  ["/admin/blog-post", "content"],
  ["/admin/testimonials", "content"],
  ["/admin/experience", "content"],
  ["/admin/faqs", "content"],
  ["/admin/media-library", "content"],
  ["/admin/project-technologies", "projects"],
  ["/admin/project-tags", "projects"],
  ["/admin/project-categories", "projects"],
  ["/admin/categories", "projects"],
  ["/admin/tags", "projects"],
  ["/admin/projects", "projects"],
  ["/admin/recent-activities", "home"],
  ["/admin/contact-messages", "home"],
  ["/admin/access-requests", "home"],
  ["/admin/users", "home"]
];
var ROUTE_RAIL_SORTED = [...ROUTE_RAIL].sort((a, b) => b[0].length - a[0].length);
function resolveRailSection(path = window.location.pathname) {
  if (path === "/admin" || path === "/admin/" || path === "/" || path === "") return "home";
  for (const [needle, section] of ROUTE_RAIL_SORTED) {
    if (path.includes(needle)) return section;
  }
  return "home";
}
function getNavGroup(section) {
  return document.querySelector(`.pa-nav-group[data-nav-group="${section}"]`);
}
function syncSidebarRailActive() {
  const section = resolveRailSection();
  document.querySelectorAll(".pa-rail-btn[data-rail-target]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.railTarget === section);
  });
}
function setGroupExpanded(group, open) {
  if (!group) return;
  group.classList.add("pa-nav-anim-ready");
  group.classList.toggle("open", open);
  group.querySelector(":scope > .pa-nav-parent-row .pa-nav-toggle")?.setAttribute("aria-expanded", open ? "true" : "false");
}
function toggleNavGroup(section) {
  const group = getNavGroup(section);
  if (!group) return;
  if (isSidebarCollapsedDesktop()) {
    const flyout = document.getElementById("paNavFlyout");
    if (flyout?.classList.contains("visible") && group.classList.contains("flyout-open")) {
      hideNavFlyout();
      return;
    }
    showNavFlyout(group);
    return;
  }
  hideNavFlyout();
  const nextOpen = !group.classList.contains("open");
  setGroupExpanded(group, nextOpen);
  if (nextOpen) {
    group.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}
var railBound = false;
function initSidebarRailNav() {
  syncSidebarRailActive();
  if (railBound) return;
  railBound = true;
  document.querySelectorAll(".pa-rail-btn[data-rail-target]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const section = btn.dataset.railTarget;
      if (!section) return;
      toggleNavGroup(section);
      syncSidebarRailActive();
    });
  });
  window.addEventListener("popstate", syncSidebarRailActive);
}

// client/modules/shell/sidebarNav.ts
var NAV_BY_PATH = [
  ["/admin/tool-categories", "Tool Categories"],
  ["/admin/recent-activities", "Recent Activities"],
  ["/admin/access-requests", "Access Requests"],
  ["/admin/users", "Users"],
  ["/admin/contact-messages", "Contact Messages"],
  ["/admin/media-library", "Media Library"],
  ["/admin/technologies", "Technologies"],
  ["/admin/blog-categories", "Blog Categories"],
  ["/admin/project-categories", "Project Categories"],
  ["/admin/categories", "Project Categories"],
  ["/admin/project-technologies", "Project Technologies"],
  ["/admin/project-tags", "Project Tags"],
  ["/admin/blog-tags", "Blog Tags"],
  ["/admin/blog-engagement", "Comments & Likes"],
  ["/admin/blog-post", "Blog Posts"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/experience", "Experience"],
  ["/admin/faqs", "FAQs"],
  ["/admin/tags", "Project Tags"],
  ["/admin/projects", "Projects"],
  ["/admin/settings", "Settings"],
  ["/admin/tools", "Tools"]
];
var NAV_BY_PATH_SORTED = [...NAV_BY_PATH].sort((a, b) => b[0].length - a[0].length);
function resolveActiveNav(path = window.location.pathname) {
  if (path === "/admin" || path === "/admin/" || path === "/" || path === "") return "Dashboard";
  for (const [needle, label] of NAV_BY_PATH_SORTED) {
    if (path.includes(needle)) return label;
  }
  return null;
}
function syncSidebarActiveNav() {
  const active = resolveActiveNav();
  if (!active) return;
  document.querySelectorAll(".pa-nav-subitem[data-nav]").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === active);
  });
  if (active === "Settings" && window.location.pathname.includes("/admin/settings")) {
    const tab = getSettingsTabFromPath();
    document.querySelectorAll(".pa-nav-subitem[data-settings-tab]").forEach((item) => {
      item.classList.toggle("active", item.dataset.settingsTab === tab);
    });
  } else {
    document.querySelectorAll(".pa-nav-subitem[data-settings-tab]").forEach((item) => {
      item.classList.remove("active");
    });
  }
  syncSidebarGroupNav();
  syncSidebarRailActive();
}
var sidebarNavBound = false;
function bindSidebarPrefetch() {
  const warm = typeof window.__paWarmPrefetchPath === "function" ? window.__paWarmPrefetchPath : null;
  if (!warm) return;
  document.querySelectorAll(".pa-nav-subitem[href], .pa-logo-link[href]").forEach((link) => {
    link.addEventListener("pointerenter", () => {
      const href = link.getAttribute("href");
      if (href) warm(href);
    }, { passive: true });
  });
}
function initSidebarNav() {
  syncSidebarActiveNav();
  if (!sidebarNavBound) {
    window.addEventListener("popstate", syncSidebarActiveNav);
    bindSidebarPrefetch();
    sidebarNavBound = true;
  }
}

// client/utils/appearanceApply.ts
function loadLocalAppearance() {
  return readAppearanceCache() ?? { ...APPEARANCE_DEFAULTS };
}
async function initAuthAppearance() {
  try {
    const settings = loadLocalAppearance();
    applyAppearanceSettings(settings);
    const { updateFaviconFromAppearance } = await import("./chunks/favicon-GO77X3LP.js");
    updateFaviconFromAppearance(settings);
  } catch {
  }
}

// node_modules/motion-utils/dist/es/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/motion-utils/dist/es/clamp.mjs
var clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// node_modules/motion-utils/dist/es/format-error-message.mjs
function formatErrorMessage(message, errorCode) {
  return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}

// node_modules/motion-utils/dist/es/errors.mjs
var warning = () => {
};
var invariant = () => {
};
if (typeof process !== "undefined" && true) {
  warning = (check, message, errorCode) => {
    if (!check && typeof console !== "undefined") {
      console.warn(formatErrorMessage(message, errorCode));
    }
  };
  invariant = (check, message, errorCode) => {
    if (!check) {
      throw new Error(formatErrorMessage(message, errorCode));
    }
  };
}

// node_modules/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig = {};

// node_modules/motion-utils/dist/es/is-numerical-string.mjs
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/motion-utils/dist/es/is-object.mjs
var isObject = (value) => typeof value === "object" && value !== null;

// node_modules/motion-utils/dist/es/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);

// node_modules/motion-utils/dist/es/memo.mjs
// @__NO_SIDE_EFFECTS__
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

// node_modules/motion-utils/dist/es/pipe.mjs
var pipe = (...transformers) => transformers.reduce((a, b) => (v) => b(a(v)));

// node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const range = to - from;
  return range ? (value - from) / range : 1;
};

// node_modules/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

// node_modules/motion-utils/dist/es/velocity-per-second.mjs
var velocityPerSecond = /* @__NO_SIDE_EFFECTS__ */ (velocity, frameDuration) => frameDuration ? velocity * (1e3 / frameDuration) : 0;

// node_modules/motion-utils/dist/es/warn-once.mjs
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, errorCode) {
  if (condition || warned.has(message))
    return;
  console.warn(formatErrorMessage(message, errorCode));
  warned.add(message);
}

// node_modules/motion-utils/dist/es/wrap.mjs
var wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
// @__NO_SIDE_EFFECTS__
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p) => 1 - easing(1 - p);

// node_modules/motion-utils/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/motion-utils/dist/es/easing/anticipate.mjs
var anticipate = (p) => p >= 1 ? 1 : (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/motion-utils/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/motion-utils/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = /* @__NO_SIDE_EFFECTS__ */ (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
// @__NO_SIDE_EFFECTS__
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}

// node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = /* @__NO_SIDE_EFFECTS__ */ (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var isValidEasing = (easing) => {
  return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (isValidEasing(definition)) {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      const prevFrame = thisFrame;
      thisFrame = nextFrame;
      nextFrame = prevFrame;
      thisFrame.forEach(triggerCallback);
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const useManualTiming = MotionGlobalConfig.useManualTiming;
    const timestamp = useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function containsCSSVariable(value) {
  if (typeof value !== "string")
    return false;
  return value.split("/*")[0].includes("var(--");
}

// node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;

// node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/motion-dom/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = /* @__PURE__ */ (() => ({
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
}))();

// node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/motion-dom/dist/es/value/types/color/index.mjs
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  },
  getAnimatableNone: (v) => {
    const parsed = color.parse(v);
    parsed.alpha = 0;
    return color.transform(parsed);
  }
};

// node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function test(v) {
  return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
function createTransformer(source) {
  return buildTransformer(analyseComplexValue(source));
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
var convertToZero = (value, splitBefore) => {
  if (typeof value === "number") {
    return splitBefore?.trim().endsWith("/") ? value : 0;
  }
  return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
  const info = analyseComplexValue(v);
  const transformer = buildTransformer(info);
  return transformer(info.values.map((value, i) => convertToZero(value, info.split[i])));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}

// node_modules/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// node_modules/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};

// node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
    return mixImmediate(origin, target);
  }
};

// node_modules/motion-dom/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function createGeneratorEasing(options, scale2 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale2] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress2) => {
      return generator.next(duration * progress2).value / scale2;
    },
    duration: millisecondsToSeconds(duration)
  };
}

// node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    springOptions.velocity = 0;
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring({ ...options, velocity: 0 });
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  let resolveVelocity;
  let angularFreq;
  let A;
  let sinCoeff;
  let cosCoeff;
  if (dampingRatio < 1) {
    angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    A = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * (A * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
    sinCoeff = dampingRatio * undampedAngularFreq * A + initialDelta * angularFreq;
    cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A * angularFreq;
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return envelope * (sinCoeff * Math.sin(angularFreq * t) + cosCoeff * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    const C = initialVelocity + undampedAngularFreq * initialDelta;
    resolveVelocity = (t) => Math.exp(-undampedAngularFreq * t) * (undampedAngularFreq * C * t - initialVelocity);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
    const P = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
    const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
    const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    velocity: (t) => secondsToMilliseconds(resolveVelocity(t)),
    next: (t) => {
      if (!isResolvedFromDuration && dampingRatio < 1) {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const sin = Math.sin(angularFreq * t);
        const cos = Math.cos(angularFreq * t);
        const current2 = target - envelope * (A * sin + initialDelta * cos);
        const currentVelocity = secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current2) <= restDelta;
        state.value = state.done ? target : current2;
        return state;
      }
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = secondsToMilliseconds(resolveVelocity(t));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing(options, 100, spring);
  options.ease = generatorOptions.ease;
  options.duration = secondsToMilliseconds(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function getGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: getGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// node_modules/motion-dom/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function replaceTransitionType(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap[transition.type];
  }
}

// node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise = class {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
};

// node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress = (percent2) => percent2 / 100;
var JSAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.delayState = {
      done: false,
      value: void 0
    };
    this.stop = () => {
      const { motionValue: motionValue2 } = this.options;
      if (motionValue2 && motionValue2.updatedAt !== time.now()) {
        this.tick(time.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      this.options.onStop?.();
    };
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType(options);
    const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes;
    if (generatorFactory !== keyframes) {
      invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    let state;
    if (isInDelayPhase) {
      this.delayState.value = keyframes2[0];
      state = this.delayState;
    } else {
      state = frameGenerator.next(elapsed);
    }
    if (mixKeyframes && !isInDelayPhase) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return millisecondsToSeconds(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay);
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
    if (this.driver) {
      this.driver.start(false);
    } else {
      this.startTime = 0;
      this.state = "paused";
      this.holdTime = newTime;
      this.tick(newTime);
    }
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t = this.currentTime;
    if (t <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity) {
      return this.generator.velocity(t);
    }
    const current = this.generator.next(t).value;
    return getGeneratorVelocity((s) => this.generator.next(s).value, t, current);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    if (hasChanged && this.driver) {
      this.updateTime(time.now());
    }
    this.playbackSpeed = newSpeed;
    if (hasChanged && this.driver) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    this.options.onPlay?.();
    const now2 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now2;
    } else if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now2;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.notifyFinished();
    this.teardown();
    this.state = "finished";
    this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
    this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    this.driver?.stop();
    return timeline.observe(this);
  }
};

// node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards(keyframes2) {
  for (let i = 1; i < keyframes2.length; i++) {
    keyframes2[i] ?? (keyframes2[i] = keyframes2[i - 1]);
  }
}

// node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v) => {
  const angle = radToDeg(Math.atan2(v[1], v[0]));
  return rebaseAngle(angle);
};
var matrix2dParsers = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
  rotate,
  rotateZ: rotate,
  skewX: (v) => radToDeg(Math.atan(v[1])),
  skewY: (v) => radToDeg(Math.atan(v[2])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
var rotateZ = rotate;
var scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX,
  scaleY,
  scale: (v) => (scaleX(v) + scaleY(v)) / 2,
  rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
  rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
  rotateZ,
  rotate: rotateZ,
  skewX: (v) => radToDeg(Math.atan(v[4])),
  skewY: (v) => radToDeg(Math.atan(v[1])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
  if (!transform || transform === "none") {
    return defaultTransformValue(name);
  }
  const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
  const { transform = "none" } = getComputedStyle(instance);
  return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
  return parseFloat(value.trim());
}

// node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = /* @__PURE__ */ (() => /* @__PURE__ */ new Set([...transformPropOrder, "pathRotation"]))();

// node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
    const width = x.max - x.min;
    return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
  },
  height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
    const height = y.max - y.min;
    return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
  },
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
  y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          element.getValue(key)?.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete(isForced));
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  isForced = true;
  readAllKeyframes();
  measureAllKeyframes();
  isForced = false;
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.state = "pending";
    this.isAsync = false;
    this.needsMeasurement = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.state = "scheduled";
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue2?.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue2 && currentValue === void 0) {
        motionValue2.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForcedComplete = false) {
    this.state = "complete";
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
    toResolve.delete(this);
  }
  cancel() {
    if (this.state === "scheduled") {
      toResolve.delete(this);
      this.state = "pending";
    }
  }
  resume() {
    if (this.state === "pending")
      this.scheduleResolve();
  }
};

// node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar = (name) => name.startsWith("--");

// node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle(element, name, value) {
  isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}

// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {};

// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}

// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = /* @__PURE__ */ memoSupports(() => window.ScrollTimeline !== void 0, "scrollTimeline");

// node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

// node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};

// node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation(element, valueName, keyframes2, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes2
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  const options = {
    delay,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  return element.animate(keyframeOptions, options);
}

// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function" && "applyToOptions" in type;
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions({ type, ...options }) {
  if (isGenerator(type) && supportsLinearEasing()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}

// node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var NativeAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    this.manualStartTime = null;
    if (!options)
      return;
    const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const transition = applyGeneratorOptions(options);
    this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        }
        setStyle(element, name, keyframe);
        this.animation.cancel();
      }
      onComplete?.();
      this.notifyFinished();
    };
  }
  play() {
    if (this.isStopped)
      return;
    this.manualStartTime = null;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const element = this.options?.element;
    if (!this.isPseudoElement && element?.isConnected) {
      this.animation.commitStyles?.();
    }
  }
  get duration() {
    const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
    return millisecondsToSeconds(Number(duration));
  }
  get iterationDuration() {
    const { delay = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay);
  }
  get time() {
    return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    const wasFinished = this.finishedTime !== null;
    this.manualStartTime = null;
    this.finishedTime = null;
    this.animation.currentTime = secondsToMilliseconds(newTime);
    if (wasFinished) {
      this.animation.pause();
    }
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.manualStartTime = this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
    if (this.allowFlatten) {
      this.animation.effect?.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline()) {
      this.animation.timeline = timeline;
      if (rangeStart)
        this.animation.rangeStart = rangeStart;
      if (rangeEnd)
        this.animation.rangeEnd = rangeEnd;
      return noop;
    } else {
      return observe(this);
    }
  }
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}

// node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
  constructor(options) {
    replaceStringEasing(options);
    replaceTransitionType(options);
    super(options);
    if (options.startTime !== void 0 && options.autoplay !== false) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue2)
      return;
    if (value !== void 0) {
      motionValue2.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    const current = sampleAnimation.sample(sampleTime).value;
    const { name } = this.options;
    if (element && name)
      setStyle(element, name, current);
    motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
    sampleAnimation.stop();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null) {
    return false;
  }
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}

// node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function makeAnimationInstant(options) {
  options.duration = 0;
  options.type = "keyframes";
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]);

// node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs
var browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes2) {
  for (let i = 0; i < keyframes2.length; i++) {
    if (typeof keyframes2[i] === "string" && browserColorFunctions.test(keyframes2[i])) {
      return true;
    }
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var colorProperties = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]);
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type, keyframes: keyframes2 } = options;
  const subject = motionValue2?.owner?.current;
  if (!(subject instanceof HTMLElement) && !(subject instanceof SVGElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
  return supportsWaapi() && name && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes2)) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}

// node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
  constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
    super();
    this.stop = () => {
      if (this._animation) {
        this._animation.stop();
        this.stopTimeline?.();
      }
      this.keyframeResolver?.cancel();
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue2,
      element,
      ...options
    };
    const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
    this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(keyframes2, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    let canAnimateValue = true;
    if (!canAnimate(keyframes2, name, type, velocity)) {
      canAnimateValue = false;
      if (MotionGlobalConfig.instantAnimations || !delay) {
        onUpdate?.(getFinalKeyframe(keyframes2, options, finalKeyframe));
      }
      keyframes2[0] = keyframes2[keyframes2.length - 1];
      makeAnimationInstant(options);
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes2
    };
    const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
    const element = resolvedOptions.motionValue?.owner?.current;
    let animation;
    if (useWaapi) {
      try {
        animation = new NativeAnimationExtended({
          ...resolvedOptions,
          element
        });
      } catch {
        animation = new JSAnimation(resolvedOptions);
      }
    } else {
      animation = new JSAnimation(resolvedOptions);
    }
    animation.finished.then(() => {
      this.notifyFinished();
    }).catch(noop);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    if (!this._animation) {
      this.keyframeResolver?.resume();
      flushKeyframeResolvers();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    if (this._animation) {
      this.animation.cancel();
    }
    this.keyframeResolver?.cancel();
  }
};

// node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs
var GroupAnimation = class {
  constructor(animations) {
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time2) {
    this.setAll("time", time2);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
};
function getMax(animations, propName) {
  let max = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}

// node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var GroupAnimationWithThen = class extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
};

// node_modules/motion-dom/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev) {
        this.events.change?.notify(this.current);
        if (this.dependents) {
          for (const dependent of this.dependents) {
            dependent.dirty();
          }
        }
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (true) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v) {
    if (!this.passiveEffect) {
      this.updateAndNotify(v);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(dependent) {
    if (!this.dependents) {
      this.dependents = /* @__PURE__ */ new Set();
    }
    this.dependents.add(dependent);
  }
  removeDependent(dependent) {
    if (this.dependents) {
      this.dependents.delete(dependent);
    }
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear();
    this.events.destroy?.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function resolveTransition(transition, parentTransition) {
  if (transition?.inherit && parentTransition) {
    const { inherit: _, ...rest } = transition;
    return { ...parentTransition, ...rest };
  }
  return transition;
}

// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
  if (valueTransition !== transition) {
    return resolveTransition(valueTransition, transition);
  }
  return valueTransition;
}

// node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs
var orchestrationKeys = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function isTransitionDefined(transition) {
  for (const key in transition) {
    if (!orchestrationKeys.has(key))
      return true;
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    makeAnimationInstant(options);
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations || valueTransition.skipAnimations) {
    shouldSkip = true;
    makeAnimationInstant(options);
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};

// node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement?.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// node_modules/motion-dom/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function resolveFinalValueInKeyframes(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/motion-dom/dist/es/value/will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}

// node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function camelToDash(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

// node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
  let { transition, transitionEnd, ...target } = targetAndTransition;
  const defaultTransition = visualElement.getDefaultTransition();
  transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
  const reduceMotion = transition?.reduceMotion;
  const skipAnimations = transition?.skipAnimations;
  if (transitionOverride)
    transition = transitionOverride;
  const animations = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  const path = transition?.path;
  if (path) {
    path.animateVisualElement(visualElement, target, transition, delay, animations);
  }
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay,
      ...getValueTransition(transition || {}, key)
    };
    if (skipAnimations)
      valueTransition.skipAnimations = true;
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      frame.update(() => value.set(valueTarget));
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
    value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations.push(animation);
    }
  }
  if (transitionEnd) {
    const applyTransitionEnd = () => frame.update(() => {
      transitionEnd && setTarget(visualElement, transitionEnd);
    });
    if (animations.length) {
      Promise.all(animations).then(applyTransitionEnd);
    } else {
      applyTransitionEnd();
    }
  }
  return animations;
}

// node_modules/motion-dom/dist/es/value/types/auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/motion-dom/dist/es/value/types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// node_modules/motion-dom/dist/es/value/types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// node_modules/motion-dom/dist/es/value/types/complex/mask.mjs
var mask = {
  ...complex,
  getAnimatableNone: (v) => {
    const parsed = complex.parse(v);
    const transformer = complex.createTransformer(v);
    return transformer(parsed.map((v2) => typeof v2 === "number" ? 0 : typeof v2 === "object" ? { ...v2, alpha: 1 } : v2));
  }
};

// node_modules/motion-dom/dist/es/value/types/int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// node_modules/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  inset: px,
  insetBlock: px,
  insetBlockStart: px,
  insetBlockEnd: px,
  insetInline: px,
  insetInlineStart: px,
  insetInlineEnd: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  paddingBlock: px,
  paddingBlockStart: px,
  paddingBlockEnd: px,
  paddingInline: px,
  paddingInlineStart: px,
  paddingInlineEnd: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  marginBlock: px,
  marginBlockStart: px,
  marginBlockEnd: px,
  marginInline: px,
  marginInlineStart: px,
  marginInlineEnd: px,
  // Typography
  fontSize: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
  ...transformValueTypes,
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter,
  mask,
  WebkitMask: mask
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
var customTypes = /* @__PURE__ */ new Set([filter, mask]);
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (!customTypes.has(defaultValueType))
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    const originHasVar = containsCSSVariable(origin);
    const targetHasVar = containsCSSVariable(target);
    if (originHasVar !== targetHasVar && positionalValues[name]) {
      this.needsMeasurement = true;
      return;
    }
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else if (positionalValues[name]) {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if (this.removedTransforms?.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/motion-dom/dist/es/utils/border-radius.mjs
var cornerRadiusProps = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];

// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector == null) {
    return [];
  }
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector).filter((element) => element != null);
}

// node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);

// node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function isSVGElement(element) {
  return isObject(element) && "ownerSVGElement" in element;
}

// node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function isSVGSVGElement(element) {
  return isSVGElement(element) && element.tagName === "svg";
}

// node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/projection/geometry/models.mjs
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/motion-dom/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var prefersReducedMotion2 = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs
var isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion2.current = motionMediaQuery.matches;
    motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion2.current = false;
  }
}

// node_modules/motion-dom/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var featureDefinitions = {};
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.shouldSkipAnimations = false;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.hasBeenMounted = false;
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.skipAnimationsConfig = skipAnimations;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key]);
      }
    }
  }
  mount(instance) {
    if (this.hasBeenMounted) {
      for (const key in this.initialValues) {
        this.values.get(key)?.jump(this.initialValues[key]);
        this.latestValues[key] = this.initialValues[key];
      }
    }
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (this.reducedMotionConfig === "never") {
      this.shouldReduceMotion = false;
    } else if (this.reducedMotionConfig === "always") {
      this.shouldReduceMotion = true;
    } else {
      if (!hasReducedMotionListener.current) {
        initPrefersReducedMotion();
      }
      this.shouldReduceMotion = prefersReducedMotion2.current;
    }
    if (true) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
    }
    this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
    this.parent?.addChild(this);
    this.update(this.props, this.presenceContext);
    this.hasBeenMounted = true;
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent?.removeChild(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  addChild(child) {
    this.children.add(child);
    this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
    this.enteringChildren.add(child);
  }
  removeChild(child) {
    this.children.delete(child);
    this.enteringChildren && this.enteringChildren.delete(child);
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
      const { factory, keyframes: keyframes2, times, ease: ease2, duration } = value.accelerate;
      const animation = new NativeAnimation({
        element: this.current,
        name: key,
        keyframes: keyframes2,
        times,
        ease: ease2,
        duration: secondsToMilliseconds(duration)
      });
      const cleanup = factory(animation);
      this.valueSubscriptions.set(key, () => {
        cleanup();
        animation.cancel();
      });
      return;
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
      this.scheduleRender();
    });
    let removeSyncCheck;
    if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      if (removeSyncCheck)
        removeSyncCheck();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
  scheduleRenderMicrotask() {
    microtask.render(this.render);
  }
};

// node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    const style = props.style;
    return style ? style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function transformBoxPoints(point, transformPoint) {
  if (!transformPoint)
    return point;
  const topLeft = transformPoint({ x: point.left, y: point.top });
  const bottomRight = transformPoint({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}

// node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      const parsed = parseFloat(value);
      valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  const pathRotation = latestValues.pathRotation;
  if (pathRotation) {
    transformIsDefault = false;
    transformString += `rotate(${getValueAsType(pathRotation, numberValueTypes.pathRotation)}) `;
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  const elementStyle = element.style;
  let key;
  for (key in style) {
    elementStyle[key] = style[key];
  }
  projection?.applyProjectionStyles(elementStyle, styleProp);
  for (key in vars) {
    elementStyle.setProperty(key, vars[key]);
  }
}

// node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [...cornerRadiusProps]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const style = props.style;
  const prevStyle = prevProps?.style;
  const newValues = {};
  if (!style)
    return newValues;
  for (const key in style) {
    if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  mount(instance) {
    invariant(Boolean(instance.style), "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref");
    super.mount(instance);
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function isObjectKey(key, object) {
  return key in object;
}
var ObjectVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
};

// node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = `${-offset}`;
  attrs[keys.array] = `${length} ${spacing}`;
}

// node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var cssMotionPathProperties = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate, styleProp) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style } = state;
  if (attrs.transform) {
    style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (style.transform || attrs.transformOrigin) {
    style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style.transform) {
    style.transformBox = styleProp?.transformBox ?? "fill-box";
    delete attrs.transformBox;
  }
  for (const key of cssMotionPathProperties) {
    if (attrs[key] !== void 0) {
      style[key] = attrs[key];
      delete attrs[key];
    }
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}

// node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function isDOMKeyframes(keyframes2) {
  return typeof keyframes2 === "object" && !Array.isArray(keyframes2);
}

// node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function resolveSubjects(subject, keyframes2, scope, selectorCache) {
  if (subject == null) {
    return [];
  }
  if (typeof subject === "string" && isDOMKeyframes(keyframes2)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject.filter((s) => s != null);
  } else {
    return [subject];
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function calculateRepeatDuration(duration, repeat, repeatDelay) {
  return duration * (repeat + 1) + repeatDelay * repeat;
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function calcNextTime(current, next, prev, labels) {
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else if (next.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next.slice(1)));
  } else {
    return labels.get(next) ?? current;
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes2, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes2.length; i++) {
    sequence.push({
      value: keyframes2[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function normalizeTimes(times, repeat, repeatDelayUnits = 0) {
  const totalUnits = repeat + 1 + repeat * repeatDelayUnits;
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / totalUnits;
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var defaultSegmentEasing = "easeInOut";
var MAX_REPEAT = 20;
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes2, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease: ease2 = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators?.[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...defaultTransition,
          ...remainingTransition
        };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease2 = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        warning(repeat < MAX_REPEAT, `Sequence segments can't repeat ${repeat} times \u2014 ignoring repeat option. Use a value below ${MAX_REPEAT} or apply repeat at the sequence level instead.`);
      }
      if (repeat && repeat < MAX_REPEAT) {
        const repeatDelayUnits = duration > 0 ? repeatDelay / duration : 0;
        duration = calculateRepeatDuration(duration, repeat, repeatDelay);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease2 = Array.isArray(ease2) ? [...ease2] : [ease2];
        const originalEase = [...ease2];
        const isFlipping = repeatType === "reverse" || repeatType === "mirror";
        let flippedKeyframes = originalKeyframes;
        let flippedEases = originalEase;
        if (isFlipping) {
          flippedKeyframes = [...originalKeyframes].reverse();
          if (repeatType === "reverse") {
            flippedEases = [...originalEase].reverse().map((e) => typeof e === "function" ? reverseEasing(e) : e);
          }
        }
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          const isFlipped = isFlipping && repeatIndex % 2 === 0;
          const iterKeyframes = isFlipped ? flippedKeyframes : originalKeyframes;
          const iterEase = isFlipped ? flippedEases : originalEase;
          const iterStartOffset = (repeatIndex + 1) * (1 + repeatDelayUnits);
          if (repeatDelayUnits > 0) {
            valueKeyframesAsList.push(valueKeyframesAsList[valueKeyframesAsList.length - 1]);
            times.push(iterStartOffset);
            ease2.push("linear");
          }
          valueKeyframesAsList.push(...iterKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < iterKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + iterStartOffset);
            ease2.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(iterEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat, repeatDelayUnits);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease2, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes2, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes2, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes2 = keyframes2;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes2) {
          resolveValueSequence(keyframes2[key], getValueTransition2(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes2 = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes2.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes2.unshift(keyframes2[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes2.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes2;
      const { type: _type, ...remainingDefaultTransition } = defaultTransition;
      definition.transition[key] = {
        ...remainingDefaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes2) {
  return Array.isArray(keyframes2) ? keyframes2 : [keyframes2];
}
function getValueTransition2(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
var isNumber = (keyframe) => typeof keyframe === "number";
var isNumberKeyframesArray = (keyframes2) => keyframes2.every(isNumber);

// node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}

// node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function isSingleValue(subject, keyframes2) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes2);
}
function animateSubject(subject, keyframes2, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes2)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes2) ? keyframes2.default || keyframes2 : keyframes2, options ? options.default || options : options));
  } else {
    if (subject == null) {
      return animations;
    }
    const subjects = resolveSubjects(subject, keyframes2, scope);
    const numSubjects = subjects.length;
    invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes2, transition }, {}));
    }
  }
  return animations;
}

// node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function animateSequence(sequence, options, scope) {
  const animations = [];
  const processedSequence = sequence.map((segment) => {
    if (Array.isArray(segment) && typeof segment[0] === "function") {
      const callback = segment[0];
      const mv = motionValue(0);
      mv.on("change", callback);
      if (segment.length === 1) {
        return [mv, [0, 1]];
      } else if (segment.length === 2) {
        return [mv, [0, 1], segment[1]];
      } else {
        return [mv, segment[1], segment[2]];
      }
    }
    return segment;
  });
  const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes: keyframes2, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes2, transition));
  });
  return animations;
}

// node_modules/framer-motion/dist/es/animation/animate/index.mjs
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(options = {}) {
  const { scope, reduceMotion, skipAnimations } = options;
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
    let animations = [];
    let animationOnComplete;
    const inherited = {};
    if (reduceMotion !== void 0)
      inherited.reduceMotion = reduceMotion;
    if (skipAnimations !== void 0)
      inherited.skipAnimations = skipAnimations;
    if (isSequence(subjectOrSequence)) {
      const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSequence(subjectOrSequence, { ...inherited, ...sequenceOptions }, scope);
    } else {
      const { onComplete, ...rest } = options2 || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, { ...inherited, ...rest }, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
var animate = createScopedAnimate();

// client/utils/collapse-motion.ts
var PA_COLLAPSE_DURATION = 0.45;
var PA_COLLAPSE_EASE = [0.22, 1, 0.36, 1];
var animateDomKeyframes = animate;
var BOUND = "data-pa-collapse-bound";
var ANIMATING = "data-pa-collapse-animating";
function measureCollapsePanel(panel) {
  const prevHeight = panel.style.height;
  const prevOverflow = panel.style.overflow;
  const prevDisplay = panel.style.display;
  panel.style.height = "auto";
  panel.style.overflow = "hidden";
  panel.style.display = "block";
  const h = panel.scrollHeight;
  panel.style.height = prevHeight;
  panel.style.overflow = prevOverflow;
  panel.style.display = prevDisplay;
  return h;
}
function clearCollapseInlineStyles(panel) {
  panel.style.removeProperty("height");
  panel.style.removeProperty("max-height");
  panel.style.removeProperty("opacity");
  panel.style.removeProperty("overflow");
  panel.style.removeProperty("overflow-y");
  panel.style.removeProperty("pointer-events");
}
async function animateCollapsePanel(panel, open) {
  if (panel.classList.contains("pa-collapse-panel--dropdown")) {
    panel.classList.toggle("is-pa-collapse-open", open);
    return;
  }
  if (prefersReducedMotion()) {
    panel.classList.toggle("is-pa-collapse-open", open);
    clearCollapseInlineStyles(panel);
    return;
  }
  panel.classList.add("is-pa-collapse-animating");
  panel.style.overflow = "hidden";
  if (open) {
    const target = measureCollapsePanel(panel);
    panel.style.opacity = "0";
    panel.style.height = "0px";
    const keyframes2 = {
      height: ["0px", `${target}px`],
      opacity: [0, 1]
    };
    const controls = animateDomKeyframes(panel, keyframes2, {
      duration: PA_COLLAPSE_DURATION,
      easing: PA_COLLAPSE_EASE
    });
    await controls.finished;
  } else {
    const current = panel.getBoundingClientRect().height || measureCollapsePanel(panel);
    const keyframes2 = {
      height: [`${current}px`, "0px"],
      opacity: [1, 0]
    };
    const controls = animateDomKeyframes(panel, keyframes2, {
      duration: PA_COLLAPSE_DURATION,
      easing: PA_COLLAPSE_EASE
    });
    await controls.finished;
  }
  clearCollapseInlineStyles(panel);
  panel.classList.remove("is-pa-collapse-animating");
  panel.classList.toggle("is-pa-collapse-open", open);
}
function resolvePanel(root, explicit) {
  if (explicit) return explicit;
  return root.querySelector("[data-pa-collapse-panel], .pa-collapse-panel");
}
function isRootOpen(root, closedClass, inverted) {
  const hasClosed = root.classList.contains(closedClass);
  return inverted ? hasClosed : !hasClosed;
}
function setRootOpen(root, closedClass, inverted, open) {
  if (inverted) {
    root.classList.toggle(closedClass, open);
  } else {
    root.classList.toggle(closedClass, !open);
  }
  root.dataset.paCollapseOpen = open ? "true" : "false";
}
async function openRootCollapse(root, panel, closedClass, inverted) {
  if (root.getAttribute(ANIMATING) === "1") return;
  root.setAttribute(ANIMATING, "1");
  setRootOpen(root, closedClass, inverted, true);
  try {
    await animateCollapsePanel(panel, true);
    panel.classList.add("is-pa-collapse-reveal");
  } finally {
    root.removeAttribute(ANIMATING);
  }
}
async function closeRootCollapse(root, panel, closedClass, inverted) {
  if (root.getAttribute(ANIMATING) === "1") return;
  root.setAttribute(ANIMATING, "1");
  panel.classList.remove("is-pa-collapse-reveal");
  try {
    await animateCollapsePanel(panel, false);
    setRootOpen(root, closedClass, inverted, false);
  } finally {
    root.removeAttribute(ANIMATING);
  }
}
function bindRootCollapse(root) {
  if (root.getAttribute(BOUND) === "1") return;
  const panel = resolvePanel(root);
  const trigger = root.querySelector("[data-pa-collapse-trigger], .pa-collapse-trigger");
  if (!panel || !trigger) return;
  root.setAttribute(BOUND, "1");
  root.classList.add("pa-collapse-root");
  panel.classList.add("pa-collapse-panel");
  if (!panel.hasAttribute("data-pa-collapse-panel")) {
    panel.setAttribute("data-pa-collapse-panel", "");
  }
  const closedClass = root.dataset.paCollapseClass || "is-collapsed";
  const inverted = root.hasAttribute("data-pa-collapse-inverted");
  const open = isRootOpen(root, closedClass, inverted);
  panel.classList.toggle("is-pa-collapse-open", open);
  if (open) panel.classList.add("is-pa-collapse-reveal");
  trigger.addEventListener("click", (e) => {
    if (trigger.tagName !== "BUTTON" && trigger.tagName !== "A") e.preventDefault();
    const expanded = isRootOpen(root, closedClass, inverted);
    if (expanded) {
      void closeRootCollapse(root, panel, closedClass, inverted).then(() => {
        trigger.setAttribute("aria-expanded", "false");
      });
    } else {
      void openRootCollapse(root, panel, closedClass, inverted).then(() => {
        trigger.setAttribute("aria-expanded", "true");
      });
    }
  });
}
function bindDetailsCollapse(details) {
  if (details.getAttribute(BOUND) === "1") return;
  const summary = details.querySelector("summary");
  const panel = details.querySelector("[data-pa-collapse-panel], .pa-collapse-panel") ?? (summary?.nextElementSibling instanceof HTMLElement ? summary.nextElementSibling : null);
  if (!summary || !panel) return;
  details.setAttribute(BOUND, "1");
  details.classList.add("pa-collapse-details", "pa-collapse-root");
  panel.classList.add("pa-collapse-panel");
  if (!panel.hasAttribute("data-pa-collapse-panel")) {
    panel.setAttribute("data-pa-collapse-panel", "");
  }
  panel.classList.toggle("is-pa-collapse-open", details.open);
  if (details.open) panel.classList.add("is-pa-collapse-reveal");
  summary.addEventListener("click", (e) => {
    e.preventDefault();
    if (details.getAttribute(ANIMATING) === "1") return;
    if (details.open) {
      void (async () => {
        details.setAttribute(ANIMATING, "1");
        panel.classList.remove("is-pa-collapse-reveal");
        try {
          await animateCollapsePanel(panel, false);
          details.removeAttribute("open");
        } finally {
          details.removeAttribute(ANIMATING);
        }
      })();
    } else {
      void (async () => {
        details.setAttribute(ANIMATING, "1");
        details.setAttribute("open", "");
        try {
          await animateCollapsePanel(panel, true);
          panel.classList.add("is-pa-collapse-reveal");
        } finally {
          details.removeAttribute(ANIMATING);
        }
      })();
    }
  });
}
function canQueryDescendants(node) {
  return typeof node.querySelectorAll === "function";
}
function scanCollapseRoots(root) {
  if (root instanceof HTMLElement && root.matches("[data-pa-collapse]")) {
    bindRootCollapse(root);
  }
  if (!canQueryDescendants(root)) return;
  root.querySelectorAll("[data-pa-collapse]").forEach(bindRootCollapse);
  root.querySelectorAll('details:not([data-pa-collapse="off"])').forEach(bindDetailsCollapse);
}
var observerStarted = false;
var collapseMutationObserver = null;
function startCollapseObserver() {
  if (observerStarted || typeof document === "undefined") return;
  observerStarted = true;
  collapseMutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          scanCollapseRoots(node);
        }
      });
    }
  });
  collapseMutationObserver.observe(document.documentElement, { childList: true, subtree: true });
}
function initCollapseMotion(root = document) {
  scanCollapseRoots(root);
  startCollapseObserver();
}

// client/utils/app-ready.ts
function markAppReady() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("is-ready");
}
function resetAppReady() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("is-ready");
}

// lib/motion/segment-pill.ts
function segmentPillClipRound(track) {
  const isAdmin = Boolean(
    track.closest(".pa-shell, .pa-main, .pa-auth-page, .pa-auth-body")
  );
  return isAdmin ? "var(--pa-radius)" : "var(--br-none)";
}
var SEG_PILL_INSET_PAD = 3;
function clipInset(top, right, bottom, left, round) {
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${round})`;
}
function moveSegmentPill(pill, track, activeBtn, animate2 = true) {
  const trackW = track.offsetWidth;
  const trackH = track.offsetHeight;
  const left = activeBtn.offsetLeft + SEG_PILL_INSET_PAD;
  const right = trackW - (activeBtn.offsetLeft + activeBtn.offsetWidth) + SEG_PILL_INSET_PAD;
  const top = activeBtn.offsetTop + SEG_PILL_INSET_PAD;
  const bottom = trackH - (activeBtn.offsetTop + activeBtn.offsetHeight) + SEG_PILL_INSET_PAD;
  const round = segmentPillClipRound(track);
  const clip = (l, r) => clipInset(top, r, bottom, l, round);
  const pillState = pill;
  const prev = pillState.__lr;
  pillState.__lr = [left, right];
  if (!animate2 || prefersReducedMotion() || !prev) {
    gsapWithCSS.set(pill, { clipPath: clip(left, right), opacity: 1 });
    return;
  }
  const state = { l: prev[0], r: prev[1] };
  const movingRight = left > prev[0];
  gsapWithCSS.killTweensOf(state);
  gsapWithCSS.to(state, {
    l: left,
    duration: motionDuration(movingRight ? 0.55 : 0.36),
    ease: movingRight ? "power3.inOut" : "power3.out",
    onUpdate: () => gsapWithCSS.set(pill, { clipPath: clip(state.l, state.r) })
  });
  gsapWithCSS.to(state, {
    r: right,
    duration: motionDuration(movingRight ? 0.36 : 0.55),
    ease: movingRight ? "power3.out" : "power3.inOut",
    onUpdate: () => gsapWithCSS.set(pill, { clipPath: clip(state.l, state.r) })
  });
}

// client/utils/segment-pills.ts
var BOUND2 = "data-pa-seg-pill-bound";
function ensurePill(track) {
  let pill = track.querySelector(".seg__pill");
  if (!pill) {
    pill = document.createElement("span");
    pill.className = "seg__pill";
    pill.setAttribute("aria-hidden", "true");
    track.prepend(pill);
  }
  track.classList.add("seg");
  return pill;
}
function activeButton(track) {
  return track.querySelector(".pa-view-btn.active") ?? track.querySelector(".pa-view-btn");
}
function syncTrack(track, animate2 = false) {
  const btn = activeButton(track);
  if (!btn) return;
  const pill = ensurePill(track);
  moveSegmentPill(pill, track, btn, animate2);
}
function bindTrack(track) {
  if (track.getAttribute(BOUND2) === "1") return;
  track.setAttribute(BOUND2, "1");
  syncTrack(track, false);
  track.addEventListener("click", (e) => {
    const target = e.target instanceof HTMLElement ? e.target.closest(".pa-view-btn") : null;
    if (!target || !track.contains(target)) return;
    requestAnimationFrame(() => syncTrack(track, true));
  });
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => syncTrack(track, false));
    ro.observe(track);
  }
}
function initSegmentPills(root = document) {
  root.querySelectorAll(".pa-view-toggle").forEach(bindTrack);
}

// lib/motion/micro.ts
function animateButtonPress(el) {
  gsapWithCSS.killTweensOf(el);
  gsapWithCSS.to(el, {
    scale: 0.97,
    duration: motionDuration(0.08),
    yoyo: true,
    repeat: 1,
    ease: "power2.out",
    clearProps: "transform"
  });
}
function bindMagnetic(el, strength = 0.22) {
  if (isCoarsePointer()) return null;
  const quick = gsapWithCSS.quickSetter(el, "transform", "px");
  let bounds = null;
  const onEnter = () => {
    bounds = el.getBoundingClientRect();
    el.classList.add("is-magnetic");
  };
  const onMove = (e) => {
    if (!bounds) return;
    const cx = bounds.left + bounds.width / 2;
    const cy = bounds.top + bounds.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    quick(`translate(${dx}px, ${dy}px)`);
  };
  const onLeave = () => {
    bounds = null;
    el.classList.remove("is-magnetic");
    gsapWithCSS.to(el, {
      x: 0,
      y: 0,
      duration: motionDuration(0.35),
      ease: "power3.out",
      clearProps: "transform"
    });
  };
  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return {
    kill: () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsapWithCSS.killTweensOf(el);
    }
  };
}

// client/utils/motion-chrome.ts
var MAGNETIC_BOUND = "data-pa-magnetic-bound";
var PRESS_BOUND = "data-pa-press-bound";
function initMotionChrome(root = document) {
  root.querySelectorAll(".pa-btn-add, .pa-btn-primary, .magnetic").forEach((el) => {
    if (el.getAttribute(MAGNETIC_BOUND) === "1") return;
    el.setAttribute(MAGNETIC_BOUND, "1");
    el.classList.add("magnetic");
    bindMagnetic(el, 0.18);
  });
  root.querySelectorAll(".pa-btn, .pa-view-btn, .nav-cta, .pa-dash-cta-btn").forEach((el) => {
    if (el.getAttribute(PRESS_BOUND) === "1") return;
    el.setAttribute(PRESS_BOUND, "1");
    el.addEventListener("click", () => animateButtonPress(el));
  });
}

// client/utils/focusMain.ts
function focusMainContent() {
  if (typeof document === "undefined") return;
  const main = document.getElementById("pa-main-content") || document.querySelector("main") || document.querySelector(".pa-main");
  if (main) {
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
  }
}

// client/utils/publicPortfolioLink.ts
function syncPublicPortfolioLinks() {
  const meta = document.querySelector('meta[name="pa-public-portfolio-href"]');
  const configured = meta?.getAttribute("content")?.trim();
  const href = configured && configured !== "/" ? configured : "/";
  const selectors = [
    "#paViewPublicPortfolioBtn",
    "a.pa-view-public-portfolio",
    'a[data-nav="View Public Portfolio"]'
  ].join(",");
  document.querySelectorAll(selectors).forEach((el) => {
    if (el instanceof HTMLAnchorElement) {
      el.href = href;
    }
  });
}

// client/main.ts
var AUTH_PAGES = /* @__PURE__ */ new Set(["login", "forgot-password", "reset-password"]);
var PREFETCH_CONFIG = window.__paPrefetchConfig || {};
var PREFETCH_BY_PAGE = PREFETCH_CONFIG.PAGE_KEYS || {};
var getPrefetchKeysForPage = PREFETCH_CONFIG.getKeysForPage || ((p) => PREFETCH_BY_PAGE[p] || []);
async function loadPageModuleClass(page) {
  switch (page) {
    case "dashboard":
      return (await import("./chunks/DashboardModule-X4OQV2N6.js")).DashboardModule;
    case "projects":
      return (await import("./chunks/ProjectsModule-OMCTCB7P.js")).ProjectsModule;
    case "categories":
      return (await import("./chunks/CategoriesModule-KNYYVRAO.js")).CategoriesModule;
    case "project-tags":
    case "tags":
      return (await import("./chunks/TagsModule-XIO37JLY.js")).TagsModule;
    case "project-technologies":
      return (await import("./chunks/ProjectTechnologiesModule-2FA42T5I.js")).ProjectTechnologiesModule;
    case "blog-tags":
      return (await import("./chunks/BlogTagsModule-6CYU6DA4.js")).BlogTagsModule;
    case "technologies":
      return (await import("./chunks/TechnologiesModule-TJXU2K5U.js")).TechnologiesModule;
    case "tool-categories":
      return (await import("./chunks/ToolCategoriesModule-JXAHQZAL.js")).ToolCategoriesModule;
    case "blog-categories":
      return (await import("./chunks/BlogCategoriesModule-YAOQ2PR7.js")).BlogCategoriesModule;
    case "tools":
      return (await import("./chunks/ToolsModule-FV6JLSE5.js")).ToolsModule;
    case "media":
      return (await import("./chunks/MediaModule-GOWHZNVK.js")).MediaModule;
    case "testimonials":
      return (await import("./chunks/TestimonialsModule-6N2VSO5B.js")).TestimonialsModule;
    case "blogposts":
      return (await import("./chunks/BlogModule-76XC6KU5.js")).BlogModule;
    case "experience":
      return (await import("./chunks/ExperienceModule-6GBLHYV4.js")).ExperienceModule;
    case "faqs":
      return (await import("./chunks/FaqsModule-KE6CND6U.js")).FaqsModule;
    case "contact-messages":
      return (await import("./chunks/ContactMessagesModule-7CGODPZV.js")).ContactMessagesModule;
    case "blog-engagement":
      return (await import("./chunks/BlogEngagementModule-FLHXM32Z.js")).BlogEngagementModule;
    case "access-requests":
      return (await import("./chunks/AccessRequestsModule-AYEILZV7.js")).AccessRequestsModule;
    case "users":
      return (await import("./chunks/UsersModule-AIL3GXGC.js")).UsersModule;
    case "recent-activities":
      return (await import("./chunks/RecentActivitiesModule-FDQOMHQ4.js")).RecentActivitiesModule;
    case "settings":
      return (await import("./chunks/SettingsModule-4LOII3SC.js")).SettingsModule;
    case "login":
      return (await import("./chunks/LoginModule-QYGKEMBV.js")).LoginModule;
    case "forgot-password":
      return (await import("./chunks/ForgotPasswordModule-KDDU6XOE.js")).ForgotPasswordModule;
    case "reset-password":
      return (await import("./chunks/ResetPasswordModule-P6CF6BHG.js")).ResetPasswordModule;
    default:
      return null;
  }
}
var activePageModule = null;
var shellInstance = null;
var bootPromise = null;
var appChromeInitialized = false;
function bindGlobalPanelChrome() {
  initUserCredentialsPanel();
  initStaffInviteLinkModal();
  $all(".pa-panel-tab").forEach((btn) => {
    if (!(btn instanceof HTMLElement)) return;
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.panel, btn.dataset.tab);
    });
  });
  $id("paPanelOverlay")?.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement && e.target.id === "paPanelOverlay") closePanels();
  });
}
var quickAddModule = null;
async function bindQuickAddButton(pageModule) {
  if (quickAddModule) return;
  const { QuickAddModule } = await import("./chunks/QuickAddModule-KCY2ZFMS.js");
  quickAddModule = new QuickAddModule(pageModule);
  quickAddModule.bindEvents();
}
async function initPageModule(pageModule) {
  if (typeof pageModule.init === "function") {
    await pageModule.init();
  } else {
    await pageModule.load();
    pageModule.render();
    pageModule.bindEvents();
  }
  bodyLoader.end();
  bodyLoader.reset();
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      applyCapabilityGatedElements(getAccessCapabilities());
      resolve();
    });
  });
}
async function ensureShell() {
  if (!shellInstance) {
    shellInstance = new ShellModule();
    await shellInstance.init().catch((err) => {
      console.warn("[main] shell init failed:", err);
    });
  }
}
function initAppChrome() {
  if (appChromeInitialized) {
    initSettingsNav();
    syncSidebarActiveNav();
    syncPublicPortfolioLinks();
    return;
  }
  appChromeInitialized = true;
  initSettingsNav();
  initSidebarNav();
  syncPublicPortfolioLinks();
  initSidebarGroupNav();
  initSidebarRailNav();
  initSidebarCollapse();
  initMobileHeaderSearch();
}
async function bootAuthPage(ModuleClass, page) {
  document.documentElement.classList.add("pa-auth-route");
  clearDomCache();
  initConfirmDialog();
  await initAuthAppearance();
  const pageModule = new ModuleClass();
  if (typeof pageModule.init === "function") {
    await pageModule.init();
  } else {
    await pageModule.load();
    pageModule.render();
    pageModule.bindEvents();
  }
  runPageEnter(page);
  initSegmentPills();
  initMotionChrome();
  markAppReady();
  activePageModule = pageModule;
  window.__paDebug = { pageModule, page };
}
async function bootAppPage(ModuleClass, page) {
  clearLegacyPersistedViewOverrides();
  bodyLoader.mount();
  bodyLoader.begin("Loading your data\u2026");
  const prefetchKeys = getPrefetchKeysForPage(page);
  if (prefetchKeys?.length) {
    await storage.hydrateFromPersistentCache(prefetchKeys);
    storage.prefetch(prefetchKeys);
  }
  clearDomCache();
  initConfirmDialog();
  const pageModule = new ModuleClass();
  await storage.waitForBootstrap();
  await ensureShell();
  await initPageModule(pageModule);
  const viewModeSynced = await syncModuleViewModeFromSettings(pageModule);
  if (viewModeSynced && typeof pageModule.render === "function") {
    pageModule.render();
  } else if (typeof pageModule.setViewModeFromStore === "function") {
    pageModule.setViewModeFromStore();
  }
  initAllPaSelects();
  initCollapseMotion();
  bindGlobalPanelChrome();
  if (page === "dashboard") void bindQuickAddButton(pageModule);
  initAppChrome();
  runPageEnter(page);
  initSegmentPills();
  initMotionChrome();
  markAppReady();
  activePageModule = pageModule;
  window.__paDebug = { pageModule, page };
  focusMainContent();
}
async function runBoot() {
  bootstrapAppearanceFromCache();
  initPasswordToggles();
  const page = getCurrentPage();
  const ModuleClass = await loadPageModuleClass(page);
  if (!ModuleClass) {
    console.warn(`[main] no module registered for page "${page}"`);
    bodyLoader.reset();
    return;
  }
  try {
    if (AUTH_PAGES.has(page)) {
      await bootAuthPage(ModuleClass, page);
    } else {
      await bootAppPage(ModuleClass, page);
    }
  } catch (err) {
    if (!AUTH_PAGES.has(page)) {
      bodyLoader.end();
      bodyLoader.reset();
    }
    throw err;
  }
}
function teardownPortfolioApp() {
  killPageMotion();
  resetAppReady();
  if (activePageModule?.destroy) {
    try {
      activePageModule.destroy();
    } catch (err) {
      console.warn("[main] page teardown failed:", err);
    }
  }
  activePageModule = null;
  quickAddModule = null;
  if (shellInstance) {
    shellInstance.destroy();
    shellInstance = null;
    appChromeInitialized = false;
  }
  clearDomCache();
  bodyLoader.reset();
  closePanels();
}
function bootPortfolioApp() {
  if (bootPromise) return bootPromise;
  bootPromise = (async () => {
    teardownPortfolioApp();
    window.__paBooted = true;
    if (typeof window.__paStartPrefetch === "function") {
      window.__paStartPrefetch(window.location.pathname);
    }
    await runBoot();
  })().catch((err) => {
    window.__paBooted = false;
    bodyLoader.reset();
    console.error("[main] fatal error during boot:", err);
    throw err;
  }).finally(() => {
    bootPromise = null;
  });
  return bootPromise;
}
window.__paBootPortfolioApp = bootPortfolioApp;
window.__paTeardownPortfolioApp = teardownPortfolioApp;
export {
  bootPortfolioApp,
  teardownPortfolioApp
};
//# sourceMappingURL=main.js.map
