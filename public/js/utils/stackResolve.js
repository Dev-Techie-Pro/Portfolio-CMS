import { storage } from "../core/StorageService.js";
import { loadStackCatalog } from "./stackCatalog.js";
import { resolveTechnologyByName } from "./technologyResolve.js";
import { resolveToolByName } from "./toolResolve.js";
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
export {
  resolveProjectStackFromChips,
  resolveStackItemByName
};
//# sourceMappingURL=stackResolve.js.map
