"use strict";

import { ICONS } from "../data/icon-registry.js";

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
};

const CSS_CLASSES = {
  // Reveal / animation
  REVEAL: "reveal",
  REVEAL_LEFT: "reveal-left",
  REVEAL_RIGHT: "reveal-right",
  VISIBLE: "visible",

  // Skeleton loading
  SKEL_WRAP: "si-skel-wrap",
  SKEL: "si-skel",
  SKEL_CIRCLE: "si-skel-circle",
  SKEL_IMG: "si-skel-img",
  SKEL_LOADED: "si-skel-loaded",

  // State / visibility
  HIDDEN: "hidden",
  IS_HIDDEN: "is-hidden",
  IS_ACTIVE: "is-active",
  IS_OPEN: "is-open",
  ACTIVE: "active",
  SCROLLED: "scrolled",
  ON: "on",
  SHOW: "show",
  OPEN: "open",

  // Experience cards
  IS_EXP_ACTIVE: "is-exp-active",
  IS_EXP_PINNED: "is-exp-pinned",
  IS_EXP_SWITCHING: "is-exp-switching",
  JS_EXP_HSCROLL: "js-exp-hscroll",

  // Projects / filters
  PF_COLLAPSED: "pf-collapsed",
  PF_SIDEBAR_OPEN: "pf-sidebar-open",
  IS_SPINNING: "is-spinning",

  // Contact form
  ACCENT_TAG: "accent-tag",
  CF_STEP: "cf-step",
  CF_PILL: "cf-pill",
  IS_INVALID: "is-invalid",
  IS_FILLED: "is-filled",

  // Appearance / textures
  THEME_LIGHT: "theme-light",
  SI_TEXTURES_OFF: "si-textures-off",
  SI_SYMBOLS_OFF: "si-symbols-off",
  SI_ANIMATIONS_OFF: "si-animations-off",
  SI_TEXTURE_LAYER: "si-texture-layer",
  SI_TEXTURE_CANVAS: "si-texture-canvas",

  // Components
  COMPONENT_READY: "componentReady",
};

const SELECTORS = {
  // Global
  PRELOADER: "#preloader",
  CURSOR: ".cursor",
  CURSOR_RING: ".cursor-ring",
  BACK_TOP: ".back-top",
  BACK_TOP_PROGRESS_FILL: ".back-top-progress-fill",
  NAVBAR: ".navbar",
  NAV_LINK: ".nav-link",
  MOBILE_NAV_LINK: ".mobile-nav-link",
  MOBILE_MENU: ".mobile-menu",
  HAMBURGER: ".hamburger",
  MOBILE_NAV_WRAPPER: ".mobile-nav-wrapper",
  MOBILE_NAV_ROOT: "[data-mobile-nav-root], #mobile-nav-root",
  APPEARANCE_PANEL: "#paCustomPanel",
  APPEARANCE_TOAST: "#paCustomToastWrap",
  APPEARANCE_OVERLAY: "#paPanelOverlay",
  DATA_ICON: "[data-icon]",

  // Hero sections
  HERO_SUB: ".hero-sub",
  HERO_HEADLINE: ".hero-headline",
  GLITCH_WORD: ".glitch-word",
  ABOUT_HERO: ".about-hero",
  SKILLS_HERO: ".skills-hero",
  PROJECTS_HERO: ".projects-hero",
  TESTI_HERO: ".testi-hero",
  CONTACT_HERO: ".ch-hero",
  EXP_HERO: ".exp-hero",
  PD_HERO: ".pd-hero, .project-details-hero",

  // Reveal / counters / skills
  REVEAL_ALL: ".reveal, .reveal-left, .reveal-right",
  SECTION_NUM: ".section-num",
  SKILL_BAR_FILL: ".skill-cat-bar-fill, .skill-bar-fill",
  METRICS: "#metrics",
  ABOUT_MINI_STATS: ".about-mini-stats",
  EXP_HIGHLIGHTS_GRID: ".exp-highlights-grid",
  SKILLS_SECTION: "#skills",

  // Cards / tilt
  TILT_CARDS: ".ph-card, .pg-card",
  CURSOR_HOVER_TARGETS:
    "a, button, .ph-card, .value-card, .skill-cat-box, .other-skill-card, .tool-item, .pg-card, .blog-card, .ci-card, .belief-card, .edu-card, .cert-item, .testi-card",

  // Contact
  CONTACT_FORM: "#contactForm",
  FORM_SUCCESS: ".form-success",
  CF_PILLS: ".cf-pill",

  // Testimonials
  TESTI_CARDS_GRID: ".testi-cards-grid",
  HERO_TESTI: ".hero-testi",
  TH_ORBIT: "#thOrbit",
  HT_TESTI_CARD: ".ht-testi-card",

  // Projects
  PROJECTS_GRID: "#projectsGrid",
  PG_CARD: ".pg-card",

  // Blogs
  BLOGS_GRID: "#blogsGrid",
  BLOG_RECENT_LIST: "#blogRecentList",
  FAQS: "#faqs",
  FAQ_ITEM: ".faq-item",
  FAQ_ITEM_HEAD: ".faq-item-head",

  // Experience
  EXP_ROLE_DESC: ".exp-role-desc",

  // CTA
  CTA_SPHERE_CANVAS: "#ctaSphereCanvas",

  // Swiper
  TESTIMONIALS_GRID: "#testimonials .testimonials-grid",
};

