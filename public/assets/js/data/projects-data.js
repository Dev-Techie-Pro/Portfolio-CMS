"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.PROJECTS = {
    "al-tahaluf": {
      id: "al-tahaluf",
      num: "01",
      name: "Al Tahaluf's",
      subtitle: "Admin Panel.",
      badgeType: "Enterprise Platform",
      badgeYear: "2022",
      category: "Enterprise Platform · Angular / .NET Core",
      desc: "A full-stack enterprise web platform with a custom admin panel — featuring role-based access, RESTful APIs and a scalable Angular / .NET Core architecture for managing business operations at scale.",
      tags: ["Angular", ".NET Core", "SQL Server", "Entity Framework", "RxJS"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254073/al-tahaluf-banner_p0ltyp.png",
      meta: [
        { label: "Client", value: "Al Tahaluf's Group", accent: !1 },
        { label: "Category", value: "Enterprise Admin Platform", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "8 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["Angular", ".NET Core", "SQL Server", "EF", "RxJS"],
        },
      ],
      stats: [
        { num: "8", suffix: "wk", label: "Delivery Time" },
        { num: "18", suffix: "+", label: "Custom Modules" },
        { num: "97", suffix: "", label: "Perf Score" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782289505/Al-Tahaluf-4_di0oon.png",
          label: "Admin Login Panel",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782289506/Al-Tahaluf-3_xkhpgh.png",
          label: "Dashboard Overview",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782289506/Al-Tahaluf-5_lxp7iu.png",
          label: "Data Management View",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782289505/Al-Tahaluf-1_suxlkf.png",
          label: "Module Overview",
        },
      ],
      overviewParagraphs: [
        "Al Tahaluf's is a full enterprise web platform built with Angular on the frontend and .NET Core on the backend. The system features a custom admin panel for user and content management, reusable Angular component architecture, lazy loading and RxJS-based state management.",
        "The backend exposes clean RESTful APIs backed by Entity Framework Core and SQL Server, with JWT-based authentication and role-based access control separating admin, manager and viewer permissions.",
        "The result is a scalable, maintainable system that gives the business complete control over their operations through a fast, responsive dashboard — with zero downtime since deployment.",
      ],
      features: [
        {
          icon: "shield",
          title: "Secure Admin Auth",
          desc: "JWT tokens with ASP.NET Identity and granular role-based permissions.",
        },
        {
          icon: "code",
          title: "RESTful API",
          desc: ".NET Core APIs with Entity Framework, LINQ and optimised SQL queries.",
        },
        {
          icon: "zap",
          title: "Angular Lazy Loading",
          desc: "Module-level lazy loading for sub-second initial load times.",
        },
        {
          icon: "database",
          title: "SQL Server DB",
          desc: "Optimised relational schema with stored procedures and indexes.",
        },
        {
          icon: "monitor",
          title: "Responsive UI",
          desc: "Fully responsive across desktop, tablet and mobile screens.",
        },
        {
          icon: "users",
          title: "Role Management",
          desc: "Admin, manager and viewer roles with live permission toggling.",
        },
      ],
      techStack: [
        { abbr: "NG", name: "Angular 16", role: "Frontend SPA" },
        { abbr: ".NET", name: ".NET Core 7", role: "Backend API" },
        { abbr: "C#", name: "C#", role: "Language" },
        { abbr: "SQL", name: "SQL Server", role: "Database" },
        { abbr: "EF", name: "Entity Framework", role: "ORM" },
        { abbr: "RxJS", name: "RxJS", role: "State Management" },
        { abbr: "JWT", name: "JWT / Identity", role: "Auth" },
        { abbr: "TS", name: "TypeScript", role: "Language" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Discovery & Architecture",
          text: "Mapped business workflows, designed the Angular module tree and SQL Server schema with normalised tables and stored procedures.",
        },
        {
          phase: "Phase 02",
          heading: "API Development",
          text: "Built .NET Core REST endpoints with EF Core, JWT auth, RBAC middleware and Swagger documentation.",
        },
        {
          phase: "Phase 03",
          heading: "Frontend Build",
          text: "Implemented all Angular modules with lazy loading, reactive forms, RxJS services and reusable component library.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Deployment",
          text: "Unit tested API controllers, ran E2E tests, then deployed to IIS with CI/CD pipeline and zero-downtime swap.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Complex RBAC",
          desc: "Permission matrix across 3 roles and 40+ screens solved with a single Angular route guard + .NET policy handler.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Performance",
          desc: "97 Lighthouse performance score achieved through lazy loading, OnPush change detection and SQL query optimisation.",
        },
        {
          icon: "users",
          title: "Outcome — Adoption",
          desc: "100% of admin staff adopted the new system within the first week, replacing manual spreadsheet workflows entirely.",
        },
        {
          icon: "shield",
          title: "Outcome — Security",
          desc: "Zero security incidents post-launch with JWT refresh token rotation, HTTPS and parameterised queries throughout.",
        },
      ],
      template: "v2",
      prevProject: null,
      nextProject: {
        id: "nsric",
        name: "NSRIC Education",
        cat: "Educational Platform · WordPress",
      },
    },
    nsric: {
      id: "nsric",
      num: "02",
      name: "NSRIC Education",
      subtitle: "Online Education Platform.",
      badgeType: "Educational Platform",
      badgeYear: "2022",
      category: "Educational Platform · WordPress / PHP",
      desc: "Full website for Nature Science Research and Innovation Centre — online course listings, visa consultancy, conference management, dual-timezone clock and a live scrolling announcement ticker.",
      tags: ["WordPress", "PHP", "JavaScript", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254093/nsric-banner_ggseqj.png",
      meta: [
        { label: "Client", value: "NSRIC", accent: !1 },
        { label: "Category", value: "Educational Platform", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "PHP", "ACF", "MySQL", "JS"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "12", suffix: "+", label: "Custom Modules" },
        { num: "96", suffix: "", label: "Perf Score" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782254093/nsric-banner_ggseqj.png",
          label: "NSRIC Home Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782254093/nsric-banner_ggseqj.png",
          label: "Course Listings",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782254093/nsric-banner_ggseqj.png",
          label: "Student Portal",
        },
      ],
      overviewParagraphs: [
        "NSRIC needed a comprehensive digital platform to manage online course enrolments, visa consultancy appointments and international conference registrations — all within a single, manageable WordPress installation.",
        "The challenge was building flexible content architecture that non-technical staff could update daily without developer involvement, while maintaining fast load times and a professional appearance.",
        "I delivered a fully custom WordPress solution with ACF-powered content types, a custom PHP plugin for the dual-timezone clock and announcement ticker, and a Bootstrap-based responsive theme.",
      ],
      features: [
        {
          icon: "activity",
          title: "Course Listings",
          desc: "Dynamic catalogue with category filters, enrollment CTAs and ACF-powered course details.",
        },
        {
          icon: "users",
          title: "Student Portal",
          desc: "Authenticated student area with personalised dashboard and course history.",
        },
        {
          icon: "zap",
          title: "Live Ticker",
          desc: "Scrolling announcement ticker powered by custom JavaScript and WP options API.",
        },
        {
          icon: "code",
          title: "Custom PHP Plugin",
          desc: "Dual-timezone world clock and shortcode library as a standalone mu-plugin.",
        },
        {
          icon: "monitor",
          title: "Responsive Design",
          desc: "Mobile-first Bootstrap layout accessible on all devices and screen sizes.",
        },
        {
          icon: "shield",
          title: "Secure Auth",
          desc: "WordPress role-based access for students, editors and administrators.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "ACF", name: "ACF Pro", role: "Content Fields" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "BS", name: "Bootstrap 5", role: "Styling" },
        { abbr: "CPT", name: "CPT UI", role: "Content Types" },
        { abbr: "CF7", name: "Contact Form 7", role: "Forms" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Requirements & Content Map",
          text: "Worked with NSRIC staff to map all content types — courses, conferences, visa services — and designed the WordPress data model.",
        },
        {
          phase: "Phase 02",
          heading: "Theme Development",
          text: "Built a custom child theme from a Bootstrap starter with all page templates, template parts and responsive breakpoints.",
        },
        {
          phase: "Phase 03",
          heading: "Plugin & ACF Setup",
          text: "Developed a custom mu-plugin for the ticker and clock, registered all CPTs and ACF field groups for non-technical editing.",
        },
        {
          phase: "Phase 04",
          heading: "Optimisation & Launch",
          text: "Implemented caching, image optimisation and Cloudflare CDN. Trained staff on content management before go-live.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Daily Updates",
          desc: "Non-technical staff needed to publish news and update courses. Solved with ACF + Gutenberg giving full editorial control.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Enrolments",
          desc: "Online course enrolments increased 20% in the first two months after launch compared to the previous static site.",
        },
        {
          icon: "users",
          title: "Outcome — Staff Autonomy",
          desc: "Zero developer involvement needed for day-to-day content updates since launch — staff manage everything independently.",
        },
        {
          icon: "shield",
          title: "Outcome — Performance",
          desc: "96 Lighthouse score achieved through object caching, critical CSS and optimised image delivery via CDN.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "al-tahaluf",
        name: "Al Tahaluf's Admin",
        cat: "Enterprise · Angular / .NET Core",
      },
      nextProject: {
        id: "stock-management",
        name: "Stock Management",
        cat: "Desktop App · .NET WinForms",
      },
    },
    "stock-management": {
      id: "stock-management",
      num: "03",
      name: "Stock Management",
      subtitle: "Desktop Application.",
      badgeType: "Desktop Application",
      badgeYear: "2021",
      category: "Desktop Application · .NET WinForms / C#",
      desc: "Windows desktop app for stock inventory management — user authentication, stock tracking, category management, low-stock alerts, printable reports and secure SQL Server data persistence.",
      tags: [".NET", "WinForms", "SQL Server", "C#"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254080/banner-sm_sn5z7g.png",
      meta: [
        { label: "Client", value: "Internal / Business Client", accent: !1 },
        { label: "Category", value: "Desktop Inventory System", accent: !1 },
        { label: "Status", value: "✓ Deployed & In Use", accent: !0 },
        { label: "Timeline", value: "5 Weeks", accent: !1 },
        { label: "Role", value: "Desktop Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: [".NET", "C#", "WinForms", "SQL Server", "ADO.NET"],
        },
      ],
      stats: [
        { num: "5", suffix: "wk", label: "Delivery Time" },
        { num: "60", suffix: "%", label: "Faster Stock Entry" },
        { num: "40", suffix: "%", label: "Error Reduction" },
        { num: "10", suffix: "+", label: "Daily Users" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723634/STMS-Desktop-1_edcrnp.webp",
          label: "Dashboard Overview",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723635/STMS-Desktop-2_nmz3qf.webp",
          label: "Stock Entry Form",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723636/STMS-Desktop-3_muvnat.webp",
          label: "Inventory Management",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723634/STMS-Desktop-4_wdlt1x.webp",
          label: "Reports Screen",
        },
      ],
      overviewParagraphs: [
        "The client was managing inventory entirely in spreadsheets — a process prone to errors, duplication and slow reporting. They needed a purpose-built desktop application that staff could learn in minutes.",
        "I built a .NET WinForms application with C# and SQL Server, featuring a full authentication flow, real-time stock tracking, category management and low-stock threshold alerts.",
        "Crystal Reports integration generates printable inventory reports and CSV exports on demand, replacing the manual spreadsheet exports the team previously spent hours preparing each week.",
      ],
      features: [
        {
          icon: "shield",
          title: "Authentication",
          desc: "Secure login with SHA-256 hashed passwords, salt and session management.",
        },
        {
          icon: "activity",
          title: "Stock Tracking",
          desc: "Add, update, delete items with real-time quantity display and threshold alerts.",
        },
        {
          icon: "database",
          title: "SQL Server DB",
          desc: "Relational schema with stored procedures for all CRUD operations.",
        },
        {
          icon: "zap",
          title: "Low-Stock Alerts",
          desc: "Automatic notification panel when stock drops below configurable thresholds.",
        },
        {
          icon: "users",
          title: "Multi-User",
          desc: "Admin and standard user roles with permission-gated screens.",
        },
        {
          icon: "siGrid",
          title: "Reports",
          desc: "Crystal Reports integration with printable inventory and transaction reports.",
        },
      ],
      techStack: [
        { abbr: ".NET", name: ".NET Framework 4.8", role: "Platform" },
        { abbr: "C#", name: "C#", role: "Language" },
        { abbr: "WF", name: "WinForms", role: "UI Framework" },
        { abbr: "SQL", name: "SQL Server", role: "Database" },
        { abbr: "ADO", name: "ADO.NET", role: "Data Access" },
        { abbr: "CR", name: "Crystal Reports", role: "Reporting" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Requirements Gathering",
          text: "Shadowed staff using the existing spreadsheet workflow to identify every pain point and data requirement.",
        },
        {
          phase: "Phase 02",
          heading: "Database Design",
          text: "Designed the SQL Server schema with normalised tables for items, categories, suppliers, transactions and users.",
        },
        {
          phase: "Phase 03",
          heading: "Application Build",
          text: "Built all WinForms screens, data binding, validation, ADO.NET data layer and Crystal Reports report definitions.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Handover",
          text: "Ran UAT with warehouse staff, fixed edge-case bugs, wrote user documentation and delivered a staff training session.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Data Migration",
          desc: "Migrated 3 years of spreadsheet data into the SQL Server schema with a custom import tool and validation rules.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Speed",
          desc: "Stock entry time reduced by 60% compared to spreadsheet workflow — measured across the first month of use.",
        },
        {
          icon: "users",
          title: "Outcome — Adoption",
          desc: "All 10 warehouse staff trained and fully independent within 2 days — zero support calls after the first week.",
        },
        {
          icon: "shield",
          title: "Outcome — Accuracy",
          desc: "40% reduction in stock discrepancies in the first quarter — attributed to validation rules and duplicate-item checks.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "nsric",
        name: "NSRIC Education",
        cat: "Educational Platform · WordPress",
      },
      nextProject: {
        id: "qrmf",
        name: "QRMF",
        cat: "Medical System · PHP / MySQL",
      },
    },
    qrmf: {
      id: "qrmf",
      num: "04",
      name: "QRMF",
      subtitle: "Medical Information System.",
      badgeType: "Medical Platform",
      badgeYear: "2022",
      category: "Medical Information System · PHP / MySQL",
      desc: "Medical management system with PHP, MySQL and Bootstrap — secure authentication, patient and operation records, role-based admin panel, phpMyAdmin integration and JavaScript-enhanced UI.",
      tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254094/qrmf-banner_bzaa21.png",
      meta: [
        { label: "Client", value: "QRMF — Quick Reaction Medical", accent: !1 },
        { label: "Category", value: "Medical Information System", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "7 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery"],
        },
      ],
      stats: [
        { num: "7", suffix: "wk", label: "Delivery Time" },
        { num: "50", suffix: "%", label: "Faster Record Access" },
        { num: "200", suffix: "+", label: "Records Managed" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723756/qrmf-1_j3rmce.webp",
          label: "QRMF Home Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723775/qrmf-2_bs3on6.webp",
          label: "Admin Panel Dashboard",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723752/qrmf-3_bvutna.webp",
          label: "Patient Records",
        },
      ],
      overviewParagraphs: [
        "QRMF (Quick Reaction Medical Force) needed a centralised digital platform for managing patient records, operation logs and staff data — replacing a paper-based system that was slow and error-prone.",
        "The platform required strict access control separating staff roles, a fast search capability for patient records under emergency conditions, and a straightforward admin interface for data entry.",
        "I built a clean PHP MVC application with MySQL, Bootstrap 5 and jQuery — delivering a system that staff could navigate in seconds even under pressure, with full audit logging for every record change.",
      ],
      features: [
        {
          icon: "shield",
          title: "Secure Auth",
          desc: "PHP session-based authentication with role differentiation and bcrypt passwords.",
        },
        {
          icon: "activity",
          title: "Patient Records",
          desc: "Full CRUD for patient data with instant search and category filtering.",
        },
        {
          icon: "database",
          title: "MySQL Database",
          desc: "Robust relational schema for medical records, staff data and audit logs.",
        },
        {
          icon: "code",
          title: "PHP Backend",
          desc: "Clean server-side PHP with prepared statements and input sanitisation.",
        },
        {
          icon: "monitor",
          title: "Bootstrap UI",
          desc: "Responsive Bootstrap 5 layout optimised for fast navigation under pressure.",
        },
        {
          icon: "zap",
          title: "JS Interactivity",
          desc: "Dynamic search, sortable tables, modals and form validation with jQuery.",
        },
      ],
      techStack: [
        { abbr: "PHP", name: "PHP 8", role: "Backend" },
        { abbr: "SQL", name: "MySQL 8", role: "Database" },
        { abbr: "BS", name: "Bootstrap 5", role: "UI Framework" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "jQ", name: "jQuery", role: "DOM / AJAX" },
        { abbr: "PMA", name: "phpMyAdmin", role: "DB Administration" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Workflow Analysis",
          text: "Mapped the existing paper-based record workflow and identified all data entities: patients, staff, operations, audit trail.",
        },
        {
          phase: "Phase 02",
          heading: "Database Design",
          text: "Designed the normalised MySQL schema with foreign key constraints, indexes and views for common reporting queries.",
        },
        {
          phase: "Phase 03",
          heading: "Application Build",
          text: "Built the PHP MVC application with all CRUD modules, role-based access, search functionality and Bootstrap responsive UI.",
        },
        {
          phase: "Phase 04",
          heading: "Training & Launch",
          text: "Ran UAT with medical staff, iterated on UX feedback, then deployed to cPanel hosting with SSL and daily database backups.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Emergency Access",
          desc: "Records needed to be retrievable in under 3 seconds under emergency conditions. Solved with MySQL full-text search indexes.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Record Speed",
          desc: "Patient record retrieval time dropped from ~5 minutes (paper) to under 10 seconds — a 50× improvement in access speed.",
        },
        {
          icon: "users",
          title: "Outcome — Paperwork",
          desc: "30% reduction in administrative paperwork hours measured across the first quarter of system use.",
        },
        {
          icon: "shield",
          title: "Outcome — Audit Trail",
          desc: "Full immutable audit log of every record access and change — meeting the organisation's internal compliance requirements.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "stock-management",
        name: "Stock Management",
        cat: "Desktop App · .NET WinForms",
      },
      nextProject: {
        id: "simplicity-trading",
        name: "Simplicity Trading",
        cat: "WordPress · WooCommerce",
      },
    },
    "simplicity-trading": {
      id: "simplicity-trading",
      num: "05",
      name: "Simplicity Trading",
      subtitle: "WordPress / E-Commerce.",
      badgeType: "WordPress / E-Commerce",
      badgeYear: "2023",
      category: "WordPress / E-Commerce · Elementor / WooCommerce",
      desc: "Conversion-focused WordPress website for Simplicity Trading Academy — membership tiers, 7-day free trial CTA, video integration, course listings, FAQ and a dark-themed responsive layout.",
      tags: ["WordPress", "Elementor", "PHP", "WooCommerce"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254092/simplicity-banner_warjhz.png",
      meta: [
        { label: "Client", value: "Simplicity Trading Academy", accent: !1 },
        {
          label: "Category",
          value: "E-Commerce / Membership Site",
          accent: !1,
        },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "5 Weeks", accent: !1 },
        { label: "Role", value: "WordPress Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "WooCommerce", "Elementor", "PHP", "MySQL"],
        },
      ],
      stats: [
        { num: "5", suffix: "wk", label: "Delivery Time" },
        { num: "120", suffix: "+", label: "Members Enrolled" },
        { num: "35", suffix: "%", label: "Trial-to-Paid Rate" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723898/simplicity-trading-1_nxt01e.webp",
          label: "Home Page Hero",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723898/simplicity-trading-2_zzkmxi.webp",
          label: "Membership Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723903/simplicity-trading-3_b7i5pj.webp",
          label: "Course Listing Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723897/simplicity-trading-4_y9rycp.webp",
          label: "FAQ & Pricing",
        },
      ],
      overviewParagraphs: [
        "Simplicity Trading Academy needed a professional website that could sell trading course memberships online, capture free-trial leads and clearly communicate the value of their programme.",
        "The main challenge was building a conversion funnel that felt premium and trustworthy — positioning the academy against established competitors while keeping the backend manageable for a small team.",
        "I delivered a dark-themed WordPress site with WooCommerce memberships, a 7-day free trial flow connected to MailChimp, Elementor Pro page designs and embedded video course previews.",
      ],
      features: [
        {
          icon: "shield",
          title: "WooCommerce Memberships",
          desc: "Tiered access plans with automated billing, content gating and renewal Emails.",
        },
        {
          icon: "activity",
          title: "Free Trial Flow",
          desc: "7-day trial CTA linked to automated MailChimp onboarding sequence.",
        },
        {
          icon: "code",
          title: "Elementor Pro Builds",
          desc: "Fully custom page designs using Elementor Pro widgets and custom CSS.",
        },
        {
          icon: "zap",
          title: "Video Integration",
          desc: "Embedded course preview videos with scroll-triggered autoplay.",
        },
        {
          icon: "users",
          title: "Lead Generation",
          desc: "Opt-in forms with MailChimp integration and conversion tracking.",
        },
        {
          icon: "monitor",
          title: "Dark Theme Design",
          desc: "Custom dark theme with social proof sections and clear CTAs driving conversions.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "WC", name: "WooCommerce", role: "E-Commerce" },
        { abbr: "EL", name: "Elementor Pro", role: "Page Builder" },
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "MC", name: "MailChimp", role: "Email Marketing" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Brand & UX Strategy",
          text: "Reviewed competitor sites, defined the conversion funnel structure and wireframed the key pages with the client.",
        },
        {
          phase: "Phase 02",
          heading: "WooCommerce Setup",
          text: "Configured WooCommerce memberships, pricing tiers, content restriction rules and payment gateway integration.",
        },
        {
          phase: "Phase 03",
          heading: "Page Design & Build",
          text: "Built all pages in Elementor Pro with custom animations, video blocks, testimonial sections and a mobile-optimised checkout.",
        },
        {
          phase: "Phase 04",
          heading: "Email Flows & Launch",
          text: "Set up MailChimp automation sequences for trial and paid members, tested the full funnel and launched with an ad campaign.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Conversion Rate",
          desc: "Previous landing page converted below 2%. New trial flow redesign lifted trial sign-ups to 12% of visitors.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Trial-to-Paid",
          desc: "35% of free trial sign-ups converted to paid memberships within the first 60 days post-launch.",
        },
        {
          icon: "users",
          title: "Outcome — Member Growth",
          desc: "120+ members enrolled within the first 3 months — exceeding the client's 6-month target by 2×.",
        },
        {
          icon: "shield",
          title: "Outcome — Team Autonomy",
          desc: "Client team manages all course content, pricing and promotions independently — zero ongoing developer time required.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "qrmf",
        name: "QRMF",
        cat: "Medical System · PHP / MySQL",
      },
      nextProject: {
        id: "traveler",
        name: "Traveler App",
        cat: "Travel Booking · React / Node.js",
      },
    },
    traveler: {
      id: "traveler",
      num: "06",
      name: "Traveler",
      subtitle: "Travel Booking Platform.",
      badgeType: "Web Application",
      badgeYear: "2023",
      category: "Travel Booking Platform · React / Node.js",
      desc: "Full-featured flight and stay booking web app — flight search with route, trip type, date and passenger filters, hotel listings, promo code support and a responsive React SPA.",
      tags: ["React", "Node.js", "MongoDB", "REST API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254093/traveler-banner_yk8ndo.png",
      meta: [
        { label: "Client", value: "Internal Project", accent: !1 },
        { label: "Category", value: "Travel Booking Platform", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "8 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
        },
      ],
      stats: [
        { num: "8", suffix: "wk", label: "Delivery Time" },
        { num: "1K", suffix: "+", label: "Bookings Processed" },
        { num: "300", suffix: "+", label: "Registered Users" },
        { num: "1.2", suffix: "s", label: "Avg Page Load" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723992/traveler-1_xcsgdt.png",
          label: "Home Page Hero",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782724038/traveler-2_wabeni.webp",
          label: "Flight Search",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782724039/traveler-3_j1oc09.webp",
          label: "Flight Results",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782724041/traveler-5_x7hx3m.png",
          label: "Hotel Listings",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782724048/traveler-7_lwtva0.png",
          label: "Booking Confirmation",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782724053/traveler-8_spxx5v.png",
          label: "User Dashboard",
        },
      ],
      overviewParagraphs: [
        "Traveler is a full-stack booking platform built with React, Node.js / Express and MongoDB — covering the complete journey from flight search through to hotel selection and booking confirmation.",
        "The core challenge was building a fast, intuitive search experience with complex filter combinations (route, trip type, date range, passenger count, cabin class) that returned results in under a second.",
        "I implemented a React SPA with React Router, a Node.js REST API backed by MongoDB, JWT authentication, promo code validation and a fully responsive UI with smooth loading states throughout.",
      ],
      features: [
        {
          icon: "activity",
          title: "Flight Search",
          desc: "One-way, return and multi-city search with date pickers and passenger/class selectors.",
        },
        {
          icon: "users",
          title: "User Accounts",
          desc: "JWT-authenticated accounts with booking history, saved trips and profile management.",
        },
        {
          icon: "code",
          title: "Node.js REST API",
          desc: "Express API with full CRUD for bookings, users and flight/hotel data.",
        },
        {
          icon: "database",
          title: "MongoDB",
          desc: "Document database for flexible booking and availability data schemas.",
        },
        {
          icon: "zap",
          title: "Promo Codes",
          desc: "Server-side promo validation with percentage and fixed-amount discount support.",
        },
        {
          icon: "monitor",
          title: "React SPA",
          desc: "Single-page app with React Router, optimised renders and skeleton loading states.",
        },
      ],
      techStack: [
        { abbr: "Re", name: "React 18", role: "Frontend SPA" },
        { abbr: "RR", name: "React Router", role: "Routing" },
        { abbr: "ND", name: "Node.js", role: "Runtime" },
        { abbr: "EX", name: "Express.js", role: "API Framework" },
        { abbr: "MG", name: "MongoDB", role: "Database" },
        { abbr: "MN", name: "Mongoose", role: "ODM" },
        { abbr: "JWT", name: "JWT", role: "Auth" },
        { abbr: "TW", name: "Tailwind CSS", role: "Styling" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Architecture & API Design",
          text: "Designed the MongoDB schemas, REST API endpoints and React component hierarchy before writing a line of code.",
        },
        {
          phase: "Phase 02",
          heading: "API Development",
          text: "Built all Express routes for flights, hotels, bookings, auth and promo codes — fully tested with Postman.",
        },
        {
          phase: "Phase 03",
          heading: "React Frontend",
          text: "Implemented all React pages, components, React Router navigation, custom hooks and Tailwind UI with loading states.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Optimisation",
          text: "Load tested the API, optimised MongoDB queries with indexes, achieved 1.2s average load and deployed to cloud hosting.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Search Speed",
          desc: "Complex multi-filter queries were initially slow. Solved with MongoDB compound indexes and result caching on the API.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Performance",
          desc: "1.2s average page load achieved — well within the <2s target set at the project kickoff.",
        },
        {
          icon: "users",
          title: "Outcome — User Growth",
          desc: "300+ registered users and 1,000+ bookings processed within the first 3 months after launch.",
        },
        {
          icon: "shield",
          title: "Outcome — Reliability",
          desc: "99.9% uptime since deployment with JWT refresh token rotation and robust MongoDB Atlas failover configuration.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "simplicity-trading",
        name: "Simplicity Trading",
        cat: "WordPress · WooCommerce",
      },
      nextProject: {
        id: "online-quiz",
        name: "Online Quiz System",
        cat: "Web App · ASP.NET / C#",
      },
    },
    "online-quiz": {
      id: "online-quiz",
      num: "07",
      name: "Online Quiz System",
      subtitle: "Web Application.",
      badgeType: "Web Application",
      badgeYear: "2022",
      category: "Web Application · ASP.NET MVC / C#",
      desc: "Feature-rich quiz platform with ASP.NET MVC and C# — admin quiz builder, multiple question types, per-question time limits, real-time score calculation and a results analytics dashboard.",
      tags: [".NET", "C#", "SQL Server", "Admin Panel"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254075/bnner-oqs_itk88l.png",
      meta: [
        { label: "Client", value: "Academic Institution", accent: !1 },
        { label: "Category", value: "Online Assessment Platform", accent: !1 },
        { label: "Status", value: "✓ Live & In Use", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap", "jQuery"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "300", suffix: "+", label: "Students Assessed" },
        { num: "50", suffix: "+", label: "Quizzes Created" },
        { num: "80", suffix: "%", label: "Paper Test Reduction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723698/oqs-desktop-6_qufha7.webp",
          label: "Online Quiz System Login",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723688/oqs-desktop-1_xieo67.webp",
          label: "Online Quiz System Dashboard",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723694/oqs-desktop-4_eu6tws.webp",
          label: "Online Quiz System Manage Quizes",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723697/oqs-desktop-5_glt2xq.webp",
          label: "Online Quiz System Assign Quizes",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723694/oqs-desktop-4_eu6tws.webp",
          label: "Online Quiz System Add Quizes",
        },
        ,
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723688/oqs-desktop-7_aop6ra.webp",
          label: "Online Quiz System Student Dashboard",
        },
      ],
      overviewParagraphs: [
        "The institution was running all assessments on paper — a slow, costly process that gave no insight into student performance trends. They needed a digital platform that could replace paper tests entirely.",
        "The platform had to support multiple question types with configurable scoring, enforce time limits per question, and provide staff with instant results and analytics without any manual grading.",
        "I built an ASP.NET MVC application with C# and SQL Server, featuring a drag-and-drop quiz builder for admins, a timed student quiz interface and a results dashboard with score breakdowns and rankings.",
      ],
      features: [
        {
          icon: "shield",
          title: "Auth System",
          desc: "Separate login flows for students and administrators with ASP.NET Identity.",
        },
        {
          icon: "activity",
          title: "Quiz Builder",
          desc: "Admin panel with ordering, bulk import and multiple question type support.",
        },
        {
          icon: "code",
          title: "Question Types",
          desc: "MCQ, True/False and fill-in-the-blank with configurable per-question scoring.",
        },
        {
          icon: "zap",
          title: "Timed Questions",
          desc: "Per-question countdown timer with auto-submit on expiry and JavaScript enforcement.",
        },
        {
          icon: "database",
          title: "SQL Server",
          desc: "Normalised schema for quizzes, questions, answers, attempts and results.",
        },
        {
          icon: "siGrid",
          title: "Analytics",
          desc: "Score breakdown, leaderboard, pass/fail rates and performance trend charts.",
        },
      ],
      techStack: [
        { abbr: "MVC", name: "ASP.NET MVC 5", role: "Framework" },
        { abbr: "C#", name: "C#", role: "Language" },
        { abbr: "SQL", name: "SQL Server", role: "Database" },
        { abbr: "EF", name: "Entity Framework", role: "ORM" },
        { abbr: "BS", name: "Bootstrap 5", role: "UI Framework" },
        { abbr: "jQ", name: "jQuery", role: "JS / Timer" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Requirements & Schema",
          text: "Documented all assessment types, scoring rules and access requirements. Designed the SQL Server schema and admin wireframes.",
        },
        {
          phase: "Phase 02",
          heading: "Backend Development",
          text: "Built all ASP.NET MVC controllers and EF data layer for quiz CRUD, attempts, scoring and user management.",
        },
        {
          phase: "Phase 03",
          heading: "Student Interface",
          text: "Built the timed student quiz UI with JavaScript countdown, answer persistence and auto-submit on time expiry.",
        },
        {
          phase: "Phase 04",
          heading: "Analytics & Launch",
          text: "Implemented the results dashboard with Chart.js analytics, ran UAT with staff and students, then deployed to production.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Timer Integrity",
          desc: "Timer needed to be server-enforced to prevent cheating. Solved with server-side attempt timestamps validated on submission.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Grading Speed",
          desc: "Instant automated grading replaced 2–3 hours of manual paper marking per quiz session — saving staff significant time.",
        },
        {
          icon: "users",
          title: "Outcome — Scale",
          desc: "300+ students assessed and 50+ quizzes created since launch — exceeding the planned capacity by 50%.",
        },
        {
          icon: "shield",
          title: "Outcome — Paper Reduction",
          desc: "80% of assessments moved from paper to the platform within the first semester of use.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "traveler",
        name: "Traveler App",
        cat: "Travel Booking · React / Node.js",
      },
      nextProject: {
        id: "mila-lifestyle",
        name: "Mila Lifestyle",
        cat: "E-Commerce · WooCommerce",
      },
    },
    "mila-lifestyle": {
      id: "mila-lifestyle",
      num: "08",
      name: "Mila Lifestyle",
      subtitle: "E-Commerce Store.",
      badgeType: "E-Commerce",
      badgeYear: "2023",
      category: "E-Commerce Store · WooCommerce / WordPress",
      desc: "Wholesale lifestyle accessories e-commerce platform — product categories, wishlist, cart, search, promotional banners, buyer account system and a clean multi-level navigation.",
      tags: ["WooCommerce", "WordPress", "PHP", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254089/mila-banner_p2wdvm.png",
      meta: [
        { label: "Client", value: "Mila Lifestyle", accent: !1 },
        { label: "Category", value: "Wholesale E-Commerce", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "WordPress / WooCommerce Dev", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "WooCommerce", "PHP", "MySQL", "JS"],
        },
      ],
      stats: [
        { num: "200", suffix: "+", label: "Products Listed" },
        { num: "800", suffix: "+", label: "Monthly Shoppers" },
        { num: "40", suffix: "%", label: "Increase in Orders" },
        { num: "1.5", suffix: "s", label: "Avg Page Load" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723673/mila-estore-3_aqrjvl.webp",
          label: "Store Home Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723662/mila-estore-2_jgj021.webp",
          label: "Product Catalogue",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723661/mila-estore-1_adwekq.webp",
          label: "Cart & Checkout",
        },
      ],
      overviewParagraphs: [
        "Mila Lifestyle sells wholesale fashion accessories and needed a professional online store to replace their manual WhatsApp-based ordering process that was becoming unmanageable as the business scaled.",
        "The store needed to handle 200+ products across multiple categories, support buyer account registration, display promotional banners for seasonal sales and load fast on mobile connections.",
        "I built a custom WordPress + WooCommerce store with a bespoke child theme, hierarchical product categories, wishlist functionality, promotional banner scheduling and an optimised checkout flow.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Product Catalogue",
          desc: "Hierarchical categories with filters, sorting, search and WooCommerce product galleries.",
        },
        {
          icon: "activity",
          title: "Wishlist & Cart",
          desc: "Persistent wishlist and cart with real-time quantity updates and stock status display.",
        },
        {
          icon: "shield",
          title: "Buyer Accounts",
          desc: "Registered accounts with order history, saved addresses and re-order functionality.",
        },
        {
          icon: "zap",
          title: "Promo Banners",
          desc: "Dynamic homepage banners with seasonal promotion scheduling via the WP admin.",
        },
        {
          icon: "code",
          title: "Custom Theme",
          desc: "Bespoke WordPress child theme with custom WooCommerce templates and shortcodes.",
        },
        {
          icon: "monitor",
          title: "Mobile-First",
          desc: "Fully responsive design with touch-friendly galleries and one-step mobile checkout.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "WC", name: "WooCommerce", role: "E-Commerce" },
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "PP", name: "PayPal / Bank", role: "Payments" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Product & Category Mapping",
          text: "Catalogued all 200+ products, defined the category hierarchy and planned the WooCommerce attribute and variation structure.",
        },
        {
          phase: "Phase 02",
          heading: "Theme & Template Build",
          text: "Built a custom child theme with bespoke WooCommerce archive, single product and checkout templates matching the brand identity.",
        },
        {
          phase: "Phase 03",
          heading: "Plugin Config & Data Import",
          text: "Configured WooCommerce settings, payment gateways and wishlist plugin, then bulk-imported all products with images and metadata.",
        },
        {
          phase: "Phase 04",
          heading: "Optimisation & Launch",
          text: "Implemented caching, image compression and CDN delivery to achieve 1.5s load times. Trained client and launched with a sale campaign.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Bulk Import",
          desc: "200+ products needed importing with images, variants and custom attributes. Solved with a WP All Import CSV pipeline.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Order Volume",
          desc: "40% increase in online orders within the first 2 months compared to the previous WhatsApp-based process.",
        },
        {
          icon: "users",
          title: "Outcome — Customer Base",
          desc: "800+ unique monthly shoppers within 3 months of launch — predominantly mobile users from Instagram referrals.",
        },
        {
          icon: "shield",
          title: "Outcome — Performance",
          desc: "1.5s average page load on mobile networks — critical for the client's mobile-first customer base.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "online-quiz",
        name: "Online Quiz System",
        cat: "Web App · ASP.NET / C#",
      },
      nextProject: {
        id: "kf-movement",
        name: "KF Movement",
        cat: "Non-Profit · WordPress",
      },
    },
    "kf-movement": {
      id: "kf-movement",
      num: "09",
      name: "KF Movement",
      subtitle: "Non-Profit Website.",
      badgeType: "Non-Profit",
      badgeYear: "2023",
      category: "Non-Profit Organisation · WordPress / Custom Theme",
      desc: "The Kashmir Freedom Movement — a digital platform for integration, mobilisation and empowerment of the people of Jammu & Kashmir toward the self-determination cause.",
      tags: ["WordPress", "Custom Theme", "ACF/CPT", "PHP"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254080/kfm-banner_cbicqy.png",
      meta: [
        { label: "Client", value: "KF Movement", accent: !1 },
        {
          label: "Category",
          value: "Non-Profit Awareness Platform",
          accent: !1,
        },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "PHP", "ACF", "CPT", "MySQL", "Stripe"],
        },
      ],
      stats: [
        { num: "5K", suffix: "+", label: "Supporters Reached" },
        { num: "30", suffix: "+", label: "Campaigns Published" },
        { num: "100", suffix: "+", label: "News Articles" },
        { num: "99", suffix: "%", label: "Platform Uptime" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782296888/kfm-1_r3edha.png",
          label: "About Mabool Shaheed",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782296887/kfm-2_gczyog.png",
          label: "KFM Info",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782296891/kfm-3_eynhtd.png",
          label: "KFM Kashmir History",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782296895/kfm-5_ku9k9z.png",
          label: "KFM Books",
        },
      ],
      overviewParagraphs: [
        "The Kashmir Freedom Movement needed a credible digital presence to coordinate campaigns, publish news and receive donations from supporters worldwide — all manageable by non-technical volunteers.",
        "The platform had to handle traffic spikes during major protest events and provide a clear, structured content hierarchy for campaigns, press releases, events and a donation module.",
        "I delivered a custom WordPress theme and mu-plugin with ACF/CPT content architecture, Stripe donation integration, WPML-ready multilingual structure and Cloudflare caching for high-traffic resilience.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Custom CPTs",
          desc: "ACF and CPT UI for news, campaigns, press releases and events with custom taxonomies.",
        },
        {
          icon: "shield",
          title: "Donation Module",
          desc: "Secure Stripe donation form with one-time and recurring contribution options.",
        },
        {
          icon: "activity",
          title: "Campaign Manager",
          desc: "Admin-managed campaigns with progress tracking, goal display and supporter counters.",
        },
        {
          icon: "code",
          title: "Custom Plugin",
          desc: "Bespoke mu-plugin for all movement-specific features, shortcodes and AJAX handlers.",
        },
        {
          icon: "zap",
          title: "News Feed",
          desc: "Dynamic news section with category filtering, pagination and social sharing.",
        },
        {
          icon: "monitor",
          title: "Responsive",
          desc: "Mobile-first design accessible across all devices for a global supporter base.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "ACF", name: "ACF Pro", role: "Content Fields" },
        { abbr: "CPT", name: "CPT UI", role: "Content Types" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "STR", name: "Stripe", role: "Donations" },
        { abbr: "CF", name: "Cloudflare", role: "CDN & Security" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Content Architecture",
          text: "Mapped all content types with the committee — campaigns, demands, news, events — and designed the WordPress data model and ACF field groups.",
        },
        {
          phase: "Phase 02",
          heading: "Theme Development",
          text: "Built a bespoke WordPress theme from a custom starter implementing the full Figma design with PHP templates and reusable template parts.",
        },
        {
          phase: "Phase 03",
          heading: "Plugin & Donation Layer",
          text: "Developed the mu-plugin registering all CPTs, shortcodes and AJAX handlers; integrated Stripe for one-time and recurring donations.",
        },
        {
          phase: "Phase 04",
          heading: "Optimisation & Launch",
          text: "Implemented Cloudflare caching, load-tested for viral traffic spikes, and launched timed with a major protest event for maximum impact.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Traffic Spikes",
          desc: "Site survived viral sharing during protests thanks to Cloudflare caching rules serving static HTML on high-traffic pages.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Editorial Freedom",
          desc: "Volunteers publish news and events independently — zero developer involvement for day-to-day content since launch.",
        },
        {
          icon: "users",
          title: "Outcome — Reach",
          desc: "5,000+ unique supporters reached within the first month — becoming the primary digital hub for the movement.",
        },
        {
          icon: "shield",
          title: "Outcome — Donations",
          desc: "Stripe donation module successfully receiving contributions from supporters across 12+ countries since launch.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "mila-lifestyle",
        name: "Mila Lifestyle",
        cat: "E-Commerce · WooCommerce",
      },
      nextProject: {
        id: "jkjaac",
        name: "JKJAAC",
        cat: "Non-Profit · WordPress",
      },
    },
    jkjaac: {
      id: "jkjaac",
      num: "10",
      name: "JKJAAC",
      subtitle: "Non-Profit Website.",
      badgeType: "Non-Profit",
      badgeYear: "2023",
      category: "Non-Profit Organisation · WordPress / Custom Theme",
      desc: "A grassroots civil-society coalition website uniting traders, lawyers, students and transporters across AJK — demanding economic justice, true autonomy and an end to systemic exploitation.",
      tags: ["WordPress", "Custom Theme", "ACF/CPT", "PHP"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254079/jkjaac-banner_aa9qtd.png",
      meta: [
        { label: "Client", value: "JKJAAC — Civil Society", accent: !1 },
        {
          label: "Category",
          value: "Non-Profit / Awareness Platform",
          accent: !1,
        },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "PHP", "ACF", "CPT", "MySQL", "CF7"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "12", suffix: "+", label: "Custom Modules" },
        { num: "98", suffix: "", label: "Perf Score" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783524594/JKJAAC-About_oyizzt.png",
          label: "JKJAAC About Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783524595/JKJAAC-Timeline_pyvlme.png",
          label: "JKJAAC Timeline",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783524593/JKJAAC-Tracker_mfprnd.png",
          label: "Demands Progress Tracker",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783524594/JKJAAC-Proccess_fzmddn.png",
          label: "JKJAAC Process Tracker",
        },
      ],
      overviewParagraphs: [
        "JKJAAC (Jammu & Kashmir Joint Awami Action Committee) needed a robust digital platform to amplify their grassroots movement, coordinate protests and disseminate news to hundreds of thousands of supporters across Azad Jammu & Kashmir and beyond.",
        "The challenge was building a scalable, content-heavy CMS-driven website that could handle high traffic spikes during protests and breaking news — while remaining easily manageable by non-technical committee members.",
        "I delivered a fully custom WordPress solution with bespoke theme development, advanced ACF-powered content types and a modular plugin architecture — giving the committee complete editorial control without touching a single line of code.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Custom WordPress Theme",
          desc: "Built from scratch with fully modular template parts, zero page-builder dependencies and pixel-perfect design.",
        },
        {
          icon: "activity",
          title: "ACF + Custom Post Types",
          desc: "News, Press Releases, Events and Demands managed via ACF with custom taxonomies and archive pages.",
        },
        {
          icon: "code",
          title: "Custom Shortcode System",
          desc: "Reusable shortcodes for demand lists, signatories, protest counts and call-to-action blocks.",
        },
        {
          icon: "zap",
          title: "Performance Optimised",
          desc: "Lazy loading, critical CSS inlining, server caching and Cloudflare CDN achieving 98 Lighthouse score.",
        },
        {
          icon: "monitor",
          title: "Multilingual Ready",
          desc: "Structured for WPML with Urdu/English content switching for a diverse audience.",
        },
        {
          icon: "shield",
          title: "Secure Admin",
          desc: "Role-based editorial access for committee volunteers with audit logging for all content changes.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "PHP", name: "PHP 8.1", role: "Backend Logic" },
        { abbr: "ACF", name: "Advanced CF", role: "Content Fields" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "CSS", name: "CSS3 / SASS", role: "Styling" },
        { abbr: "CPT", name: "Custom Post Types", role: "Architecture" },
        { abbr: "CF", name: "Cloudflare", role: "CDN & Security" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Discovery & Architecture",
          text: "Gathered requirements from committee stakeholders, mapped content types and architected the WordPress data model — CPTs, taxonomies, relationships and ACF field groups.",
        },
        {
          phase: "Phase 02",
          heading: "Theme Development",
          text: "Built a bespoke WordPress child theme from a custom starter, implementing the full Figma design in PHP templates with reusable template parts and hooks.",
        },
        {
          phase: "Phase 03",
          heading: "Plugin & Shortcode Layer",
          text: "Developed a custom mu-plugin registering all CPTs, taxonomies, shortcodes and AJAX handlers — keeping logic separate from presentation and fully upgrade-safe.",
        },
        {
          phase: "Phase 04",
          heading: "Optimisation & Launch",
          text: "Implemented object caching, image lazy-loading, critical CSS delivery and Cloudflare rules. Load-tested before a coordinated launch timed with a major protest event.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Traffic Spikes",
          desc: "Site had to survive viral sharing during protests. Solved with Cloudflare caching rules serving cached HTML on high-traffic pages.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Non-Technical Editors",
          desc: "Full Gutenberg + ACF admin experience allows committee volunteers to publish news and events independently — zero developer involvement needed.",
        },
        {
          icon: "users",
          title: "Outcome — Reach",
          desc: "Website became the primary digital hub, driving coordinated action across 12+ districts and reaching 50,000+ unique visitors within the first month.",
        },
        {
          icon: "shield",
          title: "Outcome — Performance",
          desc: "Achieved Lighthouse scores of 98 (Performance), 100 (SEO) and 96 (Accessibility) — significantly above the non-profit sector average.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "kf-movement",
        name: "KF Movement",
        cat: "Non-Profit · WordPress",
      },
      nextProject: {
        id: "win10-calculator",
        name: "Windows 10 Calculator",
        cat: "Web App · JavaScript",
      },
    },
    "win10-calculator": {
      id: "win10-calculator",
      num: "11",
      name: "Windows 10 Calculator Web",
      subtitle: "Interactive Web Application.",
      badgeType: "Web Application",
      badgeYear: "2023",
      category: "Interactive Web Application · JavaScript / HTML / CSS",
      desc: "A pixel-perfect replica of the Windows 10 Calculator built with vanilla JavaScript, HTML5, and CSS3. Features standard and scientific modes, keyboard support, history log, memory functions, and responsive design — all powered by JSON for data-driven operations.",
      tags: ["JavaScript", "HTML5", "CSS3", "JSON", "Responsive"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254094/win-10-calculator-banner_ecjera.png",
      meta: [
        { label: "Client", value: "Personal Project", accent: !1 },
        { label: "Category", value: "Web Application", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "3 Weeks", accent: !1 },
        { label: "Role", value: "Frontend Developer", accent: !1 },
        { label: "Tech Stack", tags: ["JavaScript", "HTML5", "CSS3", "JSON"] },
      ],
      stats: [
        { num: "3", suffix: "wk", label: "Delivery Time" },
        { num: "2", suffix: "", label: "Modes (Standard/Scientific)" },
        { num: "100", suffix: "%", label: "UI Accuracy" },
        { num: "98", suffix: "", label: "Perf Score" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525212/windows-10-calc-dark_oklcsk.png",
          label: "Calculator Dark Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525212/windows-10-calc-light_zoiyqs.png",
          label: "Calculator Light Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525212/windows-10-calc-vol_uvcptw.png",
          label: "Volume Calculator",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525213/windows-10-calc-sci_mcbmu4.png",
          label: "Scientific Calculator",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525213/windows-10-calc-pro_soqrxi.png",
          label: "Programmers Calculator",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525212/windows-10-calc-temp_m7qyqs.png",
          label: "Temperature Calculator",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525212/windows-10-calc-settings_fzqpmi.png",
          label: "Calculator Settings Panel",
        },
      ],
      overviewParagraphs: [
        "A faithful recreation of the Windows 10 Calculator app using pure web technologies. The goal was to match every visual detail and interaction behavior of the original — from button animations to keyboard shortcuts.",
        "The app features standard and scientific modes, persistent calculation history, memory functions (M+, M-, MC, MR), keyboard input support, and a fully responsive design that adapts to any screen size.",
        "All calculations and state management are driven by JSON data structures, making the logic clean, maintainable, and easily extensible for future features.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Standard & Scientific Modes",
          desc: "Toggle between basic arithmetic and advanced scientific functions with trigonometric and logarithmic operations.",
        },
        {
          icon: "activity",
          title: "History Log",
          desc: "Tracks all calculations with timestamp and allows users to revisit or reuse previous results.",
        },
        {
          icon: "zap",
          title: "Keyboard Support",
          desc: "Full keyboard mapping allows users to type calculations using physical keyboard shortcuts.",
        },
        {
          icon: "database",
          title: "Memory Functions",
          desc: "Store, recall, add, and clear memory values — just like the original Windows calculator.",
        },
        {
          icon: "monitor",
          title: "Responsive Design",
          desc: "Adapts seamlessly from desktop to mobile with touch-optimized button sizing and layout.",
        },
        {
          icon: "code",
          title: "JSON-Powered Logic",
          desc: "All operations and state management driven by JSON for clean, maintainable code architecture.",
        },
      ],
      techStack: [
        { abbr: "JS", name: "JavaScript", role: "Core Logic" },
        { abbr: "HTML", name: "HTML5", role: "Structure" },
        { abbr: "CSS", name: "CSS3", role: "Styling" },
        { abbr: "JSON", name: "JSON", role: "Data & State" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "UI Design & Layout",
          text: "Recreated the Windows 10 calculator UI pixel-perfect using HTML and CSS grid/flexbox layouts.",
        },
        {
          phase: "Phase 02",
          heading: "JavaScript Logic",
          text: "Implemented all arithmetic operations, memory functions, and mode switching with JavaScript.",
        },
        {
          phase: "Phase 03",
          heading: "Keyboard Integration",
          text: "Mapped physical keyboard keys to calculator functions for desktop power users.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Optimisation",
          text: "Cross-browser testing, performance optimisation, and responsive design refinement for mobile.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — UI Accuracy",
          desc: "Achieved 100% visual parity with Windows 10 calculator through meticulous CSS styling and exact sizing.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Performance",
          desc: "98 Lighthouse performance score achieved through vanilla JS and optimised CSS delivery.",
        },
        {
          icon: "users",
          title: "Outcome — User Experience",
          desc: "Seamless transition for Windows users with identical keyboard shortcuts and interaction patterns.",
        },
        {
          icon: "shield",
          title: "Outcome — Maintainability",
          desc: "JSON-driven architecture makes adding new functions or modes straightforward and bug-free.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "jkjaac",
        name: "JKJAAC",
        cat: "Non-Profit · WordPress",
      },
      nextProject: {
        id: "ask-whitny",
        name: "Ask Whitny",
        cat: "WordPress · Custom Development",
      },
    },
    "ask-whitny": {
      id: "ask-whitny",
      num: "12",
      name: "Ask Whitny",
      subtitle: "Custom WordPress Platform.",
      badgeType: "WordPress Platform",
      badgeYear: "2023",
      category: "Custom WordPress Platform · ACF / CPT / Page Builders",
      desc: "A fully customized WordPress solution built with page builders, custom post types, and Advanced Custom Fields. Features tailored user experiences, dynamic content management, custom templates, and seamless integration of third-party services for enhanced functionality.",
      tags: [
        "WordPress",
        "ACF",
        "Custom Post Types",
        "Page Builders",
        "Custom Development",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254070/ask-whitny-banner_limbby.png",
      meta: [
        { label: "Client", value: "Ask Whitny", accent: !1 },
        {
          label: "Category",
          value: "Custom WordPress Development",
          accent: !1,
        },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "5 Weeks", accent: !1 },
        { label: "Role", value: "WordPress Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["WordPress", "ACF", "CPT", "Page Builders", "PHP"],
        },
      ],
      stats: [
        { num: "5", suffix: "wk", label: "Delivery Time" },
        { num: "15", suffix: "+", label: "Custom Templates" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
        { num: "97", suffix: "", label: "Perf Score" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525987/ask-whietny-blog_pdrjsg.png",
          label: "Home Blogs List",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525986/ask-whietny-fashion_cz2lf5.png",
          label: "Ask Whietny Fashions",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525983/ask-whietny-pulic_wojpas.png",
          label: "Ask Whietny pulic",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783525983/ask-whietny-foods_fkvv3s.png",
          label: "Ask Whietny Foods",
        },
      ],
      overviewParagraphs: [
        "Ask Whitny is a fully customized WordPress platform built to deliver a unique user experience with tailored content management capabilities. The project leveraged page builders, custom post types, and Advanced Custom Fields to create a flexible, content-rich website.",
        "The platform features custom templates designed to match the brand identity, dynamic content management through ACF, and seamless integration with third-party services to enhance functionality and user engagement.",
        "With a focus on maintainability and ease of use, the WordPress admin interface was streamlined to allow non-technical staff to manage all content independently, reducing ongoing developer dependency.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Custom Post Types",
          desc: "Registered CPTs for all content types with custom taxonomies for organised content structure.",
        },
        {
          icon: "code",
          title: "Advanced Custom Fields",
          desc: "Comprehensive ACF field groups for flexible content management and custom data entry.",
        },
        {
          icon: "zap",
          title: "Page Builder Integration",
          desc: "Custom page builder layouts with reusable components and drag-and-drop editing.",
        },
        {
          icon: "activity",
          title: "Custom Templates",
          desc: "Bespoke WordPress templates with conditional logic and dynamic content display.",
        },
        {
          icon: "monitor",
          title: "Responsive Design",
          desc: "Fully responsive across all devices with mobile-first approach and touch optimisation.",
        },
        {
          icon: "users",
          title: "Third-Party Integrations",
          desc: "Seamless integration with third-party services for enhanced platform functionality.",
        },
      ],
      techStack: [
        { abbr: "WP", name: "WordPress 6", role: "CMS / Core" },
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "ACF", name: "ACF Pro", role: "Content Fields" },
        { abbr: "CPT", name: "CPT UI", role: "Content Types" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "CSS", name: "CSS3", role: "Styling" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Discovery & Planning",
          text: "Gathered requirements, mapped content architecture, and designed the WordPress data model with ACF field groups.",
        },
        {
          phase: "Phase 02",
          heading: "Theme Development",
          text: "Built custom WordPress templates with page builder integration and responsive design implementation.",
        },
        {
          phase: "Phase 03",
          heading: "Plugin & CPT Setup",
          text: "Registered custom post types, taxonomies, and developed custom functionality for enhanced user experience.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Launch",
          text: "UAT with client, performance optimisation, and seamless deployment with staff training.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Content Flexibility",
          desc: "Required dynamic content types that non-technical staff could manage easily. Solved with ACF and custom meta boxes.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Editorial Independence",
          desc: "Non-technical staff manage 100% of content updates independently — zero developer involvement needed.",
        },
        {
          icon: "users",
          title: "Outcome — User Engagement",
          desc: "Enhanced user experience through custom templates and third-party integrations increased engagement metrics.",
        },
        {
          icon: "shield",
          title: "Outcome — Performance",
          desc: "Achieved 97 Lighthouse performance score through caching, CDN delivery, and optimised asset loading.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "win10-calculator",
        name: "Windows 10 Calculator",
        cat: "Web App · JavaScript",
      },
      nextProject: {
        id: "chat-app",
        name: "Chat Application",
        cat: "Web App · PHP / MySQL",
      },
    },
    "chat-app": {
      id: "chat-app",
      num: "13",
      name: "Chat Application",
      subtitle: "Real-time Messaging Platform.",
      badgeType: "Web Application",
      badgeYear: "2023",
      category: "Real-time Messaging Platform · PHP / MySQL",
      desc: "A secure, real-time chat application built with PHP and MySQL featuring multi-user support, group chat functionality, and advanced security protocols. Utilizes JSON for data exchange, RESTful API architecture, and comprehensive user management with authentication and authorization layers.",
      tags: ["PHP", "MySQL", "phpMyAdmin", "JSON", "REST API", "Security"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254076/chat-app-banner_ejysiu.png",
      meta: [
        { label: "Client", value: "Personal Project", accent: !1 },
        { label: "Category", value: "Real-time Messaging", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["PHP", "MySQL", "phpMyAdmin", "JSON", "REST API"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "50", suffix: "+", label: "Concurrent Users" },
        { num: "100", suffix: "%", label: "Encrypted Messages" },
        { num: "99.9", suffix: "%", label: "Uptime" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723725/php-chat-app-1_wpqcm2.webp",
          label: "Chat App Login Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723725/php-chat-app-5_kxmplp.webp",
          label: "Chat App SignUp Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723726/php-chat-app-2_kv4knx.webp",
          label: "Chat App Group Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723732/php-chat-app-4_wlpann.webp",
          label: "Chat App Chat Interface",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723731/php-chat-app-3_rbppyv.webp",
          label: "Chat App Profile Interface",
        },
      ],
      overviewParagraphs: [
        "A secure, real-time chat platform built with PHP and MySQL, designed for multi-user communication with group chat capabilities. The application handles concurrent users with efficient database queries and AJAX polling for message delivery.",
        "Advanced security features include encrypted message storage, session-based authentication, and input sanitization to prevent XSS and SQL injection attacks. User management includes role-based permissions for admin, moderators, and regular users.",
        "JSON is used for data exchange between client and server, with a RESTful API architecture allowing extensibility for future mobile app integration. The system supports private messaging, group chats, and file sharing capabilities.",
      ],
      features: [
        {
          icon: "shield",
          title: "Advanced Security",
          desc: "Encrypted messages, session-based auth, XSS protection, and SQL injection prevention.",
        },
        {
          icon: "users",
          title: "Multi-User & Groups",
          desc: "Support for multiple users, group chats, private messaging, and user role management.",
        },
        {
          icon: "code",
          title: "RESTful API",
          desc: "JSON-based REST API for data exchange with extensibility for mobile app integration.",
        },
        {
          icon: "database",
          title: "MySQL Database",
          desc: "Optimised database schema with indexing for fast message retrieval and concurrent user support.",
        },
        {
          icon: "zap",
          title: "Real-time Polling",
          desc: "Efficient AJAX polling and server-side event handling for near real-time message delivery.",
        },
        {
          icon: "monitor",
          title: "Responsive UI",
          desc: "Mobile-first chat interface with intuitive design for all screen sizes and devices.",
        },
      ],
      techStack: [
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "PMA", name: "phpMyAdmin", role: "DB Administration" },
        { abbr: "JSON", name: "JSON", role: "Data Exchange" },
        { abbr: "JS", name: "JavaScript", role: "Frontend Interactivity" },
        { abbr: "HTML", name: "HTML5", role: "Structure" },
        { abbr: "CSS", name: "CSS3", role: "Styling" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Architecture Design",
          text: "Designed the database schema, REST API endpoints, and real-time communication architecture.",
        },
        {
          phase: "Phase 02",
          heading: "Backend Development",
          text: "Built PHP backend with authentication, message processing, and group management features.",
        },
        {
          phase: "Phase 03",
          heading: "Frontend Interface",
          text: "Developed the chat interface with real-time message updates and responsive design.",
        },
        {
          phase: "Phase 04",
          heading: "Security & Testing",
          text: "Implemented encryption, XSS protection, and security auditing with load testing.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Real-time Performance",
          desc: "Achieved near real-time message delivery through efficient AJAX polling and server optimisation.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Security",
          desc: "Successfully implemented encrypted messaging with zero security incidents post-launch.",
        },
        {
          icon: "users",
          title: "Outcome — Scalability",
          desc: "Supports 50+ concurrent users with optimised database queries and caching strategies.",
        },
        {
          icon: "shield",
          title: "Outcome — Reliability",
          desc: "99.9% uptime achieved with robust error handling and server-side validation.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "ask-whitny",
        name: "Ask Whitny",
        cat: "WordPress · Custom Development",
      },
      nextProject: {
        id: "espn-clone",
        name: "ESPN Cricinfo Clone",
        cat: "Web App · PHP / API",
      },
    },
    "espn-clone": {
      id: "espn-clone",
      num: "14",
      name: "ESPN Cricinfo Clone",
      subtitle: "Sports Data Aggregation Platform.",
      badgeType: "Web Application",
      badgeYear: "2023",
      category: "Sports Data Aggregation · PHP / API / JavaScript",
      desc: "A comprehensive cricket news and score platform replicating ESPN Cricinfo's core features. Built with PHP and JavaScript, leveraging external APIs for live match data, player statistics, and news feeds. Features JSON data handling, dynamic content rendering, database-driven user preferences, and responsive design for seamless mobile and desktop experience.",
      tags: ["PHP", "JavaScript", "HTML5", "JSON", "REST API", "Database"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254083/espn-clone-banner_arpquf.png",
      meta: [
        { label: "Client", value: "Personal Project", accent: !1 },
        { label: "Category", value: "Sports Data Platform", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["PHP", "JavaScript", "REST API", "JSON", "MySQL"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "5", suffix: "+", label: "API Integrations" },
        { num: "1,000", suffix: "+", label: "Data Points Fetched" },
        { num: "95", suffix: "", label: "Perf Score" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528231/ESPN-Clone-home_ynkrnw.png",
          label: "Home Page",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528226/ESPN-Clone-lives_zjeaxv.png",
          label: "Live Match Scores",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528232/ESPN-Clone-stats_ye9tvj.png",
          label: "Teams",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528226/ESPN-Clone-this-day_orjumc.png",
          label: "On This Day",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528239/ESPN-Clone-match-inf0_z5aqn4.png",
          label: "Match Results",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528230/ESPN-Clone-m-stats_gtvhsd.png",
          label: "Match Stats",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528230/ESPN-Clone-scorecard_yprlmf.png",
          label: "Match Scorecard",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1783528228/ESPN-Clone-m-overs_aeqxjh.png",
          label: "Match Overs",
        },
      ],
      overviewParagraphs: [
        "A comprehensive cricket platform that aggregates live scores, match data, player statistics, and news from multiple external APIs. The project replicates the core experience of ESPN Cricinfo, providing fans with a one-stop destination for cricket information.",
        "The platform uses PHP for backend processing, JavaScript for dynamic frontend interactions, and JSON for data exchange between API integrations. All data is cached and stored in a MySQL database for fast retrieval and offline access to historical data.",
        "User preferences are database-driven, allowing personalised content feeds, favourite teams/players, and custom notifications. The responsive design ensures a seamless experience across desktop, tablet, and mobile devices.",
      ],
      features: [
        {
          icon: "activity",
          title: "Live Match Data",
          desc: "Real-time scores, ball-by-ball updates, and match summaries from external sports APIs.",
        },
        {
          icon: "users",
          title: "Player Statistics",
          desc: "Comprehensive player profiles with career stats, records, and performance metrics.",
        },
        {
          icon: "code",
          title: "API Integration",
          desc: "Multiple third-party API integrations for live data, news, and player statistics.",
        },
        {
          icon: "database",
          title: "Data Caching",
          desc: "JSON data caching and MySQL storage for fast retrieval and historical data access.",
        },
        {
          icon: "zap",
          title: "Dynamic Content",
          desc: "JavaScript-powered content rendering with real-time updates and interactive elements.",
        },
        {
          icon: "monitor",
          title: "Responsive Design",
          desc: "Mobile-first approach with adaptive layouts for all screen sizes and devices.",
        },
      ],
      techStack: [
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "JS", name: "JavaScript", role: "Frontend Interactivity" },
        { abbr: "HTML", name: "HTML5", role: "Structure" },
        { abbr: "JSON", name: "JSON", role: "Data Exchange" },
        { abbr: "API", name: "REST APIs", role: "External Data" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "API Research & Selection",
          text: "Researched cricket APIs, evaluated data quality and rate limits, selected best-fit providers.",
        },
        {
          phase: "Phase 02",
          heading: "Backend & Data Layer",
          text: "Built PHP API integration layer, data caching, and MySQL database schema for storage.",
        },
        {
          phase: "Phase 03",
          heading: "Frontend Development",
          text: "Developed responsive interface with JavaScript for dynamic content and real-time updates.",
        },
        {
          phase: "Phase 04",
          heading: "Testing & Launch",
          text: "Cross-browser testing, performance optimisation, and deployment with CDN caching.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — API Rate Limits",
          desc: "Implemented intelligent caching strategies to minimise API calls while keeping data fresh.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Data Aggregation",
          desc: "Successfully combined data from 5+ APIs into a unified, user-friendly cricket platform.",
        },
        {
          icon: "users",
          title: "Outcome — User Engagement",
          desc: "Personalisation features increased user engagement with custom content feeds and notifications.",
        },
        {
          icon: "shield",
          title: "Outcome — Performance",
          desc: "95 Lighthouse performance score through efficient caching and optimised asset delivery.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "chat-app",
        name: "Chat Application",
        cat: "Web App · PHP / MySQL",
      },
      nextProject: {
        id: "manii-gossips",
        name: "Manii's Gossips",
        cat: "Desktop App · C# / WinForms",
      },
    },
    "manii-gossips": {
      id: "manii-gossips",
      num: "15",
      name: "Manii's Gossips",
      subtitle: "Windows Forms Desktop Application.",
      badgeType: "Desktop Application",
      badgeYear: "2021",
      category: "Desktop Application · C# / Windows Forms / .NET",
      desc: "A feature-rich desktop application built with C# and Windows Forms in Visual Studio .NET. Powered by SQL Server database with comprehensive data management, and integrated Crystal Reports for professional reporting and analytics. Includes user-friendly interface, data validation, and seamless CRUD operations for efficient workflow management.",
      tags: [
        "C#",
        "Windows Forms",
        ".NET",
        "SQL Server",
        "Crystal Reports",
        "Visual Studio",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254084/banner-qoc_vwrmke.png",
      meta: [
        { label: "Client", value: "Internal / Business Client", accent: !1 },
        { label: "Category", value: "Desktop Application", accent: !1 },
        { label: "Status", value: "✓ Deployed & In Use", accent: !0 },
        { label: "Timeline", value: "5 Weeks", accent: !1 },
        { label: "Role", value: "Desktop Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["C#", "WinForms", ".NET", "SQL Server", "Crystal Reports"],
        },
      ],
      stats: [
        { num: "5", suffix: "wk", label: "Delivery Time" },
        { num: "50", suffix: "%", label: "Time Saved on Tasks" },
        { num: "15", suffix: "+", label: "Daily Users" },
        { num: "100", suffix: "%", label: "Client Satisfaction" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723411/manii-gossips-3_et0hou.webp",
          label: "Dashboard Overview",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723411/manii-gossips-1_z70van.webp",
          label: "Data Management",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723411/manii-gossips-2_ki8hgq.webp",
          label: "Crystal Reports",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723410/manii-gossips-4_op4wl4.webp",
          label: "Crystal Reports",
        },
      ],
      overviewParagraphs: [
        "Manii's Gossips is a desktop application built with C# and Windows Forms, designed to streamline information management and workflow efficiency. The application provides comprehensive CRUD operations, data validation, and professional reporting capabilities.",
        "Powered by SQL Server, the application handles complex data relationships with optimised queries and stored procedures. Crystal Reports integration enables professional reporting and analytics for business decision-making.",
        "The user-friendly interface was designed with end-users in mind, featuring intuitive navigation, data validation at every step, and real-time feedback for all operations. The application has been successfully deployed with 15+ daily users.",
      ],
      features: [
        {
          icon: "shield",
          title: "User Authentication",
          desc: "Secure login with role-based access control and session management.",
        },
        {
          icon: "database",
          title: "SQL Server Integration",
          desc: "Robust database with optimised queries, stored procedures, and data integrity.",
        },
        {
          icon: "siGrid",
          title: "CRUD Operations",
          desc: "Complete create, read, update, delete functionality with data validation.",
        },
        {
          icon: "activity",
          title: "Crystal Reports",
          desc: "Professional reporting with custom report generation and export options.",
        },
        {
          icon: "zap",
          title: "User-Friendly Interface",
          desc: "Intuitive Windows Forms UI with data validation and real-time feedback.",
        },
        {
          icon: "users",
          title: "Multi-User Support",
          desc: "Supports 15+ concurrent users with data consistency and integrity.",
        },
      ],
      techStack: [
        { abbr: "C#", name: "C#", role: "Language" },
        { abbr: "WF", name: "Windows Forms", role: "UI Framework" },
        { abbr: ".NET", name: ".NET Framework 4.8", role: "Platform" },
        { abbr: "SQL", name: "SQL Server", role: "Database" },
        { abbr: "CR", name: "Crystal Reports", role: "Reporting" },
        { abbr: "VS", name: "Visual Studio", role: "IDE" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Requirements Gathering",
          text: "Identified user workflows, data requirements, and reporting needs through stakeholder interviews.",
        },
        {
          phase: "Phase 02",
          heading: "Database Design",
          text: "Designed SQL Server schema with normalised tables and stored procedures for data integrity.",
        },
        {
          phase: "Phase 03",
          heading: "Application Build",
          text: "Developed Windows Forms interface with complete CRUD functionality and data validation.",
        },
        {
          phase: "Phase 04",
          heading: "Reporting & Deployment",
          text: "Integrated Crystal Reports, conducted UAT, and deployed with staff training.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Complex Reporting",
          desc: "Required professional reporting with custom formats. Solved with Crystal Reports integration.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Efficiency",
          desc: "50% time saved on daily tasks compared to previous manual/Excel-based workflows.",
        },
        {
          icon: "users",
          title: "Outcome — User Adoption",
          desc: "15+ daily users fully trained and independent within the first week of deployment.",
        },
        {
          icon: "shield",
          title: "Outcome — Reliability",
          desc: "Zero downtime since deployment with robust error handling and data integrity checks.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "espn-clone",
        name: "ESPN Cricinfo Clone",
        cat: "Web App · PHP / API",
      },
      nextProject: {
        id: "point-of-sale",
        name: "Point Of Sale",
        cat: "Desktop Application · .NET WinForms / C#",
      },
    },
    "point-of-sale": {
      id: "point-of-sale",
      num: "16",
      name: "Point Of Sale",
      subtitle: "Desktop Application with Barcode Scanner Integration",
      badgeType: "Desktop Application",
      badgeYear: "2021",
      category: "Desktop Application · .NET WinForms / C#",
      desc: "Windows desktop POS system for inventory and sales management — secure authentication, barcode scanning, real-time stock tracking, category management, low-stock alerts, printable Crystal Reports, and SQL Server data persistence. Built as a semester project for engineering students.",
      tags: [
        ".NET",
        "WinForms",
        "SQL Server",
        "C#",
        "Crystal Reports",
        "Barcode Scanner",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782254083/banner-stockm_jgv4p2.png",
      meta: [
        { label: "Client", value: "Academic Semester Project", accent: !1 },
        { label: "Category", value: "POS & Inventory System", accent: !1 },
        { label: "Status", value: "✓ Completed & Submitted", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        {
          label: "Role",
          value: "Lead Developer (Student Project)",
          accent: !1,
        },
        {
          label: "Tech Stack",
          tags: [
            ".NET 4.8",
            "C#",
            "WinForms",
            "SQL Server",
            "ADO.NET",
            "Crystal Reports",
            "Barcode SDK",
          ],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Development Time" },
        { num: "70", suffix: "%", label: "Faster Checkout" },
        { num: "95", suffix: "%", label: "Scanning Accuracy" },
        { num: "15", suffix: "+", label: "Database Tables" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723116/ASMS-Desktop-1_fxstoc.webp",
          label: "Login & Authentication Screen",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723116/ASMS-Desktop-2_ludkcs.webp",
          label: "Dashboard Overview with Stock Summary",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723116/ASMS-Desktop-3_zhlcub.webp",
          label: "Barcode Scanning & Sales Entry",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723117/ASMS-Desktop-4_wftglo.webp",
          label: "Inventory Management with Categories",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723117/ASMS-Desktop-5_rwgmbr.webp",
          label: "Product Management & Stock Adjustments",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723117/ASMS-Desktop-6_r6otvb.webp",
          label: "Low-Stock Alerts & Notifications",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723118/ASMS-Desktop-7_ycno1k.webp",
          label: "Crystal Reports & Print Preview",
        },
      ],
      overviewParagraphs: [
        "This Point of Sale desktop application was developed as a semester project for engineering students to demonstrate practical implementation of .NET technologies. The system simulates a real-world retail environment where inventory is managed through barcode scanning and automated stock tracking.",
        "The application features a complete POS workflow — products are added via barcode scanner input, sales transactions are processed instantly, and inventory levels update automatically. Built with .NET WinForms and C#, the system uses SQL Server for data persistence with a normalized schema supporting products, categories, suppliers, transactions, and user management.",
        "Crystal Reports integration generates professional printable reports including daily sales summaries, inventory status, low-stock alerts, and transaction histories. The scanner integration uses a USB barcode scanner that inputs directly into text fields, making product lookup and checkout operations seamless and efficient.",
      ],
      features: [
        {
          icon: "scan",
          title: "Barcode Scanner Integration",
          desc: "USB barcode scanner support for instant product lookup, adding items to cart, and quick checkout processing.",
        },
        {
          icon: "shield",
          title: "Secure Authentication",
          desc: "Multi-user login with SHA-256 password hashing, role-based access (Admin/Cashier), and session management.",
        },
        {
          icon: "shopping-cart",
          title: "POS Checkout",
          desc: "Complete sales workflow — add items, apply discounts, calculate totals, process payments, and generate receipts.",
        },
        {
          icon: "database",
          title: "SQL Server Backend",
          desc: "Relational database with 15+ tables, stored procedures, triggers, and transaction logging for complete audit trail.",
        },
        {
          icon: "bell",
          title: "Low-Stock Alerts",
          desc: "Real-time notification system that alerts when stock falls below configurable thresholds, with visual indicators.",
        },
        {
          icon: "file-text",
          title: "Crystal Reports",
          desc: "Printable inventory reports, sales summaries, product lists, and low-stock reports with export to PDF/Excel.",
        },
        {
          icon: "users",
          title: "Multi-User Management",
          desc: "Admin and cashier roles with permission-controlled access to reports, inventory management, and system settings.",
        },
        {
          icon: "refresh-cw",
          title: "Real-Time Inventory",
          desc: "Automatic stock updates on each sale, with manual adjustment capabilities for stock takes and corrections.",
        },
      ],
      techStack: [
        {
          abbr: ".NET",
          name: ".NET Framework 4.8",
          role: "Application Platform",
        },
        { abbr: "C#", name: "C#", role: "Programming Language" },
        { abbr: "WF", name: "Windows Forms", role: "UI Framework" },
        { abbr: "SQL", name: "SQL Server 2019", role: "Database Engine" },
        { abbr: "ADO", name: "ADO.NET", role: "Data Access Layer" },
        { abbr: "CR", name: "Crystal Reports", role: "Reporting Engine" },
        {
          abbr: "SCAN",
          name: "Barcode Scanner SDK",
          role: "Hardware Integration",
        },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Project Planning",
          text: "Defined project scope, created UML diagrams, designed database schema, and set up development environment with Git version control.",
        },
        {
          phase: "Phase 02",
          heading: "Database Implementation",
          text: "Created SQL Server database with normalized tables, wrote stored procedures for CRUD operations, and implemented data validation triggers.",
        },
        {
          phase: "Phase 03",
          heading: "Application Development",
          text: "Built WinForms UI with responsive layouts, implemented barcode scanner integration, developed POS logic, and created data layer with ADO.NET.",
        },
        {
          phase: "Phase 04",
          heading: "Reporting & Testing",
          text: "Designed Crystal Reports templates, conducted unit testing, performed user acceptance testing, and fixed bugs identified during testing phase.",
        },
        {
          phase: "Phase 05",
          heading: "Documentation & Submission",
          text: "Created technical documentation, user manual, recorded demo video, and prepared final project submission with all deliverables.",
        },
      ],
      outcomes: [
        {
          icon: "check-circle",
          title: "Achievement — Project Completion",
          desc: "Successfully delivered all project requirements within the 6-week timeline, earning excellent grades and faculty recognition.",
        },
        {
          icon: "zap",
          title: "Performance — Scanning Speed",
          desc: "Barcode scanning reduced product lookup time from ~20 seconds manual entry to under 2 seconds, improving checkout efficiency by 70%.",
        },
        {
          icon: "database",
          title: "Data Integrity — Reliable System",
          desc: "Database transactions with ACID properties and trigger-based validations eliminated duplicate entries and maintained referential integrity.",
        },
        {
          icon: "file-text",
          title: "Reporting — Crystal Reports",
          desc: "Automated report generation saved manual effort, with PDF/Excel export enabling easy sharing of inventory and sales data.",
        },
        {
          icon: "users",
          title: "Learning — Team Collaboration",
          desc: "Applied Agile methodology, conducted code reviews, used Git for version control, and collaborated effectively as a team of 3 students.",
        },
        {
          icon: "award",
          title: "Recognition — Outstanding Project",
          desc: "Selected as one of the top semester projects, with the solution being considered for use by the department's inventory management.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "manii-gossips",
        name: "Manii's Gossips",
        cat: "Windows Forms Desktop Application",
      },
      nextProject: {
        id: "library-management",
        name: "Library Management System",
        cat: "Library Management · PHP / MySQL / REST API",
      },
    },
    "library-management": {
      id: "library-management",
      num: "17",
      name: "Library Management System",
      subtitle: "Web-Based Library Management Platform.",
      badgeType: "Web Application",
      badgeYear: "2022",
      category: "Library Management · PHP / MySQL / REST API",
      desc: "A complete library management solution built with PHP and MySQL database. Features include book cataloging, member management, issue/return tracking, fine calculation, and advanced search functionality. Utilizes phpMyAdmin for database administration, RESTful APIs for data operations, automated reporting system, and advanced transaction control for seamless library operations.",
      tags: [
        "PHP",
        "MySQL",
        "phpMyAdmin",
        "REST API",
        "Reports",
        "Transaction Control",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Sohaib-Ishaque/",
      heroImage:
        "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_1200/v1782253974/my-library-banner_wznzbc.png",
      meta: [
        { label: "Client", value: "Educational Institution", accent: !1 },
        { label: "Category", value: "Library Management System", accent: !1 },
        { label: "Status", value: "✓ Live & Active", accent: !0 },
        { label: "Timeline", value: "6 Weeks", accent: !1 },
        { label: "Role", value: "Full Stack Developer", accent: !1 },
        {
          label: "Tech Stack",
          tags: ["PHP", "MySQL", "phpMyAdmin", "REST API", "Reports"],
        },
      ],
      stats: [
        { num: "6", suffix: "wk", label: "Delivery Time" },
        { num: "5K", suffix: "+", label: "Books Catalogued" },
        { num: "1K", suffix: "+", label: "Active Members" },
        { num: "95", suffix: "%", label: "Process Automation" },
      ],
      screenshots: [
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723336/7_jyrish.webp",
          label: "Dashboard Overview",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723330/2_1_uldnid.webp",
          label: "Book Catalog",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723331/3_1_hkltpg.webp",
          label: "Reports & Analytics",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723336/8_nyn2c0.webp",
          label: "Reports & Analytics",
        },
        {
          src: "https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782723319/0_mxmdsu.webp",
          label: "Reports & Analytics",
        },
      ],
      overviewParagraphs: [
        "A comprehensive library management system built with PHP and MySQL, designed to automate all aspects of library operations — from book cataloging to member management and transaction tracking.",
        "The system features advanced search capabilities, automated fine calculation for overdue books, and a complete transaction history for all library activities. phpMyAdmin provides easy database administration for staff.",
        "RESTful APIs power the data operations layer, enabling seamless integration with future modules. Automated reporting generates insights on circulation, popular books, member activity, and more.",
      ],
      features: [
        {
          icon: "siGrid",
          title: "Book Cataloging",
          desc: "Complete book management with author, publisher, ISBN, category, and multiple copies tracking.",
        },
        {
          icon: "users",
          title: "Member Management",
          desc: "Student/staff registration, membership types, borrowing limits, and history tracking.",
        },
        {
          icon: "activity",
          title: "Issue/Return Tracking",
          desc: "Complete transaction management with due dates, reminders, and automated fine calculation.",
        },
        {
          icon: "database",
          title: "MySQL Database",
          desc: "Optimised relational schema with indexing for fast search and transaction processing.",
        },
        {
          icon: "code",
          title: "RESTful APIs",
          desc: "JSON-based APIs for data operations with extensibility for mobile/desktop clients.",
        },
        {
          icon: "siGrid",
          title: "Automated Reports",
          desc: "Circulation reports, popular books, member activity, and inventory status reports.",
        },
      ],
      techStack: [
        { abbr: "PHP", name: "PHP 8", role: "Backend Logic" },
        { abbr: "SQL", name: "MySQL", role: "Database" },
        { abbr: "PMA", name: "phpMyAdmin", role: "DB Administration" },
        { abbr: "API", name: "REST API", role: "Data Operations" },
        { abbr: "JS", name: "JavaScript", role: "Interactivity" },
        { abbr: "HTML", name: "HTML5 / CSS3", role: "UI / Styling" },
      ],
      timeline: [
        {
          phase: "Phase 01",
          heading: "Requirements & Schema",
          text: "Mapped library workflows, designed database schema, and defined API endpoints for data operations.",
        },
        {
          phase: "Phase 02",
          heading: "Backend Development",
          text: "Built PHP backend with CRUD operations for books, members, transactions, and fine calculation.",
        },
        {
          phase: "Phase 03",
          heading: "Frontend Interface",
          text: "Developed responsive web interface with search, catalog browsing, and member dashboard.",
        },
        {
          phase: "Phase 04",
          heading: "Reporting & Launch",
          text: "Implemented automated reports, conducted UAT with library staff, and deployed with training.",
        },
      ],
      outcomes: [
        {
          icon: "activity",
          title: "Challenge — Fine Calculation",
          desc: "Complex fine rules and exemptions. Solved with configurable fine settings and automated calculation logic.",
        },
        {
          icon: "check-sq",
          title: "Outcome — Automation",
          desc: "95% of library processes automated, reducing staff workload from manual tracking to digital management.",
        },
        {
          icon: "users",
          title: "Outcome — Adoption",
          desc: "1,000+ active members and 5,000+ books catalogued within the first 3 months of deployment.",
        },
        {
          icon: "shield",
          title: "Outcome — Accuracy",
          desc: "Eliminated manual errors in book tracking and fine calculation with automated validation rules.",
        },
      ],
      template: "v2",
      prevProject: {
        id: "manii-gossips",
        name: "Manii's Gossips",
        cat: "Desktop App · C# / WinForms",
      },
      nextProject: null,
    },
  }));
const _PROJECT_ICON_MAP = {
  activity: "siActivity",
  "check-sq": "siCheckSquare",
  "check-circle": "siCheckCircle",
  grid: "siApps",
  shield: "siShield",
  monitor: "siMonitor",
  users: "siUsers",
  code: "siCode",
  zap: "siSpark",
  database: "siDatabase",
  clock: "siClock",
  briefcase: "siBriefcase",
  calendar: "siCalendar",
  user: "siUser",
  flag: "siFlag",
  globe: "siGlobe",
  search: "siSearch",
  layers: "siLayers",
  rocket: "siRocket",
  scan: "siScan",
  "shopping-cart": "siCart",
  bell: "siBell",
  "file-text": "siDocument",
  "refresh-cw": "siRefresh",
  award: "siAward",
  siGrid: "siGrid",
};
const _PROCESS_ICONS = [
  "siSearch",
  "siLayers",
  "siCode",
  "siCheckSquare",
  "siRocket",
];
const _METRIC_ICONS = ["siCalendar", "siClock", "siApps", "siSmile"];
const _TECH_ICON_BY_ABBR = {
  NG: "siAngularJs",
  "C#": "siCsharp",
  EF: "siDotNetCore",
  RxJS: "siRxJs",
  JWT: "siWebAuth",
  TS: "siTypescript",
  WP: "siWordpress",
  PHP: "siPhp",
  ACF: "siWordpress",
  JS: "siJavascript",
  BS: "siBootstrap",
  CPT: "siLayers",
  CF7: "siMessage",
  WF: "siDisplay",
  ADO: "siDotNet",
  CR: "siDocument",
  jQ: "siJquery",
  PMA: "siPhpMyAdmin",
  WC: "siWoocom",
  EL: "siElementor",
  MC: "siMailchimp",
  Re: "siReactJs",
  RR: "siReactJs",
  ND: "siNodeJs",
  EX: "siExpressJs",
  MG: "siMongodB",
  MN: "siMongodB",
  TW: "siTailwindcss",
  MVC: "siASPNet",
  PP: "siPaypal",
  STR: "siStripe",
  CF: "siCloudflare",
  CSS: "siCss3",
  JSON: "siJson",
  HTML: "siHTML5",
  API: "siServer",
  VS: "siVisualStudio",
  SCAN: "siScan",
};
function _resolveTechIcon(item) {
  if (!item) return "siCode";
  if (item.icon) {
    return item.icon.startsWith("si") ? item.icon : _TECH_ICON_BY_ABBR[item.icon] || "siCode";
  }
  const abbr = String(item.abbr || "").trim();
  const name = String(item.name || "").toLowerCase();
  if (abbr === "SQL") {
    if (name.includes("mysql") || name.includes("mariadb")) return "siMySql";
    if (name.includes("postgres")) return "siPostgreSql";
    if (name.includes("sqlite")) return "siSqlite";
    return "siSql";
  }
  if (abbr === ".NET") {
    if (name.includes("mvc")) return "siASPNet";
    if (name.includes("framework")) return "siDotNet";
    return "siDotNetCore";
  }
  if (name.includes("wordpress")) return "siWordpress";
  if (name.includes("woocommerce")) return "siWoocom";
  if (name.includes("elementor")) return "siElementor";
  if (name.includes("angular")) return "siAngularJs";
  if (name.includes("react")) return "siReactJs";
  if (name.includes("node")) return "siNodeJs";
  if (name.includes("express")) return "siExpressJs";
  if (name.includes("mongo")) return "siMongodB";
  if (name.includes("tailwind")) return "siTailwindcss";
  if (name.includes("bootstrap")) return "siBootstrap";
  if (name.includes("typescript")) return "siTypescript";
  if (name.includes("javascript")) return "siJavascript";
  if (name.includes("php")) return "siPhp";
  if (name.includes("mailchimp")) return "siMailchimp";
  if (name.includes("stripe")) return "siStripe";
  if (name.includes("paypal")) return "siPaypal";
  if (name.includes("cloudflare")) return "siCloudflare";
  if (name.includes("entity framework")) return "siDotNetCore";
  if (name.includes("crystal")) return "siDocument";
  if (name.includes("visual studio")) return "siVisualStudio";
  if (name.includes("phpmyadmin")) return "siPhpMyAdmin";
  if (name.includes("jquery")) return "siJquery";
  if (name.includes("rxjs")) return "siRxJs";
  if (name.includes("html")) return "siHTML5";
  if (name.includes("css")) return "siCss3";
  if (name.includes("json")) return "siJson";
  if (_TECH_ICON_BY_ABBR[abbr]) return _TECH_ICON_BY_ABBR[abbr];
  return "siCode";
}
function _resolveProjectIcon(key) {
  if (!key) return "siGrid";
  if (key.startsWith("si")) return key;
  return _PROJECT_ICON_MAP[key] || "siGrid";
}
function _iconHtml(registryName, extraClass) {
  const cls = extraClass ? `icon ${extraClass}` : "icon";
  return `<span class="${cls}" data-icon="${registryName}" aria-hidden="true"></span>`;
}
function _hydrateProjectIcons(root) {
  window.Portfolio?.ICONS?.hydrateAll?.(root || document);
}
function _metaIcon(e) {
  const t = (e || "").toLowerCase();
  return t.indexOf("client") > -1
    ? "siBriefcase"
    : t.indexOf("time") > -1 || t.indexOf("duration") > -1
      ? "siCalendar"
      : t.indexOf("role") > -1
        ? "siUser"
        : t.indexOf("status") > -1
          ? "siFlag"
          : t.indexOf("categor") > -1 || t.indexOf("industry") > -1
            ? "siGlobe"
            : t.indexOf("team") > -1
              ? "siUsers"
              : "siGrid";
}
function _projectUrl(e) {
  return `/projects/${encodeURIComponent(e)}`;
}
function _resolveProjectId() {
  const projects = window.Portfolio.PROJECTS || {};
  const slugFromPath = window.Portfolio.UTILS?.getProjectSlugFromPath?.();
  if (slugFromPath && projects[slugFromPath]) return slugFromPath;
  const fromQuery = new URLSearchParams(window.location.search).get("id");
  if (fromQuery && projects[fromQuery]) return fromQuery;
  return null;
}
function _initProjectModules() {
  window.Portfolio.PROJECT_DETAILS.init();
  window.Portfolio.PROJECT_DETAILS_V2.init();
  window.Portfolio.PROJECT_LINKS.init();
}
((window.Portfolio.PROJECT_DETAILS = (function () {
  function e(e, t) {
    const a = document.getElementById(e);
    a && (a.textContent = t);
  }
  return {
    init: function () {
      if ("project-details" !== window.Portfolio.UTILS.getActivePage()) return;
      const t = _resolveProjectId(),
        a = window.Portfolio.PROJECTS[t];
      if (!a)
        return (
          console.warn(
            "[project-data.js] Unknown project id:",
            t,
            "— redirecting.",
          ),
          void (window.location.href = "/projects")
        );
      (!(function (t) {
        document.title = `${t.name} — M Sohaib Ishaque`;
        const a = document.querySelector('meta[name="description"]');
        (a &&
          a.setAttribute(
            "content",
            `${t.name} — ${t.subtitle} | M Sohaib Ishaque Portfolio`,
          ),
          e("pd-breadcrumb-name", t.name),
          e("pd-badge-type", t.badgeType),
          e("pd-badge-year", t.badgeYear));
        const i = document.getElementById("pd-hero-title");
        (i &&
          (i.innerHTML = `<span class="line">${t.name}</span><span class="line accent">${t.subtitle}</span>`),
          e("pd-hero-desc", t.desc));
        const n = document.getElementById("pd-btn-live");
        n && (n.href = t.liveUrl);
        const s = document.getElementById("pd-btn-github");
        s && (s.href = t.githubUrl);
        const o = document.getElementById("pd-hero-tags");
        o &&
          (o.innerHTML = (t.tags || [])
            .map((e) => `<span class="pd-hero-tag">${e}</span>`)
            .join(""));
        const r = document.getElementById("pd-hero-stats");
        r &&
          (r.innerHTML = (t.stats || [])
            .map(
              (e) =>
                `\n      <div class="pd-hero-stat">\n        <span class="pd-hero-stat-num main-heading-font">${e.num}${e.suffix}</span>\n        <span class="pd-hero-stat-label">${e.label}</span>\n      </div>`,
            )
            .join(""));
      })(a),
        (function (t) {
          const a = document.getElementById("pd-mockup-img");
          if (a) {
            if (t.heroImage) a.src = t.heroImage;
            else {
              const e = (t.screenshots && t.screenshots[0]) || {};
              a.src = e.src || "";
            }
            a.alt = `${t.name} banner image`;
          }
          const i = document.getElementById("pd-mockup-url");
          i &&
            (i.textContent =
              t.liveUrl && "#" !== t.liveUrl
                ? t.liveUrl.replace(/^https?:\/\//, "")
                : `${t.id}.dev`);
          const n = t.stats || [];
          (n[0] &&
            (e("pd-float-num-1", `${n[0].num}${n[0].suffix}`),
            e("pd-float-label-1", n[0].label)),
            n[1] &&
              (e("pd-float-num-2", `${n[1].num}${n[1].suffix}`),
              e("pd-float-label-2", n[1].label)));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-meta-bar-list");
          if (!t) return;
          const a = (e.meta || []).filter((e) => !e.tags);
          t.innerHTML = a
            .map(
              (e) =>
                `\n      <div class="pd-meta-bar-item">\n        ${_iconHtml(_metaIcon(e.label), "pd-meta-bar-icon")}\n        <div class="pd-meta-bar-text">\n          <span class="pd-meta-bar-label">${e.label}</span>\n          <span class="pd-meta-bar-value${e.accent ? " accent" : ""}">${e.value}</span>\n        </div>\n      </div>`,
            )
            .join("");
        })(a),
        (function (t) {
          const a = t.overviewParagraphs || [];
          (e("pd-ov-challenge", a[0] || ""),
            e("pd-ov-solution", a[1] || ""),
            e("pd-ov-approach", a[2] || a[a.length - 1] || ""));
          const i = document.getElementById("pd-goals-list");
          i &&
            (i.innerHTML = (t.features || [])
              .slice(0, 5)
              .map(
                (e) =>
                  `\n        <li class="pd-goal-item">\n          ${_iconHtml("siCheckSquare")}\n          <span>${e.title}</span>\n        </li>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-key-outcomes-grid");
          if (!t) return;
          t.innerHTML = (e.stats || [])
            .map(
              (e) =>
                `\n      <div class="pd-ko-stat reveal">\n        <div class="pd-ko-num main-heading-font" data-target="${e.num}" data-suffix="${e.suffix}">0</div>\n        <div class="pd-ko-label">${e.label}</div>\n      </div>`,
            )
            .join("");
          const a = new IntersectionObserver(
            (e) => {
              e.forEach((e) => {
                e.isIntersecting &&
                  (e.target.querySelectorAll("[data-target]").forEach((e) => {
                    const t = e.dataset.target,
                      a = parseFloat(t),
                      i = e.dataset.suffix || "";
                    if (isNaN(a)) return void (e.textContent = t + i);
                    let n = 0;
                    const s = a / 112.5,
                      o = setInterval(() => {
                        ((n += s),
                          n >= a && ((n = a), clearInterval(o)),
                          (e.textContent =
                            (Number.isInteger(a)
                              ? Math.floor(n)
                              : n.toFixed(1)) + i));
                      }, 16);
                  }),
                  a.unobserve(e.target));
              });
            },
            { threshold: 0.4 },
          );
          a.observe(t);
        })(a),
        (function (e) {
          const t = document.getElementById("pd-features-grid");
          t &&
            (t.innerHTML = (e.features || [])
              .map(
                (e) =>
                  `\n      <div class="pd-feat-card reveal">\n        <div class="pd-feat-icon-wrap">\n          ${_iconHtml(_resolveProjectIcon(e.icon))}\n        </div>\n        <h3 class="pd-feat-title">${e.title}</h3>\n        <p class="pd-feat-desc">${e.desc}</p>\n      </div>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-tech-grid");
          t &&
            (t.innerHTML = (e.techStack || [])
              .map(
                (e) =>
                  `\n      <div class="pd-tech-tile reveal">\n        <div class="pd-tech-tile-icon">${_iconHtml(_resolveTechIcon(e))}</div>\n        <div class="pd-tech-tile-name">${e.name}</div>\n        <div class="pd-tech-tile-role">${e.role}</div>\n      </div>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = e.screenshots || [],
            a = t[0] || {},
            i = document.getElementById("mainScreenshotImg"),
            n = document.getElementById("mainScreenshotLabel");
          (i && ((i.src = a.src || ""), (i.alt = a.label || "")),
            n && (n.textContent = a.label || ""));
          const s = document.getElementById("pd-gallery-counter");
          s && (s.textContent = `01 / ${String(t.length).padStart(2, "0")}`);
          const o = document.getElementById("pd-screenshot-strip");
          o &&
            (o.innerHTML = t
              .map(
                (e, t) =>
                  `\n      <button class="pd-screenshot-thumb${0 === t ? " active" : ""} reveal"\n        data-src="${e.src}" data-label="${e.label}" data-index="${t + 1}"\n        aria-label="View: ${e.label}" role="listitem">\n        <img src="${e.src}" alt="${e.label}" loading="lazy" />\n        <span class="pd-thumb-label">${e.label}</span>\n      </button>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-outcomes-list");
          t &&
            (t.innerHTML = (e.outcomes || [])
              .map(
                (e) =>
                  `\n      <div class="pd-outcome-card reveal">\n        ${_iconHtml(_resolveProjectIcon(e.icon), "pd-outcome-icon")}\n        <div class="pd-outcome-text">\n          <strong>${e.title}</strong>\n          <p>${e.desc}</p>\n        </div>\n      </div>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-timeline");
          t &&
            (t.innerHTML = (e.timeline || [])
              .map(
                (e, t) =>
                  `\n      <div class="pd-tl-item">\n        <div class="pd-tl-node" aria-hidden="true">\n          ${_iconHtml(_PROCESS_ICONS[t % _PROCESS_ICONS.length])}\n        </div>\n        <div class="pd-tl-phase">${e.phase}</div>\n        <h3 class="pd-tl-heading main-heading-font">${e.heading}</h3>\n        <p class="pd-tl-text">${e.text}</p>\n      </div>`,
              )
              .join(""));
        })(a),
        (function (e) {
          const t = document.getElementById("pd-nav-grid");
          if (!t) return;
          const a = e.prevProject ? _projectUrl(e.prevProject.id) : null,
            i = e.nextProject ? _projectUrl(e.nextProject.id) : null,
            n = e.prevProject
              ? `\n      <a href="${a}" class="pd-nav-card pd-nav-card--prev reveal-left" aria-label="Previous: ${e.prevProject.name}">\n        <div class="pd-nav-arrow" aria-hidden="true">\n          ${_iconHtml("siAngleLeft")}\n        </div>\n        <div>\n          <div class="pd-nav-dir">Previous</div>\n          <div class="pd-nav-name main-heading-font">${e.prevProject.name}</div>\n          <div class="pd-nav-cat">${e.prevProject.cat}</div>\n        </div>\n      </a>`
              : "<div></div>",
            s = e.nextProject
              ? `\n      <a href="${i}" class="pd-nav-card pd-nav-card--next reveal-right" aria-label="Next: ${e.nextProject.name}">\n        <div class="pd-nav-arrow" aria-hidden="true">\n          ${_iconHtml("siAngleRight")}\n        </div>\n        <div>\n          <div class="pd-nav-dir">Next</div>\n          <div class="pd-nav-name main-heading-font">${e.nextProject.name}</div>\n          <div class="pd-nav-cat">${e.nextProject.cat}</div>\n        </div>\n      </a>`
              : "<div></div>";
          t.innerHTML = n + s;
        })(a),
        window.Portfolio.ANIMATIONS &&
          window.Portfolio.ANIMATIONS.initScrollReveal &&
          window.Portfolio.ANIMATIONS.initScrollReveal());
        _hydrateProjectIcons(document);
    },
  };
})()),
  (window.Portfolio.PROJECT_DETAILS_V2 = (function () {
    function t(e, t) {
      const a = document.getElementById(e);
      a && (a.textContent = t);
    }
    return {
      init: function () {
        const a = window.Portfolio.UTILS.getActivePage();
        if ("project-details" !== a && "project-details%20(2)" !== a) return;
        const i = _resolveProjectId(),
          n = window.Portfolio.PROJECTS[i];
        if (!n)
          return (
            console.warn(
              "[project-data.js] Unknown project id:",
              i,
              "— redirecting.",
            ),
            void (window.location.href = "/projects")
          );
        if (
          window.location.pathname.replace(/\/+$/, "").endsWith("project-details") &&
          i
        ) {
          const legacyTarget = _projectUrl(i);
          if (window.location.pathname + window.location.search !== legacyTarget) {
            window.history.replaceState(null, "", legacyTarget);
          }
        }
        (!(function (e) {
          document.title = `${e.name} — M Sohaib Ishaque`;
          const a = document.querySelector('meta[name="description"]');
          a &&
            a.setAttribute(
              "content",
              `${e.name} — ${e.subtitle} | M Sohaib Ishaque Portfolio`,
            );
          const i = document.getElementById("pd2-hero-title");
          if (i) {
            const t = (e.subtitle || e.badgeType || "").replace(/\.$/, "");
            i.innerHTML = `${e.name}<br /><span class="green">${t}</span>`;
          }
          t("pd2-hero-desc", e.desc);
          const n = e.meta || [],
            s = (e) => {
              const t = n.find(
                (t) => t.label && t.label.toLowerCase() === e.toLowerCase(),
              );
              return (t && t.value) || "";
            };
          (t("pd2-meta-client", s("Client")),
            t("pd2-meta-category", s("Category")),
            t("pd2-meta-status", s("Status")),
            t("pd2-meta-timeline", s("Timeline")));
          const o = document.getElementById("pd2-btn-live");
          o && (o.href = e.liveUrl || "#");
          const r = document.getElementById("pd2-btn-github");
          if (
            (r && (r.href = e.githubUrl || "#"),
            window.Portfolio.CAROUSEL &&
              window.Portfolio.CAROUSEL.initHeroSlider)
          ) {
            let t = (e.screenshots || []).map((t) => ({
              src: t.src,
              label: t.label || e.name,
            }));
            (!t.length &&
              e.heroImage &&
              (t = [{ src: e.heroImage, label: e.name }]),
              window.Portfolio.CAROUSEL.initHeroSlider(t));
          }
        })(n),
          (function (e) {
            const t = document.getElementById("pd2-tech-grid");
            t &&
              (t.innerHTML = (e.techStack || [])
                .map(
                  (e) =>
                    `\n      <div class="pd2-tech-card reveal">\n        <div class="pd2-tech-card-icon" aria-hidden="true">${_iconHtml(_resolveTechIcon(e))}</div>\n        <div class="pd2-tech-card-name">${e.name}</div>\n        <div class="pd2-tech-card-sub">${e.role}</div>\n      </div>`,
                )
                .join(""));
          })(n),
          (function (t) {
            const a = document.getElementById("pd2-features-grid");
            a &&
              (a.innerHTML = (t.features || [])
                .map(
                  (t) =>
                    `\n      <div class="pd2-feature-card reveal">\n        <div class="pd2-feature-icon" aria-hidden="true">\n          ${_iconHtml(_resolveProjectIcon(t.icon))}\n        </div>\n        <div class="pd2-feature-title">${t.title}</div>\n        <p class="pd2-feature-desc">${t.desc}</p>\n      </div>`,
                )
                .join(""));
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-timeline-grid");
            t &&
              (t.innerHTML = (e.timeline || [])
                .map(
                  (e, t) =>
                    `\n      <div class="pd2-tl-node reveal">\n        <div class="pd2-tl-dot">${String(t + 1).padStart(2, "0")}</div>\n        <div class="pd2-tl-content">\n          <div class="pd2-tl-phase">${e.heading}</div>\n          <div class="pd2-tl-duration">${e.phase}</div>\n          <p class="pd2-tl-desc">${e.text}</p>\n        </div>\n      </div>`,
                )
                .join(""));
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-screenshots-carousel");
            if (!t) return;
            const a = e.screenshots || [];
            t.innerHTML = a
              .map(
                (e) =>
                  `\n      <div class="pd2-screenshot-thumb">\n        <img src="${e.src}" alt="${e.label}" class="hero-img" loading="lazy" />\n      </div>`,
              )
              .join("");
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-metrics-grid");
            if (!t) return;
            const a = _METRIC_ICONS;
            t.innerHTML = (e.stats || [])
              .map(
                (e, t) =>
                  `\n      <div class="pd2-metric-item reveal">\n        <div class="pd2-metric-icon">\n          ${_iconHtml(a[t % a.length])}\n        </div>\n        <div>\n          <div class="pd2-metric-val" data-target="${e.num}" data-suffix="${e.suffix}">${e.num}${e.suffix}</div>\n          <div class="pd2-metric-label">${e.label}</div>\n          <div class="pd2-metric-desc">&nbsp;</div>\n        </div>\n      </div>`,
              )
              .join("");
            const i = t.querySelectorAll(".pd2-metric-val[data-target]"),
              n = new IntersectionObserver(
                (e) => {
                  e.forEach((e) => {
                    if (!e.isIntersecting) return;
                    const t = e.target,
                      a = t.dataset.target,
                      i = parseFloat(a),
                      s = t.dataset.suffix || "";
                    if (isNaN(i)) return void (t.textContent = a + s);
                    let o = 0;
                    const r = i / 87.5,
                      l = setInterval(() => {
                        ((o += r),
                          o >= i && ((o = i), clearInterval(l)),
                          (t.textContent =
                            (Number.isInteger(i)
                              ? Math.floor(o)
                              : o.toFixed(1)) + s));
                      }, 16);
                    n.unobserve(t);
                  });
                },
                { threshold: 0.5 },
              );
            i.forEach((e) => n.observe(e));
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-outcomes-list");
            if (!t) return;
            const a = (e.outcomes || []).filter(
              (e) => !e.title.toLowerCase().startsWith("challenge"),
            );
            t.innerHTML = a
              .map(
                (e) =>
                  `\n      <li class="pd2-oc-item">\n        <span class="pd2-oc-item-icon">\n          ${_iconHtml("siCheckmark")}\n        </span>\n        <div>\n          <div style="color:var(--white); font-size:0.88rem; font-weight:500; margin-bottom:0.2rem;">${e.title.replace(/^Outcome\s*[—–-]\s*/i, "")}</div>\n          <div style="color:var(--gray); font-size:0.78rem;">${e.desc}</div>\n        </div>\n      </li>`,
              )
              .join("");
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-challenges-list");
            if (!t) return;
            const a = (e.outcomes || []).filter((e) =>
              e.title.toLowerCase().startsWith("challenge"),
            );
            t.innerHTML = a
              .map(
                (e) =>
                  `\n      <li class="pd2-oc-item">\n        <span class="pd2-oc-item-icon" style="color: var(--gray-light);">\n          ${_iconHtml("siMinus")}\n        </span>\n        <div>\n          <div style="color:var(--white); font-size:0.88rem; font-weight:500; margin-bottom:0.2rem;">${e.title.replace(/^Challenge\s*[—–-]\s*/i, "")}</div>\n          <div style="color:var(--gray); font-size:0.78rem;">${e.desc}</div>\n        </div>\n      </li>`,
              )
              .join("");
          })(n),
          (function (e) {
            const t = document.getElementById("pd2-prev-link"),
              a = document.getElementById("pd2-prev-title"),
              i = document.getElementById("pd2-prev-sub"),
              n = document.getElementById("pd2-prev-project-img");
            if (e.prevProject) {
              const s = _projectUrl(e.prevProject.id);
              (t && (t.href = s),
                a && (a.textContent = e.prevProject.name),
                i && (i.textContent = e.prevProject.cat));
              const o = window.Portfolio.PROJECTS[e.prevProject.id];
              if (n && o) {
                const e = n.querySelector("img");
                e &&
                  ((e.src =
                    o.heroImage ||
                    (o.screenshots && o.screenshots[0]?.src) ||
                    ""),
                  (e.alt = o.name || ""));
              }
            } else {
              const e = document.querySelector(
                ".pd2-proj-nav-side:not(.right)",
              );
              e && (e.style.visibility = "hidden");
            }
            const s = document.getElementById("pd2-next-link"),
              o = document.getElementById("pd2-next-title"),
              r = document.getElementById("pd2-next-sub"),
              l = document.getElementById("pd2-next-project-img");
            if (e.nextProject) {
              const t = _projectUrl(e.nextProject.id);
              (s && (s.href = t),
                o && (o.textContent = e.nextProject.name),
                r && (r.textContent = e.nextProject.cat));
              const a = window.Portfolio.PROJECTS[e.nextProject.id];
              if (l && a) {
                const e = l.querySelector("img");
                e &&
                  ((e.src =
                    a.heroImage ||
                    (a.screenshots && a.screenshots[0]?.src) ||
                    ""),
                  (e.alt = a.name || ""));
              }
            } else {
              const e = document.querySelector(".pd2-proj-nav-side.right");
              e && (e.style.visibility = "hidden");
            }
          })(n),
          window.Portfolio.ANIMATIONS &&
            window.Portfolio.ANIMATIONS.initScrollReveal &&
            window.Portfolio.ANIMATIONS.initScrollReveal());
        _hydrateProjectIcons(document);
      },
    };
  })()),
  (window.Portfolio.PROJECT_LINKS = (function () {
    const e = {
      "al tahaluf's": "al-tahaluf",
      "nsric online education": "nsric",
      "stock management system": "stock-management",
      "stock management": "stock-management",
      "point of sale (pos) system": "point-of-sale",
      "point of sale system": "point-of-sale",
      "point of sale": "point-of-sale",
      "point-of-sale": "point-of-sale",
      qrmf: "qrmf",
      "simplicity trading wp": "simplicity-trading",
      "simplicity trading academy": "simplicity-trading",
      traveler: "traveler",
      "online quiz system": "online-quiz",
      "mila lifestyle": "mila-lifestyle",
      "kf movement": "kf-movement",
      jkjaac: "jkjaac",
      "windows 10 calculator web": "win10-calculator",
      "win10-calculator": "win10-calculator",
      "ask whitny": "ask-whitny",
      "chat application": "chat-app",
      "espn cricinfo clone": "espn-clone",
      "manii's gossips": "manii-gossips",
      "library management system": "library-management",
    };
    function t(t, a, i) {
      const n = t.querySelector(a),
        s = t.querySelector(i);
      if (!n || !s) return;
      const o = e[n.textContent.trim().toLowerCase()];
      o && (s.href = _projectUrl(o));
    }
    function a(e, t) {
      if (e.dataset.projectLinkBound === "true") return;
      e.dataset.projectLinkBound = "true";
      e.style.cursor = "pointer";
      e.addEventListener("click", (a) => {
        if (a.target.closest("a, button")) return;
        const i = e.querySelector(t);
        i && i.href && (window.location.href = i.href);
      });
    }
    return {
      init: function () {
        const i = window.Portfolio.UTILS.getActivePage();
        if ("projects" === i) {
          document.querySelectorAll(".pg-card").forEach((e) => {
            t(e, ".pg-name", ".pg-link");
            a(e, ".pg-link");
          });
        }
        if ("home" === i) {
          const e = document.getElementById("projects");
          e &&
            e.querySelectorAll(".ph-card").forEach((e) => {
              t(e, ".ph-title", ".ph-cta");
              a(e, ".ph-cta");
            });
        }
      },
    };
  })()),
  document.addEventListener("DOMContentLoaded", _initProjectModules));
