"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const RING_LEN = 263.9;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function itemIconHtml(item) {
    if (item.iconUrl && String(item.iconUrl).trim()) {
      const url = escapeHtml(item.iconUrl);
      return `<img src="${url}" alt="" loading="lazy" />`;
    }
    const si = item.portfolioIcon || "siCode";
    return `<span class="icon" data-icon="${escapeHtml(si)}"></span>`;
  }

  function splitTitle(el, text) {
    el.textContent = "";
    el.setAttribute("aria-label", text);
    text.split(" ").forEach((word, k, words) => {
      const mask = document.createElement("span");
      mask.className = "skills-explorer__w";
      mask.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.textContent = word;
      mask.append(inner);
      el.append(mask);
      if (k < words.length - 1) el.append(" ");
    });
  }

  function paintRing(arc, pct) {
    if (!arc) return;
    arc.style.strokeDasharray = String(RING_LEN);
    arc.style.strokeDashoffset = String(RING_LEN * (1 - pct / 100));
  }

  function mountExplorer(root, categories) {
    if (!root || !categories?.length) {
      root.innerHTML = `<p class="exp-cms-placeholder">No skills published yet.</p>`;
      return;
    }

    window.__paTeardownSkillsExplorerGsap?.(root);

    const loading = root.querySelector("[data-cms-skills-loading]");
    if (loading) loading.remove();

    const rail = root.querySelector("[data-skills-rail]");
    const panel = root.querySelector("[data-skills-panel]");
    const railwrap = root.querySelector("[data-skills-railwrap]");
    const title = root.querySelector("[data-skills-title]");
    const desc = root.querySelector("[data-skills-desc]");
    const arc = root.querySelector("[data-skills-arc]");
    const num = root.querySelector("[data-skills-num]");
    const ring = root.querySelector("[data-skills-ring]");
    const chips = root.querySelector("[data-skills-chips]");
    const count = root.querySelector("[data-skills-count]");
    const step = root.querySelector("[data-skills-step]");

    if (!rail || !panel || !title || !desc || !chips || !count || !step || !arc || !num || !ring) {
      console.error("[skills-explorer] missing shell nodes");
      return;
    }

    rail.innerHTML = "";
    const tabs = [];
    const N = categories.length;

    categories.forEach((cat, i) => {
      const pct = Math.min(100, Math.max(0, Number(cat.proficiencyPct) || 0));
      const btn = document.createElement("button");
      btn.className = "skills-explorer__tab";
      btn.type = "button";
      btn.role = "tab";
      btn.id = `skills-tab-${i}`;
      btn.dataset.pct = String(pct);
      btn.innerHTML = `<b>${escapeHtml(cat.label)}</b><small>${pct}%</small><span class="skills-explorer__tab-bar"><i style="width:${pct}%"></i></span>`;
      rail.appendChild(btn);
      tabs.push(btn);
    });

    function populateCategory(i) {
      const cat = categories[i];
      if (!cat) return;
      const pct = Math.min(100, Math.max(0, Number(cat.proficiencyPct) || 0));
      const items = Array.isArray(cat.items) ? cat.items : [];
      title.dataset.plainTitle = cat.label;
      desc.textContent =
        cat.description && String(cat.description).trim()
          ? cat.description
          : "Technologies and tools in this area";
      chips.innerHTML = items
        .map(
          (item) =>
            `<li class="skills-explorer__chip"><span class="skills-explorer__chip-icon" aria-hidden="true">${itemIconHtml(item)}</span><span class="skills-explorer__chip-label">${escapeHtml(item.name)}</span></li>`,
        )
        .join("");
      Portfolio.ICONS?.hydrateAll?.(chips);
      count.textContent = `${items.length} tool${items.length === 1 ? "" : "s"} in this area`;
      step.textContent = i < N - 1 ? `${i + 1} of ${N} · keep scrolling` : `${N} of ${N}`;
      paintRing(arc, pct);
      num.textContent = `${pct}%`;
      ring.setAttribute("aria-label", `${pct} percent proficiency`);
    }

    const pinEl = root.classList.contains("skills-explorer--pin") ? root : root;
    const prefersReduced = () =>
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const api = {
      root,
      pinEl,
      railwrap,
      tabs,
      panel,
      title,
      desc,
      arc,
      num,
      ring,
      chips,
      count,
      step,
      categoryCount: N,
      prefersReduced,
      show: populateCategory,
      paintRing: (pct) => paintRing(arc, pct),
      splitTitle,
    };

    if (typeof window.__paMountSkillsExplorerGsap === "function") {
      window.__paMountSkillsExplorerGsap(api);
      return;
    }

    let cur = -1;
    function show(i) {
      if (i === cur || i < 0 || i >= N) return;
      cur = i;
      populateCategory(i);
      splitTitle(title, title.dataset.plainTitle || "");
      tabs.forEach((t, j) => {
        t.setAttribute("aria-selected", j === i ? "true" : "false");
        t.tabIndex = j === i ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tabs[i].id);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => show(i));
      tab.addEventListener("keydown", (e) => {
        const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (k === undefined) return;
        e.preventDefault();
        const j = (i + k + N) % N;
        show(j);
        tabs[j].focus();
      });
    });
    show(0);
  }

  function teardown(root) {
    window.__paTeardownSkillsExplorerGsap?.(root);
  }

  Portfolio.SKILLS_EXPLORER = {
    mount: mountExplorer,
    teardown,
  };
})();
