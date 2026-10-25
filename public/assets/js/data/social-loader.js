"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.PORTFOLIO_SOCIAL = Portfolio.PORTFOLIO_SOCIAL || null;
  let socialPromise = null;

  function applySocial(data) {
    Portfolio.PORTFOLIO_SOCIAL = data && typeof data === "object" ? data : { variants: {} };
    Portfolio.__portfolioSocialLoaded = true;
  }

  Portfolio.ensurePortfolioSocial = function ensurePortfolioSocial() {
    if (Portfolio.__portfolioSocialLoaded && Portfolio.PORTFOLIO_SOCIAL) {
      return Promise.resolve(Portfolio.PORTFOLIO_SOCIAL);
    }
    if (!socialPromise) {
      socialPromise = fetch("/api/portfolio/social", { credentials: "same-origin" })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load social links");
          }
          applySocial(data);
          return Portfolio.PORTFOLIO_SOCIAL;
        })
        .catch((err) => {
          socialPromise = null;
          console.error("[social-loader]", err);
          throw err;
        });
    }
    return socialPromise;
  };

  Portfolio.resetPortfolioSocial = function resetPortfolioSocial() {
    Portfolio.__portfolioSocialLoaded = false;
    Portfolio.PORTFOLIO_SOCIAL = null;
    socialPromise = null;
  };
})();
