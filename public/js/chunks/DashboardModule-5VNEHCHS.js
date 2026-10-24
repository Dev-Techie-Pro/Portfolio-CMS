import {
  CATEGORY_META_PROJECTS
} from "./chunk-VGZHRHVC.js";
import "./chunk-ZSETD5SA.js";
import "./chunk-T2NFGIV5.js";
import "./chunk-OL6GWZCM.js";
import {
  syncPaSelect
} from "./chunk-HYF3MIUV.js";
import "./chunk-XZ5R2AN2.js";
import {
  GROUP_META,
  LEVEL_META
} from "./chunk-ATOCMTVK.js";
import "./chunk-N6KQWXTY.js";
import "./chunk-Q6LT2MRI.js";
import "./chunk-2XY7RIAB.js";
import {
  EXP_TYPE_META
} from "./chunk-RRTPAF3F.js";
import "./chunk-IBKEZKLB.js";
import "./chunk-JFWNZ4BR.js";
import "./chunk-777AU2J4.js";
import "./chunk-V7ZPEMLL.js";
import "./chunk-2H7SZRFW.js";
import "./chunk-NAHW6JXX.js";
import "./chunk-25T6YHMS.js";
import "./chunk-VXJMB3CY.js";
import "./chunk-FRUJZYET.js";
import "./chunk-PD6FJZHW.js";
import "./chunk-6FXKQLBA.js";
import {
  formatDate,
  timeAgo
} from "./chunk-JWEJ6YLS.js";
import "./chunk-WNHYA5Z5.js";
import "./chunk-X5DANJIQ.js";
import "./chunk-HSXC6VYX.js";
import "./chunk-IZ7T64RP.js";
import "./chunk-UHXU6UPR.js";
import {
  Module,
  storage
} from "./chunk-7KTA4S5K.js";
import {
  getAccessCapabilities,
  requestBulkAction
} from "./chunk-FTMH3SUW.js";
import {
  showToast
} from "./chunk-HWSNCMVP.js";
import {
  $,
  $id,
  escapeHtml
} from "./chunk-HFEWIT3P.js";
import "./chunk-MTDZJ6X7.js";

