/* BLACKED V3 Phase 3 + Phase 4 combined bundle — one local request, no framework or CDN. */
(() => {
  'use strict';
  if (document.documentElement.dataset.blackedPhase34Bundle === 'ready') return;
  const css = "/* BLACKED V3 Phase 3 — responsive Super Horny / Randi Mode. */\n.v3-randi-mode{--v3-rose:#f0a6bd;--v3-cream:#fff1f5;--v3-muted:#c4b3c0;--v3-line:rgba(249,207,225,.17);position:relative;isolation:isolate;margin:clamp(20px,3vw,30px) 0 34px;overflow:hidden;border:1px solid var(--v3-line);border-radius:26px;background:radial-gradient(ellipse at 84% 9%,rgba(116,35,81,.45),transparent 36%),linear-gradient(145deg,#24131f 0%,#130e15 56%,#100d12 100%);color:var(--v3-cream);box-shadow:0 18px 52px rgba(0,0,0,.22)}\n.v3-randi-mode *{box-sizing:border-box}.v3-randi-mode__topline{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px clamp(15px,3.4vw,28px);border-bottom:1px solid rgba(249,207,225,.11);font-size:10px;font-weight:800;letter-spacing:.12em}.v3-randi-mode__eyebrow{color:#f3c2d2}.v3-randi-mode__local{display:inline-flex;align-items:center;gap:6px;color:#cfc3ce;font-size:10px;font-weight:600;letter-spacing:.01em}.v3-randi-mode__local span{color:#95d7af;font-size:8px}.v3-randi-mode__hero{position:relative;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(150px,.65fr);gap:20px;align-items:center;padding:clamp(20px,4vw,34px) clamp(16px,3.4vw,28px) 25px}.v3-randi-mode__copy{position:relative;z-index:1;min-width:0}.v3-randi-mode__micro{margin:0 0 11px;color:#d9b9cc;font-size:11px;font-weight:650;letter-spacing:.035em}.v3-randi-mode h2{margin:0;font-size:clamp(28px,5.5vw,43px);font-weight:900;line-height:.98;letter-spacing:-.045em;overflow-wrap:anywhere}.v3-randi-mode h2 span{color:#b989a9;font-weight:500}.v3-randi-mode h2 em{display:inline-block;margin-top:6px;color:var(--v3-rose);font-style:normal;letter-spacing:-.035em}.v3-randi-mode__intro{max-width:540px;margin:14px 0 16px;color:#dfd1dc;font-size:13px;line-height:1.65}.v3-randi-mode__chips{display:flex;flex-wrap:wrap;gap:7px}.v3-randi-mode__chips span{display:inline-flex;align-items:center;min-height:27px;padding:5px 9px;border:1px solid rgba(245,203,224,.19);border-radius:999px;background:rgba(255,255,255,.035);color:#f3dce7;font-size:10px;font-weight:650}.v3-randi-mode__orb{position:relative;display:grid;place-items:center;justify-self:end;width:min(100%,214px);aspect-ratio:1;border:1px solid rgba(241,173,201,.3);border-radius:50%;background:radial-gradient(circle at 50% 45%,rgba(232,134,180,.26),rgba(98,42,83,.11) 37%,transparent 66%);box-shadow:inset 0 0 0 14px rgba(238,163,195,.035),0 0 54px rgba(165,66,124,.13)}.v3-randi-mode__orb:before,.v3-randi-mode__orb:after{position:absolute;inset:13%;content:\"\";border:1px solid rgba(244,198,217,.26);border-radius:46% 54% 52% 48%;transform:rotate(29deg)}.v3-randi-mode__orb:after{inset:24%;border-color:rgba(244,198,217,.18);transform:rotate(-37deg)}.v3-randi-mode__orb-core{position:relative;z-index:1;color:#ffe8f0;font-size:18px;font-weight:900;line-height:1.12;letter-spacing:.06em;text-align:center;text-shadow:0 0 23px rgba(244,144,188,.4)}.v3-randi-mode__orb i,.v3-randi-mode__orb b{position:absolute;display:block;width:7px;height:7px;border-radius:50%;background:#f5bed2;box-shadow:0 0 18px rgba(245,157,194,.9)}.v3-randi-mode__orb i{top:17%;right:24%}.v3-randi-mode__orb b{bottom:19%;left:19%;width:5px;height:5px}.v3-randi-mode__orb small{position:absolute;bottom:8%;color:#c8a9c0;font-size:8px;font-weight:800;letter-spacing:.23em}.v3-randi-mode__controls{padding:0 clamp(15px,3.4vw,28px) 22px}.v3-randi-mode__section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:0 0 13px;padding-top:17px;border-top:1px solid rgba(249,207,225,.12)}.v3-randi-mode__step{margin:0 0 5px;color:#db9eb7;font-size:10px;font-weight:850;letter-spacing:.11em}.v3-randi-mode__section-heading h3{margin:0;font-size:18px;line-height:1.2}.v3-randi-mode__selection{display:inline-flex;align-items:center;min-height:25px;padding:4px 9px;border:1px solid rgba(241,166,195,.32);border-radius:999px;color:#f4bed2;font-size:9px;font-weight:800;letter-spacing:.1em}.v3-randi-mode__moods{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.v3-randi-mode__mood{display:flex;min-width:0;min-height:96px;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:5px;padding:12px;border:1px solid rgba(244,206,226,.16);border-radius:15px;background:rgba(255,255,255,.028);color:var(--v3-cream);text-align:left;cursor:pointer;transition:background .18s,border-color .18s,transform .18s}.v3-randi-mode__mood-icon{display:grid;place-items:center;width:27px;height:27px;margin-bottom:2px;border-radius:9px;background:rgba(240,166,189,.09);color:#efadc4;font-size:18px}.v3-randi-mode__mood b{font-size:13px}.v3-randi-mode__mood small{color:#baabba;font-size:10px;line-height:1.35}.v3-randi-mode__mood:hover{border-color:rgba(240,166,189,.5)}.v3-randi-mode__mood.is-selected{border-color:rgba(240,166,189,.78);background:linear-gradient(155deg,rgba(197,88,140,.2),rgba(255,255,255,.03));box-shadow:inset 0 0 0 1px rgba(240,166,189,.1)}.v3-randi-mode button:focus-visible,.v3-randi-mode select:focus-visible,.v3-randi-mode input:focus-visible{outline:3px solid #f7bdd2;outline-offset:3px}.v3-randi-mode__settings{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px}.v3-randi-mode__field,.v3-randi-mode__toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:72px;padding:13px;border:1px solid rgba(244,206,226,.13);border-radius:14px;background:rgba(9,8,12,.33)}.v3-randi-mode__field>span,.v3-randi-mode__toggle-copy{display:flex;min-width:0;flex-direction:column;gap:5px}.v3-randi-mode__field b,.v3-randi-mode__toggle b{font-size:10px;font-weight:850;letter-spacing:.08em}.v3-randi-mode__field small,.v3-randi-mode__toggle small{color:#c1b1bf;font-size:10px;line-height:1.4}.v3-randi-mode__field select{max-width:46%;min-height:43px;padding:8px 28px 8px 10px;border:1px solid rgba(245,206,226,.24);border-radius:10px;background:#1b141e;color:#fff0f6;font-size:12px}.v3-randi-mode__toggle{position:relative;cursor:pointer}.v3-randi-mode__toggle input{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.v3-randi-mode__switch{position:relative;flex:0 0 43px;width:43px;height:26px;border:1px solid rgba(244,206,226,.28);border-radius:999px;background:#302432;transition:background .18s}.v3-randi-mode__switch:after{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#dccbd6;content:\"\";transition:transform .18s}.v3-randi-mode__toggle input:checked+.v3-randi-mode__switch{border-color:#d985aa;background:#873b62}.v3-randi-mode__toggle input:checked+.v3-randi-mode__switch:after{transform:translateX(17px);background:#fff0f6}.v3-randi-mode__toggle input:focus-visible+.v3-randi-mode__switch{outline:3px solid #f7bdd2;outline-offset:3px}.v3-randi-mode__age{display:flex;align-items:flex-start;gap:10px;margin-top:12px;padding:12px;border:1px solid rgba(245,206,226,.13);border-radius:13px;background:rgba(255,255,255,.022);cursor:pointer}.v3-randi-mode__age input{flex:0 0 18px;width:18px;height:18px;margin:2px 0 0;accent-color:#eb9dbb}.v3-randi-mode__age span{display:flex;flex-direction:column;gap:4px}.v3-randi-mode__age b{font-size:12px}.v3-randi-mode__age small{color:#c1b1bf;font-size:10px;line-height:1.55}.v3-randi-mode__actions{display:flex;align-items:center;gap:11px;margin-top:14px}.v3-randi-mode__primary,.v3-randi-mode__reset{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:12px 17px;border-radius:12px;font-size:13px;font-weight:800;cursor:pointer}.v3-randi-mode__primary{flex:1;border:1px solid #f3b4cb;background:linear-gradient(110deg,#f0aac3,#d67fa4 80%);color:#27131f;box-shadow:0 7px 24px rgba(187,68,122,.16)}.v3-randi-mode__primary:hover{filter:brightness(1.045)}.v3-randi-mode__reset{border:1px solid rgba(245,206,226,.2);background:rgba(255,255,255,.035);color:#f0dce7}.v3-randi-mode__result{margin-top:14px;padding:16px;border:1px solid rgba(240,166,189,.36);border-radius:16px;background:linear-gradient(130deg,rgba(95,41,76,.3),rgba(19,14,22,.96))}.v3-randi-mode__result[hidden]{display:none!important}.v3-randi-mode__result h3{margin:4px 0 7px;font-size:19px}.v3-randi-mode__result>p:not(.v3-randi-mode__step){margin:0;color:#eadce6;font-size:14px;line-height:1.72}.v3-randi-mode__result-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:13px}.v3-randi-mode__result-actions button{min-height:42px;padding:9px 11px;border:1px solid rgba(245,206,226,.21);border-radius:10px;background:rgba(255,255,255,.04);color:#fae9f1;font-size:11px;font-weight:700;cursor:pointer}.v3-randi-mode__status{min-height:20px;margin:12px 0 0;color:#cbbac8;font-size:11px;line-height:1.5}.v3-randi-mode__disclaimer{margin:7px 0 0;color:#a99aa7;font-size:10px;line-height:1.55}.v3-randi-mode[hidden]{display:none!important}\n@media(max-width:720px){.v3-randi-mode{border-radius:22px}.v3-randi-mode__hero{grid-template-columns:minmax(0,1fr) 98px;gap:12px;padding-top:23px;padding-bottom:20px}.v3-randi-mode__orb{width:98px;align-self:start;margin-top:14px}.v3-randi-mode__orb-core{font-size:12px}.v3-randi-mode__orb small{font-size:6px}.v3-randi-mode__orb:before{inset:12%}.v3-randi-mode__orb:after{inset:25%}.v3-randi-mode h2{font-size:clamp(26px,6.5vw,36px)}.v3-randi-mode__intro{font-size:12px}.v3-randi-mode__moods{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v3-randi-mode__mood{min-height:89px;padding:11px}.v3-randi-mode__settings{grid-template-columns:1fr}.v3-randi-mode__field,.v3-randi-mode__toggle{min-height:66px}.v3-randi-mode__field select{max-width:52%}.v3-randi-mode__topline{align-items:flex-start}.v3-randi-mode__eyebrow{max-width:60%;line-height:1.5}}\n@media(max-width:380px){.v3-randi-mode__hero{grid-template-columns:minmax(0,1fr);}.v3-randi-mode__orb{position:absolute;top:17px;right:14px;width:62px;opacity:.43}.v3-randi-mode__orb-core{font-size:9px}.v3-randi-mode__orb small{display:none}.v3-randi-mode h2{max-width:calc(100% - 8px);font-size:29px}.v3-randi-mode__topline{font-size:9px}.v3-randi-mode__local{max-width:43%;font-size:9px;text-align:right}.v3-randi-mode__chips span{font-size:9px}.v3-randi-mode__actions{align-items:stretch;flex-direction:column}.v3-randi-mode__primary,.v3-randi-mode__reset{width:100%}.v3-randi-mode__result-actions{flex-direction:column}.v3-randi-mode__result-actions button{width:100%}}\n@media(prefers-reduced-motion:reduce){.v3-randi-mode *,.v3-randi-mode *:before,.v3-randi-mode *:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}\n\n.p4-fantasy{--p4-line:#4d3649;--p4-pink:#f4a0c1;--p4-gold:#eacb8c;margin:26px 0 34px;border:1px solid #62465b;border-radius:24px;overflow:hidden;background:radial-gradient(ellipse at 95% 0%,#3c2138 0,transparent 46%),linear-gradient(140deg,#1b141e,#100d12 74%);box-shadow:0 16px 45px #0002;color:#fff5fa}\n.p4-fantasy *{box-sizing:border-box}.p4-fantasy__head{padding:22px 22px 18px;border-bottom:1px solid #392838}\n.p4-fantasy__eyebrow{margin:0 0 8px;color:var(--p4-gold);font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}\n.p4-fantasy__head h2{margin:0;font-size:clamp(24px,4vw,34px);letter-spacing:-.035em;line-height:1.08}\n.p4-fantasy__head h2 em{font-family:Georgia,serif;color:#ffc1d8;font-weight:500}\n.p4-fantasy__intro{max-width:680px;margin:10px 0 0;color:#cbbcc9;font-size:13px}\n.p4-fantasy__privacy{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}.p4-fantasy__privacy span{border:1px solid #4e3a4a;border-radius:999px;padding:5px 9px;color:#eadce7;font-size:10px}\n.p4-fantasy__progress{display:flex;gap:6px;padding:14px 22px 0}.p4-fantasy__progress button{flex:1;min-width:0;border:0;border-radius:999px;height:5px;padding:0;background:#3b2938;font-size:0}.p4-fantasy__progress button[aria-current=\"step\"]{background:linear-gradient(90deg,#e78db3,#f2d295)}\n.p4-fantasy__step-label{padding:9px 22px 0;color:#c9b8c6;font-size:11px}.p4-fantasy__step-label strong{color:#f8c6dc}\n.p4-fantasy__body{padding:17px 22px 22px}.p4-fantasy__panel[hidden]{display:none!important}\n.p4-fantasy__panel h3{font-size:20px;line-height:1.2;margin:0 0 6px}.p4-fantasy__hint{font-size:12px;color:#c0b1bf;margin:0 0 15px}\n.p4-fantasy__choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}\n.p4-fantasy__choice{width:100%;min-height:82px;text-align:left;border:1px solid #4b3749;border-radius:14px;padding:12px;background:#17121a;color:#fff5fa;display:flex;flex-direction:column;gap:5px}\n.p4-fantasy__choice b{font-size:13px}.p4-fantasy__choice small{font-size:11px;line-height:1.4;color:#c3b3c1}\n.p4-fantasy__choice[aria-pressed=\"true\"]{border-color:#f4a0c1;background:linear-gradient(145deg,#3d2237,#211722);box-shadow:inset 0 0 0 1px #f4a0c155}\n.p4-fantasy__fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:13px}\n.p4-fantasy__field{display:grid;gap:6px;font-size:12px;color:#f0e4ed;font-weight:650}\n.p4-fantasy__field select{width:100%;min-height:44px;padding:10px 11px;border:1px solid #574456;border-radius:11px;background:#100d12;color:#fff5fa;font:inherit;font-weight:450}\n.p4-fantasy__check{display:flex;gap:10px;align-items:flex-start;margin-top:15px;border:1px solid #554050;background:#1b141c;border-radius:12px;padding:12px;font-size:12px}\n.p4-fantasy__check input{margin-top:3px;accent-color:#f4a0c1;flex:none}.p4-fantasy__check small{display:block;color:#c6b7c4;line-height:1.45;margin-top:3px}\n.p4-fantasy__actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:space-between;margin-top:17px}\n.p4-fantasy__buttons{display:flex;gap:8px;flex-wrap:wrap}.p4-fantasy__btn{min-height:43px;border-radius:12px;padding:10px 14px;border:1px solid #62465b;background:#241923;color:#fff5fa;font-weight:750;font-size:12px}\n.p4-fantasy__btn--primary{border-color:#f4a0c1;background:#f4a0c1;color:#1b1018}.p4-fantasy__btn:disabled{opacity:.45}\n.p4-fantasy__status{margin:12px 0 0;min-height:18px;color:#f0cfe0;font-size:12px}.p4-fantasy__output{margin-top:14px;border:1px solid #6e4a63;border-radius:15px;padding:15px;background:linear-gradient(145deg,#2a1b2a,#17121a)}\n.p4-fantasy__output h4{font-size:15px;margin:0 0 8px;color:#ffd7e6}.p4-fantasy__output p{font-size:13px;line-height:1.7;margin:0;color:#f4e8f1;white-space:pre-wrap}\n.p4-fantasy__output-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}\n.p4-fantasy__fineprint{font-size:10px;line-height:1.5;color:#b5a5b3;margin:13px 0 0}\n@media(max-width:600px){.p4-fantasy{margin:22px 0;border-radius:20px}.p4-fantasy__head{padding:18px 16px 15px}.p4-fantasy__progress{padding:13px 16px 0}.p4-fantasy__step-label{padding:8px 16px 0}.p4-fantasy__body{padding:15px 16px 18px}.p4-fantasy__choices{gap:8px}.p4-fantasy__choice{min-height:78px;padding:10px}.p4-fantasy__fields{grid-template-columns:1fr}.p4-fantasy__actions{align-items:stretch}.p4-fantasy__buttons{width:100%}.p4-fantasy__btn{flex:1}.p4-fantasy__actions>.p4-fantasy__btn{width:100%}}\n";
  const style = document.createElement('style');
  style.id = 'blacked-phase34-bundle-styles';
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.dataset.blackedPhase34Bundle = 'ready';
})();
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


