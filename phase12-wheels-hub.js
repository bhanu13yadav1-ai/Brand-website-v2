/* BLACKED V3 Phase 12 — accessible wheel directory + compatibility diagnostics.
   Keeps the four existing wheel instances and their selection logic intact. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE12_WHEELS) return;
  const $ = (s, r=document) => r.querySelector(s);
  const state = { built:false, routesOpened:0, errors:[], version:'12.15.0' };
  const wheels = [
    { id:'dildo', title:'Dildo size guide', tag:'WELLNESS · ORIGINAL 1', view:'wellness', target:'[data-wheel-disc="dildo"]', note:'Length, widest diameter, materials and comfort—using product measurements, not a guess about anyone’s body.', kind:'Education' },
    { id:'plug', title:'Anal-toy safety guide', tag:'WELLNESS · ORIGINAL 2', view:'wellness', target:'[data-wheel-disc="plug"]', note:'Flared base, widest diameter, suitable lubricant, hygiene and stop-if-pain guidance.', kind:'Safety' },
    { id:'boy', title:'Boyfriend conversation wheel', tag:'COUPLES · ORIGINAL 3', view:'boyfriend', target:'[data-wheel-disc="boy"]', note:'Fictional prompts about comfort, honest communication and preferences. It cannot measure a real person.', kind:'Conversation' },
    { id:'wild', title:'Dirty / Wild wheel', tag:'AFTER DARK · 18+', view:'boyfriend', target:'[data-wheel-disc="wild"]', note:'Optional fictional mood prompts with clear skip and stop choices.', kind:'Fiction' }
  ];
  function node(tag, cls, txt) { const e=document.createElement(tag); if(cls)e.className=cls; if(txt!==undefined)e.textContent=txt; return e; }
  function jump(view, target, kind) {
    const button=$(`[data-view-link="${view}"]`);
    if(button) button.click();
    state.routesOpened++;
    if(kind==='wild') {
      const select=$('#wildCategory');
      if(select && [...select.options].some(o=>o.value==='fantasy')) { select.value='fantasy'; select.dispatchEvent(new Event('change',{bubbles:true})); }
    }
    window.setTimeout(()=>{
      const dest=$(target);
      const viewEl=dest?.closest('.view');
      if(dest && (!viewEl || viewEl.classList.contains('active'))) dest.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    },850);
  }
  function build() {
    const home=$('#view-home'); if(!home) { state.errors.push('Home view not found'); return; }
    if($('#v12WheelHub')) { state.built=true; return; }
    const section=node('section','section-block v12-wheel-hub'); section.id='v12WheelHub'; section.setAttribute('aria-labelledby','v12WheelHubTitle');
    const head=node('div','section-heading'); const copy=node('div');
    copy.append(node('p','eyebrow','PHASE 12 · WHEEL HUB · FOUR TOOLS'));
    const h=node('h2','','All four wheels. One clear place.'); h.id='v12WheelHubTitle'; copy.append(h);
    copy.append(node('p','muted','The three original wheel locations and the separate Wild Wheel stay in their own sections. These cards are shortcuts, not replacement wheels. Every result can be skipped.'));
    head.append(copy,node('span','pill','3 original + 1 Wild')); section.append(head);
    const grid=node('div','v12-wheel-grid');
    wheels.forEach(w=>{
      const card=node('article','v12-wheel-card');
      card.append(node('span','v12-wheel-tag',w.tag),node('h3','',w.title),node('p','',w.note),node('span','v12-wheel-kind',w.kind));
      const button=node('button','btn primary','Open wheel ↗'); button.type='button'; button.dataset.v12Wheel=w.id;
      button.setAttribute('aria-label',`Open ${w.title}`); card.append(button); grid.append(card);
    });
    section.append(grid);
    const status=node('p','v12-wheel-status','Wheel shortcuts loaded. Original wheel behaviour is retained.'); status.id='v12WheelStatus'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); section.append(status);
    const anchor=$('#v23WheelHub') || $('#homeCampaigns')?.closest('.section-block') || home.querySelector('.hero');
    if(anchor)anchor.insertAdjacentElement('afterend',section); else home.append(section);
    state.built=true;
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-v12-wheel]'); if(!button)return;
    const wheel=wheels.find(w=>w.id===button.dataset.v12Wheel); if(!wheel)return;
    jump(wheel.view,wheel.target,wheel.id);
    const status=$('#v12WheelStatus'); if(status)status.textContent=`Opening ${wheel.title}. If the 18+ notice appears, continue only if you are an adult.`;
  });
  function diagnostics(){
    return {loaded:true,built:!!$('#v12WheelHub'),wheelCards:$('#v12WheelHub')?.querySelectorAll('[data-v12-wheel]').length||0,originalWheels:{dildo:!!$('[data-wheel-disc="dildo"]'),plug:!!$('[data-wheel-disc="plug"]'),boy:!!$('[data-wheel-disc="boy"]')},wildWheel:!!$('[data-wheel-disc="wild"]'),routesOpened:state.routesOpened,errors:[...state.errors]};
  }
  function boot(){build();window.BLACKED_V3_PHASE12_WHEELS={getDiagnostics:diagnostics,getWheels:()=>wheels.map(w=>({...w}))};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
