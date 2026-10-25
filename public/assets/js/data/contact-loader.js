"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.PORTFOLIO_CONTACT = Portfolio.PORTFOLIO_CONTACT || null;
  let contactPromise = null;

  function applyContact(data) {
    Portfolio.PORTFOLIO_CONTACT = data && typeof data === "object" ? data : { contact: {} };
    Portfolio.__portfolioContactLoaded = true;
  }

  Portfolio.ensurePortfolioContact = function ensurePortfolioContact() {
    if (Portfolio.__portfolioContactLoaded && Portfolio.PORTFOLIO_CONTACT) {
      return Promise.resolve(Portfolio.PORTFOLIO_CONTACT);
    }
    if (!contactPromise) {
      contactPromise = fetch("/api/portfolio/contact", { credentials: "same-origin" })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) throw new Error(data.error || "Failed to load contact details");
          applyContact(data);
          return Portfolio.PORTFOLIO_CONTACT;
        })
        .catch((err) => {
          contactPromise = null;
          console.error("[contact-loader]", err);
          throw err;
        });
    }
    return contactPromise;
  };
})();
