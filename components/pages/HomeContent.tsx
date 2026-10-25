"use client";

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
              Hire Me <span class="icon" data-icon="siArrowTilt"></span>
            </a>
            <a
              href="#0"
              class="btn btn-outline"
              id="customizeBtn"
              aria-label="Customize"
              aria-expanded="false"
              aria-controls="paCustomPanel"
            >
              <span class="icon" data-icon="siTheme"></span>
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
                <span class="icon" data-icon="siArrowRight"></span>
              </a>
              <a
                href="/assets/Sohaib_Ishaque_CV.pdf"
                class="btn btn-outline"
                download
              >
                Download CV
                <span class="icon" data-icon="siDownload"></span>
              </a>
            </div>

            <div class="hv2-stats">
              <div class="hv2-stat">
                <span class="hv2-stat-icon" aria-hidden="true">
                  <span class="icon" data-icon="siBriefcaseA"></span>
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
                  <span class="icon" data-icon="siUsers"></span>
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
                  <span class="icon" data-icon="siStar"></span>
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
                    <span class="icon" data-icon="siPen"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">UI/UX Design</span>
                  </span>
                </div>
                <div class="hv2-service-card span-2">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="siCode"></span>
                  </span>
                  <span>
                    <span class="hv2-service-title">Web Development</span>
                  </span>
                </div>
                <div class="hv2-service-card span-2">
                  <span class="hv2-service-icon" aria-hidden="true">
                    <span class="icon" data-icon="siDownload"></span>
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
                    <span class="icon" data-icon="siSpark"></span>
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
                  <span class="icon" data-icon="siSend"></span>
                </span>
                <span>
                  <span class="hv2-available-title">Freelance Projects</span>
                  <span class="hv2-available-sub"
                    >Let's build something amazing together.</span
                  >
                  <span class="hv2-available-link">
                    Let's Talk
                    <span class="icon" data-icon="siArrowRight"></span>
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
                    <span class="icon" data-icon="siGithub"></span>
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
                    <span class="icon" data-icon="siLinkedin"></span>
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
                    <span class="icon" data-icon="siXcom"></span>
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
                    <span class="icon" data-icon="siInstagram"></span>
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
              <span class="icon" data-icon="siCode"></span>
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
              <span class="icon" data-icon="siBriefcase"></span>
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
              <span class="icon" data-icon="siStar"></span>
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
              <span class="icon" data-icon="siPhone"></span>
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
                More About Me <span class="icon" data-icon="siArrowRight"></span>
              </a>
            </div>
            <div class="about-values reveal-right">
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="siCode"></span>
                </div>
                <h3 class="value-title">Clean Code</h3>
                <p class="value-desc">
                  Writing maintainable, scalable and efficient code following
                  best practices and design patterns.
                </p>
              </div>
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="siSpark"></span>
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
                  <span class="icon" data-icon="siMonitor"></span>
                </div>
                <h3 class="value-title">Responsive</h3>
                <p class="value-desc">
                  Creating seamless experiences across all devices and platforms
                  with cross-device compatibility.
                </p>
              </div>
              <div class="value-card">
                <div class="value-icon" aria-hidden="true">
                  <span class="icon" data-icon="siExclamination"></span>
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
              <span class="icon" data-icon="siArrowRight"></span>
            </a>
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
                  <span class="icon" data-icon="siFaqChat"></span>
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
                  <span class="icon" data-icon="siPhone"></span>
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
                    <span class="icon" data-icon="siEnvelope"></span>
                  </div>
                  <div class="contact-detail-text">
                    <a href="mailto:engineer.sohaibishaque@gmail.com"
                      >engineer.sohaibishaque@gmail.com</a
                    >
                  </div>
                </div>
                <div class="contact-detail">
                  <div class="contact-detail-icon" aria-hidden="true">
                    <span class="icon" data-icon="siPhone"></span>
                  </div>
                  <div class="contact-detail-text">
                    <span>+92 303-8464315 &nbsp;|&nbsp; +92 317-9227811</span>
                  </div>
                </div>
                <div class="contact-detail">
                  <div class="contact-detail-icon" aria-hidden="true">
                    <span class="icon" data-icon="siLocationPin"></span>
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
                    <span class="icon" data-icon="siGithub"></span>
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
                    <span class="icon" data-icon="siLinkedin"></span>
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
                    <span class="icon" data-icon="siEnvelope"></span>
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
                      <span class="icon" data-icon="siArrowRight"></span>
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
                <span class="icon" data-icon="siSend"></span>
              </div>
              <h3 class="footer-cta-title">Let's work together</h3>
              <p class="footer-cta-text">
                Have a project in mind or just want to say hi? I'd love to hear
                from you.
              </p>
              <a href="/contact" class="footer-cta-button">
                Get In Touch <span class="icon" data-icon="siArrowTilt"></span>
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
                  <span class="icon" data-icon="siPhone"></span>
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
                  <span class="icon" data-icon="siEnvelope"></span>
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
                  <span class="icon" data-icon="siLocationPin"></span>
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
                  <span class="icon" data-icon="siGithub"></span>
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
                  <span class="icon" data-icon="siLinkedin"></span>
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
                  <span class="icon" data-icon="siEnvelope"></span>
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
            <span class="icon" data-icon="siHeart"></span>
          </div>
          <div class="bottom-center">
            &copy; 2025 <span class="accent">M Sohaib Ishaque</span>. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>`;

export function HomeContent() {
  return <PortfolioHtmlContent page="HomeContent" html={PAGE_HTML} />;
}
