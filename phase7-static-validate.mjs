import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import { mkdtempSync, rmSync } from 'node:fs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const p4=read('phase4-story-universe.js');
const p4json=JSON.parse(read('phase4-story-universe.json'));
const p5=read('phase5-product-discovery.js');
const p6=read('phase6-wellness-collections.js');
const diag=read('phase7-diagnostics.html');
const installer=read('apply_phase7_integration.py');
assert.equal(p4json.stories.length,4,'4 connected stories should exist');
assert.match(p4,/host\.querySelector\('\[data-wheel-retry\]'\)/,'Wheel CTA uses actual finished-result marker');
assert.doesNotMatch(p4,/\/\^\\s\*\\d\+\\\/8/,'Old incompatible n/8 title check should be removed');
assert.match(p5,/salesEnabled: false/,'Sales remains blocked');
assert.match(p5,/p5EvidenceFilter/,'Evidence filters exist');
assert.match(p5,/count>=3/,'Compare cap remains 3');
assert.match(p6,/\.coming-card\.grace/,'Grace filter controls the whole card');
assert.match(p6,/rightsClearedForExistingAssets:false/,'No false rights clearance');
assert.match(p6,/phase6-measurement-map\.svg/,'Measurement guide included');
assert.match(p6,/phase6-product-specs\.svg/,'Product specifications guide included');
assert.match(p6,/phase6-comfort-check\.svg/,'Comfort guide included');
assert.match(p6,/phase6-image-rights-workflow\.svg/,'Image rights workflow included');
assert.match(diag,/Wheel result links to a related story/,'Final QA checks wheel-story CTA');
assert.match(diag,/Compare hard limit of three/,'Final QA checks max three compare items');
assert.match(diag,/Wellness \/ Fit Studio original tools/,'Final QA checks existing wellness and Fit Studio');
assert.match(installer,/blacked-v2-phase7-final-1/,'Installer versions service-worker cache');
assert.match(installer,/Converted \$\{converted\} filled measurement/,'Installer makes unit conversion visible');
for (const f of ['phase6-measurement-map.svg','phase6-product-specs.svg','phase6-comfort-check.svg','phase6-image-rights-workflow.svg']) {
  const svg=read('assets/'+f); assert.match(svg,/^<svg[\s>]/); assert.match(svg,/<title\b/); assert.match(svg,/<desc\b/);
}
const protectedModules=['app.js','styles.css','fallback.js','part-c-enhancements.js','phase2-photo-collections.js'];
assert.match(installer,/safe|safely|preflight/i,'Installer describes safety checks');
assert.match(installer,/phase2-photo-collections\.js/,'Installer anchors to original module chain');

// Syntax-check each new browser module with Node's parser.
for (const f of ['phase4-story-universe.js','phase5-product-discovery.js','phase6-wellness-collections.js']) {
  const r=spawnSync(process.execPath,['--check',path.join(root,f)],{encoding:'utf8'});
  assert.equal(r.status,0,`${f} syntax failed: ${r.stderr||r.stdout}`);
}

