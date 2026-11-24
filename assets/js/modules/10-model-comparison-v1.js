(function(){
'use strict';
// The page markup is defined in index.html; only skip initialization if it is absent.

const page=document.getElementById('page-model-comparison');
const tab=document.querySelector('[data-page="model-comparison"]');
if(!page||!tab)return;
const status=document.getElementById('modelComparisonStatus');
const summary=document.getElementById('modelComparisonSummary');
const tableWrap=document.getElementById('modelComparisonTable');
const fmt=value=>{
 const n=Number(value);
 return Number.isFinite(n)?(n>0?'+':'')+n.toFixed(3):'—';
};
const pct=(wins,total)=>total?((100*wins/total).toFixed(1)+'%'):'—';
const metric=(label,value,note)=>{
 const box=document.createElement('div');
 const small=document.createElement('small');small.textContent=label;
 const strong=document.createElement('span');strong.className='metric';strong.textContent=value;
 box.append(small,strong);
 if(note){const caption=document.createElement('small');caption.className='mc-note';caption.textContent=note;box.append(caption);}
 return box;
};
function outcome(correct,predicted){
 if(predicted===null||predicted===undefined)return 'Neutral';
 return correct?'Correct':'Wrong';
}
function render(data){
 const paired=Number(data.paired_matches)||0;
 const oldScored=Number(data.old_scored)||0,newScored=Number(data.new_scored)||0;
 const oldCorrect=Number(data.old_correct)||0,newCorrect=Number(data.new_correct)||0;
 const disagreements=Number(data.disagreements)||0;
 const oldWins=Number(data.old_disagreement_wins)||0,newWins=Number(data.new_disagreement_wins)||0;
 const bothWrong=Number(data.both_wrong)||0;
 summary.replaceChildren();
 summary.append(
  metric('Paired matches',String(paired),'Both snapshots available'),
  metric('Old Match Indicator',oldCorrect+'/'+oldScored,pct(oldCorrect,oldScored)+' correct'),
  metric('New SDI',newCorrect+'/'+newScored,pct(newCorrect,newScored)+' correct'),
  metric('Disagreements',String(disagreements), 'Old '+oldWins+' · SDI '+newWins),
  metric('Both wrong',String(bothWrong),'Same losing side indicated')
 );
 const oldMagnitude=Number(data.old_mean_wrong_magnitude);
 const newMagnitude=Number(data.new_mean_wrong_magnitude);
 const note=document.getElementById('modelComparisonWrongMagnitude');
 note.textContent=bothWrong
  ? 'When both models were wrong on the same side: mean |score| — old '+fmt(oldMagnitude)+' · SDI '+fmt(newMagnitude)+'. Lower means a less forceful wrong signal in this subset.'
  : 'Mean strength of shared wrong signals will appear after both models have made the same incorrect call on at least one paired match.';
 tableWrap.replaceChildren();
 const rows=Array.isArray(data.recent_matches)?data.recent_matches:[];
 if(!rows.length){
  const empty=document.createElement('p');empty.className='empty';empty.textContent='No paired matches yet. New approved matches with both draft orders known will appear here automatically.';tableWrap.append(empty);return;
 }
 const table=document.createElement('table');
 const head=document.createElement('thead'),headRow=document.createElement('tr');
 for(const label of ['Played','Draft','Winner','Old · score','SDI · score','Old result','SDI result']){
  const th=document.createElement('th');th.textContent=label;headRow.append(th);
 }
 head.append(headRow);table.append(head);
 const body=document.createElement('tbody');
 for(const row of rows){
  const tr=document.createElement('tr');
  const values=[
   row.played_at?new Date(row.played_at).toLocaleString():'—',
   'B: '+(row.blue_ids||[]).join(', ')+' / R: '+(row.red_ids||[]).join(', '),
   row.winner||'—',
   fmt(row.old_score_delta),
   fmt(row.new_score_delta),
   outcome(row.old_is_correct,row.old_predicted_side),
   outcome(row.new_is_correct,row.new_predicted_side)
  ];
  values.forEach((value,index)=>{
   const td=document.createElement('td');td.textContent=value;
   if(index===1)td.className='mc-draft';
   if(index===5||index===6){
    const isCorrect=index===5?row.old_is_correct:row.new_is_correct;
    td.className=isCorrect===true?'mc-correct':isCorrect===false?'mc-wrong':'mc-neutral';
   }
   tr.append(td);
  });
  body.append(tr);
 }
 table.append(body);tableWrap.append(table);
}
let loading=false,lastLoaded=0;
async function load(force=false){
 if(loading)return;
 if(!force&&Date.now()-lastLoaded<15000)return;
 loading=true;status.textContent='Loading paired model history…';
 try{
  const data=await rpc('ss_get_model_comparison_stats',{});
  if(!data||!Array.isArray(data.recent_matches))throw Error('Invalid model comparison response.');
  render(data);lastLoaded=Date.now();
  status.textContent='Updated '+new Date().toLocaleString()+'. Only matches with both automatic snapshots are included.';
 }catch(error){status.textContent='Unable to load model comparison: '+(error?.message||'Unknown error');}
 finally{loading=false;}
}
document.getElementById('refreshModelComparison').addEventListener('click',()=>load(true));
tab.addEventListener('click',()=>load());
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)load(true);});
window.addEventListener('tracker:model-comparison-refresh',()=>load(true));
const style=document.createElement('style');
style.textContent=`
#page-model-comparison .mc-note{display:block;margin-top:3px;font-size:11px;opacity:.72}
#page-model-comparison #modelComparisonWrongMagnitude{margin:12px 0;font-size:13px;line-height:1.5}
#page-model-comparison .mc-draft{min-width:250px;font-size:11px;line-height:1.45;white-space:normal}
#page-model-comparison .mc-correct{color:#72c98b;font-weight:700}
#page-model-comparison .mc-wrong{color:#e58b8b;font-weight:700}
#page-model-comparison .mc-neutral{opacity:.65}
#page-model-comparison .table-wrap{overflow-x:auto}
`;
document.head.append(style);
})();
