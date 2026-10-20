export class Preloader {
  static selector = "#preloader";

  static markup() {
    return `
      <div id="preloader" aria-hidden="true">
        <div class="preloader-logo">SI</div>
        <div class="preloader-bar"></div>
      </div>`;
  }

  static mount(root = document) {
    if (!root?.body) {
      console.warn(
        "[Portfolio.Preloader] Cannot mount: document body is missing.",
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
        "[Portfolio.Preloader] Markup inserted but #preloader was not found.",
      );
      return null;
    }

    if (element.dataset.componentReady === "true") return element;

    element.dataset.componentReady = "true";

    const hide = () => {
      const delay = window.Portfolio?.CONSTANTS?.ANIM?.preloaderDelay ?? 1500;
      window.setTimeout(() => element.classList.add("hidden"), delay);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    return element;
  }
}
