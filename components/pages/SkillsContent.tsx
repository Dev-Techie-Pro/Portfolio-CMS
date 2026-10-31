"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SKILLS_GRID_PAGE_SHELL } from "@/lib/portfolio/skills-grid-shell-html";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `${getSiteHeaderHtml("skills")}
    <section class="skills-hero sh-hero" id="skills-hero" aria-label="Skills and expertise overview">
      <div class="sh-hero-grid">
        <div class="sh-copy reveal-left">
          <p class="skills-hero-label">My Expertise</p>
          <h1 class="exp-hero-heading">
            From Ideas to <br />
            <span class="accent">Solutions.</span>
          </h1>
          <p class="exp-hero-body">
            I combine technical skills, creative thinking, and problem-solving
            to build modern, scalable and impactful digital experiences.
          </p>
          <div class="exp-hero-stats">
            <div class="exp-hero-stat">
              <span class="icon" data-icon="ri-calendar-line"></span>
              <span class="exp-hero-stat-num">20+</span>
              <span class="exp-hero-stat-label">Technologies</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="ri-building-line"></span>
              <span class="exp-hero-stat-num">3+</span>
              <span class="exp-hero-stat-label">Years Experience</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="ri-code-line"></span>
              <span class="exp-hero-stat-num">100+</span>
              <span class="exp-hero-stat-label">Projects Built</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="ri-group-line"></span>
              <span class="exp-hero-stat-num">100%</span>
              <span class="exp-hero-stat-label">Commitment</span>
            </div>
          </div>

          <div class="exp-hero-cta-row">
            <a href="#technical-skills" class="si-btn si-btn-primary">
              Explore My Skills
              <span class="icon" data-icon="ri-arrow-right-line"></span>
            </a>
            <a href="/contact" class="btn btn-outline" >
              Hire Me
              <span class="icon" data-icon="ri-arrow-right-line"></span>
            </a>
          </div>
        </div>

        <div
          class="sh-visual reveal-right"
          role="img"
          aria-label="Diagram showing five core skill areas orbiting a central development icon: Frontend, Backend, Database, Tools and DevOps, and UI/UX"
        >
          <div class="sh-stage">
            <div class="sh-orbit-ring sh-r3" aria-hidden="true"></div>
            <div class="sh-orbit-ring sh-r2" aria-hidden="true"></div>
            <div class="sh-orbit-ring sh-r1" aria-hidden="true"></div>

            <span class="icon" data-icon="siSpokes"></span>

            <div class="sh-core">
              <span class="icon" data-icon="ri-code-line"></span>
            </div>

            <div class="sh-node sh-frontend">
              <div class="sh-node-circle">
                <span class="icon" data-icon="siReactJsWhite"></span>
              </div>
              <div class="sh-node-label">
                <span class="sh-node-title">Frontend</span>
                <span class="sh-node-sub">React, Next.js, Angular</span>
              </div>
            </div>

            <div class="sh-node sh-backend">
              <div class="sh-node-circle">
                <span class="icon" data-icon="siJavascriptWhite"></span>
              </div>
              <div class="sh-node-label">
                <span class="sh-node-title">Backend</span>
                <span class="sh-node-sub">Node.js, Express, .Net</span>
              </div>
            </div>

            <div class="sh-node sh-database">
              <div class="sh-node-label">
                <span class="sh-node-sub">MongoDB, MySQL,SQL</span>
                <span class="sh-node-title">Database</span>
              </div>
              <div class="sh-node-circle">
                <span class="icon" data-icon="siServer"></span>
              </div>
            </div>

            <div class="sh-node sh-devops">
              <div class="sh-node-label">
                <span class="sh-node-title">Tools &amp; DevOps</span>
                <span class="sh-node-sub">Git, Docker, AWS</span>
              </div>
              <div class="sh-node-circle">
                <span class="icon" data-icon="siDevOops"></span>
              </div>
            </div>

            <div class="sh-node sh-uiux">
              <div class="sh-node-circle">
                <span class="icon" data-icon="siTailwindCssWhite"></span>
              </div>
              <div class="sh-node-label">
                <span class="sh-node-title">UI / UX</span>
                <span class="sh-node-sub">Figma, Tailwind, CMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sh-mesh-wrap" aria-hidden="true">
        <span class="icon" data-icon="ri-layout-grid-line"></span>
      </div>
    </section>
    <section id="skills" aria-label="Technical expertise">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left ">
              <p class="section-label">Expertise</p>
              <h2 class="about-heading">What I Bring<br />
                <strong>to the Table</strong>
              </h2>
              <p class="section-desc reveal" >A curated stack of tools, languages, and frameworks I wield to build scalable, high-performance digital solutions — from concept to deployment.</p>
            </div>
          </div>
          ${SKILLS_GRID_PAGE_SHELL}
        </div>
      </div>
    </section>
    <section class="skills-section bg-2" id="technical-skills" aria-label="Other skills">
      <div class="container">        
        <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">Beyond Code</p>
            <h2 class="about-heading"> The Soft &  <br />
              <strong>Supporting Skills</strong>
            </h2>
            <p class="section-desc reveal" >The human-side capabilities and cross-functional strengths that amplify my technical work — enabling seamless collaboration, clear communication, and smarter problem-solving.</p>
          </div>
        </div>
        <div class="other-skills-grid">
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-code-line"></span>
            </div>
            <div class="other-skill-title">Clean Code</div>
            <p class="other-skill-desc">Writing maintainable, scalable and efficient code following best practices.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-flashlight-line"></span>
            </div>
            <div class="other-skill-title">Performance</div>
            <p class="other-skill-desc">Building fast, optimized applications with great user experience.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-computer-line"></span>
            </div>
            <div class="other-skill-title">Responsive Design</div>
            <p class="other-skill-desc">Creating seamless experiences across all devices and platforms.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-error-warning-line"></span>
            </div>
            <div class="other-skill-title">Problem Solving</div>
            <p class="other-skill-desc">I love solving complex problems and turning ideas into real-world solutions.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-group-line"></span>
            </div>
            <div class="other-skill-title">Collaboration</div>
            <p class="other-skill-desc">Working effectively in teams and communicating ideas clearly.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="skills-section si-ticker-section" aria-label="Tools and technologies">
      <div class="container">     
        <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">The Toolchain</p>
            <h2 class="about-heading"> Dev Environment   <br />
              <strong>& Tooling</strong>
            </h2>
            <p class="section-desc reveal" >A carefully selected suite of tools that streamlines my workflow, boosts productivity, and ensures consistency across every project.</p>
          </div>
        </div>
      </div>
      <div class="si-ticker-track-wrap" aria-label="Development tools">
        <div class="si-ticker-row-label">Tools</div>
        <div class="si-ticker-track si-ticker--left" id="ticker-tools" aria-hidden="true"></div>
      </div>
      <div class="si-ticker-track-wrap" aria-label="Technologies">
        <div class="si-ticker-row-label">Technologies</div>
        <div class="si-ticker-track si-ticker--right" id="ticker-technologies" aria-hidden="true"></div>
      </div>
      <div class="si-ticker-track-wrap" aria-label="AI tools">
        <div class="si-ticker-row-label">AI Tools</div>
        <div class="si-ticker-track si-ticker--left" id="ticker-ai" aria-hidden="true"></div>
      </div>
    </section>
    <section class="skills-section bg" aria-label="Continuous learning">
      <div class="container">  
        <div class="learning-inner">
          <div class="reveal-left">
            <div class="section-header">
              <div class="section-title-group reveal-left ">
                <p class="section-label">Always Evolving</p>
                <h2 class="about-heading"> What I'm  <br />
                  <strong>Exploring Next</strong>
                </h2>
                <p class=" reveal" >I'm always learning new technologies and improving my skills to stay up-to-date in the fast-evolving web development landscape.</p>
              </div>
            </div>
          </div>
          <div class="learning-cards reveal">
            <div class="learning-card">
              <div class="learning-card-icon" aria-hidden="true">
                <span class="icon" data-icon="ri-eye-line"></span>
              </div>
              <span class="learning-card-text">Explore modern frameworks and libraries</span>
            </div>
            <div class="learning-card">
              <div class="learning-card-icon" aria-hidden="true">
                <span class="icon" data-icon="ri-code-line"></span>
              </div>
              <span class="learning-card-text">Build real-world projects and solve challenges</span>
            </div>
            <div class="learning-card">
              <div class="learning-card-icon" aria-hidden="true">
                <span class="icon" data-icon="ri-book-open-line"></span>
              </div>
              <span class="learning-card-text">Read, learn and grow everyday</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${SITE_FOOTER_HTML}`;

export function SkillsContent() {
  return <PortfolioHtmlContent page="SkillsContent" html={PAGE_HTML} />;
}
