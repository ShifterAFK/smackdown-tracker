(function(){
'use strict';
if(window.TrackerTransparentTiers)return;
const get=id=>document.getElementById(id);
function values(row){const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Math.min(n,Number(row?.wins)||0));return {n,wins,rate:n?100*wins/n:0};}
function entries(data){const byId=new Map((data?.heroes||[]).map(r=>[r.hero_id,r]));return config.heroes.map(hero=>({hero,...values(byId.get(hero.id))}));}
function wilson(n,wins){if(!n)return 0;const p=wins/n,z=1.96;const denom=1+z*z/n;const center=p+z*z/(2*n);const margin=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n));return (center-margin)/denom;}
function compare(a,b){return b.wilson-a.wilson||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en')||a.hero.id.localeCompare(b.hero.id);}
function decorateTier(items,key){
 const ranked=items.slice().sort((a,b)=>(Number(b.n>=30)-Number(a.n>=30))||compare(a,b));
 const established=ranked.filter(x=>x.n>=30);
 return ranked.map((item,index)=>{
  let label=key+'?';
  if(item.n>=30){
   const position=established.findIndex(x=>x.hero.id===item.hero.id);
   label=position===0?key+'+':position===established.length-1&&established.length>1?key+'-':key;
  }
  return {item,label};
 });
}
function buildTiers(data){
 const items=entries(data).map(x=>({...x,wilson:wilson(x.n,x.wins)}));
 const sPool=items.filter(x=>x.n>=10&&x.rate>=70);
 const sList=decorateTier(sPool.slice().sort(compare).slice(0,8),'S');
 const sIds=new Set(sList.map(x=>x.item.hero.id));
 const buckets={A:[],B:[],C:[],D:[],N:[]};
 for(const item of items){
  if(sIds.has(item.hero.id))continue;
  const key=item.n<10?'N':item.n>=20&&item.rate<40?'D':item.rate>=60?'A':item.rate>=50?'B':'C';
  buckets[key].push(item);
 }
 return {sList,buckets};
}
function topIds(data){return new Set(buildTiers(data).sList.map(x=>x.item.hero.id));}
const legend='S: up to 8 heroes with 70%+ raw win rate and at least 10 appearances. A: 60%+ | B: 50-<60% | D: below 40% with at least 20 appearances | C: remaining results below 50%. Wilson ranks heroes within each tier. In every tier, the first hero with 30+ appearances gets +, the last established hero gets -, and heroes with 10-29 appearances get ? and are placed at the end. Heroes with fewer than 10 appearances are preliminary.';
const style=document.createElement('style');style.textContent='#tierRows .tier-hero{height:auto!important;min-height:100px;display:flex;flex-direction:column;align-items:center;gap:3px}#tierRows .tier-rate{position:static!important;display:block}.tier-tag{font-size:11px;font-weight:700;color:var(--accent,#c9a227)}.tier-samples{display:block;font-size:10px;color:var(--muted);white-space:nowrap}.tier-map-table{width:100%;border-collapse:collapse;font-size:12px}.tier-map-table th,.tier-map-table td{padding:8px 5px;text-align:left;border-bottom:1px solid #77887740}.tier-map-scroll{overflow-x:auto}';document.head.append(style);
const about=document.querySelector('.tier-about p');if(about)about.textContent=legend;
const caption=document.querySelector('.tier-header .caption');if(caption)caption.textContent='Recorded team results | S: top 8 by Wilson (70%+ win rate) | + / ? / - indicate tier position and sample size';
const explanation=document.createElement('p');explanation.className='caption';explanation.textContent=legend;get('tierRows').before(explanation);
function makeCard(item,label){
 const {hero,n,rate}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');card.dataset.heroId=hero.id;
 card.title=hero.name+' — '+label+' — '+(n?rate.toFixed(1)+'% · '+n+' appearances':'No data')+(!hero.is_allowed?' · Currently banned':'');card.setAttribute('aria-label',card.title);card.append(portrait(hero));
 const value=document.createElement('span');value.className='tier-rate';value.textContent=n?rate.toFixed(1)+'%':'No data';
 const tag=document.createElement('span');tag.className='tier-tag';tag.textContent=label;
 const sample=document.createElement('small');sample.className='tier-samples';sample.textContent=n+' appearances';
 card.append(value,tag,sample);card.onclick=()=>showTierHero(item);return card;
}
renderTiers=function(){
 const root=get('tierRows');root.replaceChildren();if(!tierData)return;
 const {sList,buckets}=buildTiers(tierData);
 const sRow=document.createElement('section');sRow.className='tier-row tier-S';
 const sLabel=document.createElement('div');sLabel.className='tier-label';sLabel.textContent='S';
 const sContent=document.createElement('div');sContent.className='tier-content';
 for(const entry of sList)sContent.append(makeCard(entry.item,entry.label));
 if(!sList.length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';sContent.append(empty);}
 sRow.append(sLabel,sContent);root.append(sRow);
 for(const key of ['A','B','C','D']){
  const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');
  const label=document.createElement('div');label.className='tier-label';label.textContent=key;
  const content=document.createElement('div');content.className='tier-content';
  const ranked=decorateTier(buckets[key],key);
  for(const entry of ranked)content.append(makeCard(entry.item,entry.label));
  if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}
  row.append(label,content);root.append(row);
 }
 const more=document.createElement('details');more.className='tier-no-data';
 const summary=document.createElement('summary');summary.textContent='Preliminary results / no data · '+buckets.N.length+' heroes · fewer than 10 appearances';
 const content=document.createElement('div');content.className='tier-content';
 buckets.N.sort((a,b)=>b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));
 for(const item of buckets.N)content.append(makeCard(item,'N'));
 more.append(summary,content);root.append(more);
};
let detailRequest=0;
function tierLabel(data,heroId){
 const {sList,buckets}=buildTiers(data);
 const inS=sList.find(x=>x.item.hero.id===heroId);
 if(inS)return inS.label;
 for(const key of ['A','B','C','D']){
  const entry=decorateTier(buckets[key],key).find(x=>x.item.hero.id===heroId);
  if(entry)return entry.label;
 }
 return 'N';
}
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
  else{const v=values(result.data.heroes.find(r=>r.hero_id===hero.id));cells=[result.scope.name,!v.n?'No data':tierLabel(result.data,hero.id),v.n?v.rate.toFixed(1)+'%':'—',v.n?v.wins+' / '+(v.n-v.wins):'—',String(v.n),result.data.generated_at?new Date(result.data.generated_at).toLocaleString():'Unknown'];}
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
 const {sList}=buildTiers(overallData);
 const items=sList.map(x=>x.item).filter(x=>x.hero.is_allowed);
 const signature=JSON.stringify([overallData.generated_at,items.map(x=>[x.hero.id,x.wins,x.n,x.hero.portrait_url])]);if(row.dataset.topFive===signature)return;
 row.dataset.topFive=signature;row.replaceChildren();
 const title=wrap.querySelector('.da-s-title');if(title)title.textContent='S Overall — top 8 (S+ / S? / S-)';
 for(const {hero,n,rate} of items){const card=document.createElement('span');card.className='da-s-hero';card.title=hero.name+' — '+rate.toFixed(1)+'% · '+n+' appearances';const img=document.createElement('img');img.src=hero.portrait_url||'';img.alt='';img.loading='lazy';const label=document.createElement('span');label.textContent=hero.name;card.append(img,label);row.append(card);}
 if(!items.length)row.textContent='No allowed heroes in the Overall S top eight (70%+ win rate, at least 10 appearances).';
}
const sbox=get('daOverallS');if(sbox)new MutationObserver(paintS).observe(sbox,{childList:true,subtree:true});window.addEventListener('tracker:catalog-changed',()=>{paintS();});
renderTiers();window.TrackerTransparentTiers={version:'1.3.42'};
})();