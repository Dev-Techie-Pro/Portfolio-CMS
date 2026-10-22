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
  <link rel="stylesheet" href="/vendor/remixicon/remixicon.css" />
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
  <section id="whats-new">
    <h2 data-section-num="01">What's New in Next.js 14</h2>
    <p>Next.js 14 brings faster builds, improved caching semantics, and a more predictable developer experience for production apps.</p>
    <div class="feature-grid feature-grid--longform">
      <div class="feature-card"><div class="feature-icon"><i class="ri-flashlight-line"></i></div><h4>Turbopack</h4><p>Up to 53% faster local server startup.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-server-line"></i></div><h4>Server Actions</h4><p>Run mutations on the server without API routes.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-cpu-line"></i></div><h4>Partial Prerendering</h4><p>Static shell with dynamic holes.</p></div>
      <div class="feature-card"><div class="feature-icon"><i class="ri-image-line"></i></div><h4>Image Optimization</h4><p>Smarter defaults for responsive media.</p></div>
    </div>
  </section>
  <section id="getting-started">
    <h2 data-section-num="02">Getting Started</h2>
    <p>Create a new project and explore the App Router with TypeScript out of the box.</p>
    <pre data-language="bash"><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
    <p>Start the dev server and open the default App Router layout:</p>
    <pre data-language="bash"><code>cd my-app &amp;&amp; npm run dev</code></pre>
  </section>
  <div class="stat-box stat-box--perf" data-bd-segment-id="perf-callout" data-bd-segment-title="Performance callout">
    <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
    <div class="stat-box__body">
      <div class="stat-value">Next.js 14 Performance</div>
      <p class="stat-text">Build and runtime improvements across the stack.</p>
    </div>
    <div class="stat-box__metrics">
      <div><span class="stat-metric-value">2x</span><span class="stat-metric-label">Faster builds</span></div>
      <div><span class="stat-metric-value">30%</span><span class="stat-metric-label">Better runtime</span></div>
    </div>
  </div>
  <section id="data-fetching">
    <h2 data-section-num="03">Data Fetching &amp; Caching</h2>
    <ul class="bullet-list">
      <li>Request memoization reduces duplicate fetches.</li>
      <li>Cache tags give fine-grained revalidation control.</li>
      <li>Streaming works seamlessly with Suspense boundaries.</li>
    </ul>
  </section>
  <section id="server-actions">
    <h2 data-section-num="04">Server Actions</h2>
    <p>Colocate mutations with your UI using async server functions — no separate API route required.</p>
    <pre data-language="typescript"><code>export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  await db.post.create({ data: { title: String(title) } })
}</code></pre>
  </section>
  <section id="comparison">
    <h2 data-section-num="05">Next.js 13 vs 14</h2>
    <table class="bd-compare-table">
      <thead><tr><th>Feature</th><th>Next.js 13</th><th>Next.js 14</th></tr></thead>
      <tbody>
        <tr><td>Dev bundler</td><td>Webpack default</td><td>Turbopack (beta)</td></tr>
        <tr><td>Server Actions</td><td>Experimental</td><td>Stable</td></tr>
        <tr><td>Metadata API</td><td>Basic</td><td>Enhanced</td></tr>
      </tbody>
    </table>
  </section>
  <section id="deployment">
    <h2 data-section-num="06">Deployment</h2>
    <p>Ship to Vercel or any Node host with zero config for the framework defaults.</p>
    <pre data-language="bash"><code>npm run build &amp;&amp; npm run start</code></pre>
  </section>
