(function(){
'use strict';
if(window.TrackerUIAssets)return;
const base='assets/img/ui/';
const checked=new WeakSet();
const solise=new Image();let ready=false;
function mount(){
 if(!ready)return;
 document.querySelectorAll('.solise-help img.solise-help-image').forEach(image=>{
  if(checked.has(image))return;
  checked.add(image);
  const previous=image.getAttribute('src'),srcset=image.getAttribute('srcset');
  image.addEventListener('error',()=>{
   image.classList.remove('ui-solise-ready');
   if(previous!==null)image.setAttribute('src',previous);else image.removeAttribute('src');
   if(srcset!==null)image.setAttribute('srcset',srcset);
  },{once:true});
  image.removeAttribute('srcset');image.src=solise.src;image.classList.add('ui-solise-ready');
 });
}
solise.onload=()=>{ready=true;mount();};
solise.onerror=()=>{console.warn('[ui-assets] solise-assistant.webp failed to load');};
solise.src=base+'solise-assistant.webp';
const brand=document.querySelector('.brand-header .brand-mark');
if(brand){
 const vs=new Image();vs.alt='';vs.decoding='async';
 vs.onload=()=>{brand.replaceChildren(vs);brand.classList.add('ui-vs-ready');};
 vs.onerror=()=>{console.warn('[ui-assets] vs.webp failed to load');};
 vs.src=base+'vs.webp';
}
let queued=false;
new MutationObserver(()=>{
 if(queued)return;queued=true;
 queueMicrotask(()=>{queued=false;mount();});
}).observe(document.body,{childList:true,subtree:true});
window.TrackerUIAssets=Object.freeze({version:'1.0.1'});
})();
