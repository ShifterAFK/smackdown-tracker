// Module: draft-indicator-rules-v1
(function(){
'use strict';
if(document.getElementById('draftIndicator'))return;
const winner=document.getElementById('winnerPicker');if(!winner)return;
const root=document.createElement('section');root.id='draftIndicator';root.className='me-neutral';root.setAttribute('aria-label','Live experimental draft advantage indicator');
root.innerHTML='<div class="me-head"><span class="me-heading">LIVE DRAFT EDGE</span><span class="me-tag">EXPERIMENTAL</span></div><div class="me-result" role="status" aria-live="polite">Add heroes to compare</div><div class="me-track" aria-hidden="true"><div class="me-blue"></div><div class="me-red"></div></div><div class="me-legend"><span>BLUE</span><span>Historical score difference · not a win probability</span><span>RED</span></div><details><summary>Why this indication</summary><div class="me-explanation"></div><div class="me-details"></div></details>';
const style=document.createElement('style');
style.textContent='#draftIndicator{padding:9px 12px;margin:12px 0}#draftIndicator .me-head{margin-bottom:3px}#draftIndicator .me-result{margin:2px 0}#draftIndicator .me-track{position:relative;margin:4px 0}#draftIndicator .me-track::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:#e7c66d;box-shadow:0 0 2px #211a0c;pointer-events:none}#draftIndicator.me-neutral .me-blue,#draftIndicator.me-neutral .me-red{opacity:.48}#draftIndicator details{margin-top:5px}#draftIndicator .me-explanation{white-space:pre-line;line-height:1.5;margin-top:7px;color:var(--muted,#c0c2b5)}';
root.append(style);
root.querySelector('.me-explanation').textContent='This is a historical, rule-based score difference, not a validated prediction or a win probability. It updates when picks change.\n\nHero results are separated into first picks (BLUE 1 / RED 1) and later picks (2 / 3) for each side. Each hero rate is shrunk toward that side’s overall win rate using 10 prior appearances. First picks receive a modest 1.5× weight; later picks use 1×. RED 1 is evaluated as RED’s first pick, but no direct counter bonus is inferred because the random pool of 20 and bans are not recorded.\n\nClass synergy is learned from hero × partner-class history. For example, a Support is not assumed to work equally well with every Tank or damage dealer: the model checks how each specific hero performs alongside partners of each official class. Each interaction is measured beyond the individual records of both heroes, shrunk toward zero with 30 prior pair appearances, averaged across both directions and capped at ±0.03 per team. It is a cautious experimental correction, not a fixed class bonus.\n\nAll maps are combined. No map, Phantimal, battlefield-position, player-skill, formation or H2H adjustment is applied. The tracker does not know the random 20-hero pool or bans. The score is not calibrated for betting decisions.';
winner.before(root);
const state={data:null,sides:null,firstPicks:null,blueBase:0.5,redBase:0.5,error:'',loading:false,request:0};
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const pairKey=(a,b)=>[a,b].sort((x,y)=>x.localeCompare(y,'en')).join('|');
const fmt=v=>(v>=0?'+':'')+v.toFixed(3);
const pct=v=>(100*v).toFixed(1)+'%';
function maps(){
 const heroes=new Map((state.data?.heroes||[]).map(r=>[r.hero_id,r]));
 const sides=new Map((state.sides||[]).map(r=>[r.hero_id,r]));
 const first=new Map((state.firstPicks||[]).map(r=>[r.hero_id,r]));
 const duos=new Map((state.data?.duos||[]).map(r=>[pairKey(r.hero_1_id,r.hero_2_id),r]));
 const classes=new Map((config.heroes||[]).filter(h=>h.class).map(h=>[h.id,h.class]));
 const partnerGroups=new Map();
 for(const row of duos.values()){
  const a=row.hero_1_id,b=row.hero_2_id,ca=classes.get(a),cb=classes.get(b);
  if(!ca||!cb)continue;
  const n=Math.max(0,Number(row.appearances)||0),wins=Math.max(0,Number(row.wins)||0);
  const ar=heroes.get(a)||{},br=heroes.get(b)||{};
  const an=Math.max(0,Number(ar.appearances)||0),aw=Math.max(0,Number(ar.wins)||0);
  const bn=Math.max(0,Number(br.appearances)||0),bw=Math.max(0,Number(br.wins)||0);
  const aLift=(aw+5)/(an+10)-0.5,bLift=(bw+5)/(bn+10)-0.5;
  const expected=clamp(0.5+aLift+bLift,0.05,0.95);
  const residual=wins-n*expected;
  for(const [hero,partnerClass] of [[a,cb],[b,ca]]){
   const key=hero+'|'+partnerClass;
   let group=partnerGroups.get(key);
   if(!group){group={appearances:0,residual:0};partnerGroups.set(key,group);}
   group.appearances+=n;group.residual+=residual;
  }
 }
 return{heroes,sides,first,duos,classes,partnerGroups};
}
function heroPick(id,side,index,lookup){
 const first=lookup.first.get(id)||{},sideRow=lookup.sides.get(id)||{};
 const key=side.toLowerCase();
 const firstN=Number(first['first_pick_'+key+'_appearances'])||0;
 const firstW=Number(first['first_pick_'+key+'_wins'])||0;
 let n=firstN,w=firstW;
 if(index>0){
  n=Math.max(0,(Number(sideRow[key+'_appearances'])||0)-firstN);
  w=Math.max(0,(Number(sideRow[key+'_wins'])||0)-firstW);
 }
 const base=side==='BLUE'?state.blueBase:state.redBase;
 const smoothed=(w+base*10)/(n+10);
 return{id,side,index,n,w,base,lift:smoothed-base,weight:index===0?1.5:1};
}
function classSynergyScore(ids,lookup){
 let residual=0;const notes=[];
 for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
  const a=ids[i],b=ids[j],classA=lookup.classes.get(a),classB=lookup.classes.get(b);
  if(!classA||!classB)continue;
  const row=lookup.duos.get(pairKey(a,b))||{};
  const n=Math.max(0,Number(row.appearances)||0),wins=Math.max(0,Number(row.wins)||0);
  const ar=lookup.heroes.get(a)||{},br=lookup.heroes.get(b)||{};
  const an=Math.max(0,Number(ar.appearances)||0),aw=Math.max(0,Number(ar.wins)||0);
  const bn=Math.max(0,Number(br.appearances)||0),bw=Math.max(0,Number(br.wins)||0);
  const aLift=(aw+5)/(an+10)-0.5,bLift=(bw+5)/(bn+10)-0.5;
  const expected=clamp(0.5+aLift+bLift,0.05,0.95);
  const pairResidual=wins-n*expected;
  const groupA=lookup.partnerGroups.get(a+'|'+classB)||{appearances:0,residual:0};
  const groupB=lookup.partnerGroups.get(b+'|'+classA)||{appearances:0,residual:0};
  const otherNA=Math.max(0,groupA.appearances-n),otherNB=Math.max(0,groupB.appearances-n);
  const effectA=(groupA.residual-pairResidual)/(otherNA+30);
  const effectB=(groupB.residual-pairResidual)/(otherNB+30);
  const effect=(effectA+effectB)/2;
  residual+=effect;
  if((otherNA>=10||otherNB>=10)&&Math.abs(effect)>=0.01){
   notes.push(a+' ('+classA+') + '+b+' ('+classB+'): partner-class residual '+fmt(effect));
  }
 }
 return{score:clamp(residual*0.2,-0.03,0.03),notes};
}
function teamScore(side,lookup){
 let score=0;const picks=[],ids=[];
 for(let index=0;index<3;index++){
  const id=lineup[side][index];if(!id)continue;
  const pick=heroPick(id,side,index,lookup);score+=pick.lift*pick.weight;picks.push(pick);ids.push(id);
 }
 const synergy=classSynergyScore(ids,lookup);
 return{score,classSynergy:synergy.score,picks,synergyNotes:synergy.notes};
}
function paint(){
 const text=root.querySelector('.me-result'),details=root.querySelector('.me-details');
 const count=['BLUE','RED'].flatMap(side=>lineup[side].filter(Boolean)).length;
 if(!count){text.textContent='Add heroes to compare';details.textContent='The historical score starts updating as soon as you add a pick.';root.querySelector('.me-blue').style.width='50%';root.querySelector('.me-red').style.width='50%';root.classList.add('me-neutral');return;}
 if(state.loading||!state.data||!state.sides||!state.firstPicks){
  text.textContent=state.loading?'Updating historical data…':state.error?'Draft indicator unavailable':'Loading historical data…';details.textContent=state.loading?'Synchronizing approved match statistics.':state.error||'';root.querySelector('.me-blue').style.width='50%';root.querySelector('.me-red').style.width='50%';root.classList.add('me-neutral');return;
 }
 const lookup=maps(),blue=teamScore('BLUE',lookup),red=teamScore('RED',lookup);
 const sidePrior=state.blueBase-0.5;
 const delta=blue.score-red.score+sidePrior+blue.classSynergy-red.classSynergy;
 const width=50+clamp(delta*100,-30,30);
 root.querySelector('.me-blue').style.width=width+'%';root.querySelector('.me-red').style.width=(100-width)+'%';
 if(Math.abs(delta)<0.005){text.textContent='Current draft: scores nearly even · '+count+'/6 picks';root.classList.add('me-neutral');}
 else{text.textContent='Current draft: '+(delta>0?'BLUE':'RED')+' edge '+fmt(Math.abs(delta))+' · '+count+'/6 picks';root.classList.remove('me-neutral');}
 const summary=state.data.summary||{},matches=Number(summary.approved_matches)||0;
 const blueWins=Number(summary.blue_wins)||0,redWins=Number(summary.red_wins)||0;
 const lines=[
  'Data calculated: '+(state.data.generated_at||'unknown')+' · Overall · all approved matches',
  'Historical side baseline: BLUE '+pct(state.blueBase)+' ('+blueWins+'/'+matches+') · RED '+pct(state.redBase)+' ('+redWins+'/'+matches+')',
  'BLUE hero contribution: '+fmt(blue.score)+' · RED hero contribution: '+fmt(red.score),
  'First pick weight: 1.5× · later picks: 1× · prior shrinkage: 10 appearances',
  'BLUE class-partner correction: '+fmt(blue.classSynergy)+' · RED class-partner correction: '+fmt(red.classSynergy)+' · team cap ±0.030',
  'Historical BLUE side adjustment: '+fmt(sidePrior),
  'Total score difference (positive = BLUE): '+fmt(delta),
  'This score is not a win probability.'
 ];
 for(const side of ['BLUE','RED']){
  const team=side==='BLUE'?blue:red;
  for(const p of team.picks){
   const hero=config.heroes.find(h=>h.id===p.id);
   lines.push(side+' '+(p.index+1)+' '+(hero?.name||p.id)+': '+p.w+'/'+p.n+' wins · lift '+fmt(p.lift)+' · weight '+p.weight+'×');
  }
 }
 const synergyNotes=[...blue.synergyNotes.map(x=>'BLUE '+x),...red.synergyNotes.map(x=>'RED '+x)];
 if(synergyNotes.length)lines.push('Notable hero × partner-class effects: '+synergyNotes.join('; '));
 details.textContent=lines.join('\n');
}
async function load(){
 const request=++state.request;state.loading=true;state.error='';paint();
 try{
  const [data,sides,firstPicks]=await Promise.all([
   rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:false}),
   rpc('ss_get_side_stats',{p_theme_id:null,p_exclude_mirrors:false}),
   rpc('ss_get_first_pick_stats',{})
  ]);
  if(request!==state.request)return;
  if(!Array.isArray(data?.heroes)||!Array.isArray(data?.duos)||!Array.isArray(sides)||!Array.isArray(firstPicks))throw Error('Invalid historical statistics response');
  state.data=data;state.sides=sides;state.firstPicks=firstPicks;
  const summary=data.summary||{},matches=Number(summary.approved_matches)||0;
  state.blueBase=matches?clamp((Number(summary.blue_wins)||0)/matches,0,1):0.5;
  state.redBase=matches?clamp((Number(summary.red_wins)||0)/matches,0,1):1-state.blueBase;
  state.error='';
 }catch(error){if(request!==state.request)return;state.error=error?.message||'Unknown error';state.data=null;state.sides=null;state.firstPicks=null;}
 finally{if(request===state.request){state.loading=false;paint();}}
}
window.addEventListener('tracker:draft-changed',paint);
window.addEventListener('tracker:draft-reset',paint);
window.addEventListener('tracker:catalog-changed',load);
window.addEventListener('tracker:assistant-session-started',load);
window.addEventListener('tracker:assistant-session-ended',load);
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load();});
paint();load();
})();