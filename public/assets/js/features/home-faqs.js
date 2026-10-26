"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatAnswerHtml(answer) {
    return escapeHtml(answer).replace(/\n/g, "<br />");
  }

  function renderFaqItem(faq, index, openFirst) {
    const id = faq.id != null ? String(faq.id) : String(index + 1);
    const qId = `faq-q-${id}`;
    const aId = `faq-a-${id}`;
    const isOpen = openFirst && index === 0;
    const bodyClass = isOpen ? "faq-item-body" : "faq-item-body pf-collapsed";

    return `
      <div class="faq-item reveal${isOpen ? " is-open" : ""}">
        <button
          class="faq-item-head"
          type="button"
          id="${qId}"
          aria-expanded="${isOpen ? "true" : "false"}"
          aria-controls="${aId}"
        >
          <span class="faq-question">${escapeHtml(faq.question)}</span>
          <span class="faq-toggle" aria-hidden="true">
            <span class="icon faq-icon-plus" data-icon="ri-add-line"></span>
            <span class="icon faq-icon-minus" data-icon="ri-subtract-line"></span>
          </span>
        </button>
        <div
          class="${bodyClass}"
          id="${aId}"
          role="region"
          aria-labelledby="${qId}"
        >
          <p>${formatAnswerHtml(faq.answer)}</p>
        </div>
      </div>`;
  }

  function renderHomeFaqs() {
    const accordion = document.getElementById("homeFaqAccordion");
    if (!accordion) return;

    const faqs = Portfolio.HOME_FAQS || [];
    if (!faqs.length) {
      accordion.innerHTML =
        '<p class="faq-load-empty">No FAQs published yet. Check back soon.</p>';
      return;
    }

    accordion.innerHTML = faqs
      .map((faq, index) => renderFaqItem(faq, index, true))
      .join("");

    Portfolio.ICONS?.hydrateAll?.(accordion);
    if (Portfolio.ANIMATIONS?.initScrollReveal) {
      Portfolio.ANIMATIONS.initScrollReveal();
    }
    Portfolio.BLOGS_FAQS?.init?.();
  }

  function init() {
    const section = document.getElementById("faqs");
    if (!section || !document.getElementById("homeFaqAccordion")) return;

    Portfolio.ensureHomeFaqs()
      .then(() => renderHomeFaqs())
      .catch(() => {
        const accordion = document.getElementById("homeFaqAccordion");
        if (accordion) {
          accordion.innerHTML =
            '<p class="faq-load-error">Could not load FAQs. Please try again later.</p>';
        }
      });
  }

  Portfolio.HOME_FAQS_PAGE = { init };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
