// Module: draft-indicator-rules-v1
(function(){
'use strict';
if(document.getElementById('draftIndicator'))return;
const winner=document.getElementById('winnerPicker');if(!winner)return;
const root=document.createElement('section');root.id='draftIndicator';root.className='me-neutral';root.setAttribute('aria-label','Rule based draft indicator');
root.innerHTML='<div class="me-head"><span class="me-heading">DRAFT INDICATOR</span><span class="me-tag">rule based · not a win probability</span></div><div class="me-result" role="status" aria-live="polite">Complete both teams</div><div class="me-track" aria-hidden="true"><div class="me-blue"></div><div class="me-red"></div></div><div class="me-legend"><span>BLUE</span><span>Rule based comparison</span><span>RED</span></div><details><summary>Why this indication</summary><div class="me-details"></div></details>';
winner.before(root);
const state={data:null,error:'',loading:false};
const ORDER=['BLUE','RED','RED','BLUE','BLUE','RED'];
const rate=(wins,n)=>n>0?(wins+5)/(n+10):0.5;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function ratings(){const map=new Map();for(const row of state.data?.heroes||[]){map.set(row.hero_id,rate(Number(row.wins)||0,Number(row.appearances)||0));}return map;}
function poolIds(){const ids=new Set();for(const row of state.data?.heroes||[])ids.add(row.hero_id);for(const side of['BLUE','RED'])for(const id of lineup[side])if(id)ids.add(id);return[...ids];}
function duoScore(ids){const map=new Map();for(const row of state.data?.duos||[]){map.set([row.hero_1_id,row.hero_2_id].sort().join('|'),row);}let score=0;const notes=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const a=ids[i],b=ids[j];if(!a||!b)continue;const row=map.get([a,b].sort().join('|'));const n=Number(row?.appearances)||0;if(n<3)continue;const value=rate(Number(row.wins)||0,n);const contribution=clamp((value-0.5)*0.25,-0.12,0.12);score+=contribution;if(Math.abs(contribution)>0.01)notes.push(a+' + '+b+': '+(value>0.5?'positive':'negative')+' duo history ('+n+')');}return{score,notes};}
function h2hScore(blueIds,redIds){const rows=state.data?.matchups;if(!Array.isArray(rows))return{score:0,notes:[]};const map=new Map();for(const row of rows){map.set([row.hero_1_id,row.hero_2_id].sort().join('|'),row);}let score=0;const notes=[];for(const blue of blueIds)for(const red of redIds){if(!blue||!red)continue;const row=map.get([blue,red].sort().join('|'));const n=Number(row?.appearances)||0;if(n<3)continue;const blueIsFirst=row.hero_1_id===blue;const wins=blueIsFirst?Number(row.wins):Number(row.appearances)-Number(row.wins);const value=rate(wins,n);const contribution=clamp((value-0.5)*0.2,-0.1,0.1);score+=contribution;if(Math.abs(contribution)>0.01)notes.push(blue+' vs '+red+': '+(value>0.5?'favours BLUE':'favours RED')+' ('+n+')');}return{score,notes};}
function paint(){const complete=['BLUE','RED'].every(side=>lineup[side].length===3&&lineup[side].every(Boolean));const text=root.querySelector('.me-result');const details=root.querySelector('.me-details');if(!complete){text.textContent='Complete both teams';details.textContent='Fill all six slots to see a rule based indication.';root.querySelector('.me-blue').style.width='50%';root.querySelector('.me-red').style.width='50%';root.classList.add('me-neutral');return;}if(!state.data){text.textContent=state.error?'Draft indicator unavailable':'Loading historical data…';details.textContent=state.error||'';return;}
const rating=ratings();const pool=poolIds();const available=new Set(pool);const values={BLUE:0,RED:0};const notes=['BLUE first pick: small initiative advantage'];
for(let i=0;i<6;i++){const side=ORDER[i];const id=lineup[side][i];if(!id)continue;const others=[...available].filter(x=>x!==id);const avg=others.length?others.reduce((sum,x)=>sum+(rating.get(x)??0.5),0)/others.length:0.5;const value=(rating.get(id)??0.5)-avg;values[side]+=value;available.delete(id);}
const blueDuo=duoScore(lineup.BLUE);const redDuo=duoScore(lineup.RED);const h2h=h2hScore(lineup.BLUE,lineup.RED);
const delta=0.03+values.BLUE-values.RED+blueDuo.score-redDuo.score+h2h.score;
notes.push(...blueDuo.notes,...redDuo.notes,...h2h.notes);
const blueWidth=50+clamp(delta*100,-30,30);root.querySelector('.me-blue').style.width=blueWidth+'%';root.querySelector('.me-red').style.width=(100-blueWidth)+'%';
if(Math.abs(delta)<0.02){text.textContent='No clear indication';root.classList.add('me-neutral');}else{const side=delta>0?'BLUE':'RED';const strength=Math.abs(delta)<0.06?'Slight':'Stronger';text.textContent=strength+' '+side+' indication';root.classList.remove('me-neutral');}
details.textContent=notes.join('\n');}
async function load(){if(state.loading)return;state.loading=true;try{const data=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:true});if(!Array.isArray(data?.heroes)||!Array.isArray(data?.duos))throw Error('Invalid statistics response');state.data=data;state.error='';}catch(error){state.error=error.message;state.data=null;}state.loading=false;paint();}
window.addEventListener('tracker:draft-changed',paint);window.addEventListener('tracker:catalog-changed',load);document.getElementById('theme')?.addEventListener('change',load);window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load();});
paint();load();
})();