/* BLACKED V3 Phase 4 — local-only multi-step fantasy builder, bundled with Phase 3. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE4_FANTASY) return;
  const KEY = 'blackedV4FantasySettings';
  const defaults = { mood:'teasing', character:'confident', focus:'couple', sizeVibe:'balanced', language:'hinglish', intensity:'bold', boundaries:'consent', profanity:false };
  const state = {...defaults,step:1};
  const moods = {
    romantic:{en:'Slow-burn romantic',hi:'धीरे-धीरे बढ़ता रोमांस',hinglish:'Slow-burn romance'},
    teasing:{en:'Playful teasing',hi:'शरारती छेड़छाड़',hinglish:'Playful teasing'},
    desi:{en:'Desi bold banter',hi:'देसी बेबाक अंदाज़',hinglish:'Desi bold banter'},
    wild:{en:'High-energy fantasy',hi:'जोशीला काल्पनिक अंदाज़',hinglish:'High-energy fantasy'}
  };
  const characters = {
    confident:{en:'the confident adult partner',hi:'आत्मविश्वासी वयस्क साथी',hinglish:'confident adult partner'},
    playful:{en:'the playful adult partner',hi:'मज़ाकिया वयस्क साथी',hinglish:'playful adult partner'},
    mysterious:{en:'the mysterious fictional lead',hi:'रहस्यमय काल्पनिक किरदार',hinglish:'mysterious fictional lead'},
    gentle:{en:'the thoughtful, gentle adult partner',hi:'समझदार और नरम-मिज़ाज वयस्क साथी',hinglish:'gentle, thoughtful adult partner'}
  };
  const focuses = {
    couple:{en:'a private conversation between consenting adults',hi:'दो सहमत वयस्कों के बीच निजी बातचीत',hinglish:'two consenting adults ki private conversation'},
    accessory:{en:'a fictional accessory as a playful story prop',hi:'कहानी में एक काल्पनिक एक्सेसरी',hinglish:'ek fictional accessory as a playful story prop'},
    story:{en:'an atmospheric, non-graphic fictional scene',hi:'माहौल पर आधारित गैर-ग्राफ़िक काल्पनिक दृश्य',hinglish:'ek atmospheric, non-graphic fictional scene'}
  };
  const sizeLabels = {
    compact:{en:'subtle visual styling',hi:'हल्का और subtle visual style',hinglish:'subtle visual styling'},
    balanced:{en:'balanced visual styling',hi:'संतुलित visual style',hinglish:'balanced visual styling'},
    dramatic:{en:'bold, dramatic visual styling',hi:'बोल्ड और नाटकीय visual style',hinglish:'bold, dramatic visual styling'}
  };
  const intensity = {
    soft:{en:'Keep it warm, gentle and suggestive.',hi:'बातचीत को नरम, प्यारा और इशारों वाला रखें।',hinglish:'Tone soft, warm aur suggestive rakho.'},
    bold:{en:'Use confident dialogue and playful tension, without graphic detail.',hi:'आत्मविश्वास भरे संवाद और हल्का तनाव रखें, बिना ग्राफ़िक विवरण के।',hinglish:'Confident dialogue aur playful tension rakho—graphic details nahi.'},
    wild:{en:'Make the fictional pacing energetic, while every character can pause or opt out.',hi:'काल्पनिक कहानी की गति जोशीली रखें, मगर हर किरदार कभी भी रुक सकता है।',hinglish:'Energy high rakho, par har character pause ya skip kar sakta hai.'}
  };
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const langText = obj => obj[state.language] || obj.hinglish || obj.en;
  function readSaved(){
    try {
      const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
      for(const k of Object.keys(defaults)){
        if(k==='profanity') state[k]=saved[k]===true;
        else if(typeof saved[k]==='string') state[k]=saved[k];
      }
    } catch(_) {}
    if(!moods[state.mood]) state.mood=defaults.mood;
    if(!characters[state.character]) state.character=defaults.character;
    if(!focuses[state.focus]) state.focus=defaults.focus;
    if(!sizeLabels[state.sizeVibe]) state.sizeVibe=defaults.sizeVibe;
    if(!['en','hi','hinglish'].includes(state.language)) state.language=defaults.language;
    if(!intensity[state.intensity]) state.intensity=defaults.intensity;
    if(!['consent','skip'].includes(state.boundaries)) state.boundaries=defaults.boundaries;
  }
  function persist(){try{localStorage.setItem(KEY,JSON.stringify({...state}));}catch(_){}}
  function makeMarkup(){
    return `<section class="p4-fantasy" id="p4FantasyBuilder" aria-labelledby="p4FantasyTitle">
      <header class="p4-fantasy__head">
        <p class="p4-fantasy__eyebrow">PHASE 4 · BUILD YOUR OWN FANTASY · 18+</p>
        <h2 id="p4FantasyTitle">Build your <em>own fantasy.</em></h2>
        <p class="p4-fantasy__intro">Four quick steps for adult fictional role-play prompts. Pick a mood, character vibe, visual style and language. Nothing is sent to a server.</p>
        <div class="p4-fantasy__privacy"><span>✓ Adult fiction</span><span>✓ Local-only</span><span>✓ Skip anytime</span></div>
      </header>
      <div class="p4-fantasy__progress" role="group" aria-label="Fantasy builder steps">
        <button type="button" data-p4-jump="1" aria-current="step" aria-label="Step 1"></button><button type="button" data-p4-jump="2" aria-label="Step 2"></button><button type="button" data-p4-jump="3" aria-label="Step 3"></button><button type="button" data-p4-jump="4" aria-label="Step 4"></button>
      </div>
      <p class="p4-fantasy__step-label" id="p4FantasyStepLabel" aria-live="polite"><strong>STEP 1 OF 4</strong> · Choose a mood</p>
      <div class="p4-fantasy__body">
        <section class="p4-fantasy__panel" data-p4-step="1" aria-labelledby="p4MoodTitle">
          <h3 id="p4MoodTitle">What mood are you in?</h3><p class="p4-fantasy__hint">This sets the voice—not real-life permission or anyone else's feelings.</p>
          <div class="p4-fantasy__choices" role="group" aria-label="Fantasy mood">
            <button type="button" class="p4-fantasy__choice" data-p4-choice="mood" data-p4-value="romantic" aria-pressed="false"><b>♡ Slow-burn</b><small>Warm, heartfelt, atmospheric</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="mood" data-p4-value="teasing" aria-pressed="false"><b>✦ Teasing</b><small>Playful banter and sparks</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="mood" data-p4-value="desi" aria-pressed="false"><b>◆ Desi bold</b><small>Confident Hindi/Hinglish lines</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="mood" data-p4-value="wild" aria-pressed="false"><b>⚡ High energy</b><small>Fast-paced fictional tension</small></button>
          </div>
        </section>
        <section class="p4-fantasy__panel" data-p4-step="2" aria-labelledby="p4CharacterTitle" hidden>
          <h3 id="p4CharacterTitle">Choose a fictional setup</h3><p class="p4-fantasy__hint">All characters are adults. This changes the fictional scene only.</p>
          <div class="p4-fantasy__choices" role="group" aria-label="Character archetype">
            <button type="button" class="p4-fantasy__choice" data-p4-choice="character" data-p4-value="confident" aria-pressed="false"><b>Confident partner</b><small>Clear, self-assured dialogue</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="character" data-p4-value="playful" aria-pressed="false"><b>Playful partner</b><small>Teasing jokes and mutual curiosity</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="character" data-p4-value="mysterious" aria-pressed="false"><b>Mysterious lead</b><small>Fictional intrigue and suspense</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="character" data-p4-value="gentle" aria-pressed="false"><b>Gentle partner</b><small>Thoughtful, caring communication</small></button>
          </div>
          <div class="p4-fantasy__fields">
            <label class="p4-fantasy__field">Story focus<select data-p4-select="focus"><option value="couple">Couples banter</option><option value="accessory">Fictional accessory / toy as a story prop</option><option value="story">Atmospheric story only</option></select></label>
          </div>
        </section>
        <section class="p4-fantasy__panel" data-p4-step="3" aria-labelledby="p4StyleTitle" hidden>
          <h3 id="p4StyleTitle">Pick a visual style</h3><p class="p4-fantasy__hint">This is fictional styling language—not a person's body measurement or a real product-size recommendation.</p>
          <div class="p4-fantasy__choices" role="group" aria-label="Fictional style preference">
            <button type="button" class="p4-fantasy__choice" data-p4-choice="sizeVibe" data-p4-value="compact" aria-pressed="false"><b>Subtle</b><small>Compact, understated visual styling</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="sizeVibe" data-p4-value="balanced" aria-pressed="false"><b>Balanced</b><small>Classic, proportionate scene styling</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="sizeVibe" data-p4-value="dramatic" aria-pressed="false"><b>Dramatic</b><small>Bold visual emphasis in the story</small></button>
            <button type="button" class="p4-fantasy__choice" data-p4-choice="focus" data-p4-value="story" aria-pressed="false"><b>Story-only</b><small>Skip appearance details and keep atmosphere</small></button>
          </div>
        </section>
        <section class="p4-fantasy__panel" data-p4-step="4" aria-labelledby="p4ToneTitle" hidden>
          <h3 id="p4ToneTitle">Set the voice and intensity</h3><p class="p4-fantasy__hint">Choose language and how forward the fictional dialogue should feel.</p>
          <div class="p4-fantasy__fields">
            <label class="p4-fantasy__field">Language<select data-p4-select="language"><option value="hinglish">Hindi + Hinglish</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label>
            <label class="p4-fantasy__field">Intensity<select data-p4-select="intensity"><option value="soft">Soft / romantic</option><option value="bold">Bold / teasing</option><option value="wild">Wild / high energy</option></select></label>
            <label class="p4-fantasy__field">Language style<select data-p4-select="profanity"><option value="false">Clean dialogue</option><option value="true">Mild Desi slang</option></select></label>
            <label class="p4-fantasy__field">Boundary in the story<select data-p4-select="boundaries"><option value="consent">Check in, stop if asked</option><option value="skip">Keep it low intensity / skip quickly</option></select></label>
          </div>
          <label class="p4-fantasy__check"><input type="checkbox" id="p4FantasyAdult"><span><b>I confirm I am 18 or older.</b><small>Required before generating an adult fictional prompt. Your choices remain on this device.</small></span></label>
        </section>
        <div class="p4-fantasy__actions">
          <button type="button" class="p4-fantasy__btn" id="p4FantasyBack" disabled>← Back</button>
          <div class="p4-fantasy__buttons"><button type="button" class="p4-fantasy__btn" id="p4FantasyReset">Reset builder</button><button type="button" class="p4-fantasy__btn p4-fantasy__btn--primary" id="p4FantasyNext">Next step →</button></div>
        </div>
        <p class="p4-fantasy__status" id="p4FantasyStatus" role="status" aria-live="polite">Step 1 of 4 · Start with your mood.</p>
        <section class="p4-fantasy__output" id="p4FantasyOutput" hidden aria-labelledby="p4FantasyOutputTitle"><h4 id="p4FantasyOutputTitle">Your fictional starter prompt</h4><p id="p4FantasyOutputText"></p><div class="p4-fantasy__output-actions"><button class="p4-fantasy__btn" id="p4FantasyCopy" type="button">Copy prompt</button><button class="p4-fantasy__btn" id="p4FantasyAgain" type="button">Change choices</button></div></section>
        <p class="p4-fantasy__fineprint">18+ fictional content only. No real person's consent or desire is assumed. No graphic detail is generated, no external request is made, and nothing is published. Generated text is a starter prompt, not an endorsement or a real-life instruction.</p>
      </div>
    </section>`;
  }
  function renderProgress(root){
    const label=$('#p4FantasyStepLabel',root);
    const steps=['Choose a mood','Choose a character','Pick visual style','Set language & intensity'];
    $$('.p4-fantasy__progress button',root).forEach(btn=>{
      const current=Number(btn.dataset.p4Jump)===state.step;
      btn.setAttribute('aria-current',current?'step':'false');
      btn.classList.toggle('is-complete',Number(btn.dataset.p4Jump)<state.step);
    });
    $$('.p4-fantasy__panel',root).forEach(panel=>{panel.hidden=Number(panel.dataset.p4Step)!==state.step;});
    if(label) label.innerHTML=`<strong>STEP ${state.step} OF 4</strong> · ${steps[state.step-1]}`;
    const back=$('#p4FantasyBack',root), next=$('#p4FantasyNext',root);
    if(back) back.disabled=state.step===1;
    if(next) next.textContent=state.step===4?'Generate my fantasy ✦':'Next step →';
  }
  function sync(root){
    $$('[data-p4-choice]',root).forEach(btn=>{
      const key=btn.dataset.p4Choice;
      btn.setAttribute('aria-pressed',String(state[key]===btn.dataset.p4Value));
      btn.classList.toggle('is-selected',state[key]===btn.dataset.p4Value);
    });
    $$('[data-p4-select]',root).forEach(el=>{
      const key=el.dataset.p4Select;
      el.value=key==='profanity'?String(state.profanity):state[key];
    });
  }
  function composePrompt(){
    const l=state.language;
    if(l==='hi') return `काल्पनिक वयस्क दृश्य: ${langText(moods[state.mood])} अंदाज़ में ${langText(characters[state.character])} के साथ ${langText(focuses[state.focus])} लिखें। शैली: ${langText(sizeLabels[state.sizeVibe])}। ${intensity[state.intensity].hi} संवाद परस्पर सहमति और चेक-इन पर आधारित हों; कोई भी किरदार कभी भी रुकने या मना करने के लिए स्वतंत्र है। दृश्य गैर-ग्राफ़िक और काल्पनिक रहे।${state.profanity?' भाषा में हल्का देसी स्लैंग शामिल किया जा सकता है।':''}`;
    if(l==='en') return `Write a non-graphic adult fictional scene with ${langText(characters[state.character])}, built around ${langText(focuses[state.focus])}. Mood: ${langText(moods[state.mood])}. Visual language: ${langText(sizeLabels[state.sizeVibe])}. ${intensity[state.intensity].en} Keep every character an adult, make consent explicit, and let anyone pause or opt out at any time.${state.profanity?' Mild Desi slang may be used.':''}`;
    return `Ek non-graphic adult fictional scene banao: ${langText(moods[state.mood])} mood, ${langText(characters[state.character])}, aur ${langText(focuses[state.focus])}. Visual style: ${langText(sizeLabels[state.sizeVibe])}. ${intensity[state.intensity].hinglish} Sab characters adults hon; consent clear ho, aur koi bhi kabhi bhi pause ya skip kar sake.${state.profanity?' Mild Desi slang allowed.':''}`;
  }
  function setStatus(text){const root=$('#p4FantasyBuilder');const n=root&&$('#p4FantasyStatus',root);if(n)n.textContent=text;}
  function generate(root){
    const age=$('#p4FantasyAdult',root);
    if(!age||!age.checked){setStatus('Pehle 18+ confirmation check karo. Adult fictional prompt abhi generate nahi hua.');age?.focus();return false;}
    const text=composePrompt();$('#p4FantasyOutputText',root).textContent=text;$('#p4FantasyOutput',root).hidden=false;
    setStatus('Prompt is device par generate hua. Koi external server request nahi hui.');persist();
    $('#p4FantasyOutput',root).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
    return true;
  }
  function boot(){
    const home=$('#view-home');
    if(!home||!$('.hero',home)){document.documentElement.dataset.blackedPhase4Fantasy='error';return;}
    if($('#p4FantasyBuilder'))return;
    readSaved();
    const p3=$('#v3-randi-mode');
    const anchor=p3||$('.hero',home);
    anchor.insertAdjacentHTML('afterend',makeMarkup());
    const root=$('#p4FantasyBuilder');
    if(!root){document.documentElement.dataset.blackedPhase4Fantasy='error';return;}
    sync(root);renderProgress(root);
    root.addEventListener('click',async event=>{
      const target=event.target instanceof Element?event.target:null;if(!target)return;
      const choice=target.closest('[data-p4-choice]');
      if(choice){const k=choice.dataset.p4Choice,v=choice.dataset.p4Value;if(k&&Object.hasOwn(defaults,k)){state[k]=v;sync(root);persist();}return;}
      const jump=target.closest('[data-p4-jump]');
      if(jump){const n=Number(jump.dataset.p4Jump);if(n>=1&&n<=4){state.step=n;renderProgress(root);}return;}
      if(target.closest('#p4FantasyBack')){if(state.step>1){state.step--;renderProgress(root);}return;}
      if(target.closest('#p4FantasyNext')){if(state.step<4){state.step++;renderProgress(root);root.querySelector(`[data-p4-step="${state.step}"]`)?.querySelector('button,select')?.focus({preventScroll:true});}else generate(root);return;}
      if(target.closest('#p4FantasyReset')){Object.assign(state,defaults,{step:1});const adult=$('#p4FantasyAdult',root);if(adult)adult.checked=false;$('#p4FantasyOutput',root).hidden=true;sync(root);renderProgress(root);persist();setStatus('Builder reset. Existing wishlist, bag, stories and notes were not changed.');return;}
      if(target.closest('#p4FantasyCopy')){const text=$('#p4FantasyOutputText',root)?.textContent||'';try{await navigator.clipboard.writeText(text);setStatus('Prompt copied.')}catch(_){const range=document.createRange();const node=$('#p4FantasyOutputText',root);if(node){range.selectNodeContents(node);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);}setStatus('Clipboard permission blocked—prompt selected, copy it manually.');}return;}
      if(target.closest('#p4FantasyAgain')){state.step=1;renderProgress(root);$('#p4FantasyOutput',root).hidden=true;$('#p4FantasyBuilder').scrollIntoView({behavior:'auto',block:'start'});}
    });
    root.addEventListener('change',event=>{
      const el=event.target;if(!(el instanceof HTMLSelectElement))return;
      const k=el.dataset.p4Select;if(!k)return;
      state[k]=k==='profanity'?el.value==='true':el.value;
      persist();
    });
    window.BLACKED_PHASE4_FANTASY={
      version:'4.0.0',
      getState:()=>({...state}),
      getDiagnostics:()=>({loaded:!!$('#p4FantasyBuilder'),step:state.step,stepCount:$$('[data-p4-step]',root).length,choices:$$('[data-p4-choice]',root).length,language:state.language,localOnly:true,adultGate:!!$('#p4FantasyAdult'),outputVisible:!$('#p4FantasyOutput')?.hidden}),
      generate:()=>generate(root)
    };
    document.documentElement.dataset.blackedPhase4Fantasy='ready';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

