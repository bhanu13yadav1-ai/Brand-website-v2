/* BLACKED V3 Phase 13 — adult Couples Studio and organized editorial gallery.
   Uses existing bundled assets and existing gated Boyfriend/Couples view. No sales/booking. */
(() => {
  'use strict';
  if(window.BLACKED_V3_PHASE13)return;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const state={built:false,filter:'all',cards:0,errors:[],version:'13.15.0'};
  const assets=[
    {id:'quiet',title:'Own Your Balance',image:'./own-your-balance.webp',group:'couple',tag:'COUPLE EDITORIAL',desc:'A paired fitness/editorial concept about comfort, movement and confidence.',target:'#dateMood',action:'Explore date ideas'},
    {id:'room',title:'Same Room, Different Feelings',image:'./same-room-different-feelings.webp',group:'romantic',tag:'ROMANTIC EDIT',desc:'A fictional couple mood concept for slow-burn storytelling and conversation.',target:'#makeMessage',action:'Create a message'},
    {id:'stories',title:'Same Girl, Different Stories',image:'./same-girl-different-stories.webp',group:'fantasy',tag:'FICTION · 18+',desc:'A campaign reference for separate fictional story moods; no real-person identity is implied.',target:'#v9AfterDarkStudio',action:'Open After Dark'},
    {id:'garden',title:'Garden Lace Editorial',image:'./garden-lace-trio.webp',group:'fantasy',tag:'MULTI-ADULT FICTION · 18+',desc:'An adult editorial concept. The image is campaign artwork, not product availability or proof of consent.',target:'#v9AfterDarkStudio',action:'Open fictional prompts'},
    {id:'poolside',title:'Poolside Editorial',image:'./poolside-trio-editorial.webp',group:'couple',tag:'COUPLE EDITORIAL · 18+',desc:'A bundled editorial reference for adult campaign browsing and style comparison.',target:'#v6BoyfriendStudio',action:'Return to Match Studio'},
    {id:'confidence',title:'Couple Confidence',image:'./couple-confidence.webp',group:'romantic',tag:'RELATIONSHIP MOOD',desc:'A confidence-focused reference. Comfort and boundaries stay individual, never assumed.',target:'#makeDate',action:'Plan a date'}
  ];
  const make=(t,c,txt)=>{const n=document.createElement(t);if(c)n.className=c;if(txt!==undefined)n.textContent=txt;return n;};
  function jump(target){
    const node=$(target); if(!node)return;
    const view=node.closest('.view');
    if(view&&!view.classList.contains('active')){
      const link=$(`[data-view-link="${view.dataset.view}"]`); if(link)link.click();
    }
    setTimeout(()=>{const fresh=$(target);if(fresh&&(!fresh.closest('.view')||fresh.closest('.view').classList.contains('active')))fresh.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});},850);
  }
  function build(){
    const view=$('#view-boyfriend'); if(!view){state.errors.push('Boyfriend view not found');return;}
    if($('#v13CouplesStudio')){state.built=true;return;}
    const section=make('section','section-block v13-couples-studio');section.id='v13CouplesStudio';section.setAttribute('aria-labelledby','v13CouplesTitle');
    const head=make('div','v13-couples-head');const copy=make('div');copy.append(make('p','eyebrow','PHASE 13 · COUPLES STUDIO · ADULTS 18+'));
    const h=make('h2','','A better-organized couples space');h.id='v13CouplesTitle';copy.append(h,make('p','muted','Browse reference campaigns, choose a relationship mood, or jump directly to date and message tools. Fictional concepts only—not real-person buying, booking or matching.'));
    head.append(copy);
    const filters=make('div','v13-couples-filters');filters.setAttribute('role','group');filters.setAttribute('aria-label','Filter Couples Studio cards');
    [['all','All collections'],['couple','Couples'],['romantic','Romantic'],['fantasy','Fiction · 18+']].forEach(([id,label])=>{const b=make('button','v13-filter',label);b.type='button';b.dataset.v13Filter=id;b.setAttribute('aria-pressed',String(id==='all'));filters.append(b);});
    const grid=make('div','v13-couples-grid');grid.id='v13CouplesGrid';
    assets.forEach(item=>{
      const card=make('article','v13-couple-card');card.dataset.v13Card=item.id;card.dataset.v13Group=item.group;
      const media=make('button','v13-couple-media');media.type='button';media.dataset.v13Preview=item.id;media.setAttribute('aria-label','Preview campaign: '+item.title);
      const img=document.createElement('img');img.src=item.image;img.alt=item.title+' adult editorial reference';img.loading='lazy';img.decoding='async';img.width=640;img.height=800;img.dataset.v13Photo=item.id;media.append(img);
      const body=make('div','v13-couple-copy');body.append(make('span','v13-couple-tag',item.tag),make('h3','',item.title),make('p','',item.desc));
      const action=make('button','btn secondary',item.action+' ↗');action.type='button';action.dataset.v13Action=item.id;body.append(action);card.append(media,body);grid.append(card);
    });
    const note=make('p','v13-couple-note','All participants represented in the story categories are fictional adults. Every real-life activity requires each person’s clear, freely given agreement; any prompt or photo can be skipped.');note.setAttribute('role','note');
    section.append(head,filters,grid,note);
    const legacy=$('#v6BoyfriendStudio')||view.querySelector('.page-intro');
    if(legacy)legacy.insertAdjacentElement('afterend',section);else view.prepend(section);
    state.built=true;state.cards=assets.length;applyFilter('all');
    const dialog=make('dialog','v13-preview-dialog');dialog.id='v13PhotoDialog';dialog.setAttribute('aria-labelledby','v13PreviewTitle');
    const close=make('button','v13-preview-close','Close ×');close.type='button';close.dataset.v13Close='';
    const title=make('h2','','Campaign preview');title.id='v13PreviewTitle';const image=document.createElement('img');image.alt='Selected campaign reference';image.id='v13PreviewImage';
    const caption=make('p','muted','Reference artwork only; not a stock or consent claim.');caption.id='v13PreviewCaption';dialog.append(close,title,image,caption);section.append(dialog);
  }
  function applyFilter(group){state.filter=group;const count={all:0};$$('[data-v13-filter]').forEach(b=>{const on=b.dataset.v13Filter===group;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});$$('[data-v13-card]').forEach(card=>{const show=group==='all'||card.dataset.v13Group===group;card.hidden=!show;if(show)count.all++;});const heading=$('#v13CouplesTitle');if(heading)heading.dataset.visibleCards=String(count.all);}
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-v13-filter]');if(target){applyFilter(target.dataset.v13Filter);return;}
    const route=event.target.closest('[data-v13-action]');if(route){const item=assets.find(x=>x.id===route.dataset.v13Action);if(item)jump(item.target);return;}
    const preview=event.target.closest('[data-v13-preview]');if(preview){const item=assets.find(x=>x.id===preview.dataset.v13Preview);if(!item)return;const d=$('#v13PhotoDialog');$('#v13PreviewTitle').textContent=item.title;$('#v13PreviewImage').src=item.image;$('#v13PreviewImage').alt=item.title+' full-size reference';$('#v13PreviewCaption').textContent=item.desc+' This is illustrative campaign art only.';if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');return;}
    if(event.target.closest('[data-v13-close]')){const d=$('#v13PhotoDialog');if(d?.open&&d.close)d.close();else d?.removeAttribute('open');}
  });
  function diagnostics(){return {loaded:true,built:!!$('#v13CouplesStudio'),cards:$('#v13CouplesGrid')?.querySelectorAll('[data-v13-card]').length||0,filters:$('#v13CouplesStudio')?.querySelectorAll('[data-v13-filter]').length||0,visibleCards:$('#v13CouplesGrid')?[...$('#v13CouplesGrid').querySelectorAll('[data-v13-card]')].filter(x=>!x.hidden).length:0,errors:[...state.errors]};}
  function boot(){build();window.BLACKED_V3_PHASE13={getDiagnostics:diagnostics,filter:applyFilter};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
