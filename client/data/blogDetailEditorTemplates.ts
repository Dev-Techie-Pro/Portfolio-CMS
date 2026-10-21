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
<section id="introduction">
  <h2>Introduction</h2>
  <p>Longform uses a sticky table of contents on the left and no right sidebar — built for deep guides.</p>
</section>
<section id="project-overview">
  <h2>Project overview</h2>
  <p>Describe scope, stack, and constraints. Link to repo or case study if relevant.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-line-chart-line"></i></div>
  <div>
    <div class="stat-value">3×</div>
    <p class="stat-text">Example throughput or delivery metric for the narrative.</p>
  </div>
</div>
<section id="problem-challenges">
  <h2>Problem &amp; challenges</h2>
  <p>What was broken or risky before your solution?</p>
  <ul class="bullet-list">
    <li>Challenge one</li>
    <li>Challenge two</li>
    <li>Challenge three</li>
  </ul>
</section>
<section id="solution-approach">
  <h2>Solution approach</h2>
  <p>Walk through architecture decisions step by step.</p>
  <pre><code>// Optional code sample — edit or remove.</code></pre>
</section>
<section id="key-features">
  <h2>Key features</h2>
  <div class="benefits-row">
    <div class="benefit-item">
      <div class="benefit-icon"><i class="ri-lock-line"></i></div>
      <h4>Security</h4>
      <p>Auth, validation, hardening.</p>
    </div>
    <div class="benefit-item">
      <div class="benefit-icon"><i class="ri-speed-up-line"></i></div>
      <h4>Performance</h4>
      <p>Caching and query tuning.</p>
    </div>
  </div>
</section>
<section id="results">
  <h2>Results</h2>
  <p>Quantify outcomes and lessons learned.</p>
</section>
<section id="next-steps">
  <h2>Next steps</h2>
  <p>What should the reader do after finishing this article?</p>
</section>`.trim(),
  },
  'case-study': {
    id: 'case-study',
    label: 'Case study',
    bodyHtml: `
<section id="overview">
  <h2>Project overview</h2>
  <p>Case study layout emphasizes hero, stats, and proof — describe client, role, and timeline.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-trending-up-line"></i></div>
  <div>
    <div class="stat-value">40%</div>
    <p class="stat-text">Headline result from the engagement.</p>
  </div>
</div>
<section id="approach">
  <h2>Approach</h2>
  <div class="compare-grid">
    <div class="compare-card">
      <h3>Before</h3>
      <ul class="check-list"><li>Pain point A</li><li>Pain point B</li></ul>
    </div>
    <div class="compare-card">
      <h3>After</h3>
      <ul class="check-list"><li>Improvement A</li><li>Improvement B</li></ul>
    </div>
  </div>
</section>
<section id="deliverables">
  <h2>Deliverables</h2>
  <div class="examples-row">
    <div class="example-card">
      <div class="feature-icon"><i class="ri-window-line"></i></div>
      <h4>Deliverable one</h4>
      <p>What you shipped.</p>
    </div>
    <div class="example-card">
      <div class="feature-icon"><i class="ri-server-line"></i></div>
      <h4>Deliverable two</h4>
      <p>What you shipped.</p>
    </div>
  </div>
</section>`.trim(),
  },
};

export function getBlogDetailEditorTemplate(id: string) {
  if (id === 'auto' || !id) return null;
  return BLOG_DETAIL_EDITOR_TEMPLATES[id as BlogDetailEditorTemplateId] || null;
}
