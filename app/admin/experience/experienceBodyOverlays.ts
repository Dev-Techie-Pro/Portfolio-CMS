// @ts-nocheck
export const EXPERIENCE_BODY_OVERLAYS_HTML = `<div class="pa-toast-wrap" id="paToastWrap" role="status" aria-live="polite"></div>

<div class="pa-confirm-overlay" id="paConfirmOverlay">
  <div class="pa-confirm-box" role="alertdialog" aria-modal="true" aria-labelledby="paConfirmTitle">
    <div class="pa-confirm-icon"><i class="ri-delete-bin-line"></i></div>
    <div class="pa-confirm-title" id="paConfirmTitle">Delete experience?</div>
    <div class="pa-confirm-text" id="paConfirmText">This will permanently remove this experience entry. This action cannot be undone.</div>
    <div class="pa-confirm-actions">
      <button class="pa-btn pa-btn-cancel flex-1" id="paConfirmCancel" >Cancel</button>
      <button class="pa-btn pa-btn-primary flex-1 pa-red" id="paConfirmOk">Delete</button>
    </div>
  </div>
</div>

<div class="pa-panel-overlay" id="paPanelOverlay"></div>
<div class="pa-sidebar-overlay" id="paSidebarOverlay"></div>

`;
