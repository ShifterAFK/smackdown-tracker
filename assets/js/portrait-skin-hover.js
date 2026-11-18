(function(){
'use strict';
if(window.TrackerSkinHover)return;
const available=new Set('antandra aurora bonnie brutus bryon cassadee cecia cyran daimon damian eironn elijah-lailah eryndor evie faramor fay frieren galahad gwyneth harak hewynn hodgkin igor indris isabella koko kulu lenya lily-may lorsan ludovic lyca marilee mehira mikola mirael odie parisa peggy phraesto ravion rowan senea shakir shemira silvina sinbad smokey-meerky solise sonja soren talene tasi ulmus vala valen valka viperian'.split(' '));
const hover=matchMedia('(any-hover: hover)'),loads=new Map();
let active=null,warming=false;
function skinURL(image){
 try{
  const url=new URL(image.getAttribute('src')||'',document.baseURI),base=new URL(BASE,document.baseURI);
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return null;
  const match=/^([a-z0-9-]+)\.webp$/.exec(url.pathname.slice(base.pathname.length));
  if(!match||!available.has(match[1]))return null;
  url.pathname=base.pathname+match[1]+'-skin1.webp';return url.href;
 }catch(_){return null;}
}
function preload(url){
 if(loads.has(url))return loads.get(url);
 const image=new Image(),entry={image,ready:false,promise:null};
 entry.promise=new Promise(resolve=>{
  image.onload=async()=>{try{await image.decode();}catch(_){}entry.ready=true;resolve(true);};
  image.onerror=()=>resolve(false);image.src=url;
 });
 loads.set(url,entry);return entry;
}
function restore(){
 const state=active;active=null;if(!state)return;
 if(state.swapped&&state.image.getAttribute('src')===state.skin)state.image.setAttribute('src',state.original);
}
function imageAt(event){
 const target=event.target instanceof Element?event.target:null;if(!target)return null;
 const host=target.closest('button,.mini-hero,.avatar,.md130portrait,.da-s-hero,#tierHeroDetail');
 const images=host?host.querySelectorAll('img'):(target instanceof HTMLImageElement?[target]:[]);
 for(const image of images){
  const rect=image.getBoundingClientRect();
  if(rect.width&&rect.height&&event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom)return image;
 }
 return null;
}
function track(event){
 if(!hover.matches||event.pointerType==='touch')return;
 if(event.target instanceof Element&&event.target.closest('#mobileDraft130.md-fast')){restore();return;}
 const image=imageAt(event);if(active?.image===image)return;
 restore();if(!image)return;const skin=skinURL(image);if(!skin)return;
 const state={image,skin,original:image.getAttribute('src'),swapped:false};active=state;
 const apply=()=>{
  if(active!==state||!image.isConnected||image.getAttribute('src')!==state.original)return;
  state.swapped=true;image.setAttribute('src',skin);
 };
 const entry=preload(skin);if(entry.ready)apply();else entry.promise.then(ok=>{if(ok)apply();});
}
async function warm(){
 if(warming||!hover.matches)return;warming=true;
 const urls=Array.from(available,name=>new URL(name+'-skin1.webp',new URL(BASE,document.baseURI)).href);
 let next=0;
 async function worker(){while(next<urls.length){const url=urls[next++];await preload(url).promise;}}
 await Promise.all(Array.from({length:4},worker));
}
document.addEventListener('pointerover',track,{capture:true,passive:true});
document.addEventListener('pointermove',track,{capture:true,passive:true});
document.addEventListener('pointerout',event=>{if(!event.relatedTarget)restore();},true);
document.addEventListener('pointercancel',restore,true);
window.addEventListener('blur',restore);
document.addEventListener('visibilitychange',()=>{if(document.hidden)restore();});
hover.addEventListener('change',()=>{if(hover.matches)warm();else restore();});
warm();
window.TrackerSkinHover=Object.freeze({version:'1.1.1'});
})();
