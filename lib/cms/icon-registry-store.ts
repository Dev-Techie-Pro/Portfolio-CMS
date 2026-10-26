// @ts-nocheck
import { ICONS } from "@/client/utils/icon-registry";
import { getIconRegistryLabel } from "@/client/utils/icon-registry-labels";

export const EMPTY_ICON_REGISTRY_STATE = {
  overrides: {},
  removed: [],
  labels: {},
  sortOrder: [],
};

export function normalizeIconRegistryState(raw) {
  const base = raw && typeof raw === "object" ? raw : {};
  return {
    overrides:
      base.overrides && typeof base.overrides === "object" ? base.overrides : {},
    removed: Array.isArray(base.removed) ? base.removed.map(String) : [],
    labels: base.labels && typeof base.labels === "object" ? base.labels : {},
    sortOrder: Array.isArray(base.sortOrder) ? base.sortOrder.map(String) : [],
  };
}

export function listBuiltInIconKeys() {
  return Object.keys(ICONS).sort((a, b) => a.localeCompare(b));
}

export function buildIconRegistryManifest(state) {
  const normalized = normalizeIconRegistryState(state);
  const removed = new Set(normalized.removed);
  const keys = new Set(listBuiltInIconKeys());
  for (const k of Object.keys(normalized.overrides)) keys.add(k);
  for (const k of normalized.removed) keys.delete(k);

  const sortIndex = new Map(
    normalized.sortOrder.map((k, i) => [k, i]),
  );

  const items = [...keys]
    .filter((k) => !removed.has(k))
    .map((key) => {
      const svg =
        normalized.overrides[key] ||
        ICONS[key] ||
        "";
      const label =
        normalized.labels[key] ||
        getIconRegistryLabel(key);
      return {
        key,
        label,
        svg,
        isCustom: !!normalized.overrides[key],
        isBuiltIn: !!ICONS[key],
      };
    })
    .sort((a, b) => {
      const ai = sortIndex.has(a.key) ? sortIndex.get(a.key) : 1e9;
      const bi = sortIndex.has(b.key) ? sortIndex.get(b.key) : 1e9;
      if (ai !== bi) return ai - bi;
      return a.label.localeCompare(b.label);
    });

  return { items, state: normalized };
}

export function mergeIconsForPublic(state) {
  const normalized = normalizeIconRegistryState(state);
  const merged = { ...ICONS, ...normalized.overrides };
  for (const key of normalized.removed) {
    delete merged[key];
  }
  return merged;
}
