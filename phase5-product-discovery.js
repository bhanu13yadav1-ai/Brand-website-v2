/* BLACKED Phase 5 — additive product discovery and sales-readiness layer.
 * Every current app.js product is an editorial concept. This module never enables checkout.
 */
(() => {
  'use strict';
  if (window.BLACKED_PHASE5) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const state = { sellerModel: 'editorial', infoFilter: 'all', query: '', observer: null };
  const escapeText = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  const MODEL_COPY = {
    editorial: { title: 'Editorial / concept library', note: 'Current approved mode for this build. Cards are references only; prices are illustrative and do not represent an offer to sell.', needs: ['Keep sample prices visibly labelled', 'Do not accept payment or orders', 'Confirm image usage rights before commercial use'] },
    ownBrand: { title: 'Own-brand retail (planned)', note: 'Planning preview only — this selection does not turn on sales. A product owner must approve every SKU and supply verified commercial data first.', needs: ['Owner/manufacturer identity and SKU', 'Verified material, size chart, stock and final price', 'Delivery, cancellation, returns/refunds and grievance contact', 'Product/packaging labels and applicable tax/legal review', 'Commercial rights cleared for every image'] },
    affiliate: { title: 'Affiliate referral (planned)', note: 'Planning preview only. No affiliate link or commission is active in this build. Any future paid relationship must be clearly disclosed beside the relevant recommendation.', needs: ['Approved partner and live destination URL', 'Current price/availability from seller', 'Visible “affiliate / commission may be earned” disclosure', 'No untried-product claims or fabricated reviews', 'Image and logo permissions from the partner'] },
    marketplace: { title: 'Third-party marketplace (planned)', note: 'Planning preview only. The website is not currently a marketplace and does not identify or verify any third-party seller.', needs: ['Seller legal name and contact/grievance details', 'Verified listing, origin/label facts and fulfilment owner', 'Clear returns, refund, delivery and warranty terms', 'Transparent sponsored/ranking treatment where applicable', 'Privacy/data-flow and applicable India e-commerce compliance review'] }
  };

  function addBanner(view) {
    if ($('#p5ProductTruth')) return;
    const section = document.createElement('section');
    section.id = 'p5ProductTruth'; section.className = 'p5-truth-banner';
    section.setAttribute('aria-labelledby', 'p5ProductTruthTitle');
    section.innerHTML = `<div class="p5-truth-mark" aria-hidden="true">✓</div><div><p class="eyebrow">PHASE 5 · PRODUCT TRUTH</p><h2 id="p5ProductTruthTitle">Discover first. Buy only when verified.</h2><p>Current catalogue records are concept/reference entries. No confirmed stock, material, size, seller, final price or purchase URL has been provided; there is no real checkout.</p><span class="p5-status-chip">REFERENCE ONLY · SALES OFF</span></div>`;
    const intro = $('.page-intro', view); (intro || view.firstElementChild)?.insertAdjacentElement('afterend', section);
  }

  function addControls(view) {
    if ($('#p5DiscoveryControls')) return;
    const tools = document.createElement('section');
    tools.id = 'p5DiscoveryControls'; tools.className = 'p5-discovery-controls';
    tools.setAttribute('aria-labelledby', 'p5DiscoveryTitle');
    tools.innerHTML = `
      <div class="p5-control-heading"><div><p class="eyebrow">DISCOVERY TOOLS</p><h2 id="p5DiscoveryTitle">Find and evaluate a style</h2><p class="muted">Filters explain record status; they do not imply a product is in stock.</p></div><button class="btn ghost" id="p5ResetFilters" type="button">Reset filters</button></div>
      <div class="p5-filter-grid">
        <label class="field">Product evidence<select id="p5EvidenceFilter"><option value="all">All records</option><option value="reference">Concept / reference only</option><option value="verified">Verified product records</option></select></label>
        <label class="field">Seller / sales readiness<select id="p5SellerFilter"><option value="all">All readiness states</option><option value="unknown">Seller not verified</option><option value="ready">Sales-ready records</option></select></label>
        <label class="field">Compare focus<select id="p5FocusFilter"><option value="all">All information</option><option value="missing-size">Size chart missing</option><option value="missing-material">Material missing</option><option value="missing-price">Final price missing</option></select></label>
      </div>
      <div class="p5-filter-foot"><span id="p5FilterCount" role="status" aria-live="polite">Checking records…</span><span>“Verified” requires source-backed fields; a mock price is not a final price.</span></div>`;
    const toolbar = $('.toolbar', view); (toolbar || $('#catalogCount', view)?.parentElement)?.insertAdjacentElement('afterend', tools);
  }

  function addSalesModelPanel(view) {
    if ($('#p5SalesReadiness')) return;
    const section = document.createElement('section');
    section.id = 'p5SalesReadiness'; section.className = 'section-block p5-sales-panel';
    section.setAttribute('aria-labelledby', 'p5SalesTitle');
    section.innerHTML = `
      <div class="section-heading"><div><p class="eyebrow">SALES MODEL GATE</p><h2 id="p5SalesTitle">Which selling model is being considered?</h2><p class="muted">Choose a planning view. This is not an approval or checkout switch.</p></div><span class="p5-status-chip">NO LIVE SALES</span></div>
      <label class="field p5-model-select">Proposed model<select id="p5SellerModel"><option value="editorial">Editorial / concept library (current)</option><option value="ownBrand">Own-brand retail (planned)</option><option value="affiliate">Affiliate referral (planned)</option><option value="marketplace">Third-party marketplace (planned)</option></select></label>
      <div id="p5ModelGuidance" class="p5-model-guidance" aria-live="polite"></div>
      <details class="p5-seller-transparency"><summary>What a customer must see before any real purchase</summary><ul><li>Real seller/brand name and a working contact or grievance route.</li><li>Accurate product identity, material, dimensions/size chart, stock state, final price and applicable charges.</li><li>Delivery estimate, cancellation, return/refund, warranty (if any), and order support terms.</li><li>Any sponsored placement or affiliate commission disclosed clearly next to the recommendation.</li><li>Images and copy cleared for the intended commercial use; no borrowed-image assumption of permission.</li></ul><p>India compliance must be reviewed for the actual business model before launch. The E-Commerce Rules have a 2026 amendment scheduled to take effect on 1 January 2027; do not treat this prototype as legal sign-off. <a href="https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&amp;reg=48&amp;relid=294532" target="_blank" rel="noopener noreferrer">Official Government release ↗</a></p></details>`;
    const compare = $('#comparePanel', view); (compare || $('#catalogGrid', view))?.insertAdjacentElement('afterend', section);
    renderModelGuidance();
    $('#p5SellerModel').addEventListener('change', e => { state.sellerModel = e.target.value; renderModelGuidance(); });
  }

  function renderModelGuidance() {
    const host = $('#p5ModelGuidance'); if (!host) return;
    const model = MODEL_COPY[state.sellerModel] || MODEL_COPY.editorial;
    host.replaceChildren();
    const h = document.createElement('h3'); h.textContent = model.title;
    const p = document.createElement('p'); p.textContent = model.note;
    const list = document.createElement('ul');
    model.needs.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
    const stateLine = document.createElement('p'); stateLine.className = 'p5-model-blocked'; stateLine.textContent = 'STATUS: BLOCKED — no record currently meets the verified-sale requirements.';
    host.append(h,p,list,stateLine);
  }

  function decorateCards() {
    const grid = $('#catalogGrid'); if (!grid) return;
    const cards = $$('.product-card', grid);
    cards.forEach(card => {
      card.dataset.p5Evidence = 'reference'; card.dataset.p5Seller = 'unknown';
      card.dataset.p5MissingSize = 'true'; card.dataset.p5MissingMaterial = 'true'; card.dataset.p5MissingPrice = 'true';
      const copy = $('.product-card-copy', card);
      if (copy && !$('.p5-record-badge', card)) {
        const badge = document.createElement('span'); badge.className = 'p5-record-badge'; badge.textContent = 'Concept / reference · not verified for sale';
        copy.insertBefore(badge, copy.querySelector('h3') || copy.firstChild);
      }
      const price = $('.product-price', card);
      if (price && !$('.p5-price-disclaimer', price)) {
        const small = document.createElement('small'); small.className = 'p5-price-disclaimer'; small.textContent = 'Illustrative only · no offer to sell'; price.append(small);
      }
      const add = $('[data-add]', card);
      if (add) { add.textContent = 'Add demo pick'; add.setAttribute('aria-label', `Add ${$('h3',card)?.textContent || 'reference'} to sample bag; no order will be created`); }
    });
    applyFilters();
    decorateCompare();
  }

  function applyFilters() {
    const grid = $('#catalogGrid'); if (!grid) return;
    const evidence = $('#p5EvidenceFilter')?.value || 'all';
    const seller = $('#p5SellerFilter')?.value || 'all';
    const focus = $('#p5FocusFilter')?.value || 'all';
    let count = 0;
    $$('.product-card', grid).forEach(card => {
      const okEvidence = evidence === 'all' || (evidence === 'reference' && card.dataset.p5Evidence === 'reference') || (evidence === 'verified' && card.dataset.p5Evidence === 'verified');
      const okSeller = seller === 'all' || (seller === 'unknown' && card.dataset.p5Seller === 'unknown') || (seller === 'ready' && card.dataset.p5Seller === 'ready');
      const okFocus = focus === 'all' || card.dataset[`p5${focus.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join('')}`] === 'true';
      card.hidden = !(okEvidence && okSeller && okFocus); if (!card.hidden) count++;
    });
    const host = $('#p5FilterCount'); if (host) host.textContent = `${count} reference card${count===1?'':'s'} match these filters`;
    let notice = $('#p5EmptyState');
    if (count === 0 && grid.querySelector('.product-card')) {
      if (!notice) { notice=document.createElement('p'); notice.id='p5EmptyState'; notice.className='p5-empty'; notice.setAttribute('role','status'); grid.insertAdjacentElement('afterend',notice); }
      notice.textContent = evidence === 'verified' || seller === 'ready' ? 'No verified, sales-ready products are published yet. This is intentional—seller, stock and product evidence are still missing.' : 'No records match these filters. Reset the filters to view all references.';
    } else notice?.remove();
  }

  function decorateCompare() {
    $$('.compare-card').forEach(card => {
      if ($('.p5-compare-truth', card)) return;
      const note = document.createElement('p'); note.className = 'p5-compare-truth';
      note.textContent = 'Current evidence state: concept image only. Material, verified size chart, seller identity, live stock, final price and commercial image rights have not been verified.';
      card.append(note);
    });
  }

  function decorateDetailModal() {
    const body = $('#campaignModalDescription'); if (!body || $('#p5DetailTruth')) return;
    const note = document.createElement('div'); note.id = 'p5DetailTruth'; note.className = 'p5-detail-truth';
    note.innerHTML = '<b>Seller transparency</b><p>Seller: not verified · Stock: not checked · Material / size: not supplied · Final selling price: not set · Checkout: unavailable.</p><p>Any price shown in this demo is an illustrative reference, not a confirmed offer. No purchase or payment can be made here.</p>';
    body.append(note);
  }

  function setup() {
    const view = $('#view-innerwear'); if (!view) return;
    addBanner(view); addControls(view); addSalesModelPanel(view);
    ['p5EvidenceFilter','p5SellerFilter','p5FocusFilter'].forEach(id => $(`#${id}`)?.addEventListener('change', applyFilters));
    $('#p5ResetFilters')?.addEventListener('click', () => { ['p5EvidenceFilter','p5SellerFilter','p5FocusFilter'].forEach(id => { const el=$(`#${id}`); if(el) el.value='all'; }); applyFilters(); });
    const comparePanel=$('#comparePanel');
    if(comparePanel && !$('#p5CompareLimitNote')) { const note=document.createElement('p'); note.id='p5CompareLimitNote'; note.className='p5-compare-truth'; note.setAttribute('role','status'); note.setAttribute('aria-live','polite'); note.textContent='Compare up to three references at once. All comparison facts remain unverified until source evidence is reviewed.'; comparePanel.append(note); }
    document.addEventListener('click', e => {
      const clicked=e.target instanceof Element ? e.target : e.target?.parentElement;
      const btn=clicked?.closest('[data-compare]'); if(!btn)return;
      const selected=$$('.compare-card [data-compare]').map(b=>b.dataset.compare);
      const count=$$('.compare-card').length;
      if(count>=3 && !selected.includes(btn.dataset.compare)) { e.preventDefault(); e.stopPropagation(); const note=$('#p5CompareLimitNote'); if(note) note.textContent='Limit reached: compare up to three references. Remove one selection before adding another.'; }
    }, true);
    const grid = $('#catalogGrid');
    if (grid) { state.observer = new MutationObserver(() => { decorateCards(); }); state.observer.observe(grid, {childList:true,subtree:true}); decorateCards(); }
    const compareHost=$('#compareResults'); if(compareHost) new MutationObserver(decorateCompare).observe(compareHost,{childList:true,subtree:true});
    const modalBody = $('#campaignModalDescription'); if (modalBody) new MutationObserver(decorateDetailModal).observe(modalBody,{childList:true,subtree:true});
    decorateDetailModal();
    window.BLACKED_PHASE5 = { version: '1.0.0', salesEnabled: false, getDiagnostics: () => ({loaded:true, cards:$$('.product-card').length, allCardsReferenceOnly:$$('.product-card').every(c=>c.dataset.p5Evidence==='reference'), checkoutEnabled:false, sellerModel:state.sellerModel, filters:['evidence','seller','missing-size/material/price'], sellerDisclosure:!!$('#p5SalesReadiness'), detailDisclosure:!!$('#p5DetailTruth')}) };
    document.documentElement.dataset.blackedPhase5 = 'loaded';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true }); else setup();
})();
