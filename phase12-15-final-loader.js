/* BLACKED V3 Final Release Loader — Phases 2–15, additive and ordered.
 * Insert exactly one script tag after part-c-enhancements.js in index.html. */
(() => {
  'use strict';
  if (window.BLACKED_V3_FINAL_RELEASE) return;
  const VERSION='12.15.0';
  const state={version:VERSION,stylesLoaded:[],scriptsLoaded:[],errors:[],assetPathsFixed:0,startedAt:new Date().toISOString()};
  const versioned=path=>`${path}?v=${VERSION}`;
  function showNotice(message){let box=document.getElementById('v15FinalLoaderNotice');if(!box){box=document.createElement('aside');box.id='v15FinalLoaderNotice';box.setAttribute('role','status');box.style.cssText='position:fixed;z-index:99999;left:12px;right:12px;bottom:12px;padding:12px 14px;border:1px solid #eacb8c;border-radius:12px;background:#181219;color:#fff5fa;font:14px/1.5 system-ui,sans-serif;box-shadow:0 10px 32px #0008;';document.body.append(box);}box.textContent=message;}
  function addStyle(path){return new Promise(resolve=>{const l=document.createElement('link');l.rel='stylesheet';l.href=versioned(path);l.dataset.v15ReleaseAsset=path;let done=false;const finish=ok=>{if(done)return;done=true;clearTimeout(timer);if(ok)state.stylesLoaded.push(path);else state.errors.push(`Stylesheet failed: ${path}`);resolve(ok);};const timer=setTimeout(()=>finish(false),10000);l.addEventListener('load',()=>finish(true),{once:true});l.addEventListener('error',()=>finish(false),{once:true});document.head.append(l);});}
  function addScript(path){return new Promise(resolve=>{const s=document.createElement('script');s.src=versioned(path);s.async=false;s.dataset.v15ReleaseAsset=path;let done=false;const finish=ok=>{if(done)return;done=true;clearTimeout(timer);if(ok)state.scriptsLoaded.push(path);else state.errors.push(`Script failed: ${path}`);resolve(ok);};const timer=setTimeout(()=>finish(false),15000);s.addEventListener('load',()=>finish(true),{once:true});s.addEventListener('error',()=>finish(false),{once:true});document.body.append(s);});}
  function normalisePath(value){if(typeof value!=='string')return value;const m=value.match(/^\.\/assets\/(?:[^/]+\/)+([^?#]+)([?#].*)?$/);return m?'./'+m[1]+(m[2]||''):value;}
  function fixRootAssets(){
    // Audit confirmed the repository bundles these images in its root, not under ./assets/.
    document.querySelectorAll('img').forEach(img=>{
      const raw=img.getAttribute('src')||'';const next=normalisePath(raw);
      if(next&&next!==raw){img.dataset.v15CorrectedFrom=raw;img.setAttribute('src',next);state.assetPathsFixed++;}
      for(const attr of ['data-v3-photo-asset','data-original-src','data-full-src']){const old=img.getAttribute(attr);if(old){const fixed=normalisePath(old);if(fixed!==old)img.setAttribute(attr,fixed);}}
      const parentButton=img.closest('[data-v3-open-photo]');if(parentButton){const old=parentButton.getAttribute('data-full-src');if(old){const fixed=normalisePath(old);if(fixed!==old)parentButton.setAttribute('data-full-src',fixed);}}
    });
    document.querySelectorAll('[data-full-src]').forEach(node=>{const old=node.getAttribute('data-full-src');const next=normalisePath(old);if(next&&next!==old)node.setAttribute('data-full-src',next);});
  }
  const styles=[
    './phase2-photo-collections.css','./phase3-design-system.css','./phase5-image-reliability.css','./phase6-boyfriend-studio.css',
    './phase7-8-enhancements.css','./phase9-after-dark.css','./phase10-wellness-education.css','./phase11-fit-studio.css',
    './phase12-wheels-hub.css','./phase13-couples-studio.css','./phase14-hardening.css','./phase15-whats-new.css'
  ];
  const scripts=[
    './phase2-photo-collections.js','./phase4-home-and-fantasy.js','./phase5-image-reliability.js','./phase6-boyfriend-studio.js',
    './phase7-8-enhancements.js','./phase9-after-dark.js','./phase10-wellness-education.js','./phase11-fit-studio.js',
    './phase12-wheels-hub.js','./phase13-couples-studio.js','./phase14-hardening.js','./phase15-whats-new.js'
  ];
  async function start(){
    if(state.started)return;state.started=true;window.BLACKED_V3_FINAL_RELEASE=state;
    for(const path of styles)await addStyle(path);
    for(const path of scripts){const ok=await addScript(path);if(ok)fixRootAssets();}
    // Repair image paths also when older modules insert their images after initial page setup.
    fixRootAssets();
    const observer=new MutationObserver(records=>{let shouldFix=false;for(const r of records){for(const n of r.addedNodes){if(n.nodeType===1&&(n.matches?.('img')||n.querySelector?.('img')))shouldFix=true;}}if(shouldFix)fixRootAssets();});
    observer.observe(document.body,{childList:true,subtree:true});
    state.completedAt=new Date().toISOString();state.status=state.errors.length?'degraded':'loaded';
    document.documentElement.dataset.blackedV3Final=state.status;
    if(state.errors.length)showNotice(`BLACKED V3 final loader: ${state.errors.length} file(s) failed. Open phase12-15-diagnostics.html to see the exact filenames.`);
    window.dispatchEvent(new CustomEvent('blacked:v3-final-release-ready',{detail:{...state}}));
  }
  state.getDiagnostics=()=>({...state,phase2Collections:window.BLACKED_V3_PHASE12?.getDiagnostics?.()||null,phase7:window.BLACKED_V3_PHASE78?.getDiagnostics?.()||null,phase9:window.BLACKED_V3_PHASE9?.getDiagnostics?.()||null,phase10:window.BLACKED_V3_PHASE10?.getDiagnostics?.()||null,phase11:window.BLACKED_V3_PHASE11?.getDiagnostics?.()||null,phase12:window.BLACKED_V3_PHASE12_WHEELS?.getDiagnostics?.()||null,phase13:window.BLACKED_V3_PHASE13?.getDiagnostics?.()||null,phase14:window.BLACKED_V3_PHASE14?.getDiagnostics?.()||null,phase15:window.BLACKED_V3_PHASE15?.getDiagnostics?.()||null});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
