/** Extra built-in SVG keys merged onto the public icon map (not in the main registry bundle). */

export const CSS3_BRAND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-hidden="true"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.543z"/><path fill="#33A9DC" d="M64.003 117.062l36.559-10.136 8.601-96.354h-45.16v104.49z"/><path fill="#fff" d="M64.003 51.429h18.302l1.264 14.163H64.003v14.834h33.044l-.348 3.892-3.787 42.385H64.003v13.271h36.416l2.115-23.661 2.855-32H64.003V51.429zM30.674 51.429H48.9v14.834H32.441l-1.172 13.177H48.9v14.834H29.435L27.32 65.263H13.148V51.429z"/></svg>`;

/** Git (scm) diamond — distinct from GitHub (octocat). */
export const GIT_SCM_BRAND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" role="img" aria-hidden="true"><path fill="#F05133" d="M90.6 44.6C86.1 21.7 64.5 4.5 39.9 4.5S4.3 21.7-.2 44.6c-.1.8-.2 1.6-.2 2.4v5.8c0 19.5 15.8 35.3 35.3 35.3h11.2c19.5 0 35.3-15.8 35.3-35.3v-5.8c0-.8-.1-1.6-.2-2.4z"/><path fill="#fff" d="M40.3 22.5c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24zm-1.2 36.8h-6.8V35.9h6.8v23.4zm0-26.6h-6.8v-5.9h6.8v5.9zm11.9 26.6h-6.8V42.4h6.8v16.9z"/></svg>`;

/** Fill missing brand keys from siblings (GitHub octocat, CSS3, etc.). */
export function applyPortfolioIconAliases(icons: Record<string, string>) {
  if (!icons || typeof icons !== "object") return icons;
  const out = { ...icons };
  if (!out.siGithub && out.siGit) {
    out.siGithub = out.siGit;
  }
  if (!out.siGitScm) {
    out.siGitScm = GIT_SCM_BRAND_SVG;
  }
  if (!out.siCss3) {
    out.siCss3 = CSS3_BRAND_SVG;
  }
  return out;
}
