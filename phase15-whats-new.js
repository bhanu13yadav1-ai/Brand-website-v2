/* BLACKED V3 Phase 15 — visible V3 release highlights and unified release diagnostics. */
(() => {
  'use strict';
  if(window.BLACKED_V3_PHASE15)return;
  const $=(s,r=document)=>r.querySelector(s);
  const state={built:false,version:'V3 Final · Phases 12–15',errors:[]};
  const features=[
    {view:'boyfriend',target:'#v9AfterDarkStudio',eyebrow:'PHASE 09 · 18+',title:'After Dark Studio',desc:'Mood-based fictional prompts, optional favourites, reroll and skip/stop controls.',cta:'Open After Dark'},
    {view:'wellness',target:'#v10FluidEducation',eyebrow:'PHASE 10 · WELLNESS',title:'Women’s Wellness Guide',desc:'Clear differences between everyday discharge, arousal-related lubrication and fluid release—with trusted sources.',cta:'Read wellness guide'},
    {view:'fit',target:'#v11FitGuide',eyebrow:'PHASE 11 · FIT',title:'Fit Studio',desc:'Step-by-step fit cues, unit-safe measurement flow and optional local-only notes.',cta:'Open Fit Studio'},
    {view:'home',target:'#v12WheelHub',eyebrow:'PHASE 12 · FOUR WHEELS',title:'One Wheel Hub',desc:'Three original wheel locations plus the separate Wild Wheel in one directory.',cta:'Explore all wheels'},
    {view:'boyfriend',target:'#v13CouplesStudio',eyebrow:'PHASE 13 · COUPLES',title:'Couples Studio',desc:'Organized campaign albums, romance/date filters and shortcuts to existing couple tools.',cta:'Open Couples Studio'},
    {view:'home',target:'#v14PrivacyExport',eyebrow:'PHASE 14 · CONTROL',title:'Privacy & Reliability',desc:'Download your locally saved app data, visible broken-image statuses, keyboard focus and reduced-motion support.',cta:'See privacy tools'},
    {view:'home',target:'#v15ReleaseHighlights',eyebrow:'PHASE 15 · RELEASE',title:'Release Diagnostics',desc:'A single checklist for loaders, views, wheels, galleries, source paths and PWA status.',cta:'Review release status'}
  ];
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  function navigate(feature){
    if(feature.view!=='home'){
      const nav=$(`[data-view-link="${feature.view}"]`);if(nav)nav.click();
    }
    setTimeout(()=>{const target=$(feature.target);const view=target?.closest('.view');if(target&&(!view||view.classList.contains('active')))target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},900);
  }
  function build(){
    const home=$('#view-home');if(!home){state.errors.push('Home view not found');return;}
    if($('#v15ReleaseHighlights')){state.built=true;return;}
    const section=make('section','v15-release-highlights');section.id='v15ReleaseHighlights';section.setAttribute('aria-labelledby','v15WhatsNewTitle');
    const head=make('div','v15-release-head');const copy=make('div');copy.append(make('p','eyebrow','BLACKED V3 · WHAT’S NEW'));
    const h=make('h2','','New features, right at the top.');h.id='v15WhatsNewTitle';copy.append(h,make('p','v15-release-lede','A quick guide to the biggest upgrades. Existing collections, stories, saved data and original wheel locations stay in place.'));
    head.append(copy,make('span','v15-release-pill','V3 RELEASE HIGHLIGHTS'));section.append(head);
    function makeCard(feature,i){
      const card=make('article','v15-release-card');const number=make('span','v15-release-number',String(i+1).padStart(2,'0'));const tag=make('p','v15-release-eyebrow',feature.eyebrow);const title=make('h3','',feature.title);const desc=make('p','v15-release-desc',feature.desc);const btn=make('button','btn secondary',feature.cta+' ↗');btn.type='button';btn.dataset.v15Feature=String(i);btn.setAttribute('aria-label',feature.cta);card.append(number,tag,title,desc,btn);return card;
    }
    const grid=make('div','v15-release-grid');grid.id='v15ReleaseGrid';
    features.slice(0,3).forEach((feature,i)=>grid.append(makeCard(feature,i)));
    section.append(grid);
    const more=document.createElement('details');more.className='v15-release-more';more.id='v15ReleaseMore';
    const summary=make('summary','','Explore 4 more updates · Wheels, Couples, Privacy & Diagnostics');more.append(summary);
    const moreGrid=make('div','v15-release-more-grid');moreGrid.id='v15ReleaseMoreGrid';
    features.slice(3).forEach((feature,index)=>moreGrid.append(makeCard(feature,index+3)));
    more.append(moreGrid);section.append(more);
    const note=make('p','v15-release-note','This is a feature guide, not a deployment claim. Live release status is shown in diagnostics; a prepared ZIP is not the same as a published GitHub Pages release.');section.append(note);
    const hero=home.querySelector('.hero');if(hero)home.insertBefore(section,hero);else home.prepend(section);state.built=true;
  }
  document.addEventListener('click',event=>{const b=event.target.closest('[data-v15-feature]');if(!b)return;const item=features[Number(b.dataset.v15Feature)];if(item)navigate(item);});
  function diagnostics(){
    const modules={phase2Collections:window.BLACKED_V3_PHASE12?.getDiagnostics?.()||null,phase12:window.BLACKED_V3_PHASE12_WHEELS?.getDiagnostics?.()||null,phase13:window.BLACKED_V3_PHASE13?.getDiagnostics?.()||null,phase14:window.BLACKED_V3_PHASE14?.getDiagnostics?.()||null,phase15:{loaded:true,built:!!$('#v15ReleaseHighlights'),featureCount:$('#v15ReleaseHighlights')?.querySelectorAll('[data-v15-feature]').length||0,additionalFeaturesExpandable:!!$('#v15ReleaseMore')&&!$('#v15ReleaseMore').open}};
    const wheelNodes={dildo:!!$('[data-wheel-disc="dildo"]'),plug:!!$('[data-wheel-disc="plug"]'),boy:!!$('[data-wheel-disc="boy"]'),wild:!!$('[data-wheel-disc="wild"]')};
    const img=[...document.images];
    return {release:state.version,whatsNewAtTop:!!$('#v15ReleaseHighlights')&&$('#view-home')?.firstElementChild?.id==='v15ReleaseHighlights',loader:window.BLACKED_V3_FINAL_RELEASE?.getDiagnostics?.()||null,views:[...document.querySelectorAll('.view')].map(v=>({id:v.id,name:v.dataset.view,exists:true})),phase7:window.BLACKED_V3_PHASE78?.getDiagnostics?.()||null,phase9:window.BLACKED_V3_PHASE9?.getDiagnostics?.()||null,phase10:window.BLACKED_V3_PHASE10?.getDiagnostics?.()||null,phase11:window.BLACKED_V3_PHASE11?.getDiagnostics?.()||null,phase12:modules.phase12,phase13:modules.phase13,phase14:modules.phase14,wheelNodes,storyTools:!!$('#storyGrid')&&!!$('#storySearch')&&!!$('#storyCategory'),imageCount:img.length,imageLoaded:img.filter(i=>i.complete&&i.naturalWidth>0).length,imageFailed:img.filter(i=>i.complete&&i.naturalWidth===0&&!!(i.currentSrc||i.getAttribute('src'))).length,serviceWorkerSupported:'serviceWorker'in navigator,errors:[...state.errors]};
  }
  function boot(){build();window.BLACKED_V3_PHASE15={getDiagnostics:diagnostics,features:features.map(x=>({...x}))};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
