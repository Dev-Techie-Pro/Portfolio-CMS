/**
 * Shared static HTML shell for root `template-*.html` reference pages.
 * Paths use `/assets/...` (serve from `public/` via dev server or copy templates into `public/`).
 */

const HERO_IMAGE =
  "https://res.cloudinary.com/w3xvfqgt/image/upload/v1787743478/angular-performance-tips-production.png";

export function blogDetailTemplateHead(title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="/assets/css/styles.css" />
  <link rel="stylesheet" href="/assets/css/blog-pages.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" />
</head>
<body class="blog-details-page">`;
}

export function blogDetailHero(opts: {
  tplClass: string;
  category: string;
  titleHtml: string;
  excerpt: string;
  image?: string;
}): string {
  const img = opts.image || HERO_IMAGE;
  return `
<div class="blog-details-page ${opts.tplClass}" style="--bd-hero-image: url('${img}')">
  <section class="blog-details-hero">
    <div class="container">
      <nav class="bd-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true">/</span>
        <a href="/blogs">Blogs</a><span aria-hidden="true">/</span>
        <span aria-current="page">Article preview</span>
      </nav>
      <div class="hero-content bd-hero-content">
        <span class="badge">${opts.category}</span>
        <h1 class="hero-title">${opts.titleHtml}</h1>
        <p class="hero-intro">${opts.excerpt}</p>
        <div class="hero-meta">
          <div class="nav-logo" aria-label="Author">
            <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
            <div class="logo-text">
              <span class="logo-name">M. Sohaib Ishaque</span>
              <span class="logo-role">Full Stack Web Developer</span>
            </div>
          </div>
          <div class="meta-divider" aria-hidden="true"></div>
          <div class="meta-item"><i class="ri-calendar-line" aria-hidden="true"></i><time>Dec 8, 2023</time></div>
          <div class="meta-item"><i class="ri-time-line" aria-hidden="true"></i><span>7 min read</span></div>
          <div class="meta-tags">
            <span class="meta-tag">Angular</span>
            <span class="meta-tag">Performance</span>
            <span class="meta-tag">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export const STANDARD_ARTICLE = `
<article class="article-content">
  <section id="introduction">
    <h2>Introduction</h2>
    <p>Angular applications can feel fast in development and sluggish in production. This reference layout matches the <strong>Standard</strong> detail template: TOC left, article center, sidebar right.</p>
  </section>
  <div class="stat-box">
    <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
    <div><div class="stat-value">60%</div><p class="stat-text">Faster load times after lazy-loading feature modules.</p></div>
  </div>
  <section id="lazy-load">
    <h2>Lazy load feature modules</h2>
    <div class="feature-grid">
      <div class="feature-card"><div class="feature-icon"><i class="ri-route-line"></i></div><h4>Route splitting</h4><p>Shrink the initial bundle.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-speed-line"></i></div><h4>Prefetching</h4><p>Warm critical routes early.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-refresh-line"></i></div><h4>OnPush</h4><p>Reduce change detection work.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-database-2-line"></i></div><h4>TrackBy</h4><p>Stabilize list DOM nodes.</p></div>
    </div>
  </section>
  <section id="comparison">
    <h2>OnPush change detection</h2>
    <div class="compare-grid">
      <div class="compare-card"><h3>Default strategy</h3><ul class="check-list"><li>More CD cycles</li><li>Larger bundles</li></ul></div>
      <div class="compare-card"><h3>OnPush strategy</h3><ul class="check-list"><li>Fewer checks</li><li>Measurable LCP gains</li></ul></div>
    </div>
  </section>
  <section id="conclusion">
    <h2>Conclusion</h2>
    <div class="quote-box"><p>Performance is a feature — measure, iterate, and ship improvements continuously.</p></div>
  </section>
</article>`;

export const MINIMAL_ARTICLE = STANDARD_ARTICLE;

export const LONGFORM_ARTICLE = `
<article class="article-content">
  <section id="introduction">
    <h2 data-section-num="01">Introduction</h2>
    <p>Longform guides use a sticky table of contents and a wide article column — no right sidebar.</p>
  </section>
  <section id="project-overview">
    <h2 data-section-num="02">Project overview</h2>
    <p>Describe scope, stack, and constraints for a scalable backend or deep technical narrative.</p>
  </section>
  <section id="problem">
    <h2 data-section-num="03">Problem &amp; challenges</h2>
    <div class="benefits-row">
      <div class="benefit-item"><div class="benefit-icon"><i class="ri-shield-line"></i></div><h4>Security</h4><p>Auth and validation.</p></div>
      <div class="benefit-item"><div class="benefit-icon"><i class="ri-speed-up-line"></i></div><h4>Performance</h4><p>Latency and throughput.</p></div>
      <div class="benefit-item"><div class="benefit-icon"><i class="ri-expand-diagonal-line"></i></div><h4>Scale</h4><p>Horizontal growth.</p></div>
      <div class="benefit-item"><div class="benefit-icon"><i class="ri-tools-line"></i></div><h4>Maintainability</h4><p>Clean architecture.</p></div>
    </div>
  </section>
  <section id="solution">
    <h2 data-section-num="04">Solution approach</h2>
    <p>Walk through architecture decisions step by step with diagrams and code samples.</p>
  </section>
</article>`;

export function standardLayoutHtml(): string {
  return `${blogDetailTemplateHead("Standard blog detail template — reference")}
${blogDetailHero({
  tplClass: "bd-tpl-standard",
  category: "Frontend",
  titleHtml:
    'Angular Performance Tips for <span class="hero-title-accent">Production Apps</span>',
  excerpt:
    "Practical techniques to keep large Angular apps fast: lazy routes, OnPush, bundle budgets, and measurable wins.",
})}
  <div class="container">
    <div class="main-layout">
      <aside class="sidebar-left">
        <div class="bd-sidebar-card card-tbl-content">
          <h2 class="card-title">Table of Contents</h2>
          <nav class="toc-list">
            <a href="#introduction" class="active"><span class="toc-num">01</span> Introduction</a>
            <a href="#lazy-load"><span class="toc-num">02</span> Lazy load feature modules</a>
            <a href="#comparison"><span class="toc-num">03</span> OnPush change detection</a>
            <a href="#conclusion"><span class="toc-num">04</span> Conclusion</a>
          </nav>
        </div>
        <div class="bd-sidebar-card cta-card">
          <h2 class="card-title">Need an Angular Performance Audit?</h2>
          <p>Get a tailored review of bundles, change detection, and routing.</p>
          <a href="/contact" class="cta-link">Book a Consultation →</a>
        </div>
        <div class="bd-sidebar-card bd-quick-links">
          <h2 class="card-title">Quick Links</h2>
          <ul class="bd-quick-links-list">
            <li><a href="https://angular.dev" target="_blank" rel="noopener">Angular Official Docs <i class="ri-arrow-right-up-line"></i></a></li>
            <li><a href="https://angular.dev/cli" target="_blank" rel="noopener">Angular CLI <i class="ri-arrow-right-up-line"></i></a></li>
            <li><a href="https://rxjs.dev" target="_blank" rel="noopener">RxJS Documentation <i class="ri-arrow-right-up-line"></i></a></li>
          </ul>
        </div>
      </aside>
      <div class="article-main">${STANDARD_ARTICLE}</div>
      <aside class="sidebar-right">
        <div class="bd-sidebar-card bd-author-card">
          <p class="section-label">About the Author</p>
          <div class="bd-author-avatar bd-author-avatar--lg">SI</div>
          <h3 class="bd-sidebar-title">M. Sohaib Ishaque</h3>
          <p class="bd-sidebar-text">Full Stack Web Developer building scalable apps with Angular and .NET Core.</p>
        </div>
        <div class="bd-sidebar-card">
          <p class="section-label">Keep Reading</p>
          <h3 class="bd-sidebar-title">Related articles</h3>
          <p class="bd-sidebar-text">Related posts load dynamically on the live site.</p>
        </div>
        <div class="bd-sidebar-card bd-newsletter-card">
          <h3 class="bd-sidebar-title">Stay Updated</h3>
          <p class="bd-sidebar-text">Subscribe for new articles on web development.</p>
          <form class="bd-newsletter-form"><input class="bd-newsletter-input" placeholder="Your email address" /><button type="button" class="faq-cta-btn">Subscribe</button></form>
        </div>
      </aside>
    </div>
  </div>
</div>
</body></html>`;
}

export function minimalLayoutHtml(): string {
  return `${blogDetailTemplateHead("Minimal blog detail template — reference")}
${blogDetailHero({
  tplClass: "bd-tpl-minimal",
  category: "Frontend",
  titleHtml:
    'Angular Performance Tips for <span class="hero-title-accent">Production Apps</span>',
  excerpt:
    "Centered article layout with related posts and a bottom CTA — no sidebars.",
})}
  <div class="container">
    <div class="main-layout">
      <div class="article-main">${MINIMAL_ARTICLE}</div>
    </div>
  </div>
  <section class="bd-related-below">
    <div class="container">
      <h2 class="bd-related-below-title">Related Articles</h2>
      <div class="bd-related-grid">
        <a class="bd-related-grid-card" href="/blogs"><div class="bd-related-grid-thumb"><img src="${HERO_IMAGE}" alt="" /></div><span class="blog-post-category">Backend</span><h3 class="bd-related-grid-title">Sample related post</h3><span class="bd-related-grid-meta">May 12, 2025</span></a>
        <a class="bd-related-grid-card" href="/blogs"><div class="bd-related-grid-thumb"><img src="${HERO_IMAGE}" alt="" /></div><span class="blog-post-category">Architecture</span><h3 class="bd-related-grid-title">Another article</h3><span class="bd-related-grid-meta">Apr 3, 2025</span></a>
        <a class="bd-related-grid-card" href="/blogs"><div class="bd-related-grid-thumb"><img src="${HERO_IMAGE}" alt="" /></div><span class="blog-post-category">WordPress</span><h3 class="bd-related-grid-title">Third related post</h3><span class="bd-related-grid-meta">Mar 18, 2025</span></a>
      </div>
    </div>
  </section>
  <section id="bdInlineCtaSection">
    <div class="container">
      <div class="bd-inline-cta">
        <div class="bd-inline-cta-icon"><i class="ri-rocket-line"></i></div>
        <div>
          <h2 class="bd-inline-cta-title">Ready to speed up your Angular app?</h2>
          <p class="bd-inline-cta-text">Let's optimize bundles, routing, and change detection together.</p>
        </div>
        <a href="/contact" class="si-btn si-btn-primary">Start Project →</a>
      </div>
    </div>
  </section>
</div>
</body></html>`;
}

export function longformLayoutHtml(): string {
  return `${blogDetailTemplateHead("Longform blog detail template — reference")}
${blogDetailHero({
  tplClass: "bd-tpl-longform",
  category: "Case study",
  titleHtml:
    'Building a Scalable REST API with <span class="hero-title-accent">.NET Core</span>',
  excerpt:
    "Deep-dive layout with TOC meta, hero stats, and numbered sections — no right sidebar.",
  image: "https://res.cloudinary.com/w3xvfqgt/image/upload/v1787743478/angular-performance-tips-production.png",
})}
  <div class="bd-hero-stats-bar">
    <div class="container">
      <div class="bd-hero-stats">
        <div class="bd-hero-stat"><span class="bd-hero-stat-icon"><i class="ri-grid-line"></i></span><span class="bd-hero-stat-value">5</span><span class="bd-hero-stat-label">API Endpoints</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-icon"><i class="ri-timer-line"></i></span><span class="bd-hero-stat-value">~200ms</span><span class="bd-hero-stat-label">Avg. response time</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-icon"><i class="ri-shield-check-line"></i></span><span class="bd-hero-stat-value">100%</span><span class="bd-hero-stat-label">Authentication</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-icon"><i class="ri-pulse-line"></i></span><span class="bd-hero-stat-value">99.9%</span><span class="bd-hero-stat-label">Uptime ready</span></div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="main-layout">
      <aside class="sidebar-left">
        <div class="bd-sidebar-card card-tbl-content">
          <h2 class="card-title">Table of Contents</h2>
          <nav class="toc-list">
            <a href="#introduction" class="active"><span class="toc-num">01</span> Introduction</a>
            <a href="#project-overview"><span class="toc-num">02</span> Project overview</a>
            <a href="#problem"><span class="toc-num">03</span> Problem &amp; challenges</a>
            <a href="#solution"><span class="toc-num">04</span> Solution approach</a>
          </nav>
        </div>
        <div class="bd-sidebar-card bd-toc-meta">
          <p class="bd-toc-meta-row"><i class="ri-time-line"></i> <span>8 min read</span></p>
          <p class="bd-toc-meta-row"><i class="ri-calendar-line"></i> Updated <span>May 12, 2025</span></p>
        </div>
      </aside>
      <div class="article-main">${LONGFORM_ARTICLE}</div>
    </div>
  </div>
</div>
</body></html>`;
}
