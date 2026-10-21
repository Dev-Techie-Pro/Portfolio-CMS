import gsap from "gsap";
import { fadeUp } from "../../lib/motion/presets.js";
import { prefersReducedMotion } from "../../lib/motion/duration.js";
import { prefersReducedMotion as prefersReducedMotion2 } from "../../lib/motion/duration.js";
function staggerReveal(root, childSelector, options) {
  if (!root) return;
  const startDelay = options?.startDelay ?? 0.04;
  const staggerBy = options?.staggerBy ?? 0.07;
  const duration = options?.duration ?? 0.42;
  if (prefersReducedMotion()) {
    root.classList.add("is-motion-ready");
    return;
  }
  root.classList.remove("is-motion-ready");
  root.classList.add("pa-motion-controlled");
  const targets = childSelector ? Array.from(root.querySelectorAll(childSelector)) : Array.from(root.children);
  if (!targets.length) {
    root.classList.add("is-motion-ready");
    return;
  }
  const tl = fadeUp(targets, {
    y: 10,
    scale: 1,
    stagger: staggerBy,
    delay: startDelay,
    duration
  });
  tl.eventCallback("onComplete", () => {
    root.classList.add("is-motion-ready");
  });
  tl.eventCallback("onInterrupt", () => {
    root.classList.add("is-motion-ready");
  });
}
function revealNewNodes(nodes) {
  const list = gsap.utils.toArray(nodes);
  if (!list.length) return;
  fadeUp(list, { y: 8, stagger: 0.04, duration: 0.45 });
}
export {
  prefersReducedMotion2 as prefersReducedMotion,
  revealNewNodes,
  staggerReveal
};
//# sourceMappingURL=motion.js.map
