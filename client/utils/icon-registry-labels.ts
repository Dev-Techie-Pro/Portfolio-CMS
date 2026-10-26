// @ts-nocheck
/** Human-readable labels for built-in icon registry keys (admin picker + icon manager). */

export const ICON_REGISTRY_LABELS: Record<string, string> = {
  siMsSqlBrand: "MS SQL",
  siSql: "SQL Server",
  siCloudflare: "Cloudflare",
  siAdoNet: "ADO.NET",
  siNetFramework: ".NET Framework",
  siEntityFramework: "Entity Framework",
  siDotNet: ".NET",
  siDotNetCore: ".NET Core",
  siAspNetCore: "ASP.NET Core",
  siASPNet: "ASP.NET",
  siGit: "Git",
  siGithub: "GitHub",
  siAws: "AWS",
  siReactJs: "React",
  siNodeJs: "Node.js",
  siNextJs: "Next.js",
  siTypescript: "TypeScript",
  siJavascript: "JavaScript",
  siPhpFill: "PHP",
  siWordpress: "WordPress",
  siDocker: "Docker",
  siKubernetes: "Kubernetes",
  siStripe: "Stripe",
  siPaypal: "PayPal",
  siWindowsForms: "Windows Forms",
  siWpf: "WPF",
  siWebApiBrand: "Web API",
  siXaml: "XAML",
  siWebForms: "Web Forms",
  siSelenium: "Selenium",
  siAppium: "Appium",
  siJMeter: "JMeter",
  siSnowflake: "Snowflake",
  siMariaDB: "MariaDB",
  siPostgreSql: "PostgreSQL",
  siMySql: "MySQL",
  siMongodB: "MongoDB",
  siTailwindcss: "Tailwind CSS",
  siBootstrap: "Bootstrap",
  siFirebase: "Firebase",
  siSupabase: "Supabase",
  siVercel: "Vercel",
  siFigma: "Figma",
  siVsCode: "VS Code",
  siVisualStudio: "Visual Studio",
};

export function getIconRegistryLabel(key: string): string {
  const k = String(key || "").trim();
  if (!k) return "";
  if (ICON_REGISTRY_LABELS[k]) return ICON_REGISTRY_LABELS[k];
  const base = k.replace(/^si/, "");
  return base
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
