(function(){
'use strict';
if(window.TrackerSkinHover)return;
const available=new Set('antandra aurora bonnie brutus bryon cassadee cecia cyran daimon damian eironn elijah-lailah eryndor evie faramor fay frieren galahad gwyneth harak hewynn hodgkin igor indris isabella koko kulu lenya lily-may lorsan ludovic lyca marilee mehira mikola mirael odie parisa peggy phraesto ravion rowan senea shakir shemira silvina sinbad smokey-meerky solise sonja soren talene tasi ulmus vala valen valka viperian'.split(' '));
const hover=matchMedia('(any-hover: hover)'),states=new WeakMap(),loads=new Map();
function skinURL(image){
 try{
  const url=new URL(image.getAttribute('src')||'',document.baseURI),base=new URL(BASE,document.baseURI);
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return null;
  const file=url.pathname.slice(base.pathname.length),match=/^([a-z0-9-]+)\.webp$/.exec(file);
  if(!match||!available.has(match[1]))return null;
  url.pathname=base.pathname+match[1]+'-skin1.webp';return url.href;
 }catch(_){return null;}
}
function preload(url){
 if(!loads.has(url))loads.set(url,new Promise(resolve=>{
  const image=new Image();image.onload=()=>resolve(true);image.onerror=()=>resolve(false);image.src=url;
 }));
 return loads.get(url);
}
function restore(image){
 const state=states.get(image);if(!state)return;state.active=false;
 if(state.swapped&&image.getAttribute('src')===state.skin)image.setAttribute('src',state.original);
 states.delete(image);
}
document.addEventListener('pointerover',event=>{
 if(!hover.matches||event.pointerType==='touch')return;
 const image=event.target instanceof Element?event.target.closest('img'):null;
 if(!image||states.has(image))return;
 const skin=skinURL(image);if(!skin)return;
 const state={original:image.getAttribute('src'),skin,active:true,swapped:false};states.set(image,state);
 preload(skin).then(ok=>{
  if(!ok||!state.active||states.get(image)!==state||!image.isConnected||!image.matches(':hover')||image.getAttribute('src')!==state.original)return;
  state.swapped=true;image.setAttribute('src',skin);
 });
},true);
document.addEventListener('pointerout',event=>{
 const image=event.target instanceof Element?event.target.closest('img'):null;
 if(image&&event.relatedTarget!==image)restore(image);
},true);
document.addEventListener('pointercancel',event=>{if(event.target instanceof HTMLImageElement)restore(event.target);},true);
window.addEventListener('blur',()=>{for(const image of document.images)restore(image);});
window.TrackerSkinHover=Object.freeze({version:'1.0.0'});
})();