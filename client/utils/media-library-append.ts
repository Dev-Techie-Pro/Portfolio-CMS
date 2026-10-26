// @ts-nocheck
import { storage } from '../core/StorageService.js';

/**
 * Register a storage upload in media_assets (same flow as Media Library upload).
 */
export async function appendToMediaLibrary(
  uploaded: {
    url: string;
    fileName?: string;
    size?: number;
    mimeType?: string;
    folder?: string;
  },
  options: { name?: string; alt?: string } = {},
) {
  const records = await storage.get('pa_media_library', []);
  const list = Array.isArray(records) ? records.slice() : [];
  const nextId = Math.max(0, ...list.map((m) => Number(m.id) || 0)) + 1;
  const record = {
    id: nextId,
    name: options.name || uploaded.fileName || 'upload',
    url: uploaded.url,
    alt: options.alt || '',
    folder: uploaded.folder || 'icons',
    size: uploaded.size || 0,
    type: uploaded.mimeType || '',
    uploadedAt: new Date().toISOString(),
    usageCount: 0,
  };
  list.push(record);
  await storage.set('pa_media_library', list);
  return record;
}
