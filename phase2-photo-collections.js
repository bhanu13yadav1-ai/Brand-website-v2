/* BLACKED V3 Phase 1–2 additive photo collections.
 * Intentionally does not replace app.js or part-c-enhancements.js.
 * All supplied photos are local assets; image failures remain visible and diagnosable.
 */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE12) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { inserted: [], imageErrors: [], activeTrigger: null, oldBodyOverflow: '' };
  const records = {
    noor: [
      {path:'./assets/noor-edit/noor-ka-nasha.webp', title:'Noor Ka Nasha', tag:'NOOR EDIT', category:'noor', alt:'Adult fashion model in a black, gold-trimmed head covering in a warm black-and-gold lingerie campaign'},
      {path:'./assets/noor-edit/tradition-outside-desire-inside.webp', title:'Tradition Outside, Desire Inside', tag:'EDITORIAL CONCEPT', category:'noor', alt:'Adult fashion model in a black head covering and black-and-gold lingerie editorial styling'},
      {path:'./assets/noor-edit/shaam-e-noor.webp', title:'Shaam-e-Noor', tag:'CAMPAIGN VARIANT', category:'variant', alt:'Black-and-gold Noor lingerie campaign with an adult model wearing a black head covering'},
      {path:'./assets/noor-edit/shaam-se-raat-tak.webp', title:'Shaam Se Raat Tak', tag:'CAMPAIGN VARIANT', category:'variant', alt:'Related black-and-gold Noor fashion campaign featuring an adult model in a black head covering'}
    ],
    innerwear: [
      {path:'./assets/innerwear-gallery-v3/made-for-quiet-moments.webp', title:'Made for Your Quiet Moments', tag:'PINK EDITORIAL', category:'pink', alt:'Adult model wearing a pink lingerie set in a warm luxury editorial scene'},
      {path:'./assets/innerwear-gallery-v3/rest-restore-rise.webp', title:'Rest. Restore. Rise.', tag:'PINK EDITORIAL', category:'pink', alt:'Adult model in a pink lingerie editorial in a candlelit, warm-toned room'}
    ],
    grace: {path:'./assets/grace-edit/sacred-elegance.webp', title:'Sacred Elegance', tag:'THEATRICAL CONCEPT', category:'grace', alt:'Adult model in black editorial lingerie styling and a cross necklace; supplied theatrical fashion concept'},
    group: {path:'./assets/triad-gallery-v3/innerwere-campaign-trio.webp', title:'Multi-Adult Innerwear Campaign', tag:'18+ GATED REFERENCE', category:'group', alt:'Adult multi-person innerwear campaign reference in a warm luxury set'}
  };
  function make(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function sectionHeader(section, eyebrow, title, description) {
    const header = make('div','section-heading');
    const inner = make('div');
    const h = make('h2','',title); h.id = `${section.id}Title`;
    inner.append(make('p','eyebrow',eyebrow),h,make('p','muted',description));
    header.append(inner);
    section.append(header);
  }
  function initPreviewModal() {
    if ($('#v3PhotoPreview')) return;
    const overlay = make('div','v3-photo-overlay'); overlay.id = 'v3PhotoPreview'; overlay.hidden = true;
    overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true'); overlay.setAttribute('aria-labelledby','v3PhotoPreviewTitle');
    const panel = make('div','v3-photo-dialog');
    const top = make('div','v3-photo-dialog-top');
    const title = make('h2','', 'Image preview'); title.id = 'v3PhotoPreviewTitle';
    const close = make('button','v3-photo-close','Close preview'); close.type = 'button'; close.id='v3PhotoClose';
    top.append(title,close);
    const image = make('img','v3-photo-dialog-image'); image.id = 'v3PhotoPreviewImage'; image.alt = '';
    const note = make('p','v3-photo-dialog-note','User-supplied campaign reference. Preview only; not confirmation of stock, sizing, model identity or religious affiliation.'); note.id='v3PhotoPreviewNote';
    panel.append(top,image,note); overlay.append(panel); document.body.append(overlay);
    function closeModal() {
      if (overlay.hidden) return;
      overlay.hidden = true; document.body.style.overflow = state.oldBodyOverflow;
      if (state.activeTrigger && document.contains(state.activeTrigger)) state.activeTrigger.focus();
      state.activeTrigger = null;
    }
    close.addEventListener('click', closeModal);
    overlay.addEventListener('keydown', e => { if (e.key === 'Tab') { e.preventDefault(); close.focus(); } });
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) closeModal(); });
    document.addEventListener('click', e => {
      const button = e.target.closest('button[data-v3-open-photo]');
      if (!button) return;
      const src = button.dataset.fullSrc;
      if (!src) return;
      const triggerImage = button.querySelector('img');
      state.activeTrigger = button; state.oldBodyOverflow = document.body.style.overflow;
      title.textContent = button.dataset.fullTitle || 'Image preview';
      image.alt = button.dataset.fullAlt || triggerImage?.alt || 'Campaign image preview';
      image.src = src;
      note.textContent = button.dataset.fullNote || 'User-supplied campaign reference. Preview only; not confirmation of stock, sizing, model identity or religious affiliation.';
      overlay.hidden = false; document.body.style.overflow = 'hidden'; close.focus();
    });
  }
  function createCard(record, collectionNote) {
    const card = make('article','v3-photo-card');
    card.dataset.search = `${record.title} ${record.tag} ${record.category}`.toLowerCase();
    card.dataset.category = record.category;
    const button = make('button','v3-photo-open'); button.type='button'; button.dataset.v3OpenPhoto='';
    button.dataset.fullSrc = record.path; button.dataset.fullTitle = record.title; button.dataset.fullAlt = record.alt;
    button.dataset.fullNote = collectionNote || 'User-supplied campaign reference. Not proof of stock, product specifications, model identity or religious affiliation.';
    button.setAttribute('aria-label',`Open large preview: ${record.title}`);
    const img=make('img','v3-photo-image'); img.alt=record.alt; img.width=1024; img.height=1536; img.loading='lazy'; img.decoding='async'; img.dataset.v3PhotoAsset=record.path;
    const status=make('small','v3-photo-status','Image loading…');
    img.addEventListener('load',()=>{status.textContent=`Image loaded · ${img.naturalWidth} × ${img.naturalHeight}`;card.classList.remove('v3-photo-broken');});
    img.addEventListener('error',()=>{status.textContent=`IMAGE LOAD FAILED — verify ${record.path}`;card.classList.add('v3-photo-broken');state.imageErrors.push(record.path);});
    img.src=record.path;
    button.append(img);
    const body=make('div','v3-photo-card-copy');
    body.append(make('small','v3-photo-tag',record.tag),make('h3','',record.title),make('p','v3-photo-caption',record.caption || 'Owner-supplied campaign reference.'),status);
    card.append(button,body); return card;
  }
  function makeGallery({id, view, anchor, eyebrow, title, description, entries, filters = false, privacyNote = ''}) {
    if ($(`#${id}`)) return $(`#${id}`);
    const section=make('section','section-block v3-photo-gallery'); section.id=id; section.setAttribute('aria-labelledby',`${id}Title`);
    sectionHeader(section,eyebrow,title,description);
    if (filters) {
      const tools=make('div','v3-photo-tools');
      const lab=make('label','field','Search this collection'); const input=make('input'); input.type='search'; input.maxLength=80; input.placeholder='Search titles, styles…'; input.setAttribute('aria-label','Search this collection'); input.id=`${id}Search`;
      lab.append(input);
      const fl=make('label','field','Style filter'); const select=make('select'); select.id=`${id}Filter`; select.setAttribute('aria-label','Filter collection by style');
      [['all','All photos'],['noor','Noor edit'],['variant','Campaign variants']].forEach(([v,t])=>{const o=make('option','',t);o.value=v;select.append(o);}); fl.append(select); tools.append(lab,fl); section.append(tools);
      const count=make('p','v3-photo-count',''); count.id=`${id}Count`; count.setAttribute('aria-live','polite'); section.append(count);
    }
    const grid=make('div','v3-photo-grid'); grid.id=`${id}Grid`;
    entries.forEach(record=>grid.append(createCard(record,privacyNote)));
    section.append(grid);
    if (privacyNote) section.append(make('p','v3-photo-disclaimer',privacyNote));
    const target=anchor ? $(anchor,view) : null;
    const insertionTarget = target?.closest('section') || target;
    if (insertionTarget) insertionTarget.insertAdjacentElement('afterend',section); else view.append(section);
    if (filters) {
      const input=$(`#${id}Search`), select=$(`#${id}Filter`), count=$(`#${id}Count`);
      const filter=()=>{const q=input.value.trim().toLowerCase(), cat=select.value;let n=0;
        $$('.v3-photo-card',grid).forEach(card=>{const show=(!q||card.dataset.search.includes(q))&&(cat==='all'||card.dataset.category===cat);card.hidden=!show;if(show)n++;});
        count.textContent=`${n} of ${entries.length} images`;}; input.addEventListener('input',filter);select.addEventListener('change',filter);filter();
    }
    state.inserted.push(id); return section;
  }
  function addNoor() {
    const view=$('#view-sanskari'); if(!view) return;
    const entries=records.noor.map((r,i)=>({...r,caption:[
      'Hijab-inspired black-and-gold campaign reference; no claim about the model’s faith or community.',
      'Supplied fashion artwork. Creative concept only—not a statement about Muslim women generally.',
      'Noor campaign variant; visually related to the next card but retained as a separate supplied artwork.',
      'Related Noor campaign variant with a different crop/text treatment; source reference retained.'
    ][i]}));
    makeGallery({id:'v3NoorEditGallery',view,anchor:'.coming-grid',eyebrow:'MUSLIM-INSPIRED · NOOR EDIT',title:'Noor Edit — Campaign Gallery',description:'Hijab-inspired, black-and-gold editorial references in their own collection. These images are supplied creative concepts, not proof of the models’ religion and not representative of all Muslim women.',entries,filters:true,privacyNote:'Respectful-use note: “Muslim-inspired” describes the requested creative direction only. No model identity, religious affiliation, endorsement, product stock or sizing is inferred.'});
  }
  function addInnerwear() {
    const view=$('#view-innerwear'); if(!view) return;
    const entries=records.innerwear.map(r=>({...r,caption:r.title==='Rest. Restore. Rise.'?'Owner-supplied warm-toned pink campaign reference.':'Owner-supplied pink innerwear campaign concept.'}));
    makeGallery({id:'v3InnerwearEditorialGallery',view,anchor:'#v24InnerwearCollection',eyebrow:'NEW · OWNER-SUPPLIED PHOTOS',title:'New Innerwear Editorials',description:'Two newly supplied photo concepts, placed after the existing catalogue rather than replacing any previous product or archive cards.',entries,filters:false,privacyNote:'Campaign references only. The website does not confirm retail stock, SKU, price, garment sizing or usage rights.'});
  }
  function addGracePreview() {
    const host=$('.coming-card.grace'); if(!host || $('#v3GracePreview')) return;
    const wrap=make('figure','v3-grace-preview'); wrap.id='v3GracePreview';
    const record={...records.grace,caption:'Theatrical fashion concept only; not an official church or religious collection.'};
    const card=createCard(record,'Theatrical religious-style costume/editorial reference only. Do not infer the model’s religion or imply religious endorsement.');
    card.classList.add('v3-grace-card'); wrap.append(card);
    const foot=host.querySelector('small'); if(foot) foot.insertAdjacentElement('beforebegin',wrap); else host.append(wrap);
    state.inserted.push('v3GracePreview');
  }
  function addGroupPreview() {
    const protectedBox=$('#v23ThreesomeProtected'); if(!protectedBox || $('#v3GroupCampaignGallery')) return;
    const entries=[{...records.group,caption:'Owner-supplied multi-adult campaign reference. It remains inside the existing 18+ self-attestation-gated section.'}];
    const after=$('#v24ThreesomeEditorials',protectedBox);
    const section=make('section','v3-photo-gallery v3-group-gallery'); section.id='v3GroupCampaignGallery'; section.setAttribute('aria-labelledby','v3GroupCampaignTitle');
    const heading=make('div','section-heading'); const inner=make('div'); const h=make('h3','', 'Additional Multi-Adult Campaign Reference'); h.id='v3GroupCampaignTitle'; inner.append(make('p','eyebrow','18+ GATED · SUPPLIED CAMPAIGN'),h,make('p','muted','A separate supplied reference. It stays protected by the existing gate.')); heading.append(inner); section.append(heading);
    const grid=make('div','v3-photo-grid'); grid.append(createCard(entries[0],'Visible only after the existing Threesome Fantasy 18+ self-attestation gate.')); section.append(grid);
    if(after) after.insertAdjacentElement('afterend',section); else protectedBox.append(section);
    state.inserted.push('v3GroupCampaignGallery');
  }
  function boot() {
    initPreviewModal();
    addNoor(); addInnerwear(); addGracePreview(); addGroupPreview();
    window.BLACKED_V3_PHASE12={version:'1.0.0', getDiagnostics:()=>({inserted:[...state.inserted],imageErrors:[...new Set(state.imageErrors)],noorCards:$('#v3NoorEditGalleryGrid')?.querySelectorAll('.v3-photo-card').length||0,innerwearNewCards:$('#v3InnerwearEditorialGalleryGrid')?.querySelectorAll('.v3-photo-card').length||0,gracePreview:!!$('#v3GracePreview'),groupGallery:!!$('#v3GroupCampaignGallery'),gateContainsGroupPhoto:!!$('#v3GroupCampaignGallery')?.closest('#v23ThreesomeProtected'),loadedPhotos:$$('[data-v3-photo-asset]').filter(img=>img.complete&&img.naturalWidth>0).length})};
    document.documentElement.dataset.blackedV3Phase12='loaded';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
