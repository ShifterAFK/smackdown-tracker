(function(){
'use strict';
if(window.TrackerAssistantCompact1320)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog)return;
const content=dialog.querySelector('.md130content'),tips=dialog.querySelector('.md130recommendations'),preview=dialog.querySelector('.md130preview'),order=dialog.querySelector('.md130order'),gate=dialog.querySelector('.md132sidegate');
if(!content||!tips||!preview)return;
const homes=[tips,preview,order].filter(Boolean).map(node=>{const marker=document.createComment('assistant original position 1.3.20');node.before(marker);return {node,marker};});
let frame=0,options=null,actionHome=null,detailHome=null,root=null;
function mobileAssistant(){return matchMedia('(max-width:1099px)').matches&&dialog.dataset.mode==='assistant';}
function compactLists(){
 if(!root)return;
 for(const list of root.querySelectorAll('.da-candidates')){
  const cards=Array.from(list.querySelectorAll(':scope > .da-card'));
  const expanded=list.dataset.compactExpanded==='true';
  cards.forEach((card,index)=>card.classList.toggle('ui1320extra',!expanded&&index>=6));
  // Locate the existing per-side More button, never the candidate or hide buttons.
  const side=list.closest('.da-side')||list.parentElement;
  const button=Array.from(side?.querySelectorAll('.da-actions button')||[]).find(b=>b.id!=='daRestore'&&b.id!=='daRefresh'&&/^More\b/i.test(b.textContent.trim()));
  if(button&&cards.length>6&&!expanded)button.hidden=false;
 }
}
function restoreOptions(){
 if(actionHome?.marker.parentNode)actionHome.marker.replaceWith(actionHome.node);
 if(detailHome?.marker.parentNode)detailHome.marker.replaceWith(detailHome.node);
 actionHome=null;detailHome=null;options?.remove();options=null;
 if(root)for(const list of root.querySelectorAll('.da-candidates'))for(const card of list.querySelectorAll('.ui1320extra'))card.classList.remove('ui1320extra');
}
function saveHome(node){const marker=document.createComment('assistant options original position');node.before(marker);return {node,marker};}
function arrange(){
 if(mobileAssistant()){
  // These sections are outside the scrolling hero pool, so picks stay visible.
  const nodes=[tips,preview,order].filter(Boolean);let anchor=content;
  for(let i=nodes.length-1;i>=0;i--){const node=nodes[i];if(node.parentNode!==content.parentNode||node.nextElementSibling!==anchor)anchor.before(node);anchor=node;}
  tips.hidden=Boolean(gate&&!gate.hidden);
  root=document.getElementById('draftAssist');
  if(root&&tips.contains(root)){
   if(!options){
    options=document.createElement('details');options.className='ui1320options';
    const summary=document.createElement('summary');summary.textContent='Options';options.append(summary);
    const restore=root.querySelector('#daRestore'),actions=restore?.closest('.da-actions');
    if(actions){actionHome=saveHome(actions);options.append(actions);}
    const details=root.querySelector('.da-details')||dialog.querySelector('.md130assist .da-details');
    if(details){detailHome=saveHome(details);options.append(details);}
    (root.querySelector('#daBody')||root).append(options);
   }
   compactLists();
  }
 }else{
  restoreOptions();
  for(const {node,marker} of homes)if(marker.parentNode&&marker.nextSibling!==node)marker.after(node);
  tips.hidden=true;
 }
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;arrange();});}
dialog.addEventListener('click',event=>{
 if(!mobileAssistant())return;
 const button=event.target.closest?.('.da-side .da-actions button');
 if(!button||!/^More\b/i.test(button.textContent.trim()))return;
 const list=button.closest('.da-side')?.querySelector('.da-candidates');
 if(list&&list.dataset.compactExpanded!=='true'&&list.querySelectorAll(':scope > .da-card').length>6){
  event.preventDefault();event.stopImmediatePropagation();list.dataset.compactExpanded='true';
  compactLists();
  button.hidden=list.querySelectorAll(':scope > .da-card').length<8;
 }
},true);
new MutationObserver(schedule).observe(dialog,{childList:true,subtree:true});
new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-mode','data-started','data-suggestion-side']});
if(gate)new MutationObserver(schedule).observe(gate,{attributes:true,attributeFilter:['hidden']});
matchMedia('(max-width:1099px)').addEventListener('change',schedule);
window.addEventListener('tracker:draft-changed',schedule);
window.addEventListener('tracker:catalog-changed',schedule);
window.addEventListener('tracker:draft-reset',()=>{for(const list of dialog.querySelectorAll('.da-candidates'))delete list.dataset.compactExpanded;schedule();});
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved){for(const list of dialog.querySelectorAll('.da-candidates'))delete list.dataset.compactExpanded;schedule();}});
window.TrackerAssistantCompact1320=Object.freeze({version:'1.3.20'});arrange();
})();
