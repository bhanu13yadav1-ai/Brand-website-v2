/* V2 Phase 2+3 combined repair. Keeps the original app.js/styles.css intact. */
(() => {
  'use strict';
  if (window.BLACKED_V2_P23) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const asset = (path) => `./assets/${path}`;
  const state = { version: 'V2 Phase 4 integration 1.0.0', wheels: {}, spinCount: 0, errors: [], gateAccepted: false };

  const wheelItems = {
    boy: [
      ['Pehle poochho', 'Seedhi baat, bina pressure', 'Body size ya preference photo se guess nahi hoti. Partner se respectful tareeke se poochhna behtar hai.'],
      ['Comfort first', 'Comfort ko priority do', 'Koi ek number sabke liye best nahi hota. Dono log apni comfort aur boundaries bata sakte hain.'],
      ['No comparison', 'Comparison band', 'Partner ko kisi celebrity ya photo ke saath compare karna reliable nahi aur hurtful ho sakta hai.'],
      ['Boundary check', 'Pehle boundaries', '“Nahi”, “pause” ya “abhi nahi” ko bina debate respect karo.'],
      ['Honest talk', 'Saaf baat karo', 'Guess karne ke bajaye curiosity aur respect ke saath baat shuru karo.'],
      ['Compliment', 'Specific tareef', 'Looks ke saath confidence, kindness ya style ki bhi tareef kar sakte ho.'],
      ['Privacy', 'Private rakho', 'Kisi ki image, message ya private detail share karne se pehle permission lo.'],
      ['Skip', 'Aaj skip', 'Kisi bhi prompt ko skip karna bilkul theek hai.']
    ],
    dildo: [
      ['Length', 'Insertable length', 'Total length aur insertable length alag ho sakti hain. Product ki labelled usable length check karo.'],
      ['Widest width', 'Sabse chaudi width', 'Diameter comfort ko affect karta hai. Dheere shuru karo; universal best size nahi hota.'],
      ['Material', 'Body-safe material', 'Non-porous, body-safe material aur manufacturer ki cleaning guidance check karo.'],
      ['Lubricant', 'Suitable lube', 'Toy ke material ke saath compatible lubricant use karo aur product directions follow karo.'],
      ['Slow start', 'Aaram se start', 'Force mat karo. Discomfort ya pain aaye toh stop karo.'],
      ['Comfort', 'Comfort check', 'Comfort, pain-free use aur personal preference kisi bhi size label se zyada important hain.'],
      ['Cleaning', 'Har use ke baad safai', 'Manufacturer ke instructions ke mutabik toy clean aur dry karo.'],
      ['Skip', 'Guide dekh lo', 'Unsure ho toh spin skip karke product instructions padh lo.']
    ],
    plug: [
      ['Flared base', 'Flared base zaroori', 'Anal-use toy ke saath flared base ya safe retrieval stop hona chahiye.'],
      ['Widest width', 'Widest diameter', 'Overall length se alag, sabse chaudi width bhi check karo. Size ko zabardasti push mat karo.'],
      ['Suitable lube', 'Suitable lubricant', 'Anal use ke liye sufficient compatible lubricant use karo aur product guidance follow karo.'],
      ['Slow start', 'Dheere aage badho', 'Relaxed pace rakho; resistance ko force se overcome karne ki koshish mat karo.'],
      ['Comfort', 'Comfort check', 'Naya size tabhi consider karo jab current use comfortable ho aur product instructions support karein.'],
      ['Stop on pain', 'Pain ho toh stop', 'Sharp pain, bleeding ya ongoing discomfort ho toh use band karo aur medical advice lo.'],
      ['Cleaning', 'Safai aur storage', 'Cleaning, material compatibility aur storage instructions check karo.'],
      ['Skip', 'Skip allowed', 'Koi range choose karna compulsory nahi hai.']
    ]
  };

  const wildItems = {
    flirty: [['Compliment', 'Dil se tareef', 'Ek aisi specific tareef bolo jo looks se aage jaaye.'], ['Secret crush', 'Secret crush', 'Kisi fictional adult character ka harmless secret crush reveal karo.'], ['Eye contact', 'Nazar ka game', 'Mutual comfort ho toh 5-second eye-contact challenge.'], ['Date idea', 'Date ka idea', 'Ek unexpected but comfortable date plan suggest karo.'], ['One truth', 'Ek sach', 'Apni ek cute habit share karo.'], ['Favourite memory', 'Favourite yaad', 'Ek shared happy moment yaad karo.'], ['Song pick', 'Gaana choose karo', 'Ek song choose karo jo mood describe kare.'], ['Skip', 'Skip allowed', 'Mood nahi? Is prompt ko skip karo.']],
    double: [['Double meaning', 'Double meaning', 'Ek playful, non-graphic double-meaning line banao.'], ['One hint', 'Ek hint', 'Apni fictional crush ko ek harmless clue do.'], ['Secret message', 'Secret message', 'Ek teasing message likho jismein kisi ki boundary cross na ho.'], ['Bold question', 'Bold sawaal', 'Poochho: “Kaunsi tareef tumhe genuinely blush kara deti hai?”'], ['One truth', 'Ek sach', 'Ek romantic preference jo tum comfortable ho share karne mein.'], ['Choose two', 'Do mein se chuno', 'Movie night ya late-night walk?'], ['Mood check', 'Mood check', 'Dono se poochho: flirty, romantic ya skip?'], ['Skip', 'Skip allowed', 'Har prompt optional hai.']],
    bold: [['Choose a dare', 'Dare choose karo', 'Ek cute, safe dare choose karo—dono ki marzi zaroori.'], ['Truth', 'Seedha sach', 'Ek aisa sawaal poochho jiska jawab dena optional ho.'], ['Switch roles', 'Role switch', 'Ek minute ke liye fictional date plan karne ki zimmedari badlo.'], ['Compliment', 'Bold tareef', 'Ek confident lekin respectful compliment bolo.'], ['No-pressure invite', 'Invite do', 'Kisi date idea ka invitation do; “no” bhi valid jawab hai.'], ['Boundary', 'Boundary check', 'Ek cheez batao jo comfortable hai aur ek jo nahi.'], ['Secret wish', 'Chhoti wish', 'Ek non-sexual romantic wish share karo.'], ['Skip', 'Skip allowed', 'Prompt ko skip kar sakte ho.']],
    spicy: [['Slow burn', 'Slow burn', 'Ek fictional scene mein anticipation aur chemistry build karo.'], ['Romantic fantasy', 'Romantic fantasy', 'Ek candlelit date ka mood aur setting describe karo.'], ['One hint', 'Ek ishara', 'Ek playful hint do, phir partner ko guess karne do.'], ['Favourite touch', 'Comfort question', 'Poochho kaunsa non-sexual affectionate gesture pasand hai.'], ['Surprise date', 'Surprise date', 'Ek thoughtful surprise plan suggest karo.'], ['Close moment', 'Close moment', 'Ek emotional connection wala scene imagine karo.'], ['Talk first', 'Pehle baat', 'Fantasy ke saath boundary bhi discuss karo.'], ['Skip', 'Skip allowed', 'Comfort sabse important hai.']],
    fantasy: [['Mysterious note', 'Raaz bhara note', 'Ek fictional adult character ko mysterious note milta hai.'], ['Unexpected meeting', 'Achanak mulaqat', 'Do consenting adult characters unexpected jagah milte hain.'], ['Secret room', 'Secret room', 'Atmosphere aur suspense par focus karo, explicit detail par nahi.'], ['Unexpected truth', 'Chhupa sach', 'Character apni ek honest feeling reveal karta hai.'], ['Choose ending', 'Ending choose karo', 'Romantic ending ya mystery ending?'], ['One boundary', 'Ek boundary', 'Story character clearly apni limit batata hai.'], ['Plot twist', 'Plot twist', 'Ek unexpected lekin safe reveal invent karo.'], ['Skip', 'Skip allowed', 'Fantasy compulsory nahi.']],
    truth: [['One truth', 'Ek sach', 'Aisa sawaal poochho jiska jawab dena optional ho.'], ['Cute dare', 'Cute dare', 'Ek funny voice note ya compliment—sirf agar dono agree karein.'], ['Boundary check', 'Boundary check', 'Poochho: “Kya avoid karna chahoge?”'], ['Favourite memory', 'Favourite yaad', 'Ek favourite shared moment batao.'], ['Choose between two', 'Do mein se chuno', 'Dinner date ya movie night?'], ['Private question', 'Private sawaal', 'Sawaal skip karne ka option hamesha rakho.'], ['New activity', 'Nayi activity', 'Ek safe activity suggest karo jo dono try karna chahein.'], ['Skip', 'Skip allowed', 'Skip karna bhi game ka part hai.']],
    confession: [['Secret crush', 'Secret crush', 'Fictional secret-crush confession likho.'], ['First impression', 'Pehli impression', 'Pehli meeting ki honest impression share karo.'], ['Hidden compliment', 'Chhupi tareef', 'Ek aisi tareef batao jo pehle nahi kahi.'], ['Message draft', 'Message draft', 'Ek bold but respectful message banao.'], ['Guess the mood', 'Mood guess', 'Poochho ki saamne wala flirty ya romantic mood mein hai.'], ['Honest answer', 'Honest jawab', '“Tumhe kis tarah ki attention pasand hai?”'], ['Keep it private', 'Privacy', 'Personal messages share karne se pehle permission lo.'], ['Skip', 'Skip allowed', 'Koi pressure nahi.']],
    boyfriend: [['Compliment', 'Tareef', 'Partner ke kisi real positive quality ki tareef karo.'], ['Date challenge', 'Date challenge', 'Aaj ke liye ek simple date plan banao.'], ['Private question', 'Private sawaal', 'Ek personal but optional conversation starter poochho.'], ['Honest mood', 'Mood batao', 'Poochho: romantic, playful, ya quiet time?'], ['Secret memory', 'Secret memory', 'Ek funny ya sweet memory share karo.'], ['One promise', 'Ek promise', 'Ek realistic, respectful promise karo.'], ['Boundary check', 'Boundary check', 'Dono ki comfort limits clear karo.'], ['Skip', 'Skip allowed', 'Partner par koi pressure nahi.']],
    private: [['Privacy first', 'Privacy first', 'Private fantasy sirf trusted consenting adult ke saath share karo.'], ['Boundaries', 'Limits clear', 'Ek green light aur ek no-go boundary share karo, agar comfortable ho.'], ['Question', 'Sawaal', 'Poochho: “Kis topic par baat karna comfortable nahi?”'], ['No pressure', 'No pressure', 'Kisi answer ya activity ke liye pressure mat do.'], ['Pause word', 'Pause signal', 'Aisa word ya signal agree karo jo turant pause kar de.'], ['Trust', 'Trust', 'Trust build karne wali ek small action suggest karo.'], ['Talk later', 'Baad mein baat', 'Abhi mood nahi toh baad mein baat karna valid hai.'], ['Skip', 'Skip allowed', 'Koi prompt zaroori nahi.']],
    dark: [['Secret note', 'Raaz bhara note', 'Ek mysterious note romantic tension create karta hai—choice character ki.'], ['Powerful entrance', 'Dramatic entry', 'Adult character confident entry leta hai; doosra character apni choice rakhta hai.'], ['Hidden truth', 'Chhupa sach', 'Character ek secret reveal karta hai, bina coercion ke.'], ['Slow burn', 'Dheere dheere', 'Dialogues aur anticipation se mood banao; graphic detail ki zaroorat nahi.'], ['Trust test', 'Trust check', 'Character honest communication choose karta hai.'], ['Midnight call', 'Aadhi raat ka call', 'Ek mysterious phone call se plot twist aata hai.'], ['Choose the ending', 'Ending choose karo', 'Happy ending ya mystery ending?'], ['Skip', 'Skip allowed', 'Kisi bhi prompt ko skip kiya ja sakta hai.']]
  };

  const wheels = {};
  const resultSelectors = { boy:'#boyResult', dildo:'#dildoResult', plug:'#plugResult', wild:'#wildResult' };
  const selectSelectors = { boy:'#boyPreference', dildo:'#dildoPreference', plug:'#plugPreference', wild:'#wildCategory' };

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function selectedItems(kind) {
    if (kind !== 'wild') return wheelItems[kind];
    const cat = $('#wildCategory')?.value || 'flirty';
    return wildItems[cat] || wildItems.flirty;
  }
  function announce(kind, item, index, range) {
    const host = $(resultSelectors[kind]);
    if (!host) return;
    host.replaceChildren();
    const title = document.createElement('strong'); title.textContent = `${index + 1}/8 · ${item[1]}`;
    const body = document.createElement('span'); body.textContent = item[2];
    const note = document.createElement('small');
    note.className = 'v23-wheel-meta';
    note.textContent = kind === 'wild' ? '18+ fictional prompt · optional · consent first' : `Education/conversation prompt · ${range || 'demo only'} · size ka prediction nahi`;
    const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'small-btn'; retry.dataset.v23Retry = kind; retry.textContent = 'Phir se ghumao';
    const skip = document.createElement('button'); skip.type = 'button'; skip.className = 'small-btn'; skip.dataset.v23Skip = kind; skip.textContent = 'Skip';
    const actions = document.createElement('div'); actions.className = 'button-row'; actions.append(retry, skip);
    host.append(title, body, note, actions);
    host.dataset.v23SelectedIndex = String(index);
    host.dataset.v23SelectedLabel = item[0];
  }
  function segmentLabels(kind) {
    return selectedItems(kind).map(x => x[0]);
  }
  function refreshWheel(kind) {
    const w = wheels[kind]; if (!w) return;
    const labels = segmentLabels(kind);
    w.layer.replaceChildren();
    labels.forEach((label, index) => {
      const tag = document.createElement('span');
      tag.className = 'v23-wheel-label';
      tag.textContent = label;
      const angle = (index + 0.5) * 45 * Math.PI / 180;
      const radius = 32;
      tag.style.left = `${50 + Math.sin(angle) * radius}%`;
      tag.style.top = `${50 - Math.cos(angle) * radius}%`;
      tag.setAttribute('aria-hidden', 'true');
      w.layer.append(tag);
    });
    w.disc.setAttribute('aria-label', `${kind} wheel: ${labels.join(', ')}`);
    w.labels = labels;
  }
  function parseRotation(element) {
    try {
      const transform = getComputedStyle(element).transform;
      const match = transform.match(/^matrix\((.+)\)$/);
      if (!match) return 0;
      const values = match[1].split(',').map(Number);
      return Math.atan2(values[1], values[0]) * 180 / Math.PI;
    } catch { return 0; }
  }
  function keepLabelsUpright(kind) {
    const w = wheels[kind]; if (!w?.busy) return;
    w.disc.style.setProperty('--v23-counter-angle', `${-parseRotation(w.disc)}deg`);
    w.raf = requestAnimationFrame(() => keepLabelsUpright(kind));
  }
  function buildWheel(kind) {
    const disc = $(`[data-wheel-disc="${kind}"]`);
    if (!disc || wheels[kind]) return;
    const existingCenter = disc.querySelector('.wheel-center');
    const centerText = kind === 'wild' ? 'WILD' : 'SPIN';
    existingCenter?.remove();
    const stage = document.createElement('div'); stage.className = 'v23-wheel-stage'; stage.dataset.v23WheelStage = kind;
    disc.parentNode.insertBefore(stage, disc); stage.append(disc);
    disc.classList.add('v23-wheel-disc'); disc.style.transform = 'rotate(0deg)';
    const layer = document.createElement('div'); layer.className = 'v23-wheel-label-layer';
    disc.append(layer);
    const pointer = document.createElement('span'); pointer.className = 'v23-wheel-pointer'; pointer.textContent = '▼'; pointer.setAttribute('aria-hidden','true'); stage.append(pointer);
    const center = document.createElement('button'); center.type='button'; center.className='v23-wheel-center'; center.textContent=centerText; center.setAttribute('aria-label',`Spin ${kind} wheel`); center.dataset.v23CenterSpin=kind; stage.append(center);
    wheels[kind] = {kind,stage,disc,layer,center,pointer,busy:false,timer:0,raf:0,rotation:0,labels:[],lastIndex:null,lastItem:null};
    refreshWheel(kind);
  }
  function unlock(kind) {
    const w = wheels[kind]; if (!w) return;
    w.busy = false; if (w.timer) clearTimeout(w.timer); w.timer = 0;
    if (w.raf) cancelAnimationFrame(w.raf); w.raf = 0;
    $$(`[data-spin-wheel="${kind}"], [data-wheel-reset="${kind}"]`).forEach(b => { b.disabled = false; });
    const select = $(selectSelectors[kind]); if (select) select.disabled = false;
    w.center.disabled = false;
  }
  function spin(kind) {
    const w = wheels[kind]; if (!w || w.busy) return;
    const select = $(selectSelectors[kind]);
    if (kind !== 'wild' && !select?.value) {
      const host = $(resultSelectors[kind]); if (host) host.textContent = 'Pehle demo range chuno. Phir wheel ghumao.';
      select?.focus(); return;
    }
    const items = selectedItems(kind);
    if (!items || items.length !== 8) { state.errors.push(`${kind}: expected 8 labels`); return; }
    let index = Math.floor(Math.random() * 8);
    if (w.lastIndex !== null && index === w.lastIndex) index = (index + 1 + Math.floor(Math.random() * 7)) % 8;
    const sectorCenter = index * 45 + 22.5;
    const currentAngle = ((w.rotation % 360) + 360) % 360;
    const correction = (360 - ((sectorCenter + currentAngle) % 360)) % 360;
    const finalRotation = w.rotation + 1440 + correction;
    w.busy = true; w.lastIndex = index; w.lastItem = items[index]; w.rotation = finalRotation; state.spinCount++;
    $$(`[data-spin-wheel="${kind}"]`).forEach(b => b.disabled = true);
    if (select) select.disabled = true;
    w.center.disabled = true; w.center.textContent = '…';
    const host = $(resultSelectors[kind]); if (host) host.textContent = 'Wheel ghoom raha hai…';
    w.disc.style.setProperty('--v23-counter-angle','0deg');
    w.disc.style.transition = reduceMotion ? 'none' : 'transform 2.65s cubic-bezier(.12,.76,.16,1)';
    w.disc.style.transform = `rotate(${finalRotation}deg)`;
    if (!reduceMotion) w.raf = requestAnimationFrame(() => keepLabelsUpright(kind));
    w.timer = setTimeout(() => {
      if (!wheels[kind]?.busy || w.lastIndex !== index) return;
      w.center.textContent = kind === 'wild' ? 'WILD' : 'SPIN';
      announce(kind, items[index], index, select ? select.options[select.selectedIndex]?.text : 'demo only');
      unlock(kind);
    }, reduceMotion ? 0 : 2750);
  }
  function resetWheel(kind) {
    const w = wheels[kind]; if (!w) return;
    if (w.timer) clearTimeout(w.timer); if (w.raf) cancelAnimationFrame(w.raf);
    w.busy = false; w.timer=0; w.raf=0; w.rotation=0; w.lastIndex=null; w.lastItem=null;
    w.disc.style.transition='none'; w.disc.style.setProperty('--v23-counter-angle','0deg'); w.disc.style.transform='rotate(0deg)';
    w.center.textContent=kind==='wild'?'WILD':'SPIN'; w.center.disabled=false;
    $$(`[data-spin-wheel="${kind}"]`).forEach(b=>b.disabled=false);
    const select=$(selectSelectors[kind]); if(select)select.disabled=false;
    const host=$(resultSelectors[kind]); if(host){host.textContent=kind==='wild'?'Category chuno, phir wheel ghumao.':'Pehle ek demo range select karo.';delete host.dataset.v23SelectedIndex;delete host.dataset.v23SelectedLabel;}
  }
  function addWheelHub() {
    const home=$('#view-home'); if(!home||$('#v23WheelHub'))return;
    const section=document.createElement('section'); section.id='v23WheelHub';section.className='section-block v23-wheel-hub';section.setAttribute('aria-labelledby','v23WheelHubTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">V2 · WHEEL HUB · 18+</p><h2 id="v23WheelHubTitle">Spin. Guess. Get closer.</h2><p class="muted">Posters aur real interactive wheels ab ek hi jagah. Har prompt optional hai.</p></div></div><div class="v23-poster-grid"><article class="v23-poster-card"><img src="${asset('wheel-posters/tease-guess-wheel.webp')}" data-v23-asset="wheel-posters/tease-guess-wheel.webp" alt="Tease and Guess Wheel poster" loading="lazy" decoding="async"><div class="v23-card-copy"><h3>Tease & Guess Wheel</h3><p>Secret crush, favourite memory aur playful guesses.</p><button class="btn primary" type="button" data-v23-target-wheel="wild" data-v23-category="confession">Wheel kholo ↗</button></div></article><article class="v23-poster-card"><img src="${asset('wheel-posters/after-dark-questions.webp')}" data-v23-asset="wheel-posters/after-dark-questions.webp" alt="After-Dark Questions poster" loading="lazy" decoding="async"><div class="v23-card-copy"><h3>After-Dark Questions</h3><p>Private questions, relationship goals aur skip controls.</p><button class="btn primary" type="button" data-v23-target-wheel="wild" data-v23-category="private">Questions wheel kholo ↗</button></div></article></div>`;
    const hero=home.querySelector('.hero'); if(hero)hero.insertAdjacentElement('afterend',section);else home.prepend(section);
  }
  function addInnerwearCampaign() {
    const view=$('#view-innerwear'); if(!view||$('#v23InnerwearCampaign'))return;
    const section=document.createElement('section');section.id='v23InnerwearCampaign';section.className='section-block v23-campaign-feature';section.setAttribute('aria-labelledby','v23InnerwearCampaignTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">NEW · LOCAL CAMPAIGN ASSET</p><h2 id="v23InnerwearCampaignTitle">Red Lace — Draft Creative</h2><p class="muted">Owner-supplied campaign artwork. Copy is creative draft—not a medical, fit, stock or performance claim.</p></div><span class="pill">Campaign reference</span></div><article class="v23-feature-image-card"><img src="${asset('campaigns/blacked-red-lace-campaign.webp')}" data-v23-asset="campaigns/blacked-red-lace-campaign.webp" alt="Owner-supplied BLACKED red lace campaign concept" loading="lazy" decoding="async"><div><p class="eyebrow">BLACKED · INNERWEAR</p><h3>Hasina ke chut ka pasina</h3><p>Bold desi campaign line; review text and image rights before public promotion.</p><span class="pill">Draft concept · not verified stock</span></div></article>`;
    const intro=view.querySelector('.page-intro'); if(intro)intro.insertAdjacentElement('afterend',section);else view.prepend(section);
  }
  function addSanskariGallery() {
    const view=$('#view-sanskari'); if(!view||$('#v23SanskariLocalGallery'))return;
    const section=document.createElement('section');section.id='v23SanskariLocalGallery';section.className='section-block v23-local-gallery';section.setAttribute('aria-labelledby','v23SanskariLocalTitle');
    const images=[
      ['sanskari/sanskari-outside-bold-within.webp','Sanskari Outside, Bold Within','Main Sanskari campaign'],
      ['sanskari/shaam-se-raat-tak.webp','Shaam Se Raat Tak','Evening styling campaign'],
      ['sanskari/shaam-ki-roshni.webp','Shaam Ki Roshni','Gold/black styling campaign'],
      ['sanskari/shaam-e-noor.webp','Shaam-e-Noor','Noor-inspired visual concept'],
      ['sanskari/noor-ka-nasha.webp','Noor Ka Nasha','Noor-inspired visual concept'],
      ['sanskari/sanskari-outside-bold-within-high-res.webp','Sanskari · High-resolution variant','Alternate supplied artwork'],
      ['sanskari/sanskari-outside-bold-within-web-optimized.webp','Sanskari · Web-optimized variant','Alternate supplied artwork']
    ];
    section.innerHTML='<div class="section-heading"><div><p class="eyebrow">LOCAL ASSETS · PATH FIX</p><h2 id="v23SanskariLocalTitle">Supplied Sanskari image collection</h2><p class="muted">Original supplied concepts, locally bundled so they do not depend on the previous external image URLs. Variants are labelled separately.</p></div></div><div class="v23-local-image-grid"></div>';
    const grid=$('.v23-local-image-grid',section);
    images.forEach(([path,title,caption])=>{
      const card=document.createElement('article');card.className='v23-local-image-card';
      const img=document.createElement('img');img.src=asset(path);img.alt=title;img.loading='lazy';img.decoding='async';img.dataset.v23Asset=path;
      const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=caption;const status=document.createElement('small');status.className='v23-image-status';status.textContent='Loading image…';
      img.addEventListener('load',()=>status.textContent='Image loaded');img.addEventListener('error',()=>{status.textContent=`Image failed: ${path}`;card.classList.add('v23-image-error');});
      card.append(img,h,p,status);grid.append(card);
    });
    const hero=view.querySelector('.sanskari-hero'); if(hero)hero.insertAdjacentElement('afterend',section);else view.prepend(section);
  }
  function addBoyfriendGallery() {
    const view=$('#view-boyfriend'); if(!view||$('#v23BoyfriendGallery'))return;
    const section=document.createElement('section');section.id='v23BoyfriendGallery';section.className='section-block v23-boyfriend-gallery';section.setAttribute('aria-labelledby','v23BoyfriendGalleryTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">OWNER-SUPPLIED REFERENCES · 18+</p><h2 id="v23BoyfriendGalleryTitle">Boyfriend Fantasy Gallery</h2><p class="muted">Four separate reference photos from your uploads. Public identity and body measurements are not verified; penis size cannot be inferred from a photo.</p></div><span class="pill">4 references</span></div><div class="v23-boyfriend-grid"></div>`;
    const grid=$('.v23-boyfriend-grid',section);
    const refs=[
      ['fantasy-gallery/male-reference-01.webp','Reference 01','Classic portrait'],
      ['fantasy-gallery/male-reference-02.webp','Reference 02','Strength portrait'],
      ['fantasy-gallery/male-reference-03.webp','Reference 03','Fitness mirror selfie'],
      ['fantasy-gallery/male-reference-04.webp','Reference 04','Innerwear editorial']
    ];
    refs.forEach(([path,label,desc])=>{
      const card=document.createElement('article');card.className='v23-reference-card';
      const img=document.createElement('img');img.src=asset(path);img.alt=`User-provided adult male ${label.toLowerCase()} visual reference`;img.loading='lazy';img.decoding='async';img.dataset.v23Asset=path;
      const h=document.createElement('h3');h.textContent=label;const p=document.createElement('p');p.textContent=desc;const note=document.createElement('small');note.textContent='Name/size: not verified · no body-size inference';
      const status=document.createElement('small');status.className='v23-image-status';status.textContent='Loading image…';
      img.addEventListener('load',()=>status.textContent='Image loaded');img.addEventListener('error',()=>{status.textContent=`Image failed: ${path}`;card.classList.add('v23-image-error');});
      card.append(img,h,p,note,status);grid.append(card);
    });
    const intro=view.querySelector('.page-intro'); if(intro)intro.insertAdjacentElement('afterend',section);else view.prepend(section);
  }
  function addThreesomeSection() {
    const view=$('#view-boyfriend');if(!view||$('#v23ThreesomeSection'))return;
    const section=document.createElement('section');section.id='v23ThreesomeSection';section.className='section-block v23-threesome-section';section.setAttribute('aria-labelledby','v23ThreesomeTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">SEPARATE COLLECTION · 18+</p><h2 id="v23ThreesomeTitle">Threesome Fantasy</h2><p class="muted">Fictional ideas for consenting adults. Everyone can set boundaries, pause or opt out. The cover stays hidden until the 18+ self-attestation step.</p></div><span class="pill">18+ · consent first</span></div><div class="v23-threesome-preview"><div><h3>Three-person fantasy, story-first</h3><p>Use the section for fiction, communication and boundary-setting prompts—not claims about real people.</p><button class="btn primary" type="button" data-v23-open-threesome>Enter 18+ section</button></div><div id="v23ThreesomeProtected" hidden><img src="${asset('fantasy-gallery/threesome-fantasy-cover.webp')}" data-v23-asset="fantasy-gallery/threesome-fantasy-cover.webp" alt="User-provided adult fantasy cover image" loading="lazy" decoding="async"><div class="v23-threesome-prompts"><article><h3>Prompt 01 · Before the scene</h3><p>All fictional adults discuss expectations, boundaries and a clear pause signal before anything begins.</p></article><article><h3>Prompt 02 · Honest check-in</h3><p>Each character can say “yes”, “no”, “not yet” or change their mind without pressure.</p></article><article><h3>Prompt 03 · Choose the ending</h3><p>The scene can end with a warm conversation, a shared laugh or everyone choosing to pause.</p></article></div><button type="button" class="btn ghost" data-v23-leave-threesome>Hide this section</button></div></div>`;
    const gallery=$('#v23BoyfriendGallery'); if(gallery)gallery.insertAdjacentElement('afterend',section);else view.append(section);
    const gate=document.createElement('div');gate.id='v23ThreesomeGate';gate.className='v23-gate';gate.hidden=true;gate.setAttribute('role','dialog');gate.setAttribute('aria-modal','true');gate.setAttribute('aria-labelledby','v23GateTitle');
    gate.innerHTML=`<div class="v23-gate-card"><p class="eyebrow">ADULTS ONLY</p><h2 id="v23GateTitle">Before opening this collection</h2><p>This section is intended for adults 18+. This checkbox is self-attestation, not formal age verification.</p><label class="v23-age-check"><input id="v23AgeCheck" type="checkbox"> I confirm that I am 18 or older.</label><p id="v23AgeError" class="v23-gate-error" aria-live="polite"></p><div class="button-row"><button class="btn primary" type="button" data-v23-confirm-age>Continue</button><button class="btn ghost" type="button" data-v23-cancel-age>Go back</button></div></div>`;
    document.body.append(gate);
  }

  function createPhase4ImageCard(path,title,caption,kind='v24-image-card') {
    const card=document.createElement('article');card.className=kind;card.dataset.v24Category=kind;
    const img=document.createElement('img');img.src=asset(path);img.alt=title;img.loading='lazy';img.decoding='async';img.dataset.v24Asset=path;img.dataset.v23Asset=path;
    const body=document.createElement('div');body.className='v24-image-card-copy';
    const h=document.createElement('h3');h.textContent=title;
    const p=document.createElement('p');p.textContent=caption;
    const status=document.createElement('small');status.className='v23-image-status';status.textContent='Loading image…';
    img.addEventListener('load',()=>{status.textContent='Image loaded';card.classList.remove('v23-image-error');});
    img.addEventListener('error',()=>{status.textContent='Image failed: '+path;card.classList.add('v23-image-error');});
    body.append(h,p,status);card.append(img,body);return card;
  }
  function addPhase4InnerwearCollection() {
    const view=$('#view-innerwear');if(!view||$('#v24InnerwearCollection'))return;
    const section=document.createElement('section');section.id='v24InnerwearCollection';section.className='section-block v24-campaign-collection';section.setAttribute('aria-labelledby','v24InnerwearCollectionTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">V2 PHASE 4 · LOCAL ASSET COLLECTION</p><h2 id="v24InnerwearCollectionTitle">New Innerwear & Editorial Collection</h2><p class="muted">Tumhari nayi supplied campaign images local WebP assets ke roop mein bundle hain. “Editorial concept” ka matlab confirmed stock, official religious collection ya product specification nahi.</p></div><span class="pill" id="v24CampaignCount">10 local images</span></div><div class="v24-gallery-tools"><label class="field">Search collection<input id="v24CampaignSearch" type="search" maxlength="80" placeholder="Search title ya style…"></label><label class="field">Category<select id="v24CampaignFilter"><option value="all">All campaign concepts</option><option value="innerwear">Innerwear</option><option value="editorial">Editorial concepts</option><option value="noor">Black & gold / modest styling</option></select></label></div><div class="v24-campaign-grid" id="v24CampaignGrid"></div><p class="micro muted" id="v24CampaignEmpty" hidden>No matching campaign images. Search ya category change karo.</p>`;
    const cards=[
      ['innerwear-gallery/soft-rose-rest-restore.webp','Soft Rose · Rest, Restore, Rise','Rose-tone innerwear campaign concept.','innerwear'],
      ['innerwear-gallery/black-gold-styling-01.webp','Black & Gold · Styling Study','Styling reference; model ki religion ya identity infer nahi ki jaati.','noor'],
      ['innerwear-gallery/comfort-styling.webp','Comfort Styling','Layered lounge styling concept.','innerwear'],
      ['innerwear-gallery/rose-lace-back-detail.webp','Rose Lace · Detail View','Lace campaign detail; actual product SKU/size verify nahi kiya gaya.','innerwear'],
      ['innerwear-gallery/rose-lace-lifestyle.webp','Rose Lace · Lifestyle','Rose lace editorial concept.','innerwear'],
      ['innerwear-gallery/black-veil-editorial.webp','Black Veil · Costume Editorial','Theatrical styling reference; official clergy/religious collection nahi.','editorial'],
      ['innerwear-gallery/black-gold-confidence.webp','Black & Gold · Confidence','Black-and-gold campaign concept; cultural identity not inferred.','noor'],
      ['innerwear-gallery/sacred-elegance-editorial.webp','Sacred Elegance · Editorial Concept','Costume/editorial styling only; not mapped to an official Christian collection.','editorial'],
      ['innerwear-gallery/black-lace-confidence.webp','Black Lace · Confidence','Black-lace innerwear campaign image.','innerwear'],
      ['innerwear-gallery/feel-confident-everyday.webp','Feel Confident Everyday','Pink-toned campaign concept; no product stock claim.','innerwear']
    ];
    const grid=$('#v24CampaignGrid',section);
    cards.forEach(([path,title,caption,category])=>{const card=createPhase4ImageCard(path,title,caption);card.dataset.category=category;card.dataset.search=(title+' '+caption+' '+category).toLowerCase();grid.append(card);});
    const filter=()=>{const q=($('#v24CampaignSearch')?.value||'').trim().toLowerCase();const category=$('#v24CampaignFilter')?.value||'all';let visible=0;$$('.v24-campaign-grid .v24-image-card',section).forEach(card=>{const okText=!q||card.dataset.search.includes(q);const okCat=category==='all'||card.dataset.category===category;card.hidden=!(okText&&okCat);if(!card.hidden)visible++;});$('#v24CampaignEmpty',section).hidden=visible>0;$('#v24CampaignCount',section).textContent=`${visible} of ${cards.length} images`;};
    $('#v24CampaignSearch',section).addEventListener('input',filter);$('#v24CampaignFilter',section).addEventListener('change',filter);
    const campaign=$('#v23InnerwearCampaign');if(campaign)campaign.insertAdjacentElement('afterend',section);else{const intro=view.querySelector('.page-intro');if(intro)intro.insertAdjacentElement('afterend',section);else view.prepend(section);}
  }
  function addPhase4CoupleEditorials() {
    const gallery=$('#v23BoyfriendGallery');if(!gallery||$('#v24CoupleEditorials'))return;
    const section=document.createElement('section');section.id='v24CoupleEditorials';section.className='section-block v24-campaign-collection';section.setAttribute('aria-labelledby','v24CoupleEditorialsTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">BOYFRIEND & COUPLES · CAMPAIGN ART</p><h2 id="v24CoupleEditorialsTitle">Couples Style References</h2><p class="muted">These are campaign visuals, not verified profiles or claims about the people shown. Body size/identity are not inferred.</p></div><span class="pill">2 concepts</span></div><div class="v24-couple-grid" id="v24CoupleGrid"></div>`;
    const grid=$('#v24CoupleGrid',section);
    [
      ['couples-gallery/active-couple-concept.webp','Active Lifestyle · Couple','Sporty styling and partner confidence concept.'],
      ['couples-gallery/couple-confidence.webp','Feel Confident · Couple','Two-adult couple editorial; no identity claim.']
    ].forEach(([p,t,c])=>grid.append(createPhase4ImageCard(p,t,c,'v24-image-card')));
    gallery.insertAdjacentElement('afterend',section);
  }
  function addPhase4ThreesomeEditorials() {
    const protectedBox=$('#v23ThreesomeProtected');if(!protectedBox||$('#v24ThreesomeEditorials'))return;
    const section=document.createElement('section');section.id='v24ThreesomeEditorials';section.className='v24-threesome-gallery';section.setAttribute('aria-labelledby','v24ThreesomeEditorialsTitle');
    section.innerHTML=`<div class="section-heading"><div><p class="eyebrow">GATED VISUAL REFERENCES · 18+</p><h3 id="v24ThreesomeEditorialsTitle">Three-Person Fantasy · Campaign Art</h3><p class="muted">Adult editorial imagery only. These are fictional/campaign visuals, not evidence of any real person's relationships. All prompts remain optional.</p></div><span class="pill">4 local assets</span></div><div class="v24-triad-grid" id="v24TriadGrid"></div>`;
    const grid=$('#v24TriadGrid',section);
    [
      ['triad-gallery/innerwere-luxury-trio.webp','Luxury Innerwear Trio','Three-adult fashion campaign cover.'],
      ['triad-gallery/night-light-confidence.webp','Night-Light Confidence','Multi-adult campaign styling concept.'],
      ['triad-gallery/same-girl-different-stories.webp','Same Girl, Different Stories','Multi-adult visual story concept.'],
      ['triad-gallery/same-room-different-feelings.webp','Same Room, Different Feelings','Multi-adult visual story concept.']
    ].forEach(([p,t,c])=>grid.append(createPhase4ImageCard(p,t,c,'v24-image-card')));
    const prompts=protectedBox.querySelector('.v23-threesome-prompts');if(prompts)prompts.insertAdjacentElement('afterend',section);else protectedBox.append(section);
  }

  function addNavLinks() {
    const navs=[$('#mainNav'),$('#mobileMenu')].filter(Boolean);
    navs.forEach(nav=>{
      if(nav.querySelector('[data-v23-open-threesome-nav]'))return;
      const b=document.createElement('button');b.type='button';b.className=nav.id==='mainNav'?'nav-link':'mobile-nav-link';b.dataset.v23OpenThreesomeNav='';b.textContent='Threesome Fantasy 18+';nav.append(b);
    });
  }
  function showGate() {
    const gate=$('#v23ThreesomeGate'); if(!gate)return;
    let accepted=state.gateAccepted;
    try { accepted = accepted || sessionStorage.getItem('blackedV2ThreesomeGate')==='yes'; } catch {}
    if(accepted) { unlockThreesome();return; }
    gate.hidden=false;document.body.classList.add('v23-gate-open');$('#v23AgeCheck')?.focus();
  }
  function hideGate() { const gate=$('#v23ThreesomeGate');if(gate)gate.hidden=true;document.body.classList.remove('v23-gate-open'); }
  function openThreesome() {
    goToView('boyfriend');
    showGate();
    setTimeout(()=>$('#v23ThreesomeSection')?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'}),120);
  }
  function unlockThreesome() {
    state.gateAccepted=true;try{sessionStorage.setItem('blackedV2ThreesomeGate','yes');}catch{}
    const content=$('#v23ThreesomeProtected');if(content)content.hidden=false;
    hideGate();$('#v23ThreesomeSection')?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
  }
  function goToView(name) { try { window.BLACKED_V1?.setView(name); } catch(e) { state.errors.push(`Navigation: ${String(e)}`); }
  }
  function goToWheel(kind, category) {
    goToView(kind==='dildo'||kind==='plug'?'wellness':'boyfriend');
    if(kind==='wild'&&category&&$('#wildCategory')){$('#wildCategory').value=category;refreshWheel('wild');}
    setTimeout(()=>{const disc=$(`[data-wheel-disc="${kind}"]`);(disc?.closest('.v23-wheel-stage')||disc)?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'center'});},160);
  }
  function bindEvents() {
    document.addEventListener('click', event => {
      const target=event.target instanceof Element?event.target:null;if(!target)return;
      const center=target.closest('[data-v23-center-spin]');
      if(center){event.preventDefault();event.stopImmediatePropagation();spin(center.dataset.v23CenterSpin);return;}
      const spinButton=target.closest('[data-spin-wheel]');
      if(spinButton){event.preventDefault();event.stopImmediatePropagation();spin(spinButton.dataset.spinWheel);return;}
      const reset=target.closest('[data-wheel-reset]');
      if(reset){event.preventDefault();event.stopImmediatePropagation();resetWheel(reset.dataset.wheelReset);return;}
      const retry=target.closest('[data-v23Retry]');
      if(retry){event.preventDefault();event.stopImmediatePropagation();spin(retry.dataset.v23Retry);return;}
      const skip=target.closest('[data-v23Skip]');
      if(skip){event.preventDefault();const kind=skip.dataset.v23Skip;resetWheel(kind);const host=$(resultSelectors[kind]);if(host)host.textContent='Prompt skip kar diya. Jab mann ho phir spin karo.';return;}
      const targetWheel=target.closest('[data-v23-target-wheel]');
      if(targetWheel){event.preventDefault();event.stopImmediatePropagation();goToWheel(targetWheel.dataset.v23TargetWheel,targetWheel.dataset.v23Category);return;}
      if(target.closest('[data-v23-open-threesome-nav],[data-v23-open-threesome]')){event.preventDefault();event.stopImmediatePropagation();openThreesome();return;}
      if(target.closest('[data-v23-confirm-age]')){const check=$('#v23AgeCheck');if(!check?.checked){$('#v23AgeError').textContent='Continue karne se pehle age confirmation check karo.';check?.focus();return;}unlockThreesome();return;}
      if(target.closest('[data-v23-cancel-age]')){hideGate();$('#v23ThreesomeSection button[data-v23-open-threesome]')?.focus();return;}
      if(target.closest('[data-v23-leave-threesome]')){const content=$('#v23ThreesomeProtected');if(content)content.hidden=true;try{sessionStorage.removeItem('blackedV2ThreesomeGate');}catch{}state.gateAccepted=false;$('#v23ThreesomeSection')?.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});$('#v23ThreesomeSection button[data-v23-open-threesome]')?.focus();return;}
    }, true);
    $('#wildCategory')?.addEventListener('change',()=>refreshWheel('wild'));
    $('#wildCategory')?.addEventListener('change',()=>{if(wheels.wild?.busy)resetWheel('wild');});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#v23ThreesomeGate')?.hidden){hideGate();$('#v23ThreesomeSection button[data-v23-open-threesome]')?.focus();}});
  }
  function diagnostics() {
    const wheelState={};
    Object.entries(wheels).forEach(([kind,w])=>{
      const idx=$(resultSelectors[kind])?.dataset.v23SelectedIndex;
      const selected=idx===undefined?null:Number(idx);
      const angle=((w.rotation%360)+360)%360;
      const alignment=selected===null?null:Math.min(Math.abs(((selected*45+22.5+angle)%360)),360-Math.abs(((selected*45+22.5+angle)%360)));
      wheelState[kind]={segments:w.layer.querySelectorAll('.v23-wheel-label').length,labels:[...w.layer.querySelectorAll('.v23-wheel-label')].map(x=>x.textContent),selectedIndex:selected,selectedLabel:$(resultSelectors[kind])?.dataset.v23SelectedLabel||null,rotationDegrees:w.rotation,alignmentErrorDegrees:alignment,busy:w.busy};
    });
    const images=$$('[data-v23-asset]');
    return {version:state.version,addonLoaded:true,views:$$('.view').map(v=>({id:v.id,view:v.dataset.view})),wheels:wheelState,wheelHub:!!$('#v23WheelHub'),wheelPosterCards:$('#v23WheelHub')?.querySelectorAll('.v23-poster-card').length||0,boyfriendGalleryCards:$('#v23BoyfriendGallery')?.querySelectorAll('.v23-reference-card').length||0,coupleEditorialCards:$('#v24CoupleEditorials')?.querySelectorAll('.v24-image-card').length||0,threesomeSection:!!$('#v23ThreesomeSection'),threesomeGalleryCards:$('#v24ThreesomeEditorials')?.querySelectorAll('.v24-image-card').length||0,threesomeGateVisible:!!$('#v23ThreesomeGate')&&!$('#v23ThreesomeGate').hidden,sanskariLocalCards:$('#v23SanskariLocalGallery')?.querySelectorAll('.v23-local-image-card').length||0,innerwearCampaign:!!$('#v23InnerwearCampaign'),phase4InnerwearCards:$('#v24CampaignGrid')?.querySelectorAll('.v24-image-card').length||0,phase4Assets:[...new Set($$('[data-v24-asset]').map(img=>img.dataset.v24Asset))],localAssets:images.map(img=>({path:img.dataset.v23Asset,loaded:img.complete&&img.naturalWidth>0,naturalWidth:img.naturalWidth})),spinCount:state.spinCount,errors:[...state.errors]};
  }
  function boot() {
    try {
      ['boy','dildo','plug','wild'].forEach(buildWheel);
      addWheelHub();addInnerwearCampaign();addSanskariGallery();addBoyfriendGallery();addThreesomeSection();addPhase4InnerwearCollection();addPhase4CoupleEditorials();addPhase4ThreesomeEditorials();addNavLinks();bindEvents();
      window.BLACKED_V2_P23={getDiagnostics:diagnostics,getState:()=>({...state}),spin,resetWheel,refreshWheel,openThreesome};
      document.documentElement.dataset.v2p23='loaded';
    } catch(error) { state.errors.push(String(error)); console.error('[V2 Phase 4 integration]',error); }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
