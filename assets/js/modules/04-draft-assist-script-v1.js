(function(){
'use strict';
if(document.getElementById('draftAssist'))return;
const teams=document.querySelector('#page-entry .teams')||document.querySelector('.teams');if(!teams)return;
const root=document.createElement('section');root.id='draftAssist';root.setAttribute('aria-label','Draft Assistant');
root.innerHTML='<label class="da-toggle"><input type="checkbox" id="daEnabled"> Draft Assistant</label><div id="daBody" hidden><div id="daScope" class="da-info"></div><div id="daOverallS"></div><p class="da-info">Top picks use Overall priority and results. Counters respond to the opponent’s latest pick. Arena positioning is not evaluated.</p><p class="da-info" id="daStatus" role="status" aria-live="polite"></p><div class="da-columns"></div><div class="da-actions"><button type="button" id="daRestore">Restore hidden heroes</button><button type="button" id="daRefresh">Refresh suggestions</button></div></div>';
teams.before(root);
for(const p of document.querySelectorAll('#helpDialog p')){
 p.textContent=p.textContent.replace('overall, on the selected map, together with','overall, together with').replace('By default suggestions use all maps. Switch to Selected map to use only the map of this match.','Suggestions always use all maps together. Changing the match map does not change suggestion data. Arena positioning is not evaluated.');
}
const get=id=>document.getElementById(id);
const state={data:null,matchups:null,request:0,enabled:false,hidden:new Set(),limits:{BLUE:8,RED:8},cache:new Map()};
const parts={};
for(const side of ['BLUE','RED']){const box=document.createElement('div');box.className='da-side'+(side==='RED'?' da-red':'');const title=document.createElement('h3');title.textContent=side+' — next picks';const list=document.createElement('div');list.className='da-candidates';const note=document.createElement('p');note.className='da-info';const actions=document.createElement('div');actions.className='da-actions';const more=document.createElement('button');more.type='button';more.textContent='More';more.onclick=()=>{state.limits[side]+=8;render()};actions.append(more);box.append(title,note,list,actions);root.querySelector('.da-columns').append(box);parts[side]={title,list,note,more};}

let overallSData=null;let overallStarted=false;const snapshotScopes=new Set();
const MIN_SAMPLE=3;
const TOP_MIN_APPEARANCES=20;
const TOP_MIN_RATE=.55;
function wilson(w,n){
 n=Math.max(0,Number(n)||0);w=Math.max(0,Math.min(n,Number(w)||0));
 if(!n)return 0;
 const z=1.959963984540054,p=w/n,d=1+z*z/n;
 const centre=(p+z*z/(2*n))/d;
 const margin=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;
 return Math.max(0,centre-margin);
}
function metric(row){
 const n=Math.max(0,Number(row?.appearances)||0);
 const w=Math.max(0,Math.min(n,Number(row?.wins)||0));
 return {appearances:n,wins:w,rate:n?w/n:0,confidence:wilson(w,n)};
}
function pairKey(a,b){return [a,b].sort((x,y)=>x.localeCompare(y,'en')).join('||');}
async function loadOverallS(force=false){
 if(!state.enabled||overallStarted)return;overallStarted=true;const epoch=window.TrackerSnapshot1323.epoch;
 const wrap=get('daOverallS');if(!wrap)return;
 {wrap.textContent='S Overall — loading…';try{const data=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:false});if(!state.enabled||epoch!==window.TrackerSnapshot1323.epoch)return;if(!Array.isArray(data?.heroes))throw Error('Invalid tier data');overallSData=data;}catch(error){if(!state.enabled||epoch!==window.TrackerSnapshot1323.epoch)return;wrap.textContent='S Overall unavailable: '+error.message+' · reopen Assistant to retry';return;}}
 wrap.replaceChildren();const heading=document.createElement('div');heading.className='da-s-title';heading.textContent='S-tier eligible heroes · Overall';wrap.append(heading);
 const row=document.createElement('div');row.className='da-s-row';wrap.append(row);
 const results=new Map(overallSData.heroes.map(x=>[x.hero_id,x]));
 const items=config.heroes.filter(h=>h.is_allowed).map(h=>({h,r:results.get(h.id)})).filter(x=>{const n=Number(x.r?.appearances)||0;const w=Number(x.r?.wins)||0;return tierBucket(n?100*w/n:0,n)==='S';}).sort((a,b)=>Number(b.r.wins)/Number(b.r.appearances)-Number(a.r.wins)/Number(a.r.appearances)||Number(b.r.appearances)-Number(a.r.appearances));
 for(const {h,r} of items){const card=document.createElement('span');card.className='da-s-hero';card.title=h.name+' — '+(100*Number(r.wins)/Number(r.appearances)).toFixed(1)+'% · '+r.appearances+' appearances';const img=document.createElement('img');img.src=h.portrait_url||BASE+encodeURIComponent(h.name)+'.png';img.alt='';img.loading='lazy';const label=document.createElement('span');label.textContent=h.name;card.append(img,label);row.append(card);}
 if(!items.length){row.textContent='No eligible heroes meet the S-tier criteria (>85% team win rate, at least 10 appearances).';}
}

