"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";

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
    <section class="exp-work exp-work--hscroll" id="exp-work" aria-label="Career timeline">
      <div class="exp-hscroll-root">
        <div class="container exp-hscroll-intro">
          <div class="exp-work-header reveal">
            <div class="exp-work-title-wrap">
              <div class="section-title-group reveal-left ">
                <p class="section-label">My Journey</p>
                <h2 class="about-heading"> Career <br />
                  <strong> Timeline</strong>
                </h2>
              </div>
              <p class="exp-work-subtitle reveal" >A timeline of my professional journey, the impact I've created, and the technologies I've mastered along the way.</p>
            </div>
          </div>
        </div>
        <div class="exp-hscroll-stage">
        <div class="container">
        <div class="exp-tl" data-exp-timeline>
          <div class="exp-tl-track" role="tablist" aria-label="Career timeline">
            <button class="exp-tl-card is-exp-active" type="button" role="tab" id="exp-tab-0" aria-selected="true" aria-controls="exp-panel-0" data-exp-index="0">
              <span class="exp-tl-num" aria-hidden="true">01</span>
              <div class="exp-tl-content">
                <h3 class="exp-tl-role">Full Stack Web Developer</h3>
                <p class="exp-tl-company">Web-Tech</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siLocationPin"></span> Islamabad, Pakistan</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siCalendar"></span> Apr 2025 – Present</p>
              </div>
            </button>
            <button class="exp-tl-card" type="button" role="tab" id="exp-tab-1" aria-selected="false" aria-controls="exp-panel-1" data-exp-index="1" tabindex="-1">
              <span class="exp-tl-num" aria-hidden="true">02</span>
              <div class="exp-tl-content">
                <h3 class="exp-tl-role">Full Stack Web Developer</h3>
                <p class="exp-tl-company">Media@Marsons</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siLocationPin"></span> Islamabad, Pakistan</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siCalendar"></span> Dec 2023 – Jan 2025</p>
              </div>
            </button>

            <button class="exp-tl-card" type="button" role="tab" id="exp-tab-2" aria-selected="false" aria-controls="exp-panel-2" data-exp-index="2" tabindex="-1">
              <span class="exp-tl-num" aria-hidden="true">03</span>
              <div class="exp-tl-content">
                <h3 class="exp-tl-role">.NET Developer &amp; Web Developer</h3>
                <p class="exp-tl-company">Oxygen Soft</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siLocationPin"></span> Lahore, Pakistan</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siCalendar"></span> May 2022 – Nov 2023</p>
              </div>
            </button>

            <button class="exp-tl-card" type="button" role="tab" id="exp-tab-3" aria-selected="false" aria-controls="exp-panel-3" data-exp-index="3" tabindex="-1">
              <span class="exp-tl-num" aria-hidden="true">04</span>
              <div class="exp-tl-content">
                <h3 class="exp-tl-role">.NET Developer Intern</h3>
                <p class="exp-tl-company">Oxygen Soft</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siLocationPin"></span> Lahore, Pakistan</p>
                <p class="exp-tl-meta"><span class="icon" data-icon="siCalendar"></span> May 2021 – Aug 2021</p>
              </div>
            </button>
          </div>
        </div>

        <div class="exp-role-stage" data-exp-stage>
          <article class="exp-role is-exp-active" id="exp-panel-0" role="tabpanel" aria-labelledby="exp-tab-0" data-exp-index="0">
            <aside class="exp-role-company">
              <h3 class="exp-role-company-name">Web-Tech</h3>
              <p class="exp-role-company-loc"><span class="icon" data-icon="siLocationPin"></span> Islamabad, Pakistan</p>
              <ul class="exp-role-facts">
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siBriefcase"></span></span><span><small>Type</small>Full Time</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siHome"></span></span><span><small>Mode</small>On-site</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siUsers"></span></span><span><small>Team Size</small>8+ Members</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siGlobe"></span></span><span><small>Domain</small>Web Development</span></li>
              </ul>
            </aside>
            <div class="exp-role-main">
              <div class="exp-role-head">
                <span class="exp-role-badge">Current Role</span>
                <p class="exp-role-dates">Apr 2025 – Present</p>
                <h3 class="exp-role-title">Full Stack Web Developer</h3>
              </div>
              <p class="exp-role-desc is-collapsed">Developed fully custom WordPress themes and plugins from scratch using PHP, Advanced Custom Fields, and WordPress hooks/filters for scalable solutions. Built and maintained enterprise-level .NET web applications using ASP.NET Core, MVC, Entity Framework, and SQL Server. Developed scalable backend services and RESTful APIs using Node.js, Express.js, and MongoDB/MySQL databases. Created dynamic, responsive front-end interfaces using Angular, TypeScript, Bootstrap, and Tailwind CSS.</p>
              <button class="exp-role-toggle is-collapsed" type="button" aria-expanded="false"><span class="exp-role-toggle-label">Show more</span> <span class="icon" data-icon="siArrowUp"></span></button>
              <div class="exp-role-achievements">
                  <div class="exp-role-achievements-list">
                    <h4 class="exp-role-kicker"> Key Achievements</h4>
                    <ul>
                      <li>Optimized database performance through complex LINQ queries, stored procedures, and indexing strategies</li>
                      <li>Integrated third-party services and payment gateways into WordPress and Node.js applications</li>
                      <li>Collaborated with cross-functional teams in an agile environment, ensuring timely delivery of high-quality solutions</li>
                    </ul>
                  </div>
                  <div class="exp-role-impact">
                    <h4 class="exp-role-kicker">Role Impact</h4>
                    <ul>
                      <li><strong>10+</strong><span>Projects Delivered</span></li>
                      <li><strong>40%</strong><span>Improvement in Performance</span></li>
                      <li><strong>100%</strong><span>Client Satisfaction</span></li>
                    </ul>
                  </div>
                </div>
            </div>
            <aside class="exp-role-aside">
              <div class="exp-role-tech">
                <h4 class="exp-role-kicker">Technologies</h4>
                <div class="exp-role-tech-grid">
                  <span class="exp-tech-chip" title="WordPress"><span class="icon" data-icon="siWordpress"></span></span>
                  <span class="exp-tech-chip" title="PHP"><span class="icon" data-icon="siPhpFill"></span></span>
                  <span class="exp-tech-chip" title="Node.js"><span class="icon" data-icon="siNodeJs"></span></span>
                  <span class="exp-tech-chip" title="Angular"><span class="icon" data-icon="siAngularJs"></span></span>
                  <span class="exp-tech-chip express-js" title="Express JS"><span class="icon" data-icon="siExpressJs"></span></span>
                  <span class="exp-tech-chip" title="TypeScript"><span class="icon" data-icon="siTypescript"></span></span>
                  <span class="exp-tech-chip" title=".NET Core"><span class="icon" data-icon="siDotNetCore"></span></span>
                  <span class="exp-tech-chip" title="MongoDB"><span class="icon" data-icon="siMongodB"></span></span>
                  <span class="exp-tech-chip" title="Bootstrap"><span class="icon" data-icon="siBootstrap"></span></span>
                  <span class="exp-tech-chip" title="Tailwind CSS"><span class="icon" data-icon="siTailwindcss"></span></span>
                  <span class="exp-tech-chip" title="SQL Server"><span class="icon" data-icon="siSql"></span></span>
                  <span class="exp-tech-chip" title="PHP MyAdmin"><span class="icon" data-icon="siMySql"></span></span>
                </div>
              </div>
              <a href="/projects" class="exp-role-cases">View Case Studies <span class="icon" data-icon="siArrowRight"></span></a>
            </aside>
          </article>

          <article class="exp-role" id="exp-panel-1" role="tabpanel" aria-labelledby="exp-tab-1" data-exp-index="1" aria-hidden="true">
            <aside class="exp-role-company">
              <h3 class="exp-role-company-name">Media@Marsons</h3>
              <p class="exp-role-company-loc"><span class="icon" data-icon="siLocationPin"></span> Islamabad, Pakistan</p>
              <ul class="exp-role-facts">
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siBriefcase"></span></span><span><small>Type</small>Full Time</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siHome"></span></span><span><small>Mode</small>On-site</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siUsers"></span></span><span><small>Team Size</small>6+ Members</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siGlobe"></span></span><span><small>Domain</small>Digital Media</span></li>
              </ul>
            </aside>
            <div class="exp-role-main">
              <div class="exp-role-head">
                <span class="exp-role-badge is-past">Previous Role</span>
                <p class="exp-role-dates">Dec 2023 – Jan 2025</p>
                <h3 class="exp-role-title">Full Stack Web Developer</h3>
              </div>
              <p class="exp-role-desc is-collapsed">Developed and maintained full-stack web applications using Angular and .NET Core. Designed and optimized RESTful APIs using Entity Framework, LINQ, and SQL Server. Built custom WordPress themes and plugins using Elementor Pro and WP Bakery for client projects.</p>
              <button class="exp-role-toggle is-collapsed" type="button" aria-expanded="false"><span class="exp-role-toggle-label">Show more</span> <span class="icon" data-icon="siArrowUp"></span></button>
              <div class="exp-role-achievements">
                  <div class="exp-role-achievements-list">
                    <h4 class="exp-role-kicker">Key Achievements</h4>
                    <ul>
                      <li>Delivered 10+ scalable web applications</li>
                      <li>Improved API performance by 40%</li>
                      <li>Built a reusable components and plugins library</li>
                    </ul>
                  </div>
                  <div class="exp-role-impact">
                    <h4 class="exp-role-kicker">Role Impact</h4>
                    <ul>
                      <li><strong>10+</strong><span>Apps Delivered</span></li>
                      <li><strong>40%</strong><span>API Performance Gain</span></li>
                      <li><strong>12+</strong><span>Reusable Modules</span></li>
                    </ul>
                  </div>
                </div>
            </div>
            <aside class="exp-role-aside">
              <div class="exp-role-tech">
                <h4 class="exp-role-kicker">Technologies</h4>
                <div class="exp-role-tech-grid">
                  <span class="exp-tech-chip" title="WordPress">
                    <span class="icon" data-icon="siWordpress"></span>
                  </span>
                  <span class="exp-tech-chip" title=".NET">
                    <span class="icon" data-icon="siDotNet"></span>
                  </span>
                  <span class="exp-tech-chip" title=".Net Core">
                    <span class="icon" data-icon="siDotNetCore"></span>

                  </span>
                  <span class="exp-tech-chip" title="JavaScript">
                    <span class="icon" data-icon="siJavascript"></span>
                  </span>
                  <span class="exp-tech-chip" title="TypeScript">
                    <span class="icon" data-icon="siTypescript"></span>
                  </span>
                  <span class="exp-tech-chip" title="SQL Server">
                    <span class="icon" data-icon="siSql"></span>
                  </span>
                  <span class="exp-tech-chip" title="Next Js">
                   <span class="icon" data-icon="siNodeJs"></span>
                  </span>
                  
                  <span class="exp-tech-chip" title="Visual Studio">
                    <span class="icon" data-icon="siVisualStudio"></span>
                  </span>
                  <span class="exp-tech-chip" title="SQL Database">
                   <span class="icon" data-icon="siSql"></span>
                  </span>
                  <span class="exp-tech-chip" title="PHP">
                    <span class="icon" data-icon="siPhpFill"></span>
                  </span>
                  <span class="exp-tech-chip" title="PHP MyAdmin">
                    <span class="icon" data-icon="siPhpMyAdmin"></span>
                  </span>
                  <span class="exp-tech-chip" title="MySQL">
                    <span class="icon" data-icon="siMySql"></span>
                  </span>    
                  <span class="exp-tech-chip" title="Sublime IDE">
                    <span class="icon" data-icon="siSublimeIDE"></span>
                  </span>         
                  <span class="exp-tech-chip" title="Elementor">
                    <span class="icon" data-icon="siElementor"></span>
                  </span>                     
                </div>
              </div>
              <a href="/projects" class="exp-role-cases">View Case Studies <span class="icon" data-icon="siArrowRight"></span></a>
            </aside>
          </article>

          <article class="exp-role" id="exp-panel-2" role="tabpanel" aria-labelledby="exp-tab-2" data-exp-index="2" aria-hidden="true">
            <aside class="exp-role-company">
              <h3 class="exp-role-company-name">Oxygen Soft</h3>
              <p class="exp-role-company-loc"><span class="icon" data-icon="siLocationPin"></span> Lahore, Pakistan</p>
              <ul class="exp-role-facts">
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siBriefcase"></span></span><span><small>Type</small>Full Time</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siHome"></span></span><span><small>Mode</small>On-site</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siUsers"></span></span><span><small>Team Size</small>10+ Members</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siGlobe"></span></span><span><small>Domain</small>Enterprise Software</span></li>
              </ul>
            </aside>
            <div class="exp-role-main">
              <div class="exp-role-head">
                <span class="exp-role-badge is-past">Previous Role</span>
                <p class="exp-role-dates">May 2022 – Nov 2023</p>
                <h3 class="exp-role-title">.NET Developer &amp; Web Developer</h3>
              </div>
              <p class="exp-role-desc is-collapsed">Designed and developed .NET Core and Angular-based web applications. Built desktop applications using WPF and WinForms for enterprise clients. Advanced WordPress development, theme and plugin creation with custom PHP and MySQL integration.</p>
              <button class="exp-role-toggle is-collapsed" type="button" aria-expanded="false"><span class="exp-role-toggle-label">Show more</span> <span class="icon" data-icon="siArrowUp"></span></button>
              <div class="exp-role-achievements">
                  <div class="exp-role-achievements-list">
                    <h4 class="exp-role-kicker">Key Achievements</h4>
                    <ul>
                      <li>Developed enterprise-grade applications</li>
                      <li>Integrated 3rd-party APIs and payment gateways</li>
                      <li>Reduced bugs by 30% through optimized code</li>
                    </ul>
                  </div>
                  <div class="exp-role-impact">
                    <h4 class="exp-role-kicker">Role Impact</h4>
                    <ul>
                      <li><strong>8+</strong><span>Enterprise Apps</span></li>
                      <li><strong>30%</strong><span>Fewer Production Bugs</span></li>
                      <li><strong>15+</strong><span>API Integrations</span></li>
                    </ul>
                  </div>
                </div>
            </div>
            <aside class="exp-role-aside">
              <div class="exp-role-tech">
                <h4 class="exp-role-kicker">Technologies</h4>
                <div class="exp-role-tech-grid">
                  <span class="exp-tech-chip" title=".NET">
                    <span class="icon" data-icon="siDotNet"></span>
                  </span>
                  <span class="exp-tech-chip" title=".Net Core">
                    <span class="icon" data-icon="siDotNetCore"></span>

                  </span>
                  <span class="exp-tech-chip" title="C Sharp">
                    <span class="icon" data-icon="siCsharp"></span>
                  </span>
                  <span class="exp-tech-chip" title="Visual Studio">
                    <span class="icon" data-icon="siVisualStudio"></span>
                  </span>
                  <span class="exp-tech-chip" title="SQL Database">
                   <span class="icon" data-icon="siSql"></span>
                  </span>
                  <span class="exp-tech-chip" title="PHP">
                    <span class="icon" data-icon="siPhpFill"></span>
                  </span>
                  <span class="exp-tech-chip" title="MySQL">
                    <span class="icon" data-icon="siMySql"></span>
                  </span>
                  <span class="exp-tech-chip" title="Sublime IDE">
                    <span class="icon" data-icon="siSublimeIDE"></span>
                  </span>
                  <span class="exp-tech-chip" title="Web Auth">
                    <span class="icon" data-icon="siWebAuth"></span>
                  </span>
                  
                  <span class="exp-tech-chip" title="Compose Multiplatform">
                    <span class="icon" data-icon="siComposeMultiplatform"></span>
                  </span>
                  <span class="exp-tech-chip" title="Microsoft Azure">
                    <span class="icon" data-icon="siMicrosoftAzure"></span>
                  </span>
                
                </div>
              </div>
              <a href="/projects" class="exp-role-cases">View Case Studies <span class="icon" data-icon="siArrowRight"></span></a>
            </aside>
          </article>

          <article class="exp-role" id="exp-panel-3" role="tabpanel" aria-labelledby="exp-tab-3" data-exp-index="3" aria-hidden="true">
            <aside class="exp-role-company">
              <h3 class="exp-role-company-name">Oxygen Soft</h3>
              <p class="exp-role-company-loc"><span class="icon" data-icon="siLocationPin"></span> Lahore, Pakistan</p>
              <ul class="exp-role-facts">
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siBriefcase"></span></span><span><small>Type</small>Internship</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siHome"></span></span><span><small>Mode</small>On-site</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siUsers"></span></span><span><small>Team Size</small>10+ Members</span></li>
                <li><span class="exp-role-fact-icon"><span class="icon" data-icon="siGlobe"></span></span><span><small>Domain</small>.NET Development</span></li>
              </ul>
            </aside>
            <div class="exp-role-main">
              <div class="exp-role-head">
                <span class="exp-role-badge is-past">Internship</span>
                <p class="exp-role-dates">May 2021 – Aug 2021</p>
                <h3 class="exp-role-title">.NET Developer Intern</h3>
              </div>
              <p class="exp-role-desc is-collapsed">Developed and maintained .NET desktop applications ensuring optimal performance and scalability. Collaborated with teams to analyze requirements, design solutions, and implement features adhering to coding standards. Participated in code reviews and documented processes.</p>
              <button class="exp-role-toggle is-collapsed" type="button" aria-expanded="false"><span class="exp-role-toggle-label">Show more</span> <span class="icon" data-icon="siArrowUp"></span></button>
              <div class="exp-role-achievements">
                <div class="exp-role-achievements-list">
                  <h4 class="exp-role-kicker">Key Achievements</h4>
                  <ul>
                    <li>Implemented 5+ core features</li>
                    <li>Assisted in system analysis and design</li>
                    <li>Followed best coding practices</li>
                  </ul>
                </div>
                <div class="exp-role-impact">
                  <h4 class="exp-role-kicker">Role Impact</h4>
                  <ul>
                    <li><strong>5+</strong><span>Core Features Shipped</span></li>
                    <li><strong>100%</strong><span>Sprint Delivery Rate</span></li>
                    <li><strong>3</strong><span>Systems Documented</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <aside class="exp-role-aside">
              <div class="exp-role-tech">
                <h4 class="exp-role-kicker">Technologies</h4>
                <div class="exp-role-tech-grid">
                  <span class="exp-tech-chip" title=".NET">
                    <span class="icon" data-icon="siDotNet"></span>
                  </span>
                  <span class="exp-tech-chip" title=".Net Core">
                    <span class="icon" data-icon="siDotNetCore"></span>
                  </span>
                  <span class="exp-tech-chip" title="C Sharp">
                    <span class="icon" data-icon="siCsharp"></span>
                  </span>
                  <span class="exp-tech-chip" title="Visual Studio">
                    <span class="icon" data-icon="siVisualStudio"></span>
                  </span>
                  <span class="exp-tech-chip" title="SQL Database">
                   <span class="icon" data-icon="siSql"></span>
                  </span>
                  <span class="exp-tech-chip" title="Compose Multiplatform">
                    <span class="icon" data-icon="siComposeMultiplatform"></span>
                  </span>
                  <span class="exp-tech-chip" title="Microsoft Azure">
                    <span class="icon" data-icon="siMicrosoftAzure"></span>
                  </span>
                </div>
              </div>
              <a href="/projects" class="exp-role-cases">View Case Studies <span class="icon" data-icon="siArrowRight"></span></a>
            </aside>
          </article>
        </div>

        <div class="exp-skill-row">
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siCode"></span></div>
            <div>
              <h4>Full Stack Expertise</h4>
              <p>End-to-end delivery across UI, APIs, and databases.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siUsers"></span></div>
            <div>
              <h4>Agile Collaboration</h4>
              <p>Cross-functional teamwork with timely, quality releases.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siSpark"></span></div>
            <div>
              <h4>Performance Focus</h4>
              <p>Faster queries, lighter frontends, measurable gains.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siAward"></span></div>
            <div>
              <h4>Client Satisfaction</h4>
              <p>Reliable handoffs and 100% client satisfaction.</p>
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
