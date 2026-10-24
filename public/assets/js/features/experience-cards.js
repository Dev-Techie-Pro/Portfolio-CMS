"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.EXP_CARDS = (function () {
    const { $$: t, debounce: d } = window.Portfolio.UTILS,
      MOBILE_MAX = 768,
      STEP_VH = 0.72,
      ACTIVE = "is-exp-active",
      READY = "expHscrollReady",
      FIRST_HOLD = 0.14;

    function snapProgressValues(count) {
      if (count <= 1) return [0];
      return Array.from({ length: count }, (_, i) =>
        progressForIndex(i, count),
      );
    }

    function indexFromProgress(progress, count) {
      if (count <= 1) return 0;
      const p = Math.max(0, Math.min(1, progress));
      const snaps = snapProgressValues(count);
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < snaps.length; i++) {
        const d = Math.abs(p - snaps[i]);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    }

    function progressForIndex(index, count) {
      if (count <= 1) return 0;
      const i = Math.max(0, Math.min(count - 1, index));
      if (i === 0) return 0;
      if (i === count - 1) return 1;
      const slot = (i + 0.5) / count;
      return FIRST_HOLD + slot * (1 - FIRST_HOLD);
    }

    function animSpeed() {
      return window.Portfolio.TEXTURES && window.Portfolio.TEXTURES.getAnimSpeed
        ? window.Portfolio.TEXTURES.getAnimSpeed()
        : 1;
    }

    function prefersReduced() {
      return (
        (window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
        document.documentElement.classList.contains("si-animations-off")
      );
    }

    function pinOffset() {
      const nav = document.querySelector(".navbar");
      return (nav ? nav.offsetHeight : 70) + 16;
    }

    function setup(section) {
      if (section.dataset[READY] === "1") teardown(section);
      section.dataset[READY] = "1";

      const root = section.querySelector(".exp-hscroll-root");
      const intro = section.querySelector(".exp-hscroll-intro");
      const stage = section.querySelector(".exp-hscroll-stage");
      const track = section.querySelector(".exp-tl-track");
      const cards = t(".exp-tl-card", section);
      const panels = t(".exp-role", section);
      const roleStage = section.querySelector(".exp-role-stage");
      if (!root || !stage || cards.length < 1) return;

      let indicator = track && track.querySelector(".exp-tl-indicator");
      if (track && !indicator) {
        indicator = document.createElement("div");
        indicator.className = "exp-tl-indicator";
        indicator.setAttribute("aria-hidden", "true");
        track.appendChild(indicator);
      }

      const EXITING = "is-exp-exiting";
      const ENTERING = "is-exp-entering";
      const TL_PULSE = "is-exp-tl-pulse";

      function switchMs() {
        return Math.round(680 / animSpeed());
      }

      function introHeight() {
        return intro ? intro.offsetHeight : 0;
      }

      function scrollTravel() {
        return Math.max(1, (cards.length - 1) * window.innerHeight * STEP_VH);
      }

      section.classList.add("js-exp-hscroll");
      const dur = (0.45 / animSpeed()).toFixed(3) + "s";
      const switchDur = (0.68 / animSpeed()).toFixed(3) + "s";
      document.documentElement.style.setProperty("--exp-card-dur", dur);
      document.documentElement.style.setProperty("--exp-switch-dur", switchDur);

      let raf = null;
      let inView = !("IntersectionObserver" in window);
      let active = 0;
      let pinMode = false;
      let clicking = false;

      function canPin() {
        return !prefersReduced() && window.innerWidth >= MOBILE_MAX;
      }

      function measure() {
        pinMode = canPin();
        section.classList.toggle("is-exp-pinned", pinMode);
        if (pinMode) {
          root.style.height =
            introHeight() + stage.offsetHeight + scrollTravel() + "px";
        } else {
          root.style.height = "";
        }
      }

      function moveIndicator(card) {
        if (!indicator || !card || !track) return;
        if (
          section.dataset.expGsapDriver === "1" &&
          typeof window.__paExpHscrollAnimateIndicator === "function"
        ) {
          window.__paExpHscrollAnimateIndicator(indicator, track, card);
          return;
        }
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        indicator.style.width = cardRect.width + "px";
        indicator.style.transform =
          "translateX(" + (cardRect.left - trackRect.left + track.scrollLeft) + "px)";
      }

      function pulseCard(card) {
        if (!card || prefersReduced()) return;
        card.classList.remove(TL_PULSE);
        void card.offsetWidth;
        card.classList.add(TL_PULSE);
      }

      function clearScrollLock() {
        clicking = false;
        delete section.dataset.expScrollLock;
      }

      function setActive(index, fromScroll) {
        let next = Math.max(0, Math.min(cards.length - 1, index));
        if (fromScroll && section.dataset.expScrollLock !== undefined) {
          const locked = parseInt(section.dataset.expScrollLock, 10);
          if (!Number.isNaN(locked)) next = locked;
        }
        if (next === active && cards[next].classList.contains(ACTIVE)) {
          return;
        }

        const prev = active;
        const dir = next > prev ? "next" : "prev";
        if (roleStage) roleStage.dataset.expDir = dir;

        const prevPanel = panels[prev];
        const nextPanel = panels[next];
        const animate =
          !fromScroll &&
          !prefersReduced() &&
          prevPanel &&
          nextPanel &&
          prev !== next &&
          section.dataset.expInit === "1";

        active = next;

        cards.forEach((card, i) => {
          const on = i === active;
          const wasOn = card.classList.contains(ACTIVE);
          card.classList.toggle(ACTIVE, on);
          card.setAttribute("aria-selected", on ? "true" : "false");
          card.tabIndex = on ? 0 : -1;
          if (on && !wasOn) pulseCard(card);
        });

        if (animate) {
          if (roleStage) {
            roleStage.style.setProperty(
              "--exp-stage-h",
              Math.max(prevPanel.offsetHeight, nextPanel.offsetHeight) + "px",
            );
          }
          section.classList.add("is-exp-switching");
          prevPanel.classList.add(EXITING);
          prevPanel.classList.remove(ACTIVE);
          nextPanel.classList.add(ACTIVE, ENTERING);
          nextPanel.setAttribute("aria-hidden", "false");
          nextPanel.inert = false;
          panels.forEach((panel, i) => {
            if (i === active) return;
            panel.classList.remove(ACTIVE, ENTERING, EXITING);
            panel.setAttribute("aria-hidden", "true");
            panel.inert = true;
          });
          clearTimeout(section._expSwitchTimer);
          section._expSwitchTimer = window.setTimeout(() => {
            prevPanel.classList.remove(EXITING);
            nextPanel.classList.remove(ENTERING);
            section.classList.remove("is-exp-switching");
            if (roleStage) roleStage.style.removeProperty("--exp-stage-h");
          }, switchMs());
        } else {
          panels.forEach((panel, i) => {
            const on = i === active;
            panel.classList.remove(ENTERING, EXITING);
            panel.classList.toggle(ACTIVE, on);
            panel.setAttribute("aria-hidden", on ? "false" : "true");
            panel.inert = !on;
          });
        }

        const current = cards[active];
        moveIndicator(current);
        if (current && track) {
          const left =
            current.offsetLeft - (track.clientWidth - current.offsetWidth) / 2;
          track.scrollTo({
            left: Math.max(0, left),
            behavior: prefersReduced() ? "auto" : "smooth",
          });
        }
      }

      function render() {
        raf = null;
        if (!pinMode) return;
        const rect = root.getBoundingClientRect();
        const start = pinOffset();
        const travel = scrollTravel();
        let progress = (start - rect.top - introHeight()) / travel;
        if (!isFinite(progress)) progress = 0;
        progress = Math.max(0, Math.min(1, progress));
        const idx = indexFromProgress(progress, cards.length);
        setActive(idx, true);
      }

      function schedule() {
        if (raf !== null || !inView || clicking) return;
        raf = window.requestAnimationFrame(render);
      }

      function scrollToIndex(index) {
        const target = Math.max(0, Math.min(cards.length - 1, index));
        if (!pinMode) {
          setActive(target, false);
          return;
        }
        clicking = true;
        section.dataset.expScrollLock = String(target);
        setActive(target, false);
        const unlockMs = prefersReduced() ? 80 : 900;
        if (
          section.dataset.expGsapDriver === "1" &&
          typeof window.__paExpHscrollScrollTo === "function"
        ) {
          let finished = false;
          const finishScrollTo = function () {
            if (finished) return;
            finished = true;
            clearScrollLock();
            schedule();
          };
          window.__paExpHscrollScrollTo(section, target, finishScrollTo);
          window.setTimeout(finishScrollTo, unlockMs);
          return;
        }
        const rectTop = window.scrollY + root.getBoundingClientRect().top;
        const travel = scrollTravel();
        const y =
          rectTop -
          pinOffset() +
          introHeight() +
          progressForIndex(target, cards.length) * travel;
        window.scrollTo({
          top: y,
          behavior: prefersReduced() ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          clearScrollLock();
          schedule();
        }, unlockMs);
      }

      cards.forEach((card, i) => {
        card.addEventListener("animationend", (e) => {
          if (
            e.animationName === "expTlCardPulse" &&
            card.classList.contains(TL_PULSE)
          ) {
            card.classList.remove(TL_PULSE);
          }
        });
        card.addEventListener("click", () => scrollToIndex(i));
        card.addEventListener("keydown", (e) => {
          if (e.key === "siArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            scrollToIndex(Math.min(cards.length - 1, i + 1));
            cards[Math.min(cards.length - 1, i + 1)].focus();
          } else if (e.key === "siAngleLeft" || e.key === "siArrowUp") {
            e.preventDefault();
            scrollToIndex(Math.max(0, i - 1));
            cards[Math.max(0, i - 1)].focus();
          } else if (e.key === "Home") {
            e.preventDefault();
            scrollToIndex(0);
            cards[0].focus();
          } else if (e.key === "End") {
            e.preventDefault();
            scrollToIndex(cards.length - 1);
            cards[cards.length - 1].focus();
          }
        });
      });

      t(".exp-role-toggle", section).forEach((btn) => {
        const desc = btn.previousElementSibling;
        if (!desc || !desc.classList.contains("exp-role-desc")) return;
        const label = btn.querySelector(".exp-role-toggle-label");
        desc.classList.add("is-collapsed");
        btn.classList.add("is-collapsed");
        btn.setAttribute("aria-expanded", "false");
        if (label) label.textContent = "Show more";
        btn.addEventListener("click", () => {
          const open = btn.getAttribute("aria-expanded") === "true";
          desc.classList.toggle("is-collapsed", open);
          btn.classList.toggle("is-collapsed", open);
          btn.setAttribute("aria-expanded", open ? "false" : "true");
          if (label) label.textContent = open ? "Show more" : "Show less";
        });
      });

      let gsapScrollDriver = null;
      if (
        window.__paExpHscrollUseGsap &&
        typeof window.__paMountExpHscrollGsap === "function"
      ) {
        gsapScrollDriver = window.__paMountExpHscrollGsap({
          section,
          root,
          intro,
          stage,
          cards,
          pinOffset,
          introHeight,
          scrollTravel,
          canPin,
          measure,
          setActive,
          moveIndicator,
          prefersReduced,
        });
      }

      if (!gsapScrollDriver) {
        window.addEventListener("scroll", schedule, { passive: true });
        section._expRemoveScroll = () =>
          window.removeEventListener("scroll", schedule);
      } else {
        section._expRemoveScroll = null;
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              inView = entry.isIntersecting;
              if (inView) schedule();
              else if (raf !== null) {
                window.cancelAnimationFrame(raf);
                raf = null;
              }
            });
          },
          { threshold: 0.01 },
        ).observe(root);
      }

      const onResize = d(() => {
        measure();
        moveIndicator(cards[active]);
        schedule();
      }, 150);

      const mq = window.matchMedia("(min-width: " + MOBILE_MAX + "px)");
      const onBreakpoint = () => {
        measure();
        moveIndicator(cards[active]);
        if (!canPin()) schedule();
      };
      if (mq.addEventListener) {
        mq.addEventListener("change", onBreakpoint);
      } else if (mq.addListener) {
        mq.addListener(onBreakpoint);
      }
      window.addEventListener("orientationchange", onBreakpoint, {
        passive: true,
      });

      if (track) {
        track.addEventListener(
          "scroll",
          d(() => moveIndicator(cards[active]), 50),
          { passive: true },
        );
      }

      try {
        const ro = new ResizeObserver(onResize);
        if (intro) ro.observe(intro);
        ro.observe(stage);
        ro.observe(root);
      } catch (e) {
        window.addEventListener("resize", onResize, { passive: true });
      }

      measure();
      setActive(0, true);
      section.dataset.expInit = "1";
      moveIndicator(cards[0]);
      schedule();
    }

    function teardown(section) {
      if (section.dataset[READY] !== "1") return;
      section.dataset[READY] = "0";
      section.dataset.expInit = "0";
      delete section.dataset.expGsapDriver;
      if (typeof window.__paTeardownExpHscrollGsap === "function") {
        window.__paTeardownExpHscrollGsap(section);
      }
      clearTimeout(section._expSwitchTimer);
      delete section.dataset.expScrollLock;
      if (typeof section._expRemoveScroll === "function") {
        section._expRemoveScroll();
        section._expRemoveScroll = null;
      }
      section.classList.remove(
        "js-exp-hscroll",
        "is-exp-pinned",
        "is-exp-switching",
      );
      const root = section.querySelector(".exp-hscroll-root");
      if (root) root.style.height = "";
    }

    function reconcile() {
      t(".exp-work--hscroll").forEach((section) => {
        const cards = t(".exp-tl-card", section);
        if (
          window.__paExpHscrollUseGsap &&
          section.dataset.expGsapDriver !== "1" &&
          section.dataset[READY] === "1"
        ) {
          teardown(section);
        }
        if (cards.length >= 1) setup(section);
        else teardown(section);
      });
    }

    function teardownAll() {
      t(".exp-work--hscroll").forEach((section) => teardown(section));
    }

    window.addEventListener(
      "resize",
      d(() => reconcile(), 150),
      { passive: true },
    );

    return {
      init: reconcile,
      teardown: (section) => {
        if (section) teardown(section);
        else teardownAll();
      },
    };
  })()));