function availableHeroes(side){
 const used=new Set([...lineup.BLUE,...lineup.RED].filter(Boolean));
 return config.heroes.filter(h=>h.is_allowed&&!used.has(h.id)&&!state.hidden.has(h.id));
}
function heroContext(side,h){
 const friends=lineup[side].filter(Boolean);
 const opponents=lineup[side==='BLUE'?'RED':'BLUE'].filter(Boolean);
 const heroStats=new Map((state.data?.heroes||[]).map(x=>[x.hero_id,x]));
 const duoStats=new Map((state.data?.duos||[]).map(x=>[pairKey(x.hero_1_id,x.hero_2_id),x]));
 const base=metric(heroStats.get(h.id));
 const pairs=friends.map(id=>({id,row:duoStats.get(pairKey(id,h.id))})).filter(x=>Number(x.row?.appearances)>0);
 const duoConfidence=pairs.length?pairs.reduce((sum,x)=>sum+metric(x.row).confidence,0)/pairs.length:base.confidence;
 return {base,pairs,duoConfidence,opponents};
}
function topPicks(side){
 const items=availableHeroes(side).map(h=>{
  const context=heroContext(side,h);
  return {hero:h,...context};
 });
 const qualified=items.filter(x=>x.base.appearances>=TOP_MIN_APPEARANCES&&x.base.rate>=TOP_MIN_RATE);
 qualified.sort((a,b)=>b.base.appearances-a.base.appearances||b.duoConfidence-a.duoConfidence||b.base.confidence-a.base.confidence||a.hero.name.localeCompare(b.hero.name));
 if(qualified.length>=state.limits[side])return qualified.slice(0,state.limits[side]);
 const fallback=items.filter(x=>!qualified.includes(x)).sort((a,b)=>b.base.confidence-a.base.confidence||b.base.appearances-a.base.appearances||a.hero.name.localeCompare(b.hero.name));
 return [...qualified,...fallback].slice(0,state.limits[side]);
}
function counterPicks(side){
 const opponents=lineup[side==='BLUE'?'RED':'BLUE'].filter(Boolean);
 const lastOpponent=opponents[opponents.length-1];
 if(!lastOpponent||!state.matchups)return {opponent:lastOpponent,items:[]};
 const rows=state.matchups.get(lastOpponent);
 if(!rows)return {opponent:lastOpponent,items:[]};
 const items=availableHeroes(side).map(h=>({hero:h,row:rows.get(h.id)})).filter(x=>Number(x.row?.appearances)>=MIN_SAMPLE).sort((a,b)=>metric(b.row).confidence-metric(a.row).confidence||metric(b.row).appearances-metric(a.row).appearances||a.hero.name.localeCompare(b.hero.name)).slice(0,3);
 return {opponent:lastOpponent,items};
}
function refreshUsedState(){
 const used=new Set([...lineup.BLUE,...lineup.RED].filter(Boolean));
 document.querySelectorAll('#heroes .hero').forEach(btn=>{
  const name=btn.getAttribute('aria-label');
  const h=config.heroes.find(x=>x.name===name);
  if(!h)return;
  const isUsed=used.has(h.id);
  btn.classList.toggle('used',isUsed);
  btn.disabled=isUsed;
  btn.draggable=!isUsed;
  btn.title=isUsed?h.name+' — already drafted':h.name;
 });
}
function cardFor(item,side,label){
 const h=item.hero,card=document.createElement('div');card.className='da-card';
 const button=document.createElement('button');button.type='button';button.className='da-candidate';button.disabled=lineup[side].every(Boolean)||onlineBusy;
 const strength=Math.max(.15,Math.min(.9,(item.base.confidence-.25)*1.6));
 button.style.background=side==='BLUE'?`rgba(28,104,172,${strength})`:`rgba(159,45,63,${strength})`;
 const rankLabel=document.createElement('span');rankLabel.className='da-rank';rankLabel.textContent=label;button.append(rankLabel);
 const image=document.createElement('img');image.src=h.portrait_url||BASE+encodeURIComponent(h.name)+'.png';image.alt='';image.loading='lazy';image.onerror=()=>{image.hidden=true};button.append(image);
 const name=document.createElement('span');name.className='da-name';name.textContent=h.name;button.append(name);
 const samples=document.createElement('small');samples.textContent=item.base.appearances+' picks';button.append(samples);
 const details=['Overall appearances: '+item.base.appearances,'Overall wins: '+item.base.wins+'/'+item.base.appearances,...item.pairs.map(x=>(heroById(x.id)?.name||x.id)+' + '+h.name+': '+x.row.wins+'/'+x.row.appearances+' wins'),'Top picks prioritise frequently drafted heroes with a reliable Overall result.'];
 button.title=details.join('\n');button.setAttribute('aria-label','Pick '+h.name+' for '+side);
 button.draggable=!lineup[side].every(Boolean)&&!onlineBusy;image.draggable=false;
 button.ondragstart=event=>{if(onlineBusy||lineup[side].every(Boolean)){event.preventDefault();return;}startDrag(event,{kind:'hero',id:h.id},button);};
 button.ondragend=()=>finishDrag();
 button.onclick=()=>{if(Date.now()<blockClickUntil||onlineBusy||lineup[side].every(Boolean))return;const index=active.side===side&&!lineup[side][active.index]?active.index:lineup[side].findIndex(x=>!x);if(index<0)return;active={side,index};choose(h.id);refreshUsedState();render();};
 const hide=document.createElement('button');hide.type='button';hide.className='da-hide';hide.textContent='×';hide.title='Hide '+h.name+' for this draft (both lists)';hide.setAttribute('aria-label',hide.title);hide.onclick=()=>{state.hidden.add(h.id);render()};
 card.append(button,hide);
 return card;
}
function counterCard(item,side,label,opponentId){
 const h=item.hero,card=document.createElement('div');card.className='da-card';
 const button=document.createElement('button');button.type='button';button.className='da-candidate';button.disabled=lineup[side].every(Boolean)||onlineBusy;
 const strength=Math.max(.15,Math.min(.9,(metric(item.row).confidence-.25)*1.6));
 button.style.background=side==='BLUE'?`rgba(28,104,172,${strength})`:`rgba(159,45,63,${strength})`;
 const rankLabel=document.createElement('span');rankLabel.className='da-rank';rankLabel.textContent=label;button.append(rankLabel);
 const image=document.createElement('img');image.src=h.portrait_url||BASE+encodeURIComponent(h.name)+'.png';image.alt='';image.loading='lazy';image.onerror=()=>{image.hidden=true};button.append(image);
 const name=document.createElement('span');name.className='da-name';name.textContent=h.name;button.append(name);
 const samples=document.createElement('small');samples.textContent=item.row.wins+'/'+item.row.appearances+' vs '+(heroById(opponentId)?.name||opponentId);button.append(samples);
 const details=['vs '+(heroById(opponentId)?.name||opponentId)+': '+item.row.wins+'/'+item.row.appearances+' wins','Counter ranking uses the Wilson lower bound with at least '+MIN_SAMPLE+' matchups.','Counter picks are separate from Top picks.'];
 button.title=details.join('\n');button.setAttribute('aria-label','Pick '+h.name+' against '+(heroById(opponentId)?.name||opponentId));
 button.draggable=!lineup[side].every(Boolean)&&!onlineBusy;image.draggable=false;
 button.ondragstart=event=>{if(onlineBusy||lineup[side].every(Boolean)){event.preventDefault();return;}startDrag(event,{kind:'hero',id:h.id},button);};
 button.ondragend=()=>finishDrag();
 button.onclick=()=>{if(Date.now()<blockClickUntil||onlineBusy||lineup[side].every(Boolean))return;const index=active.side===side&&!lineup[side][active.index]?active.index:lineup[side].findIndex(x=>!x);if(index<0)return;active={side,index};choose(h.id);refreshUsedState();render();};
 const hide=document.createElement('button');hide.type='button';hide.className='da-hide';hide.textContent='×';hide.title='Hide '+h.name+' for this draft (both lists)';hide.setAttribute('aria-label',hide.title);hide.onclick=()=>{state.hidden.add(h.id);render()};
 card.append(button,hide);
 return card;
}
function sectionHeading(text){const heading=document.createElement('div');heading.className='da-section-title';heading.textContent=text;return heading;}
function render(){
 if(!state.enabled)return;
 for(const side of ['BLUE','RED']){
  const p=parts[side];p.list.replaceChildren();const full=lineup[side].every(Boolean);
  const top=topPicks(side);const counters=counterPicks(side);
  p.title.textContent=side+' — '+(full?'team complete':'next picks');
  p.note.textContent=full?'Remove a hero to select a replacement.':(state.data?'Top picks and opponent counters — check your draft pool.':'Statistics unavailable. Unranked alternatives only.');
  p.list.append(sectionHeading('TOP PICKS'));
  top.forEach((item,index)=>p.list.append(cardFor(item,side,'#'+(index+1))));
  if(counters.opponent){
   p.list.append(sectionHeading('COUNTERS: '+(heroById(counters.opponent)?.name||counters.opponent)));
   if(counters.items.length){
    counters.items.forEach((item,index)=>p.list.append(counterCard(item,side,'C'+(index+1),counters.opponent)));
   }else{
    const empty=document.createElement('p');empty.className='da-info';empty.textContent=state.matchups?'No reliable counter data yet (minimum '+MIN_SAMPLE+' matchups).':'Opponent matchups unavailable.';p.list.append(empty);
   }
  }
  p.more.hidden=top.length>=state.limits[side];p.more.disabled=onlineBusy;
  if(!top.length){p.note.textContent='No top picks available. Restore hidden heroes or check the catalog.';}
 }
}
async function load(force=false){
 if(!state.enabled)return;const key='__all__';
 if(snapshotScopes.has(key)){render();return;}snapshotScopes.add(key);
 const request=++state.request;state.key=key;
 const title='Overall — all maps in this event';
 get('daScope').textContent='Suggestions: '+title+' · loading…';

 state.data=null;state.matchups=null;get('daStatus').textContent='Loading suggestions for '+title+'…';render();
 try{
  const stats=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:true});
  if(request!==state.request||!state.enabled)return;
  if(!Array.isArray(stats?.heroes)||!Array.isArray(stats?.duos))throw Error('Invalid statistics response');
  state.data=stats;
  render();
  try{
   const matchupRows=await rpc('ss_get_matchups',{p_theme_id:null,p_exclude_mirrors:true});
   if(request!==state.request||!state.enabled)return;
   if(Array.isArray(matchupRows)){
    const matchups=new Map();
    for(const row of matchupRows){
     const candidate=row.candidate_id,opponent=row.opponent_id;
     if(!matchups.has(opponent))matchups.set(opponent,new Map());
     matchups.get(opponent).set(candidate,metric(row));
    }
    state.matchups=matchups;
   }
  }catch(matchupError){
   if(request!==state.request||!state.enabled)return;
   state.matchups=null;
   console.warn('Assistant matchups unavailable:',matchupError);
  }
  get('daScope').textContent='Suggestions: '+title+' · calculated '+(stats.generated_at?new Date(stats.generated_at).toLocaleTimeString():'time unavailable');
  get('daStatus').textContent=title+' · '+(Number(stats.summary?.approved_matches)||0)+' approved matches · mirrors excluded by category · server cache up to 5 minutes.'+(state.matchups?'':' · Opponent matchups unavailable.');
  render();
 }catch(error){if(request!==state.request||!state.enabled)return;state.data=null;state.matchups=null;get('daScope').textContent='Suggestions: '+title+' · data unavailable';get('daStatus').textContent='Suggestions unavailable: '+error.message+'. Unranked alternatives shown; normal drafting still works.';render();}
}
get('daEnabled').onchange=()=>{state.enabled=get('daEnabled').checked;get('daBody').hidden=!state.enabled;document.body.classList.toggle('da-expanded',state.enabled);if(state.enabled){snapshotScopes.clear();overallStarted=false;window.TrackerSnapshot1323.begin();load();loadOverallS();window.dispatchEvent(new Event('tracker:assistant-session-started'));}else{state.request++;window.TrackerSnapshot1323.end();}};
get('daRestore').onclick=()=>{state.hidden.clear();state.limits={BLUE:8,RED:8};render()};get('daRefresh').hidden=true;get('daRefresh').onclick=()=>{};

window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved){state.cache.clear();}else render();});
// Session snapshot: no periodic Assistant data reload.
// Returning to the tab preserves the current draft snapshot.

let lastDraft='';window.addEventListener('tracker:draft-changed',()=>{const draft=JSON.stringify(lineup);if(draft===lastDraft)return;lastDraft=draft;render();});
window.addEventListener('tracker:draft-reset',()=>{state.hidden.clear();state.limits={BLUE:8,RED:8};});
window.addEventListener('tracker:catalog-changed',()=>{if(state.enabled)render();});
})();