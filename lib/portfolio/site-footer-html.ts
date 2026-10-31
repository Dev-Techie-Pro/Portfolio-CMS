export const SITE_FOOTER_HTML = `
<footer class="site-footer" id="site-footer">
  <div class="footer-bg" aria-hidden="true">
    <span class="icon" data-icon="siGridDots"></span>
    <div class="footer-bg-glow-blob"></div>
    <div class="footer-bg-globe">
      <span class="icon" data-icon="siFooterGlobe"></span>
    </div>
    <div class="footer-bg-noise"></div>
  </div>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-intro">
          <p class="sm tagline">Clean code. Considered design.<br>Built to be remembered.</p>
          <div class="divider" aria-hidden="true"></div>
          <h2 class="hero-title">Let's Create<br>Something<br><span class="hero-accent">Extraordinary</span></h2>
        </div>
        <section class="glass profile-card" aria-label="About M Sohaib Ishaque">
          <div class="card-head">
            <div class="brand">
              <span class="brand-mark" aria-hidden="true">Si</span>
              <span class="brand-name">M Sohaib Ishaque</span>
            </div>
            <span class="sm since">Full Stack Developer</span>
          </div>
          <p class="card-text">I'm a full stack web developer crafting fast, scalable and beautifully built experiences for ambitious brands and clients worldwide.</p>
          <p class="sm stack">Angular · React · Next.js · Node.js · TypeScript · MongoDB · Tailwind CSS</p>
          <div class="stats" aria-label="Experience highlights">
            <div><span class="stat-num">3+</span><span class="sm stat-label">Years</span></div>
            <div><span class="stat-num">60+</span><span class="sm stat-label">Projects</span></div>
            <div><span class="stat-num">99%</span><span class="sm stat-label">Satisfaction</span></div>
          </div>
        </section>
      </div>

      <div class="glass panel">
        <div class="pan">
          <nav class="footer-navigation" aria-label="Footer navigation">
            <h3 class="lab">Navigation</h3>
            <div class="nav-cols">
              <div class="nv">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/skills">Skills</a>
                <a href="/projects">Projects</a>
              </div>
              <div class="nv">
                <a href="/experience">Experience</a>
                <a href="/blogs">Blogs</a>
                <a href="/testimonials">Testimonials</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </nav>

          <section class="nl" aria-labelledby="footer-newsletter-heading">
            <h3 class="lab" id="footer-newsletter-heading">Stay inspired</h3>
            <div class="nl-box">
              <div class="nl-shard" aria-hidden="true"></div>
              <p class="nl-title">Subscribe for ideas, projects and dev notes.</p>
              <form class="footer-newsletter-form nl-form" id="footerNewsletterForm" novalidate>
                <label for="footerNewsletterEmail" class="sr-only">Email address</label>
                <input
                  type="email"
                  class="footer-newsletter-input nl-input"
                  id="footerNewsletterEmail"
                  name="email"
                  placeholder="Your email address"
                  autocomplete="email"
                  inputmode="email"
                  required
                >
                <input
                  type="text"
                  class="footer-newsletter-hp"
                  name="website"
                  tabindex="-1"
                  autocomplete="off"
                  aria-hidden="true"
                >
                <button class="footer-newsletter-btn go" type="submit">
                  <span data-newsletter-submit-label>Subscribe</span>
                  <svg class="i i-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
                </button>
                <p class="footer-newsletter-feedback" id="footerNewsletterFeedback" role="status" aria-live="polite" hidden></p>
              </form>
            </div>
          </section>

          <section class="contact" aria-labelledby="footer-contact-heading">
            <h3 class="lab" id="footer-contact-heading">Contact</h3>
            <div class="contact-list">
              <a href="mailto:engineer.sohaibishaque@gmail.com">engineer.sohaibishaque@gmail.com</a>
              <a href="tel:+923038464315">+92 303 8464315</a>
              <span>Rawalpindi, Pakistan</span>
            </div>
          </section>

          <nav class="sc" aria-label="Social links">
            <h3 class="lab">Social</h3>
            <a href="https://github.com/Sohaib-Ishaque" target="_blank" rel="noopener noreferrer">GitHub<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg></a>
            <a href="https://www.linkedin.com/in/engineer-sohaib-ishaque-765b34171/" target="_blank" rel="noopener noreferrer">LinkedIn<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg></a>
            <a href="https://sohaibishaque.vercel.app/" target="_blank" rel="noopener noreferrer">Website<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg></a>
            <a href="mailto:engineer.sohaibishaque@gmail.com">Email<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg></a>
          </nav>

        </div>

        <div class="bot sm">
          <span>© 2026 M Sohaib Ishaque. All rights reserved.</span>
          <span>Available for freelance work</span>
          <span>Handcrafted digital experiences · <span class="built">Built to ship</span></span>
        </div>
      </div>
    </div>
  </div>
</footer>`;
