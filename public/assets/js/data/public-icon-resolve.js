import { TECH_BRAND_ICONS } from "./tech-brand-icons.js";
import { legacySiKeyToThesvgSlug } from "./legacy-si-to-thesvg-slug.js";

/** Keep in sync with lib/portfolio/public-icon-resolve.ts */
export const DEFAULT_PUBLIC_REMIX_ICON = "ri-tools-line";

export const REMIX_ICON_CLASS_RE = /^ri-[a-z0-9][a-z0-9-]*$/;

const THESVG_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const LEGACY_UI_TO_REMIX = {
  siArrowUp: "ri-arrow-up-line",
  siColse: "ri-close-line",
  siCheckmark: "ri-check-line",
  siArrowTilt: "ri-arrow-right-up-line",
  siTheme: "ri-contrast-2-line",
  siArrowRight: "ri-arrow-right-line",
  siDownload: "ri-download-line",
  siBriefcase: "ri-briefcase-line",
  siUsers: "ri-group-line",
  siStar: "ri-star-line",
  siStarfill: "ri-star-fill",
  siPhone: "ri-phone-line",
  siDisplay: "ri-device-line",
  siPen: "ri-quill-pen-line",
  siServer: "ri-server-line",
  siSpark: "ri-flashlight-line",
  siMonitor: "ri-computer-line",
  siSend: "ri-send-plane-line",
  siCode: "ri-code-line",
  siExclamination: "ri-question-line",
  siBackend: "ri-server-line",
  siGruadutionCap: "ri-graduation-cap-line",
  siExternalLink: "ri-external-link-line",
  siEnvelope: "ri-mail-line",
  siLocationPin: "ri-map-pin-line",
  siMinus: "ri-subtract-line",
  siGlobe: "ri-global-line",
  siHeart: "ri-heart-fill",
  siBriefcaseA: "ri-briefcase-line",
  siRocket: "ri-rocket-line",
  siGrowth: "ri-line-chart-line",
  siUser: "ri-user-line",
  siAward: "ri-award-line",
  siCalendar: "ri-calendar-line",
  siBuilding: "ri-building-line",
  siRocketS: "ri-rocket-line",
  siBox3D: "ri-box-3-line",
  siSearch: "ri-search-line",
  siChevronDown: "ri-arrow-down-s-line",
  siFilters: "ri-filter-3-line",
  siRefresh: "ri-refresh-line",
  siFile: "ri-file-line",
  siApps: "ri-apps-line",
  siBars: "ri-list-check",
  siMansnory: "ri-layout-masonry-line",
  siAngleLeft: "ri-arrow-left-s-line",
  siAngleRight: "ri-arrow-right-s-line",
  siRench: "ri-hammer-line",
  siShieldCheck: "ri-shield-check-line",
  siEye: "ri-eye-line",
  siBookOpen: "ri-book-open-line",
  siClock: "ri-time-line",
  siSmartphone: "ri-smartphone-line",
  siCalendarCheck: "ri-calendar-check-line",
  siSmile: "ri-emotion-line",
  siChat: "ri-chat-3-line",
  siListView: "ri-list-unordered",
  siChevronLeft: "ri-arrow-left-s-line",
  siChevronRight: "ri-arrow-right-s-line",
  siShield: "ri-shield-line",
  siHeadphone: "ri-headphone-line",
  siEmail: "ri-mail-line",
  siSettings: "ri-settings-3-line",
  siPlay: "ri-play-fill",
  siFaceEmoji: "ri-emotion-happy-line",
  siBarsChart: "ri-bar-chart-line",
  siLock: "ri-lock-line",
  siDocument: "ri-file-text-line",
  siPhoneScreen: "ri-smartphone-line",
  siBell: "ri-notification-3-line",
  siSun: "ri-sun-line",
  siEdit: "ri-edit-line",
  siGrid: "ri-grid-line",
  siTrending: "ri-trending-up-line",
  siCart: "ri-shopping-cart-line",
  siMessage: "ri-message-3-line",
  siLink: "ri-link",
  siPlus: "ri-add-line",
  siHome: "ri-home-line",
  siReview: "ri-chat-quote-line",
};

