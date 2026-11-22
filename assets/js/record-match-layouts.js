// Compact Record Match layout. The draft and submission business logic stay in the core module.
(function(){
'use strict';
const page=document.getElementById('page-entry');
const match=page?.querySelector('.match-panel');
const catalog=page?.querySelector('.hero-panel');
if(!page||!match||!catalog||document.getElementById('recordLayoutSwitch'))return;
page.classList.add('record-layout-new');
page.dataset.recordLayout='new';
window.dispatchEvent(new CustomEvent('tracker:record-layout-changed',{detail:{layout:'new'}}));
const controls=document.createElement('div');
controls.id='recordLayoutSwitch';controls.className='record-layout-switch';
page.insertBefore(controls,match);
// The desktop ranking selector shares the top utility bar instead of taking a full row.
const ranking=document.querySelector('#page-entry .record-tier-controls');
if(ranking)controls.append(ranking);

const top=document.createElement('section');top.id='recordTop';top.className='record-top';
const teams=match.querySelector('.teams');
const indicator=document.getElementById('draftIndicator');
if(indicator)top.append(indicator);
if(teams){
 for(const side of ['BLUE','RED']){
  const team=teams.querySelector('.team.'+side.toLowerCase());
  const check=team?.querySelector('label.check');
  const phantimal=document.getElementById('phantimal'+side);
  if(team&&check&&phantimal){
   const meta=document.createElement('div');meta.className='team-meta-row';
   check.before(meta);meta.append(check,phantimal);
  }
 }
 top.append(teams);
}
// Move the draft-order follow toggle into the top utility bar.
const orderTools=match.querySelector('.catalog-order-tools');
if(orderTools)controls.append(orderTools);
page.insertBefore(top,outcomePlaceholder());
function outcomePlaceholder(){return catalog;}
// Keep faction filters beside the search controls rather than in a separate panel.
const searchRow=catalog.querySelector('.hero-panel>.row');
const factionFilters=document.getElementById('factionFilters');
if(searchRow&&factionFilters)searchRow.append(factionFilters);
// The old TOP-6 legend is obsolete; ranking is now shown in the top utility bar.
document.querySelectorAll('.catalog-top-legend').forEach(node=>node.remove());
const outcome=document.createElement('section');outcome.id='recordOutcome';outcome.className='record-outcome';
const toggle=document.createElement('button');toggle.id='recordOutcomeToggle';toggle.type='button';toggle.setAttribute('aria-expanded','false');
const toggleTitle=document.createElement('span');toggleTitle.textContent='Submit match result';
const hint=document.createElement('span');hint.className='outcome-hint';hint.textContent='Expand when ready';
const chevron=document.createElement('span');chevron.textContent='＋';
toggle.append(toggleTitle,hint,chevron);
const body=document.createElement('div');body.id='recordOutcomeBody';body.hidden=true;
const winner=document.getElementById('winnerPicker');
const submission=document.createElement('div');submission.id='recordOutcomeSubmission';
const moveIds=['verification','captchaStatus','submitOnline','secondary-actions','entryStatus'];
if(winner)submission.append(winner);
for(const id of moveIds){
 const node=id==='verification'?match.querySelector('.verification'):id==='submitOnline'?match.querySelector('.actions'):id==='secondary-actions'?match.querySelector('.secondary-actions'):document.getElementById(id);
 if(node)submission.append(node);
}
body.append(submission);outcome.append(toggle,body);page.insertBefore(outcome,catalog);
let expanded=false,wasFull=false;
function setExpanded(value){
 expanded=Boolean(value);body.hidden=!expanded;
 toggle.setAttribute('aria-expanded',String(expanded));
 chevron.textContent=expanded?'−':'＋';
 hint.textContent=expanded?'Click to collapse':'Expand when ready';
 outcome.classList.toggle('expanded',expanded);
}
toggle.addEventListener('click',()=>setExpanded(!expanded));
function pickedCount(){return page.querySelectorAll('#slotsBLUE .slot .avatar, #slotsRED .slot .avatar').length;}
window.addEventListener('tracker:draft-changed',()=>{
 const full=pickedCount()===6;
 if(full&&!wasFull)setExpanded(true);
 if(!full&&pickedCount()===0){setExpanded(false);}
 wasFull=full;
});
window.addEventListener('tracker:draft-reset',()=>{wasFull=false;setExpanded(false);});
window.addEventListener('tracker:submission-finished',event=>{
 if(event.detail?.saved){wasFull=false;setExpanded(false);}
});

})();