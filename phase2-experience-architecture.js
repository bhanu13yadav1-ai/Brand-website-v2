/* BLACKED Super Update Phase 2 — additive experience architecture.
 * Loads one content graph, places local concept galleries, and connects existing views.
 * Does not replace app.js or change existing story/product IDs or storage keys.
 */
(() => {
  'use strict';
  if (window.BLACKED_PHASE2_ARCHITECTURE) return;
  const STATE = window.BLACKED_PHASE2_ARCHITECTURE = {
    version: '2.0.0', loaded: false, manifestLoaded: false,
    mountedRoutes: [], mountedGroups: [], errors: [], missingImages: [], source: './phase2-content-graph.json'
  };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const routeById = new Map();
  const contentById = new Map();
  let manifest = null;
  let lastFocus = null;

  function safeAttr(value) { return String(value ?? ''); }
  function makeBadge(label) { return el('span', 'p2-concept-badge', label); }

  function ensureDialog() {
    if ($('#p2MediaPreview')) return $('#p2MediaPreview');
    const dialog = el('div', 'p2-media-dialog');
    dialog.id = 'p2MediaPreview'; dialog.hidden = true;
    dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'p2MediaPreviewTitle');
    const panel = el('div', 'p2-media-dialog-panel');
    const head = el('div', 'p2-media-dialog-head');
    const title = el('h2', '', 'Image preview'); title.id = 'p2MediaPreviewTitle';
    const close = el('button', 'p2-media-close', 'Close preview'); close.type = 'button'; close.id = 'p2MediaPreviewClose';
    close.setAttribute('aria-label', 'Close image preview');
    const image = el('img', 'p2-media-dialog-image'); image.id = 'p2MediaPreviewImage'; image.alt = '';
    const note = el('p', 'p2-media-dialog-note', 'Campaign reference only. Product claims and public-use rights have not been verified.'); note.id = 'p2MediaPreviewNote';
    head.append(title, close); panel.append(head, image, note); dialog.append(panel); document.body.append(dialog);
    const closeDialog = () => {
      if (dialog.hidden) return;
      dialog.hidden = true; document.body.classList.remove('p2-media-dialog-open');
      image.removeAttribute('src');
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      lastFocus = null;
    };
    close.addEventListener('click', closeDialog);
    dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); closeDialog(); }
      if (event.key === 'Tab') {
        event.preventDefault(); close.focus();
      }
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !dialog.hidden) closeDialog(); });
    dialog._openImage = (item, invoker) => {
      lastFocus = invoker;
      $('#p2MediaPreviewTitle').textContent = item.title;
      $('#p2MediaPreviewImage').alt = item.alt;
      $('#p2MediaPreviewImage').src = './' + item.path;
      $('#p2MediaPreviewNote').textContent = item.note + ' Public/commercial image permissions are not independently verified.';
      dialog.hidden = false; document.body.classList.add('p2-media-dialog-open'); close.focus();
    };
    return dialog;
  }

  function renderCard(item) {
    const card = el('article', 'p2-media-card');
    card.dataset.p2AssetId = item.id;
    const preview = el('button', 'p2-media-preview'); preview.type = 'button';
    preview.setAttribute('aria-label', 'Preview image: ' + item.title);
    const image = el('img', 'p2-media-image');
    image.src = './' + item.path; image.alt = item.alt;
    image.loading = 'lazy'; image.decoding = 'async'; image.width = item.width; image.height = item.height;
    image.addEventListener('error', () => {
      card.classList.add('p2-media-image-error');
      const status = $('.p2-media-status', card);
      if (status) status.textContent = 'Image missing — check this asset path before release.';
      if (!STATE.missingImages.includes(item.path)) STATE.missingImages.push(item.path);
    }, { once: true });
    image.addEventListener('load', () => {
      const status = $('.p2-media-status', card);
      if (status) status.textContent = 'Local image loaded · ' + image.naturalWidth + ' × ' + image.naturalHeight;
    }, { once: true });
    preview.append(image);
    preview.addEventListener('click', () => ensureDialog()._openImage(item, preview));
    const body = el('div', 'p2-media-card-body');
    const title = el('h3', '', item.title);
    const badges = el('div', 'p2-media-badges');
    badges.append(makeBadge(item.statusLabel || 'Concept only'));
    if (item.brandStatus && item.brandStatus.includes('review')) badges.append(makeBadge('Brand review required'));
    const description = el('p', 'p2-media-description', item.note);
    const status = el('p', 'p2-media-status', 'Image not checked yet'); status.setAttribute('aria-live', 'polite');
    body.append(badges, title, description, status);
    card.append(preview, body);
    return card;
  }

  function gallerySection(groupId, items) {
    const first = items[0];
    const section = el('section', 'p2-media-section');
    section.id = 'p2-gallery-' + groupId;
    section.setAttribute('aria-labelledby', section.id + '-title');
    const head = el('div', 'p2-media-section-head');
    const eyebrow = el('p', 'p2-media-eyebrow', first.sectionEyebrow || 'CAMPAIGN CONCEPTS');
    const title = el('h2', '', first.sectionTitle || 'Editorial concept references'); title.id = section.id + '-title';
    const intro = el('p', 'p2-media-section-intro', first.sectionIntro || 'Reference artwork only.');
    const status = el('p', 'p2-media-scope-note', 'NOT VERIFIED AS STOCK · NO LIVE PRICE OR CHECKOUT');
    head.append(eyebrow, title, intro, status);
    const grid = el('div', 'p2-media-grid');
    items.forEach(item => grid.append(renderCard(item)));
    section.append(head, grid);
    return section;
  }

  function renderMedia() {
    const grouped = new Map();
    for (const item of manifest.media) {
      const route = routeById.get('route.' + item.route);
      if (!route) { STATE.errors.push('Unknown route for asset ' + item.id); continue; }
      if (!grouped.has(route.id)) grouped.set(route.id, new Map());
      const byGroup = grouped.get(route.id);
      if (!byGroup.has(item.group)) byGroup.set(item.group, []);
      byGroup.get(item.group).push(item);
      contentById.set(item.id, item);
    }
    for (const [routeId, groups] of grouped.entries()) {
      const route = routeById.get(routeId), host = $(route.selector);
      if (!host) { STATE.errors.push('Missing route selector ' + route.selector); continue; }
      for (const [groupId, items] of groups.entries()) {
        const sectionId = 'p2-gallery-' + groupId;
        if ($('#' + sectionId)) continue;
        host.append(gallerySection(groupId, items));
        STATE.mountedGroups.push(groupId);
      }
      STATE.mountedRoutes.push(route.dataView);
    }
  }

  function renderRouteRail() {
    const routeLabel = Object.fromEntries(manifest.routes.map(r => [r.id, r.title]));
    for (const route of manifest.routes) {
      const host = $(route.selector);
      if (!host || $('#p2-related-' + route.dataView)) continue;
      const destinations = route.relatedRoutes.map(id => routeById.get(id)).filter(Boolean).slice(0, 3);
      if (!destinations.length) continue;
      const section = el('nav', 'p2-related-rail'); section.id = 'p2-related-' + route.dataView;
      section.setAttribute('aria-label', 'Related BLACKED sections');
      const copy = el('div', 'p2-related-copy');
      copy.append(el('p', 'p2-media-eyebrow', 'KEEP EXPLORING'), el('h2', '', 'One brand world. Related spaces.'));
      const buttons = el('div', 'p2-related-links');
      for (const target of destinations) {
        const button = el('button', 'p2-related-link', target.title + ' ↗');
        button.type = 'button'; button.dataset.p2Route = target.dataView;
        button.setAttribute('aria-label', 'Open section: ' + target.title);
        buttons.append(button);
      }
      copy.append(el('p', 'p2-related-help', 'Jump to a related section whenever you are ready; nothing is compulsory.'));
      section.append(copy, buttons); host.append(section);
    }
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-p2-route]');
      if (!button) return;
      const targetView = button.dataset.p2Route;
      const existing = document.querySelector('[data-view-link="' + CSS.escape(targetView) + '"]');
      if (existing) existing.click();
      else STATE.errors.push('No existing navigation control for route ' + targetView);
    });
  }

  async function start() {
    try {
      const response = await fetch(STATE.source, { credentials: 'same-origin', cache: 'no-cache' });
      if (!response.ok) throw new Error('Content graph could not be loaded (' + response.status + ').');
      manifest = await response.json(); STATE.manifestLoaded = true;
      manifest.routes.forEach(route => routeById.set(route.id, route));
      renderMedia(); renderRouteRail(); ensureDialog();
      STATE.loaded = true;
      document.documentElement.dataset.p2Architecture = 'loaded';
    } catch (error) {
      STATE.errors.push(String(error && error.message || error));
      document.documentElement.dataset.p2Architecture = 'error';
      console.error('[BLACKED Phase 2] Architecture module failed safely:', error);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
