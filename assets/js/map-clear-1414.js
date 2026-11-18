(function(){
'use strict';
if(window.TrackerMapClear1414)return;
const heading=document.querySelector('.map-heading');
const name=document.getElementById('mapSelectedName');
if(!heading||!name)return;
heading.querySelector('.map-next-change')?.remove();
name.hidden=true;
const eyebrow=document.querySelector('.map-eyebrow');
if(eyebrow)eyebrow.textContent='MAP ROTATION';
let rotation=heading.querySelector('.map-rotation-line');
if(!rotation){rotation=document.createElement('p');rotation.className='caption map-rotation-line';name.parentNode.insertBefore(rotation,name);}
let selected=heading.querySelector('.map-selected-line');
if(!selected){selected=document.createElement('p');selected.className='caption map-selected-line';name.parentNode.insertBefore(selected,name.nextSibling);}
const start=Date.UTC(2026,10,14,0,0,0);
const cycle=3*24*60*60*1000;
const order=['top-defender','siegebreaker','fierce-duel','tactical-grounds','tranquil-grounds'];
const names={'top-defender':'Top Defender','siegebreaker':'Siegebreaker','fierce-duel':'Fierce Duel','tactical-grounds':'Tactical Grounds','tranquil-grounds':'Tranquil Grounds'};
function update(){
 const now=Date.now();
 const elapsed=Math.max(0,Math.floor((now-start)/cycle));
 const id=order[elapsed%order.length];
 const next=start+(elapsed+1)*cycle;
 const diff=Math.max(0,next-now);
 const days=Math.floor(diff/86400000);
 const hours=Math.floor((diff%86400000)/3600000);
 const minutes=Math.floor((diff%3600000)/60000);
 const parts=[];
 if(days)parts.push(days+'d');
 if(hours)parts.push(hours+'h');
 parts.push(minutes+'min');
 const text=names[id]+' — changes in '+parts.join(' ');
 if(rotation.textContent!==text)rotation.textContent=text;
 const chosen=(name.textContent||'').trim();
 const different=Boolean(chosen&&chosen!==names[id]);
 const matchText=different?('Match map: '+chosen):'';
 if(selected.textContent!==matchText)selected.textContent=matchText;
 if(selected.hidden!==!different)selected.hidden=!different;
}
update();
setInterval(update,30000);
name.addEventListener('change',update);
new MutationObserver(update).observe(name,{childList:true,characterData:true,subtree:true});
window.TrackerMapClear1414=Object.freeze({version:'1.3.14'});
})();
