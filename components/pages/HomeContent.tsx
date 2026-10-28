"use client";

import { useEffect } from "react";
import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SKILLS_GRID_HOME_SHELL } from "@/lib/portfolio/skills-grid-shell-html";
import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";
import { EXPERIENCE_TIMELINE_SECTION_HTML } from "@/lib/portfolio/experience-timeline-shell-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `<div id="mobile-nav-root" data-mobile-nav-root></div>
    <header class="navbar" role="banner">
      <div class="container">
        <div class="nav-inner">
          <a
            href="/"
            class="nav-logo"
            aria-label="M Sohaib Ishaque — Home"
          >
            <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
            <div class="logo-text">
              <span class="logo-name">M Sohaib Ishaque</span>
              <span class="logo-role">Full Stack Web Developer</span>
            </div>
          </a>
          <nav class="nav-menu" aria-label="Main navigation">
            <a href="/" class="nav-link active">Home</a>
            <a href="/about" class="nav-link">About</a>
            <a href="/skills" class="nav-link">Skills</a>
            <a href="/experience" class="nav-link">Experience</a>
                        <a href="/projects" class="nav-link">Projects</a>
            <a href="/blogs" class="nav-link">Blogs</a>
            <a href="/testimonials" class="nav-link">Testimonials</a>
          </nav>
          <div class="nav-right-btns">
            <a href="/contact" class="nav-cta">
              Hire Me <span class="icon" data-icon="ri-arrow-right-up-line"></span>
            </a>
            <a
              href="#0"
              class="btn btn-outline"
              id="customizeBtn"
              aria-label="Customize"
              aria-expanded="false"
              aria-controls="paCustomPanel"
            >
              <span class="icon" data-icon="ri-palette-line"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
    <section id="home" class="hero-v2" aria-label="Hero">
      <div class="container">
        <div class="hero-v2-inner">
          <div class="hv2-intro">
            <p class="hero-label" aria-hidden="true">
              Full Stack Web Developer
            </p>
            <h1 class="hero-headline">
              <span class="line-white glitch-word" data-orig="Engr">Engr</span>
              <span class="line-white glitch-word" data-orig="M Sohaib"
                >M Sohaib</span
              >
              <span class="line-accent glitch-word" data-orig="Ishaque"
                >Ishaque</span
              >
            </h1>
            <p
              class="hero-sub"
              data-text="I craft fast, responsive and scalable web applications with modern technologies and clean code."
            ></p>
            <div class="hv2-ctas">
              <a href="/projects" class="si-btn si-btn-primary">
                View My Work
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
              <a
                href="/assets/Sohaib_Ishaque_CV.pdf"
                class="btn btn-outline"
                download
              >
                Download CV
                <span class="icon" data-icon="ri-download-line"></span>
              </a>
            </div>

            <div class="hv2-stats">
              <div class="hv2-stat">
                <span class="hv2-stat-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-briefcase-2-line"></span>
                </span>
                <span class="hv2-dir">
                  <span class="hv2-stat-num" data-count="65" data-suffix="+"
                    >65+</span
                  >
                  <span class="hv2-stat-label">Projects Completed</span>
                </span>
              </div>
              <div class="hv2-stat">
                <span class="hv2-stat-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-group-line"></span>
                </span>
                <span class="hv2-dir">
                  <span class="hv2-stat-num" data-count="20" data-suffix="+"
                    >20+</span
                  >
                  <span class="hv2-stat-label">Happy Clients</span>
                </span>
              </div>
              <div class="hv2-stat">
                <span class="hv2-stat-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-star-line"></span>
                </span>
                <span class="hv2-dir">
                  <span class="hv2-stat-num" data-count="3" data-suffix="+"
                    >3+</span
                  >
                  <span class="hv2-stat-label">Years Experience</span>
                </span>
              </div>
            </div>
          </div>
          <div class="hv2-visual">
            <div class="hv2-portrait-wrap">
              <div class="hv2-glow" aria-hidden="true"></div>
              <span class="icon" data-icon="siMonogram"></span>

              <img
                src="https://res.cloudinary.com/dpx3gst4q/image/upload/v1785336732/sohaib-ishaque_s8xspn.png"
                alt="M Sohaib Ishaque — Full Stack Web Developer"
                class="hv2-portrait"
                loading="eager"
              />

              <div class="hv2-terminal" aria-hidden="true">
                <div class="hv2-terminal-dots">
                  <span></span><span></span><span></span>
                </div>
                <div>
                  <pre class="hv2-terminal-code-flex">
                    <div><span class="ln">1 </span><span class="hv2-tk-comment"> // What I Do</span></div>
                    <div><span class="ln">2 </span><span class="hv2-tk-key"> const</span> <span class="hv2-tk-var">developer</span> <span class="hv2-tk-punct">= {</span></div>
                    <div><span class="ln pr-5">3</span>passion: <span class="hv2-tk-str">'Building Digital Experiences'</span><span class="hv2-tk-punct">,</span></div>
                    <div><span class="ln pr-5">4</span>focus: <span class="hv2-tk-str">'Clean Code &amp; Performance'</span><span class="hv2-tk-punct">,</span></div>
                    <div><span class="ln pr-5">5</span>goal: <span class="hv2-tk-str">'Client Success'</span></div>
                    <div><span class="ln">6</span><span class="hv2-tk-punct">  };</span></div>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div class="hv2-side">
            <div>
              <p class="hv2-eyebrow">What I Do</p>
              <div class="hv2-services-grid">
                <div class="hv2-service-card">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="siDisplay"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">Web Design</span>
                  </span>
                </div>
                <div class="hv2-service-card">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-edit-line"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">UI/UX Design</span>
                  </span>
                </div>
                <div class="hv2-service-card span-2">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-code-line"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">Web Development</span>
                  </span>
                </div>
                <div class="hv2-service-card span-2">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-download-line"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">API Development</span>
                  </span>
                </div>
                <div class="hv2-service-card">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="siServer"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">Database Design</span>
                  </span>
                </div>
                <div class="hv2-service-card">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-flashlight-line"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">Performance</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p class="hv2-eyebrow">Available For</p>
              <a href="/contact" class="hv2-available">
                <span class="hv2-available-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-send-plane-line"></span>
                </span>
                <span>
                  <span class="hv2-available-title">Freelance Projects</span>
                  <span class="hv2-available-sub"
                    >Let's build something amazing together.</span
                  >
                  <span class="hv2-available-link">
                    Let's Talk
                    <span class="icon" data-icon="ri-arrow-right-line"></span>
                  </span>
                </span>
              </a>
            </div>

            <div>
              <p class="hv2-social-label">Follow Me On</p>
              <ul class="footer-social-list" aria-label="Social media links">
                <li>
                  <a
                    href="https://github.com/Sohaib-Ishaque"
                    class="social-icon"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-github-fill"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/"
                    class="social-icon"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-linkedin-fill"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    class="social-icon"
                    aria-label="Twitter / X"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-twitter-x-fill"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/"
                    class="social-icon"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-instagram-line"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="metrics" aria-label="Key achievements">
      <div class="container">
        <div class="metrics-grid">
          <div class="metric-item reveal">
            <div class="metric-icon u-flex-center" aria-hidden="true">
              <span class="icon" data-icon="ri-code-line"></span>
            </div>
            <div>
              <div class="metric-num">
                <span data-target="3" data-suffix="+">0+</span>
              </div>
              <div class="metric-label">Years Experience</div>
            </div>
          </div>
          <div class="metric-item reveal">
            <div class="metric-icon u-flex-center" aria-hidden="true">
              <span class="icon" data-icon="ri-briefcase-line"></span>
            </div>
            <div>
              <div class="metric-num">
                <span data-target="60" data-suffix="+">0+</span>
              </div>
              <div class="metric-label">Projects Completed</div>
            </div>
          </div>
          <div class="metric-item reveal">
            <div class="metric-icon u-flex-center" aria-hidden="true">
              <span class="icon" data-icon="ri-star-line"></span>
            </div>
            <div>
              <div class="metric-num">
                <span data-target="99" data-suffix="%">0%</span>
              </div>
              <div class="metric-label">Client Satisfaction</div>
            </div>
          </div>
          <div class="metric-item reveal">
            <div class="metric-icon u-flex-center" aria-hidden="true">
              <span class="icon" data-icon="ri-phone-line"></span>
            </div>
            <div>
              <div class="metric-num">24/7</div>
              <div class="metric-label">Support &amp; Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" aria-label="About me">
      <div class="container">
        <div class="section-wrap">
          <div class="about-grid">
            <div class="reveal-left">
              <span class="accent-tag">About Me</span>
              <h2 class="about-heading">
                Passionate About <br />
                <strong>Building Solutions</strong>
              </h2>
              <p class="about-body">
                I'm a Full Stack Web Developer with 3+ years of professional
                experience building clean, user-friendly and performant web
                applications. I specialize in Angular, .NET Core, and modern
                JavaScript frameworks — turning complex problems into simple,
                beautiful and intuitive solutions.
              </p>
              <p class="about-body">
                From enterprise-grade Angular/.NET systems at Media@Marsons
                Islamabad to .NET desktop and web applications at Oxygen Soft
                Lahore, I bring cross-domain experience and a relentless focus
                on delivering quality software that drives real results.
              </p>
              <a
                href="/"
                class="si-btn si-btn-primary"
                style="margin-top: 0.5rem"
              >
                More About Me <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </div>
            <div class="about-values reveal-right">
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-code-line"></span>
                </div>
                <h3 class="value-title">Clean Code</h3>
                <p class="value-desc">
                  Writing maintainable, scalable and efficient code following
                  best practices and design patterns.
                </p>
              </div>
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-flashlight-line"></span>
                </div>
                <h3 class="value-title">Performance</h3>
                <p class="value-desc">
                  Building fast, optimized applications with great user
                  experience through caching, async programming and query
                  optimization.
                </p>
              </div>
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-computer-line"></span>
                </div>
                <h3 class="value-title">Responsive</h3>
                <p class="value-desc">
                  Creating seamless experiences across all devices and platforms
                  with cross-device compatibility.
                </p>
              </div>
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-error-warning-line"></span>
                </div>
                <h3 class="value-title">Problem Solver</h3>
                <p class="value-desc">
                  I love solving complex problems and turning ideas into
                  real-world solutions with creative engineering approaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="skills" aria-label="Technical expertise">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Stack Deep Dive</p>
              <h2 class="about-heading">
                The Tech<br />
                <strong> I Live In</strong>
              </h2>
              <p class="section-desc reveal">
                A breakdown of the technologies I'm most proficient with, spanning
                frontend, backend, and everything in between.
              </p>
            </div>
          </div>
          ${SKILLS_GRID_HOME_SHELL}
        </div>
      </div>
    </section>
    ${EXPERIENCE_TIMELINE_SECTION_HTML}
    <section id="projects" aria-label="Featured projects">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Portfolio Highlights</p>
              <h2 class="about-heading">
                Crafted With <br />
                <strong> Purpose & Precision</strong>
              </h2>
              <p class="section-desc reveal">
                A curated showcase of projects that represent my best work — each
                one a unique challenge solved with clean code, thoughtful design,
                and a relentless focus on delivering real value.
              </p>
            </div>
          </div>
          <div
            id="homePortfolioHighlightsGrid"
            class="ph-grid"
            role="list"
            aria-label="Portfolio highlight projects"
            data-cms-highlights="true"
          ></div>
        </div>
      </div>
    </section>
    <section id="testimonials" aria-label="Client testimonials">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Client Voices</p>
              <h2 class="about-heading">
                Stories Of<br />
                <strong> Real Impact</strong>
              </h2>
              <p class="section-desc reveal">
                Testimonials that speak to quality, reliability, and the human
                touch behind every line of code.
              </p>
            </div>
          </div>
          <div
            id="homeTestimonialsGrid"
            class="testimonials-grid"
            data-cms-testimonials="true"
          ></div>
        </div>
      </div>
    </section>
    <section id="blogs" aria-label="Blog posts">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Insights &amp; Ideas</p>
              <h2 class="about-heading">
                From The<br />
                <strong> Dev Desk</strong>
              </h2>
              <p class="section-desc reveal">
                Thoughts on web development, architecture decisions, and lessons
                learned from building real-world applications.
              </p>
            </div>
          </div>
          <div
            id="homeBlogsGrid"
            class="blogs-grid"
            role="list"
            aria-label="Latest blog posts"
          ></div>
          <div class="blogs-footer reveal">
            <a href="/blogs" class="si-btn si-btn-primary">
              View All Posts
              <span class="icon" data-icon="ri-arrow-right-line"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="price-tag" aria-label="Pricing and Packages">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Pricing &amp; Packages</p>
              <h2 class="about-heading">
                Choose the right plan<br />
                <strong>for your next project</strong>
              </h2>
              <p class="section-desc reveal">
                Flexible pricing options designed to fit your goals, whether
                you’re building a simple website or a complex, scalable platform.
              </p>
            </div>
            <div
              class="duration-toggle"
              data-pricing-toggle
              role="group"
              aria-label="Billing frequency"
            >
              <button class="on" type="button" aria-pressed="true">
                One-time
              </button>
              <button type="button" aria-pressed="false">Monthly</button>
            </div>
          </div>
          <div class="pricing-grid">
            <article class="pricing-card">
              <div class="head">
                <div class="pricing-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />
                  </svg>
                </div>
                <span class="pricing-pill">Essential</span>
              </div>
              <h2>Starter</h2>
              <p class="tag">For focused, small projects.</p>
              <div class="price">
                <b>$299<em>+</em></b>
                <small>one-time<span class="pkr"> · ≈ PKR 83,100</span></small>
              </div>
              <ul>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Landing page or small website</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Responsive design</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Basic SEO setup</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>1 revision round</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Email support</li>
              </ul>
              <a href="/contact" class="btn btn-outline">
                Discuss your project
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </article>
            <article class="pricing-card pop">
              <div class="head">
                <div class="pricing-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 15c-1.5 1.2-2 4-2 6 2 0 4.8-.5 6-2M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 10-5c0 3-1 8-5 12a22 22 0 0 1-4 2z" />
                    <circle cx="15" cy="9" r="1.3" />
                    <path d="M9 12H5l2-3h3m2 8v4l3-2v-3" />
                  </svg>
                </div>
                <span class="pricing-pill hot">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8z" />
                  </svg>
                  Most Popular
                </span>
              </div>
              <h2>Professional</h2>
              <p class="tag">For growing businesses.</p>
              <div class="price">
                <b>$799<em>+</em></b>
                <small>one-time<span class="pkr"> · ≈ PKR 222,100</span></small>
              </div>
              <ul>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Custom website or web app</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>API integrations</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Performance optimization</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>3 revision rounds</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Priority communication</li>
              </ul>
              <a class="btn si-btn si-btn-primary" href="/contact">
                Start a project
                <span class="icon" data-icon="ri-download-line"></span>
              </a>
            </article>
            <article class="pricing-card">
              <div class="head">
                <div class="pricing-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 21V6l9-3v18M13 9h7v12M2 21h20M8 8h1m-1 4h1m-1 4h1m6-3h1m-1 4h1" />
                  </svg>
                </div>
                <span class="pricing-pill">Custom</span>
              </div>
              <h2>Enterprise</h2>
              <p class="tag">For complex, custom solutions.</p>
              <div class="price quote"><b>Custom quote</b></div>
              <ul>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Advanced full-stack solution</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Custom integrations &amp; architecture</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Security and scalability review</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Ongoing support options</li>
                <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></svg>Tailored delivery plan</li>
              </ul>
              <a href="/contact" class="btn btn-outline">
                Get a Custom Quote
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </article>
          </div>
          <div class="foot">
            <i aria-hidden="true"></i>
            <span>
              Every project is scoped around your goals, features, and timeline.
            </span>
            <i aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </section>
    <section id="faqs" aria-label="Frequently asked questions">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Got Questions?</p>
              <h2 class="about-heading">
                Frequently<br />
                <strong> Asked</strong>
              </h2>
              <p class="section-desc reveal">
                Quick answers to common questions about working together,
                timelines, and what to expect when we collaborate.
              </p>
            </div>
          </div>
          <div class="faq-layout">
            <div
              id="homeFaqAccordion"
              class="faq-accordion"
              role="region"
              aria-label="Frequently asked questions"
              data-cms-faqs="true"
            ></div>
            <aside class="faq-sidebar" aria-label="Get in touch">
              <div class="faq-cta-card reveal">
                <div class="faq-cta-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-question-answer-line"></span>
                </div>
                <h3 class="faq-cta-title">
                  You have different questions?<br />
                  Ask Away!
                </h3>
                <p class="faq-cta-desc">
                  Your Questions, My Answers.<br />
                  Quick Responses Guaranteed.
                </p>
                <a href="/contact" class="faq-cta-btn">Contact Us</a>
              </div>
              <div class="faq-contact-card reveal">
                <div class="faq-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-phone-line"></span>
                </div>
                <div class="faq-contact-text">
                  <p class="faq-contact-tag">Your Vision, My Craft</p>
                  <p class="faq-contact-title">Available 24/7</p>
                  <a href="tel:+923038464315" class="faq-contact-phone"
                    >+92 303-8464315</a
                  >
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" aria-label="Contact me">
      <div class="container">
        <div class="section-wrap">
          <div class="section-header">
            <div class="section-title-group reveal-left">
              <p class="section-label">Got An Idea?</p>
              <h2 class="about-heading">
                Let's Create<br />
                <strong> Something Amazing</strong>
              </h2>
              <p class="section-desc reveal">
                Got a challenge? Hire Me. Got a vision? Let's build. Great things
                happen when the right people come together.
              </p>
            </div>
          </div>
          <div class="contact-grid">
            <div class="reveal-left">
              <h3 class="contact-heading">
                Have a project? <br />
                <em>Hire Me.</em>
              </h3>
              <p class="contact-sub">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology. Feel free to
                reach out.
              </p>
              <div class="contact-details">
                <div class="contact-detail">
                  <div class="contact-detail-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-mail-line"></span>
                  </div>
                  <div class="contact-detail-text">
                    <a href="mailto:engineer.sohaibishaque@gmail.com"
                      >engineer.sohaibishaque@gmail.com</a
                    >
                  </div>
                </div>
                <div class="contact-detail" data-cms-contact-phone-row>
                  <div class="contact-detail-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-phone-line"></span>
                  </div>
                  <div class="contact-detail-text contact-detail-phones">
                    <a
                      href="tel:+923038464315"
                      class="contact-phone-line"
                      data-cms-profile-contact="phone"
                      data-cms-profile-mode="tel"
                      >+92 303-8464315</a
                    >
                    <span class="contact-phone-sep" aria-hidden="true">|</span>
                    <a
                      href="https://wa.me/923179227811"
                      class="contact-whatsapp-line"
                      data-cms-profile-contact="whatsapp"
                      data-cms-profile-mode="wa"
                      target="_blank"
                      rel="noopener noreferrer"
                      >+92 317-9227811</a
                    >
                  </div>
                </div>
                <div class="contact-detail">
                  <div class="contact-detail-icon" aria-hidden="true">
                    <span class="icon" data-icon="ri-map-pin-line"></span>
                  </div>
                  <div class="contact-detail-text">
                    <span>Block B, Satellite Town, Rawalpindi, Pakistan</span>
                  </div>
                </div>
              </div>
              <ul class="footer-social-list" aria-label="Social media links">
                <li>
                  <a
                    href="https://github.com/Sohaib-Ishaque"
                    class="social-icon"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-github-fill"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/"
                    class="social-icon"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="ri-linkedin-fill"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://sohaibishaque.vercel.app/"
                    class="social-icon"
                    aria-label="Website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon" data-icon="siGlobe"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:engineer.sohaibishaque@gmail.com"
                    class="social-icon"
                    aria-label="siEmail"
                  >
                    <span class="icon" data-icon="ri-mail-line"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="reveal-right">
              <div class="contact-form-col">
                <h2 class="cf-heading reveal">Send Me A Message</h2>
                <div class="cf-underline reveal"></div>
                <form
                  id="contactForm"
                  novalidate
                  aria-label="Contact form"
                  class="cf-steps"
                  action="#"
                  method="post"
                >
                  <div class="cf-step reveal" data-field="name">
                    <span class="cf-step-badge" aria-hidden="true">01</span>
                    <div class="cf-step-body">
                      <label for="name" class="cf-step-label"
                        >What is your full name?
                        <span class="cf-req">*</span></label
                      >
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="cf-line-input"
                        placeholder="Your full name..."
                        required
                        aria-required="true"
                        autocomplete="name"
                      />
                      <span
                        class="cf-error"
                        id="name-error"
                        role="alert"
                      ></span>
                    </div>
                  </div>

                  <div class="cf-step reveal" data-field="email">
                    <span class="cf-step-badge" aria-hidden="true">02</span>
                    <div class="cf-step-body">
                      <label for="email" class="cf-step-label"
                        >What is your email address?
                        <span class="cf-req">*</span></label
                      >
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="cf-line-input"
                        placeholder="Please enter your email address..."
                        required
                        aria-required="true"
                        autocomplete="email"
                      />
                      <span
                        class="cf-error"
                        id="email-error"
                        role="alert"
                      ></span>
                    </div>
                  </div>

                  <div class="cf-step reveal" data-field="subject">
                    <span class="cf-step-badge" aria-hidden="true">03</span>
                    <div class="cf-step-body">
                      <label class="cf-step-label" id="subjectLabel"
                        >What are you looking for?
                        <span class="cf-req">*</span></label
                      >
                      <div
                        class="cf-pills"
                        role="group"
                        aria-labelledby="subjectLabel"
                      >
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="General Question"
                        >
                          I have a question
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Project Inquiry"
                        >
                          Project Inquiry
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Job Opportunity"
                        >
                          Job Opportunity
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Collaboration"
                        >
                          Collaborate With Me
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Tech Support"
                        >
                          Tech Support
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Feedback"
                        >
                          Feedback
                        </button>
                        <button
                          type="button"
                          class="cf-pill"
                          data-value="Other"
                        >
                          Other
                        </button>
                      </div>
                      <input
                        type="hidden"
                        name="subject"
                        id="subject"
                        required
                        aria-required="true"
                      />
                      <span
                        class="cf-error"
                        id="subject-error"
                        role="alert"
                      ></span>
                    </div>
                  </div>

                  <div class="cf-step reveal" data-field="message">
                    <span class="cf-step-badge" aria-hidden="true">04</span>
                    <div class="cf-step-body">
                      <label for="message" class="cf-step-label"
                        >What is your message?
                        <span class="cf-req">*</span></label
                      >
                      <textarea
                        name="message"
                        id="message"
                        class="cf-line-textarea"
                        placeholder="Please enter your message..."
                        required
                        aria-required="true"
                      ></textarea>
                      <span
                        class="cf-error"
                        id="message-error"
                        role="alert"
                      ></span>
                    </div>
                  </div>

                  <div class="cf-consent reveal" data-field="consent">
                    <label class="cf-checkbox" for="consent">
                      <input
                        type="checkbox"
                        name="consent"
                        id="consent"
                        required
                        aria-required="true"
                      />
                      <span class="cf-checkbox-box" aria-hidden="true"></span>
                      <span class="cf-checkbox-label"
                        >I agree to the
                        <a href="#" target="_blank" rel="noopener"
                          >Privacy Policy</a
                        ></span
                      >
                    </label>
                    <span
                      class="cf-error"
                      id="consent-error"
                      role="alert"
                    ></span>
                  </div>

                  <div class="cf-submit-row reveal">
                    <button
                      type="submit"
                      class="cf-submit"
                      aria-label="Send message"
                    >
                      <span>Submit</span>
                      <span class="icon" data-icon="ri-arrow-right-line"></span>
                    </button>
                    <p class="cf-recaptcha">
                      Your information is 100% secure and will never be shared.
                    </p>
                  </div>

                  <div class="form-success" role="alert" aria-live="polite">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                </form>
              </div>
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
            <p class="brand-tagline">
              Building digital experiences that make an impact. Clean code,
              modern design, scalable solutions.
            </p>
            <div class="brand-rule" aria-hidden="true"></div>
            <div class="footer-cta-card">
              <div class="footer-cta-icon" aria-hidden="true">
                <span class="icon" data-icon="ri-send-plane-line"></span>
              </div>
              <h3 class="footer-cta-title">Let's work together</h3>
              <p class="footer-cta-text">
                Have a project in mind or just want to say hi? I'd love to hear
                from you.
              </p>
              <a href="/contact" class="footer-cta-button">
                Get In Touch <span class="icon" data-icon="ri-arrow-right-up-line"></span>
              </a>
            </div>
          </div>
          <nav
            class="footer-col footer-col--nav"
            aria-labelledby="footer-nav-heading"
          >
            <h3 class="footer-col-heading" id="footer-nav-heading">
              <span class="dot" aria-hidden="true"></span>Quick Links
            </h3>
            <ul class="footer-link-list">
              <li>
                <a href="/" class="footer-link-active">
                  <span class="dot dot--small" aria-hidden="true"></span>Home
                </a>
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
          <nav
            class="footer-col footer-col--services"
            aria-labelledby="footer-services-heading"
          >
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
                  <span class="icon" data-icon="ri-phone-line"></span>
                </span>
                <span class="footer-contact-text">
                  <a href="tel:+15551234567">+92 3038464315</a>
                  <span class="footer-contact-sub"
                    >Mon - Fri, 9AM - 6PM EST</span
                  >
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-mail-line"></span>
                </span>
                <span class="footer-contact-text">
                  <a href="mailto:engineer.sohaibishaque@gmail.com"
                    >engineer.sohaibishaque@gmail.com</a
                  >
                  <span class="footer-contact-sub"
                    >I'll get back to you soon</span
                  >
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-map-pin-line"></span>
                </span>
                <span class="footer-contact-text">
                  <span class="contact-static">Rawalpindi, Pakistan</span>
                  <span class="footer-contact-sub"
                    >Available for remote work</span
                  >
                </span>
              </li>
            </ul>
            <ul class="footer-social-list" aria-label="Social media links">
              <li>
                <a
                  href="https://github.com/Sohaib-Ishaque"
                  class="social-icon"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="icon" data-icon="ri-github-fill"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/"
                  class="social-icon"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="icon" data-icon="ri-linkedin-fill"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://sohaibishaque.vercel.app/"
                  class="social-icon"
                  aria-label="Website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="icon" data-icon="siGlobe"></span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:engineer.sohaibishaque@gmail.com"
                  class="social-icon"
                  aria-label="siEmail"
                >
                  <span class="icon" data-icon="ri-mail-line"></span>
                </a>
              </li>
            </ul>
            <p class="freelance-note">
              <strong>Available</strong> for freelance work <br />and exciting
              opportunities.
            </p>
