import "../portfolio-globals.css";

/**
 * Public portfolio routes only — admin uses app/admin/globals.css (no /js/main.js).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
