import type { BlogDetailTemplate } from "@/lib/blog/detail-template";

export type BlogDetailPageTemplateId = BlogDetailTemplate;

export const BLOG_DETAIL_PAGE_TEMPLATES: {
  id: BlogDetailPageTemplateId;
  label: string;
  rootFile: string;
  description: string;
}[] = [
  {
    id: "standard",
    label: "Standard",
    rootFile: "template-standard.html",
    description: "TOC left, article center, sidebar right.",
  },
  {
    id: "minimal",
    label: "Minimal",
    rootFile: "template-minimal.html",
    description: "Centered article only — no sidebars.",
  },
  {
    id: "longform",
    label: "Longform",
    rootFile: "template-longform.html",
    description: "TOC left, wide article — no right sidebar.",
  },
];

export function getBlogDetailPageTemplateRootFile(
  id: string,
): string | undefined {
  return BLOG_DETAIL_PAGE_TEMPLATES.find((t) => t.id === id)?.rootFile;
}

/** Regenerate root `template-*.html` from `static-shell.ts` via `npm run generate:blog-detail-templates`. */
export const BLOG_DETAIL_TEMPLATE_GENERATE_SCRIPT =
  "scripts/generate-blog-detail-templates.mjs";
