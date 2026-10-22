"use client";

import { useEffect } from "react";
import type { PortfolioRoute } from "@/lib/portfolio/script-config";

const SWIPER_ROUTES = new Set<PortfolioRoute>([
  "home",
  "skills",
  "project-details",
  "blogs",
  "blog-details",
]);

const SWIPER_CSS =
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

function ensureStylesheet(id: string, href: string) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

type PublicPageHeadAssetsProps = {
  route: PortfolioRoute;
};

/** Route-scoped third-party CSS (not loaded on /admin). */
export function PublicPageHeadAssets({ route }: PublicPageHeadAssetsProps) {
  useEffect(() => {
    if (SWIPER_ROUTES.has(route)) {
      ensureStylesheet("pa-public-swiper-css", SWIPER_CSS);
    }
    if (route === "contact") {
      ensureStylesheet("pa-public-leaflet-css", LEAFLET_CSS);
    }
  }, [route]);

  return null;
}
