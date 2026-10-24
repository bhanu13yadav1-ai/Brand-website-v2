/* BLACKED V5 Phase 2 — additive navigation, filter-reset and accessibility improvements.
 * It does not replace app.js, wheel engines, content, storage keys, or Phase 16/17 modules.
 */
(() => {
  'use strict';
  if (window.BLACKED_V5_PHASE2_UX) return;

  const VERSION = '5.1.0-phase2-ux';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { version: VERSION, initialized: false, resetControls: [], errors: [], viewAnnouncements: 0 };
  const viewNames = {
    home: 'Home', stories: 'Stories', innerwear: 'Innerwear', sanskari: 'Sanskari Edit',
    wellness: 'Wellness', boyfriend: 'Boyfriend and Couples', fit: 'Fit Studio'
  };

  function announce(message) {
    let node = $('#p2uxLiveAnnouncement');
    if (!node) {
      node = document.createElement('p');
      node.id = 'p2uxLiveAnnouncement';
      node.className = 'p2ux-sr-only';
      node.setAttribute('role', 'status');
      node.setAttribute('aria-live', 'polite');
      node.setAttribute('aria-atomic', 'true');
      (document.querySelector('main') || document.body).append(node);
    }
    node.textContent = '';
    window.setTimeout(() => { node.textContent = message; }, 25);
  }

  function dispatchControl(control) {
    if (!control) return;
    const type = control.matches('select, input[type="checkbox"], input[type="radio"]') ? 'change' : 'input';
    control.dispatchEvent(new Event(type, { bubbles: true }));
    if (control.matches('input[type="search"], input[type="text"]')) {
      control.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function resetButtonFor(config) {
    if (!config.host || !config.host.isConnected || $('#'+config.id)) return;
    const row = document.createElement('div');
    row.className = 'p2ux-action-row';
    row.dataset.p2uxResetRow = config.id;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = config.id;
    button.className = 'p2ux-reset';
    button.innerHTML = '<span aria-hidden="true">↺</span>' + config.label;
    button.addEventListener('click', () => {
      try {
        config.reset();
        announce(config.announcement || 'Filters reset.');
      } catch (error) {
        state.errors.push(config.id + ': ' + String(error));
        announce('Filters could not be reset. Try changing the controls manually.');
      }
    });
    row.append(button);
    config.host.insertAdjacentElement('afterend', row);
    state.resetControls.push(config.id);
  }

  function resetStoryFilters() {
    const map = [['#storySearch', ''], ['#storyCategory', 'all'], ['#storyLanguage', 'all'], ['#storySort', 'featured']];
    map.forEach(([selector, value]) => { const el = $(selector); if (el) { el.value = value; dispatchControl(el); } });
    const all = $('[data-story-filter="all"]');
    if (all) all.click();
  }

  function resetCatalogFilters() {
    [['#catalogSearch', ''], ['#catalogCategory', 'all'], ['#catalogSort', 'featured']]
      .forEach(([selector, value]) => { const el = $(selector); if (el) { el.value = value; dispatchControl(el); } });
  }

  function resetImageFilters() {
    [['#imageLibrarySearch', ''], ['#imageLibraryCategory', 'all'], ['#imageLibrarySort', 'source']]
      .forEach(([selector, value]) => { const el = $(selector); if (el) { el.value = value; dispatchControl(el); } });
  }

  function resetWellnessCatalogFilters() {
    [['#p17ProductSearch', ''], ['#p17ProductCategory', 'all'], ['#p17ProductSort', 'category']]
      .forEach(([selector, value]) => { const el = $(selector); if (el) { el.value = value; dispatchControl(el); } });
  }

  function installFilterResets() {
    const stories = $('.story-tools');
    if (stories && $('#storySearch') && $('#storyCategory')) resetButtonFor({
      host: stories, id: 'p2uxResetStoryFilters', label: 'Reset story filters', announcement: 'Story filters reset to all stories.', reset: resetStoryFilters
    });
    const catalog = $('#catalogSearch')?.closest('.toolbar');
    if (catalog && $('#catalogSearch') && $('#catalogCategory')) resetButtonFor({
      host: catalog, id: 'p2uxResetCatalogFilters', label: 'Reset style filters', announcement: 'Style filters reset.', reset: resetCatalogFilters
    });
    const images = $('.image-library-toolbar');
    if (images && $('#imageLibrarySearch') && $('#imageLibrarySort')) resetButtonFor({
      host: images, id: 'p2uxResetImageFilters', label: 'Reset image filters', announcement: 'Image-library filters reset.', reset: resetImageFilters
    });
    const wellness = $('.p17-catalog-tools');
    if (wellness && $('#p17ProductSearch') && $('#p17ProductCategory')) resetButtonFor({
      host: wellness, id: 'p2uxResetWellnessFilters', label: 'Reset product filters', announcement: 'Wellness category filters reset.', reset: resetWellnessCatalogFilters
    });
  }

  function syncNavigationSemantics() {
    const menuButton = $('#menuToggle');
    const mobileMenu = $('#mobileMenu');
    if (menuButton && mobileMenu) {
      menuButton.setAttribute('aria-controls', 'mobileMenu');
      menuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
      menuButton.setAttribute('aria-label', mobileMenu.classList.contains('hidden') ? 'Open navigation menu' : 'Close navigation menu');
      mobileMenu.setAttribute('role', 'navigation');
      mobileMenu.setAttribute('aria-label', 'Mobile main sections');
    }
    const active = $('.view.active[data-view]');
    if (active) {
      $$('[data-view-link]').forEach(button => {
        const current = button.dataset.viewLink === active.dataset.view;
        if (current) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
    }
  }

  function handleViewNavigation(event) {
    const button = event.target instanceof Element ? event.target.closest('[data-view-link]') : null;
    if (!button) return;
    const desired = button.dataset.viewLink;
    window.setTimeout(() => {
      const active = $('.view.active[data-view]');
      const ageGate = $('#ageModal');
      if (!active || active.dataset.view !== desired || (ageGate && !ageGate.classList.contains('hidden'))) {
        syncNavigationSemantics();
        return;
      }
      const title = active.querySelector('h1') || active.querySelector('h2');
      if (title) {
        if (!title.hasAttribute('tabindex')) title.setAttribute('tabindex', '-1');
        try { title.focus({ preventScroll: true }); } catch (_) { title.focus(); }
      }
      state.viewAnnouncements++;
      announce((viewNames[desired] || desired) + ' section opened.');
      syncNavigationSemantics();
    }, 0);
  }

  function bindMobileMenu() {
    const button = $('#menuToggle');
    const menu = $('#mobileMenu');
    if (!button || !menu) return;
    button.addEventListener('click', () => window.setTimeout(() => {
      const opened = !menu.classList.contains('hidden');
      button.setAttribute('aria-expanded', String(opened));
      button.setAttribute('aria-label', opened ? 'Close navigation menu' : 'Open navigation menu');
    }, 0));
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || menu.classList.contains('hidden')) return;
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation menu');
      button.focus();
    });
  }

  function diagnostics() {
    const ids = $$('[id]').map(el => el.id);
    const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    return {
      version: VERSION,
      initialized: state.initialized,
      views: $$('.view[data-view]').map(el => ({ name: el.dataset.view, hidden: !!el.hidden })),
      wheels: ['dildo', 'plug', 'boy', 'wild'].map(name => ({ name, present: !!$(`[data-wheel-disc="${name}"]`) })),
      resetControls: [...state.resetControls],
      duplicateIds: duplicates,
      mobileMenuHasControlLink: !!$('#mobileMenu') && $('#menuToggle')?.getAttribute('aria-controls') === 'mobileMenu',
      prefersReducedMotion: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
      imageAltMissing: $$('img:not([alt])').length,
      errors: [...state.errors],
      runtimeTestNote: 'DOM diagnostics only; not a substitute for real browser/device task testing.'
    };
  }

  function init() {
    if (state.initialized) return;
    try {
      syncNavigationSemantics();
      installFilterResets();
      bindMobileMenu();
      document.addEventListener('click', handleViewNavigation);
      state.initialized = true;
      window.BLACKED_V5_PHASE2_UX = { version: VERSION, getDiagnostics: diagnostics };
      document.documentElement.dataset.blackedPhase2Ux = 'ready';
    } catch (error) {
      state.errors.push(String(error));
      window.BLACKED_V5_PHASE2_UX = { version: VERSION, getDiagnostics: diagnostics };
      document.documentElement.dataset.blackedPhase2Ux = 'degraded';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
