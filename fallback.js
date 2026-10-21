/* Register image fallback before the HTML body begins requesting campaign images. */
(() => {
  'use strict';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720"><rect width="600" height="720" fill="#211722"/><circle cx="300" cy="260" r="105" fill="#382539"/><path d="M105 555 Q300 350 495 555 V720 H105Z" fill="#4a2c43"/><text x="300" y="625" font-family="Georgia" font-size="28" text-anchor="middle" fill="#f5bfd6">BLACKED</text><text x="300" y="662" font-family="Arial" font-size="15" text-anchor="middle" fill="#d7bdcf">REFERENCE PREVIEW UNAVAILABLE</text></svg>';
  const store = window.BLACKED_ASSET_FALLBACK = {
    count: 0,
    src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
  };
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = '1';
    store.count += 1;
    img.src = store.src;
    img.alt = (img.alt || 'Campaign image') + ' — fallback preview';
  }, true);
})();
