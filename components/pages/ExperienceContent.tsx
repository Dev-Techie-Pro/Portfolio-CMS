"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";
import { EXPERIENCE_TIMELINE_SECTION_HTML } from "@/lib/portfolio/experience-timeline-shell-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `${getSiteHeaderHtml("experience")}
    <section class="exp-hero" id="exp-hero" aria-label="Experience hero">
      <canvas id="hero-canvas" aria-hidden="true"></canvas>
      <div class="exp-hero-bg" aria-hidden="true"></div>
      <div class="hero-glow-blob b1" aria-hidden="true"></div>
      <div class="hero-glow-blob b2" aria-hidden="true"></div>
      <div class="hero-glow-blob b3" aria-hidden="true"></div>
      <div class="hero-scan-line" aria-hidden="true"></div>
      <div class="hero-bracket tl" aria-hidden="true"></div>
      <div class="hero-bracket tr" aria-hidden="true"></div>
      <div class="hero-bracket bl" aria-hidden="true"></div>
      <div class="hero-bracket br" aria-hidden="true"></div>
      <div class="hero-symbols" aria-hidden="true" id="heroSymbols"></div>
      <div class="container">
        <div class="exp-hero-inner">
          <div class="reveal-left">
            <p class="exp-hero-label">My Journey</p>
            <h1 class="exp-hero-heading">
              Experience That  <br />
              <span class="accent">Drives Excellence.</span>
            </h1>
            <p class="exp-hero-body">
              A journey of continuous learning, building impactful solutions, and
              delivering value through code and collaboration.
            </p>

            <div class="exp-hero-stats">
              <div class="exp-hero-stat">
                <span class="icon" data-icon="ri-calendar-line"></span>
                <span class="exp-hero-stat-num">3+</span>
                <span class="exp-hero-stat-label">Years<br />Experience</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="ri-building-line"></span>
                <span class="exp-hero-stat-num">3+</span>
                <span class="exp-hero-stat-label">Companies<br />Worked With</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="ri-code-line"></span>
                <span class="exp-hero-stat-num">60+</span>
                <span class="exp-hero-stat-label">Projects<br />Delivered</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="ri-group-line"></span>
                <span class="exp-hero-stat-num">10+</span>
                <span class="exp-hero-stat-label">Team<br />Collaborations</span>
              </div>
            </div>

            <div class="exp-hero-cta-row">
              <a href="#exp-work" class="si-btn si-btn-primary">
                Explore My Experience
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
              <a href="/about" class="btn btn-outline" >
                My Journey Story
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </div>
          </div>
          <div class="exp-hero-visual reveal-right">
            <div class="exp-path-wrap">
              <span class="icon" data-icon="siPath"></span>
              <div class="exp-milestone" style="--x:-5%; --y:90%;">
                <div class="exp-milestone-top">
                  <span class="icon" data-icon="siGruadutionCap"></span>
                  <span class="exp-milestone-badge">2020</span>
                </div>
                <h4 class="exp-milestone-title">Learning &amp; Growing</h4>
                <p class="exp-milestone-desc">Started my journey in web development and fell in love with code.</p>
              </div>
              <div class="exp-milestone" style="--x:8%; --y:65%;">
                <div class="exp-milestone-top">
                  <span class="icon" data-icon="siServer"></span>
                  <span class="exp-milestone-badge">2021</span>
                </div>
                <h4 class="exp-milestone-title">Backend Developer</h4>
                <p class="exp-milestone-desc">Developed robust APIs and database solutions ensuring performance.</p>
              </div>
              <div class="exp-milestone" style="--x:17%; --y:38%;">
                <div class="exp-milestone-top">
                  <span class="icon" data-icon="ri-code-line"></span>
                  <span class="exp-milestone-badge">2023</span>
                </div>
                <h4 class="exp-milestone-title">Frontend Developer</h4>
                <p class="exp-milestone-desc">Crafted responsive and interactive user interfaces with modern technologies.</p>
              </div>
              <div class="exp-milestone is-now" style="--x:25%; --y:12%;">
                <div class="exp-milestone-top">
                  <span class="icon" data-icon="siRocketS"></span>
                  <span class="exp-milestone-badge">Now</span>
                </div>
                <h4 class="exp-milestone-title">Full Stack Developer</h4>
                <p class="exp-milestone-desc">Building scalable web applications and impactful digital solutions.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
    ${EXPERIENCE_TIMELINE_SECTION_HTML}
    <section class="cta-banner" aria-label="Call to action">
      <div class="cta-geo" aria-hidden="true"></div>
      <div class="cta-sphere-wrap" aria-hidden="true">
        <canvas class="cta-sphere-canvas" id="ctaSphereCanvas" width="500" height="400"></canvas>
      </div>
      <div class="container">
        <div class="cta-inner">
          <div class="reveal-left">
            <div class="cta-eyebrow">
              <span class="cta-eyebrow-line"></span>
              <span class="cta-eyebrow-text">LET'S BUILD TOGETHER</span>
            </div>
            <h2 class="cta-heading"> READY TO BUILD <br> SOMETHING <span class="accent">EXTRAORDINARY?</span>
            </h2>
            <p class="cta-sub">Let's create something amazing together. Have a project in mind? I'd love to hear about it.</p>
            <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:2.5rem;">
              <a href="/contact" class="si-btn si-btn-primary"> Start a Project <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${SITE_FOOTER_HTML}`;

export function ExperienceContent() {
  return <PortfolioHtmlContent page="ExperienceContent" html={PAGE_HTML} />;
}
