/* BLACKED V3 Phase 9 — After Dark Prompt Studio
 * Adult, fictional, consent-first prompts. Nothing is generated from or attributed to a real person.
 * Favourites are memory-only for this page session; no browser storage is used.
 */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE9) return;
  const $ = (s, r = document) => r.querySelector(s);
  const state = { built: false, generated: 0, skipped: 0, favourites: [], lastPromptId: null, errors: [] };
  const prompts = [
    {id:'rom-01',cat:'romance',tone:'gentle',intensity:'soft',title:'The almost-confession',text:'Two adult characters have been circling around their feelings. One asks, “Can I tell you something honestly, with no pressure to answer right away?”',check:'Let the other character decide whether to continue the conversation.'},
    {id:'rom-02',cat:'romance',tone:'playful',intensity:'soft',title:'A secret compliment',text:'Each person shares one specific compliment they have wanted to give. The other can accept it, return one, or pass.',check:'Keep it kind; no body comparisons.'},
    {id:'rom-03',cat:'romance',tone:'mysterious',intensity:'bold',title:'The midnight note',text:'A fictional adult finds a handwritten note that says, “Meet me where our story began—only if you want to.” Build the atmosphere and the choice that follows.',check:'The invitation is optional, even in the story.'},
    {id:'play-01',cat:'playful',tone:'playful',intensity:'soft',title:'Choose the mood',text:'Pick one together: flirty banter, a sweet date, a mystery story, or quiet time. Each person gets one veto without explaining why.',check:'A pass is a complete answer.'},
    {id:'play-02',cat:'playful',tone:'confident',intensity:'bold',title:'The confident invite',text:'Draft a direct but respectful invitation for a date or private conversation. Include an easy way to say no.',check:'Confidence never replaces consent.'},
    {id:'play-03',cat:'playful',tone:'gentle',intensity:'soft',title:'One tiny dare',text:'Take turns choosing a harmless challenge: choose a song, give a genuine compliment, or plan a surprise snack.',check:'Both people can swap or skip a dare.'},
    {id:'role-01',cat:'roleplay',tone:'mysterious',intensity:'bold',title:'Strangers at the lounge',text:'Two fictional adults meet at a late-night lounge and pretend they have never met. Write three lines of witty dialogue, then let either character break character whenever they choose.',check:'Roleplay stays inside the boundaries both characters agree to.'},
    {id:'role-02',cat:'roleplay',tone:'confident',intensity:'bold',title:'The elegant challenge',text:'One fictional character offers a playful challenge; the other negotiates a different version that feels comfortable. The fun is in the conversation, not obedience.',check:'No one owes a performance.'},
    {id:'role-03',cat:'roleplay',tone:'playful',intensity:'soft',title:'Secret admirer',text:'Write a short message from an imaginary adult admirer. Keep it flattering, specific, and easy to decline.',check:'No impersonating a real person.'},
    {id:'dark-01',cat:'dark-romance',tone:'mysterious',intensity:'dark',title:'The locked letter',text:'A dark-romance mystery begins with a sealed letter and a truth one character has been afraid to share. Build suspense through dialogue and trust, not threats.',check:'Keep tension fictional and choices reversible.'},
    {id:'dark-02',cat:'dark-romance',tone:'confident',intensity:'dark',title:'The boundary that changed the story',text:'A confident character asks what is off-limits before a dramatic scene begins. Their respect for the answer becomes the turning point.',check:'A stated limit changes what happens next.'},
    {id:'dark-03',cat:'dark-romance',tone:'gentle',intensity:'bold',title:'A pause in the storm',text:'During an intense fictional conversation, one character asks to pause. The other responds with care; the story deepens through that moment of trust.',check:'Pausing is always allowed.'},
    {id:'cou-01',cat:'couples',tone:'gentle',intensity:'soft',title:'The green-light conversation',text:'Each partner names one thing they would enjoy exploring in a conversation, one thing they are unsure about, and one thing that is a no for now.',check:'Agreement is specific and can change later.'},
    {id:'cou-02',cat:'couples',tone:'playful',intensity:'bold',title:'Two yeses, one plan',text:'Build a date or fantasy-inspired story from ideas both partners actively choose. If an idea gets one no, replace it together.',check:'A yes from one person is not a yes from both.'},
    {id:'cou-03',cat:'couples',tone:'confident',intensity:'bold',title:'Ask, do not guess',text:'Try this line: “I have an idea I would like to talk about. Would you be open to hearing it, or would you rather leave it for another time?”',check:'Respect the answer without bargaining.'},
    {id:'multi-01',cat:'multi-adult',tone:'mysterious',intensity:'dark',title:'A three-character story outline',text:'Create three adult fictional characters with their own motives, boundaries, and choices. Before the plot changes, each character gets a clear opportunity to agree, decline, or leave.',check:'The opt-in switch only filters fiction; it is not real-world consent.'},
    {id:'multi-02',cat:'multi-adult',tone:'gentle',intensity:'bold',title:'Talk through the what-if',text:'For a fictional multi-adult scenario, write the conversation that happens before anything else: expectations, safer-sex discussion, privacy, and the right to stop.',check:'Do not pressure a real partner to match a fantasy.'},
    {id:'multi-03',cat:'multi-adult',tone:'confident',intensity:'dark',title:'Every character has a voice',text:'In a fictional group scene, give every adult character a moment to state what they want, what they do not want, and whether they want to continue.',check:'No one is scenery; each person controls their own choice.'},
    {id:'priv-01',cat:'communication',tone:'gentle',intensity:'soft',title:'The private check-in',text:'Ask, “Do you want to talk about fantasies today, or would you rather do something else?” Either answer is fine.',check:'Silence, arousal, clothing, or past choices are not consent.'},
    {id:'priv-02',cat:'communication',tone:'confident',intensity:'bold',title:'A no-pressure disclosure',text:'Share a fictional idea using “I am curious about…” rather than “You should…”. Invite an honest response without expecting a yes.',check:'Curiosity is not a request that must be accepted.'},
    {id:'priv-03',cat:'communication',tone:'mysterious',intensity:'bold',title:'A safe word for the scene',text:'Two fictional adults agree on a simple pause signal and what each person will do when it is used. Then write a scene where the signal is respected immediately.',check:'A pause signal should never be debated in the moment.'},
    {id:'size-01',cat:'communication',tone:'gentle',intensity:'soft',title:'Take size out of the scorecard',text:'A couple has a candid conversation about comfort, preferences, and what they do not want to compare. The ending is mutual understanding, not a ranking.',check:'Photos and labels do not establish a real person’s measurements.'},
    {id:'size-02',cat:'communication',tone:'playful',intensity:'soft',title:'Choose the product facts',text:'For a toy-shopping fictional scene, compare manufacturer-listed insertable length, widest diameter, material, and intended use—not vague “XL” labels.',check:'Product dimensions are not a measure of human worth or compatibility.'},
    {id:'reset-01',cat:'communication',tone:'gentle',intensity:'soft',title:'Reset the evening',text:'Choose a fresh, non-sexual way to reconnect: tea, music, a walk, or a quiet check-in. The best option is the one both people want.',check:'Changing your mind is normal.'},
    {id:'date-01',cat:'romance',tone:'mysterious',intensity:'dark',title:'A date with a twist',text:'Plan a fictional evening with one mystery clue, one thoughtful gesture, and an ending both characters choose together.',check:'Surprises should not remove someone’s ability to opt out.'},
    {id:'date-02',cat:'playful',tone:'confident',intensity:'bold',title:'The bold text draft',text:'Write a short, flirtatious invitation that says what you want and leaves the other person space to decide.',check:'An invitation is not a demand.'},
    {id:'care-01',cat:'couples',tone:'gentle',intensity:'soft',title:'The aftercare question',text:'A fictional couple asks each other what would feel supportive after an emotionally intense scene: water, a hug, quiet, or space.',check:'Ask what support is wanted rather than assuming.'}
  ];
  const categoryLabels = {all:'All prompts',romance:'Romance',playful:'Playful teasing',roleplay:'Roleplay fiction','dark-romance':'Dark romance',couples:'Couples',communication:'Private conversation','multi-adult':'Multi-adult fiction'};
  const toneLabels = {any:'Any tone',gentle:'Gentle',playful:'Playful',confident:'Confident',mysterious:'Mysterious'};
  const intensityLabels = {any:'Any intensity',soft:'Soft',bold:'Bold',dark:'Darker mood'};
  const el = (tag, cls, text) => { const n=document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=text; return n; };

  function build() {
    const view=$('#view-boyfriend');
    if(!view || $('#v9AfterDarkStudio')) return;
    const anchor=view.querySelector('.wild-section');
    if(!anchor) { state.errors.push('Existing Wild Wheel section was not found.'); return; }
    const section=el('section','section-block v9-after-dark'); section.id='v9AfterDarkStudio'; section.setAttribute('aria-labelledby','v9AfterDarkTitle');
    const head=el('div','section-heading'); const intro=el('div');
    intro.append(el('p','eyebrow','PHASE 9 · AFTER DARK STUDIO · 18+'),el('h2','','Pick a mood. Keep your boundaries.'),el('p','muted','A new prompt deck beside the existing Wild Wheel. Prompts are fictional, optional, and designed for adult characters who can freely pause or opt out.'));
    intro.querySelector('h2').id='v9AfterDarkTitle'; head.append(intro,el('span','pill adult-pill','18+ · OPTIONAL')); section.append(head);
    const form=el('form','v9-prompt-form'); form.id='v9PromptForm';
    function field(id,label,options){const l=el('label','field',label);const s=el('select');s.id=id;s.name=id;options.forEach(([v,t])=>{const o=el('option','',t);o.value=v;s.append(o)});l.append(s);return l;}
    form.append(field('v9PromptCategory','Prompt category',Object.entries(categoryLabels)),field('v9PromptTone','Mood / tone',Object.entries(toneLabels)),field('v9PromptIntensity','Intensity',Object.entries(intensityLabels)));
    const groupWrap=el('label','v9-consent-option');const group=el('input');group.type='checkbox';group.id='v9AllowGroupFiction';groupWrap.append(group,el('span','','Include multi-adult fictional prompts (off by default)'));form.append(groupWrap);
    const info=el('p','v9-prompt-note','This setting filters fictional story prompts only. It does not establish consent, interest, or agreement from any real person.');form.append(info);
    const actions=el('div','button-row');const generate=el('button','btn primary','Generate prompt');generate.type='submit';generate.id='v9GeneratePrompt';const next=el('button','btn secondary','Another prompt');next.type='button';next.id='v9NextPrompt';const skip=el('button','btn ghost','Skip / clear');skip.type='button';skip.id='v9SkipPrompt';actions.append(generate,next,skip);form.append(actions);section.append(form);
    const result=el('article','v9-prompt-result');result.id='v9PromptResult';result.hidden=true;result.setAttribute('aria-live','polite');result.setAttribute('aria-labelledby','v9PromptResultTitle');section.append(result);
    const favSection=el('div','v9-favourites');const favHead=el('div','v9-favourites-head');favHead.append(el('h3','','Session favourites'),el('span','v9-session-pill','Not saved across reloads'));favSection.append(favHead);
    const favIntro=el('p','muted','Favourite prompts stay in this open page only. Nothing is written to local storage or sent to a server.');favSection.append(favIntro);
    const favGrid=el('div','v9-favourite-grid');favGrid.id='v9FavouriteGrid';favSection.append(favGrid);section.append(favSection);
    const footer=el('p','v9-consent-footer','Consent reminder: freely given, specific, informed, enthusiastic, and reversible. A “no”, pause, or skip ends the prompt without debate.');
    const source=el('a','','Read about consent ↗');source.href='https://www.plannedparenthood.org/learn/relationships/sexual-consent';source.target='_blank';source.rel='noopener noreferrer';const sourceWrap=el('p','micro');sourceWrap.append(source);section.append(footer,sourceWrap);
    anchor.insertAdjacentElement('afterend',section);state.built=true;
    form.addEventListener('submit',e=>{e.preventDefault();generatePrompt(false)});
    next.addEventListener('click',()=>generatePrompt(true));skip.addEventListener('click',clearPrompt);
    group.addEventListener('change',()=>{if($('#v9PromptCategory').value==='multi-adult'&&!group.checked)$('#v9PromptCategory').value='all';});
    result.addEventListener('click',e=>{const b=e.target.closest('[data-v9-fav]');if(b){toggleFavourite(state.lastPromptId);}});
    favGrid.addEventListener('click',e=>{const b=e.target.closest('[data-v9-remove-fav]');if(b)toggleFavourite(b.dataset.v9RemoveFav);});
    window.BLACKED_V3_PHASE9={getDiagnostics:diagnostics,generate:generatePrompt,clear:clearPrompt,getState:()=>({...state,favourites:[...state.favourites]})};
  }
  function availablePrompts() {
    const cat=$('#v9PromptCategory')?.value||'all';const tone=$('#v9PromptTone')?.value||'any';const intensity=$('#v9PromptIntensity')?.value||'any';const allowGroup=!!$('#v9AllowGroupFiction')?.checked;
    return prompts.filter(p=>(cat==='all'||p.cat===cat)&&(tone==='any'||p.tone===tone)&&(intensity==='any'||p.intensity===intensity)&&(allowGroup||p.cat!=='multi-adult'));
  }
  function generatePrompt(avoidLast) {
    const out=$('#v9PromptResult');if(!out)return;
    if($('#v9PromptCategory').value==='multi-adult'&&!$('#v9AllowGroupFiction').checked){out.hidden=false;out.replaceChildren(el('p','v9-prompt-warning','Multi-adult fiction is switched off. Tick the optional setting first, or choose another category.'));return;}
    let list=availablePrompts();if(!list.length){out.hidden=false;out.replaceChildren(el('p','v9-prompt-warning','No prompts match all three filters. Choose “Any” for mood or intensity, or change the category.'));return;}
    if(avoidLast&&list.length>1)list=list.filter(p=>p.id!==state.lastPromptId);
    const picked=list[Math.floor(Math.random()*list.length)];state.lastPromptId=picked.id;state.generated++;
    const category=categoryLabels[picked.cat]||picked.cat;out.replaceChildren();
    const top=el('div','v9-result-top');top.append(el('span','v9-result-kicker',category),el('span','v9-result-number',`Prompt ${state.generated}`));
    const h=el('h3','',picked.title);h.id='v9PromptResultTitle';const p=el('p','v9-result-copy',picked.text);const check=el('p','v9-result-check',`Boundary check · ${picked.check}`);
    const actions=el('div','button-row');const fav=el('button','btn secondary',state.favourites.includes(picked.id)?'♥ In favourites':'♡ Add to session favourites');fav.type='button';fav.dataset.v9Fav='';fav.setAttribute('aria-pressed',String(state.favourites.includes(picked.id)));actions.append(fav);
    out.append(top,h,p,check,actions);out.hidden=false;
  }
  function clearPrompt(){state.skipped++;const out=$('#v9PromptResult');if(out){out.hidden=false;out.replaceChildren(el('p','v9-prompt-cleared','Prompt cleared. You can change the filters, generate another, or stop here.'));}state.lastPromptId=null;}
  function toggleFavourite(id){if(!id)return;const i=state.favourites.indexOf(id);if(i>=0)state.favourites.splice(i,1);else{const p=prompts.find(x=>x.id===id);if(p)state.favourites.push(id);}renderFavourites();if(state.lastPromptId===id&&$('#v9PromptResult')){const b=$('#v9PromptResult [data-v9-fav]');if(b){const saved=state.favourites.includes(id);b.textContent=saved?'♥ In favourites':'♡ Add to session favourites';b.setAttribute('aria-pressed',String(saved));}}}
  function renderFavourites(){const grid=$('#v9FavouriteGrid');if(!grid)return;grid.replaceChildren();if(!state.favourites.length){grid.append(el('p','muted','No session favourites yet. Generate a prompt and add it here.'));return;}state.favourites.forEach(id=>{const p=prompts.find(x=>x.id===id);if(!p)return;const card=el('article','v9-favourite-card');card.append(el('small','v9-result-kicker',categoryLabels[p.cat]||p.cat),el('h4','',p.title),el('p','',p.text));const rm=el('button','small-btn','Remove');rm.type='button';rm.dataset.v9RemoveFav=id;card.append(rm);grid.append(card);});}
  function diagnostics(){return {loaded:!!$('#v9AfterDarkStudio'),promptCount:prompts.length,categoryCount:Object.keys(categoryLabels).length,generated:state.generated,skipped:state.skipped,favourites:state.favourites.length,groupFictionOptIn:!!$('#v9AllowGroupFiction')?.checked,storageUsed:false,errors:[...state.errors]};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();
