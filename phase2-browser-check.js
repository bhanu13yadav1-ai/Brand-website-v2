document.addEventListener('DOMContentLoaded', () => {
  const results=[]; const add=(name,pass,detail='')=>results.push({name,pass,detail});
  try {
    const d=window.BLACKED_V3_PHASE12?.getDiagnostics?.();
    add('Addon initialized',!!d,d?.version||'diagnostics unavailable');
    add('Noor gallery has four cards',d?.noorCards===4,d?.noorCards);
    add('Innerwear gallery has two cards',d?.innerwearNewCards===2,d?.innerwearNewCards);
    add('Grace preview inserted',d?.gracePreview===true,d?.gracePreview);
    add('Additional group campaign gallery inserted',d?.groupGallery===true,d?.groupGallery);
    add('Group photo remains inside hidden gate',d?.gateContainsGroupPhoto===true,`gate hidden=${document.querySelector('#v23ThreesomeProtected')?.hidden}`);
    const search=document.querySelector('#v3NoorEditGallerySearch');
    if(search){search.value='Noor Ka Nasha';search.dispatchEvent(new Event('input',{bubbles:true}));add('Noor search filters to one card',[...document.querySelectorAll('#v3NoorEditGalleryGrid .v3-photo-card')].filter(x=>!x.hidden).length===1,[...document.querySelectorAll('#v3NoorEditGalleryGrid .v3-photo-card')].filter(x=>!x.hidden).length)} else add('Noor search exists',false);
    const card=document.querySelector('#v3NoorEditGalleryGrid button[data-v3-open-photo]');
    if(card){card.click();add('Large preview opens',document.querySelector('#v3PhotoPreview')?.hidden===false);document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));add('Escape closes large preview',document.querySelector('#v3PhotoPreview')?.hidden===true)} else {add('Preview trigger exists',false)}
    add('Existing Coming Soon card preserved',document.querySelector('.coming-card.grace .coming-pill')?.textContent.includes('COMING SOON')===true);
    const out=document.querySelector('#phase2CheckResults');out.replaceChildren();
    const h=document.createElement('h2');h.textContent=`${results.filter(x=>x.pass).length}/${results.length} checks passed (fixture)`;out.append(h);
    const ul=document.createElement('ul');results.forEach(r=>{const li=document.createElement('li');li.className=r.pass?'ok':'fail';li.textContent=`${r.pass?'PASS':'FAIL'} · ${r.name}${r.detail!==''?' — '+String(r.detail):''}`;ul.append(li)});out.append(ul);
    document.body.dataset.phase2Diagnostics=results.every(x=>x.pass)?'pass':'fail';
  } catch(e) {document.querySelector('#phase2CheckResults').textContent='FAIL · '+String(e);document.body.dataset.phase2Diagnostics='fail';}
});