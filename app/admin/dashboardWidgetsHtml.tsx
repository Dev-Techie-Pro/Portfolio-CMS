// @ts-nocheck
/** Dashboard widget shells — mounted by client/modules/dashboard/widgets/*.ts */
export const DASHBOARD_EXPERIENCE_WIDGET_HTML = `
        <section class="pa-exp-overview" id="paDashExpWidget" aria-labelledby="paDashExpTitle">
          <header class="pa-exp-overview-head">
            <div class="pa-exp-overview-head-text">
              <h2 class="pa-exp-overview-title" id="paDashExpTitle">Experience Overview</h2>
              <p class="pa-exp-overview-sub">Your career timeline at a glance</p>
            </div>
            <a href="/experience" class="pa-exp-overview-manage">
              <i class="ri-arrow-right-line" aria-hidden="true"></i>
              Manage Experience
            </a>
          </header>
          <div class="pa-exp-overview-stats" id="paDashExpMiniStats" aria-live="polite"></div>
          <div class="pa-exp-overview-panels" id="paDashExpPanels">
            <div class="pa-exp-overview-panel pa-exp-overview-panel--timeline">
              <div class="pa-exp-overview-panel-head">
                <div>
                  <div class="pa-exp-overview-panel-title">Career Timeline</div>
                  <div class="pa-exp-overview-panel-sub">Hover a bar for role details</div>
                </div>
                <div class="pa-exp-overview-seg" role="tablist" aria-label="Timeline view">
                  <button type="button" class="pa-exp-overview-seg-btn is-active" data-exp-timeline-mode="timeline" role="tab" aria-selected="true">Timeline</button>
                  <button type="button" class="pa-exp-overview-seg-btn" data-exp-timeline-mode="year" role="tab" aria-selected="false">By Year</button>
                </div>
              </div>
              <div class="pa-exp-overview-timeline-scroll">
                <div class="pa-exp-overview-timeline" id="paDashExpGantt" role="img" aria-label="Career timeline chart"></div>
              </div>
              <div class="pa-exp-overview-legend" id="paDashExpTypeLegend" aria-hidden="true"></div>
            </div>
            <div class="pa-exp-overview-panel pa-exp-overview-panel--donut">
              <div class="pa-exp-overview-panel-head">
                <div class="pa-exp-overview-panel-title" id="paDashExpDonutLabel">Time by Company</div>
                <div class="pa-exp-overview-seg" role="tablist" aria-label="Duration breakdown">
                  <button type="button" class="pa-exp-overview-seg-btn is-active" data-exp-donut-mode="company" role="tab" aria-selected="true">Company</button>
                  <button type="button" class="pa-exp-overview-seg-btn" data-exp-donut-mode="type" role="tab" aria-selected="false">Type</button>
                </div>
              </div>
              <div class="pa-exp-overview-donut-wrap">
                <div class="pa-donut-body pa-exp-overview-donut-body">
                  <div class="pa-donut-svg-wrap pa-exp-overview-donut-ring">
                    <div class="pa-donut-canvas" id="paDashExpDonutMount" role="img" aria-label="Experience duration breakdown"></div>
                    <div class="pa-donut-center">
                      <div class="pa-donut-center-value" id="paDashExpDonutTotal">0</div>
                      <div class="pa-donut-center-label">total</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pa-exp-overview-donut-legend" id="paDashExpDonutLegend"></div>
            </div>
          </div>
          <div class="pa-dash-widget-empty pa-exp-overview-empty" id="paDashExpEmpty" hidden>
            <i class="ri-briefcase-line" aria-hidden="true"></i>
            <p>No experience entries yet.</p>
            <a href="/experience" class="pa-btn pa-btn-primary pa-btn-sm">Add experience</a>
          </div>
          <div class="pa-dash-widget-skeleton pa-exp-overview-skeleton" id="paDashExpSkeleton" aria-hidden="true"></div>
        </section>`;

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
