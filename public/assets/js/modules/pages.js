"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.PAGES = (function () {
    const SELECTORS = window.Portfolio.ELEMENTS?.SELECTORS || {};

    function initByRoute() {
      const page = window.Portfolio.UTILS.getActivePage();
      const interactions = window.Portfolio.INTERACTIONS;

      switch (page) {
        case "home":
          interactions.initIndexPage();
          break;
        case "about":
          interactions.initAboutPage();
          break;
        case "skills":
          interactions.initSkillsPage();
          break;
        case "projects":
          interactions.initProjectsPage();
          break;
        case "testimonials":
          interactions.initTestimonialsPage();
          break;
        case "contact":
          break;
        case "experience":
          interactions.initExperiencePage();
          break;
        default:
          if (document.querySelector(SELECTORS.PROJECTS_HERO || ".projects-hero")) {
            interactions.initProjectsPage();
          }
          if (document.querySelector(SELECTORS.ABOUT_HERO || ".about-hero")) {
            interactions.initAboutPage();
          }
          if (document.querySelector(SELECTORS.TESTI_HERO || ".testi-hero")) {
            interactions.initTestimonialsPage();
          }
          if (document.querySelector(SELECTORS.SKILLS_HERO || ".skills-hero")) {
            interactions.initSkillsPage();
          }
          if (document.querySelector(SELECTORS.EXP_HERO || ".exp-hero")) {
            interactions.initExperiencePage();
          }
      }
    }

    return { initByRoute };
  })()));
