/* BLACKED V3 Phase 6 lazy-loaded combined studio. Originals retained in repository for rollback. */
(() => {
  'use strict';
  if (document.documentElement.dataset.blackedPhase6Combined === 'ready') return;
  const style=document.createElement('style'); style.id='blacked-phase6-combined-styles';
  style.textContent="/* BLACKED V3 Phase 6 — high-contrast, unmistakably new Match Studio and mobile gallery. */\n.v6-boyfriend-studio{margin-block:24px 30px;padding:clamp(15px,3vw,26px);border:1px solid #725432;border-radius:24px;background:radial-gradient(ellipse at 92% 0%,#4b3020 0,transparent 38%),linear-gradient(140deg,#1d1414,#100b0d 72%);box-shadow:0 14px 34px #0003;}\n.v6-bfs-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(190px,.72fr);align-items:center;gap:clamp(16px,3vw,28px);padding-bottom:22px;border-bottom:1px solid #614629;}\n.v6-bfs-title{margin:0 0 10px!important;font-size:clamp(29px,4vw,43px)!important;line-height:1.04!important;letter-spacing:-.035em;color:#ffdfaa;}\n.v6-bfs-lede{max-width:620px;margin:0 0 14px;color:#f1e3d4;font-size:15px;line-height:1.55;}\n.v6-bfs-pills{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0;}\n.v6-bfs-pill{display:inline-flex;align-items:center;min-height:30px;padding:6px 10px;border:1px solid #775735;border-radius:999px;background:#221813;color:#ffdfaa;font-size:11px;font-weight:750;}\n.v6-board-link{display:inline-flex;align-items:center;min-height:42px;color:#ffdda5;font-size:12px;font-weight:750;text-underline-offset:3px;}\n.v6-bfs-disclaimer,.v6-bfs-help{margin:12px 0 0;color:#cabbc0;font-size:12px;line-height:1.55;overflow-wrap:anywhere;}\n.v6-bfs-hero-media{position:relative;min-width:0;max-width:340px;margin-inline:auto;overflow:hidden;border:1px solid #a17b4c;border-radius:18px;background:#211619;box-shadow:0 12px 24px #0004;}\n.v6-bfs-hero-media>img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center 24%;}\n.v6-bfs-hero-caption{display:grid;gap:4px;padding:12px 14px;background:linear-gradient(135deg,#251817,#120e10);border-top:1px solid #725432;}\n.v6-bfs-hero-caption strong{color:#ffdfaa;font:600 18px/1.2 Georgia,serif;}\n.v6-bfs-hero-caption small{font-size:11px;color:#d8c3b9;}\n.v6-bfs-kicker,.v6-bfs-section-head .eyebrow{color:#d6b47d;font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;}\n.v6-bfs-section-head{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:23px 0 13px;}\n.v6-bfs-section-head h3,.v6-active-copy h3{margin:4px 0 6px;font-size:clamp(20px,3vw,27px);line-height:1.18;color:#fff2df;letter-spacing:-.02em;}\n.v6-bfs-section-head .muted{font-size:12px;line-height:1.5;}\n.v6-match-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch;}\n.v6-match-card{min-width:0;height:100%;overflow:hidden;border:1px solid #58402d;border-radius:16px;background:#151013;transition:border-color .16s ease,transform .16s ease,box-shadow .16s ease;}\n.v6-match-card:has([aria-pressed=\"true\"]){border-color:#eacb8c;box-shadow:0 0 0 2px #eacb8c35,0 10px 24px #0003;transform:translateY(-2px);}\n.v6-match-select{display:flex;flex-direction:column;align-items:stretch;width:100%;height:100%;padding:0;text-align:left;border:0;background:transparent;color:#fff5ea;cursor:pointer;}\n.v6-match-select>img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center 18%;background:#211719;}\n.v6-match-copy{display:flex;flex:1;flex-direction:column;align-items:flex-start;gap:7px;padding:12px;min-width:0;}\n.v6-match-energy{color:#dfbe86;font-size:10px;letter-spacing:.04em;font-weight:800;text-transform:uppercase;}\n.v6-match-copy h4{margin:0;font-size:16px;line-height:1.22;overflow-wrap:anywhere;color:#fff1dc;}\n.v6-match-copy p{margin:0;color:#cdbec2;font-size:12px;line-height:1.5;}\n.v6-match-cta{display:inline-flex;align-items:center;justify-content:center;min-height:38px;margin-top:auto;width:100%;padding:8px 10px;border:1px solid #b7935d;border-radius:10px;background:linear-gradient(120deg,#ffda9a,#c9974d);color:#1e100b;font-size:12px;font-weight:850;text-align:center;}\n.v6-match-select:focus-visible,.v6-bfs-actions button:focus-visible,.v6-fantasy-form :focus-visible,.v6-gate-gallery-tools :focus-visible{outline:3px solid #f4a0c1;outline-offset:3px;}\n.v6-bfs-status{margin:12px 0 0;color:#ffdfa5;font-size:12px;font-weight:700;}\n.v6-fantasy-builder{margin-top:24px;padding:clamp(14px,2.7vw,22px);border:1px solid #533d31;border-radius:18px;background:#130f12;}\n.v6-fantasy-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px;}\n.v6-fantasy-form .field{min-width:0;gap:7px;color:#eee0d8;font-size:12px;}\n.v6-fantasy-form select,.v6-fantasy-form textarea{width:100%;min-height:46px;border:1px solid #614a3b;border-radius:11px;padding:11px 12px;background:#21171a;color:#fff5ea;font:inherit;font-size:14px;}\n.v6-custom-field{grid-column:1/-1;}\n.v6-fantasy-form textarea{resize:vertical;min-height:76px;}\n.v6-bfs-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:12px;}\n.v6-bfs-actions .btn{min-height:44px;}\n.v6-fantasy-result{margin-top:15px;padding:15px;border:1px solid #6d5239;border-radius:16px;background:linear-gradient(145deg,#201715,#120f12);}\n.v6-fantasy-result[hidden]{display:none!important;}\n.v6-result-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}\n.v6-result-head h4{margin:0;font-size:18px;color:#ffdfaa;}\n.v6-result-label{font-size:10px;font-weight:850;letter-spacing:.12em;color:#c8b2a3;}\n.v6-result-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;}\n.v6-result-item{display:grid;gap:5px;min-width:0;padding:10px;border:1px solid #47352e;border-radius:10px;background:#140f12;}\n.v6-result-item small{font-size:10px;color:#c5b3b8;}\n.v6-result-item strong{font-size:12px;color:#fff0d8;line-height:1.4;overflow-wrap:anywhere;}\n.v6-result-custom{font-size:13px;line-height:1.55;color:#e3d1d6;overflow-wrap:anywhere;}\n.v6-active-feature{display:grid;grid-template-columns:minmax(140px,.65fr) minmax(0,1fr);gap:18px;align-items:center;padding:16px;border:1px solid #594432;border-radius:18px;background:#171114;}\n.v6-active-feature>img{width:100%;max-height:330px;aspect-ratio:3/4;object-fit:cover;border-radius:12px;background:#24191b;}\n.v6-active-copy p{font-size:13px;line-height:1.55;}\n.v6-gate-gallery-tools{display:grid;grid-template-columns:1.4fr 1fr;gap:10px;margin:13px 0;}\n.v6-gate-gallery-tools .field{min-width:0;gap:7px;color:#eee0d8;font-size:12px;}\n.v6-gate-gallery-tools input,.v6-gate-gallery-tools select{width:100%;min-width:0;min-height:44px;border:1px solid #614a3b;border-radius:10px;padding:10px;background:#21171a;color:#fff5ea;font:inherit;}\n.v6-campaign-card .v3-photo-image{aspect-ratio:4/5;object-fit:cover;object-position:center;background:#161013;}\n.v6-campaign-card .v3-photo-caption{font-size:12px;line-height:1.5;}\n.v6-campaign-card[hidden]{display:none!important;}\n.v6-bfs-disclaimer a{color:#ffdfa5;}\n@media(max-width:760px){\n .v6-bfs-hero{grid-template-columns:minmax(0,1fr) minmax(110px,.55fr);gap:12px;align-items:start;}\n .v6-bfs-hero-media{width:100%;}\n .v6-bfs-hero-media>img{aspect-ratio:3/4;}\n .v6-match-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;}\n .v6-match-copy{padding:10px;gap:6px;}\n .v6-match-copy h4{font-size:14px;}\n .v6-match-copy p{font-size:12px;}\n .v6-active-feature{grid-template-columns:minmax(105px,.62fr) minmax(0,1fr);gap:12px;}\n .v6-gate-gallery-tools{grid-template-columns:1fr;}\n}\n@media(max-width:430px){\n .v6-bfs-hero{grid-template-columns:1fr;}\n .v6-bfs-hero-media{max-width:245px;margin:5px 0 0;}\n .v6-bfs-title{font-size:32px!important;}\n .v6-match-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}\n .v6-match-copy{padding:9px;}\n .v6-match-energy{font-size:9px;}\n .v6-match-copy h4{font-size:13px;}\n .v6-match-copy p{font-size:11px;}\n .v6-match-cta{font-size:11px;min-height:38px;padding:7px 5px;}\n .v6-fantasy-form{grid-template-columns:1fr;}\n .v6-result-summary{grid-template-columns:1fr;}\n .v6-active-feature{grid-template-columns:1fr;}\n .v6-active-feature>img{max-height:420px;object-position:center 28%;}\n .v6-fantasy-builder{padding:13px;}\n}\n@media(prefers-reduced-motion:reduce){.v6-match-card{transition:none;}}\n.v6-legacy-router{margin:16px 0 24px;border:1px solid #51404a;border-radius:15px;background:#171116;overflow:hidden;}\n.v6-legacy-router>summary{min-height:44px;display:flex;align-items:center;padding:12px 14px;color:#dec798;font-size:12px;font-weight:800;cursor:pointer;list-style-position:inside;}\n.v6-legacy-router[open]>summary{border-bottom:1px solid #51404a;background:#20171c;}\n.v6-legacy-router .v3-fantasy-studio{margin:0;padding:14px;border:0;border-radius:0;box-shadow:none;}\n\n/* Phase 6 — additive wellness, collection and rights styles. */\n.p6-education-chip{display:inline-flex;width:max-content;max-width:100%;border:1px solid #4e7058;border-radius:999px;padding:5px 9px;color:#b7e7c0;background:#17231b;font-size:10px;font-weight:800;letter-spacing:.06em}\n.p6-wellness-toolkit{border-top:1px solid var(--line);padding-top:22px}.p6-guide-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.p6-guide-card{min-width:0;border:1px solid var(--line);border-radius:17px;overflow:hidden;background:var(--panel);padding:12px}.p6-guide-card>img{display:block;width:100%;height:auto;aspect-ratio:1.65;object-fit:contain;border-radius:10px;background:#f8f4f7}.p6-guide-card h3{font-size:17px;line-height:1.25;margin:4px 0 8px}.p6-guide-card p:not(.eyebrow),.p6-guide-card li{font-size:12px;line-height:1.5;color:var(--muted)}.p6-guide-card ul{padding-left:18px;display:grid;gap:5px}.p6-health-note{border-left:3px solid #b98a53;padding:10px 13px;background:#211a18;color:var(--muted);font-size:12px;line-height:1.5;margin-top:14px}\n.p6-collection-jumpnav{margin:16px 0 24px;padding:15px;border:1px solid var(--line);border-radius:16px;background:#171119}.p6-collection-buttons{display:flex;flex-wrap:wrap;gap:8px}.p6-collection-buttons button{min-height:42px;padding:9px 12px;border:1px solid var(--line);border-radius:999px;background:#211721;color:var(--cream);font-weight:700;font-size:12px}.p6-collection-buttons button[aria-pressed=\"true\"]{background:var(--pink);border-color:var(--pink);color:#1a0c15}.p6-collection-jumpnav .micro{margin:9px 0 0}.p6-collection-jumpnav,.p6-rights-panel{scroll-margin-top:105px}\n.p6-rights-panel{border:1px solid var(--line);border-radius:18px;padding:clamp(14px,3vw,22px);background:linear-gradient(145deg,#211720,#120e13)}.p6-rights-visual{display:block;width:100%;height:auto;max-height:200px;object-fit:contain;background:#f8f4f7;border-radius:11px;margin:10px 0 14px}.p6-rights-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.p6-rights-grid article{border:1px solid var(--line);border-radius:12px;padding:12px;background:#171119}.p6-rights-grid b{font-size:13px}.p6-rights-grid p{font-size:12px;color:var(--muted);line-height:1.5;margin:6px 0 0}.p6-rights-warning{font-size:12px;line-height:1.5;color:#f4d7aa;background:#2a2119;padding:11px 13px;border-left:3px solid #b98a53;margin:14px 0 0}.p6-fit-privacy{margin:16px 0;padding:13px;border:1px solid #6a4a5e;border-radius:14px;background:#211720}.p6-fit-privacy b{font-size:13px}.p6-fit-privacy p{font-size:12px;line-height:1.5;color:var(--muted);margin:5px 0 0}\n@media(max-width:740px){.p6-guide-grid{grid-template-columns:1fr}.p6-guide-card{display:grid;grid-template-columns:minmax(105px,.75fr) minmax(0,1.25fr);gap:4px 12px;align-items:start}.p6-guide-card>img{grid-row:1/5;aspect-ratio:1;min-height:100px}.p6-guide-card ul{grid-column:2}.p6-rights-grid{grid-template-columns:1fr}.p6-rights-visual{max-height:150px}}\n@media(max-width:390px){.p6-guide-card{grid-template-columns:1fr}.p6-guide-card>img{grid-row:auto;aspect-ratio:1.65}.p6-guide-card ul{grid-column:auto}.p6-collection-buttons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.p6-collection-buttons button{width:100%;border-radius:12px}}\n\n/* Phase 6 UX layer — mobile readability, tap targets, filters, local preference opt-in and couples deck. */\n.p6x-shortnav{display:flex;gap:8px;overflow-x:auto;padding:5px 0 12px;scrollbar-width:thin;scroll-margin-top:100px}.p6x-shortnav button{flex:0 0 auto;min-height:42px;padding:9px 13px;border:1px solid #5c4254;border-radius:999px;background:#211720;color:#fff3fa;font-size:12px;font-weight:750;white-space:nowrap}.p6x-shortnav button:hover,.p6x-shortnav button:focus-visible{border-color:#f4a0c1;background:#392438}\n.p6x-filter-panel{margin:14px 0;padding:13px;border:1px solid #5d4431;border-radius:16px;background:linear-gradient(145deg,#211a18,#151015)}.p6x-filter-title{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px}.p6x-filter-title strong{font-size:13px;color:#ffe0ae}.p6x-filter-title small{font-size:11px;color:#bfb0bd}.p6x-filter-search{width:100%;min-height:44px;padding:11px 12px;border:1px solid #624e44;border-radius:11px;background:#100d12;color:#fff5fa;font:inherit;font-size:14px}.p6x-filter-chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.p6x-filter-chips button{min-height:40px;padding:8px 11px;border:1px solid #594536;border-radius:999px;background:#181216;color:#f4e9ec;font-size:11px;font-weight:750}.p6x-filter-chips button[aria-pressed=\"true\"]{background:#f4a0c1;color:#211019;border-color:#f4a0c1}.p6x-filter-status{margin:9px 0 0;font-size:11px;color:#ddc6d6;min-height:17px}\n.p6x-couples-deck{margin:22px 0 10px;padding:clamp(14px,3vw,22px);border:1px solid #76506c;border-radius:20px;background:radial-gradient(ellipse at 95% 0,#4b273d 0,transparent 45%),linear-gradient(145deg,#21151e,#120e13);scroll-margin-top:105px}.p6x-deck-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}.p6x-deck-head h3{font-size:clamp(20px,3vw,26px);line-height:1.16;margin:0;color:#ffdfaa}.p6x-deck-head p{font-size:12px;color:#cbb9c8;margin:7px 0 0;max-width:580px}.p6x-deck-progress{display:inline-flex;align-items:center;border:1px solid #76516c;border-radius:999px;padding:6px 9px;color:#ffc1d8;font-size:10px;font-weight:800;white-space:nowrap}.p6x-deck-card{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;margin-top:14px;padding:clamp(14px,3vw,21px);border:1px solid #493344;border-radius:15px;background:#151018}.p6x-deck-kicker{margin:0;color:#eacb8c;font-size:10px;font-weight:850;letter-spacing:.13em}.p6x-deck-card h4{font-size:19px;line-height:1.2;margin:0;color:#fff3fa}.p6x-deck-card p{font-size:14px;line-height:1.65;color:#d1c2d0;margin:0;max-width:760px}.p6x-deck-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:5px}.p6x-deck-actions button{min-height:44px;padding:10px 14px;border:1px solid #78556c;border-radius:12px;background:#291b28;color:#fff3fa;font-size:12px;font-weight:800}.p6x-deck-actions .p6x-deck-primary{background:#f4a0c1;color:#211019;border-color:#f4a0c1}.p6x-deck-consent{margin:11px 0 0;padding:10px 12px;border-left:3px solid #eacb8c;border-radius:0 9px 9px 0;background:#20191b;color:#cbbdc8;font-size:11px;line-height:1.55}.p6x-deck-status{font-size:11px;color:#eacb8c;min-height:16px;margin:9px 0 0}\n.p6x-preferences{margin:14px 0;padding:14px;border:1px solid #57414f;border-radius:15px;background:#19131b}.p6x-preferences h4{font-size:15px;color:#ffdfaa;margin:0 0 6px}.p6x-preferences>p{font-size:12px;line-height:1.5;color:#c6b7c4;margin:0 0 10px}.p6x-preferences label{display:flex;gap:9px;align-items:flex-start;font-size:12px;color:#efe3ed}.p6x-preferences input[type=checkbox]{margin-top:3px;accent-color:#f4a0c1;flex:none}.p6x-pref-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.p6x-pref-actions button{min-height:42px;padding:9px 12px;border:1px solid #6a4d61;border-radius:11px;background:#251a25;color:#fff4fa;font-size:12px;font-weight:750}.p6x-pref-status{margin:9px 0 0;min-height:16px;font-size:11px;color:#e6c6d9}\n.p6x-wellness-jumps{display:flex;gap:8px;overflow-x:auto;padding:4px 0 12px;scrollbar-width:thin}.p6x-wellness-jumps button{flex:0 0 auto;min-height:42px;padding:9px 12px;border:1px solid #506850;border-radius:12px;background:#17221b;color:#d8f1db;font-size:12px;font-weight:750}.p6x-wellness-jumps button:focus-visible,.p6x-wellness-jumps button:hover{outline:2px solid #9fe3b2;outline-offset:2px}.p6x-error-note{margin:10px 0;padding:10px;border:1px solid #8e566b;border-radius:11px;background:#2b1823;color:#ffe5ee;font-size:12px}.v6-match-card[hidden]{display:none!important}\n/* The current prototype's four educational SVGs live in the repository root, not ./assets/. */\n@media(max-width:480px){.p6x-filter-panel{padding:11px}.p6x-filter-chips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.p6x-filter-chips button{padding:8px 5px}.p6x-deck-actions{display:grid;grid-template-columns:1fr 1fr}.p6x-deck-actions button{width:100%;padding:9px}.p6x-deck-card p{font-size:13px}}\n@media(prefers-reduced-motion:reduce){.p6x-shortnav,.p6x-wellness-jumps{scroll-behavior:auto}}\n/* Consolidated UI readability overrides */\n.p6-guide-card p:not(.eyebrow),.p6-guide-card li,.p6-rights-grid p{font-size:13px;line-height:1.6}.p6-health-note,.p6-fit-privacy p,.p6-rights-warning{font-size:12px;line-height:1.6}.p6-collection-buttons button{min-height:44px}.p6-guide-card,.p6-rights-panel,.p6-collection-jumpnav{scroll-margin-top:105px}\n";
  document.head.append(style);
  document.documentElement.dataset.blackedPhase6Combined='ready';
})();
/* BLACKED V3 Phase 6 — a visibly redesigned fictional Boyfriend / Fantasy Studio.
   Character portraits are crops of the user's reference board; no real-person identity,
   anatomy, availability, booking or sale is represented. All answers stay in this page. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE6) return;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const state = { version:'5.6.0', studioBuilt:false, selectedArchetype:'romantic', galleryCardsAdded:0, innerwearCardsAdded:0, lastChoice:null, errors:[] };
  const asset = path => './' + String(path).split('/').pop();
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

/* BLACKED Phase 6 — additive wellness, collection navigation and media-rights guidance. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE6) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const state = { inserted: [], activeCollection: 'all' };
  const make = (tag, cls, html) => { const el=document.createElement(tag); if(cls)el.className=cls; if(html!==undefined)el.innerHTML=html; return el; };

  function addWellnessToolkit() {
    const view = $('#view-wellness'); if (!view || $('#p6WellnessToolkit')) return;
    const section = make('section','section-block p6-wellness-toolkit', `
      <div class="section-heading"><div><p class="eyebrow">PHASE 6 · COMFORT-LED WELLNESS</p><h2 id="p6WellnessTitle">Useful guides, not body ratings</h2><p class="muted">Measure accurately, check the actual product specification, and choose comfort over a label. These diagrams are original educational assets, not product photos.</p></div><span class="p6-education-chip">GENERAL EDUCATION</span></div>
      <div class="p6-guide-grid">
        <article class="p6-guide-card"><img src="./phase6-measurement-map.svg" width="680" height="410" loading="lazy" alt="Diagram showing a level tape around a garment measurement area"><p class="eyebrow">01 · MEASUREMENT</p><h3>Measure without squeezing</h3><p>Keep the tape level and snug, not tight. Record units and use the size chart for the exact garment, not a generic conversion.</p><ul><li>Measure over a thin layer if that matches the brand's directions.</li><li>Write down whether a value is in cm or inches.</li><li>If between sizes, compare garment stretch and return terms.</li></ul></article>
        <article class="p6-guide-card"><img src="./phase6-product-specs.svg" width="680" height="410" loading="lazy" alt="Generic product specification drawing labelling overall length, usable length and widest width"><p class="eyebrow">02 · PRODUCT SPECS</p><h3>Compare the actual dimensions</h3><p>For any body-contact product, compare the manufacturer's stated dimensions and intended use. A size nickname such as “regular” or “XL” is not a shared standard.</p><ul><li>Distinguish total length from usable/insertable length where relevant.</li><li>Read material, care, compatibility and warnings from the manufacturer.</li><li>Never use an image or wheel result to infer a person's body.</li></ul></article>
        <article class="p6-guide-card"><img src="./phase6-comfort-check.svg" width="680" height="410" loading="lazy" alt="Four-step comfort checklist: ask, listen, check in and stop or skip"><p class="eyebrow">03 · CONSENT & COMFORT</p><h3>Ask. Listen. Check in.</h3><p>Preferences can change. A clear “no”, “pause” or “skip” is enough; nobody has to justify it. Stop any activity that causes pain or distress.</p><ul><li>Discuss boundaries before trying something new.</li><li>Use products only as designed and follow care instructions.</li><li>Seek qualified healthcare advice for ongoing symptoms.</li></ul></article>
      </div>
      <p class="p6-health-note"><b>Health note:</b> this site offers general education, not diagnosis or individual medical advice. Persistent pain, itching, sores, unusual bleeding or other concerning symptoms deserve advice from a qualified clinician. Read <a href="https://www.acog.org/womens-health/faqs/vulvovaginal-health" target="_blank" rel="noopener noreferrer">ACOG vulvovaginal health</a> and <a href="https://www.plannedparenthood.org/learn/health-and-wellness/sex-and-pleasure/sex-toys" target="_blank" rel="noopener noreferrer">Planned Parenthood: sex toys</a>.</p>`);
    section.id='p6WellnessToolkit'; section.setAttribute('aria-labelledby','p6WellnessTitle');
    const basics = $('.wellness-quick-guides', view) || $('.wellness-measurements', view);
    (basics || view.lastElementChild)?.insertAdjacentElement('afterend', section);
    state.inserted.push('p6WellnessToolkit');
  }

  function addCollectionJumpnav() {
    const view=$('#view-sanskari'); if(!view || $('#p6CollectionJumpnav')) return;
    const nav=make('nav','p6-collection-jumpnav',`<p class="eyebrow">COLLECTIONS · EXPLORE BY CREATIVE DIRECTION</p><div class="p6-collection-buttons" role="group" aria-label="Browse BLACKED collections"><button type="button" data-p6-collection="sanskari" aria-pressed="true">Sanskari · current edit</button><button type="button" data-p6-collection="noor" aria-pressed="false">Noor · coming soon</button><button type="button" data-p6-collection="grace" aria-pressed="false">Grace · coming soon</button><button type="button" data-p6-collection="all" aria-pressed="false">Show all collections</button></div><p id="p6CollectionStatus" class="micro muted" role="status" aria-live="polite">Sanskari is the current campaign edit. Noor and Grace are concepts, not confirmed retail collections.</p>`);
    nav.id='p6CollectionJumpnav'; nav.setAttribute('aria-label','Collection navigation');
    const hero=$('.sanskari-hero',view); (hero || view.firstElementChild)?.insertAdjacentElement('afterend',nav);
    nav.addEventListener('click', e => {
      const button=e.target.closest('[data-p6-collection]'); if(!button)return;
      const key=button.dataset.p6Collection; state.activeCollection=key;
      $$('[data-p6-collection]',nav).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const campaigns=$('#sanskariGallery',view)?.closest('.section-block');
      const noor=$('#v3NoorEditGallery',view);
      const grace=$('.coming-card.grace',view) || $('#v3GracePreview',view)?.closest('figure') || $('#v3GracePreview',view);
      const future=$('.coming-grid',view)?.closest('.section-block');
      if(campaigns) campaigns.hidden = key==='noor'||key==='grace';
      if(noor) noor.hidden = key==='sanskari'||key==='grace';
      if(grace) grace.hidden = key==='sanskari'||key==='noor';
      if(future) future.hidden = key==='sanskari';
      const noorCard=$('.coming-card.noor',view); const graceCard=$('.coming-card.grace',view);
      if(noorCard) noorCard.hidden = key==='grace';
      if(graceCard) graceCard.hidden = key==='noor';
      if(key==='all'){if(campaigns)campaigns.hidden=false;if(noor)noor.hidden=false;if(grace)grace.hidden=false;if(future)future.hidden=false;if(noorCard)noorCard.hidden=false;if(graceCard)graceCard.hidden=false;}
      const status=$('#p6CollectionStatus');
      if(status) status.textContent = key==='sanskari' ? 'Showing the current Sanskari campaign edit. Noor and Grace previews remain marked coming soon.' : key==='noor' ? 'Showing Noor-related creative previews. No model faith, religious endorsement or community-wide preference is inferred.' : key==='grace' ? 'Showing Grace-related creative previews. The artwork is a styling concept, not official church imagery or endorsement.' : 'All collections and clearly labelled coming-soon previews are visible.';
      const target=key==='noor'?noor:key==='grace'?grace:key==='sanskari'?campaigns:nav;
      target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
    state.inserted.push('p6CollectionJumpnav');
  }

  function addRightsPanel() {
    const targetViews=[['view-sanskari','p6RightsCollections'],['view-fit','p6RightsFit']];
    targetViews.forEach(([viewId,id])=>{
      const view=$(`#${viewId}`); if(!view||$(`#${id}`)) return;
      const panel=make('section','section-block p6-rights-panel',`<div class="section-heading"><div><p class="eyebrow">IMAGE RIGHTS · RELEASE CHECK</p><h2 id="${id}Title">An image is not automatically cleared for commercial use</h2><p class="muted">Supplier access, public hosting or a generated look does not itself establish commercial permission. Keep the evidence for each individual asset.</p></div><span class="p6-education-chip">CLEARANCE REQUIRED</span></div>
        <img class="p6-rights-visual" src="./phase6-image-rights-workflow.svg" width="900" height="230" loading="lazy" alt="Three-step workflow: identify the asset, record permission and release only after review">
        <div class="p6-rights-grid"><article><b>1. Identify the source</b><p>Record asset filename, source URL, creator/photographer or supplier, date acquired and whether it is AI-generated, user-supplied or licensed.</p></article><article><b>2. Check permission</b><p>Confirm written commercial-use rights, model releases where required, brand/logo permissions and any limits on editing, geography or paid ads.</p></article><article><b>3. Approve each use</b><p>Store evidence, expiry/attribution requirements and reviewer approval. Remove or replace assets whose rights are uncertain.</p></article></div>
        <p class="p6-rights-warning"><b>Current repository status:</b> this update does not claim legal clearance for all existing site photos. Items that have not been individually documented must stay labelled “rights not verified” and must not be used in paid commercial campaigns until checked.</p>`);
      panel.id=id; panel.setAttribute('aria-labelledby',`${id}Title`);
      const anchor=viewId==='view-fit'?$('.fit-layout',view):$('.coming-grid',view);
      (anchor||view.lastElementChild)?.insertAdjacentElement('afterend',panel);
      state.inserted.push(id);
    });
  }

  function addFitPrivacyHint() {
    const view=$('#view-fit'); if(!view||$('#p6FitPrivacyHint'))return;
    const hint=make('aside','p6-fit-privacy',`<b>Fit Studio privacy reminder</b><p>Photo preview is local to this browser in the existing prototype; it is not uploaded by this page. Fit notes may be stored in browser storage and are not encrypted. Avoid entering sensitive details you do not need. Clear the photo/notes when finished on a shared device.</p>`);
    hint.id='p6FitPrivacyHint'; $('.fit-layout',view)?.insertAdjacentElement('afterend',hint); state.inserted.push('p6FitPrivacyHint');
  }

  function setup() {
    addWellnessToolkit(); addCollectionJumpnav(); addRightsPanel(); addFitPrivacyHint();
    window.BLACKED_PHASE6={version:'1.1.0',rightsClearedForExistingAssets:false,getDiagnostics:()=>({loaded:true,inserted:[...state.inserted],wellnessToolkit:!!$('#p6WellnessToolkit'),collectionJumpnav:!!$('#p6CollectionJumpnav'),noorCollectionPresent:!!$('#v3NoorEditGallery'),gracePreviewPresent:!!$('#v3GracePreview'),rightsPanels:!!$('#p6RightsCollections')&&!!$('#p6RightsFit'),existingAssetRightsClaimed:false,brokenDiagramPaths:$$('[src^="./assets/phase6-"]').length,usesOriginalSvgAssets:$$('[src^="./phase6-"]').filter(img=>img.getAttribute('src')?.includes('phase6-')).length})};
    document.documentElement.dataset.blackedPhase6='loaded';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();

/* BLACKED V3 Phase 6 UX — searchable archetypes, shortcut nav, local preferences and couples connection deck. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE6_UX) return;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const STORE_KEY = 'blackedV6StudioPrefs';
  const state = { inserted: [], deckIndex: 0, deckCompleted: 0, deckSkipped: 0, savedPreferences: false, errors: [] };
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prompts = [
    {title:'Ask one curious question',tag:'GENTLE · CONNECTION',body:'Ask a question you have not asked before. Listen to the full answer before fixing, explaining or changing the subject.'},
    {title:'Make a two-song playlist',tag:'PLAYFUL · SHARED TASTE',body:'Each adult chooses one song and explains the memory or mood behind it. No song has to be shared publicly.'},
    {title:'Plan a low-pressure date',tag:'EASY · DATE NIGHT',body:'Pick one small plan together: chai, a walk, a film or a favourite meal. Either person can suggest a change or skip.'},
    {title:'Share one green flag',tag:'WARM · APPRECIATION',body:'Take turns naming one specific thing you appreciate about the other person. Keep it sincere; passing is allowed.'},
    {title:'Talk about a boundary',tag:'DEEPER · TRUST',body:'Ask: “What helps you feel comfortable, and what should I check in about?” Listen without debate. A boundary is not a challenge to overcome.'},
    {title:'Imagine a small adventure',tag:'BOLD · MUTUAL CHOICE',body:'Choose a fictional or real-life adventure idea, then each say what sounds fun, what does not, and what would make it comfortable.'}
  ];

  const css = `
  .p6x-shortnav{display:flex;gap:8px;overflow-x:auto;padding:5px 0 12px;scrollbar-width:thin;scroll-margin-top:100px}
  .p6x-shortnav button{flex:0 0 auto;min-height:42px;padding:9px 13px;border:1px solid #5c4254;border-radius:999px;background:#211720;color:#fff3fa;font-size:12px;font-weight:750;white-space:nowrap}
  .p6x-shortnav button:hover,.p6x-shortnav button:focus-visible{border-color:#f4a0c1;background:#392438}
  .p6x-filter-panel{margin:14px 0;padding:13px;border:1px solid #5d4431;border-radius:16px;background:linear-gradient(145deg,#211a18,#151015)}
  .p6x-filter-title{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px}
  .p6x-filter-title strong{font-size:13px;color:#ffe0ae}.p6x-filter-title small{font-size:11px;color:#bfb0bd}
  .p6x-filter-search{width:100%;min-height:44px;padding:11px 12px;border:1px solid #624e44;border-radius:11px;background:#100d12;color:#fff5fa;font:inherit;font-size:14px}
  .p6x-filter-chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}
  .p6x-filter-chips button{min-height:40px;padding:8px 11px;border:1px solid #594536;border-radius:999px;background:#181216;color:#f4e9ec;font-size:11px;font-weight:750}
  .p6x-filter-chips button[aria-pressed="true"]{background:#f4a0c1;color:#211019;border-color:#f4a0c1}
  .p6x-filter-status{margin:9px 0 0;font-size:11px;color:#ddc6d6;min-height:17px}
  .p6x-couples-deck{margin:22px 0 10px;padding:clamp(14px,3vw,22px);border:1px solid #76506c;border-radius:20px;background:radial-gradient(ellipse at 95% 0,#4b273d 0,transparent 45%),linear-gradient(145deg,#21151e,#120e13);scroll-margin-top:105px}
  .p6x-deck-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
  .p6x-deck-head h3{font-size:clamp(20px,3vw,26px);line-height:1.16;margin:0;color:#ffdfaa}
  .p6x-deck-head p{font-size:12px;color:#cbb9c8;margin:7px 0 0;max-width:580px}
  .p6x-deck-progress{display:inline-flex;align-items:center;border:1px solid #76516c;border-radius:999px;padding:6px 9px;color:#ffc1d8;font-size:10px;font-weight:800;white-space:nowrap}
  .p6x-deck-card{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;margin-top:14px;padding:clamp(14px,3vw,21px);border:1px solid #493344;border-radius:15px;background:#151018}
  .p6x-deck-kicker{margin:0;color:#eacb8c;font-size:10px;font-weight:850;letter-spacing:.13em}
  .p6x-deck-card h4{font-size:19px;line-height:1.2;margin:0;color:#fff3fa}
  .p6x-deck-card p{font-size:14px;line-height:1.65;color:#d1c2d0;margin:0;max-width:760px}
  .p6x-deck-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:5px}
  .p6x-deck-actions button{min-height:44px;padding:10px 14px;border:1px solid #78556c;border-radius:12px;background:#291b28;color:#fff3fa;font-size:12px;font-weight:800}
  .p6x-deck-actions .p6x-deck-primary{background:#f4a0c1;color:#211019;border-color:#f4a0c1}
  .p6x-deck-consent{margin:11px 0 0;padding:10px 12px;border-left:3px solid #eacb8c;border-radius:0 9px 9px 0;background:#20191b;color:#cbbdc8;font-size:11px;line-height:1.55}
  .p6x-preferences{margin:14px 0;padding:14px;border:1px solid #57414f;border-radius:15px;background:#19131b}
  .p6x-preferences h4{font-size:15px;color:#ffdfaa;margin:0 0 6px}.p6x-preferences>p{font-size:12px;line-height:1.5;color:#c6b7c4;margin:0 0 10px}
  .p6x-preferences label{display:flex;gap:9px;align-items:flex-start;font-size:12px;color:#efe3ed}.p6x-preferences input[type=checkbox]{margin-top:3px;accent-color:#f4a0c1;flex:none}
  .p6x-pref-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.p6x-pref-actions button{min-height:42px;padding:9px 12px;border:1px solid #6a4d61;border-radius:11px;background:#251a25;color:#fff4fa;font-size:12px;font-weight:750}
  .p6x-pref-status{margin:9px 0 0;min-height:16px;font-size:11px;color:#e6c6d9}
  .p6x-wellness-jumps{display:flex;gap:8px;overflow-x:auto;padding:4px 0 12px;scrollbar-width:thin}
  .p6x-wellness-jumps button{flex:0 0 auto;min-height:42px;padding:9px 12px;border:1px solid #506850;border-radius:12px;background:#17221b;color:#d8f1db;font-size:12px;font-weight:750}
  .p6x-wellness-jumps button:focus-visible,.p6x-wellness-jumps button:hover{outline:2px solid #9fe3b2;outline-offset:2px}
  .p6x-error-note{margin:10px 0;padding:10px;border:1px solid #8e566b;border-radius:11px;background:#2b1823;color:#ffe5ee;font-size:12px}
  .v6-match-card[hidden]{display:none!important}
  .p6x-deck-status{font-size:11px;color:#eacb8c;min-height:16px;margin:9px 0 0}
  @media(max-width:480px){.p6x-filter-panel{padding:11px}.p6x-filter-chips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.p6x-filter-chips button{padding:8px 5px}.p6x-deck-actions{display:grid;grid-template-columns:1fr 1fr}.p6x-deck-actions button{width:100%;padding:9px}.p6x-deck-card p{font-size:13px}}
  @media(prefers-reduced-motion:reduce){.p6x-shortnav,.p6x-wellness-jumps{scroll-behavior:auto}}
  `;

  function make(tag, cls='', text=''){
    const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;
  }
  function injectStyles(){if($('#p6xStyles'))return;const style=make('style');style.id='p6xStyles';style.textContent=css;document.head.append(style);}
  function scrollToTarget(target){if(!target)return;target.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'});}
  function addBoyfriendShortnav(){
    const studio=$('#v6BoyfriendStudio');if(!studio||$('#p6xBoyfriendNav'))return;
    const nav=make('nav','p6x-shortnav');nav.id='p6xBoyfriendNav';nav.setAttribute('aria-label','Boyfriend and couples studio shortcuts');
    const items=[['Match','#v6MatchGrid'],['Fantasy builder','#v6FantasyBuilder'],['Couples deck','#p6xCouplesDeck'],['Campaigns','#v6ActiveCampaign'],['Gated gallery','#v23ThreesomeSection'],['Wellness','view:wellness']];
    items.forEach(([label,target])=>{const b=make('button','',label);b.type='button';b.dataset.p6xTarget=target;nav.append(b);});
    const hero=studio.querySelector('.v6-bfs-hero');(hero||studio.firstElementChild)?.insertAdjacentElement('beforebegin',nav);
    nav.addEventListener('click',e=>{const b=e.target.closest('[data-p6x-target]');if(!b)return;const target=b.dataset.p6xTarget;if(target==='view:wellness'){document.querySelector('#mainNav [data-view-link="wellness"]')?.click();return;}scrollToTarget($(target));});
    state.inserted.push('boyfriend-shortnav');
  }
  function addArchetypeFilters(){
    const grid=$('#v6MatchGrid');if(!grid||$('#p6xArchetypeFilters'))return;
    const host=make('section','p6x-filter-panel');host.id='p6xArchetypeFilters';host.setAttribute('aria-label','Search and filter fictional archetypes');
    const head=make('div','p6x-filter-title');head.append(make('strong','','Find your character vibe'),make('small','','Fictional archetypes · no real-person claims'));host.append(head);
    const search=document.createElement('input');search.className='p6x-filter-search';search.type='search';search.id='p6xArchetypeSearch';search.maxLength=80;search.placeholder='Search romantic, active, mysterious…';search.setAttribute('aria-label','Search character archetypes');host.append(search);
    const chips=make('div','p6x-filter-chips');chips.setAttribute('role','group');chips.setAttribute('aria-label','Filter archetypes');
    const filters=[['all','All'],['romantic','Romantic'],['confident','Confident'],['active','Active'],['strong','Strong presence'],['group','Group stories']];
    filters.forEach(([v,t],i)=>{const b=make('button','',t);b.type='button';b.dataset.p6xFilter=v;b.setAttribute('aria-pressed',String(i===0));chips.append(b);});host.append(chips);
    const status=make('p','p6x-filter-status','6 character styles available.');status.id='p6xFilterStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');host.append(status);
    const title=$('#v6MatchCardsTitle');const heading=title?.closest('.v6-bfs-section-head');
    if(heading)heading.insertAdjacentElement('afterend',host);else grid.insertAdjacentElement('beforebegin',host);
    let activeFilter='all';
    function runFilter(){
      const q=search.value.trim().toLowerCase();let visible=0;const cards=$$('.v6-match-card',grid);
      cards.forEach(card=>{const id=card.dataset.archetype||'';const text=card.textContent.toLowerCase();const cat=activeFilter==='all'||(activeFilter==='romantic'&&id==='romantic')||(activeFilter==='confident'&&id==='confident')||(activeFilter==='strong'&&id==='sturdy')||(activeFilter==='active'&&id==='active')||(activeFilter==='group'&&(id==='couple-plus-one'||id==='multi-adult'));const ok=cat&&(!q||text.includes(q)||id.includes(q));card.hidden=!ok;if(ok)visible++;});status.textContent=`${visible} of ${cards.length} fictional character styles shown.`;
    }
    search.addEventListener('input',runFilter);chips.addEventListener('click',e=>{const b=e.target.closest('[data-p6x-filter]');if(!b)return;activeFilter=b.dataset.p6xFilter;$$('[data-p6x-filter]',chips).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));runFilter();});
    state.inserted.push('archetype-search-and-filters');
  }
  function addCouplesDeck(){
    const builder=$('#v6FantasyBuilder');if(!builder||$('#p6xCouplesDeck'))return;
    const deck=make('section','p6x-couples-deck');deck.id='p6xCouplesDeck';deck.setAttribute('aria-labelledby','p6xCouplesDeckTitle');
    const header=make('div','p6x-deck-head');const copy=make('div');copy.append(make('h3','','Couples Connection Deck'),make('p','','Small optional challenges for curiosity, appreciation and clearer communication. No one has to explain a skip.'));header.append(copy,make('span','p6x-deck-progress','0 completed'));header.querySelector('.p6x-deck-progress').id='p6xDeckProgress';copy.querySelector('h3').id='p6xCouplesDeckTitle';deck.append(header);
    const card=make('article','p6x-deck-card');const tag=make('p','p6x-deck-kicker');tag.id='p6xDeckTag';const title=make('h4');title.id='p6xDeckPromptTitle';const body=make('p');body.id='p6xDeckPromptBody';card.append(tag,title,body);deck.append(card);
    const actions=make('div','p6x-deck-actions');const done=make('button','p6x-deck-primary','Done · next prompt');done.type='button';done.id='p6xDeckDone';const another=make('button','','Another prompt');another.type='button';another.id='p6xDeckNext';const skip=make('button','','Skip');skip.type='button';skip.id='p6xDeckSkip';actions.append(done,another,skip);deck.append(actions);
    const status=make('p','p6x-deck-status','All prompts are optional; choose what works for both adults.');status.id='p6xDeckStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');deck.append(status);
    const note=make('p','p6x-deck-consent','Consent first: both adults can pause, change the prompt or stop. This deck is about communication and shared activities, not a test of compatibility.');deck.append(note);
    builder.insertAdjacentElement('afterend',deck);
    function paint(){const item=prompts[state.deckIndex];tag.textContent=item.tag;title.textContent=item.title;body.textContent=item.body;$('#p6xDeckProgress').textContent=`${state.deckCompleted} completed`;status.textContent=`Prompt ${state.deckIndex+1} of ${prompts.length} · ${state.deckSkipped} skipped this session.`;}
    function advance(kind){if(kind==='done')state.deckCompleted++;if(kind==='skip')state.deckSkipped++;let next=state.deckIndex;while(prompts.length>1&&next===state.deckIndex)next=Math.floor(Math.random()*prompts.length);state.deckIndex=next;paint();}
    done.addEventListener('click',()=>advance('done'));another.addEventListener('click',()=>advance('another'));skip.addEventListener('click',()=>advance('skip'));paint();state.inserted.push('couples-connection-deck');
  }
  function addPreferenceControls(){
    const form=$('#v6FantasyBuilderForm');if(!form||$('#p6xPreferences'))return;
    const panel=make('section','p6x-preferences');panel.id='p6xPreferences';panel.setAttribute('aria-labelledby','p6xPreferencesTitle');panel.append(make('h4','','Your studio preferences'),make('p','','Optionally remember your selected archetype and story filters on this device. This is off until you enable it and is not encrypted or synced.'));
    const label=make('label');const check=document.createElement('input');check.type='checkbox';check.id='p6xSavePrefsOptIn';label.append(check,make('span','','Save my preferences on this device (optional)'));panel.append(label);
    const actions=make('div','p6x-pref-actions');const save=make('button','','Save preferences');save.type='button';save.id='p6xSavePrefs';const clear=make('button','','Clear saved preferences');clear.type='button';clear.id='p6xClearPrefs';actions.append(save,clear);panel.append(actions);
    const status=make('p','p6x-pref-status','Preferences are not saved.');status.id='p6xPrefsStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');panel.append(status);
    form.insertAdjacentElement('afterend',panel);
    let stored=null;try{stored=JSON.parse(localStorage.getItem(STORE_KEY)||'null');}catch(_){}
    if(stored&&stored.enabled===true){check.checked=true;state.savedPreferences=true;$('#v6StoryType').value=stored.storyType||$('#v6StoryType').value;$('#v6StoryMood').value=stored.storyMood||$('#v6StoryMood').value;$('#v6SizePreference').value=stored.sizePreference||$('#v6SizePreference').value;const archetype=stored.archetype;if(archetype) $(`[data-v6-select-archetype="${CSS.escape(archetype)}"]`)?.click();status.textContent='Your previously opted-in preferences were restored on this device.';}
    check.addEventListener('change',()=>{state.savedPreferences=check.checked;if(!check.checked){status.textContent='Saving is off. Existing saved preferences remain until you press Clear saved preferences.';}else status.textContent='Saving enabled for this browser only. Press Save preferences to store the current choices.';});
    save.addEventListener('click',()=>{if(!check.checked){status.textContent='Enable the optional checkbox first. Nothing was saved.';return;}const selected=$('.v6-match-select[aria-pressed="true"]')?.dataset.v6SelectArchetype||'romantic';const val={enabled:true,archetype:selected,storyType:$('#v6StoryType')?.value||'romantic',storyMood:$('#v6StoryMood')?.value||'gentle',sizePreference:$('#v6SizePreference')?.value||'none',savedAt:new Date().toISOString()};try{localStorage.setItem(STORE_KEY,JSON.stringify(val));status.textContent='Preferences saved on this device only.';}catch(_){status.textContent='Browser storage is unavailable. Your choices remain only for this page session.';}});
    clear.addEventListener('click',()=>{try{localStorage.removeItem(STORE_KEY);}catch(_){}check.checked=false;state.savedPreferences=false;status.textContent='Saved preferences cleared. Other site data was not changed.';});
    state.inserted.push('opt-in-local-preferences');
  }
  function addWellnessQuickJumps(){
    const view=$('#view-wellness'),toolkit=$('#p6WellnessToolkit');if(!view||!toolkit||$('#p6xWellnessJumps'))return;
    const nav=make('nav','p6x-wellness-jumps');nav.id='p6xWellnessJumps';nav.setAttribute('aria-label','Wellness guide shortcuts');
    ['Measurement guide','Product dimensions','Consent & comfort'].forEach((label,i)=>{const b=make('button','',label);b.type='button';b.addEventListener('click',()=>scrollToTarget($$('.p6-guide-card',toolkit)[i]));nav.append(b);});
    toolkit.insertAdjacentElement('beforebegin',nav);state.inserted.push('wellness-quick-jumps');
  }
  function addLoadStateNote(){
    const view=$('#view-boyfriend');if(!view||$('#p6xLoadState'))return;
    const note=make('p','p6x-error-note','Phase 6 Studio loaded. Character previews are editorial concepts; no real person is identified, booked or verified.');note.id='p6xLoadState';note.setAttribute('role','status');
    const intro=view.querySelector('.page-intro');if(intro)intro.insertAdjacentElement('afterend',note);
    state.inserted.push('load-state-note');
  }
  function boot(){
    injectStyles();addBoyfriendShortnav();addArchetypeFilters();addCouplesDeck();addPreferenceControls();addWellnessQuickJumps();addLoadStateNote();
    window.BLACKED_PHASE6_UX={version:'6.0.0',getDiagnostics:()=>({loaded:true,inserted:[...state.inserted],archetypeCards:$$('#v6MatchGrid .v6-match-card').length,visibleArchetypes:$$('#v6MatchGrid .v6-match-card:not([hidden])').length,search:!!$('#p6xArchetypeSearch'),couplesDeck:!!$('#p6xCouplesDeck'),deckControls:!!$('#p6xDeckDone')&&!!$('#p6xDeckNext')&&!!$('#p6xDeckSkip'),preferences:!!$('#p6xPreferences'),localSaveOptIn:!!$('#p6xSavePrefsOptIn')&&!$('#p6xSavePrefsOptIn').checked,wellnessJumps:!!$('#p6xWellnessJumps'),collectionJumpnav:!!$('#p6CollectionJumpnav'),brokenSvgPaths:$$('img[src^="./assets/phase6-"]').length,wellnessSvgImages:$$('#p6WellnessToolkit img').map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),errors:[...state.errors]} )};
    document.documentElement.dataset.blackedPhase6Ux='ready';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* BLACKED V3 Phase 7 final studio UX — applied only when the Phase 6 studio bundle is requested. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE7_STUDIO_UI) return;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const css = `
  #view-boyfriend.p7-studio-view{padding-bottom:16px}
  #view-boyfriend .p7-studio-intro{max-width:none;padding:20px 0 14px;display:grid;grid-template-columns:minmax(0,1fr);gap:0}
  #view-boyfriend .p7-studio-intro>.eyebrow{color:#eacb8c;letter-spacing:.16em;font-size:10px}
  .p7-studio-heading-row{display:flex;justify-content:space-between;align-items:center;gap:16px;margin:3px 0 8px}
  #view-boyfriend #boyfriendTitle{font-size:clamp(28px,5vw,46px);line-height:1.04;letter-spacing:-.04em;margin:0;color:#fff5fa}
  #view-boyfriend #boyfriendTitle em{font-style:normal;color:#f4a0c1}
  .p7-studio-subtitle{font-size:14px!important;color:#c8b8c5!important;margin:3px 0 0!important;max-width:690px}
  .p7-studio-18plus{display:inline-flex;align-items:center;gap:8px;flex:none;max-width:190px;border:1px solid #9d526e;border-radius:14px;padding:10px 12px;background:linear-gradient(130deg,#351b2b,#1b141e);color:#ffd8e8;font-size:11px;line-height:1.35;font-weight:800}
  .p7-studio-18plus span{font-size:20px;line-height:1}
  #view-boyfriend .p7-studio-tabs{display:flex;gap:8px;align-items:center;width:100%;padding:8px 0 14px;margin:0 0 12px;overflow:visible;scroll-margin-top:94px}
  #view-boyfriend .p7-studio-tabs>button{flex:1 1 0;min-height:48px;display:inline-flex;justify-content:center;align-items:center;gap:7px;padding:10px 12px;border:1px solid #352535;border-radius:13px;background:linear-gradient(145deg,#1b151f,#161119);color:#e6dce6;font-size:12px;font-weight:800;white-space:nowrap}
  #view-boyfriend .p7-studio-tabs>button:first-child{border-color:#d45d8c;background:linear-gradient(120deg,#f4a0c1,#d15c8b 72%,#492338);color:#1c1019;box-shadow:0 0 0 1px #ef94b855,0 6px 20px #d45d8b22}
  #view-boyfriend .p7-studio-tabs>button:focus-visible,#view-boyfriend .p7-studio-tabs>button:hover{outline:2px solid #f4a0c1;outline-offset:2px}
  #view-boyfriend .p7-studio-tabs .p7-studio-more{position:relative;flex:0 0 auto}
  #view-boyfriend .p7-studio-more>summary{display:flex;align-items:center;justify-content:center;list-style:none;min-height:48px;padding:10px 13px;border:1px solid #51404f;border-radius:13px;background:#1c1520;color:#e9dce8;font-size:12px;font-weight:800;cursor:pointer}
  #view-boyfriend .p7-studio-more>summary::-webkit-details-marker{display:none}
  #view-boyfriend .p7-studio-more[open]>.p7-studio-more-menu{position:absolute;right:0;top:calc(100% + 6px);z-index:30;display:grid;gap:7px;min-width:185px;padding:8px;border:1px solid #594052;border-radius:13px;background:#18111b;box-shadow:0 14px 30px #0009}
  #view-boyfriend .p7-studio-more-menu button{min-height:44px;width:100%;padding:10px;text-align:left;border:1px solid #3b2b3a;border-radius:9px;background:#231824;color:#f8eaf3;font-size:12px;font-weight:700}
  #view-boyfriend .v6-boyfriend-studio{margin:8px 0 25px;padding:clamp(13px,2.8vw,24px);border-color:#52394b;background:radial-gradient(ellipse at 92% 0,#4b203d 0,transparent 40%),linear-gradient(145deg,#1d151f,#100c12 72%);box-shadow:0 12px 34px #0003}
  #view-boyfriend .v6-bfs-hero{grid-template-columns:minmax(0,1fr) 120px;gap:12px;padding-bottom:16px;border-color:#453346}
  #view-boyfriend .v6-bfs-title{font-size:clamp(20px,3vw,28px)!important;color:#ffdfaa}
  #view-boyfriend .v6-bfs-lede{font-size:13px;margin-bottom:8px}
  #view-boyfriend .v6-bfs-pills{margin:9px 0}
  #view-boyfriend .v6-bfs-pill{border-color:#54394e;background:#211721;color:#f6cadc;font-size:10px;min-height:28px}
  #view-boyfriend .v6-bfs-hero-media{width:100%;max-width:120px;border-radius:13px;border-color:#76516b}
  #view-boyfriend .v6-bfs-hero-media>img{aspect-ratio:4/5;max-height:125px;object-fit:cover}
  #view-boyfriend .v6-bfs-hero-caption{padding:7px 9px}
  #view-boyfriend .v6-bfs-hero-caption strong{font-size:14px}
  #view-boyfriend .v6-bfs-hero-caption small{font-size:9px}
  #view-boyfriend .v6-bfs-disclaimer{font-size:11px;margin-top:8px}
  #view-boyfriend .p6x-shortnav{display:none!important}
  #view-boyfriend .v6-bfs-section-head{margin:19px 0 12px;align-items:end}
  #view-boyfriend #v6MatchCardsTitle{font-size:clamp(23px,3.5vw,30px);color:#fff5fa}
  #view-boyfriend .v6-bfs-section-head .muted{font-size:12px}
  #view-boyfriend .p6x-filter-panel{margin:10px 0 14px;border-color:#453447;background:linear-gradient(145deg,#211720,#151018);padding:12px}
  #view-boyfriend .p6x-filter-title strong{color:#eacb8c}
  #view-boyfriend .p6x-filter-search{min-height:46px;border-radius:12px;background:#110d13;border-color:#4d394e}
  #view-boyfriend .p6x-filter-chips{gap:7px}
  #view-boyfriend .p6x-filter-chips button{min-height:42px;border-color:#493649;background:#19131b;color:#e9dce8}
  #view-boyfriend .p6x-filter-chips button[aria-pressed="true"]{border-color:#f4a0c1;background:#f4a0c1;color:#211019}
  #view-boyfriend .v6-match-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  #view-boyfriend .v6-match-card{border-color:#453245;border-radius:16px;background:linear-gradient(145deg,#211720,#131016);box-shadow:0 6px 18px #0002;overflow:hidden}
  #view-boyfriend .v6-match-card:has(.v6-match-select[aria-pressed="true"]){border-color:#f4a0c1;box-shadow:0 0 0 1px #f4a0c155,0 10px 22px #0004}
  #view-boyfriend .v6-match-select{display:grid;grid-template-columns:minmax(105px,.78fr) minmax(0,1fr);align-items:stretch;min-height:170px}
  #view-boyfriend .v6-match-select>img{width:100%;height:100%;min-height:170px;max-height:215px;aspect-ratio:4/5;object-fit:cover;object-position:center 22%}
  #view-boyfriend .v6-match-copy{gap:8px;padding:12px 11px}
  #view-boyfriend .v6-match-energy{font-size:9px;line-height:1.35;color:#eacb8c;letter-spacing:.07em}
  #view-boyfriend .v6-match-copy h4{font-size:15px;line-height:1.18;color:#fff5fa}
  #view-boyfriend .v6-match-copy p{font-size:12px;line-height:1.48;color:#cbbdca}
  #view-boyfriend .v6-match-cta{min-height:39px;margin-top:auto;border-color:#75465f;border-radius:11px;background:linear-gradient(120deg,#f4a0c1,#d66b99);color:#24111a;font-size:11px;padding:8px}
  #view-boyfriend .v6-fantasy-builder{border-color:#4b364a;background:linear-gradient(145deg,#1b151f,#110d13)}
  #view-boyfriend .p6x-couples-deck{display:grid;grid-template-columns:minmax(130px,.58fr) minmax(0,1.42fr);grid-template-areas:"head head" "image prompt" "image actions" "status status" "consent consent";align-items:stretch;gap:10px;margin:18px 0 12px;padding:clamp(13px,2.5vw,21px);border-color:#87556f;background:radial-gradient(ellipse at 4% 0,#4b263c 0,transparent 42%),linear-gradient(145deg,#21151e,#120e13)}
  #view-boyfriend .p6x-deck-head{grid-area:head;align-items:center;margin-bottom:3px}
  #view-boyfriend .p6x-deck-head h3{font-size:clamp(20px,3vw,27px);color:#ffdfaa}
  #view-boyfriend .p7-deck-image{grid-area:image;align-self:stretch;position:relative;margin:0;overflow:hidden;min-width:0;border:1px solid #503347;border-radius:13px;background:#1a121b;min-height:145px}
  #view-boyfriend .p7-deck-image img{display:block;width:100%;height:100%;min-height:145px;max-height:235px;object-fit:cover;object-position:center 28%}
  #view-boyfriend .p7-deck-image figcaption{position:absolute;inset:auto 0 0;padding:21px 9px 8px;background:linear-gradient(transparent,#0c090de8);color:#f8eaf3;font-size:10px;line-height:1.35}
  #view-boyfriend .p6x-deck-card{grid-area:prompt;margin-top:0;align-content:center;padding:14px;border-color:#493344}
  #view-boyfriend .p6x-deck-card h4{font-size:18px}
  #view-boyfriend .p6x-deck-card p{font-size:13px;line-height:1.58}
  #view-boyfriend .p6x-deck-actions{grid-area:actions;margin-top:0;align-items:stretch}
  #view-boyfriend .p6x-deck-actions button{min-height:44px;flex:1;border-radius:11px}
  #view-boyfriend .p6x-deck-actions .p6x-deck-primary{background:linear-gradient(120deg,#f4a0c1,#d76a99);border-color:#f4a0c1}
  #view-boyfriend .p6x-deck-status{grid-area:status}
  #view-boyfriend .p6x-deck-consent{grid-area:consent;margin-top:0}
  .p7-studio-trust-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:14px 0 22px;padding:13px;border:1px solid #332735;border-radius:15px;background:linear-gradient(145deg,#19131b,#110d13)}
  .p7-studio-trust-item{display:flex;align-items:center;gap:9px;min-width:0;padding:2px 4px}
  .p7-studio-trust-icon{font-size:20px;line-height:1;color:#eacb8c;flex:none}
  .p7-studio-trust-item b,.p7-studio-trust-item small{display:block}
  .p7-studio-trust-item b{font-size:11px;color:#fff0f7}
  .p7-studio-trust-item small{font-size:10px;line-height:1.35;color:#bcaebd;margin-top:3px}
  .p7-studio-bottom-nav{display:none}
  body.p7-studio-active{padding-bottom:calc(88px + env(safe-area-inset-bottom,0px))}
  body.p7-studio-active .p7-studio-bottom-nav{position:fixed;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:3px;z-index:39;left:50%;bottom:calc(5px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(880px,100%);padding:7px max(8px,env(safe-area-inset-left,0px)) 7px max(8px,env(safe-area-inset-right,0px));border:1px solid #3a2c3b;border-radius:17px;background:#100c10f2;box-shadow:0 -8px 28px #0007;backdrop-filter:blur(18px)}
  .p7-studio-bottom-nav button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:0;min-height:47px;border:0;border-radius:10px;background:transparent;color:#bfb2c3;font-size:9px;line-height:1.2;font-weight:750;padding:5px 2px}
  .p7-studio-bottom-nav button .p7-nav-icon{font-size:18px;line-height:1.1}
  .p7-studio-bottom-nav button[aria-current="page"]{background:#2e1c2b;color:#ff9bc0;box-shadow:inset 0 0 0 1px #70445f}
  .p7-studio-bottom-nav button:focus-visible{outline:2px solid #f4a0c1;outline-offset:1px}
  @media(max-width:650px){
    #view-boyfriend .p7-studio-intro{padding-top:14px}
    #view-boyfriend .p7-studio-heading-row{align-items:flex-start;gap:8px}
    #view-boyfriend #boyfriendTitle{font-size:clamp(26px,7.5vw,34px)}
    .p7-studio-18plus{max-width:130px;padding:8px;font-size:10px}
    #view-boyfriend .p7-studio-tabs{gap:6px;padding:7px 0 12px}
    #view-boyfriend .p7-studio-tabs>button{min-height:44px;padding:8px 7px;font-size:11px;border-radius:11px}
    #view-boyfriend .p7-studio-tabs .p7-studio-more>summary{min-height:44px;padding:8px 9px;font-size:11px;border-radius:11px}
    #view-boyfriend .v6-bfs-hero{grid-template-columns:minmax(0,1fr) 84px;gap:10px}
    #view-boyfriend .v6-bfs-hero-media{max-width:84px}
    #view-boyfriend .v6-bfs-hero-media>img{max-height:105px}
    #view-boyfriend .v6-match-grid{grid-template-columns:minmax(0,1fr);gap:9px}
    #view-boyfriend .v6-match-select{grid-template-columns:minmax(112px,.78fr) minmax(0,1fr);min-height:150px}
    #view-boyfriend .v6-match-select>img{min-height:150px;max-height:190px}
    #view-boyfriend .v6-match-copy{padding:11px;gap:6px}
    #view-boyfriend .v6-match-copy h4{font-size:15px}
    #view-boyfriend .v6-match-copy p{font-size:12px}
    #view-boyfriend .p6x-couples-deck{grid-template-columns:minmax(95px,.68fr) minmax(0,1.32fr);gap:8px;padding:12px}
    #view-boyfriend .p6x-deck-head h3{font-size:20px}
    #view-boyfriend .p7-deck-image img{min-height:150px}
    #view-boyfriend .p7-deck-image figcaption{font-size:9px;padding:18px 6px 6px}
    #view-boyfriend .p6x-deck-card{padding:11px;gap:7px}
    #view-boyfriend .p6x-deck-card h4{font-size:15px}
    #view-boyfriend .p6x-deck-card p{font-size:12px}
    #view-boyfriend .p6x-deck-actions{display:grid;grid-template-columns:1fr 1fr}
    #view-boyfriend .p6x-deck-actions button:first-child{grid-column:1/-1}
    .p7-studio-trust-strip{grid-template-columns:1fr;gap:7px;padding:10px}
    .p7-studio-trust-item{padding:3px 4px}
    .p7-studio-trust-item b{font-size:12px}
    .p7-studio-trust-item small{font-size:10px}
  }
  @media(max-width:360px){
    .p7-studio-18plus{max-width:115px;font-size:9px}
    #view-boyfriend .p7-studio-tabs>button{padding-inline:5px;font-size:10px}
    #view-boyfriend .v6-match-select{grid-template-columns:100px minmax(0,1fr)}
    #view-boyfriend .v6-match-copy{padding:9px}
    #view-boyfriend .v6-match-copy h4{font-size:14px}
    #view-boyfriend .p6x-couples-deck{grid-template-columns:1fr}
    #view-boyfriend .p7-deck-image{max-height:150px}
  }
  @media(prefers-reduced-motion:reduce){#view-boyfriend .v6-match-card{transition:none!important}}
  `;
  function make(tag, cls='', text=''){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined&&text!=='')el.textContent=text;return el;}
  function injectStyles(){if($('#p7StudioStyles'))return;const s=make('style');s.id='p7StudioStyles';s.textContent=css;document.head.append(s);}
  function buildHeader(view){
    const intro=view.querySelector('.page-intro');if(!intro||intro.dataset.p7Enhanced)return;
    intro.dataset.p7Enhanced='true';intro.classList.add('p7-studio-intro');
    const eyebrow=intro.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent='04 · FLIRT KARO · PRESSURE NAHI · 18+';
    const title=intro.querySelector('#boyfriendTitle');
    if(title){const row=make('div','p7-studio-heading-row');row.append(title);const badge=make('span','p7-studio-18plus');const icon=make('span','', '♙');const copy=make('span','', '18+ · Fictional characters only');badge.append(icon,copy);row.append(badge);title.innerHTML='Boyfriend & Couples <em>Studio</em>';intro.insertBefore(row,intro.children[1]||null);}
    const desc=intro.querySelector('.muted');if(desc){desc.textContent='Characters · Scenarios · Connection · Your Way';desc.classList.add('p7-studio-subtitle');}
  }
  function buildTabs(view){
    const studio=$('#v6BoyfriendStudio',view);if(!studio)return;
    let nav=$('#p6xBoyfriendNav',studio);
    if(!nav){nav=make('nav','p7-studio-tabs');nav.id='p7StudioTabs';nav.setAttribute('aria-label','Studio sections');const items=[['Match','#v6MatchGrid'],['Fantasy','#v6FantasyBuilder'],['Couples Deck','#p6xCouplesDeck'],['Wellness','view:wellness']];items.forEach(([name,target])=>{const b=make('button','',name);b.type='button';b.dataset.p7Target=target;nav.append(b);});studio.insertBefore(nav,studio.firstElementChild);nav.addEventListener('click',e=>{const b=e.target.closest('[data-p7-target]');if(!b)return;const target=b.dataset.p7Target;if(target==='view:wellness')$('#mainNav [data-view-link="wellness"]')?.click();else $(target)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});}
    nav.classList.add('p7-studio-tabs');nav.setAttribute('aria-label','Boyfriend & Couples Studio sections');
    const oldButtons=[...nav.querySelectorAll('button[data-p6x-target]')];
    if(oldButtons.length){
      const mapping=[['#v6MatchGrid','Match'],['#v6FantasyBuilder','Fantasy'],['#p6xCouplesDeck','Couples Deck'],['view:wellness','Wellness']];
      const chosen=[];
      for(const [target,label] of mapping){const btn=oldButtons.find(b=>b.dataset.p6xTarget===target);if(btn){btn.textContent=label;btn.dataset.p6xTarget=target;chosen.push(btn);}}
      let more=nav.querySelector('.p7-studio-more');
      if(!more){more=make('details','p7-studio-more');const summary=make('summary','', 'More⌄');const menu=make('div','p7-studio-more-menu');more.append(summary,menu);}
      const menu=more.querySelector('.p7-studio-more-menu');
      for(const btn of oldButtons){if(!chosen.includes(btn)){const raw=btn.dataset.p6xTarget||'';btn.textContent=raw.includes('v6ActiveCampaign')?'Campaigns':'Gated gallery';menu.append(btn);}}
      chosen.forEach(btn=>nav.append(btn));if(menu.children.length)nav.append(more);
    }
    nav.querySelectorAll('button').forEach(b=>{b.classList.add('p7-studio-tab');if(!b.dataset.p7Bound){b.dataset.p7Bound='1';b.addEventListener('click',()=>{nav.querySelectorAll('button').forEach(x=>x.removeAttribute('aria-current'));b.setAttribute('aria-current','page');});}});
    if(nav.parentElement!==view.querySelector('.p7-studio-intro')?.parentElement){view.querySelector('.p7-studio-intro')?.insertAdjacentElement('afterend',nav);}
  }
  function decorateMatchHeading(view){const h=$('#v6MatchCardsTitle',view);if(h){h.textContent='Choose Your Experience';const p=h.parentElement?.querySelector('.muted');if(p)p.textContent='Pick a style or mix multiple · fictional characters only';}}
  function buildDeckImage(view){
    const deck=$('#p6xCouplesDeck',view);if(!deck||$('.p7-deck-image',deck))return;
    const figure=make('figure','p7-deck-image');figure.setAttribute('aria-label','Illustrated connection prompt');
    const img=document.createElement('img');img.src='./couple-confidence.webp';img.alt='Fictional couple having a warm, thoughtful conversation';img.loading='lazy';img.decoding='async';img.width=840;img.height=1050;
    const cap=make('figcaption','', 'A moment for the two of you');figure.append(img,cap);
    img.addEventListener('error',()=>{cap.textContent='Connection prompts work even if the illustration is unavailable.';figure.classList.add('p7-deck-image-failed');},{once:true});
    const head=$('.p6x-deck-head',deck);(head||deck.firstElementChild)?.insertAdjacentElement('afterend',figure);
  }
  function buildTrustStrip(view){
    if($('#p7StudioTrust',view))return;
    const strip=make('section','p7-studio-trust-strip');strip.id='p7StudioTrust';strip.setAttribute('aria-label','Privacy and consent principles');
    const records=[['♢','Consent first','Everyone stays in control'],['▣','Fictional scenarios','18+ only, no real-person claims'],['▤','Local only','Preferences stay on your device']];
    records.forEach(([icon,title,desc])=>{const item=make('div','p7-studio-trust-item');const ico=make('span','p7-studio-trust-icon',icon);ico.setAttribute('aria-hidden','true');const copy=make('span');copy.append(make('b','',title),make('small','',desc));item.append(ico,copy);strip.append(item);});
    const deck=$('#p6xCouplesDeck',view);if(deck)deck.insertAdjacentElement('afterend',strip);else{$('#v6BoyfriendStudio',view)?.insertAdjacentElement('afterend',strip);}
  }
  function buildBottomNav(){
    if($('#p7StudioBottomNav'))return;
    const nav=make('nav','p7-studio-bottom-nav');nav.id='p7StudioBottomNav';nav.setAttribute('aria-label','Quick navigation');
    const items=[['⌂','Home','home'],['♧','Couples','boyfriend'],['♢','Innerwear','innerwear'],['❧','Wellness','wellness'],['▤','Stories','stories'],['▦','More','fit']];
    items.forEach(([icon,label,view])=>{const b=make('button','');b.type='button';b.dataset.p7View=view;b.setAttribute('aria-label',view==='boyfriend'?'Boyfriend & Couples':label);const i=make('span','p7-nav-icon',icon);i.setAttribute('aria-hidden','true');b.append(i,make('span','',label));b.addEventListener('click',()=>$('#mainNav [data-view-link="'+view+'"]')?.click());nav.append(b);});
    document.body.append(nav);
  }
  function updateBottomNav(){
    const view=$('#view-boyfriend');const active=!!view&&!view.hidden&&view.classList.contains('active');document.body.classList.toggle('p7-studio-active',active);
    $$('.p7-studio-bottom-nav [data-p7-view]').forEach(b=>{const current=b.dataset.p7View==='boyfriend'&&active;b.toggleAttribute('aria-current',current);if(current)b.setAttribute('aria-current','page');});
  }
  function build(view){if(!view||view.dataset.p7StudioUi==='ready')return false;const studio=$('#v6BoyfriendStudio',view);if(!studio)return false;
    injectStyles();buildHeader(view);buildTabs(view);decorateMatchHeading(view);buildDeckImage(view);buildTrustStrip(view);buildBottomNav();view.classList.add('p7-studio-view');view.dataset.p7StudioUi='ready';
    if(!window.__p7StudioNavObserver){window.__p7StudioNavObserver=new MutationObserver(updateBottomNav);document.querySelectorAll('.view[data-view]').forEach(v=>window.__p7StudioNavObserver.observe(v,{attributes:true,attributeFilter:['class','hidden']}));}
    updateBottomNav();
    window.BLACKED_PHASE7_STUDIO_UI={version:'7.0.0',getDiagnostics:()=>({loaded:!!$('#view-boyfriend[data-p7-studio-ui="ready"]'),header:!!$('#view-boyfriend .p7-studio-18plus'),tabs:$('#view-boyfriend .p7-studio-tabs')?.querySelectorAll('button').length||0,matchCards:$('#v6MatchGrid')?.querySelectorAll('.v6-match-card').length||0,couplesDeck:!!$('#p6xCouplesDeck'),deckImage:!!$('#view-boyfriend .p7-deck-image img'),trustStrip:!!$('#p7StudioTrust'),bottomNav:!!$('#p7StudioBottomNav'),bottomNavVisible:document.body.classList.contains('p7-studio-active'),phase6:window.BLACKED_PHASE6?.getDiagnostics?.()||null,phase6Ux:window.BLACKED_PHASE6_UX?.getDiagnostics?.()||null})};
    document.documentElement.dataset.blackedPhase7Studio='ready';return true;
  }
  function tryBuild(){const view=$('#view-boyfriend');if(build(view))return true;return false;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tryBuild,{once:true});else tryBuild();
  if(!document.documentElement.dataset.blackedPhase7Studio&&'MutationObserver'in window){const ob=new MutationObserver(()=>{if(tryBuild())ob.disconnect();});ob.observe(document.body,{childList:true,subtree:true});}
})();