// client/utils/dashboardCharts.ts
var chartInstances = /* @__PURE__ */ new WeakMap();
var apexChartsLoadPromise = null;
function ensureApexChartsLoaded() {
  if (typeof window !== "undefined" && typeof ApexCharts !== "undefined") {
    return Promise.resolve();
  }
  if (apexChartsLoadPromise) return apexChartsLoadPromise;
  apexChartsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="/js/vendor/apexcharts.min.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("ApexCharts failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "/js/vendor/apexcharts.min.js";
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("ApexCharts failed to load")), { once: true });
    document.head.appendChild(script);
  });
  return apexChartsLoadPromise;
}
function resolveChartColor(value) {
  if (typeof value !== "string") return value;
  const match = value.match(/^var\((--[\w-]+)\)$/);
  if (!match) return value;
  const resolved = getComputedStyle(document.body).getPropertyValue(match[1]).trim();
  return resolved || value;
}
function getAccentCssVar() {
  return "var(--pa-orange)";
}
var CHART_SUPPORT_COLORS = [
  "var(--pa-web)",
  "var(--pa-edu)",
  "var(--pa-pink)",
  "var(--pa-purple)",
  "var(--pa-teal)",
  "var(--pa-red)"
];
function assignSegmentColors(segments) {
  if (!segments?.length) return [];
  const maxValue = Math.max(...segments.map((seg) => Number(seg.value) || 0));
  let accentUsed = false;
  let supportIndex = 0;
  return segments.map((seg) => {
    const value = Number(seg.value) || 0;
    if (!accentUsed && value === maxValue && maxValue > 0) {
      accentUsed = true;
      return { ...seg, color: getAccentCssVar() };
    }
    const color = CHART_SUPPORT_COLORS[supportIndex % CHART_SUPPORT_COLORS.length];
    supportIndex += 1;
    return { ...seg, color };
  });
}
function seriesWeight(series) {
  if (typeof series.weight === "number") return series.weight;
  if (Array.isArray(series.values)) {
    return series.values.reduce((sum, value) => sum + (Number(value) || 0), 0);
  }
  if (Array.isArray(series.points)) {
    return series.points.reduce((sum, point) => sum + (Number(point.y) || 0), 0);
  }
  return 0;
}
function assignSeriesColors(seriesList) {
  if (!seriesList?.length) return [];
  const weights = seriesList.map((series) => seriesWeight(series));
  const maxWeight = Math.max(...weights, 0);
  let accentUsed = false;
  let supportIndex = 0;
  return seriesList.map((series, index) => {
    if (!accentUsed && weights[index] === maxWeight && maxWeight > 0) {
      accentUsed = true;
      return getAccentCssVar();
    }
    const color = CHART_SUPPORT_COLORS[supportIndex % CHART_SUPPORT_COLORS.length];
    supportIndex += 1;
    return color;
  });
}
function themeColors() {
  const style = getComputedStyle(document.body);
  return {
    text: style.getPropertyValue("--pa-text").trim() || "#e8e8ea",
    textFaint: style.getPropertyValue("--pa-text-faint").trim() || "#9a9aa0",
    textDim: style.getPropertyValue("--pa-text-dim").trim() || "#b4b4bc",
    borderSoft: style.getPropertyValue("--pa-border-soft").trim() || "#2a2a30",
    bgCard: style.getPropertyValue("--pa-bg-card").trim() || "#141418"
  };
}
function baseChartOptions(type) {
  const colors = themeColors();
  return {
    chart: {
      type,
      background: "transparent",
      fontFamily: "inherit",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 650,
        animateGradually: { enabled: true, delay: 80 }
      },
      dropShadow: {
        enabled: type === "area" || type === "line",
        top: 2,
        left: 0,
        blur: 6,
        opacity: 0.12
      }
    },
    grid: {
      borderColor: colors.borderSoft,
      strokeDashArray: 4,
      padding: { left: 8, right: 8, top: 0, bottom: 0 }
    },
    xaxis: {
      labels: {
        style: { colors: colors.textFaint, fontSize: "11px", fontWeight: 500 }
      },
      axisBorder: { show: true, color: colors.borderSoft },
      axisTicks: { show: true, color: colors.borderSoft },
      crosshairs: { show: type === "area" || type === "line" }
    },
    yaxis: {
      labels: {
        style: { colors: colors.textFaint, fontSize: "11px", fontWeight: 500 }
      }
    },
    tooltip: {
      theme: document.body.classList.contains("light") ? "light" : "dark",
      style: { fontSize: "12px" }
    },
    legend: { show: false },
    dataLabels: { enabled: false }
  };
}
function resolveChartHeight(mountEl, fallback = 230) {
  if (!mountEl) return fallback;
  const measured = mountEl.clientHeight || parseFloat(getComputedStyle(mountEl).height) || 0;
  return measured > 0 ? Math.round(measured) : fallback;
}
function resolveChartWidth(mountEl) {
  if (!mountEl) return "100%";
  const measured = mountEl.clientWidth;
  return measured > 0 ? measured : "100%";
}
function sanitizeSeriesData(values) {
  return (values || []).map((value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  });
}
function destroyChart(mountEl) {
  if (!mountEl) return;
  const instance = chartInstances.get(mountEl);
  if (instance) {
    instance.destroy();
    chartInstances.delete(mountEl);
  }
  mountEl.innerHTML = "";
}
function mountChart(mountEl, options) {
  if (!mountEl || typeof ApexCharts === "undefined") return null;
  destroyChart(mountEl);
  const height = resolveChartHeight(mountEl, options?.chart?.height || 230);
  const width = resolveChartWidth(mountEl);
  const series = (options.series || []).map((entry) => ({
    ...entry,
    data: sanitizeSeriesData(entry.data)
  }));
  const chart = new ApexCharts(mountEl, {
    ...options,
    series,
    chart: {
      ...options.chart,
      height,
      width
    }
  });
  chart.render();
  chartInstances.set(mountEl, chart);
  return chart;
}
function donutSegmentCircles(segments, size, strokeWidth) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  if (!total) return "";
  const radius = (size - strokeWidth) / 2 - 1;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  return segments.map((seg) => {
    const length = seg.value / total * circumference;
    const color = resolveChartColor(seg.color);
    const circle = `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="butt" stroke-dasharray="${length} ${Math.max(circumference - length, 0)}" stroke-dashoffset="${-cumulative}" transform="rotate(-90 ${cx} ${cy})"></circle>`;
    cumulative += length;
    return circle;
  }).join("");
}
function renderDonutChart(mountEl, segments) {
  if (!mountEl) return null;
  destroyChart(mountEl);
  const wrap = mountEl.closest(".pa-donut-svg-wrap");
  const measured = wrap ? Math.round(Math.min(wrap.clientWidth, wrap.clientHeight) || 0) : 0;
  const size = Math.max(136, Math.min(measured || 160, 188));
  const strokeWidth = Math.round(size * 0.138);
  const hasData = segments.length > 0 && segments.some((seg) => seg.value > 0);
  const rings = hasData ? donutSegmentCircles(segments, size, strokeWidth) : `<circle cx="${size / 2}" cy="${size / 2}" r="${(size - strokeWidth) / 2 - 1}" fill="none" stroke="${resolveChartColor("var(--pa-border-soft)")}" stroke-width="${strokeWidth}" opacity="0.55"></circle>`;
  mountEl.innerHTML = `<svg class="pa-donut-svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="presentation" aria-hidden="true">${rings}</svg>`;
  return null;
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  if (endAngle <= startAngle) return "";
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}
function renderProjGaugeChart(mountEl, pct, fillColor = "var(--pa-green)") {
  if (!mountEl) return null;
  destroyChart(mountEl);
  const value = Math.max(0, Math.min(100, pct));
  const width = 220;
  const height = 118;
  const strokeWidth = 20;
  const r = 88;
  const cx = width / 2;
  const cy = height - 6;
  const trackColor = resolveChartColor("var(--pa-border-soft)");
  const color = resolveChartColor(fillColor);
  const trackPath = describeArc(cx, cy, r, 180, 360);
  const endAngle = 180 + value / 100 * 180;
  const fillPath = value > 0 ? describeArc(cx, cy, r, 180, Math.max(endAngle, 181.5)) : "";
  mountEl.innerHTML = `<svg class="pa-proj-gauge-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" role="presentation" aria-hidden="true">
    <path class="pa-proj-gauge-track" d="${trackPath}" fill="none" stroke="${trackColor}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="0.5"/>
    ${fillPath ? `<path class="pa-proj-gauge-fill" d="${fillPath}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>` : ""}
  </svg>`;
  return null;
}
function renderAreaChart(mountEl, points, color = "var(--pa-green)") {
  if (!mountEl) return null;
  const resolved = resolveChartColor(color);
  const safePoints = (points || []).length ? points : [{ label: "-", y: 0 }];
  const categories = safePoints.map((p) => p.label);
  const data = safePoints.map((p) => p.y);
  return mountChart(mountEl, {
    ...baseChartOptions("area"),
    series: [{ name: "Count", data }],
    colors: [resolved],
    xaxis: {
      ...baseChartOptions("area").xaxis,
      categories
    },
    yaxis: {
      ...baseChartOptions("area").yaxis,
      min: 0,
      forceNiceScale: true
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.42,
        opacityTo: 0.04,
        stops: [0, 92, 100]
      }
    },
    stroke: {
      curve: "smooth",
      width: 2.75
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: themeColors().bgCard,
      hover: { size: 6 }
    }
  });
}
function renderMultiLineChart(mountEl, seriesDefs) {
  if (!mountEl) return null;
  const safeDefs = (seriesDefs || []).length ? seriesDefs : [{ name: "Count", color: "var(--pa-green)", points: [{ label: "-", y: 0 }] }];
  const categories = safeDefs[0]?.points?.map((p) => p.label) || ["-"];
  return mountChart(mountEl, {
    ...baseChartOptions("line"),
    series: safeDefs.map((def) => ({
      name: def.name,
      data: (def.points || []).map((p) => p.y)
    })),
    colors: safeDefs.map((def) => resolveChartColor(def.color)),
    xaxis: {
      ...baseChartOptions("line").xaxis,
      categories
    },
    yaxis: {
      ...baseChartOptions("line").yaxis,
      min: 0,
      forceNiceScale: true
    },
    stroke: {
      curve: "smooth",
      width: 2.5
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: themeColors().bgCard,
      hover: { size: 6 }
    },
    tooltip: {
      ...baseChartOptions("line").tooltip,
      shared: true,
      intersect: false
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "11px",
      fontWeight: 600,
      labels: { colors: themeColors().textDim },
      markers: { width: 8, height: 8, radius: 12 },
      itemMargin: { horizontal: 10 }
    }
  });
}

// client/modules/dashboard/widgets/experienceChart.ts
var MONTH_MS = 30.4375 * 24 * 60 * 60 * 1e3;
var LABEL_COL_PX = 210;
var TYPE_BAR_CLASS = {
  "full-time": "is-fulltime",
  "part-time": "is-parttime",
  contract: "is-contract",
  freelance: "is-freelance",
  internship: "is-internship"
};
function parseYmStart(ym) {
  if (!ym || typeof ym !== "string") return null;
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1);
}
function parseYmEnd(ym) {
  if (!ym || typeof ym !== "string") return null;
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m, 0, 23, 59, 59, 999);
}
function entryRange(entry) {
  const start = parseYmStart(entry.startDate);
  if (!start) return null;
  const end = entry.current ? /* @__PURE__ */ new Date() : parseYmEnd(entry.endDate) || start;
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
        Math.max(merged[merged.length - 1].end.getTime(), r.end.getTime())
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
  if (months < 1) return "< 1m";
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m}m`;
  if (!m) return `${y}y`;
  return `${y}y ${m}m`;
}
function formatDurationLong(totalMonths) {
  const months = Math.round(totalMonths);
  if (months < 1) return "Less than 1 month";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} year${y === 1 ? "" : "s"}`);
  if (m) parts.push(`${m} month${m === 1 ? "" : "s"}`);
  return parts.join(" ");
}
function formatYmLabel(d) {
  return d.toLocaleDateString(void 0, { month: "short", year: "numeric" });
}
function formatDateRangeLine(start, end, current) {
  const a = formatYmLabel(start);
  const b = current ? "Present" : formatYmLabel(end);
  return `${a} \u2014 ${b}`;
}
function employmentLabel(type) {
  return EXP_TYPE_META[type]?.label || type || "\u2014";
}
function computeExperienceSummary(entries) {
  const list = Array.isArray(entries) ? entries.filter((e) => e?.startDate) : [];
  const merged = mergeRanges(list.map(entryRange).filter(Boolean));
  const totalMonths = merged.reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);
  return {
    list,
    totalMonths,
    totalLabel: formatMonthsShort(totalMonths),
    rows: list.map((e) => ({ entry: e, range: entryRange(e) })).filter((x) => x.range).sort((a, b) => a.range.start.getTime() - b.range.start.getTime())
  };
}
function durationSegments(entries, mode) {
  const map = /* @__PURE__ */ new Map();
  for (const e of entries) {
    const r = entryRange(e);
    if (!r) continue;
    const months = monthsBetween(r.start, r.end);
    const key = mode === "type" ? EXP_TYPE_META[e.type]?.label || e.type || "Other" : String(e.company || "Unknown").trim() || "Unknown";
    map.set(key, (map.get(key) || 0) + months);
  }
  return [...map.entries()].map(([label, value]) => ({ label, value: Math.round(value) })).filter((s) => s.value > 0).sort((a, b) => b.value - a.value);
}
function buildTimelineScale(rows, mode) {
  const now = /* @__PURE__ */ new Date();
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
    if (mode === "year") {
      const yearCount = years.length;
      const monthIndex = (d) => (d.getFullYear() - startYear) * 12 + d.getMonth();
      const startM = monthIndex(range.start);
      const endM = monthIndex(range.end) + 1;
      const totalM = yearCount * 12;
      const left2 = startM / totalM * 100;
      const width2 = Math.max(0.8, (endM - startM) / totalM * 100);
      return { left: left2, width: width2 };
    }
    const span = Math.max(maxMs - minMs, 1);
    const left = (range.start.getTime() - minMs) / span * 100;
    const width = Math.max(0.8, (range.end.getTime() - range.start.getTime()) / span * 100);
    return { left, width };
  }
  return {
    years,
    yearCols: years.length,
    todayPct: 100,
    barMetrics,
    mode
  };
}
function renderBarTooltip(entry, range) {
  const months = monthsBetween(range.start, range.end);
  const loc = entry.location ? ` \xB7 ${entry.location}` : "";
  const companyMeta = `${entry.company || "\u2014"}${loc}`;
  return `<div class="pa-exp-overview-tip" role="tooltip">
    <div class="pa-exp-overview-tip-title">${escapeHtml(entry.title || "Role")}</div>
    <div class="pa-exp-overview-tip-meta">${escapeHtml(companyMeta)}</div>
    <div class="pa-exp-overview-tip-dates">${escapeHtml(formatDateRangeLine(range.start, range.end, entry.current))}</div>
    <div class="pa-exp-overview-tip-accent">${escapeHtml(formatDurationLong(months))} \xB7 ${escapeHtml(employmentLabel(entry.type))}</div>
  </div>`;
}
function renderTimeline(summary, timelineMode) {
  const rows = summary.rows;
  if (!rows.length) return '<p class="pa-text-mute fs-sm">No dated roles to display.</p>';
  const scale = buildTimelineScale(rows, timelineMode);
  const yearHeader = scale.years.map((y) => `<span>${y}</span>`).join("");
  const modeClass = timelineMode === "year" ? " is-by-year" : " is-timeline";
  const rowHtml = rows.map(({ entry, range }) => {
    const { left, width } = scale.barMetrics(range);
    const dur = formatMonthsShort(monthsBetween(range.start, range.end));
    const typeCls = TYPE_BAR_CLASS[entry.type] || "is-fulltime";
    const currentCls = entry.current ? " is-current" : "";
    const barLabel = width > 7 ? escapeHtml(dur) : "";
    const companyLine = entry.current ? `${escapeHtml(entry.company || "")} \xB7 <span class="pa-exp-overview-current-tag">CURRENT</span>` : escapeHtml(entry.company || "");
    const tipAlign = entry.current ? " is-tip-end" : "";
    return `<div class="pa-exp-overview-row">
        <div class="pa-exp-overview-row-label">
          <div class="pa-exp-overview-row-title">${escapeHtml(entry.title || "Role")}</div>
          <div class="pa-exp-overview-row-company">${companyLine}</div>
        </div>
        <div class="pa-exp-overview-row-track" style="--exp-year-cols:${scale.yearCols}">
          <button type="button" class="pa-exp-overview-bar ${typeCls}${currentCls}${tipAlign}" style="left:${left}%;width:${width}%;" aria-label="${escapeHtml(entry.title || "Role")} \u2014 ${escapeHtml(dur)}">
            <span class="pa-exp-overview-bar-label">${barLabel}</span>
            ${renderBarTooltip(entry, range)}
          </button>
        </div>
      </div>`;
  }).join("");
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
  if (!c || typeof c !== "string") return c;
  if (!c.startsWith("var(")) return c;
  const m = c.match(/var\((--[\w-]+)\)/);
  if (!m) return c;
  return getComputedStyle(document.body).getPropertyValue(m[1]).trim() || c;
}
function renderDonutLegendRows(segments, totalMonths) {
  const total = totalMonths || segments.reduce((n, s) => n + (Number(s.value) || 0), 0) || 1;
  return segments.map((seg) => {
    const pct = Math.round(seg.value / total * 100);
    return `<div class="pa-exp-overview-donut-row">
        <span class="pa-exp-overview-donut-dot" style="background:${resolveColor(seg.color)}"></span>
        <span class="pa-exp-overview-donut-name">${escapeHtml(seg.label)}</span>
        <span class="pa-exp-overview-donut-dur">${formatMonthsShort(seg.value)}</span>
        <span class="pa-exp-overview-donut-pct">${pct}%</span>
      </div>`;
  }).join("");
}
function bindBarTooltips(container) {
  if (!container) return;
  let openBar = null;
  const closeOpen = () => {
    if (openBar) {
      openBar.classList.remove("is-tip-open");
      openBar = null;
    }
  };
  container.querySelectorAll(".pa-exp-overview-bar").forEach((bar) => {
    bar.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bar.classList.contains("is-tip-open")) {
        closeOpen();
      } else {
        closeOpen();
        bar.classList.add("is-tip-open");
        openBar = bar;
      }
    });
  });
  document.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest(".pa-exp-overview-bar")) closeOpen();
    },
    { capture: true }
  );
  container._expTipCleanup = () => {
    closeOpen();
  };
}
function paintTimeline(gantt, summary, timelineMode) {
  if (!gantt) return;
  if (gantt._expTipCleanup) gantt._expTipCleanup();
  gantt.innerHTML = renderTimeline(summary, timelineMode);
  bindBarTooltips(gantt);
}
function mountExperienceWidget() {
  const root = $id("paDashExpWidget");
  const gantt = $id("paDashExpGantt");
  const panels = $id("paDashExpPanels");
  const typeLegend = $id("paDashExpTypeLegend");
  const empty = $id("paDashExpEmpty");
  const skeleton = $id("paDashExpSkeleton");
  const donutMount = $id("paDashExpDonutMount");
  const donutLegend = $id("paDashExpDonutLegend");
  const donutTotal = $id("paDashExpDonutTotal");
  const donutLabel = $id("paDashExpDonutLabel");
  let donutMode = "company";
  let timelineMode = "timeline";
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
  root?.querySelectorAll("[data-exp-donut-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-exp-donut-mode");
      if (!mode || mode === donutMode) return;
      donutMode = mode;
      root.querySelectorAll("[data-exp-donut-mode]").forEach((el) => {
        const on = el.getAttribute("data-exp-donut-mode") === mode;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-selected", on ? "true" : "false");
      });
      if (donutLabel) {
        donutLabel.textContent = mode === "type" ? "Time by Type" : "Time by Company";
      }
      renderDonut();
    });
  });
  root?.querySelectorAll("[data-exp-timeline-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-exp-timeline-mode");
      if (!mode || mode === timelineMode) return;
      timelineMode = mode;
      root.querySelectorAll("[data-exp-timeline-mode]").forEach((el) => {
        const on = el.getAttribute("data-exp-timeline-mode") === mode;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-selected", on ? "true" : "false");
      });
      refreshTimeline();
    });
  });
  function refresh(list) {
    entries = Array.isArray(list) ? list : [];
    skeleton?.setAttribute("hidden", "");
    const has = entries.length > 0;
    empty?.toggleAttribute("hidden", has);
    panels?.toggleAttribute("hidden", !has);
    if (!has) {
      if (gantt) gantt.innerHTML = "";
      if (typeLegend) typeLegend.innerHTML = "";
      renderDonut();
      return;
    }
    refreshTimeline();
    renderDonut();
  }
  skeleton?.removeAttribute("hidden");
  return {
    refresh,
    destroy() {
      if (gantt?._expTipCleanup) gantt._expTipCleanup();
      if (donutMount) renderDonutChart(donutMount, []);
    }
  };
}

// client/modules/dashboard/widgets/roleRequestsCard.ts
var DEFAULT_DURATION_HOURS = 3;
function formatRoleLabel(role) {
  return String(role || "viewer").replace(/_/g, " ");
}
function roleInitials(name) {
  return (name || "?").split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
function setPendingBadge(badge, count) {
  if (!badge) return;
  const n = Math.max(0, Number(count) || 0);
  if (n > 0) {
    badge.textContent = `${n} pending`;
    badge.removeAttribute("hidden");
  } else {
    badge.setAttribute("hidden", "");
  }
}
function requestedRoleLabel(item) {
  const explicit = item.requestedRole || item.requested_role;
  if (explicit) return formatRoleLabel(explicit);
  return "editor";
}
function mountAccessRequestsWidget() {
  const caps = getAccessCapabilities();
  if (!caps.isAdmin) return null;
  const widget = document.getElementById("paDashAccessWidget");
  const list = document.getElementById("paDashAccessList");
  const empty = document.getElementById("paDashAccessEmpty");
  const badge = document.getElementById("paDashAccessBadge");
  const skeleton = document.getElementById("paDashAccessSkeleton");
  if (!widget || !list) return null;
  widget.removeAttribute("hidden");
  let items = [];
  async function fetchPending() {
    skeleton?.removeAttribute("hidden");
    empty?.setAttribute("hidden", "");
    list.innerHTML = "";
    try {
      const res = await fetch(
        `/api/admin/access-requests?status=pending&limit=8`,
        { credentials: "include", headers: { Accept: "application/json" } }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not load requests.");
      items = Array.isArray(data.items) ? data.items.filter((i) => i.status === "pending") : [];
      const pendingCount = data.pendingCount ?? items.length;
      setPendingBadge(badge, pendingCount);
    } catch (err) {
      showToast(err?.message || "Could not load access requests.", "danger");
      items = [];
    } finally {
      skeleton?.setAttribute("hidden", "");
      render();
    }
  }
  function render() {
    if (!items.length) {
      list.innerHTML = "";
      empty?.removeAttribute("hidden");
      return;
    }
    empty?.setAttribute("hidden", "");
    list.innerHTML = items.map((item) => renderRow(item)).join("");
  }
  function renderRow(item) {
    const rawName = item.requesterName || item.requesterEmail || "Staff";
    const name = escapeHtml(rawName);
    const email = escapeHtml(item.requesterEmail || item.contactEmail || "");
    const fromRole = formatRoleLabel(item.roleBeforeElevation || item.requesterRole);
    const toRole = requestedRoleLabel(item);
    const when = escapeHtml(timeAgo(item.createdAt) || "");
    const init = escapeHtml(roleInitials(rawName));
    const id = escapeHtml(item.id);
    return `<article class="pa-dash-role-item" data-access-id="${id}">
      <div class="pa-dash-role-item-avatar" aria-hidden="true">${init}</div>
      <div class="pa-dash-role-item-body">
        <div class="pa-dash-role-item-name">${name}</div>
        ${email ? `<div class="pa-dash-role-item-email">${email}</div>` : ""}
        <div class="pa-dash-role-item-change">
          <span class="pa-dash-role-tag pa-dash-role-tag--from">${escapeHtml(fromRole)}</span>
          <span class="pa-dash-role-item-to">to</span>
          <span class="pa-dash-role-tag pa-dash-role-tag--to">${escapeHtml(toRole)}</span>
          <span class="pa-dash-role-item-time">${when}</span>
        </div>
      </div>
      <div class="pa-dash-role-item-actions">
        <button type="button" class="pa-dash-role-approve" data-dash-access-approve="${id}" aria-label="Approve request from ${name}">
          <i class="ri-check-line" aria-hidden="true"></i>
          Approve
        </button>
        <button type="button" class="pa-dash-role-reject" data-dash-access-reject="${id}" aria-label="Reject request from ${name}">
          <i class="ri-close-line" aria-hidden="true"></i>
        </button>
      </div>
    </article>`;
  }
  async function patchReview(id, action) {
    const payload = { action };
    if (action === "approve") payload.durationHours = DEFAULT_DURATION_HOURS;
    const res = await fetch(`/api/admin/access-requests/${encodeURIComponent(id)}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed.");
  }
  function onListClick(e) {
    const approve = e.target.closest("[data-dash-access-approve]");
    const reject = e.target.closest("[data-dash-access-reject]");
    const id = approve?.getAttribute("data-dash-access-approve") || reject?.getAttribute("data-dash-access-reject");
    if (!id) return;
    if (approve) {
      requestBulkAction({
        title: "Approve temporary editor access?",
        message: `Grant <strong>editor</strong> access for <strong>${DEFAULT_DURATION_HOURS} hours</strong> (default). User management stays restricted.`,
        confirmLabel: "Approve",
        danger: false,
        iconClass: "ri-check-line",
        iconTone: "warning",
        onConfirm: async () => {
          try {
            await patchReview(id, "approve");
            showToast("Access approved.", "success");
            await fetchPending();
          } catch (err) {
            showToast(err?.message || "Could not approve.", "danger");
          }
        }
      });
      return;
    }
    requestBulkAction({
      title: "Reject access request?",
      message: "The requester will be notified.",
      confirmLabel: "Reject",
      iconClass: "ri-close-circle-line",
      onConfirm: async () => {
        try {
          await patchReview(id, "reject");
          showToast("Request rejected.", "success");
          await fetchPending();
        } catch (err) {
          showToast(err?.message || "Could not reject.", "danger");
        }
      }
    });
  }
  list.addEventListener("click", onListClick);
  void fetchPending();
  return {
    refresh: fetchPending,
    destroy() {
      list.removeEventListener("click", onListClick);
      list.innerHTML = "";
    }
  };
}

