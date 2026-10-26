"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_NEWSLETTER_HTML } from "@/lib/portfolio/site-footer-newsletter-html";

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
              <a href="/blogs" class="nav-link active">Blogs</a>
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
    <section class="about-hero" id="about-hero" aria-label="About hero">
      <div class="about-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="abt2-hero-inner">
          <div class="abt2-left reveal-left">
            <span class="accent-tag abt2-tag">My Blogs</span>

            <h1 class="abt2-heading">
              <span class="line-white">From My</span>
              <span class="line-accent">Blog Post</span>
            </h1>
            <p class="abt2-body">
              Sharing insights, tutorials, and lessons from building real-world web applications — practical knowledge for developers who ship.
            </p>

            <div class="abt2-ctas">
              <a href="#blog-recent" class="si-btn si-btn-primary">
                Explore Articles
                <span class="icon" data-icon="ri-arrow-right-line"></span>
              </a>
              <a href="#blog-newsletter" class="btn btn-outline blog-hero-subscribe">
                Subscribe
                <span class="icon" data-icon="ri-notification-line"></span>
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

            <div class="blogs-portrait-wrap">
              <img src="https://res.cloudinary.com/w3xvfqgt/image/upload/v1787771828/blog-hero-banner.png" alt="Blogs Hero Banner Image" loading="eager" />
            </div>

            <div class="abt2-card abt2-card-tech blogs-tech-float">
              <div class="abt2-card-icon">
                <span class="icon" data-icon="ri-book-open-line"></span>
              </div>
              <div>
                <div class="abt2-card-num">Sharing Knowledge</div>
                <div class="abt2-card-label">Weekly dev insights</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="projects-gallery" id="blogGallery" aria-label="Blogs gallery">
      <div class="filter-section" role="navigation" aria-label="Blog filters">
        <div class="container">
          <div class="pf-topbar">
            <div class="pf-search">
              <span class="icon" data-icon="ri-search-line"></span>
              <input type="text" id="blSearchInput" class="pf-search-input" placeholder="Search blogs..." aria-label="Search projects" />
              <kbd class="pf-kbd">Ctrl K</kbd>
            </div>
  
            <div class="pf-dropdown" data-dropdown="category">
              <button class="pf-dropdown-btn" type="button" id="blDropdownBtnCategory" aria-haspopup="listbox" aria-expanded="false" aria-controls="pfDropdownMenuCategory">
                <span class="pf-dropdown-label" id="blDropdownLabelCategory">All Categories</span>
                <span class="icon" data-icon="ri-arrow-down-s-line"></span>
              </button>
              <ul class="pf-dropdown-menu" id="blDropdownMenuCategory" role="listbox" aria-label="Filter by category">
                <li role="option" data-value="all" aria-selected="true">All Posts</li>
                <li role="option" data-value="web">Web Development</li>
                <li role="option" data-value="ui/ux">UI/UX Designs</li>
                <li role="option" data-value="product-design">Product Design</li>
                <li role="option" data-value="career">Career</li>
                <li role="option" data-value="tools">System Design / Tools</li>
                <li role="option" data-value="tutorials">Tutorials</li>
              </ul>
            </div>
            <div class="pg-view-toggle bl-view-toggle" role="group" aria-label="Gallery view mode">
              <button class="pg-view-btn active" type="button" data-view="grid" aria-pressed="true">
                <span class="icon" data-icon="ri-apps-line"></span>
                Grid
              </button>
              <button class="pg-view-btn" type="button" data-view="list" aria-pressed="false">
                <span class="icon" data-icon="ri-menu-line"></span>
                List
              </button>
              <button class="pg-view-btn" type="button" data-view="masonry" aria-pressed="false">
                <span class="icon" data-icon="ri-layout-masonry-line"></span>
                Masonry
              </button>
            </div>
            <div class="pf-dropdown pg-sort-dropdown" data-dropdown="sort">
              <select id="blSortSelect" class="pg-sort-select" aria-label="Sort projects">
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="pg-layout blogs-layout">
          <div class="pg-main">
            <div class="pg-grid blogs-grid" id="blogsGrid"></div>
            <div class="pg-pagination">
              <div class="pg-pagination-controls" id="blPaginationControls">
                <button class="pg-page-arrow" type="button" id="blPagePrev" aria-label="Previous page">
                  <span class="icon" data-icon="ri-arrow-left-s-line"></span>
                </button>
                <button class="pg-page-num active" type="button" data-page="1" aria-current="page">1</button>
                <button class="pg-page-arrow" type="button" id="blPageNext" aria-label="Next page">
                  <span class="icon" data-icon="ri-arrow-right-s-line"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="blog-newsletter" id="blog-newsletter" aria-label="Newsletter signup">
      <div class="container">
        <div class="blog-newsletter-inner reveal">
          <div class="blog-newsletter-icon" aria-hidden="true">
            <span class="icon" data-icon="ri-mail-line"></span>
          </div>
          <div class="blog-newsletter-copy">
            <h2 class="blog-newsletter-title">Stay Updated</h2>
            <p>Get the latest insights delivered to your inbox. </p>
            <span>No spam. Unsubscribe anytime.</span>
          </div>
          <form class="blog-newsletter-form" id="blogNewsletterForm" novalidate>
            <input type="Email" id="blogNewslettersiEmail" class="blog-newsletter-input" placeholder="Enter your Email" required />
            <button type="submit" class="si-btn si-btn-primary">
              Subscribe
              <span class="icon" data-icon="ri-send-plane-line"></span>
            </button>
          </form>
        </div>
      </div>
    </section>
    <section class="blog-topics" aria-labelledby="blog-topics-heading">
      <div class="container">
        <div class="section-header">
          <div class="section-title-group reveal-left">
            <p class="section-label">Explore</p>
            <h2 id="blog-topics-heading" class="about-heading">Popular<br /><strong>Topics</strong></h2>
          </div>
        </div>
        <div class="blog-topics-grid" id="blogTopicsGrid">
          <button type="button" class="blog-topic-card" data-category="backend">
            <span class="blog-topic-icon" aria-hidden="true">BA</span>
            <span class="blog-topic-name">Backend</span>
            <span class="blog-topic-count">2 Articles</span>
          </button>
          <button type="button" class="blog-topic-card" data-category="frontend">
            <span class="blog-topic-icon" aria-hidden="true">FR</span>
            <span class="blog-topic-name">Frontend</span>
            <span class="blog-topic-count">2 Articles</span>
          </button>
          <button type="button" class="blog-topic-card" data-category="wordpress">
            <span class="blog-topic-icon" aria-hidden="true">WO</span>
            <span class="blog-topic-name">WordPress</span>
            <span class="blog-topic-count">1 Article</span>
          </button>
          <button type="button" class="blog-topic-card" data-category="ui-ux">
            <span class="blog-topic-icon" aria-hidden="true">UX</span>
            <span class="blog-topic-name">UI/UX Design</span>
            <span class="blog-topic-count">1 Article</span>
          </button>
          <button type="button" class="blog-topic-card" data-category="designs-system">
            <span class="blog-topic-icon" aria-hidden="true">DS</span>
            <span class="blog-topic-name">Designs System</span>
            <span class="blog-topic-count">1 Article</span>
          </button>
        </div>
      </div>
    </section>
    <section class="blog-recent" id="blog-recent" aria-labelledby="blog-recent-heading">
      <div class="container">
        <div class="blog-recent-layout">
          <div class="blog-recent-main">
            <div class="section-header">
              <div class="section-title-group reveal-left">
                <p class="section-label">Latest</p>
                <h2 id="blog-recent-heading" class="about-heading">Recent<br /><strong>Articles</strong></h2>
              </div>
            </div>
            <div class="blog-recent-list" id="blogRecentList" role="list"></div>
            <p class="blog-no-results" id="blogNoResults" hidden>No articles match your filters.</p>
          </div>
          <aside class="blog-sidebar" aria-label="Blog sidebar">
            <div class="blog-sidebar-card reveal">
              <p class="section-label">About This Blog</p>
              <h3 class="blog-sidebar-title">Real-world dev insights</h3>
              <p class="blog-sidebar-text">
                I write about full-stack development, architecture, and lessons learned from client projects — so you can avoid the mistakes I already made.
              </p>
              <ul class="blog-sidebar-list">
                <li><span class="icon" data-icon="ri-check-line"></span>Real-world experiences</li>
                <li><span class="icon" data-icon="ri-check-line"></span>Practical tutorials</li>
                <li><span class="icon" data-icon="ri-check-line"></span>Architecture insights</li>
                <li><span class="icon" data-icon="ri-check-line"></span>Career &amp; growth tips</li>
              </ul>
              <a href="/about" class="faq-cta-btn">Learn More About Me</a>
            </div>
            <div class="blog-sidebar-card reveal">
              <p class="section-label">Top Reads</p>
              <h3 class="blog-sidebar-title">Most popular</h3>
              <ol class="blog-top-reads" id="blogTopReads"></ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <footer class="site-footer" id="site-footer">
      <div class="footer-bg" aria-hidden="true">
        <span class="icon" data-icon="siGridDots"></span>
        <div class="footer-bg-glow-blob"></div>
        <div class="footer-bg-radar"></div>
        <div class="footer-bg-globe"><span class="icon" data-icon="siFooterGlobe"></span></div>
        <div class="footer-bg-noise"></div>
      </div>
      <div class="footer-inner container">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand">
            <a href="/" class="nav-logo" aria-label="Home">
              <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
              <div class="logo-text">
                <span class="logo-name">M Sohaib Ishaque</span>
                <span class="logo-role">Full Stack Web Developer</span>
              </div>
            </a>
            <p class="brand-tagline">Building digital experiences that make an impact. Clean code, modern design, scalable solutions.</p>
            <div class="brand-rule" aria-hidden="true"></div>
            <div class="footer-cta-card">
              <div class="footer-cta-icon" aria-hidden="true"><span class="icon" data-icon="ri-send-plane-line"></span></div>
              <h3 class="footer-cta-title">Let's work together</h3>
              <p class="footer-cta-text">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
              <a href="/contact" class="footer-cta-button">Get In Touch <span class="icon" data-icon="ri-arrow-right-up-line"></span></a>
            </div>
          </div>
          <nav class="footer-col footer-col--nav" aria-labelledby="footer-nav-heading">
            <h3 class="footer-col-heading" id="footer-nav-heading"><span class="dot" aria-hidden="true"></span>Quick Links</h3>
            <ul class="footer-link-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/skills">Skills</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/blogs" class="footer-link-active"><span class="dot dot--small" aria-hidden="true"></span>Blogs</a></li>
              <li><a href="/experience">Experience</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <nav class="footer-col footer-col--services" aria-labelledby="footer-categories-heading">
            <h3 class="footer-col-heading" id="footer-categories-heading"><span class="dot" aria-hidden="true"></span>Categories</h3>
            <ul class="footer-link-list">
              <li><a href="/blogs">Backend</a></li>
              <li><a href="/blogs">Frontend</a></li>
              <li><a href="/blogs">WordPress</a></li>
              <li><a href="/blogs">Architecture</a></li>
            </ul>
          </nav>
          <div class="footer-col footer-col--contact">
            <h3 class="footer-col-heading"><span class="dot" aria-hidden="true"></span>Let's Connect</h3>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-phone-line"></span></span>
                <span class="footer-contact-text">
                  <a href="tel:+923038464315">+92 3038464315</a>
                  <span class="footer-contact-sub">Mon - Fri, 9AM - 6PM</span>
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-mail-line"></span></span>
                <span class="footer-contact-text">
                  <a href="mailto:engineer.sohaibishaque@gmail.com">engineer.sohaibishaque@gmail.com</a>
                  <span class="footer-contact-sub">I'll get back to you soon</span>
                </span>
              </li>
              <li class="footer-contact-item">
                <span class="footer-contact-icon" aria-hidden="true"><span class="icon" data-icon="ri-map-pin-line"></span></span>
                <span class="footer-contact-text">
                  <span class="contact-static">Rawalpindi, Pakistan</span>
                  <span class="footer-contact-sub">Available for remote work</span>
                </span>
              </li>
            </ul>
            <ul class="footer-social-list" aria-label="Social media links">
              <li><a href="https://github.com/Sohaib-Ishaque" class="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-github-fill"></span></a></li>
              <li><a href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/" class="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-linkedin-fill"></span></a></li>
              <li><a href="https://twitter.com/" class="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-twitter-x-fill"></span></a></li>
              <li><a href="https://instagram.com/" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-instagram-line"></span></a></li>
            </ul>
            <p class="freelance-note"><strong>Available</strong> for freelance work<br />and exciting opportunities.</p>
${SITE_FOOTER_NEWSLETTER_HTML}
          </div>
        </div>
        <div class="footer-bottom">
          <div class="bottom-left"><span class="code-icon" aria-hidden="true">&lt;/&gt;</span><span>Designed &amp; Built by <span class="accent">M Sohaib Ishaque</span></span><span class="icon" data-icon="ri-heart-line"></span></div>
          <div class="bottom-center">&copy; 2025 <span class="accent">M Sohaib Ishaque</span>. All rights reserved.</div>
        </div>
      </div>
    </footer>`;

export function BlogsContent() {
  return (
    <PortfolioHtmlContent
      page="BlogsContent"
      className="blog-page"
      html={PAGE_HTML}
    />
  );
}
