import { storage } from "../core/StorageService.js";
import { DEFAULT_TOOL_ICON } from "./icon-utils.js";
function nextLegacyId(rows) {
  return Math.max(0, ...rows.map((r) => Number(r.id) || 0)) + 1;
}
function findByNameCI(rows, name) {
  const lower = String(name || "").trim().toLowerCase();
  return rows.find((r) => String(r.name || "").trim().toLowerCase() === lower);
}
function remapProjectStack(projects, fromKind, fromId, toKind, toId) {
  let projectsUpdated = 0;
  for (const p of projects) {
    let touched = false;
    if (fromKind === "tool") {
      const tools = (p.tools || []).filter((id) => String(id) !== String(fromId));
      if (tools.length !== (p.tools || []).length) {
        p.tools = tools;
        touched = true;
      }
    } else {
      const technologies = (p.technologies || []).filter((id) => String(id) !== String(fromId));
      if (technologies.length !== (p.technologies || []).length) {
        p.technologies = technologies;
        touched = true;
      }
    }
    if (!touched) continue;
    if (toKind === "tool") {
      const tools = [...p.tools || []];
      if (!tools.some((id) => String(id) === String(toId))) tools.push(toId);
      p.tools = tools;
    } else {
      const technologies = [...p.technologies || []];
      if (!technologies.some((id) => String(id) === String(toId))) technologies.push(toId);
      p.technologies = technologies;
    }
    projectsUpdated += 1;
  }
  return projectsUpdated;
}
async function convertStackCatalogItem(fromKind, legacyId, overrides = {}) {
  const targetKind = fromKind === "tool" ? "technology" : "tool";
  const id = Number(legacyId);
  if (!Number.isFinite(id)) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: "Invalid item id." };
  }
  storage.invalidate("pa_tools");
  storage.invalidate("pa_technologies");
  storage.invalidate("pa_projects");
  const [tools, technologies, projects] = await Promise.all([
    storage.get("pa_tools", []),
    storage.get("pa_technologies", []),
    storage.get("pa_projects", [])
  ]);
  const toolRows = Array.isArray(tools) ? tools.slice() : [];
  const techRows = Array.isArray(technologies) ? technologies.slice() : [];
  const projectRows = Array.isArray(projects) ? projects.map((p) => ({ ...p })) : [];
  if (fromKind === "tool") {
    const source2 = toolRows.find((t) => String(t.id) === String(id));
    if (!source2) {
      return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: "Tool not found." };
    }
    const name2 = String(overrides.name ?? source2.name ?? "").trim();
    if (!name2) {
      return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: "Name is required." };
    }
    const categoryId2 = overrides.categoryId ?? source2.categoryId;
    const existing2 = findByNameCI(techRows, name2);
    let targetId2;
    let merged2 = false;
    if (existing2) {
      targetId2 = Number(existing2.id);
      merged2 = true;
      if (categoryId2 != null) existing2.categoryId = categoryId2;
    } else {
      targetId2 = nextLegacyId(techRows);
      techRows.push({
        id: targetId2,
        name: name2,
        categoryId: categoryId2,
        level: "intermediate",
        url: "",
        desc: "",
        years: null,
        featured: false,
        sortOrder: source2.sortOrder ?? targetId2,
        createdAt: source2.createdAt || (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    const projectsUpdated2 = remapProjectStack(projectRows, "tool", id, "technology", targetId2);
    const nextTools = toolRows.filter((t) => String(t.id) !== String(id));
    await storage.set("pa_technologies", techRows);
    if (projectsUpdated2) await storage.set("pa_projects", projectRows);
    await storage.set("pa_tools", nextTools);
    storage.invalidate("pa_recent_activities");
    return { ok: true, targetKind, targetId: targetId2, merged: merged2, projectsUpdated: projectsUpdated2 };
  }
  const source = techRows.find((t) => String(t.id) === String(id));
  if (!source) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: "Technology not found." };
  }
  const name = String(overrides.name ?? source.name ?? "").trim();
  if (!name) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: "Name is required." };
  }
  const categoryId = overrides.categoryId ?? source.categoryId;
  const existing = findByNameCI(toolRows, name);
  let targetId;
  let merged = false;
  if (existing) {
    targetId = Number(existing.id);
    merged = true;
    if (categoryId != null) existing.categoryId = categoryId;
  } else {
    targetId = nextLegacyId(toolRows);
    toolRows.push({
      id: targetId,
      name,
      categoryId,
      iconClass: DEFAULT_TOOL_ICON,
      iconUrl: "",
      sortOrder: source.sortOrder ?? targetId,
      createdAt: source.createdAt || (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  const projectsUpdated = remapProjectStack(projectRows, "technology", id, "tool", targetId);
  const nextTechs = techRows.filter((t) => String(t.id) !== String(id));
  await storage.set("pa_tools", toolRows);
  if (projectsUpdated) await storage.set("pa_projects", projectRows);
  await storage.set("pa_technologies", nextTechs);
  storage.invalidate("pa_recent_activities");
  return { ok: true, targetKind, targetId, merged, projectsUpdated };
}
export {
  convertStackCatalogItem
};
//# sourceMappingURL=stackKindConvert.js.map
