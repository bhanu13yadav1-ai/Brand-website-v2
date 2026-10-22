/* BLACKED Super Update — Phase 3 additive experience layer.
 * Adds carefully labelled new campaign galleries and a private, in-memory
 * fictional partner-vibe card picker. Does not replace app.js or legacy phase3.js.
 */
(() => {
  'use strict';
  if (window.BLACKED_SUPER_PHASE3) return;
  const state = window.BLACKED_SUPER_PHASE3 = {
    version: '3.1.0', initialized: false, manifestLoaded: false,
    galleriesInserted: [], imageErrors: [], preferences: {},
    preferenceCompleted: false, preferenceSkipped: false, errors: [],
    manifestPath: './super-phase3-content.json'
  };
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const make = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  let manifest;
  let previewInvoker = null;

  function addRouteButton(container, label, route) {
    const b = make('button', 'sp3-related-link', label + ' ↗');
    b.type = 'button'; b.dataset.superP3Route = route;
    container.append(b);
  }

  function ensurePreviewDialog() {
    if ($('#superP3Preview')) return $('#superP3Preview');
    const dialog = make('div','sp3-preview'); dialog.id='superP3Preview'; dialog.hidden=true;
    dialog.setAttribute('role','dialog'); dialog.setAttribute('aria-modal','true');
    dialog.setAttribute('aria-labelledby','superP3PreviewTitle');
    const panel=make('div','sp3-preview__panel');
    const head=make('div','sp3-preview__head');
    const title=make('h2','', 'Campaign reference'); title.id='superP3PreviewTitle';
    const close=make('button','sp3-preview__close','Close'); close.type='button';
    close.setAttribute('aria-label','Close campaign preview');
    const img=make('img','sp3-preview__image'); img.id='superP3PreviewImage'; img.alt='';
    const note=make('p','sp3-preview__note','Concept artwork only. Product details, brand ownership and public-use rights are not independently verified.'); note.id='superP3PreviewNote';
    head.append(title,close); panel.append(head,img,note); dialog.append(panel); document.body.append(dialog);
    function dismiss() {
      if (dialog.hidden) return;
      dialog.hidden=true; document.body.classList.remove('sp3-preview-open');
      img.removeAttribute('src');
      if (previewInvoker && document.contains(previewInvoker)) previewInvoker.focus();
      previewInvoker=null;
    }
    close.addEventListener('click',dismiss);
    dialog.addEventListener('click',e=>{if(e.target===dialog)dismiss();});
    dialog.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();dismiss();}
      if(e.key==='Tab'){e.preventDefault();close.focus();}
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)dismiss();});
    dialog._show=(item,invoker)=>{
      previewInvoker=invoker;
      title.textContent=item.title; img.alt=item.alt; img.src='./'+item.relativePath;
      note.textContent=item.note+' Public/commercial permissions and brand relationship are not independently verified.';
      dialog.hidden=false; document.body.classList.add('sp3-preview-open'); close.focus();
    };
    return dialog;
  }

  function renderMediaCard(item) {
    const card=make('article','sp3-media-card'); card.dataset.assetId=item.id;
    const preview=make('button','sp3-media-card__preview'); preview.type='button';
    preview.setAttribute('aria-label','Open preview: '+item.title);
    const img=make('img','sp3-media-card__image'); img.src='./'+item.relativePath;
    img.alt=item.alt; img.width=item.width; img.height=item.height; img.loading='lazy'; img.decoding='async';
    const status=make('p','sp3-media-card__status','Image not checked yet'); status.setAttribute('aria-live','polite');
    img.addEventListener('load',()=>{status.textContent='Image loaded · '+img.naturalWidth+' × '+img.naturalHeight;},{once:true});
    img.addEventListener('error',()=>{
      card.classList.add('sp3-media-card--error'); status.textContent='Image failed to load — check asset path.';
      if(!state.imageErrors.includes(item.relativePath))state.imageErrors.push(item.relativePath);
    },{once:true});
    preview.append(img); preview.addEventListener('click',()=>ensurePreviewDialog()._show(item,preview));
    const body=make('div','sp3-media-card__body');
    const eyebrow=make('p','sp3-media-card__eyebrow',item.group.replaceAll('-',' '));
    const title=make('h3','',item.title);
    const badge=make('span','sp3-media-badge',item.brandStatus.includes('confirm')||item.brandStatus.includes('requires')?'Brand review required':'Concept only · not verified stock');
    const description=make('p','sp3-media-card__copy',item.note);
    const actions=make('div','sp3-media-card__actions');
    item.relatedRoutes.slice(0,2).forEach(route=>{
      const routeName={innerwear:'Explore Innerwear',sanskari:'Explore Collections',wellness:'Wellness 18+',boyfriend:'Boyfriend & Couples',stories:'Stories 18+'}[route]||route;
      addRouteButton(actions,routeName,route);
    });
    body.append(eyebrow,title,badge,description,status,actions); card.append(preview,body);
    return card;
  }

  function renderGallery(group, items) {
    const first=items[0];
    const section=make('section','sp3-media-section'); section.id='super-p3-gallery-'+group;
    section.setAttribute('aria-labelledby',section.id+'-title');
    const head=make('div','sp3-media-section__head');
    const eyebrow=make('p','eyebrow',first.route==='wellness'?'WELLNESS 18+ · CONCEPTS':first.route==='sanskari'?'COLLECTIONS · CAMPAIGN STUDIES':'INNERWEAR · EDITORIAL CONCEPTS');
    const title=make('h2','',({
      'personal-wellness-concepts':'Personal Wellness Concept Gallery',
      't-string-brand-studies':'T-String Collection Studies',
      'modest-editorial-concepts':'Modest-Styling Editorial Concepts',
      'noor-editorial-concepts':'Noor / Faith & Comfort Direction'
    })[group]||'Campaign concept gallery'); title.id=section.id+'-title';
    const intro=make('p','sp3-media-section__intro','Reference artwork only. These images are not verified product listings, stock claims, or medical/product advice.');
    const scope=make('span','sp3-media-section__scope','CONCEPT ONLY · BRAND / RIGHTS REVIEW REQUIRED');
    const grid=make('div','sp3-media-grid'); items.forEach(x=>grid.append(renderMediaCard(x)));
    head.append(eyebrow,title,intro,scope); section.append(head,grid);
    return section;
  }

  function mountGalleries() {
    const groups = new Map();
    for (const item of manifest.media) {
      if (!groups.has(item.route+'|'+item.group)) groups.set(item.route+'|'+item.group,[]);
      groups.get(item.route+'|'+item.group).push(item);
    }
    const inserted=[];
    for (const [key,items] of groups) {
      const [route,group]=key.split('|');
      const host=$('#view-'+route); if(!host){state.errors.push('Missing route #view-'+route);continue;}
      const id='super-p3-gallery-'+group;
      if($('#'+id)){state.galleriesInserted.push(id);continue;}
      const section=renderGallery(group,items);
      const intro=host.querySelector('.page-intro');
      if(intro)intro.insertAdjacentElement('afterend',section);else host.append(section);
      state.galleriesInserted.push(id); inserted.push(id);
    }
    return inserted;
  }

  const PREF_FIELDS = [
    {id:'height',title:'Height vibe',hint:'Choose the fictional character vibe.',options:[['tall','Taller than me'],['similar','Around my height'],['shorter','Shorter than me'],['surprise','Surprise me']]},
    {id:'build',title:'Build',hint:'Any body type is valid; this is a story preference only.',options:[['lean','Lean'],['athletic','Athletic'],['broad','Broad'],['any','Any build']]},
    {id:'appearance',title:'Appearance / complexion',hint:'Independent of anatomy or personality.',options:[['dark-skin','Dark-skinned / Black adult man'],['brown-desi','Brown / Desi look'],['varied','Mixed / varied look'],['appearance-any','No preference']]},
    {id:'personality',title:'Personality',hint:'Pick the energy, not a real person.',options:[['confident','Confident'],['caring','Caring'],['funny','Funny'],['mysterious','Quiet & mysterious']]},
    {id:'style',title:'Style',hint:'Visual art direction for a fictional adult character.',options:[['black-luxury','Black luxury'],['streetwear','Streetwear'],['classic','Classic / elegant'],['style-any','Any style']]},
    {id:'sizeTrope',title:'Size trope (optional · fictional)',hint:'Not a real measurement, recommendation or prediction.',options:[['longer-fantasy','Longer-size fantasy'],['no-size-focus','No size focus'],['unspecified','Leave anatomy unspecified'],['size-skip','Skip this detail']]},
    {id:'pigmentation',title:'Natural pigmentation (optional · fictional)',hint:'Natural variation is individual; it is not determined by race or ethnicity.',options:[['darker-pigmentation','Darker natural pigmentation'],['natural-variation','Natural variation'],['pigment-unspecified','Leave unspecified'],['pigment-skip','Skip this detail']]}
  ];

  function renderPrefField(field) {
    const fs=make('fieldset','sp3-pref-field');
    const legend=make('legend','sp3-pref-field__title',field.title); fs.append(legend);
    fs.append(make('p','sp3-pref-field__hint',field.hint));
    const grid=make('div','sp3-pref-options');
    field.options.forEach(([value,label])=>{
      const b=make('button','sp3-pref-option',label); b.type='button';
      b.dataset.prefGroup=field.id; b.dataset.prefValue=value; b.setAttribute('aria-pressed','false');
      grid.append(b);
    });
    fs.append(grid); return fs;
  }

  function ensurePreferencePanel() {
    if($('#super-p3-preferences')) return $('#super-p3-preferences');
    const host=$('#view-boyfriend'); if(!host) {state.errors.push('Missing #view-boyfriend');return null;}
    const panel=make('section','sp3-preference-panel'); panel.id='super-p3-preferences';
    panel.setAttribute('aria-labelledby','super-p3-pref-title');
    const head=make('div','sp3-preference-panel__head');
    head.append(make('p','eyebrow','BOYFRIEND & COUPLES · OPTIONAL STORY PICKER'));
    const title=make('h2','','Kaisa fictional boy chahiye?'); title.id='super-p3-pref-title';
    const intro=make('p','sp3-preference-panel__intro','Height, look, personality aur style choose karo. Ye cards sirf fictional adult character aur story-vibe ke liye hain—not real-person body guessing.');
    head.append(title,intro);
    const privacy=make('p','sp3-preference-panel__privacy','Private by design: choices stay in this page’s memory only. They are not saved to browser storage or sent to a server.');
    const form=make('div','sp3-preference-form'); form.id='super-p3-pref-form';
    PREF_FIELDS.forEach(f=>form.append(renderPrefField(f)));
    const note=make('p','sp3-preference-panel__boundary','Appearance and anatomy are separate preferences. A person’s ethnicity or skin tone does not determine genital anatomy. Real-life measurements are not guessed; every real-life interaction still requires clear, ongoing consent.');
    const actions=make('div','sp3-preference-panel__actions');
    const apply=make('button','btn primary','Create my fictional vibe card');apply.type='button';apply.id='superP3BuildVibe';
    const surprise=make('button','btn secondary','Surprise me');surprise.type='button';surprise.id='superP3Surprise';
    const skip=make('button','btn ghost','Skip preferences');skip.type='button';skip.id='superP3Skip';
    actions.append(apply,surprise,skip);
    const message=make('p','sp3-pref-status','Nothing selected yet. Choosing is optional.');message.id='superP3PrefStatus';message.setAttribute('role','status');message.setAttribute('aria-live','polite');
    const result=make('div','sp3-vibe-result');result.id='superP3VibeResult';result.hidden=true;result.setAttribute('aria-live','polite');
    panel.append(head,privacy,form,note,actions,message,result);
    const introNode=host.querySelector('.page-intro');
    if(introNode)introNode.insertAdjacentElement('afterend',panel);else host.prepend(panel);
    return panel;
  }

  function selectPref(group,value,button) {
    const field=button.closest('fieldset');
    if(!field)return;
    field.querySelectorAll('[data-pref-group]').forEach(b=>{
      const active=b===button; b.setAttribute('aria-pressed',String(active));b.classList.toggle('is-selected',active);
    });
    // Specificity options are always separate from appearance; no inference is done.
    state.preferences[group]=value;
    $('#superP3PrefStatus').textContent='Selected: '+button.textContent+'. You can change it any time.';
  }

  function fieldLabel(fieldId,value) {
    const field=PREF_FIELDS.find(f=>f.id===fieldId); if(!field)return '';
    return (field.options.find(o=>o[0]===value)||[])[1]||'';
  }
  function setPreferenceActionMode(mode) {
    const actions=$('.sp3-preference-panel__actions');
    if(!actions)return;
    actions.hidden=mode==='none';
    let reopen=$('#superP3ReopenPreferences');
    if(mode==='skip') {
      actions.hidden=false;
      actions.querySelectorAll('button').forEach(b=>{b.hidden=true;});
      if(!reopen) {
        reopen=make('button','btn secondary','Open preferences');
        reopen.type='button'; reopen.id='superP3ReopenPreferences'; actions.append(reopen);
      }
      reopen.hidden=false;
      return;
    }
    if(reopen)reopen.remove();
    actions.querySelectorAll('button').forEach(b=>{b.hidden=false;});
    if(mode==='none')actions.hidden=true;
  }

  function buildVibe() {
    const result=$('#superP3VibeResult'),form=$('#super-p3-pref-form');if(!result||!form)return;
    result.replaceChildren();result.hidden=false;form.hidden=true;
    const heading=make('h3','','Your fictional boyfriend vibe card');
    const intro=make('p','sp3-vibe-result__intro','A mood-board for a fictional adult character—not a description, measurement or prediction about any real person.');
    const grid=make('div','sp3-vibe-result__grid');
    PREF_FIELDS.forEach(field=>{
      const value=state.preferences[field.id];
      const label=value?fieldLabel(field.id,value):'No preference / let the story decide';
      const card=make('div','sp3-vibe-chip');card.append(make('span','sp3-vibe-chip__label',field.title),make('b','sp3-vibe-chip__value',label));grid.append(card);
    });
    const actions=make('div','sp3-vibe-result__actions');
    const change=make('button','btn secondary','Change preferences');change.type='button';change.id='superP3EditVibe';
    const prompt=make('button','btn primary','Explore couple prompts');prompt.type='button';prompt.id='superP3OpenPrompts';
    const clear=make('button','btn ghost','Clear this card');clear.type='button';clear.id='superP3ClearVibe';
    actions.append(change,prompt,clear);result.append(heading,intro,grid,actions);
    setPreferenceActionMode('none');
    $('#superP3PrefStatus').textContent='Vibe card created in this page only; nothing was saved or sent.';
    state.preferenceCompleted=true;state.preferenceSkipped=false;
  }
  function resetVibe() {
    state.preferences={};state.preferenceCompleted=false;state.preferenceSkipped=false;
    const form=$('#super-p3-pref-form'),result=$('#superP3VibeResult');
    if(form){form.hidden=false;form.querySelectorAll('[data-pref-group]').forEach(b=>{b.setAttribute('aria-pressed','false');b.classList.remove('is-selected');});}
    if(result){result.hidden=true;result.replaceChildren();}
    setPreferenceActionMode('all');
    const status=$('#superP3PrefStatus');if(status)status.textContent='Cleared. No preference selected.';
  }
  function jumpToWildWheel() {
    const button=$('#view-boyfriend [data-spin-wheel="wild"]');
    if(button){button.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});button.focus({preventScroll:true});}
    else {
      const host=$('#view-boyfriend .wheel-section');if(host)host.scrollIntoView({behavior:'auto',block:'start'});
      else $('#view-boyfriend .couples-grid')?.scrollIntoView({behavior:'auto',block:'start'});
    }
  }

  function installDelegatedActions() {
    document.addEventListener('click',event=>{
      const pref=event.target.closest('[data-pref-group]');
      if(pref){selectPref(pref.dataset.prefGroup,pref.dataset.prefValue,pref);return;}
      const routeButton=event.target.closest('[data-super-p3-route]');
      if(routeButton){
        const route=routeButton.dataset.superP3Route;
        const btn=document.querySelector('[data-view-link="'+route+'"]');
        if(btn)btn.click();else state.errors.push('No existing navigation target for '+route);
        return;
      }
      switch(event.target.id){
        case 'superP3BuildVibe': buildVibe(); break;
        case 'superP3Surprise':
          // Select a harmless narrative vibe, leaving anatomy unspecified and avoiding demographic guesses.
          const choose=(g,values)=>{const v=values[Math.floor(Math.random()*values.length)];const b=$('[data-pref-group="'+g+'"][data-pref-value="'+v+'"]');if(b)selectPref(g,v,b);};
          choose('height',['tall','similar','shorter','surprise']);
          choose('build',['lean','athletic','broad','any']);
          choose('personality',['confident','caring','funny','mysterious']);
          choose('style',['black-luxury','streetwear','classic','style-any']);
          [['appearance','appearance-any'],['sizeTrope','unspecified'],['pigmentation','pigment-unspecified']].forEach(([g,v])=>{const b=$('[data-pref-group="'+g+'"][data-pref-value="'+v+'"]');if(b)selectPref(g,v,b);});
          buildVibe();break;
        case 'superP3Skip':
          // Skip clears any partial choices so reopening never shows stale selected cards.
          resetVibe();state.preferenceSkipped=true;state.preferenceCompleted=false;
          const skipForm=$('#super-p3-pref-form');if(skipForm)skipForm.hidden=true;
          const skipResult=$('#superP3VibeResult');if(skipResult){skipResult.hidden=true;skipResult.replaceChildren();}
          setPreferenceActionMode('skip');
          const msg=$('#superP3PrefStatus');if(msg)msg.textContent='Skipped. You can use the existing couple features without choosing a type.';
          break;
        case 'superP3ReopenPreferences':
          const skippedForm=$('#super-p3-pref-form');if(skippedForm)skippedForm.hidden=false;
          const skippedResult=$('#superP3VibeResult');if(skippedResult)skippedResult.hidden=true;
          setPreferenceActionMode('all');state.preferenceSkipped=false;
          const reopenMsg=$('#superP3PrefStatus');if(reopenMsg)reopenMsg.textContent='You can choose any cards or skip again.';
          break;
        case 'superP3EditVibe':
          const form=$('#super-p3-pref-form'),res=$('#superP3VibeResult');if(form)form.hidden=false;if(res)res.hidden=true;setPreferenceActionMode('all');break;
        case 'superP3ClearVibe': resetVibe();break;
        case 'superP3OpenPrompts': jumpToWildWheel();break;
      }
    });
  }

  async function start() {
    ensurePreferencePanel();
    installDelegatedActions();
    try {
      const response=await fetch(state.manifestPath,{credentials:'same-origin',cache:'no-cache'});
      if(!response.ok)throw new Error('Manifest request failed: HTTP '+response.status);
      manifest=await response.json();state.manifestLoaded=true;
      mountGalleries();ensurePreviewDialog();state.initialized=true;
      document.documentElement.dataset.superPhase3='ready';
    } catch(err) {
      state.errors.push(String(err&&err.message||err));
      document.documentElement.dataset.superPhase3='manifest-error';
      console.error('[BLACKED Super Phase 3] Safe initialisation failure:',err);
    }
  }
  state.recheck=()=>({
    version:state.version,initialized:state.initialized,manifestLoaded:state.manifestLoaded,
    galleriesInserted:[...state.galleriesInserted],imageErrors:[...state.imageErrors],
    preferencePanelPresent:!!$('#super-p3-preferences'),preferenceFields:$$('#super-p3-pref-form fieldset').length,
    errors:[...state.errors]
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
