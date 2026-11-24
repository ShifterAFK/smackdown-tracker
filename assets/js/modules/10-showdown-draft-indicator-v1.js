// Module: showdown-draft-indicator-v1
// Independent full-draft indicator. Does not modify Match Indicator v1 or First Pick Indicator.

(function(){
'use strict';
if(document.getElementById('showdownDraftIndicator'))return;
const winnerPicker=document.getElementById('winnerPicker');
if(!winnerPicker)return;

const root=document.createElement('section');
root.id='showdownDraftIndicator';
root.className='ndi-panel ndi-neutral';
root.setAttribute('aria-label','Experimental full-draft indicator');
root.innerHTML='<div class="ndi-head"><span class="ndi-heading">NEW DRAFT INDICATOR</span><span class="ndi-tag">EXPERIMENTAL · v1</span></div><div class="ndi-result" role="status" aria-live="polite">Add heroes to compare</div><div class="ndi-track" aria-hidden="true"><div class="ndi-blue"></div><div class="ndi-red"></div></div><div class="ndi-legend"><span>BLUE</span><span>Historical score difference · not a win probability</span><span>RED</span></div><details><summary>Model details and historical support</summary><div class="ndi-details"></div><button type="button" class="ndi-retry">Refresh indicator data</button></details>';
winnerPicker.before(root);

const style=document.createElement('style');
style.textContent=`
#showdownDraftIndicator{padding:10px 12px;margin:12px 0;border:1px solid var(--border,#4a4d52);border-radius:9px;background:var(--panel,#17191d);color:var(--text,#eee)}
#showdownDraftIndicator .ndi-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
#showdownDraftIndicator .ndi-heading{font-size:12px;font-weight:850;letter-spacing:.08em}
#showdownDraftIndicator .ndi-tag{font-size:10px;opacity:.72;text-align:right}
#showdownDraftIndicator .ndi-result{font-size:14px;font-weight:780;margin:4px 0}
#showdownDraftIndicator .ndi-track{display:flex;position:relative;width:100%;height:9px;overflow:hidden;border-radius:6px;background:#a84d4d;margin:6px 0}
#showdownDraftIndicator .ndi-blue{height:100%;width:50%;background:#397bc4;flex:none;transition:width .18s ease}
#showdownDraftIndicator .ndi-red{height:100%;flex:1;background:#b84f4f}
#showdownDraftIndicator .ndi-track:after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:#f0d58b}
#showdownDraftIndicator.ndi-neutral .ndi-blue,#showdownDraftIndicator.ndi-neutral .ndi-red{opacity:.52}
#showdownDraftIndicator .ndi-legend{display:flex;justify-content:space-between;gap:8px;font-size:10px;opacity:.72}
#showdownDraftIndicator details{margin-top:7px;font-size:12px}
#showdownDraftIndicator .ndi-details{white-space:pre-line;line-height:1.5;margin-top:7px;color:var(--muted,#bfc2c9)}
#showdownDraftIndicator .ndi-retry{margin-top:8px;font-size:11px;padding:5px 9px}
@media(max-width:520px){#showdownDraftIndicator .ndi-legend span:nth-child(2){max-width:58%;text-align:center}}
`;
root.append(style);

const state={data:null,heroSlots:new Map(),redPairs:new Map(),loading:false,error:'',request:0};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const fmt=value=>(value>=0?'+':'')+value.toFixed(3);
const pct=value=>(100*value).toFixed(1)+'%';
const heroName=id=>(config.heroes||[]).find(hero=>hero.id===id)?.name||id||'Unknown hero';
const heroClass=id=>(config.heroes||[]).find(hero=>hero.id===id)?.class||null;
const slotKey=(side,order,id)=>side+'|'+order+'|'+id;

function getPick(id,side,order,base){
 if(!id)return null;
 const row=state.heroSlots.get(slotKey(side,order,id))||{};
 const appearances=Math.max(0,Number(row.appearances)||0);
 const wins=Math.max(0,Math.min(appearances,Number(row.wins)||0));
 const smoothed=(wins+base*10)/(appearances+10);
 return{id,side,order,appearances,wins,rawRate:appearances?wins/appearances:null,lift:smoothed-base,weight:order===1?1.5:0.75};
}

function paint(){
 const result=root.querySelector('.ndi-result');
 const details=root.querySelector('.ndi-details');
 const count=['BLUE','RED'].flatMap(side=>lineup[side].filter(Boolean)).length;
 const neutral=()=>{root.classList.add('ndi-neutral');root.querySelector('.ndi-blue').style.width='50%';root.querySelector('.ndi-red').style.width='50%';};
 if(!count){
  result.textContent='Add heroes to compare';
  details.textContent='The indicator uses all six draft slots when available. First picks have 1.5× weight; later picks have 0.75× weight. The ordered RED 1 + RED 2 class residual is a small historical correction.';
  neutral();return;
 }
 if(!known.BLUE||!known.RED){
  result.textContent='Mark both draft orders as known';
  details.textContent='This model needs the actual BLUE 1, RED 1, RED 2, BLUE 2, BLUE 3 and RED 3 order. It will not guess slot positions when either side has unknown draft order.';
  neutral();return;
 }
 if(state.loading||!state.data){
  result.textContent=state.error?'New Draft Indicator unavailable':'Loading new indicator history…';
  details.textContent=state.error||'Loading approved match and pick-slot statistics.';
  neutral();return;
 }

 const summary=state.data.summary||{};
 const blueBase=clamp(Number(summary.blue_baseline)||0,0,1);
 const redBase=clamp(Number(summary.red_baseline)||0,0,1);
 const sidePrior=blueBase-0.5;
 const bluePicks=[
  getPick(lineup.BLUE[0],'BLUE',1,blueBase),
  getPick(lineup.BLUE[1],'BLUE',2,blueBase),
  getPick(lineup.BLUE[2],'BLUE',3,blueBase)
 ];
 const redPicks=[
  getPick(lineup.RED[0],'RED',1,redBase),
  getPick(lineup.RED[1],'RED',2,redBase),
  getPick(lineup.RED[2],'RED',3,redBase)
 ];
 let delta=sidePrior;
 for(const pick of bluePicks)if(pick)delta+=pick.lift*pick.weight;
 for(const pick of redPicks)if(pick)delta-=pick.lift*pick.weight;

 let redClassEffect=0,redClassCount=0,redClassSum=0,redClassLabel='not available until RED 1 and RED 2 are selected';
 const red1Class=heroClass(lineup.RED[0]),red2Class=heroClass(lineup.RED[1]);
 if(red1Class&&red2Class){
  const pair=state.redPairs.get(red1Class+'|'+red2Class);
  if(pair){
   redClassCount=Math.max(0,Number(pair.appearances)||0);
   redClassSum=Number(pair.residual_sum)||0;
   redClassEffect=redClassSum/(redClassCount+30);
  }
  redClassLabel=red1Class+' + '+red2Class;
  delta-=redClassEffect;
 }

 const width=50+clamp(delta*100,-30,30);
 root.querySelector('.ndi-blue').style.width=width+'%';
 root.querySelector('.ndi-red').style.width=(100-width)+'%';
 root.classList.toggle('ndi-neutral',Math.abs(delta)<0.005);
 if(Math.abs(delta)<0.005)result.textContent='Draft scores nearly even · '+fmt(delta)+' · '+count+'/6 picks';
 else result.textContent=(delta>0?'BLUE':'RED')+' edge '+fmt(Math.abs(delta))+' · '+count+'/6 picks';

 const lines=[
  'Model: showdown-draft-indicator-v1 · experimental · all maps pooled',
  'Data: '+(Number(summary.approved_matches)||0).toLocaleString()+' approved matches; '+(Number(summary.verified_order_matches)||0).toLocaleString()+' with verified draft order.',
  'BLUE baseline: '+pct(blueBase)+' · RED baseline: '+pct(redBase)+' · BLUE side prior: '+fmt(sidePrior),
  '',
  'Hero-slot contributions (win history is specific to side and pick number):'
 ];
 for(const pick of [...bluePicks,...redPicks]){
  if(!pick)continue;
  const raw=pick.rawRate===null?'no prior appearances':pct(pick.rawRate)+' raw WR';
  lines.push(pick.side+' '+pick.order+' — '+heroName(pick.id)+': '+pick.wins+'/'+pick.appearances+' wins · '+raw+' · lift '+fmt(pick.lift)+' · weight '+pick.weight+'×');
 }
 lines.push('');
 lines.push('RED 1 + RED 2 ordered class pair: '+redClassLabel);
 if(red1Class&&red2Class){
  lines.push('Prior class-pair matches: '+redClassCount+' · residual sum '+fmt(redClassSum)+' · RED correction '+fmt(redClassEffect)+' (subtracted from BLUE score).');
  if(!redClassCount)lines.push('No prior observations for this class pair; correction is zero.');
 }
 lines.push('RED class-pair shrinkage: 30 prior matches. Hero-slot shrinkage: 10 prior appearances.');
 lines.push('Total score difference (positive = BLUE): '+fmt(delta)+'. Neutral when absolute score is below 0.005.');
 lines.push('');
 lines.push('This is a historical score difference, not a win probability or calibrated confidence. Map, Phantimal, exact hero counters, player skill, random pool/bans and formations are not numerically modelled.');
 details.textContent=lines.join('\n');
}

async function load(){
 const request=++state.request;
 state.loading=true;state.error='';paint();
 try{
  const data=await rpc('ss_get_showdown_draft_indicator_stats',{});
  if(request!==state.request)return;
  if(!data?.summary||!Array.isArray(data.hero_slots)||!Array.isArray(data.red_class_pairs))throw Error('Invalid new-indicator statistics response');
  state.data=data;
  state.heroSlots=new Map(data.hero_slots.map(row=>[slotKey(row.side,Number(row.pick_order),row.hero_id),row]));
  state.redPairs=new Map(data.red_class_pairs.map(row=>[row.class_1+'|'+row.class_2,row]));
  state.error='';
 }catch(error){
  if(request!==state.request)return;
  state.error=error?.message||'Unknown error';
  state.data=null;state.heroSlots=new Map();state.redPairs=new Map();
 }finally{
  if(request===state.request){state.loading=false;paint();}
 }
}

root.querySelector('.ndi-retry').addEventListener('click',load);
window.addEventListener('tracker:draft-changed',paint);
window.addEventListener('tracker:draft-reset',paint);
window.addEventListener('tracker:catalog-changed',load);
window.addEventListener('tracker:assistant-session-started',load);
window.addEventListener('tracker:assistant-session-ended',load);
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load();});
for(const side of ['BLUE','RED'])document.getElementById('known'+side)?.addEventListener('change',paint);
setInterval(()=>{if(!document.hidden)load();},60000);
paint();
load();
})();
