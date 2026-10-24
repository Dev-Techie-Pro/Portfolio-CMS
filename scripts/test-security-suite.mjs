/**
 * Optional security / hygiene checks (not part of test:ci).
 * Individual cases live in scripts/security/ for easier maintenance.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const securityDir = path.join(__dirname, 'security');

const tests = fs
  .readdirSync(securityDir)
  .filter((name) => name.startsWith('test-') && name.endsWith('.mjs'))
  .sort();

if (tests.length === 0) {
  console.error('No tests found in scripts/security/');
  process.exit(1);
}

let failed = 0;
for (const name of tests) {
  const file = path.join(securityDir, name);
  console.log(`\n--- ${name} ---`);
  const result = spawnSync(process.execPath, [file], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  if (result.status !== 0) {
    failed += 1;
  }
}

console.log(`\n${failed === 0 ? 'OK' : 'FAILED'}: ${tests.length - failed}/${tests.length} security checks passed`);
process.exit(failed === 0 ? 0 : 1);
