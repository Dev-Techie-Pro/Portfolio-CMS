import { bindMagnetic, animateButtonPress } from "../../lib/motion/micro.js";
const MAGNETIC_BOUND = "data-pa-magnetic-bound";
const PRESS_BOUND = "data-pa-press-bound";
function initMotionChrome(root = document) {
  root.querySelectorAll(".pa-btn-add, .pa-btn-primary, .magnetic").forEach((el) => {
    if (el.getAttribute(MAGNETIC_BOUND) === "1") return;
    el.setAttribute(MAGNETIC_BOUND, "1");
    el.classList.add("magnetic");
    bindMagnetic(el, 0.18);
  });
  root.querySelectorAll(".pa-btn, .pa-view-btn, .nav-cta, .pa-dash-cta-btn").forEach((el) => {
    if (el.getAttribute(PRESS_BOUND) === "1") return;
    el.setAttribute(PRESS_BOUND, "1");
    el.addEventListener("click", () => animateButtonPress(el));
  });
}
export {
  initMotionChrome
};
//# sourceMappingURL=motion-chrome.js.map
