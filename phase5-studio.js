/* BLACKED V3 Phase 5 — one deferred JS request with embedded CSS. */
(() => {
  'use strict';
  if (document.documentElement.dataset.blackedPhase5StudioStyles === 'ready') return;
  const css = "/* BLACKED V3 Phase 5 — on-demand adult fictional prompts, no remote media. */\n.p5-studio-launch{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:14px;min-height:44px;width:100%;padding:11px 14px;border:1px solid #875671;border-radius:12px;background:linear-gradient(105deg,#39223a,#211620);color:#ffe7f0;font-size:12px;font-weight:800;cursor:pointer}\n.p5-experience{--p5-pink:#f4a0c1;--p5-gold:#eacb8c;position:relative;margin:24px 0 36px;border:1px solid #62465b;border-radius:23px;overflow:hidden;background:radial-gradient(ellipse at 96% 0,#48213d 0,transparent 42%),linear-gradient(145deg,#1d151f,#100d12 76%);color:#fff5fa;box-shadow:0 14px 38px #0003}\n.p5-experience *{box-sizing:border-box}.p5-experience__head{padding:22px 22px 18px;border-bottom:1px solid #392838}.p5-experience__eyebrow{margin:0 0 8px;color:var(--p5-gold);font-size:10px;font-weight:850;letter-spacing:.16em;text-transform:uppercase}.p5-experience__head h2{font-size:clamp(24px,4vw,34px);line-height:1.08;letter-spacing:-.035em;margin:0}.p5-experience__head h2 em{font-family:Georgia,serif;font-weight:500;color:#ffc1d8}.p5-experience__intro{max-width:700px;color:#ccbdcb;font-size:13px;line-height:1.6;margin:10px 0 0}.p5-experience__badges{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px}.p5-experience__badges span{border:1px solid #4b394a;border-radius:999px;padding:5px 9px;font-size:10px;color:#ecdde8}\n.p5-experience__age{display:flex;gap:10px;align-items:flex-start;padding:13px 16px;background:#221824;border-bottom:1px solid #453145;font-size:12px}.p5-experience__age input{margin:3px 0 0;accent-color:#f4a0c1;flex:none}.p5-experience__age small{display:block;color:#bdafbf;font-size:10px;line-height:1.5;margin-top:3px}\n.p5-experience__body{padding:17px 18px 20px}.p5-experience__wheel-panel{display:grid;grid-template-columns:minmax(170px,.75fr) minmax(0,1.25fr);gap:20px;align-items:center;border:1px solid #50384d;border-radius:18px;padding:17px;background:linear-gradient(125deg,#221823,#151018)}.p5-experience__wheel-wrap{display:grid;place-items:center;gap:10px}.p5-experience__wheel{--p5-spin:0deg;position:relative;width:min(100%,260px);aspect-ratio:1;border-radius:50%;border:6px solid #6b4b63;box-shadow:0 0 0 4px #1a111b,0 12px 24px #0005;background:conic-gradient(#f3bed3 0 45deg,#46243d 45deg 90deg,#e3c78e 90deg 135deg,#5c344f 135deg 180deg,#f3bed3 180deg 225deg,#46243d 225deg 270deg,#e3c78e 270deg 315deg,#5c344f 315deg 360deg);transform:rotate(var(--p5-spin));transition:transform 1.65s cubic-bezier(.12,.72,.08,1)}.p5-experience__wheel:before{position:absolute;content:'▼';left:50%;top:-18px;transform:translateX(-50%);font-size:24px;color:#fff5fa;text-shadow:0 2px 6px #000;z-index:2}.p5-experience__wheel:after{content:'SPIN';position:absolute;inset:50% auto auto 50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:76px;height:76px;border:3px solid #f6d3e0;border-radius:50%;background:#170f18;color:#ffdbea;font-size:13px;font-weight:900;letter-spacing:.12em;box-shadow:0 3px 14px #0009}.p5-experience__wheel-caption{font-size:10px;color:#bfafbd;text-align:center}.p5-experience__controls{display:grid;gap:11px;min-width:0}.p5-experience__controls h3{margin:0 0 4px;font-size:20px;line-height:1.15}.p5-experience__hint{margin:0;color:#bfb0be;font-size:12px;line-height:1.5}.p5-experience__field{display:grid;gap:6px;color:#eee0eb;font-size:11px;font-weight:700}.p5-experience__field select{width:100%;min-height:43px;border:1px solid #594357;border-radius:10px;padding:9px 11px;background:#100d12;color:#fff5fa;font:inherit;font-weight:450}\n.p5-experience__btn{min-height:43px;padding:10px 13px;border:1px solid #63465b;border-radius:11px;background:#271b28;color:#fff5fa;font-size:12px;font-weight:800;cursor:pointer}.p5-experience__btn--primary{border-color:#f4a0c1;background:#f4a0c1;color:#20121a}.p5-experience__btn:focus-visible,.p5-studio-launch:focus-visible,.p5-experience select:focus-visible{outline:3px solid #ffd1e1;outline-offset:3px}.p5-experience__result{min-height:69px;padding:13px;border:1px solid #5f4258;border-radius:12px;background:#110d13;color:#f5e3ee;font-size:13px;line-height:1.65;overflow-wrap:anywhere}.p5-experience__result b{display:block;color:#ffc1d8;font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}.p5-experience__result[hidden]{display:none!important}.p5-experience__tools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:13px}.p5-experience__card{min-width:0;border:1px solid #493448;border-radius:17px;padding:16px;background:linear-gradient(145deg,#211722,#151018)}.p5-experience__card h3{font-size:19px;line-height:1.15;margin:0 0 6px}.p5-experience__card>p{font-size:12px;color:#c3b3c1;line-height:1.55;margin:0 0 12px}.p5-experience__card .p5-experience__field{margin-top:11px}.p5-experience__card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.p5-experience__card-actions .p5-experience__btn{flex:1}.p5-experience__visual-preview{position:relative;display:grid;align-content:end;min-height:130px;overflow:hidden;margin-top:12px;padding:14px;border:1px solid #76546b;border-radius:13px;background:radial-gradient(circle at 72% 17%,#d9a16e60,transparent 30%),linear-gradient(145deg,#332134,#17121a 66%,#151c2d);isolation:isolate}.p5-experience__visual-preview:before{position:absolute;inset:0;content:'';z-index:-1;background:linear-gradient(0deg,#100c12ed 0%,transparent 85%)}.p5-experience__visual-preview[data-light=\"blue\"]{background:radial-gradient(circle at 72% 17%,#7194d480,transparent 34%),linear-gradient(145deg,#1c273c,#17121a 72%)}.p5-experience__visual-preview[data-light=\"rose\"]{background:radial-gradient(circle at 72% 17%,#ed83c380,transparent 36%),linear-gradient(145deg,#42223f,#17121a 72%)}.p5-experience__visual-preview[data-light=\"daylight\"]{background:radial-gradient(circle at 72% 17%,#f1d9a280,transparent 36%),linear-gradient(145deg,#4b3b35,#1c1720 72%)}.p5-experience__visual-preview b{font:500 19px/1.12 Georgia,serif;color:#ffe5f0}.p5-experience__visual-preview small{margin-top:6px;color:#cfbfcc;font-size:10px;line-height:1.5}.p5-experience__status{margin:12px 0 0;color:#d5c4d2;font-size:11px;line-height:1.5;min-height:18px}.p5-experience__fineprint{margin:10px 0 0;color:#a99aa7;font-size:10px;line-height:1.6}.p5-experience[hidden]{display:none!important}\n@media(max-width:650px){.p5-experience{border-radius:20px;margin:22px 0 30px}.p5-experience__head{padding:18px 16px 15px}.p5-experience__age{padding:12px 15px}.p5-experience__body{padding:13px 12px 16px}.p5-experience__wheel-panel{grid-template-columns:1fr;gap:14px;padding:13px}.p5-experience__wheel{width:min(67vw,238px)}.p5-experience__controls{gap:9px}.p5-experience__tools{grid-template-columns:1fr}.p5-experience__card{padding:14px}.p5-experience__visual-preview{min-height:116px}}\n@media(prefers-reduced-motion:reduce){.p5-experience__wheel{transition:none!important}}\n";
  const style = document.createElement('style');
  style.id = 'blacked-phase5-studio-styles';
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.dataset.blackedPhase5StudioStyles = 'ready';
})();

