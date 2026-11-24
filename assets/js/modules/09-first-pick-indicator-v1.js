// Module: first-pick-indicator-v1
// Independent diagnostic: BLUE1 vs RED1 only. Does not modify Match Indicator v1.

(function(){
'use strict';
if(document.getElementById('firstPickIndicator'))return;
const winner=document.getElementById('winnerPicker');
if(!winner)return;

const root=document.createElement('section');
root.id='firstPickIndicator';
root.className='fpi-panel fpi-neutral';
root.setAttribute('aria-label','Experimental first-pick-only indicator');
root.innerHTML='<div class="fpi-head"><span class="fpi-heading">FIRST PICK INDICATOR</span><span class="fpi-tag">EXPERIMENTAL · first picks only</span></div><div class="fpi-result" role="status" aria-live="polite">Add BLUE 1 and RED 1</div><div class="fpi-track" aria-hidden="true"><div class="fpi-blue"></div><div class="fpi-red"></div></div><div class="fpi-legend"><span>BLUE</span><span>Opening-pick historical signal · not win probability</span><span>RED</span></div><details><summary>Why this indication?</summary><div class="fpi-details"></div><button type="button" class="fpi-retry">Refresh first-pick data</button></details>';
winner.before(root);

const style=document.createElement('style');
style.textContent=`
#firstPickIndicator{padding:9px 12px;margin:12px 0;border:1px solid var(--border,#4a4d52);border-radius:9px;background:var(--panel,#17191d);color:var(--text,#eee)}
#firstPickIndicator .fpi-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
#firstPickIndicator .fpi-heading{font-size:12px;font-weight:800;letter-spacing:.08em}
#firstPickIndicator .fpi-tag{font-size:10px;opacity:.72;text-align:right}
#firstPickIndicator .fpi-result{font-size:14px;font-weight:750;margin:4px 0}
#firstPickIndicator .fpi-track{display:flex;position:relative;width:100%;height:9px;overflow:hidden;border-radius:6px;background:#a84d4d;margin:6px 0}
#firstPickIndicator .fpi-blue{height:100%;width:50%;background:#397bc4;flex:none;transition:width .18s ease}
#firstPickIndicator .fpi-red{height:100%;flex:1;background:#b84f4f}
#firstPickIndicator .fpi-track:after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:#f0d58b}
#firstPickIndicator.fpi-neutral .fpi-blue,#firstPickIndicator.fpi-neutral .fpi-red{opacity:.52}
#firstPickIndicator .fpi-legend{display:flex;justify-content:space-between;gap:8px;font-size:10px;opacity:.72}
#firstPickIndicator details{margin-top:7px;font-size:12px}
#firstPickIndicator .fpi-details{white-space:pre-line;line-height:1.5;margin-top:7px;color:var(--muted,#bfc2c9)}
#firstPickIndicator .fpi-retry{margin-top:8px;font-size:11px;padding:5px 9px}
@media(max-width:520px){#firstPickIndicator .fpi-legend span:nth-child(2){max-width:58%;text-align:center}}
`;
root.append(style);

const state={summary:null,firstMap:null,generatedAt:null,blueBase:.5,redBase:.5,loading:false,error:'',request:0};
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const fmt=v=>(v>=0?'+':'')+v.toFixed(3);
const heroName=id=>(config.heroes||[]).find(h=>h.id===id)?.name||id||'Unknown hero';
function record(id,side){
 const row=state.firstMap?.get(id)||{},key=side.toLowerCase();
 const n=Math.max(0,Number(row['first_pick_'+key+'_appearances'])||0);
 const w=Math.max(0,Math.min(n,Number(row['first_pick_'+key+'_wins'])||0));
 const base=side==='BLUE'?state.blueBase:state.redBase;
 const smoothed=(w+base*10)/(n+10);
 return{id,side,n,w,raw:n?w/n:null,base,smoothed,lift:smoothed-base};
}
function rate(value){return value.raw===null?'no prior appearances':(100*value.raw).toFixed(1)+'% raw WR';}
function paint(){
 const blueId=lineup.BLUE[0],redId=lineup.RED[0];
 const text=root.querySelector('.fpi-result'),details=root.querySelector('.fpi-details');
 let delta=0,neutral=true;
 const matches=Number(state.summary?.approved_matches)||0;
 if(!known.BLUE||!known.RED){
  text.textContent='Mark both draft orders as known to use the first-pick signal';
  details.textContent='The indicator needs the actual BLUE 1 and RED 1 selections. It will not guess the opening picks when either side has unknown draft order.';
 }
 else if(!blueId||!redId){
  text.textContent='Add BLUE 1 and RED 1 to see the opening-pick signal';
  details.textContent='This panel can calculate as soon as both opening picks are entered. Picks 2 and 3 are intentionally not used.';
 }
 else if(state.loading||!state.firstMap||!state.summary){
  text.textContent=state.error?'First-pick indicator unavailable':'Loading first-pick history…';
  details.textContent=state.error||'Loading approved match statistics.';
 }
 else{
  const blue=record(blueId,'BLUE'),red=record(redId,'RED');
  const sidePrior=state.blueBase-.5;
  delta=sidePrior+blue.lift-red.lift;
  neutral=Math.abs(delta)<.005;
  if(neutral)text.textContent='Opening picks are nearly even · '+fmt(delta);
  else text.textContent=(delta>0?'BLUE':'RED')+' first-pick edge '+fmt(Math.abs(delta));
  details.textContent=[
   'Data: '+matches.toLocaleString()+' approved matches · all maps combined · generated '+(state.generatedAt||'time unavailable'),
   '',
   'BLUE 1 — '+heroName(blue.id),
   'Record: '+blue.w+'/'+blue.n+' wins · '+rate(blue),
   'BLUE baseline: '+(100*blue.base).toFixed(1)+'% · smoothed lift: '+fmt(blue.lift),
   '',
   'RED 1 — '+heroName(red.id),
   'Record: '+red.w+'/'+red.n+' wins · '+rate(red),
   'RED baseline: '+(100*red.base).toFixed(1)+'% · smoothed lift: '+fmt(red.lift),
   '',
   'BLUE side prior: '+fmt(sidePrior),
   'Score = side prior + BLUE 1 lift − RED 1 lift = '+fmt(delta)+'.',
   '',
   'RED 1 is a response pick after BLUE 1, but this indicator does not invent a direct counter bonus. Repeated BLUE1→RED1 pairings are too sparse for a reliable matchup adjustment.',
   'First-pick-only diagnostic. It ignores picks 2/3, DUO/class synergy, map, Phantimal, player skill, formation, random pool and bans. It is not a full-draft prediction, win probability, or betting recommendation.'
  ].join('\n');
 }
 const width=50+clamp(delta*100,-30,30);
 root.querySelector('.fpi-blue').style.width=width+'%';
 root.querySelector('.fpi-red').style.width=(100-width)+'%';
 root.classList.toggle('fpi-neutral',neutral);
}
async function load(force=false){
 const request=++state.request;
 if(force&&window.trackerData?.invalidate)window.trackerData.invalidate();
 state.loading=true;state.error='';paint();
 try{
  const [data,firstPicks]=await Promise.all([
   rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:false}),
   rpc('ss_get_first_pick_stats',{})
  ]);
  if(request!==state.request)return;
  if(!data?.summary||!Array.isArray(firstPicks))throw Error('Invalid first-pick statistics response');
  state.summary=data.summary;
  state.generatedAt=data.generated_at||null;
  const matches=Number(data.summary.approved_matches)||0;
  state.blueBase=matches?clamp((Number(data.summary.blue_wins)||0)/matches,0,1):.5;
  state.redBase=matches?clamp((Number(data.summary.red_wins)||0)/matches,0,1):1-state.blueBase;
  state.firstMap=new Map(firstPicks.map(row=>[row.hero_id,row]));
 }catch(error){
  if(request!==state.request)return;
  state.error=error?.message||'Unknown error';
  state.summary=null;state.firstMap=null;state.generatedAt=null;
 }finally{
  if(request===state.request){state.loading=false;paint();}
 }
}
root.querySelector('.fpi-retry').addEventListener('click',()=>load(true));
window.addEventListener('tracker:draft-changed',paint);
window.addEventListener('tracker:draft-reset',paint);
window.addEventListener('tracker:catalog-changed',()=>load());
window.addEventListener('tracker:assistant-session-started',()=>load());
window.addEventListener('tracker:assistant-session-ended',()=>load());
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load(true);});
for(const side of ['BLUE','RED'])document.getElementById('known'+side)?.addEventListener('change',()=>paint());
if(typeof onlineBusy!=='undefined'){
 setInterval(()=>{if(!onlineBusy&&!document.hidden)load();},60000);
}else{
 setInterval(()=>{if(!document.hidden)load();},60000);
}
paint();load();
})();
