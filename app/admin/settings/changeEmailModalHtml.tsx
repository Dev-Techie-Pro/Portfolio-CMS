// @ts-nocheck
export const CHANGE_EMAIL_MODAL_HTML = `<div class="pa-invite-link-overlay" id="profileChangeEmailOverlay" aria-hidden="true">
  <div class="pa-invite-link-dialog" role="dialog" aria-modal="true" aria-labelledby="profileChangeEmailTitle">
    <button type="button" class="pa-invite-link-close" id="profileChangeEmailClose" aria-label="Close"><i class="ri-close-line"></i></button>
    <div class="pa-invite-link-icon"><i class="ri-mail-line"></i></div>
    <h2 class="pa-invite-link-title" id="profileChangeEmailTitle">Change login email</h2>
    <p class="pa-invite-link-text">Enter your new address and current password. We will send confirmation links to your current and new email. Your login updates after you confirm both.</p>
    <p class="pa-invite-link-status pa-text-mute fs-sm" id="profileChangeEmailStatus" style="display:none" role="status"></p>
    <div class="pa-form-group">
      <label class="pa-form-label" for="profileNewEmail">New email address</label>
      <input class="pa-form-input" type="email" id="profileNewEmail" autocomplete="email" />
    </div>
    <div class="pa-form-group">
      <label class="pa-form-label" for="profileChangeEmailPassword">Current password</label>
      <input class="pa-form-input" type="password" id="profileChangeEmailPassword" autocomplete="current-password" />
    </div>
    <div class="pa-invite-link-actions">
      <button type="button" class="pa-btn pa-btn-secondary flex" id="profileChangeEmailCancel">Cancel</button>
      <button type="button" class="pa-btn pa-btn-primary flex" id="profileChangeEmailSubmit">Send verification</button>
    </div>
  </div>
</div>`;
