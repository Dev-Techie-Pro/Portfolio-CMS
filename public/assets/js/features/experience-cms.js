"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatYm(ym) {
    if (!ym || typeof ym !== "string") return "";
    const parts = ym.split("-");
    if (parts.length < 2) return ym;
    const month = parseInt(parts[1], 10);
    if (!month || month < 1 || month > 12) return ym;
    return `${MONTHS[month - 1]} ${parts[0]}`;
  }

  function formatDateRange(entry) {
    const start = formatYm(entry.startDate);
    if (!start) return "";
    if (entry.current) return `${start} – Present`;
    if (entry.endDate) return `${start} – ${formatYm(entry.endDate)}`;
    return start;
  }

  function employmentLabel(type) {
    const map = {
      "full-time": "Full Time",
      "part-time": "Part Time",
      contract: "Contract",
      freelance: "Freelance",
      internship: "Internship",
    };
    return map[type] || type || "—";
  }

  function modeLabel(mode) {
    const map = {
      "on-site": "On-site",
      remote: "Remote",
      hybrid: "Hybrid",
    };
    return map[mode] || mode || "";
  }

  function roleBadge(entry) {
    if (entry.current) return { text: "Current Role", className: "exp-role-badge" };
    if (entry.type === "internship") {
      return { text: "Internship", className: "exp-role-badge is-past" };
    }
    return { text: "Previous Role", className: "exp-role-badge is-past" };
  }

  function factRow(icon, label, value) {
    if (!value) return "";
    return `<li><span class="exp-role-fact-icon"><span class="icon" data-icon="${icon}"></span></span><span><small>${escapeHtml(label)}</small>${escapeHtml(value)}</span></li>`;
  }

  function renderTechChip(tech) {
    const slug = String(tech.name || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const extraClass = slug.includes("express") ? " express-js" : "";
    return `<span class="exp-tech-chip${extraClass}" title="${escapeHtml(tech.name)}"><span class="icon" data-icon="${escapeHtml(tech.icon || "ri-code-line")}"></span></span>`;
  }

  function renderTimelineCard(entry, index, active) {
    const num = String(index + 1).padStart(2, "0");
    const loc = entry.location
      ? `<p class="exp-tl-meta"><span class="icon" data-icon="ri-map-pin-line"></span> ${escapeHtml(entry.location)}</p>`
      : "";
    return `
      <button class="exp-tl-card${active ? " is-exp-active" : ""}" type="button" role="tab" id="exp-tab-${index}" aria-selected="${active ? "true" : "false"}" aria-controls="exp-panel-${index}" data-exp-index="${index}"${active ? "" : ' tabindex="-1"'}>
        <span class="exp-tl-num" aria-hidden="true">${num}</span>
        <div class="exp-tl-content">
          <h3 class="exp-tl-role">${escapeHtml(entry.title)}</h3>
          <p class="exp-tl-company">${escapeHtml(entry.company)}</p>
          ${loc}
          <p class="exp-tl-meta"><span class="icon" data-icon="ri-calendar-line"></span> ${escapeHtml(formatDateRange(entry))}</p>
        </div>
      </button>`;
  }

  function renderAchievements(achievements) {
    if (!achievements.length) return "";
    const items = achievements.map((a) => `<li>${escapeHtml(a)}</li>`).join("");
    return `
      <div class="exp-role-achievements-list">
        <h4 class="exp-role-kicker">Key Achievements</h4>
        <ul>${items}</ul>
      </div>`;
  }

  function renderImpacts(impacts) {
    if (!impacts.length) return "";
    const items = impacts
      .map(
        (row) =>
          `<li><strong>${escapeHtml(row.value)}</strong><span>${escapeHtml(row.label)}</span></li>`,
      )
      .join("");
    return `
      <div class="exp-role-impact">
        <h4 class="exp-role-kicker">Role Impact</h4>
        <ul>${items}</ul>
      </div>`;
  }

  function renderPanel(entry, index, active) {
    const badge = roleBadge(entry);
    const desc = entry.description
      ? `<p class="exp-role-desc">${escapeHtml(entry.description)}</p>`
      : "";
    const loc = entry.location
      ? `<p class="exp-role-company-loc"><span class="icon" data-icon="ri-map-pin-line"></span> ${escapeHtml(entry.location)}</p>`
      : "";
    const facts = [
      factRow("siBriefcase", "Type", employmentLabel(entry.type)),
      factRow("siHome", "Mode", modeLabel(entry.mode)),
      factRow("siUsers", "Team Size", entry.teamSize),
      factRow("siGlobe", "Domain", entry.domain),
    ]
      .filter(Boolean)
      .join("");
    const achievements = renderAchievements(entry.achievements || []);
    const impacts = renderImpacts(entry.impacts || []);
    const achievementsBlock =
      achievements || impacts
        ? `<div class="exp-role-achievements">${achievements}${impacts}</div>`
        : "";
    const seenTech = new Set();
    const techs = (entry.technologies || [])
      .filter((tech) => {
        const norm = String(tech.name || "").trim().toLowerCase();
        if (!norm || seenTech.has(norm)) return false;
        seenTech.add(norm);
        return true;
      })
      .map(renderTechChip)
      .join("");
    const techBlock = techs
      ? `<div class="exp-role-tech">
                <h4 class="exp-role-kicker">Technologies</h4>
                <div class="exp-role-tech-grid">${techs}</div>
              </div>`
      : "";

    return `
      <article class="exp-role${active ? " is-exp-active" : ""}" id="exp-panel-${index}" role="tabpanel" aria-labelledby="exp-tab-${index}" data-exp-index="${index}"${active ? "" : ' aria-hidden="true"'} data-cms-legacy-id="${escapeHtml(entry.id)}" data-cms-table="experience_entries">
        <aside class="exp-role-company">
          <h3 class="exp-role-company-name">${escapeHtml(entry.company)}</h3>
          ${loc}
          <ul class="exp-role-facts">${facts}</ul>
        </aside>
        <div class="exp-role-main">
          <div class="exp-role-head">
            <span class="${badge.className}">${escapeHtml(badge.text)}</span>
            <p class="exp-role-dates">${escapeHtml(formatDateRange(entry))}</p>
            <h3 class="exp-role-title">${escapeHtml(entry.title)}</h3>
          </div>
          ${desc}
          ${achievementsBlock}
        </div>
        <aside class="exp-role-aside">
          ${techBlock}
          <a href="/projects" class="exp-role-cases">View Case Studies <span class="icon" data-icon="ri-arrow-right-line"></span></a>
        </aside>
      </article>`;
  }

  function hydrateSectionIcons(section) {
    const icons = Portfolio.ICONS;
    if (!icons) return Promise.resolve();
    if (typeof icons.init === "function") {
      return icons.init(section).catch(() => {
        icons.hydrateAll?.(section);
      });
    }
    icons.hydrateAll?.(section);
    return Promise.resolve();
  }

  function reinitScroll(section) {
    const run = () => {
      Portfolio.EXP_CARDS?.teardown?.(section);
      Portfolio.EXP_CARDS?.init?.();
      void hydrateSectionIcons(section);
      if (Portfolio.ANIMATIONS?.initScrollReveal) {
        Portfolio.ANIMATIONS.initScrollReveal();
      }
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(run));
  }

  function renderSection(section, entries) {
    const track = section.querySelector("[data-cms-exp-track]");
    const stage = section.querySelector("[data-cms-exp-stage]");
    if (!track || !stage) return;

    Portfolio.EXP_CARDS?.teardown?.(section);

    if (!entries.length) {
      track.innerHTML =
        '<p class="exp-cms-empty">No experience entries published yet.</p>';
      stage.innerHTML = "";
      Portfolio.EXP_CARDS?.teardown?.(section);
      return;
    }

    track.innerHTML = entries
      .map((entry, index) => renderTimelineCard(entry, index, index === 0))
      .join("");
    stage.innerHTML = entries
      .map((entry, index) => renderPanel(entry, index, index === 0))
      .join("");

    reinitScroll(section);
  }

  function hydrateAll() {
    const sections = document.querySelectorAll("[data-cms-experience]");
    if (!sections.length) return Promise.resolve();

    return Portfolio.ensureExperience()
      .then((entries) => {
        sections.forEach((section) => renderSection(section, entries));
      })
      .catch(() => {
        sections.forEach((section) => {
          const track = section.querySelector("[data-cms-exp-track]");
          if (track) {
            track.innerHTML =
              '<p class="exp-cms-error">Could not load experience. Please try again later.</p>';
          }
        });
      });
  }

  Portfolio.EXPERIENCE_CMS = { hydrateAll, renderSection };
})();
