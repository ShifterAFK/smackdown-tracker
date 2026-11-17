// Keep the draft outside the scrolling suggestions and hero catalog.
(function(){
'use strict';
if(window.TrackerAssistantCompact1320)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog)return;
const content=dialog.querySelector('.md130content'),tips=dialog.querySelector('.md130recommendations'),preview=dialog.querySelector('.md130preview'),order=dialog.querySelector('.md130order'),gate=dialog.querySelector('.md132sidegate');if(!content||!tips||!preview)return;
const homes=[tips,preview,order].filter(Boolean).map(node=>{const marker=document.createComment('assistant original position');node.before(marker);return {node,marker};});
let frame=0;const media=matchMedia('(max-width:1099px)');
function arrange(){
 if(media.matches&&dialog.dataset.mode==='assistant'){
  if(preview.parentNode!==content.parentNode||preview.nextElementSibling!==(order||content))content.before(preview);
  if(order&&(order.parentNode!==content.parentNode||order.nextElementSibling!==content))content.before(order);
  if(tips.parentNode!==content||content.firstElementChild!==tips)content.prepend(tips);
  const hide=Boolean(gate&&!gate.hidden);if(tips.hidden!==hide)tips.hidden=hide;
 }else{
  for(const {node,marker} of homes)if(marker.parentNode&&marker.nextSibling!==node)marker.after(node);
 }
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;arrange();});}
new MutationObserver(schedule).observe(dialog,{childList:true,subtree:true});new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-mode','data-started','data-suggestion-side']});if(gate)new MutationObserver(schedule).observe(gate,{attributes:true,attributeFilter:['hidden']});media.addEventListener('change',schedule);window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);
window.TrackerAssistantCompact1320=Object.freeze({version:'1.4.27'});arrange();
})();
