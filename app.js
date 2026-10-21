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
    }
  };

  function safeRead(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); }
    catch { return fallback; }
  }
  function safeWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
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
  function imageHTML(src, alt, className = '') {
    return `<img class="${esc(className)}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-asset-image>`;
  }
  function setView(name) {
    if (!['home','innerwear','sanskari','wellness','boyfriend','fit'].includes(name)) return;
    if (['wellness','boyfriend'].includes(name) && !state.adultAllowed) {
      state.pendingView = name; $('#ageConfirm').checked = false; $('#ageError').classList.add('hidden'); $('#ageModal').classList.remove('hidden'); return;
    }
    state.view = name;
    $$('.view').forEach(v => { const active = v.dataset.view === name; v.hidden = !active; v.classList.toggle('active', active); });
    $$('[data-view-link]').forEach(b => b.classList.toggle('active', b.dataset.viewLink === name));
    $('#mobileMenu').classList.add('hidden'); $('#menuToggle').setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if (name === 'innerwear') renderCatalog();
    if (name === 'sanskari') renderCampaigns();
    if (name === 'home') renderHomeCampaigns();
  }
  $$('[data-view-link]').forEach(b => b.addEventListener('click', () => setView(b.dataset.viewLink)));
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
    boy: { preference:'#boyPreference', experience:null, result:'#boyResult', disc:'[data-wheel-disc="boy"]', rangeLabels:{compact:'Up to 10 cm',classic:'10–12 cm',long:'12–14 cm',xl:'14+ cm'}, options:[
      {key:'compact',label:'Compact-range conversation',text:'Ask your partner what feels comfortable; never assume a preference from a measurement.',item:'Boyfriend conversation card'},
      {key:'classic',label:'Classic-range conversation',text:'Try a calm, private conversation about preferences and boundaries. A range is not a prediction.',item:'Couple conversation card'},
      {key:'long',label:'Longer-range fantasy prompt',text:'Discuss comfort, preferences and boundaries without treating a size label as a performance score.',item:'Private fantasy prompt'},
      {key:'xl',label:'XL-range fantasy prompt',text:'This is an illustrative range only, not a medical category or claim about averages.',item:'Secret date prompt'}
    ]},
    dildo: { preference:'#dildoPreference', experience:'#dildoExperience', result:'#dildoResult', disc:'[data-wheel-disc="dildo"]', options:[
      {key:'compact',label:'Compact · 8–10 cm',text:'Compare usable insertable length and widest diameter on the actual maker’s listing.',item:'Compact size guide card'},
      {key:'regular',label:'Regular · 10–13 cm',text:'Overall length and insertable length can differ. Verify the product dimensions before deciding.',item:'Regular size guide card'},
      {key:'long',label:'Longer · 13–16 cm',text:'This is a filter concept, not a recommendation. Comfort, dimensions and maker guidance matter.',item:'Longer size guide card'},
      {key:'xl',label:'XL · 16+ cm',text:'Labels vary by manufacturer. Compare actual dimensions and do not choose by label alone.',item:'XL size guide card'}
    ]},
    plug: { preference:'#plugPreference', experience:'#plugExperience', result:'#plugResult', disc:'[data-wheel-disc="plug"]', options:[
      {key:'small',label:'Small · up to 2.5 cm widest diameter',text:'Check the widest diameter and ensure the design has a proper flared base or retrieval stop.',item:'Small size guide card'},
      {key:'medium',label:'Medium · 2.5–3.5 cm widest diameter',text:'Verify dimensions, suitable lubricant instructions and the product’s intended use.',item:'Medium size guide card'},
      {key:'large',label:'Large · above 3.5 cm widest diameter',text:'This is a shopping filter only. Never force insertion; stop if there is pain.',item:'Large size guide card'}
    ]}
  };
  // Each selected size range has at least two content variants to avoid immediate repeats.
  for (const kind of ['boy','dildo','plug']) {
    const original = wheelConfig[kind].options.map((item,index)=>({...item,id:`${kind}-${item.key}-primary-${index}`}));
    const alternateText = kind==='boy'
      ? item => `Use ${item.label.toLowerCase()} as a conversation starter, not a prediction. Ask your partner about comfort and preferences without pressure.`
      : kind==='dildo'
        ? item => `For ${item.label.toLowerCase()}, compare actual insertable length and widest diameter, and follow the maker’s intended-use guidance.`
        : item => `For ${item.label.toLowerCase()}, verify widest diameter, usable length and a proper flared base or retrieval stop; stop if anything hurts.`;
    const alternates = original.map((item,index)=>({...item,id:`${kind}-${item.key}-alternate-${index}`,label:`${item.label} · alternate prompt`,text:alternateText(item)}));
    wheelConfig[kind].options = [...original,...alternates];
  }

  const wildPrompts = {
    flirty:['Send a voice note with one sincere compliment and one playful hint.','Plan a tiny surprise, then let your partner guess the theme.','Ask: “What is one thing I do that makes you smile without trying?”'],
    double:['“Aaj seedhi baat kam… aankhon se hints zyada?” Only if you both enjoy the joke.','Create a double-meaning caption together, and let either person veto the final line.','Trade one playful hint each—keep it fun, and stop if either person is uncomfortable.'],
    bold:['Take turns choosing a date activity; both must approve the final plan.','Pick one confident compliment each—no teasing about insecurities.','Try a 10-minute no-phone conversation with one question each.'],
    spicy:['Set the mood with a shared playlist and ask what atmosphere your partner likes.','Plan a slow-build date with a clear end time and a no-pressure option to change plans.','Ask: “What would make tonight feel special and comfortable for you?”'],
    fantasy:['Invent a fictional date-night setting together and agree on boundaries before roleplay.','Choose a mystery character for a harmless first-date roleplay; either person can pause.','Build a two-line romantic story, taking turns to add one line.'],
    truth:['Truth: what small gesture makes you feel most appreciated?','Dare: choose a song that reminds you of your partner and explain why.','Truth: name one boundary that helps you feel relaxed and respected.'],
    confession:['Share one kind thought you were shy to say out loud.','Finish this sentence: “One thing I appreciate about us is…”','Ask before sharing a secret; either person can pass without explaining.'],
    boyfriend:['Plan a date around something your partner mentioned enjoying.','Send one specific compliment—make it about a choice, effort or quality you genuinely appreciate.','Ask: “What kind of support would feel good from me this week?”'],
    private:['Talk about one curiosity and one clear boundary; either person may pass.','Ask: “What helps you feel safe enough to talk honestly?”','Agree on a pause word for any game, and confirm that either person can stop any time.'],
    dark:['Write a two-sentence mystery-romance scene with both partners as equal decision-makers.','Create a fictional secret admirer clue trail—only for a partner who wants to play.','Choose a mysterious song and invent a consensual fictional backstory together.']
  };
  const wildCategoryNames = {flirty:'Flirty & Teasing',double:'Dirty Double Meanings',bold:'Bold Couple Challenges',spicy:'Romantic but Spicy',fantasy:'Wild Fantasy Prompts',truth:'Truth or Dare for Couples',confession:'Secret Crush & Confessions',boyfriend:'Boyfriend Challenges',private:'Private Fantasy Conversations',dark:'Dark Romance & Mystery'};
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
    host.innerHTML=`<strong>${esc(title)}</strong><span>${esc(description)}</span>${meta?`<span class="result-meta">${esc(meta)}</span>`:''}<div class="button-row"><button class="small-btn" type="button" data-wheel-retry="${esc(kind)}">Spin again</button>${includeBag?`<button class="small-btn" type="button" data-wheel-add="${esc(kind)}" data-wheel-name="${esc(title)}">Add demo pick</button>`:''}</div>`;
  }
  function spinWheel(kind) {
    const disc=$(`[data-wheel-disc="${kind}"]`);
    if (!disc) return;
    const token=(state.wheelTokens[kind]||0)+1; state.wheelTokens[kind]=token;
    if(state.wheelTimers[kind]) clearTimeout(state.wheelTimers[kind]);
    let title='', description='', meta='', includeBag=false;
    if(kind==='wild'){
      const category=$('#wildCategory').value; const prompt=chooseDifferent(wildPrompts[category]||wildPrompts.flirty,`wild-${category}`);
      title=wildCategoryNames[category]||'Dirty/Wild prompt';description=prompt;meta='OPTIONAL · CONSENT FIRST · SKIP ANY TIME';
    } else {
      const cfg=wheelConfig[kind]; const preference=$(cfg.preference).value; const experience=cfg.experience?$(cfg.experience).value:null;
      if(!preference){toast('Choose a range first.');return;}
      let options=cfg.options;
      if(preference!=='surprise') options=options.filter(x=>x.key===preference);
      if(experience==='new' && preference==='surprise') options=options.slice(0,Math.min(2,options.length));
      const item=chooseDifferent(options,kind);
      if(!item){toast('No result available. Try again.');return;}
      title=item.label;description=item.text;meta=kind==='boy'?'PLAYFUL FILTER · NOT A PREDICTION':'REFERENCE ONLY · CHECK REAL PRODUCT DIMENSIONS';includeBag=kind!=='boy';
    }
    state.diagnostic.wheelSpins++;
    disc.style.transform=`rotate(${1900+randomInt(1400)}deg)`;
    const buttons=$$(`[data-spin-wheel="${kind}"]`); buttons.forEach(b=>{b.disabled=true;b.dataset.oldLabel=b.textContent;b.textContent='Spinning…';});
    const host=kind==='wild'?$('#wildResult'):$(wheelConfig[kind].result);host.innerHTML='<span>Wheel is spinning…</span>';
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
    if(kind==='wild')$('#wildResult').textContent='Round reset. Choose a category and spin when ready.';
    else $(wheelConfig[kind].result).textContent=kind==='boy'?'Choose a range first.':'Select a range to start.';
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

  $('#saveFit').addEventListener('click',()=>{const ok=safeWrite(STORAGE.fitNotes,$('#fitNotes').value);$('#fitSaved').textContent=ok?'Saved in this browser on this device.':'Browser storage is unavailable; notes were not saved.';});
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

  function validateAssetURLs() {
    const assets=[RAW4+'hero-model-crop.webp',RAW4+'look-black-lace.webp',RAW4+'look-sanskari-blue.webp',RAW4+'sanskari-ankhein.webp',RAW4+'sanskari-entry.webp',RAW4+'sanskari-mirror.webp',RAW4+'sanskari-pallu.webp',RAW4+'sanskari-raat.webp',RAW3+'companion-cafe.webp',RAW3+'companion-event.webp'];
    return assets;
  }
  function getDiagnostics() {
    return {
      version:'V1 Phase 4 recovery build',
      loaded:document.readyState==='complete'||document.readyState==='interactive',
      views:$$('.view').map(v=>({name:v.dataset.view,exists:true,visible:!v.hidden})),
      navButtons:$$('[data-view-link]').length,
      productCount:products.length,
      campaignCount:campaigns.length,
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
  window.BLACKED_V1 = {version:'phase4-recovery-1.0.0',getDiagnostics,getState:()=>({view:state.view,wishlistCount:state.wishlist.size,bagCount:state.bag.reduce((n,p)=>n+p.qty,0),adultAllowed:state.adultAllowed}),setView};

  state.wishlist = new Set((Array.isArray(safeRead(STORAGE.wishlist,[]))?safeRead(STORAGE.wishlist,[]):[]).filter(x=>typeof x==='string'));
  const rawBag=safeRead(STORAGE.bag,[]);
  state.bag=Array.isArray(rawBag)?rawBag.filter(p=>p&&typeof p.id==='string').map(p=>({id:p.id,name:String(p.name||'Demo pick'),price:Number.isFinite(Number(p.price))?Math.max(0,Number(p.price)):0,image:typeof p.image==='string'?p.image:RAW4+'look-black-lace.webp',qty:Math.max(1,Math.min(99,parseInt(p.qty,10)||1))})):[];
  renderHomeCampaigns();renderCampaigns();renderCatalog();renderHeaderCounts();renderWishlist();renderBag();updateMeasureConversion();showSpinFrame(0);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>{state.diagnostic.errors.push('Service worker: '+String(err));console.warn('[BLACKED V1] Service worker registration failed',err);}));
  }
})();
