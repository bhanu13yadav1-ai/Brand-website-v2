(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE = {
    wishlist: 'blackedV1Wishlist',
    bag: 'blackedV1Bag',
    fitNotes: 'blackedV1FitNotes',
    adult: 'blackedV1AdultConfirmed'
  };
  const RAW4 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-4f/main/';
  const RAW3 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-3/main/';
  const state = {
    view: 'home', pendingView: null, adultAllowed: false,
    wishlist: new Set(), bag: [], lastWheelChoice: {}, wheelTokens: {}, wheelTimers: {},
    currentPhotoUrl: null, currentMessage: '',
    diagnostic: { imageFallbacks: 0, wheelSpins: 0, errors: [] }
  };

  const products = [
    { id:'midnight-lace', name:'Midnight Lace', category:'lace', categoryLabel:'Lace concept', price:799, image:RAW4+'look-black-lace.webp', detailImage:RAW4+'product-lace-bra.webp', tag:'LACE EDIT', desc:'A black-lace styling reference. Fabric, fit, sizes and stock are not confirmed.' },
    { id:'everyday-comfort', name:'Everyday Comfort', category:'everyday', categoryLabel:'Everyday concept', price:649, image:RAW4+'product-everyday-bra.webp', detailImage:RAW4+'model-innerwear.webp', tag:'COMFORT IDEA', desc:'A simple everyday product reference. Not a verified item or sizing chart.' },
    { id:'entry-shareef', name:'Entry Shareef', category:'sanskari', categoryLabel:'Sanskari concept', price:899, image:RAW4+'look-entry-shareef.webp', detailImage:RAW4+'campaign-entry-shareef.webp', tag:'EDITORIAL', desc:'A high-contrast campaign direction with a classic evening mood.' },
    { id:'pallu-shareef', name:'Pallu Shareef', category:'sanskari', categoryLabel:'Sanskari concept', price:999, image:RAW4+'look-pallu-shareef.webp', detailImage:RAW4+'campaign-pallu-shareef.webp', tag:'CAMPAIGN LOOK', desc:'Traditional draping used as a styling reference—not an inventory claim.' },
    { id:'navy-sanskari', name:'Sanskari Raat', category:'sanskari', categoryLabel:'Sanskari concept', price:949, image:RAW4+'look-sanskari-blue.webp', detailImage:RAW4+'campaign-sanskari-raat.webp', tag:'NAVY & GOLD', desc:'A navy-and-gold editorial concept inspired by evening glamour.' },
    { id:'aankhein-edit', name:'Aankhein Neeche', category:'sanskari', categoryLabel:'Campaign reference', price:849, image:RAW4+'look-aankhein.webp', detailImage:RAW4+'campaign-aankhein.webp', tag:'CAMPAIGN', desc:'A supplied campaign image, not confirmation of a product SKU.' },
    { id:'wellness-reference', name:'Wellness Reference', category:'wellness', categoryLabel:'Wellness reference', price:599, image:RAW4+'product-wellness.webp', detailImage:RAW4+'wellness-app-reference.webp', tag:'REFERENCE ONLY', desc:'A wellness product visual reference. Dimensions and claims need supplier verification.' },
    { id:'curved-product', name:'Curved Product Concept', category:'wellness', categoryLabel:'Wellness reference', price:699, image:RAW4+'product-curved.webp', detailImage:RAW4+'product-massager.webp', tag:'CONCEPT', desc:'Concept image only. Verify suitability, material and dimensions before any purchase decision.' }
  ];
  const campaigns = [
    { id:'pallu', title:'Pallu Shareef Hai, Kahani Nahi', kicker:'SANSKARI EDIT · 01', image:RAW3+'01-pallu-shareef.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'raat', title:'Sanskari Raat, Bold Khayal', kicker:'NAVY & GOLD · 02', image:RAW3+'02-sanskari-raat.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'mirror', title:'Mirror Knows Everything', kicker:'MIRROR EDIT · 03', image:RAW3+'03-mirror-knows.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'taiyaari', title:'Taiyaari Masoom Hai', kicker:'LOOKBOOK · 04', image:RAW3+'04-taiyaari-masoom.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'entry', title:'Entry Shareef, Impression Khatarnak', kicker:'STATEMENT EDIT · 05', image:RAW3+'05-entry-shareef.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'sweet-face', title:'Sweet Face, Dark Mood', kicker:'DARK ROMANCE · 06', image:RAW3+'06-sweet-face-dark-mood.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'shareef-nazar', title:'Shareef Si Nazar', kicker:'EDITORIAL · 07', image:RAW3+'07-shareef-nazar.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'raat-shareef', title:'Raat Shareef Hai', kicker:'EVENING EDIT · 08', image:RAW3+'08-raat-shareef.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'outside-banner', title:'Sanskari Outside', kicker:'CAMPAIGN BANNER · 09', image:RAW3+'09-sanskari-outside-banner.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' },
    { id:'outside-dangerous', title:'Sanskari Outside, Dangerous Inside', kicker:'CAMPAIGN · 10', image:RAW3+'10-sanskari-outside-dangerous.webp', desc:'Original supplied Sanskari campaign artwork · reference only.' }
  ];
  const guides = {
    clothing: {
      title: 'Bra, waist & hip sizing',
      html: `<p>Measure gently with a soft tape. A tape should sit level and snug, not compress the skin.</p><h3>Bust and underbust</h3><ul><li>Measure around the fullest part of the bust while keeping the tape level.</li><li>Measure under the bust around the ribcage, breathing normally.</li><li>Use the exact brand's size chart. Bra sizing systems vary by brand and country; this demo does not calculate a guaranteed bra size.</li></ul><h3>Waist and hips</h3><ul><li>Measure your natural waist without pulling the tape tight.</li><li>Measure around the fullest part of the hips.</li><li>For briefs or bodysuits, use the size chart for that exact product and fabric.</li></ul><p>If you fall between sizes, check fit notes and the brand's own guidance. Comfort is more important than a size label.</p>`
    },
    anatomy: {
      title: 'Vulva & vagina: the difference',
      html: `<p>The <b>vulva</b> is the external genital area, including the labia, clitoris and vaginal opening. The <b>vagina</b> is the internal canal leading from the vaginal opening to the cervix.</p><h3>Normal variation</h3><p>Labia, skin tone, shape and symmetry vary naturally. Appearance alone does not determine health, sexual history or worth.</p><h3>Basic care</h3><p>For routine external hygiene, gently wash the vulva with water; avoid harsh perfumed products and do not douche. Seek advice from a qualified clinician for persistent pain, sores, unusual bleeding, unusual discharge or a change that concerns you.</p>`
    },
    myths: {
      title: 'Hymen & virginity myths',
      html: `<p><b>Virginity is not a medical diagnosis.</b> There is no reliable physical examination that can establish whether a person has had sexual intercourse.</p><p>The hymen naturally varies in shape and elasticity. Its appearance cannot reliably prove sexual history, and bleeding is not a reliable indicator of first intercourse.</p><p>Do not insert fingers or objects, or inspect the vagina, to try to “check virginity”. If you have a health concern, consult a qualified healthcare professional in a respectful, confidential setting.</p><p>Reference: <a href="https://www.who.int/news/item/17-10-2018-interagency-statement-calls-for-the-elimination-of-virginity-testing" target="_blank" rel="noopener noreferrer">WHO interagency statement on eliminating virginity testing</a>.</p>`
    },
    medical: {
      title: 'Symptoms that may need medical guidance',
      html: `<p>General education cannot tell you what is causing a symptom. Consider contacting a qualified clinician for persistent vulvar pain, itching or burning; sores or skin changes; unusual bleeding; pain while urinating; or discharge that changes from your usual colour, smell or texture.</p><p>A strong or unfamiliar odor and changes in discharge do not automatically prove an infection; an examination or test may be needed. Do not use this guide to self-diagnose or delay medical care.</p><p>Seek urgent medical assessment if symptoms are severe, rapidly worsening, or accompanied by heavy bleeding, fever or severe pelvic pain.</p><p>Sources: <a href="https://www.nhs.uk/symptoms/vaginal-discharge/" target="_blank" rel="noopener noreferrer">NHS: vaginal discharge</a> and <a href="https://www.acog.org/womens-health/faqs/disorders-of-the-vulva-common-causes-of-vulvar-pain-burning-and-itching" target="_blank" rel="noopener noreferrer">ACOG: vulvar symptoms</a>.</p>`
    }
  };

  function safeRead(key, fallback) {
    try { const raw = localStorage.getItem(key); if (raw === null) return fallback; if (raw.length > 250000) return fallback; return JSON.parse(raw); }
    catch { return fallback; }
  }
  function safeWrite(key, value) {
    try { const serialized = JSON.stringify(value); if (serialized.length > 250000) { toast('This saved item is too large for local storage. Shorten it and try again.'); return false; } localStorage.setItem(key, serialized); return true; }
    catch { toast('Browser storage is unavailable. This change may not persist.'); return false; }
  }
  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function toast(message) {
    const el = $('#toast'); if (!el) return;
    el.textContent = message; el.classList.remove('hidden');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.add('hidden'), 2600);
  }
  function isSafeAppImageURL(value) {
    try { const u = new URL(String(value)); return u.protocol === 'https:' && u.hostname === 'raw.githubusercontent.com' && u.pathname.startsWith('/bhanu13yadav1-ai/') && /^\/bhanu13yadav1-ai\/(Brand-website-4f|Brand-website-3|Brand-website-full-finally-)\/main\//.test(u.pathname); } catch { return false; }
  }
  function imageHTML(src, alt, className = '') {
    const safeSrc = isSafeAppImageURL(src) ? String(src) : RAW4 + 'look-black-lace.webp';
    return `<img class="${esc(className)}" src="${esc(safeSrc)}" alt="${esc(alt)}" loading="lazy" decoding="async" fetchpriority="low" width="600" height="720" data-asset-image>`;
  }
  // Repair four Phase 6 diagrams whose module currently points at a non-existent ./assets/ folder.
  // The verified SVG files live at the repository root. The second scan catches diagrams inserted by
  // the Phase 6 DOMContentLoaded setup without observing every image mutation on the whole page.
  function repairKnownAssetPaths() {
    const repairs = new Map([
      ['./assets/phase6-measurement-map.svg', './phase6-measurement-map.svg'],
      ['./assets/phase6-product-specs.svg', './phase6-product-specs.svg'],
      ['./assets/phase6-comfort-check.svg', './phase6-comfort-check.svg'],
      ['./assets/phase6-image-rights-workflow.svg', './phase6-image-rights-workflow.svg']
    ]);
    // The mobile performance observer may already have moved a hidden image URL into
    // data-deferred-src before DOMContentLoaded. Repair either location so the corrected
    // path survives lazy deferral and still loads when that screen is opened.
    $$('img').forEach(img => {
      const current = img.getAttribute('src') || img.dataset.deferredSrc || '';
      const corrected = repairs.get(current);
      if (!corrected) return;
      if (img.dataset.deferredSrc) img.dataset.deferredSrc = corrected;
      else img.setAttribute('src', corrected);
    });
  }
  repairKnownAssetPaths();
  document.addEventListener('DOMContentLoaded', () => window.setTimeout(repairKnownAssetPaths, 0), { once: true });

  // Performance fix: dynamically added images in inactive views must also stay unloaded.
  // Original behaviour only covered the static index.html. Phase modules append more than
  // 30 gallery images after app.js runs, so they used to remain network-eligible on Home.
  const imageDeferralState = { deferred: 0, observerActive: false };
  function prepareImageForCurrentView(img) {
    if (!(img instanceof HTMLImageElement)) return;
    if (!img.hasAttribute('fetchpriority') || img.getAttribute('fetchpriority') !== 'high') {
      if (!img.hasAttribute('loading')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
    }
    const ownerView = img.closest('.view[data-view]');
    if (!ownerView || ownerView.classList.contains('active')) return;
    if (img.dataset.deferredSrc) {
      if (img.hasAttribute('src')) img.removeAttribute('src');
      return;
    }
    const src = img.getAttribute('src');
    if (!src) return;
    img.dataset.deferredSrc = src;
    img.removeAttribute('src');
    img.loading = 'lazy';
    img.decoding = 'async';
    imageDeferralState.deferred++;
  }
  function deferInactiveViewImages(root = document) {
    const images = root instanceof HTMLImageElement ? [root] : [...(root.querySelectorAll?.('img') || [])];
    images.forEach(prepareImageForCurrentView);
  }
  function loadDeferredImage(img) {
    const src = img?.dataset?.deferredSrc;
    if (!src) return;
    img.setAttribute('src', src);
    delete img.dataset.deferredSrc;
    img.loading = 'lazy';
    img.decoding = 'async';
    deferredImageObserver?.unobserve(img);
  }
  const deferredImageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const img = entry.target;
      const ownerView = img.closest('.view[data-view]');
      // Don't restart network work for a screen that became inactive before the observer fired.
      if (ownerView && !ownerView.classList.contains('active')) continue;
      loadDeferredImage(img);
    }
  }, {rootMargin:'320px 0px',threshold:0.01}) : null;
  function restoreDeferredViewImages(viewEl) {
    if (!viewEl) return;
    $$('img[data-deferred-src]', viewEl).forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
      if (deferredImageObserver) deferredImageObserver.observe(img);
      else loadDeferredImage(img);
    });
  }
  deferInactiveViewImages();
  // Observe only image insertions/src changes: do not watch all attributes or create a feedback loop.
  const inactiveViewImageObserver = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        prepareImageForCurrentView(record.target);
      } else {
        record.addedNodes.forEach(node => { if (node instanceof Element) deferInactiveViewImages(node); });
      }
    }
  });
  inactiveViewImageObserver.observe(document.documentElement, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['src']
  });
  imageDeferralState.observerActive = true;

  // Put the eight immediately usable product references before the large 151-record archive.
  // This makes Innerwear useful before optional archive metadata/remote images finish loading.
  function prioritizeInnerwearCatalog() {
    const catalog = $('#catalogGrid');
    const compare = $('#comparePanel');
    const archive = $('#imageLibraryGrid')?.closest('.image-library-section');
    if (!catalog || !archive || !archive.parentElement) return false;
    if (archive.compareDocumentPosition(catalog) & Node.DOCUMENT_POSITION_FOLLOWING) {
      archive.insertAdjacentElement('beforebegin', catalog);
      if (compare) archive.insertAdjacentElement('beforebegin', compare);
    }
    return true;
  }
  prioritizeInnerwearCatalog();

  // Phase 5: switch views immediately, then render the heavier Innerwear collection after a paint.
  // A token cancels stale scheduled renders if the visitor quickly changes sections.
  let innerwearEntryToken = 0;
  function phase5AfterPaint(callback) {
    if ('requestAnimationFrame' in window) requestAnimationFrame(() => window.setTimeout(callback, 0));
    else window.setTimeout(callback, 40);
  }
  function scheduleInnerwearRender(token) {
    phase5AfterPaint(() => {
      const startRender = () => {
        if (token !== innerwearEntryToken || state.view !== 'innerwear') return;
        try {
          renderCatalog();
          renderImageLibrary(false);
          showSpinFrame(0);
          scheduleImageLibraryInit();
        } catch (error) {
          if (state.diagnostic && Array.isArray(state.diagnostic.errors)) state.diagnostic.errors.push('Innerwear render failed: ' + String(error));
          console.error('[BLACKED V5] Innerwear render failed', error);
          const status = $('#imageLibraryStatus');
          if (status) status.textContent = 'Image collection could not render. Other sections remain available; use Retry when ready.';
        }
      };
      startRender();
    });
  }

  function setView(name) {
    if (!['home','stories','innerwear','sanskari','wellness','boyfriend','fit'].includes(name)) return;
    if (['wellness','boyfriend','stories'].includes(name) && !state.adultAllowed) {
      state.pendingView = name; $('#ageConfirm').checked = false; $('#ageError').classList.add('hidden'); $('#ageModal').classList.remove('hidden'); return;
    }
    const previousView = $('.view.active');
    state.view = name;
    $$('.view').forEach(v => { const active = v.dataset.view === name; v.hidden = !active; v.classList.toggle('active', active); });
    const activeView = $('#view-' + name);
    // Do not restore dozens of image sources in the same tap handler as navigation.
    phase5AfterPaint(() => {
      if (state.view !== name) return;
      const restore = () => { if (state.view === name) restoreDeferredViewImages(activeView); };
      if ('requestIdleCallback' in window) window.requestIdleCallback(restore, { timeout: 900 });
      else window.setTimeout(restore, 80);
    });
    if (previousView && previousView !== activeView) {
      const deferPreviousView = () => deferInactiveViewImages(previousView);
      if ('requestIdleCallback' in window) window.requestIdleCallback(deferPreviousView, { timeout: 900 });
      else window.setTimeout(deferPreviousView, 80);
    }
    $$('[data-view-link]').forEach(b => b.classList.toggle('active', b.dataset.viewLink === name));
    $$('.main-nav [data-view-link]').forEach(b => { if (b.dataset.viewLink === name) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    $('#mobileMenu').classList.add('hidden'); $('#menuToggle').setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if (name === 'innerwear') {
      const token = ++innerwearEntryToken;
      const catalog = $('#catalogGrid'), archive = $('#imageLibraryGrid');
      if (catalog && !catalog.childElementCount) catalog.textContent = 'Preparing the style catalogue…';
      if (archive && !archive.childElementCount) archive.textContent = 'The optional image collection loads separately below…';
      scheduleInnerwearRender(token);
    }
    if (name === 'sanskari') renderCampaigns();
    if (name === 'home') renderHomeCampaigns();
    if (name === 'stories') renderStories();
  }
  $$('[data-view-link]').forEach(b => b.addEventListener('click', () => setView(b.dataset.viewLink)));
  $$('.main-nav [data-view-link]').forEach(b => { if (b.dataset.viewLink === state.view) b.setAttribute('aria-current','page'); });
  $('#menuToggle').addEventListener('click', () => {
    const opened = $('#mobileMenu').classList.toggle('hidden') === false;
    $('#menuToggle').setAttribute('aria-expanded', String(opened));
  });
  $('#confirmAge').addEventListener('click', () => {
    if (!$('#ageConfirm').checked) { $('#ageError').classList.remove('hidden'); return; }
    state.adultAllowed = true;
    try { sessionStorage.setItem(STORAGE.adult, 'yes'); } catch { /* session storage is optional */ }
    $('#ageModal').classList.add('hidden'); const pending = state.pendingView || 'wellness'; state.pendingView = null; setView(pending);
  });
  $('#cancelAge').addEventListener('click', () => { state.pendingView = null; $('#ageModal').classList.add('hidden'); });
  try { state.adultAllowed = sessionStorage.getItem(STORAGE.adult) === 'yes'; } catch { state.adultAllowed = false; }


  // Phase 7: original, suggestive/non-graphic fiction starter library. All characters are adults.
  const storyLibrary = [
    {id:'last-train',title:'The Last Train Wasn’t the Plan',mood:'slow-burn',moodLabel:'Slow Burn',readingTime:'3 min read',teaser:'A missed connection, a nearly empty platform, and a conversation that neither adult wants to end too soon.',content:[
      'Ananya, 27, had already checked the train board twice when Dev, 29, offered to share the bench beneath the station clock. They had met at a friend’s dinner weeks ago and traded exactly three messages since. Tonight, the city had given them an unexpected extra hour.',
      'They talked about terrible first dates, the songs they pretended not to love, and the small brave things people rarely say out loud. Each time the announcement echoed overhead, neither moved. The silence between their sentences felt less awkward than the words they were choosing.',
      '“Would you like to get chai while we wait?” Dev asked. “No pressure. I can stay right here if you’d rather.” Ananya smiled, relieved by the question instead of pushed by it. “Chai, yes. And maybe one more honest question.”',
      'Outside the station kiosk, the rain softened the streetlights into gold. Their hands brushed around the paper cups; both noticed, neither assumed. Ananya offered her hand, palm up. Dev met it gently, waiting until she laced their fingers together. The train finally arrived, but the evening had already changed direction.'
    ]},
    {id:'velvet-key',title:'The Key Behind the Velvet Frame',mood:'dark-romance',moodLabel:'Andheri Raat · Dark Romance',readingTime:'4 min read',teaser:'At a private art opening, Rhea finds a brass key and a note that turns a mysterious evening into a game of mutual curiosity.',content:[
      'Rhea, 30, found the brass key tucked behind a velvet frame at the gallery’s final room. Beside it was a card in neat handwriting: “Only if you choose. Ask me about the blue door.” Across the room, Kabir, 32, lifted his glass in a question rather than a demand.',
      'The blue door opened onto a quiet reading room, not a secret trap or a grand reveal. One lamp, two chairs, a stack of old letters, and a city view made the space feel like a scene waiting for its own rules. Kabir explained the little mystery he had built for the guests, then offered to end the game whenever she wished.',
      'Rhea chose another clue. The next card asked what made her feel safe enough to be adventurous. Her answer surprised them both: clear choices, honest intentions, and the freedom to laugh when a plan got ridiculous. Kabir wrote it down as the best clue of the night.',
      'They left the gallery together when the staff began stacking chairs. Outside, Rhea asked if he wanted to meet again without riddles. “Absolutely,” he said. “And you choose the place.” The mystery had not been about control; it had been about discovering how good curiosity feels when everyone has the key.'
    ]},
    {id:'shareef-nazar',title:'Shareef Si Nazar',mood:'desi-tease',moodLabel:'Desi Double Meaning',readingTime:'3 min read',teaser:'A gold scarf, a cheeky compliment, and two adults who discover that playful banter works best when both write the punchline.',content:[
      'At a rooftop celebration, Sana, 26, adjusted the gold scarf over her shoulder while Rahul, 28, tried to remember the clever line he had rehearsed on the way there. He abandoned it. “You look like you know a secret,” he said instead.',
      '“Maybe I do,” Sana replied. “Maybe I’m waiting to see whether you can ask a good question.” The answer made him laugh. He asked what music she would choose if the rooftop belonged to her for one night. She chose an old romantic track and insisted he sing the first line.',
      'His singing was terrible. Her laughter was immediate. When the song slowed, Rahul offered his hand for a dance but kept enough distance for her to decide. Sana stepped closer and set the pace herself. They moved beneath the string lights, exchanging playful double meanings that left both smiling and neither guessing about the other’s comfort.',
      'Later, Sana typed her number into his phone, then looked him in the eye. “You can message tomorrow. Tonight, just enjoy the song.” Rahul promised to do exactly that. The best line of the evening, he realised, was the one that let her choose the next chapter.'
    ]},
    {id:'one-honest-question',title:'One Honest Question',mood:'couple-vibes',moodLabel:'Couple Vibes',readingTime:'3 min read',teaser:'Isha and Meera turn a quiet date into a game where every answer can be skipped—and every honest answer earns trust.',content:[
      'Isha, 29, brought a small deck of question cards to the café where Meera, 30, had planned their anniversary dessert. The first card said: “What makes you feel wanted without feeling pressured?” It was a bigger question than either expected, but the warm lights and familiar table made room for it.',
      'Meera answered first: thoughtful messages, a little anticipation, and being asked rather than having someone guess. Isha listened without interrupting. Then she admitted she loved surprises but needed the option to change her mind if a day had been difficult.',
      'They made three house rules for the game: either person could pass, a pass needed no explanation, and nothing shared tonight became a joke tomorrow. With the rules clear, the questions became lighter—an ideal weekend, a secret comfort film, the kind of compliment that stays with you after the room goes quiet.',
      'When dessert arrived, Meera slipped the last card into Isha’s palm. It read: “What should we try next, together?” Isha wrote “a dance class” and drew a tiny star. They left with a plan, not a promise they could not keep. Their best kind of bold was making honesty feel exciting.'
    ]}
    ,{id:'aaj-mood-harami',title:'Aaj Mood Bada Harami Hai',mood:'dirty-hinglish',moodLabel:'Dirty Hinglish & Gaali Banter',language:'hinglish',readingTime:'3 min read',teaser:'A late-night text, a shameless grin, and two adults who know that bold banter still needs boundaries.',content:[
      'Mahi, 28, ne group chat mute karke Aarav, 30, ko message bheja: “Aaj mood bada harami hai. Tumhari flirting ka level dekhna hai—par line cross hui toh seedha block.”',
      'Aarav ne turant reply kiya: “Madam, gaali allowed, pressure bilkul nahi. Tum rules batao; main overacting aur bad jokes laata hoon.” Mahi hansi. Usse confidence pasand tha, mind-reading nahi.',
      'Unhone ek game banaya: har turn mein ek cheeky compliment, ek silly challenge, aur ek “pass” option. “Saale, compliment theek tha—par tumhari shayari ko toh police pakadni chahiye,” Mahi ne likha.',
      'Aarav ne challenge accept kiya aur poocha ki kya woh aur bold ban sakta hai. Mahi ne kaha, “Haan, par pehle pooch. Mere mood ka remote mere paas hai.” Us raat banter dirty tha, par rules clear the; dono ko wahi vibe sabse zyada pasand aayi.'
    ]}
    ,{id:'land-ya-dildo',title:'Land Ya Dildo? Seedha Bol',mood:'dirty-hinglish',moodLabel:'Dirty Hinglish & Gaali Banter',language:'hinglish',readingTime:'3 min read',teaser:'A blunt fictional question becomes a surprisingly honest conversation about comfort, curiosity and saying what you actually mean.',content:[
      'Nisha, 27, aur Kabir, 29, apne “no awkward questions” game ke liye cards bana rahe the. Nisha ne ek card utha kar seedha pooch diya: “Aaj chut mein kya lena hai—land ya dildo? Fictional mood bata, koi pressure nahi.”',
      'Kabir pehle hans pada, phir bola, “Question toh full savage hai, madam. Lekin answer ka rule bhi likho: real life mein guess nahi karna, seedha baat karni hai.” Nisha ne card ke neeche bold letters mein likha: “Choice, comfort, clear yes.”',
      'Nisha ne kaha ki dirty joke ka maza tabhi hai jab dono ko funny lage. Kabir agreed; agar koi uncomfortable ho, topic change. Dono ne poll ke teen options bana diye: bold fantasy, playful toy-themed fiction, ya simply skip.',
      'Unhone card deck ko “No Pressure, Full Bakchodi” naam diya. Game ka winner woh nahi tha jisne sabse dirty answer diya—winner woh tha jisne doosre ki boundary suni aur vibe ko fun rakha.'
    ]}
    ,{id:'saali-attitude',title:'Saali, Itna Attitude!',mood:'desi-tease',moodLabel:'Desi Double Meaning',language:'hinglish',readingTime:'3 min read',teaser:'A rooftop flirt-off turns into a contest of confidence, clever insults and mutual respect.',content:[
      'Tara, 26, ne rooftop par entry li toh Dev, 28, ne dramatic salute maara. “Saali, itna attitude! Main hello bolun ya appointment book karun?”',
      '“Appointment le lo, waiting list lambi hai,” Tara ne jawab diya. “Aur bakwaas shayari laaye ho toh pehle hi bata do.” Dev ne apni terrible rhyme sunayi; Tara ki hansi ne uski saari rehearsed lines khatam kar di.',
      'Dono ne rule banaya: tease karo, insult nahi; bold ho, pushy nahi. Jab Dev ne poocha ki kya woh thoda aur flirt kar sakta hai, Tara ne smile karke kaha, “Haan, aaj permission hai. Kal phir poochna padega, hero.”',
      'Raat khatam hui toh number exchange hua, koi promise nahi. Tara ne last line bheji: “Goodnight, saale. Aaj ke liye pass ho.” Dev ne screenshot nahi, bas message save kiya—aur kal ka plan poochne ka wait kiya.'
    ]}
    ,{id:'boss-lady-rule',title:'Boss Lady Ka Secret Rule',mood:'dark-romance',moodLabel:'Andheri Raat · Dark Romance',language:'hinglish',readingTime:'4 min read',teaser:'A mysterious invitation, a velvet envelope and a confident adult who writes the rules before the night begins.',content:[
      'Aisha, 31, ko ek black envelope mila. Andar sirf ek line thi: “Midnight library. Dress sharp. Leave whenever you want.” Neeche Rehan, 33, ka naam tha—woh aadmi jo hamesha mysteries create karta tha, lekin kabhi uski choice chheen-ne ki koshish nahi karta.',
      'Library mein red lamp, old books aur ek table par teen cards the: “Ask”, “Answer” aur “Pass”. Rehan ne bataya ki har card optional hai. Aisha ne “Ask” uthaya: “Tumhe lagta hai bold hone ka matlab rules todna hai?”',
      'Rehan ne kaha, “Nahi. Bold hone ka matlab apni baat saaf kehna aur doosre ka no bhi sunna.” Aisha ne “Pass” card uske saamne rakha aur hans padi. “Test pass. Ab chai lao.”',
      'Midnight tak unhone fictional secrets aur impossible dreams share kiye. Mystery ka best part koi hidden demand nahi tha—balki yeh tha ki Aisha har turn par apni choice khud karti rahi.'
    ]}
    ,{id:'text-mat-aa',title:'Text Mat Kar, Aake Chai Pee',mood:'slow-burn',moodLabel:'Slow Burn',language:'hinglish',readingTime:'3 min read',teaser:'A teasing voice note, one rainy evening and a date that goes exactly as slowly as both adults want.',content:[
      'Pooja, 29, ne Adil, 30, ko voice note bheja: “Bas text pe hero mat ban. Chai pe mil, phir dekhte hain kitni himmat hai.” Adil ne reply kiya, “Public café, tumhara choice, aur exit whenever you want. Done?”',
      'Café mein Adil ne pehle chai order ki aur phir uski playlist ke baare mein poocha. Pooja ko uski attention achhi lagi—woh har silence ko flirt se bharne ki koshish nahi kar raha tha.',
      'Baarish tez hui toh Adil ne umbrella offer kiya; Pooja ne apni speed choose ki. “Aaj bas walk aur chai,” usne kaha. “Next time aur bold ban sakte hain.” Adil ne kaha, “Next time pooch lunga.”',
      'Ghar pahunch kar Pooja ne message kiya: “Aaj tum pass hue, hero. Chai decent thi, company better.” Adil ne smile emoji bheja aur agle plan se pehle uski availability poochi.'
    ]}
    ,{id:'couple-ka-dirty-deck',title:'Couple Ka Dirty-Dare Deck',mood:'couple-vibes',moodLabel:'Couple Vibes',language:'hinglish',readingTime:'4 min read',teaser:'A married couple reinvent date night with cheeky cards, ridiculous dares and a rule that makes honesty feel safe.',content:[
      'Ritu, 32, aur Manav, 34, ko laga ki unki date nights sirf food-order aur phone-scroll ban gayi hain. Ritu ne cards banaye: “Compliment”, “Confession”, “Dare” aur “Pass”.',
      'Manav ne pehla dare padha: “Apni sabse cringe flirting line bolo.” Usne itni buri line boli ki Ritu sofa se uth kar fake award le aayi: “Best Bakwaas, Lifetime Achievement.”',
      'Agla card personal tha. Manav ne poocha ki kaunsi type ki teasing Ritu ko pasand hai aur kis baat se woh uncomfortable hoti hai. Dono ne answers share kiye aur decide kiya ki kisi bhi dare ko skip karne par explanation nahi dena padega.',
      'Date night ka ending dramatic nahi tha—bas ek shared playlist, extra dessert aur agle hafte ke liye ek naya card idea. Unhe yaad aaya ki boldness ka matlab pressure nahi; honest communication bhi sexy confidence ho sakta hai.'
    ]}
  ];

  // Part B: additional dark-romance Hinglish starters. All characters are fictional adults; scenes stay suggestive, non-graphic and consent-first.
  storyLibrary.push(
    {id:'kaali-raat-ka-rule',title:'Kaali Raat, Seedha Sawaal',mood:'dark-romance',moodLabel:'Andheri Raat · Dark Romance',language:'hinglish',readingTime:'4 min read',teaser:'Ek black envelope, ek harami mystery aur ek boss lady jo rules khud likhti hai.',content:[
      'Zoya, 29, ko raat ke 11:47 par ek message aaya: “Madam, tumhari bold baaton ki reputation hai. Aaj mystery solve karogi?” Sender tha Armaan, 32—smart suit, shaitaan smile aur overconfident one-liners ka walking showroom.',
      'Zoya ne reply kiya: “Sun saale, suspense theek hai. Mind-reading aur zabardasti nahi. Main jab bolun bas, toh game khatam.” Armaan ka jawab seedha tha: “Deal. Tum rules likho, main bakwaas shayari aur clues laata hoon.”',
      'Old library mein teen envelopes rakhe the. Pehla clue uski favourite film nikla, doosra ek honest question: “Tumhe bold feel karne ke liye kya chahiye?” Zoya boli, “Choice. Aur koi harami meri ‘no’ ko challenge na samjhe.” Armaan ne clue ke neeche likha: “Rule number one: no means no.”',
      'Aakhri envelope mein date invitation tha, koi secret demand nahi. Zoya hansi: “Itna drama karke coffee?” Armaan bola, “Coffee ke saath meri bekaar shayari free.” Zoya ne haan kaha—sirf coffee ke liye. Raat mysterious thi, par decision bilkul clear.'
    ]},
    {id:'gandi-soch-seedhi-baat',title:'Gandi Soch, Seedhi Baat',mood:'dirty-hinglish',moodLabel:'Dirty Hinglish & Gaali Banter',language:'hinglish',readingTime:'3 min read',teaser:'Desi double meaning full volume par—par asli confidence clear boundaries ke saath.',content:[
      'Naina, 30, ne Kunal, 31, ka phone dekha: usne date ke liye ek boring restaurant aur teen cringe pickup lines shortlist ki thi. “Oye saale, flirting karni hai ya HR interview?” Naina ne chheda.',
      'Kunal bola, “Madam, main harami ho sakta hoon, telepath nahi. Tum vibe set karo—kitna double meaning, kitni gaali, aur kis line par brake?” Naina ne kaha, “Banter bold rakh. Body par insult nahi. Aur ‘pass’ ka matlab pass.”',
      'Unhone ek card game shuru kiya: ek cheeky line, ek honest question, aur ek chance to skip. Naina ne likha, “Aaj tumhari shakal se zyada tumhara confidence test hoga.” Kunal ne jawab diya, “Phir toh main pehle hi fail—confidence ke saath bakwaas bhi laaya hoon.”',
      'Dono ki hansi ruk hi nahi rahi thi. Raat ka mood naughty tha, lekin koi pressure nahi. Naina ne last card par likha: “Dirty talk tabhi sexy hai jab dono ko maza aaye. Baaki sab chutiyapa.” Kunal ne card pocket mein rakha—rules yaad rakhne ke liye, kisi ko control karne ke liye nahi.'
    ]},
    {id:'madam-ke-rules',title:'Madam Ke Rules, Saale',mood:'dark-romance',moodLabel:'Andheri Raat · Dark Romance',language:'hinglish',readingTime:'4 min read',teaser:'Ek private masquerade, ek masked stranger aur heroine jo har scene ka control apne paas rakhti hai.',content:[
      'Aarohi, 28, masquerade party mein black mask pehen kar gayi. Ek stranger ne card diya: “Agar tum chaho toh teen clues. Har clue ke baad tum decide karogi game aage chalega ya nahi.” Naam: Veer, 30.',
      'Aarohi ne card palta aur likha: “Rule one: drama, yes. Pressure, no. Rule two: meri permission har next step par dobara poochni padegi.” Veer ne sir hilaaya. “Aur rule three?” “Bakwas shayari pe fine lagega, saale.”',
      'Clues ne unhe ballroom se balcony tak le gaye, par har turn par Aarohi ke paas choice thi. Ek pal woh hansi, doosre pal usne pause maanga. Veer ruk gaya, sawaal nahi kiya, bas paani le aaya. Us chhoti si baat ne saare dramatic gestures se zyada impression chhoda.',
      'Midnight par mask utarne se pehle Aarohi ne kaha, “Mystery acchi thi. Ab real naam aur normal coffee invite do.” Veer ne diya. Ending cliffhanger nahi thi—ek respectful beginning thi, jahan dono ko apni marzi se next chapter likhna tha.'
    ]}
  );

  // Series use each existing story as Part 1, preserving the original story text.
  const storySeries = {
    'velvet-key': {
      label:'Blue Door Mystery · 3 parts', chapters:[
        {title:'Part 2 · Blue Door Ka Dusra Raaz',content:[
          'Rhea, 30, ne brass key table par rakhi. “Kabir, mystery theek hai, par rules clear: koi surprise touch nahi, aur main jab bolun bas, toh game khatam.” Kabir ne seedha kaha, “Deal. Har next step ka yes alag hoga.”',
          'Blue door ke peeche ek aur letter tha: “Sabse bold secret woh nahi jo chhupaya jaaye—woh hai jo tum khud decide karke share karo.” Rhea ne apni story ka sirf utna hissa bataya jitna woh comfortable thi.',
          'Kabir ne koi interrogation nahi ki. Usne apna secret bataya: use logon ko impress karne ke chakkar mein over-plan karna pasand nahi tha. Rhea hansi, “Finally, ek normal flaw. Tum itne mysterious nahi, thode se dramatic ho, saale.”'
        ]},
        {title:'Part 3 · Aakhri Clue, Apni Marzi',content:[
          'Aakhri card par do options the: “Ek aur clue” ya “Mystery yahin band.” Rhea ko laga ki kisi ne uske choice ko story ka central part bana diya tha. Usne card Kabir ko dikhaya: “Achha likha hai. Is baar decision main loongi.”',
          'Kabir ne kaha, “Exactly. Tumhara jawab story ka end nahi, tumhara right hai.” Rhea ne pehle coffee choose ki, phir ek last clue. Mystery ne unke liye kuch prove nahi kiya; bas unhe bataya ki curiosity bina pressure bhi exciting ho sakti hai.'
        ]}
      ], endings:[
        {id:'stay',label:'Ek aur clue ke liye rukna',content:['Rhea ne muskurakar “One more clue” card uthaya. Kabir ne ek chhota note diya: “Next date tum choose karogi.” Rhea ne kaha, “Aur tum apni shayari ghar par practice karoge, harami.” Dono hasi ke saath gallery se nikle; next chapter ka plan mutual tha.']},
        {id:'leave',label:'Mystery yahin chhod dena',content:['Rhea ne key wapas velvet frame ke paas rakh di. “Aaj ke liye itna kaafi hai.” Kabir ne smile ki: “Thanks for playing. Coffee ka invite ab bhi open hai—no pressure.” Rhea ne kaha, “Kal message karna, phir dekhenge.” Mystery adhuri rahi, par choice poori thi.']}
      ]
    },
    'boss-lady-rule': {
      label:'Boss Lady Files · 3 parts', chapters:[
        {title:'Part 2 · Madam Ka Agla Rule',content:[
          'Aisha, 31, ne next envelope khola: “Choose the music.” Rehan, 33, ne speaker uski taraf kar diya. “Boss lady ka rule hai, toh playlist bhi boss lady ki.” Aisha boli, “Good. Ab meri taste par comment kiya toh tumhari entry ban.”',
          'Song ke beech ek prompt aaya: “Aisi kaunsi baat hai jo tumhe bold feel karati hai?” Aisha ne jawab diya, “Jab meri baat suni jaati hai, sirf meri daring image ko nahi.” Rehan ne is baar joke nahi maara; usne jawab yaad rakha.'
        ]},
        {title:'Part 3 · The Rule She Kept',content:[
          'Final note par likha tha: “Agar tum continue karna chaho, next clue tum set karo.” Aisha ne teen rules likhe: sach bolna, pass ko respect karna, aur kisi private baat ko kabhi public joke na banana.',
          'Rehan ne sign kiya aur apna naam neeche likha. “Done.” Aisha ne kaha, “Bas itna? Mujhe laga tum aur dramatic dialogue maaroge.” “Draft mein tha,” woh bola, “par tumne no cringe clause rakha hai.” Aisha hansi aur date ka next plan choose kiya.'
        ]}
      ], endings:[
        {id:'bold-date',label:'Bold coffee date choose karo',content:['Aisha ne late-night coffee spot choose kiya. “Public place, ek ghanta, aur meri choice ka music.” Rehan bola, “Approved—boss lady ka schedule.” Usne kisi aur promise ka pressure nahi dala. Dono ne ek date plan ki, bas utna hi jitna dono chahte the.']},
        {id:'mystery-end',label:'Mystery ko yahin end karo',content:['Aisha ne envelope band kiya: “Aaj ka game khatam.” Rehan ne kaha, “Thanks for telling me clearly.” Usne koi guilt trip nahi diya, aur Aisha ko wahi confidence sabse zyada pasand aaya. Story yahin end hui—respect ke saath.']}
      ]
    },
    'kaali-raat-ka-rule': {
      label:'Kaali Raat Files · 3 parts', chapters:[
        {title:'Part 2 · Harami Clue',content:[
          'Zoya ko agle din ek laal envelope mila. Andar likha tha: “Kal raat tumne rules banaye. Aaj tum clue writer ho.” Usne Armaan ko message kiya, “Saale, tumhara drama budget khatam nahi hota?” Armaan ne reply diya, “Tumhari roast rating high hai, sponsor mil jaata hai.”',
          'Zoya ne clue ko ek art café tak follow kiya. Wahan Armaan ne usse teen choices di—question, joke, ya game end. Zoya ne question choose kiya: “Tum mysterious kyun bante ho?” Armaan ne sach bola: “Kabhi-kabhi rejection se darr lagta hai, toh main joke ke peeche chhup jaata hoon.”'
        ]},
        {title:'Part 3 · Kaun Control Mein?',content:[
          'Zoya ne kaha, “Confidence ka matlab yeh nahi ki tum kabhi darrte nahi. Matlab tum seedha pooch sakte ho aur jawab accept kar sakte ho.” Armaan ne haan mein sir hilaaya. Aaj usne bina riddle ke date poochi.',
          'Zoya ne apni marzi se haan kaha, time aur place khud choose kiya. Kaali raat ka suspense ab bhi tha, par kisi ko guess karne ki zaroorat nahi thi. Unki kahani mein boldness thi, par control kisi ek ka nahi—choice dono ki thi.'
        ]}
      ], endings:[
        {id:'say-yes',label:'Coffee date ke liye haan',content:['Zoya ne message bheja: “Public café, 7 baje. Late hue toh roast karungi.” Armaan ne reply kiya, “Accepted. No riddles, no excuses.” Date set hui, future open raha.']},
        {id:'not-tonight',label:'Aaj nahi, baad mein dekhna',content:['Zoya ne likha: “Aaj nahi. Kal shayad baat karenge.” Armaan ne answer kiya, “No worries. Thanks for telling me.” Koi guilt trip nahi, koi force nahi. Kabhi-kabhi best ending hoti hai space dena.']}
      ]
    }
  };

  const STORY_VAULT_KEY = 'blackedV1PartBStoryVault';
  const validStoryIds = new Set(storyLibrary.map(s=>s.id));
  const rawStoryVault = safeRead(STORY_VAULT_KEY, {});
  const storyVault = {
    enabled: rawStoryVault && rawStoryVault.enabled === true,
    bookmarks: Array.isArray(rawStoryVault?.bookmarks) ? [...new Set(rawStoryVault.bookmarks.filter(id=>validStoryIds.has(id)))].slice(0,80) : [],
    progress: {}, lastRead: null
  };
  if (rawStoryVault && rawStoryVault.progress && typeof rawStoryVault.progress === 'object' && !Array.isArray(rawStoryVault.progress)) {
    for (const [id,p] of Object.entries(rawStoryVault.progress)) {
      if (validStoryIds.has(id) && p && Number.isInteger(p.chapterIndex) && p.chapterIndex>=0 && p.chapterIndex<=((storySeries[id]?.chapters.length||0))) {
        storyVault.progress[id]={chapterIndex:p.chapterIndex,completed:p.completed===true,branchId:typeof p.branchId==='string'?p.branchId:null,updatedAt:typeof p.updatedAt==='string'?p.updatedAt:''};
      }
    }
  }
  if (rawStoryVault?.lastRead && validStoryIds.has(rawStoryVault.lastRead.id)) {
    const id=rawStoryVault.lastRead.id; const max=storySeries[id]?.chapters.length||0; const chapterIndex=Number.isInteger(rawStoryVault.lastRead.chapterIndex)?Math.max(0,Math.min(max,rawStoryVault.lastRead.chapterIndex)):0;
    storyVault.lastRead={id,chapterIndex,branchId:typeof rawStoryVault.lastRead.branchId==='string'?rawStoryVault.lastRead.branchId:null,updatedAt:typeof rawStoryVault.lastRead.updatedAt==='string'?rawStoryVault.lastRead.updatedAt:''};
  }
  function persistStoryVault() {
    const payload={version:1,enabled:storyVault.enabled,bookmarks:storyVault.bookmarks.slice(0,80),progress:storyVault.progress,lastRead:storyVault.lastRead};
    try { localStorage.setItem(STORY_VAULT_KEY,JSON.stringify(payload)); return true; }
    catch { toast('Browser storage blocked. Reading data was not saved.'); return false; }
  }
  function clearStoryVaultData(render=true) {
    storyVault.enabled=false; storyVault.bookmarks.length=0; storyVault.progress={}; storyVault.lastRead=null;
    try { localStorage.removeItem(STORY_VAULT_KEY); } catch {}
    if (render) { if ($('#storyVaultOptIn')) $('#storyVaultOptIn').checked=false; renderStories(); renderStoryVault(); }
  }
  function storyIsBookmarked(id) { return storyVault.bookmarks.includes(id); }
  function toggleStoryBookmark(id) {
    if (!storyVault.enabled) { toast('Pehle “Save on this device” opt-in on karo.'); $('#storyVaultOptIn')?.focus(); return; }
    const index=storyVault.bookmarks.indexOf(id);
    if(index>=0)storyVault.bookmarks.splice(index,1);else if(storyVault.bookmarks.length<80)storyVault.bookmarks.push(id);else{toast('Bookmark limit reached (80).');return;}
    persistStoryVault(); renderStories(); renderStoryVault();
  }
  function saveStoryProgress(story, chapterIndex=0, branchId=null, completed=false) {
    if (!storyVault.enabled) return;
    const max=storySeries[story.id]?.chapters.length||0;
    const safeIndex=Math.max(0,Math.min(max,Number.isInteger(chapterIndex)?chapterIndex:0));
    const record={chapterIndex:safeIndex,completed:completed===true,branchId:typeof branchId==='string'?branchId:null,updatedAt:new Date().toISOString()};
    storyVault.progress[story.id]=record; storyVault.lastRead={id:story.id,chapterIndex:safeIndex,branchId:record.branchId,updatedAt:record.updatedAt};
    persistStoryVault(); renderStoryVault();
  }
  function renderStoryVault() {
    const host=$('#storyVaultGrid'); if(!host)return;
    const status=$('#storyVaultStatus'); const opt=$('#storyVaultOptIn'); if(opt)opt.checked=storyVault.enabled;
    if(!storyVault.enabled) {
      status.textContent='Saving is off. No new reading progress or bookmark is recorded.';
      host.innerHTML='<p class="muted">Enable local saving to use bookmarks and Continue Reading.</p>'; return;
    }
    status.textContent='On-device saving is enabled. These values are not encrypted or synced; clear them whenever you want.';
    const rows=[]; const last=storyVault.lastRead;
    if(last) {
      const s=storyLibrary.find(x=>x.id===last.id); const series=storySeries[last.id]; const partName=last.chapterIndex===0?s?.title:(series?.chapters[last.chapterIndex-1]?.title||s?.title);
      if(s)rows.push(`<article class="story-vault-card"><span class="story-mood">CONTINUE READING</span><h3>${esc(s.title)}</h3><p>${esc(partName)}${storyVault.progress[last.id]?.completed?' · Marked complete':''}</p><button class="btn secondary full" type="button" data-vault-open="${esc(last.id)}" data-vault-chapter="${last.chapterIndex}" data-vault-branch="${esc(last.branchId||'')}">Continue reading ↗</button></article>`);
    }
    for(const id of storyVault.bookmarks) {const s=storyLibrary.find(x=>x.id===id);if(!s)continue;const p=storyVault.progress[id];rows.push(`<article class="story-vault-card"><span class="story-mood">BOOKMARKED</span><h3>${esc(s.title)}</h3><p>${esc(s.teaser)}</p><button class="btn secondary full" type="button" data-vault-open="${esc(id)}" data-vault-chapter="${p?.chapterIndex||0}" data-vault-branch="${esc(p?.branchId||'')}">Open saved story ↗</button></article>`);}
    host.innerHTML=rows.length?rows.join(''):'<p class="muted">No bookmarks or reading progress saved yet. Open a story or tap Bookmark on any card.</p>';
  }
  const storyReaderState={storyId:null,chapterIndex:0,branchId:null,returnFocus:null};
  function renderStoryReader(storyId, chapterIndex=0, branchId=null) {
    const story=storyLibrary.find(s=>s.id===storyId); if(!story)return;
    const series=storySeries[storyId]; const max=series?.chapters.length||0;
    const safeIndex=Math.max(0,Math.min(max,Number.isInteger(chapterIndex)?chapterIndex:0));
    let partTitle=story.title, content=story.content, branch=null;
    if(safeIndex>0 && series) {const part=series.chapters[safeIndex-1];partTitle=part.title;content=part.content;}
    if(branchId && series) {branch=series.endings.find(e=>e.id===branchId)||null;if(branch){partTitle=branch.label;content=branch.content;}}
    storyReaderState.storyId=storyId;storyReaderState.chapterIndex=safeIndex;storyReaderState.branchId=branch?.id||null;
    $('#storyModalTitle').textContent=partTitle;
    $('#storyModalMeta').textContent=`${story.moodLabel} · ${story.readingTime} · ${(story.language==='hinglish'?'Hindi / Hinglish':'English')} · Adult fictional characters`;
    $('#storyModalBody').innerHTML=content.map((paragraph,i)=>`<p${i===content.length-1?' class="story-consent-note"':''}>${esc(paragraph)}</p>`).join('');
    const controls=$('#storySeriesControls');
    if(series) {
      const buttons=[];
      if(!branch && safeIndex>0) buttons.push(`<button class="btn ghost" type="button" data-story-prev>← Previous part</button>`);
      if(!branch && safeIndex<max) buttons.push(`<button class="btn primary" type="button" data-story-next>Next part ↗</button>`);
      if(!branch && safeIndex===max) buttons.push(...series.endings.map(e=>`<button class="btn secondary" type="button" data-story-branch="${esc(e.id)}">${esc(e.label)}</button>`));
      if(branch) buttons.push(`<button class="btn secondary" type="button" data-story-restart-branch>Choose another ending</button><button class="btn primary" type="button" data-story-finish>Mark series complete</button>`);
      if(!branch && safeIndex===0) buttons.push(`<button class="btn ghost" type="button" data-story-mark-read>Mark Part 1 as read</button>`);
      controls.innerHTML=`<div class="story-series-progress"><span>${esc(series.label)}</span><span>Part ${branch?max+1:safeIndex+1} of ${max+1}${branch?' · ending':''}</span></div><div class="button-row">${buttons.join('')}</div><p class="micro muted">Choose a branch ending, or close this story any time. Each ending is a valid choice.</p>`;
    } else {
      controls.innerHTML=`<div class="story-series-progress"><span>Single story · ${esc(story.readingTime)}</span><span>Optional completion</span></div><div class="button-row"><button class="btn secondary" type="button" data-story-mark-read>Mark as read</button></div>`;
    }
    saveStoryProgress(story,safeIndex,branch?.id||null,!!branch);
    $('#storyModal').classList.remove('hidden');
  }
  function bookmarkButton(story) {
    const saved=storyIsBookmarked(story.id);
    return `<button class="small-btn story-bookmark-btn" type="button" data-story-bookmark="${esc(story.id)}" aria-pressed="${String(saved)}">${saved?'♥ Saved':'♡ Bookmark'}</button>`;
  }
  function openSavedStory(id,chapterIndex=0) { renderStoryReader(id,chapterIndex,null); }

  let activeStoryFilter='all';
  function renderStories(){
    const host=$('#storyGrid'); if(!host)return;
    const q=($('#storySearch')?.value||'').trim().toLowerCase();
    const cat=$('#storyCategory')?.value||'all';
    const effective=cat!=='all'?cat:activeStoryFilter;
    const lang=$('#storyLanguage')?.value||'all';
    const sort=$('#storySort')?.value||'featured';
    let list=storyLibrary.filter(s=>(effective==='all'||s.mood===effective)&&(lang==='all'||(s.language||'en')===lang)&&`${s.title} ${s.moodLabel} ${s.teaser} ${s.content.join(' ')}`.toLowerCase().includes(q));
    if(sort==='title')list=[...list].sort((a,b)=>a.title.localeCompare(b.title));
    if(sort==='shortest')list=[...list].sort((a,b)=>parseInt(a.readingTime)-parseInt(b.readingTime));
    if(sort==='longest')list=[...list].sort((a,b)=>parseInt(b.readingTime)-parseInt(a.readingTime));
    host.innerHTML=list.map(s=>{
      const series=storySeries[s.id];
      return `<article class="story-card" data-story-card="${esc(s.id)}" data-story-category="${esc(s.mood)}" data-story-language="${esc(s.language||'en')}"><div class="story-topline"><span class="story-mood">${esc(s.moodLabel)}</span><span class="story-meta">${esc(s.readingTime)} · ${(s.language||'en')==='hinglish'?'HINGLISH':'ENGLISH'} · 18+</span></div><h2>${esc(s.title)}</h2><p>${esc(s.teaser)}</p>${series?`<span class="story-series-tag">${esc(series.label)}</span>`:''}<div class="story-card-actions"><button class="btn secondary full" type="button" data-story-open="${esc(s.id)}">${storyVault.progress[s.id]?'Continue story ↗':'Read story ↗'}</button>${bookmarkButton(s)}</div></article>`;
    }).join('');
    $('#storyCount').textContent=`${list.length} of ${storyLibrary.length} stories available`;
    $('#storyStatus').textContent=`${list.length} stories shown.`;
    renderStoryVault();
  }
  $$('[data-dirty-pick]').forEach(button=>button.addEventListener('click',()=>{
    const result=$('#dirtyPollResult');
    const responses={
      land:'Land wala fictional vibe selected: bold banter + slow-burn story mood. Real life mein clear, mutual marzi aur comfort first—guesswork nahi.',
      toy:'Dildo wala fictional vibe selected: playful toy-themed fiction mood. Koi pressure nahi; comfort, hygiene and consent matter, aur skip hamesha okay hai.',
      skip:'Bilkul—skip is always okay. Poll ka answer save ya send nahi hota. Seedha story choose karo ya mood filter badlo.'
    };
    if(result)result.textContent=responses[button.dataset.dirtyPick]||responses.skip;
    $$('[data-dirty-pick]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  }));
  $('#storySearch').addEventListener('input',renderStories);
  $('#storyLanguage').addEventListener('change',renderStories);
  $('#storySort').addEventListener('change',renderStories);
  $('#storyCategory').addEventListener('change',()=>{activeStoryFilter=$('#storyCategory').value;$$('[data-story-filter]').forEach(b=>{const on=b.dataset.storyFilter===activeStoryFilter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});renderStories();});
  $$('[data-story-filter]').forEach(b=>b.addEventListener('click',()=>{activeStoryFilter=b.dataset.storyFilter;$('#storyCategory').value=activeStoryFilter;$$('[data-story-filter]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on));});renderStories();}));
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null;if(!target)return;
    const bookmark=target.closest('[data-story-bookmark]');
    if(bookmark){toggleStoryBookmark(bookmark.dataset.storyBookmark);return;}
    const open=target.closest('[data-story-open]');
    if(open){renderStoryReader(open.dataset.storyOpen,0,null);return;}
    const vaultOpen=target.closest('[data-vault-open]');
    if(vaultOpen){renderStoryReader(vaultOpen.dataset.vaultOpen,Number(vaultOpen.dataset.vaultChapter)||0,vaultOpen.dataset.vaultBranch||null);return;}
    const next=target.closest('[data-story-next]');
    if(next){renderStoryReader(storyReaderState.storyId,storyReaderState.chapterIndex+1,null);return;}
    const prev=target.closest('[data-story-prev]');
    if(prev){renderStoryReader(storyReaderState.storyId,storyReaderState.chapterIndex-1,null);return;}
    const branch=target.closest('[data-story-branch]');
    if(branch){renderStoryReader(storyReaderState.storyId,storyReaderState.chapterIndex,branch.dataset.storyBranch);return;}
    const restart=target.closest('[data-story-restart-branch]');
    if(restart){renderStoryReader(storyReaderState.storyId,storyReaderState.chapterIndex,null);return;}
    const finish=target.closest('[data-story-finish]');
    if(finish){const story=storyLibrary.find(s=>s.id===storyReaderState.storyId);if(story)saveStoryProgress(story,storyReaderState.chapterIndex,storyReaderState.branchId,true);toast('Series marked complete on this device.');renderStoryReader(storyReaderState.storyId,storyReaderState.chapterIndex,storyReaderState.branchId);return;}
    const mark=target.closest('[data-story-mark-read]');
    if(mark){const story=storyLibrary.find(s=>s.id===storyReaderState.storyId);if(story)saveStoryProgress(story,storyReaderState.chapterIndex,null,true);toast(storyVault.enabled?'Marked as read.':'Enable local saving to keep reading progress.');renderStoryVault();return;}
    if(target.closest('#clearStoryVault')){
      const yes=window.confirm('Clear all saved story bookmarks and reading progress from this browser?');
      if(yes){clearStoryVaultData(true);toast('Saved story data cleared.');}
      return;
    }
  });
  $('#storyVaultOptIn').addEventListener('change',()=>{
    storyVault.enabled=$('#storyVaultOptIn').checked;
    persistStoryVault();
    renderStories();
    $('#storyVaultStatus').textContent=storyVault.enabled?'On-device saving enabled. Data is local, not encrypted, and not synced.':'Saving paused. Previously saved values remain until you clear them.';
  });

  function renderHomeCampaigns() {
    const host = $('#homeCampaigns');
    host.innerHTML = campaigns.slice(0,3).map(c => campaignCard(c)).join('');
  }
  function campaignCard(c) {
    return `<article class="campaign-card"><button class="campaign-image-btn" type="button" data-campaign-open="${esc(c.id)}" aria-label="Open ${esc(c.title)} campaign preview">${imageHTML(c.image, c.title + ' campaign reference')}</button><div class="campaign-copy"><small>${esc(c.kicker)}</small><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p></div><div class="campaign-actions"><button class="small-btn" type="button" data-campaign-open="${esc(c.id)}">View large</button><button class="small-btn" type="button" data-campaign-save="${esc(c.id)}">♡ Save</button></div></article>`;
  }
  function renderCampaigns() {
    $('#sanskariGallery').innerHTML = campaigns.map(c => campaignCard(c)).join('');
    $('#sanskariCount').textContent = `${campaigns.length} concepts`;
  }

  function renderCatalog() {
    const host = $('#catalogGrid'); if (!host) return;
    const q = $('#catalogSearch').value.trim().toLowerCase();
    const category = $('#catalogCategory').value; const sort = $('#catalogSort').value;
    let list = products.filter(p => (category === 'all' || p.category === category) && `${p.name} ${p.categoryLabel} ${p.desc} ${p.tag}`.toLowerCase().includes(q));
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'price-low') list.sort((a,b) => a.price-b.price);
    if (sort === 'price-high') list.sort((a,b) => b.price-a.price);
    $('#catalogCount').textContent = `${list.length} concept ${list.length === 1 ? 'reference' : 'references'}`;
    if (!list.length) { host.innerHTML = `<div class="empty-state"><b>No styles found.</b><p>Try another keyword or reset the filters.</p><button class="btn ghost" id="resetCatalog" type="button">Reset filters</button></div>`; renderCompare(); return; }
    host.innerHTML = list.map(p => `<article class="product-card"><button class="campaign-image-btn" type="button" data-product-detail="${esc(p.id)}" aria-label="View details for ${esc(p.name)}">${imageHTML(p.image,p.name+' concept reference','product-image')}</button><div class="product-card-copy"><span class="kicker">${esc(p.tag)}</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="product-price">₹${p.price.toLocaleString('en-IN')} <small>sample price · not verified</small></div></div><div class="product-card-actions"><button class="btn primary" type="button" data-add="${esc(p.id)}">Add demo pick</button><button class="btn ghost" type="button" data-save="${esc(p.id)}" aria-pressed="${state.wishlist.has(p.id)}">${state.wishlist.has(p.id)?'♥ Saved':'♡ Save'}</button></div><div class="campaign-actions"><button class="small-btn" type="button" data-product-detail="${esc(p.id)}">Details</button><button class="small-btn" type="button" data-compare="${esc(p.id)}">${state.compare?.has(p.id)?'✓ Compare':'⇄ Compare'}</button></div></article>`).join('');
    renderCompare();
  }
  $('#catalogSearch').addEventListener('input', renderCatalog);
  $('#catalogCategory').addEventListener('change', renderCatalog);
  $('#catalogSort').addEventListener('change', renderCatalog);

  const spinFrames = ['wand-360-frame-01.webp','wand-360-frame-02.webp','wand-360-frame-03.webp','wand-360-frame-04.webp','wand-360-frame-05.webp','wand-360-frame-06.webp','wand-360-frame-07.webp','wand-360-frame-08.webp'];
  const spinNames = ['Front','Front three-quarter','Side quarter','Rear three-quarter','Rear','Rear opposite','Side opposite','Front opposite'];
  let spinIndex = 0, swipeStartX = null;
  function showSpinFrame(index) {
    spinIndex = (index + spinFrames.length) % spinFrames.length;
    const img=$('#spinFrameImage'); img.src=RAW4+spinFrames[spinIndex]; img.alt=`Concept angle ${spinIndex+1} of 8 · ${spinNames[spinIndex]}`;
    $('#spinSlider').value=String(spinIndex); $('#spinViewLabel').textContent=`${String(spinIndex+1).padStart(2,'0')} / 08 · ${spinNames[spinIndex]}`;
  }
  $('#spinPrev').addEventListener('click',()=>showSpinFrame(spinIndex-1));
  $('#spinNext').addEventListener('click',()=>showSpinFrame(spinIndex+1));
  $('#spinSlider').addEventListener('input',e=>showSpinFrame(Number(e.target.value)));
  $('#spinFrameImage').addEventListener('touchstart',e=>{swipeStartX=e.changedTouches[0]?.clientX??null;},{passive:true});
  $('#spinFrameImage').addEventListener('touchend',e=>{if(swipeStartX===null)return;const dx=(e.changedTouches[0]?.clientX??swipeStartX)-swipeStartX;if(Math.abs(dx)>35)showSpinFrame(spinIndex+(dx<0?1:-1));swipeStartX=null;},{passive:true});

  function persistWishlist() { safeWrite(STORAGE.wishlist, [...state.wishlist]); renderHeaderCounts(); }
  function persistBag() { safeWrite(STORAGE.bag, state.bag); renderHeaderCounts(); }
  function renderHeaderCounts() {
    $('#wishCount').textContent = state.wishlist.size;
    $('#bagCount').textContent = state.bag.reduce((n,p)=>n+p.qty,0);
  }
  function toggleSave(id) {
    if (state.wishlist.has(id)) { state.wishlist.delete(id); toast('Removed from saved styles.'); }
    else { state.wishlist.add(id); toast('Saved on this device.'); }
    persistWishlist(); renderCatalog(); renderWishlist();
  }
  function addBag(id, custom = null) {
    const p = products.find(x=>x.id===id);
    if (!p && !custom) return;
    const item = custom || { id:p.id, name:p.name, price:p.price, image:p.image };
    const existing = state.bag.find(x=>x.id===item.id);
    if (existing) existing.qty = Math.min(99, existing.qty+1);
    else state.bag.push({id:item.id,name:item.name,price:Number(item.price)||0,image:item.image,qty:1});
    persistBag(); renderBag(); toast('Added a sample pick to the demo bag.');
  }
  function renderWishlist() {
    const host = $('#wishlistItems');
    const savedProducts = products.filter(p=>state.wishlist.has(p.id));
    const savedCampaigns = campaigns.filter(c=>state.wishlist.has(c.id));
    if (!savedProducts.length && !savedCampaigns.length) { host.innerHTML = '<p class="muted">No saved styles yet. Save a style from Innerwear or Sanskari.</p>'; return; }
    const productRows = savedProducts.map(p=>`<div class="saved-row">${imageHTML(p.image,p.name+' reference')}<div><b>${esc(p.name)}</b><small>Saved on this device · reference only</small><button class="text-btn" type="button" data-product-detail="${esc(p.id)}">View details</button></div><button class="small-btn" type="button" data-save="${esc(p.id)}">Remove</button></div>`);
    const campaignRows = savedCampaigns.map(c=>`<div class="saved-row">${imageHTML(c.image,c.title+' campaign reference')}<div><b>${esc(c.title)}</b><small>Campaign reference · saved on this device</small><button class="text-btn" type="button" data-campaign-open="${esc(c.id)}">View campaign</button></div><button class="small-btn" type="button" data-campaign-save="${esc(c.id)}">Remove</button></div>`);
    host.innerHTML = [...productRows,...campaignRows].join('');
  }
  function renderBag() {
    const host=$('#bagItems');
    if (!state.bag.length) { host.innerHTML='<p class="muted">Your bag is empty. Add a sample pick from Innerwear or a wheel.</p>'; $('#bagSubtotal').textContent='₹0'; return; }
    host.innerHTML=state.bag.map(p=>`<div class="bag-row">${imageHTML(p.image,p.name+' reference')}<div><b>${esc(p.name)}</b><small>₹${Number(p.price).toLocaleString('en-IN')} sample · Qty ${p.qty}</small><div class="button-row"><button class="small-btn" type="button" data-bag-qty="${esc(p.id)}" data-step="-1" aria-label="Decrease ${esc(p.name)} quantity">−</button><button class="small-btn" type="button" data-bag-qty="${esc(p.id)}" data-step="1" aria-label="Increase ${esc(p.name)} quantity">+</button></div></div><button class="small-btn" type="button" data-bag-remove="${esc(p.id)}">Remove</button></div>`).join('');
    const total=state.bag.reduce((sum,p)=>sum+(Number(p.price)||0)*p.qty,0); $('#bagSubtotal').textContent='₹'+total.toLocaleString('en-IN');
  }
  $('#wishlistOpen').addEventListener('click',()=>{renderWishlist();$('#wishlistModal').classList.remove('hidden');});
  $('#bagOpen').addEventListener('click',()=>{renderBag();$('#bagModal').classList.remove('hidden');});
  $('#clearWishlist').addEventListener('click',()=>{state.wishlist.clear();persistWishlist();renderWishlist();renderCatalog();toast('Saved styles cleared.');});
  $('#demoCheckout').addEventListener('click',()=>toast('Demo only: no payment or order was created.'));

  state.compare = new Set();
  function renderCompare() {
    const panel=$('#comparePanel'); const host=$('#compareResults');
    if(!panel||!host)return;
    const items=products.filter(p=>state.compare.has(p.id));
    panel.classList.toggle('hidden',items.length===0);
    if(!items.length){host.innerHTML='';return;}
    host.innerHTML=items.map(p=>`<article class="compare-card">${imageHTML(p.image,p.name+' comparison reference')}<h3>${esc(p.name)}</h3><dl><div><dt>Type</dt><dd>${esc(p.categoryLabel)}</dd></div><div><dt>Sample price</dt><dd>₹${p.price.toLocaleString('en-IN')} · illustrative only</dd></div><div><dt>Material / fabric</dt><dd>Not confirmed</dd></div><div><dt>Size / stock</dt><dd>Not confirmed</dd></div><div><dt>Image status</dt><dd>Reference / concept visual</dd></div></dl><button class="small-btn" type="button" data-compare="${esc(p.id)}">Remove from compare</button></article>`).join('');
  }
  $('#clearCompare').addEventListener('click',()=>{state.compare.clear();renderCatalog();toast('Compare list cleared.');});
  function showProductDetail(id) {
    const p=products.find(x=>x.id===id); if(!p)return;
    $('#campaignModalTitle').textContent=p.name;
    $('#campaignModalImage').src=p.detailImage || p.image;
    $('#campaignModalImage').alt=p.name+' product reference';
    $('#campaignModalDescription').innerHTML=`<p>${esc(p.desc)}</p><p><b>Sample price:</b> ₹${p.price.toLocaleString('en-IN')} — illustrative only.</p><p><b>Product status:</b> Concept/reference; stock, material, sizing and seller information are not verified.</p><div class="button-row"><button class="btn primary" type="button" data-add="${esc(p.id)}">Add demo pick</button><button class="btn ghost" type="button" data-save="${esc(p.id)}">♡ Save style</button></div>`;
    $('#campaignModal').classList.remove('hidden');
  }
  function showCampaign(id) {
    const c=campaigns.find(x=>x.id===id); if(!c)return;
    $('#campaignModalTitle').textContent=c.title; $('#campaignModalImage').src=c.image; $('#campaignModalImage').alt=c.title+' campaign reference'; $('#campaignModalDescription').textContent=c.desc+' Campaign reference only; not verified stock.'; $('#campaignModal').classList.remove('hidden');
  }

  function updateMeasureConversion() {
    const n=Number($('#convertValue').value); const from=$('#convertUnit').value; const out=$('#convertResult');
    if ($('#convertValue').value.trim()==='' || !Number.isFinite(n) || n<0 || n>300) { out.textContent='Enter a value between 0 and 300.'; return; }
    const val=from==='cm'?n/2.54:n*2.54; out.textContent=`${n.toLocaleString(undefined,{maximumFractionDigits:2})} ${from} = ${val.toLocaleString(undefined,{maximumFractionDigits:2})} ${from==='cm'?'in':'cm'}`;
  }
  $('#convertValue').addEventListener('input',updateMeasureConversion);
  $('#convertUnit').addEventListener('change',updateMeasureConversion);
  $$('[data-open-guide]').forEach(b=>b.addEventListener('click',()=>{
    const g=guides[b.dataset.openGuide]; if(!g)return;
    $('#guideModalTitle').textContent=g.title; $('#guideModalBody').innerHTML=g.html; $('#guideModal').classList.remove('hidden');
  }));

  const wheelConfig = {
    boy: { preference:'#boyPreference', experience:null, result:'#boyResult', disc:'[data-wheel-disc="boy"]', rangeLabels:{compact:'10 cm tak · demo range',classic:'10–12 cm · demo range',long:'12–14 cm · demo range',xl:'14+ cm · demo label'}, options:[
      {key:'compact',label:'Chhoti range · 10 cm tak',text:'Land ki measurement sirf ek number hai. Partner ko kya comfortable lagta hai, woh seedha aur bina pressure poochho—andaaza mat lagao.',item:'Boyfriend conversation card'},
      {key:'classic',label:'Beech ki range · 10–12 cm',text:'Aaram se baat karo ki dono ko kya pasand aur comfortable lagta hai. Yeh demo range hai, kisi ki preference ya performance ka prediction nahi.',item:'Couple conversation card'},
      {key:'long',label:'Lambi range · 12–14 cm',text:'Size label ko performance score mat banao. Comfort, communication aur clear boundaries number se zyada important hain.',item:'Private fantasy prompt'},
      {key:'xl',label:'XL label · 14+ cm',text:'XL bas ek label hai; brand aur measurement method ke hisaab se meaning badal sakta hai. Yeh medical category ya recommendation nahi.',item:'Secret date prompt'}
    ]},
    dildo: { preference:'#dildoPreference', experience:'#dildoExperience', result:'#dildoResult', disc:'[data-wheel-disc="dildo"]', options:[
      {key:'compact',label:'Chhota / compact · 8–10 cm (demo)',text:'Dildo ki woh length dekho jo use ke liye bani hai—sirf total length nahi. Sabse chaudi width bhi check karo. Yeh demo range hai, personal recommendation nahi.',item:'Compact size guide card'},
      {key:'regular',label:'Regular · 10–13 cm (demo)',text:'Overall length matlab poore toy ki length; insertable length matlab intended-use wala hissa. Dono alag ho sakte hain. Product ke exact dimensions padho.',item:'Regular size guide card'},
      {key:'long',label:'Lamba · 13–16 cm (demo)',text:'Yeh sirf catalogue filter hai, “best size” nahi. Apne comfort, exact insertable length, width aur manufacturer ke instructions ko dekho.',item:'Longer size guide card'},
      {key:'xl',label:'XL · 16+ cm (demo)',text:'Har brand ka XL ek jaisa nahi. Label dekh kar decide mat karo—usable/insertable length, widest diameter, material aur intended use verify karo.',item:'XL size guide card'}
    ]},
    plug: { preference:'#plugPreference', experience:'#plugExperience', result:'#plugResult', disc:'[data-wheel-disc="plug"]', options:[
      {key:'small',label:'Chhoti width · 2.5 cm tak (demo)',text:'Gand ke opening ko size mein judge mat karo. Anal-use toy ki sabse chaudi width aur usable length check karo; flared base ya safe retrieval stop hona chahiye.',item:'Small size guide card'},
      {key:'medium',label:'Beech ki width · 2.5–3.5 cm (demo)',text:'Label har brand mein same nahi hota. Exact widest diameter, length, material aur suitable lubricant ki guidance verify karo.',item:'Medium size guide card'},
      {key:'large',label:'Badi width · 3.5 cm se zyada (demo)',text:'Yeh sirf demo filter hai, safety guarantee nahi. Kabhi force mat karo; dard ya bleeding ho toh stop karo aur zarurat par medical help lo.',item:'Large size guide card'}
    ]}
  };
  // Each selected size range has at least two content variants to avoid immediate repeats.
  for (const kind of ['boy','dildo','plug']) {
    const original = wheelConfig[kind].options.map((item,index)=>({...item,id:`${kind}-${item.key}-primary-${index}`}));
    const alternateText = kind==='boy'
      ? item => `Is ${item.label.toLowerCase()} ko bas baat shuru karne ka prompt samjho, prediction nahi. Partner se comfort aur pasand poochho—pressure bilkul nahi.`
      : kind==='dildo'
        ? item => `${item.label} dekh kar exact insertable length, sabse chaudi width aur maker ke instructions check karo. Range demo hai, size recommendation nahi.`
        : item => `${item.label} ke liye widest diameter aur usable length verify karo; anal-use toy mein flared base/retrieval stop hona chahiye. Dard ho toh turant stop.`;
    const alternates = original.map((item,index)=>({...item,id:`${kind}-${item.key}-alternate-${index}`,label:`${item.label} · doosra prompt`,text:alternateText(item)}));
    wheelConfig[kind].options = [...original,...alternates];
  }

  const wildPrompts = {
    flirty:[
      'Ek voice note bhejo: ek asli tareef aur ek shararti hint—sirf tab jab saamne wala enjoy kare.',
      'Chhota sa surprise plan karo, phir partner ko guess karne do ki mood kya hai.',
      'Poochho: “Meri kaunsi aadat tumhare chehre par bina koshish ke smile le aati hai?”'
    ],
    double:[
      '“Aaj seedhi baat kam, aankhon ke ishare zyada?” Joke tabhi jab dono ko maza aaye.',
      'Saath mein ek double-meaning caption banao; final line par dono ki haan honi chahiye.',
      'Ek-ek shararti hint do. Agar kisi ko awkward lage toh chutiyapa band—prompt skip.'
    ],
    bold:[
      'Aaj date ka plan ek tum banao, agla partner. Final plan dono ko manzoor hona chahiye.',
      'Ek confident tareef do, par body insecurity ya purane dard par taana nahi.',
      '10 minute phone side rakho aur ek honest sawaal poochho—jawab dena optional.'
    ],
    spicy:[
      'Playlist lagao aur poochho: “Aaj ka mood cosy, filmy ya thoda shararti?”',
      'Slow-burn date plan karo, par end time aur ghar jaane ka option pehle clear rakho.',
      'Poochho: “Aaj ki shaam tumhare liye special aur comfortable kaise banegi?”'
    ],
    fantasy:[
      'Ek fictional date-night setting socho. Roleplay se pehle boundaries aur pause word decide karo.',
      'First-date roleplay mein mystery character banao; dono mein se koi bhi kabhi bhi pause bol sakta hai.',
      'Do line ki romantic kahani banao—ek line tum, agali partner. Jo comfortable nahi, woh skip.'
    ],
    truth:[
      'Truth: kaunsi chhoti si harkat tumhe sabse zyada valued feel karati hai?',
      'Dare: partner ke naam ek gaana chuno aur batao kyun yaad aaya.',
      'Truth: ek boundary batao jisse tum relaxed aur respected feel karte ho. Pass allowed hai.'
    ],
    confession:[
      'Ek achhi baat batao jo kehne mein thodi sharam aati thi—sirf jab ready ho.',
      'Yeh line complete karo: “Hum dono ke beech mujhe ek cheez sabse achhi lagti hai…”',
      'Secret share karne se pehle poochho. “Nahi” ya “abhi nahi” par koi sawaal-jawaab nahi.'
    ],
    boyfriend:[
      'Partner ne jo cheez pasand batayi thi, usi par based date plan karo—dhyaan bhi romance hai.',
      'Ek specific tareef bhejo jo dil se ho; fake buttering nahi, genuine baat.',
      'Poochho: “Is hafte meri taraf se kaunsa support tumhe achha lagega?”'
    ],
    private:[
      'Ek curiosity aur ek clear boundary par baat karo. Kisi ko explain karna zaroori nahi—pass allowed.',
      'Poochho: “Kis cheez se tumhe sach bolna safe lagta hai?”',
      'Game ke liye pause word rakho. Dono mein se koi bhi kabhi bhi game rok sakta hai.'
    ],
    dark:[
      'Band haveli, aadhi raat aur note: “Madam, raaz kholun ya pehle tumhari gaali khaun?” Heroine bole: “Saale, pehle sach bol, phir drama kar.” Har agla qadam uski marzi se.',
      'Secret admirer ke teen clues banao—par sirf us partner ke liye jo khud khelna chahe. Zabardasti ka natak nahi; mana kare toh poora harami game band.',
      'Hero bole: “Raat ka raaz khulega, par tumhari haan ke bina ek kadam nahi.” Heroine: “Bas, ab baat bani—warna tera saara attitude chutiyapa tha.”',
      'Masked stranger poochhe: “Tum muskura rahi ho ya meri barbaadi ka plan bana rahi ho?” Heroine: “Dono, harami—par agla qadam meri marzi se.”',
      'Heroine bole: “Mujhe dark romance chahiye, zabardasti ka natak nahi. Drama tez rakh, boundaries usse tez.” Is dialogue se mystery scene banao.'
    ]
  };
  const wildCategoryNames = {flirty:'Flirty aur Teasing',double:'Gande Double Meanings',bold:'Bold Couple Challenges',spicy:'Romantic par Spicy',fantasy:'Wild Fantasy Prompts',truth:'Couples Truth ya Dare',confession:'Secret Crush aur Confessions',boyfriend:'Boyfriend Challenges',private:'Private Fantasy Conversations',dark:'Andheri Raat · Dark Romance'};
  function randomInt(max){return Math.floor(Math.random()*max);}
  function chooseDifferent(items, key) {
    if (!items.length) return null;
    const identity = item => typeof item === 'string' ? item : (item.id || item.text || item.key || JSON.stringify(item));
    const prior=state.lastWheelChoice[key];
    let options=items.filter(item=>identity(item)!==prior);
    if (!options.length) options=items;
    const picked=options[randomInt(options.length)]; state.lastWheelChoice[key]=identity(picked); return picked;
  }
  function setWheelResult(kind, title, description, meta, includeBag = false) {
    const cfg=wheelConfig[kind]; const host=kind==='wild'?$('#wildResult'):$(cfg.result);
    host.innerHTML=`<strong>${esc(title)}</strong><span>${esc(description)}</span>${meta?`<span class="result-meta">${esc(meta)}</span>`:''}<div class="button-row"><button class="small-btn" type="button" data-wheel-retry="${esc(kind)}">Phir se ghumao</button>${includeBag?`<button class="small-btn" type="button" data-wheel-add="${esc(kind)}" data-wheel-name="${esc(title)}">Demo pick bag mein add karo</button>`:''}</div>`;
  }
  function spinWheel(kind) {
    const disc=$(`[data-wheel-disc="${kind}"]`);
    if (!disc) return;
    const token=(state.wheelTokens[kind]||0)+1; state.wheelTokens[kind]=token;
    if(state.wheelTimers[kind]) clearTimeout(state.wheelTimers[kind]);
    let title='', description='', meta='', includeBag=false;
    if(kind==='wild'){
      const category=$('#wildCategory').value; const prompt=chooseDifferent(wildPrompts[category]||wildPrompts.flirty,`wild-${category}`);
      title=wildCategoryNames[category]||'Dirty/Wild prompt';description=prompt;meta='OPTIONAL · PEHLE HAAN · KABHI BHI SKIP KARO';
    } else {
      const cfg=wheelConfig[kind]; const preference=$(cfg.preference).value; const experience=cfg.experience?$(cfg.experience).value:null;
      if(!preference){toast('Pehle ek demo range select karo.');return;}
      let options=cfg.options;
      if(preference!=='surprise') options=options.filter(x=>x.key===preference);
      if(experience==='new' && preference==='surprise') options=options.slice(0,Math.min(2,options.length));
      const item=chooseDifferent(options,kind);
      if(!item){toast('Result nahi mila. Phir se try karo.');return;}
      title=item.label;description=item.text;meta=kind==='boy'?'SIRF FUN FILTER · KOI PREDICTION NAHI':'SIRF REFERENCE · ASLI PRODUCT KI DIMENSIONS CHECK KARO';includeBag=kind!=='boy';
    }
    state.diagnostic.wheelSpins++;
    disc.style.transform=`rotate(${1900+randomInt(1400)}deg)`;
    const buttons=$$(`[data-spin-wheel="${kind}"]`); buttons.forEach(b=>{b.disabled=true;b.dataset.oldLabel=b.textContent;b.textContent='Ghoom raha hai…';});
    const host=kind==='wild'?$('#wildResult'):$(wheelConfig[kind].result);host.innerHTML='<span>Wheel ghoom raha hai…</span>';
    state.wheelTimers[kind]=setTimeout(()=>{
      if(state.wheelTokens[kind]!==token)return;
      setWheelResult(kind,title,description,meta,includeBag);
      buttons.forEach(b=>{b.disabled=false;b.textContent=b.dataset.oldLabel||`Spin ${kind==='wild'?'Dirty/Wild':'my wheel'}`;});
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches?40:1800);
  }
  $$('[data-spin-wheel]').forEach(b=>b.addEventListener('click',()=>spinWheel(b.dataset.spinWheel)));
  function resetWheel(kind) {
    state.wheelTokens[kind]=(state.wheelTokens[kind]||0)+1;
    if(state.wheelTimers[kind])clearTimeout(state.wheelTimers[kind]);
    const disc=$(`[data-wheel-disc="${kind}"]`); if(disc)disc.style.transform='rotate(0deg)';
    $$(`[data-spin-wheel="${kind}"]`).forEach(b=>{b.disabled=false;if(b.dataset.oldLabel){b.textContent=b.dataset.oldLabel;delete b.dataset.oldLabel;}});
    if(kind==='wild')$('#wildResult').textContent='Round reset. Category chuno aur jab ready ho tab wheel ghumao.';
    else $(wheelConfig[kind].result).textContent=kind==='boy'?'Pehle ek demo range select karo.':'Pehle demo range select karo.';
    delete state.lastWheelChoice[kind];
    if(kind==='wild')Object.keys(wildPrompts).forEach(k=>delete state.lastWheelChoice[`wild-${k}`]);
  }
  $$('[data-wheel-reset]').forEach(b=>b.addEventListener('click',()=>resetWheel(b.dataset.wheelReset)));

  const dates = {
    cozy:{low:'Make chai or coffee at home, choose a comfort film and each pick one snack.',medium:'Try a quiet café, then take an easy sunset walk.',high:'Book a calm dinner spot and plan a small handwritten note.'},
    playful:{low:'Have a two-song dance break and a silly quiz night at home.',medium:'Visit a board-game café or try a new street-food spot.',high:'Choose an activity neither of you has tried, with an easy plan B.'},
    creative:{low:'Draw each other in five minutes and trade the sketches.',medium:'Visit a craft market or make a shared playlist in a café.',high:'Take a short workshop together—pottery, cooking or photography.'},
    outdoors:{low:'Walk a familiar park route and bring water from home.',medium:'Explore a public garden and stop for chai.',high:'Plan a day trip with transport, weather and rest breaks checked first.'}
  };
  $('#makeDate').addEventListener('click',()=>{
    const mood=$('#dateMood').value,budget=$('#dateBudget').value; const result=dates[mood]?.[budget]||dates.cozy.low;
    $('#dateResult').textContent=result+' Ask your partner if this plan suits them before booking.';
  });
  const messages = {
    sweet:{invite:'Want to make an ordinary day feel a little special together? Pick a time that works for you.',compliment:'Something about the way you care makes even a normal day feel lighter.',secret:'Can I ask you a personal question? No pressure to answer if it feels too private.'},
    teasing:{invite:'I have a tiny plan and a very serious question: chai first or a little adventure first?',compliment:'You keep distracting me from my to-do list. I might have to schedule you in.',secret:'I have one playful thought to share—only if you are in the mood for it.'},
    bold:{invite:'I would love to take you out this week. Which day and kind of plan would you enjoy?',compliment:'I admire your confidence. It is one of the things I notice first.',secret:'I want us to be able to talk openly about what we like and what our boundaries are.'},
    mysterious:{invite:'Keep one evening open for a little mystery. We can choose the plan together.',compliment:'There is a little detail about you I keep noticing—and I will tell you over our next coffee.',secret:'I have a question saved for a quiet moment. You can say pass, of course.'}
  };
  $('#makeMessage').addEventListener('click',()=>{state.currentMessage=messages[$('#messageTone').value]?.[$('#messageMoment').value]||messages.sweet.invite;$('#messageResult').textContent=state.currentMessage;});
  $('#copyMessage').addEventListener('click',async()=>{
    if(!state.currentMessage){toast('Create a message first.');return;}
    try{await navigator.clipboard.writeText(state.currentMessage);toast('Message copied.');}
    catch{const area=document.createElement('textarea');area.value=state.currentMessage;document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();toast(ok?'Message copied.':'Copy not available in this browser.');}
  });

  $('#saveSanskariBanner').addEventListener('click',()=>{
    const id='navy-sanskari';if(state.wishlist.has(id)){state.wishlist.delete(id);$('#saveSanskariBanner').textContent='♡ Save this edit';}else{state.wishlist.add(id);$('#saveSanskariBanner').textContent='♥ Edit saved';}persistWishlist();renderWishlist();
  });
  $('#resetCatalog')?.addEventListener('click',()=>{ $('#catalogSearch').value='';$('#catalogCategory').value='all';$('#catalogSort').value='featured';renderCatalog(); });

  $('#saveFit').addEventListener('click',()=>{const note=$('#fitNotes').value.slice(0,3000);$('#fitNotes').value=note;const ok=safeWrite(STORAGE.fitNotes,note);$('#fitSaved').textContent=ok?'Saved in this browser on this device.':'Browser storage is unavailable; notes were not saved.';});
  $('#clearFit').addEventListener('click',()=>{try{localStorage.removeItem(STORAGE.fitNotes);}catch{}$('#fitNotes').value='';$('#fitSaved').textContent='Notes cleared.';toast('Fit notes cleared.');});
  $('#fitNotes').value=String(safeRead(STORAGE.fitNotes,'' )||'');
  function clearPhoto(){if(state.currentPhotoUrl){URL.revokeObjectURL(state.currentPhotoUrl);state.currentPhotoUrl=null;}$('#photoPreview').removeAttribute('src');$('#photoPreview').classList.add('hidden');$('#fitPhotoUpload').value='';$('#photoStatus').textContent='No photo selected.';}
  $('#fitPhotoUpload').addEventListener('change',()=>{
    const file=$('#fitPhotoUpload').files?.[0];if(!file){clearPhoto();return;}
    if(!file.type.startsWith('image/')){toast('Choose an image file.');clearPhoto();return;}
    if(file.size>12*1024*1024){toast('Choose an image smaller than 12 MB.');clearPhoto();return;}
    if(state.currentPhotoUrl)URL.revokeObjectURL(state.currentPhotoUrl);
    state.currentPhotoUrl=URL.createObjectURL(file);$('#photoPreview').src=state.currentPhotoUrl;$('#photoPreview').classList.remove('hidden');$('#photoStatus').textContent='Local preview only; this page does not upload the photo.';
  });
  $('#clearPhoto').addEventListener('click',clearPhoto);

  function closeModal(id){const modal=$('#'+id);if(modal)modal.classList.add('hidden');}
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));
  $$('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.add('hidden');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.overlay:not(.hidden)').forEach(o=>o.classList.add('hidden'));});

  document.addEventListener('click', e => {
    const target=e.target instanceof Element?e.target:null;if(!target)return;
    const save=target.closest('[data-save]');if(save){toggleSave(save.dataset.save);return;}
    const add=target.closest('[data-add]');if(add){addBag(add.dataset.add);return;}
    const detail=target.closest('[data-product-detail]');if(detail){showProductDetail(detail.dataset.productDetail);return;}
    const campaign=target.closest('[data-campaign-open]');if(campaign){showCampaign(campaign.dataset.campaignOpen);return;}
    const campaignSave=target.closest('[data-campaign-save]');if(campaignSave){const id=campaignSave.dataset.campaignSave;if(state.wishlist.has(id)){state.wishlist.delete(id);toast('Campaign removed from saved styles.');}else{state.wishlist.add(id);toast('Campaign saved on this device.');}persistWishlist();renderWishlist();return;}
    const compare=target.closest('[data-compare]');if(compare){const id=compare.dataset.compare;if(state.compare.has(id)){state.compare.delete(id);}else if(state.compare.size>=3){toast('Compare up to three items at a time.');return;}else{state.compare.add(id);}renderCatalog();if(state.compare.size){const names=products.filter(p=>state.compare.has(p.id)).map(p=>p.name).join(' · ');toast('Compare list: '+names);}return;}
    const qty=target.closest('[data-bag-qty]');if(qty){const p=state.bag.find(x=>x.id===qty.dataset.bagQty);if(p){p.qty=Math.max(1,Math.min(99,p.qty+Number(qty.dataset.step)));persistBag();renderBag();}return;}
    const remove=target.closest('[data-bag-remove]');if(remove){state.bag=state.bag.filter(p=>p.id!==remove.dataset.bagRemove);persistBag();renderBag();toast('Removed sample pick.');return;}
    const reset=target.closest('#resetCatalog');if(reset){$('#catalogSearch').value='';$('#catalogCategory').value='all';$('#catalogSort').value='featured';renderCatalog();return;}
    const wheelAdd=target.closest('[data-wheel-add]');if(wheelAdd){const kind=wheelAdd.dataset.wheelAdd;const name=wheelAdd.dataset.wheelName||'Wheel result demo card';const id=`wheel-${kind}-${Date.now()}`;const image=kind==='boy'?RAW3+'companion-cafe.webp':RAW4+'wellness-app-reference.webp';addBag(id,{id,name:name+' (demo)',price:kind==='boy'?0:599,image});return;}
    const retry=target.closest('[data-wheel-retry]');if(retry){spinWheel(retry.dataset.wheelRetry);return;}
  });

  // Phase 5: complete asset archive. Images remain linked to their exact public source paths;
  // the gallery does not invent a replacement photo or turn a reference into a verified SKU.
  // Phase 6: image records load from the separate same-origin JSON manifest.
  // This avoids duplicating ~60 KB of metadata in app.js and limits initial DOM work.
  const imageLibrary = [];
  const imageLibraryState = { ready:false, loading:false, scheduled:false, error:'', timedOut:false, invalidRecords:0, visibleLimit:8, batchSize:8, matching:[], controlsBound:false };
  const allowedImageRepos = new Set(['Brand-website-4f','Brand-website-3','Brand-website-full-finally-']);
  function isAllowedImageRecord(item) {
    if (!item || typeof item !== 'object') return false;
    if (![item.id,item.source_repo,item.filename,item.category,item.title,item.src].every(v => typeof v === 'string' && v.length > 0 && v.length <= 800)) return false;
    if (!allowedImageRepos.has(item.source_repo)) return false;
    try {
      const url = new URL(item.src);
      return url.protocol === 'https:' && url.hostname === 'raw.githubusercontent.com' &&
        url.username === '' && url.password === '' &&
        url.pathname.startsWith(`/bhanu13yadav1-ai/${item.source_repo}/main/`) &&
        url.pathname.split('/').length === 5 && !url.pathname.includes('..');
    } catch { return false; }
  }
  function imageCardHTML(item) {
    return `<article class="image-library-card" data-library-id="${esc(item.id)}" style="content-visibility:auto;contain-intrinsic-size:360px"><a class="image-library-media" href="${esc(item.src)}" target="_blank" rel="noopener noreferrer" title="Open original source: ${esc(item.filename)}"><img src="${esc(item.src)}" data-original-src="${esc(item.src)}" alt="${esc(item.title)} · ${esc(item.category)} · image reference" loading="lazy" decoding="async" fetchpriority="low" width="600" height="720" data-library-image><span class="image-open-label">Open original ↗</span></a><div class="image-library-copy"><span class="kicker">${esc(item.category)}</span><h3>${esc(item.title)}</h3><p>${esc(item.filename)}</p><small>Source: ${esc(item.source_repo)}</small><p class="image-source-status" hidden role="status">Original file did not load. The record remains in the collection.</p><div class="image-library-actions"><a class="small-btn" href="${esc(item.src)}" target="_blank" rel="noopener noreferrer">Open source</a><button class="small-btn" type="button" data-image-retry="${esc(item.id)}">Retry image</button></div><p class="image-library-note">${esc(item.notes)}</p></div></article>`;
  }
  function scheduleImageLibraryInit() {
    if (imageLibraryState.ready || imageLibraryState.loading || imageLibraryState.scheduled) return;
    imageLibraryState.scheduled = true;
    const startWhenIdle = () => {
      if (document.querySelector('#view-innerwear')?.classList.contains('active') !== true) {
        imageLibraryState.scheduled = false;
        return;
      }
      const start = () => {
        imageLibraryState.scheduled = false;
        if (document.querySelector('#view-innerwear')?.classList.contains('active')) initImageLibrary();
      };
      if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 900 });
      else window.setTimeout(start, 160);
    };
    // Ensure one paint between the navigation tap and the JSON / gallery rendering work.
    if ('requestAnimationFrame' in window) requestAnimationFrame(() => window.setTimeout(startWhenIdle, 0));
    else window.setTimeout(startWhenIdle, 80);
  }

  function renderImageLibrary(append = false) {
    const host = $('#imageLibraryGrid'); if (!host) return;
    if (!imageLibraryState.ready) {
      if (!imageLibraryState.loading && imageLibraryState.error) {
        host.innerHTML = `<div class="empty-state"><b>Image index could not be loaded.</b><p>${esc(imageLibraryState.error)}</p><button class="btn ghost" type="button" id="retryImageLibrary">Retry loading the local image index</button></div>`;
      } else if (!append) host.innerHTML = '<p class="muted">Loading image index…</p>';
      $('#loadMoreLibrary').hidden = true;
      return;
    }
    const query = ($('#imageLibrarySearch')?.value || '').trim().toLowerCase();
    const category = $('#imageLibraryCategory')?.value || 'all';
    const sort = $('#imageLibrarySort')?.value || 'source';
    let list = imageLibrary.filter(item => (category === 'all' || item.category === category) && `${item.title} ${item.category} ${item.filename} ${item.source_repo}`.toLowerCase().includes(query));
    if (sort === 'name') list.sort((a,b) => a.title.localeCompare(b.title));
    if (sort === 'category') list.sort((a,b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
    imageLibraryState.matching = list;
    if (!append) {
      imageLibraryState.visibleLimit = imageLibraryState.batchSize;
      host.textContent = '';
    }
    const from = append ? host.querySelectorAll('.image-library-card').length : 0;
    const until = Math.min(imageLibraryState.visibleLimit, list.length);
    host.insertAdjacentHTML('beforeend', list.slice(from,until).map(imageCardHTML).join(''));
    host.querySelectorAll('[data-library-image]:not([data-listeners-bound])').forEach(img => {
      img.dataset.listenersBound = '1';
      img.addEventListener('load', () => { if (img.dataset.fallbackDone !== '1') img.dataset.sourceStatus = 'loaded'; });
      img.addEventListener('error', () => { img.dataset.sourceStatus = 'failed'; });
    });
    const rendered = host.querySelectorAll('.image-library-card').length;
    $('#imageLibraryCount').textContent = `Showing ${rendered} of ${list.length} matching records · ${imageLibrary.length} total indexed`;
    $('#imageLibraryStatus').textContent = list.length ? `Showing ${rendered} of ${list.length} matching image records.` : 'No image records match these filters.';
    const more = $('#loadMoreLibrary');
    more.hidden = rendered >= list.length;
    more.textContent = `Load next ${Math.min(imageLibraryState.batchSize, list.length-rendered)} images (${list.length-rendered} remaining)`;
    if (imageLibraryState.invalidRecords) {
      $('#imageLibrarySourceCount').textContent = `${imageLibrary.length} valid source records across ${new Set(imageLibrary.map(x=>x.source_repo)).size} repositories. ${imageLibraryState.invalidRecords} manifest records were rejected because their source URL did not match the allowlist.`;
    } else {
      $('#imageLibrarySourceCount').textContent = `${imageLibrary.length} indexed file records across ${new Set(imageLibrary.map(x=>x.source_repo)).size} public source repositories. A record does not necessarily represent a unique photograph.`;
    }
  }
  async function initImageLibrary() {
    const select = $('#imageLibraryCategory'); if (!select) return;
    if (imageLibraryState.ready || imageLibraryState.loading) return;
    if (!imageLibraryState.controlsBound) {
      imageLibraryState.controlsBound = true;
      $('#imageLibrarySearch').addEventListener('input',()=>renderImageLibrary(false));
      select.addEventListener('change',()=>renderImageLibrary(false));
      $('#imageLibrarySort').addEventListener('change',()=>renderImageLibrary(false));
      $('#loadMoreLibrary').addEventListener('click',()=>{
        imageLibraryState.visibleLimit += imageLibraryState.batchSize;
        renderImageLibrary(true);
      });
      document.addEventListener('click',event=>{
        const target=event.target instanceof Element?event.target:null;
        if (target?.closest('#retryImageLibrary')) { imageLibraryState.error=''; initImageLibrary(); }
        if (target?.closest('#resetImageLibrary')) { $('#imageLibrarySearch').value=''; $('#imageLibraryCategory').value='all'; $('#imageLibrarySort').value='source'; renderImageLibrary(false); }
      });
    }
    imageLibraryState.loading=true;
    imageLibraryState.timedOut=false;
    imageLibraryState.error='';
    $('#imageLibrarySourceCount').textContent='Loading image records from the local manifest…';
    const requestController = typeof AbortController === 'function' ? new AbortController() : null;
    let requestTimedOut = false;
    let requestTimeout = null;
    const timeoutPromise = new Promise((_, reject) => {
      requestTimeout = window.setTimeout(() => {
        requestTimedOut = true;
        if (requestController) requestController.abort();
        reject(new Error('Image manifest request timed out after 10 seconds.'));
      }, 10000);
    });
    try {
      const requestOptions={cache:'default',credentials:'same-origin'};
      if (requestController) requestOptions.signal=requestController.signal;
      const response=await Promise.race([fetch('./innerwear-image-library.json',requestOptions), timeoutPromise]);
      if (!response.ok) throw new Error(`Image manifest returned HTTP ${response.status}`);
      const rows=await response.json();
      if (!Array.isArray(rows)) throw new Error('Image manifest must contain a JSON array.');
      const valid=rows.filter(isAllowedImageRecord);
      imageLibraryState.invalidRecords=rows.length-valid.length;
      imageLibrary.splice(0,imageLibrary.length,...valid);
      if (!imageLibrary.length) throw new Error('No valid source records were available after URL validation.');
      const groups=[...new Set(imageLibrary.map(x=>x.category))].sort((a,b)=>a.localeCompare(b));
      select.insertAdjacentHTML('beforeend',groups.map(group=>`<option value="${esc(group)}">${esc(group)}</option>`).join(''));
      imageLibraryState.ready=true;
      imageLibraryState.error='';
      renderImageLibrary(false);
    } catch(error) {
      imageLibraryState.timedOut=requestTimedOut||!!(requestController && requestController.signal.aborted);
      imageLibraryState.error=imageLibraryState.timedOut
        ? 'Image index request timed out after 10 seconds. The rest of the website is still available; tap Retry to try again.'
        : String(error?.message||error);
      // Clear the loading flag before renderImageLibrary so it shows the retry state instead of the spinner.
      imageLibraryState.loading=false;
      state.diagnostic.errors.push('Image manifest: '+imageLibraryState.error);
      renderImageLibrary(false);
    } finally {
      if (requestTimeout !== null) window.clearTimeout(requestTimeout);
      imageLibraryState.loading=false;
    }
  }

  // Wellness measurement helper: validate and summarize measurements, but never guess a size
  // until an owner-approved BLACKED chart for the exact product is configured.
  const measurementFields = [
    {id:'measureBust',key:'bust',label:'Bust / fullest part'},
    {id:'measureUnderbust',key:'underbust',label:'Underbust / ribcage'},
    {id:'measureWaist',key:'waist',label:'Natural waist'},
    {id:'measureHips',key:'hips',label:'Fullest hips'}
  ];
  const requiredMeasurements = {bra:['bust','underbust'],briefs:['waist','hips'],bodysuit:['bust','underbust','waist','hips']};
  function readMeasurements() {
    const unit = $('#measurementUnit').value;
    const garment = $('#measurementGarment').value;
    const values = {}; const errors = [];
    for (const field of measurementFields) {
      const raw = $('#'+field.id).value.trim();
      if (!raw) { values[field.key] = null; continue; }
      const number = Number(raw);
      const max = unit === 'cm' ? 220 : 86.6;
      if (!Number.isFinite(number) || number < (unit === 'cm' ? 20 : 7.9) || number > max) { errors.push(`${field.label} must be between ${unit==='cm'?'20–220 cm':'7.9–86.6 in'}.`); values[field.key] = null; continue; }
      values[field.key] = Math.round((unit === 'cm' ? number : number * 2.54) * 10) / 10;
    }
    const required = requiredMeasurements[garment] || [];
    const missing = required.filter(key => values[key] === null);
    return {unit,garment,values,errors,missing,valid:errors.length===0 && missing.length===0};
  }
  function renderMeasurementSummary() {
    const out = $('#measurementSummary'); const status = $('#measurementStatus');
    const result = readMeasurements();
    if (result.errors.length) { out.innerHTML = `<p class="error-text">${result.errors.map(esc).join('<br>')}</p>`; status.textContent = 'Please correct the highlighted measurement range and try again.'; return false; }
    if (result.missing.length) {
      const labels = result.missing.map(key=>measurementFields.find(f=>f.key===key)?.label||key);
      out.innerHTML = `<p class="error-text">For this garment type, enter: ${labels.map(esc).join(', ')}.</p><p class="muted">Other fields are optional for this worksheet.</p>`;
      status.textContent = 'More measurements are needed before a summary can be made.'; return false;
    }
    const labels = measurementFields.filter(f=>result.values[f.key]!==null).map(f=>`<div class="measurement-output-row"><dt>${esc(f.label)}</dt><dd>${result.values[f.key].toFixed(1)} cm <span>(${0})</span></dd></div>`);
    // Keep the unit conversion explicit and round only for display.
    const valueRows = measurementFields.filter(f=>result.values[f.key]!==null).map(f=>`<div class="measurement-output-row"><dt>${esc(f.label)}</dt><dd>${result.values[f.key].toFixed(1)} cm <span>· ${(result.values[f.key]/2.54).toFixed(1)} in</span></dd></div>`).join('');
    const garmentLabel = {bra:'Bra / bralette',briefs:'Briefs / underwear',bodysuit:'Bodysuit / set'}[result.garment];
    out.innerHTML = `<p><b>${esc(garmentLabel)} worksheet</b></p><dl class="measurement-output-list">${valueRows}</dl><p class="muted">Measurements are recorded as a summary only. The exact product size cannot be calculated because no verified BLACKED chart is configured.</p>`;
    status.textContent = 'Summary created in this page only. It has not been uploaded or saved.';
    return true;
  }
  function initMeasurementTools() {
    if (!$('#measurementForm')) return;
    $('#buildMeasurementSummary').addEventListener('click',renderMeasurementSummary);
    $('#measurementGarment').addEventListener('change',()=>{$('#measurementSummary').innerHTML='<p class="muted">Review measurements for the selected garment type.</p>';});
    let previousMeasurementUnit = $('#measurementUnit').value;
    $('#measurementUnit').addEventListener('change',()=>{
      const nextUnit = $('#measurementUnit').value;
      if (nextUnit === previousMeasurementUnit) return;
      const factor = previousMeasurementUnit === 'cm' ? (1 / 2.54) : 2.54;
      let converted = 0;
      measurementFields.forEach(field => {
        const input = $('#'+field.id); const raw = input.value.trim();
        if (!raw) return;
        const value = Number(raw);
        if (!Number.isFinite(value)) return;
        input.value = String(Math.round(value * factor * 10) / 10);
        converted += 1;
      });
      previousMeasurementUnit = nextUnit;
      $('#measurementSummary').innerHTML = '<p class="muted">Units changed and filled values were converted. Review measurements again.</p>';
      $('#measurementStatus').textContent = converted
        ? `Converted ${converted} filled measurement(s) to ${nextUnit === 'cm' ? 'centimetres' : 'inches'}. Review the summary before saving.`
        : 'Units changed. No filled measurements needed converting.';
    });
    $('#clearMeasurementSummary').addEventListener('click',()=>{measurementFields.forEach(f=>$('#'+f.id).value='');$('#measurementSummary').innerHTML='<p class="muted">Enter the relevant measurements and select “Review measurements”.</p>';$('#measurementStatus').textContent='Fields cleared.';});
    $('#saveMeasurements').addEventListener('click',()=>{
      if (!$('#saveMeasurementsOptIn').checked) { $('#measurementStatus').textContent='Saving is off. Tick “Save these measurements on this device only” to opt in.'; return; }
      if (!renderMeasurementSummary()) return;
      const data = readMeasurements(); const payload={version:1,garment:data.garment,measurementsCm:data.values,updatedAt:new Date().toISOString()};
      const ok=safeWrite('blackedV1MeasurementsOptIn',payload);
      $('#measurementStatus').textContent=ok?'Measurements saved locally on this device because you opted in. They are not encrypted and are not synced.':'Browser storage is unavailable; measurements were not saved.';
    });
    $('#clearSavedMeasurements').addEventListener('click',()=>{try{localStorage.removeItem('blackedV1MeasurementsOptIn')}catch{}$('#measurementStatus').textContent='Saved measurements removed from this browser storage.';toast('Saved measurements deleted.');});
    $('#fitCueExplain').addEventListener('click',()=>{
      const guidance={
        band:'If the back band rides up, recheck that the band is level and comfortably snug. Some fit guides suggest trying a different band/cup combination, but do not use a universal conversion; compare the exact brand chart or consult a trained fitter.',
        'cup-spill':'Spillage can be a sign that the cup shape or volume is not matching this garment. Try the maker’s fit guide and check a different cup style/size only within that brand’s system.',
        'cup-gap':'Gapping may relate to cup shape, style, strap adjustment or cup volume. A different cut may fit better; do not assume one fixed size conversion works across brands.',
        strap:'Adjust straps so they stay in place without digging in. If they still slip or dig, reassess band fit and strap placement; persistent pain is not something to push through.',
        wire:'An underwire should not pinch or sit directly on breast tissue. Stop wearing a garment that causes pain or skin injury; try a different shape/size through the maker’s chart or get a fitting assessment.',
        brief:'A brief waistband or leg opening that digs in may be too tight or a shape mismatch. Check both waist and hip measurements against that exact product’s chart and choose comfort over the label.',
        bodysuit:'Pulling, gaps or restricted movement may reflect torso length, cut or the size range. Check the product-specific chart and return/fit policy; do not rely only on a size name.'
      };
      $('#fitCueResult').textContent=guidance[$('#fitConcern').value]||'Use the exact product chart and seek help if pain or skin irritation persists.';
    });
  }
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null; if(!target)return;
    const retry=target.closest('[data-image-retry]'); if(retry){
      const card=retry.closest('.image-library-card');const img=card?.querySelector('[data-library-image]');if(!img)return;
      const source=img.dataset.originalSrc||img.getAttribute('data-original-src');if(!source)return;
      img.dataset.fallbackDone='';img.dataset.sourceStatus='retrying';img.src=source+(source.includes('?')?'&':'?')+'retry='+Date.now();
      const status=card.querySelector('.image-source-status');if(status){status.hidden=true;status.textContent='Retrying the original image…';}
      return;
    }
    const resetLibrary=target.closest('#resetImageLibrary');if(resetLibrary){$('#imageLibrarySearch').value='';$('#imageLibraryCategory').value='all';$('#imageLibrarySort').value='source';renderImageLibrary();return;}
  });

  function validateAssetURLs() {
    const assets=[RAW4+'hero-model-crop.webp',RAW4+'look-black-lace.webp',RAW4+'look-sanskari-blue.webp',RAW4+'sanskari-ankhein.webp',RAW4+'sanskari-entry.webp',RAW4+'sanskari-mirror.webp',RAW4+'sanskari-pallu.webp',RAW4+'sanskari-raat.webp',RAW3+'companion-cafe.webp',RAW3+'companion-event.webp'];
    return assets;
  }
  function getDiagnostics() {
    return {
      version:'V1 Part A — Story Foundation',
      loaded:document.readyState==='complete'||document.readyState==='interactive',
      views:$$('.view').map(v=>({name:v.dataset.view,exists:true,visible:!v.hidden})),
      sexStoriesView:!!$('#view-stories'),
      sexStoriesCount:storyLibrary.length,
      storySeriesCount:Object.keys(storySeries).length,
      storySeriesControls:!!$('#storySeriesControls'),
      storyVaultEnabled:storyVault.enabled,
      storyVaultOptIn:!!$('#storyVaultOptIn'),
      storyVaultBookmarkCount:storyVault.bookmarks.length,
      desiSizeGuide:!!$('#desiSizeGuideTitle') && !!$('#dildoPreference') && !!$('#plugPreference'),
      storyLanguages:[...new Set(storyLibrary.map(s=>s.language||'en'))],
      dirtyPoll:!!$('#dirtyPollResult')&&$$('[data-dirty-pick]').length===3,
      storyLanguageFilter:!!$('#storyLanguage'),
      storySort:!!$('#storySort'),
      sexStoriesFilters:!!$('#storySearch')&&!!$('#storyCategory')&&$$('[data-story-filter]').length===6,
      storyModal:!!$('#storyModal')&&!!$('#storyModalTitle')&&!!$('#storyModalBody'),
      nextUpdateSpotlight:document.body.textContent.includes('MORE DIRTY')&&document.body.textContent.includes('HORNY GIRLS'),
      navButtons:$$('[data-view-link]').length,
      productCount:products.length,
      campaignCount:campaigns.length,
      imageLibraryReady:imageLibraryState.ready,
      imageLibraryLoading:imageLibraryState.loading,
      imageLibraryError:imageLibraryState.error,
      imageLibraryTimedOut:imageLibraryState.timedOut,
      imageLibraryBatchSize:imageLibraryState.batchSize,
      imageLibraryInitScheduled:imageLibraryState.scheduled,
      inactiveViewImagesDeferred:imageDeferralState.deferred,
      inactiveViewImageObserver:imageDeferralState.observerActive,
      innerwearCatalogBeforeArchive:!!($('#catalogGrid') && $('#imageLibraryGrid') && ($('#catalogGrid').compareDocumentPosition($('#imageLibraryGrid')) & Node.DOCUMENT_POSITION_FOLLOWING)),
      imageLibraryCount:imageLibrary.length,
      imageLibraryMatching:imageLibraryState.matching.length,
      imageLibraryRendered:$('#imageLibraryGrid')?.querySelectorAll('.image-library-card').length || 0,
      imageLibraryLoadMoreAvailable:!!$('#loadMoreLibrary') && !$('#loadMoreLibrary').hidden,
      invalidImageManifestRecords:imageLibraryState.invalidRecords,
      wellnessMeasurementTool:!!$('#measurementForm') && !!$('#measurementSummary'),
      wellnessFitCueTool:!!$('#fitCueExplain') && !!$('#fitCueResult'),
      privacyControls:!!$('#privacyModal') && !!$('#clearAppData'),
      reducedMotionCSS:[...document.styleSheets].some(sheet=>{try{return [...sheet.cssRules].some(rule=>rule.conditionText?.includes('prefers-reduced-motion'))}catch{return false}}),
      hasBackendEndpoint:false,
      spinViewer:!!$('#spinFrameImage')&&spinFrames.length===8,
      spinFrameIndex:spinIndex,
      originalWheels:{boy:!!$('#boyPreference')&&!!$('#boyResult'),dildo:!!$('#dildoPreference')&&!!$('#dildoResult'),plug:!!$('#plugPreference')&&!!$('#plugResult')},
      wildWheel:!!$('#wildCategory')&&!!$('#wildResult'),
      imageCount:$$('img').length,
      imageFallbacks:window.BLACKED_ASSET_FALLBACK?.count ?? state.diagnostic.imageFallbacks,
      wheelSpins:state.diagnostic.wheelSpins,
      storageKeys:Object.values(STORAGE),
      externalAssetHost:'raw.githubusercontent.com',
      expectedExternalAssets:validateAssetURLs(),
      errors:state.diagnostic.errors
    };
  }
  window.BLACKED_V1 = {version:'part-b-story-series-2.0.0',getStoryLibrary:()=>storyLibrary.map(s=>({id:s.id,title:s.title,mood:s.mood,moodLabel:s.moodLabel,language:s.language||'en',contentLength:s.content.length,series:!!storySeries[s.id]})),getStorySeries:()=>Object.entries(storySeries).map(([id,s])=>({id,label:s.label,chapters:s.chapters.length,endings:s.endings.length})),getStoryVault:()=>({enabled:storyVault.enabled,bookmarks:[...storyVault.bookmarks],progress:JSON.parse(JSON.stringify(storyVault.progress)),lastRead:storyVault.lastRead?{...storyVault.lastRead}:null}),getDiagnostics,getState:()=>({view:state.view,wishlistCount:state.wishlist.size,bagCount:state.bag.reduce((n,p)=>n+p.qty,0),adultAllowed:state.adultAllowed}),getImageLibrary:()=>imageLibrary.map(x=>({id:x.id,category:x.category,filename:x.filename,source_repo:x.source_repo,src:x.src})),setView};

  state.wishlist = new Set((Array.isArray(safeRead(STORAGE.wishlist,[]))?safeRead(STORAGE.wishlist,[]):[]).filter(x=>typeof x==='string'));
  const rawBag=safeRead(STORAGE.bag,[]);
  state.bag=Array.isArray(rawBag)?rawBag.filter(p=>p&&typeof p.id==='string'&&p.id.length<=120).slice(0,100).map(p=>({id:p.id,name:String(p.name||'Demo pick').slice(0,160),price:Number.isFinite(Number(p.price))?Math.max(0,Math.min(1000000,Number(p.price))):0,image:isSafeAppImageURL(p.image)?p.image:RAW4+'look-black-lace.webp',qty:Math.max(1,Math.min(99,parseInt(p.qty,10)||1))})):[];
  // Phase 6 privacy control: only remove keys owned by this app, and only after an explicit confirmation.
  const appLocalStorageKeys = [...new Set([...Object.values(STORAGE),'blackedV1MeasurementsOptIn','blackedV1PartBStoryVault','blackedDeltaSaved','blackedDeltaBag','blackedDeltaFitNotes','blacked31FitNote'])];
  const appSessionStorageKeys = [...new Set([STORAGE.adult,'blacked31Adult'])];
  $('#privacyOpen').addEventListener('click',()=>$('#privacyModal').classList.remove('hidden'));
  $('#clearAppData').addEventListener('click',()=>{
    const accepted=window.confirm('Remove saved BLACKED wishlist, demo bag, fit notes and any opt-in measurements from this browser? This cannot be undone.');
    if(!accepted)return;
    let hadFailure=false;
    for(const key of appLocalStorageKeys){try{localStorage.removeItem(key)}catch{hadFailure=true}}
    for(const key of appSessionStorageKeys){try{sessionStorage.removeItem(key)}catch{hadFailure=true}}
    state.wishlist.clear();state.bag=[];state.compare?.clear();state.adultAllowed=false;clearStoryVaultData(false);
    $('#fitNotes').value='';$('#fitSaved').textContent='Local notes cleared.';
    $('#saveMeasurementsOptIn').checked=false;
    $('#measurementSummary').innerHTML='<p class="muted">Saved data cleared. Enter measurements again only if needed.</p>';
    $('#measurementStatus').textContent='App-owned saved data was removed from this browser.';
    renderHeaderCounts();renderWishlist();renderBag();renderCatalog();renderCompare();
    $('#privacyClearStatus').textContent=hadFailure?'Some storage entries could not be removed because browser storage is blocked.':'App-owned saved data was removed from this browser. Other websites’ data was not touched.';
  });

  // Keyboard accessible modal focus: move focus in when an overlay opens, trap Tab, restore focus on close.
  const modalReturnFocus = new WeakMap();
  const modalFocusables = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function visibleFocusables(overlay){return [...overlay.querySelectorAll(modalFocusables)].filter(el=>!el.hidden&&el.getClientRects().length>0);}
  const modalObserver = new MutationObserver(records=>{
    for(const record of records){
      const overlay=record.target;
      if(!(overlay instanceof HTMLElement)||!overlay.classList.contains('overlay'))continue;
      if(!overlay.classList.contains('hidden')){
        if(!modalReturnFocus.has(overlay))modalReturnFocus.set(overlay,document.activeElement);
        if(!overlay.hasAttribute('tabindex'))overlay.tabIndex=-1;
        requestAnimationFrame(()=>{const target=visibleFocusables(overlay)[0]||overlay;if(target?.isConnected)target.focus({preventScroll:true});});
      }else{
        const prior=modalReturnFocus.get(overlay);modalReturnFocus.delete(overlay);
        if(prior instanceof HTMLElement&&prior.isConnected)requestAnimationFrame(()=>prior.focus({preventScroll:true}));
      }
    }
  });
  $$('.overlay').forEach(overlay=>modalObserver.observe(overlay,{attributes:true,attributeFilter:['class']}));
  document.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const overlay=$$('.overlay:not(.hidden)').at(-1);if(!overlay)return;
    const focusables=visibleFocusables(overlay);if(!focusables.length){event.preventDefault();overlay.focus();return;}
    const first=focusables[0],last=focusables[focusables.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  // Release local object URLs for selected photos when the document is discarded.
  window.addEventListener('pagehide',()=>{if(state.currentPhotoUrl){URL.revokeObjectURL(state.currentPhotoUrl);state.currentPhotoUrl=null;}});

  // Render only the visible Home payload at startup. Other screens initialize on navigation.
  renderHomeCampaigns();initMeasurementTools();renderHeaderCounts();renderWishlist();renderBag();updateMeasureConversion();
  // Phase 3 + 4 are delivered as one same-origin asset to reduce request count and deployment mismatch.
  (function loadCombinedPhase34() {
    if (document.querySelector('script[data-phase34-bundle]') || document.documentElement.dataset.blackedPhase34Bundle === 'ready') return;
    const script = document.createElement('script');
    script.src = './phase3-4-experience.js';
    script.addEventListener('load', () => { script.dataset.loadOK = 'true'; });
    script.addEventListener('error', () => { script.dataset.loadError = 'true'; });
    script.async = true;
    script.dataset.phase34Bundle = 'true';
    script.onerror = () => {
      state.diagnostic.errors.push('Phase 3/4 bundle failed to load: phase3-4-experience.js');
      document.documentElement.dataset.blackedPhase34Bundle = 'load-error';
    };
    document.head.appendChild(script);
  })();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').then(reg=>reg.update().catch(()=>{})).catch(err=>{state.diagnostic.errors.push('Service worker: '+String(err));console.warn('[BLACKED V1] Service worker registration failed',err);}));
  }
})();
