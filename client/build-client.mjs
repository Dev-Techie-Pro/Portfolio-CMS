/**
 * Compile admin dashboard TypeScript → public/js/ (used only under /admin).
 * Public portfolio pages use /assets/js/* and never load /js/main.js.
 *
 * Default build:
 *   - main.ts → bundled ESM + code-split chunks (admin SPA)
 *   - boot-prefetch, prefetch-config, body-loader-template → small standalone scripts
 *
 * Optional: --mirror-standalone mirrors every client .ts file under public/js (legacy/debug).
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { writeClientSourceHash } from '../scripts/client-source-hash.mjs';

const CLIENT_ROOT = path.resolve('client');
const OUT_DIR = path.resolve('public/js');
const CHUNKS_DIR = path.join(OUT_DIR, 'chunks');
const MAIN_ENTRY = path.join(CLIENT_ROOT, 'main.ts');
const PUBLIC_FAQ_ENTRY = path.join(CLIENT_ROOT, 'features', 'blog-faq.ts');
const VENDOR_DIR = path.join(OUT_DIR, 'vendor');

const ADMIN_BOOT_STANDALONE = [
  path.join(CLIENT_ROOT, 'boot-prefetch.ts'),
  path.join(CLIENT_ROOT, 'prefetch-config.ts'),
  path.join(CLIENT_ROOT, 'body-loader-template.ts'),
].filter((file) => fs.existsSync(file));

const mirrorStandalone = process.argv.includes('--mirror-standalone');

/** Browser vendor assets (not bundled into ESM chunks). */
const VENDOR_COPIES = [
  {
    from: path.resolve('node_modules/apexcharts/dist/apexcharts.min.js'),
    to: path.join(VENDOR_DIR, 'apexcharts.min.js'),
  },
];

function copyVendorAssets() {
  fs.mkdirSync(VENDOR_DIR, { recursive: true });
  for (const { from, to } of VENDOR_COPIES) {
    if (!fs.existsSync(from)) {
      console.error(`Missing vendor source: ${from} (run npm install)`);
      process.exit(1);
    }
    fs.copyFileSync(from, to);
  }
}

/** esbuild code-splitting uses content hashes; without cleanup, old chunks accumulate and can ship stale module code. */
const cleanSplitChunksPlugin = {
  name: 'clean-split-chunks',
  setup(build) {
    build.onStart(() => {
      if (fs.existsSync(CHUNKS_DIR)) {
        fs.rmSync(CHUNKS_DIR, { recursive: true, force: true });
      }
    });
  },
};

// CI checks client/ ↔ public/js via .client-source-hash (not git diff — chunk hashes vary by OS).
// Minify only when CLIENT_BUILD_MINIFY=1 (do not tie to NODE_ENV).
const isProd = process.env.CLIENT_BUILD_MINIFY === '1';

const SHARED_BUILD = {
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  sourcemap: !isProd,
  minify: isProd,
  logLevel: 'info',
};

function walkTs(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTs(full, results);
    else if (entry.name.endsWith('.ts')) results.push(full);
  }
  return results;
}

const allTs = walkTs(CLIENT_ROOT).sort((a, b) => a.localeCompare(b));
const mirroredStandaloneEntries = allTs.filter(
  (file) => path.normalize(file) !== path.normalize(MAIN_ENTRY),
);
const standaloneEntries = mirrorStandalone ? mirroredStandaloneEntries : ADMIN_BOOT_STANDALONE;

if (!allTs.length) {
  console.log('No client TypeScript files found in client/.');
  process.exit(0);
}

async function buildStandalone() {
  if (!standaloneEntries.length) return;
  await esbuild.build({
    ...SHARED_BUILD,
    entryPoints: standaloneEntries,
    outdir: OUT_DIR,
    outbase: CLIENT_ROOT,
    bundle: false,
  });
}

async function buildMainBundle() {
  if (!fs.existsSync(MAIN_ENTRY)) return;
  await esbuild.build({
    ...SHARED_BUILD,
    entryPoints: [MAIN_ENTRY],
    outdir: OUT_DIR,
    outbase: CLIENT_ROOT,
    bundle: true,
    splitting: true,
    chunkNames: 'chunks/[name]-[hash]',
    plugins: [cleanSplitChunksPlugin],
  });
}

async function buildPublicFaqModule() {
  if (!fs.existsSync(PUBLIC_FAQ_ENTRY)) return;
  await esbuild.build({
    ...SHARED_BUILD,
    entryPoints: [PUBLIC_FAQ_ENTRY],
    outfile: path.join(OUT_DIR, 'features', 'blog-faq.js'),
    bundle: true,
  });
}

async function buildAll() {
  copyVendorAssets();
  await buildStandalone();
  await buildMainBundle();
  await buildPublicFaqModule();

  const sourceHash = writeClientSourceHash(CLIENT_ROOT);
  const mode = mirrorStandalone ? 'mirror-standalone' : 'admin';
  console.log(
    `Built admin client (${mode}): ${standaloneEntries.length} standalone + main bundle (${allTs.length} source file(s)) → public/js/`,
  );
  console.log(`client-source-hash: ${sourceHash}`);
}

if (process.argv.includes('--watch')) {
  const contexts = [];
  if (standaloneEntries.length) {
    contexts.push(
      await esbuild.context({
        ...SHARED_BUILD,
        entryPoints: standaloneEntries,
        outdir: OUT_DIR,
        outbase: CLIENT_ROOT,
        bundle: false,
      }),
    );
  }
  if (fs.existsSync(MAIN_ENTRY)) {
    contexts.push(
      await esbuild.context({
        ...SHARED_BUILD,
        entryPoints: [MAIN_ENTRY],
        outdir: OUT_DIR,
        outbase: CLIENT_ROOT,
        bundle: true,
        splitting: true,
        chunkNames: 'chunks/[name]-[hash]',
        plugins: [cleanSplitChunksPlugin],
      }),
    );
  }
  if (fs.existsSync(PUBLIC_FAQ_ENTRY)) {
    contexts.push(
      await esbuild.context({
        ...SHARED_BUILD,
        entryPoints: [PUBLIC_FAQ_ENTRY],
        outfile: path.join(OUT_DIR, 'features', 'blog-faq.js'),
        bundle: true,
      }),
    );
  }
  for (const ctx of contexts) await ctx.watch();
  console.log(`Watching admin client sources → public/js/`);
} else {
  await buildAll();
}
