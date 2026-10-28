import gsap from "gsap";

type FaqItem = {
  item: HTMLElement;
  head: HTMLButtonElement;
  body: HTMLElement;
  words: HTMLElement[];
  plus: HTMLElement | null;
  minus: HTMLElement | null;
  timeline: gsap.core.Timeline;
  open: boolean;
  onClick: () => void;
};

type AccordionController = {
  items: HTMLElement[];
  destroy: () => void;
};

type PortfolioWindow = Window & {
  Portfolio?: Record<string, unknown>;
};

const portfolioWindow = window as PortfolioWindow;
const portfolio = (portfolioWindow.Portfolio ??= {});
const controllers = new WeakMap<HTMLElement, AccordionController>();

function getAccordion(): HTMLElement | null {
  const section = document.getElementById("faqs");
  return (
    document.getElementById("homeFaqAccordion") ??
    section?.querySelector<HTMLElement>(".faq-accordion") ??
    section
  );
}

function getItems(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(".faq-item"));
}

function splitWords(paragraph: HTMLElement | null): HTMLElement[] {
  if (!paragraph || paragraph.dataset.faqWordsSplit === "true") {
    return paragraph
      ? Array.from(paragraph.querySelectorAll<HTMLElement>(".faq-word"))
      : [];
  }

  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }

  const words: HTMLElement[] = [];
  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    const tokens = (textNode.nodeValue ?? "").split(/(\s+)/);
    tokens.forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(token));
        return;
      }

      const word = document.createElement("span");
      word.className = "faq-word";
      word.textContent = token;
      fragment.append(word);
      words.push(word);
    });
    textNode.replaceWith(fragment);
  });

  paragraph.dataset.faqWordsSplit = "true";
  return words;
}

function createTimeline(entry: FaqItem): gsap.core.Timeline {
  const { head, body, words, plus, minus } = entry;
  const timeline = gsap.timeline({
    paused: true,
  });

  if (plus) gsap.set(plus, { transformPerspective: 300 });
  if (minus) gsap.set(minus, { transformPerspective: 300 });
  gsap.set(words, { autoAlpha: 0, y: 12 });

  timeline
    .fromTo(
      body,
      { height: 0 },
      { height: "auto", duration: 0.68, ease: "power3.inOut" },
      0,
    )
    .to(
      head,
      { paddingBottom: "0.65rem", duration: 0.42, ease: "power3.out" },
      0,
    )
    .to(
      words,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.012,
      },
      0.2,
    );

  if (plus) {
    timeline.fromTo(
      plus,
      { autoAlpha: 1, rotationY: 0, scale: 1 },
      {
        autoAlpha: 0,
        rotationY: 90,
        scale: 0.6,
        duration: 0.28,
        ease: "power2.in",
      },
      0,
    );
  }
  if (minus) {
    timeline.fromTo(
      minus,
      { autoAlpha: 0, rotationY: -90, scale: 0.6 },
      {
        autoAlpha: 1,
        rotationY: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
      },
      0.12,
    );
  }

  return timeline;
}

