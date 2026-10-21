/* V1 Phase 5 image status/fallback handler. Original source URLs remain recorded for diagnostics and retry. */
(() => {
  'use strict';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720"><rect width="600" height="720" fill="#211722"/><circle cx="300" cy="260" r="105" fill="#382539"/><path d="M105 555 Q300 350 495 555 V720 H105Z" fill="#4a2c43"/><text x="300" y="625" font-family="Georgia" font-size="28" text-anchor="middle" fill="#f5bfd6">BLACKED</text><text x="300" y="662" font-family="Arial" font-size="15" text-anchor="middle" fill="#d7bdcf">REFERENCE PREVIEW UNAVAILABLE</text></svg>';
  const store = window.BLACKED_ASSET_FALLBACK = { count: 0, failures: [], src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}` };
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackDone === '1') return;
    const original = img.dataset.originalSrc || img.currentSrc || img.src;
    img.dataset.originalSrc = original;
    img.dataset.sourceStatus = 'failed';
    img.dataset.fallbackDone = '1';
    store.count += 1;
    store.failures.push({url: original, alt: img.alt || ''});
    const card = img.closest('.image-library-card');
    if (card) {
      card.classList.add('image-source-failed');
      const status = card.querySelector('.image-source-status');
      if (status) { status.hidden = false; status.textContent = 'Original image did not load. The image record is still in the collection; use Open source or Retry image.'; }
    }
    img.src = store.src;
    img.alt = (img.alt || 'Campaign image') + ' — original source unavailable';
  }, true);
})();
