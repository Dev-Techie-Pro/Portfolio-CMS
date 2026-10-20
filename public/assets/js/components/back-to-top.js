export class BackToTop {
  static selector = ".back-top";

  static markup() {
    return `
      <button class="back-top" aria-label="Back to top">
        <span class="icon" data-icon="siArrowUp"></span>
      </button>`;
  }

  static mount(root = document) {
    if (!root?.body) {
      console.warn(
        "[Portfolio.BackToTop] Cannot mount: document body is missing.",
      );
      return null;
    }

    let element = root.querySelector(this.selector);
    if (!element) {
      root.body.insertAdjacentHTML("afterbegin", this.markup());
      element = root.querySelector(this.selector);
    }

    if (!element) {
      console.error(
        "[Portfolio.BackToTop] Markup inserted but .back-top was not found.",
      );
      return null;
    }

    if (element.dataset.componentReady === "true") return element;

    element.dataset.componentReady = "true";
    const update = () => element.classList.toggle("show", window.scrollY > 500);
    window.addEventListener("scroll", update, { passive: true });
    element.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    update();
    return element;
  }
}
