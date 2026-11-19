// Module: tier-side-adjusted-v2
(function(){
'use strict';
const get=id=>document.getElementById(id);
let data=null,loading=false,error='';
function gradeFor(key,count){
 if(key==='S')return count<1?'S':count<2?'SSS':count<3?'SS':count<4?'S+':count===4?'S':'S-';
 return count<2?key+'+':count<4?key+'+':key+'-';
}
async function load(){if(loading)return;loading=true;const status=get('tierStatusSide');if(status)status.textContent='Loading side statistics…';try{const d=await rpc('ss_get_side_stats',{p_theme_id:null,p_exclude_mirrors:false});if(!Array.isArray(d))throw Error('Invalid side statistics response');data=d;error='';}catch(e){data=null;error=e.message;}finally{loading=false;render();if(status)status.textContent=data?('Side statistics loaded.'):('Side statistics unavailable: '+error);}}
function render(){const root=get('tierRowsSide');if(!root)return;root.replaceChildren();if(!data){const p=document.createElement('p');p.className='tier-wait';p.textContent=loading?'Loading side statistics…':'Side statistics unavailable: '+error;root.append(p);return;}
 const rows=new Map(data.map(r=>[r.hero_id,r]));
 let blueApps=0,blueWins=0,redApps=0,redWins=0;
 for(const r of data){blueApps+=Number(r.blue_appearances)||0;blueWins+=Number(r.blue_wins)||0;redApps+=Number(r.red_appearances)||0;redWins+=Number(r.red_wins)||0;}
 const blueAvg=blueApps?100*blueWins/blueApps:50,redAvg=redApps?100*redWins/redApps:50;
 const items=config.heroes.map(hero=>{const r=rows.get(hero.id)||{};const bn=Math.max(0,Number(r.blue_appearances)||0),bw=Math.max(0,Math.min(bn,Number(r.blue_wins)||0)),rn=Math.max(0,Number(r.red_appearances)||0),rw=Math.max(0,Math.min(rn,Number(r.red_wins)||0));const bRate=bn?100*bw/bn:0,rRate=rn?100*rw/rn:0;const n=bn+rn;const adj=0.5*((bRate-blueAvg)+(rRate-redAvg));return {hero,n,bn,rn,bRate,rRate,adj};});
 const eligible=items.filter(i=>i.n>=20&&i.bn>=5&&i.rn>=5).sort((a,b)=>b.adj-a.adj||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 const sSet=new Set(eligible.map(i=>i.hero.id));
 const buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const item of items){let key;if(item.n<10||item.bn<1||item.rn<1)key='N';else if(sSet.has(item.hero.id))key='S';else if(item.adj>=3)key=item.n>=20?'A':'A?';else if(item.adj>=-3)key=item.n>=20?'B':'B?';else key=item.n>=20?'C':'C?';buckets[key].push(item);}
 function fill(content,key){buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):b.adj-a.adj||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));let confirmed=0;for(const item of buckets[key]){const {hero,n,adj,bRate,rRate,bn,rn}=item;const isConfirmed=key==='S'||(n>=20&&bn>=5&&rn>=5);const grade=isConfirmed?gradeFor(key,confirmed++):key+'?';const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');const description=hero.name+' — adjusted '+(adj>=0?'+':'')+adj.toFixed(1)+'% · BLUE '+bRate.toFixed(1)+'% ('+bn+') · RED '+rRate.toFixed(1)+'% ('+rn+') — '+grade+(!hero.is_allowed?' · Currently banned':'');card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));const value=document.createElement('span');value.className='tier-rate';value.textContent=(adj>=0?'+':'')+adj.toFixed(1)+'%';card.append(value);const label=document.createElement('span');label.className='tier-grade';label.textContent=grade;card.append(label);content.append(card);}}
 for(const key of ['S','A','B','C']){const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');const label=document.createElement('div');label.className='tier-label';label.textContent=key;const content=document.createElement('div');content.className='tier-content';fill(content,key);if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}row.append(label,content);root.append(row);}
 const more=document.createElement('details');more.className='tier-no-data';const summary=document.createElement('summary');summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances or no data on one side';const content=document.createElement('div');content.className='tier-content';more.append(summary,content);let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
}
const tab=document.querySelector('.tab[data-page="tiers-side"]');
const page=get('page-tiers-side');
function activate(){if(!tab||!page)return;for(const node of document.querySelectorAll('[id^="page-"]'))node.classList.toggle('hidden',node!==page);document.querySelectorAll('.tabs .tab').forEach(b=>b.classList.toggle('active',b===tab));if(!data)load();}
if(tab&&page)tab.addEventListener('click',activate);
get('refreshTiersSide')?.addEventListener('click',load);
window.addEventListener('tracker:catalog-changed',()=>{if(page&&!page.classList.contains('hidden'))load();});
if(page&&!page.classList.contains('hidden'))load();
})();