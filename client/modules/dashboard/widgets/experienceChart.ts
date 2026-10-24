// @ts-nocheck
import { $id, escapeHtml } from '../../../utils/dom.js';
import { assignSegmentColors, renderDonutChart } from '../../../utils/dashboardCharts.js';
import { EXP_TYPE_META } from '../../experience/ExperienceModule.js';

const MONTH_MS = 30.4375 * 24 * 60 * 60 * 1000;

const TYPE_BAR_CLASS = {
  'full-time': 'is-fulltime',
  'part-time': 'is-parttime',
  contract: 'is-contract',
  freelance: 'is-freelance',
  internship: 'is-internship',
};

function parseYmStart(ym) {
  if (!ym || typeof ym !== 'string') return null;
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1);
}

function parseYmEnd(ym) {
  if (!ym || typeof ym !== 'string') return null;
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return null;
  return new Date(y, m, 0, 23, 59, 59, 999);
}

function entryRange(entry) {
  const start = parseYmStart(entry.startDate);
  if (!start) return null;
  const end = entry.current ? new Date() : parseYmEnd(entry.endDate) || start;
  if (end.getTime() < start.getTime()) return { start, end: start };
  return { start, end };
}

function mergeRanges(ranges) {
  const sorted = [...ranges].sort((a, b) => a.start.getTime() - b.start.getTime());
  const merged = [];
  for (const r of sorted) {
    if (!merged.length || r.start.getTime() > merged[merged.length - 1].end.getTime()) {
      merged.push({ start: new Date(r.start), end: new Date(r.end) });
    } else {
      merged[merged.length - 1].end = new Date(
        Math.max(merged[merged.length - 1].end.getTime(), r.end.getTime()),
      );
    }
  }
  return merged;
}

function monthsBetween(start, end) {
  return Math.max(0, (end.getTime() - start.getTime()) / MONTH_MS);
}

/** @returns {string} e.g. "4y 8m" */
function formatMonthsShort(totalMonths) {
  const months = Math.round(totalMonths);
  if (months < 1) return '< 1m';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m}m`;
  if (!m) return `${y}y`;
  return `${y}y ${m}m`;
}

function formatYmLabel(d) {
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function formatRangeLabel(start, end, current) {
  const a = formatYmLabel(start);
  const b = current ? 'Present' : formatYmLabel(end);
  return `${a} → ${b}`;
}

function countByType(entries) {
  const map = new Map();
  entries.forEach((e) => {
    const key = EXP_TYPE_META[e.type]?.label || e.type || 'Other';
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].map(([label, n]) => `${n} ${label.toLowerCase()}`).join(' · ');
}

export function computeExperienceSummary(entries) {
  const list = Array.isArray(entries) ? entries.filter((e) => e?.startDate) : [];
  const ranges = list.map(entryRange).filter(Boolean);
  const merged = mergeRanges(ranges);
  const totalMonths = merged.reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);
  const companies = [...new Set(list.map((e) => String(e.company || '').trim()).filter(Boolean))];
  const current = list.find((e) => e.current) || null;
  const earliest = merged.length
    ? merged.reduce((min, r) => (r.start < min ? r.start : min), merged[0].start)
    : null;
  const latestEnd = merged.length
    ? merged.reduce((max, r) => (r.end > max ? r.end : max), merged[0].end)
    : null;

  return {
    list,
    totalMonths,
    totalLabel: formatMonthsShort(totalMonths),
    rangeLabel: earliest && latestEnd ? formatRangeLabel(earliest, latestEnd, !!current) : '—',
    roleCount: list.length,
    typeSummary: countByType(list) || '—',
    companyCount: companies.length,
    companySummary: companies.slice(0, 3).join(' · ') || '—',
    current,
    currentTitle: current?.title || '—',
    currentSince: current
      ? formatRangeLabel(entryRange(current).start, entryRange(current).end, true)
      : '',
    currentDuration: current
      ? formatMonthsShort(monthsBetween(entryRange(current).start, entryRange(current).end))
      : '',
    rows: list
      .map((e) => ({ entry: e, range: entryRange(e) }))
      .filter((x) => x.range)
      .sort((a, b) => a.range.start.getTime() - b.range.start.getTime()),
  };
}

function durationSegments(entries, mode) {
  const map = new Map();
  for (const e of entries) {
    const r = entryRange(e);
    if (!r) continue;
    const months = monthsBetween(r.start, r.end);
    const key =
      mode === 'type'
        ? EXP_TYPE_META[e.type]?.label || e.type || 'Other'
        : String(e.company || 'Unknown').trim() || 'Unknown';
    map.set(key, (map.get(key) || 0) + months);
  }
  return [...map.entries()]
    .map(([label, value]) => ({ label, value: Math.round(value) }))
    .filter((s) => s.value > 0)
    .sort((a, b) => b.value - a.value);
}

function yearTicks(minMs, maxMs) {
  const startYear = new Date(minMs).getFullYear();
  const endYear = new Date(maxMs).getFullYear();
  const years = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);
  if (years.length < 2) years.push(endYear + 1);
  return years;
}

function renderStatCards(summary) {
  return `
    <article class="pa-exp-overview-stat pa-exp-overview-stat--green">
      <div class="pa-exp-overview-stat-icon" aria-hidden="true"><i class="ri-briefcase-line"></i></div>
      <div>
        <div class="pa-exp-overview-stat-label">Total Experience</div>
        <div class="pa-exp-overview-stat-value">${escapeHtml(summary.totalLabel)}</div>
        <div class="pa-exp-overview-stat-hint">${escapeHtml(summary.rangeLabel)}</div>
      </div>
    </article>
    <article class="pa-exp-overview-stat pa-exp-overview-stat--blue">
      <div class="pa-exp-overview-stat-icon" aria-hidden="true"><i class="ri-bar-chart-grouped-line"></i></div>
      <div>
        <div class="pa-exp-overview-stat-label">Roles Held</div>
        <div class="pa-exp-overview-stat-value">${summary.roleCount}</div>
        <div class="pa-exp-overview-stat-hint">${escapeHtml(summary.typeSummary)}</div>
      </div>
    </article>
    <article class="pa-exp-overview-stat pa-exp-overview-stat--teal">
      <div class="pa-exp-overview-stat-icon" aria-hidden="true"><i class="ri-building-line"></i></div>
      <div>
        <div class="pa-exp-overview-stat-label">Companies</div>
        <div class="pa-exp-overview-stat-value">${summary.companyCount}</div>
        <div class="pa-exp-overview-stat-hint">${escapeHtml(summary.companySummary)}</div>
      </div>
    </article>
    <article class="pa-exp-overview-stat pa-exp-overview-stat--purple">
      <div class="pa-exp-overview-stat-icon" aria-hidden="true"><i class="ri-time-line"></i></div>
      <div>
        <div class="pa-exp-overview-stat-label">Current Role</div>
        <div class="pa-exp-overview-stat-value pa-exp-overview-stat-value--sm">${escapeHtml(summary.currentTitle)}</div>
        <div class="pa-exp-overview-stat-hint">${escapeHtml(summary.current ? `Since ${formatYmLabel(entryRange(summary.current).start)} · ${summary.currentDuration}` : '—')}</div>
      </div>
    </article>`;
}

function renderTypeLegend() {
  return `
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-fulltime"></span>Full-time</span>
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-current"></span>Current</span>
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-internship"></span>Internship</span>`;
}

