// @ts-nocheck
import { storage } from '../core/StorageService.js';
import { DEFAULT_TOOL_ICON } from './icon-utils.js';
import type { StackKind } from './stackCatalog.js';

export type ConvertStackKindResult = {
  ok: boolean;
  targetKind: StackKind;
  targetId: number;
  merged: boolean;
  projectsUpdated: number;
  message?: string;
};

function nextLegacyId(rows: Array<{ id?: number }>) {
  return Math.max(0, ...rows.map((r) => Number(r.id) || 0)) + 1;
}

function findByNameCI<T extends { name?: string }>(rows: T[], name: string): T | undefined {
  const lower = String(name || '').trim().toLowerCase();
  return rows.find((r) => String(r.name || '').trim().toLowerCase() === lower);
}

function remapProjectStack(
  projects: Array<{ tools?: number[]; technologies?: number[] }>,
  fromKind: StackKind,
  fromId: number,
  toKind: StackKind,
  toId: number,
) {
  let projectsUpdated = 0;
  for (const p of projects) {
    let touched = false;
    if (fromKind === 'tool') {
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

    if (toKind === 'tool') {
      const tools = [...(p.tools || [])];
      if (!tools.some((id) => String(id) === String(toId))) tools.push(toId);
      p.tools = tools;
    } else {
      const technologies = [...(p.technologies || [])];
      if (!technologies.some((id) => String(id) === String(toId))) technologies.push(toId);
      p.technologies = technologies;
    }
    projectsUpdated += 1;
  }
  return projectsUpdated;
}

/**
 * Move a catalog row between Tools and Technologies; update project stack links.
 */
export async function convertStackCatalogItem(
  fromKind: StackKind,
  legacyId: number,
  overrides: { name?: string; categoryId?: number } = {},
): Promise<ConvertStackKindResult> {
  const targetKind: StackKind = fromKind === 'tool' ? 'technology' : 'tool';
  const id = Number(legacyId);
  if (!Number.isFinite(id)) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: 'Invalid item id.' };
  }

  storage.invalidate('pa_tools');
  storage.invalidate('pa_technologies');
  storage.invalidate('pa_projects');

  const [tools, technologies, projects] = await Promise.all([
    storage.get('pa_tools', []),
    storage.get('pa_technologies', []),
    storage.get('pa_projects', []),
  ]);
  const toolRows = Array.isArray(tools) ? tools.slice() : [];
  const techRows = Array.isArray(technologies) ? technologies.slice() : [];
  const projectRows = Array.isArray(projects) ? projects.map((p) => ({ ...p })) : [];

  if (fromKind === 'tool') {
    const source = toolRows.find((t) => String(t.id) === String(id));
    if (!source) {
      return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: 'Tool not found.' };
    }
    const name = String(overrides.name ?? source.name ?? '').trim();
    if (!name) {
      return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: 'Name is required.' };
    }
    const categoryId = overrides.categoryId ?? source.categoryId;

    const existing = findByNameCI(techRows, name);
    let targetId: number;
    let merged = false;
    if (existing) {
      targetId = Number(existing.id);
      merged = true;
      if (categoryId != null) existing.categoryId = categoryId;
    } else {
      targetId = nextLegacyId(techRows);
      techRows.push({
        id: targetId,
        name,
        categoryId,
        level: 'intermediate',
        url: '',
        desc: '',
        years: null,
        featured: false,
        sortOrder: source.sortOrder ?? targetId,
        createdAt: source.createdAt || new Date().toISOString(),
      });
    }

    const projectsUpdated = remapProjectStack(projectRows, 'tool', id, 'technology', targetId);
    const nextTools = toolRows.filter((t) => String(t.id) !== String(id));

    await storage.set('pa_technologies', techRows);
    if (projectsUpdated) await storage.set('pa_projects', projectRows);
    await storage.set('pa_tools', nextTools);
    storage.invalidate('pa_recent_activities');

    return { ok: true, targetKind, targetId, merged, projectsUpdated };
  }

  const source = techRows.find((t) => String(t.id) === String(id));
  if (!source) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: 'Technology not found.' };
  }
  const name = String(overrides.name ?? source.name ?? '').trim();
  if (!name) {
    return { ok: false, targetKind, targetId: 0, merged: false, projectsUpdated: 0, message: 'Name is required.' };
  }
  const categoryId = overrides.categoryId ?? source.categoryId;

  const existing = findByNameCI(toolRows, name);
  let targetId: number;
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
      iconUrl: '',
      sortOrder: source.sortOrder ?? targetId,
      createdAt: source.createdAt || new Date().toISOString(),
    });
  }

  const projectsUpdated = remapProjectStack(projectRows, 'technology', id, 'tool', targetId);
  const nextTechs = techRows.filter((t) => String(t.id) !== String(id));

  await storage.set('pa_tools', toolRows);
  if (projectsUpdated) await storage.set('pa_projects', projectRows);
  await storage.set('pa_technologies', nextTechs);
  storage.invalidate('pa_recent_activities');

  return { ok: true, targetKind, targetId, merged, projectsUpdated };
}
