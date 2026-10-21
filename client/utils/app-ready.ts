export function markAppReady() {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.add('is-ready');
}

export function resetAppReady() {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove('is-ready');
}
