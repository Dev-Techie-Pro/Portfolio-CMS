"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";

const PAGE_HTML = `${getSiteHeaderHtml("about")}
    <section class="about-hero" id="about-hero" aria-label="About hero">
      <div class="about-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="abt2-hero-inner">
          <div class="abt2-left reveal-left">
            <span class="accent-tag abt2-tag">About Me</span>

            <h1 class="abt2-heading">
              <span class="line-white">I Create Digital</span>
              <span class="line-accent">Experiences</span>
            </h1>

            <p class="abt2-subhead">Passionate Developer. Problem Solver. Lifelong Learner.</p>

            <p class="abt2-body">
              I'm a Full Stack Web Developer who loves turning ideas into powerful digital solutions.
              I focus on clean code, intuitive design, and exceptional user experiences.
            </p>

            <div class="abt2-ctas">
              <a href="/projects"  class="si-btn si-btn-primary">
                View My Work
                <span class="icon" data-icon="ri-subtract-line"></span>
              </a>
              <a href="/assets/Sohaib_Ishaque_CV.pdf" class="btn btn-outline" download>
                Download CV
                <span class="icon" data-icon="ri-download-line"></span>
              </a>
            </div>
            <div class="abt2-social-proof">
              <div class="ht-avatar-stack">
                <div class="ht-avatar-initials">SR</div>
                <div class="ht-avatar-initials">JS</div>
                <div class="ht-avatar-initials">KJ</div>
                <div class="ht-avatar-initials">ML</div><span class="ht-avatar-more" aria-hidden="true">+15</span>
              </div>
              <p class="abt2-social-copy">
                20+ Happy Clients
                <span>Worldwide</span>
              </p>
            </div>
          </div>
          <div class="abt2-visual reveal-right">
            <div class="abt2-orbit">
              <span class="abt2-orbit-dot"></span>
              <span class="abt2-orbit-dot"></span>
              <span class="abt2-orbit-dot"></span>
              <span class="abt2-orbit-dot"></span>
            </div>

            <div class="abt2-portrait-wrap">
              <img src="https://res.cloudinary.com/dpx3gst4q/image/upload/v1785336732/sohaib-ishaque_s8xspn.png" alt="M Sohaib Ishaque — Full Stack Web Developer" loading="eager" />
            </div>
            <div class="abt2-card abt2-card-projects">
              <div class="abt2-card-icon">
                <span class="icon" data-icon="ri-briefcase-2-line"></span>
              </div>
              <div>
                <div class="abt2-card-num">35+</div>
                <div class="abt2-card-label">Projects Completed</div>
              </div>
            </div>

            <div class="abt2-card abt2-card-clients">
              <div class="abt2-card-icon">
                <span class="icon" data-icon="ri-group-line"></span>
              </div>
              <div>
                <div class="abt2-card-num">20+</div>
                <div class="abt2-card-label">Happy Clients</div>
              </div>
            </div>

            <div class="abt2-card abt2-card-tech">
              <div class="abt2-card-icon">
                <span class="icon" data-icon="ri-rocket-line"></span>
              </div>
              <div>
                <div class="abt2-card-num">10+</div>
                <div class="abt2-card-label">Technologies<br>Mastered</div>
              </div>
            </div>

            <div class="abt2-card abt2-card-experience">
              <div class="abt2-card-icon">
                <span class="icon" data-icon="ri-star-line"></span>
              </div>
              <div>
                <div class="abt2-card-num">5+</div>
                <div class="abt2-card-label">Years Experience</div>
              </div>
            </div>
            <div class="abt2-availability">
              <span class="abt2-live-dot"></span>
              Available for freelance work
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="journey-section" id="journey" aria-label="My journey">
      <div class="container">
        <div class="journey-inner">
          <div class="reveal-left">
            <div class="section-header">
              <div class="section-title-group reveal-left ">
                <p class="section-label">My Journey</p>
                <h2 class="about-heading"> From Zero<br />
                  <strong>  To Code</strong>
                </h2>
              </div>
              <p class="journey-body"> My journey into web development started with curiosity and a passion for creating things that live on the internet. Over time, that curiosity turned into a career where I get to solve problems, learn constantly and build meaningful digital experiences. </p>
              <p class="journey-body"> I believe in writing clean code, following best practices and always pushing myself to grow. From my early days as an intern at Oxygen Soft to leading full-stack projects at Media@Marsons Islamabad, every step has sharpened my craft and deepened my commitment to delivering quality software. </p>
              <a href="/contact" class="btn btn-outline" style="margin-top:0.5rem"> Let's Work Together <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
            </div>
          </div>
          <div class="journey-timeline reveal-right">
            <div class="jt-item">
              <div class="jt-dot" aria-hidden="true"></div>
              <div class="jt-siCalendar">2021 — 2022</div>
              <h3 class="jt-role">Web Developer Intern</h3>
              <p class="jt-desc">Assisted in front-end development and UI implementation for various web applications at Oxygen Soft, Lahore. Built foundational skills in .NET, HTML/CSS and JavaScript while following clean code standards and participating in code reviews.</p>
            </div>
            <div class="jt-item">
              <div class="jt-dot" aria-hidden="true"></div>
              <div class="jt-siCalendar">June 2022 — Dec 2023</div>
              <h3 class="jt-role">.NET Developer &amp; Web Developer</h3>
              <p class="jt-desc">Worked on client projects at Oxygen Soft as a full developer, collaborated with designers and implemented responsive interfaces. Built .NET Core and Angular web apps, desktop applications with WPF/WinForms, REST APIs and WordPress solutions.</p>
            </div>
            <div class="jt-item">
              <div class="jt-dot" aria-hidden="true"></div>
              <div class="jt-siCalendar">Jan 2024 — Jan 2025</div>
              <h3 class="jt-role">Full Stack Web Developer</h3>
              <p class="jt-desc">Building robust full-stack web applications at Media@Marsons, Islamabad using Angular and .NET Core. Leading projects, delivering high-quality solutions, optimizing RESTful APIs with Entity Framework and driving 100% client satisfaction across all engagements.</p>
            </div>
            <div class="jt-item">
              <div class="jt-dot" aria-hidden="true"></div>
              <div class="jt-siCalendar">Apr 2025 — Present</div>
              <h3 class="jt-role">Full Stack Web Developer</h3>
              <p class="jt-desc">Developed custom WordPress solutions and enterprise .NET applications while building scalable backend services and RESTful APIs with Node.js. Created responsive front-end interfaces using Angular and modern CSS frameworks, alongside optimizing database performance across SQL and NoSQL systems. Collaborated in agile teams to deliver integrated, high-quality solutions with third-party services and payment gateways.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="beliefs-section" id="beliefs" aria-label="What I believe in">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left ">
            <p class="section-label">Guiding Principles</p>
            <h2 class="about-heading"> Principles <br />
              <strong> That Drive Me</strong>
            </h2>
            <p class="journey-body">More than a developer, I'm a believer in purposeful work, honest communication, and building things that last. </p>
          </div>
        </div>
        <div class="beliefs-grid">
          <div class="belief-card reveal">
            <div class="belief-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-code-line"></span>
            </div>
            <h3 class="belief-title">Clean Code</h3>
            <p class="belief-desc">Writing maintainable, scalable and efficient code following best practices, design patterns and SOLID principles.</p>
          </div>
          <div class="belief-card reveal">
            <div class="belief-icon" aria-hidden="true">
              <span class="icon" data-icon="siGrowth"></span>
            </div>
            <h3 class="belief-title">Continuous Growth</h3>
            <p class="belief-desc">Always learning new technologies and improving my skills to stay ahead. The tech landscape evolves — so do I.</p>
          </div>
          <div class="belief-card reveal">
            <div class="belief-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-user-line"></span>
            </div>
            <h3 class="belief-title">User First</h3>
            <p class="belief-desc">Building with the end user in mind to create seamless, valuable and intuitive experiences across all devices and platforms.</p>
          </div>
          <div class="belief-card reveal">
            <div class="belief-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-group-line"></span>
            </div>
            <h3 class="belief-title">Collaboration</h3>
            <p class="belief-desc">I value teamwork and believe great results come from great collaboration. Clear communication and shared ownership drive excellence.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="edu-certs-section" id="education" aria-label="Education and certifications">
      <div class="container">
        <div class="section-header">
            <div class="section-title-group reveal-left ">
              <p class="section-label">Academic & Beyond</p>
              <h2 class="about-heading">Education That <br />
                <strong> Built My Foundation</strong>
              </h2>
              <p class="section-desc reveal">The institutions and programs that shaped my knowledge — and the certifications that keep me current. </p>
            </div>
        </div>
        <div class="edu-certs-grid">
          <div class="reveal-left">
            <h2 class="section-heading">Education</h2>
            <div class="edu-underline" aria-hidden="true"></div>
            <div class="edu-card">
              <div class="edu-icon-wrap" aria-hidden="true">
                <span class="icon" data-icon="siGruadutionCap"></span>
              </div>
              <div>
                <div class="edu-dates">Dec 2017 — Dec 2021</div>
                <h3 class="edu-degree">BS Software Engineering</h3>
                <p class="edu-institution">UAJ&amp;K — University of Azad Jammu &amp; Kashmir <br />Muzaffarabad, Azad Kashmir &nbsp; </p>
                <div style="margin-top:0.75rem;display:flex;flex-wrap:wrap;gap:0.4rem;">
                  <span class="project-tag">Web Design &amp; Dev</span>
                  <span class="project-tag">ASP .NET</span>
                  <span class="project-tag">C#</span>
                  <span class="project-tag">Machine Learning</span>
                  <span class="project-tag">ANN</span>
                </div>
              </div>
            </div>
            <div class="edu-card">
              <div class="edu-icon-wrap" aria-hidden="true">
                <span class="icon" data-icon="ri-computer-line"></span>
              </div>
              <div>
                <div class="edu-dates">Mar 2015 — Mar 2017</div>
                <h3 class="edu-degree">ICS — Intermediate</h3>
                <p class="edu-institution">New Allama Iqbal Model Science Collage <br />Bagh, Azad Kashmir &nbsp;|&nbsp; 70% </p>
              </div>
            </div>
            <div class="edu-card">
              <div class="edu-icon-wrap" aria-hidden="true">
                <span class="icon" data-icon="ri-computer-line"></span>
              </div>
              <div>
                <div class="edu-dates">Feb 2013 — Feb 2015</div>
                <h3 class="edu-degree">Science — Matricullation</h3>
                <p class="edu-institution">Govet Boys High School <br />Dhall Qazian Bagh, Azad Kashmir &nbsp;|&nbsp; 68% </p>
              </div>
            </div>
          </div>
          <div class="reveal-right">
            <h2 class="section-heading">Certifications</h2>
            <div class="edu-underline" aria-hidden="true"></div>
            <div class="cert-list">
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-award-line"></span>
                </div>
                <div class="cert-name">
                  <strong>WordPress Development</strong> Digiskills — Aug 2018
                </div>
              </div>
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-award-line"></span>
                </div>
                <div class="cert-name">
                  <strong>Freelancing</strong> Digiskills — Aug 2018
                </div>
              </div>
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-award-line"></span>
                </div>
                <div class="cert-name">
                  <strong>Web Design &amp; Development</strong> Freelancing — 2018 – Present
                </div>
              </div>
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-code-line"></span>
                </div>
                <div class="cert-name">
                  <strong>Full Stack Web Development</strong> Professional Practice — Web-Tech Sol, 2025-2026
                </div>
              </div>
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-code-line"></span>
                </div>
                <div class="cert-name">
                  <strong>Angular &amp; .NET Core Development</strong> Professional Practice — Media@Marsons, 2023–2025
                </div>
              </div>
              <div class="cert-item">
                <div class="cert-icon" aria-hidden="true">
                  <span class="icon" data-icon="ri-code-line"></span>
                </div>
                <div class="cert-name">
                  <strong>Full Stack Web Development</strong> Professional Practice — Oxygen Soft, 2022–2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
              <a href="#" class="btn btn-outline"> Download Case Study <span class="icon" data-icon="ri-download-line"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${SITE_FOOTER_HTML}`;

export function AboutContent() {
  return <PortfolioHtmlContent page="AboutContent" html={PAGE_HTML} />;
}
