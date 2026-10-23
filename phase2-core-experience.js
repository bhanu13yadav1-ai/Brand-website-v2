/* BLACKED V4 Phase 2 — core experience improvements (additive, no framework).
 * Requires the existing app.js and phase1-foundation.js. Does not replace image assets,
 * app storage keys, story data, existing views, wheels, or original feature modules.
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE2) return;

  const VERSION = '4.2.0';
  const STORY_KEY = 'blackedV1PartBStoryVault';
  const COMPARE_KEY = 'blackedV4CompareIds';
  const state = {
    version: VERSION,
    booted: false,
    pendingResumeId: null,
    compareRestoreAttempted: false,
    compareRestoreCount: 0,
    errors: [],
    actions: { homeResume: 0, storyReset: 0, catalogReset: 0, imageLibraryReset: 0, compareRestored: 0 }
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function addStyles() {
    if ($('#phase2CoreStyles')) return;
    const style = document.createElement('style');
    style.id = 'phase2CoreStyles';
    style.textContent = `
      .p2-action-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:10px 0 14px}
      .p2-reset{min-height:38px;padding:8px 12px;border:1px solid #634254;border-radius:11px;background:#211720;color:#fff5fa;font-size:12px;font-weight:750;cursor:pointer}
      .p2-reset[hidden]{display:none!important}
      .p2-resume{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:14px;margin:18px 0 28px;padding:clamp(16px,3vw,22px);border:1px solid #7b4d68;border-radius:18px;background:linear-gradient(130deg,#2b1b2a,#171118 72%);box-shadow:0 10px 30px #0002}
      .p2-resume .eyebrow{margin-bottom:6px}
      .p2-resume h2{margin:0 0 6px;font-size:clamp(19px,2.8vw,25px);line-height:1.2}
      .p2-resume p{margin:0;color:#d1c0cc;font-size:13px;line-height:1.5}
      .p2-resume .p2-resume-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
      .p2-resume-note{grid-column:1/-1;font-size:11px!important;color:#bdabb8!important}
      .p2-status{margin:8px 0;color:#d8c4d1;font-size:12px}
      @media(max-width:600px){.p2-resume{grid-template-columns:1fr}.p2-resume .p2-resume-actions{justify-content:flex-start}.p2-resume .btn{min-height:44px}}
    `;
    document.head.appendChild(style);
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw.length > 100000) return fallback;
      return JSON.parse(raw);
    } catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    try {
      const raw = JSON.stringify(value);
      if (raw.length > 100000) return false;
      localStorage.setItem(key, raw);
      return true;
    } catch (_) { return false; }
  }
  function storyVault() {
    const value = readJSON(STORY_KEY, null);
    if (!value || value.enabled !== true || !value.lastRead || typeof value.lastRead.id !== 'string') return null;
    return value;
  }
  function showMessage(message) {
    const toast = $('#toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.remove('hidden');
      clearTimeout(showMessage.timer);
      showMessage.timer = setTimeout(() => toast.classList.add('hidden'), 3000);
      return;
    }
    let status = $('#phase2Status');
    if (!status) {
      status = document.createElement('p');
      status.id = 'phase2Status';
      status.className = 'p2-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      ($('#main') || document.body).prepend(status);
    }
    status.textContent = message;
  }

  function attemptResumeStory(id, attempts = 0) {
    if (!id || state.pendingResumeId !== id) return;
    const ageModal = $('#ageModal');
    if (ageModal && !ageModal.classList.contains('hidden')) {
      showMessage('Story continue karne ke liye 18+ prompt ko khud confirm karo. Uske baad saved story automatically open hogi.');
      return;
    }
    const view = $('#view-stories');
    if (!view || view.hidden || !view.classList.contains('active')) {
      if (attempts < 12) setTimeout(() => attemptResumeStory(id, attempts + 1), 180);
      return;
    }
    const button = $$('#storyVaultGrid [data-vault-open]').find(el => el.dataset.vaultOpen === id);
    if (button) {
      state.pendingResumeId = null;
      button.click();
      state.actions.homeResume += 1;
      return;
    }
    if (attempts < 12) setTimeout(() => attemptResumeStory(id, attempts + 1), 180);
    else {
      state.pendingResumeId = null;
      $('#storyVaultTitle')?.scrollIntoView({ behavior: 'auto', block: 'start' });
      showMessage('Saved story vault tak le aaye hain. Continue Reading card se story open karo.');
    }
  }

  function refreshHomeResume() {
    const home = $('#view-home');
    const hero = home?.querySelector('.hero');
    if (!home || !hero) return;
    let card = $('#p2ResumeCard');
    const saved = storyVault();
    if (!saved) {
      card?.remove();
      return;
    }
    const last = saved.lastRead;
    const titleFromCard = $$('#storyGrid [data-story-card]').find(el => el.dataset.storyCard === last.id)?.querySelector('h2')?.textContent?.trim();
    const chapter = Number.isInteger(last.chapterIndex) ? Math.max(0, last.chapterIndex) : 0;
    const title = titleFromCard || 'Your saved story';
    if (!card) {
      card = document.createElement('section');
      card.id = 'p2ResumeCard';
      card.className = 'p2-resume';
      card.setAttribute('aria-labelledby', 'p2ResumeTitle');
      const copy = document.createElement('div');
      copy.innerHTML = '<p class="eyebrow">CONTINUE WHERE YOU LEFT OFF</p><h2 id="p2ResumeTitle">Your story is waiting.</h2><p id="p2ResumeMeta">Saved reading progress is available on this device.</p>';
      const actions = document.createElement('div');
      actions.className = 'p2-resume-actions';
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'btn primary'; button.id = 'p2ResumeButton';
      button.textContent = 'Continue reading ↗';
      const browse = document.createElement('button');
      browse.type = 'button'; browse.className = 'btn secondary'; browse.textContent = 'Browse stories';
      browse.addEventListener('click', () => $('#mainNav [data-view-link="stories"]')?.click());
      actions.append(button, browse);
      const note = document.createElement('p');
      note.className = 'p2-resume-note';
      note.textContent = 'Saved progress stays in this browser; it is not encrypted or synced. You can clear it in Story Vault.';
      card.append(copy, actions, note);
      hero.insertAdjacentElement('afterend', card);
      button.addEventListener('click', () => {
        state.pendingResumeId = storyVault()?.lastRead?.id || null;
        const target = $('#mainNav [data-view-link="stories"]');
        if (target) target.click();
        else showMessage('Story section ka navigation link nahi mila.');
        setTimeout(() => attemptResumeStory(state.pendingResumeId), 120);
      });
    }
    $('#p2ResumeTitle').textContent = title;
    $('#p2ResumeMeta').textContent = chapter > 0 ? `Saved progress · chapter ${chapter + 1} · continue from your last reading point.` : 'Saved progress is ready. Continue from where you last opened the story.';
  }

  function insertResetButton(anchor, id, label, handler) {
    if (!anchor || document.getElementById(id)) return document.getElementById(id);
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.className = 'p2-reset';
    button.textContent = label;
    button.setAttribute('aria-label', label);
    anchor.append(button);
    button.addEventListener('click', handler);
    return button;
  }

  function installStoryReset() {
    const tools = $('.story-tools-part-a');
    const row = $('#storyCount')?.closest('.result-line');
    if (!tools || !row || $('#p2ClearStoryFilters')) return;
    const btn = insertResetButton(row, 'p2ClearStoryFilters', 'Clear filters', () => {
      const search = $('#storySearch'), category = $('#storyCategory'), language = $('#storyLanguage'), sort = $('#storySort');
      if (search) { search.value = ''; search.dispatchEvent(new Event('input', { bubbles: true })); }
      if (category) { category.value = 'all'; category.dispatchEvent(new Event('change', { bubbles: true })); }
      if (language) { language.value = 'all'; language.dispatchEvent(new Event('change', { bubbles: true })); }
      if (sort) { sort.value = 'featured'; sort.dispatchEvent(new Event('change', { bubbles: true })); }
      const all = $('[data-story-filter="all"]'); if (all) all.click();
      state.actions.storyReset += 1;
      updateResetVisibility();
    });
    btn.hidden = true;
    [$('#storySearch'), $('#storyCategory'), $('#storyLanguage'), $('#storySort')].filter(Boolean).forEach(el => {
      el.addEventListener('input', updateResetVisibility);
      el.addEventListener('change', updateResetVisibility);
    });
    $$('.story-filter-row [data-story-filter]').forEach(el => el.addEventListener('click', () => setTimeout(updateResetVisibility, 0)));
  }

  function installCatalogReset() {
    const row = $('#catalogCount')?.closest('.result-line');
    if (!row || $('#p2ClearCatalogFilters')) return;
    const btn = insertResetButton(row, 'p2ClearCatalogFilters', 'Reset styles', () => {
      const search = $('#catalogSearch'), category = $('#catalogCategory'), sort = $('#catalogSort');
      if (search) { search.value = ''; search.dispatchEvent(new Event('input', { bubbles: true })); }
      if (category) { category.value = 'all'; category.dispatchEvent(new Event('change', { bubbles: true })); }
      if (sort) { sort.value = 'featured'; sort.dispatchEvent(new Event('change', { bubbles: true })); }
      state.actions.catalogReset += 1;
      updateResetVisibility();
    });
    btn.hidden = true;
    [$('#catalogSearch'), $('#catalogCategory'), $('#catalogSort')].filter(Boolean).forEach(el => {
      el.addEventListener('input', updateResetVisibility);
      el.addEventListener('change', updateResetVisibility);
    });
  }

  function installImageLibraryReset() {
    const row = $('.image-library-summary');
    if (!row || $('#p2ClearImageLibraryFilters')) return;
    const btn = insertResetButton(row, 'p2ClearImageLibraryFilters', 'Reset archive filters', () => {
      const search = $('#imageLibrarySearch'), category = $('#imageLibraryCategory'), sort = $('#imageLibrarySort');
      if (search) { search.value = ''; search.dispatchEvent(new Event('input', { bubbles: true })); }
      if (category) { category.value = 'all'; category.dispatchEvent(new Event('change', { bubbles: true })); }
      if (sort) { sort.value = 'source'; sort.dispatchEvent(new Event('change', { bubbles: true })); }
      state.actions.imageLibraryReset += 1;
      updateResetVisibility();
    });
    btn.hidden = true;
    [$('#imageLibrarySearch'), $('#imageLibraryCategory'), $('#imageLibrarySort')].filter(Boolean).forEach(el => {
      el.addEventListener('input', updateResetVisibility);
      el.addEventListener('change', updateResetVisibility);
    });
  }

  function updateResetVisibility() {
    const set = (id, active) => { const b = $('#' + id); if (b) b.hidden = !active; };
    set('p2ClearStoryFilters', !!($('#storySearch')?.value.trim()) || ($('#storyCategory')?.value || 'all') !== 'all' || ($('#storyLanguage')?.value || 'all') !== 'all' || ($('#storySort')?.value || 'featured') !== 'featured' || !!$('.story-filter-row [data-story-filter].active:not([data-story-filter="all"])'));
    set('p2ClearCatalogFilters', !!($('#catalogSearch')?.value.trim()) || ($('#catalogCategory')?.value || 'all') !== 'all' || ($('#catalogSort')?.value || 'featured') !== 'featured');
    set('p2ClearImageLibraryFilters', !!($('#imageLibrarySearch')?.value.trim()) || ($('#imageLibraryCategory')?.value || 'all') !== 'all' || ($('#imageLibrarySort')?.value || 'source') !== 'source');
  }

  function getCompareIds() {
    const ids = readJSON(COMPARE_KEY, []);
    if (!Array.isArray(ids)) return [];
    return [...new Set(ids.filter(x => typeof x === 'string' && /^[a-z0-9-]{1,80}$/i.test(x)))].slice(0, 3);
  }
  function persistCompareClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest('#clearCompare')) {
      try { localStorage.removeItem(COMPARE_KEY); } catch (_) {}
      return;
    }
    const button = target.closest('[data-compare]');
    if (!button || button.dataset.phase2Restoring === 'true') return;
    const id = button.dataset.compare;
    const ids = getCompareIds();
    const index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
    else if (ids.length < 3) ids.push(id);
    else return; // Existing app handles the visible three-item limit and feedback.
    writeJSON(COMPARE_KEY, ids);
  }
  function restoreCompareOnce() {
    if (state.compareRestoreAttempted) return;
    const catalog = $('#catalogGrid');
    if (!catalog || !catalog.querySelector('[data-compare]')) return;
    state.compareRestoreAttempted = true;
    const currentIds = new Set($$('#catalogGrid [data-compare]').map(el => el.dataset.compare));
    const saved = getCompareIds().filter(id => currentIds.has(id));
    if (saved.length !== getCompareIds().length) writeJSON(COMPARE_KEY, saved);
    saved.forEach(id => {
      const button = $$('#catalogGrid [data-compare]').find(el => el.dataset.compare === id);
      if (!button) return;
      button.dataset.phase2Restoring = 'true';
      button.click();
      state.compareRestoreCount += 1;
      state.actions.compareRestored += 1;
    });
  }

  function onDocumentClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest('[data-view-link="home"]')) setTimeout(refreshHomeResume, 80);
    if (target.closest('[data-view-link="innerwear"]')) setTimeout(restoreCompareOnce, 160);
    if (target.closest('#confirmAge') && state.pendingResumeId) setTimeout(() => attemptResumeStory(state.pendingResumeId), 220);
    if (target.closest('[data-story-bookmark], [data-story-open], [data-vault-open], [data-story-next], [data-story-prev], [data-story-branch], [data-story-finish], [data-story-mark-read]')) {
      setTimeout(refreshHomeResume, 100);
    }
  }

  function getDiagnostics() {
    const views = $$('.view[data-view]');
    const duplicateIds = [];
    const seen = new Set();
    $$('[id]').forEach(el => { if (seen.has(el.id)) duplicateIds.push(el.id); else seen.add(el.id); });
    return {
      version: VERSION,
      booted: state.booted,
      foundationLoaded: !!window.BLACKED_V4_PHASE1,
      appLoaded: !!window.BLACKED_V1,
      views: views.map(el => ({ id: el.id, name: el.dataset.view, hidden: el.hidden })),
      storySearch: !!$('#storySearch'),
      storyFilters: !!$('#storyCategory') && !!$('#storyLanguage') && !!$('#storySort') && $$('[data-story-filter]').length >= 5,
      storyReader: !!$('#storyModal') && !!$('#storyModalBody'),
      storyVault: !!$('#storyVaultOptIn') && !!$('#storyVaultGrid'),
      homeResumeCard: !!$('#p2ResumeCard'),
      catalogSearch: !!$('#catalogSearch') && !!$('#catalogGrid'),
      imageLibrary: !!$('#imageLibrarySearch') && !!$('#imageLibraryGrid'),
      viewer: !!$('#spinFrameImage') && !!$('#spinSlider'),
      wishlist: !!$('#wishlistModal') && !!($('#wishlistItems')),
      sampleBag: !!$('#bagModal') && !!$('#bagItems') && !!$('#demoCheckout'),
      comparePanel: !!$('#comparePanel') && !!$('#clearCompare'),
      compareSavedCount: getCompareIds().length,
      compareRestoreCount: state.compareRestoreCount,
      resetControls: { story: !!$('#p2ClearStoryFilters'), catalog: !!$('#p2ClearCatalogFilters'), imageLibrary: !!$('#p2ClearImageLibraryFilters') },
      duplicateIds: [...new Set(duplicateIds)],
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      imageFailures: $$('img').filter(img => img.complete && img.naturalWidth === 0 && !!img.getAttribute('src')).length,
      serviceWorker: { supported: 'serviceWorker' in navigator, controlled: 'serviceWorker' in navigator && !!navigator.serviceWorker.controller },
      actions: { ...state.actions },
      errors: state.errors.slice()
    };
  }
  function runSmokeTests() {
    const d = getDiagnostics();
    return {
      version: VERSION,
      ranAt: new Date().toISOString(),
      checks: [
        { id: 'app', label: 'Main app runtime', status: d.appLoaded ? 'PASS' : 'FAIL', detail: d.appLoaded ? 'BLACKED_V1 found' : 'Main app API missing' },
        { id: 'phase1', label: 'Phase 1 foundation runtime', status: d.foundationLoaded ? 'PASS' : 'FAIL', detail: d.foundationLoaded ? 'Phase 1 APIs found' : 'Missing index.html integration line' },
        { id: 'views', label: 'Seven existing views', status: d.views.length === 7 ? 'PASS' : 'FAIL', detail: `${d.views.length} views detected` },
        { id: 'story', label: 'Story search / filters / reader / vault', status: d.storySearch && d.storyFilters && d.storyReader && d.storyVault ? 'PASS' : 'FAIL', detail: JSON.stringify({ search: d.storySearch, filters: d.storyFilters, reader: d.storyReader, vault: d.storyVault }) },
        { id: 'catalog', label: 'Catalogue and compare', status: d.catalogSearch && d.comparePanel ? 'PASS' : 'FAIL', detail: JSON.stringify({ catalog: d.catalogSearch, compare: d.comparePanel }) },
        { id: 'archive', label: 'Image archive and viewer', status: d.imageLibrary && d.viewer ? 'PASS' : 'FAIL', detail: JSON.stringify({ archive: d.imageLibrary, viewer: d.viewer }) },
        { id: 'wishlist-bag', label: 'Wishlist and sample bag', status: d.wishlist && d.sampleBag ? 'PASS' : 'FAIL', detail: JSON.stringify({ wishlist: d.wishlist, sampleBag: d.sampleBag }) },
        { id: 'clear-filters', label: 'Clear/reset controls', status: Object.values(d.resetControls).every(Boolean) ? 'PASS' : 'FAIL', detail: JSON.stringify(d.resetControls) },
        { id: 'duplicate-ids', label: 'Duplicate IDs', status: d.duplicateIds.length ? 'FAIL' : 'PASS', detail: d.duplicateIds.join(', ') || 'No duplicates detected' },
        { id: 'overflow', label: 'Horizontal overflow', status: d.horizontalOverflow ? 'WARN' : 'PASS', detail: d.horizontalOverflow ? 'Document wider than viewport' : 'No document-level overflow' }
      ],
      diagnostics: d
    };
  }

  function boot() {
    if (state.booted) return;
    state.booted = true;
    addStyles();
    installStoryReset();
    installCatalogReset();
    installImageLibraryReset();
    document.addEventListener('click', persistCompareClick);
    document.addEventListener('click', onDocumentClick);
    $('#confirmAge')?.addEventListener('click', () => setTimeout(() => {
      if (state.pendingResumeId) attemptResumeStory(state.pendingResumeId);
    }, 220));
    refreshHomeResume();
    updateResetVisibility();
    window.BLACKED_V4_PHASE2 = { version: VERSION, getDiagnostics, runSmokeTests };
    document.documentElement.dataset.blackedV4Phase2 = 'ready';
    window.dispatchEvent(new CustomEvent('blacked:v4-phase2-ready', { detail: { version: VERSION } }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
