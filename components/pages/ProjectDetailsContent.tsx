"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `${getSiteHeaderHtml("projects")}

    <section class="project-details-hero" aria-label="Project hero">
      <span class="icon" data-icon="siWaveBg"></span>
      <div class="pdh-glow" aria-hidden="true"></div>

      <div class="container">
        <div class="pdh-inner">
        <div class="hero-copy reveal-left">
          <div class="reveal-left pdp-head">
                <a href="/projects" class="pdh-breadcrumb" aria-label="Back to projects">
                  <span class="icon" data-icon="ri-arrow-left-s-line"></span>
                  Back to Projects
                </a>
                <h1 id="pd2-hero-title" class="about-hero-heading"></h1>
                <p id="pd2-hero-desc" class="about-hero-body"></p>
          </div>
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-icon accent">
                  <span class="icon" data-icon="ri-user-line"></span>
              </div>
              <div>
                <div class="stat-num">Client</div>
                <div class="stat-label" id="pd2-meta-client"></div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon accent">
                  <span class="icon" data-icon="ri-calendar-line"></span>
              </div>
              <div>
                <div class="stat-num">Category</div>
                <div class="stat-label" id="pd2-meta-category"></div>
              </div>
            </div>
          </div>
          <div class="stats-row">
            <div class="pdh-meta-item">
              <span class="accent">
                <span class="icon" data-icon="siStutasDot"></span>
              </span>&nbsp;
              Status: <strong id="pd2-meta-status"></strong>
            </div> <div class="pdh-meta-row">
            <div class="pdh-meta-item">
              <span class="pdh-meta-icon">
                <span class="icon" data-icon="ri-time-line"></span>
              </span>
              Timeline: <strong id="pd2-meta-timeline"></strong>
            </div>
          </div>
          </div>
          <div class="exp-hero-cta-row"><div class="pdh-btns">
              <a id="pd2-btn-live" href="#" class="si-btn si-btn-primary">
                <span class="icon" data-icon="ri-play-line"></span>
                View Live
              </a>
              <a id="pd2-btn-github" href="https://github.com/Sohaib-Ishaque/" class="btn btn-outline" >
                <span class="icon" data-icon="ri-code-line"></span>
                View Code
              </a>
            </div>
          </div>
        </div>
          <div class="pdh-mockup reveal-right">
            <div class="hero-visual">
              <div class="orbit-ring r1"></div>
              <div class="orbit-ring r2"></div>
              <div class="orbit-dot" style="width:6px;height:6px;background:var(--accent);color:var(--accent);top:8%;left:12%;"></div>
              <div class="orbit-dot" style="width:4px;height:4px;background:var(--accent);color:var(--accent);bottom:14%;right:8%;"></div>
              <div class="orbit-dot" style="width:5px;height:5px;background:var(--accent);color:var(--accent);top:60%;left:2%;"></div>
              <div class="card-stack pd-card-stack" id="cardStack">
                <div class="proj-nav">
                  <div class="nav-pro-btn proj-prev" id="pd2-slider-prev" aria-label="Previous screenshot">
                    <span class="icon" data-icon="ri-arrow-left-s-line"></span>
                  </div>
                  <div class="nav-pro-btn proj-next" id="pd2-slider-next" aria-label="Next screenshot">
                    <span class="icon" data-icon="ri-arrow-right-s-line"></span>
                  </div>
                </div>
                <div class="pro-paginations" id="pd2-slider-dots"></div>
              </div>
                <div class="scroll-cue">
                  <div class="mouse"></div>
                  Scroll to explore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pd2-section pd2-section-dark" aria-label="Technology stack">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">The Build</p>
            <h2 class="about-heading"> Cutting-Edge Tech,<br />
              <strong>  Solid Foundation.</strong>
            </h2>
            <p class="section-desc reveal" ></p>
          </div>
        </div>
        <p class="pd2-subtext"></p>
        <div id="pd2-tech-grid" class="pd2-tech-grid">
          <div class="pd2-tech-card reveal" >
            <div class="pd2-tech-card-icon">
              <span class="icon" data-icon="siAngularJs"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
          <div class="pd2-tech-card reveal" >
            <div class="pd2-tech-card-icon" >
              <span class="icon" data-icon="ri-flag-line"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
          <div class="pd2-tech-card reveal">
            <div class="pd2-tech-card-icon" >
              <span class="icon" data-icon="siServer"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
          <div class="pd2-tech-card reveal" >
            <div class="pd2-tech-card-icon" >
              <span class="icon" data-icon="siTypescript"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
          <div class="pd2-tech-card reveal" >
            <div class="pd2-tech-card-icon">
              <span class="icon" data-icon="siTailwindcss"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
          <div class="pd2-tech-card reveal" >
            <div class="pd2-tech-card-icon" >
              <span class="icon" data-icon="siGit"></span>
            </div>
            <div class="pd2-tech-card-name"></div>
            <div class="pd2-tech-card-sub"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="pd2-section pd2-section-black" aria-label="Key features">
      <div class="container">
         <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">Functionality</p>
            <h2 class="about-heading"> Core Modules <br />
              <strong>& System Logic.</strong>
            </h2>
          <p class="section-desc reveal" >Built to handle complex enterprise requirements with a clean, modular architecture.</p>
          </div>
        </div>
        <div id="pd2-features-grid" class="pd2-features-grid">
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-user-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-apps-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-emoji-sticker-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-bar-chart-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-lock-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-file-text-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-smartphone-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
          <div class="pd2-feature-card reveal">
            <div class="pd2-feature-icon">
              <span class="icon" data-icon="ri-notification-line"></span>
            </div>
            <div class="pd2-feature-title"></div>
            <p class="pd2-feature-desc"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="pd2-section pd2-section-dark" aria-label="Project timeline">
      <div class="container">
         <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">Project Timeline</p>
            <h2 class="about-heading"> How It Was<br />
              <strong> Built.</strong>
            </h2>
            <p class="section-desc reveal" >From setting up the environment to deploying in production—chronicling the architecture decisions, debugging sessions, and optimizations along the way.</p>
          </div>
        </div>
        <div class="pd2-timeline-wrap">
          <div class="pd2-timeline-track" aria-hidden="true">
            <div class="pd2-timeline-fill"></div>
          </div>
          <div id="pd2-timeline-grid" class="pd2-timeline-grid">
            <div class="pd2-tl-node reveal">
              <div class="pd2-tl-dot"></div>
              <div class="pd2-tl-content">
                <div class="pd2-tl-phase"></div>
                <div class="pd2-tl-duration">1 Week</div>
                <p class="pd2-tl-desc"></p>
              </div>
            </div>
            <div class="pd2-tl-node reveal">
              <div class="pd2-tl-dot"></div>
              <div class="pd2-tl-content">
                <div class="pd2-tl-phase"></div>
                <div class="pd2-tl-duration">2 Weeks</div>
                <p class="pd2-tl-desc"></p>
              </div>
            </div>
            <div class="pd2-tl-node reveal">
              <div class="pd2-tl-dot"></div>
              <div class="pd2-tl-content">
                <div class="pd2-tl-phase"></div>
                <div class="pd2-tl-duration">3 Weeks</div>
                <p class="pd2-tl-desc"></p>
              </div>
            </div>
            <div class="pd2-tl-node reveal">
              <div class="pd2-tl-dot"></div>
              <div class="pd2-tl-content">
                <div class="pd2-tl-phase"></div>
                <div class="pd2-tl-duration">4 Weeks</div>
                <p class="pd2-tl-desc"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pd2-section pd2-section-black" aria-label="Project screenshots">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left ">
              <p class="section-label">Project Gallery</p>
              <h2 class="about-heading">UI & Interface<br />
                <strong>  Previews.</strong>
              </h2>
            <p class="section-desc reveal" >Visual references showcasing the layout, responsiveness, and design language implemented across the application..</p>
            </div>
        </div>
        <div class="pd2-screenshots-wrap">
          <div id="pd2-screenshots-carousel" class="pd2-screenshots-carousel reveal">
            <div class="pd2-screenshot-thumb">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782850256/placeholder_rmxkhu.png" alt="project screenshot" class="hero-img" loading="lazy" />
            </div>
            <div class="pd2-screenshot-thumb">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782850256/placeholder_rmxkhu.png" alt="project screenshot" class="hero-img" loading="lazy" />
            </div>
            <div class="pd2-screenshot-thumb">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782850256/placeholder_rmxkhu.png" alt="project screenshot" class="hero-img" loading="lazy" />
            </div>
            <div class="pd2-screenshot-thumb">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_800/v1782850256/placeholder_rmxkhu.png" alt="project screenshot" class="hero-img" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pd2-section pd2-section-dark" aria-label="Performance metrics">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left ">
              <p class="section-label">The Impact</p>
              <h2 class="about-heading">Measurable Results,<br />
                <strong>Tangible Outcomes.</strong>
              </h2>
              <p class="section-desc reveal" >Data-driven insights that validate our approach—showcasing speed, reliability, and efficiency gains that directly translate to real-world value.</p>
            </div>
        </div>
        <div id="pd2-metrics-grid" class="pd2-metrics-grid">
          <div class="pd2-metric-item reveal">
            <div class="pd2-metric-icon">
              <span class="icon" data-icon="ri-calendar-line"></span>
            </div>
            <div>
              <div class="pd2-metric-val">8 wk</div>
              <div class="pd2-metric-label">Delivery Time</div>
              <div class="pd2-metric-desc">On-time Delivery</div>
            </div>
          </div>
          <div class="pd2-metric-item reveal">
            <div class="pd2-metric-icon">
              <span class="icon" data-icon="ri-time-line"></span>
            </div>
            <div>
              <div class="pd2-metric-val">97/100</div>
              <div class="pd2-metric-label">Performance Score</div>
              <div class="pd2-metric-desc">Lighthouse Score</div>
            </div>
          </div>
          <div class="pd2-metric-item reveal">
            <div class="pd2-metric-icon">
              <span class="icon" data-icon="ri-apps-line"></span>
            </div>
            <div>
              <div class="pd2-metric-val">18+</div>
              <div class="pd2-metric-label">Custom Modules</div>
              <div class="pd2-metric-desc">Built &amp; Integrated</div>
            </div>
          </div>
          <div class="pd2-metric-item reveal">
            <div class="pd2-metric-icon">
              <span class="icon" data-icon="ri-emotion-line"></span>
            </div>
            <div>
              <div class="pd2-metric-val">100%</div>
              <div class="pd2-metric-label">Client Satisfaction</div>
              <div class="pd2-metric-desc">Positive Feedback</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style="border-top:1px solid var(--border);" aria-label="Outcomes and challenges">
      <div class="pd2-oc-grid">
        <div class="pd2-oc-col">
          <div class="pd2-oc-geo" aria-hidden="true">
            <span class="icon" data-icon="siDoubleCircle"></span>
          </div>
          <div class="section-header">
            <div class="section-title-group reveal-left ">
                <p class="section-label">Outcomes</p>
                <h2 class="about-heading">Project<br />
                  <strong>Outcomes</strong>
                </h2>
              </div>
          </div>
          <ul id="pd2-outcomes-list" class="pd2-oc-list">
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon">
                <span class="icon" data-icon="ri-check-line"></span>
              </span>
              Streamlined operations and improved efficiency.
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon">
                <span class="icon" data-icon="ri-check-line"></span>
              </span>
              Centralized management of users, roles, and modules.
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon">
                <span class="icon" data-icon="ri-check-line"></span>
              </span>
              Real-time insights through advanced analytics.
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon">
                <span class="icon" data-icon="ri-check-line"></span>
              </span>
              Scalable architecture for future enhancements.
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon">
                <span class="icon" data-icon="ri-check-line"></span>
              </span>
              Enhanced security with role-based access control.
            </li>
          </ul>
        </div>

        <div class="pd2-oc-col">
          <div class="pd2-oc-geo" aria-hidden="true" style="opacity:0.3; right:2rem; bottom:2rem;">
            <span class="icon" data-icon="ri-copy-line"></span>
          </div>
          <div class="section-header">
            <div class="section-title-group reveal-left ">
                <p class="section-label">Challenges</p>
                <h2 class="about-heading">Challenges &amp;<br />
                  <strong>Solutions</strong>
                </h2>
              </div>
          </div>
          <ul id="pd2-challenges-list" class="pd2-oc-list">
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon" style="color: var(--gray-light);">
                <span class="icon" data-icon="ri-subtract-line"></span>
              </span>
              <div>
                <div style="color:var(--white); font-size:0.88rem; font-weight:500; margin-bottom:0.2rem;">Complex business logic and workflows</div>
                <div style="color:var(--gray); font-size:0.78rem;">Solved with modular architecture and clean code practices.</div>
              </div>
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon" style="color: var(--gray-light);">
                <span class="icon" data-icon="ri-subtract-line"></span>
              </span>
              <div>
                <div style="color:var(--white); font-size:0.88rem; font-weight:500; margin-bottom:0.2rem;">Performance optimization for large datasets</div>
                <div style="color:var(--gray); font-size:0.78rem;">Implemented caching and query optimization.</div>
              </div>
            </li>
            <li class="pd2-oc-item">
              <span class="pd2-oc-item-icon" style="color: var(--gray-light);">
                <span class="icon" data-icon="ri-subtract-line"></span>
              </span>
              <div>
                <div style="color:var(--white); font-size:0.88rem; font-weight:500; margin-bottom:0.2rem;">Ensuring data security and access control</div>
                <div style="color:var(--gray); font-size:0.78rem;">Applied JWT, role-based permissions, and audit logs.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div class="pd2-proj-nav" aria-label="Navigate between projects">
      <div class="container">
        <div class="pd2-proj-nav-inner">
          <a id="pd2-prev-link" href="#" class="pd2-proj-nav-side">
            <div class="pd2-proj-nav-arrow">
              <span class="icon" data-icon="ri-arrow-left-s-line"></span>
            </div>
            <div class="pd2-proj-nav-thumb">
              <div class="pd2-proj-nav-thumb-inner" id="pd2-prev-project-img">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_400/v1782723661/mila-estore-1_adwekq.webp" alt="PGN">
              </div>
            </div>
            <div>
              <div class="pd2-proj-nav-label">Previous Project</div>
              <div id="pd2-prev-title" class="pd2-proj-nav-title">M Square</div>
              <div id="pd2-prev-sub" class="pd2-proj-nav-sub">Real Estate Platform</div>
            </div>
          </a>
          <a href="/projects" class="pd2-proj-nav-center" aria-label="All projects">
            <div class="pd2-proj-nav-grid">
              <div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div>
              <div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div>
              <div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div><div class="pd2-proj-nav-grid-dot"></div>
            </div>
          </a>
          <a id="pd2-next-link" href="#" class="pd2-proj-nav-side right">
            <div class="pd2-proj-nav-arrow">
              <span class="icon" data-icon="ri-arrow-right-s-line"></span>
            </div>
            <div class="pd2-proj-nav-thumb">
              <div class="pd2-proj-nav-thumb-inner" id="pd2-next-project-img">
                <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/f_auto,q_auto,w_400/v1782723661/mila-estore-1_adwekq.webp" alt="PGN">
              </div>
            </div>
            <div>
              <div class="pd2-proj-nav-label">Next Project</div>
              <div id="pd2-next-title" class="pd2-proj-nav-title">Vision Advertising</div>
              <div id="pd2-next-sub" class="pd2-proj-nav-sub">Creative Agency Website</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    ${SITE_FOOTER_HTML}`;

export function ProjectDetailsContent() {
  return <PortfolioHtmlContent page="ProjectDetailsContent" html={PAGE_HTML} />;
}
