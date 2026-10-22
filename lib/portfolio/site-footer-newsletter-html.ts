/** Shared footer newsletter block (after `.freelance-note` in site footer). */
export const SITE_FOOTER_NEWSLETTER_HTML = `
            <div class="footer-newsletter" id="footerNewsletter">
              <div class="footer-newsletter-head">
                <span class="footer-newsletter-icon" aria-hidden="true">
                  <span class="icon" data-icon="siEnvelope"></span>
                </span>
                <h4 class="footer-newsletter-title">Newsletter</h4>
              </div>
              <p class="footer-newsletter-desc">
                Subscribe for new articles, projects, and dev notes—no spam.
              </p>
              <form class="footer-newsletter-form" id="footerNewsletterForm" novalidate>
                <div class="footer-newsletter-row">
                  <input
                    type="email"
                    class="footer-newsletter-input"
                    id="footerNewsletterEmail"
                    name="email"
                    placeholder="Your email address"
                    autocomplete="email"
                    inputmode="email"
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button type="submit" class="footer-newsletter-btn">Subscribe</button>
                </div>
                <input
                  type="text"
                  class="footer-newsletter-hp"
                  name="website"
                  tabindex="-1"
                  autocomplete="off"
                  aria-hidden="true"
                />
                <p
                  class="footer-newsletter-feedback"
                  id="footerNewsletterFeedback"
                  role="status"
                  aria-live="polite"
                  hidden
                ></p>
              </form>
            </div>`;
