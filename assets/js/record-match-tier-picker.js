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
const methods={
 overall:'S: up to 8 heroes ranked by the Wilson lower confidence bound. First, heroes need at least 20 appearances and a win rate of 60% or more; if fewer than 8 qualify, remaining places are filled by heroes with 15+ appearances and a 50% to below 60% win rate (A+). Positions are labelled SSS, SS, S+, then S. Remaining tiers: A above 60%, B from 50% to 60%, C below 50%. A/B/C require at least 10 appearances; below that, heroes are preliminary.',
 s30:'S: up to 10 heroes with at least 30 appearances and a win rate of 60% or more, ranked by the Wilson lower confidence bound. Positions are labelled SSS (1–2), SS (3–4), S+ (5–6), then S (7–10); there is no backfill. A: 60%+ among the remaining heroes; the top 3 with 20+ appearances are A+, while heroes with 10–19 appearances are marked A? (potential). B: 50% to below 60%. C: below 50%. Fewer than 10 appearances: preliminary.',
 side:'The score is side-adjusted: the average of (the hero’s BLUE win rate minus the overall BLUE win rate) and (the hero’s RED win rate minus the overall RED win rate). S: top 8 by adjusted score, requiring at least 20 appearances overall and at least 5 on each side. A: +3% or higher. B: between −3% and +3%. C: below −3%. Heroes with fewer than 20 appearances overall or fewer than 5 on either side are preliminary.'
};
const cache=new Map();
const pending=new Map();
let selected='overall';
let request=0;
let controls=null;
let status=null;
let methodDetails=null;
let methodText=null;

function desktopEnabled(){
 const mode=document.documentElement.dataset.uiView||'auto';
 return mode==='desktop'||(mode==='auto'&&window.matchMedia('(min-width: 1100px)').matches);
}
function updateMethod(){
 if(methodText)methodText.textContent=methods[selected]||methods.overall;
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
  updateMethod();
  renderHeroes();
 });
 status=document.createElement('span');
 status.className='record-tier-status';
 status.setAttribute('role','status');
 methodDetails=document.createElement('details');
 methodDetails.className='record-tier-method';
 const summary=document.createElement('summary');
 summary.textContent="How it's calculated";
 methodText=document.createElement('p');
 methodText.textContent=methods[selected];
 methodDetails.append(summary,methodText);
 controls.append(label,select,status,methodDetails);
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
   if(window.trackerConfigReady)await window.trackerConfigReady;
   await loadTiers(true);
   if(typeof renderTiers==='function')renderTiers();
   const root=get('tierRows');
   const cards=root?.querySelectorAll('button.tier-hero').length||0;
   if(!root||!cards){
    const catalogCount=window.getHeroCatalogForPicker?.().length??'unknown';
    const statsCount=window.getTierDataForPicker?.()?.heroes?.length??'unknown';
    throw Error('Tier List rendered no hero cards (catalog: '+catalogCount+', statistics: '+statsCount+').');
   }
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
 const rows=[...snapshot.children].map(node=>{
  const copy=node.cloneNode(true);
  if(copy.matches('details.tier-no-data')){
   const section=document.createElement('section');
   section.className='tier-row tier-N';
   const heading=document.createElement('div');
   heading.className='tier-no-data-title';
   heading.textContent='Preliminary heroes';
   const content=copy.querySelector('.tier-content');
   section.append(heading,content||document.createElement('div'));
   return section;
  }
  return copy;
 });
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
   card.querySelectorAll('.tier-samples,.s30-count,.tier-rate,.tier-grade,.s30-grade,.tier-tag').forEach(node=>node.remove());
   wireHeroCard(card,hero);
   shown++;
  }
  row.querySelector('.tier-label')?.remove();
  const content=row.querySelector('.tier-content');
  if(content&&!content.querySelector('button.tier-hero')){
   content.replaceChildren();
   const empty=document.createElement('span');
   empty.className='tier-empty';
   empty.textContent='—';
   content.append(empty);
  }
  if(row.classList.contains('tier-N')){
   const heading=row.querySelector('.tier-no-data-title');
   if(heading)heading.textContent='Preliminary heroes · '+row.querySelectorAll('button.tier-hero').length;
  }
 }
 catalog.replaceChildren(...rows);
 const source=sources[selected];
 get('catalogInfo').textContent=shown+' heroes shown · '+source.label+' · banned heroes hidden';
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
 updateMethod();
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