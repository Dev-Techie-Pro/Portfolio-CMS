// @ts-nocheck
/** Dashboard widget shells — mounted by client/modules/dashboard/widgets/*.ts */
export const DASHBOARD_EXPERIENCE_WIDGET_HTML = `
        <div class="pa-dash-widget pa-dash-widget--experience pa-dash-chart pa-card-no-hover" id="paDashExpWidget">
          <div class="pa-dash-chart-head">
            <div class="pa-dash-chart-head-text">
              <span class="pa-dash-chart-title">Career timeline</span>
              <span class="pa-dash-chart-sub">Experience overview</span>
            </div>
            <a href="/experience" class="pa-dash-view-all">Manage</a>
          </div>
          <div class="pa-dash-exp-mini-stats" id="paDashExpMiniStats" aria-live="polite"></div>
          <div class="pa-dash-exp-body">
            <div class="pa-dash-exp-gantt-wrap">
              <div class="pa-dash-exp-gantt" id="paDashExpGantt" role="img" aria-label="Career timeline chart"></div>
            </div>
            <div class="pa-dash-exp-secondary">
              <div class="pa-dash-exp-secondary-head">
                <span class="pa-dash-chart-sub" id="paDashExpDonutLabel">Duration by company</span>
                <div class="pa-dash-exp-toggle" role="tablist" aria-label="Duration breakdown">
                  <button type="button" class="pa-dash-exp-toggle-btn is-active" data-exp-donut-mode="company" role="tab" aria-selected="true">Company</button>
                  <button type="button" class="pa-dash-exp-toggle-btn" data-exp-donut-mode="type" role="tab" aria-selected="false">Type</button>
                </div>
              </div>
              <div class="pa-donut-body pa-dash-exp-donut-body">
                <div class="pa-donut-svg-wrap">
                  <div class="pa-donut-canvas" id="paDashExpDonutMount" role="img" aria-label="Experience duration breakdown"></div>
                  <div class="pa-donut-center">
                    <div class="pa-donut-center-value" id="paDashExpDonutTotal">0</div>
                    <div class="pa-donut-center-label">Months</div>
                  </div>
                </div>
                <div class="pa-donut-legend" id="paDashExpDonutLegend"></div>
              </div>
            </div>
          </div>
          <div class="pa-dash-widget-empty" id="paDashExpEmpty" hidden>
            <i class="ri-briefcase-line" aria-hidden="true"></i>
            <p>No experience entries yet.</p>
            <a href="/experience" class="pa-btn pa-btn-primary pa-btn-sm">Add experience</a>
          </div>
          <div class="pa-dash-widget-skeleton" id="paDashExpSkeleton" aria-hidden="true"></div>
        </div>`;

export const DASHBOARD_QUICK_WIDGETS_ROW_HTML = `
        <div class="pa-dash-quick-row">
          <div class="pa-dash-panel pa-dash-quick-card pa-card-no-hover pa-admin-only-item" id="paDashAccessWidget" hidden>
            <div class="pa-dash-recent-header">
              <div class="pa-dash-chart-head-text">
                <span class="pa-dash-recent-title">Access requests</span>
                <span class="pa-dash-chart-sub">Temporary editor access</span>
              </div>
              <span class="pa-dash-widget-badge" id="paDashAccessBadge" hidden>0</span>
              <a href="/access-requests" class="pa-dash-view-all">View all</a>
            </div>
            <div class="pa-dash-quick-list" id="paDashAccessList" aria-live="polite"></div>
            <div class="pa-dash-widget-empty" id="paDashAccessEmpty" hidden>
              <i class="ri-shield-user-line" aria-hidden="true"></i>
              <p>No pending requests</p>
            </div>
            <div class="pa-dash-widget-skeleton pa-dash-widget-skeleton--short" id="paDashAccessSkeleton" aria-hidden="true"></div>
          </div>
          <div class="pa-dash-panel pa-dash-quick-card pa-card-no-hover pa-editor-only-item" id="paDashCommentsWidget" hidden>
            <div class="pa-dash-recent-header">
              <div class="pa-dash-chart-head-text">
                <span class="pa-dash-recent-title">Comment moderation</span>
                <span class="pa-dash-chart-sub">Review blog comments</span>
              </div>
              <span class="pa-dash-widget-badge" id="paDashCommentsBadge" hidden>0</span>
              <a href="/blog-engagement" class="pa-dash-view-all">View all</a>
            </div>
            <div class="pa-dash-quick-tabs" role="tablist" aria-label="Comment filter">
              <button type="button" class="pa-dash-quick-tab is-active" data-dash-comment-tab="pending" role="tab" aria-selected="true">Pending</button>
              <button type="button" class="pa-dash-quick-tab" data-dash-comment-tab="recent" role="tab" aria-selected="false">All new</button>
            </div>
            <div class="pa-dash-quick-list" id="paDashCommentsList" aria-live="polite"></div>
            <div class="pa-dash-widget-empty" id="paDashCommentsEmpty" hidden>
              <i class="ri-chat-smile-3-line" aria-hidden="true"></i>
              <p>No comments to review</p>
            </div>
            <div class="pa-dash-widget-skeleton pa-dash-widget-skeleton--short" id="paDashCommentsSkeleton" aria-hidden="true"></div>
          </div>
        </div>`;
