import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const GLYPH_CANDIDATES = [
  path.join(process.cwd(), 'node_modules/remixicon/fonts/remixicon.glyph.json'),
  path.join(process.cwd(), 'public/vendor/remixicon/remixicon.glyph.json'),
];

export async function loadRemixIconNames(): Promise<string[]> {
  for (const glyphPath of GLYPH_CANDIDATES) {
    try {
      await access(glyphPath, constants.R_OK);
      const raw = JSON.parse(await readFile(glyphPath, 'utf8'));
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        return Object.keys(raw);
      }
    } catch {
      // try next candidate
    }
  }
  const err = new Error(
    'Remix icon glyph registry not found. Run: npm install && npm run sync:remixicon',
  );
  // @ts-expect-error status for withStaffGet
  err.status = 503;
  throw err;
}
