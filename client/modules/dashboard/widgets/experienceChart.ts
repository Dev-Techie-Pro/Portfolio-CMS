// @ts-nocheck
import { $id, escapeHtml } from '../../../utils/dom.js';
import { assignSegmentColors, renderDonutChart } from '../../../utils/dashboardCharts.js';
import { EXP_TYPE_META } from '../../experience/ExperienceModule.js';

const MONTH_MS = 30.4375 * 24 * 60 * 60 * 1000;

/**
 * @param {string} ym
 * @returns {Date | null}
 */
function parseYmStart(ym) {
  if (!ym || typeof ym !== 'string') return null;
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1);
}

/**
 * @param {string} ym
 * @returns {Date | null}
 */
function parseYmEnd(ym) {
  if (!ym || typeof ym !== 'string') return null;
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return null;
  return new Date(y, m, 0, 23, 59, 59, 999);
}

/**
 * @param {Record<string, unknown>} entry
 */
function entryRange(entry) {
  const start = parseYmStart(entry.startDate);
  if (!start) return null;
  const end = entry.current
    ? new Date()
    : parseYmEnd(entry.endDate) || start;
  if (end.getTime() < start.getTime()) return { start, end: start };
  return { start, end };
}

/**
 * Merge overlapping date ranges for total career span.
 * @param {{ start: Date, end: Date }[]} ranges
 */
function mergeRanges(ranges) {
  const sorted = [...ranges].sort((a, b) => a.start.getTime() - b.start.getTime());
  const merged = [];
  for (const r of sorted) {
    if (!merged.length || r.start.getTime() > merged[merged.length - 1].end.getTime()) {
      merged.push({ start: r.start, end: r.end });
    } else {
      merged[merged.length - 1].end = new Date(
        Math.max(merged[merged.length - 1].end.getTime(), r.end.getTime()),
      );
    }
  }
  return merged;
}

/**
 * @param {{ start: Date, end: Date }[]} merged
 */
function totalYearsFromMerged(merged) {
  const ms = merged.reduce((sum, r) => sum + (r.end.getTime() - r.start.getTime()), 0);
  return ms / (365.25 * 24 * 60 * 60 * 1000);
}

function monthsBetween(start, end) {
  return Math.max(0, (end.getTime() - start.getTime()) / MONTH_MS);
}

