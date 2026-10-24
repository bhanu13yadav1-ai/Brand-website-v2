/* BLACKED V4 Phase 3 — selective interactive engine + couples/date/message upgrades.
 * Loads only the missing Phase 9, Phase 12 and Phase 13 modules; does not replay active Phase 2/4–8 scripts.
 * Existing four wheel engines and existing storage keys are not replaced.
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE3) return;

  const VERSION = '4.3.0';
  const state = {
    version: VERSION, startedAt: new Date().toISOString(), status: 'loading',
    stylesLoaded: [], scriptsLoaded: [], errors: [], enhancements: [],
    wheelBefore: null, innerwearHeartbeat: null
  };
  const modules = [
    { css: './phase9-after-dark.css', js: './phase9-after-dark.js', key: 'phase9' },
    { css: './phase12-wheels-hub.css', js: './phase12-wheels-hub.js', key: 'phase12' },
    { css: './phase13-couples-studio.css', js: './phase13-couples-studio.js', key: 'phase13' }
  ];

  const addStyle = path => new Promise(resolve => {
    if (document.querySelector(`link[data-blacked-v4-phase3-style="${path}"]`)) return resolve(true);
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = path;
    link.dataset.blackedV4Phase3Style = path;
    let done = false;
    const finish = ok => {
      if (done) return; done = true; clearTimeout(timer);
      if (ok) state.stylesLoaded.push(path); else state.errors.push(`Stylesheet failed: ${path}`);
      resolve(ok);
    };
    const timer = setTimeout(() => finish(false), 9000);
    link.addEventListener('load', () => finish(true), { once: true });
    link.addEventListener('error', () => finish(false), { once: true });
    document.head.append(link);
  });

  const addScript = path => new Promise(resolve => {
    if (document.querySelector(`script[data-blacked-v4-phase3-script="${path}"]`)) return resolve(true);
    const script = document.createElement('script');
    script.src = path; script.async = true;
    script.dataset.blackedV4Phase3Script = path;
    let done = false;
    const finish = ok => {
      if (done) return; done = true; clearTimeout(timer);
      if (ok) state.scriptsLoaded.push(path); else state.errors.push(`Script failed: ${path}`);
      resolve(ok);
    };
    const timer = setTimeout(() => finish(false), 12000);
    script.addEventListener('load', () => finish(true), { once: true });
    script.addEventListener('error', () => finish(false), { once: true });
    document.body.append(script);
  });

  function addScopedStyles() {
    if (document.getElementById('blacked-v4-phase3-addons-style')) return;
    const style = document.createElement('style');
    style.id = 'blacked-v4-phase3-addons-style';
    style.textContent = `
      .v4p3-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:14px 0}
      .v4p3-fields .field{min-width:0}.v4p3-plan-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}
      .v4p3-plan{min-width:0;border:1px solid var(--line,rgba(255,255,255,.13));border-radius:14px;padding:13px;background:rgba(255,255,255,.035)}
      .v4p3-plan h3{font-size:15px;line-height:1.25;margin:4px 0 7px}.v4p3-plan p{font-size:13px;line-height:1.5}
      .v4p3-plan-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.v4p3-plan-actions button{min-height:40px}
      .v4p3-message-tools{display:grid;gap:9px;margin-top:12px}.v4p3-message-editor{display:block;width:100%;min-height:108px;resize:vertical;border:1px solid var(--line,rgba(255,255,255,.18));border-radius:12px;padding:12px;background:rgba(8,7,10,.45);color:inherit;font:inherit;line-height:1.5}
      .v4p3-hint{font-size:12px;opacity:.82}.v4p3-prompt-steer{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.v4p3-prompt-steer button{min-height:42px}
      .v4p3-couples-story{border:1px solid var(--line,rgba(255,255,255,.15));border-radius:16px;padding:16px;margin:18px 0;background:rgba(255,255,255,.025)}
      .v4p3-couples-story [data-story-choice]{min-height:42px;margin:5px}.v4p3-status{font-size:12px;min-height:1.4em}
      @media(max-width:680px){.v4p3-fields,.v4p3-plan-grid{grid-template-columns:minmax(0,1fr)}.v4p3-plan{padding:12px}.v4p3-plan-actions button{flex:1}}
      @media(prefers-reduced-motion:reduce){.v4p3-plan,.v4p3-message-editor{scroll-behavior:auto!important;transition:none!important}}
    `;
    document.head.append(style);
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const make = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function safeLocalWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (_) { return false; }
  }
  function copyText(text, status) {
    const value = String(text || '');
    const fallback = () => {
      const area = make('textarea', 'v4p3-message-editor'); area.value = value;
      area.setAttribute('aria-label', 'Select and copy the text manually');
      area.style.position = 'fixed'; area.style.left = '-9999px'; document.body.append(area);
      area.focus(); area.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (_) {}
      area.remove();
      if (status) status.textContent = ok ? 'Copied.' : 'Auto-copy blocked. Text selection fallback is available in the editable box.';
      return ok;
    };
    if (!value) { if (status) status.textContent = 'Pehle text banao ya likho.'; return Promise.resolve(false); }
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(value).then(() => {
        if (status) status.textContent = 'Copied.'; return true;
      }).catch(() => Promise.resolve(fallback()));
    }
    return Promise.resolve(fallback());
  }

  const dateIdeas = {
    cozy: [
      {title:'Chai + conversation cards',text:'Ghar par chai/snacks banao aur har person 3 light questions choose kare. Dono ke paas pass kehne ka option rahe.',mins:'45–75 min',budget:'₹0–₹250'},
      {title:'Bookshop / library browse',text:'Public bookshop ya library mein ek dusre ke liye ek funny ya meaningful topic choose karo.',mins:'45–90 min',budget:'₹0–₹500'},
      {title:'Comfort-film evening',text:'Dono milkar film pick karein, snacks share karein, aur end mein favourite scene batayein.',mins:'90–150 min',budget:'₹100–₹600'}
    ],
    playful: [
      {title:'Mini photo walk',text:'Public, familiar route par 5 funny colours/shapes ki photos lo. Kisi ki photo bina permission post na karo.',mins:'45–75 min',budget:'₹0–₹300'},
      {title:'₹200 snack challenge',text:'Budget pehle fix karo; har person ek snack choose kare aur dono rating dein.',mins:'45–90 min',budget:'₹100–₹300'},
      {title:'Song-swap date',text:'Ek dusre ke liye 3 songs choose karo aur reason share karo. Skip karna hamesha okay hai.',mins:'30–60 min',budget:'₹0–₹200'}
    ],
    creative: [
      {title:'Two-person art night',text:'Paper/phone notes se ek fictional poster, playlist cover ya tiny story banao.',mins:'45–90 min',budget:'₹0–₹350'},
      {title:'Cook one simple recipe',text:'Easy recipe choose karo, ingredients aur allergies pehle check karo, phir roles split karo.',mins:'60–120 min',budget:'₹200–₹700'},
      {title:'Memory map',text:'Ek shared favourite place, song ya moment ka small doodle/map banao.',mins:'30–60 min',budget:'₹0–₹200'}
    ],
    outdoors: [
      {title:'Park + chai',text:'Known public park mein short walk aur chai break. Weather aur route khud check karna.',mins:'45–90 min',budget:'₹50–₹300'},
      {title:'Sunset walk',text:'Safe, familiar public route aur return plan choose karo; late ho to transport pehle plan karein.',mins:'30–60 min',budget:'₹0–₹350'},
      {title:'Local culture browse',text:'Public market, craft corner ya free exhibit explore karo. Opening/transport details pehle verify karein.',mins:'60–120 min',budget:'₹0–₹600'}
    ]
  };
  const budgetRanges = {low:'₹0–₹300 approx.',medium:'₹200–₹800 approx.',high:'₹500+ approx. — local costs vary'};

  function installDatePlanner() {
    const button = $('#makeDate'), result = $('#dateResult');
    if (!button || !result || button.dataset.v4p3Enhanced === 'true') return false;
    button.dataset.v4p3Enhanced = 'true';
    const parent = button.closest('.couples-feature') || button.parentElement;
    const controls = make('div', 'v4p3-fields'); controls.id = 'v4p3DateControls';
    const field = (id, label, options) => {
      const wrap = make('label', 'field', label); const select = make('select'); select.id = id;
      options.forEach(([value, text]) => { const opt = make('option', '', text); opt.value = value; select.append(opt); });
      wrap.append(select); return wrap;
    };
    controls.append(
      field('v4p3DateDuration','Duration',[['short','30–60 minutes'],['medium','1–2 hours'],['long','2+ hours']]),
      field('v4p3DateSetting','Setting',[['any','Indoor or outdoor'],['indoor','Indoor'],['outdoor','Outdoor / public']]),
      field('v4p3DateEnergy','Energy level',[['calm','Calm'],['medium','Some activity'],['active','Active']]),
      field('v4p3DateAccess','Comfort / access',[['standard','Standard plan'],['low-walk','Less walking'],['quiet','Quiet / low-sensory']]),
      field('v4p3DateFlirt','Flirt level',[['sweet','Sweet'],['playful','Playful'],['bold','Bold but respectful'],['mysterious','Mysterious']])
    );
    button.insertAdjacentElement('beforebegin', controls);
    const status = make('p','v4p3-status'); status.id = 'v4p3DateStatus'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
    const actionRow = make('div','v4p3-plan-actions'); actionRow.id = 'v4p3DateActions';
    const save = make('button','btn secondary','Save plan on this device'); save.type='button'; save.id='v4p3SaveDate';
    const clear = make('button','btn ghost','Clear saved plan'); clear.type='button'; clear.id='v4p3ClearDate'; actionRow.append(save,clear);
    result.insertAdjacentElement('afterend', actionRow); actionRow.insertAdjacentElement('afterend', status);
    let plans = [], swaps = {}, lastSaved = null;
    function renderPlans() {
      result.replaceChildren();
      const grid = make('div','v4p3-plan-grid'); grid.id='v4p3PlanGrid';
      plans.forEach((plan, i) => {
        const card = make('article','v4p3-plan'); card.dataset.planIndex=String(i);
        card.append(make('p','eyebrow',`OPTION ${i+1} · ${plan.mins}`),make('h3','',plan.title),make('p','',plan.text));
        const meta = make('p','v4p3-hint',`${plan.budget} · ${budgetRanges[$('#dateBudget')?.value||'low']||budgetRanges.low}`); card.append(meta);
        const actions = make('div','v4p3-plan-actions');
        const swap = make('button','btn secondary','Swap idea'); swap.type='button'; swap.dataset.v4p3Swap=String(i);
        const copy = make('button','btn ghost','Copy idea'); copy.type='button'; copy.dataset.v4p3Copy=String(i);
        actions.append(swap,copy); card.append(actions); grid.append(card);
      });
      result.append(grid);
      result.setAttribute('aria-live','polite');
      status.textContent='Ideas illustrative hain. Venue availability, weather aur travel pehle check karo; no booking is made.';
    }
    function generate() {
      const mood = $('#dateMood')?.value || 'cozy';
      const base = [...(dateIdeas[mood] || dateIdeas.cozy)];
      const setting = $('#v4p3DateSetting').value, energy = $('#v4p3DateEnergy').value, access = $('#v4p3DateAccess').value;
      let filtered = base.filter(x => {
        const outdoor = /walk|park|sunset|culture|market/i.test(x.title+' '+x.text);
        if (setting==='indoor' && outdoor) return false;
        if (setting==='outdoor' && !outdoor) return false;
        if (energy==='calm' && /active|walk|challenge/i.test(x.title)) return false;
        if (access==='low-walk' && /walk|park|market/i.test(x.title)) return false;
        if (access==='quiet' && /market|challenge/i.test(x.title)) return false;
        return true;
      });
      if (filtered.length<2) filtered = base;
      const duration=$('#v4p3DateDuration').value;
      plans = filtered.slice(0,3).map((x,i)=>({...x,mins: duration==='short'?'30–60 min':duration==='long'?'2+ hours':x.mins}));
      swaps = {}; renderPlans();
    }
    button.addEventListener('click', event => {
      event.preventDefault(); event.stopImmediatePropagation(); generate();
    }, true);
    controls.addEventListener('change', event => { if(event.target.matches('select')) generate(); });
    $('#dateMood')?.addEventListener('change',generate); $('#dateBudget')?.addEventListener('change',generate);
    actionRow.addEventListener('click', event => {
      const saveClick = event.target.closest('#v4p3SaveDate'), clearClick = event.target.closest('#v4p3ClearDate');
      const swapBtn=event.target.closest('[data-v4p3-swap]'), copyBtn=event.target.closest('[data-v4p3-copy]');
      if (saveClick) {
        if (!plans.length) { status.textContent='Pehle date ideas generate karo.'; return; }
        lastSaved={mood:$('#dateMood')?.value,budget:$('#dateBudget')?.value,controls:Object.fromEntries([...controls.querySelectorAll('select')].map(x=>[x.id,x.value])),plans};
        status.textContent=safeLocalWrite('blackedV4DatePlan',lastSaved)?'Plan is saved in this browser on this device.':'Browser storage blocked; plan not saved.';
      } else if (clearClick) {
        try { localStorage.removeItem('blackedV4DatePlan'); status.textContent='Saved date plan cleared from this device.'; }
        catch (_) { status.textContent='Browser storage unavailable.'; }
      } else if (swapBtn) {
        const i=Number(swapBtn.dataset.v4p3Swap), mood=$('#dateMood')?.value||'cozy';
        const alternatives=(dateIdeas[mood]||dateIdeas.cozy).filter(x=>x.title!==plans[i]?.title);
        if (alternatives.length && Number.isInteger(i) && i>=0 && i<plans.length) {
          plans[i]={...alternatives[(swaps[i]||0)%alternatives.length]}; swaps[i]=(swaps[i]||0)+1; renderPlans();
        }
      } else if (copyBtn) {
        const i=Number(copyBtn.dataset.v4p3Copy), p=plans[i]; if(p) copyText(`${p.title}\n${p.text}\nDuration: ${p.mins}\nBudget: ${p.budget}`,status);
      }
    });
    generate(); state.enhancements.push('three-option-date-planner'); return true;
  }

  const messageBank = {
    sweet: { invite:['Want to make an ordinary day feel special together? Pick a time that works for you.','Coffee or a walk this week? No stress if your schedule is full.','I would enjoy seeing you. What kind of plan would feel good to you?'], compliment:['I appreciate how thoughtful you are; it makes a difference.','You bring a calm, good energy into ordinary days.','I admire the way you show up as yourself.'], secret:['Can I share something personal? You can pass if it feels too private.','I have a question for a quiet moment—only if you are comfortable.','I want to be more open with you, at your pace.'] },
    teasing: { invite:['Quick question: chai first or a tiny adventure first? You choose.','I have a low-stakes plan and a high-stakes snack opinion. Interested?','We should schedule a little fun. You get veto power over the plan.'], compliment:['You make focus surprisingly difficult—in a pretty charming way.','Your sense of humour is becoming a favourite part of my day.','I was going to be mysterious, but honestly, you made me smile.'], secret:['I have a playful thought to share—only if you are in the mood.','Can I ask a curious question? Passing is completely okay.','One small confession, no pressure for a matching one.'] },
    bold: { invite:['I would like to take you out this week. Which day and kind of plan suit you?','I am interested in spending time with you. Would you be up for a date?','Let us choose a plan together; I want it to feel good for both of us.'], compliment:['I am attracted to your confidence and wanted to say that honestly.','I like your style and energy. Would you be okay with a compliment?','You have caught my attention, and I would like to get to know you better.'], secret:['I want us to talk openly about what we like and our boundaries, if you are comfortable.','There is something I would like to share, but only when it is a good time for you.','Can we have an honest conversation? You can choose the pace.'] },
    mysterious: { invite:['Keep an evening open for a little mystery—only if you feel like it. We can pick the details together.','I have a small surprise idea. Want the gentle hint first?','One playlist, one new place, and your choice on the rest. Interested?'], compliment:['There is a detail about you I keep noticing; I will tell you over coffee, if you like.','Some people leave a good impression quietly. You do that.','I have a specific compliment saved for the right moment. No rush.'], secret:['I have a question saved for a quiet moment. You can absolutely say pass.','Can we talk about something real when you have the headspace?','I want to tell you something honestly, without expecting a particular answer.'] }
  };
  function installMessageGenerator() {
    const button=$('#makeMessage'), copy=$('#copyMessage'), result=$('#messageResult');
    if(!button||!copy||!result||button.dataset.v4p3Enhanced==='true')return false;
    button.dataset.v4p3Enhanced='true';
    const controls=make('div','v4p3-fields'); controls.id='v4p3MessageControls';
    const field=(id,label,options)=>{const w=make('label','field',label),s=make('select');s.id=id;options.forEach(([v,t])=>{const o=make('option','',t);o.value=v;s.append(o)});w.append(s);return w;};
    controls.append(field('v4p3MessageStyle','Style',[['sweet','Sweet'],['teasing','Playful teasing'],['bold','Bold but respectful'],['mysterious','Mysterious'],['hinglish','Cheeky Hinglish']]),field('v4p3MessageMoment','Moment',[['invite','Invite'],['compliment','Compliment'],['secret','Private conversation']]),field('v4p3MessageLength','Length',[['160','Up to 160 characters'],['280','Up to 280 characters'],['500','Up to 500 characters']]));
    // Keep a single visible set of message selectors; old IDs remain for backwards compatibility.
    $('#messageTone')?.closest('label')?.setAttribute('hidden','hidden');
    $('#messageMoment')?.closest('label')?.setAttribute('hidden','hidden');
    result.hidden = true; result.setAttribute('aria-hidden','true');
    const boundary=make('label','v4p3-hint');const check=make('input');check.type='checkbox';check.id='v4p3MessageBoundary';check.checked=true;boundary.append(check,document.createTextNode(' Add “no pressure—only if comfortable” note'));
    const editor=make('textarea','v4p3-message-editor');editor.id='v4p3MessageEditor';editor.setAttribute('aria-label','Edit generated message before copying');editor.placeholder='Generate a message, then edit it here…';
    const tools=make('div','v4p3-plan-actions');tools.id='v4p3MessageActions';const next=make('button','btn secondary','Another variant');next.type='button';next.id='v4p3MessageNext';const clear=make('button','btn ghost','Clear text');clear.type='button';clear.id='v4p3MessageClear';tools.append(next,clear);
    button.insertAdjacentElement('beforebegin',controls);button.insertAdjacentElement('afterend',boundary);boundary.insertAdjacentElement('afterend',editor);editor.insertAdjacentElement('afterend',tools);
    const status=make('p','v4p3-status');status.id='v4p3MessageStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');tools.insertAdjacentElement('afterend',status);
    let variant=0, lastKey='sweet|invite';
    function generate(advance=false){
      const raw=$('#v4p3MessageStyle').value;const style=raw==='hinglish'?'teasing':raw;const moment=$('#v4p3MessageMoment').value;
      const key=`${style}|${moment}`;if(key!==lastKey){variant=0;lastKey=key;}else if(advance)variant++;
      const lines=messageBank[style]?.[moment]||messageBank.sweet.invite;let text=lines[variant%lines.length];
      if(raw==='hinglish') text=['Tumse baat karke mood better ho jaata hai—chai aur thodi si gupshup? No pressure.','Ek cute sa plan hai; tumhara yes, no ya “baad mein” sab okay hai.','Tumhari vibe achhi lagti hai. Kabhi coffee pe baat karein?'][variant%3];
      if($('#v4p3MessageBoundary').checked && !/no pressure|pass|comfortable|veto/i.test(text))text+=' No pressure—only if you are comfortable.';
      const max=Number($('#v4p3MessageLength').value)||280;
      editor.value=text.slice(0,max);status.textContent=`Variant ${(variant%lines.length)+1} of ${lines.length}. Text editable hai; copy se pehle change kar sakte ho.`;
    }
    button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();generate(false);},true);
    copy.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();copyText(editor.value,status);},true);
    next.addEventListener('click',()=>generate(true));clear.addEventListener('click',()=>{editor.value='';status.textContent='Message cleared.';});
    controls.addEventListener('change',event=>{if(event.target.matches('select'))generate(false);});
    check.addEventListener('change',()=>{if(editor.value)generate(false);});
    state.enhancements.push('editable-message-variants-copy-fallback');return true;
  }

  function installAfterDarkSteering() {
    const host=$('#v9AfterDarkStudio'); if(!host||host.querySelector('#v4p3PromptSteering'))return false;
    const row=make('div','v4p3-prompt-steer');row.id='v4p3PromptSteering';row.setAttribute('role','group');row.setAttribute('aria-label','Steer fictional adult prompt');
    [['softer','Make softer'],['playful','More playful'],['mysterious','More mystery'],['stop','Skip / stop']].forEach(([mode,label])=>{const b=make('button',mode==='stop'?'btn ghost':'btn secondary',label);b.type='button';b.dataset.v4p3Steer=mode;row.append(b);});
    const intro=host.querySelector('.v9-prompt-form');if(intro)intro.insertAdjacentElement('afterend',row);else host.prepend(row);
    state.enhancements.push('after-dark-user-steering');return true;
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-v4p3-steer]');if(!button)return;
    const category=$('#v9PromptCategory'),tone=$('#v9PromptTone'),intensity=$('#v9PromptIntensity');
    if(button.dataset.v4p3Steer==='stop'){ $('#v9SkipPrompt')?.click();return; }
    if(!category||!tone||!intensity)return;
    if(button.dataset.v4p3Steer==='softer'){tone.value='gentle';intensity.value='soft';}
    if(button.dataset.v4p3Steer==='playful'){category.value='playful';tone.value='playful';intensity.value='soft';}
    if(button.dataset.v4p3Steer==='mysterious'){category.value='dark-romance';tone.value='mysterious';intensity.value='dark';}
    $('#v9NextPrompt')?.click();
  });

  function installCouplesStoryTurns() {
    const anchor=$('#v13CouplesStudio')||$('#v6BoyfriendStudio')||$('#view-boyfriend');
    if(!anchor||$('#v4p3CouplesStory'))return false;
    const section=make('section','v4p3-couples-story');section.id='v4p3CouplesStory';section.setAttribute('aria-labelledby','v4p3CouplesStoryTitle');
    section.append(make('p','eyebrow','PHASE 3 · FICTIONAL ADULT STORY TURNS'),make('h3','','Choose the next mood'),make('p','v4p3-hint','Two fictional adults, no real-person assumptions. Each turn can be changed or ended.'));
    const result=make('p','','They pause at a quiet café doorway. One asks, “What kind of evening would feel good to you?”');result.id='v4p3StoryTurnText';result.setAttribute('aria-live','polite');section.append(result);
    const options=make('div','');options.id='v4p3StoryTurnChoices';
    [['tender','Tender'],['teasing','Playful teasing'],['mystery','A little mystery'],['end','End scene']].forEach(([value,label])=>{const b=make('button','btn secondary',label);b.type='button';b.dataset.storyChoice=value;options.append(b);});section.append(options);
    const textBank={
      tender:['They offer a sincere compliment, then leave room for an honest answer. “Would you like to stay a little longer, or head home?”','They listen without interrupting. The next step is chosen together, not assumed.'],
      teasing:['They exchange a gentle joke about who chose the playlist. Both laugh, then each suggests one low-pressure plan.','A playful challenge appears: choose a song for the other. Either person can pass, swap, or change the topic.'],
      mystery:['A folded note contains a riddle leading to a favourite shared memory. The note ends: “Only continue if you want to.”','They trade one harmless secret about a song or a dream, each choosing how much to share.'],
      end:['The scene ends here. Both adults check in, say goodbye warmly, and choose their next step separately.']
    };let step=0,mode='tender';
    options.addEventListener('click',event=>{const b=event.target.closest('[data-story-choice]');if(!b)return;mode=b.dataset.storyChoice;step=mode==='end'?0:(step+1)%textBank[mode].length;result.textContent=textBank[mode][step];if(mode==='end')result.textContent=textBank.end[0];});
    const copy=make('button','btn ghost','Copy current turn');copy.type='button';copy.id='v4p3CopyStoryTurn';const status=make('p','v4p3-status');status.id='v4p3StoryStatus';status.setAttribute('role','status');copy.addEventListener('click',()=>copyText(result.textContent,status));section.append(copy,status);
    anchor.insertAdjacentElement('afterend',section);state.enhancements.push('branching-couples-fiction-turns');return true;
  }

  function waitForDynamicHosts() {
    const apply=()=>{
      try { installDatePlanner(); } catch(error){state.errors.push('Date planner: '+String(error));}
      try { installMessageGenerator(); } catch(error){state.errors.push('Message generator: '+String(error));}
      try { installAfterDarkSteering(); } catch(error){state.errors.push('After Dark steering: '+String(error));}
      try { installCouplesStoryTurns(); } catch(error){state.errors.push('Couples story turns: '+String(error));}
    };
    apply();
    const observer=new MutationObserver(()=>apply());
    observer.observe(document.body,{childList:true,subtree:true});
    // Bounded observation avoids keeping a permanent tree observer alive after the modules build.
    let checks=0; const timer=setInterval(()=>{
      apply(); checks++;
      if((($('#v9AfterDarkStudio')&&$('#v13CouplesStudio')&&$('#v4p3DateControls')&&$('#v4p3MessageEditor'))||checks>=30)){
        clearInterval(timer);observer.disconnect();state.enhancementsObserverStopped=true;
      }
    },250);
  }

  function init() {
    addScopedStyles();
    waitForDynamicHosts();
    // Tests that the tap handler is responsive without claiming a complete handset/browser test.
    document.addEventListener('click',event=>{
      const link=event.target.closest('[data-view-link="innerwear"]'); if(!link)return;
      const started=performance.now(); state.innerwearHeartbeat={startedAt:Date.now(),dispatchMs:null,timerHeartbeat:false};
      setTimeout(()=>{if(state.innerwearHeartbeat){state.innerwearHeartbeat.timerHeartbeat=true;state.innerwearHeartbeat.dispatchMs=Math.round(performance.now()-started);}},80);
    },true);
    state.status='loaded';
    window.BLACKED_V4_PHASE3={
      version:VERSION,
      getDiagnostics:()=>({version:VERSION,status:state.status,stylesLoaded:[...state.stylesLoaded],scriptsLoaded:[...state.scriptsLoaded],errors:[...state.errors],enhancements:[...new Set(state.enhancements)],moduleDiagnostics:{phase9:window.BLACKED_V3_PHASE9?.getDiagnostics?.()||null,phase12:window.BLACKED_V3_PHASE12_WHEELS?.getDiagnostics?.()||null,phase13:window.BLACKED_V3_PHASE13?.getDiagnostics?.()||null,phase1:window.BLACKED_V4_PHASE1?.getDiagnostics?.()||null,phase2:window.BLACKED_V4_PHASE2?.getDiagnostics?.()||null},wheels:{dildo:!!$('[data-wheel-disc="dildo"]'),plug:!!$('[data-wheel-disc="plug"]'),boy:!!$('[data-wheel-disc="boy"]'),wild:!!$('[data-wheel-disc="wild"]')},innerwear:{view:!!$('#view-innerwear'),catalog:!!$('#catalogGrid'),archive:!!$('#imageLibraryGrid'),heartbeat:state.innerwearHeartbeat},duplicateIds:(()=>{const seen=new Set(),dups=[];document.querySelectorAll('[id]').forEach(n=>{if(seen.has(n.id))dups.push(n.id);seen.add(n.id);});return dups;})()}),
      runSmokeTests:()=>{
        const d=window.BLACKED_V4_PHASE3.getDiagnostics();
        const tests=[
          ['Phase 1 active',!!window.BLACKED_V4_PHASE1],['Phase 2 active',!!window.BLACKED_V4_PHASE2],
          ['Phase 9 After Dark active',!!window.BLACKED_V3_PHASE9],['Phase 12 Wheels Hub active',!!window.BLACKED_V3_PHASE12_WHEELS],['Phase 13 Couples Studio active',!!window.BLACKED_V3_PHASE13],
          ['Dildo wheel',d.wheels.dildo],['Plug wheel',d.wheels.plug],['Boyfriend wheel',d.wheels.boy],['Wild wheel',d.wheels.wild],
          ['Innerwear view + catalog',d.innerwear.view&&d.innerwear.catalog],['No duplicate IDs',d.duplicateIds.length===0]
        ];return {passed:tests.filter(x=>x[1]).length,total:tests.length,tests:tests.map(([name,pass])=>({name,status:pass?'PASS':'FAIL'})),diagnostics:d};
      }
    };
    document.documentElement.dataset.blackedV4Phase3='ready';
    window.dispatchEvent(new CustomEvent('blacked:v4-phase3-ready',{detail:{version:VERSION}}));
  }
  async function boot(){
    addScopedStyles();
    const jobs=[];
    for(const module of modules){jobs.push(addStyle(module.css));jobs.push(addScript(module.js));}
    await Promise.all(jobs);
    init();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{boot().catch(error=>{state.errors.push(String(error));state.status='error';});},{once:true});
  else boot().catch(error=>{state.errors.push(String(error));state.status='error';});
})();