function renderTimeline(summary, timelineMode) {
  const rows = summary.rows;
  if (!rows.length) return '<p class="pa-text-mute fs-sm">No dated roles to display.</p>';

  let min = Infinity;
  let max = -Infinity;
  rows.forEach(({ range }) => {
    min = Math.min(min, range.start.getTime());
    max = Math.max(max, range.end.getTime());
  });
  const now = Date.now();
  max = Math.max(max, now);
  const span = Math.max(max - min, 1);
  const years = yearTicks(min, max);
  const yearCols = years.length;
  const todayPct = Math.min(100, Math.max(0, ((now - min) / span) * 100));

  const yearHeader = years
    .map((y) => `<span>${y}</span>`)
    .join('');

  const rowHtml = rows
    .map(({ entry, range }) => {
      const left = ((range.start.getTime() - min) / span) * 100;
      const width = Math.max(1.2, ((range.end.getTime() - range.start.getTime()) / span) * 100);
      const dur = formatMonthsShort(monthsBetween(range.start, range.end));
      const typeCls = TYPE_BAR_CLASS[entry.type] || 'is-fulltime';
      const currentCls = entry.current ? ' is-current' : '';
      const barLabel = width > 8 ? escapeHtml(dur) : '';
      const companyLine = entry.current
        ? `${escapeHtml(entry.company || '')} · <span class="pa-exp-overview-current-tag">CURRENT</span>`
        : escapeHtml(entry.company || '');
      const tip = `${entry.title} @ ${entry.company}\n${formatYmLabel(range.start)} – ${entry.current ? 'Present' : formatYmLabel(range.end)}\n${dur} · ${EXP_TYPE_META[entry.type]?.label || entry.type || ''}`;
      return `<div class="pa-exp-overview-row">
        <div class="pa-exp-overview-row-label">
          <div class="pa-exp-overview-row-title">${escapeHtml(entry.title || 'Role')}</div>
          <div class="pa-exp-overview-row-company">${companyLine}</div>
        </div>
        <div class="pa-exp-overview-row-track" style="--exp-year-cols:${yearCols}">
          <div class="pa-exp-overview-bar ${typeCls}${currentCls}" style="left:${left}%;width:${width}%;" title="${escapeHtml(tip)}">${barLabel}</div>
        </div>
      </div>`;
    })
    .join('');

  const modeClass = timelineMode === 'year' ? ' is-by-year' : '';

  return `<div class="pa-exp-overview-timeline-inner${modeClass}">
    <div class="pa-exp-overview-years">
      <div class="pa-exp-overview-years-spacer" aria-hidden="true"></div>
      <div class="pa-exp-overview-years-grid" style="--exp-year-cols:${yearCols}">${yearHeader}</div>
    </div>
    <div class="pa-exp-overview-today" style="--exp-today-pct:${todayPct}%">
      <span class="pa-exp-overview-today-line" aria-hidden="true"></span>
      <span class="pa-exp-overview-today-label">TODAY</span>
    </div>
    ${rowHtml}
  </div>`;
}

