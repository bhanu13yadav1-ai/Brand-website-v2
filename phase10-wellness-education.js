/* BLACKED V3 Phase 10 — evidence-linked wellness and natural fluid education.
 * General education only; no diagnosis, no explicit imagery, and no user answers are stored.
 */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE10) return;
  const $ = (s, r=document) => r.querySelector(s);
  const state = { built:false, checksRun:0, lastGuidance:'', errors:[] };
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const sources=[
    {label:'NHS · Vaginal discharge',url:'https://www.nhs.uk/symptoms/vaginal-discharge/'},
    {label:'Cleveland Clinic · Watery discharge and arousal',url:'https://health.clevelandclinic.org/watery-discharge'},
    {label:'Columbia University · Arousal fluid vs discharge',url:'https://goaskalice.columbia.edu/answered-questions/whats-difference-between-fluid-during-arousal-and-discharge'},
    {label:'Planned Parenthood · Sexual consent',url:'https://www.plannedparenthood.org/learn/relationships/sexual-consent'}
  ];
  function sourceLink(s){const a=el('a','',s.label+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;}
  function card(eyebrow,title,body){const a=el('article','v10-fluid-card');a.append(el('p','eyebrow',eyebrow),el('h3','',title),el('p','v10-fluid-copy',body));return a;}
  function build(){
    const view=$('#view-wellness');const existing=$('.wellness-quick-guides',view);
    if(!view||!existing||$('#v10FluidEducation'))return;
    const section=el('section','section-block v10-fluid-education');section.id='v10FluidEducation';section.setAttribute('aria-labelledby','v10FluidEducationTitle');
    const head=el('div','section-heading');const copy=el('div');copy.append(el('p','eyebrow','PHASE 10 · WOMEN’S WELLNESS · RESEARCH-LINKED'),el('h2','','Natural wetness, discharge & fluid release—clearly explained'),el('p','muted','Simple education, without embarrassment or myths. Bodies vary; this page cannot diagnose a symptom.'));
    copy.querySelector('h2').id='v10FluidEducationTitle';head.append(copy,el('span','pill','Education · not diagnosis'));section.append(head);
    const grid=el('div','v10-fluid-grid');
    grid.append(
      card('01 · EVERYDAY BODY FUNCTION','Vaginal discharge','Everyday discharge is fluid or mucus that helps keep the vagina moist and protected. It is often clear or white and does not have a strong unpleasant smell. Amount and texture can change during the menstrual cycle.'),
      card('02 · AROUSAL RESPONSE','Arousal-related lubrication','During sexual arousal, natural lubrication may increase. The amount differs from person to person and can change with hormones, medicines, stress and other factors. Less visible wetness does not automatically mean a person is not interested.'),
      card('03 · ORGASM-ASSOCIATED FLUID','Squirting / ejaculation terminology','Some people release fluid during orgasm; popular terms are used inconsistently, and this is not the same as everyday discharge. Not everyone experiences it, and it is not required for orgasm or a “successful” sexual experience.'),
      card('04 · IMPORTANT MYTH CHECK','Wetness is not consent','A body response can be involuntary. Visible wetness, an erection, clothing, previous activity or a fantasy cannot tell you whether someone agrees. Consent must be freely given, specific, informed, enthusiastic and reversible.'),
      card('05 · COMFORT & VARIATION','Dryness or changing moisture','Lubrication can vary across days and situations. Stress, some medicines, hormonal changes and life stages may affect moisture. If desired, an appropriate lubricant can help; use product directions and check compatibility with condoms or toys.'),
      card('06 · NO SHAME, NO TEST','Do not judge a body by fluid','Fluid volume cannot reliably prove desire, orgasm, fertility, sexual history or anyone’s value. Avoid “tests”, comparison or pressure. If a change worries you, a qualified clinician can help work out the cause.')
    );section.append(grid);
    const check=el('section','v10-symptom-check');check.setAttribute('aria-labelledby','v10SymptomTitle');
    const cHead=el('div','v10-symptom-head');cHead.append(el('p','eyebrow','WHEN TO ASK FOR MEDICAL ADVICE'),el('h3','','Has something changed from your usual?'),el('p','muted','Choose any signs you are concerned about. This is a signpost to care, not a diagnostic test.'));cHead.querySelector('h3').id='v10SymptomTitle';check.append(cHead);
    const checks=el('div','v10-symptom-options');checks.id='v10SymptomOptions';
    const items=[
      ['odour','A strong or unusual smell'],['colour','A noticeable change in colour or texture'],['itch','Itching, soreness or burning'],['urine','Pain when urinating'],['pelvic','Pelvic / lower abdominal pain'],['bleeding','Bleeding between periods or after sex'],['sores','Blisters, sores or a new skin change']
    ];
    items.forEach(([id,label])=>{const l=el('label','v10-symptom-option');const input=el('input');input.type='checkbox';input.id='v10Symptom-'+id;input.name='v10-symptom';input.value=id;l.append(input,el('span','',label));checks.append(l);});check.append(checks);
    const actions=el('div','button-row');const assess=el('button','btn primary','Show guidance');assess.type='button';assess.id='v10SymptomGuidance';const reset=el('button','btn ghost','Clear choices');reset.type='button';reset.id='v10SymptomReset';actions.append(assess,reset);check.append(actions);
    const result=el('div','v10-symptom-result');result.id='v10SymptomResult';result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.textContent='No answers are saved. Select any concerns to see general next-step guidance.';check.append(result);section.append(check);
    const note=el('div','v10-medical-note');note.append(el('strong','','Do not self-diagnose from colour or smell alone.'),el('p','','A clinician may ask about symptoms and, when appropriate, suggest an examination or test. Seek urgent assessment if symptoms are severe or rapidly worsening, especially with fever, severe pelvic pain or heavy bleeding.'));
    const links=el('div','v10-source-links');const refHead=el('p','eyebrow','TRUSTED SOURCES');links.append(refHead);sources.forEach(s=>{const p=el('p','');p.append(sourceLink(s));links.append(p);});note.append(links);section.append(note);
    existing.insertAdjacentElement('afterend',section);state.built=true;
    assess.addEventListener('click',showGuidance);reset.addEventListener('click',()=>{checks.querySelectorAll('input').forEach(i=>i.checked=false);result.textContent='Choices cleared. Nothing was saved; select concerns again or close this guide.';state.lastGuidance='';});
    window.BLACKED_V3_PHASE10={getDiagnostics:diagnostics,showGuidance,clear:()=>reset.click()};
  }
  function showGuidance(){
    const chosen=[...document.querySelectorAll('#v10SymptomOptions input:checked')].map(i=>i.value);const out=$('#v10SymptomResult');if(!out)return;
    state.checksRun++;
    let msg;
    if(!chosen.length) msg='No concerns selected. If the discharge is usual for you, clear or white, and without a strong unpleasant smell, that can be normal. If you are worried about any change, contact a qualified clinician.';
    else if(chosen.includes('pelvic')||chosen.includes('bleeding')) msg='Because you selected pelvic pain or unusual bleeding, contact a qualified healthcare professional promptly for advice. Seek urgent assessment for severe pain, heavy bleeding, fever or rapidly worsening symptoms.';
    else msg='A noticeable change in smell/colour/texture, itching, soreness, sores or pain when urinating is a reason to contact a GP or sexual-health clinic, especially if it persists or is unusual for you. These signs can have different causes; this page cannot tell you which one.';
    out.textContent=msg;state.lastGuidance=chosen.join(',')||'none';
  }
  function diagnostics(){return {loaded:!!$('#v10FluidEducation'),fluidCards:$('#v10FluidEducation')?.querySelectorAll('.v10-fluid-card').length||0,symptomOptions:$('#v10SymptomOptions')?.querySelectorAll('input').length||0,sourceLinks:$('#v10FluidEducation')?.querySelectorAll('a[href^="https://"]').length||0,checksRun:state.checksRun,storesAnswers:false,hasDiagnosis:false,errors:[...state.errors]};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();