</article>`;

export const CASE_STUDY_ARTICLE = `
<article class="article-content">
  <section id="overview">
    <header class="bd-section-head">
      <h2 data-section-num="01">Project Overview</h2>
      <p class="bd-section-sub">Understanding the challenge and goals</p>
    </header>
    <p>We redesigned a high-traffic storefront to improve conversion, accessibility, and maintainability without sacrificing brand identity.</p>
    <div class="bd-mini-stats-grid">
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">8.4%</span><span class="bd-mini-stat-label">Conversion (before)</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">12.1%</span><span class="bd-mini-stat-label">Conversion (after)</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">3.2s</span><span class="bd-mini-stat-label">LCP (before)</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">1.4s</span><span class="bd-mini-stat-label">LCP (after)</span></div>
    </div>
    <h3 class="bd-block-label">Project Deliverables</h3>
    <div class="bd-deliverables-grid">
      <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-layout-masonry-line"></i></div><h4>UX Audit</h4><p>Heuristic review and funnel analysis.</p></div>
      <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-palette-line"></i></div><h4>UI System</h4><p>Tokens, components, and patterns.</p></div>
      <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-code-box-line"></i></div><h4>Front-end Build</h4><p>Next.js storefront implementation.</p></div>
      <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-line-chart-line"></i></div><h4>Analytics</h4><p>Event taxonomy and dashboards.</p></div>
    </div>
  </section>
  <section id="before-after">
    <header class="bd-section-head">
      <h2 data-section-num="02">Before vs After</h2>
      <p class="bd-section-sub">What changed in the experience</p>
    </header>
    <div class="compare-grid compare-grid--case">
      <div class="compare-card compare-card--before"><h3>Before</h3><ul class="check-list"><li class="danger-item">Cluttered checkout flow</li><li class="danger-item">Slow mobile LCP</li><li class="danger-item">Inconsistent UI</li></ul></div>
      <div class="compare-card compare-card--after"><h3>After</h3><ul class="check-list"><li class="success-item">Streamlined 3-step checkout</li><li class="success-item">Sub-1.5s LCP on 4G</li><li class="success-item">Unified design system</li></ul></div>
    </div>
  </section>
  <section id="results">
    <header class="bd-section-head">
      <h2 data-section-num="03">Results &amp; Impact</h2>
      <p class="bd-section-sub">Measurable business outcomes</p>
    </header>
    <div class="quote-box quote-box--case"><p>"The new experience paid for itself within the first quarter — faster pages and clearer paths to purchase made the difference."</p><span class="quote-box__credit">— Product Lead, Retail Client</span></div>
    <div class="bd-mini-stats-grid bd-mini-stats-grid--results">
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">142%</span><span class="bd-mini-stat-label">Conversion lift</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">56%</span><span class="bd-mini-stat-label">Faster LCP</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">38%</span><span class="bd-mini-stat-label">Lower bounce</span></div>
      <div class="bd-mini-stat"><span class="bd-mini-stat-value">4.8</span><span class="bd-mini-stat-label">CSAT score</span></div>
    </div>
  </section>
  <section id="takeaways">
    <header class="bd-section-head">
      <h2 data-section-num="04">Key Takeaways</h2>
      <p class="bd-section-sub">Lessons for your next redesign</p>
    </header>
    <div class="bd-takeaways-grid">
      <div class="bd-takeaway"><span class="bd-takeaway-num">1</span><p>Start with analytics and funnel drop-offs, not visual polish.</p></div>
      <div class="bd-takeaway"><span class="bd-takeaway-num">2</span><p>Invest in a token-based system before scaling new pages.</p></div>
      <div class="bd-takeaway"><span class="bd-takeaway-num">3</span><p>Ship performance budgets alongside design specs.</p></div>
      <div class="bd-takeaway"><span class="bd-takeaway-num">4</span><p>Test checkout on real devices and networks early.</p></div>
    </div>
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
  category: "Frontend",
  titleHtml:
    'Next.js 14: The Complete Guide for <span class="hero-title-accent">Modern Web Apps</span>',
  excerpt:
    "Deep technical longform — numbered sections, feature grids, code samples, and comparison tables. TOC and read-time card on the left.",
  image: "https://res.cloudinary.com/w3xvfqgt/image/upload/v1787743478/angular-performance-tips-production.png",
})}
  <div class="container">
    <div class="main-layout">
      <aside class="sidebar-left">
        <div class="bd-sidebar-card card-tbl-content">
          <h2 class="card-title">Table of Contents</h2>
          <nav class="toc-list">
            <a href="#whats-new" class="active"><span class="toc-num">01</span> What's New</a>
            <a href="#getting-started"><span class="toc-num">02</span> Getting Started</a>
            <a href="#data-fetching"><span class="toc-num">03</span> Data Fetching</a>
            <a href="#server-actions"><span class="toc-num">04</span> Server Actions</a>
            <a href="#comparison"><span class="toc-num">05</span> Comparison</a>
            <a href="#deployment"><span class="toc-num">06</span> Deployment</a>
          </nav>
        </div>
        <div class="bd-sidebar-card bd-toc-meta">
          <p class="bd-toc-meta-row"><i class="ri-time-line"></i> <span>12 min read</span></p>
          <p class="bd-toc-meta-row"><i class="ri-calendar-line"></i> Updated <span>Oct 22, 2026</span></p>
        </div>
      </aside>
      <div class="article-main">${LONGFORM_ARTICLE}</div>
    </div>
  </div>
