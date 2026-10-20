import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ADMIN = '/admin';

const ADMIN_SEGMENTS = [
  'recent-activities',
  'contact-messages',
  'access-requests',
  'users',
  'projects',
  'project-categories',
  'project-technologies',
  'project-tags',
  'tool-categories',
  'technologies',
  'tools',
  'blog-categories',
  'blog-post',
  'blog-tags',
  'blog-engagement',
  'testimonials',
  'experience',
  'media-library',
  'settings',
  'login',
  'forget-password',
  'reset-password',
  'tags',
  'categories',
];

function prefixAdminRoute(route) {
  if (route.startsWith(`${ADMIN}/`) || route === ADMIN) return route;
  if (route === '/') return ADMIN;
  return `${ADMIN}${route.startsWith('/') ? route : `/${route}`}`;
}

function patchClientSource(content) {
  let out = content;
  out = out.replaceAll("window.location.href = '/login'", `window.location.href = '${ADMIN}/login'`);
  out = out.replaceAll('window.location.href = "/login"', `window.location.href = "${ADMIN}/login"`);

  for (const seg of ADMIN_SEGMENTS) {
    const from = `'/${seg}`;
    const to = `'${ADMIN}/${seg}`;
    if (from === to) continue;
    out = out.split(from).join(to);
    out = out.split(`"/${seg}`).join(`"${ADMIN}/${seg}`);
    out = out.split(`href="/${seg}`).join(`href="${ADMIN}/${seg}`);
    out = out.split(`href='/${seg}`).join(`href='${ADMIN}/${seg}`);
  }

  out = out.replaceAll("linkPath: '/settings/", `linkPath: '${ADMIN}/settings/`);
  out = out.replaceAll('href="/settings/', `href="${ADMIN}/settings/`);
  out = out.replaceAll("navigatePath: '/", `navigatePath: '${ADMIN}/`);

  if (out.includes("path === '/' || path === ''")) {
    out = out.replace(
      "path === '/' || path === ''",
      `path === '${ADMIN}' || path === '${ADMIN}/' || path === '/' || path === ''`,
    );
  }

  out = out.replaceAll(
    'You don\'t have permission to do that. <a href="/settings/security">',
    `You don't have permission to do that. <a href="${ADMIN}/settings/security">`,
  );

  return out;
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) acc.push(full);
  }
  return acc;
}

const clientFiles = walk(path.join(ROOT, 'client'));
for (const file of clientFiles) {
  const before = fs.readFileSync(file, 'utf8');
  const after = patchClientSource(before);
  if (after !== before) fs.writeFileSync(file, after);
}

const sidebar = path.join(ROOT, 'app/admin/sidebarHtml.tsx');
let sidebarContent = fs.readFileSync(sidebar, 'utf8');
sidebarContent = sidebarContent.replace('href="/settings/profile"', `href="${ADMIN}/settings/profile"`);
sidebarContent = sidebarContent.replace(
  'href="/" class="pa-sidebar-brand',
  `href="${ADMIN}" class="pa-sidebar-brand`,
);
sidebarContent = sidebarContent.replace("href: '/',", `href: '${ADMIN}',`);
for (const seg of ADMIN_SEGMENTS) {
  sidebarContent = sidebarContent.split(`'/${seg}'`).join(`'${ADMIN}/${seg}'`);
}
fs.writeFileSync(sidebar, sidebarContent);

const adminPages = walk(path.join(ROOT, 'app/admin'));
for (const file of adminPages) {
  let c = fs.readFileSync(file, 'utf8');
  const next = c.replaceAll("@/app/", "@/app/admin/");
  if (next !== c) fs.writeFileSync(file, next);
}

console.log('Patched client and admin shell paths.');
