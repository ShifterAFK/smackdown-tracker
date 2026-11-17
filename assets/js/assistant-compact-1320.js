// Mobile presentation; existing search, faction filters and pick handlers are retained.
(function(){
'use strict';
if(window.TrackerAssistantCompact1320)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog)return;
const shell=dialog.querySelector('.md130shell'),content=dialog.querySelector('.md130content'),tips=dialog.querySelector('.md130recommendations'),preview=dialog.querySelector('.md130preview'),order=dialog.querySelector('.md130order'),gate=dialog.querySelector('.md132sidegate'),controls=dialog.querySelector('.md130controls'),pool=dialog.querySelector('.md130pool');
if(!shell||!content||!tips||!preview||!controls||!pool)return;
const homes=[tips,preview,order,controls].filter(Boolean).map(node=>{const marker=document.createComment('mobile presentation home');node.before(marker);return {node,marker};});
const search=controls.querySelector('input'),filter=controls.querySelector('select'),media=matchMedia('(max-width:1099px)');
const picking=document.createElement('div');picking.className='mc28-picking';picking.setAttribute('role','status');
const nav=document.createElement('nav');nav.className='mc28-views';nav.setAttribute('aria-label','Hero selection view');
let view='suggestions',frame=0,wasOpen=false,firstHero=null,notice=null,originalNotice=null;
const tabs={};
for(const [key,text] of [['suggestions','Suggestions'],['heroes','All heroes']]){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=()=>{view=key;content.scrollTop=0;arrange();};tabs[key]=b;nav.append(b);}
function setHidden(node,value){if(node&&node.hidden!==value)node.hidden=value;}
function active(){return media.matches&&dialog.dataset.mode==='assistant';}
function groupPool(){const heroes=Array.from(pool.querySelectorAll('.md130hero'));if(heroes[0]===firstHero)return;firstHero=heroes[0];pool.querySelectorAll('.mc28-faction').forEach(n=>n.remove());let faction='';for(const hero of heroes){const next=hero.dataset.faction||'';if(next!==faction){faction=next;const heading=document.createElement('h3');heading.className='mc28-faction';heading.textContent=faction;hero.before(heading);}}}
function collapseNotice(){const box=document.querySelector('#draftAssist .da-experimental');if(!box)return;if(notice===box)return;notice=box;originalNotice=Array.from(box.childNodes);const details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p');summary.textContent='Experimental';text.textContent=box.querySelector('span')?.textContent||'Suggestions are experimental.';details.append(summary,text);box.replaceChildren(details);}
function restore(){dialog.classList.remove('mc28');picking.remove();nav.remove();for(const {node,marker} of homes)if(marker.parentNode&&marker.nextSibling!==node)marker.after(node);setHidden(pool,false);if(notice&&originalNotice){notice.replaceChildren(...originalNotice);notice=null;originalNotice=null;}pool.querySelectorAll('.mc28-faction').forEach(n=>n.remove());firstHero=null;}
function arrange(){const isOpen=dialog.open;if(!active()){if(dialog.classList.contains('mc28'))restore();wasOpen=isOpen;return;}dialog.classList.add('mc28');
 const waiting=Boolean(gate&&!gate.hidden);
 if(preview.parentNode!==shell||preview.nextElementSibling!==picking)shell.insertBefore(preview,content);
 if(picking.parentNode!==shell||picking.previousElementSibling!==preview)preview.after(picking);
 if(controls.parentNode!==shell||controls.previousElementSibling!==picking)picking.after(controls);
 if(nav.parentNode!==shell||nav.previousElementSibling!==controls)controls.after(nav);
 if(tips.parentNode!==content||content.firstElementChild!==tips)content.prepend(tips);
 if(order)order.hidden=true;
 setHidden(picking,waiting);setHidden(controls,waiting);setHidden(nav,waiting);
 const slot=document.getElementById('activeLabel')?.value||'';const own=dialog.dataset.suggestionSide||'';const caption='Picking: '+slot+(own?' · Your team: '+own:'');if(picking.textContent!==caption)picking.textContent=caption;
 setHidden(tips,waiting||view!=='suggestions');setHidden(pool,view!=='heroes');
 for(const [key,b] of Object.entries(tabs)){const pressed=String(view===key);if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);}
 groupPool();collapseNotice();
 if(isOpen&&!wasOpen){content.scrollTop=0;dialog.scrollTop=0;shell.scrollTop=0;}wasOpen=isOpen;
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;arrange();});}
search?.addEventListener('input',()=>{if(active()){view='heroes';content.scrollTop=0;schedule();}});filter?.addEventListener('change',()=>{if(active()){view='heroes';content.scrollTop=0;schedule();}});
new MutationObserver(schedule).observe(dialog,{childList:true,subtree:true});new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-mode','data-side','data-started','data-suggestion-side']});if(gate)new MutationObserver(schedule).observe(gate,{attributes:true,attributeFilter:['hidden']});
media.addEventListener('change',schedule);window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);window.addEventListener('tracker:draft-reset',()=>{view='suggestions';schedule();});
function viewport(){dialog.style.setProperty('--mc28-height',(window.visualViewport?.height||window.innerHeight)+'px');}viewport();window.visualViewport?.addEventListener('resize',viewport);window.addEventListener('resize',viewport);
const css=document.createElement('style');css.id='mobile-compact-1428';css.textContent=`
html body #mobileDraft130.mc28[data-mode="assistant"]{position:fixed!important;inset:0!important;margin:0!important;width:100%!important;max-width:100%!important;height:var(--mc28-height,100dvh)!important;max-height:var(--mc28-height,100dvh)!important;padding:0!important;border-radius:0!important;box-sizing:border-box!important;overflow:hidden!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130shell{display:flex!important;flex-direction:column!important;height:100%!important;max-height:100%!important;min-height:0!important;padding:4px 6px calc(4px + env(safe-area-inset-bottom))!important;gap:3px!important;overflow:hidden!important;box-sizing:border-box!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130head{display:flex!important;align-items:center!important;gap:6px!important;flex:0 0 auto!important;min-height:32px!important;height:auto!important;padding:0!important;margin:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130head h2{font-size:13px!important;line-height:18px!important;margin:0!important;flex:1!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md135-solise{position:static!important;flex:0 0 26px!important;width:26px!important;height:26px!important;min-width:26px!important;max-height:26px!important;margin:0!important;object-fit:cover!important;border-radius:50%!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130head button{width:auto!important;min-width:44px!important;min-height:32px!important;height:32px!important;padding:3px 8px!important;font-size:12px!important;margin:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130preview{flex:0 0 auto!important;gap:4px!important;margin:0!important;padding:2px!important;min-height:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130slot{min-height:56px!important;height:auto!important;padding:3px 1px!important;gap:2px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130slot .md130portrait{width:27px!important;height:27px!important;min-width:27px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130slot .md130portrait img{width:27px!important;height:27px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130slotlabel,html body #mobileDraft130.mc28[data-mode="assistant"] .md130name{font-size:9px!important;line-height:11px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130order{display:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .mc28-picking{flex:0 0 auto;font-size:11px;line-height:16px;color:#e5d09d;padding:0 2px}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls{display:flex!important;flex:0 0 auto!important;position:static!important;width:100%!important;gap:5px!important;padding:0!important;margin:0!important;box-sizing:border-box!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls input{flex:1 1 0!important;width:0!important;min-width:0!important;height:36px!important;min-height:36px!important;padding:5px 7px!important;font-size:16px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130controls select{flex:0 1 130px!important;width:130px!important;min-width:0!important;min-height:36px!important;padding:4px!important;font-size:12px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .mc28-views{display:flex;gap:5px;flex:0 0 auto;padding:0;margin:0}
html body #mobileDraft130.mc28[data-mode="assistant"] .mc28-views button{flex:1;min-height:32px;padding:3px 8px;font-size:12px}
html body #mobileDraft130.mc28[data-mode="assistant"] .mc28-views button[aria-pressed="true"]{background:#51462e;border-color:#c1a363;color:#f4e5bf}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130content{flex:1 1 0!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;padding:0!important;margin:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130recommendations,html body #mobileDraft130.mc28[data-mode="assistant"] .md130assist{padding:0!important;margin:0!important;border:0!important;background:none!important;max-height:none!important;overflow:visible!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130recommendations>summary,html body #mobileDraft130.mc28[data-mode="assistant"] .md130assist::before,html body #mobileDraft130.mc28[data-mode="assistant"] .md130assist::after{display:none!important;content:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist{padding:3px!important;margin:0!important;border:0!important;min-width:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist #daScope,html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-side>h3,html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-toolbar{display:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-experimental{display:block!important;margin:0 0 3px!important;padding:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-experimental summary{display:inline-block;cursor:pointer;border:1px solid #ac8b4f;border-radius:4px;padding:2px 6px;font-size:10px;line-height:16px;color:#ead39b}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-experimental p{font-size:11px;line-height:1.4;margin:4px 0}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist #daOverallS{margin:0 0 4px!important;padding:4px!important;min-height:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-s-row{display:flex!important;flex-wrap:wrap!important;gap:4px!important;width:100%!important;max-height:none!important;overflow:visible!important;padding:0!important;margin:2px 0 0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-s-hero{flex:0 0 auto!important;margin:0!important;padding:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-s-hero img{width:32px!important;height:32px!important;min-width:32px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-s-hero span{display:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-side{padding:4px!important;margin:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-section-title{margin:3px 0!important;font-size:11px!important;line-height:15px!important;padding:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-grid{gap:4px!important;padding:0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-card{flex:0 0 52px!important;width:52px!important;min-width:52px!important;padding-right:12px!important;box-sizing:border-box!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-card>.da-candidate{width:40px!important;max-width:40px!important;min-height:40px!important;padding:2px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-candidate img{width:34px!important;height:34px!important;min-width:34px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-card>.da-hide{right:0!important;top:0!important;width:18px!important;height:22px!important;min-width:18px!important;min-height:22px!important;padding:0!important;font-size:12px!important;line-height:20px!important}
html body #mobileDraft130.mc28[data-mode="assistant"] #draftAssist .da-expand{font-size:11px!important;line-height:16px!important;min-height:28px!important;height:28px!important;padding:3px 8px!important;margin:4px 0!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130pool{max-height:none!important;height:auto!important;overflow:visible!important;align-content:start!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130pool .mc28-faction{grid-column:1/-1!important;width:100%!important;font-size:11px!important;line-height:17px!important;margin:7px 0 2px!important;color:#d9c394!important}
html body #mobileDraft130.mc28[data-mode="assistant"] .md130message:empty{display:none!important}
html body #mobileDraft130.mc28[data-mode="assistant"] [hidden]{display:none!important}
`;document.head.append(css);
window.TrackerAssistantCompact1320=Object.freeze({version:'1.4.28'});arrange();
})();
