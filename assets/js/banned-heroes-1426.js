(function(){
'use strict';
if(window.TrackerBannedHeroes1426)return;
const tabs=document.querySelector('.tabs'),after=document.getElementById('page-statistics');
if(!tabs||!after)return;
const help=document.getElementById('openHelp');
const tab=document.createElement('button');tab.type='button';tab.className='tab';tab.dataset.page='banned';tab.textContent='Banned heroes';
if(help)tabs.insertBefore(tab,help);else tabs.append(tab);
const page=document.createElement('div');page.id='page-banned';page.className='hidden';
const card=document.createElement('section');card.className='card';
const title=document.createElement('h2');title.textContent='Banned heroes';
const note=document.createElement('p');note.className='caption';note.textContent='These heroes are not allowed in this event. They cannot be picked and are never suggested.';
const body=document.createElement('div');body.id='bannedBody';
card.append(title,note,body);page.append(card);after.after(page);
const order=['Lightbearer','Wilder','Mauler','Graveborn','Celestial','Hypogean','Dimensional'];
function render(){
 body.replaceChildren();
 let banned;
 try{banned=config.heroes.filter(hero=>!hero.is_allowed);}catch(_){return;}
 if(!banned.length){const empty=document.createElement('p');empty.className='caption';empty.textContent='No banned heroes right now.';body.append(empty);return;}
 for(const faction of order){
  const list=banned.filter(hero=>hero.faction===faction).sort((a,b)=>a.name.localeCompare(b.name,'en'));
  if(!list.length)continue;
  const heading=document.createElement('h3');heading.textContent=faction;
  const grid=document.createElement('div');grid.className='banned-grid';
  for(const hero of list){
   const item=document.createElement('div');item.className='banned-hero';item.title=hero.name;
   const name=document.createElement('span');name.textContent=hero.name;
   item.append(portrait(hero),name);grid.append(item);
  }
  body.append(heading,grid);
 }
}
function show(){
 for(const node of document.querySelectorAll('[id^="page-"]'))node.classList.toggle('hidden',node!==page);
 for(const button of tabs.querySelectorAll('.tab'))button.classList.toggle('active',button===tab);
 render();
}
tab.addEventListener('click',event=>{event.stopImmediatePropagation();show();});
tabs.addEventListener('click',event=>{
 const button=event.target.closest?.('button');
 if(!button||button===tab||!button.dataset.page)return;
 page.classList.add('hidden');tab.classList.remove('active');
},true);
window.addEventListener('tracker:catalog-changed',()=>{if(!page.classList.contains('hidden'))render();});
window.TrackerBannedHeroes1426=Object.freeze({version:'1.4.26'});
})();
