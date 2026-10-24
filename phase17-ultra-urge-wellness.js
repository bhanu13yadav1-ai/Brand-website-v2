/* BLACKED V4 Phase 17 — Ultra language studio, quick Urge mode and Wellness product vault.
 * Additive, local-first, and intentionally clear that catalog entries are category concepts, not verified SKUs.
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE17) return;

  const PREF_KEY = 'blackedV4PreferenceFirst';
  const P17_KEY = 'blackedV4Phase17';
  const FAV_KEY = 'blackedV4Phase17Favourites';
  const LEVELS = ['clean', 'light', 'medium', 'full', 'ultra'];
  const LEVEL_LABELS = { clean: 'Clean', light: 'Light Desi', medium: 'Medium Desi', full: 'Full Desi', ultra: 'Ultra Desi' };
  const LANG_LABELS = { hinglish: 'Hindi + Hinglish', hi: 'Hindi', en: 'English' };
  const TONE_LABELS = { teasing: 'Teasing banter', savage: 'Savage / gaali banter', bold: 'Bold confidence', dramatic: 'Dark-romance drama', flirty: 'Flirty chemistry', roasty: 'Friendly roast (fictional adults)' };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const dialogue = {
    hinglish: {
      teasing: ['Aaj hints nahi, seedhi baat—vibe bata, phir scene choose karte hain.', 'Itna suspense kyun, yaar? Mood select kar aur story ko interesting bana.', 'Drama allowed hai, confusion optional. Apni choice bol.'],
      savage: ['Bhenchod, bakchodi ka trailer band kar—vibe seedhi bol, phir dekhte hain.', 'Saala, itne hints kyun? Seedha mood bol; guessing game khatam.', 'Bhenchod, full filmy attitude hai—par apni choice clear rakh.'],
      bold: ['Confidence ka matlab clear bolna hai—jo pasand hai woh bata, jo nahi hai use bhi clear rakh.', 'No guessing, no pressure. Seedhi baat aur mutual yes.', 'Apna mood own kar; kisi aur ke answer ko control mat kar.'],
      dramatic: ['Raat dramatic ho sakti hai, lekin next scene dono ki choice se hi chalega.', 'Ek secret, ek choice, aur ek twist—ending tum decide karoge.', 'Dark-romance energy, fictional characters, aur boundaries bilkul clear.'],
      flirty: ['Thoda flirt, thoda smile, aur ek honest question—perfect opening.', 'Compliment specific rakho, cheesy line optional.', 'Chemistry ko force nahi karte; vibe match ho toh story aage.'],
      roasty: ['Friendly roast chalega, personal insult nahi—dono hans rahe hon tabhi maza.', 'Roast itna sharp ho ki joke lage, attack nahi.', 'Bakchodi funny tabhi hai jab fictional character bhi jawab de sake.']
    },
    hi: {
      teasing: ['आज इशारों की जगह सीधी बात—अपना मूड चुनो, फिर कहानी आगे बढ़ाएँ।', 'इतना सस्पेंस क्यों? मूड चुनो और अगला दृश्य खुद तय करो।', 'ड्रामा चलेगा, उलझन ज़रूरी नहीं। अपनी पसंद बताओ।'],
      savage: ['भेनचोद, बकचोदी का ट्रेलर बंद—मूड साफ़ बता, फिर आगे देखते हैं।', 'साला, इतने इशारे क्यों? सीधे बताओ क्या vibe चाहिए।', 'भेनचोद, attitude पूरा फ़िल्मी है—पर पसंद साफ़ रखो।'],
      bold: ['आत्मविश्वास का मतलब साफ़ बात है—पसंद और नापसंद दोनों बताओ।', 'अंदाज़ा नहीं, साफ़ बातचीत और दोनों की सहमति।', 'अपनी पसंद बताओ; किसी और के जवाब को नियंत्रित मत करो।'],
      dramatic: ['रात का ड्रामा कहानी में रहे; अगला दृश्य दोनों की पसंद से तय हो।', 'एक राज़, एक विकल्प और एक मोड़—अंत तुम चुनोगे।', 'डार्क-रोमांस का माहौल, काल्पनिक किरदार और साफ़ सीमाएँ।'],
      flirty: ['हल्की छेड़छाड़, एक प्यारी तारीफ़ और एक ईमानदार सवाल—अच्छी शुरुआत।', 'तारीफ़ खास हो, बनावटी होना ज़रूरी नहीं।', 'केमिस्ट्री थोपी नहीं जाती; vibe मिले तो कहानी आगे बढ़े।'],
      roasty: ['मज़ाक वही जो दोनों को मज़ेदार लगे—किसी की असली पहचान या शरीर को निशाना मत बनाओ।', 'रोस्ट ऐसा हो कि हँसी आए, चोट नहीं।', 'बकचोदी मज़ेदार तभी है जब काल्पनिक किरदार जवाब भी दे सके।']
    },
    en: {
      teasing: ['Skip the hints. Pick the vibe and choose what happens next.', 'Why all the suspense? Choose a mood and build the next beat.', 'Drama is welcome; confusion is optional. Say what you want.'],
      savage: ['Fuck the guessing game—pick the vibe and say it straight.', 'Damn, enough hints. Call the mood and let the fictional scene move.', 'Big attitude, clear choices. Keep the banter sharp and mutual.'],
      bold: ['Confidence means being clear about both wants and limits.', 'No guessing and no pressure—just honest communication.', 'Own your preferences without trying to control anyone else’s answer.'],
      dramatic: ['Keep the drama in the fiction; both characters choose the next scene.', 'One secret, one choice, one twist—you decide the ending.', 'Dark-romance mood, fictional adults, clear boundaries.'],
      flirty: ['A little flirt, a specific compliment, and an honest question make a strong opener.', 'Make the compliment personal, not pushy.', 'Chemistry is invited, never forced.'],
      roasty: ['Friendly roast only when the fictional characters can laugh back.', 'Sharp enough to be funny, not aimed at a real person’s body or identity.', 'Good banter lets everyone answer, switch tone, or skip.']
    }
  };
  const profane = {
    hinglish: {
      light: ['Saala, hints kam aur seedhi baat zyada.', 'Yaar, bakchodi side mein—mood choose kar.'],
      medium: ['Bhenchod, guessing band—apni vibe seedhi bol.', 'Bakchodi bahut hui, ab choice clear kar.'],
      full: ['Bhenchod, bakchodi chhod aur mood seedha bol—no ka matlab no hi rahega.', 'Saala, drama full rakho, pressure zero.'],
      ultra: ['Bhenchod, bakchodi ab band—apni vibe seedhi bol; dono ki haan hai toh scene aage, warna full stop.', 'Bhenchod, full unfiltered banter—par boundary cross hui toh scene khatam, koi behas nahi.']
    },
    hi: {
      light: ['साला, इशारे कम और सीधी बात ज़्यादा।', 'यार, बकचोदी छोड़ और मूड चुन।'],
      medium: ['भेनचोद, अंदाज़ा लगवाना बंद—अपनी पसंद साफ़ बता।', 'बकचोदी बहुत हुई, अब चुनाव साफ़ कर।'],
      full: ['भेनचोद, बकचोदी छोड़ और मूड साफ़ बता—ना का मतलब ना ही रहेगा।', 'साला, ड्रामा पूरा रखो, दबाव शून्य।'],
      ultra: ['भेनचोद, बकचोदी अब बंद—अपनी पसंद साफ़ बता; दोनों की हाँ होगी तभी बात आगे जाएगी।', 'भेनचोद, भाषा बेबाक रखो—सीमा पार हुई तो कहानी वहीं बंद, कोई बहस नहीं।']
    },
    en: {
      light: ['Damn, fewer hints and more direct talk.', 'Cut the nonsense and pick a mood.'],
      medium: ['Fuck the guessing—say your vibe clearly.', 'Enough bullshit; make the choice clear.'],
      full: ['Fuck the guessing and say the mood plainly; no still means no.', 'Keep the drama high and pressure at zero.'],
      ultra: ['Fuck the guessing game—say the vibe straight; mutual yes or the scene stops. No debate.', 'Unfiltered fictional banter, clear limits, and zero pressure.']
    }
  };
  const quickPrompts = {
    teasing: ['Write a three-line exchange where two fictional adults trade cheeky hints, then choose the next mood together.', 'Create a playful opening, a comeback, and three branches: sweeter, bolder, or stop here.'],
    savage: ['Write a sharp, profane-but-playful exchange between fictional adults who both enjoy roasting; give each a witty reply and an easy exit.', 'Make the dialogue brash and funny, but never target a real person or make refusal a joke.'],
    bold: ['Create a confident fictional opener followed by an honest check-in and three answer branches: yes, not sure, or no.', 'Build a direct adult-character dialogue in which preferences are clear and boundaries actually change the next beat.'],
    dramatic: ['Write a short dark-romance mystery with a secret, a choice, a reveal, and two possible endings.', 'Create a cinematic adult-fiction scene with suspense, a clear boundary, and a reversible choice.'],
    flirty: ['Create a specific compliment, a light comeback, and a low-pressure invitation for two fictional adults.', 'Write a playful romantic opener with three reply styles: sweet, teasing, and pass.'],
    roasty: ['Write a friendly roast battle between two fictional adult characters; each gets a strong comeback and the final line turns warm.', 'Make a playful banter scene where either character can switch to sincere or end the game.']
  };

  const fallbackCatalog = [
    {id:'dildo-classic',name:'Classic / abstract dildo',category:'dildo',image:'phase17-product-dildo.svg',description:'Category preview for non-vibrating and abstract forms.',intended:'Vaginal or anal use only when manufacturer explicitly labels it for that use.',verified:false},
    {id:'dildo-curved',name:'Curved / ergonomic dildo',category:'dildo',image:'phase17-product-dildo.svg',description:'Explore shape and manufacturer-listed insertable dimensions.',intended:'Check intended-use label and actual dimensions first.',verified:false},
    {id:'dildo-suction',name:'Suction-base dildo',category:'dildo',image:'phase17-product-dildo.svg',description:'Category preview with base/handle details to verify.',intended:'Check base design, surface compatibility and maker instructions.',verified:false},
    {id:'butt-plug-basic',name:'Beginner butt plug',category:'butt-plug',image:'phase17-product-anal.svg',description:'Anal-use category preview; no real SKU or size has been verified.',intended:'Must have a flared base or effective retrieval stop.',verified:false},
    {id:'butt-plug-vibe',name:'Vibrating butt plug',category:'butt-plug',image:'phase17-product-anal.svg',description:'Check vibration controls, waterproof rating and cleaning directions.',intended:'Must have a flared base or effective retrieval stop.',verified:false},
    {id:'anal-beads',name:'Anal beads',category:'anal-beads',image:'phase17-product-anal.svg',description:'Category preview; material, joined construction and retrieval design need verification.',intended:'Only use products designed for this purpose and with safe retrieval design.',verified:false},
    {id:'prostate-massager',name:'Prostate massager',category:'prostate',image:'phase17-product-anal.svg',description:'Category preview; curve, usable length and base need manufacturer data.',intended:'Check the product’s explicit intended-use and retrieval design.',verified:false},
    {id:'water-lube',name:'Water-based lubricant',category:'lubricant',image:'phase17-product-lube.svg',description:'Accessory category preview; ingredients and compatibility require supplier data.',intended:'Water-based lube is generally compatible with a broad range of toys; verify the label.',verified:false},
    {id:'silicone-lube',name:'Silicone-based lubricant',category:'lubricant',image:'phase17-product-lube.svg',description:'Accessory category preview; actual formula and compatibility require verification.',intended:'May damage some silicone toys; follow the manufacturer’s compatibility guidance.',verified:false},
    {id:'toy-cleaner',name:'Toy cleaner / care',category:'care',image:'phase17-product-care.svg',description:'Cleaning accessory category preview; no active product or ingredient data supplied.',intended:'Follow the exact toy manufacturer’s cleaning instructions.',verified:false},
    {id:'storage-pouch',name:'Private storage pouch',category:'storage',image:'phase17-product-care.svg',description:'Storage accessory category preview; size and fabric details are not yet verified.',intended:'Allow the toy to dry fully and follow storage guidance.',verified:false}
  ];

  let state = { language: 'hinglish', gaali: 'clean', tone: 'teasing', mode: 'scene', duration: 'quick', ageConfirmed: false, lastOutput: '', lastBody: '', favourites: [], products: fallbackCatalog, compare: [], category: 'all', query: '', expanded: null };

  function loadState() {
    try {
      const shared = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
      if (LANG_LABELS[shared.language]) state.language = shared.language;
      if (LEVELS.includes(shared.gaali)) state.gaali = shared.gaali;
      const local = JSON.parse(localStorage.getItem(P17_KEY) || '{}');
      if (LANG_LABELS[local.language]) state.language = local.language;
      if (LEVELS.includes(local.gaali)) state.gaali = local.gaali;
      if (TONE_LABELS[local.tone]) state.tone = local.tone;
      if (['scene','urge'].includes(local.mode)) state.mode = local.mode;
      if (['quick','medium','deep'].includes(local.duration)) state.duration = local.duration;
      state.ageConfirmed = false; // require a fresh per-session confirmation
      const rawFavs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
      if (Array.isArray(rawFavs)) state.favourites = rawFavs.filter(x => x && typeof x.text === 'string').slice(0, 40);
    } catch (_) { /* local-only defaults */ }
  }
  function saveState() {
    try { localStorage.setItem(P17_KEY, JSON.stringify({language:state.language,gaali:state.gaali,tone:state.tone,mode:state.mode,duration:state.duration})); } catch (_) { setStatus('Preferences work this visit, but this browser could not save them.'); }
  }
  function setStatus(message) { const n=$('#p17Status'); if(n) n.textContent=message; }
  function sharedControl(selector, value) { const el=$(selector); if(el && [...el.options].some(o=>o.value===value) && el.value!==value) { el.value=value; el.dispatchEvent(new Event('change',{bubbles:true})); } }
  function syncSharedPrefs() {
    sharedControl('#v4GaaliLevel', state.gaali);
    sharedControl('#v4PrefGaali', state.gaali);
    sharedControl('#v4P5GaaliLevel', state.gaali);
    sharedControl('#v3ModeLanguage', state.language);
    sharedControl('#p5DirtyLanguage', state.language);
    sharedControl('#p5WheelLanguage', state.language);
    sharedControl('#v4PrefLanguage', state.language);
    try {
      const p=JSON.parse(localStorage.getItem(PREF_KEY)||'{}'); p.language=state.language; p.gaali=state.gaali; localStorage.setItem(PREF_KEY,JSON.stringify(p));
      localStorage.setItem('blackedV4GaaliLevel',state.gaali);
    } catch (_) { /* P17 remains usable without storage */ }
  }

  function buildUltraPanel() {
    const view=$('#view-stories'); if(!view || $('#p17UltraStudio')) return;
    const panel=el('section','section-block p17-ultra'); panel.id='p17UltraStudio'; panel.setAttribute('aria-labelledby','p17Title');
    panel.innerHTML = `
      <div class="p17-hero"><div><p class="eyebrow">PHASE 17 · 18+ FICTIONAL STUDIO</p><h2 id="p17Title">ULTRA <em>SUPER RANDI MODE</em></h2><p class="muted">Apni language. Apni intensity. Apni story branches. Strong Desi slang is an optional style setting; all characters here are fictional adults.</p><div class="p17-badges"><span>Local-first</span><span>Language-aware</span><span>Skip / reset anytime</span></div></div><div class="p17-orbit" aria-hidden="true"><span>ULTRA</span><b>18+</b></div></div>
      <div class="p17-controls">
        <label class="p17-field"><span>Language</span><select id="p17Language"><option value="hinglish">Hindi + Hinglish</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label>
        <label class="p17-field"><span>Gaali intensity</span><select id="p17GaaliLevel"><option value="clean">Clean</option><option value="light">Light Desi</option><option value="medium">Medium Desi</option><option value="full">Full Desi</option><option value="ultra">Ultra Desi</option></select></label>
        <label class="p17-field"><span>Character tone</span><select id="p17Tone"><option value="teasing">Teasing banter</option><option value="savage">Savage / gaali banter</option><option value="bold">Bold confidence</option><option value="dramatic">Dark-romance drama</option><option value="flirty">Flirty chemistry</option><option value="roasty">Friendly roast (fictional adults)</option></select></label>
        <label class="p17-field"><span>Mode</span><select id="p17Mode"><option value="scene">Scene Remix</option><option value="urge">Quick Urge Mode</option></select></label>
        <label class="p17-field"><span>Session size</span><select id="p17Duration"><option value="quick">Quick · 1 prompt</option><option value="medium">Medium · 3 branches</option><option value="deep">Deep · 5 story beats</option></select></label>
      </div>
      <label class="p17-age"><input id="p17AgeConfirm" type="checkbox"><span><b>I confirm I am 18 or older.</b><small>Only fictional adult dialogue and preference-based prompts are generated.</small></span></label>
      <div class="p17-actions"><button class="btn primary" type="button" id="p17Generate">Generate my vibe</button><button class="btn secondary" type="button" id="p17Remix">Remix / surprise me</button><button class="btn ghost" type="button" id="p17Reset">Reset</button></div>
      <div class="p17-output" id="p17Output" hidden><div class="p17-output-head"><span class="eyebrow" id="p17OutputMeta">YOUR SCENE</span><button class="btn ghost" type="button" id="p17CloseOutput" aria-label="Close generated output">Close</button></div><h3 id="p17OutputTitle">Your fictional scene</h3><p id="p17OutputText"></p><div id="p17Branches" class="p17-branches"></div><div class="p17-actions"><button class="btn secondary" type="button" id="p17Copy">Copy result</button><button class="btn secondary" type="button" id="p17Save">Save privately</button><button class="btn ghost" type="button" id="p17NextBeat">Continue story</button></div></div>
      <section class="p17-vault"><div class="p17-vault-head"><div><p class="eyebrow">SAVED LOCALLY · THIS BROWSER</p><h3>Saved scenes</h3></div><button class="btn ghost" type="button" id="p17ClearSaved">Clear all</button></div><div id="p17SavedList" class="p17-saved-list"><p class="muted">Your saved scenes will appear here only after you choose Save privately.</p></div></section>
      <p class="p17-status" id="p17Status" role="status" aria-live="polite">Choose your language, intensity and tone. Nothing is uploaded by this prototype.</p>
      <p class="p17-safety-note">Fiction only. No real person is impersonated. A character's “no” or “stop” changes the story immediately. Existing story archive text is not rewritten.</p>`;
    const randi=$('#v3-randi-mode',view); const dirty=$('#dirtyPollTitle',view)?.closest('section'); const intro=$('.page-intro',view);
    const anchor=randi||dirty||intro; if(anchor) anchor.insertAdjacentElement('afterend',panel); else view.append(panel);
    $('#p17Language',panel).value=state.language; $('#p17GaaliLevel',panel).value=state.gaali; $('#p17Tone',panel).value=state.tone; $('#p17Mode',panel).value=state.mode; $('#p17Duration',panel).value=state.duration; $('#p17AgeConfirm',panel).checked=state.ageConfirmed;
    wireUltra(panel); renderSaved();
  }

  function pick(list, seed=0) { if(!list?.length) return ''; const idx=Math.floor(Math.random()*list.length); if(list.length>1 && idx===seed) return list[(idx+1)%list.length]; return list[idx]; }
  function generate(action='new') {
    if(!state.ageConfirmed || !$('#p17AgeConfirm')?.checked) { setStatus('Pehle 18+ confirmation select karo.'); $('#p17AgeConfirm')?.focus(); return; }
    const lang=state.language, tone=state.tone;
    const open=pick(dialogue[lang][tone]);
    const swear=state.gaali==='clean' ? '' : pick(profane[lang][state.gaali] || []);
    const prompt=pick(quickPrompts[tone]);
    const mode=state.mode==='urge'?'URGE MODE · QUICK START':'ULTRA MODE · SCENE REMIX';
    const duration=state.duration==='quick'?'One-beat prompt':state.duration==='medium'?'Three-branch scene':'Five-beat story starter';
    const title=`${TONE_LABELS[tone]} · ${LEVEL_LABELS[state.gaali]}`;
    let branches=[];
    if(state.duration==='medium') branches=['Make it sweeter','Turn up the banter','Switch tone / skip'];
    else if(state.duration==='deep') branches=['Continue the tension','Add a funny comeback','Reveal a secret','Change to romance','End this scene'];
    else branches=['Remix this line','Change the mood','Finish here'];
    if(action==='continue') branches=['Next beat: a new reply','Add a twist','Return to choices'];
    const fresh=[open,swear,prompt].filter(Boolean).join('\n\n');
    const out=action==='continue' && state.lastBody ? `${state.lastBody}\n\nNEXT BEAT\n${open}\n\nDirection: ${prompt}` : fresh;
    state.lastBody=out;
    state.lastOutput=`${title}\n${out}\n\n${duration}`;
    $('#p17OutputTitle').textContent=title; $('#p17OutputMeta').textContent=`${mode} · ${duration}`; $('#p17OutputText').textContent=out;
    const branchRoot=$('#p17Branches'); branchRoot.replaceChildren(); branches.forEach((label,i)=>{const b=el('button','p17-branch',label);b.type='button';b.dataset.branch=String(i);branchRoot.append(b);});
    $('#p17Output').hidden=false; setStatus(`${LEVEL_LABELS[state.gaali]} + ${LANG_LABELS[lang]} applied to the new generated result.`); saveState(); syncSharedPrefs();
    state.lastOutputTitle=title; $('#p17Output').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  }
  function saveFavourite() {
    if(!state.lastOutput) { setStatus('Pehle scene generate karo.'); return; }
    state.favourites.unshift({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,title:state.lastOutputTitle||'Saved scene',text:state.lastOutput,body:state.lastBody,at:new Date().toISOString()});
    state.favourites=state.favourites.slice(0,40);
    try { localStorage.setItem(FAV_KEY,JSON.stringify(state.favourites)); } catch (_) { setStatus('Browser storage blocked. Scene is available only until you leave this page.'); }
    renderSaved(); setStatus('Scene privately saved to this browser.');
  }
  function renderSaved() {
    const root=$('#p17SavedList'); if(!root)return; root.replaceChildren();
    if(!state.favourites.length) {root.append(el('p','muted','No saved scenes yet. Choose “Save privately” after generating one.'));return;}
    state.favourites.forEach(item=>{
      const card=el('article','p17-saved-item'); const title=el('strong','',item.title); const preview=el('p','',item.text.slice(0,130)+(item.text.length>130?'…':''));
      const actions=el('div','p17-saved-actions'); const load=el('button','btn secondary','Load'); load.type='button'; load.dataset.loadFavourite=item.id;
      const remove=el('button','btn ghost','Delete'); remove.type='button'; remove.dataset.deleteFavourite=item.id;
      actions.append(load,remove); card.append(title,preview,actions); root.append(card);
    });
  }
  function wireSharedPreferenceSync() {
    document.addEventListener('change', e => {
      const t=e.target; if(!(t instanceof HTMLSelectElement)) return;
      const langIds=new Set(['v3ModeLanguage','p5DirtyLanguage','p5WheelLanguage','v4PrefLanguage']);
      const gaaliIds=new Set(['v4GaaliLevel','v4PrefGaali','v4P5GaaliLevel']);
      if(langIds.has(t.id) && LANG_LABELS[t.value]) { state.language=t.value; const field=$('#p17Language'); if(field) field.value=state.language; saveState(); }
      if(gaaliIds.has(t.id) && LEVELS.includes(t.value)) { state.gaali=t.value; const field=$('#p17GaaliLevel'); if(field) field.value=state.gaali; saveState(); }
    });
  }
  function wireUltra(root) {
    root.addEventListener('change', e=>{
      const t=e.target;
      if(t instanceof HTMLInputElement && t.id==='p17AgeConfirm') { state.ageConfirmed=!!t.checked; saveState(); setStatus(state.ageConfirmed?'18+ confirmation selected for this session.':'Age confirmation cleared.'); return; }
      if(!(t instanceof HTMLSelectElement))return;
      if(t.id==='p17Language' && LANG_LABELS[t.value]) state.language=t.value;
      if(t.id==='p17GaaliLevel' && LEVELS.includes(t.value)) state.gaali=t.value;
      if(t.id==='p17Tone' && TONE_LABELS[t.value]) state.tone=t.value;
      if(t.id==='p17Mode' && ['scene','urge'].includes(t.value)) state.mode=t.value;
      if(t.id==='p17Duration' && ['quick','medium','deep'].includes(t.value)) state.duration=t.value;
      saveState(); syncSharedPrefs();
      setStatus('Preference saved on this device; the next generated output will use it.');
    });
    root.addEventListener('click', async e=>{
      const t=e.target instanceof Element?e.target:null; if(!t)return;
      if(t.closest('#p17Generate')) { state.mode=$('#p17Mode').value; generate('new'); return; }
      if(t.closest('#p17Remix')) { if(!state.ageConfirmed || !$('#p17AgeConfirm')?.checked){setStatus('Pehle 18+ confirmation select karo.');return;} state.tone=pick(Object.keys(TONE_LABELS).filter(x=>x!==state.tone)); $('#p17Tone').value=state.tone; generate('remix'); return; }
      if(t.closest('#p17Reset')) { state.language='hinglish';state.gaali='clean';state.tone='teasing';state.mode='scene';state.duration='quick';state.ageConfirmed=false; $('#p17Language').value=state.language;$('#p17GaaliLevel').value=state.gaali;$('#p17Tone').value=state.tone;$('#p17Mode').value=state.mode;$('#p17Duration').value=state.duration;$('#p17AgeConfirm').checked=false;$('#p17Output').hidden=true;saveState();syncSharedPrefs();setStatus('Settings reset. Saved scenes were kept; choose Clear all to delete them.');return; }
      if(t.closest('#p17CloseOutput')) { $('#p17Output').hidden=true; return; }
      if(t.closest('#p17Copy')) { try { await navigator.clipboard.writeText(state.lastOutput); setStatus('Result copied.'); } catch (_) { setStatus('Copy was blocked by this browser. Select the result text and copy it manually.'); } return; }
      if(t.closest('#p17Save')) { saveFavourite(); return; }
      if(t.closest('#p17NextBeat')) { if(!state.lastOutput){setStatus('Pehle scene generate karo.');return;} generate('continue'); return; }
      if(t.closest('#p17ClearSaved')) { if(!confirm('Is browser se Phase 17 ke saare saved scenes delete karein?'))return;state.favourites=[];try{localStorage.removeItem(FAV_KEY)}catch(_){}renderSaved();setStatus('Saved scenes cleared from this browser.');return; }
      const branch=t.closest('[data-branch]'); if(branch) { const label=branch.textContent.toLowerCase(); if(/finish|end this scene|return to choices|^skip(?: this scene)?$/.test(label)){ $('#p17Output').hidden=true; setStatus('Scene ended or skipped. You can choose another mood any time.'); return; } const tones=Object.keys(TONE_LABELS); let next=state.tone; if(/sweet|flirt/.test(label)) next='flirty'; else if(/banter|comeback|roast/.test(label)) next='roasty'; else if(/secret|tension|dramatic/.test(label)) next='dramatic'; else if(/bold|confident/.test(label)) next='bold'; else next=pick(tones.filter(x=>x!==state.tone)); if(next===state.tone) next=pick(tones.filter(x=>x!==state.tone)); state.tone=next;$('#p17Tone').value=state.tone;generate('continue');return; }
      const load=t.closest('[data-load-favourite]'); if(load) {const item=state.favourites.find(x=>x.id===load.dataset.loadFavourite);if(item){state.lastOutput=item.text;state.lastBody=item.body||item.text;state.lastOutputTitle=item.title;$('#p17OutputTitle').textContent=item.title;$('#p17OutputText').textContent=item.body||item.text;$('#p17Output').hidden=false;setStatus('Saved scene loaded.');}return;}
      const del=t.closest('[data-delete-favourite]');if(del){state.favourites=state.favourites.filter(x=>x.id!==del.dataset.deleteFavourite);try{localStorage.setItem(FAV_KEY,JSON.stringify(state.favourites))}catch(_){}renderSaved();setStatus('Saved scene deleted.');}
    });
  }

  async function loadCatalog() {
    try { const r=await fetch('./phase17-wellness-catalog.json',{cache:'no-cache'}); if(r.ok){const j=await r.json();if(Array.isArray(j.items)&&j.items.length) state.products=j.items;} }
    catch (_) { /* Embedded, explicitly unverified category data keeps the catalog usable offline. */ }
  }
  function buildWellnessVault() {
    const view=$('#view-wellness'); if(!view||$('#p17WellnessVault'))return;
    const section=el('section','section-block p17-wellness-vault'); section.id='p17WellnessVault'; section.setAttribute('aria-labelledby','p17WellnessTitle');
    section.innerHTML=`<div class="p17-section-heading"><div><p class="eyebrow">PHASE 17 · ADULT WELLNESS CATALOG</p><h2 id="p17WellnessTitle">Dildo, anal & care product vault</h2><p class="muted">Browse the missing categories now. These are category concepts, not verified retail products; price, stock, exact material and dimensions have not been invented.</p></div><span class="p17-catalog-chip">CONCEPT CATALOG</span></div>
      <div class="p17-catalog-tools"><label class="p17-field"><span>Search categories</span><input id="p17ProductSearch" type="search" placeholder="Dildo, plug, lubricant, cleaner…" autocomplete="off"></label><label class="p17-field"><span>Category</span><select id="p17ProductCategory"><option value="all">All categories</option><option value="dildo">Dildos</option><option value="butt-plug">Butt plugs</option><option value="anal-beads">Anal beads</option><option value="prostate">Prostate massagers</option><option value="lubricant">Lubricants</option><option value="care">Cleaning & care</option><option value="storage">Storage</option></select></label><label class="p17-field"><span>Sort</span><select id="p17ProductSort"><option value="category">Category order</option><option value="az">Name A–Z</option></select></label></div>
      <p class="p17-catalog-count" id="p17CatalogCount" role="status" aria-live="polite">Loading category previews…</p><div class="p17-product-grid" id="p17ProductGrid"></div>
      <div class="p17-compare" id="p17Compare" hidden><div class="p17-vault-head"><div><p class="eyebrow">COMPARE SELECTED CATEGORIES</p><h3>What the listing still needs</h3></div><button class="btn ghost" id="p17ClearCompare" type="button">Clear compare</button></div><div class="p17-compare-items" id="p17CompareItems"></div></div>
      <section class="p17-safety"><p class="eyebrow">SAFETY / PRODUCT-DATA CHECK</p><h3>Show specifications before recommending</h3><div class="p17-safety-grid"><article><b>Anal-use design</b><p>For any anal-use item, verify a wide flared base or another reliable retrieval stop. Do not mark a category preview as safe without the exact item data.</p></article><article><b>Material & lubricant</b><p>Water-based lubricant is the broad-compatibility default; silicone lubricant may damage some silicone toys. Check both manufacturers’ instructions.</p></article><article><b>Cleaning & sharing</b><p>Use the exact maker’s cleaning instructions. If sharing, clean between users and consider a fresh barrier; change barriers when changing body site.</p></article></div><p class="p17-source-links"><a href="https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys" target="_blank" rel="noopener noreferrer">Planned Parenthood: sex-toy safety ↗</a> · <a href="https://www.sexualhealthoxfordshire.nhs.uk/services/psychosexual-therapy/lubricants/" target="_blank" rel="noopener noreferrer">NHS: lubricant compatibility ↗</a></p></section>
      <p class="p17-status" id="p17CatalogStatus" role="status" aria-live="polite">Catalog previews only. No checkout, seller or current stock is active.</p>`;
    const guide=$('.wellness-quick-guides',view); const intro=$('.wellness-intro',view); const anchor=guide||intro;
    if(anchor)anchor.insertAdjacentElement('afterend',section);else view.append(section);
    $('#p17ProductSearch',section).addEventListener('input',e=>{state.query=e.target.value;renderProducts();});
    $('#p17ProductCategory',section).addEventListener('change',e=>{state.category=e.target.value;renderProducts();});
    $('#p17ProductSort',section).addEventListener('change',renderProducts);
    section.addEventListener('click',e=>{
      const t=e.target instanceof Element?e.target:null;if(!t)return;
      const compare=t.closest('[data-p17-compare]'); if(compare){const id=compare.dataset.p17Compare;const at=state.compare.indexOf(id);if(at>=0)state.compare.splice(at,1);else if(state.compare.length>=3){$('#p17CatalogStatus').textContent='Compare up to 3 categories at a time.';return;}else state.compare.push(id);renderProducts();renderCompare();return;}
      const detail=t.closest('[data-p17-detail]');if(detail){state.expanded=state.expanded===detail.dataset.p17Detail?null:detail.dataset.p17Detail;renderProducts();return;}
      const fav=t.closest('[data-p17-fav]');if(fav){const id=fav.dataset.p17Fav;const set=new Set(readProductFaves());if(set.has(id))set.delete(id);else set.add(id);try{localStorage.setItem('blackedV4P17ProductFaves',JSON.stringify([...set]));}catch(_){}renderProducts();$('#p17CatalogStatus').textContent=set.has(id)?'Saved to your local product shortlist.':'Removed from your local product shortlist.';return;}
      if(t.closest('#p17ClearCompare')){state.compare=[];renderProducts();renderCompare();}
    });
    loadCatalog().then(renderProducts);
  }
  function readProductFaves(){try{const a=JSON.parse(localStorage.getItem('blackedV4P17ProductFaves')||'[]');return Array.isArray(a)?a:[]}catch(_){return[]}}
  function renderProducts(){
    const root=$('#p17ProductGrid');if(!root)return;root.replaceChildren();
    const query=state.query.trim().toLowerCase();let rows=state.products.filter(p=>(state.category==='all'||p.category===state.category)&&(!query||`${p.name} ${p.category} ${p.description} ${p.intended}`.toLowerCase().includes(query)));
    if($('#p17ProductSort')?.value==='az')rows.sort((a,b)=>a.name.localeCompare(b.name));
    $('#p17CatalogCount').textContent=`${rows.length} category concept${rows.length===1?'':'s'} · no verified SKUs or prices supplied`;
    const favs=new Set(readProductFaves());
    if(!rows.length){root.append(el('p','muted','No matching category. Try another search or reset the category filter.'));return;}
    rows.forEach(p=>{
      const card=el('article','p17-product-card');card.dataset.productId=p.id;
      const img=document.createElement('img');img.src='./'+p.image;img.alt=`Illustrative category artwork for ${p.name}; not a product photograph`;img.loading='lazy';img.width=220;img.height=180;
      const body=el('div','p17-product-body');const chip=el('span','p17-concept-chip','CATEGORY PREVIEW · NOT A VERIFIED SKU');const title=el('h3','',p.name);const desc=el('p','',p.description);const status=el('p','p17-product-unknown','Price: not configured · Seller/stock: not verified · Material/specs: awaiting source');
      const actions=el('div','p17-product-actions');const cmp=el('button','btn secondary',state.compare.includes(p.id)?'Remove compare':'Compare');cmp.type='button';cmp.dataset.p17Compare=p.id;const det=el('button','btn ghost',state.expanded===p.id?'Hide details':'Specs needed');det.type='button';det.dataset.p17Detail=p.id;const save=el('button','btn ghost',favs.has(p.id)?'♥ Saved':'♡ Save');save.type='button';save.dataset.p17Fav=p.id;
      actions.append(cmp,det,save);body.append(chip,title,desc,status,actions);
      if(state.expanded===p.id){const detail=el('div','p17-product-detail');detail.append(el('b','','Before this can become a real product listing'),el('p','',`Intended use: ${p.intended}`),el('p','','Required from supplier: actual SKU and seller, material/formulation, total vs usable/insertable length where relevant, widest diameter, base/handle design, care, warnings, price, stock, returns and image rights.'));body.append(detail);}
      card.append(img,body);root.append(card);
    });
    renderCompare();
  }
  function renderCompare(){const panel=$('#p17Compare');if(!panel)return;const root=$('#p17CompareItems');root.replaceChildren();const items=state.products.filter(p=>state.compare.includes(p.id));panel.hidden=!items.length;if(!items.length)return;
    const table=document.createElement('table');table.className='p17-compare-table';const rows=[['Category',p=>p.name],['Material','Unknown — supplier data required'],['Dimensions','Unknown — supplier data required'],['Seller / price / stock','Not configured'],['Status','Concept category only'],['Safety data',p=>p.intended]];
    const head=document.createElement('tr');const th=document.createElement('th');th.textContent='Field';head.append(th);items.forEach(p=>{const c=document.createElement('th');c.textContent=p.name;head.append(c)});table.append(head);
    rows.forEach(([label,value])=>{const tr=document.createElement('tr');const th=document.createElement('th');th.textContent=label;tr.append(th);items.forEach(p=>{const td=document.createElement('td');td.textContent=typeof value==='function'?value(p):value;tr.append(td)});table.append(tr)});root.append(table);
  }
  async function boot(){loadState();buildUltraPanel();buildWellnessVault();wireSharedPreferenceSync();syncSharedPrefs();window.BLACKED_V4_PHASE17={version:'17.0.0',getDiagnostics:()=>({ultraPanel:!!$('#p17UltraStudio'),gaaliChoices:$('#p17GaaliLevel')?.options.length||0,wellnessVault:!!$('#p17WellnessVault'),productCards:$('#p17ProductGrid')?.children.length||0,compareItems:state.compare.length,localFavourites:state.favourites.length,categoryFavourites:readProductFaves().length,usesVerifiedRetailData:false,oldFeaturesPreserved:true}),reset:()=>{state.favourites=[];try{localStorage.removeItem(FAV_KEY)}catch(_){}renderSaved();}};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
