(function(){
'use strict';
if(window.MobileAssistant135)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog)return;
const head=dialog.querySelector('.md130head'),title=head?.querySelector('h2');if(!head||!title)return;
const portrait=document.createElement('img');portrait.className='md135-solise';portrait.alt='';portrait.setAttribute('aria-hidden','true');portrait.referrerPolicy='no-referrer';portrait.onerror=()=>{portrait.hidden=true;};title.before(portrait);
let positions=[],row=null,frame=0;
function updateImage(){
 const existing=document.querySelector('.solise-help-image[src]');let src=existing?.getAttribute('src');
 if(!src){try{src=config.heroes.find(h=>h.name==='Solise')?.portrait_url;}catch(_){}}
 if(!src)return;try{const url=new URL(src,document.baseURI);if(!['http:','https:','data:'].includes(url.protocol))return;if(portrait.getAttribute('src')!==url.href){portrait.hidden=false;portrait.src=url.href;}}catch(_){}
}
function restore(){
 for(const {node,marker} of positions){if(marker.parentNode)marker.replaceWith(node);}
 positions=[];if(row){row.remove();row=null;}
}
function arrange(){
 updateImage();
 const mobile=matchMedia('(max-width:1099px)').matches;
 const active=mobile&&dialog.open&&dialog.dataset.mode==='assistant';
 if(!active){restore();return;}
 const root=document.getElementById('draftAssist'),scope=document.getElementById('daScope'),mapLabel=document.getElementById('daMapLabel');
 if(!root||!dialog.contains(root)||!scope||!mapLabel){restore();return;}
 if(row?.isConnected&&row.contains(scope)&&row.contains(mapLabel))return;
 restore();row=document.createElement('div');row.className='md135-scope-row';
 scope.before(row);
 for(const node of [scope,mapLabel]){const marker=document.createComment('md135 original position');node.before(marker);positions.push({node,marker});row.append(node);}
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;arrange();});}
new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-mode'],childList:true,subtree:true});
matchMedia('(max-width:1099px)').addEventListener('change',schedule);
window.addEventListener('tracker:catalog-changed',schedule);
window.addEventListener('tracker:draft-changed',schedule);
window.MobileAssistant135=Object.freeze({version:'1.3.5'});arrange();
})();
