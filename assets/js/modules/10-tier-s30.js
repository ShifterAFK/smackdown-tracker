(function(){
'use strict';
const get=id=>document.getElementById(id);
let data=null,loading=false,error='';
const style=document.createElement('style');style.textContent='#tierRows30 .tier-hero{display:flex;flex-direction:column;align-items:center;height:auto;gap:4px}#tierRows30 .s30-grade{font-size:11px;color:#e7c66d}#tierRows30 .s30-count{font-size:10px;white-space:nowrap;color:var(--muted,#c0c2b5)}';document.head.append(style);
function wilson(w,n){if(!n)return 0;const z=1.959963984540054,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,r=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return Math.max(0,c-r)}
async function load(){if(loading)return;loading=true;get('tierStatus30').textContent='Loading statistics…';try{const d=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:false});if(!Array.isArray(d?.heroes))throw Error('Invalid statistics response');data=d;error='';}catch(e){data=null;error=e.message;}finally{loading=false;render();get('tierStatus30').textContent=data?'Last calculated: '+new Date(data.generated_at).toLocaleString():'Statistics unavailable: '+error;}}
function render(){
const root=get('tierRows30');if(!root)return;root.replaceChildren();if(!data){root.textContent='Statistics unavailable: '+error;return;}
const rows=new Map(data.heroes.map(r=>[r.hero_id,r]));
const items=config.heroes.map(hero=>{const r=rows.get(hero.id)||{},n=Math.max(0,Number(r.appearances)||0),wins=Math.max(0,Math.min(n,Number(r.wins)||0));return {hero,n,wins,rate:n?100*wins/n:0,score:wilson(wins,n)};});
const cmp=(a,b)=>b.score-a.score||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en');
const best=items.filter(x=>x.n>=30&&x.rate>=60).sort(cmp).slice(0,10);
const grades=new Map(best.map((x,i)=>[x.hero.id,i<2?'SSS':i<4?'SS':i<6?'S+':'S']));
const buckets={S:best,A:[],B:[],C:[],N:[]};
for(const x of items){if(grades.has(x.hero.id))continue;const k=x.n<10?'N':x.rate>=60?'A':x.rate>=50?'B':'C';grades.set(x.hero.id,k==='A'&&x.n<20?'A?':k);buckets[k].push(x);}
const confirmedA=buckets.A.filter(x=>x.n>=20).sort(cmp);confirmedA.slice(0,3).forEach(x=>grades.set(x.hero.id,'A+'));
function fill(content,key){if(key!=='S')buckets[key].sort(key==='N'?(a,b)=>b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):key==='A'?(a,b)=>Number(b.n>=20)-Number(a.n>=20)||cmp(a,b):cmp);for(const x of buckets[key]){const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!x.hero.is_allowed?' banned':'');card.dataset.heroId=x.hero.id;card.dataset.tier=key;const grade=grades.get(x.hero.id);card.title=x.hero.name+' | '+grade+' | '+x.rate.toFixed(1)+'% | '+x.n+' appearances'+(grade==='A?'?' | Potential A: fewer than 20 appearances':'')+(!x.hero.is_allowed?' | Currently banned':'');card.setAttribute('aria-label',card.title);card.append(portrait(x.hero));const rate=document.createElement('span');rate.className='tier-rate';rate.textContent=x.rate.toFixed(1)+'%';const label=document.createElement('span');label.className='s30-grade';label.textContent=grade;const count=document.createElement('small');count.className='s30-count';count.textContent=x.n+' appearances';card.append(rate,label,count);if(typeof showTierHero==='function')card.onclick=()=>showTierHero(x);content.append(card);}}
for(const key of ['S','A','B','C']){const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');const label=document.createElement('div');label.className='tier-label';label.textContent=key;const content=document.createElement('div');content.className='tier-content';fill(content,key);if(!buckets[key].length)content.textContent='—';row.append(label,content);root.append(row);}
const more=document.createElement('details'),summary=document.createElement('summary'),content=document.createElement('div');more.className='tier-no-data';summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances';content.className='tier-content';more.append(summary,content);let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
}
const tab=document.querySelector('.tab[data-page="tiers30"]'),page=get('page-tiers30');
const caption=page?.querySelector('.tier-header .caption');if(caption)caption.textContent='S: up to 10 by Wilson, 30+ appearances and 60%+ wins. Grades: #1-2 SSS, #3-4 SS, #5-6 S+, #7-10 S. No backfill from lower tiers. A row: 60%+ wins; 20+ appearances required for confirmed A, first 3 by Wilson A+, others A. 10-19 appearances: A? (potential). B: 50% to below 60%. C: below 50%. N: fewer than 10 appearances.';
function activate(){if(!tab||!page)return;for(const node of document.querySelectorAll('[id^="page-"]'))node.classList.toggle('hidden',node!==page);document.querySelectorAll('.tabs .tab').forEach(b=>b.classList.toggle('active',b===tab));if(!data)load();}
if(tab&&page)tab.addEventListener('click',activate);
get('refreshTiers30')?.addEventListener('click',load);
window.addEventListener('tracker:catalog-changed',()=>{if(page&&!page.classList.contains('hidden'))load();});
if(page&&!page.classList.contains('hidden'))load();
window.RecordMatchTierSources=window.RecordMatchTierSources||{};
window.RecordMatchTierSources.s30=async function(){while(loading)await new Promise(resolve=>setTimeout(resolve,25));if(!data)await load();else render();if(!data)throw Error(error||'Tier S 30+ data is unavailable.');return get('tierRows30');};
})();