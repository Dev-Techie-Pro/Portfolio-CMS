import type { BlogDetailTemplate } from "@/lib/blog/detail-template";

export type PortfolioBlogPost = {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  detailTemplate?: BlogDetailTemplate;
  date: string;
  dateLabel: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  tags: string[];
  sidebarCta?: {
    title: string;
    text: string;
    linkText: string;
    href: string;
  };
  preFooter?: {
    title: string;
    text: string;
    features: { icon: string; title: string; text: string }[];
    ctaText: string;
    ctaHref: string;
  };
  content: Record<string, unknown>[];
  hiddenSections?: string[];
  prevBlog?: { id: string; title: string } | null;
  nextBlog?: { id: string; title: string } | null;
  isFeatured?: boolean;
  sortOrder?: number;
};

export type BlogCatalogResponse = {
  posts: PortfolioBlogPost[];
  order: string[];
  galleryOrder: string[];
};