function resolveColor(c) {
  if (!c || typeof c !== 'string') return c;
  if (!c.startsWith('var(')) return c;
  const m = c.match(/var\((--[\w-]+)\)/);
  if (!m) return c;
  return getComputedStyle(document.body).getPropertyValue(m[1]).trim() || c;
}

function renderDonutLegendRows(segments, totalMonths) {
  const total = totalMonths || segments.reduce((n, s) => n + (Number(s.value) || 0), 0) || 1;
  return segments
    .map((seg) => {
      const pct = Math.round((seg.value / total) * 100);
      return `<div class="pa-exp-overview-donut-row">
        <span class="pa-exp-overview-donut-dot" style="background:${resolveColor(seg.color)}"></span>
        <span class="pa-exp-overview-donut-name">${escapeHtml(seg.label)}</span>
        <span class="pa-exp-overview-donut-dur">${formatMonthsShort(seg.value)}</span>
        <span class="pa-exp-overview-donut-pct">${pct}%</span>
      </div>`;
    })
    .join('');
}

export function mountExperienceWidget(opts = {}) {
  const root = $id('paDashExpWidget');
  const gantt = $id('paDashExpGantt');
  const mini = $id('paDashExpMiniStats');
  const panels = $id('paDashExpPanels');
  const typeLegend = $id('paDashExpTypeLegend');
  const empty = $id('paDashExpEmpty');
  const skeleton = $id('paDashExpSkeleton');
  const donutMount = $id('paDashExpDonutMount');
  const donutLegend = $id('paDashExpDonutLegend');
  const donutTotal = $id('paDashExpDonutTotal');
  const donutLabel = $id('paDashExpDonutLabel');

  let donutMode = 'company';
  let timelineMode = 'timeline';
  let entries = [];

  root?.querySelectorAll('[data-exp-donut-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-exp-donut-mode');
      if (!mode || mode === donutMode) return;
      donutMode = mode;
      root.querySelectorAll('[data-exp-donut-mode]').forEach((el) => {
        const on = el.getAttribute('data-exp-donut-mode') === mode;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (donutLabel) {
        donutLabel.textContent = mode === 'type' ? 'Time by Type' : 'Time by Company';
      }
      renderDonut();
    });
  });

  root?.querySelectorAll('[data-exp-timeline-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-exp-timeline-mode');
      if (!mode || mode === timelineMode) return;
      timelineMode = mode;
      root.querySelectorAll('[data-exp-timeline-mode]').forEach((el) => {
        const on = el.getAttribute('data-exp-timeline-mode') === mode;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      const summary = computeExperienceSummary(entries);
      if (gantt) gantt.innerHTML = renderTimeline(summary, timelineMode);
    });
  });

  function renderDonut() {
    if (!donutMount || !donutLegend) return;
    const summary = computeExperienceSummary(entries);
    const raw = durationSegments(entries, donutMode);
    const segments = assignSegmentColors(raw.map((s) => ({ ...s })));
    const totalMonths = segments.reduce((n, s) => n + (Number(s.value) || 0), 0);
    if (donutTotal) donutTotal.textContent = formatMonthsShort(summary.totalMonths || totalMonths);
    renderDonutChart(donutMount, segments);
    donutLegend.innerHTML = renderDonutLegendRows(segments, totalMonths);
  }

  function refresh(list) {
    entries = Array.isArray(list) ? list : [];
    skeleton?.setAttribute('hidden', '');
    const has = entries.length > 0;
    empty?.toggleAttribute('hidden', has);
    panels?.toggleAttribute('hidden', !has);
    mini?.toggleAttribute('hidden', !has);
    root?.querySelector('.pa-exp-overview-head')?.toggleAttribute('hidden', !has);

    if (!has) {
      if (mini) mini.innerHTML = '';
      if (gantt) gantt.innerHTML = '';
      if (typeLegend) typeLegend.innerHTML = '';
      renderDonut();
      return;
    }

    const summary = computeExperienceSummary(entries);
    if (mini) mini.innerHTML = renderStatCards(summary);
    if (gantt) gantt.innerHTML = renderTimeline(summary, timelineMode);
    if (typeLegend) typeLegend.innerHTML = renderTypeLegend();
    renderDonut();
  }

  skeleton?.removeAttribute('hidden');

  return {
    refresh,
    destroy() {
      if (donutMount) renderDonutChart(donutMount, []);
    },
  };
}
