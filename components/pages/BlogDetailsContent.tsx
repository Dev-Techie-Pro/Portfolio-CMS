"use client";

import { PortfolioHtmlContent } from "@/components/portfolio/PortfolioHtmlContent";
import { SITE_FOOTER_HTML } from "@/lib/portfolio/site-footer-html";
import { getSiteHeaderHtml } from "@/lib/portfolio/site-header-html";

/* Auto-generated from static HTML — see MIGRATION.md */
const PAGE_HTML = `${getSiteHeaderHtml("blogs")}

    <section class="blog-details-hero" id="bdHero">
      <div class="container">
        <div class="bd-breadcrumb-wrap no-space">
          <nav class="bd-breadcrumb" id="bdBreadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/blogs">Blogs</a>
            <span aria-hidden="true">/</span>
            <span id="bdBreadcrumbCategory">Article</span>
            <span aria-hidden="true">/</span>
            <span id="bdBreadcrumbTitle" aria-current="page">Loading…</span>
          </nav>
        </div>
        <div class="hero-content bd-hero-content">
          <span class="badge" id="bdCategory">Category</span>
          <h1 class="hero-title" id="bdTitle">Loading article…</h1>
          <p class="hero-intro" id="bdExcerpt"></p>
          <div class="hero-meta">
            <div class="nav-logo" aria-label="Author">
              <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
              <div class="logo-text">
                <span class="logo-name" id="bdAuthor">M Sohaib Ishaque</span>
                <span class="logo-role">Full Stack Web Developer</span>
              </div>
            </div>
            <div class="meta-divider" aria-hidden="true"></div>
            <div class="meta-item">
              <span class="icon" data-icon="ri-calendar-line"></span>
              <time id="bdsiCalendar" datetime="">—</time>
            </div>
            <div class="meta-item">
              <span class="icon" data-icon="ri-time-line"></span>
              <span id="bdReadTime">—</span>
            </div>
            <div class="meta-tags" id="bdHeroTags"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="bd-hero-stats-bar" id="bdHeroStatsBar" hidden>
      <div class="container">
        <div class="bd-hero-stats" id="bdHeroStats" aria-label="Article highlights"></div>
      </div>
    </div>

    <div class="container">
      <div class="main-layout">
        <aside class="sidebar-left" aria-label="Table of contents">
          <div class="bd-sidebar-card card-tbl-content">
            <h2 class="card-title">Table of Contents</h2>
            <nav class="toc-list" id="tocNav" aria-label="Table of contents"></nav>
          </div>
          <div class="bd-sidebar-card bd-toc-meta" id="bdTocMeta" hidden>
            <p class="bd-toc-meta-row"><span class="icon" data-icon="ri-time-line"></span> <span id="bdTocReadTime">—</span></p>
            <p class="bd-toc-meta-row"><span class="icon" data-icon="ri-calendar-line"></span> Updated <span id="bdTocUpdated">—</span></p>
          </div>
          <div class="bd-sidebar-card bd-sidebar-project-cta" id="bdSidebarLeftProjectCta" hidden>
            <div class="bd-sidebar-project-cta-icon" aria-hidden="true"><i class="ri-lightbulb-line"></i></div>
            <h2 class="card-title">Have a similar project?</h2>
            <p>Let's discuss your goals and build a high-converting experience together.</p>
            <a href="/contact" class="cta-link">Hire Me →</a>
          </div>
          <div class="bd-sidebar-card bd-quick-links" id="bdQuickLinksCard" hidden>
            <h2 class="card-title">Quick Links</h2>
            <ul class="bd-quick-links-list">
              <li><a href="https://angular.dev" target="_blank" rel="noopener noreferrer">Angular Official Docs <span class="icon" data-icon="ri-arrow-right-line"></span></a></li>
              <li><a href="https://angular.dev/cli" target="_blank" rel="noopener noreferrer">Angular CLI <span class="icon" data-icon="ri-arrow-right-line"></span></a></li>
              <li><a href="https://rxjs.dev" target="_blank" rel="noopener noreferrer">RxJS Documentation <span class="icon" data-icon="ri-arrow-right-line"></span></a></li>
            </ul>
          </div>
          <div class="bd-sidebar-card cta-card" id="bdSidebarCta">
            <h2 class="card-title" id="bdSidebarCtaTitle">Need help with your project?</h2>
            <p id="bdSidebarCtaText">Let's build something great together — tailored solutions and performance-first architecture.</p>
            <a href="/contact" class="cta-link" id="bdSidebarCtaLink">Book a Consultation →</a>
          </div>
        </aside>

        <div class="article-main">
        <article class="article-content" id="bdArticleBody" aria-label="Article body"></article>

      <section
        class="bd-engagement reveal"
        id="bdEngagement"
        data-post-id=""
        aria-labelledby="bdEngagementHeading"
      >
        <div class="bd-engagement-head">
          <div>
            <p class="section-label">Discussion</p>
            <h2 class="bd-engagement-title" id="bdEngagementHeading">Join the conversation</h2>
            <p class="bd-engagement-sub">Share your take, ask a question, or reply to others below.</p>
          </div>
        </div>
        <form class="bd-comment-form" id="bdCommentForm" novalidate>
          <div class="bd-comment-fields">
            <div class="bd-comment-field">
              <label class="bd-comment-label" for="bdCommentName">Name</label>
              <input
                type="text"
                id="bdCommentName"
                class="bd-comment-input"
                name="name"
                autocomplete="name"
                placeholder="Your name"
                required
                maxlength="80"
              />
            </div>
            <div class="bd-comment-field">
              <label class="bd-comment-label" for="bdCommentEmail">Email <span class="bd-optional">(optional)</span></label>
              <input
                type="email"
                id="bdCommentEmail"
                class="bd-comment-input"
                name="email"
                autocomplete="email"
                placeholder="you@example.com"
                maxlength="254"
              />
            </div>
          </div>
          <div class="bd-comment-field bd-comment-field--full">
            <label class="bd-comment-label" for="bdCommentMessage">Comment</label>
            <textarea
              id="bdCommentMessage"
              class="bd-comment-textarea"
              name="message"
              rows="4"
              placeholder="Write your comment…"
              required
              maxlength="4000"
            ></textarea>
          </div>
          <p class="bd-comment-error" id="bdCommentError" role="alert" hidden></p>
          <button type="submit" class="faq-cta-btn bd-comment-submit" id="bdCommentSubmit">
            Post comment
          </button>
        </form>
        <div class="bd-comments-wrap">
          <h3 class="bd-comments-heading">
            <span id="bdCommentCountLabel">0 comments</span>
          </h3>
          <ul class="bd-comment-list" id="bdCommentList" aria-live="polite"></ul>
          <p class="bd-comments-empty" id="bdCommentsEmpty" hidden>No comments yet — be the first.</p>
        </div>
      </section>

      <div class="bd-reply-modal" id="bdReplyModal" hidden role="dialog" aria-modal="true" aria-labelledby="bdReplyModalTitle">
        <div class="bd-reply-modal-backdrop" data-bd-reply-close tabindex="-1"></div>
        <div class="bd-reply-modal-panel" role="document">
          <header class="bd-reply-modal-head">
            <div>
              <p class="section-label">Reply</p>
              <h2 class="bd-reply-modal-title" id="bdReplyModalTitle">Write a reply</h2>
            </div>
            <button type="button" class="bd-reply-modal-close" data-bd-reply-close aria-label="Close reply panel">
              <i class="ri-close-line" aria-hidden="true"></i>
            </button>
          </header>
          <p class="bd-reply-modal-quote" id="bdReplyModalQuote"></p>
          <form class="bd-reply-modal-form" id="bdReplyModalForm" novalidate>
            <input type="hidden" name="parentId" id="bdReplyParentId" value="" />
            <div class="bd-comment-fields">
              <div class="bd-comment-field">
                <label class="bd-comment-label" for="bdReplyName">Name</label>
                <input type="text" id="bdReplyName" class="bd-comment-input" name="name" autocomplete="name" placeholder="Your name" required maxlength="80" />
              </div>
              <div class="bd-comment-field">
                <label class="bd-comment-label" for="bdReplyEmail">Email <span class="bd-optional">(optional)</span></label>
                <input type="email" id="bdReplyEmail" class="bd-comment-input" name="email" autocomplete="email" placeholder="you@example.com" maxlength="254" />
              </div>
            </div>
            <div class="bd-comment-field bd-comment-field--full">
              <label class="bd-comment-label" for="bdReplyMessage">Your reply</label>
              <textarea id="bdReplyMessage" class="bd-comment-textarea" name="message" rows="4" placeholder="Write your reply…" required maxlength="4000"></textarea>
            </div>
            <p class="bd-comment-error" id="bdReplyModalError" role="alert" hidden></p>
            <div class="bd-reply-modal-actions">
              <button type="button" class="bd-comment-reply-cancel" data-bd-reply-close>Cancel</button>
              <button type="submit" class="faq-cta-btn" id="bdReplyModalSubmit">Post reply</button>
            </div>
          </form>
        </div>
      </div>

      <nav class="bd-post-nav" id="bdPostNav" aria-label="Previous and next articles"></nav>
        </div>

        <aside class="sidebar-right" aria-label="Related content">
          <div class="bd-sidebar-card bd-author-card reveal">
            <p class="section-label">About the Author</p>
            <div class="bd-author-avatar bd-author-avatar--lg" aria-hidden="true">SI</div>
            <h3 class="bd-sidebar-title">M Sohaib Ishaque</h3>
            <p class="bd-sidebar-text">Full Stack Web Developer building scalable web apps with Angular, .NET Core, and modern JavaScript.</p>
            <ul class="footer-social-list bd-author-social" aria-label="Author social links">
              <li><a href="https://github.com/Sohaib-Ishaque" class="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-github-fill"></span></a></li>
              <li><a href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/" class="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-linkedin-fill"></span></a></li>
              <li><a href="https://twitter.com/" class="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="ri-twitter-x-fill"></span></a></li>
              <li><a href="mailto:engineer.sohaibishaque@gmail.com" class="social-icon" aria-label="siEmail"><span class="icon" data-icon="ri-mail-line"></span></a></li>
            </ul>
          </div>
          <div class="bd-sidebar-card reveal">
            <p class="section-label">Keep Reading</p>
            <h3 class="bd-sidebar-title">Related articles</h3>
            <div class="bd-related-list" id="bdRelated"></div>
          </div>
          <div class="bd-sidebar-card reveal" id="bdTagsCard">
            <p class="section-label">Tags</p>
            <h3 class="bd-sidebar-title">Popular tags</h3>
            <div class="bd-tags" id="bdTags"></div>
          </div>
          <div class="bd-sidebar-card bd-sidebar-hire-mini reveal" id="bdSidebarHireMini" hidden>
            <h3 class="bd-sidebar-title">Ready to work together?</h3>
            <p class="bd-sidebar-text">Let's turn your product vision into a polished, performant site.</p>
            <a href="/contact" class="faq-cta-btn bd-sidebar-hire-btn">Hire Me →</a>
          </div>
          <div class="bd-sidebar-card bd-newsletter-card reveal" id="bdNewsletterCard">
            <div class="bd-newsletter-icon" aria-hidden="true">
              <span class="icon" data-icon="ri-mail-line"></span>
            </div>
            <h3 class="bd-sidebar-title">Stay Updated</h3>
            <p class="bd-sidebar-text">Subscribe for new articles on web development and architecture.</p>
            <form class="bd-newsletter-form" id="bdNewsletterForm" novalidate>
              <label class="u-sr-only" for="bdNewslettersiEmail">Email</label>
              <input type="Email" id="bdNewslettersiEmail" class="bd-newsletter-input" placeholder="Your Email" required />
              <button type="submit" class="faq-cta-btn">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </div>

    <section class="bd-related-below reveal" id="bdRelatedBelow" hidden aria-labelledby="bdRelatedBelowHeading">
      <div class="container">
        <h2 class="bd-related-below-title" id="bdRelatedBelowHeading">Related Articles</h2>
        <div class="bd-related-grid" id="bdRelatedBelowGrid"></div>
      </div>
    </section>

    <section class="pre-footer" id="bdPreFooter">
      <div class="container">
        <div class="pre-footer-inner">
          <h2 id="bdPreFooterTitle">Ready to Build Something Amazing?</h2>
          <p id="bdPreFooterText">Let's discuss your project and create a solution that performs, scales, and delights your users.</p>
          <div class="pre-footer-features" id="bdPreFooterFeatures"></div>
          <a href="/contact" class="btn btn-outline" id="bdPreFooterCta">Get a Free Consultation →</a>
        </div>
      </div>
    </section>

    <section id="bdInlineCtaSection" hidden>
      <div class="container">
        <div class="bd-inline-cta reveal">
          <div class="bd-inline-cta-icon" aria-hidden="true">
            <span class="icon" data-icon="ri-arrow-right-line"></span>
          </div>
          <div>
            <h2 class="bd-inline-cta-title">Let's create something amazing together</h2>
            <p class="bd-inline-cta-text">Have a project in mind? I'd love to help you build it.</p>
          </div>
          <a href="/contact" class="si-btn si-btn-primary">Start Project <span class="icon" data-icon="ri-arrow-right-line"></span></a>
        </div>
      </div>
    </section>

    ${SITE_FOOTER_HTML}

    <div class="bd-section-visibility" id="bdSectionVisibility" hidden>
      <button type="button" class="bd-section-visibility-toggle" id="bdSectionVisibilityToggle" aria-expanded="false" aria-controls="bdSectionVisibilityPanel">
        <i class="ri-layout-row-line" aria-hidden="true"></i>
        <span>Sections</span>
      </button>
      <div class="bd-section-visibility-panel" id="bdSectionVisibilityPanel" hidden>
        <p class="bd-section-visibility-title">Show on live site</p>
        <p class="bd-section-visibility-hint">Editors only — uncheck a section to hide it from visitors. Requires <code>&lt;section id="…"&gt;</code> blocks in the post HTML. Changes save automatically; you can also manage sections in Admin → Blog post → Section visibility.</p>
        <div class="bd-section-visibility-list" id="bdSectionVisibilityList"></div>
      </div>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

export function BlogDetailsContent() {
  return (
    <PortfolioHtmlContent
      page="BlogDetailsContent"
      className="blog-details-page"
      html={PAGE_HTML}
    />
  );
}
