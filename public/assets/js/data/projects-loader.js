"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const staticProjects = Portfolio.PROJECTS || {};
  let catalogPromise = null;

  function applyCatalog(data) {
    const cms = data && data.projects;
    if (cms && typeof cms === "object" && Object.keys(cms).length > 0) {
      Portfolio.PROJECTS = cms;
      Portfolio.PROJECT_SOURCE = data.source || "cms";
    } else {
      Portfolio.PROJECTS = staticProjects;
      Portfolio.PROJECT_SOURCE = "static-fallback";
    }
    Portfolio.__projectCatalogLoaded = true;
  }

  Portfolio.ensureProjectCatalog = function ensureProjectCatalog() {
    if (Portfolio.__projectCatalogLoaded) {
      return Promise.resolve(Portfolio.PROJECTS);
    }
    if (!catalogPromise) {
      catalogPromise = fetch("/api/portfolio/projects", { credentials: "same-origin" })
        .then((res) => res.json().catch(() => ({})))
        .then((data) => {
          applyCatalog(data);
          return Portfolio.PROJECTS;
        })
        .catch((err) => {
          catalogPromise = null;
          Portfolio.PROJECTS = staticProjects;
          Portfolio.PROJECT_SOURCE = "static-fallback";
          Portfolio.__projectCatalogLoaded = true;
          console.error("[projects-loader]", err);
          return Portfolio.PROJECTS;
        });
    }
    return catalogPromise;
  };

  Portfolio.resetProjectCatalog = function resetProjectCatalog() {
    Portfolio.__projectCatalogLoaded = false;
    catalogPromise = null;
    Portfolio.PROJECTS = staticProjects;
  };

  Portfolio.ensureProjectCatalog();
})();
