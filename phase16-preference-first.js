/* BLACKED V4 Phase 16 — preference-first fictional match + adjustable language intensity.
 * Additive module: preserves existing wheels, stories, messages, wishlists and catalog data.
 * Preferences are stored only in this browser. All characters/routes are fictional adults.
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE16) return;

  const PREF_KEY = 'blackedV4PreferenceFirst';
  const GAALI_KEY = 'blackedV4GaaliLevel';
  const LEVELS = ['clean', 'light', 'medium', 'full'];
  const DEFAULTS = Object.freeze({ vibe: 'romantic', size: 'none', thickness: 'none', skin: 'none', build: 'none', language: 'hinglish', gaali: 'clean' });
  const VIBE_MAP = {
    romantic: { archetype: 'romantic', story: 'romantic', mood: 'gentle' },
    playful: { archetype: 'confident', story: 'roleplay', mood: 'playful' },
    bold: { archetype: 'sturdy', story: 'roleplay', mood: 'confident' },
    mysterious: { archetype: 'sturdy', story: 'dark-romance', mood: 'mysterious' },
    surprise: { archetype: 'active', story: 'active', mood: 'playful' }
  };
  const LABELS = {
    vibe: { romantic: 'Romantic', playful: 'Playful teasing', bold: 'Bold / confident', mysterious: 'Dark romance / mystery', surprise: 'Surprise me' },
    size: { none: 'No size preference', small: 'Compact · up to 10 cm reference', medium: 'Medium · 10–12 cm reference', large: 'Large · 12–14 cm reference', xl: 'XL label · 14+ cm reference' },
    thickness: { none: 'No preference', slim: 'Slimmer reference', average: 'Average reference', thick: 'Thicker reference' },
    skin: { none: 'No preference', light: 'Light / fair', medium: 'Medium brown', deep: 'Deep brown / dark' },
    build: { none: 'No preference', lean: 'Lean', athletic: 'Athletic', broad: 'Broad / muscular', stocky: 'Stocky / sturdy' },
    language: { hinglish: 'Hindi + Hinglish', hi: 'Hindi', en: 'English' },
    gaali: { clean: 'Clean', light: 'Light gaali', medium: 'Medium gaali', full: 'Full Desi gaali' }
  };
  const GAALI_LINES = {
    hinglish: {
      light: 'Saala, hint dena chhod aur seedha bata kya vibe chahiye—no ka matlab no hi rahega.',
      medium: 'Bhenchod, itne hints kyun? Apni choice seedhi bol; dono ki haan hogi tabhi aage badhenge.',
      full: 'Bhenchod, bakchodi chhod aur apni pasand seedhi bol—lekin “no” suna toh scene wahi khatam. No pressure, no bullshit.'
    },
    hi: {
      light: 'साला, इशारों में मत घुमा—अपनी पसंद साफ़ बता; ना का मतलब ना ही है।',
      medium: 'भेनचोद, इतने इशारे क्यों? अपनी पसंद सीधे बता—दोनों की हाँ होगी तभी आगे बढ़ेंगे।',
      full: 'भेनचोद, बकचोदी छोड़ और साफ़ बता कि क्या पसंद है—ना सुना तो बात वहीं खत्म। कोई दबाव नहीं।'
    },
    en: {
      light: 'Damn, stop hinting and say what vibe you want—no still means no.',
      medium: 'Fuck, why all the hints? Say what you want straight; both people have to be into it.',
      full: 'Fuck the guessing—say what you want, but a no ends it. No pressure, no bullshit.'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const make = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };
  let prefs = readPrefs();
  let syncingControls = false;

  function readPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
      const result = { ...DEFAULTS };
      Object.keys(DEFAULTS).forEach(key => { if (Object.prototype.hasOwnProperty.call(LABELS[key], saved[key])) result[key] = saved[key]; });
      const separateLevel = localStorage.getItem(GAALI_KEY);
      if (LEVELS.includes(separateLevel)) result.gaali = separateLevel;
      return result;
    } catch (_) { return { ...DEFAULTS }; }
  }
  function savePrefs() {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
      localStorage.setItem(GAALI_KEY, prefs.gaali);
    } catch (_) { /* Keep the current session usable if storage is blocked. */ }
  }
  function makeField(id, label, entries) {
    const wrapper = make('label', 'v4-pref-field');
    const heading = make('span', 'v4-pref-field-label', label);
    const select = make('select'); select.id = id; select.name = id;
    entries.forEach(([value, text]) => { const opt = make('option', '', text); opt.value = value; select.append(opt); });
    wrapper.append(heading, select); return wrapper;
  }
  function createPreferencePanel(view) {
    if ($('#v4PreferenceFirst', view)) return;
    const intro = $('.page-intro', view); if (!intro) return;
    const panel = make('section', 'v4-pref-first'); panel.id = 'v4PreferenceFirst';
    panel.setAttribute('aria-labelledby', 'v4PrefTitle');
    const top = make('div', 'v4-pref-top');
    const avatar = document.createElement('img'); avatar.src = './phase16-host-avatar.svg'; avatar.alt = 'Illustrated fictional adult woman hosting the preference setup'; avatar.width = 108; avatar.height = 108; avatar.loading = 'lazy';
    const introCopy = make('div', 'v4-pref-intro-copy');
    introCopy.append(make('p', 'v4-pref-eyebrow', 'START HERE · FICTIONAL ADULT MATCH'));
    const title = make('h2', '', '“Pehle apni pasand batao…”'); title.id = 'v4PrefTitle';
    introCopy.append(title, make('p', 'v4-pref-lede', 'Hey! Main tumhari fictional adult character host hoon. Pehle tumhari pasand poochungi, phir existing Boyfriend Studio mein match setup karungi. Har choice optional hai—no preference bhi bilkul theek.'));
    const avatarWrap = make('div', 'v4-pref-avatar'); avatarWrap.append(avatar, make('span', '', 'FICTIONAL HOST · 18+ ONLY'));
    top.append(introCopy, avatarWrap);
    const form = make('form', 'v4-pref-form'); form.id = 'v4PreferenceForm';
    const progressWrap = make('div', 'v4-pref-progress-wrap');
    const progressLabel = make('p', 'v4-pref-step-label', 'STEP 1 OF 3 · YOUR VIBE'); progressLabel.id = 'v4PrefStepLabel';
    const progressTrack = make('div', 'v4-pref-progress'); progressTrack.setAttribute('role','progressbar'); progressTrack.setAttribute('aria-label','Preference setup progress'); progressTrack.setAttribute('aria-valuemin','1'); progressTrack.setAttribute('aria-valuemax','3'); progressTrack.setAttribute('aria-valuenow','1');
    const progressFill = make('span', 'v4-pref-progress-fill'); progressTrack.append(progressFill); progressWrap.append(progressLabel, progressTrack);
    const fields = make('div', 'v4-pref-grid');
    const step1 = make('section', 'v4-pref-step'); step1.dataset.step = '0'; step1.setAttribute('aria-label','Step 1: vibe and size preferences');
    step1.append(makeField('v4PrefVibe', '1 · Kaisi vibe pasand hai?', [['romantic','Romantic'],['playful','Playful teasing'],['bold','Bold / confident'],['mysterious','Dark romance / mystery'],['surprise','Surprise me']]));
    step1.append(makeField('v4PrefSize', '2 · Size reference (optional)', [['none','No preference'],['small','Compact · up to 10 cm'],['medium','Medium · 10–12 cm'],['large','Large · 12–14 cm'],['xl','XL label · 14+ cm']]));
    step1.append(makeField('v4PrefThickness', '3 · Thickness / girth (optional)', [['none','No preference'],['slim','Slimmer reference'],['average','Average reference'],['thick','Thicker reference']]));
    const step2 = make('section', 'v4-pref-step'); step2.dataset.step = '1'; step2.hidden = true; step2.setAttribute('aria-label','Step 2: fictional character look');
    step2.append(makeField('v4PrefSkin', '4 · Skin shade / styling', [['none','No preference'],['light','Light / fair'],['medium','Medium brown'],['deep','Deep brown / dark']]));
    step2.append(makeField('v4PrefBuild', '5 · Body build', [['none','No preference'],['lean','Lean'],['athletic','Athletic'],['broad','Broad / muscular'],['stocky','Stocky / sturdy']]));
    const step3 = make('section', 'v4-pref-step'); step3.dataset.step = '2'; step3.hidden = true; step3.setAttribute('aria-label','Step 3: language and dialogue style');
    step3.append(makeField('v4PrefLanguage', '6 · Kis language mein?', [['hinglish','Hindi + Hinglish'],['hi','Hindi'],['en','English']]));
    step3.append(makeField('v4PrefGaali', '7 · Gaali intensity', [['clean','Clean'],['light','Light gaali'],['medium','Medium gaali'],['full','Full Desi gaali']]));
    fields.append(step1, step2, step3); form.append(progressWrap, fields);
    const note = make('p', 'v4-pref-note', 'Size/thickness sirf fictional adult-character references hain. Skin shade aur body build styling ko affect karte hain—not personality, worth ya behaviour. Ye preferences kisi real person ko label nahi karti.');
    form.append(note);
    const ageLabel = make('label', 'v4-pref-age'); const age = document.createElement('input'); age.type = 'checkbox'; age.id = 'v4PrefAdult';
    const ageCopy = make('span', '', 'I confirm I am 18 or older.'); ageLabel.append(age, ageCopy); ageLabel.hidden = true; form.append(ageLabel);
    const stepControls = make('div', 'v4-pref-step-controls');
    const back = make('button', 'v4-pref-secondary', '← Back'); back.type = 'button'; back.id = 'v4PrefBack';
    const next = make('button', 'v4-pref-primary', 'Next step →'); next.type = 'button'; next.id = 'v4PrefNext';
    stepControls.append(back,next); form.append(stepControls);
    const actions = make('div', 'v4-pref-actions'); actions.hidden = true;
    const surprise = make('button', 'v4-pref-secondary', 'Surprise me'); surprise.type = 'button'; surprise.id = 'v4PrefSurprise';
    const reset = make('button', 'v4-pref-secondary', 'Reset'); reset.type = 'button'; reset.id = 'v4PrefReset';
    const submit = make('button', 'v4-pref-primary', 'Build my fictional match ↗'); submit.type = 'submit';
    actions.append(surprise, reset, submit); form.append(actions);
    const status = make('p', 'v4-pref-status', 'Step 1/3 · Tum baad mein bhi choices change kar sakte ho.'); status.id = 'v4PrefStatus'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
    panel.append(top, form, status);
    intro.insertAdjacentElement('afterend', panel); // First question inside the Boyfriend screen.
    let currentStep = 0;
    const stepNames = ['STEP 1 OF 3 · YOUR VIBE','STEP 2 OF 3 · CHARACTER LOOK','STEP 3 OF 3 · LANGUAGE & STYLE'];
    function showStep(index, announce = false) {
      currentStep = Math.max(0, Math.min(2,index));
      fields.querySelectorAll('.v4-pref-step').forEach((step,i) => { step.hidden = i !== currentStep; });
      progressLabel.textContent = stepNames[currentStep];
      progressTrack.setAttribute('aria-valuenow',String(currentStep+1));
      progressFill.style.width = `${((currentStep+1)/3)*100}%`;
      back.hidden = currentStep === 0; next.hidden = currentStep === 2;
      ageLabel.hidden = currentStep !== 2; actions.hidden = currentStep !== 2;
      if (announce) status.textContent = currentStep === 0 ? 'Pehla step: vibe aur optional size/thickness preferences choose karo.' : currentStep === 1 ? 'Doosra step: character ki styling choose karo, ya no preference rehne do.' : 'Last step: language/gaali choose karo. Build se pehle 18+ confirm karna hoga.';
      if (announce) progressLabel.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto':'smooth',block:'nearest'});
    }
    back.addEventListener('click', () => showStep(currentStep-1,true));
    next.addEventListener('click', () => showStep(currentStep+1,true));
    syncFields(panel); showStep(0);
    fields.addEventListener('change', event => {
      const target = event.target;
      const keys = { v4PrefVibe:'vibe', v4PrefSize:'size', v4PrefThickness:'thickness', v4PrefSkin:'skin', v4PrefBuild:'build', v4PrefLanguage:'language', v4PrefGaali:'gaali' };
      const key = keys[target.id]; if (!key) return;
      if (key === 'vibe' && target.value === 'surprise') {
        prefs.vibe = ['romantic','playful','bold','mysterious'][Math.floor(Math.random() * 4)];
        syncFields(panel); savePrefs(); status.textContent = `Surprise vibe: ${LABELS.vibe[prefs.vibe]}. Baaki choices tum khud set kar sakte ho.`; return;
      }
      prefs[key] = target.value; savePrefs();
      if (key === 'gaali' || key === 'language') syncAllTools();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (currentStep !== 2) { showStep(2,true); return; }
      if (!age.checked) { status.textContent = 'Pehle 18+ confirmation check karo. Adult settings abhi apply nahi hui.'; age.focus(); return; }
      applyPreferences(panel);
    });
    surprise.addEventListener('click', () => {
      const pick = (values) => values[Math.floor(Math.random() * values.length)];
      prefs = { ...prefs,
        vibe: pick(['romantic','playful','bold','mysterious']),
        size: pick(['none','small','medium','large','xl']),
        thickness: pick(['none','slim','average','thick']),
        skin: pick(['none','light','medium','deep']),
        build: pick(['none','lean','athletic','broad','stocky'])
      };
      syncFields(panel); savePrefs(); status.textContent = 'Surprise choices ready. Review them and confirm 18+ before applying.';
    });
    reset.addEventListener('click', () => {
      prefs = { ...DEFAULTS };
      try { localStorage.removeItem(PREF_KEY); localStorage.removeItem(GAALI_KEY); } catch (_) {}
      syncFields(panel); age.checked = false; showStep(0); status.textContent = 'Choices reset. Existing stories, wheels, messages and saved items are untouched.'; syncAllTools();
    });
  }
  function syncFields(panel) {
    const ids = { v4PrefVibe:'vibe', v4PrefSize:'size', v4PrefThickness:'thickness', v4PrefSkin:'skin', v4PrefBuild:'build', v4PrefLanguage:'language', v4PrefGaali:'gaali' };
    Object.entries(ids).forEach(([id,key]) => { const el = $('#'+id,panel); if (el) el.value = prefs[key]; });
  }
  function syncRandiControls() {
    const root = $('#v3-randi-mode'); if (!root) return;
    const language = $('#v3ModeLanguage', root); if (language && language.value !== prefs.language) { language.value = prefs.language; language.dispatchEvent(new Event('change',{bubbles:true})); }
    const level = $('#v4GaaliLevel', root); if (level && level.value !== prefs.gaali) { level.value = prefs.gaali; level.dispatchEvent(new Event('change',{bubbles:true})); }
  }
  function applyPreferences(panel) {
    const view = $('#view-boyfriend'); const status = $('#v4PrefStatus', panel);
    const form = $('#v6FantasyBuilderForm', view);
    if (!form) { status.textContent = 'Boyfriend Studio abhi load ho raha hai. Screen ko ek baar open karke phir try karo.'; return; }
    const map = VIBE_MAP[prefs.vibe] || VIBE_MAP.romantic;
    const archetypeButton = $(`[data-v6-select-archetype="${map.archetype}"]`, view);
    if (archetypeButton) archetypeButton.click();
    const type = $('#v6StoryType', form); if (type && [...type.options].some(option => option.value === map.story)) type.value = map.story;
    const mood = $('#v6StoryMood', form); if (mood) mood.value = map.mood;
    const size = $('#v6SizePreference', form); if (size) size.value = prefs.size;
    const custom = $('#v6CustomVibe', form);
    if (custom) {
      const details = [];
      if (prefs.thickness !== 'none') details.push(`girth: ${LABELS.thickness[prefs.thickness]}`);
      if (prefs.skin !== 'none') details.push(`skin: ${LABELS.skin[prefs.skin]}`);
      if (prefs.build !== 'none') details.push(`build: ${LABELS.build[prefs.build]}`);
      details.push(`language: ${LABELS.language[prefs.language]}`, `gaali: ${LABELS.gaali[prefs.gaali]}`);
      const existing = custom.value.trim().replace(/^Styling preference only:.*?\.\s*/i, '');
      const line = `Styling preference only: ${details.join('; ')}.`;
      const roomForExisting = Math.max(0, 180 - line.length - (existing ? 1 : 0));
      custom.value = [line, existing.slice(0, roomForExisting)].filter(Boolean).join(' ').slice(0, 180);
    }
    savePrefs(); syncAllTools();
    status.textContent = 'Preference card ready. Sirf fictional character/style aur existing story builder update hua; kuch send ya publish nahi hua.';
    form.requestSubmit();
    const result = $('#v6FantasyResult', view);
    if (result) setTimeout(() => result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest' }), 80);
  }

  function setSelectValue(selector, value) {
    const el = $(selector); if (!el || el.value === value) return;
    if (![...el.options].some(option => option.value === value)) return;
    el.value = value; el.dispatchEvent(new Event('change', { bubbles:true }));
  }
  function syncAllTools() {
    if (syncingControls) return;
    syncingControls = true;
    try {
      syncRandiControls();
      setSelectValue('#p5DirtyLanguage', prefs.language);
      setSelectValue('#p5WheelLanguage', prefs.language);
      setSelectValue('#v4P5GaaliLevel', prefs.gaali);
      setSelectValue('#p4FantasyBuilder [data-p4-select="language"]', prefs.language);
      setSelectValue('#p4FantasyBuilder [data-p4-select="profanity"]', String(prefs.gaali !== 'clean'));
      const panelLang = $('#v4PrefLanguage'); if (panelLang && panelLang.value !== prefs.language) panelLang.value = prefs.language;
      const panelGaali = $('#v4PrefGaali'); if (panelGaali && panelGaali.value !== prefs.gaali) panelGaali.value = prefs.gaali;
    } finally { syncingControls = false; }
  }
  function enhanceP5Studio(studio) {
    if (!studio || studio.dataset.v4GaaliEnhanced === 'true') return;
    const language = $('#p5DirtyLanguage', studio);
    const oldToggle = $('#p5MildGaali', studio)?.closest('.p5-experience__age');
    if (oldToggle) oldToggle.style.display = 'none';
    const card = $('#p5DirtyTitle', studio)?.closest('.p5-experience__card');
    if (card && !$('#v4P5GaaliLevel', card)) {
      const field = make('label', 'p5-experience__field v4-p5-gaali-field', 'Gaali intensity');
      const select = document.createElement('select'); select.id = 'v4P5GaaliLevel'; select.name = 'v4P5GaaliLevel';
      [['clean','Clean'],['light','Light gaali'],['medium','Medium gaali'],['full','Full Desi gaali']].forEach(([value,label]) => { const opt=make('option','',label); opt.value=value; select.append(opt); });
      field.append(select);
      if (language?.closest('label')) language.closest('label').insertAdjacentElement('afterend', field); else card.append(field);
      select.value = prefs.gaali;
      select.addEventListener('change', () => { if (syncingControls) return; prefs.gaali = LEVELS.includes(select.value) ? select.value : 'clean'; savePrefs(); syncAllTools(); });
    }
    if (language) { language.value = prefs.language; }
    const wheelLanguage = $('#p5WheelLanguage', studio); if (wheelLanguage) wheelLanguage.value = prefs.language;
    const oldCheckbox = $('#p5MildGaali', studio); if (oldCheckbox) oldCheckbox.checked = false;
    studio.dataset.v4GaaliEnhanced = 'true';
  }
  function updateGeneratedOutput(node) {
    if (!node || node.dataset.v4GaaliPending !== 'true') return;
    node.dataset.v4GaaliPending = 'false';
    const level = prefs.gaali;
    if (level === 'clean') return;
    const language = (node.id === 'p5WheelResult' ? $('#p5WheelLanguage')?.value
      : node.id === 'p5DirtyOutput' ? $('#p5DirtyLanguage')?.value
      : node.id === 'p4FantasyOutputText' ? $('#p4FantasyBuilder [data-p4-select="language"]')?.value
      : $('#v3ModeLanguage')?.value) || prefs.language;
    const phrase = GAALI_LINES[language]?.[level] || GAALI_LINES.hinglish[level];
    if (!phrase) return;
    if (node.id === 'p5WheelResult') {
      if (node.querySelector('.v4-gaali-note')) node.querySelector('.v4-gaali-note').remove();
      const line = make('span', 'v4-gaali-note', phrase); node.append(line); return;
    }
    let base = (node.textContent || '').trim();
    const allLines = Object.values(GAALI_LINES).flatMap(group => Object.values(group));
    for (const oldLine of allLines) if (base.endsWith(oldLine)) { base = base.slice(0, -oldLine.length).trim(); break; }
    node.textContent = `${base} ${phrase}`.trim();
  }
  function wireGeneratedOutputs() {
    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null; if (!target) return;
      let output = null;
      if (target.closest('#p5GenerateDirtyTalk') && $('#p5AdultConfirm')?.checked) output = $('#p5DirtyOutput');
      else if (target.closest('#p5SpinFantasy') && $('#p5AdultConfirm')?.checked) output = $('#p5WheelResult');
      else if (target.closest('#p4FantasyNext') && $('#p4FantasyAdult')?.checked && $('#p4FantasyStepLabel')?.textContent.includes('STEP 4')) output = $('#p4FantasyOutputText');
      if (output) output.dataset.v4GaaliPending = 'true';
    }, true);
    document.addEventListener('change', event => {
      const target = event.target; if (!(target instanceof HTMLSelectElement)) return;
      if (syncingControls) return;
      if (target.id === 'p5DirtyLanguage' || target.id === 'p5WheelLanguage' || target.matches('[data-p4-select="language"]') || target.id === 'v3ModeLanguage') {
        if (['hinglish','hi','en'].includes(target.value)) { prefs.language = target.value; savePrefs(); syncAllTools(); }
      } else if (target.matches('[data-p4-select="profanity"]')) {
        prefs.gaali = target.value === 'true' ? 'light' : 'clean'; savePrefs(); syncAllTools();
      }
    });
    const observer = new MutationObserver(records => {
      const ids = ['p5DirtyOutput','p5WheelResult','p4FantasyOutputText'];
      for (const id of ids) {
        const node = $('#'+id);
        if (!node || node.dataset.v4GaaliPending !== 'true') continue;
        const changed = records.some(record => record.target === node || node.contains(record.target) || [...record.addedNodes].some(added => added === node || node.contains(added)));
        if (changed) updateGeneratedOutput(node);
      }
    });
    observer.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
  }

  function enhanceRandiMode(root) {
    if (!root || root.dataset.v4GaaliEnhanced === 'true') return;
    const settings = $('.v3-randi-mode__settings', root);
    const oldToggle = $('.v3-randi-mode__toggle', settings || root);
    if (!settings) return;
    if (oldToggle) oldToggle.style.display = 'none';
    const field = make('label', 'v3-randi-mode__field v4-gaali-field'); field.htmlFor = 'v4GaaliLevel';
    const copy = make('span'); copy.append(make('b','', '03 · DESI GAALI MODE'), make('small','', 'Clean se full gaali tak. Naya generated prompt is voice mein aayega.'));
    const select = document.createElement('select'); select.id = 'v4GaaliLevel'; select.name = 'v4GaaliLevel';
    [['clean','Clean language'],['light','Light gaali'],['medium','Medium gaali'],['full','Full Desi gaali']].forEach(([value,label]) => { const opt=make('option','',label);opt.value=value;select.append(opt); });
    field.append(copy, select); settings.append(field);
    select.value = prefs.gaali;
    root.addEventListener('change', event => {
      const target = event.target;
      if (syncingControls) return;
      if (target instanceof HTMLSelectElement && target.id === 'v3ModeLanguage' && ['hinglish','hi','en'].includes(target.value)) { prefs.language = target.value; savePrefs(); syncAllTools(); }
    });
    select.addEventListener('change', () => {
      if (syncingControls) return;
      prefs.gaali = LEVELS.includes(select.value) ? select.value : 'clean'; savePrefs(); syncAllTools();
      const oldToggleInput = $('#v3ModeProfanity', root);
      if (oldToggleInput && oldToggleInput.checked !== (prefs.gaali !== 'clean')) {
        oldToggleInput.checked = prefs.gaali !== 'clean'; oldToggleInput.dispatchEvent(new Event('change',{bubbles:true}));
      }
      const status = $('#v3ModeStatus', root);
      if (status) status.textContent = `${LABELS.gaali[prefs.gaali]} selected. It applies to generated mood prompts; existing story text stays in its original language.`;
    });
    root.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null; if (!target) return;
      if (target.closest('#v3ResetMood')) { prefs.gaali = 'clean'; savePrefs(); select.value = 'clean'; syncAllTools(); return; }
      if (!target.closest('#v3GenerateMood')) return;
      const age = $('#v3ModeAdult', root); if (!age?.checked || prefs.gaali === 'clean') return;
      const textNode = $('#v3ModeResultText', root); const titleNode = $('#v3ModeResultTitle', root); if (!textNode || !titleNode) return;
      const language = $('#v3ModeLanguage', root)?.value || prefs.language;
      let base = textNode.textContent || '';
      const legacy = {
        hinglish: 'Saala, aaj mood full filmy hai—pehle clearly poochho, phir answer respect karo.',
        hi: 'अरे यार, आज mood बड़ा filmy है—पहले साफ़ पूछो और जवाब की इज़्ज़त करो।',
        en: 'Damn, the vibe is bold today—still, ask first and respect the answer.'
      };
      base = base.replace(legacy[language] || legacy.hinglish, '').trim();
      textNode.textContent = `${base} ${GAALI_LINES[language]?.[prefs.gaali] || GAALI_LINES.hinglish[prefs.gaali]}`.trim();
      const selected = $('#v3ModeSelection', root)?.textContent || 'MOOD';
      titleNode.textContent = `${selected} · ${LABELS.gaali[prefs.gaali]}`;
      const status = $('#v3ModeStatus', root); if (status) status.textContent = `Generated prompt updated in ${LABELS.language[language]} with ${LABELS.gaali[prefs.gaali]}. Existing story archive text has not been rewritten.`;
    });
    root.dataset.v4GaaliEnhanced = 'true';
    syncRandiControls();
  }
  function boot() {
    const view = $('#view-boyfriend'); if (view) createPreferencePanel(view);
    const mode = $('#v3-randi-mode'); if (mode) enhanceRandiMode(mode);
    enhanceP5Studio($('#p5FantasyStudio')); wireGeneratedOutputs(); syncAllTools();
    const observer = new MutationObserver(() => {
      const dynamicView = $('#view-boyfriend'); if (dynamicView) createPreferencePanel(dynamicView);
      const dynamicMode = $('#v3-randi-mode'); if (dynamicMode) enhanceRandiMode(dynamicMode);
      enhanceP5Studio($('#p5FantasyStudio'));
      const dynamicP4 = $('#p4FantasyBuilder');
      if (dynamicP4 && dynamicP4.dataset.v4PreferencesSynced !== 'true') { dynamicP4.dataset.v4PreferencesSynced = 'true'; syncAllTools(); }
    });
    observer.observe(document.documentElement, { childList:true, subtree:true });
    window.BLACKED_V4_PHASE16 = {
      version:'16.1.0',
      getDiagnostics: () => ({ preferencePanel:!!$('#v4PreferenceFirst'), firstInBoyfriend:!!$('#v4PreferenceFirst') && $('#v4PreferenceFirst').previousElementSibling?.classList.contains('page-intro'), wizardSteps:$('#v4PreferenceForm')?.querySelectorAll('.v4-pref-step').length || 0, thicknessPreference:!!$('#v4PrefThickness'), gaaliLevel:!!$('#v4GaaliLevel'), gaaliChoices:$('#v4GaaliLevel')?.options.length || 0, localOnly:true, oldFeaturesPreserved:true }),
      getPreferences: () => ({...prefs}),
      apply: () => { const panel=$('#v4PreferenceFirst'); if(panel) applyPreferences(panel); }
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true }); else boot();
})();
