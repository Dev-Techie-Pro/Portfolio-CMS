export type BlogDetailTemplate =
  | "standard"
  | "minimal"
  | "case-study"
  | "longform";

const VALID: ReadonlySet<string> = new Set([
  "standard",
  "minimal",
  "case-study",
  "longform",
]);

function walkBlocks(
  content: Record<string, unknown>[],
  visit: (block: Record<string, unknown>) => void,
) {
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    visit(block);
    const nested = block.blocks;
    if (Array.isArray(nested)) {
      walkBlocks(nested as Record<string, unknown>[], visit);
    }
  }
}

function contentHasTypes(
  content: Record<string, unknown>[],
  types: Set<string>,
): boolean {
  let found = false;
  walkBlocks(content, (block) => {
    const type = typeof block.type === "string" ? block.type : "";
    if (types.has(type)) found = true;
  });
  return found;
}

export function inferDetailTemplate(
  content: Record<string, unknown>[],
): BlogDetailTemplate {
  const sections = content.filter(
    (b) => b && typeof b === "object" && b.type === "section",
  );

  const caseStudyTypes = new Set([
    "compare-grid",
    "feature-grid",
    "benefits-row",
    "examples-row",
  ]);
  if (content.some((b) => b?.type === "stat-box")) return "case-study";
  if (contentHasTypes(content, caseStudyTypes)) return "case-study";

  if (sections.length <= 1) return "minimal";
  if (sections.length >= 4) return "longform";
  return "standard";
}

export function resolveDetailTemplate(
  explicit: unknown,
  content: Record<string, unknown>[],
): BlogDetailTemplate {
  if (typeof explicit === "string" && VALID.has(explicit)) {
    return explicit as BlogDetailTemplate;
  }
  return inferDetailTemplate(content);
}
