"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
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
            <a href="/skills" class="nav-link">Skills</a>
            <a href="/experience" class="nav-link">Experience</a>
            <a href="/projects" class="nav-link ">Projects</a>
            <a href="/blogs" class="nav-link">Blogs</a>
            <a href="/testimonials" class="nav-link active">Testimonials</a>
          </nav>
          <div class="nav-right-btns">
            <a href="/contact" class="nav-cta"> Hire Me <span class="icon" data-icon="ri-arrow-right-up-line"></span>
            </a>
            <a href="#0" class="btn btn-outline" id="customizeBtn" aria-label="Customize" aria-expanded="false" aria-controls="customizePanel">
              <span class="icon" data-icon="ri-palette-line"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
    <section class="hero-testi" aria-labelledby="ht-headline-text">
      <div class="container">
        <div class="hero-testi-grid">
          <div class="ht-left reveal-left"><span class="accent-tag"> Client Feedback</span>
            <h1 class="about-hero-heading"> No fluff. <br /><span class="green">Just proof.</span></h1>
            <p class="about-hero-body"> I'm grateful to have worked with such incredible clients and teams. Here's what they have to say about our collaboration. </p>
            <div class="ht-cta-row">
              <a href="#testimonials" class="si-btn si-btn-primary"> View Testimonials 
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
              <a href="/contact" class="btn btn-outline"> Let's Work Together 
                <span class="icon" data-icon="ri-arrow-right-line"></span>
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
          <div class="ht-right reveal-right">
            <div class="ht-orbit-stage" id="thOrbit">
              <div class="ht-dashed-circle-outer" aria-hidden="true"></div>
              <div class="ht-dashed-circle" aria-hidden="true"></div>
              <div class="ht-trust-badge" role="note"><span class="icon" data-icon="siGlobe"></span> Trusted by clients worldwide </div><button type="button" class="ht-badge ht-badge-experience orbit-node" data-info="5+ years of experience delivering full-stack web applications across a wide range of industries."><span class="icon" data-icon="ri-time-line"></span> 3+ Years Experience</button><button type="button" class="ht-badge ht-badge-delivery orbit-node" data-info="On-time delivery across every engagement, with clear milestone tracking."><span class="icon" data-icon="ri-check-line"></span> On Time Delivery</button><button type="button" class="ht-badge ht-badge-clients orbit-node" data-info="60+ happy clients across various industries, from startups to established businesses."><span class="icon" data-icon="ri-group-line"></span> 60+ Happy Clients</button><button type="button" class="ht-badge ht-badge-rating orbit-node" data-info="98% of clients rate their experience as excellent based on post-project surveys."><span class="icon" data-icon="ri-star-fill"></span> 5.0 Average Rating</button><button type="button" class="ht-orbit-node ht-node-1 orbit-node" data-info="100+ projects completed end-to-end, from planning through deployment." data-name="Projects" data-avatar=""><span class="ht-node-icon" style="color: var(--accent)"><span class="icon" data-icon="ri-calendar-check-line"></span></span><span class="ht-node-label"><strong>100+</strong><span>Projects Completed</span></span></button><button type="button" class="ht-orbit-node ht-node-2 orbit-node" data-info="98% of clients rate their experience as excellent based on post-project surveys."><span class="ht-node-icon" style="color: var(--danger)"><span class="icon" data-icon="ri-heart-line"></span></span><span class="ht-node-label"><strong>98%</strong><span>Client Satisfaction</span></span></button><button type="button" class="ht-orbit-node ht-node-3 orbit-node" data-info="60+ happy clients across various industries, from startups to established businesses." data-name="Clients" data-avatar=""><span class="ht-node-icon" style="color: var(--accent)"><span class="icon" data-icon="ri-emotion-line"></span></span><span class="ht-node-label"><strong>60+</strong><span>Happy Clients</span></span></button><button type="button" class="ht-orbit-node ht-node-4 orbit-node" data-info="120+ repositories across personal and client projects, showcasing consistent open-source and production work."><span class="ht-node-icon" style="color: var(--accent)"><span class="icon" data-icon="ri-github-fill"></span></span><span class="ht-node-label"><strong>100+</strong><span>GitHub Repos</span></span></button>
              <div class="ht-testi-card" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
                <div class="ht-testi-top"><span class="ht-quote-mark" aria-hidden="true">&ldquo;</span><span class="ht-stars" aria-label="5 out of 5 stars"><span class="icon" data-icon="ri-star-fill"></span><span class="icon" data-icon="ri-star-fill"></span><span class="icon" data-icon="ri-star-fill"></span><span class="icon" data-icon="ri-star-fill"></span><span class="icon" data-icon="ri-star-fill"></span></span></div>
                <div class="th-quote-slider" id="thSlider"></div>
                <div class="ht-testi-divider"></div>
                <div class="ht-testi-author" id="thClient">
                  <div class="ht-testi-avatar" id="thClientAvatar">SJ</div>
                  <div class="ht-testi-author-info"><strong id="thClientName">Sarah Johnson</strong><span id="thClientRole">CEO, TechFlow</span></div>
                </div>
                <div class="ht-plus-badge" aria-hidden="true">+15</div>
                <div class="ht-testi-dots th-dots" id="thDots" role="tablist" aria-label="Testimonial navigation"></div>
              </div>
              <div class="ht-spinner-orbit" aria-hidden="true"></div>
              <div class="ht-spinner-dot" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="testi-section" id="testimonials" aria-label="Client testimonials">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left">
            <p class="section-label">Social Proof</p>
            <h2 class="about-heading"> The Rave <br /><strong>Reviews</strong></h2>
            <p class="section-desc reveal"> Stories of impact, reliability, and quality from those who've experienced my work first-hand. </p>
          </div>
          <div class="trv-metrics reveal" role="group" aria-label="Review statistics">
            <div class="trv-metric-card"><span class="trv-metric-icon" aria-hidden="true"><span class="icon" data-icon="ri-star-fill"></span></span><span class="trv-metric-body"><span class="trv-metric-num">5.0</span><span class="trv-metric-label">Average Rating</span></span></div>
            <div class="trv-metric-card"><span class="trv-metric-icon" aria-hidden="true"><span class="icon" data-icon="ri-chat-3-line"></span></span><span class="trv-metric-body"><span class="trv-metric-num" data-target="25" data-suffix="+">0+</span><span class="trv-metric-label">Reviews</span></span></div>
            <div class="trv-metric-card"><span class="trv-metric-icon" aria-hidden="true"><span class="icon" data-icon="ri-group-line"></span></span><span class="trv-metric-body"><span class="trv-metric-num" data-target="20" data-suffix="+">0+</span><span class="trv-metric-label">Happy Clients</span></span></div>
            <div class="trv-metric-card"><span class="trv-metric-icon" aria-hidden="true"><span class="icon" data-icon="ri-award-line"></span></span><span class="trv-metric-body"><span class="trv-metric-num" data-target="100" data-suffix="%">0%</span><span class="trv-metric-label">Satisfaction</span></span></div>
          </div>
        </div>
        <div class="trv-filter-bar reveal">
          <div class="trv-filter-row">
            <div class="trv-search"><span class="icon" data-icon="ri-search-line"></span><input type="search" id="trvSearch" class="trv-search-input" placeholder="Search reviews..." aria-label="Search reviews" autocomplete="off" /><kbd class="trv-search-kbd">Ctrl K</kbd></div>
            <div class="trv-select-wrap"><select id="trvServiceFilter" class="trv-select" aria-label="Filter by service">
                <option value="all">All Services</option>
              </select><span class="icon" data-icon="ri-arrow-down-s-line"></span></div>
            <div class="trv-select-wrap"><select id="trvClientFilter" class="trv-select" aria-label="Filter by client">
                <option value="all">All Clients</option>
              </select><span class="icon" data-icon="ri-arrow-down-s-line"></span></div>
            <div class="trv-select-wrap"><select id="trvRatingFilter" class="trv-select" aria-label="Filter by rating">
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars &amp; up</option>
                <option value="3">3 Stars &amp; up</option>
              </select><span class="icon" data-icon="ri-arrow-down-s-line"></span></div><button type="button" id="trvClearFilters" class="trv-clear-btn"><span class="icon" data-icon="ri-refresh-line"></span> Clear Filters </button>
            <div class="trv-sort-wrap"><span class="trv-sort-label">Sort by:</span>
              <div class="trv-select-wrap"><select id="trvSortSelect" class="trv-select" aria-label="Sort reviews">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rated</option>
                  <option value="name-az">Name A–Z</option>
                </select><span class="icon" data-icon="ri-arrow-down-s-line"></span></div>
            </div>
          </div>
        </div>
        <div class="trv-results-bar reveal">
          <div class="trv-view-toggle" role="group" aria-label="View mode"><button type="button" class="trv-view-btn active" data-view="grid" aria-pressed="true"><span class="icon" data-icon="ri-apps-line"></span> Grid</button><button type="button" class="trv-view-btn" data-view="list" aria-pressed="false"><span class="icon" data-icon="ri-list-check"></span> List</button><button type="button" class="trv-view-btn" data-view="masonry" aria-pressed="false"><span class="icon" data-icon="ri-layout-masonry-line"></span> Masonry </button></div>
          <div class="trv-perpage-wrap"><span class="trv-sort-label">Show:</span>
            <div class="trv-select-wrap trv-select-wrap--sm"><select id="trvPerPage" class="trv-select" aria-label="Reviews per page">
                <option value="6">6 per page</option>
                <option value="9">9 per page</option>
                <option value="12">12 per page</option>
                <option value="999">All</option>
              </select><span class="icon" data-icon="ri-arrow-down-s-line"></span></div>
            <div class="trv-pager"><button type="button" id="trvPagePrev" class="trv-pager-btn" aria-label="Previous page" disabled><span class="icon" data-icon="ri-arrow-left-s-line"></span></button><span class="trv-pager-page" id="trvPagerPage">1</span><button type="button" id="trvPageNext" class="trv-pager-btn" aria-label="Next page" disabled><span class="icon" data-icon="ri-arrow-right-s-line"></span></button></div>
          </div>
        </div>
        <div class="testi-cards-grid trv-grid" id="trvGrid" data-view="grid">
          <div class="trv-more-card reveal" id="trvMoreCard" aria-hidden="true"><span class="trv-more-icon" aria-hidden="true"><span class="icon" data-icon="ri-chat-3-line"></span></span>
            <p>More amazing reviews<br />coming soon&hellip;</p>
          </div>
          <p class="trv-no-results" id="trvNoResults" hidden> No reviews match your filters. Try adjusting your search. </p>
        </div>
        <div class="trv-footer reveal">
          <p class="trv-footer-count" id="trvFooterCount"> Showing 1 to 5 of 5 reviews </p>
          <div class="trv-footer-badges">
            <div class="trv-footer-badge"><span class="trv-footer-badge-icon" aria-hidden="true"><span class="icon" data-icon="ri-shield-line"></span></span><span><strong>Verified Reviews</strong><small>All reviews are from verified clients</small></span></div>
            <div class="trv-footer-badge"><span class="trv-footer-badge-icon" aria-hidden="true"><span class="icon" data-icon="ri-time-line"></span></span><span><strong>On-Time Delivery</strong><small>Projects completed as promised</small></span></div>
            <div class="trv-footer-badge"><span class="trv-footer-badge-icon" aria-hidden="true"><span class="icon" data-icon="ri-headphone-line"></span></span><span><strong>Ongoing Support</strong><small>Continued support after delivery</small></span></div>
          </div>
          <p class="trv-results-count"><span class="trv-dot" aria-hidden="true"></span><span id="trvResultsCount">5</span> Reviews Found </p>
        </div>
      </div>
    </section>
    <section class="clients-section" aria-label="Clients">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left">
            <p class="section-label">My Network</p>
            <h2 class="about-heading"> Where I've <br /><strong>Made an Impact</strong></h2>
          </div>
          <p class="section-desc reveal"> From agile startups to established enterprises — I've partnered with diverse organizations to solve real-world problems through technology. </p>
        </div>
        <div class="clients-logos">
          <div class="client-logo-item">
            <div class="client-logo-icon">TC</div> TechCorp
          </div>
          <div class="client-logo-item">
            <div class="client-logo-icon">DS</div> DevStudio
          </div>
          <div class="client-logo-item">
            <div class="client-logo-icon">IX</div> InnovateX
          </div>
          <div class="client-logo-item">
            <div class="client-logo-icon">WB</div> Webify
          </div>
          <div class="client-logo-item">
            <div class="client-logo-icon">PW</div> PixelWorks
          </div>
          <div class="client-logo-item">
            <div class="client-logo-icon">BR</div> Brandify
          </div>
        </div>
      </div>
    </section>
    <section class="cta-banner" aria-label="Call to action">
      <div class="cta-geo" aria-hidden="true"></div>
      <div class="cta-sphere-wrap" aria-hidden="true"><canvas class="cta-sphere-canvas" id="ctaSphereCanvas" width="500" height="400"></canvas></div>
      <div class="container">
        <div class="cta-inner">
          <div class="reveal-left">
            <div class="cta-eyebrow"><span class="cta-eyebrow-line"></span><span class="cta-eyebrow-text">LET'S BUILD TOGETHER</span></div>
            <h2 class="cta-heading"> READY TO BUILD <br /> SOMETHING <span class="accent">EXTRAORDINARY?</span></h2>
            <p class="cta-sub"> Let's create something amazing together. Have a project in mind? I'd love to hear about it. </p>
            <div style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                margin-top: 2.5rem;
              "><a href="/contact" class="si-btn si-btn-primary"> Start a Project <span class="icon" data-icon="ri-arrow-right-line"></span></a><a href="#" class="btn btn-outline"> Download Case Study <span class="icon" data-icon="ri-download-line"></span></a></div>
          </div>
        </div>
      </div>
    </section>
    <footer class="site-footer" id="site-footer">
      <div class="footer-bg" aria-hidden="true"><span class="icon" data-icon="siGridDots"></span>
        <div class="footer-bg-glow-blob"></div>
        <div class="footer-bg-radar"></div>
        <div class="footer-bg-globe"><span class="icon" data-icon="siFooterGlobe"></span></div>
        <div class="footer-bg-noise"></div>
      </div>
      <div class="footer-inner container">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand"><a href="#" class="nav-logo" aria-label="Home">
              <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
              <div class="logo-text"><span class="logo-name">M Sohaib Ishaque</span><span class="logo-role">Full Stack Web Developer</span></div>
            </a>
            <p class="brand-tagline"> Building digital experiences that make an impact. Clean code, modern design, scalable solutions. </p>
            <div class="brand-rule" aria-hidden="true"></div>
            <div class="footer-cta-card">
              <div class="footer-cta-icon" aria-hidden="true"><span class="icon" data-icon="ri-send-plane-line"></span></div>
              <h3 class="footer-cta-title">Let's work together</h3>
              <p class="footer-cta-text"> Have a project in mind or just want to say hi? I'd love to hear from you. </p><a href="/contact" class="footer-cta-button"> Get In Touch <span class="icon" data-icon="ri-arrow-right-up-line"></span></a>
            </div>
          </div>
          <nav class="footer-col footer-col--nav" aria-labelledby="footer-nav-heading">
            <h3 class="footer-col-heading" id="footer-nav-heading"><span class="dot" aria-hidden="true"></span>Quick Links </h3>
            <ul class="footer-link-list">
              <li><a href="/testimonials" class="footer-link-active"><span class="dot dot--small" aria-hidden="true"></span>Testimonials </a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/skills">Skills</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/experience">Experience</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <nav class="footer-col footer-col--services" aria-labelledby="footer-services-heading">
            <h3 class="footer-col-heading" id="footer-services-heading"><span class="dot" aria-hidden="true"></span>Technologies </h3>
            <ul class="footer-link-list">
              <li><a href="/skills">Angular &amp; React</a></li>
              <li><a href="/skills">Next.js</a></li>
              <li><a href="/skills">Node.js</a></li>
              <li><a href="/skills">TypeScript</a></li>
              <li><a href="/skills">MongoDB</a></li>
              <li><a href="/skills">Tailwind CSS</a></li>
            </ul>
          </nav>
          <div class="footer-col footer-col--contact" id="FooterContact">
            <h3 class="footer-col-heading"><span class="dot" aria-hidden="true"></span>Let's Connect </h3>
            <ul class="footer-contact-list">
              <li class="footer-contact-item"><span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-phone-line"></span></span><span class="footer-contact-text"><a href="tel:+15551234567">+92 3038464315</a><span class="footer-contact-sub">Mon - Fri, 9AM - 6PM EST</span></span></li>
              <li class="footer-contact-item"><span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-mail-line"></span></span><span class="footer-contact-text"><a href="mailto:engineer.sohaibishaque@gmail.com">engineer.sohaibishaque@gmail.com</a><span class="footer-contact-sub">I'll get back to you soon</span></span></li>
              <li class="footer-contact-item"><span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-map-pin-line"></span></span><span class="footer-contact-text"><span class="contact-static">Rawalpindi, Pakistan</span><span class="footer-contact-sub">Available for remote work</span></span></li>
            </ul>
            <ul class="footer-social-list" aria-label="Social media links">
              <li>
                <a href="https://github.com/Sohaib-Ishaque" class="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <span class="icon" data-icon="ri-github-fill"></span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/" class="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <span class="icon" data-icon="ri-linkedin-fill"></span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" class="social-icon" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                <span class="icon" data-icon="ri-twitter-x-fill"></span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <span class="icon" data-icon="ri-instagram-line"></span>
                </a>
              </li>
            </ul>
            <p class="freelance-note"><strong>Available</strong> for freelance work <br />and exciting opportunities. </p>
${SITE_FOOTER_NEWSLETTER_HTML}
          </div>
        </div>
        <div class="footer-bottom">
          <div class="bottom-left"><span class="code-icon" aria-hidden="true">&lt;/&gt;</span><span>Designed &amp; Built by <span class="accent">M Sohaib Ishaque</span></span><span class="icon" data-icon="ri-heart-line"></span></div>
          <div class="bottom-center"> &copy; 2025 <span class="accent">M Sohaib Ishaque</span>. All rights reserved. </div>
        </div>
      </div>
    </footer>`;

export function TestimonialsContent() {
  return <PortfolioHtmlContent page="TestimonialsContent" html={PAGE_HTML} />;
}
