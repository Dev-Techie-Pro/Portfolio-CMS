import { ICONS } from "../config/constants.js";

(() => {
  const Portfolio = (window.Portfolio = window.Portfolio || {});
  const SELECTOR =
    window.Portfolio?.ELEMENTS?.SELECTORS?.DATA_ICON || "[data-icon]";

  const isValidSvg = (markup) => {
    if (
      typeof markup !== "string" ||
      !/^\s*<svg\b[\s\S]*<\/svg>\s*$/i.test(markup)
    )
      return false;
    const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
    return (
      !parsed.querySelector("parsererror") &&
      parsed.documentElement.localName === "svg"
    );
  };

  let iconUid = 0;

  const uniquifySvgIds = (markup) => {
    const ids = new Set();
    markup.replace(/\bid="([^"]+)"/g, (_, id) => {
      ids.add(id);
      return _;
    });
    if (!ids.size) return markup;
    const suffix = (++iconUid).toString(36);
    let out = markup;
    [...ids]
      .sort((a, b) => b.length - a.length)
      .forEach((id) => {
        const next = id + "-" + suffix;
        const esc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        out = out
          .replace(new RegExp('id="' + esc + '"', "g"), 'id="' + next + '"')
          .replace(new RegExp("#" + esc + '(?=["\\s)])', "g"), "#" + next)
          .replace(
            new RegExp("url\\(#" + esc + "\\)", "g"),
            "url(#" + next + ")",
          )
          .replace(
            new RegExp('xlink:href="#' + esc + '"', "g"),
            'xlink:href="#' + next + '"',
          )
          .replace(
            new RegExp('href="#' + esc + '"', "g"),
            'href="#' + next + '"',
          );
      });
    return out;
  };

  const hydrate = (element) => {
    if (!(element instanceof Element) || element.dataset.iconReady === "true")
      return false;

    const name = (element.dataset.icon || "").trim().replace(/["'>]+$/g, "");
    if (!name) {
      element.dataset.iconError = "empty";
      return false;
    }

    const raw = ICONS[name];
    if (!raw) {
      if (!element.dataset.iconError) {
        console.warn("[Portfolio.ICONS] Unknown icon: " + name + ".");
      }
      element.dataset.iconError = "missing";
      return false;
    }
    const markup = uniquifySvgIds(raw);
    if (!isValidSvg(markup)) {
      console.error(
        "[Portfolio.ICONS] Icon " + name + " has malformed SVG markup.",
      );
      element.dataset.iconError = "invalid";
      return false;
    }
    try {
      element.insertAdjacentHTML("afterbegin", markup);
      element.dataset.iconReady = "true";
      element.removeAttribute("data-icon-error");
      return true;
    } catch (error) {
      console.error(
        "[Portfolio.ICONS] Unable to render icon " + name + ".",
        error,
      );
      element.dataset.iconError = "render";
      return false;
    }
  };

  const hydrateAll = (root = document) => {
    if (
      !(
        root instanceof Document ||
        root instanceof Element ||
        root instanceof DocumentFragment
      )
    )
      return;
    if (root instanceof Element && root.matches(SELECTOR)) hydrate(root);
    root.querySelectorAll?.(SELECTOR).forEach(hydrate);
  };

  const observe = (root = document.body) => {
    if (!root || Portfolio.ICONS._observer) return;
    Portfolio.ICONS._observer = new MutationObserver((records) =>
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE ||
            node.nodeType === Node.DOCUMENT_FRAGMENT_NODE
          )
            hydrateAll(node);
        }),
      ),
    );
    Portfolio.ICONS._observer.observe(root, { childList: true, subtree: true });
  };

  Portfolio.ICONS = {
    hydrate,
    hydrateAll,
    init(root = document) {
      hydrateAll(root);
      observe(document.body);
    },
  };

  if (document.readyState === "loading")
    document.addEventListener(
      "DOMContentLoaded",
      () => Portfolio.ICONS.init(),
      { once: true },
    );
  else Portfolio.ICONS.init();
})();
