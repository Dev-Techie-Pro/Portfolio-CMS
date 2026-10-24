"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";
import { EXPERIENCE_TIMELINE_SECTION_HTML } from "@/lib/portfolio/experience-timeline-shell-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `<div id="mobile-nav-root" data-mobile-nav-root></div>
    <header class="navbar scrolled" role="banner">
      <div class="container">
        <div class="nav-inner">
          <a href="/" class="nav-logo" aria-label="Home">
            <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
            <div class="logo-text">
              <span class="logo-name">M Sohaib Ishaque</span>
              <span class="logo-role">Full Stack Web Developer</span>
            </div>
          </a>
          <nav class="nav-menu" aria-label="Main navigation">
            <a href="/" class="nav-link">Home</a>
            <a href="/about" class="nav-link">About</a>
            <a href="/skills" class="nav-link">Skills</a>
            <a href="/experience" class="nav-link active">Experience</a>
                        <a href="/projects" class="nav-link">Projects</a>
            <a href="/blogs" class="nav-link">Blogs</a>
            <a href="/testimonials" class="nav-link">Testimonials</a>
          </nav>
          <div class="nav-right-btns">
            <a href="/contact" class="nav-cta"> Hire Me <span class="icon" data-icon="siArrowTilt"></span>
            </a>
            <a href="#0" class="btn btn-outline" id="customizeBtn" aria-label="Customize" aria-expanded="false" aria-controls="customizePanel">
              <span class="icon" data-icon="siTheme"></span>
            </a>
           
          </div>
        </div>
      </div>
    </header>
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
                <span class="icon" data-icon="siCalendar"></span>
                <span class="exp-hero-stat-num">3+</span>
                <span class="exp-hero-stat-label">Years<br />Experience</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="siBuilding"></span>
                <span class="exp-hero-stat-num">3+</span>
                <span class="exp-hero-stat-label">Companies<br />Worked With</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="siCode"></span>
                <span class="exp-hero-stat-num">60+</span>
                <span class="exp-hero-stat-label">Projects<br />Delivered</span>
              </div>
              <div class="exp-hero-stat">
                <span class="icon" data-icon="siUsers"></span>
                <span class="exp-hero-stat-num">10+</span>
                <span class="exp-hero-stat-label">Team<br />Collaborations</span>
              </div>
            </div>

            <div class="exp-hero-cta-row">
              <a href="#exp-work" class="si-btn si-btn-primary">
                Explore My Experience
                <span class="icon" data-icon="siArrowRight"></span>
              </a>
              <a href="/about" class="btn btn-outline" >
                My Journey Story
                <span class="icon" data-icon="siArrowRight"></span>
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
                  <span class="icon" data-icon="siCode"></span>
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
              <a href="/contact" class="si-btn si-btn-primary"> Start a Project <span class="icon" data-icon="siArrowRight"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="site-footer" id="site-footer">
      <div class="footer-bg" aria-hidden="true">
        <span class="icon" data-icon="siGridDots"></span>
        <div class="footer-bg-glow-blob"></div>
        <div class="footer-bg-radar"></div>
        <div class="footer-bg-globe">
          <span class="icon" data-icon="siFooterGlobe"></span>
        </div>
        <div class="footer-bg-noise"></div>
      </div>
      <div class="footer-inner container">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand">
            <a href="#" class="nav-logo" aria-label="Home">
              <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
              <div class="logo-text">
                <span class="logo-name">M Sohaib Ishaque</span>
                <span class="logo-role">Full Stack Web Developer</span>
              </div>
            </a>
            <p class="brand-tagline">Building digital experiences that make an impact. Clean code, modern design, scalable solutions.</p>
            <div class="brand-rule" aria-hidden="true"></div>
            <div class="footer-cta-card">
              <div class="footer-cta-icon" aria-hidden="true">
                <span class="icon" data-icon="siSend"></span>
              </div>
              <h3 class="footer-cta-title">Let's work together</h3>
              <p class="footer-cta-text">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
              <a href="/contact" class="footer-cta-button"> Get In Touch <span class="icon" data-icon="siArrowTilt"></span>
              </a>
            </div>
          </div>
          <nav class="footer-col footer-col--nav" aria-labelledby="footer-nav-heading">
            <h3 class="footer-col-heading" id="footer-nav-heading">
              <span class="dot" aria-hidden="true"></span>Quick Links
            </h3>
            <ul class="footer-link-list">
              <li>
                <a href="/" class="footer-link-active">
                  <span class="dot dot--small" aria-hidden="true"></span>Home </a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/skills">Skills</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/experience">Experience</a>
              </li>
              <li>
                <a href="/testimonials">Testimonials</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
          <nav class="footer-col footer-col--services" aria-labelledby="footer-services-heading">
            <h3 class="footer-col-heading" id="footer-services-heading">
              <span class="dot" aria-hidden="true"></span>Technologies
            </h3>
            <ul class="footer-link-list">
              <li>
                <a href="/skills">Angular &amp; React</a>
              </li>
              <li>
                <a href="/skills">Next.js</a>
              </li>
              <li>
                <a href="/skills">Node.js</a>
              </li>
              <li>
                <a href="/skills">TypeScript</a>
              </li>
              <li>
                <a href="/skills">MongoDB</a>
              </li>
              <li>
                <a href="/skills">Tailwind CSS</a>
              </li>
            </ul>
          </nav>
          <div class="footer-col footer-col--contact" id="FooterContact">
            <h3 class="footer-col-heading">
              <span class="dot" aria-hidden="true"></span>Let's Connect
            </h3>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="siPhone"></span>
                </span>
                <span class="footer-contact-text">
                  <a href="tel:+15551234567">+92 3038464315</a>
                  <span class="footer-contact-sub">Mon - Fri, 9AM - 6PM EST</span>
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="siEnvelope"></span>
                </span>
                <span class="footer-contact-text">
                  <a href="mailto:engineer.sohaibishaque@gmail.com">engineer.sohaibishaque@gmail.com</a>
                  <span class="footer-contact-sub">I'll get back to you soon</span>
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="siLocationPin"></span>
                </span>
                <span class="footer-contact-text">
                  <span class="contact-static">Rawalpindi, Pakistan</span>
                  <span class="footer-contact-sub">Available for remote work</span>
                </span>
              </li>
            </ul>
            <ul class="footer-social-list" aria-label="Social media links">
              <li>
                <a href="https://github.com/Sohaib-Ishaque" class="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <span class="icon" data-icon="siGithub"></span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/" class="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <span class="icon" data-icon="siLinkedin"></span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" class="social-icon" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                <span class="icon" data-icon="siXcom"></span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <span class="icon" data-icon="siInstagram"></span>
                </a>
              </li>
            </ul>
            <p class="freelance-note">
              <strong>Available</strong> for freelance work <br />and exciting opportunities.
            </p>
${SITE_FOOTER_NEWSLETTER_HTML}
          </div>
        </div>
        <div class="footer-bottom">
          <div class="bottom-left">
            <span class="code-icon" aria-hidden="true">&lt;/&gt;</span>
            <span>Designed &amp; Built by <span class="accent">M Sohaib Ishaque</span>
            </span>
            <span class="icon" data-icon="siHeart"></span>
          </div>
          <div class="bottom-center"> &copy; 2025 <span class="accent">M Sohaib Ishaque</span>. All rights reserved. </div>
        </div>
      </div>
    </footer>`;

export function ExperienceContent() {
  return <PortfolioHtmlContent page="ExperienceContent" html={PAGE_HTML} />;
}
