// Mobile pick integration. The standalone tier-list page remains informational.
(function(){
'use strict';
function boot(){
 if(window.TrackerMobilePick1429)return;
 const dialog=document.getElementById('mobileDraft130'),root=document.getElementById('draftAssist');if(!dialog||!root||typeof choose!=='function')return;
 const mobile=()=>matchMedia('(max-width:1099px)').matches&&dialog.open&&dialog.dataset.mode==='assistant';
 const sequence=[['BLUE',0],['RED',0],['RED',1],['BLUE',1],['BLUE',2],['RED',2]];
 const originalChoose=choose;
 choose=function(id){
  if(!mobile())return originalChoose.apply(this,arguments);
  const before=JSON.stringify(lineup),side=active.side,index=active.index,result=originalChoose.apply(this,arguments);
  if(before===JSON.stringify(lineup)||lineup[side]?.[index]!==id)return result;
  const next=sequence.find(([s,i])=>!lineup[s][i]);if(next)active={side:next[0],index:next[1]};
  const search=dialog.querySelector('.md130controls input'),filter=dialog.querySelector('.md130controls select');
  if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));search.blur();}
  if(filter){filter.value='';filter.dispatchEvent(new Event('change',{bubbles:true}));filter.blur();}
  renderSlots();renderHeroes();
  if(!next)window.MobileDraft130?.close();
  return result;
 };
 function heroFor(card){const src=card.querySelector('img')?.getAttribute('src')||'',name=card.querySelector('span')?.textContent?.trim()||'';return config.heroes.find(h=>h.portrait_url===src||h.name===name||card.title.startsWith(h.name+' —'));}
 function resetCatalog(){const search=document.getElementById('search');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));search.blur();}const all=[...document.querySelectorAll('#factionFilters .filter')].find(b=>b.textContent.trim()==='All');if(all)all.click();}
 function decorate(){
  const strip=document.getElementById('daOverallS');if(!strip)return;
  for(const old of strip.querySelectorAll('span.da-s-hero')){const b=document.createElement('button');b.type='button';b.className=old.className;b.title=old.title;b.append(...Array.from(old.childNodes));old.replaceWith(b);}
  const used=new Set([...lineup.BLUE,...lineup.RED].filter(Boolean));
  for(const b of strip.querySelectorAll('button.da-s-hero')){const h=heroFor(b);const unavailable=!h||!h.is_allowed||isBannedHero(h)||used.has(h.id)||onlineBusy;b.disabled=unavailable;b.classList.toggle('mc29-used',Boolean(h&&used.has(h.id)));const side=(dialog.dataset.suggestionSide==='RED')?'RED':'BLUE';const index=lineup[side].findIndex(x=>!x);const label=h?(index<0?'No empty '+side+' slot':'Pick '+h.name+' for '+side+' slot '+(index+1)+(used.has(h.id)?' — already drafted':'')):'Unavailable hero';if(b.getAttribute('aria-label')!==label)b.setAttribute('aria-label',label);}
 }
 root.addEventListener('click',event=>{
  const card=event.target.closest('#daOverallS .da-s-hero');if(!card)return;event.preventDefault();event.stopImmediatePropagation();
  if(onlineBusy||Date.now()<blockClickUntil||card.disabled)return;const h=heroFor(card);if(!h||!h.is_allowed||isBannedHero(h)||[...lineup.BLUE,...lineup.RED].includes(h.id))return;
  const side=(dialog.dataset.suggestionSide==='RED')?'RED':'BLUE';const index=lineup[side].findIndex(x=>!x);
  if(index<0){const message=dialog.querySelector('.md130message');if(message)message.textContent='No empty '+side+' slot.';return;}
  active={side,index};choose(h.id);decorate();resetCatalog();
 },true);
 let frame=0;function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;decorate();});}
 const strip=document.getElementById('daOverallS');if(strip)new MutationObserver(schedule).observe(strip,{childList:true,subtree:true});new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-mode','data-side','data-suggestion-side']});window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);
 const css=document.createElement('style');css.id='mobile-pick-1429';css.textContent=`
html body #draftAssist.da-clean #daOverallS button.da-s-hero{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 40px!important;width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;padding:2px!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;border-radius:50%!important;cursor:pointer!important}
html body #draftAssist.da-clean #daOverallS button.da-s-hero img{width:32px!important;height:32px!important;min-width:32px!important;pointer-events:none!important}
html body #draftAssist.da-clean #daOverallS button.da-s-hero.mc29-used{opacity:.35!important;filter:grayscale(1)!important;cursor:default!important}
html body #draftAssist.da-clean #daOverallS button.da-s-hero:focus-visible{outline:2px solid #e8cf8b!important;outline-offset:1px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist.da-clean .da-experimental{display:block!important;padding:0!important;margin:0 0 4px!important;min-height:0!important;width:auto!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist.da-clean .da-experimental details{display:block!important;width:auto!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;background:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist.da-clean .da-experimental details>summary{display:inline-flex!important;align-items:center!important;width:auto!important;max-width:100%!important;height:28px!important;min-height:28px!important;margin:0!important;padding:0 6px!important;box-sizing:border-box!important;font-size:10px!important;line-height:16px!important;border:0!important;background:none!important;box-shadow:none!important;cursor:pointer!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist.da-clean .da-experimental summary::before,html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist.da-clean .da-experimental summary::after{display:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls{gap:4px!important;margin:0!important;padding:0!important;min-height:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls input,html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls select{height:40px!important;min-height:40px!important;max-height:40px!important;box-sizing:border-box!important;line-height:20px!important;padding:3px 7px!important;margin:0!important}
`;document.head.append(css);
 window.TrackerMobilePick1429=Object.freeze({version:'1.4.30'});schedule();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();