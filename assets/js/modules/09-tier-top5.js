// Module: tier-top5-rule-v2 (partner-adjusted hero strength)
(function(){
'use strict';
if(window.TrackerStrength)return;
const LAMBDA=6,PAIR_WEIGHT=.5,ITERATIONS=80;
const cache=new WeakMap();
const sigmoid=x=>1/(1+Math.exp(-x));
function fit(data){
 if(!data||typeof data!=='object')return null;
 if(cache.has(data))return cache.get(data);
 const index=new Map();
 const slot=id=>{if(!index.has(id))index.set(id,index.size);return index.get(id);};
 const clean=row=>{const n=Math.max(0,Number(row?.appearances)||0);return {n,w:Math.max(0,Math.min(n,Number(row?.wins)||0))};};
 const singles=[],pairs=[];
 for(const row of data.heroes||[]){const {n,w}=clean(row);if(n)singles.push([slot(row.hero_id),n,w]);}
 for(const row of data.duos||[]){const {n,w}=clean(row);if(n)pairs.push([slot(row.hero_1_id),slot(row.hero_2_id),n,w]);}
 const k=index.size,s=new Float64Array(k),counts=new Float64Array(k);
 for(const [a,n] of singles)counts[a]=n;
 for(let it=0;it<ITERATIONS;it++){
  const g=new Float64Array(k),h=new Float64Array(k);
  for(let i=0;i<k;i++){g[i]=LAMBDA*s[i];h[i]=LAMBDA;}
  for(const [a,n,w] of singles){const p=sigmoid(s[a]);g[a]-=w-n*p;h[a]+=n*p*(1-p);}
  for(const [a,b,n,w] of pairs){const p=sigmoid(s[a]+s[b]),r=PAIR_WEIGHT*(w-n*p),q=PAIR_WEIGHT*n*p*(1-p);g[a]-=r;g[b]-=r;h[a]+=q;h[b]+=q;}
  for(let i=0;i<k;i++)s[i]-=.5*g[i]/h[i];
 }
 const model={strength:id=>index.has(id)?s[index.get(id)]:0,appearances:id=>index.has(id)?counts[index.get(id)]:0,teamScore:ids=>sigmoid(ids.reduce((sum,id)=>sum+model.strength(id),0))};
 cache.set(data,model);return model;
}
window.TrackerStrength=Object.freeze({fit,version:'1.0'});
})();

(function(){
'use strict';
if(typeof renderTiers!=='function')return;
renderTiers=function(){
 const root=$('tierRows');root.replaceChildren();if(!tierData)return;
 const model=window.TrackerStrength.fit(tierData);
 const about=document.querySelector('.tier-about p');
 if(about)about.textContent='S: up to 5 heroes with at least 10 appearances and 60% win rate, ranked by partner-adjusted strength (a hero who keeps winning with many different partners ranks higher than one who only wins in a single duo; small samples are pulled toward average). A: 60% or more. B: 50% or more. C: below 50%. Under 10 appearances a hero is listed as preliminary.';
 const byId=new Map(tierData.heroes.map(row=>[row.hero_id,row]));
 const items=config.heroes.map(hero=>{
  const row=byId.get(hero.id);
  const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Number(row?.wins)||0);
  const rate=n?Math.min(100,100*wins/n):0;
  return {hero,n,wins,rate,strength:model?model.strength(hero.id):0};
 });
 const eligible=items.filter(item=>item.n>=10&&item.rate>=60&&item.strength>0)
  .sort((a,b)=>b.strength-a.strength||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 const sSet=new Set(eligible.slice(0,5).map(item=>item.hero.id));
 const buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const item of items){
  const key=item.n<10?'N':sSet.has(item.hero.id)?'S':item.rate>=60?'A':item.rate>=50?'B':'C';
  buckets[key].push(item);
 }
 const ranked=['S','A','B','C'].reduce((sum,k)=>sum+buckets[k].length,0);
 if(!ranked){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked heroes yet — more match results are needed.';root.append(p);}
 function fill(content,key){
  buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name):key==='S'?b.strength-a.strength||b.n-a.n:b.rate-a.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name));
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
