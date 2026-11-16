// Module: faction-order
(function(){
'use strict';
const originalRenderHeroes=window.renderHeroes;
if(typeof originalRenderHeroes!=='function')return;
window.renderHeroes=function(){
 const query=$('search').value.trim().toLowerCase();
 const order=['Lightbearer','Wilder','Mauler','Graveborn','Hypogean','Celestial','Dimensional'];
 const rank=f=>{const i=order.indexOf(f);return i<0?order.length:i;};
 const heroes=config.heroes.filter(h=>h.is_allowed&&(!factionFilter||h.faction===factionFilter)&&h.name.toLowerCase().includes(query)).sort((a,b)=>rank(a.faction)-rank(b.faction)||a.name.localeCompare(b.name,'en',{sensitivity:'base'}));
 const container=$('heroes');container.replaceChildren();let previousFaction=null;
 for(const h of heroes){
  if(!factionFilter&&h.faction!==previousFaction){
   const title=document.createElement('div');title.className='hero-faction-heading';title.textContent=h.faction;title.setAttribute('role','heading');title.setAttribute('aria-level','3');container.append(title);previousFaction=h.faction;
  }
  const button=document.createElement('button');button.type='button';button.className='hero';button.title=h.name;button.setAttribute('aria-label',h.name);button.append(portrait(h));button.onclick=()=>{if(Date.now()<blockClickUntil)return;choose(h.id);};button.ondragstart=e=>startDrag(e,{kind:'hero',id:h.id},button);button.ondragend=finishDrag;
  const used=[...lineup.BLUE,...lineup.RED].includes(h.id);button.classList.toggle('used',used);button.disabled=used;button.draggable=!used;if(used)button.title=h.name+' — already drafted';container.append(button);
 }
 if(!heroes.length){const empty=document.createElement('p');empty.className='hero-search-empty';empty.textContent='No heroes match this search.';container.append(empty);}
 $('catalogInfo').textContent=heroes.length+' shown · '+config.heroes.filter(h=>h.is_allowed).length+' allowed · '+(onlineCatalog?'shared catalog':'built-in fallback catalog');
 notifyDraftChanged();
};
})();