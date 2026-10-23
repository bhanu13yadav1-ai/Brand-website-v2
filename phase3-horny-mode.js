/* BLACKED V3 Phase 3 — adult fictional mood controls. Additive, local-only, no external dependencies. */
(() => {
  'use strict';
  if (document.documentElement.dataset.blackedPhase3HornyMode === 'ready') return;
  document.documentElement.dataset.blackedPhase3HornyMode = 'ready';

  const STORAGE_KEY = 'blackedV3RandiModeSettings';
  const DEFAULTS = Object.freeze({ language: 'hinglish', mood: 'teasing', profanity: false });
  const VALID_LANGUAGES = new Set(['hinglish', 'hi', 'en']);
  const VALID_MOODS = new Set(['flirty', 'teasing', 'bold', 'wild']);
  const LABELS = {
    flirty: { en: 'Flirty', hi: 'इश्क़िया', hinglish: 'Flirty' },
    teasing: { en: 'Teasing', hi: 'शरारती', hinglish: 'Teasing' },
    bold: { en: 'Bold', hi: 'बेबाक', hinglish: 'Bold' },
    wild: { en: 'Wild', hi: 'बेधड़क', hinglish: 'Wild' }
  };
  const VIBES = {
    en: {
      flirty: 'Start with a warm compliment, keep the mood light, and ask what kind of attention feels good today.',
      teasing: 'Try playful banter, one cheeky fictional challenge, and a clear chance for everyone to skip.',
      bold: 'Use confident words, honest curiosity, and a direct check-in before taking the story any further.',
      wild: 'Go for high-energy fictional roleplay and dramatic chemistry; mutual agreement comes before every next step.'
    },
    hi: {
      flirty: 'एक प्यारी तारीफ़ से शुरुआत करो, माहौल हल्का रखो और पूछो कि आज किस तरह की attention अच्छी लगेगी।',
      teasing: 'थोड़ी शरारती बातचीत, एक मज़ेदार काल्पनिक challenge और skip करने का पूरा विकल्प रखो।',
      bold: 'आत्मविश्वास से बात करो, खुलकर पूछो और कहानी आगे बढ़ाने से पहले साफ़ सहमति लो।',
      wild: 'ज़ोरदार काल्पनिक roleplay और filmy chemistry रखो—हर अगले कदम से पहले दोनों की सहमति ज़रूरी है।'
    },
    hinglish: {
      flirty: 'Halki si flirting se start karo, ek genuine tareef do, aur poochho ki aaj kis type ki attention achchi lagegi.',
      teasing: 'Thoda playful banter, ek cheeky fictional challenge, aur skip karne ka full option rakho.',
      bold: 'Confident baat karo, seedha check-in lo, aur story aage badhane se pehle clear yes zaroor ho.',
      wild: 'High-energy fictional roleplay aur full filmy chemistry—lekin har next step mutual yes ke baad hi.'
    }
  };
  const GAALI_BITS = {
    en: 'Damn, the vibe is bold today—still, ask first and respect the answer.',
    hi: 'अरे यार, आज mood बड़ा filmy है—पहले साफ़ पूछो और जवाब की इज़्ज़त करो।',
    hinglish: 'Saala, aaj mood full filmy hai—pehle clearly poochho, phir answer respect karo.'
  };

  const state = { ...DEFAULTS };
  function readPreferences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.length > 3000) return;
      const parsed = JSON.parse(raw);
      if (VALID_LANGUAGES.has(parsed.language)) state.language = parsed.language;
      if (VALID_MOODS.has(parsed.mood)) state.mood = parsed.mood;
      if (typeof parsed.profanity === 'boolean') state.profanity = parsed.profanity;
    } catch (_) { /* Browser storage may be blocked; defaults still work. */ }
  }
  function savePreferences() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ language: state.language, mood: state.mood, profanity: state.profanity })); }
    catch (_) { setStatus('Settings work for this visit, but this browser could not save them.'); }
  }
  function setStatus(message) {
    const status = document.getElementById('v3ModeStatus');
    if (status) status.textContent = message;
  }
  function makeMarkup() {
    return `
      <section class="v3-randi-mode" id="v3-randi-mode" aria-labelledby="v3RandiTitle">
        <div class="v3-randi-mode__topline"><span class="v3-randi-mode__eyebrow">18+ · FICTIONAL MOOD STUDIO</span><span class="v3-randi-mode__local"><span aria-hidden="true">●</span> On-device preferences</span></div>
        <div class="v3-randi-mode__hero">
          <div class="v3-randi-mode__copy">
            <p class="v3-randi-mode__micro">Your mood. Your language. Your limits.</p>
            <h2 id="v3RandiTitle">SUPER HORNY <span>/</span><br><em>RANDI MODE</em></h2>
            <p class="v3-randi-mode__intro">Choose a vibe for adult fictional banter. Keep it playful, keep your choices yours, and skip anything that does not feel right.</p>
            <div class="v3-randi-mode__chips"><span>Consent-first</span><span>Skip anytime</span><span>No public sharing</span></div>
          </div>
          <div class="v3-randi-mode__orb" aria-hidden="true"><span class="v3-randi-mode__orb-core">MOOD<br>ON</span><i></i><b></b><small>AFTER DARK</small></div>
        </div>
        <div class="v3-randi-mode__controls">
          <div class="v3-randi-mode__section-heading"><div><p class="v3-randi-mode__step">01 · PICK YOUR VIBE</p><h3>Mood intensity</h3></div><span class="v3-randi-mode__selection" id="v3ModeSelection">TEASING</span></div>
          <div class="v3-randi-mode__moods" role="group" aria-label="Choose fictional mood intensity">
            <button type="button" class="v3-randi-mode__mood" data-v3-mode-mood="flirty" aria-pressed="false"><span class="v3-randi-mode__mood-icon" aria-hidden="true">♡</span><b>Flirty</b><small>Soft sparks</small></button>
            <button type="button" class="v3-randi-mode__mood" data-v3-mode-mood="teasing" aria-pressed="true"><span class="v3-randi-mode__mood-icon" aria-hidden="true">✦</span><b>Teasing</b><small>Playful banter</small></button>
            <button type="button" class="v3-randi-mode__mood" data-v3-mode-mood="bold" aria-pressed="false"><span class="v3-randi-mode__mood-icon" aria-hidden="true">↗</span><b>Bold</b><small>Confident words</small></button>
            <button type="button" class="v3-randi-mode__mood" data-v3-mode-mood="wild" aria-pressed="false"><span class="v3-randi-mode__mood-icon" aria-hidden="true">⚡</span><b>Wild</b><small>High energy</small></button>
          </div>
          <div class="v3-randi-mode__settings">
            <label class="v3-randi-mode__field" for="v3ModeLanguage"><span><b>02 · LANGUAGE</b><small>Choose the voice for your prompt</small></span><select id="v3ModeLanguage" name="v3ModeLanguage"><option value="hinglish">Hindi + Hinglish</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label>
            <label class="v3-randi-mode__toggle" for="v3ModeProfanity"><span class="v3-randi-mode__toggle-copy"><b>03 · DESI GAALI MODE</b><small>Allow mild swear/slang in the generated line</small></span><input id="v3ModeProfanity" type="checkbox"><span class="v3-randi-mode__switch" aria-hidden="true"></span></label>
          </div>
          <label class="v3-randi-mode__age" for="v3ModeAdult"><input id="v3ModeAdult" type="checkbox"><span><b>I confirm I am 18 or older.</b><small>This control only opens fictional prompts. The existing age gate still applies to Stories, Wellness and Couples screens.</small></span></label>
          <div class="v3-randi-mode__actions"><button class="v3-randi-mode__primary" type="button" id="v3GenerateMood"><span aria-hidden="true">✦</span> Generate my vibe</button><button class="v3-randi-mode__reset" type="button" id="v3ResetMood">Reset choices</button></div>
          <div class="v3-randi-mode__result" id="v3ModeResult" hidden aria-labelledby="v3ModeResultTitle"><p class="v3-randi-mode__step">YOUR FICTIONAL MOOD</p><h3 id="v3ModeResultTitle">Your vibe</h3><p id="v3ModeResultText"></p><div class="v3-randi-mode__result-actions"><button type="button" data-v3-mode-open="stories">Explore Stories 18+</button><button type="button" data-v3-mode-open="boyfriend">Boyfriend & Couples</button><button type="button" id="v3DismissMood">Close</button></div></div>
          <p class="v3-randi-mode__status" id="v3ModeStatus" role="status" aria-live="polite">Your choices stay in this browser. No mood answer is sent anywhere.</p>
          <p class="v3-randi-mode__disclaimer">Adults only · fiction, not real-life consent · a wheel result or prompt never proves desire. You can skip, pause or stop at any time.</p>
        </div>
      </section>`;
  }
  function syncControls(root) {
    root.querySelectorAll('[data-v3-mode-mood]').forEach(button => {
      const selected = button.dataset.v3ModeMood === state.mood;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-selected', selected);
    });
    const language = root.querySelector('#v3ModeLanguage');
    const profanity = root.querySelector('#v3ModeProfanity');
    const selection = root.querySelector('#v3ModeSelection');
    if (language) language.value = state.language;
    if (profanity) profanity.checked = state.profanity;
    if (selection) selection.textContent = state.mood.toUpperCase();
  }
  function generate() {
    const language = state.language;
    const title = LABELS[state.mood][language] || LABELS[state.mood].en;
    let text = VIBES[language][state.mood];
    if (state.profanity) text += ` ${GAALI_BITS[language]}`;
    const result = document.getElementById('v3ModeResult');
    const titleNode = document.getElementById('v3ModeResultTitle');
    const textNode = document.getElementById('v3ModeResultText');
    if (!result || !titleNode || !textNode) return;
    titleNode.textContent = `${title} · ${state.profanity ? 'Desi slang ON' : 'Clean language'}`;
    textNode.textContent = text;
    result.hidden = false;
    setStatus('New fictional vibe ready. It was generated on this device, not sent to a server.');
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }
  function openView(view) {
    const target = document.querySelector(`#mainNav [data-view-link="${view}"]`) || document.querySelector(`[data-view-link="${view}"]`);
    if (target) target.click();
  }
  function wire(root) {
    root.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const mood = target.closest('[data-v3-mode-mood]');
      if (mood) {
        state.mood = VALID_MOODS.has(mood.dataset.v3ModeMood) ? mood.dataset.v3ModeMood : DEFAULTS.mood;
        savePreferences(); syncControls(root); setStatus(`${LABELS[state.mood][state.language]} mood selected.`); return;
      }
      if (target.closest('#v3GenerateMood')) {
        const age = root.querySelector('#v3ModeAdult');
        if (!age?.checked) { setStatus('Please confirm you are 18+ before generating an adult fictional prompt.'); age?.focus(); return; }
        generate(); return;
      }
      if (target.closest('#v3ResetMood')) {
        Object.assign(state, DEFAULTS); savePreferences(); syncControls(root);
        const age = root.querySelector('#v3ModeAdult'); if (age) age.checked = false;
        const result = root.querySelector('#v3ModeResult'); if (result) result.hidden = true;
        setStatus('Choices reset to the default Hinglish · Teasing · Clean setup.'); return;
      }
      if (target.closest('#v3DismissMood')) { const result = root.querySelector('#v3ModeResult'); if (result) result.hidden = true; return; }
      const route = target.closest('[data-v3-mode-open]');
      if (route) openView(route.dataset.v3ModeOpen);
    });
    root.addEventListener('change', event => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
      if (target.id === 'v3ModeLanguage' && VALID_LANGUAGES.has(target.value)) {
        state.language = target.value; savePreferences(); syncControls(root);
        setStatus(`Language set to ${target.options[target.selectedIndex]?.textContent || target.value}.`);
      } else if (target.id === 'v3ModeProfanity') {
        state.profanity = target.checked; savePreferences();
        setStatus(state.profanity ? 'Desi gaali mode is on. Mild slang may appear in prompts.' : 'Clean language is on.');
      }
    });
  }
  function boot() {
    const home = document.getElementById('view-home');
    const hero = home?.querySelector('.hero');
    if (!home || !hero) { document.documentElement.dataset.blackedPhase3HornyMode = 'error'; return; }
    if (document.getElementById('v3-randi-mode')) return;
    readPreferences();
    hero.insertAdjacentHTML('afterend', makeMarkup());
    const root = document.getElementById('v3-randi-mode');
    if (!root) { document.documentElement.dataset.blackedPhase3HornyMode = 'error'; return; }
    syncControls(root); wire(root);
    document.documentElement.dataset.blackedPhase3HornyMode = 'ready';
    window.BLACKED_V3_PHASE3 = {
      version: '3.0.0',
      getState: () => ({ language: state.language, mood: state.mood, profanity: state.profanity }),
      generate: () => { const age = root.querySelector('#v3ModeAdult'); if (!age?.checked) return { ok: false, reason: 'age-confirmation-required' }; generate(); return { ok: true }; },
      getDiagnostics: () => ({
        inserted: !!document.getElementById('v3-randi-mode'),
        moodButtons: root.querySelectorAll('[data-v3-mode-mood]').length,
        languageOptions: root.querySelectorAll('#v3ModeLanguage option').length,
        profanityControl: !!root.querySelector('#v3ModeProfanity'),
        ageConfirmation: !!root.querySelector('#v3ModeAdult'),
        result: !root.querySelector('#v3ModeResult')?.hidden
      })
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
