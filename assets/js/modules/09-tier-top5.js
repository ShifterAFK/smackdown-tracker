// Module: tier-top5-rule-v1
(function(){
'use strict';
if(typeof renderTiers!=='function')return;
renderTiers=function(){
 const root=$('tierRows');root.replaceChildren();if(!tierData)return;
 const byId=new Map(tierData.heroes.map(row=>[row.hero_id,row]));
 const items=config.heroes.map(hero=>{
  const row=byId.get(hero.id);
  const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Number(row?.wins)||0);
  const rate=n?Math.min(100,100*wins/n):0;
  return {hero,n,wins,rate};
 });
 const eligible=items.filter(item=>item.n>=10&&item.rate>=70)
  .sort((a,b)=>b.rate-a.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 const sSet=new Set(eligible.slice(0,5).map(item=>item.hero.id));
 const buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const item of items){
  const key=item.n<10?'N':sSet.has(item.hero.id)?'S':item.rate>=60?'A':item.rate>=50?'B':'C';
  buckets[key].push(item);
 }
 const ranked=['S','A','B','C'].reduce((sum,k)=>sum+buckets[k].length,0);
 if(!ranked){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked heroes yet — more match results are needed.';root.append(p);}
 function fill(content,key){
  buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name):b.rate-a.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name));
  for(const item of buckets[key]){
   const {hero,n,rate}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');
   const description=hero.name+' — '+(n?rate.toFixed(1)+'% · '+n+' appearances':'No data')+(!hero.is_allowed?' · Currently banned':'');
   card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));
   const value=document.createElement('span');value.className='tier-rate';value.textContent=key==='N'?n+'/10':rate.toFixed(1)+'%';card.append(value);
   card.onclick=()=>showTierHero(item);content.append(card);
  }
 }
 for(const key of ['S','A','B','C']){
  const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');
  const label=document.createElement('div');label.className='tier-label';label.textContent=key;
  const content=document.createElement('div');content.className='tier-content';fill(content,key);
  if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}
  row.append(label,content);root.append(row);
 }
 const more=document.createElement('details');more.className='tier-no-data';
 const summary=document.createElement('summary');summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances';
 const content=document.createElement('div');content.className='tier-content';more.append(summary,content);
 let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
};
})();
