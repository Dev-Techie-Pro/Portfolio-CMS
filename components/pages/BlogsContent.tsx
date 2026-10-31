"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `${getSiteHeaderHtml("blogs")}
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
    ${SITE_FOOTER_HTML}`;

export function BlogsContent() {
  return (
    <PortfolioHtmlContent
      page="BlogsContent"
      className="blog-page"
      html={PAGE_HTML}
    />
  );
}
