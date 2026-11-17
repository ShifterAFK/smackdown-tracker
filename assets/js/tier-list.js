// tier-list.js — partner-adjusted strength, S = top 8 (min 15 appearances), SSS/SS/S+/S + A+ fill
(function(){
'use strict';
if(window.TrackerTransparentTiers)return;
const get=id=>document.getElementById(id);
window.tierBucket=function(rate,n){if(!Number.isFinite(rate)||!Number.isFinite(n)||n<10)return 'N';return rate>=70?'S':rate>=60?'A':rate>=50?'B':'C';};
function values(row){const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Math.min(n,Number(row?.wins)||0));return {n,wins,rate:n?100*wins/n:0};}
function entries(data){const byId=new Map((data?.heroes||[]).map(r=>[r.hero_id,r]));return config.heroes.map(hero=>({hero,...values(byId.get(hero.id))}));}
function compare(a,b){return b.rate-a.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en')||a.hero.id.localeCompare(b.hero.id);}
function strengthCompare(a,b){return (b.strength||0)-(a.strength||0)||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en')||a.hero.id.localeCompare(b.hero.id);}
function topIds(data){
 const model=window.TrackerStrength?window.TrackerStrength.fit(data):null;
 const items=entries(data).map(item=>({...item,strength:model?model.strength(item.hero.id):0}));
 const sPool=items.filter(x=>x.n>=15&&x.rate>=70).sort(strengthCompare);
 const sSet=new Set(sPool.slice(0,8).map(x=>x.hero.id));
 if(sSet.size<8){
  const fill=items.filter(x=>x.n>=15&&x.rate>=60&&x.rate<70&&!sSet.has(x.hero.id)).sort(strengthCompare).slice(0,8-sSet.size);
  fill.forEach(x=>sSet.add(x.hero.id));
 }
 return sSet;
}
function bucket(item,ids){return ids.has(item.hero.id)?'S':tierBucket(item.rate,item.n);}
const legend='S: up to 8 heroes with at least 15 appearances, ranked by partner-adjusted strength (a hero who keeps winning with many different partners ranks higher than one who only wins in a single duo; small samples are pulled toward average). Heroes with 70%+ win rate are S; if fewer than 8 qualify, remaining slots are filled with the next best A-tier heroes (60-70%, also 15+ appearances) and labeled A+. A: 60% or more. B: 50% or more. C: below 50%. Under 10 appearances a hero is listed as preliminary.';
const style=document.createElement('style');style.textContent='#tierRows .tier-hero{height:auto!important;min-height:100px;display:flex;flex-direction:column;align-items:center;gap:3px}#tierRows .tier-rate{position:static!important;display:block}.tier-samples{display:block;font-size:10px;color:var(--muted);white-space:nowrap}.tier-map-table{width:100%;border-collapse:collapse;font-size:12px}.tier-map-table th,.tier-map-table td{padding:8px 5px;text-align:left;border-bottom:1px solid #77887740}.tier-map-scroll{overflow-x:auto}';document.head.append(style);
const about=document.querySelector('.tier-about p');if(about)about.textContent=legend;
const caption=document.querySelector('.tier-header .caption');if(caption)caption.textContent='Recorded team results | S: up to 8 heroes (min 15 appearances), ranked by partner-adjusted strength; A+ fills remaining slots';
const explanation=document.createElement('p');explanation.className='caption';explanation.textContent=legend;get('tierRows').before(explanation);
for(const p of document.querySelectorAll('#helpDialog p'))if(p.textContent.includes('S requires more than 85%'))p.textContent=p.textContent.replace('S requires more than 85% team win rate and at least 10 appearances.','S contains up to eight Overall heroes with at least 15 appearances, ranked by partner-adjusted strength. Heroes with 70%+ are S; remaining slots are filled with the next best A-tier heroes (60-70%, also 15+ appearances) and labeled A+.');
renderTiers=function(){
 const root=get('tierRows');root.replaceChildren();if(!tierData)return;
 const model=window.TrackerStrength?window.TrackerStrength.fit(tierData):null;
 const ids=topIds(tierData),buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const item of entries(tierData)){item.strength=model?model.strength(item.hero.id):0;buckets[bucket(item,ids)].push(item);}
 function fill(content,key){
  buckets[key].sort(key==='N'?(a,b)=>b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'):key==='S'?strengthCompare:compare);
  let sIndex=0;
  for(const item of buckets[key]){
   const {hero,n,rate}=item,card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');
   card.title=hero.name+' — '+(n?rate.toFixed(1)+'% · '+n+' appearances':'No data')+(!hero.is_allowed?' · Currently banned':'');card.setAttribute('aria-label',card.title);card.append(portrait(hero));
   const value=document.createElement('span');value.className='tier-rate';
   if(key==='S'){
    sIndex++;
    value.textContent=sIndex===1?'SSS':sIndex===2?'SS':sIndex===3?'S+':(rate>=70?'S':'A+');
   }
   else value.textContent=n?rate.toFixed(1)+'%':'No data';
   const sample=document.createElement('small');sample.className='tier-samples';sample.textContent=key==='N'&&n?n+'/10 to rank':n+' appearances';card.append(value,sample);card.onclick=()=>showTierHero(item);content.append(card);
  }
 }
 if(!['S','A','B','C'].some(k=>buckets[k].length)){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked heroes yet — more match results are needed.';root.append(p);}
 for(const key of ['S','A','B','C']){
  const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');const label=document.createElement('div');label.className='tier-label';label.textContent=key;
  const content=document.createElement('div');content.className='tier-content';fill(content,key);if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}row.append(label,content);root.append(row);
 }
 const more=document.createElement('details');more.className='tier-no-data';const summary=document.createElement('summary');summary.textContent='Preliminary results / no data · '+buckets.N.length+' heroes · fewer than 10 appearances';const content=document.createElement('div');content.className='tier-content';more.append(summary,content);let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
};
let detailRequest=0;
showTierHero=async function(item){
 const request=++detailRequest,hero=item.hero,dialog=get('tierHeroDialog'),root=get('tierHeroDetail');get('tierHeroTitle').textContent=hero.name;root.replaceChildren(portrait(hero));
 const note=document.createElement('p');note.className='caption';note.textContent=legend+' Team results do not measure isolated hero strength.';root.append(note);
 const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Loading map comparison...';root.append(status);if(!dialog.open)dialog.showModal();
 const scopes=[{id:null,name:'Overall'},...config.themes.map(t=>({id:t.id,name:t.name}))];
 const results=await Promise.all(scopes.map(async scope=>{try{const data=await rpc('ss_get_stats',{p_theme_id:scope.id,p_exclude_mirrors:false});if(!Array.isArray(data?.heroes)||!data.summary)throw Error('Invalid statistics response');return {scope,data};}catch(error){return {scope,error};}}));
 if(request!==detailRequest||!dialog.open)return;
 status.textContent='Cached statistics may lag by up to 5 minutes. Calculation times are shown for each view.';
 const scroll=document.createElement('div');scroll.className='tier-map-scroll';const table=document.createElement('table');table.className='tier-map-table';const cap=document.createElement('caption');cap.textContent='Overall and per-map comparison';table.append(cap);
 const head=document.createElement('thead'),header=document.createElement('tr');for(const text of ['View','Tier','Win rate','W / L','Appearances','Calculated']){const th=document.createElement('th');th.scope='col';th.textContent=text;header.append(th);}head.append(header);table.append(head);const body=document.createElement('tbody');
 for(const result of results){
  const tr=document.createElement('tr');let cells;
  if(result.error)cells=[result.scope.name,'Unavailable','—','—','—','Retry by reopening'];
  else{const v=values(result.data.heroes.find(r=>r.hero_id===hero.id));cells=[result.scope.name,!v.n?'No data':v.n<10?'Preliminary':bucket({hero,...v},topIds(result.data)),v.n?v.rate.toFixed(1)+'%':'—',v.n?v.wins+' / '+(v.n-v.wins):'—',String(v.n),result.data.generated_at?new Date(result.data.generated_at).toLocaleString():'Unknown'];}
  for(const text of cells){const td=document.createElement('td');td.textContent=text;tr.append(td);}body.append(tr);
 }
 table.append(body);scroll.append(table);root.append(scroll);
 const available=results.filter(r=>r.scope.id&&r.data&&Number(r.data.summary.approved_matches)>0).length,failed=results.filter(r=>r.scope.id&&r.error).length;
 const coverage=document.createElement('p');coverage.className='caption';coverage.textContent='Maps with recorded matches: '+available+'/'+config.themes.length+(failed?' | '+failed+' map views unavailable':'')+'. Overall sums wins and appearances; it is not an equal-weight average of map percentages.';root.append(coverage);
};
get('tierHeroDialog').addEventListener('close',()=>{detailRequest++;});
let overallData=null;
const baseRPC=rpc;
rpc=async function(name,body){const data=await baseRPC(name,body);if(name==='ss_get_stats'&&!body?.p_theme_id&&body?.p_exclude_mirrors===false&&Array.isArray(data?.heroes)){overallData=data;paintS();}return data;};
function paintS(){
 const wrap=get('daOverallS'),row=wrap?.querySelector('.da-s-row');if(!row||!overallData)return;
 const ids=topIds(overallData),items=entries(overallData).filter(x=>ids.has(x.hero.id)&&x.hero.is_allowed);
 const model=window.TrackerStrength?window.TrackerStrength.fit(overallData):null;
 items.forEach(item=>item.strength=model?model.strength(item.hero.id):0);
 items.sort(strengthCompare);
 const signature=JSON.stringify([overallData.generated_at,items.map(x=>[x.hero.id,x.wins,x.n,x.hero.portrait_url])]);if(row.dataset.topFive===signature)return;
 row.dataset.topFive=signature;row.replaceChildren();
 const title=wrap.querySelector('.da-s-title');if(title)title.textContent='S Overall — top 8 by partner-adjusted strength (min 15 appearances, A+ fill)';
 items.forEach((item,index)=>{const {hero,n,rate}=item;const card=document.createElement('span');card.className='da-s-hero';card.title=hero.name+' — '+rate.toFixed(1)+'% · '+n+' appearances';const img=document.createElement('img');img.src=hero.portrait_url||'';img.alt='';img.loading='lazy';const label=document.createElement('span');const tag=index===0?'SSS':index===1?'SS':index===2?'S+':(rate>=70?'S':'A+');label.textContent=tag+' '+hero.name;card.append(img,label);row.append(card);});
 if(!items.length)row.textContent='No heroes with at least 15 appearances yet.';
}
const sbox=get('daOverallS');if(sbox)new MutationObserver(paintS).observe(sbox,{childList:true,subtree:true});window.addEventListener('tracker:catalog-changed',()=>{paintS();});
renderTiers();window.TrackerTransparentTiers={version:'1.3.32'};
})();