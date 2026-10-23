/* BLACKED Phase 6 — additive wellness, collection navigation and media-rights guidance. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE6) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const state = { inserted: [], activeCollection: 'all' };
  const make = (tag, cls, html) => { const el=document.createElement(tag); if(cls)el.className=cls; if(html!==undefined)el.innerHTML=html; return el; };

  function addWellnessToolkit() {
    const view = $('#view-wellness'); if (!view || $('#p6WellnessToolkit')) return;
    const section = make('section','section-block p6-wellness-toolkit', `
      <div class="section-heading"><div><p class="eyebrow">PHASE 6 · COMFORT-LED WELLNESS</p><h2 id="p6WellnessTitle">Useful guides, not body ratings</h2><p class="muted">Measure accurately, check the actual product specification, and choose comfort over a label. These diagrams are original educational assets, not product photos.</p></div><span class="p6-education-chip">GENERAL EDUCATION</span></div>
      <div class="p6-guide-grid">
        <article class="p6-guide-card"><img src="./assets/phase6-measurement-map.svg" width="680" height="410" loading="lazy" alt="Diagram showing a level tape around a garment measurement area"><p class="eyebrow">01 · MEASUREMENT</p><h3>Measure without squeezing</h3><p>Keep the tape level and snug, not tight. Record units and use the size chart for the exact garment, not a generic conversion.</p><ul><li>Measure over a thin layer if that matches the brand's directions.</li><li>Write down whether a value is in cm or inches.</li><li>If between sizes, compare garment stretch and return terms.</li></ul></article>
        <article class="p6-guide-card"><img src="./assets/phase6-product-specs.svg" width="680" height="410" loading="lazy" alt="Generic product specification drawing labelling overall length, usable length and widest width"><p class="eyebrow">02 · PRODUCT SPECS</p><h3>Compare the actual dimensions</h3><p>For any body-contact product, compare the manufacturer's stated dimensions and intended use. A size nickname such as “regular” or “XL” is not a shared standard.</p><ul><li>Distinguish total length from usable/insertable length where relevant.</li><li>Read material, care, compatibility and warnings from the manufacturer.</li><li>Never use an image or wheel result to infer a person's body.</li></ul></article>
        <article class="p6-guide-card"><img src="./assets/phase6-comfort-check.svg" width="680" height="410" loading="lazy" alt="Four-step comfort checklist: ask, listen, check in and stop or skip"><p class="eyebrow">03 · CONSENT & COMFORT</p><h3>Ask. Listen. Check in.</h3><p>Preferences can change. A clear “no”, “pause” or “skip” is enough; nobody has to justify it. Stop any activity that causes pain or distress.</p><ul><li>Discuss boundaries before trying something new.</li><li>Use products only as designed and follow care instructions.</li><li>Seek qualified healthcare advice for ongoing symptoms.</li></ul></article>
      </div>
      <p class="p6-health-note"><b>Health note:</b> this site offers general education, not diagnosis or individual medical advice. Persistent pain, itching, sores, unusual bleeding or other concerning symptoms deserve advice from a qualified clinician. Read <a href="https://www.acog.org/womens-health/faqs/vulvovaginal-health" target="_blank" rel="noopener noreferrer">ACOG vulvovaginal health</a> and <a href="https://www.plannedparenthood.org/learn/health-and-wellness/sex-and-pleasure/sex-toys" target="_blank" rel="noopener noreferrer">Planned Parenthood: sex toys</a>.</p>`);
    section.id='p6WellnessToolkit'; section.setAttribute('aria-labelledby','p6WellnessTitle');
    const basics = $('.wellness-quick-guides', view) || $('.wellness-measurements', view);
    (basics || view.lastElementChild)?.insertAdjacentElement('afterend', section);
    state.inserted.push('p6WellnessToolkit');
  }

  function addCollectionJumpnav() {
    const view=$('#view-sanskari'); if(!view || $('#p6CollectionJumpnav')) return;
    const nav=make('nav','p6-collection-jumpnav',`<p class="eyebrow">COLLECTIONS · EXPLORE BY CREATIVE DIRECTION</p><div class="p6-collection-buttons" role="group" aria-label="Browse BLACKED collections"><button type="button" data-p6-collection="sanskari" aria-pressed="true">Sanskari · current edit</button><button type="button" data-p6-collection="noor" aria-pressed="false">Noor · coming soon</button><button type="button" data-p6-collection="grace" aria-pressed="false">Grace · coming soon</button><button type="button" data-p6-collection="all" aria-pressed="false">Show all collections</button></div><p id="p6CollectionStatus" class="micro muted" role="status" aria-live="polite">Sanskari is the current campaign edit. Noor and Grace are concepts, not confirmed retail collections.</p>`);
    nav.id='p6CollectionJumpnav'; nav.setAttribute('aria-label','Collection navigation');
    const hero=$('.sanskari-hero',view); (hero || view.firstElementChild)?.insertAdjacentElement('afterend',nav);
    nav.addEventListener('click', e => {
      const button=e.target.closest('[data-p6-collection]'); if(!button)return;
      const key=button.dataset.p6Collection; state.activeCollection=key;
      $$('[data-p6-collection]',nav).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const campaigns=$('#sanskariGallery',view)?.closest('.section-block');
      const noor=$('#v3NoorEditGallery',view); const grace=$('#v3GracePreview',view)?.closest('figure') || $('#v3GracePreview',view);
      const future=$('.coming-grid',view)?.closest('.section-block');
      if(campaigns) campaigns.hidden = key==='noor'||key==='grace';
      if(noor) noor.hidden = key==='sanskari'||key==='grace';
      if(grace) grace.hidden = key==='sanskari'||key==='noor';
      if(future) future.hidden = key==='sanskari';
      const noorCard=$('.coming-card.noor',view); const graceCard=$('.coming-card.grace',view);
      if(noorCard) noorCard.hidden = key==='grace';
      if(graceCard) graceCard.hidden = key==='noor';
      // “All” keeps every preview visible; named choices narrow the screen to that collection.
      if(key==='all'){if(campaigns)campaigns.hidden=false;if(noor)noor.hidden=false;if(grace)grace.hidden=false;if(future)future.hidden=false;if(noorCard)noorCard.hidden=false;if(graceCard)graceCard.hidden=false;}
      const status=$('#p6CollectionStatus');
      if(status) status.textContent = key==='sanskari' ? 'Showing the current Sanskari campaign edit. Noor and Grace previews remain marked coming soon.' : key==='noor' ? 'Showing Noor-related creative previews. No model faith, religious endorsement or community-wide preference is inferred.' : key==='grace' ? 'Showing Grace-related creative previews. The artwork is a styling concept, not official church imagery or endorsement.' : 'All collections and clearly labelled coming-soon previews are visible.';
      const target=key==='noor'?noor:key==='grace'?grace:key==='sanskari'?campaigns:nav;
      target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
    state.inserted.push('p6CollectionJumpnav');
  }

  function addRightsPanel() {
    const targetViews=[['view-sanskari','p6RightsCollections'],['view-fit','p6RightsFit']];
    targetViews.forEach(([viewId,id])=>{
      const view=$(`#${viewId}`); if(!view||$(`#${id}`)) return;
      const panel=make('section','section-block p6-rights-panel',`<div class="section-heading"><div><p class="eyebrow">IMAGE RIGHTS · RELEASE CHECK</p><h2 id="${id}Title">An image is not automatically cleared for commercial use</h2><p class="muted">Supplier access, public hosting or a generated look does not itself establish commercial permission. Keep the evidence for each individual asset.</p></div><span class="p6-education-chip">CLEARANCE REQUIRED</span></div>
        <img class="p6-rights-visual" src="./assets/phase6-image-rights-workflow.svg" width="900" height="230" loading="lazy" alt="Three-step workflow: identify the asset, record permission and release only after review">
        <div class="p6-rights-grid"><article><b>1. Identify the source</b><p>Record asset filename, source URL, creator/photographer or supplier, date acquired and whether it is AI-generated, user-supplied or licensed.</p></article><article><b>2. Check permission</b><p>Confirm written commercial-use rights, model releases where required, brand/logo permissions and any limits on editing, geography or paid ads.</p></article><article><b>3. Approve each use</b><p>Store evidence, expiry/attribution requirements and reviewer approval. Remove or replace assets whose rights are uncertain.</p></article></div>
        <p class="p6-rights-warning"><b>Current repository status:</b> this update does not claim legal clearance for all existing site photos. Items that have not been individually documented must stay labelled “rights not verified” and must not be used in paid commercial campaigns until checked.</p>`);
      panel.id=id; panel.setAttribute('aria-labelledby',`${id}Title`);
      const anchor=viewId==='view-fit'?$('.fit-layout',view):$('.coming-grid',view);
      (anchor||view.lastElementChild)?.insertAdjacentElement('afterend',panel);
      state.inserted.push(id);
    });
  }

  function addFitPrivacyHint() {
    const view=$('#view-fit'); if(!view||$('#p6FitPrivacyHint'))return;
    const hint=make('aside','p6-fit-privacy',`<b>Fit Studio privacy reminder</b><p>Photo preview is local to this browser in the existing prototype; it is not uploaded by this page. Fit notes may be stored in browser storage and are not encrypted. Avoid entering sensitive details you do not need. Clear the photo/notes when finished on a shared device.</p>`);
    hint.id='p6FitPrivacyHint'; $('.fit-layout',view)?.insertAdjacentElement('afterend',hint); state.inserted.push('p6FitPrivacyHint');
  }

  function setup() {
    addWellnessToolkit(); addCollectionJumpnav(); addRightsPanel(); addFitPrivacyHint();
    window.BLACKED_PHASE6={version:'1.0.0',rightsClearedForExistingAssets:false,getDiagnostics:()=>({loaded:true,inserted:[...state.inserted],wellnessToolkit:!!$('#p6WellnessToolkit'),collectionJumpnav:!!$('#p6CollectionJumpnav'),noorCollectionPresent:!!$('#v3NoorEditGallery'),gracePreviewPresent:!!$('#v3GracePreview'),rightsPanels:!!$('#p6RightsCollections')&&!!$('#p6RightsFit'),existingAssetRightsClaimed:false,usesOriginalSvgAssets:$$('[src^="./assets/phase6-"]').length})};
    document.documentElement.dataset.blackedPhase6='loaded';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
