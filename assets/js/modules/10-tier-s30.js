// Module: tier-s30-rule-v2
(function(){
'use strict';
const get=id=>document.getElementById(id);
let data=null,loading=false,error='';
function wilson(w,n){if(!n)return 0;const z=1.959963984540054,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,r=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return Math.max(0,c-r)}
async function load(){if(loading)return;loading=true;const status=get('tierStatus30');if(status)status.textContent='Loading statistics…';try{const d=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:false});if(!Array.isArray(d?.heroes))throw Error('Invalid statistics response');data=d;error='';}catch(e){data=null;error=e.message;}finally{loading=false;render();if(status)status.textContent=data?('Last calculated: '+new Date(data.generated_at).toLocaleString()):('Statistics unavailable: '+error);}}
function render(){const root=get('tierRows30');if(!root)return;root.replaceChildren();if(!data){const p=document.createElement('p');p.className='tier-wait';p.textContent=loading?'Loading statistics…':'Statistics unavailable: '+error;root.append(p);return;}
 const rows=new Map(data.heroes.map(r=>[r.hero_id,r]));
 const items=config.heroes.map(hero=>{const row=rows.get(hero.id)||{};const n=Math.max(0,Number(row.appearances)||0),wins=Math.max(0,Math.min(n,Number(row.wins)||0));const rate=n?100*wins/n:0;return {hero,n,wins,rate,score:wilson(wins,n)};});
 const byScore=(a,b)=>b.score-a.score||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en');
 const sPool=items.filter(i=>i.n>=30&&i.rate>=60).sort(byScore).slice(0,8);
 const sSet=new Set(sPool.map(i=>i.hero.id));
 const aPlus=items.filter(i=>!sSet.has(i.hero.id)&&i.n>=20&&i.rate>=50&&i.rate<60).sort(byScore).slice(0,Math.max(0,8-sPool.length));
 const aPlusSet=new Set(aPlus.map(i=>i.hero.id));
 const buckets={S:[],APLUS:[],A:[],B:[],C:[],N:[]};
 for(const item of items){let key;if(item.n<10)key='N';else if(sSet.has(item.hero.id))key='S';else if(aPlusSet.has(item.hero.id))key='APLUS';else if(item.rate>60)key='A';else if(item.rate>=50)key='B';else key='C';buckets[key].push(item);}
 function fill(content,key){buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):byScore(a,b));for(const item of buckets[key]){const {hero,n,rate}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');const description=hero.name+' — '+(n?rate.toFixed(1)+'% · '+n+' appearances':'No data')+(!hero.is_allowed?' · Currently banned':'');card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));const value=document.createElement('span');value.className='tier-rate';value.textContent=key==='N'?n+'/30':rate.toFixed(1)+'%';card.append(value);if(typeof showTierHero==='function')card.onclick=()=>showTierHero(item);content.append(card);}}
 for(const key of ['S','APLUS','A','B','C']){const row=document.createElement('section');row.className='tier-row tier-'+(key==='APLUS'?'A':key)+(!buckets[key].length?' is-empty':'');const label=document.createElement('div');label.className='tier-label';label.textContent=key==='APLUS'?'A+':key;const content=document.createElement('div');content.className='tier-content';fill(content,key);if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}row.append(label,content);root.append(row);}
 const more=document.createElement('details');more.className='tier-no-data';const summary=document.createElement('summary');summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances';const content=document.createElement('div');content.className='tier-content';more.append(summary,content);let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
}
const tab=document.querySelector('.tab[data-page="tiers30"]');
const page=get('page-tiers30');
function activate(){if(!tab||!page)return;for(const node of document.querySelectorAll('[id^="page-"]'))node.classList.toggle('hidden',node!==page);document.querySelectorAll('.tabs .tab').forEach(b=>b.classList.toggle('active',b===tab));if(!data)load();}
if(tab&&page)tab.addEventListener('click',activate);
get('refreshTiers30')?.addEventListener('click',load);
window.addEventListener('tracker:catalog-changed',()=>{if(page&&!page.classList.contains('hidden'))load();});
if(page&&!page.classList.contains('hidden'))load();
})();