// client/core/optimistic-save.ts
async function optimisticSave({
  apply,
  rollback,
  persist
}) {
  apply();
  try {
    await persist();
  } catch (err) {
    rollback();
    throw err;
  }
}

// client/modules/dashboard/widgets/commentsModerationCard.ts
var EXCERPT_LEN = 200;
var AVATAR_COLORS = ["#3b82f6", "#7c3aed", "#b45309", "#e5484d", "#22c55e", "#38bdf8", "#a78bfa", "#f472b6"];
function commentInitials(name) {
  return (name || "?").split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
function commentAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) hash = hash * 31 + name.charCodeAt(i) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
function setPendingBadge2(badge, count) {
  if (!badge) return;
  const n = Math.max(0, Number(count) || 0);
  if (n > 0) {
    badge.textContent = `${n} pending`;
    badge.removeAttribute("hidden");
  } else {
    badge.setAttribute("hidden", "");
  }
}
function mountCommentsModerationWidget() {
  const caps = getAccessCapabilities();
  if (!caps.canAccessBlogEngagement) return null;
  const widget = document.getElementById("paDashCommentsWidget");
  const list = document.getElementById("paDashCommentsList");
  const empty = document.getElementById("paDashCommentsEmpty");
  const badge = document.getElementById("paDashCommentsBadge");
  const skeleton = document.getElementById("paDashCommentsSkeleton");
  if (!widget || !list) return null;
  widget.removeAttribute("hidden");
  let tab = "pending";
  let items = [];
  let pendingTotal = 0;
  const tabs = widget.querySelectorAll("[data-dash-comment-tab]");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-dash-comment-tab");
      if (!next || next === tab) return;
      tab = next;
      tabs.forEach((el) => {
        const on = el.getAttribute("data-dash-comment-tab") === tab;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-selected", on ? "true" : "false");
      });
      void fetchComments();
    });
  });
  async function fetchPendingTotal() {
    try {
      const res = await fetch("/api/blog-engagement/comments?limit=1&status=pending", {
        credentials: "include",
        headers: { Accept: "application/json" }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return pendingTotal;
      pendingTotal = data.total ?? 0;
      setPendingBadge2(badge, pendingTotal);
      return pendingTotal;
    } catch {
      return pendingTotal;
    }
  }
  async function fetchComments() {
    skeleton?.removeAttribute("hidden");
    empty?.setAttribute("hidden", "");
    list.innerHTML = "";
    const params = new URLSearchParams({ limit: "8" });
    if (tab === "pending") {
      params.set("status", "pending");
    } else {
      params.set("time", "week");
      params.set("status", "all");
    }
    try {
      const [res] = await Promise.all([
        fetch(`/api/blog-engagement/comments?${params}`, {
          credentials: "include",
          headers: { Accept: "application/json" }
        }),
        fetchPendingTotal()
      ]);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not load comments.");
      let rows = Array.isArray(data.items) ? data.items : [];
      if (tab === "recent") {
        rows = rows.filter((c) => c.status === "pending" || c.status === "spam");
      }
      items = rows.slice(0, 8);
      if (tab === "pending") {
        pendingTotal = data.total ?? items.length;
        setPendingBadge2(badge, pendingTotal);
      }
    } catch (err) {
      showToast(err?.message || "Could not load comments.", "danger");
      items = [];
    } finally {
      skeleton?.setAttribute("hidden", "");
      render();
    }
  }
  function render() {
    if (!items.length) {
      list.innerHTML = "";
      empty?.removeAttribute("hidden");
      return;
    }
    empty?.setAttribute("hidden", "");
    list.innerHTML = items.map((c) => renderRow(c)).join("");
  }
  function renderRow(c) {
    const name = c.authorName || "Guest";
    const body = escapeHtml(c.body || "");
    const excerpt = body.length > EXCERPT_LEN ? `${body.slice(0, EXCERPT_LEN)}\u2026` : body;
    const post = escapeHtml(c.postTitle || "Post");
    const when = escapeHtml(timeAgo(c.createdAt) || "");
    const init = escapeHtml(commentInitials(name));
    const avatarBg = commentAvatarColor(name);
    const isSpam = c.status === "spam";
    const spamBtnClass = isSpam ? " is-flagged" : "";
    const rowClass = isSpam ? " is-spam" : "";
    return `<article class="pa-dash-comments-item${rowClass}" data-comment-id="${escapeHtml(c.id)}">
      <div class="pa-dash-comments-item-avatar" style="background:${avatarBg}">${init}</div>
      <div class="pa-dash-comments-item-body">
        <div class="pa-dash-comments-item-head">
          <span class="pa-dash-comments-item-name">${escapeHtml(name)}</span>
          <span class="pa-dash-comments-item-time">\xB7 ${when}</span>
        </div>
        <p class="pa-dash-comments-item-text">${excerpt}</p>
        <p class="pa-dash-comments-item-post">on: <span>${post}</span></p>
      </div>
      <div class="pa-dash-comments-item-actions" role="group" aria-label="Moderate comment">
        <button type="button" class="pa-dash-comments-act-btn" data-dash-comment-action="approve" data-id="${escapeHtml(c.id)}" title="Approve" aria-label="Approve comment">
          <i class="ri-check-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn is-spam${spamBtnClass}" data-dash-comment-action="spam" data-id="${escapeHtml(c.id)}" title="Mark as spam" aria-label="Mark as spam">
          <i class="ri-shield-flash-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn" data-dash-comment-action="hide" data-id="${escapeHtml(c.id)}" title="Hide" aria-label="Hide comment">
          <i class="ri-eye-off-line" aria-hidden="true"></i>
        </button>
        <button type="button" class="pa-dash-comments-act-btn is-delete" data-dash-comment-action="delete" data-id="${escapeHtml(c.id)}" title="Delete" aria-label="Delete comment">
          <i class="ri-delete-bin-line" aria-hidden="true"></i>
        </button>
      </div>
    </article>`;
  }
  const actionStatus = {
    approve: "approved",
    spam: "spam",
    hide: "rejected"
  };
  async function patchStatus(id, status) {
    const res = await fetch("/api/blog-engagement/comments", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ids: [id], status })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Update failed");
    }
  }
  async function deleteComment(id) {
    const res = await fetch("/api/blog-engagement/comments", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id], delete: true })
    });
    if (!res.ok) throw new Error("Delete failed");
  }
  function removeLocal(id) {
    items = items.filter((c) => c.id !== id);
    render();
    if (!items.length) empty?.removeAttribute("hidden");
  }
  async function moderate(id, action) {
    const status = actionStatus[action];
    if (!status) return;
    const prev = items;
    const wasPending = prev.some((c) => c.id === id && c.status === "pending");
    await optimisticSave({
      apply: () => {
        removeLocal(id);
        if (wasPending) {
          pendingTotal = Math.max(0, pendingTotal - 1);
          setPendingBadge2(badge, pendingTotal);
        }
      },
      rollback: () => {
        items = prev;
        render();
        void fetchPendingTotal();
      },
      persist: () => patchStatus(id, status)
    });
    showToast("Comment updated", "success");
  }
  function onListClick(e) {
    const btn = e.target.closest("[data-dash-comment-action]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-dash-comment-action");
    if (!id || !action) return;
    if (action === "delete") {
      requestBulkAction({
        title: "Delete comment?",
        message: "This will permanently remove this comment.",
        confirmLabel: "Delete",
        onConfirm: async () => {
          try {
            const wasPending = items.some((c) => c.id === id && c.status === "pending");
            await deleteComment(id);
            removeLocal(id);
            if (wasPending) {
              pendingTotal = Math.max(0, pendingTotal - 1);
              setPendingBadge2(badge, pendingTotal);
            }
            showToast("Comment removed", "success");
          } catch {
            showToast("Could not delete comment", "danger");
            void fetchComments();
          }
        }
      });
      return;
    }
    void moderate(id, action).catch(() => {
      showToast("Could not update comment", "danger");
      void fetchComments();
    });
  }
  list.addEventListener("click", onListClick);
  void fetchComments();
  return {
    refresh: fetchComments,
    destroy() {
      list.removeEventListener("click", onListClick);
      list.innerHTML = "";
    }
  };
}

