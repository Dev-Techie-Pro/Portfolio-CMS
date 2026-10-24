/**
 * CI: compile client/ and verify public/js/.client-source-hash is in sync with sources.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  CLIENT_HASH_FILE,
  hashClientSources,
  readCommittedClientHash,
} from './client-source-hash.mjs';

if (!existsSync('client/build-client.mjs')) {
  console.log('OK: client bundle drift check skipped (no build script).');
  process.exit(0);
}

execSync('npm run build:client', {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' },
});

if (!existsSync(path.resolve('client'))) {
  console.log('OK: client bundle freshness check skipped (no client/).');
  process.exit(0);
}

const expected = readCommittedClientHash();
if (!expected) {
  console.error(`Missing ${CLIENT_HASH_FILE}. Run: npm run build:client`);
  process.exit(1);
}

const actual = hashClientSources();
if (actual !== expected) {
  console.error('client/ sources changed but public/js was not rebuilt (or hash not committed).');
  console.error(`  committed hash: ${expected}`);
  console.error(`  current hash:   ${actual}`);
  console.error('Run: npm run build:client');
  process.exit(1);
}

console.log('OK: client bundle build succeeded and source hash matches.');
