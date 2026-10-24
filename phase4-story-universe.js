/* BLACKED Super Update — Phase 4: story universe + tone controls + boyfriend preference cards.
 * Additive module. Existing app.js, story data, storage keys and wheel algorithm are not replaced.
 * Story prose is fictional, adult-only, suggestive/non-graphic. Preferences stay in page memory only.
 */
(() => {
  'use strict';
  if (window.BLACKED_PHASE4) return;

  const state = {
    version: '4.0.0',
    initialized: false,
    loaded: false,
    tone: 'desi',
    data: null,
    activeStoryId: null,
    activeSceneId: null,
    characterPreferences: {},
    characterCardCreated: false,
    wheelStoryLinks: 0,
    errors: []
  };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const tones = ['clean', 'desi', 'bold'];
  const toneTitles = { clean: 'Clean Hinglish', desi: 'Desi Casual', bold: 'Bold Hinglish + Gaali' };
  const preferences = {
    height: { label: 'Height vibe', choices: [
      ['shorter', 'Shorter than me'], ['same', 'Around my height'], ['tall', 'Tall'], ['very-tall', 'Very tall'], ['any', 'No preference']
    ]},
    appearance: { label: 'Complexion / appearance', choices: [
      ['black-dark', 'Black / dark-skinned adult'], ['brown-desi', 'Brown / Desi look'], ['fair-light', 'Fair / light'], ['mixed', 'Mixed / varied look'], ['any', 'No preference']
    ]},
    build: { label: 'Build', choices: [
      ['lean', 'Lean'], ['athletic', 'Athletic'], ['broad', 'Broad'], ['plus-size', 'Plus-size'], ['any', 'No preference']
    ]},
    style: { label: 'Style', choices: [
      ['classic-black', 'Classic black'], ['desi', 'Desi / traditional'], ['streetwear', 'Streetwear'], ['clean-cut', 'Clean-cut'], ['any', 'No preference']
    ]},
    personality: { label: 'Personality', choices: [
      ['witty', 'Funny / witty'], ['confident', 'Confident'], ['caring', 'Caring / gentle'], ['mysterious', 'Mysterious'], ['playful', 'Playful'], ['any', 'No preference']
    ]},
    body: { label: 'Optional fictional penis-size trope', choices: [
      ['compact', 'Compact'], ['average', 'Average'], ['large', 'Large'], ['no-label', 'No label / surprise']
    ]}
  };
  const wheelStoryMap = {
    boy: 'saale-seedha-bol',
    dildo: 'last-chai-first-confession',
    plug: 'black-shirt-bad-timing',
    wild: {
      flirty: 'black-shirt-bad-timing', double: 'saale-seedha-bol', bold: 'afterparty-bakchodi',
      spicy: 'last-chai-first-confession', fantasy: 'black-shirt-bad-timing', truth: 'last-chai-first-confession',
      confession: 'saale-seedha-bol', boyfriend: 'afterparty-bakchodi', private: 'last-chai-first-confession', dark: 'black-shirt-bad-timing'
    }
  };

  function textNode(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  }
  function button(label, className = 'btn secondary', attrs = {}) {
    const b = textNode('button', className, label);
    b.type = 'button';
    Object.entries(attrs).forEach(([key, value]) => b.setAttribute(key, value));
    return b;
  }
  function getStory(id) { return state.data?.stories?.find(story => story.id === id) || null; }
  function toneCopy(copy) {
    if (typeof copy === 'string') return copy;
    return copy?.[state.tone] ?? copy?.desi ?? copy?.clean ?? '';
  }

  function updateExistingRoadmapBanner() {
    const banner = $('.story-next-banner', $('#view-stories'));
    if (!banner) return;
    const eyebrow = $('.eyebrow', banner);
    const title = $('h2', banner);
    const p = $('p:not(.eyebrow)', banner);
    const pill = $('.pill', banner);
    if (eyebrow) eyebrow.textContent = 'PHASE 4 · NOW AVAILABLE IN THIS BUILD';
    if (title) title.textContent = 'MORE DIRTY FOR HORNY GIRLS';
    if (p) p.textContent = 'A connected Hinglish fiction corner: Clean, Desi Casual ya Bold + Gaali tone chuno. Characters fictional adults hain; stories suggestive hain, graphic nahi. Har choice optional hai.';
    if (pill) pill.textContent = 'NEW STORY UNIVERSE · 18+';
  }

  function buildToneControls(storiesView) {
    if ($('#phase4-tone-controls')) return;
    const banner = $('.story-next-banner', storiesView);
    if (!banner) { state.errors.push('Could not find the existing story banner.'); return; }
    const section = textNode('section', 'p4-tone-controls');
    section.id = 'phase4-tone-controls';
    section.setAttribute('aria-labelledby', 'p4-tone-title');
    const head = textNode('div', 'p4-tone-heading');
    head.append(textNode('p', 'eyebrow', 'Your story voice · setting is not saved'));
    const title = textNode('h2', '', 'Baat ka tone kaisa ho?'); title.id = 'p4-tone-title';
    head.append(title, textNode('p', 'muted', 'Ye setting sirf naye Phase 4 story universe par apply hoti hai. Purani stories aur unka saved progress untouched hai.'));
    const choices = textNode('div', 'p4-tone-options');
    choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Select Hinglish story tone');
    state.data.tones.forEach(tone => {
      const b = button(tone.label, 'p4-tone-option', {'data-p4-tone': tone.id, 'aria-pressed': String(tone.id === state.tone)});
      b.append(textNode('span', 'p4-tone-sub', tone.description));
      choices.append(b);
    });
    section.append(head, choices);
    banner.insertAdjacentElement('afterend', section);
  }

  function buildUniverseSection(storiesView) {
    if ($('#phase4-story-universe')) return;
    const storyGrid = $('#storyGrid', storiesView);
    if (!storyGrid) { state.errors.push('Could not find original #storyGrid.'); return; }
    const section = textNode('section', 'section-block p4-story-universe');
    section.id = 'phase4-story-universe';
    section.setAttribute('aria-labelledby', 'p4-universe-title');
    const heading = textNode('div', 'section-heading');
    const inner = textNode('div');
    inner.append(textNode('p', 'eyebrow', 'Interlinked stories · choices change the next scene'));
    const title = textNode('h2', '', 'More Dirty for Horny Girls'); title.id = 'p4-universe-title';
    inner.append(title, textNode('p', 'muted', 'Ek connected desi universe: character banter, late-night confessions aur alternate endings. Tone upar se badal sakte ho; cards, endings aur wheel links isi setting ko follow karte hain.'));
    heading.append(inner, textNode('span', 'pill p4-new-pill', 'NEW · 4 STORIES'));
    const count = textNode('p', 'p4-story-count', 'Loading new story universe…'); count.id = 'p4-story-count'; count.setAttribute('aria-live', 'polite');
    const grid = textNode('div', 'p4-story-grid'); grid.id = 'p4-story-grid';
    const disclaimer = textNode('p', 'notice p4-story-notice', 'Fiction only. Characters are adults. Bold language is colloquial dialogue, not a request or pressure. No sexual activity is required or implied; you can close or skip any scene.');
    section.append(heading, count, grid, disclaimer);
    const vault = $('.story-vault', storiesView);
    if (vault) vault.insertAdjacentElement('beforebegin', section);
    else storyGrid.insertAdjacentElement('afterend', section);
  }

  function renderStoryCards() {
    const host = $('#p4-story-grid');
    if (!host || !state.data) return;
    host.replaceChildren();
    state.data.stories.forEach(story => {
      const card = textNode('article', 'p4-story-card');
      card.dataset.storyId = story.id;
      const meta = textNode('div', 'p4-story-card-meta');
      meta.append(textNode('span', 'p4-story-series', story.series), textNode('span', 'p4-story-time', `${story.readingTime} · 18+`));
      const h3 = textNode('h3', '', story.title);
      const teaser = textNode('p', 'p4-story-teaser', toneCopy(story.teaser)); teaser.dataset.p4Teaser = story.id;
      const characterLine = textNode('p', 'p4-story-characters', story.characters);
      const actions = textNode('div', 'p4-story-card-actions');
      const open = button('Read story ↗', 'btn primary', {'data-p4-open-story': story.id});
      const note = textNode('small', 'p4-story-card-note', `Tone: ${toneTitles[state.tone]}`);
      actions.append(open);
      card.append(meta, h3, teaser, characterLine, actions, note);
      host.append(card);
    });
    const count = $('#p4-story-count');
    if (count) count.textContent = `${state.data.stories.length} new interconnected stories · ${toneTitles[state.tone]} selected`;
  }

  function setTone(toneId) {
    if (!tones.includes(toneId)) return false;
    state.tone = toneId;
    $$('#phase4-tone-controls [data-p4-tone]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p4Tone === toneId)));
    renderStoryCards();
    if (state.activeStoryId && state.activeSceneId) renderStoryScene(state.activeStoryId, state.activeSceneId, false);
    return true;
  }

  function ensureReaderDialog() {
    if ($('#phase4-story-dialog')) return $('#phase4-story-dialog');
    const dialog = document.createElement('dialog');
    dialog.className = 'p4-story-dialog'; dialog.id = 'phase4-story-dialog';
    dialog.setAttribute('aria-labelledby', 'p4-reader-title');
    const panel = textNode('div', 'p4-reader-panel');
    const top = textNode('div', 'p4-reader-top');
    const heading = textNode('div', 'p4-reader-heading');
    heading.append(textNode('p', 'eyebrow', 'MORE DIRTY FOR HORNY GIRLS · FICTION 18+'));
    const h2 = textNode('h2', '', 'Story'); h2.id = 'p4-reader-title';
    const meta = textNode('p', 'p4-reader-meta', ''); meta.id = 'p4-reader-meta';
    heading.append(h2, meta);
    const close = button('Close ×', 'p4-reader-close', {'data-p4-close-reader': '', 'aria-label': 'Close story reader'});
    top.append(heading, close);
    const characterBrief = textNode('p', 'p4-character-brief'); characterBrief.id = 'p4-character-brief'; characterBrief.hidden = true;
    const sceneTitle = textNode('h3', 'p4-reader-scene-title', ''); sceneTitle.id = 'p4-reader-scene-title';
    const body = textNode('div', 'p4-reader-body'); body.id = 'p4-reader-body';
    const choices = textNode('div', 'p4-reader-choices'); choices.id = 'p4-reader-choices';
    const footer = textNode('p', 'p4-reader-safety', 'Fictional adults only · No real-life expectations · Close or skip at any time.');
    panel.append(top, characterBrief, sceneTitle, body, choices, footer);
    dialog.append(panel);
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => { state.activeStoryId = null; state.activeSceneId = null; });
    document.body.append(dialog);
    return dialog;
  }

  function getPreferenceSummary() {
    const pairs = [];
    Object.entries(preferences).forEach(([group, cfg]) => {
      const key = state.characterPreferences[group];
      const item = cfg.choices.find(x => x[0] === key);
      if (item && item[0] !== 'any' && item[0] !== 'no-label') pairs.push({group, label: cfg.label, value: item[1], key: item[0]});
      else if (item && item[0] === 'no-label') pairs.push({group, label: cfg.label, value: item[1], key: item[0]});
    });
    return pairs;
  }

  function renderStoryScene(storyId, sceneId, openDialog = true) {
    const story = getStory(storyId); const scene = story?.scenes?.[sceneId];
    if (!story || !scene) return false;
    state.activeStoryId = storyId; state.activeSceneId = sceneId;
    const dialog = ensureReaderDialog();
    $('#p4-reader-title', dialog).textContent = story.title;
    $('#p4-reader-meta', dialog).textContent = `${story.series} · ${story.characters} · ${toneTitles[state.tone]}`;
    $('#p4-reader-scene-title', dialog).textContent = toneCopy(scene.heading) || 'Next scene';
    const brief = $('#p4-character-brief', dialog);
    const selected = getPreferenceSummary();
    if (state.characterCardCreated && selected.length) {
      brief.hidden = false;
      brief.textContent = `Optional fictional-character vibe you selected: ${selected.map(x => x.value).join(' · ')}. This is your creative brief only; complexion and body-size preferences are independent, not inferred or linked.`;
    } else { brief.hidden = true; brief.textContent = ''; }
    const body = $('#p4-reader-body', dialog); body.replaceChildren();
    (scene.prose?.[state.tone] || scene.prose?.desi || scene.prose?.clean || []).forEach(paragraph => body.append(textNode('p', '', paragraph)));
    const choiceHost = $('#p4-reader-choices', dialog); choiceHost.replaceChildren();
    (scene.choices || []).forEach(choice => {
      const label = toneCopy(choice.label) || choice.label?.desi || 'Continue';
      choiceHost.append(button(label, 'btn primary p4-story-choice', {'data-p4-choice': choice.id}));
    });
    choiceHost.append(button('Back to story cards', 'btn ghost', {'data-p4-back-to-stories': ''}));
    if (openDialog && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      $('[data-p4-close-reader]', dialog)?.focus();
    }
    return true;
  }

  function openStory(storyId) {
    const story = getStory(storyId);
    if (!story) return false;
    return renderStoryScene(story.id, story.openingScene, true);
  }

  function moveFromChoice(choiceId) {
    const story = getStory(state.activeStoryId); const scene = story?.scenes?.[state.activeSceneId];
    const choice = scene?.choices?.find(item => item.id === choiceId);
    if (!choice) return;
    if (choice.nextScene) renderStoryScene(story.id, choice.nextScene, false);
    else if (choice.nextStory) openStory(choice.nextStory);
  }

  function buildPreferenceCards(boyfriendView) {
    if ($('#phase4-boyfriend-preferences')) return;
    const intro = $('.page-intro.boyfriend-intro', boyfriendView);
    if (!intro) { state.errors.push('Could not find the Boyfriend/Couples page intro.'); return; }
    const section = textNode('section', 'p4-preference-panel'); section.id = 'phase4-boyfriend-preferences';
    section.setAttribute('aria-labelledby', 'p4-pref-title');
    const head = textNode('div', 'p4-pref-head');
    head.append(textNode('p', 'eyebrow', 'YOUR FICTIONAL CHARACTER · OPTIONAL PREFERENCES'));
    const title = textNode('h2', '', 'Kaisa boy character chahiye?'); title.id = 'p4-pref-title';
    head.append(title, textNode('p', 'muted', 'Cards choose karo to build a fictional adult character vibe. Koi bhi option compulsory nahi; choices iss page par hi rahengi.'));
    const body = textNode('div', 'p4-pref-body'); body.id = 'p4-pref-body';
    Object.entries(preferences).forEach(([group, cfg]) => {
      const field = textNode('fieldset', 'p4-pref-group');
      const legend = textNode('legend', '', cfg.label); field.append(legend);
      const grid = textNode('div', 'p4-pref-options');
      cfg.choices.forEach(([value, label]) => {
        const b = button(label, 'p4-pref-option', {'data-p4-pref-group': group, 'data-p4-pref-value': value, 'aria-pressed': 'false'});
        grid.append(b);
      });
      field.append(grid); body.append(field);
    });
    const note = textNode('p', 'p4-pref-disclaimer', 'Important: skin tone/appearance aur fictional body-size trope do independent choices hain. Kisi race ya complexion se anatomy infer nahi hoti. Yeh real partner ka measurement, prediction ya judgement nahi hai.');
    const actions = textNode('div', 'p4-pref-actions');
    actions.append(button('Create my fictional vibe card', 'btn primary', {'data-p4-create-vibe': ''}), button('Skip for now', 'btn ghost', {'data-p4-skip-prefs': ''}), button('Clear choices', 'btn ghost', {'data-p4-clear-prefs': ''}), button('Change preferences', 'btn ghost', {'data-p4-edit-prefs': ''}));
    const status = textNode('p', 'p4-pref-status', 'No preference saved. Choose any cards—or skip.'); status.id = 'p4-pref-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    const summary = textNode('div', 'p4-vibe-card'); summary.id = 'p4-vibe-card'; summary.hidden = true;
    const summaryTitle = textNode('h3', '', 'Your fictional vibe'); summaryTitle.id = 'p4-vibe-card-title';
    const summaryBody = textNode('p', '', ''); summaryBody.id = 'p4-vibe-card-body';
    summary.append(summaryTitle, summaryBody, button('Use this vibe as a story brief', 'btn secondary', {'data-p4-use-vibe': ''}));
    section.append(head, body, note, actions, status, summary);
    intro.insertAdjacentElement('afterend', section);
  }

  function createVibeCard() {
    const pairs = getPreferenceSummary();
    if (!pairs.length) {
      $('#p4-pref-status').textContent = 'Pehle kam se kam ek card choose karo—or skip karke existing tools use karo.';
      return;
    }
    state.characterCardCreated = true;
    $('#p4-vibe-card').hidden = false;
    $('#p4-vibe-card-body').textContent = pairs.map(x => `${x.label}: ${x.value}`).join(' · ');
    $('#p4-pref-status').textContent = 'Fictional vibe card ready. Nothing is saved or sent.';
    $('#p4-pref-body').hidden = true;
    $('#phase4-boyfriend-preferences').classList.add('p4-pref-created');
  }

  function clearPreferences() {
    state.characterPreferences = {};
    state.characterCardCreated = false;
    $$('#phase4-boyfriend-preferences [data-p4-pref-group]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    $('#p4-vibe-card').hidden = true;
    $('#p4-pref-body').hidden = false;
    $('#phase4-boyfriend-preferences')?.classList.remove('p4-pref-created');
    $('#p4-pref-status').textContent = 'Choices cleared from this page. Nothing was stored.';
    if (state.activeStoryId && state.activeSceneId) renderStoryScene(state.activeStoryId, state.activeSceneId, false);
  }

  function skipPreferences() {
    state.characterPreferences = {};
    state.characterCardCreated = false;
    $$('#phase4-boyfriend-preferences [data-p4-pref-group]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    $('#p4-vibe-card').hidden = true;
    $('#p4-pref-body').hidden = true;
    $('#phase4-boyfriend-preferences').classList.add('p4-pref-skipped');
    $('#p4-pref-status').textContent = 'Skipped. No preference is saved.';
  }

  function connectWheelResults() {
    const hosts = [
      ['boy', '#boyResult'], ['dildo', '#dildoResult'], ['plug', '#plugResult'], ['wild', '#wildResult']
    ];
    hosts.forEach(([kind, selector]) => {
      const host = $(selector);
      if (!host || host.dataset.p4Observer === 'yes') return;
      host.dataset.p4Observer = 'yes';
      const refresh = () => {
        // The existing app renders descriptive titles (not `n/8` headings).
        // A completed spin is identified by the retry action the wheel actually creates.
        if (!host.querySelector('[data-wheel-retry]')) return;
        let storyId = wheelStoryMap[kind];
        if (kind === 'wild') storyId = wheelStoryMap.wild[$('#wildCategory')?.value || 'flirty'] || wheelStoryMap.wild.flirty;
        if (!getStory(storyId) || $('[data-p4-wheel-story]', host)) return;
        const row = textNode('div', 'p4-wheel-story-link');
        row.append(textNode('span', '', 'Want to continue the vibe as a story?'));
        row.append(button('Read related Hinglish story ↗', 'small-btn', {'data-p4-wheel-story': storyId, 'data-p4-wheel-story-link': ''}));
        host.append(row);
        state.wheelStoryLinks += 1;
      };
      const observer = new MutationObserver(refresh);
      observer.observe(host, {childList: true, subtree: true, characterData: true});
      refresh();
    });
  }

  function wireEvents() {
    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const toneButton = target.closest('[data-p4-tone]');
      if (toneButton) { setTone(toneButton.dataset.p4Tone); return; }
      const open = target.closest('[data-p4-open-story], [data-p4-wheel-story]');
      if (open) { openStory(open.dataset.p4OpenStory || open.dataset.p4WheelStory); return; }
      const choice = target.closest('[data-p4-choice]');
      if (choice) { moveFromChoice(choice.dataset.p4Choice); return; }
      if (target.closest('[data-p4-close-reader]')) { $('#phase4-story-dialog')?.close?.(); return; }
      if (target.closest('[data-p4-back-to-stories]')) { $('#phase4-story-dialog')?.close?.(); $('#phase4-story-universe')?.scrollIntoView({behavior:'auto',block:'start'}); return; }
      const pref = target.closest('[data-p4-pref-group]');
      if (pref) {
        const group = pref.dataset.p4PrefGroup; const value = pref.dataset.p4PrefValue;
        state.characterPreferences[group] = value;
        $$(`[data-p4-pref-group="${group}"]`).forEach(b => b.setAttribute('aria-pressed', String(b === pref)));
        state.characterCardCreated = false; $('#p4-vibe-card').hidden = true;
        $('#p4-pref-status').textContent = `${preferences[group].label}: ${pref.textContent} selected. Create the card when ready.`;
        return;
      }
      if (target.closest('[data-p4-create-vibe]')) { createVibeCard(); return; }
      if (target.closest('[data-p4-skip-prefs]')) { skipPreferences(); return; }
      if (target.closest('[data-p4-edit-prefs]')) { $('#p4-pref-body').hidden = false; $('#phase4-boyfriend-preferences').classList.remove('p4-pref-created','p4-pref-skipped'); $('#p4-pref-status').textContent = 'Edit your fictional character vibe.'; return; }
      if (target.closest('[data-p4-clear-prefs]')) { clearPreferences(); return; }
      if (target.closest('[data-p4-use-vibe]')) {
        const first = state.data?.stories?.[0];
        if (first) { if (typeof window.BLACKED_V1?.setView === 'function') window.BLACKED_V1.setView('stories'); else $('#mainNav [data-view-link="stories"]')?.click(); openStory(first.id); }
      }
    });
  }

  function getDiagnostics() {
    let wheelDiagnostics = null;
    try { wheelDiagnostics = window.BLACKED_V3_PHASE12_WHEELS?.getDiagnostics?.() || window.BLACKED_V2_P23?.getDiagnostics?.() || null; } catch (error) { state.errors.push(`wheel diagnostics: ${String(error)}`); }
    return {
      version: state.version, initialized: state.initialized, loaded: state.loaded,
      storyUniverse: !!$('#phase4-story-universe'), storyCards: $$('#p4-story-grid .p4-story-card').length,
      tones: $$('#phase4-tone-controls [data-p4-tone]').map(b => ({id:b.dataset.p4Tone,active:b.getAttribute('aria-pressed') === 'true'})),
      boyfriendPreferenceGroups: Object.keys(preferences).filter(group => $$(`[data-p4-pref-group="${group}"]`).length > 0),
      vibeCardVisible: !!$('#p4-vibe-card') && !$('#p4-vibe-card').hidden,
      wheelStoryLinks: state.wheelStoryLinks,
      wheelDiagnostics,
      errors: [...state.errors]
    };
  }

  async function init() {
    if (state.initialized) return;
    state.initialized = true;
    const storiesView = $('#view-stories'); const boyfriendView = $('#view-boyfriend');
    if (!storiesView || !boyfriendView) { state.errors.push('Required story or boyfriend view not found.'); return; }
    updateExistingRoadmapBanner();
    buildPreferenceCards(boyfriendView);
    wireEvents();
    try {
      const response = await fetch('./phase4-story-universe.json', {cache: 'no-cache'});
      if (!response.ok) throw new Error(`story data HTTP ${response.status}`);
      state.data = await response.json();
      state.loaded = Array.isArray(state.data.stories) && state.data.stories.length > 0;
      buildToneControls(storiesView);
      buildUniverseSection(storiesView);
      setTone(state.tone);
      connectWheelResults();
      state.errors.push(...validateData(state.data));
    } catch (error) {
      state.errors.push(String(error));
      const grid = $('#p4-story-grid');
      if (grid) grid.append(textNode('p', 'p4-load-error', 'Story universe data load nahi hua. Page ko online/reload karke try karo; existing stories remain available.'));
      console.error('[BLACKED Phase 4]', error);
    }
  }

  function validateData(data) {
    const errors = [];
    const ids = new Set();
    (data.stories || []).forEach(story => {
      if (!story.id || ids.has(story.id)) errors.push(`Missing or duplicate story id: ${story.id || '(empty)'}`);
      ids.add(story.id);
      if (!story.scenes?.[story.openingScene]) errors.push(`${story.id}: opening scene missing`);
      Object.entries(story.scenes || {}).forEach(([sceneId, scene]) => {
        tones.forEach(tone => { if (!Array.isArray(scene.prose?.[tone]) || !scene.prose[tone].length) errors.push(`${story.id}/${sceneId}: prose missing for tone ${tone}`); });
        (scene.choices || []).forEach(choice => {
          if (choice.nextScene && !story.scenes[choice.nextScene]) errors.push(`${story.id}/${sceneId}: unknown scene ${choice.nextScene}`);
          if (choice.nextStory && !(data.stories || []).some(s => s.id === choice.nextStory)) errors.push(`${story.id}/${sceneId}: unknown story ${choice.nextStory}`);
        });
      });
    });
    return errors;
  }

  window.BLACKED_PHASE4 = {
    getDiagnostics,
    getState: () => ({version:state.version,tone:state.tone,loaded:state.loaded,activeStoryId:state.activeStoryId,activeSceneId:state.activeSceneId,characterCardCreated:state.characterCardCreated,preferences:{...state.characterPreferences},errors:[...state.errors]}),
    setTone,
    openStory,
    createVibeCard,
    clearPreferences,
    validateData
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
