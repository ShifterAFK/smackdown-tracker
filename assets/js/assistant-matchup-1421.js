(function(){
'use strict';
if(window.TrackerAssistantMatchup1421)return;
const PROJECT_URL='https://rwnbxhrkjjlfuljhwdpt.supabase.co';
const KEY='sb_publishable_K613s8nvoUQTzIc-BLn2VQ_8kfTLWAm';
const MIN_SAMPLE=3;
const WEIGHTS={hero:.28,duo:.27,map:.20,matchup:.25};
const cache=new Map();
let frame=0,lastKey='';
const root=()=>document.getElementById('draftAssist');
const mapId=()=>document.getElementById('theme')?.value||'';
function heroIdFromCard(card){
 const name=card.querySelector('.da-name')?.textContent?.trim()||'';
 const hero=(window.config?.heroes||[]).find(h=>h.name===name);
 return hero?.id||'';
}
function draftedIds(side){
 const ids=[];
 document.querySelectorAll(side==='RED'?'#slotsRED .slot':'#slotsBLUE .slot').forEach(slot=>{
 const img=slot.querySelector('img');
 const name=slot.querySelector('.name')?.textContent?.trim();
 if(!img||!name||name==='+')return;
 const hero=(window.config?.heroes||[]).find(h=>h.name===name);
 if(hero?.id)ids.push(hero.id);
 });
 return ids;
}
async function rpc(name,body){
 const key=name+JSON.stringify(body);
 if(cache.has(key))return cache.get(key);
 const promise=(async()=>{
 const response=await fetch(`${PROJECT_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});
 if(!response.ok)throw new Error(`${name} failed (${response.status})`);
 return response.json();
 })();
 cache.set(key,promise);
 return promise;
}
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
 return {appearances:n,wins:w,rate:n?100*w/n:0,confidence:wilson(w,n)};
}
function pair(a,b){return [a,b].sort((x,y)=>x.localeCompare(y,'en')).join('||');}
async function loadStats(map){
 const key=map||'overall';
 if(cache.has(`stats:${key}`))return cache.get(`stats:${key}`);
 const promise=(async()=>{
 const data=await rpc('ss_get_stats',{p_theme_id:map||null,p_exclude_mirrors:false});
 if(!Array.isArray(data?.heroes)||!Array.isArray(data?.duos))throw new Error('Invalid stats');
 return {
 heroes:new Map(data.heroes.map(row=>[row.hero_id,metric(row)])),
 duos:new Map(data.duos.map(row=>[pair(row.hero_1_id,row.hero_2_id),metric(row)]))
 };
 })();
 cache.set(`stats:${key}`,promise);
 return promise;
}
async function loadMatchups(map){
 const key=map||'overall';
 if(cache.has(`matchups:${key}`))return cache.get(`matchups:${key}`);
 const promise=(async()=>{
 const rows=await rpc('ss_get_matchups',{p_theme_id:map||null,p_exclude_mirrors:false});
 if(!Array.isArray(rows))throw new Error('Invalid matchups');
 const map=new Map();
 for(const row of rows){
 const candidate=row.candidate_id,opponent=row.opponent_id;
 if(!map.has(candidate))map.set(candidate,new Map());
 map.get(candidate).set(opponent,metric(row));
 }
 return map;
 })();
 cache.set(`matchups:${key}`,promise);
 return promise;
}
function matchupLabel(items){
 if(!items.length)return '';
 const best=items.reduce((a,b)=>b.edge-a.edge||b.appearances-a.appearances?a:b);
 if(best.edge>=.08&&best.appearances>=MIN_SAMPLE)return `counters ${best.opponentName}`;
 if(best.edge<=-.08&&best.appearances>=MIN_SAMPLE)return `weak vs ${best.opponentName}`;
 return '';
}
async function rank(){
 const assistant=root();
 if(!assistant)return;
 const cards=Array.from(assistant.querySelectorAll('.da-candidate'));
 if(!cards.length)return;
 const selectedMap=mapId();
 const draftKey=JSON.stringify([selectedMap,cards.map(heroIdFromCard),draftedIds('BLUE'),draftedIds('RED')]);
 if(draftKey===lastKey)return;
 lastKey=draftKey;
 let overall,mapStats,matchups;
 try{
 [overall,mapStats,matchups]=await Promise.all([
 loadStats(null),
 selectedMap?loadStats(selectedMap):Promise.resolve(null),
 loadMatchups(selectedMap||null)
 ]);
 }catch{return;}
 const scored=[];
 for(const card of cards){
 const id=heroIdFromCard(card);
 if(!id)continue;
 const side=card.closest('.da-side')?.classList.contains('da-red')?'RED':'BLUE';
 const allies=draftedIds(side).filter(value=>value!==id);
 const opponents=draftedIds(side==='RED'?'BLUE':'RED').filter(value=>value!==id);
 const heroOverall=overall.heroes.get(id)||metric(null);
 const heroMap=mapStats?.heroes.get(id)||metric(null);
 let duoScore=0,duoCount=0;
 for(const ally of allies){
 const duo=overall.duos.get(pair(id,ally));
 if(!duo||duo.appearances<MIN_SAMPLE)continue;
 duoScore+=duo.confidence;duoCount++;
 }
 duoScore=duoCount?duoScore/duoCount:heroOverall.confidence;
 const mapScore=mapStats&&heroMap.appearances>=MIN_SAMPLE?heroMap.confidence:heroOverall.confidence;
 const rows=matchups.get(id);
 let matchupScore=heroOverall.confidence,matchupItems=[];
 if(rows&&opponents.length){
 let total=0,count=0;
 for(const opponent of opponents){
 const row=rows.get(opponent);
 if(!row||row.appearances<MIN_SAMPLE)continue;
 const opponentName=(window.config?.heroes||[]).find(h=>h.id===opponent)?.name||opponent;
 const edge=row.confidence-heroOverall.confidence;
 matchupItems.push({opponentName,edge,appearances:row.appearances});
 total+=row.confidence;count++;
 }
 if(count)matchupScore=total/count;
 }
 const score=WEIGHTS.hero*heroOverall.confidence+WEIGHTS.duo*duoScore+WEIGHTS.map*mapScore+WEIGHTS.matchup*matchupScore;
 scored.push({card,id,score,matchupItems});
 }
 scored.sort((a,b)=>b.score-a.score);
 const columns=new Map();
 for(const item of scored){
 const column=item.card.closest('.da-side');
 if(!column)continue;
 if(!columns.has(column))columns.set(column,[]);
 columns.get(column).push(item.card);
 }
 for(const [column,ordered] of columns){
 const list=column.querySelector('.da-candidates');
 if(!list)continue;
 const hidden=Array.from(list.children).filter(node=>!ordered.includes(node));
 list.replaceChildren(...ordered,...hidden);
 ordered.forEach((card,index)=>{
 const item=scored.find(entry=>entry.card===card);
 if(!item)return;
 card.dataset.matchupRank=String(index+1);
 card.dataset.matchupScore=item.score.toFixed(4);
 let badge=card.querySelector('.matchup-reason');
 if(!badge){badge=document.createElement('span');badge.className='matchup-reason';card.append(badge);}
 badge.textContent=matchupLabel(item.matchupItems);
 });
 }
}
function schedule(){
 if(frame)return;
 frame=requestAnimationFrame(()=>{frame=0;rank();});
}
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
window.addEventListener('tracker:draft-changed',schedule);
window.addEventListener('tracker:catalog-changed',schedule);
document.getElementById('theme')?.addEventListener('change',()=>{lastKey='';schedule();});
window.TrackerAssistantMatchup1421=Object.freeze({version:'1.4.21',refresh:schedule});
schedule();
})();