// client/modules/dashboard/DashboardModule.ts
var KNOWN_PROJECT_STATUSES = /* @__PURE__ */ new Set([
  "Completed",
  "In Progress",
  "Pending",
  "Draft",
  "On Hold",
  "Cancelled"
]);
var STATUS_BADGE_CLASS = {
  Completed: "completed",
  "In Progress": "in-progress",
  Pending: "pending",
  Draft: "draft",
  "On Hold": "on-hold",
  Cancelled: "cancelled"
};
var PROJECT_STATUS_ORDER = ["Completed", "In Progress", "Pending", "Draft", "On Hold", "Cancelled"];
var TECH_GROUP_ORDER = ["frontend", "backend", "database", "devops", "mobile", "design", "other"];
var PROJECT_CATEGORY_ORDER = Object.keys(CATEGORY_META_PROJECTS);
var TECH_LEVEL_ORDER = ["expert", "advanced", "intermediate", "beginner"];
var THUMB_CLASSES = ["pa-dash-thumb-orange", "pa-dash-thumb-purple", "pa-dash-thumb-pink", "pa-dash-thumb-blue"];
var ACTIVITY_DOT_CLASSES = ["green", "pink", "blue", "cyan"];
var ACTIVITY_TYPE_ICONS = {
  user_action: "ri-user-line",
  system_event: "ri-cpu-line",
  content_change: "ri-file-edit-line",
  other: "ri-more-line"
};
var ACTIVITY_ACTION_ICONS = {
  "user.login": "ri-login-box-line",
  "user.logout": "ri-logout-box-line",
  "user.password.changed": "ri-lock-password-line",
  "user.password.reset": "ri-lock-password-line",
  "user.avatar.updated": "ri-user-line",
  "media.created": "ri-image-add-line",
  "media.updated": "ri-image-edit-line",
  "media.deleted": "ri-image-line",
  "project.created": "ri-code-s-slash-line",
  "blog.created": "ri-article-line",
  "skill.created": "ri-stack-line",
  "experience.created": "ri-briefcase-line",
  "testimonial.created": "ri-chat-quote-line"
};
var CATEGORY_ICONS = {
  enterprise: "ri-building-2-line",
  educational: "ri-graduation-cap-line",
  desktop: "ri-computer-line",
  medical: "ri-heart-pulse-line",
  ecommerce: "ri-shopping-bag-line",
  travel: "ri-flight-takeoff-line",
  web: "ri-globe-line",
  nonprofit: "ri-hand-heart-line"
};
var DEFAULT_ICON = "ri-apps-line";
var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function parseYearMonth(ym) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1);
}
function mondayIndex(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return (d.getDay() + 6) % 7;
}
var DashboardModule = class extends Module {
  constructor() {
    super({ name: "Dashboard" });
    this.projectsYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.overviewPeriod = "month";
    this.statusFilter = "all";
    this.techGroupFilter = "all";
    this.completionCategoryFilter = "all";
    this.techLevelFilter = "all";
    this._expWidget = null;
    this._accessWidget = null;
    this._commentsWidget = null;
  }
  async init() {
    await super.init();
    this.mountDashboardWidgets();
  }
  mountDashboardWidgets() {
    this._expWidget = mountExperienceWidget();
    this._expWidget?.refresh(this.experience);
    this._accessWidget = mountAccessRequestsWidget();
    this._commentsWidget = mountCommentsModerationWidget();
  }
  async reload() {
    await this.load();
    this.render();
    this._expWidget?.refresh(this.experience);
    void this._accessWidget?.refresh();
    void this._commentsWidget?.refresh();
  }
  async load() {
    const [
      projects,
      technologies,
      experience,
      testimonials,
      media,
      tools,
      categoryMeta,
      recentActivities
    ] = await Promise.all([
      storage.get("pa_projects", null),
      storage.get("pa_technologies", null),
      storage.get("pa_experience", null),
      storage.get("pa_testimonials", null),
      storage.get("pa_media_library", null),
      storage.get("pa_tools", null),
      storage.get("pa_category_meta", null),
      storage.get("pa_recent_activities", { activities: [] })
    ]);
    this.projects = projects || [];
    this.technologies = technologies || [];
    this.experience = experience || [];
    this.testimonials = testimonials || [];
    this.media = media || [];
    this.tools = tools || [];
    this.categoryMeta = categoryMeta || {};
    this.recentActivities = recentActivities?.activities || [];
  }
  render() {
    this.populateYearDropdown();
    this.populateStatusDropdown();
    this.populateTechGroupDropdown();
    this.populateCompletionCategoryDropdown();
    this.populateTechLevelDropdown();
    this.renderStatCards();
    this.renderSparklines();
    this.renderRecentProjects();
    this.renderRecentActivity();
    this.renderPortfolioOverview();
    this._scheduleChartRender();
  }
  _scheduleChartRender() {
    void ensureApexChartsLoaded().catch(() => {
    }).then(() => {
      const renderWhenReady = () => {
        if (typeof ApexCharts === "undefined") return false;
        const mounts = document.querySelectorAll(".pa-canvasjs-mount-line, .pa-canvasjs-mount-multiline");
        if (mounts.length > 0) {
          const hasSize = [...mounts].every((el) => {
            const h = el.clientHeight || parseFloat(getComputedStyle(el).height) || 0;
            return h > 0;
          });
          if (!hasSize) return false;
        }
        this._renderCharts();
        return true;
      };
      if (renderWhenReady()) return;
      if (this._chartWaitId) return;
      let attempts = 0;
      const tick = () => {
        if (renderWhenReady()) {
          this._chartWaitId = null;
          return;
        }
        attempts += 1;
        if (attempts < 120) {
          this._chartWaitId = requestAnimationFrame(tick);
        } else {
          this._chartWaitId = null;
          if (typeof ApexCharts !== "undefined") this._renderCharts();
        }
      };
      this._chartWaitId = requestAnimationFrame(tick);
    });
  }
  _renderCharts() {
    this.renderStatusDonut();
    this.renderTechGroupDonut();
    this.renderCompletionGauge();
    this.renderProjectsOverTimeLine();
    this.renderWeeklyActivityChart();
    this.renderTechLevelDonut();
  }
  bindEvents() {
    this.onBus("storage:invalidated", (key) => {
      if (key === "pa_experience") {
        void storage.get("pa_experience", []).then((rows) => {
          this.experience = rows || [];
          this._expWidget?.refresh(this.experience);
        });
      }
    });
    this.onBus("appearance:updated", () => {
      this.renderSparklines();
      this._renderCharts();
      this._expWidget?.refresh(this.experience);
    });
    const yearSelect = $id("dashProjectsYearSelect");
    if (yearSelect) {
      this.on(yearSelect, "change", () => {
        this.projectsYear = Number(yearSelect.value) || (/* @__PURE__ */ new Date()).getFullYear();
        this.renderProjectsOverTimeLine();
      });
    }
    const periodSelect = $id("dashOverviewPeriodSelect");
    if (periodSelect) {
      this.on(periodSelect, "change", () => {
        this.overviewPeriod = periodSelect.value || "month";
        this.renderPortfolioOverview();
      });
    }
    const statusSelect = $id("dashStatusFilterSelect");
    if (statusSelect) {
      this.on(statusSelect, "change", () => {
        this.statusFilter = statusSelect.value || "all";
        this.renderStatusDonut();
      });
    }
    const techGroupSelect = $id("dashTechGroupFilterSelect");
    if (techGroupSelect) {
      this.on(techGroupSelect, "change", () => {
        this.techGroupFilter = techGroupSelect.value || "all";
        this.renderTechGroupDonut();
      });
    }
    const completionCategorySelect = $id("dashCompletionCategorySelect");
    if (completionCategorySelect) {
      this.on(completionCategorySelect, "change", () => {
        this.completionCategoryFilter = completionCategorySelect.value || "all";
        this.renderCompletionGauge();
      });
    }
    const techLevelSelect = $id("dashTechLevelFilterSelect");
    if (techLevelSelect) {
      this.on(techLevelSelect, "change", () => {
        this.techLevelFilter = techLevelSelect.value || "all";
        this.renderTechLevelDonut();
      });
    }
  }
  populateYearDropdown() {
    const select = $id("dashProjectsYearSelect");
    if (!select) return;
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = /* @__PURE__ */ new Set([currentYear]);
    this.projects.forEach((project) => {
      if (!project.createdAt) return;
      const year = new Date(project.createdAt).getFullYear();
      if (!Number.isNaN(year)) years.add(year);
    });
    const sortedYears = [...years].sort((a, b) => b - a);
    if (!sortedYears.includes(this.projectsYear)) {
      this.projectsYear = sortedYears[0] || currentYear;
    }
    select.innerHTML = sortedYears.map((year) => {
      const label = year === currentYear ? `This Year (${year})` : String(year);
      const selected = year === this.projectsYear ? " selected" : "";
      return `<option value="${year}"${selected}>${escapeHtml(label)}</option>`;
    }).join("");
    syncPaSelect(select);
  }
  populateStatusDropdown() {
    const select = $id("dashStatusFilterSelect");
    if (!select) return;
    const fromData = /* @__PURE__ */ new Set();
    this.projects.forEach((project) => {
      if (project.status) fromData.add(project.status);
    });
    const statuses = PROJECT_STATUS_ORDER.filter((status) => fromData.has(status) || KNOWN_PROJECT_STATUSES.has(status));
    fromData.forEach((status) => {
      if (!statuses.includes(status)) statuses.push(status);
    });
    if (this.statusFilter !== "all" && !statuses.includes(this.statusFilter)) {
      this.statusFilter = "all";
    }
    const options = [
      `<option value="all"${this.statusFilter === "all" ? " selected" : ""}>All Statuses</option>`,
      ...statuses.map((status) => {
        const selected = status === this.statusFilter ? " selected" : "";
        return `<option value="${escapeHtml(status)}"${selected}>${escapeHtml(status)}</option>`;
      })
    ];
    select.innerHTML = options.join("");
    syncPaSelect(select);
  }
  populateTechGroupDropdown() {
    const select = $id("dashTechGroupFilterSelect");
    if (!select) return;
    const fromData = /* @__PURE__ */ new Set();
    this.technologies.forEach((tech) => {
      fromData.add(tech.group || "other");
    });
    const groups = TECH_GROUP_ORDER.filter((group) => fromData.has(group) || GROUP_META[group]);
    fromData.forEach((group) => {
      if (!groups.includes(group)) groups.push(group);
    });
    if (this.techGroupFilter !== "all" && !groups.includes(this.techGroupFilter)) {
      this.techGroupFilter = "all";
    }
    const options = [
      `<option value="all"${this.techGroupFilter === "all" ? " selected" : ""}>All Groups</option>`,
      ...groups.map((group) => {
        const label = GROUP_META[group]?.label || group;
        const selected = group === this.techGroupFilter ? " selected" : "";
        return `<option value="${escapeHtml(group)}"${selected}>${escapeHtml(label)}</option>`;
      })
    ];
    select.innerHTML = options.join("");
    syncPaSelect(select);
  }
  getCategoryLabel(catKey) {
    return this.categoryMeta[catKey]?.label || CATEGORY_META_PROJECTS[catKey]?.label || catKey;
  }
  populateCompletionCategoryDropdown() {
    const select = $id("dashCompletionCategorySelect");
    if (!select) return;
    const fromData = /* @__PURE__ */ new Set();
    this.projects.forEach((project) => {
      const keys = Array.isArray(project.catKeys) && project.catKeys.length ? project.catKeys : project.catKey ? [project.catKey] : [];
      keys.forEach((k) => {
        if (k) fromData.add(k);
      });
    });
    const categories = PROJECT_CATEGORY_ORDER.filter((catKey) => fromData.has(catKey) || CATEGORY_META_PROJECTS[catKey]);
    fromData.forEach((catKey) => {
      if (!categories.includes(catKey)) categories.push(catKey);
    });
    Object.keys(this.categoryMeta).forEach((catKey) => {
      if (!categories.includes(catKey)) categories.push(catKey);
    });
    if (this.completionCategoryFilter !== "all" && !categories.includes(this.completionCategoryFilter)) {
      this.completionCategoryFilter = "all";
    }
    const options = [
      `<option value="all"${this.completionCategoryFilter === "all" ? " selected" : ""}>All Categories</option>`,
      ...categories.map((catKey) => {
        const label = this.getCategoryLabel(catKey);
        const selected = catKey === this.completionCategoryFilter ? " selected" : "";
        return `<option value="${escapeHtml(catKey)}"${selected}>${escapeHtml(label)}</option>`;
      })
    ];
    select.innerHTML = options.join("");
    syncPaSelect(select);
  }
  populateTechLevelDropdown() {
    const select = $id("dashTechLevelFilterSelect");
    if (!select) return;
    const fromData = /* @__PURE__ */ new Set();
    this.technologies.forEach((tech) => {
      fromData.add(tech.level || "unrated");
    });
    const levels = TECH_LEVEL_ORDER.filter((level) => fromData.has(level) || LEVEL_META[level]);
    fromData.forEach((level) => {
      if (!levels.includes(level)) levels.push(level);
    });
    if (this.techLevelFilter !== "all" && !levels.includes(this.techLevelFilter)) {
      this.techLevelFilter = "all";
    }
    const options = [
      `<option value="all"${this.techLevelFilter === "all" ? " selected" : ""}>All Levels</option>`,
      ...levels.map((level) => {
        const label = LEVEL_META[level]?.label || level;
        const selected = level === this.techLevelFilter ? " selected" : "";
        return `<option value="${escapeHtml(level)}"${selected}>${escapeHtml(label)}</option>`;
      })
    ];
    select.innerHTML = options.join("");
    syncPaSelect(select);
  }
  getOverviewDateRange(period = this.overviewPeriod) {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    switch (period) {
      case "month":
        return { start: new Date(year, month, 1), end: new Date(year, month + 1, 1) };
      case "last-month":
        return { start: new Date(year, month - 1, 1), end: new Date(year, month, 1) };
      case "quarter": {
        const quarterStart = Math.floor(month / 3) * 3;
        return { start: new Date(year, quarterStart, 1), end: new Date(year, quarterStart + 3, 1) };
      }
      case "year":
        return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) };
      case "all":
      default:
        return null;
    }
  }
  countInRange(records, dateField, range) {
    if (!range) return records.length;
    const start = range.start.getTime();
    const end = range.end.getTime();
    return records.filter((record) => {
      const timestamp = record[dateField] ? new Date(record[dateField]).getTime() : NaN;
      return !Number.isNaN(timestamp) && timestamp >= start && timestamp < end;
    }).length;
  }
  renderStatCards() {
    this.setText("#dashTotalProjects", this.projects.length);
    this.setText("#dashTotalTech", this.technologies.length);
    this.setText("#dashTotalTools", this.tools.length);
    this.setText("#dashTotalTesti", this.testimonials.length);
    this.setText("#dashTotalExp", this.experience.length);
    this.updateStatTrend("dashTrendProjects", this.projects, "createdAt");
    this.updateStatTrend("dashTrendTech", this.technologies, "createdAt");
    this.updateStatTrend("dashTrendTools", this.tools, "createdAt");
    this.updateStatTrend("dashTrendTesti", this.testimonials, "createdAt");
    this.updateStatTrend("dashTrendExp", this.experience, "startDate", true);
  }
  countInMonth(records, dateField, monthOffset = 0, isYearMonth = false) {
    const now = /* @__PURE__ */ new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + monthOffset;
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 1);
    return records.filter((r) => {
      let t;
      if (isYearMonth) {
        const d = parseYearMonth(r[dateField]);
        t = d ? d.getTime() : NaN;
      } else {
        t = r[dateField] ? new Date(r[dateField]).getTime() : NaN;
      }
      return !Number.isNaN(t) && t >= start.getTime() && t < end.getTime();
    }).length;
  }
  monthlySeries(records, dateField, months = 7, isYearMonth = false) {
    const now = /* @__PURE__ */ new Date();
    const series = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const count = records.filter((r) => {
        let t;
        if (isYearMonth) {
          const parsed = parseYearMonth(r[dateField]);
          t = parsed ? parsed.getTime() : NaN;
        } else {
          t = r[dateField] ? new Date(r[dateField]).getTime() : NaN;
        }
        return !Number.isNaN(t) && t >= d.getTime() && t < end.getTime();
      }).length;
      series.push(count);
    }
    return series;
  }
  renderSparkline(containerId, values, color) {
    const el = $id(containerId);
    if (!el) return;
    const w = 80;
    const h = 36;
    const max = Math.max(...values, 1);
    const pts = values.map((v, i) => {
      const x = values.length <= 1 ? w / 2 : i / (values.length - 1) * w;
      const y = h - v / max * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${pts}"/></svg>`;
  }
  toolsSparklineSeries() {
    const total = this.tools.length;
    if (!total) return Array(7).fill(0);
    return Array.from({ length: 7 }, (_, i) => Math.max(1, Math.round(total * (i + 1) / 7)));
  }
  renderSparklines() {
    const sparkSeries = [
      { id: "dashSparkProjects", values: this.monthlySeries(this.projects, "createdAt") },
      { id: "dashSparkTech", values: this.monthlySeries(this.technologies, "createdAt") },
      { id: "dashSparkTools", values: this.toolsSparklineSeries() },
      { id: "dashSparkTesti", values: this.monthlySeries(this.testimonials, "createdAt") },
      { id: "dashSparkExp", values: this.monthlySeries(this.experience, "startDate", 7, true) }
    ];
    const colors = assignSeriesColors(sparkSeries);
    sparkSeries.forEach((series, index) => {
      this.renderSparkline(series.id, series.values, resolveChartColor(colors[index]));
    });
  }
  updateStatTrend(trendId, records, dateField, isYearMonth = false) {
    const changeEl = $id(trendId);
    if (!changeEl) return;
    const current = this.countInMonth(records, dateField, 0, isYearMonth);
    const previous = this.countInMonth(records, dateField, -1, isYearMonth);
    let pct = 0;
    if (previous > 0) pct = Math.round((current - previous) / previous * 100);
    else if (current > 0) pct = 100;
    if (pct > 0) {
      changeEl.className = "pa-dash-stat-change up";
      changeEl.innerHTML = `<i class="ri-arrow-up-line"></i> +${pct}%`;
    } else if (pct < 0) {
      changeEl.className = "pa-dash-stat-change down";
      changeEl.innerHTML = `<i class="ri-arrow-down-line"></i> ${pct}%`;
    } else {
      changeEl.className = "pa-dash-stat-change neutral";
      changeEl.innerHTML = `<i class="ri-subtract-line"></i> 0%`;
    }
  }
  setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = String(value);
  }
  buildDonut(cardEl, segments, centerLabel) {
    if (!cardEl) return;
    const container = $(".pa-donut-canvas", cardEl);
    const legend = $(".pa-donut-legend", cardEl);
    const centerValue = $(".pa-donut-center-value", cardEl);
    const coloredSegments = assignSegmentColors(segments);
    const total = coloredSegments.reduce((sum, seg) => sum + seg.value, 0);
    const safeTotal = total || 1;
    renderDonutChart(container, coloredSegments);
    if (centerValue) centerValue.textContent = centerLabel != null ? centerLabel : total;
    if (legend) {
      legend.innerHTML = coloredSegments.length ? coloredSegments.map((seg) => {
        const pct = Math.round(seg.value / safeTotal * 100);
        const dotColor = resolveChartColor(seg.color);
        return `<div class="pa-donut-legend-item">
          <span class="pa-donut-dot" style="background:${dotColor}"></span>
          <span class="pa-donut-legend-copy">
            <span class="pa-donut-legend-label">${escapeHtml(seg.label)}</span>
            <span class="pa-donut-legend-meta">${seg.value} \xB7 ${pct}%</span>
          </span>
        </div>`;
      }).join("") : `<div class="pa-donut-legend-item pa-donut-legend-item--empty"><span class="pa-donut-legend-label">No data yet</span></div>`;
    }
  }
  renderStatusDonut() {
    const card = $('[data-dash-donut="status"]');
    if (!card) return;
    const statusSelect = $id("dashStatusFilterSelect");
    if (statusSelect && statusSelect.value !== this.statusFilter) {
      statusSelect.value = this.statusFilter;
      syncPaSelect(statusSelect);
    }
    const filteredProjects = this.statusFilter === "all" ? this.projects : this.projects.filter((project) => (project.status || "Unknown") === this.statusFilter);
    const counts = {};
    filteredProjects.forEach((project) => {
      const status = project.status || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });
    const segments = Object.entries(counts).map(([label, value]) => ({ label, value }));
    this.buildDonut(card, segments, filteredProjects.length);
  }
  renderTechGroupDonut() {
    const card = $('[data-dash-donut="tech-group"]');
    if (!card) return;
    const techGroupSelect = $id("dashTechGroupFilterSelect");
    if (techGroupSelect && techGroupSelect.value !== this.techGroupFilter) {
      techGroupSelect.value = this.techGroupFilter;
      syncPaSelect(techGroupSelect);
    }
    const filteredTechnologies = this.techGroupFilter === "all" ? this.technologies : this.technologies.filter((tech) => (tech.group || "other") === this.techGroupFilter);
    const counts = {};
    filteredTechnologies.forEach((tech) => {
      const group = tech.group || "other";
      counts[group] = (counts[group] || 0) + 1;
    });
    const segments = Object.entries(counts).map(([key, value]) => ({
      label: GROUP_META[key]?.label || key,
      value
    }));
    this.buildDonut(card, segments, filteredTechnologies.length);
  }
  renderTechLevelDonut() {
    const card = $('[data-dash-donut="tech-level"]');
    if (!card) return;
    const techLevelSelect = $id("dashTechLevelFilterSelect");
    if (techLevelSelect && techLevelSelect.value !== this.techLevelFilter) {
      techLevelSelect.value = this.techLevelFilter;
      syncPaSelect(techLevelSelect);
    }
    const filteredTechnologies = this.techLevelFilter === "all" ? this.technologies : this.technologies.filter((tech) => (tech.level || "unrated") === this.techLevelFilter);
    const counts = {};
    filteredTechnologies.forEach((tech) => {
      const level = tech.level || "unrated";
      counts[level] = (counts[level] || 0) + 1;
    });
    const keys = Object.keys(counts).sort((a, b) => TECH_LEVEL_ORDER.indexOf(a) - TECH_LEVEL_ORDER.indexOf(b));
    const segments = keys.map((key) => ({
      label: LEVEL_META[key]?.label || key,
      value: counts[key]
    }));
    this.buildDonut(card, segments, filteredTechnologies.length);
    const container = $(".pa-donut-canvas", card);
    if (container) container.setAttribute("aria-label", "Tech by skill level donut chart");
  }
  renderCompletionGauge() {
    const card = $('[data-dash-gauge="projects-completion"]');
    if (!card) return;
    const completionCategorySelect = $id("dashCompletionCategorySelect");
    if (completionCategorySelect && completionCategorySelect.value !== this.completionCategoryFilter) {
      completionCategorySelect.value = this.completionCategoryFilter;
      syncPaSelect(completionCategorySelect);
    }
    const filteredProjects = this.completionCategoryFilter === "all" ? this.projects : this.projects.filter((project) => {
      const keys = Array.isArray(project.catKeys) && project.catKeys.length ? project.catKeys : project.catKey ? [project.catKey] : [];
      return keys.includes(this.completionCategoryFilter);
    });
    const total = filteredProjects.length;
    const completed = filteredProjects.filter((project) => project.status === "Completed").length;
    const pending = Math.max(0, total - completed);
    const pct = total ? Math.round(completed / total * 100) : 0;
    const tone = total === 0 ? "neutral" : pct >= 80 ? "excellent" : pct >= 50 ? "good" : "low";
    const toneMeta = {
      neutral: { color: "var(--pa-text-faint)", label: "No projects yet" },
      excellent: { color: "var(--pa-green)", label: "Excellent progress" },
      good: { color: "var(--pa-web)", label: "Good progress" },
      low: { color: getAccentCssVar(), label: "Needs attention" }
    }[tone];
    card.setAttribute("data-gauge-tone", tone);
    const container = $(".pa-gauge-canvas", card);
    const gaugeColor = pct > 0 ? getAccentCssVar() : toneMeta.color;
    renderProjGaugeChart(container, pct, gaugeColor);
    if (container) container.setAttribute("aria-label", `Projects completion rate gauge showing ${pct} percent`);
    const valueEl = $id("dashCompletionGaugeValue");
    if (valueEl) valueEl.textContent = `${pct}%`;
    const badgeEl = $id("dashCompletionGaugeBadge");
    if (badgeEl) badgeEl.textContent = toneMeta.label;
    const completedEl = $id("dashCompletionGaugeCompleted");
    if (completedEl) completedEl.textContent = String(completed);
    const pendingEl = $id("dashCompletionGaugePending");
    if (pendingEl) pendingEl.textContent = String(pending);
  }
  renderPortfolioOverview() {
    const range = this.getOverviewDateRange();
    const periodSelect = $id("dashOverviewPeriodSelect");
    if (periodSelect && periodSelect.value !== this.overviewPeriod) {
      periodSelect.value = this.overviewPeriod;
      syncPaSelect(periodSelect);
    }
    this.setText("#dashOverviewProjects", this.countInRange(this.projects, "createdAt", range));
    this.setText("#dashOverviewTech", this.countInRange(this.technologies, "createdAt", range));
    this.setText("#dashOverviewMedia", this.countInRange(this.media, "uploadedAt", range));
    this.setText("#dashOverviewTesti", this.countInRange(this.testimonials, "createdAt", range));
  }
  formatActivityTime(iso) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      return `${date} \u2022 ${time}`;
    } catch {
      return "";
    }
  }
  renderProjectsOverTimeLine() {
    const card = $(".pa-line-chart-card");
    const container = card ? $(".pa-canvasjs-mount-line", card) : null;
    if (!container) return;
    const now = /* @__PURE__ */ new Date();
    const year = this.projectsYear || now.getFullYear();
    const isCurrentYear = year === now.getFullYear();
    const monthsCount = isCurrentYear ? now.getMonth() + 1 : 12;
    const monthly = [];
    for (let m = 0; m < monthsCount; m++) {
      const monthStart = new Date(year, m, 1);
      const monthEnd = new Date(year, m + 1, 1);
      const count = this.projects.filter((project) => {
        if (!project.createdAt) return false;
        const created = new Date(project.createdAt);
        if (Number.isNaN(created.getTime())) return false;
        return created >= monthStart && created < monthEnd;
      }).length;
      monthly.push({ label: MONTH_NAMES[m], y: count });
    }
    renderAreaChart(container, monthly, getAccentCssVar());
    const firstLabel = monthly[0]?.label || MONTH_NAMES[0];
    const lastLabel = monthly[monthly.length - 1]?.label || firstLabel;
    container.setAttribute("aria-label", `Projects added in ${year} from ${firstLabel} to ${lastLabel}`);
  }
  renderWeeklyActivityChart() {
    const card = $(".pa-multiline-chart-card");
    const container = card ? $(".pa-canvasjs-mount-multiline", card) : null;
    if (!container) return;
    const projCounts = new Array(7).fill(0);
    const mediaCounts = new Array(7).fill(0);
    const testiCounts = new Array(7).fill(0);
    this.projects.forEach((p) => {
      const i = mondayIndex(p.createdAt);
      if (i != null) projCounts[i]++;
    });
    this.media.forEach((m) => {
      const i = mondayIndex(m.uploadedAt);
      if (i != null) mediaCounts[i]++;
    });
    this.testimonials.forEach((t) => {
      const i = mondayIndex(t.createdAt);
      if (i != null) testiCounts[i]++;
    });
    const toPoints = (counts) => counts.map((y, i) => ({ label: DAY_NAMES[i], y }));
    const seriesDefs = [
      { name: "Projects", points: toPoints(projCounts) },
      { name: "Media", points: toPoints(mediaCounts) },
      { name: "Testimonials", points: toPoints(testiCounts) }
    ];
    const colors = assignSeriesColors(seriesDefs);
    renderMultiLineChart(container, seriesDefs.map((def, index) => ({
      ...def,
      color: colors[index]
    })));
  }
  renderRecentProjects() {
    const container = $id("dashRecentProjects");
    if (!container) return;
    const sorted = this.projects.slice().sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (db !== da) return db - da;
      return (b.id || 0) - (a.id || 0);
    });
    const top = sorted.slice(0, 4);
    if (top.length === 0) {
      container.innerHTML = `<div class="pa-dash-recent-sub">No projects yet.</div>`;
      return;
    }
    container.innerHTML = top.map((p, i) => {
      const thumbClass = THUMB_CLASSES[i % THUMB_CLASSES.length];
      const icon = CATEGORY_ICONS[p.catKey] || DEFAULT_ICON;
      const catLabel = this.categoryMeta[p.catKey]?.label || CATEGORY_META_PROJECTS[p.catKey]?.label || p.catKey || "";
      const badgeClass = STATUS_BADGE_CLASS[p.status] || "draft";
      const meta = p.createdAt ? formatDate(p.createdAt) : "\u2014";
      const statusLabel = (p.status || "\u2014").toUpperCase();
      return `<div class="pa-dash-recent-project">
        <div class="pa-dash-recent-thumb ${thumbClass}">
          <div class="pa-dash-thumb-icon"><i class="${icon}"></i></div>
        </div>
        <div class="pa-dash-recent-info">
          <div class="pa-dash-recent-title">${escapeHtml(p.title || "Untitled")}</div>
          <div class="pa-dash-recent-sub">${escapeHtml(catLabel)}</div>
        </div>
        <span class="pa-dash-recent-badge ${badgeClass}">${escapeHtml(statusLabel)}</span>
        <div class="pa-dash-recent-meta">${escapeHtml(meta)}</div>
      </div>`;
    }).join("");
  }
  activityIcon(activity) {
    const action = activity?.metadata?.action;
    if (action && ACTIVITY_ACTION_ICONS[action]) return ACTIVITY_ACTION_ICONS[action];
    return ACTIVITY_TYPE_ICONS[activity?.type] || ACTIVITY_TYPE_ICONS.other;
  }
  renderRecentActivity() {
    const container = $id("dashRecentActivity");
    if (!container) return;
    const top = (this.recentActivities || []).slice(0, 5);
    if (top.length === 0) {
      container.className = "pa-dash-activity-timeline";
      container.innerHTML = `<div class="pa-dash-recent-sub">No recent activity yet.</div>`;
      return;
    }
    container.className = "pa-dash-activity-timeline";
    container.innerHTML = top.map((item, index) => {
      const dotClass = ACTIVITY_DOT_CLASSES[index % ACTIVITY_DOT_CLASSES.length];
      const time = escapeHtml(this.formatActivityTime(item.createdAt) || timeAgo(item.createdAt));
      const isLast = index === top.length - 1;
      const icon = this.activityIcon(item);
      const label = item.actionTitle || "Activity";
      const title = item.actionDescription || item.userName || "";
      return `<div class="pa-dash-activity-item${isLast ? " is-last" : ""}">
        <div class="pa-dash-activity-rail" aria-hidden="true">
          <span class="pa-dash-activity-dot ${dotClass}"></span>
          ${isLast ? "" : '<span class="pa-dash-activity-line"></span>'}
        </div>
        <div class="pa-dash-activity-icon-wrap"><i class="${icon}"></i></div>
        <div class="pa-dash-activity-body">
          <div class="pa-dash-activity-label">${escapeHtml(label)}</div>
          <div class="pa-dash-activity-title">${escapeHtml(title)}</div>
        </div>
        <div class="pa-dash-activity-time">${time}</div>
      </div>`;
    }).join("");
  }
  destroy() {
    if (this._chartWaitId) {
      cancelAnimationFrame(this._chartWaitId);
      this._chartWaitId = null;
    }
    this._expWidget?.destroy();
    this._accessWidget?.destroy();
    this._commentsWidget?.destroy();
    this._expWidget = null;
    this._accessWidget = null;
    this._commentsWidget = null;
    document.querySelectorAll(".pa-donut-canvas, .pa-gauge-canvas, .pa-canvasjs-mount-line, .pa-canvasjs-mount-multiline").forEach((el) => destroyChart(el));
    super.destroy();
  }
};
export {
  DashboardModule
};
//# sourceMappingURL=DashboardModule-5VNEHCHS.js.map
