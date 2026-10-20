const SELECTOR_BUTTON = ".back-top";
const SELECTOR_FILL = ".back-top-progress-fill";
const READY_FLAG = "scrollProgressReady";
const RADIUS = 42;
const FALLBACK_CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MOUNT_TIMEOUT_MS = 8000;

const RING_MARKUP = `
  <svg class="back-top-progress ring-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <circle class="ring-track" cx="50" cy="50" r="${RADIUS}" />
    <circle class="back-top-progress-fill ring-fill" cx="50" cy="50" r="${RADIUS}" />
  </svg>`;

let circumference = FALLBACK_CIRCUMFERENCE;
let fillNode = null;
let buttonNode = null;
let rafId = 0;
let resizeTimer = 0;
let started = false;

function getScrollPercent() {
  try {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    if (!Number.isFinite(maxScroll) || maxScroll <= 0) return 0;

    const raw = (window.scrollY / maxScroll) * 100;
    if (!Number.isFinite(raw)) return 0;
    return Math.min(100, Math.max(0, raw));
  } catch (error) {
    console.warn("[Portfolio.BackToTopProgress] Scroll percent failed.", error);
    return 0;
  }
}

function applyProgress(percent) {
  if (!fillNode) return;
  const offset = circumference * (1 - percent / 100);
  fillNode.style.strokeDashoffset = String(offset);

  if (buttonNode) {
    buttonNode.setAttribute(
      "data-scroll-progress",
      String(Math.round(percent)),
    );
  }
}

function scheduleUpdate() {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    rafId = 0;
    applyProgress(getScrollPercent());
  });
}

function measureCircumference(node) {
  try {
    const length =
      typeof node.getTotalLength === "function" ? node.getTotalLength() : 0;
    if (length > 0) return length;
  } catch (error) {
    console.warn(
      "[Portfolio.BackToTopProgress] getTotalLength failed; using 2πr.",
      error,
    );
  }
  return FALLBACK_CIRCUMFERENCE;
}

function ensureRing(button) {
  let fill = button.querySelector(SELECTOR_FILL);
  if (!fill) {
    button.insertAdjacentHTML("afterbegin", RING_MARKUP);
    fill = button.querySelector(SELECTOR_FILL);
  }
  return fill;
}

function bind(button) {
  if (!(button instanceof HTMLElement)) {
    console.error(
      "[Portfolio.BackToTopProgress] Expected an HTMLElement for .back-top.",
    );
    return;
  }

  if (button.dataset[READY_FLAG] === "true") return;

  const fill = ensureRing(button);
  if (!fill) {
    console.error(
      "[Portfolio.BackToTopProgress] Ring markup inserted but fill circle was not found.",
    );
    return;
  }

  button.dataset[READY_FLAG] = "true";
  buttonNode = button;
  fillNode = fill;
  circumference = measureCircumference(fill);

  fill.style.strokeDasharray = String(circumference);
  fill.style.strokeDashoffset = String(circumference);

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(scheduleUpdate, 100);
    },
    { passive: true },
  );
  window.visualViewport?.addEventListener("resize", scheduleUpdate, {
    passive: true,
  });
  window.addEventListener("orientationchange", scheduleUpdate, {
    passive: true,
  });

  applyProgress(getScrollPercent());
}

function waitForButton(root) {
  const existing = root.querySelector(SELECTOR_BUTTON);
  if (existing) {
    bind(existing);
    return;
  }

  const observer = new MutationObserver(() => {
    const button = root.querySelector(SELECTOR_BUTTON);
    if (!button) return;
    observer.disconnect();
    bind(button);
  });

  try {
    observer.observe(root.body || root, { childList: true, subtree: true });
  } catch (error) {
    console.error(
      "[Portfolio.BackToTopProgress] Cannot observe DOM for .back-top.",
      error,
    );
    return;
  }

  window.setTimeout(() => {
    observer.disconnect();
    if (!root.querySelector(SELECTOR_BUTTON)) {
      console.warn(
        "[Portfolio.BackToTopProgress] .back-top was not found; progress ring skipped.",
      );
    }
  }, MOUNT_TIMEOUT_MS);
}

export function mountBackToTopProgress(root = document) {
  if (started) return;
  if (!root?.body && root !== document) {
    console.warn(
      "[Portfolio.BackToTopProgress] Cannot mount: document body is missing.",
    );
    return;
  }
  started = true;
  waitForButton(root);
}

