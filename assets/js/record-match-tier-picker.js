// Desktop Record match catalog backed by the three existing Tier List renderers.
(function(){
'use strict';
const get=id=>document.getElementById(id);
const catalog=get('heroes');
const panel=document.querySelector('#page-entry .hero-panel');
if(!catalog||!panel||typeof renderHeroes!=='function')return;

const originalRenderHeroes=renderHeroes;
const sources={
 overall:{label:'Tier List',root:'tierRows'},
 s30:{label:'Tier S 30+',root:'tierRows30'},
 side:{label:'Tier Side',root:'tierRowsSide'}
};
const cache=new Map();
const pending=new Map();
let selected='overall';
let request=0;
let controls=null;
let status=null;

function desktopEnabled(){
 const mode=document.documentElement.dataset.uiView||'auto';
 return mode==='desktop'||(mode==='auto'&&window.matchMedia('(min-width: 1100px)').matches);
}
function ensureControls(){
 if(controls)return;
 controls=document.createElement('div');
 controls.className='record-tier-controls';
 const label=document.createElement('label');
 label.htmlFor='recordTierSource';
 label.textContent='Hero ranking';
 const select=document.createElement('select');
 select.id='recordTierSource';
 for(const [key,source] of Object.entries(sources))select.add(new Option(source.label,key));
 select.value=selected;
 select.addEventListener('change',()=>{
  selected=select.value in sources?select.value:'overall';
  renderHeroes();
 });
 status=document.createElement('span');
 status.className='record-tier-status';
 status.setAttribute('role','status');
 controls.append(label,select,status);
 const firstRow=panel.querySelector('.row');
 if(firstRow)panel.insertBefore(controls,firstRow);else panel.prepend(controls);
}
function currentFilters(){
 return {
  query:(get('search')?.value||'').trim().toLocaleLowerCase(),
  faction:typeof factionFilter==='string'?factionFilter:''
 };
}
function sourceRoot(key){
 if(key==='overall'){
  return (async()=>{
   if(typeof loadTiers!=='function')throw Error('Tier List loader is unavailable.');
   await loadTiers(true);
   const root=get('tierRows');
   if(!root||(!root.childElementCount&&get('tierStatus')?.classList.contains('error')))
    throw Error(get('tierStatus')?.textContent||'Tier List data is unavailable.');
   return root;
  })();
 }
 const provider=window.RecordMatchTierSources?.[key];
 if(typeof provider!=='function')throw Error('The selected tier source is not ready.');
 return provider();
}
async function materializePreliminary(root){
 const details=root?.querySelector('details.tier-no-data');
 if(details&&!details.open){
  details.open=true;
  await new Promise(resolve=>requestAnimationFrame(resolve));
  details.open=false;
 }
}
async function loadSnapshot(key){
 if(cache.has(key))return cache.get(key);
 if(pending.has(key))return pending.get(key);
 const task=(async()=>{
  const root=await sourceRoot(key);
  if(!root)throw Error('The selected tier list did not return any rows.');
  await materializePreliminary(root);
  const snapshot=root.cloneNode(true);
  cache.set(key,snapshot);
  return snapshot;
 })();
 pending.set(key,task);
 try{return await task;}finally{pending.delete(key);}
}
function wireHeroCard(card,hero){
 const used=[...lineup.BLUE,...lineup.RED].includes(hero.id);
 card.disabled=used;
 card.draggable=!used;
 card.classList.toggle('used',used);
 card.title=hero.name+(used?' — already drafted':' — click to fill the active slot');
 card.setAttribute('aria-label',card.title);
 card.onclick=()=>{
  if(Date.now()<blockClickUntil||used)return;
  choose(hero.id);
 };
 card.ondragstart=e=>{
  if(used){e.preventDefault();return;}
  startDrag(e,{kind:'hero',id:hero.id},card);
 };
 card.ondragend=finishDrag;
}
function renderSnapshot(snapshot,filters){
 const rows=[...snapshot.children].map(node=>node.cloneNode(true));
 let shown=0;
 for(const row of rows){
  const cards=[...row.querySelectorAll('button.tier-hero')];
  for(const card of cards){
   const hero=heroById(card.dataset.heroId);
   if(!hero||!hero.is_allowed||isBannedHero(hero)||
      (filters.faction&&hero.faction!==filters.faction)||
      (filters.query&&!hero.name.toLocaleLowerCase().includes(filters.query))){
    card.remove();
    continue;
   }
   wireHeroCard(card,hero);
   shown++;
  }
  const content=row.querySelector('.tier-content');
  if(content&&!content.querySelector('button.tier-hero')){
   content.replaceChildren();
   const empty=document.createElement('span');
   empty.className='tier-empty';
   empty.textContent='—';
   content.append(empty);
  }
  if(row.matches('details.tier-no-data')){
   const count=row.querySelectorAll('button.tier-hero').length;
   const summary=row.querySelector('summary');
   if(summary)summary.textContent='N · Preliminary heroes · '+count;
  }
 }
 catalog.replaceChildren(...rows);
 const source=sources[selected];
 const countLabel=shown+' heroes shown · '+source.label+' · banned heroes hidden';
 get('catalogInfo').textContent=countLabel;
 if(!shown){
  const empty=document.createElement('p');
  empty.className='hero-search-empty';
  empty.textContent='No heroes match this ranking and filter.';
  catalog.append(empty);
 }
 if(status)status.textContent=source.label+' loaded';
}
async function renderDesktop(){
 ensureControls();
 const token=++request;
 const source=sources[selected];
 if(status)status.textContent='Loading '+source.label+'…';
 catalog.replaceChildren();
 const loading=document.createElement('p');
 loading.className='tier-wait';
 loading.textContent='Loading '+source.label+'…';
 catalog.append(loading);
 try{
  const snapshot=await loadSnapshot(selected);
  if(token!==request||!desktopEnabled())return;
  renderSnapshot(snapshot,currentFilters());
 }catch(error){
  if(token!==request)return;
  catalog.replaceChildren();
  const message=document.createElement('p');
  message.className='tier-wait';
  message.textContent='Could not load '+source.label+': '+error.message;
  catalog.append(message);
  if(status)status.textContent='Ranking unavailable';
  get('catalogInfo').textContent='Try refreshing the corresponding Tier List page.';
 }
}
function renderHeroes(){
 if(!desktopEnabled()){
  if(controls)controls.hidden=true;
  originalRenderHeroes();
  return;
 }
 ensureControls();
 controls.hidden=false;
 const snapshot=cache.get(selected);
 if(snapshot){
  request++;
  renderSnapshot(snapshot,currentFilters());
 }else{
  renderDesktop();
 }
}
window.renderHeroes=renderHeroes;
get('search').oninput=renderHeroes;
window.addEventListener('tracker:draft-changed',()=>{
 if(desktopEnabled()&&cache.has(selected))renderHeroes();
});
window.addEventListener('tracker:catalog-changed',()=>{
 cache.clear();
 renderHeroes();
});
window.addEventListener('resize',renderHeroes);
window.addEventListener('tracker:tier-data-changed',()=>{
 cache.delete(selected);
 renderHeroes();
});
renderHeroes();
})();