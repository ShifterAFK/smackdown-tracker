// Module: showdown-draft-indicator-v1
// Independent full-draft model. Does not modify Match Indicator v1.

(function(){
'use strict';
if(document.getElementById('showdownDraftIndicator'))return;
const winner=document.getElementById('winnerPicker');
if(!winner)return;

const root=document.createElement('section');
root.id='showdownDraftIndicator';
root.className='sdi-panel sdi-neutral';
root.setAttribute('aria-label','Experimental Showdown Draft Indicator');
root.innerHTML='<div class="sdi-head"><span class="sdi-heading">SHOWDOWN DRAFT INDICATOR</span><span class="sdi-tag">EXPERIMENTAL · First Pick priority</span></div><div class="sdi-result" role="status" aria-live="polite">Add heroes to compare</div><div class="sdi-track" aria-hidden="true"><div class="sdi-blue"></div><div class="sdi-red"></div></div><div class="sdi-legend"><span>BLUE</span><span>Historical score difference · not win probability</span><span>RED</span></div><details><summary>Why this indication?</summary><div class="sdi-details"></div><button type="button" class="sdi-retry">Refresh model data</button></details>';
winner.before(root);

const style=document.createElement('style');
style.textContent=`
#showdownDraftIndicator{padding:9px 12px;margin:12px 0;border:1px solid var(--border,#4a4d52);border-radius:9px;background:var(--panel,#17191d);color:var(--text,#eee)}
#showdownDraftIndicator .sdi-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
#showdownDraftIndicator .sdi-heading{font-size:12px;font-weight:800;letter-spacing:.08em}
#showdownDraftIndicator .sdi-tag{font-size:10px;opacity:.72;text-align:right}
#showdownDraftIndicator .sdi-result{font-size:14px;font-weight:750;margin:4px 0}
#showdownDraftIndicator .sdi-track{display:flex;position:relative;width:100%;height:9px;overflow:hidden;border-radius:6px;background:#a84d4d;margin:6px 0}
#showdownDraftIndicator .sdi-blue{height:100%;width:50%;background:#397bc4;flex:none;transition:width .18s ease}
#showdownDraftIndicator .sdi-red{height:100%;flex:1;background:#b84f4f}
#showdownDraftIndicator .sdi-track:after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:#f0d58b}
#showdownDraftIndicator.sdi-neutral .sdi-blue,#showdownDraftIndicator.sdi-neutral .sdi-red{opacity:.52}
#showdownDraftIndicator .sdi-legend{display:flex;justify-content:space-between;gap:8px;font-size:10px;opacity:.72}
#showdownDraftIndicator details{margin-top:7px;font-size:12px}
#showdownDraftIndicator .sdi-details{white-space:pre-line;line-height:1.5;margin-top:7px;color:var(--muted,#bfc2c9)}
#showdownDraftIndicator .sdi-retry{margin-top:8px;font-size:11px;padding:5px 9px}
@media(max-width:520px){#showdownDraftIndicator .sdi-legend span:nth-child(2){max-width:58%;text-align:center}}
`;
root.append(style);

const state={data:null,slotMap:new Map(),red12Map:new Map(),blueBase:.5,generatedAt:null,loading:false,error:'',request:0};
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const fmt=v=>(v>=0?'+':'')+v.toFixed(3);
const heroById=id=>(config.heroes||[]).find(h=>h.id===id)||null;
const heroName=id=>heroById(id)?.name||id||'Unknown hero';
const heroClass=id=>heroById(id)?.class||null;
function slotRecord(id,side,index){
 const row=state.slotMap.get(side+'|'+(index+1)+'|'+id)||{};
 const n=Math.max(0,Number(row.appearances)||0);
 const w=Math.max(0,Math.min(n,Number(row.wins)||0));
 const base=side==='BLUE'?state.blueBase:1-state.blueBase;
 const smoothed=(w+base*10)/(n+10);
 return{id,side,index,n,w,base,lift:smoothed-base,weight:index===0?1.5:.75};
}
function red12Record(){
 const first=lineup.RED[0],second=lineup.RED[1];
 if(!first||!second)return{class1:null,class2:null,n:0,residual:0};
 const class1=heroClass(first),class2=heroClass(second);
 if(!class1||!class2)return{class1,class2,n:0,residual:0};
 const row=state.red12Map.get(class1+'|'+class2)||{};
 const n=Math.max(0,Number(row.appearances)||0);
 const residualSum=Number(row.residual_sum)||0;
 return{class1,class2,n,residual:residualSum/(n+30)};
}
function calculate(){
 const picks={BLUE:[],RED:[]};
 const teamScores={BLUE:0,RED:0};
 for(const side of ['BLUE','RED']){
  for(let index=0;index<3;index++){
   const id=lineup[side][index];
   if(!id)continue;
   const p=slotRecord(id,side,index);
   picks[side].push(p);
   teamScores[side]+=p.lift*p.weight;
  }
 }
 const red12=red12Record();
 const delta=(state.blueBase-.5)+teamScores.BLUE-teamScores.RED-red12.residual;
 const count=lineup.BLUE.filter(Boolean).length+lineup.RED.filter(Boolean).length;
 return{picks,teamScores,red12,delta,count};
}
function paint(){
 const text=root.querySelector('.sdi-result'),details=root.querySelector('.sdi-details');
 const count=lineup.BLUE.filter(Boolean).length+lineup.RED.filter(Boolean).length;
 let delta=0,neutral=true;
 if(!known.BLUE||!known.RED){
  text.textContent='Mark both draft orders as known to use slot-based history';
  details.textContent='This model needs verified pick slots on both sides. It will not guess the opening or later picks when either draft order is unknown.';
 }
 else if(!count){
  text.textContent='Add heroes to compare';
  details.textContent='The score updates as picks are added. Missing slots contribute zero until selected.';
 }
 else if(state.loading||!state.data){
  text.textContent=state.error?'Showdown Draft Indicator unavailable':'Loading model history…';
  details.textContent=state.error||'Loading current-event verified-order statistics.';
 }
 else{
  const result=calculate();
  delta=result.delta;
  neutral=Math.abs(delta)<.005;
  const full=result.count===6;
  if(neutral)text.textContent=(full?'Full draft':'Partial draft')+' · scores nearly even · '+result.count+'/6 picks';
  else text.textContent=(delta>0?'BLUE':'RED')+' edge '+fmt(Math.abs(delta))+' · '+(full?'6/6 picks':result.count+'/6 picks');
  const lines=[
   'Model: showdown-draft-indicator-v1 · event '+(state.data.event_id||'unknown'),
   'History: '+Number(state.data.summary?.approved_matches||0).toLocaleString()+' approved matches · '+Number(state.data.summary?.verified_order_matches||0).toLocaleString()+' with verified draft order · generated '+(state.generatedAt||'time unavailable'),
   'Side baseline: BLUE '+(100*state.blueBase).toFixed(2)+'% · RED '+(100*(1-state.blueBase)).toFixed(2)+'%',
   '',
   'Formula: side prior + 1.5×(BLUE 1 lift − RED 1 lift) + 0.75×(BLUE 2 + BLUE 3 lifts − RED 2 − RED 3 lifts) − RED 1+2 class-pair residual.',
   'Side prior: '+fmt(state.blueBase-.5)+' · BLUE hero score: '+fmt(result.teamScores.BLUE)+' · RED hero score: '+fmt(result.teamScores.RED),
   '',
  ];
  for(const side of ['BLUE','RED']){
   for(let index=0;index<3;index++){
    const id=lineup[side][index];
    if(!id){lines.push(side+' '+(index+1)+': not selected');continue;}
    const p=slotRecord(id,side,index);
    lines.push(side+' '+(index+1)+' — '+heroName(id)+' ('+p.n+' appearances, '+p.w+' wins; lift '+fmt(p.lift)+' × '+p.weight+')');
   }
  }
  if(lineup.RED[0]&&lineup.RED[1]){
   lines.push('');
   lines.push('RED 1+2 class sequence: '+(result.red12.class1||'Unknown')+' → '+(result.red12.class2||'Unknown')+' · '+result.red12.n+' historical matches · residual '+fmt(result.red12.residual));
  }else{
   lines.push('');
   lines.push('RED 1+2 class residual: available after both RED 1 and RED 2 are selected.');
  }
  lines.push('');
  lines.push('Total score difference (positive = BLUE): '+fmt(delta)+'. '+(full?'Full draft scored.':'Partial draft: missing slots currently contribute zero.'));
  lines.push('The RED 1+2 residual is calculated from prior-only historical residuals and shrunk with 30 prior matches. Hero lifts are shrunk with 10 prior appearances.');
  lines.push('This is an experimental historical score, not a win probability. No numeric map, Phantimal, exact hero counter, player-skill, random-pool, ban, or formation adjustment is applied.');
  details.textContent=lines.join('\n');
 }
 const width=50+clamp(delta*100,-30,30);
 root.querySelector('.sdi-blue').style.width=width+'%';
 root.querySelector('.sdi-red').style.width=(100-width)+'%';
 root.classList.toggle('sdi-neutral',neutral);
}
async function load(){
 const request=++state.request;
 state.loading=true;state.error='';paint();
 try{
  const data=await rpc('ss_get_showdown_draft_indicator_stats',{});
  if(request!==state.request)return;
  if(!data?.summary||!Array.isArray(data.hero_slots)||!Array.isArray(data.red_class_pairs))throw Error('Invalid Showdown Draft Indicator statistics response');
  state.data=data;
  state.generatedAt=data.generated_at||null;
  const matches=Number(data.summary.approved_matches)||0;
  const baseline=Number(data.summary.blue_baseline);
  state.blueBase=matches?clamp(Number.isFinite(baseline)?baseline:(Number(data.summary.blue_wins)||0)/matches,0,1):.5;
  state.slotMap=new Map(data.hero_slots.map(row=>[row.side+'|'+row.pick_order+'|'+row.hero_id,row]));
  state.red12Map=new Map(data.red_class_pairs.map(row=>[row.class_1+'|'+row.class_2,row]));
 }catch(error){
  if(request!==state.request)return;
  state.error=error?.message||'Unknown error';
  state.data=null;state.slotMap=new Map();state.red12Map=new Map();state.generatedAt=null;
 }finally{
  if(request===state.request){state.loading=false;paint();}
 }
}
root.querySelector('.sdi-retry').addEventListener('click',load);
window.addEventListener('tracker:draft-changed',paint);
window.addEventListener('tracker:draft-reset',paint);
window.addEventListener('tracker:catalog-changed',load);
window.addEventListener('tracker:assistant-session-started',load);
window.addEventListener('tracker:assistant-session-ended',load);
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load();});
for(const side of ['BLUE','RED'])document.getElementById('known'+side)?.addEventListener('change',paint);
if(typeof onlineBusy!=='undefined'){
 setInterval(()=>{if(!onlineBusy&&!document.hidden)load();},60000);
}else{
 setInterval(()=>{if(!document.hidden)load();},60000);
}
paint();load();
})();
