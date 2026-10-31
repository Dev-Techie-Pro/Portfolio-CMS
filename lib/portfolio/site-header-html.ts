export type SiteHeaderPage =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "blogs"
  | "testimonials"
  | "contact";

const NAV_ITEMS: { href: string; label: string; page: SiteHeaderPage }[] = [
  { href: "/", label: "Home", page: "home" },
  { href: "/about", label: "About", page: "about" },
  { href: "/skills", label: "Skills", page: "skills" },
  { href: "/experience", label: "Experience", page: "experience" },
  { href: "/projects", label: "Projects", page: "projects" },
  { href: "/blogs", label: "Blogs", page: "blogs" },
  { href: "/testimonials", label: "Testimonials", page: "testimonials" },
];

export function getSiteHeaderHtml(activePage: SiteHeaderPage): string {
  const navLinks = NAV_ITEMS.map(({ href, label, page }) => {
    const active = page === activePage;
    return `<a href="${href}" class="nav-link${active ? " active" : ""}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("\n            ");

  return `<div id="mobile-nav-root" data-mobile-nav-root></div>
    <header class="navbar" role="banner">
      <div class="container">
        <div class="nav-inner">
          <a href="/" class="nav-logo" aria-label="M Sohaib Ishaque — Home">
            <div class="logo-box u-flex-center" aria-hidden="true">SI</div>
            <div class="logo-text">
              <span class="logo-name">M Sohaib Ishaque</span>
              <span class="logo-role">Full Stack Web Developer</span>
            </div>
          </a>
          <nav class="nav-menu" aria-label="Main navigation">
            ${navLinks}
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
    </header>`;
}
