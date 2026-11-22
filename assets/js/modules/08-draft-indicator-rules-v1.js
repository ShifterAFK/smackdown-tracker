// Module: draft-indicator-rules-v1
(function(){
'use strict';
if(document.getElementById('draftIndicator'))return;
const winner=document.getElementById('winnerPicker');if(!winner)return;
const root=document.createElement('section');root.id='draftIndicator';root.className='me-neutral';root.setAttribute('aria-label','Live experimental draft advantage indicator');
root.innerHTML='<div class="me-head"><span class="me-heading">LIVE DRAFT EDGE</span><span class="me-tag">EXPERIMENTAL</span></div><div class="me-result" role="status" aria-live="polite">Add heroes to compare</div><div class="me-track" aria-hidden="true"><div class="me-blue"></div><div class="me-red"></div></div><div class="me-legend"><span>BLUE</span><span>Rule based comparison</span><span>RED</span></div><details><summary>Why this indication</summary><div class="me-explanation"></div><div class="me-details"></div></details>';
const style=document.createElement('style');
style.textContent='#draftIndicator{padding:9px 12px;margin:12px 0}#draftIndicator .me-head{margin-bottom:3px}#draftIndicator .me-result{margin:2px 0}#draftIndicator .me-track{position:relative;margin:4px 0}#draftIndicator .me-track::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:#e7c66d;box-shadow:0 0 2px #211a0c;pointer-events:none}#draftIndicator.me-neutral .me-track{opacity:1}#draftIndicator.me-neutral .me-blue,#draftIndicator.me-neutral .me-red{opacity:.48}#draftIndicator details{margin-top:5px}#draftIndicator .me-explanation{white-space:pre-line;line-height:1.5;margin-top:7px;color:var(--muted,#c0c2b5)}';
root.append(style);
root.querySelector('.me-explanation').textContent='Live historical-data comparison, not a validated prediction or a win probability. The indication updates whenever a hero is added, moved or removed. The bar shows the direction and size of a rule-based score difference; the gold line marks the neutral midpoint. Slight and Stronger are score labels, not measured confidence levels.\n\nHero ratings use recorded team wins, adjusted toward neutral for small samples. Pick scores compare these ratings with the remaining statistical catalog, not the actual 20-hero draft pool: the pool and bans are not recorded here. Duo results contribute only with at least 3 appearances; they describe teams containing a pair, not isolated synergy. These overlapping records are not independent evidence.\n\nA small fixed BLUE first-pick bonus is a rule assumption, not a measured guarantee. All maps are combined. Map buffs, battlefield positions, player strength and Phantimal effects are not scored separately. Opponent matchup history contributes only when a matchup array is supplied; otherwise that component is zero. This module does not fetch matchup history separately.\n\nThe score has not been validated for betting decisions and does not establish a betting edge.';
winner.before(root);
const state={data:null,error:'',loading:false,request:0};
const ORDER=['BLUE','RED','RED','BLUE','BLUE','RED'];
const rate=(wins,n)=>n>0?(wins+5)/(n+10):0.5;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function ratings(){const map=new Map();for(const row of state.data?.heroes||[]){map.set(row.hero_id,rate(Number(row.wins)||0,Number(row.appearances)||0));}return map;}
function poolIds(){const ids=new Set();for(const row of state.data?.heroes||[])ids.add(row.hero_id);for(const side of['BLUE','RED'])for(const id of lineup[side])if(id)ids.add(id);return[...ids];}
function duoScore(ids){const map=new Map();for(const row of state.data?.duos||[]){map.set([row.hero_1_id,row.hero_2_id].sort().join('|'),row);}let score=0;const notes=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const a=ids[i],b=ids[j];if(!a||!b)continue;const row=map.get([a,b].sort().join('|'));const n=Number(row?.appearances)||0;if(n<3)continue;const value=rate(Number(row.wins)||0,n);const contribution=clamp((value-0.5)*0.25,-0.12,0.12);score+=contribution;if(Math.abs(contribution)>0.01)notes.push(a+' + '+b+': '+(value>0.5?'positive':'negative')+' duo history ('+n+')');}return{score,notes};}
function h2hScore(blueIds,redIds){const rows=state.data?.matchups;if(!Array.isArray(rows))return{score:0,notes:[]};const map=new Map();for(const row of rows){map.set([row.hero_1_id,row.hero_2_id].sort().join('|'),row);}let score=0;const notes=[];for(const blue of blueIds)for(const red of redIds){if(!blue||!red)continue;const row=map.get([blue,red].sort().join('|'));const n=Number(row?.appearances)||0;if(n<3)continue;const blueIsFirst=row.hero_1_id===blue;const wins=blueIsFirst?Number(row.wins):Number(row.appearances)-Number(row.wins);const value=rate(wins,n);const contribution=clamp((value-0.5)*0.2,-0.1,0.1);score+=contribution;if(Math.abs(contribution)>0.01)notes.push(blue+' vs '+red+': '+(value>0.5?'favours BLUE':'favours RED')+' ('+n+')');}return{score,notes};}
function paint(){
const text=root.querySelector('.me-result');
const details=root.querySelector('.me-details');
const picked=['BLUE','RED'].flatMap(side=>lineup[side].filter(Boolean));
const count=picked.length;
if(!count){
 text.textContent='Add heroes to compare';
 details.textContent='The live indication starts changing as soon as you add the first hero.';
 root.querySelector('.me-blue').style.width='50%';
 root.querySelector('.me-red').style.width='50%';
 root.classList.add('me-neutral');
 return;
}
if(state.loading||!state.data){
 text.textContent=state.loading?'Updating historical data…':state.error?'Draft indicator unavailable':'Loading historical data…';
 details.textContent=state.loading?'Synchronizing Overall data.':state.error||'';
 root.querySelector('.me-blue').style.width='50%';
 root.querySelector('.me-red').style.width='50%';
 root.classList.add('me-neutral');
 return;
}
const rating=ratings();
const pool=poolIds();
const available=new Set(pool);
const values={BLUE:0,RED:0};
const initiativeBonus=lineup.BLUE[0]?0.03:0;
const notes=initiativeBonus?['BLUE first-pick initiative bonus is a fixed rule assumption']:[ ];
const nextSlot={BLUE:0,RED:0};
for(const side of ORDER){
 const index=nextSlot[side]++;
 const id=lineup[side][index];
 if(!id)continue;
 const others=[...available].filter(x=>x!==id);
 const avg=others.length?others.reduce((sum,x)=>sum+(rating.get(x)??0.5),0)/others.length:0.5;
 values[side]+=(rating.get(id)??0.5)-avg;
 available.delete(id);
}
const blueDuo=duoScore(lineup.BLUE);
const redDuo=duoScore(lineup.RED);
const h2h=h2hScore(lineup.BLUE,lineup.RED);
const delta=initiativeBonus+values.BLUE-values.RED+blueDuo.score-redDuo.score+h2h.score;
notes.push(...blueDuo.notes,...redDuo.notes,...h2h.notes);
const blueWidth=50+clamp(delta*100,-30,30);
root.querySelector('.me-blue').style.width=blueWidth+'%';
root.querySelector('.me-red').style.width=(100-blueWidth)+'%';
if(Math.abs(delta)<0.02){
 text.textContent='Current draft: no clear edge · '+count+'/6 picks';
 root.classList.add('me-neutral');
}else{
 const side=delta>0?'BLUE':'RED';
 const strength=Math.abs(delta)<0.06?'Slight':'Stronger';
 text.textContent='Current draft: '+strength+' '+side+' edge · '+count+'/6 picks';
 root.classList.remove('me-neutral');
}
const fmt=value=>(value>=0?'+':'')+value.toFixed(4);
const breakdown=[
 'Data calculated: '+(state.data.generated_at||'unknown')+' · Overall · mirrors excluded',
 'This is a rule-based edge score, not a win probability.',
 'Picks counted: '+count+'/6',
 'Score convention: positive = BLUE, negative = RED',
 'Hero picks BLUE: '+fmt(values.BLUE),
 'Hero picks RED: '+fmt(values.RED),
 'Hero difference: '+fmt(values.BLUE-values.RED),
 'BLUE first-pick bonus: '+fmt(initiativeBonus),
 'DUO BLUE: '+fmt(blueDuo.score)+'; RED: '+fmt(redDuo.score),
 'H2H: '+fmt(h2h.score)+(Array.isArray(state.data.matchups)?'':' (not supplied)'),
 'Total score: '+fmt(delta)
];
details.textContent=breakdown.join('\n')+'\n\n'+notes.join('\n');
}
async function load(){const request=++state.request;state.loading=true;state.error='';paint();try{const data=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:true});if(request!==state.request)return;if(!Array.isArray(data?.heroes)||!Array.isArray(data?.duos))throw Error('Invalid statistics response');state.data=data;state.error='';}catch(error){if(request!==state.request)return;state.error=error.message;state.data=null;}finally{if(request===state.request){state.loading=false;paint();}}}
window.addEventListener('tracker:draft-changed',paint);window.addEventListener('tracker:draft-reset',paint);window.addEventListener('tracker:catalog-changed',load);window.addEventListener('tracker:assistant-session-started',load);window.addEventListener('tracker:assistant-session-ended',load);document.getElementById('theme')?.addEventListener('change',load);window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load();});
paint();load();
})();