const SKELETON = {
  READY_ATTR: "data-skel-ready",
  FADE_MS: 350,
  MIN_DISPLAY_MS: 280,
  OBSERVER_ROOT: "documentElement",
};

const CONSTANTS = (function () {
  function getAccent() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#22c55e"
    );
  }

  function getAccentRgba() {
    const parsed = (function (hex) {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
    })(getAccent());
    return parsed ? `rgba(${parsed.r},${parsed.g},${parsed.b},` : "rgba(163,255,18,";
  }

  return {
    ICONS,
    BREAKPOINTS,
    CSS_CLASSES,
    SELECTORS,
    SKELETON,
    DESIGN: {
      get accent() {
        return getAccent();
      },
      get accentRgba() {
        return getAccentRgba();
      },
      bg: "#080808",
      bgCard: "#111111",
      navH: 70,
      transition: 0.35,
    },
    ANIM: {
      preloaderDelay: 1500,
      counterDuration: 1800,
      counterStep: 16,
      typewriterSpeed: 30,
      formSubmitDelay: 1800,
      formSuccessDur: 4500,
      glitchInterval: 40,
      rippleDuration: 700,
      burstDuration: 650,
      glowDuration: 500,
    },
    CANVAS: {
      hero: {
        countDesktop: 70,
        countMobile: 35,
        linkDist: 148,
        maxAlpha: 0.2,
        speedRange: [0.13, 0.3],
        radiusRange: [0.7, 2],
      },
      footer: {
        countDesktop: 44,
        countMobile: 22,
        linkDist: 100,
        maxAlpha: 0.09,
        speedRange: [0.05, 0.13],
        radiusRange: [0.55, 1.05],
      },
      experience: { countDesktop: 55, countMobile: 28, linkDist: 140 },
    },
    FILTER_CATS: ["all", "wordpress", "web", "ecommerce", "desktop", "tools"],
    PAGE_ROUTES: {
      index: "home",
      "": "home",
      about: "about",
      skills: "skills",
      projects: "projects",
      testimonials: "testimonials",
      contact: "contact",
      experience: "experience",
      "project-details": "project-details",
      blogs: "blogs",
      "blog-details": "blog-details",
    },
    SYMS: {
      home: [
        "C#", ".NET Core", "Angular", "TypeScript", "WordPress", "SQL Server",
        "Entity Framework", "REST API", "JWT", "</>", "{}", "()", "[];", "=>",
        "::", "&&", "||", "!==", "===", "git push", "npm run dev", "FULL STACK",
        "WEB DEV", "@Component", "DbContext", "LINQ", "async/await", "HTML5",
        "CSS3", "Bootstrap", "PHP", "MySQL", "◆", "▸", "⬡", "◇", "△", "▷", "⬢", "⬟",
      ],
      about: [
        '{ name: "Sohaib" }', 'role: "Full Stack Dev"', 'location: "Rawalpindi"',
        'experience: "3+ yrs"', "Cert: WordPress", "Cert: Freelancing",
        "Cert: Graphic Design", "Continuous Learning", "User-First",
        "Scalable Solutions", "May 2021", "May 2022", "Dec 2023", "3+ Companies",
        "20+ Projects", "10+ Clients", "Growth", "Journey", "{ passion: true }",
        "self.improve()", "new Skills()", "◆", "▸", "△", "◇", "○", "□",
      ],
      skills: [
        "HTML5 · 95%", "CSS3 · 90%", "Angular · 92%", "TypeScript · 88%",
        "React · 85%", "Bootstrap · 90%", ".NET Core · 92%", "C# · 88%",
        "Node.js · 90%", "PHP · 80%", "ASP.NET MVC", "RESTful APIs",
        "SQL Server · 88%", "MySQL · 85%", "Entity Framework", "Firebase",
        "LINQ", "DbContext", "WordPress · 93%", "Elementor Pro", "WP Bakery",
        "Custom Theme", "Custom Plugin", "Shortcodes", "ACF", "WPF", "WinForms",
        "Desktop App", "Unit Testing", "Frontend", "Backend", "Database", "CMS",
        "DevOps", "◆", "▸", "⬡", "□", "○", "△",
      ],
      projects: [
        "Web Application", "REST API", "SPA", "MVC", "Dashboard", ".NET Desktop",
        "CMS Site", "E-Commerce", "WPF App", "Al Tahaluf", "Simplicity Academy",
        "Gossips App", "Online Quiz", "QRMF", "Angular + .NET", "git clone",
        "npm start", "dotnet run", "wp activate", "design", "develop", "test",
        "deploy", "ship it!", "All Projects", "WordPress", "E-Commerce", "Tools",
        "v1.0.0", "v2.0.0", "main branch", "feature/new", "npm install",
        "dotnet restore", "docker build .", "useEffect()", "HttpClient",
        "WP_Query()", "CRUD", "◆", "▸", "⬡", "◇", "△", "▷",
      ],
      testimonials: [
        "★★★★★", "5 / 5", "100% Satisfied", "⭐⭐⭐⭐⭐", '"Outstanding!"',
        '"Highly Professional"', '"Flawless"', '"Delivered on Time"',
        '"Amazing Experience"', '"Strong Technical"', '"Exceeded Expectations"',
        "Excellent!", "Reliable", "Trusted", "Recommended", "Quality Work",
        "On Schedule", "Client-First", "Angular/.NET ✓", "Fast & Responsive",
        "Zero Issues", "Communication ✓", "Problem Solving ✓", "Team Player",
        "{ rating: 5 }", "review.approved", "stars: [5,5,5]", "Great Work!",
        "Will hire again", "Top Developer", "◆", "▸", "△", "○", "◇", "□",
      ],
      contact: [
        "Hello!", "Hi There!", "Hire Me", "Hire Me!", "Say Hi!",
        "Available for Work", "Open to Freelance", "Full-Time / Part-Time",
        "send()", "submit()", "validate()", "response(200)",
        "Rawalpindi, Pakistan", "+92 303-8464315", "+92 317-9227811",
        "Connect", "Collaborate", "Build Together", "New Project?",
        '{ status: "available" }', "ping(me)", "reach.out()",
        "◆", "▸", "△", "○", "◇", "□",
      ],
      "project-details": [
        "React", "Chart.js", "Node.js", "MongoDB", "Dashboard", "E-Commerce",
        "Analytics", "Real-Time", "KPI", "Metrics", "Wireframe", "Prototype",
        "MVP", "Iterate", "Deploy", "git branch feature/", "git merge main",
        "npm test", "docker build .", "CI/CD", "GitHub Actions",
        "Performance: 98", "SEO: 100", "LCP < 1.2s", "A11y: ✓", "Clean Code",
        "DRY", "SOLID", "MVC Pattern", "useEffect()", "useState()",
        "async/await", "fetch(API)", "Chart.line()", "aggregate()", "Schema",
        "mongoose", "◆", "▸", "⬡", "◇", "△", "▷",
      ],
    },
    FOOTER_SYMS: [
      "@Component({ selector:", "providers: [AppService]", "[HttpPost] public async",
      "Task<IActionResult>", "ModelState.IsValid", "services.AddScoped<>()",
      "app.UseRouting();", "builder.Build()", "await Task.Run()", "IEnumerable<T>",
      "entity.SaveChanges()", "new DbContext(options)", ".AsNoTracking()",
      "var result = await ctx.", 'add_filter("init",', "wp_enqueue_script(",
      "register_taxonomy(", "npm run build", 'git commit -m "feat:"',
      "docker-compose up -d", "SELECT TOP 10 *", "INNER JOIN roles ON id",
      ".subscribe((res) =>", ".pipe(map(x => x.data))", "takeUntil(this.destroy$)",
      "ngOnDestroy()", "catchError(err =>", "firstValueFrom(obs)",
      "interface IRepository<T>", "catch (Exception ex)",
      '{ "status": 200, "ok": true }', "Authorization: Bearer",
    ],
    EXP_HERO_SYMS: [
      "</>", "{}", "()", "[];", "=>", "::", "&&", "||", "!==", "===",
      ".NET", "C#", "SQL", "API", "Git", "PHP", "CSS", "HTML",
      "◆", "▸", "⬡", "⬢", "◇", "⬟", "△", "▷", "0x", "01", "10", "++", "--",
      "**", "M12", "L24", "Z", "rx", "xmlns",
    ],
  };
})();

window.Portfolio = window.Portfolio || {};
window.Portfolio.CONSTANTS = CONSTANTS;
window.Portfolio.ELEMENTS = { SELECTORS };

export { CONSTANTS, ICONS, BREAKPOINTS, CSS_CLASSES, SELECTORS, SKELETON };
