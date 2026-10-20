export class Cursor {
  static selector = ".cursor";
  static ringSelector = ".cursor-ring";

  static markup() {
    return `
      <div class="cursor" aria-hidden="true"></div>
      <div class="cursor-ring" aria-hidden="true"></div>`;
  }

  static mount(root = document) {
    if (!root?.body) {
      console.warn(
        "[Portfolio.Cursor] Cannot mount: document body is missing.",
      );
      return null;
    }

    let element = root.querySelector(this.selector);
    let ring = root.querySelector(this.ringSelector);

    if (!element && !ring) {
      root.body.insertAdjacentHTML("afterbegin", this.markup());
      element = root.querySelector(this.selector);
      ring = root.querySelector(this.ringSelector);
    } else {
      if (!element) {
        root.body.insertAdjacentHTML(
          "afterbegin",
          `<div class="cursor" aria-hidden="true"></div>`,
        );
        element = root.querySelector(this.selector);
      }
      if (!ring) {
        const host = element || root.body;
        host.insertAdjacentHTML(
          element ? "afterend" : "afterbegin",
          `<div class="cursor-ring" aria-hidden="true"></div>`,
        );
        ring = root.querySelector(this.ringSelector);
      }
    }

    if (!element || !ring) {
      console.error(
        "[Portfolio.Cursor] Expected .cursor and .cursor-ring in the document.",
      );
      return element;
    }

    if (element.dataset.componentReady === "true") return element;

    element.dataset.componentReady = "true";
    if (window.matchMedia("(max-width: 768px)").matches) return element;

    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const render = () => {
      ringX += (pointerX - ringX) * 0.12;
      ringY += (pointerY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frame = window.requestAnimationFrame(render);
    };

    document.addEventListener(
      "pointermove",
      ({ clientX, clientY }) => {
        pointerX = clientX;
        pointerY = clientY;
        element.style.left = `${clientX}px`;
        element.style.top = `${clientY}px`;
      },
      { passive: true },
    );

    document.addEventListener("pointerover", ({ target }) => {
      if (
        !(target instanceof Element) ||
        !target.closest("a, button, [role='button']")
      )
        return;
      element.style.width = element.style.height = "14px";
      ring.style.width = ring.style.height = "48px";
    });
    document.addEventListener("pointerout", ({ target, relatedTarget }) => {
      if (
        !(target instanceof Element) ||
        (target.closest("a, button, [role='button']") !== target &&
          !target.closest("a, button, [role='button']"))
      )
        return;
      if (
        relatedTarget instanceof Element &&
        relatedTarget.closest("a, button, [role='button']")
      )
        return;
      element.style.width = element.style.height = "";
      ring.style.width = ring.style.height = "";
    });

    frame = window.requestAnimationFrame(render);
    window.addEventListener(
      "pagehide",
      () => window.cancelAnimationFrame(frame),
      { once: true },
    );
    return element;
  }
}
