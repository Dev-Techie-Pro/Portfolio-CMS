// @ts-nocheck
import { $id, escapeHtml } from '../../../utils/dom.js';
import { assignSegmentColors, renderDonutChart } from '../../../utils/dashboardCharts.js';
import { EXP_TYPE_META } from '../../experience/ExperienceModule.js';

const MONTH_MS = 30.4375 * 24 * 60 * 60 * 1000;
const LABEL_COL_PX = 210;

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

function formatMonthsShort(totalMonths) {
  const months = Math.round(totalMonths);
  if (months < 1) return '< 1m';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m}m`;
  if (!m) return `${y}y`;
  return `${y}y ${m}m`;
}

function formatDurationLong(totalMonths) {
  const months = Math.round(totalMonths);
  if (months < 1) return 'Less than 1 month';
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} year${y === 1 ? '' : 's'}`);
  if (m) parts.push(`${m} month${m === 1 ? '' : 's'}`);
  return parts.join(' ');
}

function formatYmLabel(d) {
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function formatDateRangeLine(start, end, current) {
  const a = formatYmLabel(start);
  const b = current ? 'Present' : formatYmLabel(end);
  return `${a} — ${b}`;
}

function employmentLabel(type) {
  return EXP_TYPE_META[type]?.label || type || '—';
}

export function computeExperienceSummary(entries) {
  const list = Array.isArray(entries) ? entries.filter((e) => e?.startDate) : [];
  const merged = mergeRanges(list.map(entryRange).filter(Boolean));
  const totalMonths = merged.reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);
  return {
    list,
    totalMonths,
    totalLabel: formatMonthsShort(totalMonths),
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

/**
 * Timeline: linear scale from first role start → now (today at right edge).
 * By year: equal-width year columns from first calendar year → now.
 */
function buildTimelineScale(rows, mode) {
  const now = new Date();
  let minMs = Infinity;
  rows.forEach(({ range }) => {
    minMs = Math.min(minMs, range.start.getTime());
  });
  if (!Number.isFinite(minMs)) minMs = now.getTime();

  const maxMs = now.getTime();
  const startYear = new Date(minMs).getFullYear();
  const endYear = now.getFullYear();
  const years = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);
  if (years.length < 1) years.push(endYear);

  function barMetrics(range) {
    if (mode === 'year') {
      const yearCount = years.length;
      const monthIndex = (d) => (d.getFullYear() - startYear) * 12 + d.getMonth();
      const startM = monthIndex(range.start);
      const endM = monthIndex(range.end) + 1;
      const totalM = yearCount * 12;
      const left = (startM / totalM) * 100;
      const width = Math.max(0.8, ((endM - startM) / totalM) * 100);
      return { left, width };
    }
    const span = Math.max(maxMs - minMs, 1);
    const left = ((range.start.getTime() - minMs) / span) * 100;
    const width = Math.max(0.8, ((range.end.getTime() - range.start.getTime()) / span) * 100);
    return { left, width };
  }

  return {
    years,
    yearCols: years.length,
    todayPct: 100,
    barMetrics,
    mode,
  };
}

function renderBarTooltip(entry, range) {
  const months = monthsBetween(range.start, range.end);
  const loc = entry.location ? ` · ${entry.location}` : '';
  const companyMeta = `${entry.company || '—'}${loc}`;
  return `<div class="pa-exp-overview-tip" role="tooltip">
    <div class="pa-exp-overview-tip-title">${escapeHtml(entry.title || 'Role')}</div>
    <div class="pa-exp-overview-tip-meta">${escapeHtml(companyMeta)}</div>
    <div class="pa-exp-overview-tip-dates">${escapeHtml(formatDateRangeLine(range.start, range.end, entry.current))}</div>
    <div class="pa-exp-overview-tip-accent">${escapeHtml(formatDurationLong(months))} · ${escapeHtml(employmentLabel(entry.type))}</div>
  </div>`;
}

function renderTimeline(summary, timelineMode) {
  const rows = summary.rows;
  if (!rows.length) return '<p class="pa-text-mute fs-sm">No dated roles to display.</p>';

  const scale = buildTimelineScale(rows, timelineMode);
  const yearHeader = scale.years.map((y) => `<span>${y}</span>`).join('');
  const modeClass = timelineMode === 'year' ? ' is-by-year' : ' is-timeline';

  const rowHtml = rows
    .map(({ entry, range }) => {
      const { left, width } = scale.barMetrics(range);
      const dur = formatMonthsShort(monthsBetween(range.start, range.end));
      const typeCls = TYPE_BAR_CLASS[entry.type] || 'is-fulltime';
      const currentCls = entry.current ? ' is-current' : '';
      const barLabel = width > 7 ? escapeHtml(dur) : '';
      const companyLine = entry.current
        ? `${escapeHtml(entry.company || '')} · <span class="pa-exp-overview-current-tag">CURRENT</span>`
        : escapeHtml(entry.company || '');
      const tipAlign =
        entry.current ? ' is-tip-end' : width < 8 || left < 6 ? ' is-tip-start' : '';
      return `<div class="pa-exp-overview-row">
        <div class="pa-exp-overview-row-label">
          <div class="pa-exp-overview-row-title">${escapeHtml(entry.title || 'Role')}</div>
          <div class="pa-exp-overview-row-company">${companyLine}</div>
        </div>
        <div class="pa-exp-overview-row-track" style="--exp-year-cols:${scale.yearCols}">
          <button type="button" class="pa-exp-overview-bar ${typeCls}${currentCls}${tipAlign}" style="left:${left}%;width:${width}%;" aria-label="${escapeHtml(entry.title || 'Role')} — ${escapeHtml(dur)}">
            <span class="pa-exp-overview-bar-label">${barLabel}</span>
            ${renderBarTooltip(entry, range)}
          </button>
        </div>
      </div>`;
    })
    .join('');

  return `<div class="pa-exp-overview-timeline-inner${modeClass}" style="--exp-label-col:${LABEL_COL_PX}px">
    <div class="pa-exp-overview-years">
      <div class="pa-exp-overview-years-spacer" aria-hidden="true"></div>
      <div class="pa-exp-overview-years-grid" style="--exp-year-cols:${scale.yearCols}">${yearHeader}</div>
    </div>
    <div class="pa-exp-overview-today" style="--exp-today-pct:${scale.todayPct}">
      <span class="pa-exp-overview-today-line" aria-hidden="true"></span>
      <span class="pa-exp-overview-today-label">TODAY</span>
    </div>
    ${rowHtml}
  </div>`;
}

function renderTypeLegend() {
  return `
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-fulltime"></span>Full-time</span>
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-current"></span>Current</span>
    <span class="pa-exp-overview-legend-item"><span class="pa-exp-overview-swatch is-internship"></span>Internship</span>`;
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

function getExpTipPortal() {
  let portal = document.getElementById('paDashExpTipPortal');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'paDashExpTipPortal';
    portal.className = 'pa-exp-overview-tip-portal';
    portal.hidden = true;
    document.body.appendChild(portal);
  }
  return portal;
}

function positionExpBarTip(bar, tipEl) {
  const barRect = bar.getBoundingClientRect();
  const margin = 8;
  tipEl.style.position = 'fixed';
  tipEl.style.display = 'block';
  tipEl.style.visibility = 'hidden';
  tipEl.style.left = '0';
  tipEl.style.top = '0';
  tipEl.style.bottom = 'auto';
  tipEl.style.right = 'auto';
  const tipW = tipEl.offsetWidth;
  const tipH = tipEl.offsetHeight;
  tipEl.style.visibility = '';

  let left;
  if (bar.classList.contains('is-tip-end')) {
    left = barRect.right - tipW;
  } else if (bar.classList.contains('is-tip-start')) {
    left = barRect.left;
  } else {
    left = barRect.left + barRect.width / 2 - tipW / 2;
  }
  left = Math.max(margin, Math.min(left, window.innerWidth - tipW - margin));

  let top = barRect.top - tipH - 10;
  tipEl.classList.toggle('is-below', false);
  if (top < margin) {
    top = barRect.bottom + 10;
    tipEl.classList.add('is-below');
  }

  tipEl.style.left = `${Math.round(left)}px`;
  tipEl.style.top = `${Math.round(top)}px`;
}

function bindBarTooltips(container) {
  if (!container) return;
  const portal = getExpTipPortal();
  let openBar = null;
  let hoverBar = null;

  const hidePortal = () => {
    portal.hidden = true;
    portal.innerHTML = '';
  };

  const showTipForBar = (bar) => {
    const source = bar.querySelector('.pa-exp-overview-tip');
    if (!source) return;
    portal.innerHTML = source.outerHTML;
    const tipEl = portal.querySelector('.pa-exp-overview-tip');
    if (!tipEl) return;
    portal.hidden = false;
    positionExpBarTip(bar, tipEl);
  };

  const closeOpen = () => {
    if (openBar) {
      openBar.classList.remove('is-tip-open');
      openBar = null;
    }
    if (!hoverBar) hidePortal();
    else showTipForBar(hoverBar);
  };

  const onDocClick = (e) => {
    if (!e.target.closest('.pa-exp-overview-bar') && !e.target.closest('.pa-exp-overview-tip-portal')) {
      closeOpen();
      hoverBar = null;
      hidePortal();
    }
  };

  const onScroll = () => {
    if (openBar) showTipForBar(openBar);
    else if (hoverBar) showTipForBar(hoverBar);
    else hidePortal();
  };

  container.querySelectorAll('.pa-exp-overview-bar').forEach((bar) => {
    bar.addEventListener('mouseenter', () => {
      hoverBar = bar;
      if (!openBar || openBar === bar) showTipForBar(bar);
    });
    bar.addEventListener('mouseleave', () => {
      if (hoverBar === bar) hoverBar = null;
      if (openBar === bar) return;
      hidePortal();
    });
    bar.addEventListener('focus', () => {
      hoverBar = bar;
      showTipForBar(bar);
    });
    bar.addEventListener('blur', () => {
      if (hoverBar === bar) hoverBar = null;
      if (openBar !== bar) hidePortal();
    });
    bar.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bar.classList.contains('is-tip-open')) {
        bar.classList.remove('is-tip-open');
        openBar = null;
        if (hoverBar === bar) showTipForBar(bar);
        else hidePortal();
      } else {
        container.querySelectorAll('.pa-exp-overview-bar.is-tip-open').forEach((el) => {
          el.classList.remove('is-tip-open');
        });
        bar.classList.add('is-tip-open');
        openBar = bar;
        showTipForBar(bar);
      }
    });
  });

  document.addEventListener('click', onDocClick, { capture: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('scroll', onScroll, true);
  container.closest('.pa-exp-overview-timeline-scroll')?.addEventListener('scroll', onScroll, {
    passive: true,
  });

  container._expTipCleanup = () => {
    document.removeEventListener('click', onDocClick, { capture: true });
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('scroll', onScroll, true);
    container.closest('.pa-exp-overview-timeline-scroll')?.removeEventListener('scroll', onScroll);
    closeOpen();
    hoverBar = null;
    hidePortal();
  };
}

function paintTimeline(gantt, summary, timelineMode) {
  if (!gantt) return;
  if (gantt._expTipCleanup) gantt._expTipCleanup();
  gantt.innerHTML = renderTimeline(summary, timelineMode);
  bindBarTooltips(gantt);
}

export function mountExperienceWidget() {
  const root = $id('paDashExpWidget');
  const gantt = $id('paDashExpGantt');
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

  function refreshTimeline() {
    const summary = computeExperienceSummary(entries);
    paintTimeline(gantt, summary, timelineMode);
    if (typeLegend) typeLegend.innerHTML = renderTypeLegend();
  }

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
      refreshTimeline();
    });
  });

  function refresh(list) {
    entries = Array.isArray(list) ? list : [];
    skeleton?.setAttribute('hidden', '');
    const has = entries.length > 0;
    empty?.toggleAttribute('hidden', has);
    panels?.toggleAttribute('hidden', !has);

    if (!has) {
      if (gantt) gantt.innerHTML = '';
      if (typeLegend) typeLegend.innerHTML = '';
      renderDonut();
      return;
    }

    refreshTimeline();
    renderDonut();
  }

  skeleton?.removeAttribute('hidden');

  return {
    refresh,
    destroy() {
      if (gantt?._expTipCleanup) gantt._expTipCleanup();
      if (donutMount) renderDonutChart(donutMount, []);
    },
  };
}
