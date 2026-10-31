"use strict";
((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.INTERACTIONS = (function () {
    const { $: e, $$: t, on: o } = window.Portfolio.UTILS,
      { ANIM: n } = window.Portfolio.CONSTANTS;
    function a(e, t, o) {
      if (!e) return;
      const n = t
        .trim()
        .split(" ")
        .map((e) => e.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);
      if (((e.innerHTML = ""), o && "" !== o.trim())) {
        const a = document.createElement("img");
        ((a.src = o),
          (a.alt = `${t}'s avatar`),
          (a.style.width = "100%"),
          (a.style.height = "100%"),
          (a.style.objectFit = "cover"),
          (a.style.borderRadius = "50%"),
          (a.onerror = function () {
            e.innerHTML = n;
          }),
          e.appendChild(a));
      } else e.textContent = n;
    }
    return {
      initCustomCursor: function () {
        const n = e(".cursor"),
          a = e(".cursor-ring");
        if (!n || !a || window.innerWidth <= 768) return;
        let r = 0,
          s = 0,
          i = 0,
          c = 0;
        (document.addEventListener("mousemove", (e) => {
          ((r = e.clientX),
            (s = e.clientY),
            (n.style.left = r + "px"),
            (n.style.top = s + "px"));
        }),
          (function e() {
            ((i += 0.12 * (r - i)),
              (c += 0.12 * (s - c)),
              (a.style.left = i + "px"),
              (a.style.top = c + "px"),
              requestAnimationFrame(e));
          })(),
          t(
            "a, button, .ph-card, .value-card, .skill-cat-box, .other-skill-card, .tool-item, .pg-card, .blog-card, .ci-card, .belief-card, .edu-card, .cert-item, .testi-card",
          ).forEach((e) => {
            (o(e, "mouseenter", () => {
              ((n.style.width = n.style.height = "14px"),
                (a.style.width = a.style.height = "48px"));
            }),
              o(e, "mouseleave", () => {
                ((n.style.width = n.style.height = ""),
                  (a.style.width = a.style.height = ""));
              }));
          }));
      },
      initNavbarScroll: function () {
        const o = e(".navbar"),
          n = t("section[id]"),
          a = t(".nav-link"),
          r = e(".back-top");
        let s = !1;
        function i() {
          if (
            (o && o.classList.toggle("scrolled", window.scrollY > 50),
            n.length && a.length)
          ) {
            let e = "";
            (n.forEach((t) => {
              window.scrollY >= t.offsetTop - 120 && (e = t.id);
            }),
              a.forEach((e) => {
                e.getAttribute("href");
              }));
          }
          (r && r.classList.toggle("show", window.scrollY > 500), (s = !1));
        }
        window.addEventListener(
          "scroll",
          () => {
            s || ((s = !0), requestAnimationFrame(i));
          },
          { passive: !0 },
        );
      },
      initBackToTop: function () {
        const t = e(".back-top");
        o(t, "click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      },
      initSmoothScroll: function () {
        t('a[href^="#"]').forEach((e) => {
          o(e, "click", (t) => {
            const o = e.getAttribute("href");
            if (!o || "#" === o || !/^#[A-Za-z][\w\-:.]*$/.test(o)) return;
            let n = null;
            try {
              n = document.querySelector(o);
            } catch (e) {
              return;
            }
            n &&
              (t.preventDefault(),
              n.scrollIntoView({ behavior: "smooth", block: "start" }));
          });
        });
      },
      initTiltEffects: function () {
        t(".ph-card, .pg-card").forEach((e) => {
          (o(e, "mousemove", (t) => {
            const o = e.getBoundingClientRect(),
              n = t.clientX - o.left - o.width / 2,
              a = ((t.clientY - o.top - o.height / 2) / o.height) * 6,
              r = (-n / o.width) * 6;
            e.style.transform = `perspective(800px) rotateX(${a}deg) rotateY(${r}deg) translateY(-6px)`;
          }),
            o(e, "mouseleave", () => {
              e.style.transform = "";
            }));
        });
      },
      initContactForm: function () {
        const t = document.getElementById("contactForm"),
          a = e(".form-success");
        t &&
          o(t, "submit", (e) => {
            e.preventDefault();
            const o = t.querySelector(".form-submit, .cf-submit"),
              r = o?.innerHTML;
            (o && ((o.innerHTML = "SENDING..."), (o.disabled = !0)),
              setTimeout(() => {
                (o && ((o.innerHTML = r), (o.disabled = !1)),
                  t.reset(),
                  a &&
                    (a.classList.add("show"),
                    setTimeout(
                      () => a.classList.remove("show"),
                      n.formSuccessDur,
                    )));
              }, n.formSubmitDelay));
          });
      },
      initIndexPage: function () {
        (window.addEventListener("load", () => {
          const t = e(".hero-sub");
          if (t) {
            const e =
              t.dataset.text ||
              "I craft fast, responsive and scalable web applications with modern technologies and clean code.";
            setTimeout(
              () => window.Portfolio.ANIMATIONS.typeWriter(t, e, 5),
              1500,
            );
          }
        }),
          window.Portfolio.ANIMATIONS.glitchEffect(),
          window.Portfolio.ANIMATIONS.initParallaxNumbers(),
          window.Portfolio.TEXTURES.createIndexParticles());
      },
      initProjectsPage: function () {
        window.Portfolio.UTILS.ensureSharedFilters();
        if (!window.Portfolio.PROJECTS_PAGE) {
          window.Portfolio.UTILS.loadScriptSync("./assets/js/features/projects-page.js");
        }
        if (window.Portfolio.PROJECTS_PAGE?.init) {
          return window.Portfolio.PROJECTS_PAGE.init();
        }
      },
      initAboutPage: function () {
        window.Portfolio.TEXTURES.createPageParticles(
          ".about-hero",
          "floatP",
          "@keyframes floatP{0%{transform:translate(0,0);opacity:.5;}100%{transform:translate(10px,-30px);opacity:0;}}",
          12,
        );
      },
      initTestimonialsPage: function () {
        const n = document.getElementById("prevBtn"),
          r = document.getElementById("nextBtn"),
          s = e(".testi-cards-grid");
        (n &&
          r &&
          s &&
          (o(n, "click", () => s.scrollBy({ left: -320, behavior: "smooth" })),
          o(r, "click", () => s.scrollBy({ left: 320, behavior: "smooth" }))),
          (function () {
            const n = e(".hero-testi");
            if (!n) return;
            const r = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches,
              s = document.getElementById("thOrbit"),
              i = e(".ht-testi-card", n);
            s &&
              i &&
              !r &&
              window.matchMedia("(min-width: 1025px)").matches &&
              (o(s, "mousemove", (e) => {
                const t = s.getBoundingClientRect(),
                  o = (e.clientX - t.left) / t.width - 0.5,
                  n = (e.clientY - t.top) / t.height - 0.5;
                i.style.transform = `translate(${8 * o}px, ${8 * n - 6}px)`;
              }),
              o(s, "mouseleave", () => {
                i.style.transform = "";
              }));
            t(".ht-orbit-node", n).forEach((e) => {
              const t = e.querySelector(".ht-node-avatar"),
                o = e.getAttribute("data-name") || "",
                n = e.getAttribute("data-avatar") || "";
              o && a(t, o, n);
            });
          })(),
          (function () {
            const cms = window.Portfolio.TESTIMONIALS_CMS;
            if (cms?.bootstrapTestimonialsPage) {
              cms.bootstrapTestimonialsPage();
              return;
            }
            window.Portfolio.UTILS.ensureSharedFilters();
            if (!window.Portfolio.TESTIMONIALS_PAGE) {
              window.Portfolio.UTILS.loadScriptSync(
                "./assets/js/features/testimonials-page.js",
              );
            }
            if (window.Portfolio.TESTIMONIALS_PAGE?.initReviews) {
              window.Portfolio.TESTIMONIALS_PAGE.initReviews();
            }
          })());
      },
      initSkillsPage: function () {
        (window.Portfolio.TEXTURES.createPageParticles(
          ".skills-hero",
          "fpDot",
          "@keyframes fpDot{0%{transform:translate(0,0);opacity:.5;}100%{transform:translate(12px,-35px);opacity:0;}}",
          14,
        ),
          window.Portfolio.TEXTURES.buildSkillsHeroMesh());
      },
      initContactPage: function () {
        const a = document.getElementById("contactForm"),
          r = e(".form-success");
        if (!a || a.dataset.contactInit === "1") return;
        a.dataset.contactInit = "1";
        const s = a.querySelector("#name"),
          i = a.querySelector("#email"),
          c = a.querySelector("#subject"),
          l = a.querySelector("#message"),
          d = a.querySelector("#consent"),
          u = a.querySelector('[data-field="name"]'),
          m = a.querySelector('[data-field="email"]'),
          h = a.querySelector('[data-field="subject"]'),
          f = a.querySelector('[data-field="message"]'),
          p = a.querySelector('[data-field="consent"]'),
          g = a.querySelector("#name-error"),
          v = a.querySelector("#email-error"),
          y = a.querySelector("#subject-error"),
          w = a.querySelector("#message-error"),
          b = a.querySelector("#consent-error"),
          E = t(".cf-pill", h || a),
          x = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        function S(e, t, o) {
          (e && e.classList.add("is-invalid"),
            t && ((t.textContent = o), t.classList.add("show")));
        }
        function I(e, t) {
          (e && e.classList.remove("is-invalid"),
            t && ((t.textContent = ""), t.classList.remove("show")));
        }
        function P(e, t) {
          e && e.classList.toggle("is-filled", !!t);
        }
        function C(e) {
          const t = (s?.value || "").trim();
          return (
            P(u, t.length > 0),
            t
              ? t.length < 2
                ? (e && S(u, g, "Name looks too short."), !1)
                : (I(u, g), !0)
              : (e && S(u, g, "Please enter your full name."), !1)
          );
        }
        function k(e) {
          const t = (i?.value || "").trim();
          return (
            P(m, t.length > 0),
            t
              ? x.test(t)
                ? (I(m, v), !0)
                : (e && S(m, v, "Please enter a valid email address."), !1)
              : (e && S(m, v, "Please enter your email address."), !1)
          );
        }
        function L(e) {
          const t = (c?.value || "").trim();
          return (
            P(h, t.length > 0),
            t
              ? (I(h, y), !0)
              : (e && S(h, y, "Please select what you're looking for."), !1)
          );
        }
        function A(e) {
          const t = (l?.value || "").trim();
          return (
            P(f, t.length > 0),
            t
              ? t.length < 10
                ? (e && S(f, w, "Message should be at least 10 characters."),
                  !1)
                : (I(f, w), !0)
              : (e && S(f, w, "Please enter a message."), !1)
          );
        }
        function T(e) {
          return !d?.checked
            ? (e && S(p, b, "Please agree to the Privacy Policy to continue."),
              !1)
            : (I(p, b), !0);
        }
        function showFormError(msg) {
          if (b) {
            S(p, b, msg || "Could not send your message. Please try again.");
            p && p.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
        (o(s, "input", () => C(u?.classList.contains("is-invalid"))),
          o(s, "blur", () => C(!0)),
          o(i, "input", () => k(m?.classList.contains("is-invalid"))),
          o(i, "blur", () => k(!0)),
          o(l, "input", () => A(f?.classList.contains("is-invalid"))),
          o(l, "blur", () => A(!0)),
          o(d, "change", () => T(!0)),
          E.forEach((e) => {
            o(e, "click", (o) => {
              o.preventDefault();
              const n = e.closest(".cf-pills") || h || a;
              (t(".cf-pill", n).forEach((e) => e.classList.remove("active")),
                e.classList.add("active"),
                c && (c.value = e.dataset.value || e.textContent.trim()),
                L(!0));
            });
          }),
          o(a, "submit", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (a.dataset.contactSubmitting === "1") return;
            if (![C(!0), k(!0), L(!0), A(!0), T(!0)].every(Boolean)) {
              const invalid = a.querySelector(".is-invalid");
              return void (
                invalid &&
                invalid.scrollIntoView({ behavior: "smooth", block: "center" })
              );
            }
            const submitBtn = a.querySelector(".cf-submit"),
              label = submitBtn?.querySelector("span:not(.icon)"),
              prevLabel = label?.textContent;
            a.dataset.contactSubmitting = "1";
            (label && (label.textContent = "Sending..."),
              submitBtn && (submitBtn.disabled = !0),
              I(p, b));
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: (s?.value || "").trim(),
                  email: (i?.value || "").trim(),
                  subject: (c?.value || "").trim(),
                  message: (l?.value || "").trim(),
                  consent: !!d?.checked,
                }),
              });
              const data = await res.json().catch(() => ({}));
              if (!res.ok) {
                showFormError(data.error || "Could not send your message.");
                return;
              }
              (a.reset(),
                E.forEach((pill) => pill.classList.remove("active")),
                [u, m, h, f].forEach((step) => {
                  step && step.classList.remove("is-filled", "is-invalid");
                }),
                p && p.classList.remove("is-invalid"),
                r &&
                  (r.classList.add("show"),
                  setTimeout(
                    () => r.classList.remove("show"),
                    n.formSuccessDur,
                  )));
            } catch (_) {
              showFormError("Network error. Please check your connection.");
            } finally {
              delete a.dataset.contactSubmitting;
              (label && (label.textContent = prevLabel || "Submit"),
                submitBtn && (submitBtn.disabled = !1));
            }
          }));
      },
      initContactHero: function () {
        if (!document.querySelector(".ch-hero")) return;
        const e = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          t = document.getElementById("particleLayer");
        if (t && !t.dataset.chInit) {
          t.dataset.chInit = "1";
          const e = window.innerWidth < 640 ? 18 : 34,
            o = document.createDocumentFragment();
          for (let t = 0; t < e; t++) {
            const e = document.createElement("span"),
              t = (2 * Math.random() + 1).toFixed(1),
              n = Math.random() > 0.55;
            ((e.style.width = `${t}px`),
              (e.style.height = `${t}px`),
              (e.style.top = 100 * Math.random() + "%"),
              (e.style.left = 100 * Math.random() + "%"),
              e.style.setProperty(
                "--ch-dot-color",
                n ? "var(--accent-orange)" : "var(--white)",
              ),
              e.style.setProperty(
                "--tw-op",
                (0.4 * Math.random() + 0.25).toFixed(2),
              ),
              e.style.setProperty(
                "--tw-dur",
                `${(3 * Math.random() + 3).toFixed(1)}s`,
              ),
              e.style.setProperty(
                "--tw-delay",
                `${(4 * Math.random()).toFixed(1)}s`,
              ),
              o.appendChild(e));
          }
          t.appendChild(o);
        }
        const o = document.getElementById("chGlobeStage");
        if (!o || o.dataset.chInit) return;
        o.dataset.chInit = "1";
        const n = document.createElement("canvas");
        ((n.id = "globeCanvas"),
          (n.className = "ch-globe-canvas"),
          (n.width = 620),
          (n.height = 620),
          o.insertBefore(n, o.firstChild));
        const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        (a.setAttribute("class", "ch-connections"),
          a.setAttribute("viewBox", "0 0 620 620"),
          a.setAttribute("fill", "none"),
          [
            "M310,310 C260,260 200,240 160,180",
            "M310,310 C220,320 160,300 110,340",
            "M310,310 C260,380 220,420 200,470",
            "M310,310 C370,340 400,380 420,440",
            "M310,310 C380,280 440,260 470,220",
            "M310,310 C400,270 460,200 500,150",
          ].forEach((e) => {
            const t = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            (t.setAttribute("class", "ch-conn-path"),
              t.setAttribute("d", e),
              a.appendChild(t));
          }),
          n.insertAdjacentElement("afterend", a));
        const r = document.createElement("div");
        if (
          ((r.className = "ch-node ch-node-center"),
          (r.innerHTML =
            '<span class="ch-node-ring"></span><span class="ch-node-dot"></span>'),
          a.insertAdjacentElement("afterend", r),
          [
            { top: "29%", left: "26%" },
            { top: "55%", left: "17%" },
            { top: "76%", left: "32%" },
            { top: "71%", left: "68%" },
            { top: "55%", left: "80%" },
            { top: "24%", left: "76%", bright: !0 },
          ].forEach((e) => {
            const t = document.createElement("span");
            ((t.className =
              "ch-node ch-node-sm" + (e.bright ? " ch-node-bright" : "")),
              (t.style.top = e.top),
              (t.style.left = e.left),
              o.insertBefore(t, o.querySelector(".ch-float")));
          }),
          !n.getContext)
        )
          return;
        const s = n.getContext("2d"),
          i = Math.min(window.devicePixelRatio || 1, 2);
        let c = n.clientWidth || 620,
          l = c / 2 - 6,
          d = 0,
          u = [];
        const m = () => {
            ((c = n.clientWidth || 620),
              (l = c / 2 - 6),
              (n.width = c * i),
              (n.height = c * i),
              s.setTransform(i, 0, 0, i, 0, 0));
          },
          h = (e, t, o) => {
            const n = Math.cos(e);
            return {
              x: n * Math.cos(t + o),
              y: Math.sin(e),
              z: n * Math.sin(t + o),
            };
          },
          f = () => {
            s.clearRect(0, 0, c, c);
            const e = c / 2,
              t = c / 2,
              o = s.createRadialGradient(
                e - 0.3 * l,
                t - 0.3 * l,
                0.1 * l,
                e,
                t,
                l,
              );
            (o.addColorStop(0, "rgba(255,255,255,0.05)"),
              o.addColorStop(1, "rgba(255,255,255,0)"),
              (s.fillStyle = o),
              s.beginPath(),
              s.arc(e, t, l, 0, 2 * Math.PI),
              s.fill());
            for (const o of u) {
              const n = h(o.lat, o.lon, d);
              if (n.z < -0.05) continue;
              const a = e + n.x * l,
                r = t - n.y * l,
                i = (n.z + 1) / 2,
                c = 0.35 + 0.55 * i,
                u = 0.9 + 1.3 * i;
              (s.beginPath(),
                s.arc(a, r, u, 0, 2 * Math.PI),
                (s.fillStyle = `rgba(220,225,235,${c.toFixed(3)})`),
                s.fill());
            }
            (s.beginPath(),
              s.arc(e, t, l, 0, 2 * Math.PI),
              (s.strokeStyle = "rgba(255,122,26,0.12)"),
              (s.lineWidth = 1),
              s.stroke());
          };
        let p = null;
        const g = () => {
          ((d += 0.0016), f(), (p = requestAnimationFrame(g)));
        };
        (m(),
          (() => {
            u = [];
            for (let e = 0; e <= 44; e++) {
              const t = (Math.PI * e) / 44 - Math.PI / 2;
              for (let e = 0; e < 64; e++) {
                const o = (2 * Math.PI * e) / 64;
                Math.sin(5.2 * t) * Math.cos(4.1 * o) +
                  0.6 * Math.sin(2.3 * o + 2 * t) >
                  -0.15 && u.push({ lat: t, lon: o });
              }
            }
          })(),
          f(),
          e || (p = requestAnimationFrame(g)));
        let v = null;
        (window.addEventListener("resize", () => {
          (clearTimeout(v),
            (v = setTimeout(() => {
              (m(), f());
            }, 150)));
        }),
          document.addEventListener("visibilitychange", () => {
            document.hidden && p
              ? (cancelAnimationFrame(p), (p = null))
              : document.hidden || e || p || (p = requestAnimationFrame(g));
          }));
      },
      initExperiencePage: function () {
        (window.Portfolio.TEXTURES.initExperienceCanvas(),
          window.Portfolio.TEXTURES.initExperienceHeroSymbols());
      },
      initFooterNewsletter: function () {
        const form = document.getElementById("footerNewsletterForm");
        if (!form || form.dataset.newsletterInit === "1") return;
        form.dataset.newsletterInit = "1";
        const emailInput = form.querySelector("#footerNewsletterEmail");
        const feedback = form.querySelector("#footerNewsletterFeedback");
        const hp = form.querySelector('input[name="website"]');
        const submitBtn = form.querySelector(".footer-newsletter-btn");
        const submitBtnLabel = submitBtn?.querySelector("[data-newsletter-submit-label]");
        const emailRe = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        function setSubmitLabel(label) {
          if (submitBtnLabel) {
            submitBtnLabel.textContent = label;
          } else if (submitBtn) {
            submitBtn.textContent = label;
          }
        }
        function setFeedback(message, kind) {
          if (!feedback) return;
          feedback.textContent = message;
          feedback.hidden = !message;
          feedback.classList.remove("is-success", "is-error");
          if (kind) feedback.classList.add(kind);
        }
        o(form, "submit", async (ev) => {
          ev.preventDefault();
          if (form.dataset.newsletterSubmitting === "1") return;
          const email = (emailInput?.value || "").trim();
          if (!emailRe.test(email)) {
            setFeedback("Please enter a valid email address.", "is-error");
            emailInput?.focus();
            return;
          }
          form.dataset.newsletterSubmitting = "1";
          setFeedback("", "");
          submitBtn && (submitBtn.disabled = true);
          const prevLabel = submitBtnLabel?.textContent || submitBtn?.textContent;
          setSubmitLabel("Subscribing…");
          try {
            const res = await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                website: hp?.value || "",
              }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
              setFeedback(
                data.error || "Could not subscribe. Please try again.",
                "is-error",
              );
              return;
            }
            form.reset();
            setFeedback(
              data.message ||
                "You're subscribed. Watch your inbox for the next update.",
              "is-success",
            );
          } catch (_) {
            setFeedback("Network error. Please check your connection.", "is-error");
          } finally {
            delete form.dataset.newsletterSubmitting;
            submitBtn && (submitBtn.disabled = false);
            setSubmitLabel(prevLabel || "Subscribe");
          }
        });
      },
    };
  })()));
