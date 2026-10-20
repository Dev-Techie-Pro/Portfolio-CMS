"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.BLOGS_FAQS = (function () {
    const { $$: queryAll } = window.Portfolio.UTILS;

    function setFaqItemState(item, open) {
      const head = item.querySelector(".faq-item-head");
      const bodyId = head && head.getAttribute("aria-controls");
      const body = bodyId ? document.getElementById(bodyId) : null;

      item.classList.toggle("is-open", open);
      if (head) head.setAttribute("aria-expanded", String(open));
      if (body) body.classList.toggle("pf-collapsed", !open);
    }

    function bindFaqAccordion(section) {
      const items = queryAll(".faq-item", section);
      if (!items.length) return;

      items.forEach((item) => {
        const head = item.querySelector(".faq-item-head");
        if (!head) return;

        head.addEventListener("click", () => {
          const isExpanded = head.getAttribute("aria-expanded") === "true";

          items.forEach((other) => setFaqItemState(other, false));

          if (!isExpanded) setFaqItemState(item, true);
        });
      });
    }

    function init() {
      const faqs = document.getElementById("faqs");
      if (!faqs) return;
      if (document.getElementById("homeFaqAccordion")) return;
      bindFaqAccordion(faqs);
    }

    return { init };
  })()),
  (function () {
    const run = () => window.Portfolio.BLOGS_FAQS.init();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
  })());
