/* BLACKED V3 Phases 7–8: organized collections + story-library reading tools.
   Additive only: this module does not replace app.js, story data, saved progress, or original views. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE78) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const state = { version: '7.8.0', collectionHub: false, storyTools: false, readerToolbar: false, fontSize: 18, focusMode: false, errors: [] };
  const make = (tag, cls = '', text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };

  function collectionTarget(id) {
    const targets = {
      noor: ['#v3NoorEditGallery', '.coming-card.noor'],
      sanskari: ['#sanskariGallery', '#v23SanskariLocalGallery', '.sanskari-hero'],
      grace: ['#v3GracePreview', '.coming-card.grace']
    };
    for (const selector of (targets[id] || [])) {
      const found = $(selector);
      if (found) return found;
    }
    return $('#view-sanskari');
  }

  function addCollectionHub() {
    const view = $('#view-sanskari');
    if (!view || $('#v7CollectionHub')) return;
    const anchor = view.querySelector('.sanskari-hero') || view.querySelector('.page-intro');
    if (!anchor) { state.errors.push('Phase 7: Sanskari hero anchor not found'); return; }

    const section = make('section', 'section-block v7-collection-hub');
    section.id = 'v7CollectionHub';
    section.setAttribute('aria-labelledby', 'v7CollectionHubTitle');
    const heading = make('div', 'v7-collection-heading');
    const copy = make('div');
    copy.append(
      make('p', 'eyebrow', 'V3 · PHASE 7 · COLLECTION GUIDE'),
      make('h2', '', 'Find your edit.'),
      make('p', 'muted', 'Three clearly separated visual collections. Campaign labels describe styling direction—not a model’s religion, identity, endorsement or product availability.')
    );
    heading.append(copy);
    const tools = make('div', 'v7-collection-tools');
    const searchLabel = make('label', 'field', 'Search collections');
    const search = make('input'); search.type = 'search'; search.id = 'v7CollectionSearch'; search.maxLength = 80; search.placeholder = 'Noor, drapes, gold, grace…'; search.setAttribute('aria-label', 'Search the collections');
    searchLabel.append(search);
    const filterLabel = make('label', 'field', 'Collection');
    const filter = make('select'); filter.id = 'v7CollectionFilter'; filter.setAttribute('aria-label', 'Filter collection cards');
    [['all', 'All collections'], ['noor', 'Noor Edit'], ['sanskari', 'Sanskari Edit'], ['grace', 'Grace Edit']].forEach(([value, label]) => { const option = make('option', '', label); option.value = value; filter.append(option); });
    filterLabel.append(filter); tools.append(searchLabel, filterLabel);
    const grid = make('div', 'v7-collection-grid'); grid.id = 'v7CollectionGrid';
    const records = [
      { id: 'noor', title: 'Noor Edit', tag: 'MODEST-INSPIRED EDITORIAL', line: 'Black-and-gold details, veils and evening styling.', image: 'noor-ka-nasha.webp', alt: 'Noor-inspired black-and-gold fashion campaign artwork' },
      { id: 'sanskari', title: 'Sanskari Edit', tag: 'DRAPES & TRADITIONAL STYLING', line: 'Saree-inspired styling and warm campaign photography.', image: 'sanskari-outside-bold-within.webp', alt: 'Sanskari editorial campaign with draped styling' },
      { id: 'grace', title: 'Grace Edit', tag: 'THEATRICAL FASHION CONCEPT', line: 'A separate theatrical/editorial preview, not an official religious collection.', image: 'sacred-elegance.webp', alt: 'Theatrical fashion editorial concept' }
    ];
    records.forEach(record => {
      const card = make('article', 'v7-collection-card'); card.dataset.collection = record.id;
      card.dataset.search = `${record.title} ${record.tag} ${record.line}`.toLowerCase();
      const img = document.createElement('img'); img.src = `./${record.image}`; img.alt = record.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = 900; img.height = 1125;
      const status = make('small', 'v7-image-status', 'Checking image…');
      img.addEventListener('load', () => { status.textContent = `Image loaded · ${img.naturalWidth} × ${img.naturalHeight}`; card.classList.remove('v7-image-failed'); }, { once: true });
      img.addEventListener('error', () => { status.textContent = `Image unavailable: ${record.image}`; card.classList.add('v7-image-failed'); }, { once: true });
      const body = make('div', 'v7-collection-card-copy');
      body.append(make('span', 'v7-collection-tag', record.tag), make('h3', '', record.title), make('p', '', record.line), status);
      const open = make('button', 'btn secondary full', 'Explore this edit ↗'); open.type = 'button'; open.dataset.v7OpenCollection = record.id;
      body.append(open); card.append(img, body); grid.append(card);
    });
    const empty = make('p', 'muted v7-empty', 'No collection matches that search.'); empty.id = 'v7CollectionEmpty'; empty.hidden = true;
    section.append(heading, tools, grid, empty);
    anchor.insertAdjacentElement('afterend', section);

    const runFilter = () => {
      const q = search.value.trim().toLowerCase(); const cat = filter.value; let visible = 0;
      $$('.v7-collection-card', grid).forEach(card => { const yes = (!q || card.dataset.search.includes(q)) && (cat === 'all' || card.dataset.collection === cat); card.hidden = !yes; if (yes) visible++; });
      empty.hidden = visible > 0;
    };
    search.addEventListener('input', runFilter); filter.addEventListener('change', runFilter);
    grid.addEventListener('click', event => {
      const button = event.target.closest('[data-v7-open-collection]'); if (!button) return;
      const target = collectionTarget(button.dataset.v7OpenCollection);
      target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      if (target) { target.classList.add('v7-target-highlight'); window.setTimeout(() => target.classList.remove('v7-target-highlight'), 1400); }
    });
    state.collectionHub = true;
  }

  function addStoryQuickTools() {
    const view = $('#view-stories');
    if (!view || $('#v8StoryDashboard')) return;
    const intro = view.querySelector('.story-page-intro') || view.querySelector('.page-intro');
    const tools = view.querySelector('.story-tools');
    if (!intro || !tools) { state.errors.push('Phase 8: story intro or original filters not found'); return; }

    const notice = make('section', 'v8-story-dashboard'); notice.id = 'v8StoryDashboard';
    notice.setAttribute('aria-labelledby', 'v8StoryDashboardTitle');
    const header = make('div', 'v8-story-dashboard-copy');
    header.append(make('p', 'eyebrow', 'V3 · PHASE 8 · STORY DISCOVERY'), make('h2', '', 'Choose a mood. Keep your place.'), make('p', 'muted', 'Adult fictional stories only. Use the existing search, language, sort and mood filters; saving progress remains optional and stays in this browser when enabled.'));
    const quick = make('div', 'v8-story-quickfilters'); quick.setAttribute('role', 'group'); quick.setAttribute('aria-label', 'Quick story mood filters');
    const moods = [['all', 'All stories'], ['slow-burn', 'Slow burn'], ['dark-romance', 'Dark romance'], ['desi-tease', 'Desi tease'], ['dirty-hinglish', 'Bold Hinglish'], ['couple-vibes', 'Couple vibes']];
    moods.forEach(([value, label], index) => { const button = make('button', `v8-story-chip${index === 0 ? ' active' : ''}`, label); button.type = 'button'; button.dataset.v8StoryFilter = value; button.setAttribute('aria-pressed', String(index === 0)); quick.append(button); });
    const actions = make('div', 'v8-story-shortcuts');
    const saved = make('button', 'btn ghost', 'Saved & continue reading ↓'); saved.type = 'button'; saved.dataset.v8StoryJump = 'saved';
    const browse = make('button', 'btn secondary', 'Browse the library ↓'); browse.type = 'button'; browse.dataset.v8StoryJump = 'library';
    actions.append(browse, saved);
    notice.append(header, quick, actions);
    intro.insertAdjacentElement('afterend', notice);

    quick.addEventListener('click', event => {
      const button = event.target.closest('[data-v8-story-filter]'); if (!button) return;
      const select = $('#storyCategory'); if (!select) return;
      select.value = button.dataset.v8StoryFilter;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      $$('[data-v8-story-filter]', quick).forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    });
    actions.addEventListener('click', event => {
      const button = event.target.closest('[data-v8-story-jump]'); if (!button) return;
      const target = button.dataset.v8StoryJump === 'saved' ? ($('#storyVaultOptIn')?.closest('section') || $('#storyVaultGrid')) : $('#storyGrid');
      target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      if (button.dataset.v8StoryJump === 'saved') $('#storyVaultOptIn')?.focus({ preventScroll: true });
    });
    state.storyTools = true;
  }

  function addReaderToolbar() {
    const modal = $('#storyModal'); const body = $('#storyModalBody'); const meta = $('#storyModalMeta');
    if (!modal || !body || !meta || $('#v8ReaderToolbar')) return;
    const toolbar = make('div', 'v8-reader-toolbar'); toolbar.id = 'v8ReaderToolbar'; toolbar.setAttribute('role', 'group'); toolbar.setAttribute('aria-label', 'Story reading controls');
    const label = make('span', 'v8-reader-size-label', 'Text size');
    const smaller = make('button', 'v8-reader-control', 'A−'); smaller.type = 'button'; smaller.dataset.v8ReaderSize = 'down'; smaller.setAttribute('aria-label', 'Make story text smaller');
    const bigger = make('button', 'v8-reader-control', 'A+'); bigger.type = 'button'; bigger.dataset.v8ReaderSize = 'up'; bigger.setAttribute('aria-label', 'Make story text larger');
    const reset = make('button', 'v8-reader-control', 'Reset'); reset.type = 'button'; reset.dataset.v8ReaderSize = 'reset';
    const focus = make('button', 'v8-reader-control v8-reader-focus', 'Focus mode'); focus.type = 'button'; focus.id = 'v8ReaderFocus'; focus.setAttribute('aria-pressed', 'false');
    const status = make('span', 'v8-reader-status', '18 px'); status.id = 'v8ReaderStatus'; status.setAttribute('aria-live', 'polite');
    toolbar.append(label, smaller, bigger, reset, focus, status); meta.insertAdjacentElement('afterend', toolbar);
    const applySize = () => { body.style.setProperty('--v8-reader-size', `${state.fontSize}px`); status.textContent = `${state.fontSize} px`; };
    toolbar.addEventListener('click', event => {
      const sizeButton = event.target.closest('[data-v8-reader-size]');
      if (sizeButton) {
        if (sizeButton.dataset.v8ReaderSize === 'down') state.fontSize = Math.max(14, state.fontSize - 2);
        else if (sizeButton.dataset.v8ReaderSize === 'up') state.fontSize = Math.min(26, state.fontSize + 2);
        else state.fontSize = 18;
        applySize(); return;
      }
      if (event.target.closest('#v8ReaderFocus')) {
        state.focusMode = !state.focusMode;
        document.body.classList.toggle('v8-reading-focus', state.focusMode);
        modal.classList.toggle('v8-focus-mode', state.focusMode);
        focus.setAttribute('aria-pressed', String(state.focusMode));
        focus.textContent = state.focusMode ? 'Exit focus mode' : 'Focus mode';
      }
    });
    const resetFocus = () => { state.focusMode = false; document.body.classList.remove('v8-reading-focus'); modal.classList.remove('v8-focus-mode'); focus.setAttribute('aria-pressed', 'false'); focus.textContent = 'Focus mode'; };
    modal.querySelectorAll('[data-close="storyModal"]').forEach(button => button.addEventListener('click', resetFocus));
    modal.addEventListener('click', event => { if (event.target === modal) resetFocus(); });
    const observer = new MutationObserver(() => { if (modal.classList.contains('hidden')) resetFocus(); });
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', event => {
      if (modal.classList.contains('hidden') || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === '+') { state.fontSize = Math.min(26, state.fontSize + 2); applySize(); }
      if (event.key === '-') { state.fontSize = Math.max(14, state.fontSize - 2); applySize(); }
    });
    applySize(); state.readerToolbar = true;
  }

  function boot() {
    try { addCollectionHub(); } catch (error) { state.errors.push(`Phase 7: ${String(error)}`); }
    try { addStoryQuickTools(); addReaderToolbar(); } catch (error) { state.errors.push(`Phase 8: ${String(error)}`); }
    window.BLACKED_V3_PHASE78 = {
      version: state.version,
      getDiagnostics: () => ({
        version: state.version,
        phase7CollectionHub: !!$('#v7CollectionHub'),
        phase7CollectionCards: $('#v7CollectionGrid')?.querySelectorAll('.v7-collection-card').length || 0,
        phase7Search: !!$('#v7CollectionSearch'),
        phase7Filter: !!$('#v7CollectionFilter'),
        phase8StoryDashboard: !!$('#v8StoryDashboard'),
        phase8QuickFilters: $('#v8StoryDashboard')?.querySelectorAll('[data-v8-story-filter]').length || 0,
        phase8OriginalStoryGrid: !!$('#storyGrid'),
        phase8OriginalStoryCount: $('#storyGrid')?.querySelectorAll('[data-story-card]').length || 0,
        phase8ExistingVault: !!$('#storyVaultOptIn') && !!$('#storyVaultGrid'),
        phase8ReaderToolbar: !!$('#v8ReaderToolbar'),
        phase8ReaderControls: $('#v8ReaderToolbar')?.querySelectorAll('button').length || 0,
        collectionImages: $$('.v7-collection-card img').map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0, naturalWidth: img.naturalWidth })),
        phase56Loaded: document.documentElement.dataset.blackedV3Phase56 || null,
        errors: [...state.errors]
      })
    };
    document.documentElement.dataset.blackedV3Phase78 = state.errors.length ? 'degraded' : 'loaded';
    window.dispatchEvent(new CustomEvent('blacked:v3-phase78-ready', { detail: window.BLACKED_V3_PHASE78.getDiagnostics() }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
