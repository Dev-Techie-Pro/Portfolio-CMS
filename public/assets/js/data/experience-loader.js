"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.EXPERIENCE = Portfolio.EXPERIENCE || [];
  let experiencePromise = null;

  function applyExperience(entries) {
    Portfolio.EXPERIENCE = Array.isArray(entries) ? entries : [];
    Portfolio.__experienceLoaded = true;
  }

  Portfolio.ensureExperience = function ensureExperience() {
    if (Portfolio.__experienceLoaded) {
      return Promise.resolve(Portfolio.EXPERIENCE);
    }
    if (!experiencePromise) {
      experiencePromise = fetch("/api/portfolio/experience", {
        credentials: "same-origin",
      })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load experience");
          }
          applyExperience(data.experience);
          return Portfolio.EXPERIENCE;
        })
        .catch((err) => {
          experiencePromise = null;
          console.error("[experience-loader]", err);
          throw err;
        });
    }
    return experiencePromise;
  };

  Portfolio.resetExperience = function resetExperience() {
    Portfolio.__experienceLoaded = false;
    experiencePromise = null;
    Portfolio.EXPERIENCE = [];
  };
})();
