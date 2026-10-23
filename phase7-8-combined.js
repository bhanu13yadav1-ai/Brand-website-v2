/* Phase 7/8 CSS is injected only when Stories or Sanskari are first opened. */
(() => {
  if (document.getElementById('blacked-phase78-combined-styles')) return;
  const style = document.createElement('style');
  style.id = 'blacked-phase78-combined-styles';
  style.textContent = "/* BLACKED V3 Phases 7–8. Additive styling; legacy feature styles stay intact. */\n:root{--v78-gold:#e8c17c;--v78-rose:#d88ea8;--v78-panel:#171116;--v78-line:#493544;--v78-muted:#c8b9c4}\n.v7-collection-hub,.v8-story-dashboard{margin:clamp(22px,4vw,40px) 0;padding:clamp(16px,3vw,28px);border:1px solid var(--v78-line);border-radius:22px;background:radial-gradient(ellipse at top right,#47302245,transparent 55%),linear-gradient(145deg,#1c151b,#100d10);box-shadow:0 16px 42px #0002;scroll-margin-top:18px}\n.v7-collection-heading h2,.v8-story-dashboard-copy h2{margin:.2em 0 .35em;font-size:clamp(24px,4vw,34px);line-height:1.12;letter-spacing:-.025em}\n.v7-collection-heading p,.v8-story-dashboard-copy p{max-width:68ch}\n.v7-collection-tools{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(160px,1fr);gap:12px;margin:18px 0}\n.v7-collection-tools .field{display:grid;gap:7px;min-width:0}\n.v7-collection-tools input,.v7-collection-tools select{box-sizing:border-box;width:100%;min-height:44px;border:1px solid #5a4556;border-radius:12px;background:#0f0c10;color:#fff7fa;padding:10px 12px;font:inherit}\n.v7-collection-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;align-items:stretch}\n.v7-collection-card{min-width:0;overflow:hidden;border:1px solid #4a3645;border-radius:17px;background:#120e12;display:flex;flex-direction:column;transition:border-color .18s ease,transform .18s ease}\n.v7-collection-card:hover{border-color:var(--v78-gold);transform:translateY(-2px)}\n.v7-collection-card[hidden]{display:none!important}\n.v7-collection-card>img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;object-position:center;background:#211720}\n.v7-collection-card-copy{display:flex;flex:1;flex-direction:column;align-items:stretch;padding:14px;gap:8px}\n.v7-collection-tag{color:var(--v78-gold);font-size:10px;letter-spacing:.12em;font-weight:800;line-height:1.4}\n.v7-collection-card h3{margin:0;font:600 21px/1.2 Georgia,serif;color:#fff4e2}\n.v7-collection-card p{margin:0 0 5px;line-height:1.5;color:#d3c5ce;font-size:14px}\n.v7-image-status{font-size:11px;line-height:1.4;color:#bdadb9;overflow-wrap:anywhere}\n.v7-image-failed{border-color:#bd7777}\n.v7-image-failed .v7-image-status{color:#ffc1bd}\n.v7-collection-card .btn{margin-top:auto;min-height:44px}\n.v7-empty{margin:14px 0 0}\n.v7-target-highlight{outline:2px solid var(--v78-gold);outline-offset:5px;border-radius:10px;transition:outline-color .3s ease}\n.v8-story-quickfilters{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 13px}\n.v8-story-chip{min-height:42px;padding:9px 13px;border:1px solid #5a4556;border-radius:999px;background:#151016;color:#f8edf3;font:600 13px/1.2 system-ui,sans-serif;cursor:pointer}\n.v8-story-chip:hover,.v8-story-chip:focus-visible{border-color:var(--v78-gold)}\n.v8-story-chip.active{background:linear-gradient(120deg,#e4bd79,#f1d9a7);border-color:#f1d9a7;color:#1b1216}\n.v8-story-shortcuts{display:flex;flex-wrap:wrap;gap:9px;margin-top:6px}\n.v8-story-shortcuts button{min-height:44px}\n.v8-reader-toolbar{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin:12px 0 16px;padding:10px;border:1px solid var(--v78-line);border-radius:13px;background:#120e12}\n.v8-reader-size-label{font-size:12px;font-weight:700;color:#d8c5d1;margin-right:4px}\n.v8-reader-control{min-height:40px;min-width:44px;padding:8px 11px;border:1px solid #624756;border-radius:10px;background:#211720;color:#fff4f8;font:650 13px system-ui,sans-serif;cursor:pointer}\n.v8-reader-control:hover,.v8-reader-control:focus-visible{border-color:var(--v78-gold);outline-offset:2px}\n.v8-reader-control[aria-pressed=\"true\"]{background:#e4bd79;color:#21140e;border-color:#e4bd79}\n.v8-reader-status{margin-left:auto;color:#dfc18f;font-size:12px;font-variant-numeric:tabular-nums}\n.story-reading-copy{font-size:var(--v8-reader-size,18px);line-height:1.82;max-width:72ch;margin-inline:auto}\n.story-reading-copy p{margin-block:0 1.1em}\n.v8-reading-focus{overflow:hidden}\n.v8-reading-focus #storyModal .story-modal-card,.v8-reading-focus #storyModal .modal-card{width:min(100%,920px);max-height:min(95dvh,1100px);padding:clamp(18px,4vw,38px);border-color:#8d6b47;box-shadow:0 0 0 9999px #050305d9,0 18px 65px #000a}\n#storyModal.v8-focus-mode .story-reading-copy{max-width:66ch;font-size:var(--v8-reader-size,18px);line-height:1.95}\n#storyModal.v8-focus-mode .story-modal-card>p.micro{color:#cdbcbf}\n.v7-collection-hub button:focus-visible,.v8-story-dashboard button:focus-visible{outline:3px solid #f2d49b;outline-offset:3px}\n@media(max-width:760px){.v7-collection-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v7-collection-card-copy{padding:11px}.v7-collection-card h3{font-size:19px}.v7-collection-card p{font-size:13px}.v7-collection-tag{font-size:9px}.v8-story-shortcuts{display:grid;grid-template-columns:1fr}.v8-reader-status{width:100%;margin:0}}\n@media(max-width:420px){.v7-collection-tools{grid-template-columns:1fr}.v7-collection-grid{grid-template-columns:1fr}.v7-collection-card{display:grid;grid-template-columns:minmax(100px,36%) minmax(0,1fr)}.v7-collection-card>img{height:100%;min-height:185px;aspect-ratio:auto;object-fit:cover}.v7-collection-card-copy{padding:12px;gap:7px}.v7-collection-card h3{font-size:19px}.v7-collection-card .btn{padding:10px 8px;font-size:12px}.v8-story-chip{flex:1 1 42%;text-align:center}}\n@media(prefers-reduced-motion:reduce){.v7-collection-card{transition:none}.v7-collection-card:hover{transform:none}}\n";
  document.head.append(style);
})();

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
