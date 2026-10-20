/** URL prefix for the staff dashboard (unified app). */
export const ADMIN_BASE = "/admin";

export function adminPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === ADMIN_BASE || normalized.startsWith(`${ADMIN_BASE}/`)) {
    return normalized;
  }
  if (normalized === "/") return ADMIN_BASE;
  return `${ADMIN_BASE}${normalized}`;
}