function formatDurationTooltip(start, end) {
  const months = Math.round(monthsBetween(start, end));
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y}y ${m}mo` : `${y}y`;
}

function formatYmLabel(d) {
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

/**
 * @param {Record<string, unknown>[]} entries
 */
export function computeExperienceSummary(entries) {
  const list = Array.isArray(entries) ? entries.filter((e) => e?.startDate) : [];
  const ranges = list.map(entryRange).filter(Boolean);
  const merged = mergeRanges(ranges);
  const companies = new Set(list.map((e) => String(e.company || '').trim()).filter(Boolean));
  const current = list.find((e) => e.current) || null;
  return {
    totalYears: merged.length ? totalYearsFromMerged(merged) : 0,
    roleCount: list.length,
    companyCount: companies.size,
    currentRole: current
      ? `${current.title || 'Role'} @ ${current.company || '—'}`
      : '—',
    ranges: list.map((e, i) => ({ entry: e, range: entryRange(e), index: i })).filter((x) => x.range),
  };
}

/**
 * @param {Record<string, unknown>[]} entries
 * @param {'company' | 'type'} mode
 */
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

function typeColor(type) {
  return EXP_TYPE_META[type]?.color || 'var(--pa-teal)';
}

/**
 * @param {ReturnType<typeof computeExperienceSummary>} summary
 */
function renderMiniStats(summary) {
  const years =
    summary.totalYears < 0.25
      ? '< 1 mo'
      : summary.totalYears < 1
        ? `${Math.round(summary.totalYears * 12)} mo`
        : `${summary.totalYears.toFixed(1)} yrs`;
  return `
    <div class="pa-dash-exp-stat"><span class="pa-dash-exp-stat-val">${escapeHtml(years)}</span><span class="pa-dash-exp-stat-label">Experience</span></div>
    <div class="pa-dash-exp-stat"><span class="pa-dash-exp-stat-val">${summary.roleCount}</span><span class="pa-dash-exp-stat-label">Roles</span></div>
    <div class="pa-dash-exp-stat"><span class="pa-dash-exp-stat-val">${summary.companyCount}</span><span class="pa-dash-exp-stat-label">Companies</span></div>
    <div class="pa-dash-exp-stat pa-dash-exp-stat--wide"><span class="pa-dash-exp-stat-val">${escapeHtml(summary.currentRole)}</span><span class="pa-dash-exp-stat-label">Current</span></div>`;
}

/**
 * @param {ReturnType<typeof computeExperienceSummary>} summary
 */
function renderGantt(summary) {
  const rows = summary.ranges;
  if (!rows.length) return '<p class="pa-text-mute fs-sm">No dated roles to display.</p>';

  let min = Infinity;
  let max = -Infinity;
  rows.forEach(({ range }) => {
    min = Math.min(min, range.start.getTime());
    max = Math.max(max, range.end.getTime());
  });
  const span = Math.max(max - min, 1);

  const axisStart = formatYmLabel(new Date(min));
  const axisEnd = formatYmLabel(new Date(max));

  const rowHtml = rows
    .sort((a, b) => a.range.start.getTime() - b.range.start.getTime())
    .map(({ entry, range }) => {
      const left = ((range.start.getTime() - min) / span) * 100;
      const width = Math.max(0.8, ((range.end.getTime() - range.start.getTime()) / span) * 100);
      const title = escapeHtml(entry.title || 'Role');
      const company = escapeHtml(entry.company || '');
      const type = entry.type || 'full-time';
      const tip = `${entry.title} @ ${entry.company}\n${formatYmLabel(range.start)} – ${entry.current ? 'Present' : formatYmLabel(range.end)}\n${formatDurationTooltip(range.start, range.end)}`;
      const currentCls = entry.current ? ' is-current' : '';
      return `<div class="pa-dash-exp-gantt-row">
        <div class="pa-dash-exp-gantt-label" title="${title} — ${company}">${title}</div>
        <div class="pa-dash-exp-gantt-track">
          <div class="pa-dash-exp-gantt-bar${currentCls}" style="left:${left}%;width:${width}%;--exp-bar-color:${typeColor(type)}"
            title="${escapeHtml(tip)}" role="presentation">
            ${entry.current ? '<span class="pa-dash-exp-gantt-badge">Current</span>' : ''}
          </div>
        </div>
      </div>`;
    })
    .join('');

  return `<div class="pa-dash-exp-gantt-axis"><span>${escapeHtml(axisStart)}</span><span>${escapeHtml(axisEnd)}</span></div>${rowHtml}`;
}

function renderDonutLegend(segments) {
  return segments
    .map(
      (seg) =>
        `<div class="pa-donut-legend-item"><span class="pa-donut-legend-swatch" style="background:${resolveColor(seg.color)}"></span><span class="pa-donut-legend-label">${escapeHtml(seg.label)}</span><span class="pa-donut-legend-value">${seg.value}</span></div>`,
    )
    .join('');
}

function resolveColor(c) {
  if (!c || typeof c !== 'string') return c;
  if (!c.startsWith('var(')) return c;
  const m = c.match(/var\((--[\w-]+)\)/);
  if (!m) return c;
  return getComputedStyle(document.body).getPropertyValue(m[1]).trim() || c;
}

/**
 * @typedef {{ destroy: () => void, refresh: (entries: unknown[]) => void }} ExperienceWidgetHandle
 */

/**
 * @param {{ onModeChange?: () => void }} [opts]
 * @returns {ExperienceWidgetHandle}
 */
export function mountExperienceWidget(opts = {}) {
  const root = $id('paDashExpWidget');
  const gantt = $id('paDashExpGantt');
  const mini = $id('paDashExpMiniStats');
  const empty = $id('paDashExpEmpty');
  const skeleton = $id('paDashExpSkeleton');
  const donutMount = $id('paDashExpDonutMount');
  const donutLegend = $id('paDashExpDonutLegend');
  const donutTotal = $id('paDashExpDonutTotal');
  const donutLabel = $id('paDashExpDonutLabel');

  let donutMode = 'company';
  let entries = [];

  const toggleBtns = root?.querySelectorAll('[data-exp-donut-mode]') || [];
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-exp-donut-mode');
      if (!mode || mode === donutMode) return;
      donutMode = mode;
      toggleBtns.forEach((el) => {
        const on = el.getAttribute('data-exp-donut-mode') === mode;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (donutLabel) {
        donutLabel.textContent = mode === 'type' ? 'Duration by type' : 'Duration by company';
      }
      renderDonut();
      opts.onModeChange?.();
    });
  });

  function renderDonut() {
    if (!donutMount || !donutLegend) return;
    const raw = durationSegments(entries, donutMode);
    const segments = assignSegmentColors(raw.map((s) => ({ ...s })));
    const total = segments.reduce((n, s) => n + (Number(s.value) || 0), 0);
    if (donutTotal) donutTotal.textContent = String(Math.round(total));
    renderDonutChart(donutMount, segments);
    donutLegend.innerHTML = renderDonutLegend(segments);
  }

  function refresh(list) {
    entries = Array.isArray(list) ? list : [];
    skeleton?.setAttribute('hidden', '');
    const has = entries.length > 0;
    empty?.toggleAttribute('hidden', has);
    if (gantt) gantt.toggleAttribute('hidden', !has);
    mini?.toggleAttribute('hidden', !has);
    root?.querySelector('.pa-dash-exp-body')?.toggleAttribute('hidden', !has);

    if (!has) {
      if (mini) mini.innerHTML = '';
      if (gantt) gantt.innerHTML = '';
      renderDonut();
      return;
    }

    const summary = computeExperienceSummary(entries);
    if (mini) mini.innerHTML = renderMiniStats(summary);
    if (gantt) gantt.innerHTML = renderGantt(summary);
    renderDonut();
  }

  skeleton?.removeAttribute('hidden');

  return {
    refresh,
    destroy() {
      if (donutMount) renderDonutChart(donutMount, []);
      toggleBtns.forEach((btn) => btn.replaceWith(btn.cloneNode(true)));
    },
  };
}
