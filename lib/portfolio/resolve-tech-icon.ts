/** Maps a technology name to portfolio site-icon registry keys (si*). */
export function resolveTechIconName(name: string): string {
  const n = String(name || "").toLowerCase();
  if (n.includes("wordpress")) return "siWordpress";
  if (n.includes("woocommerce")) return "siWoocom";
  if (n.includes("angular")) return "siAngularJs";
  if (n.includes("react")) return "siReactJs";
  if (n.includes("node")) return "siNodeJs";
  if (n.includes("express")) return "siExpressJs";
  if (n.includes("mongo")) return "siMongodB";
  if (n.includes("tailwind")) return "siTailwindcss";
  if (n.includes("bootstrap")) return "siBootstrap";
  if (n.includes("typescript")) return "siTypescript";
  if (n.includes("javascript")) return "siJavascript";
  if (n.includes("php")) return n.includes("admin") ? "siPhpMyAdmin" : "siPhpFill";
  if (n.includes("mysql") || n.includes("mariadb")) return "siMySql";
  if (n.includes("postgres")) return "siPostgreSql";
  if (n.includes("sql server") || n === "sql") return "siSql";
  if (n.includes(".net core") || n.includes("asp.net core")) return "siDotNetCore";
  if (n.includes(".net") || n.includes("dotnet")) return "siDotNet";
  if (n.includes("c#") || n.includes("csharp")) return "siCsharp";
  if (n.includes("visual studio")) return "siVisualStudio";
  if (n.includes("azure")) return "siMicrosoftAzure";
  if (n.includes("elementor")) return "siElementor";
  if (n.includes("jquery")) return "siJquery";
  if (n.includes("html")) return "siHTML5";
  if (n.includes("css")) return "siCss3";
  return "siCode";
}
