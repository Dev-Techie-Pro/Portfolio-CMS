"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function telHref(value) {
    const raw = String(value || "").replace(/[^\d+]/g, "");
    return raw ? `tel:${raw}` : "";
  }

  function waHref(value) {
    const d = digitsOnly(value);
    return d ? `https://wa.me/${d}` : "";
  }

  function mailtoHref(email) {
    const e = String(email || "").trim();
    return e ? `mailto:${e}` : "";
  }

  function fieldValue(contact, field) {
    return String(contact?.[field] || "").trim();
  }

  function applyToElement(el, contact) {
    const field = el.getAttribute("data-cms-profile-contact");
    if (!field) return;
    const value = fieldValue(contact, field);
    if (!value) return;

    const mode = el.getAttribute("data-cms-profile-mode") || "auto";
    const tag = el.tagName;

    if (field === "email") {
      if (tag === "A" || mode === "href") {
        el.setAttribute("href", mailtoHref(value));
      }
      if (mode !== "href-only") el.textContent = value;
      return;
    }

    if (field === "phone") {
      if (tag === "A" || mode === "href" || mode === "tel") {
        el.setAttribute("href", telHref(value));
      }
      if (mode !== "href-only") el.textContent = value;
      return;
    }

    if (field === "whatsapp") {
      const display = value;
      if (tag === "A" || mode === "href" || mode === "wa") {
        el.setAttribute("href", waHref(value));
        if (mode === "wa" || tag === "A") {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        }
      }
      if (mode !== "href-only") el.textContent = display;
      return;
    }

    if (field === "location" || field === "website") {
      if (tag === "A" && field === "website") {
        const href = value.startsWith("http") ? value : `https://${value.replace(/^\/+/, "")}`;
        el.setAttribute("href", href);
      }
      if (mode !== "href-only") el.textContent = value;
    }
  }

  function hydrateLegacyFooters(contact) {
    document.querySelectorAll(".footer-contact-item").forEach((item) => {
      const icon = item.querySelector(".footer-contact-icon [data-icon], .footer-contact-icon .icon");
      const iconName = icon?.getAttribute("data-icon") || "";
      const link = item.querySelector("a[href^='mailto:']");
      const staticSpan = item.querySelector(".contact-static");
      if (link && contact.email) {
        link.href = mailtoHref(contact.email);
        link.textContent = contact.email;
      }
      if (staticSpan && contact.location && /location|pin/i.test(iconName)) {
        staticSpan.textContent = contact.location;
      }
    });
  }

  function iconNameInRow(row) {
    const icon = row?.querySelector?.("[data-icon]");
    return String(icon?.getAttribute("data-icon") || "").toLowerCase();
  }

  function hydrateContactDetailRows(contact) {
    const email = fieldValue(contact, "email");
    const phone = fieldValue(contact, "phone");
    const whatsapp = fieldValue(contact, "whatsapp");
    const location = fieldValue(contact, "location");

    document.querySelectorAll(".contact-detail, .contact-details > .contact-detail").forEach((row) => {
      const textWrap = row.querySelector(".contact-detail-text");
      if (!textWrap || textWrap.hasAttribute("data-cms-profile-contact")) return;
      const icon = iconNameInRow(row);
      if (icon.includes("envelope") && email) {
        let link = textWrap.querySelector("a[href^='mailto:']");
        if (!link) {
          link = document.createElement("a");
          textWrap.textContent = "";
          textWrap.appendChild(link);
        }
        link.href = mailtoHref(email);
        link.textContent = email;
      } else if (icon.includes("phone") && (phone || whatsapp)) {
        const display = phone || whatsapp;
        const tel = telHref(display);
        const span = textWrap.querySelector("span");
        const link = textWrap.querySelector("a[href^='tel:']");
        if (link) {
          link.href = tel;
          if (!link.querySelector(".icon")) link.textContent = display;
        } else if (span) {
          span.textContent = display;
        } else {
          textWrap.textContent = display;
        }
      } else if (icon.includes("location") && location) {
        const span = textWrap.querySelector("span") || textWrap;
        if (span.tagName === "SPAN" || span === textWrap) span.textContent = location;
      }
    });

    document.querySelectorAll(".faq-contact-phone").forEach((a) => {
      if (a.hasAttribute("data-cms-profile-contact")) return;
      const display = phone || whatsapp;
      if (!display) return;
      a.href = telHref(display);
      a.textContent = display;
    });
  }

  function hydrateLegacyContactSection(contact) {
    const email = fieldValue(contact, "email");
    const phone = fieldValue(contact, "phone");
    const whatsapp = fieldValue(contact, "whatsapp");
    const location = fieldValue(contact, "location");

    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      if (a.hasAttribute("data-cms-profile-contact")) return;
      if (email && a.closest("footer, #contact, .ch-info-grid, .ci-cards, .faq-contact-card")) {
        a.href = mailtoHref(email);
        if (!a.querySelector(".icon")) a.textContent = email;
      }
    });

    document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
      if (a.hasAttribute("data-cms-profile-contact")) return;
      if (!phone) return;
      if (a.closest("footer, #contact, .ch-info-grid, .ci-cards, .faq-contact-card")) {
        a.href = telHref(phone);
        if (!a.querySelector(".icon")) a.textContent = phone;
      }
    });

    document.querySelectorAll(".contact-static").forEach((span) => {
      if (span.hasAttribute("data-cms-profile-contact")) return;
      if (location) span.textContent = location;
    });

    document.querySelectorAll(".ci-card-value, .ch-info-card span").forEach((el) => {
      if (el.hasAttribute("data-cms-profile-contact")) return;
      const text = el.textContent || "";
      if (email && text.includes("@")) el.textContent = email;
      else if (phone && /\+?\d[\d\s-]{8,}/.test(text) && !whatsapp) el.textContent = phone;
    });

    const cmapCity = document.querySelector(".cmap-city");
    if (cmapCity && location) cmapCity.textContent = location;

    document.querySelectorAll(".lf-marker-label").forEach((el) => {
      if (el.hasAttribute("data-cms-profile-contact")) return;
      if (location) {
        const short = location.split(",")[0]?.trim() || location;
        el.textContent = short;
      }
    });

    hydrateContactDetailRows(contact);
  }

  async function hydrateAll() {
    let contact = {};
    try {
      const payload = await Portfolio.ensurePortfolioContact();
      contact = payload?.contact || {};
    } catch (err) {
      console.error("[contact-cms] load failed", err);
      return;
    }

    document.querySelectorAll("[data-cms-profile-contact]").forEach((el) => {
      applyToElement(el, contact);
    });
    hydrateLegacyFooters(contact);
    hydrateLegacyContactSection(contact);
    document.body.setAttribute("data-cms-contact-hydrated", "true");
  }

  Portfolio.CONTACT_CMS = { hydrateAll };
})();