/* BLACKED V3 Phase 5 — Fantasy Wheel, Desi Dirty Talk, Visual Attraction; all on-device. */
(() => {
  'use strict';
  if (window.BLACKED_V5_STUDIO) return;
  const PREF_KEY = 'blackedV5FantasyPreferences';
  const defaults = {language:'hinglish',tone:'teasing',mildGaali:false,visualMood:'cinematic',visualLight:'amber',visualWardrobe:'black-satin',visualPace:'slow'};
  const state = {...defaults,rotation:0,spinCount:0,dirtyCount:0,visualCount:0,built:false,lastWheelId:null};
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => [...root.querySelectorAll(s)];
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wheelPrompts = [
    {id:'tease',label:'Playful tease',lines:{en:'Take turns giving one playful compliment. Each person can pass without explaining.',hi:'बारी-बारी से एक प्यारी-सी तारीफ़ करो। कोई भी बिना वजह बताए पास कर सकता है।',hinglish:'Turn by turn ek playful compliment do. Pass karna ho toh no explanation needed.'}},
    {id:'date',label:'Date-night spark',lines:{en:'Plan a tiny date-night surprise together; each person gets veto power.',hi:'मिलकर एक छोटा date-night surprise सोचो—दोनों को मना करने का पूरा हक है।',hinglish:'Saath milkar ek mini date-night surprise plan karo—dono ka veto allowed.'}},
    {id:'confession',label:'Sweet confession',lines:{en:'Share one thing you find charming about the other adult, then invite a reply.',hi:'दूसरे वयस्क की एक प्यारी आदत बताओ, फिर उनकी बात सुनो।',hinglish:'Ek cheez batao jo unki charming lagti hai, phir unka answer bhi suno.'}},
    {id:'question',label:'Curious question',lines:{en:'Ask one curious, respectful question about a fictional crush or favourite date vibe.',hi:'किसी काल्पनिक crush या favourite date vibe के बारे में एक सम्मानजनक सवाल पूछो।',hinglish:'Fictional crush ya favourite date-vibe par ek respectful question poochho.'}},
    {id:'roleplay',label:'Fictional role-play',lines:{en:'Start a short, non-graphic scene with two consenting adult characters who set their own boundaries.',hi:'दो सहमत वयस्क काल्पनिक किरदारों का छोटा, गैर-ग्राफ़िक scene शुरू करो; सीमाएँ वे खुद तय करें।',hinglish:'Do consenting adult fictional characters ka short, non-graphic scene start karo—boundaries woh khud set karein.'}},
    {id:'confidence',label:'Confidence boost',lines:{en:'Each adult names one quality they appreciate in themself and one in the other.',hi:'दोनों वयस्क अपनी एक और दूसरे की एक अच्छी quality बताएँ।',hinglish:'Dono apni ek aur saamne wale ki ek achhi quality share karein.'}},
    {id:'slowburn',label:'Slow-burn scene',lines:{en:'Set a cinematic, slow-burn moment using warm light, music and dialogue—not explicit action.',hi:'गर्म रोशनी, संगीत और संवाद से slow-burn cinematic पल बनाओ—explicit action नहीं।',hinglish:'Warm lights, music aur dialogue se slow-burn cinematic moment banao—explicit action nahi.'}},
    {id:'boundary',label:'Boundary check-in',lines:{en:'Name one yes, one maybe and one no for a fictional date scenario. Respect every answer.',hi:'काल्पनिक date के लिए एक हाँ, एक शायद और एक ना बताओ। हर जवाब का सम्मान करो।',hinglish:'Fictional date ke liye ek yes, ek maybe aur ek no batao. Har answer respected ho.'}}
  ];
  const dirtyLines = {
    en: {
      teasing:['That confident smile is distracting—in the best way.','One more playful line and you owe me an honest compliment.','Let’s keep the teasing mutual, the chemistry fictional, and the “pass” button easy.','Tell me the line you would use in a rom-com; I’ll rate the charm, not the person.','Your turn: one bold question, and either of us can skip.'],
      bold:['I like confident banter—especially when both of us choose the pace.','Be brave enough to flirt, and thoughtful enough to ask first.','A little mystery, a real compliment, and no pressure: your move.','Let’s write the scene together; nobody has to follow a script.'],
      romantic:['I could listen to your favourite story for one more hour.','The best spark is the one we both feel free to choose.','Tell me what makes a date feel special to you.','Your comfort looks good on you—keep your boundaries.']
    },
    hi: {
      teasing:['तुम्हारी आत्मविश्वास भरी मुस्कान ध्यान भटका देती है—अच्छे तरीके से।','एक और शरारती लाइन, फिर एक सच्ची तारीफ़ तुम्हारी तरफ़ से।','मज़ाक दोनों की मर्ज़ी से, और “पास” कहना हमेशा आसान।','तुम्हारा जवाबी डायलॉग क्या होगा—सिर्फ़ charm की rating होगी, इंसान की नहीं।','एक बेबाक सवाल पूछो; दोनों में से कोई भी पास कर सकता है।'],
      bold:['मुझे बेबाक बातचीत पसंद है—जब गति दोनों की मर्ज़ी से तय हो।','फ़्लर्ट करने का हौसला रखो, और पहले पूछने की समझ भी।','थोड़ा रहस्य, एक सच्ची तारीफ़, और कोई दबाव नहीं—अब तुम्हारी बारी।','सीन हम साथ लिखेंगे; किसी को स्क्रिप्ट मानना ज़रूरी नहीं।'],
      romantic:['तुम्हारी पसंदीदा कहानी एक घंटा और सुन सकता हूँ।','सबसे अच्छी chemistry वही है जिसे दोनों चुनें।','बताओ, तुम्हारे लिए date को खास क्या बनाता है?','अपनी सहजता और सीमाएँ बनाए रखना भी आकर्षक है।']
    },
    hinglish: {
      teasing:['Tumhari confident smile kaafi distracting hai—in a good way.','Ek aur playful line, phir tumhari taraf se ek genuine compliment.','Teasing mutual ho, aur “skip” bolna hamesha easy rahe.','Rom-com wala reply do; rating charm ki hogi, kisi insaan ki nahi.','Ek bold question tumhara—dono mein se koi bhi pass kar sakta hai.'],
      bold:['Mujhe confident banter pasand hai—jab pace dono milkar choose karein.','Flirt karne ka confidence rakho, aur pehle poochhne ki sense bhi.','Thoda mystery, ek real compliment, aur zero pressure—your move.','Scene hum dono milkar likhenge; kisi ko script follow karna zaroori nahi.'],
      romantic:['Tumhari favourite story ek ghanta aur sun sakta hoon.','Best spark woh hai jo dono freely choose karein.','Batao, date ko tumhare liye special kya banata hai?','Apni comfort aur boundaries rakhna bhi attractive hai.']
    }
  };
  const mildBits = {
    en:['You little troublemaker—keep the banter mutual.','Cheeky menace, one genuine compliment now.'],
    hi:['अरे नटखट, अब एक सच्ची तारीफ़ भी कर दो।','शरारती इंसान, पहले पूछो—मज़ाक दोनों को पसंद हो।'],
    hinglish:['Oye badmaash, ab ek genuine compliment bhi do.','Arey pagal, teasing tabhi jab dono comfortable hon.','Saale, itni flirt wali confidence kahaan se laate ho? (Only if both like this slang.)']
  };
  const languageLabel = {en:'English',hi:'हिन्दी',hinglish:'Hinglish'};
  const moods = {cinematic:'Cinematic slow-burn',playful:'Playful chemistry',mystery:'Midnight mystery',romantic:'Soft romantic atmosphere'};
  const lighting = {amber:'warm amber light',blue:'midnight-blue lighting',rose:'soft rose-neon glow',daylight:'golden morning daylight'};
  const wardrobe = {'black-satin':'black satin editorial styling','saree-inspired':'elegant saree-inspired draping','relaxed-knit':'relaxed knit and tailored layers','formal':'polished eveningwear'};
  const pacing = {slow:'slow, atmospheric pacing',confident:'confident, cinematic pacing',playful:'playful, quick dialogue'};
  function loadPrefs(){
    try { const saved=JSON.parse(localStorage.getItem(PREF_KEY)||'{}'); Object.keys(defaults).forEach(k=>{ if(typeof saved[k]===typeof defaults[k])state[k]=saved[k]; }); } catch(_){}
    if(!['en','hi','hinglish'].includes(state.language))state.language=defaults.language;
    if(!dirtyLines[state.language])state.language='hinglish';
    if(!dirtyLines[state.language][state.tone])state.tone=defaults.tone;
    if(!lighting[state.visualLight])state.visualLight=defaults.visualLight;
    if(!moods[state.visualMood])state.visualMood=defaults.visualMood;
    if(!wardrobe[state.visualWardrobe])state.visualWardrobe=defaults.visualWardrobe;
    if(!pacing[state.visualPace])state.visualPace=defaults.visualPace;
  }
  function savePrefs(){try{const p={};Object.keys(defaults).forEach(k=>p[k]=state[k]);localStorage.setItem(PREF_KEY,JSON.stringify(p));}catch(_){}}
  function html(){return `<section class="p5-experience" id="p5FantasyStudio" aria-labelledby="p5FantasyStudioTitle">
    <header class="p5-experience__head"><p class="p5-experience__eyebrow">PHASE 5 · AFTER-DARK STUDIO · 18+</p><h2 id="p5FantasyStudioTitle">Fantasy Wheel, <em>words & atmosphere.</em></h2><p class="p5-experience__intro">Three private, interactive tools for adult fictional scenes: a fantasy prompt wheel, playful Desi dialogue, and a non-graphic visual mood generator. No real person’s desire is assumed.</p><div class="p5-experience__badges"><span>✓ Adult fiction only</span><span>✓ Device-only generation</span><span>✓ Skip any prompt</span></div></header>
    <label class="p5-experience__age"><input type="checkbox" id="p5AdultConfirm"><span><b>I confirm I am 18 or older.</b><small>Required for all Phase 5 generators. This is self-attestation, not formal age verification.</small></span></label>
    <div class="p5-experience__body">
      <section class="p5-experience__wheel-panel" aria-labelledby="p5WheelTitle"><div class="p5-experience__wheel-wrap"><div class="p5-experience__wheel" id="p5WheelDisc" role="img" aria-label="Decorative eight-segment fantasy prompt wheel"></div><small class="p5-experience__wheel-caption">8 optional prompts · nothing is compulsory</small></div><div class="p5-experience__controls"><div><p class="p5-experience__eyebrow">01 · FANTASY WHEEL</p><h3 id="p5WheelTitle">Spin your fictional vibe</h3><p class="p5-experience__hint">The result is a conversation/story seed, never a prediction about a real partner. Any result can be skipped.</p></div><label class="p5-experience__field">Output language<select id="p5WheelLanguage"><option value="hinglish">Hindi + Hinglish</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label><button type="button" class="p5-experience__btn p5-experience__btn--primary" id="p5SpinFantasy">✦ Spin Super Horny Fantasy Wheel</button><div class="p5-experience__result" id="p5WheelResult" role="status" aria-live="polite">Your optional fantasy prompt will appear here. Confirm 18+ and spin to begin.</div></div></section>
      <div class="p5-experience__tools">
        <section class="p5-experience__card" aria-labelledby="p5DirtyTitle"><p class="p5-experience__eyebrow">02 · DESI DIRTY TALK</p><h3 id="p5DirtyTitle">Generate a cheeky line</h3><p>Adult-only flirting, bold banter and optional mild Desi slang. No slurs, threats or pressure.</p><label class="p5-experience__field">Language<select id="p5DirtyLanguage"><option value="hinglish">Hindi + Hinglish</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label><label class="p5-experience__field">Dialogue style<select id="p5DirtyTone"><option value="teasing">Teasing</option><option value="bold">Bold & confident</option><option value="romantic">Romantic</option></select></label><label class="p5-experience__age"><input type="checkbox" id="p5MildGaali"><span><b>Mild Desi slang mode</b><small>Off by default. Use only if everyone involved is comfortable with that style.</small></span></label><div class="p5-experience__card-actions"><button class="p5-experience__btn p5-experience__btn--primary" id="p5GenerateDirtyTalk" type="button">Generate line</button><button class="p5-experience__btn" id="p5CopyDirty" type="button">Copy line</button></div><div class="p5-experience__result" id="p5DirtyOutput" role="status" aria-live="polite">A new line will appear here.</div></section>
        <section class="p5-experience__card" aria-labelledby="p5VisualTitle"><p class="p5-experience__eyebrow">03 · VISUAL ATTRACTION MODE</p><h3 id="p5VisualTitle">Build a cinematic mood</h3><p>Suggestive, fully clothed editorial atmosphere—not explicit imagery or a real-person likeness.</p><label class="p5-experience__field">Mood<select id="p5VisualMood"><option value="cinematic">Cinematic slow-burn</option><option value="playful">Playful chemistry</option><option value="mystery">Midnight mystery</option><option value="romantic">Soft romantic atmosphere</option></select></label><label class="p5-experience__field">Lighting<select id="p5VisualLight"><option value="amber">Warm amber</option><option value="blue">Midnight blue</option><option value="rose">Rose neon</option><option value="daylight">Golden daylight</option></select></label><label class="p5-experience__field">Wardrobe reference<select id="p5VisualWardrobe"><option value="black-satin">Black satin editorial</option><option value="saree-inspired">Saree-inspired draping</option><option value="relaxed-knit">Relaxed knit layers</option><option value="formal">Eveningwear</option></select></label><label class="p5-experience__field">Pacing<select id="p5VisualPace"><option value="slow">Slow-burn</option><option value="confident">Confident & cinematic</option><option value="playful">Playful dialogue</option></select></label><div class="p5-experience__visual-preview" id="p5VisualPreview" data-light="amber"><b id="p5VisualPreviewTitle">A moment in soft focus</b><small id="p5VisualPreviewMeta">Warm light · editorial styling · adult fiction</small></div><div class="p5-experience__card-actions"><button class="p5-experience__btn p5-experience__btn--primary" id="p5GenerateVisual" type="button">Generate visual prompt</button><button class="p5-experience__btn" id="p5CopyVisual" type="button">Copy prompt</button></div><div class="p5-experience__result" id="p5VisualOutput" role="status" aria-live="polite">Your non-graphic visual prompt appears here.</div></section>
      </div><p class="p5-experience__status" id="p5StudioStatus" role="status" aria-live="polite">Nothing is generated until you press a button. Preferences are saved only in this browser.</p><p class="p5-experience__fineprint">Every character in generated fiction must be an adult. Keep content non-graphic; no real-person desire, body size or consent is inferred. These outputs are optional writing prompts, not real-life instructions. No content is published or sent to a server.</p>
    </div></section>`;}
  function setStatus(message){const n=$('#p5StudioStatus');if(n)n.textContent=message;}
  function allowed(){const check=$('#p5AdultConfirm');if(!check?.checked){setStatus('Please confirm 18+ before using the Phase 5 generators.');check?.focus();return false;}return true;}
  function insertLaunch(){
    const mode=$('#v3-randi-mode');if(!mode||$('#p5StudioLaunch'))return;
    const btn=document.createElement('button');btn.type='button';btn.id='p5StudioLaunch';btn.className='p5-studio-launch';btn.textContent='Open Fantasy + Dirty Talk Studio →';btn.setAttribute('aria-label','Open Phase 5 Fantasy Wheel, Desi Dirty Talk and Visual Attraction');
    const anchor=$('.v3-randi-mode__disclaimer',mode)||mode.lastElementChild;anchor?.insertAdjacentElement('afterend',btn);
  }
  function buildStudio(){
    const view=$('#view-boyfriend');if(!view||$('#p5FantasyStudio'))return;
    const section=document.createElement('div');section.innerHTML=html();const node=section.firstElementChild;if(!node)return;
    const existing=$('#v6BoyfriendStudio',view);const intro=$('.page-intro',view);
    if(existing)existing.insertAdjacentElement('afterend',node);else if(intro)intro.insertAdjacentElement('afterend',node);else view.prepend(node);
    state.built=true;syncControls();updateVisualPreview();
  }
  function syncControls(){
    const mapping={p5WheelLanguage:'language',p5DirtyLanguage:'language',p5DirtyTone:'tone',p5VisualMood:'visualMood',p5VisualLight:'visualLight',p5VisualWardrobe:'visualWardrobe',p5VisualPace:'visualPace'};
    Object.entries(mapping).forEach(([id,key])=>{const el=$('#'+id);if(el)el.value=state[key];});
    const slang=$('#p5MildGaali');if(slang)slang.checked=state.mildGaali;
  }
  function language(){return $('#p5WheelLanguage')?.value||state.language;}
  function outputWheel(item){const lang=language();const target=$('#p5WheelResult');if(!target)return;target.replaceChildren();const title=document.createElement('b');title.textContent=item.label;const text=document.createElement('span');text.textContent=item.lines[lang]||item.lines.hinglish;target.append(title,text);state.lastWheelId=item.id;}
  function spinWheel(){
    if(!allowed())return;
    const idx=Math.floor(Math.random()*wheelPrompts.length);const item=wheelPrompts[idx];const wheel=$('#p5WheelDisc');if(!wheel)return;
    const n=wheelPrompts.length,center=idx*(360/n)+(360/n/2);const current=state.rotation;const remainder=((360-center-(current%360))%360+360)%360;state.rotation=current+1440+remainder;state.spinCount++;
    wheel.style.setProperty('--p5-spin',`${state.rotation}deg`);wheel.setAttribute('aria-label',`Fantasy wheel spinning for result ${idx+1} of ${n}`);
    const delay=reduceMotion()?30:1740;window.setTimeout(()=>{outputWheel(item);wheel.setAttribute('aria-label',`Fantasy wheel result: ${item.label}`);setStatus('Fantasy Wheel result generated on this device. Skip or spin again whenever you like.');},delay);
  }
  function choose(list){return list[Math.floor(Math.random()*list.length)];}
  function generateDirty(){
    if(!allowed())return;
    const lang=$('#p5DirtyLanguage')?.value||state.language,tone=$('#p5DirtyTone')?.value||state.tone,include=$('#p5MildGaali')?.checked||false;
    const line=choose(dirtyLines[lang][tone]);const withSlang=include?`${line} ${choose(mildBits[lang])}`:line;
    $('#p5DirtyOutput').textContent=withSlang;state.dirtyCount++;state.language=lang;state.tone=tone;state.mildGaali=include;savePrefs();setStatus(`Desi dialogue generated in ${languageLabel[lang]}. Mild slang ${include?'on':'off'}.`);
  }
  function visualPrompt(){
    const lang=$('#p5DirtyLanguage')?.value||state.language; // shared language selector keeps settings consistent
    const md=$('#p5VisualMood')?.value||state.visualMood,light=$('#p5VisualLight')?.value||state.visualLight,ward=$('#p5VisualWardrobe')?.value||state.visualWardrobe,pace=$('#p5VisualPace')?.value||state.visualPace;
    const en=`Non-graphic adult-fiction visual concept: two consenting adult characters in ${wardrobe[ward]}, lit with ${lighting[light]}. Mood: ${moods[md]}; ${pacing[pace]}. Use expressive faces, tasteful fabric detail, hands resting on a glass or draped fabric, soft background bokeh and a premium editorial frame. Keep everyone fully clothed; no nudity, explicit sexual activity or real-person likeness. Everyone can pause or opt out.`;
    const hi=`गैर-ग्राफ़िक वयस्क-काल्पनिक दृश्य: ${wardrobe[ward]}, ${lighting[light]} और ${moods[md]} का माहौल। गति: ${pacing[pace]}। चेहरे के भाव, कपड़े की बनावट, हाथों का सामान्य gesture, soft background bokeh और premium editorial framing रखें। सभी किरदार वयस्क और पूरी तरह कपड़ों में हों; नग्नता, explicit activity या किसी वास्तविक व्यक्ति की likeness नहीं। कोई भी कभी भी रुक सकता है।`;
    const hinglish=`Non-graphic adult-fiction visual scene: ${wardrobe[ward]}, ${lighting[light]}, mood ${moods[md]}, pace ${pacing[pace]}. Expressive faces, tasteful fabric detail, glass ya drape ke paas natural hand gestures, soft background bokeh aur premium editorial framing. Sab characters adults aur fully clothed hon—no nudity, explicit activity ya real-person likeness. Koi bhi pause ya opt out kar sakta hai.`;
    return lang==='hi'?hi:lang==='en'?en:hinglish;
  }
  function updateVisualPreview(){
    const prev=$('#p5VisualPreview');if(!prev)return;
    prev.dataset.light=state.visualLight;
    const title=$('#p5VisualPreviewTitle');if(title)title.textContent=moods[state.visualMood];
    const meta=$('#p5VisualPreviewMeta');if(meta)meta.textContent=`${lighting[state.visualLight]} · ${wardrobe[state.visualWardrobe]} · ${pacing[state.visualPace]}`;
  }
  function generateVisual(){
    if(!allowed())return;
    state.visualMood=$('#p5VisualMood')?.value||defaults.visualMood;state.visualLight=$('#p5VisualLight')?.value||defaults.visualLight;state.visualWardrobe=$('#p5VisualWardrobe')?.value||defaults.visualWardrobe;state.visualPace=$('#p5VisualPace')?.value||defaults.visualPace;
    $('#p5VisualOutput').textContent=visualPrompt();state.visualCount++;savePrefs();updateVisualPreview();setStatus('Non-graphic visual prompt created locally. No image was uploaded or requested.');
  }
  async function copyText(id){const node=$('#'+id);const text=node?.textContent?.trim();if(!text){setStatus('Generate a line/prompt first, then copy it.');return;}try{await navigator.clipboard.writeText(text);setStatus('Copied to clipboard.');}catch(_){try{const range=document.createRange();range.selectNodeContents(node);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);setStatus('Clipboard was blocked; text selected for manual copy.');}catch(__){setStatus('Copy permission unavailable in this browser. Select the text and copy manually.');}}}
  function onClick(event){
    const target=event.target instanceof Element?event.target:null;if(!target)return;
    if(target.closest('#p5StudioLaunch')){const nav=$('#mainNav [data-view-link="boyfriend"]');if(nav)nav.click();window.setTimeout(()=>{$('#p5FantasyStudio')?.scrollIntoView({behavior:reduceMotion()?'auto':'smooth',block:'start'});},280);return;}
    if(target.closest('#p5SpinFantasy')){spinWheel();return;}
    if(target.closest('#p5GenerateDirtyTalk')){generateDirty();return;}
    if(target.closest('#p5GenerateVisual')){generateVisual();return;}
    if(target.closest('#p5CopyDirty')){copyText('p5DirtyOutput');return;}
    if(target.closest('#p5CopyVisual')){copyText('p5VisualOutput');return;}
  }
  function onChange(event){
    const el=event.target;if(!(el instanceof HTMLSelectElement)&&!(el instanceof HTMLInputElement))return;
    const keys={p5WheelLanguage:'language',p5DirtyLanguage:'language',p5DirtyTone:'tone',p5VisualMood:'visualMood',p5VisualLight:'visualLight',p5VisualWardrobe:'visualWardrobe',p5VisualPace:'visualPace'};
    if(el.id==='p5MildGaali'){state.mildGaali=el.checked;savePrefs();setStatus(`Mild Desi slang ${state.mildGaali?'on':'off'}.`);return;}
    const key=keys[el.id];if(!key)return;state[key]=el.value;savePrefs();if(key.startsWith('visual'))updateVisualPreview();
  }
  function boot(){
    loadPrefs();insertLaunch();
    const view=$('#view-boyfriend');if(view){
      const observer=new MutationObserver(()=>{if(!view.hidden&&view.classList.contains('active'))buildStudio();});
      observer.observe(view,{attributes:true,attributeFilter:['hidden','class']});
      document.addEventListener('click',event=>{const target=event.target instanceof Element?event.target:null;if(target?.closest('[data-view-link="boyfriend"]'))window.setTimeout(()=>{if(!view.hidden&&view.classList.contains('active'))buildStudio();},80);});
    }
    document.addEventListener('click',onClick);document.addEventListener('change',onChange);
    window.BLACKED_V5_STUDIO={version:'5.0.0',getDiagnostics:()=>({loaded:true,built:!!$('#p5FantasyStudio'),wheel:!!$('#p5WheelDisc'),dirtyTalk:!!$('#p5GenerateDirtyTalk'),visualAttraction:!!$('#p5GenerateVisual'),adultGate:!!$('#p5AdultConfirm'),wheelSpins:state.spinCount,dirtyGenerations:state.dirtyCount,visualGenerations:state.visualCount,localOnly:true,errors:[]}),buildStudio};
    document.documentElement.dataset.blackedPhase5='ready';
    if(view&&!view.hidden&&view.classList.contains('active'))buildStudio();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
