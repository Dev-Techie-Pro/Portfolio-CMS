// @ts-nocheck
/** Static shell; sidebar is personalized server-side (`personalizePageHtml`). */
export const BODY_HTML = `<div class="pa-toast-wrap" id="paToastWrap" role="status" aria-live="polite"></div>
<div class="pa-confirm-overlay" id="paConfirmOverlay">
  <div class="pa-confirm-box" role="alertdialog" aria-modal="true" aria-labelledby="paConfirmTitle">
    <div class="pa-confirm-icon"><i class="ri-delete-bin-line"></i></div>
    <div class="pa-confirm-title" id="paConfirmTitle">Confirm</div>
    <div class="pa-confirm-text" id="paConfirmText"></div>
    <div class="pa-confirm-actions">
      <button class="pa-btn pa-btn-cancel flex-1" id="paConfirmCancel">Cancel</button>
      <button class="pa-btn pa-btn-primary flex-1" id="paConfirmOk">Confirm</button>
    </div>
  </div>
</div>
<div class="pa-panel-overlay" id="paPanelOverlay"></div>
<div class="pa-sidebar-overlay" id="paSidebarOverlay"></div>
<div class="pa-shell">
  <aside class="pa-sidebar" id="paSidebar"></aside>
  <div class="pa-main">
    <header class="pa-header">
      <div class="pa-header-top">
        <div class="pa-header-top-left">
          <div class="pa-search" id="paSearchWrap">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="Search icons…" id="paSearchInput" aria-label="Search icons" / name="paSearchInput">
            <button class="pa-search-clear" id="paSearchClear" aria-label="Clear search">
              <i class="ri-close-line"></i>
            </button>
            <span class="pa-search-kbd">⌘K</span>
          </div>
        </div>
        <div class="pa-header-top-right pa-header-right">
          <div class="pa-notif-wrap" id="paNotifWrap">
            <div class="pa-notif" id="paNotifBtn" tabindex="0" role="button" aria-label="Notifications" title="Notifications">
              <i class="ri-notification-3-line"></i>
              <span class="pa-notif-badge" id="paNotifBadge"></span>
            </div>
            <div class="pa-notif-dropdown" id="paNotifDropdown">
              <div class="pa-notif-dropdown-head">
                <span>Notifications</span>
                <button class="pa-notif-clear-btn" id="paNotifClearBtn">Clear all</button>
              </div>
              <div class="pa-notif-list" id="paNotifList"></div>
            </div>
          </div>
          <div class="pa-custom-toggle-wrap">
            <button class="pa-custom-toggle" id="paCustomToggle" title="Appearance Settings" aria-label="Open appearance settings">
              <i class="ri-palette-line"></i>
            </button>
          </div>
          <span class="pa-header-divider" aria-hidden="true"></span>
          <div class="pa-user-menu-wrap" id="paUserMenuWrap">
            <button type="button" class="pa-user pa-header-user" id="paUserMenu" aria-label="User menu" aria-haspopup="true" aria-expanded="false">
              <div class="pa-avatar" id="paUserMenuAvatar"><i class="ri-user-3-fill"></i></div>
              <div class="pa-user-info">
                <div class="pa-user-name">Staff</div>
                <div class="pa-user-role">admin</div>
              </div>
              <i class="ri-arrow-down-s-line pa-user-menu-chevron" aria-hidden="true"></i>
            </button>
            <div class="pa-user-dropdown" id="paUserDropdown" role="menu" aria-label="User menu">
              <div class="pa-user-dropdown-head">
                <button type="button" class="pa-user-dropdown-avatar" id="paUserDropdownAvatar" title="Change profile photo" aria-label="Change profile photo">
                  <div class="pa-avatar"><i class="ri-user-3-fill"></i></div>
                  <span class="pa-user-dropdown-avatar-edit"><i class="ri-camera-line"></i></span>
                </button>
                <div class="pa-user-dropdown-identity">
                  <div class="pa-user-name">Staff</div>
                  <div class="pa-user-role">admin</div>
                  <div class="pa-user-email pa-user-dropdown-email"></div>
                </div>
              </div>
              <div class="pa-user-dropdown-divider"></div>
              <a href="/admin/settings/profile" class="pa-user-dropdown-item" role="menuitem"><i class="ri-user-line"></i> My Profile</a>
              <a href="/admin/settings/general" class="pa-user-dropdown-item" role="menuitem"><i class="ri-settings-3-line"></i> Settings</a>
              <a href="/admin/settings/security" class="pa-user-dropdown-item" role="menuitem"><i class="ri-shield-keyhole-line"></i> Security</a>
              <a href="/admin/recent-activities" class="pa-user-dropdown-item" role="menuitem"><i class="ri-history-line"></i> Recent Activities</a>
              <button type="button" class="pa-user-dropdown-item pa-admin-only-item" id="paAddUserMenuBtn" role="menuitem" hidden><i class="ri-user-add-line"></i> Add User</button>
              <div class="pa-user-dropdown-divider"></div>
              <button type="button" class="pa-user-dropdown-item danger" id="paUserDropdownLogout" role="menuitem"><i class="ri-logout-circle-line"></i> Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="pa-body" id="paIconRegistryBody">
      <div class="pa-header-page">
        <div class="pa-header-page-left">
          <button class="pa-mobile-toggle" id="paMobileToggle" aria-label="Toggle menu"><i class="ri-menu-line"></i></button>
          <div class="pa-header-title-block">
            <span class="pa-header-accent" aria-hidden="true"></span>
            <div class="pa-header-left">
              <div class="pa-page-title">Icon Manager</div>
              <div class="pa-page-subtitle">Edit icons below; each save writes to site settings and updates the public site (hard refresh may be needed).</div>
            </div>
          </div>
        </div>
        <div class="pa-header-page-right">
          <button class="pa-btn pa-btn-primary" type="button" id="paIconRegistrySaveBtn"><i class="ri-save-line"></i> <span>Save</span></button>
          <button class="pa-btn-add" type="button" id="paIconRegistryAddBtn"><i class="ri-add-line"></i> <span>Add icon</span></button>
        </div>
      </div>

      <div class="pa-toolbar pa-cat-toolbar">
        <div class="pa-view-toggle pa-cat-view-toggle" role="group" aria-label="View mode">
          <button class="pa-view-btn active" id="paListViewBtn" title="List view" aria-label="List view"><i class="ri-list-unordered"></i></button><button class="pa-view-btn" id="paGridViewBtn" title="Grid view" aria-label="Grid view"><i class="ri-layout-grid-fill"></i></button>
        </div>
        <select class="pa-filter-select" id="paIconRegistrySort" aria-label="Sort icons" name="paIconRegistrySort">
          <option value="label">Sort: Label A–Z</option>
          <option value="key">Sort: Key A–Z</option>
          <option value="custom">Sort: Custom order</option>
        </select>
        <div class="pa-toolbar-spacer"></div>
        <div class="pa-result-count" id="paIconRegistryCount"></div>
      </div>

      <div class="pa-grid pa-cat-grid" id="paIconRegistryGrid" aria-live="polite" aria-label="Icon registry"></div>
      <div class="pa-pagination" id="paIconRegistryPagination">
        <div class="pa-pagination-btns" id="paIconRegistryPaginationBtns"></div>
        <div class="pa-pagination-info" id="paIconRegistryPaginationInfo"></div>
      </div>
    </div>
  </div>
</div>`;
