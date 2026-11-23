// Module: tier-top8-wilson-v2
(function(){
'use strict';
if(typeof renderTiers!=='function')return;
function wilsonLowerBound(wins,appearances){
 if(!appearances)return 0;
 const z=1.959963984540054,p=wins/appearances,z2=z*z;
 const denominator=1+z2/appearances;
 const center=(p+z2/(2*appearances))/denominator;
 const margin=z*Math.sqrt(p*(1-p)/appearances+z2/(4*appearances*appearances))/denominator;
 return Math.max(0,center-margin)*100;
}
renderTiers=function(){
 const root=$('tierRows');root.replaceChildren();if(!tierData)return;
 const byId=new Map(tierData.heroes.map(row=>[row.hero_id,row]));
 const items=config.heroes.map(hero=>{
  const row=byId.get(hero.id);
  const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Math.min(n,Number(row?.wins)||0));
  const rate=n?100*wins/n:0;
  const wilson=wilsonLowerBound(wins,n);
  return {hero,n,wins,rate,wilson};
 });
 // Raw win rate determines eligibility; Wilson's conservative lower bound ranks heroes.
 const eligible=items.filter(item=>item.n>=10&&item.rate>=70)
  .sort((a,b)=>b.wilson-a.wilson||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 const sSet=new Set(eligible.slice(0,8).map(item=>item.hero.id));
 const buckets={S:[],A:[],B:[],C:[],Doom:[],N:[]};
 for(const item of items){
  const key=item.n<10?'N':sSet.has(item.hero.id)?'S':item.n>=20&&item.rate<40?'Doom':item.rate>=60?'A':item.rate>=50?'B':'C';
  const grade=key!=='N'&&key!=='S'&&item.n<20?key+'?':key;
  buckets[key].push({...item,grade});
 }
 const ranked=['S','A','B','C','Doom'].reduce((sum,k)=>sum+buckets[k].length,0);
 if(!ranked){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked heroes yet — more match results are needed.';root.append(p);}
 function fill(content,key){
  buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):key==='Doom'?a.rate-b.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):b.wilson-a.wilson||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
  for(const item of buckets[key]){
   const {hero,n,rate,wilson,grade}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');
   const description=hero.name+' — '+(key==='Doom'?'DOOM · below 40% win rate with 20+ appearances · ':'')+(n?rate.toFixed(1)+'% win rate · Wilson '+wilson.toFixed(1)+'% · '+n+' appearances':'No data')+(grade.endsWith('?')?' · Potential '+grade.slice(0,-1)+': fewer than 20 appearances':'')+(!hero.is_allowed?' · Currently banned':'');
   card.dataset.heroId=hero.id;card.dataset.tier=grade;card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));
   const value=document.createElement('span');value.className='tier-rate';value.textContent=key==='N'?n+'/10':rate.toFixed(1)+'%';card.append(value);
   const gradeLabel=document.createElement('span');gradeLabel.className='tier-grade';gradeLabel.textContent=key==='Doom'?'DOOM':grade;card.append(gradeLabel);
   card.onclick=()=>showTierHero(item);content.append(card);
  }
 }
 for(const key of ['S','A','B','C','Doom']){
  const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');
  const label=document.createElement('div');label.className='tier-label';label.textContent=key;
  const content=document.createElement('div');content.className='tier-content';fill(content,key);
  if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}
  row.append(label,content);root.append(row);
 }
 const more=document.createElement('details');more.className='tier-no-data';
 const summary=document.createElement('summary');summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances';
 const content=document.createElement('div');content.className='tier-content';fill(content,'N');more.append(summary,content);root.append(more);
};
const doomStyle=document.createElement('style');doomStyle.textContent='.tier-row.tier-Doom .tier-label,.tier-row.tier-Doom .tier-grade{color:#ff7987}.tier-row.tier-Doom .tier-label{border-color:#ff798780;background:#ff798712}';document.head.append(doomStyle);
})();