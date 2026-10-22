/* BLACKED V3 Phase 4 — home entry-point polish + fictional adult fantasy preference studio.
   Non-destructive: uses existing views, nav handlers, and the existing 18+ gate. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE34) return;
  const $ = (s, r=document) => r.querySelector(s);
  const state = { homeLinksAdded:false, fantasyStudioAdded:false, generated:0, errors:[] };
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const viewButton=(name)=>document.querySelector(`[data-view-link="${name}"]`);
  function navigate(name,anchor){
    const button=viewButton(name);
    if(button) button.click();
    if(anchor){
      // The adult view may open its existing self-attestation modal first.
      window.setTimeout(()=>{
        const target=$(anchor);
        if(target && target.closest('.view')?.classList.contains('active')) target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      },700);
    }
  }
  function addHomeShortcuts(){
    const home=$('#view-home');if(!home||home.querySelector('#v3HomeQuicklinks'))return;
    const hero=home.querySelector('.hero');if(!hero)return;
    const wrap=make('div','v3-home-quicklinks');wrap.id='v3HomeQuicklinks';wrap.setAttribute('aria-label','Quick access to new collections and adult tools');
    wrap.append(make('span','v3-home-quicklinks-label','NEW IN V3'));
    const noor=make('button','v3-home-quicklink','Noor Edit ↗');noor.type='button';noor.dataset.v3Navigate='sanskari';noor.dataset.v3Anchor='#v3NoorEditGallery';
    const gallery=make('button','v3-home-quicklink','New photo edits ↗');gallery.type='button';gallery.dataset.v3Navigate='innerwear';gallery.dataset.v3Anchor='#v3InnerwearEditorialGallery';
    const fantasy=make('button','v3-home-quicklink','Fantasy Studio · 18+ ↗');fantasy.type='button';fantasy.dataset.v3Navigate='boyfriend';fantasy.dataset.v3Anchor='#v3FantasyStudio';
    wrap.append(noor,gallery,fantasy);
    const points=hero.querySelector('.hero-points');
    if(points)points.insertAdjacentElement('afterend',wrap);else hero.append(wrap);
    state.homeLinksAdded=true;
  }
  function addFantasyStudio(){
    const view=$('#view-boyfriend');if(!view||view.querySelector('#v3FantasyStudio'))return;
    const intro=view.querySelector('.page-intro');if(!intro)return;
    const section=make('section','section-block v3-fantasy-studio');section.id='v3FantasyStudio';section.setAttribute('aria-labelledby','v3FantasyTitle');
    const heading=make('div','section-heading');const copy=make('div');
    copy.append(make('p','eyebrow','V3 · PERSONAL PREFERENCE ROUTER · 18+'),make('h2','','Find your fictional fantasy match'),make('p','muted','Pick a fictional adult character vibe, a size-reference label and a mood. This prototype routes you to a story, guide or the existing gated collection—it does not sell, book or identify real people.'));
    heading.append(copy);section.append(heading);
    const form=make('form','v3-fantasy-form');form.id='v3FantasyForm';
    const field=(id,label,options)=>{const l=make('label','field',label);const sel=make('select');sel.id=id;sel.name=id;sel.required=true;options.forEach(([value,text])=>{const opt=make('option','',text);opt.value=value;sel.append(opt);});l.append(sel);return l;};
    const fantasyOptions=[
      ['romantic','Romantic boyfriend archetype'],
      ['flirty','Flirty / teasing banter'],
      ['dark','Dark-romance fiction'],
      ['threesome','Three-person fantasy · 18+'],
      ['multi','Multi-partner fantasy & boundaries · 18+'],
      ['anal-safety','Anal-play / toy-safety education']
    ];
    const sizeOptions=[
      ['any','No size preference'],
      ['compact','Up to 10 cm · fictional reference label'],
      ['classic','10–12 cm · fictional reference label'],
      ['long','12–14 cm · fictional reference label'],
      ['xl','14+ cm · fictional reference label'],
      ['unsure','Not sure — show the educational guide']
    ];
    const moodOptions=[['soft','Soft / respectful'],['confident','Confident'],['playful','Playful'],['mysterious','Mysterious'],['talk-first','Communication-first']];
    form.append(field('v3FantasyType','What type of fantasy are you exploring?',fantasyOptions),field('v3FantasySize','Optional size-reference preference',sizeOptions),field('v3FantasyMood','Preferred character energy',moodOptions));
    const submit=make('button','btn primary','Find my fantasy route');submit.type='submit';
    const actions=make('div','button-row');actions.append(submit);
    const note=make('p','v3-fantasy-note','Important: size labels are user-selected fictional/educational filters, not measurements or claims about a real person. They do not predict pleasure or compatibility. A real partner is never bought or sold; any real-world intimacy must be voluntary, between adults, and open to stopping at any time.');
    const privacy=make('p','v3-fantasy-note','This selector does not save or send your answers. No real stock, real-person profile, checkout or companion booking is connected in this front-end prototype.');
    section.append(form,actions,note,privacy);
    const result=make('div','v3-fantasy-result');result.id='v3FantasyResult';result.hidden=true;result.setAttribute('role','status');result.setAttribute('aria-live','polite');section.append(result);
    const couples=view.querySelector('.couples-grid');
    if(couples)couples.insertAdjacentElement('beforebegin',section);else intro.insertAdjacentElement('afterend',section);
    form.addEventListener('submit',event=>{event.preventDefault();renderFantasyResult(result);});
    state.fantasyStudioAdded=true;
  }
  const fantasyMap={
    romantic:{title:'The Confident Romantic',body:'Try the existing slow-burn stories, sweet messages and date-planning tools. Look for mutual comfort instead of assuming what a partner wants.',view:'stories',anchor:'#storyGrid',action:'Explore fictional stories'},
    flirty:{title:'The Playful Tease',body:'Try the current messages and playful couple prompts. Keep the tone mutual; a prompt can always be skipped.',view:'boyfriend',anchor:'.prompt-grid',action:'Open couple prompts'},
    dark:{title:'The Dark-Romance Reader',body:'Explore fictional mystery and darker story moods. Fictional themes are separate from real-life permission and boundaries.',view:'stories',anchor:'#storyGrid',action:'Explore adult fiction'},
    threesome:{title:'Three-Person Fantasy · Fictional Route',body:'Open the existing 18+ self-attestation gate to see the separate campaign references and non-graphic communication prompts. Everyone involved must be an adult and freely agree; any person can pause or opt out.',view:'boyfriend',anchor:'#v23ThreesomeSection',action:'Open existing 18+ collection',gate:true},
    multi:{title:'Multi-Partner Fantasy · Boundaries First',body:'The site can help explore fictional themes and communication/boundary prompts, but it will not create explicit step-by-step sex instructions or treat another person as a purchasable object. Use the separate gated section for non-graphic editorial references.',view:'boyfriend',anchor:'#v23ThreesomeSection',action:'Open existing 18+ collection',gate:true},
    'anal-safety':{title:'Body & Toy-Safety Guide',body:'Use the existing wellness and size guide for non-graphic information. Prefer toys explicitly designed for the intended use, check dimensions and material from the maker, and stop if pain occurs. This is general education, not a personalised medical recommendation.',view:'wellness',anchor:'#desiSizeGuideTitle',action:'Open wellness guide'}
  };
  const sizeMap={any:'No size preference selected',compact:'Up to 10 cm (fictional reference label)',classic:'10–12 cm (fictional reference label)',long:'12–14 cm (fictional reference label)',xl:'14+ cm (fictional reference label)',unsure:'Size is uncertain; educational guide recommended'};
  const moodMap={soft:'Soft / respectful',confident:'Confident',playful:'Playful',mysterious:'Mysterious', 'talk-first':'Communication-first'};
  function renderFantasyResult(host){
    const type=$('#v3FantasyType')?.value||'romantic';const size=$('#v3FantasySize')?.value||'any';const mood=$('#v3FantasyMood')?.value||'soft';const info=fantasyMap[type]||fantasyMap.romantic;
    host.replaceChildren();host.append(make('h3','',info.title),make('p','',info.body),make('p','',`Your selections: ${sizeMap[size]||sizeMap.any} · ${moodMap[mood]||moodMap.soft}.`),make('p','small-print','Reference labels describe a preference only; they are not verified real-person dimensions, product specifications or compatibility predictions.'));
    const row=make('div','button-row');const go=make('button','btn primary',info.action+' ↗');go.type='button';go.dataset.v3Route=type;row.append(go);
    const reset=make('button','btn ghost','Change choices');reset.type='button';reset.addEventListener('click',()=>{$('#v3FantasyType').focus();host.hidden=true;});row.append(reset);host.append(row);host.hidden=false;state.generated++;
  }
  function handleRoute(type){
    const info=fantasyMap[type]||fantasyMap.romantic;
    if(info.gate){
      navigate('boyfriend');
      window.setTimeout(()=>{
        // Invoke only the existing open action; it owns the existing gate flow.
        const existing=$('[data-v23-open-threesome]');if(existing)existing.click();
      },120);
      return;
    }
    navigate(info.view,info.anchor);
  }
  function bindEvents(){
    document.addEventListener('click',event=>{
      const quick=event.target.closest('[data-v3-navigate]');
      if(quick){navigate(quick.dataset.v3Navigate,quick.dataset.v3Anchor||'');return;}
      const route=event.target.closest('[data-v3-route]');if(route){handleRoute(route.dataset.v3Route);return;}
    });
  }
  function diagnostics(){
    const base=window.BLACKED_V3_PHASE12?.getDiagnostics?.()||{};
    return {version:'1.0.0',homeLinksAdded:state.homeLinksAdded,fantasyStudioAdded:state.fantasyStudioAdded,fantasyForm:!!$('#v3FantasyForm'),fantasyResult:!!$('#v3FantasyResult'),homeQuicklinkCount:$('#v3HomeQuicklinks')?.querySelectorAll('[data-v3-navigate]').length||0,groupPhotosInsideGate:!!$('#v3GroupCampaignGallery')?.closest('#v23ThreesomeProtected'),groupGalleryCards:$('#v3GroupCampaignGallery')?.querySelectorAll('.v3-photo-card').length||0,innerwearEditorialCards:$('#v3InnerwearEditorialGalleryGrid')?.querySelectorAll('.v3-photo-card').length||0,noorGalleryCards:$('#v3NoorEditGalleryGrid')?.querySelectorAll('.v3-photo-card').length||0,generatedResults:state.generated,errors:[...state.errors],phase12:base};
  }
  function boot(){
    try{addHomeShortcuts();addFantasyStudio();bindEvents();window.BLACKED_V3_PHASE34={version:'1.0.0',getDiagnostics:diagnostics};document.documentElement.dataset.blackedV3Phase34='loaded';}
    catch(error){state.errors.push(String(error));console.error('[BLACKED V3 Phase 3/4]',error);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
