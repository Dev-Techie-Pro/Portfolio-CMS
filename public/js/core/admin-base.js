const ADMIN_BASE = "/admin";
function adminPath(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) {
    return normalized;
  }
  if (normalized === "/") return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}
export {
  ADMIN_BASE,
  adminPath
};
//# sourceMappingURL=admin-base.js.map
