import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const keys = [
  'siBorderBox',
  'siMonogram',
  'siRing',
  'siGridDots',
  'siFooterGlobe',
  'siFooterGridDots',
  'siSpokes',
  'siMeshWrap',
  'siSendGreen',
  'siBubbleLine',
  'siWaveBg',
  'siDoubleCircle',
  'siDoubleSquare',
  'siStutasDot',
  'siFaqChat',
  'siPath',
  'siReactJsWhite',
  'siJavascriptWhite',
  'siTailwindCssWhite',
  'siDevOops',
];

const root = path.resolve(import.meta.dirname, '..');
const registryUrl = pathToFileURL(
  path.join(root, 'public/assets/js/data/icon-registry.js'),
);
const { ICONS } = await import(registryUrl.href);

const picked = {};
for (const k of keys) {
  if (ICONS[k]) picked[k] = ICONS[k];
}

const out = path.join(root, 'public/assets/js/data/decorative-icons.js');
fs.writeFileSync(
  out,
  `/** Site-only decorative SVGs (not Remix / not theSVG brands). */\nexport const DECORATIVE_ICONS = ${JSON.stringify(picked, null, 2)};\n`,
);

console.log('Wrote', out, Object.keys(picked).length, 'icons');
