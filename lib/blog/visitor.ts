const VISITOR_RE = /^[a-zA-Z0-9_-]{16,64}$/;

export function parseVisitorKey(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const key = raw.trim();
  if (!VISITOR_RE.test(key)) return null;
  return key;
}

export function visitorKeyFromRequest(request: Request): string | null {
  const header = request.headers.get("x-blog-visitor");
  return parseVisitorKey(header);
}