${SITE_FOOTER_NEWSLETTER_HTML}
          </div>
        </div>
        <div class="footer-bottom">
          <div class="bottom-left">
            <span class="code-icon" aria-hidden="true">&lt;/&gt;</span>
            <span
              >Designed &amp; Built by
              <span class="accent">M Sohaib Ishaque</span>
            </span>
            <span class="icon" data-icon="ri-heart-line"></span>
          </div>
          <div class="bottom-center">
            &copy; 2025 <span class="accent">M Sohaib Ishaque</span>. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>`;

export function HomeContent() {
  useEffect(() => {
    const section = document.getElementById("price-tag");
    const toggle = section?.querySelector("[data-pricing-toggle]");
    if (!section || !toggle) return;

    const plans = {
      once: {
        unit: "one-time",
        cards: [
          {
            price: "$299",
            plus: true,
            button: "Discuss your project",
            items: [
              "Landing page or small website",
              "Responsive design",
              "Basic SEO setup",
              "1 revision round",
              "Email support",
            ],
          },
          {
            price: "$799",
            plus: true,
            button: "Start a project",
            items: [
              "Custom website or web app",
              "API integrations",
              "Performance optimization",
              "3 revision rounds",
              "Priority communication",
            ],
          },
          {
            price: "Custom quote",
            plus: false,
            button: "Get a custom quote",
            items: [
              "Advanced full-stack solution",
              "Custom integrations & architecture",
              "Security and scalability review",
              "Ongoing support options",
              "Tailored delivery plan",
            ],
          },
        ],
      },
      month: {
        unit: "per month",
        cards: [
          {
            price: "$99",
            plus: true,
            button: "Start monthly plan",
            items: [
              "Site maintenance & updates",
              "Hosting & uptime monitoring",
              "Basic SEO upkeep",
              "2 small edits per month",
              "Email support",
            ],
          },
          {
            price: "$249",
            plus: true,
            button: "Start monthly plan",
            items: [
              "Ongoing feature development",
              "API & integration upkeep",
              "Performance monitoring",
              "Up to 10 dev hours per month",
              "Priority communication",
            ],
          },
          {
            price: "Custom retainer",
            plus: false,
            button: "Get a custom retainer",
            items: [
              "Dedicated development retainer",
              "Architecture & integration roadmap",
              "Security and scalability reviews",
              "SLA-backed ongoing support",
              "Tailored delivery plan",
            ],
          },
        ],
      },
    } as const;
    const cards = Array.from(section.querySelectorAll(".pricing-card"));
    const buttons = Array.from(toggle.querySelectorAll("button"));
    const checkIcon = section.querySelector(".pricing-card ul li svg");
    const pendingUpdates: ReturnType<typeof setTimeout>[] = [];

    const render = (mode: keyof typeof plans) => {
      const plan = plans[mode];
      cards.forEach((card, index) => {
        const cardPlan = plan.cards[index];
        const price = card.querySelector(".price");
        const amount = price?.querySelector("b");
        const list = card.querySelector("ul");
        const link = card.querySelector(".btn");
        if (!price || !amount || !list || !link || !cardPlan) return;

        amount.textContent = cardPlan.price;
        price.classList.toggle("quote", !cardPlan.plus);
        price.querySelector("small")?.remove();

        if (cardPlan.plus) {
          const plus = document.createElement("em");
          plus.textContent = "+";
          amount.append(plus);
          const details = document.createElement("small");
          details.append(document.createTextNode(`${plan.unit} `));
          const conversion = document.createElement("span");
          conversion.className = "pkr";
          const dollars = Number(cardPlan.price.replace(/[^\d.]/g, ""));
          const roundedPkr = Math.round((dollars * 278) / 100) * 100;
          conversion.textContent = `· ≈ PKR ${roundedPkr.toLocaleString("en-US")}`;
          details.append(conversion);
          price.append(details);
        }

        list.replaceChildren(
          ...cardPlan.items.map((itemText) => {
            const item = document.createElement("li");
            if (checkIcon) item.append(checkIcon.cloneNode(true));
            item.append(document.createTextNode(itemText));
            return item;
          }),
        );

        const label = Array.from(link.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE,
        );
        if (label) label.nodeValue = `${cardPlan.button} `;
      });
    };

    render("once");
    const handlers = buttons.map((button, index) => {
      const mode = index === 0 ? "once" : "month";
      const handler = () => {
        if (button.classList.contains("on")) return;
        buttons.forEach((candidate) => {
          const active = candidate === button;
          candidate.classList.toggle("on", active);
          candidate.setAttribute("aria-pressed", String(active));
        });

        const animatedElements = cards.flatMap((card) =>
          Array.from(card.querySelectorAll(".price, ul, .btn")),
        );
        animatedElements.forEach((element) => {
          element.classList.add("swap", "out");
        });
        pendingUpdates.forEach(clearTimeout);
        pendingUpdates.length = 0;
        pendingUpdates.push(
          setTimeout(() => {
            render(mode);
            animatedElements.forEach((element) => {
              element.classList.remove("out");
            });
          }, 180),
        );
      };
      button.addEventListener("click", handler);
      return { button, handler };
    });

    return () => {
      handlers.forEach(({ button, handler }) =>
        button.removeEventListener("click", handler),
      );
      pendingUpdates.forEach(clearTimeout);
    };
  }, []);

  return <PortfolioHtmlContent page="HomeContent" html={PAGE_HTML} />;
}
