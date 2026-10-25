// @ts-nocheck
/** Social link platform picker — same overlay stack as Remix icon picker (`pa-icon-picker-*`). */
export const SOCIAL_PLATFORM_PICKER_HTML = `<div class="pa-icon-picker-overlay" id="paSocialPlatformPicker" inert aria-hidden="true">
  <div class="pa-icon-picker-modal pa-social-platform-picker-modal" id="paSocialPlatformPickerModal" role="dialog" aria-modal="true" aria-labelledby="paSocialPlatformPickerTitle">
    <div class="pa-icon-picker-head">
      <h3 class="pa-icon-picker-title" id="paSocialPlatformPickerTitle">Choose social icon</h3>
      <button type="button" class="pa-icon-picker-close" id="paSocialPlatformPickerClose" data-close aria-label="Close"><i class="ri-close-line"></i></button>
    </div>
    <div class="pa-icon-picker-body pa-social-platform-picker-body">
      <div class="pa-social-platform-grid" id="paSocialPlatformPickerGrid" role="listbox" aria-label="Social platforms"></div>
    </div>
    <div class="pa-icon-picker-foot pa-icon-picker-footer">
      <button type="button" class="pa-btn pa-btn-cancel" id="paSocialPlatformPickerCancel" data-close>Cancel</button>
    </div>
  </div>
</div>
`;
