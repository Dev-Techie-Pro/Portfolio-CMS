import fs from 'fs';
import path from 'path';

const dir = path.join(path.resolve(import.meta.dirname, '..'), 'app/admin/experience');

function toTs(exportName, snippetFile, outFile) {
  const content = fs.readFileSync(path.join(dir, snippetFile), 'utf8');
  const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  fs.writeFileSync(path.join(dir, outFile), `// @ts-nocheck\nexport const ${exportName} = \`${escaped}\`;\n`, 'utf8');
}

toTs('EXPERIENCE_BODY_OVERLAYS_HTML', '_bodyOverlaysSnippet.txt', 'experienceBodyOverlays.ts');
toTs('EXPERIENCE_BODY_SHELL_HTML', '_bodyShellSnippet.txt', 'experienceBodyShell.ts');
console.log('Done');
