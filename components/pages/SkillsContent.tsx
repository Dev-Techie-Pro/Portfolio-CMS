"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SKILLS_GRID_PAGE_SHELL } from "@/lib/portfolio/skills-grid-shell-html";
import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";

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
            <a href="/skills" class="nav-link active">Skills</a>
            <a href="/experience" class="nav-link">Experience</a>
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
              <span class="icon" data-icon="siCalendar"></span>
              <span class="exp-hero-stat-num">20+</span>
              <span class="exp-hero-stat-label">Technologies</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="siBuilding"></span>
              <span class="exp-hero-stat-num">3+</span>
              <span class="exp-hero-stat-label">Years Experience</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="siCode"></span>
              <span class="exp-hero-stat-num">100+</span>
              <span class="exp-hero-stat-label">Projects Built</span>
            </div>
            <div class="exp-hero-stat">
              <span class="icon" data-icon="siUsers"></span>
              <span class="exp-hero-stat-num">100%</span>
              <span class="exp-hero-stat-label">Commitment</span>
            </div>
          </div>

          <div class="exp-hero-cta-row">
            <a href="#technical-skills" class="si-btn si-btn-primary">
              Explore My Skills
              <span class="icon" data-icon="siArrowRight"></span>
            </a>
            <a href="/contact" class="btn btn-outline" >
              Hire Me
              <span class="icon" data-icon="siArrowRight"></span>
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
              <span class="icon" data-icon="siCode"></span>
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
        <span class="icon" data-icon="siMeshWrap"></span>
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
              <span class="icon" data-icon="siCode"></span>
            </div>
            <div class="other-skill-title">Clean Code</div>
            <p class="other-skill-desc">Writing maintainable, scalable and efficient code following best practices.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="siSpark"></span>
            </div>
            <div class="other-skill-title">Performance</div>
            <p class="other-skill-desc">Building fast, optimized applications with great user experience.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="siMonitor"></span>
            </div>
            <div class="other-skill-title">Responsive Design</div>
            <p class="other-skill-desc">Creating seamless experiences across all devices and platforms.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="siExclamination"></span>
            </div>
            <div class="other-skill-title">Problem Solving</div>
            <p class="other-skill-desc">I love solving complex problems and turning ideas into real-world solutions.</p>
          </div>
          <div class="other-skill-card reveal">
            <div class="other-skill-icon" aria-hidden="true">
              <span class="icon" data-icon="siUsers"></span>
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
                <span class="icon" data-icon="siEye"></span>
              </div>
              <span class="learning-card-text">Explore modern frameworks and libraries</span>
            </div>
            <div class="learning-card">
              <div class="learning-card-icon" aria-hidden="true">
                <span class="icon" data-icon="siCode"></span>
              </div>
              <span class="learning-card-text">Build real-world projects and solve challenges</span>
            </div>
            <div class="learning-card">
              <div class="learning-card-icon" aria-hidden="true">
                <span class="icon" data-icon="siBookOpen"></span>
              </div>
              <span class="learning-card-text">Read, learn and grow everyday</span>
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

export function SkillsContent() {
  return <PortfolioHtmlContent page="SkillsContent" html={PAGE_HTML} />;
}
