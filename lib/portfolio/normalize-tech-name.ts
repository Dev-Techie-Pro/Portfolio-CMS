/** Normalize CMS / skill / experience labels for icon matching. */
export function normalizeTechNameForIcon(name: string): string {
  let raw = String(name ?? "").trim();
  if (!raw) return "";

  raw = raw.replace(/\s*·\s*[\d.]+%?\s*$/i, "").trim();

  if (/c\s*#|c♯|c\s*sharp|c-sharp|csharp/i.test(raw)) {
    return "csharp";
  }

  let s = raw
    .toLowerCase()
    .replace(/\.net/g, "dotnet")
    .replace(/c\s*#/g, "csharp")
    .replace(/#/g, " ")
    .replace(/\//g, " ")
    .replace(/\\/g, " ")
    .replace(/[+&,|]/g, " ")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (s === "next js" || s === "nextjs") return "nextjs";
  if (s === "sql server" || s === "ms sql" || s === "mssql") return "sql server";
  if (s === "css 3" || s === "css3") return "css3";
  if (s === "sass" || s === "scss") return "sass";

  return s;
}