export const DECORATIVE_SVG_KEYS = [
  "siBorderBox",
  "siMonogram",
  "siRing",
  "siGridDots",
  "siFooterGlobe",
  "siFooterGridDots",
  "siSpokes",
  "siMeshWrap",
  "siSendGreen",
  "siBubbleLine",
  "siWaveBg",
  "siDoubleCircle",
  "siDoubleSquare",
  "siStutasDot",
  "siFaqChat",
  "siPath",
  "siReactJsWhite",
  "siJavascriptWhite",
  "siTailwindCssWhite",
  "siDevOops",
  "siFlag",
];

export const LOCAL_SVG_ICON_KEYS = new Set([
  ...Object.keys(TECH_BRAND_ICONS),
  ...DECORATIVE_SVG_KEYS,
]);

function isThesvgSlug(value) {
  const slug = String(value || "").trim();
  return !!(slug && THESVG_SLUG_RE.test(slug));
}

export function isRemixIconClass(value) {
  return !!(value && REMIX_ICON_CLASS_RE.test(value));
}

export function isLocalSvgIconKey(key) {
  return !!(key && LOCAL_SVG_ICON_KEYS.has(key));
}

export function getPublicThesvgUrl(slug, variant = "default") {
  const safe = String(slug || "").trim();
  if (!safe) return "";
  const params =
    variant && variant !== "default"
      ? `?variant=${encodeURIComponent(variant)}`
      : "";
  return `/api/public/thesvg/${encodeURIComponent(safe)}${params}`;
}

export function resolvePublicSiteIcon(rawName, fallback = DEFAULT_PUBLIC_REMIX_ICON) {
  const name = String(rawName || "").trim().replace(/["'>]+$/g, "");
  if (!name) return { kind: "invalid" };

  if (isRemixIconClass(name)) {
    return { kind: "remix", className: name };
  }

  const uiRemix = LEGACY_UI_TO_REMIX[name];
  if (uiRemix) {
    return { kind: "remix", className: uiRemix };
  }

  if (isLocalSvgIconKey(name)) {
    return { kind: "localSvg", key: name };
  }

  const legacySlug = legacySiKeyToThesvgSlug(name);
  if (legacySlug) {
    return { kind: "thesvg", slug: legacySlug };
  }

  if (isThesvgSlug(name)) {
    return { kind: "thesvg", slug: name };
  }

  const fb = String(fallback || DEFAULT_PUBLIC_REMIX_ICON).trim();
  if (isRemixIconClass(fb)) {
    return { kind: "remix", className: fb };
  }
  const fbUi = LEGACY_UI_TO_REMIX[fb];
  if (fbUi) {
    return { kind: "remix", className: fbUi };
  }
  const fbThesvg = legacySiKeyToThesvgSlug(fb);
  if (fbThesvg) {
    return { kind: "thesvg", slug: fbThesvg };
  }
  if (isThesvgSlug(fb)) {
    return { kind: "thesvg", slug: fb };
  }
  if (isLocalSvgIconKey(fb)) {
    return { kind: "localSvg", key: fb };
  }
  return { kind: "remix", className: DEFAULT_PUBLIC_REMIX_ICON };
}

export function resolvePublicIconKey(value, fallback = DEFAULT_PUBLIC_REMIX_ICON) {
  const resolved = resolvePublicSiteIcon(value, fallback);
  if (resolved.kind === "remix") return resolved.className;
  if (resolved.kind === "thesvg") return resolved.slug;
  if (resolved.kind === "localSvg") return resolved.key;
  return DEFAULT_PUBLIC_REMIX_ICON;
}
