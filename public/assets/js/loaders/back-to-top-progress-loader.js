export { mountBackToTopProgress } from "../features/back-to-top-progress.js";

import { mountBackToTopProgress } from "../features/back-to-top-progress.js";

function boot() {
  const run = () => {
    try {
      mountBackToTopProgress(document);
    } catch (error) {
      console.error("[Portfolio.BackToTopProgress] Mount failed.", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
    return;
  }
  run();
}

boot();
