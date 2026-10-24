// @ts-nocheck
import { BODY_HTML_PREFIX, BODY_HTML_SUFFIX } from './bodyHtmlParts';
import {
  DASHBOARD_EXPERIENCE_WIDGET_HTML,
  DASHBOARD_QUICK_WIDGETS_ROW_HTML,
} from './dashboardWidgetsHtml';

function injectDashboardWidgets(suffix: string): string {
  const afterStats =
    'id="dashSparkExp" aria-hidden="true"></div>\n          </div>\n        </div>\n\n        ';
  let html = suffix;
  const statsIdx = html.indexOf(afterStats);
  if (statsIdx >= 0) {
    const insertAt = statsIdx + afterStats.length;
    html =
      html.slice(0, insertAt) +
      DASHBOARD_EXPERIENCE_WIDGET_HTML +
      '\n\n        ' +
      html.slice(insertAt);
  }

  const bottomMarker = '        <div class="pa-dash-bottom-grid pa-dash-bottom-grid--3">';
  const bottomIdx = html.indexOf(bottomMarker);
  if (bottomIdx >= 0) {
    html =
      html.slice(0, bottomIdx) +
      DASHBOARD_QUICK_WIDGETS_ROW_HTML +
      '\n\n        ' +
      html.slice(bottomIdx);
  }
  return html;
}

/** `__PORTFOLIO_PUBLIC_URL__` is resolved per request in `personalizePageHtml`. */
export const BODY_HTML = BODY_HTML_PREFIX + injectDashboardWidgets(BODY_HTML_SUFFIX);
