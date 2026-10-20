const CATEGORY_LABELS: Record<string, string> = {
  backend: "Backend",
  frontend: "Frontend",
  wordpress: "WordPress",
  architecture: "Architecture",
  "ui-ux": "UI/UX Design",
  "designs-system": "Designs System",
};

const CATEGORY_KEYS: Record<string, string> = {
  Backend: "backend",
  Frontend: "frontend",
  WordPress: "wordpress",
  Architecture: "architecture",
  "UI/UX Design": "ui-ux",
  "Designs System": "designs-system",
};

export function categoryKeyToLabel(key: string | null | undefined): string {
  if (!key) return "Article";
  const normalized = key.trim().toLowerCase();
  return (
    CATEGORY_LABELS[normalized] ||
    key
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function categoryLabelToKey(label: string): string {
  if (CATEGORY_KEYS[label]) return CATEGORY_KEYS[label];
  return label.trim().toLowerCase().replace(/\s+/g, "-");
}
