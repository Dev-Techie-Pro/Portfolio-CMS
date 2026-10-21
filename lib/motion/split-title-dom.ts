const SPLIT_ATTR = 'data-pa-title-split';

/** Split a plain heading into `.word` > `.ch` for character enter animations. */
export function splitTitleElement(titleEl: HTMLElement) {
  if (titleEl.getAttribute(SPLIT_ATTR) === '1') return;
  const text = titleEl.textContent?.trim() ?? '';
  if (!text) return;

  titleEl.setAttribute(SPLIT_ATTR, '1');
  titleEl.classList.add('head__title');
  titleEl.setAttribute('aria-label', text);
  titleEl.textContent = '';

  text.split(/\s+/).forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.setAttribute('aria-hidden', 'true');
    [...word].forEach((ch) => {
      const chSpan = document.createElement('span');
      chSpan.className = 'ch';
      chSpan.textContent = ch;
      wordSpan.appendChild(chSpan);
    });
    titleEl.appendChild(wordSpan);
    if (wi < text.split(/\s+/).length - 1) {
      titleEl.appendChild(document.createTextNode(' '));
    }
  });
}
