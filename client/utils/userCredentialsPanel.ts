// @ts-nocheck
import { $id } from './dom.js';
import { showToast } from '../modules/shell/toast.js';
import { closePanels, openPanel, registerPanel } from '../modules/shell/panels.js';
import { formatStaffRoleLabel } from './staffRoles.js';

let lastCredentials = null;
let panelBound = false;

function hitControl(target, id) {
  if (!target) return false;
  if (target.id === id) return true;
  return typeof target.closest === 'function' && !!target.closest(`#${id}`);
}

export function initUserCredentialsPanel() {
  if (panelBound) return;
  panelBound = true;
  registerPanel('paUserCredentialsPanel');

  document.addEventListener('click', (e) => {
    if (hitControl(e.target, 'paUserCredentialsPanelClose')) {
      e.preventDefault();
      closePanels();
      clearUserCredentials();
      return;
    }
    if (hitControl(e.target, 'paCopyCredentialsBtn')) {
      e.preventDefault();
      void copyUserCredentials();
      return;
    }
    if (hitControl(e.target, 'paShareCredentialsBtn')) {
      e.preventDefault();
      void shareUserCredentials();
    }
  });
}

export function getLastUserCredentials() {
  return lastCredentials;
}

export function clearUserCredentials() {
  lastCredentials = null;
}

function credentialSecretLine(credentials) {
  if (credentials?.setPasswordUrl) {
    return `Set password: ${credentials.setPasswordUrl}`;
  }
  return `Password: ${credentials.password || ''}`;
}

export function formatUserCredentialsText(credentials = lastCredentials) {
  if (!credentials) return '';
  return [
    'Portfolio Dashboard Login',
    `Email: ${credentials.email}`,
    credentialSecretLine(credentials),
    `Role: ${formatStaffRoleLabel(credentials.role)}`,
  ].join('\n');
}

export function showUserCredentialsPanel(credentials, { closePanelIds = [], emailSent, emailError } = {}) {
  if (!credentials) return;
  lastCredentials = credentials;
  const set = (id, value) => {
    const el = $id(id);
    if (el) el.value = value;
  };
  set('credEmail', credentials.email || '');
  const secretValue = credentials.setPasswordUrl || credentials.password || '';
  set('credPassword', secretValue);
  const passwordLabel = document.querySelector('label[for="credPassword"]');
  if (passwordLabel) {
    passwordLabel.textContent = credentials.setPasswordUrl
      ? 'Set password link'
      : 'Temporary password';
  }
  set('credRole', formatStaffRoleLabel(credentials.role));
  const title = $id('paUserCredentialsPanelTitle');
  if (title) {
    title.textContent = credentials.reset ? 'Reset Credentials' : 'User Credentials';
  }
  const hint = $id('paUserCredentialsPanel')?.querySelector('.pa-panel-body .pa-text-mute');
  if (hint) {
    const linkFlow = !!credentials.setPasswordUrl;
    const baseHint = credentials.reset
      ? linkFlow
        ? 'A new password setup link was generated. Share it securely with the user.'
        : 'A new temporary password was generated. Share these credentials securely with the user.'
      : linkFlow
        ? 'Share the setup link securely. The user sets their password before signing in.'
        : 'Share these credentials securely with the new user. They should change their password after first login.';
    if (emailSent === true) {
      hint.textContent = `${baseHint} Login credentials were emailed to ${credentials.email || 'the user'}.`;
    } else if (emailSent === false && emailError) {
      hint.textContent = `${baseHint} Email could not be sent automatically (${emailError}). Use copy or share below.`;
    } else {
      hint.textContent = baseHint;
    }
  }
  openPanel('paUserCredentialsPanel', closePanelIds);
}

export function notifyCredentialsEmailStatus({ emailSent, emailError, action = 'created' } = {}) {
  if (emailSent) {
    showToast(
      action === 'reset'
        ? 'Credentials reset and emailed to the user.'
        : 'User created and login credentials emailed.',
      'success',
    );
    return;
  }
  if (emailSent === false && emailError) {
    showToast(
      action === 'reset'
        ? `Credentials reset, but email could not be sent: ${emailError}`
        : `User created, but email could not be sent: ${emailError}`,
      'info',
    );
  }
}

export async function copyUserCredentials() {
  const text = formatUserCredentialsText();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast('Credentials copied to clipboard.', 'success');
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      showToast('Credentials copied to clipboard.', 'success');
    } catch {
      showToast('Could not copy credentials.', 'danger');
    } finally {
      document.body.removeChild(area);
    }
  }
}

export async function shareUserCredentials() {
  const text = formatUserCredentialsText();
  if (!text) return;
  const shareData = {
    title: 'Portfolio Dashboard Login',
    text,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast('Credentials shared.', 'success');
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
  }
  const mailto = `mailto:?subject=${encodeURIComponent('Portfolio Dashboard Login')}&body=${encodeURIComponent(text)}`;
  window.location.href = mailto;
}