</div>
</body></html>`;
}

export function caseStudyLayoutHtml(): string {
  return `${blogDetailTemplateHead("Case study blog detail template — reference")}
${blogDetailHero({
  tplClass: "bd-tpl-case-study",
  category: "CASE STUDY",
  titleHtml:
    'E-Commerce Redesign for <span class="hero-title-accent">Higher Conversions</span>',
  excerpt:
    "How we rebuilt a storefront experience with measurable lifts in conversion, performance, and customer satisfaction.",
  image: "https://res.cloudinary.com/w3xvfqgt/image/upload/v1787743478/angular-performance-tips-production.png",
})}
  <div class="bd-hero-stats-bar">
    <div class="container">
      <div class="bd-hero-stats bd-hero-stats--case">
        <div class="bd-hero-stat"><span class="bd-hero-stat-value">142%</span><span class="bd-hero-stat-label">Conversion rate increase</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-value">56%</span><span class="bd-hero-stat-label">Faster page loads</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-value">38%</span><span class="bd-hero-stat-label">Lower bounce rate</span></div>
        <div class="bd-hero-stat"><span class="bd-hero-stat-value">4.8</span><span class="bd-hero-stat-label">Customer satisfaction</span></div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="main-layout">
      <aside class="sidebar-left">
        <div class="bd-sidebar-card card-tbl-content">
          <h2 class="card-title">Table of Contents</h2>
          <nav class="toc-list toc-list--case">
            <a href="#overview" class="active"><span class="toc-num">01</span> Project Overview</a>
            <a href="#before-after"><span class="toc-num">02</span> Before vs After</a>
            <a href="#results"><span class="toc-num">03</span> Results &amp; Impact</a>
            <a href="#takeaways"><span class="toc-num">04</span> Key Takeaways</a>
          </nav>
        </div>
        <div class="bd-sidebar-card bd-toc-meta">
          <p class="bd-toc-meta-row"><i class="ri-time-line"></i> <span>10 min read</span></p>
          <p class="bd-toc-meta-row"><i class="ri-calendar-line"></i> Updated <span>Oct 22, 2026</span></p>
        </div>
        <div class="bd-sidebar-card bd-sidebar-project-cta">
          <div class="bd-sidebar-project-cta-icon" aria-hidden="true"><i class="ri-lightbulb-line"></i></div>
          <h2 class="card-title">Have a similar project?</h2>
          <p>Let's discuss your goals and build a high-converting experience together.</p>
          <a href="/contact" class="cta-link">Hire Me →</a>
        </div>
      </aside>
      <div class="article-main">${CASE_STUDY_ARTICLE}</div>
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
        <div class="bd-sidebar-card bd-sidebar-hire-mini">
          <h3 class="bd-sidebar-title">Ready to work together?</h3>
          <p class="bd-sidebar-text">Let's turn your product vision into a polished, performant site.</p>
          <a href="/contact" class="faq-cta-btn bd-sidebar-hire-btn">Hire Me →</a>
        </div>
      </aside>
    </div>
  </div>
</div>
</body></html>`;
}