function bindAccordion(
  container: HTMLElement,
  elements: HTMLElement[],
): AccordionController {
  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }

  const background = document.createElement("div");
  background.className = "faq-active-bg";
  background.setAttribute("aria-hidden", "true");
  container.prepend(background);

  const entries: FaqItem[] = elements.map((item) => {
    const head = item.querySelector<HTMLButtonElement>(".faq-item-head");
    const bodyId = head?.getAttribute("aria-controls");
    const body =
      (bodyId ? document.getElementById(bodyId) : null) ??
      item.querySelector<HTMLElement>(".faq-item-body");

    if (!head || !body) {
      throw new Error(
        "FAQ item is missing its controlled question or answer panel.",
      );
    }

    const words = splitWords(body.querySelector<HTMLElement>("p"));
    item.classList.remove("reveal", "visible");
    item.style.removeProperty("opacity");
    item.style.removeProperty("transform");
    item.style.removeProperty("filter");
    body.classList.remove("pf-collapsed");

    const entry: FaqItem = {
      item,
      head,
      body,
      words,
      plus: item.querySelector<HTMLElement>(".faq-icon-plus"),
      minus: item.querySelector<HTMLElement>(".faq-icon-minus"),
      timeline: gsap.timeline({ paused: true }),
      open: head.getAttribute("aria-expanded") === "true",
      onClick: () => undefined,
    };
    entry.timeline.kill();
    entry.timeline = createTimeline(entry);
    return entry;
  });

  const position = { top: 0, bottom: 0 };
  let active: FaqItem | null = null;
  let arrivalTimer: number | null = null;
  let setTop: ((value: number) => void) | null = null;
  let setBottom: ((value: number) => void) | null = null;
  let tickerActive = false;
  let destroyed = false;

  const renderBackground = () => {
    gsap.set(background, {
      y: position.top,
      height: Math.max(0, position.bottom - position.top),
    });
  };

  const snapToActive = () => {
    if (!active) return;
    position.top = active.item.offsetTop;
    position.bottom = position.top + active.item.offsetHeight;
    renderBackground();
  };

  const trackActive = () => {
    if (!active || destroyed) return;
    if (setTop && setBottom) {
      setTop(active.item.offsetTop);
      setBottom(active.item.offsetTop + active.item.offsetHeight);
    } else {
      position.top = active.item.offsetTop;
      position.bottom = position.top + active.item.offsetHeight;
    }
    renderBackground();
  };

  const stopTicker = () => {
    if (!tickerActive) return;
    gsap.ticker.remove(trackActive);
    tickerActive = false;
  };

  const startTicker = () => {
    if (tickerActive) return;
    tickerActive = true;
    gsap.ticker.add(trackActive);
  };

  const clearHighlightArrival = () => {
    if (arrivalTimer !== null) {
      window.clearTimeout(arrivalTimer);
      arrivalTimer = null;
    }
  };

  const scheduleHighlightArrival = (entry: FaqItem, delay: number) => {
    clearHighlightArrival();
    arrivalTimer = window.setTimeout(() => {
      arrivalTimer = null;
      if (active === entry && entry.open) {
        entry.item.classList.add("is-highlighted");
      }
    }, delay * 1000);
  };

  const setOpen = (entry: FaqItem, open: boolean) => {
    if (entry.open === open) return;
    entry.open = open;
    entry.item.classList.toggle("is-open", open);
    entry.head.setAttribute("aria-expanded", String(open));

    if (open) {
      entry.body.style.visibility = "visible";
      if (reducedMotion()) entry.timeline.progress(1);
      else entry.timeline.timeScale(1).play();
    } else {
      if (reducedMotion()) entry.timeline.progress(0);
      else entry.timeline.timeScale(1.25).reverse();
    }
  };

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  entries.forEach((entry) => {
    entry.item.classList.toggle("is-open", entry.open);
    entry.item.classList.toggle("is-highlighted", entry.open);
    entry.head.setAttribute("aria-expanded", String(entry.open));
    entry.body.style.height = "0px";
    entry.body.style.visibility = "hidden";
    entry.timeline.progress(entry.open ? 1 : 0);
    if (entry.open) entry.body.style.visibility = "visible";

    entry.onClick = () => {
      const willOpen = !entry.open;
      const previous = active;
      entries.forEach((other) => {
        if (other !== entry) setOpen(other, false);
      });
      setOpen(entry, willOpen);

      if (reducedMotion()) {
        clearHighlightArrival();
        entries.forEach((item) =>
          item.item.classList.toggle(
            "is-highlighted",
            item === entry && willOpen,
          ),
        );
        active = willOpen ? entry : null;
        stopTicker();
        if (active) {
          snapToActive();
          gsap.set(background, { autoAlpha: 1 });
        } else {
          gsap.set(background, { autoAlpha: 0 });
        }
        return;
      }

      if (!willOpen) {
        clearHighlightArrival();
        active = entry;
        setTop = gsap.quickTo(position, "top", {
          duration: 0.44,
          ease: "power3.out",
        });
        setBottom = gsap.quickTo(position, "bottom", {
          duration: 0.44,
          ease: "power3.out",
        });
        gsap.to(background, {
          autoAlpha: 0,
          duration: 0.42,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => entry.item.classList.remove("is-highlighted"),
        });
        startTicker();
        return;
      }

      const firstOpen = !previous;
      const down = previous
        ? entries.indexOf(entry) > entries.indexOf(previous)
        : true;
      entries.forEach((item) => item.item.classList.remove("is-highlighted"));
      if (firstOpen) {
        position.top = entry.item.offsetTop;
        position.bottom = position.top;
        renderBackground();
      }
      active = entry;
      gsap.killTweensOf(position);
      const lead = { duration: 0.42, ease: "expo.out" as const };
      const trail = { duration: 0.82, ease: "power3.out" as const };
      setTop = gsap.quickTo(position, "top", down ? trail : lead);
      setBottom = gsap.quickTo(position, "bottom", down ? lead : trail);
      gsap.to(background, {
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
      scheduleHighlightArrival(entry, previous === entry ? 0 : 0.42);
      startTicker();
    };

    entry.timeline.eventCallback("onReverseComplete", () => {
      entry.body.style.visibility = "hidden";
      if (active === entry && !entry.open) {
        active = null;
        stopTicker();
      }
    });
    entry.head.addEventListener("click", entry.onClick);
  });

  const initiallyOpen = entries.find((entry) => entry.open);
  if (initiallyOpen) {
    active = initiallyOpen;
    initiallyOpen.item.classList.add("is-highlighted");
    snapToActive();
    gsap.set(background, { autoAlpha: 1 });
    if (!reducedMotion()) startTicker();
  }

  const resizeObserver = new ResizeObserver(() => {
    if (active) trackActive();
  });
  resizeObserver.observe(container);

  return {
    items: elements,
    destroy() {
      destroyed = true;
      stopTicker();
      resizeObserver.disconnect();
      entries.forEach((entry) => {
        entry.head.removeEventListener("click", entry.onClick);
        entry.item.classList.remove("is-highlighted");
        entry.timeline.kill();
        gsap.set(
          [entry.head, entry.body, entry.words, entry.plus, entry.minus].filter(
            Boolean,
          ),
          { clearProps: "all" },
        );
      });
      gsap.killTweensOf([background, position]);
      clearHighlightArrival();
      background.remove();
    },
  };
}

function refresh(): void {
  const container = getAccordion();
  if (!container) return;

  const elements = getItems(container);
  const previous = controllers.get(container);
  if (
    previous &&
    previous.items.length === elements.length &&
    previous.items.every((item, index) => item === elements[index])
  ) {
    return;
  }

  previous?.destroy();
  controllers.delete(container);
  if (!elements.length) return;

  controllers.set(container, bindAccordion(container, elements));
}

function init(): void {
  refresh();
}

portfolio.BLOGS_FAQS = { init, refresh };

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
