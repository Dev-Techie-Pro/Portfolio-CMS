"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.HOME_FAQS = Portfolio.HOME_FAQS || [];
  let faqsPromise = null;

  function applyFaqs(faqs) {
    Portfolio.HOME_FAQS = Array.isArray(faqs) ? faqs : [];
    Portfolio.__homeFaqsLoaded = true;
  }

  Portfolio.ensureHomeFaqs = function ensureHomeFaqs() {
    if (Portfolio.__homeFaqsLoaded) {
      return Promise.resolve(Portfolio.HOME_FAQS);
    }
    if (!faqsPromise) {
      faqsPromise = fetch("/api/portfolio/faqs", { credentials: "same-origin" })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load FAQs");
          }
          applyFaqs(data.faqs);
          return Portfolio.HOME_FAQS;
        })
        .catch((err) => {
          faqsPromise = null;
          console.error("[faqs-loader]", err);
          throw err;
        });
    }
    return faqsPromise;
  };

  Portfolio.resetHomeFaqs = function resetHomeFaqs() {
    Portfolio.__homeFaqsLoaded = false;
    faqsPromise = null;
    Portfolio.HOME_FAQS = [];
  };
})();
