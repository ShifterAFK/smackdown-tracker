(function(){
'use strict';
if(window.TrackerDefaultMap138)return;
const get=id=>document.getElementById(id),select=get('theme'),image=get('mapPreview'),button=get('mapOpen');
if(!select||!image||!button)return;
const html=document.documentElement,baseRender=renderMap;
let userChosen=false,internal=false,resolved=false,request=0;
const status=document.createElement('p');status.className='caption';status.setAttribute('role','status');status.textContent='Loading current map...';button.before(status);
function state(value,text){html.dataset.mapPreviewState=value;status.textContent=text||'';status.hidden=!text;}
function empty(text){
 request++;image.removeAttribute('src');image.alt='';button.disabled=true;get('mapSelectedName').textContent='Select a map';
 delete html.dataset.mapInitializing;state('empty',text);
}
renderMap=function(){
 if(!resolved&&!userChosen){state('loading','Loading current map...');return;}
 const id=select.value,src=MAPS[id];if(!src){empty('Choose the map used in this match.');return;}
 const token=++request;state('loading','Loading map preview...');baseRender();button.disabled=true;
 const wanted=new URL(src,document.baseURI).href,probe=new Image();
 probe.onload=async()=>{
  try{await probe.decode();}catch(_){}
  if(token!==request||select.value!==id)return;
  const reveal=async()=>{
   try{await image.decode();}catch(_){}
   if(token!==request||select.value!==id)return;
   if(!image.naturalWidth||new URL(image.currentSrc||image.src,document.baseURI).href!==wanted)return;
   button.disabled=false;state('ready','');
  };
  if(image.complete)reveal();else image.addEventListener('load',reveal,{once:true});
 };
 probe.onerror=()=>{if(token===request){button.disabled=true;state('error','Map selected, but its preview could not load. You can still change the map.');}};
 probe.src=wanted;
};
select.addEventListener('change',()=>{
 if(internal)return;
 userChosen=true;resolved=true;delete html.dataset.mapInitializing;renderMap();
},true);
function apply(){
 if(!onlineCatalog)return;
 if(userChosen){resolved=true;delete html.dataset.mapInitializing;renderMap();return;}
 if(resolved)return;
 resolved=true;const wanted=config.event?.current_theme_id;
 if(!wanted||!Array.from(select.options).some(option=>option.value===wanted)){
  select.value='';empty('Current map unavailable. Choose the map used in this match.');return;
 }
 select.value=wanted;delete html.dataset.mapInitializing;
 internal=true;try{select.dispatchEvent(new Event('change',{bubbles:true}));}finally{internal=false;}
 renderMap();
}
window.addEventListener('tracker:catalog-changed',apply);
const connection=get('connection');
function failure(){
 if(resolved||userChosen||onlineCatalog)return;
 if(connection?.textContent.includes('unavailable')){select.value='';empty('Configuration unavailable. Choose the map used in this match.');}
}
if(connection)new MutationObserver(failure).observe(connection,{childList:true,characterData:true,subtree:true});
setTimeout(()=>{
 if(!resolved&&!userChosen&&!onlineCatalog){select.value='';empty('Configuration is taking longer to load. You can choose the map manually.');}
},20000);
if(onlineCatalog)apply();else{state('loading','Loading current map...');failure();}
window.TrackerDefaultMap138=Object.freeze({version:'1.3.9'});
})();