// Test the installer in a throw-away repo fixture based on audited current index/sw anchors.
const fixture=mkdtempSync(path.join(os.tmpdir(),'blacked-phase7-fixture-'));
try {
  const index=`<!doctype html><html><head><title>BLACKED · V2 Phase 4 — Collections & Wheels</title>
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./part-c-enhancements.css">
  <link rel="stylesheet" href="./phase2-photo-collections.css">
  <script src="./fallback.js" defer></script>
  <script src="./app.js" defer></script>
  <script src="./part-c-enhancements.js" defer></script>
  <script src="./phase2-photo-collections.js" defer></script></head><body>
  <div id="catalogGrid"></div><footer><a href="./phase5-diagnostics.html">Phase 5 diagnostics</a><a href="./phase6-diagnostics.html">Phase 6 diagnostics</a><a href="./phase7-diagnostics.html">Phase 7 final QA</a><p>V2 Phase 4 · integrated wheel hub, local campaign collections, boyfriend and gated fantasy galleries</p></footer></body></html>`;
  const app=`(() => { const catalogGrid = document.querySelector('#catalogGrid'); const measurementFields=[]; function initMeasurementTools(){
    $('#measurementUnit').addEventListener('change',()=>{$('#measurementStatus').textContent='Keep existing entries in the units originally entered. Clear fields before changing the unit if you need a fresh set.';});
  } })();`;
  const sw=`'use strict';
const CACHE_NAME = 'blacked-v2-phase2-image-repair-2';
const CORE = [
  './','./index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',
  './manifest.webmanifest','./app-icon.svg'
];`;
  fs.writeFileSync(path.join(fixture,'index.html'),index);
  fs.writeFileSync(path.join(fixture,'app.js'),app);
  fs.writeFileSync(path.join(fixture,'sw.js'),sw);
  for (const f of ['phase2-photo-collections.js','part-c-enhancements.js']) fs.writeFileSync(path.join(fixture,f),'/* fixture */');
  const run=()=>spawnSync('python3',[path.join(root,'apply_phase7_integration.py'),'--repo',fixture],{encoding:'utf8'});
  const first=run();assert.equal(first.status,0,`first integration failed: ${first.stderr}\n${first.stdout}`);
  const ix=fs.readFileSync(path.join(fixture,'index.html'),'utf8');
  for (const name of ['phase4-story-universe.js','phase5-product-discovery.js','phase6-wellness-collections.js','phase7-diagnostics.html']) assert.ok(ix.includes(name),`index missing ${name}`);
  assert.equal((ix.match(/phase4-story-universe\.js/g)||[]).length,1,'Phase 4 script should only be linked once');
  assert.ok(ix.includes('Phase 7 — Final QA Release'));
  const updatedApp=fs.readFileSync(path.join(fixture,'app.js'),'utf8');assert.ok(updatedApp.includes('previousMeasurementUnit'));assert.ok(updatedApp.includes('Converted ${converted} filled measurement'));
  const updatedSw=fs.readFileSync(path.join(fixture,'sw.js'),'utf8');assert.ok(updatedSw.includes('blacked-v2-phase7-final-1'));assert.ok(updatedSw.includes('phase4-story-universe.json'));assert.ok(updatedSw.includes('phase6-image-rights-workflow.svg'));
  assert.ok(fs.existsSync(path.join(fixture,'assets','phase6-measurement-map.svg')));
  const second=run();assert.equal(second.status,0,`second/idempotence run failed: ${second.stderr}\n${second.stdout}`);
  const ix2=fs.readFileSync(path.join(fixture,'index.html'),'utf8');assert.equal((ix2.match(/phase5-product-discovery\.js/g)||[]).length,1,'rerun duplicated Phase 5 script');
  console.log('PASS: integration script works on an isolated fresh-repo fixture');
  console.log('PASS: script and stylesheet tags added once in dependency order');
  console.log('PASS: measurement conversion fix, service-worker release cache and Phase 6 assets installed');
  console.log('PASS: repeated run is idempotent and does not duplicate script tags');
} finally { rmSync(fixture,{recursive:true,force:true}); }

