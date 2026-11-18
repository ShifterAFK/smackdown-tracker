// Module: tier-top5-rule-v2
(function(){
'use strict';
if(typeof renderTiers!=='function')return;
let firstPickData=null,loading=false,error='';
function wilson(w,n){if(!n)return 0;const z=1.959963984540054,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,r=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return Math.max(0,c-r)}
async function loadFirstPicks(){if(loading)return;loading=true;try{const data=await rpc('ss_get_first_pick_stats',{});if(!Array.isArray(data))throw Error('Invalid first-pick statistics');firstPickData=data;renderTiers();}catch(e){error=e.message;renderTiers();}finally{loading=false}}
renderTiers=function(){
 const root=$('tierRows');root.replaceChildren();
 if(!firstPickData){const p=document.createElement('p');p.className='tier-wait';p.textContent=loading?'Loading first-pick results…':'First-pick results unavailable: '+error;root.append(p);return;}
 const byId=new Map(firstPickData.map(row=>[row.hero_id,row]));
 const items=config.heroes.map(hero=>{const row=byId.get(hero.id)||{};const n=Math.max(0,Number(row.first_pick_blue_appearances||0)+Number(row.first_pick_red_appearances||0));const wins=Math.max(0,Number(row.first_pick_blue_wins||0)+Number(row.first_pick_red_wins||0));const rate=n?Math.min(100,100*wins/n):0;return {hero,n,wins,rate,score:wilson(wins,n)};});
 const ranked=items.filter(item=>item.n>=10).sort((a,b)=>b.score-a.score||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 const sSet=new Set(ranked.slice(0,5).map(item=>item.hero.id));
 const buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const item of items){const key=item.n<10?'N':sSet.has(item.hero.id)?'S':item.score>=0.55?'A':item.score>=0.45?'B':'C';buckets[key].push(item);}
 if(!ranked.length){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked first picks yet — more match results are needed.';root.append(p);}
 function fill(content,key){buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):b.score-a.score||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));for(const item of buckets[key]){const {hero,n,rate}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');const description=hero.name+' — '+(n?rate.toFixed(1)+'% · '+n+' first picks':'No first-pick data')+(!hero.is_allowed?' · Currently banned':'');card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));const value=document.createElement('span');value.className='tier-rate';value.textContent=key==='N'?n+'/10':rate.toFixed(1)+'%';card.append(value);card.onclick=()=>showTierHero(item);content.append(card);}}
 for(const key of ['S','A','B','C']){const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');const label=document.createElement('div');label.className='tier-label';label.textContent=key;const content=document.createElement('div');content.className='tier-content';fill(content,key);if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}row.append(label,content);root.append(row);}
 const more=document.createElement('details');more.className='tier-no-data';const summary=document.createElement('summary');summary.textContent='No first-pick ranking · '+buckets.N.length+' heroes · fewer than 10 first picks';const content=document.createElement('div');content.className='tier-content';more.append(summary,content);let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
};
loadFirstPicks();
window.addEventListener('tracker:catalog-changed',()=>{if(firstPickData)renderTiers();});
})();