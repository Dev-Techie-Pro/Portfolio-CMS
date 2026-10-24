/**
 * Per-route script bundles mirroring original <script> tags on each HTML page.
 * Paths are served from /public/assets/js.
 */

export type PortfolioRoute =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "project-details"
  | "blogs"
  | "blog-details"
  | "testimonials"
  | "contact";

export type ScriptEntry =
  | { type: "module"; src: string }
  | { type: "classic"; src: string; defer?: boolean }
  | { type: "external"; src: string; defer?: boolean; crossOrigin?: string };

const BASE_MODULE: ScriptEntry[] = [
  { type: "module", src: "/assets/js/config/constants.js" },
  { type: "module", src: "/assets/js/loaders/component-loader.js" },
  { type: "module", src: "/assets/js/loaders/icon-loader.js" },
  { type: "module", src: "/assets/js/loaders/back-to-top-progress-loader.js" },
];

const BASE_CLASSIC: ScriptEntry[] = [
  { type: "classic", src: "/assets/js/modules/skeleton.js", defer: true },
  { type: "classic", src: "/assets/js/utils/dom.js", defer: true },
  { type: "classic", src: "/assets/js/utils/events.js", defer: true },
  { type: "classic", src: "/assets/js/utils/helpers.js", defer: true },
  { type: "classic", src: "/assets/js/modules/animations.js", defer: true },
  { type: "classic", src: "/assets/js/modules/textures.js", defer: true },
  { type: "classic", src: "/assets/js/modules/interactions.js", defer: true },
  { type: "classic", src: "/assets/js/modules/customize.js", defer: true },
  { type: "classic", src: "/assets/js/modules/pages.js", defer: true },
  { type: "classic", src: "/assets/js/app.js", defer: true },
];

const SWIPER: ScriptEntry[] = [
  {
    type: "external",
    src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
    defer: true,
  },
  { type: "classic", src: "/assets/js/features/carousel.js", defer: true },
];

const LEAFLET: ScriptEntry[] = [
  {
    type: "external",
    src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
    defer: true,
    crossOrigin: "",
  },
];

export const PAGE_BODY_CLASS: Partial<Record<PortfolioRoute, string>> = {
  blogs: "blog-page",
  "blog-details": "blog-details-page",
};

export const PAGE_EXTRA_SCRIPTS: Record<PortfolioRoute, ScriptEntry[]> = {
  home: [
    { type: "classic", src: "/assets/js/data/experience-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/experience-cms.js", defer: true },
    { type: "classic", src: "/assets/js/features/experience-cards.js", defer: true },
    { type: "classic", src: "/assets/js/data/projects-data.js", defer: true },
    { type: "classic", src: "/assets/js/data/projects-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/home-highlights.js", defer: true },
    { type: "classic", src: "/assets/js/features/highlights-scroll.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-loader.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-data.js", defer: true },
    { type: "classic", src: "/assets/js/data/faqs-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/home-faqs.js", defer: true },
    { type: "classic", src: "/assets/js/data/testimonials-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/testimonials-cms.js", defer: true },
    { type: "classic", src: "/assets/js/features/blog-faq.js", defer: true },
    ...SWIPER,
  ],
  about: [],
  skills: [...SWIPER],
  experience: [
    { type: "classic", src: "/assets/js/data/experience-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/experience-cms.js", defer: true },
    { type: "classic", src: "/assets/js/features/experience-cards.js", defer: true },
  ],
  projects: [
    { type: "classic", src: "/assets/js/managers/index.js", defer: true },
    { type: "classic", src: "/assets/js/features/projects-page.js", defer: true },
    { type: "classic", src: "/assets/js/data/projects-data.js", defer: true },
    { type: "classic", src: "/assets/js/data/projects-loader.js", defer: true },
  ],
  "project-details": [
    { type: "classic", src: "/assets/js/data/projects-data.js", defer: true },
    { type: "classic", src: "/assets/js/data/projects-loader.js", defer: true },
    ...SWIPER,
  ],
  blogs: [
    { type: "classic", src: "/assets/js/managers/index.js", defer: true },
    { type: "classic", src: "/assets/js/features/blogs-page.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-loader.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-data.js", defer: true },
  ],
  "blog-details": [
    { type: "classic", src: "/assets/js/managers/index.js", defer: true },
    { type: "classic", src: "/assets/js/features/blogs-page.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-loader.js", defer: true },
    { type: "classic", src: "/assets/js/data/blogs-data.js", defer: true },
    { type: "classic", src: "/assets/js/features/blog-engagement.js", defer: true },
    { type: "classic", src: "/assets/js/features/blog-article-ui.js", defer: true },
  ],
  testimonials: [
    { type: "classic", src: "/assets/js/managers/index.js", defer: true },
    { type: "classic", src: "/assets/js/data/testimonials-loader.js", defer: true },
    { type: "classic", src: "/assets/js/features/testimonials-cms.js", defer: true },
    { type: "classic", src: "/assets/js/features/testimonials-page.js", defer: true },
  ],
  contact: [...LEAFLET],
};

export function getScriptsForRoute(route: PortfolioRoute): ScriptEntry[] {
  return [...BASE_MODULE, ...BASE_CLASSIC, ...(PAGE_EXTRA_SCRIPTS[route] || [])];
}

export const PAGE_STYLES: Partial<Record<PortfolioRoute, string[]>> = {
  home: ["/assets/css/carousel.css"],
  skills: ["/assets/css/carousel.css"],
  "project-details": [
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
  ],
  blogs: ["/assets/css/blog-pages.css"],
  "blog-details": ["/assets/css/blog-pages.css"],
  contact: [
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  ],
};
