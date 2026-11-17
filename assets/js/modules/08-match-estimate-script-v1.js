// Module: match-estimate-script-v2 (partner-adjusted hero strength)

(function(){
'use strict';
if(document.getElementById('matchEstimate'))return;
const winner=document.getElementById('winnerPicker');if(!winner)return;
const root=document.createElement('section');root.id='matchEstimate';root.className='me-neutral';root.setAttribute('aria-label','Experimental match indicator');
root.innerHTML='<div class="me-head"><span class="me-heading">MATCH INDICATOR</span><span class="me-tag">EXPERIMENTAL · not win probability</span></div><div class="me-result" role="status" aria-live="polite">Complete both teams</div><div class="me-track" aria-hidden="true"><div class="me-blue"></div><div class="me-red"></div></div><div class="me-legend"><span>BLUE</span><span>Historical-results comparison</span><span>RED</span></div><details><summary>Data and limitations</summary><div class="me-details"></div><button type="button" class="me-retry">Refresh data</button></details>';
winner.before(root);
const state={data:null,key:null,request:0,error:'',cache:new Map()};
const normalize=value=>['Celestial','Hypogean','Celestial & Hypogean','Wedge of Matter'].includes(value)?'Wedge of Matter':value;
function smoothed(row){const n=Math.max(0,Number(row?.appearances)||0),w=Math.max(0,Math.min(n,Number(row?.wins)||0));return {n,value:(w+5)/(n+10)};}
function evaluateSide(ids,phantimal,data){
 const heroMap=new Map((data?.heroes||[]).map(x=>[x.hero_id,x]));
 const duoMap=new Map((data?.duos||[]).map(x=>[[x.hero_1_id,x.hero_2_id].sort().join('|'),x]));
 const heroes=ids.map(id=>smoothed(heroMap.get(id)));
 const duos=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++)duos.push(smoothed(duoMap.get([ids[i],ids[j]].sort().join('|'))));
 const ph=smoothed((data?.phantimals||[]).find(x=>normalize(x.faction)===normalize(phantimal)));
 const presentHeroes=heroes.filter(x=>x.n>0),presentDuos=duos.filter(x=>x.n>0);
 const average=rows=>rows.reduce((sum,x)=>sum+x.value,0)/rows.length;
 const model=window.TrackerStrength?window.TrackerStrength.fit(data):null;
 const groups=[];
 if(model&&presentHeroes.length)groups.push({weight:.85,value:model.teamScore(ids)});
 else{if(presentHeroes.length)groups.push({weight:.4,value:average(presentHeroes)});if(presentDuos.length)groups.push({weight:.45,value:average(presentDuos)});}
 if(ph.n&&phantimal!=='Unknown'&&phantimal!=='None')groups.push({weight:.15,value:ph.value});
 const total=groups.reduce((sum,x)=>sum+x.weight,0);
 const score=total?groups.reduce((sum,x)=>sum+x.weight*x.value,0)/total:.5;
 return {score,heroCount:presentHeroes.length,duoCount:presentDuos.length,heroSupported:heroes.filter(x=>x.n>=5).length,phCount:ph.n,phantimal:phantimal||'Unknown',heroSamples:heroes.map(x=>x.n),duoSamples:duos.map(x=>x.n)};
}
function currentPh(side){if(typeof selectedPhantimal==='function')return normalize(selectedPhantimal(side));return normalize(derive(lineup[side],known[side]))||'Unknown';}
function formatCoverage(side,value){return side+': heroes '+value.heroCount+'/3 (n: '+value.heroSamples.join(', ')+'); DUO '+value.duoCount+'/3 (n: '+value.duoSamples.join(', ')+'); Phantimal '+phantimalDisplay(value.phantimal)+' (n: '+value.phCount+').';}
function paint(){
 const complete=['BLUE','RED'].every(side=>lineup[side].length===3&&lineup[side].every(Boolean));
 const text=root.querySelector('.me-result'),details=root.querySelector('.me-details');let delta=0,neutral=true;
 const scope=state.key&&state.key!=='__all__'?(config.themes.find(x=>x.id===state.key)?.name||state.key):'Overall — all maps in this event';
 root.querySelector('.me-tag').textContent='EXPERIMENTAL · '+scope;
 let info=scope+'. Mirrors excluded separately per category.\n';
 if(!complete){text.textContent='Complete both teams';}
 else if(state.error){text.textContent='Match indicator unavailable — statistics could not be loaded';info+=state.error+'\n';}
 else if(!state.data){text.textContent='Loading historical data…';}
 else{
  const blue=evaluateSide(lineup.BLUE,currentPh('BLUE'),state.data),red=evaluateSide(lineup.RED,currentPh('RED'),state.data);
  info+=formatCoverage('BLUE',blue)+'\n'+formatCoverage('RED',red)+'\n';
  const supported=blue.heroSupported>=2&&red.heroSupported>=2;
  if(!supported){text.textContent='Not enough data for a match indication';}
  else{
   delta=blue.score-red.score;neutral=false;
   text.textContent=Math.abs(delta)<.03?'No clear indication':(Math.abs(delta)<.10?'Slight ':'Stronger ')+(delta>0?'BLUE':'RED')+' indication · limited data';
  }
 }
 const blueWidth=50+Math.max(-30,Math.min(30,delta*100));root.querySelector('.me-blue').style.width=blueWidth+'%';root.querySelector('.me-red').style.width=(100-blueWidth)+'%';root.classList.toggle('me-neutral',neutral);
 info+='Heuristic comparison, not a calibrated probability or a betting recommendation.\nTeam score uses a partner-adjusted strength for each hero: a hero who wins with many different partners counts for more than a duo that only wins together. Small samples are pulled toward average. Phantimal adds a small share.\nEach side needs at least two heroes with 5+ appearances before an indication is shown.\nNo direct counter-pick, battlefield-position or player-strength analysis. The bar is a score comparison, not a percentage chance.\nThis feature does not submit matches or record pre-match forecasts.';
 details.textContent=info;
}
async function load(force=false,sessionStart=false){
  if(window.TrackerSnapshot1323?.active&&!sessionStart)return;
  if(force)window.trackerData.invalidate();
 const theme=document.getElementById('theme')?.value||null,key=theme||'__all__',request=++state.request;state.key=key;state.error='';state.data=null;

 paint();try{const data=await rpc('ss_get_stats',{p_theme_id:theme,p_exclude_mirrors:true});if(request!==state.request)return;if(!Array.isArray(data?.heroes)||!Array.isArray(data?.duos)||!Array.isArray(data?.phantimals))throw Error('Invalid statistics response');state.data=data;state.cache.set(key,{data,at:Date.now()});paint();}catch(error){if(request!==state.request)return;state.error=error.message;state.data=null;paint();}
}
root.querySelector('.me-retry').onclick=()=>load(true);
window.addEventListener('tracker:assistant-session-started',()=>{root.querySelector('.me-retry').hidden=true;load(false,true);});
window.addEventListener('tracker:assistant-session-ended',()=>{state.request++;root.querySelector('.me-retry').hidden=false;});
window.addEventListener('tracker:draft-changed',paint);
window.addEventListener('tracker:catalog-changed',()=>load());
document.getElementById('theme')?.addEventListener('change',()=>load());
document.addEventListener('click',event=>{if(event.target instanceof Element&&event.target.closest('#phantimalBLUE,#phantimalRED'))setTimeout(paint,0);});
for(const side of ['BLUE','RED'])document.getElementById('known'+side)?.addEventListener('change',()=>setTimeout(paint,0));
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved){state.cache.clear();load();}});
setInterval(()=>{if(!onlineBusy&&!document.hidden)load();},60000);
paint();load();
})();
