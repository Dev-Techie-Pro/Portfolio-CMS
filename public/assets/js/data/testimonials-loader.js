"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.TESTIMONIALS = Portfolio.TESTIMONIALS || [];
  let testimonialsPromise = null;

  function applyTestimonials(testimonials) {
    Portfolio.TESTIMONIALS = Array.isArray(testimonials) ? testimonials : [];
    Portfolio.__testimonialsLoaded = true;
  }

  Portfolio.ensureTestimonials = function ensureTestimonials() {
    if (Portfolio.__testimonialsLoaded) {
      return Promise.resolve(Portfolio.TESTIMONIALS);
    }
    if (!testimonialsPromise) {
      testimonialsPromise = fetch("/api/portfolio/testimonials", {
        credentials: "same-origin",
      })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load testimonials");
          }
          applyTestimonials(data.testimonials);
          return Portfolio.TESTIMONIALS;
        })
        .catch((err) => {
          testimonialsPromise = null;
          console.error("[testimonials-loader]", err);
          throw err;
        });
    }
    return testimonialsPromise;
  };

  Portfolio.resetTestimonials = function resetTestimonials() {
    Portfolio.__testimonialsLoaded = false;
    testimonialsPromise = null;
    Portfolio.TESTIMONIALS = [];
  };
})();
