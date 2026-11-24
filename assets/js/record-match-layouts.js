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
// Ranking and draft-order controls are moved after both modules initialize.
const top=document.createElement('section');top.id='recordTop';top.className='record-top';
// Put the current event map thumbnail beside the product title. No map picker or map rotation panel in Record Match.
const mapArea=match.querySelector('.map-area');
const mapImage=document.getElementById('mapPreview');
const mapName=document.getElementById('mapSelectedName');
const brand=document.querySelector('.brand-header');
if(brand&&mapImage){
 const brandMap=document.createElement('div');brandMap.className='brand-current-map';
 const brandMapCopy=document.createElement('div');brandMapCopy.className='brand-current-map-copy';
 const caption=document.createElement('span');caption.textContent='CURRENT MAP';
 brandMapCopy.append(caption);
 if(mapName)brandMapCopy.append(mapName);
 brandMap.append(brandMapCopy,mapImage);
 const brandStatus=brand.querySelector('.brand-status');
 brand.insertBefore(brandMap,brandStatus||null);
}
// Core match code still expects these map nodes to exist, so retain them hidden
// while exposing only the current map name and thumbnail in the brand header.
const mapState=document.createElement('div');mapState.id='recordMapState';mapState.hidden=true;
for(const id of ['theme','currentTheme','chooseMap','mapOpen']){
 const node=document.getElementById(id);
 if(node)mapState.append(node);
}
page.append(mapState);
mapArea?.remove();

const teams=match.querySelector('.teams');
const indicator=document.getElementById('draftIndicator');
if(indicator)top.append(indicator);
const showdownIndicator=document.getElementById('showdownDraftIndicator');
if(showdownIndicator)top.append(showdownIndicator);
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
// Draft-order toolbar may be created before or after this module; move it whenever it appears.
function moveTopControls(){
 const ranking=page.querySelector('.record-tier-controls');
 if(ranking&&ranking.parentElement!==controls)controls.append(ranking);
 const orderTools=page.querySelector('.catalog-order-tools');
 if(orderTools&&orderTools.parentElement!==controls)controls.append(orderTools);
}
moveTopControls();
const orderObserver=new MutationObserver(moveTopControls);
orderObserver.observe(page,{childList:true,subtree:true});
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