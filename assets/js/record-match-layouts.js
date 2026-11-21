// Optional Record Match layouts. The draft and submission business logic stay in the core module.
(function(){
'use strict';
const page=document.getElementById('page-entry');
const match=page?.querySelector('.match-panel');
const catalog=page?.querySelector('.hero-panel');
if(!page||!match||!catalog||document.getElementById('recordLayoutSwitch'))return;
const KEY='smackdown-record-match-layout';
let selected='legacy';
try{selected=localStorage.getItem(KEY)==='new'?'new':'legacy';}catch{}
const controls=document.createElement('div');
controls.id='recordLayoutSwitch';controls.className='record-layout-switch';
controls.setAttribute('role','group');controls.setAttribute('aria-label','Record Match layout');
const label=document.createElement('span');label.className='record-layout-label';label.textContent='Layout';
const choices=document.createElement('div');choices.className='record-layout-choices';
const buttons={};
for(const [value,text] of [['new','New Layout'],['legacy','Legacy']]){
 const button=document.createElement('button');button.type='button';button.dataset.layout=value;button.textContent=text;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>setLayout(value));buttons[value]=button;choices.append(button);
}
controls.append(label,choices);page.insertBefore(controls,match);

const top=document.createElement('section');top.id='recordTop';top.className='record-top';
const map=match.querySelector('.map-area');
const teams=match.querySelector('.teams');
if(map)top.append(map);
if(teams)top.append(teams);
page.insertBefore(top,outcomePlaceholder());
function outcomePlaceholder(){return catalog;}
const outcome=document.createElement('section');outcome.id='recordOutcome';outcome.className='record-outcome';
const toggle=document.createElement('button');toggle.id='recordOutcomeToggle';toggle.type='button';toggle.setAttribute('aria-expanded','false');
const toggleTitle=document.createElement('span');toggleTitle.textContent='Match Indicator & Result';
const hint=document.createElement('span');hint.className='outcome-hint';hint.textContent='Expand when ready';
const chevron=document.createElement('span');chevron.textContent='＋';
toggle.append(toggleTitle,hint,chevron);
const body=document.createElement('div');body.id='recordOutcomeBody';body.hidden=true;
const indicator=document.getElementById('draftIndicator');
const winner=document.getElementById('winnerPicker');
const submission=document.createElement('div');submission.id='recordOutcomeSubmission';
const moveIds=['verification','captchaStatus','submitOnline','secondary-actions','entryStatus'];
if(indicator)body.append(indicator);
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
function setLayout(value){
 selected=value==='new'?'new':'legacy';
 page.classList.toggle('record-layout-new',selected==='new');
 page.dataset.recordLayout=selected;
 for(const [key,button] of Object.entries(buttons)){const active=key===selected;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
 try{localStorage.setItem(KEY,selected);}catch{}
 window.dispatchEvent(new CustomEvent('tracker:record-layout-changed',{detail:{layout:selected}}));
}
setLayout(selected);
})();