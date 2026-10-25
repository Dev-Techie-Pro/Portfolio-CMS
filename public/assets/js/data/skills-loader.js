"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.PORTFOLIO_SKILLS = Portfolio.PORTFOLIO_SKILLS || null;
  let skillsPromise = null;

  function applySkills(data) {
    Portfolio.PORTFOLIO_SKILLS = data && typeof data === "object" ? data : { categories: [], tickers: {} };
    Portfolio.__portfolioSkillsLoaded = true;
  }

  Portfolio.ensurePortfolioSkills = function ensurePortfolioSkills() {
    if (Portfolio.__portfolioSkillsLoaded && Portfolio.PORTFOLIO_SKILLS) {
      return Promise.resolve(Portfolio.PORTFOLIO_SKILLS);
    }
    if (!skillsPromise) {
      skillsPromise = fetch("/api/portfolio/skills", { credentials: "same-origin" })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load skills");
          }
          applySkills(data);
          return Portfolio.PORTFOLIO_SKILLS;
        })
        .catch((err) => {
          skillsPromise = null;
          console.error("[skills-loader]", err);
          throw err;
        });
    }
    return skillsPromise;
  };

  Portfolio.resetPortfolioSkills = function resetPortfolioSkills() {
    Portfolio.__portfolioSkillsLoaded = false;
    Portfolio.PORTFOLIO_SKILLS = null;
    skillsPromise = null;
  };
})();