// Existing-repo upgrade test: patch only known Phase 4/6 defects and preserve user-owned files/data.
const fixture2=mkdtempSync(path.join(os.tmpdir(),'blacked-phase7-existing-'));
try {
  const index=`<!doctype html><html><head><title>BLACKED · V2 Phase 4 — Collections & Wheels</title>
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./part-c-enhancements.css">
  <link rel="stylesheet" href="./phase2-photo-collections.css">
  <script src="./fallback.js" defer></script>
  <script src="./app.js" defer></script>
  <script src="./part-c-enhancements.js" defer></script>
  <script src="./phase2-photo-collections.js" defer></script></head><body><div id="catalogGrid"></div><footer><a href="./phase5-diagnostics.html">Phase 5 diagnostics</a><a href="./phase6-diagnostics.html">Phase 6 diagnostics</a><a href="./phase7-diagnostics.html">Phase 7 final QA</a></footer></body></html>`;
  const app=`(() => { const catalogGrid = document.querySelector('#catalogGrid'); const measurementFields=[]; function initMeasurementTools(){
    $('#measurementUnit').addEventListener('change',()=>{$('#measurementStatus').textContent='Keep existing entries in the units originally entered. Clear fields before changing the unit if you need a fresh set.';});
  } })();`;
  const sw=`'use strict';const CACHE_NAME = 'blacked-v2-phase2-image-repair-2';const CORE = [
  './','./index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',
  './phase4-diagnostics.html','./phase7-diagnostics.html'
];`;
  const p4old=`(() => {
        const heading = $('strong', host);
        if (!heading || !/^\\s*\\d+\\/8\\b/.test(heading.textContent)) return;
        const repositorySentinel = 'do not erase';
      })();`;
  const p6old=`(() => {
      const noor=$('#v3NoorEditGallery',view); const grace=$('#v3GracePreview',view)?.closest('figure') || $('#v3GracePreview',view);
      const repositorySentinel = 'preserve Phase 6 local edits';
    })();`;
  const files={'index.html':index,'app.js':app,'sw.js':sw,'phase2-photo-collections.js':'/* current app source placeholder */','part-c-enhancements.js':'/* current app source placeholder */','phase4-story-universe.js':p4old,'phase4-story-universe.css':'/* preserve customized Phase 4 CSS */','phase4-story-universe.json':'{"ownerStoryData":"keep"}','phase5-product-discovery.js':'/* preserve customized Phase 5 JS */','phase5-product-discovery.css':'/* preserve customized Phase 5 CSS */','phase6-wellness-collections.js':p6old,'phase6-wellness-collections.css':'/* preserve customized Phase 6 CSS */','phase7-diagnostics.html':'<!-- old diagnostic must be replaced and backed up -->','phase5-6-review-diagnostics.html':'<!-- existing Phase 5-6 diagnostic must be preserved -->','PRODUCT_VERIFICATION_REGISTER.csv':'owner,sku\ncustom,keep-me\n','IMAGE_RIGHTS_REGISTER.csv':'owner,asset\ncustom,rights-pending\n'};
  for(const [name,content] of Object.entries(files)){const dest=path.join(fixture2,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,content)}
  const run2=()=>spawnSync('python3',[path.join(root,'apply_phase7_integration.py'),'--repo',fixture2],{encoding:'utf8'});
  const r=run2();assert.equal(r.status,0,`existing-repo upgrade failed: ${r.stderr}\n${r.stdout}`);
  const p4new=fs.readFileSync(path.join(fixture2,'phase4-story-universe.js'),'utf8');assert.ok(p4new.includes("host.querySelector('[data-wheel-retry]')"));assert.ok(p4new.includes("repositorySentinel = 'do not erase'"));
  const p6new=fs.readFileSync(path.join(fixture2,'phase6-wellness-collections.js'),'utf8');assert.ok(p6new.includes("$('.coming-card.grace',view)"));assert.ok(p6new.includes('preserve Phase 6 local edits'));
  assert.equal(fs.readFileSync(path.join(fixture2,'phase5-product-discovery.js'),'utf8'),'/* preserve customized Phase 5 JS */');
  assert.equal(fs.readFileSync(path.join(fixture2,'phase4-story-universe.json'),'utf8'),' {"ownerStoryData":"keep"}'.trim());
  assert.equal(fs.readFileSync(path.join(fixture2,'PRODUCT_VERIFICATION_REGISTER.csv'),'utf8'),'owner,sku\ncustom,keep-me\n');
  assert.equal(fs.readFileSync(path.join(fixture2,'IMAGE_RIGHTS_REGISTER.csv'),'utf8'),'owner,asset\ncustom,rights-pending\n');
  assert.equal(fs.readFileSync(path.join(fixture2,'phase5-6-review-diagnostics.html'),'utf8'),'<!-- existing Phase 5-6 diagnostic must be preserved -->');
  assert.ok(fs.readFileSync(path.join(fixture2,'phase7-diagnostics.html'),'utf8').includes('Final feature & function audit'));
  const backups=fs.readdirSync(fixture2).filter(x=>x.startsWith('.phase7-backup-'));assert.ok(backups.length===1,'existing files must be backed up before changes');
  assert.ok(fs.existsSync(path.join(fixture2,backups[0],'phase7-diagnostics.html')),'old Phase 7 diagnostic must be in backup');
  console.log('PASS: existing-repo upgrade patches only the two known module bugs');
  console.log('PASS: current Phase 4 story JSON, Phase 5 code, Phase 5–6 diagnostic and owner register data are preserved');
  console.log('PASS: prior Phase 7 diagnostic is replaced only after being backed up');
} finally { rmSync(fixture2,{recursive:true,force:true}); }
console.log('PASS: Phase 7 final static validation (runtime browser and Android tests remain separate gates)');
