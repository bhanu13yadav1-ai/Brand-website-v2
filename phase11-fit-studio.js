/* BLACKED V3 Phase 11 — measurement & Fit Studio improvements.
 * Corrects unit toggling in the existing worksheet before the legacy listener reads fields.
 * Never predicts a BLACKED size without an owner-verified product chart.
 */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE11) return;
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
  const state = { built:false, unitSwitches:0, conversions:0, guidedJumps:0, errors:[], lastUnit:null };
  const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const fields=[['measureBust','Bust / fullest part'],['measureUnderbust','Underbust / ribcage'],['measureWaist','Natural waist'],['measureHips','Fullest hips']];
  const concerns=[
    ['band','Bra band rides up at the back'],['cup-spill','Cup tissue spills over the edge'],['cup-gap','Cup wrinkles or gaps'],['strap','Straps slip or dig in'],['wire','Underwire pinches or sits on breast tissue'],['brief','Brief waistband or leg opening feels tight'],['bodysuit','Bodysuit pulls, gaps or feels restrictive']
  ];
  function build(){
    const view=$('#view-fit');const intro=view?.querySelector('.page-intro');
    if(!view||!intro||$('#v11FitGuide'))return;
    const section=make('section','section-block v11-fit-guide');section.id='v11FitGuide';section.setAttribute('aria-labelledby','v11FitGuideTitle');
    const head=make('div','v11-fit-head');const left=make('div');left.append(make('p','eyebrow','PHASE 11 · MEASUREMENT & FIT STUDIO'),make('h2','','Measure clearly. Choose by comfort.'),make('p','muted','A guided path for your existing measurement worksheet, garment fit cues, and Fit Passport. This tool summarizes measurements—it does not invent a size.'));
    left.querySelector('h2').id='v11FitGuideTitle';head.append(left,make('span','pill','No fake size prediction'));section.append(head);
    const steps=make('div','v11-measure-steps');
    const stepData=[
      ['01','Prepare','Use a soft tape over light, comfortable clothing. Stand naturally and keep the tape level; do not compress skin.'],
      ['02','Measure','Bust: fullest part. Underbust: directly beneath the breasts. Waist: natural waist. Hips: fullest part of hips. Repeat once for consistency.'],
      ['03','Compare','Use the exact product maker’s chart. Brand charts differ; do not convert a body measurement into a size without that chart.']
    ];
    stepData.forEach(([n,t,d])=>{const card=make('article','v11-step-card');card.append(make('span','v11-step-number',n),make('h3','',t),make('p','',d));steps.append(card);});section.append(steps);
    const actions=make('div','button-row v11-fit-actions');const start=make('button','btn primary','Open measurement worksheet ↗');start.type='button';start.id='v11OpenMeasurements';const fit=make('button','btn secondary','Check a garment fit cue ↗');fit.type='button';fit.id='v11OpenFitCue';actions.append(start,fit);section.append(actions);
    const privacy=make('aside','v11-fit-privacy');privacy.append(make('strong','','Private by choice'),make('p','', 'Measurements are saved only if you explicitly tick the existing “Save these measurements on this device only” option. Browser-local data is not encrypted or synced; use the existing Privacy & data controls to clear it. A photo preview is local to this page and is not uploaded.'));section.append(privacy);
    intro.insertAdjacentElement('afterend',section);state.built=true;
    start.addEventListener('click',()=>jumpToWellness('#measurementForm'));
    fit.addEventListener('click',()=>jumpToWellness('#v11FitCueChooser'));
    addFitCueChooser();repairUnitSwitching();addUnitBadges();
    // Explicitly expose status for the browser diagnostics page.
    window.BLACKED_V3_PHASE11={getDiagnostics:diagnostics,jumpToWellness,convertUnits:convertFields};
  }
  function addFitCueChooser(){
    const section=$('#v11FitGuide');if(!section||$('#v11FitCueChooser'))return;
    const panel=make('div','v11-fit-cue-chooser');panel.id='v11FitCueChooser';panel.setAttribute('aria-labelledby','v11FitCueTitle');panel.append(make('h3','','What feels uncomfortable?'),make('p','muted','Choose a garment cue to open the existing general guidance in Wellness. This is fit guidance, not medical advice.'));
    const label=make('label','field','Fit cue');const select=make('select');select.id='v11FitConcern';select.name='fitConcern';concerns.forEach(([v,t])=>{const o=make('option','',t);o.value=v;select.append(o)});label.append(select);
    const btn=make('button','btn secondary','Explain this fit cue ↗');btn.type='button';btn.id='v11ExplainFitCue';panel.append(label,btn);section.append(panel);
    btn.addEventListener('click',()=>jumpToWellness('#fitCueTitle',select.value));
  }
  function jumpToWellness(anchor,concern){
    const nav=$('[data-view-link="wellness"]');if(nav)nav.click();
    state.guidedJumps++;
    window.setTimeout(()=>{
      const target=$(anchor);if(!target)return;
      if(concern&&$('#fitConcern')){$('#fitConcern').value=concern;$('#fitCueExplain')?.click();}
      target.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      if(anchor==='#measurementForm'){$('#measurementForm')?.querySelector('select,input')?.focus({preventScroll:true});}
    },220);
  }
  function setRangeAttributes(unit){
    const min=unit==='cm'?'20':'7.9';const max=unit==='cm'?'220':'86.6';
    fields.forEach(([id])=>{const input=$('#'+id);if(!input)return;input.min=min;input.max=max;input.step='0.1';input.setAttribute('aria-describedby','v11MeasurementUnitHelp');});
    const note=$('#v11MeasurementUnitHelp');if(note)note.textContent=unit==='cm'?'All four fields now use centimetres (cm). Changing the unit converts values already entered.':'All four fields now use inches (in). Changing the unit converts values already entered.';
  }
  function convertFields(from,to){
    if(from===to)return 0;let count=0;
    fields.forEach(([id])=>{const input=$('#'+id);if(!input||input.value.trim()==='')return;const n=Number(input.value);if(!Number.isFinite(n))return;const next=from==='cm'?n/2.54:n*2.54;input.value=(Math.round(next*10)/10).toFixed(1);count++;});
    setRangeAttributes(to);return count;
  }
  function repairUnitSwitching(){
    const unit=$('#measurementUnit');if(!unit)return;state.lastUnit=unit.value;setRangeAttributes(unit.value);
    // Capture phase runs before app.js's existing target-level change listener.
    document.addEventListener('change',event=>{
      if(event.target!==unit)return;
      const next=unit.value;const previous=state.lastUnit||next;
      if(previous!==next){state.unitSwitches++;state.conversions+=convertFields(previous,next);state.lastUnit=next;}
      setTimeout(()=>{
        const status=$('#measurementStatus');if(status)status.textContent=previous===next?`All values use ${next==='cm'?'centimetres (cm)':'inches (in)'}. No values were converted.`:`Existing values converted from ${previous==='cm'?'centimetres':'inches'} to ${next==='cm'?'centimetres':'inches'}. Review the summary again; no product size is predicted.`;
      },0);
    },true);
    unit.addEventListener('change',()=>setRangeAttributes(unit.value));
    unit.insertAdjacentElement('afterend',make('p','v11-unit-help','Switching cm/in converts values already entered so the worksheet does not misread the unit.'));
    const form=$('#measurementForm');if(form){const help=make('p','micro v11-unit-help','');help.id='v11MeasurementUnitHelp';help.setAttribute('aria-live','polite');unit.parentElement.insertAdjacentElement('afterend',help);setRangeAttributes(unit.value);}
    const save=$('#saveMeasurementsOptIn');if(save){const note=make('p','v11-save-note','Saving is optional. If enabled, measurements stay in this browser only and are not encrypted or synced.');save.closest('.opt-in-save')?.append(note);}
  }
  function addUnitBadges(){
    const unit=$('#measurementUnit');if(!unit)return;
    function update(){const label=unit.value==='cm'?'cm':'in';fields.forEach(([id])=>{const input=$('#'+id);const l=input?.closest('label');if(!l)return;let suffix=l.querySelector('.v11-unit-suffix');if(!suffix){suffix=make('span','v11-unit-suffix');l.append(suffix);}suffix.textContent=`Measurement (${label})`;});}
    unit.addEventListener('change',update);update();
    fields.forEach(([id])=>$('#'+id)?.addEventListener('input',()=>{const n=Number($('#'+id).value);const unitValue=$('#measurementUnit')?.value||'cm';const valid=$('#'+id).value.trim()===''||(Number.isFinite(n)&&n>=(unitValue==='cm'?20:7.9)&&n<=(unitValue==='cm'?220:86.6));$('#'+id).setAttribute('aria-invalid',String(!valid));}));
  }
  function diagnostics(){return {loaded:!!$('#v11FitGuide'),stepCards:$('#v11FitGuide')?.querySelectorAll('.v11-step-card').length||0,worksheetFound:!!$('#measurementForm'),unitSelectFound:!!$('#measurementUnit'),unitSwitchingConverted:state.unitSwitches>0,unitSwitchEvents:state.unitSwitches,valuesConverted:state.conversions,fitCueBridge:!!$('#v11ExplainFitCue'),savedOnlyByExistingOptIn:!!$('#saveMeasurementsOptIn'),verifiedProductChartConfigured:(()=>{const note=$('.chart-not-configured')?.textContent||'';return !!note&&!/not configured/i.test(note);})(),guideJumps:state.guidedJumps,errors:[...state.errors]};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();
