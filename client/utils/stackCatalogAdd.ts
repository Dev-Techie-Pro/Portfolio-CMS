// @ts-nocheck
import { storage } from '../core/StorageService.js';
import { DEFAULT_TOOL_ICON } from './icon-utils.js';
import type { StackKind } from './stackCatalog.js';

export type CrossCatalogAddInput = {
  name: string;
  categoryId: number;
  sortOrder?: number;
};

/**
 * Create a row in the opposite catalog (Tools ↔ Technologies) without touching the current page list.
 */
export async function addStackCatalogItem(
  kind: StackKind,
  input: CrossCatalogAddInput,
): Promise<{ ok: boolean; id?: number; message?: string }> {
  const name = String(input.name || '').trim();
  if (!name) return { ok: false, message: 'Name is required.' };

  if (kind === 'tool') {
    storage.invalidate('pa_tools');
    const tools = await storage.get('pa_tools', []);
    const rows = Array.isArray(tools) ? tools : [];
    if (rows.some((t) => String(t.name || '').toLowerCase() === name.toLowerCase())) {
      return { ok: false, message: 'A tool with this name already exists.' };
    }
    const id = Math.max(0, ...rows.map((t) => Number(t.id) || 0)) + 1;
    const record = {
      id,
      name,
      categoryId: input.categoryId,
      iconClass: DEFAULT_TOOL_ICON,
      iconUrl: '',
      sortOrder: input.sortOrder ?? id,
      createdAt: new Date().toISOString(),
    };
    await storage.set('pa_tools', rows.concat(record));
    storage.invalidate('pa_recent_activities');
    return { ok: true, id };
  }

  storage.invalidate('pa_technologies');
  const technologies = await storage.get('pa_technologies', []);
  const rows = Array.isArray(technologies) ? technologies : [];
  if (rows.some((t) => String(t.name || '').toLowerCase() === name.toLowerCase())) {
    return { ok: false, message: 'A technology with this name already exists.' };
  }
  const id = Math.max(0, ...rows.map((t) => Number(t.id) || 0)) + 1;
  const record = {
    id,
    name,
    categoryId: input.categoryId,
    level: 'intermediate',
    url: '',
    desc: '',
    years: null,
    featured: false,
    sortOrder: input.sortOrder ?? id,
    createdAt: new Date().toISOString(),
  };
  await storage.set('pa_technologies', rows.concat(record));
  storage.invalidate('pa_recent_activities');
  return { ok: true, id };
}
