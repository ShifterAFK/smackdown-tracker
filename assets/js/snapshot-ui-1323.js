(function(){
'use strict';
if(window.TrackerSnapshotUI1323)return;
const dialog=document.getElementById('mobileDraft130');
if(dialog)dialog.addEventListener('close',()=>{
 if(document.body.classList.contains('desktop133-enabled'))return;
 const toggle=document.getElementById('daEnabled');
 if(toggle?.checked){toggle.checked=false;toggle.dispatchEvent(new Event('change',{bubbles:true}));}
});
window.TrackerSnapshotUI1323={version:'1.3.23'};
})();

(function(){
'use strict';
const get=id=>document.getElementById(id);
window.tierBucket=function(rate,n){
 if(!Number.isFinite(rate)||!Number.isFinite(n)||n<10)return 'N';
 return rate>=70?'S':rate>=60?'A':rate>=50?'B':'C';
};
const legend='S: >=70% | A: 60-<70% | B: 50-<60% | C: <50%. Minimum 10 appearances in the selected view. Tiers use recorded team win rate only; sample size is shown separately.';
const style=document.createElement('style');
style.textContent='#tierRows .tier-hero{height:auto!important;min-height:100px;display:flex;flex-direction:column;align-items:center;gap:3px}#tierRows .tier-rate{position:static!important;display:block}.tier-samples{display:block;font-size:10px;color:var(--muted);white-space:nowrap}.tier-map-table{width:100%;border-collapse:collapse;font-size:12px}.tier-map-table th,.tier-map-table td{padding:8px 5px;text-align:left;border-bottom:1px solid #77887740}.tier-map-table caption{text-align:left;padding:8px 0;font-weight:600}';
document.head.append(style);
const about=document.querySelector('.tier-about p');if(about)about.textContent=legend;
const caption=document.querySelector('.tier-header .caption');if(caption)caption.textContent='Recorded team results | minimum 10 appearances | click a hero to compare maps';
const explanation=document.createElement('p');explanation.className='caption';explanation.textContent=legend;get('tierRows').before(explanation);
for(const p of document.querySelectorAll('#helpDialog p'))if(p.textContent.includes('S requires more than 85%'))p.textContent=p.textContent.replace('S requires more than 85% team win rate and at least 10 appearances.','S requires at least 70% team win rate and at least 10 appearances.');
const sbox=get('daOverallS');
function fixS(){if(!sbox)return;const row=sbox.querySelector('.da-s-row');if(row&&!row.querySelector('.da-s-hero')&&row.textContent.includes('>85%'))row.textContent='No eligible heroes meet the S-tier criteria (at least 70% team win rate and 10 appearances).';}
if(sbox)new MutationObserver(fixS).observe(sbox,{childList:true,subtree:true});
function values(row){const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Math.min(n,Number(row?.wins)||0));return {n,wins,rate:n?100*wins/n:0};}
const baseRender=renderTiers;
renderTiers=function(){
 baseRender();if(!tierData)return;
 const results=new Map(tierData.heroes.map(r=>[r.hero_id,r]));
 const summary=get('tierRows').querySelector('.tier-no-data>summary');
 if(summary)summary.textContent=summary.textContent.replace('Below ranking threshold','Preliminary results / no data');
 for(const card of get('tierRows').querySelectorAll('.tier-hero')){
  const hero=config.heroes.find(h=>card.title.startsWith(h.name+' — '));if(!hero)continue;
  const v=values(results.get(hero.id));const sample=document.createElement('small');sample.className='tier-samples';sample.textContent=v.n+' appearances';card.append(sample);
 }
};
const tierRoot=get('tierRows');
new MutationObserver(()=>{
 if(!tierData)return;
 const results=new Map(tierData.heroes.map(r=>[r.hero_id,r]));
 for(const card of tierRoot.querySelectorAll('.tier-no-data .tier-hero')){
  if(card.querySelector('.tier-samples'))continue;
  const hero=config.heroes.find(h=>card.title.startsWith(h.name+' — '));if(!hero)continue;
  const v=values(results.get(hero.id)),rate=card.querySelector('.tier-rate');if(rate)rate.textContent=v.n?v.rate.toFixed(1)+'%':'No data';
  const sample=document.createElement('small');sample.className='tier-samples';sample.textContent=v.n?v.n+'/10 to rank':'0 appearances';card.append(sample);
 }
}).observe(tierRoot,{childList:true,subtree:true});
let detailRequest=0;
showTierHero=async function(item){
 const request=++detailRequest,hero=item.hero,dialog=get('tierHeroDialog'),root=get('tierHeroDetail');
 get('tierHeroTitle').textContent=hero.name;root.replaceChildren(portrait(hero));
 const note=document.createElement('p');note.className='caption';note.textContent='Team results, not isolated hero strength. Each map needs 10 appearances for a tier. Fewer appearances are preliminary; missing data is not a loss.';root.append(note);
 const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Loading map comparison...';root.append(status);
 if(!dialog.open)dialog.showModal();
 const scopes=[{id:null,name:'Overall'},...config.themes.map(t=>({id:t.id,name:t.name}))];
 const results=await Promise.all(scopes.map(async scope=>{
  try{const data=await rpc('ss_get_stats',{p_theme_id:scope.id,p_exclude_mirrors:false});if(!Array.isArray(data?.heroes)||!data.summary)throw Error('Invalid statistics response');return {scope,data};}
  catch(error){return {scope,error};}
 }));
 if(request!==detailRequest||!dialog.open)return;
 status.textContent='Cached statistics may lag by up to 5 minutes. Calculation times are shown for each view.';
 const scroll=document.createElement('div');scroll.className='tier-map-scroll';const table=document.createElement('table');table.className='tier-map-table';
 const caption=document.createElement('caption');caption.textContent='Overall and per-map comparison';table.append(caption);
 const head=document.createElement('thead'),tr=document.createElement('tr');for(const text of ['View','Tier','Win rate','W / L','Appearances','Calculated']){const th=document.createElement('th');th.scope='col';th.textContent=text;tr.append(th);}head.append(tr);table.append(head);
 const body=document.createElement('tbody');
 for(const result of results){
  const tr=document.createElement('tr');let cells;
  if(result.error)cells=[result.scope.name,'Unavailable','—','—','—','Retry by reopening'];
  else{const v=values(result.data.heroes.find(r=>r.hero_id===hero.id));cells=[result.scope.name,!v.n?'No data':v.n<10?'Preliminary':tierBucket(v.rate,v.n),v.n?v.rate.toFixed(1)+'%':'—',v.n?v.wins+' / '+(v.n-v.wins):'—',String(v.n),result.data.generated_at?new Date(result.data.generated_at).toLocaleString():'Unknown'];}
  for(const text of cells){const td=document.createElement('td');td.textContent=text;tr.append(td);}body.append(tr);
 }
 table.append(body);scroll.append(table);root.append(scroll);
 const available=results.filter(r=>r.scope.id&&r.data&&Number(r.data.summary.approved_matches)>0).length;
 const failed=results.filter(r=>r.scope.id&&r.error).length;
 const coverage=document.createElement('p');coverage.className='caption';coverage.textContent='Maps with recorded matches: '+available+'/'+config.themes.length+(failed?' | '+failed+' map views unavailable':'')+'. Overall sums wins and appearances; it is not an equal-weight average of map percentages.';root.append(coverage);
};
get('tierHeroDialog').addEventListener('close',()=>{detailRequest++;});
renderTiers();
window.TrackerTransparentTiers={version:'1.3.26'};
})();