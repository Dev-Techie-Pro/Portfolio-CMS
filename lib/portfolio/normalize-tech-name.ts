/** Normalize CMS / skill / experience labels for icon matching. */
export function normalizeTechNameForIcon(name: string): string {
  let raw = String(name ?? "").trim();
  if (!raw) return "";

  raw = raw.replace(/\s*·\s*[\d.]+%?\s*$/i, "").trim();

  if (/c\s*#|c♯|c\s*sharp|c-sharp|csharp/i.test(raw)) {
    return "csharp";
  }

  let s = raw.toLowerCase();

  s = s
    .replace(/\bado\.net\b/g, "ado net")
    .replace(/\basp\.net\b/g, "asp net")
    .replace(/\bentity\s+framework\b/g, "entity framework")
    .replace(/\bnet\s+framework\b/g, "net framework")
    .replace(/\bnet\s+core\b/g, "net core");

  if (s === ".net" || s === "net") return "dotnet";

  s = s
    .replace(/c\s*#/g, "csharp")
    .replace(/#/g, " ")
    .replace(/\//g, " ")
    .replace(/\\/g, " ")
    .replace(/[+&,|]/g, " ")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (s === "next js" || s === "nextjs") return "nextjs";
  if (s === "ms sql" || s === "mssql") return "ms sql";
  if (s === "sql server") return "sql server";
  if (s === "css 3" || s === "css3") return "css3";
  if (s === "sass" || s === "scss") return "sass";

  return s;
}
