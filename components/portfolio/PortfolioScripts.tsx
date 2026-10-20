"use client";

import { useEffect, useRef } from "react";
import type { PortfolioRoute } from "@/lib/portfolio/script-config";
import { getScriptsForRoute } from "@/lib/portfolio/script-config";
import { initPortfolioPage } from "@/lib/portfolio/init-portfolio";

type PortfolioScriptsProps = {
  route: PortfolioRoute;
  onScriptsReady?: () => void;
};

let scriptsBootstrapped = false;

const scriptLoadPromises = new Map<string, Promise<void>>();

function loadClassicScript(src: string): Promise<void> {
  const key = `classic:${src}`;
  const existing = scriptLoadPromises.get(key);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const existingEl = document.querySelector(
      `script[data-portfolio-src="${src}"]`,
    ) as HTMLScriptElement | null;

    if (existingEl) {
      if (existingEl.getAttribute("data-portfolio-loaded") === "true") {
        resolve();
        return;
      }
      existingEl.addEventListener(
        "load",
        () => {
          existingEl.setAttribute("data-portfolio-loaded", "true");
          resolve();
        },
        { once: true },
      );
      existingEl.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true },
      );
      return;
    }

    const el = document.createElement("script");
    el.src = src;
    el.setAttribute("data-portfolio-src", src);
    // Do not set defer on dynamic inserts — load order is already serialized
    // by awaiting each script, and defer can run scripts before prior ones finish.
    el.onload = () => {
      el.setAttribute("data-portfolio-loaded", "true");
      resolve();
    };
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });

  scriptLoadPromises.set(key, promise);
  return promise;
}

function loadModuleScript(src: string): Promise<void> {
  const key = `module:${src}`;
  const existing = scriptLoadPromises.get(key);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const existingEl = document.querySelector(
      `script[data-portfolio-module="${src}"]`,
    ) as HTMLScriptElement | null;

    if (existingEl) {
      if (existingEl.getAttribute("data-portfolio-loaded") === "true") {
        resolve();
        return;
      }
      existingEl.addEventListener(
        "load",
        () => {
          existingEl.setAttribute("data-portfolio-loaded", "true");
          resolve();
        },
        { once: true },
      );
      existingEl.addEventListener(
        "error",
        () => reject(new Error(`Failed to load module ${src}`)),
        { once: true },
      );
      return;
    }

    const el = document.createElement("script");
    el.type = "module";
    el.src = src;
    el.setAttribute("data-portfolio-module", src);
    el.onload = () => {
      el.setAttribute("data-portfolio-loaded", "true");
      resolve();
    };
    el.onerror = () => reject(new Error(`Failed to load module ${src}`));
    document.body.appendChild(el);
  });

  scriptLoadPromises.set(key, promise);
  return promise;
}

let loadedScriptKeys = new Set<string>();

function scriptKey(entry: { type: string; src: string }) {
  return `${entry.type}:${entry.src}`;
}

let bootstrapQueue: Promise<void> = Promise.resolve();

function bootstrapScripts(route: PortfolioRoute): Promise<void> {
  bootstrapQueue = bootstrapQueue.then(async () => {
    const scripts = getScriptsForRoute(route).filter(
      (entry) => !loadedScriptKeys.has(scriptKey(entry)),
    );

    if (!scripts.length) return;

    for (const entry of scripts) {
      try {
        if (entry.type === "module") {
          await loadModuleScript(entry.src);
        } else {
          await loadClassicScript(entry.src);
        }
        loadedScriptKeys.add(scriptKey(entry));
      } catch (err) {
        console.error("[PortfolioScripts]", err);
      }
    }
    scriptsBootstrapped = true;
  });

  return bootstrapQueue;
}

export function arePortfolioScriptsReady() {
  return scriptsBootstrapped;
}

export function waitForPortfolioScripts(route: PortfolioRoute) {
  return bootstrapScripts(route);
}

function initContactLeafletMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L = (window as any).L;
  const mapEl = document.getElementById("leaflet-map");
  if (!L || !mapEl || mapEl.dataset.leafletReady === "true") return;

  const LAT = 33.6007;
  const LNG = 73.0679;
  const map = L.map("leaflet-map", {
    center: [LAT, LNG],
    zoom: 13,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
  });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);
  const svgIcon = L.divIcon({
    className: "",
    html: `
      <div class="lf-marker-wrap">
        <div class="lf-marker-pulse"></div>
        <div class="lf-marker-dot"></div>
        <div class="lf-marker-label">Rawalpindi, PK</div>
      </div>`,
    iconSize: [160, 60],
    iconAnchor: [80, 16],
    popupAnchor: [0, -20],
  });
  const marker = L.marker([LAT, LNG], { icon: svgIcon }).addTo(map);
  marker.bindPopup(`
    <div class="lf-popup">
      <div class="lf-popup-name">M Sohaib Ishaque</div>
      <div class="lf-popup-role">Full Stack Web Developer</div>
      <div class="lf-popup-loc">
        <span class="icon" data-icon="siLocationPin"></span>
        Rawalpindi, Punjab, Pakistan
      </div>
      <div class="lf-popup-avail">&#x25CF; Available for remote &amp; on-site work</div>
    </div>
  `);
  marker.openPopup();
  if (window.innerWidth < 768) map.dragging.disable();
  mapEl.dataset.leafletReady = "true";
}

/**
 * Loads the same script bundle each static HTML page used.
 * Scripts are loaded once per session and tagged to avoid duplicates.
 */
export function PortfolioScripts({ route, onScriptsReady }: PortfolioScriptsProps) {
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    bootstrapScripts(route).then(() => {
      if (route === "contact") {
        initContactLeafletMap();
      }
      onScriptsReady?.();
    });
  }, [route, onScriptsReady]);

  return null;
}
