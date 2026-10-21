import {
  gsapWithCSS,
  motionDuration,
  motionStagger
} from "./chunk-5F7OC4VP.js";

// lib/motion/presets.ts
var CLEAR = "transform,opacity";
function animateTitleChars(titleEl, delay = 0) {
  if (!titleEl) return gsapWithCSS.timeline();
  const chars = titleEl.querySelectorAll(".ch");
  if (!chars.length) return gsapWithCSS.timeline();
  return gsapWithCSS.fromTo(
    chars,
    { yPercent: 115, rotation: 6 },
    {
      yPercent: 0,
      rotation: 0,
      duration: motionDuration(0.85),
      ease: "power4.out",
      stagger: motionStagger(0.022),
      delay: motionDuration(delay),
      clearProps: CLEAR
    }
  );
}
function fadeUp(targets, opts = {}) {
  const { y = 34, scale = 0.985, stagger = 0.07, delay = 0, duration = 0.9 } = opts;
  const list = gsapWithCSS.utils.toArray(targets);
  if (!list.length) return gsapWithCSS.timeline();
  return gsapWithCSS.fromTo(
    list,
    { opacity: 0, y, scale },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: motionDuration(duration),
      ease: "power3.out",
      stagger: motionStagger(stagger),
      delay: motionDuration(delay),
      clearProps: CLEAR
    }
  );
}
function fadeSlide(targets, opts = {}) {
  const { x = 0, y = 12, stagger = 0.045, delay = 0, duration = 0.55 } = opts;
  const list = gsapWithCSS.utils.toArray(targets);
  if (!list.length) return gsapWithCSS.timeline();
  return gsapWithCSS.fromTo(
    list,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: motionDuration(duration),
      ease: "power3.out",
      stagger: motionStagger(stagger),
      delay: motionDuration(delay),
      clearProps: CLEAR
    }
  );
}

export {
  animateTitleChars,
  fadeUp,
  fadeSlide
};
//# sourceMappingURL=chunk-V4P62DF3.js.map
