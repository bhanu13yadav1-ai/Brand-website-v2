/* BLACKED V3 Phase 6 — a visibly redesigned fictional Boyfriend / Fantasy Studio.
   Character portraits are crops of the user's reference board; no real-person identity,
   anatomy, availability, booking or sale is represented. All answers stay in this page. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE6) return;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const state = { version:'5.6.0', studioBuilt:false, selectedArchetype:'romantic', galleryCardsAdded:0, innerwearCardsAdded:0, lastChoice:null, errors:[] };
  const asset = path => `./assets/${path}`;
  const make = (tag, cls='', text) => { const el=document.createElement(tag); if(cls)el.className=cls; if(text!==undefined)el.textContent=text; return el; };
  const archetypes = [
    {id:'romantic',title:'The Romantic',energy:'Warm · thoughtful · date-night',desc:'A slow-burn fictional character style, caring dialogue and thoughtful dates.',image:'boyfriend-studio-v3/match-romantic.webp',scenario:'romantic'},
    {id:'confident',title:'The Confident One',energy:'Self-assured · direct',desc:'Confident banter, clear communication and equal say for both people.',image:'boyfriend-studio-v3/match-confident.webp',scenario:'roleplay'},
    {id:'active',title:'The Active One',energy:'Fitness · outdoors · energy',desc:'Movement, shared goals and active-date campaign inspiration.',image:'boyfriend-studio-v3/match-active.webp',scenario:'active'},
    {id:'sturdy',title:'The Strong Presence',energy:'Grounded · steady · bold',desc:'A fictional visual archetype—not a promise about anatomy or real-life behaviour.',image:'boyfriend-studio-v3/match-sturdy.webp',scenario:'dark-romance'},
    {id:'couple-plus-one',title:'Couple + One',energy:'Three-adult fiction · 18+',desc:'Explore fictional three-person stories and agreement-first conversation prompts.',image:'boyfriend-studio-v3/match-couple-plus-one.webp',scenario:'couple-plus-one'},
    {id:'multi-adult',title:'Multi-Adult Story',energy:'Multiple characters · 18+',desc:'A separate fictional campaign/story route. Every adult can freely agree, pause or opt out.',image:'boyfriend-studio-v3/match-multi-adult.webp',scenario:'multi-adult'}
  ];
  const scenarioNames={
    romantic:'Romance & date-night fiction',
    roleplay:'Roleplay-inspired dialogue (fiction)',
    'dark-romance':'Dark romance & mystery fiction',
    'couple-plus-one':'Couple + One · separate 18+ collection',
    'multi-adult':'Multi-adult fantasy · separate 18+ collection',
    'size-guide':'Size reference & body education',
    active:'Active date & shared-interest ideas'
  };
  const sizeNames={none:'No size preference',small:'Up to 10 cm · selected reference only',medium:'10–12 cm · selected reference only',large:'12–14 cm · selected reference only',xl:'14+ cm · selected reference only',unsure:'Not sure — show education, not a prediction'};
  const moodNames={gentle:'Gentle',playful:'Playful',confident:'Confident',mysterious:'Mysterious',talk:'Communication-first'};

  function navigate(view, anchor='') {
    const button=$(`[data-view-link="${view}"]`);
    if(button) button.click();
    if(anchor) setTimeout(()=>{const target=$(anchor); if(target)target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},500);
  }
  function buildHeroAndMatchCards(view) {
    if ($('#v6BoyfriendStudio')) return;
    const intro=view.querySelector('.page-intro'); if(!intro)return;
    const section=make('section','section-block v6-boyfriend-studio'); section.id='v6BoyfriendStudio'; section.setAttribute('aria-labelledby','v6BoyfriendStudioTitle');
    const hero=make('div','v6-bfs-hero');
    const copy=make('div','v6-bfs-hero-copy');
    copy.append(make('p','eyebrow','BLACKED V3 · BOYFRIEND STUDIO · 18+'));
    const h=make('h2','v6-bfs-title','Choose your match.'); h.id='v6BoyfriendStudioTitle'; copy.append(h);
    copy.append(make('p','v6-bfs-lede','Different character vibes. Different fictional fantasies. Your preferences and your boundaries.'));
    const chips=make('div','v6-bfs-pills'); ['Choose a character','Pick your story','Keep it voluntary'].forEach(t=>chips.append(make('span','v6-bfs-pill',t)));
    const boardLink=make('a','v6-board-link','Open your original “Choose Your Match” board ↗'); boardLink.href=asset('boyfriend-studio-v3/choose-your-match-board.webp'); boardLink.target='_blank'; boardLink.rel='noopener noreferrer';
    copy.append(chips,boardLink,make('p','v6-bfs-disclaimer','Fictional archetypes only. This is not a marketplace for buying, booking or identifying real people. The cards do not claim real-person measurements or availability.'));
    const heroMedia=make('div','v6-bfs-hero-media');
    const heroImg=document.createElement('img'); heroImg.src=asset('boyfriend-studio-v3/match-romantic.webp'); heroImg.alt='Fictional adult male character portrait used as a romantic archetype reference'; heroImg.loading='eager'; heroImg.decoding='async'; heroImg.width=400; heroImg.height=500; heroImg.dataset.v6Asset='match-romantic';
    const heroCaption=make('div','v6-bfs-hero-caption'); heroCaption.append(make('span','v6-bfs-kicker','FEATURED ARCHETYPE'),make('strong','','The Romantic'),make('small','','Warm · thoughtful · date-night')); heroMedia.append(heroImg,heroCaption);
    hero.append(copy,heroMedia); section.append(hero);
    const matchHead=make('div','v6-bfs-section-head'); const matchCopy=make('div');
    matchCopy.append(make('p','eyebrow','01 · FICTIONAL CHARACTER ARCHETYPES'));
    const matchTitle=make('h3','','Choose a vibe, not a real person'); matchTitle.id='v6MatchCardsTitle'; matchCopy.append(matchTitle,make('p','muted','Tap a card to select it. The selection only changes the suggestions on this screen.'));
    matchHead.append(matchCopy); section.append(matchHead);
    const grid=make('div','v6-match-grid'); grid.id='v6MatchGrid';
    archetypes.forEach(profile=>{
      const card=make('article','v6-match-card'); card.dataset.archetype=profile.id;
      const button=make('button','v6-match-select'); button.type='button'; button.dataset.v6SelectArchetype=profile.id; button.setAttribute('aria-pressed',profile.id===state.selectedArchetype?'true':'false'); button.setAttribute('aria-label',`Select fictional archetype ${profile.title}`);
      const img=document.createElement('img'); img.src=asset(profile.image); img.alt=`Fictional ${profile.title.toLowerCase()} character portrait`; img.loading='lazy'; img.decoding='async'; img.width=400; img.height=500; img.dataset.v6Asset=profile.id;
      const body=make('div','v6-match-copy'); body.append(make('span','v6-match-energy',profile.energy),make('h4','',profile.title),make('p','',profile.desc));
      const cta=make('span','v6-match-cta',profile.id===state.selectedArchetype?'Selected ✓':'Select this style'); body.append(cta); button.append(img,body); card.append(button); grid.append(card);
    });
    section.append(grid);
    const status=make('p','v6-bfs-status','Selected: The Romantic.'); status.id='v6ArchetypeStatus'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); section.append(status);
    // Insert directly after the page introduction so the redesign is obvious on first view.
    intro.insertAdjacentElement('afterend',section);
    state.studioBuilt=true;
  }
  function buildFantasyBuilder() {
    if ($('#v6FantasyBuilder')) return;
    const studio=$('#v6BoyfriendStudio'); if(!studio)return;
    const section=make('section','v6-fantasy-builder'); section.id='v6FantasyBuilder'; section.setAttribute('aria-labelledby','v6FantasyBuilderTitle');
    const header=make('div','v6-bfs-section-head'); const inner=make('div'); inner.append(make('p','eyebrow','02 · BUILD YOUR FICTIONAL MATCH'));
    const h=make('h3','','Choose the kind of story you want'); h.id='v6FantasyBuilderTitle'; inner.append(h,make('p','muted','Set your mood, optional size-reference filter and fantasy category. Nothing is saved or sent.')); header.append(inner); section.append(header);
    const form=make('form','v6-fantasy-form'); form.id='v6FantasyBuilderForm';
    function field(id,title,options){const label=make('label','field',title); const select=make('select');select.id=id;select.name=id;options.forEach(([value,text])=>{const opt=make('option','',text);opt.value=value;select.append(opt);});label.append(select);return label;}
    form.append(
      field('v6StoryType','Fantasy / story type',[
        ['romantic','Romantic boyfriend / date-night'],['roleplay','Roleplay-inspired dialogue'],['dark-romance','Dark romance / mystery'],['active','Active date / shared interests'],['couple-plus-one','Couple + One · 18+ fiction'],['multi-adult','Multiple adults · 18+ fiction'],['size-guide','Size guide & body education']
      ]),
      field('v6StoryMood','Character energy',[['gentle','Gentle'],['playful','Playful'],['confident','Confident'],['mysterious','Mysterious'],['talk','Communication-first']]),
      field('v6SizePreference','Optional size-reference filter',[['none','No preference'],['small','Up to 10 cm · reference label'],['medium','10–12 cm · reference label'],['large','12–14 cm · reference label'],['xl','14+ cm · reference label'],['unsure','Not sure — show education']])
    );
    const noteLabel=make('label','field v6-custom-field','Optional custom vibe (non-graphic)');
    const textarea=document.createElement('textarea');textarea.id='v6CustomVibe';textarea.name='vibe';textarea.maxLength=180;textarea.rows=2;textarea.placeholder='e.g. romantic surprise, playful banter, dark mystery…';textarea.setAttribute('aria-describedby','v6CustomHelp');
    noteLabel.append(textarea);form.append(noteLabel);
    const helper=make('p','v6-bfs-help','Size options are your selected reference only. They do not describe any character, verify real anatomy, predict compatibility or guarantee pleasure.');helper.id='v6CustomHelp';form.append(helper);
    const actions=make('div','v6-bfs-actions');const submit=make('button','btn primary','Build my match ↗');submit.type='submit';const reset=make('button','btn ghost','Reset choices');reset.type='reset';actions.append(submit,reset);form.append(actions);section.append(form);
    const result=make('div','v6-fantasy-result');result.id='v6FantasyResult';result.hidden=true;result.setAttribute('role','status');result.setAttribute('aria-live','polite');section.append(result);
    studio.append(section);
    form.addEventListener('submit',event=>{event.preventDefault();renderResult(result);});
    form.addEventListener('reset',()=>setTimeout(()=>{result.hidden=true;result.replaceChildren();},0));
  }
  function collapseLegacyRouter() {
    const old=$('#v3FantasyStudio');
    if(!old || old.closest('#v6LegacyRouterDetails')) return;
    const details=make('details','v6-legacy-router'); details.id='v6LegacyRouterDetails';
    const summary=make('summary','', 'More preference routes · existing Phase 4 tool');
    details.append(summary); old.parentNode.insertBefore(details,old); details.append(old);
  }
  function makePhotoCard(record, group=false) {
    const card=make('article','v3-photo-card v6-campaign-card'); card.dataset.search=`${record.title} ${record.tag} ${record.category}`.toLowerCase(); card.dataset.category=record.category; card.dataset.v6Campaign='1';
    const button=make('button','v3-photo-open'); button.type='button'; button.dataset.v3OpenPhoto=''; button.dataset.fullSrc=record.path; button.dataset.fullTitle=record.title; button.dataset.fullAlt=record.alt; button.dataset.fullNote=record.note||'Owner-supplied campaign artwork. Creative reference only; no real-person profile, availability, stock, size or religious identity is verified.'; button.setAttribute('aria-label',`Open large preview: ${record.title}`);
    const img=document.createElement('img'); img.className='v3-photo-image'; img.src=record.path; img.alt=record.alt; img.width=1024; img.height=1536; img.loading='lazy'; img.decoding='async'; img.dataset.v6Asset=record.id; img.dataset.v3PhotoAsset=record.path;
    const status=make('small','v3-photo-status','Image loading…'); img.addEventListener('load',()=>{status.textContent=`Image loaded · ${img.naturalWidth} × ${img.naturalHeight}`;card.classList.remove('v3-photo-broken');}); img.addEventListener('error',()=>{status.textContent=`Image unavailable: ${record.path}`;card.classList.add('v3-photo-broken');});
    button.append(img); const body=make('div','v3-photo-card-copy');body.append(make('small','v3-photo-tag',record.tag),make('h3','',record.title),make('p','v3-photo-caption',record.caption),status);card.append(button,body);
    if(group) card.dataset.v6GateAsset='1'; return card;
  }
  function addActiveCampaignFeature() {
    if($('#v6ActiveCampaign'))return;
    const studio=$('#v6BoyfriendStudio');if(!studio)return;
    const section=make('section','v6-active-feature section-block');section.id='v6ActiveCampaign';section.setAttribute('aria-labelledby','v6ActiveCampaignTitle');
    const img=document.createElement('img');img.src=asset('couples-gallery-v3/own-your-balance.webp');img.alt='Adult fitness and innerwear campaign concept featuring a model with a trainer in a balance pose';img.loading='lazy';img.decoding='async';img.width=1024;img.height=1536;img.dataset.v6Asset='own-your-balance';
    const copy=make('div','v6-active-copy');copy.append(make('p','eyebrow','03 · ACTIVE & COUPLE INSPIRATION'));
    const h=make('h3','','Own your balance.');h.id='v6ActiveCampaignTitle';copy.append(h,make('p','muted','A new campaign reference for confidence, movement and shared activities. Concept photography only—not a real trainer, booking or product claim.'));
    section.append(img,copy);studio.insertAdjacentElement('afterend',section);
  }
  function addInnerwearPhoto() {
    const grid=$('#v3InnerwearEditorialGalleryGrid'); if(!grid || grid.querySelector('[data-v6-asset="mirror-burgundy-set"]'))return;
    const record={id:'mirror-burgundy-set',path:asset('innerwear-gallery-v3/mirror-burgundy-set.webp'),title:'Mirror Check · Burgundy Set',tag:'NEW PHOTO · INNERWEAR',category:'pink',alt:'Adult model in a burgundy innerwear set in a warm vanity mirror campaign concept',caption:'New owner-supplied image, added after the earlier editorial cards. Reference artwork only; size, stock and exact SKU are unconfirmed.'};
    grid.append(makePhotoCard(record));state.innerwearCardsAdded++;
  }
  function addGatedGroupPhotos() {
    const protectedBox=$('#v23ThreesomeProtected'); if(!protectedBox)return;
    let section=$('#v3GroupCampaignGallery',protectedBox);
    if(!section){
      section=make('section','v3-photo-gallery v3-group-gallery');section.id='v6GroupCampaignGallery';section.setAttribute('aria-labelledby','v6GroupCampaignTitle');
      const h=make('h3','','Additional multi-adult campaign references');h.id='v6GroupCampaignTitle';section.append(h);
      protectedBox.append(section);
    }
    let grid=section.querySelector('.v3-photo-grid'); if(!grid){grid=make('div','v3-photo-grid');section.append(grid);}
    // Existing cards remain. Add new source images once, inside the second, existing 18+ self-attestation gate.
    const entries=[
      {id:'maroon-room-chemistry',path:asset('triad-gallery-v3/maroon-room-chemistry.webp'),title:'Burgundy Room · Campaign Reference',tag:'18+ GATED · NEW PHOTO',category:'group',alt:'Adult multi-person burgundy innerwear campaign reference in a warm room',caption:'Owner-supplied fashion concept; not a real-person listing.'},
      {id:'burgundy-drape-editorial',path:asset('triad-gallery-v3/burgundy-drape-editorial.webp'),title:'Burgundy Drape · Editorial',tag:'18+ GATED · NEW PHOTO',category:'drape',alt:'Adult multi-person innerwear campaign with burgundy draping',caption:'Creative styling reference; no religious identity or endorsement is inferred.'},
      {id:'noor-burgundy-editorial',path:asset('triad-gallery-v3/noor-burgundy-editorial.webp'),title:'Noor-Inspired Styling · Burgundy',tag:'18+ GATED · MODEST-STYLING CONCEPT',category:'noor',alt:'Adult fashion model in burgundy head covering in a multi-person innerwear editorial',caption:'Hijab-inspired costume/editorial styling only; it does not represent all Muslim women or imply a real model’s faith.'},
      {id:'poolside-trio-editorial',path:asset('triad-gallery-v3/poolside-trio-editorial.webp'),title:'Poolside · Black Innerwear Campaign',tag:'18+ GATED · NEW PHOTO',category:'pool',alt:'Adult multi-person black innerwear campaign in a poolside luxury setting',caption:'Owner-supplied campaign reference. No real identities or relationships are asserted.'},
      {id:'noor-seated-editorial',path:asset('triad-gallery-v3/noor-seated-editorial.webp'),title:'Noor-Inspired Seated Editorial',tag:'18+ GATED · MODEST-STYLING CONCEPT',category:'noor',alt:'Adult model in burgundy modest styling seated in a luxury campaign scene',caption:'A costume/editorial direction only—not an official religious collection or representation.'},
      {id:'garden-lace-trio',path:asset('triad-gallery-v3/garden-lace-trio.webp'),title:'Garden Light · Lace Campaign',tag:'18+ GATED · NEW PHOTO',category:'group',alt:'Adult multi-person lace innerwear campaign in a bright garden setting',caption:'Creative reference only; the website does not confirm inventory or the identities of people depicted.'},
      {id:'poolside-trio-alt',path:asset('triad-gallery-v3/poolside-trio-alt.webp'),title:'Poolside · Alternate Campaign Crop',tag:'18+ GATED · VARIANT',category:'pool',alt:'Alternate crop of an adult multi-person black innerwear campaign in a poolside setting',caption:'Retained as a separate crop variant; not a verified additional product or person.'}
    ];
    const existing=new Set($$('[data-v6-gate-asset]',grid).map(card=>card.dataset.v6GateAsset));
    // Add searchable controls once and leave original cards/actions intact.
    let tools=$('#v6GateGalleryTools',section);
    if(!tools){tools=make('div','v6-gate-gallery-tools');tools.id='v6GateGalleryTools';const label=make('label','field','Search group campaigns');const input=document.createElement('input');input.type='search';input.maxLength=80;input.id='v6GateGallerySearch';input.placeholder='Search title / mood…';label.append(input);const catLabel=make('label','field','Collection');const select=document.createElement('select');select.id='v6GateGalleryFilter';[['all','All gated references'],['group','Group editorial'],['noor','Noor-inspired styling'],['drape','Drape styling'],['pool','Poolside campaigns']].forEach(([v,t])=>{const o=make('option','',t);o.value=v;select.append(o);});catLabel.append(select);tools.append(label,catLabel);const heading=section.querySelector('.section-heading');if(heading)heading.insertAdjacentElement('afterend',tools);else section.insertBefore(tools,grid);}
    entries.forEach(record=>{
      if(grid.querySelector(`[data-v6-gate-asset="${record.id}"]`))return;
      const card=makePhotoCard(record,true);card.dataset.v6GateAsset=record.id;card.dataset.search=`${record.title} ${record.tag} ${record.category} ${record.caption}`.toLowerCase();grid.append(card);state.galleryCardsAdded++;
    });
    const input=$('#v6GateGallerySearch',section), select=$('#v6GateGalleryFilter',section);
    const filter=()=>{const q=(input?.value||'').trim().toLowerCase(),cat=select?.value||'all';let visible=0;$$('.v3-photo-card',grid).forEach(card=>{const text=card.dataset.search||`${card.textContent} ${card.dataset.category||''}`.toLowerCase();const c=card.dataset.category||'group';const ok=(!q||text.includes(q))&&(cat==='all'||c===cat);card.hidden=!ok;if(ok)visible++;});let count=$('#v6GateGalleryCount',section);if(!count){count=make('p','v3-photo-count');count.id='v6GateGalleryCount';count.setAttribute('aria-live','polite');tools.insertAdjacentElement('afterend',count);}count.textContent=`${visible} gated image references`;};
    input?.addEventListener('input',filter);select?.addEventListener('change',filter);filter();
  }
  function renderResult(host) {
    const profile=archetypes.find(p=>p.id===state.selectedArchetype)||archetypes[0];
    const type=$('#v6StoryType')?.value||profile.scenario||'romantic';
    const mood=$('#v6StoryMood')?.value||'gentle';
    const size=$('#v6SizePreference')?.value||'none';
    const custom=($('#v6CustomVibe')?.value||'').trim().slice(0,180);
    const data={profile:profile.title,scenario:scenarioNames[type]||scenarioNames.romantic,mood:moodNames[mood]||moodNames.gentle,size:sizeNames[size]||sizeNames.none,custom};state.lastChoice=data;
    host.replaceChildren();
    const header=make('div','v6-result-head');const h=make('h4','','Your fictional preference card');header.append(h,make('span','v6-result-label','LOCAL ONLY'));host.append(header);
    const summary=make('div','v6-result-summary');
    [["Selected character",data.profile],["Story route",data.scenario],["Character mood",data.mood],["Size-reference filter",data.size]].forEach(([label,value])=>{const item=make('div','v6-result-item');item.append(make('small','',label),make('strong','',value));summary.append(item);});host.append(summary);
    if(custom)host.append(make('p','v6-result-custom',`Your custom vibe: ${custom}`));
    host.append(make('p','v6-bfs-disclaimer','Nothing has been purchased, booked, saved or sent. All character cards are fictional reference archetypes. A size filter is not a real-person measurement or compatibility claim. Real intimacy requires freely given, ongoing agreement from every adult.'));
    const actions=make('div','v6-bfs-actions');const route=make('button','btn primary','Open my route ↗');route.type='button';route.addEventListener('click',()=>openRoute(type));const edit=make('button','btn ghost','Edit choices');edit.type='button';edit.addEventListener('click',()=>$('#v6StoryType')?.focus());actions.append(route,edit);host.append(actions);host.hidden=false;
  }
  function openRoute(type) {
    if(type==='size-guide') { navigate('wellness','#desiSizeGuideTitle'); return; }
    if(type==='couple-plus-one'||type==='multi-adult') {
      navigate('boyfriend','#v23ThreesomeSection');
      setTimeout(()=>{const open=$('[data-v23-open-threesome]'); if(open)open.click(); else $('#v23ThreesomeSection')?.scrollIntoView({behavior:'smooth',block:'start'});},650);
      return;
    }
    if(type==='romantic'||type==='dark-romance') { navigate('stories','#storyGrid'); return; }
    navigate('boyfriend','.prompt-grid');
  }
  function bindEvents() {
    document.addEventListener('click',event=>{
      const button=event.target.closest('[data-v6-select-archetype]');if(!button)return;
      state.selectedArchetype=button.dataset.v6SelectArchetype||'romantic';
      const profile=archetypes.find(p=>p.id===state.selectedArchetype)||archetypes[0];
      $$('.v6-match-select').forEach(b=>{const selected=b.dataset.v6SelectArchetype===state.selectedArchetype;b.setAttribute('aria-pressed',selected?'true':'false');const cta=b.querySelector('.v6-match-cta');if(cta)cta.textContent=selected?'Selected ✓':'Select this style';});
      const status=$('#v6ArchetypeStatus');if(status)status.textContent=`Selected: ${profile.title} · ${profile.energy}`;
      const heroImg=$('.v6-bfs-hero-media img');if(heroImg){heroImg.src=asset(profile.image);heroImg.alt=`Fictional ${profile.title.toLowerCase()} character portrait`;}
      const heroCaption=$('.v6-bfs-hero-caption');if(heroCaption){heroCaption.replaceChildren(make('span','v6-bfs-kicker','FEATURED ARCHETYPE'),make('strong','',profile.title),make('small','',profile.energy));}
      const type=$('#v6StoryType');if(type&&profile.scenario)type.value=profile.scenario;
      const result=$('#v6FantasyResult');if(result&&!result.hidden)renderResult(result);
    });
  }
  function boot() {
    const view=$('#view-boyfriend'); if(!view){state.errors.push('Missing #view-boyfriend section.');return;}
    buildHeroAndMatchCards(view);buildFantasyBuilder();addActiveCampaignFeature();collapseLegacyRouter();addInnerwearPhoto();addGatedGroupPhotos();bindEvents();
    window.BLACKED_V3_PHASE6={version:state.version,getDiagnostics:()=>({version:state.version,studioBuilt:!!$('#v6BoyfriendStudio'),matchCards:$('#v6MatchGrid')?.querySelectorAll('.v6-match-card').length||0,form:!!$('#v6FantasyBuilderForm'),customVibe:!!$('#v6CustomVibe'),activeCampaign:!!$('#v6ActiveCampaign'),innerwearNewPhoto:!!$('#v3InnerwearEditorialGalleryGrid [data-v6-asset="mirror-burgundy-set"]'),gatedNewPhotos:$$('[data-v6-gate-asset]').length,gatedGalleryInsideGate:!!$('#v3GroupCampaignGallery')?.closest('#v23ThreesomeProtected'),selectedArchetype:state.selectedArchetype,lastChoice:state.lastChoice,errors:[...state.errors]}),getState:()=>({...state})};
    document.documentElement.dataset.blackedV3Phase6='loaded';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
