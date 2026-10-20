"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PAGE_BODY_CLASS, type PortfolioRoute } from "@/lib/portfolio/script-config";
import { PortfolioScripts, waitForPortfolioScripts } from "./PortfolioScripts";
import { initPortfolioPage, resetPortfolioForNavigation } from "@/lib/portfolio/init-portfolio";

type PortfolioPageProps = {
  route: PortfolioRoute;
  children: React.ReactNode;
};

/**
 * Wraps each route's page content and re-initializes the legacy Portfolio.*
 * runtime after client-side Next.js navigations (mirrors full page reload behavior).
 */
export function PortfolioPage({ route, children }: PortfolioPageProps) {
  const pathname = usePathname();

  useEffect(() => {
    const bodyClass = PAGE_BODY_CLASS[route];
    if (bodyClass) {
      document.body.classList.add(...bodyClass.split(/\s+/).filter(Boolean));
    }
    return () => {
      if (bodyClass) {
        document.body.classList.remove(...bodyClass.split(/\s+/).filter(Boolean));
      }
    };
  }, [route]);

  // Single init path only — do not also call from PortfolioScripts onScriptsReady
  // (that previously bound contact submit twice → duplicate DB inserts).
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await waitForPortfolioScripts(route);
      if (cancelled) return;
      resetPortfolioForNavigation();
      initPortfolioPage(route);
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, route]);

  return (
    <>
      {children}
      <PortfolioScripts route={route} />
    </>
  );
}
