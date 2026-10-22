// @ts-nocheck
/** Article body HTML starters — matches public blog detail block markup (blog-pages.css). */

export type BlogDetailEditorTemplateId = 'standard' | 'minimal' | 'longform' | 'case-study';

export const BLOG_DETAIL_EDITOR_TEMPLATES: Record<
  BlogDetailEditorTemplateId,
  { id: BlogDetailEditorTemplateId; label: string; bodyHtml: string }
> = {
  standard: {
    id: 'standard',
    label: 'Standard',
    bodyHtml: `
<section id="introduction">
  <h2>Introduction</h2>
  <p>Open with the problem your readers face and what this article will help them achieve on a production portfolio blog.</p>
  <p>Keep paragraphs short — the standard layout uses a left table of contents and a right sidebar on the live site.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
  <div>
    <div class="stat-value">60%</div>
    <p class="stat-text">Example metric — replace with a real result from your project or article.</p>
  </div>
</div>
<section id="core-concepts">
  <h2>Core concepts</h2>
  <p>Explain the main ideas before diving into implementation details.</p>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-route-line"></i></div>
      <h4>Route splitting</h4>
      <p>Load features on demand to shrink the initial bundle.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-speed-line"></i></div>
      <h4>Prefetching</h4>
      <p>Warm critical routes before the user navigates.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-refresh-line"></i></div>
      <h4>OnPush change detection</h4>
      <p>Reduce unnecessary template work in large apps.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-database-2-line"></i></div>
      <h4>TrackBy in lists</h4>
      <p>Stabilize DOM nodes inside <code>*ngFor</code> loops.</p>
    </div>
  </div>
</section>
<section id="comparison">
  <h2>Default vs optimized</h2>
  <div class="compare-grid">
    <div class="compare-card">
      <h3>Default strategy</h3>
      <ul class="check-list"><li>More change detection cycles</li><li>Larger initial bundle</li><li>Easier to ship quickly</li></ul>
    </div>
    <div class="compare-card">
      <h3>Optimized approach</h3>
      <ul class="check-list"><li>OnPush where safe</li><li>Lazy-loaded feature modules</li><li>Measurable LCP gains</li></ul>
    </div>
  </div>
</section>
<section id="conclusion">
  <h2>Conclusion</h2>
  <div class="quote-box"><p>Performance is a feature — measure, iterate, and document wins for your team.</p></div>
  <p>Summarize next steps and link to related posts or your contact page.</p>
</section>`.trim(),
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal',
    bodyHtml: `
<section id="overview">
  <h2>Overview</h2>
  <p>The minimal layout centers the article with no sidebars — ideal for focused tutorials and shorter posts.</p>
  <p>Use clear headings, one hero idea, and strong visual blocks sparingly.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
  <div>
    <div class="stat-value">60%</div>
    <p class="stat-text">Highlight one compelling stat or outcome near the top.</p>
  </div>
</div>
<section id="key-techniques">
  <h2>Key techniques</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-code-box-line"></i></div>
      <h4>Technique one</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-layers-line"></i></div>
      <h4>Technique two</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-shield-check-line"></i></div>
      <h4>Technique three</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-rocket-line"></i></div>
      <h4>Technique four</h4>
      <p>Short description.</p>
    </div>
  </div>
</section>
<section id="wrap-up">
  <h2>Wrap up</h2>
  <div class="quote-box"><p>Replace this pull quote with a memorable line from your article.</p></div>
  <p>Close with a single call to action.</p>
</section>`.trim(),
  },
  longform: {
    id: 'longform',
    label: 'Longform',
    bodyHtml: `
<section id="whats-new">
  <h2>What's New in Next.js 14</h2>
  <p>Next.js 14 brings faster builds, improved caching semantics, and a more predictable developer experience for production apps.</p>
  <div class="feature-grid feature-grid--longform">
    <div class="feature-card"><div class="feature-icon"><i class="ri-flashlight-line"></i></div><h4>Turbopack</h4><p>Up to 53% faster local server startup.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-server-line"></i></div><h4>Server Actions</h4><p>Run mutations on the server without API routes.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-cpu-line"></i></div><h4>Partial Prerendering</h4><p>Static shell with dynamic holes.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-image-line"></i></div><h4>Image Optimization</h4><p>Smarter defaults for responsive media.</p></div>
  </div>
</section>
<section id="getting-started">
  <h2>Getting Started</h2>
  <p>Create a new project and explore the App Router with TypeScript out of the box.</p>
  <pre data-language="bash"><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
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
  <h2>Data Fetching &amp; Caching</h2>
  <ul class="bullet-list">
    <li>Request memoization reduces duplicate fetches.</li>
    <li>Cache tags give fine-grained revalidation control.</li>
    <li>Streaming works seamlessly with Suspense boundaries.</li>
  </ul>
</section>
<section id="server-actions">
  <h2>Server Actions</h2>
  <pre data-language="typescript"><code>export async function createPost(formData: FormData) {
  'use server'
  await db.post.create({ data: { title: String(formData.get('title')) } })
}</code></pre>
</section>
<section id="comparison">
  <h2>Next.js 13 vs 14</h2>
  <table class="bd-compare-table">
    <thead><tr><th>Feature</th><th>Next.js 13</th><th>Next.js 14</th></tr></thead>
    <tbody>
      <tr><td>Dev bundler</td><td>Webpack default</td><td>Turbopack (beta)</td></tr>
      <tr><td>Server Actions</td><td>Experimental</td><td>Stable</td></tr>
    </tbody>
  </table>
</section>
<section id="deployment">
  <h2>Deployment</h2>
  <pre data-language="bash"><code>npm run build &amp;&amp; npm run start</code></pre>
</section>`.trim(),
  },
  'case-study': {
    id: 'case-study',
    label: 'Case study',
    bodyHtml: `
<section id="overview">
  <header class="bd-section-head">
    <h2>Project Overview</h2>
    <p class="bd-section-sub">Understanding the challenge and goals</p>
  </header>
  <p>We redesigned a high-traffic storefront to improve conversion, accessibility, and maintainability.</p>
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
    <h2>Before vs After</h2>
    <p class="bd-section-sub">What changed in the experience</p>
  </header>
  <div class="compare-grid compare-grid--case">
    <div class="compare-card compare-card--before"><h3>Before</h3><ul class="check-list"><li class="danger-item">Cluttered checkout</li><li class="danger-item">Slow mobile LCP</li></ul></div>
    <div class="compare-card compare-card--after"><h3>After</h3><ul class="check-list"><li class="success-item">Streamlined checkout</li><li class="success-item">Sub-1.5s LCP</li></ul></div>
  </div>
</section>
<section id="results">
  <header class="bd-section-head">
    <h2>Results &amp; Impact</h2>
    <p class="bd-section-sub">Measurable business outcomes</p>
  </header>
  <div class="quote-box quote-box--case"><p>"The new experience paid for itself within the first quarter."</p><span class="quote-box__credit">— Product Lead</span></div>
  <div class="bd-mini-stats-grid bd-mini-stats-grid--results">
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">142%</span><span class="bd-mini-stat-label">Conversion lift</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">56%</span><span class="bd-mini-stat-label">Faster LCP</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">38%</span><span class="bd-mini-stat-label">Lower bounce</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">4.8</span><span class="bd-mini-stat-label">CSAT score</span></div>
  </div>
</section>
<section id="takeaways">
  <header class="bd-section-head">
    <h2>Key Takeaways</h2>
    <p class="bd-section-sub">Lessons for your next redesign</p>
  </header>
  <div class="bd-takeaways-grid">
    <div class="bd-takeaway"><span class="bd-takeaway-num">1</span><p>Start with analytics and funnel drop-offs.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">2</span><p>Invest in a token-based system early.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">3</span><p>Ship performance budgets with design specs.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">4</span><p>Test checkout on real devices and networks.</p></div>
  </div>
</section>`.trim(),
  },
};

export function getBlogDetailEditorTemplate(id: string) {
  if (id === 'auto' || !id) return null;
  return BLOG_DETAIL_EDITOR_TEMPLATES[id as BlogDetailEditorTemplateId] || null;
}
