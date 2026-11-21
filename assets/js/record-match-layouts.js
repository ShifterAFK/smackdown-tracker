// Optional Record Match layout switch. The Legacy DOM and draft logic remain untouched.
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
controls.id='recordLayoutSwitch';
controls.className='record-layout-switch';
controls.setAttribute('role','group');
controls.setAttribute('aria-label','Record Match layout');
const label=document.createElement('span');
label.className='record-layout-label';
label.textContent='Layout';
const choices=document.createElement('div');
choices.className='record-layout-choices';
const buttons={};
for(const [value,text] of [['new','New Layout'],['legacy','Legacy']]){
 const button=document.createElement('button');
 button.type='button';
 button.dataset.layout=value;
 button.textContent=text;
 button.setAttribute('aria-pressed','false');
 button.addEventListener('click',()=>setLayout(value));
 buttons[value]=button;
 choices.append(button);
}
controls.append(label,choices);
page.insertBefore(controls,match);
function setLayout(value){
 selected=value==='new'?'new':'legacy';
 page.classList.toggle('record-layout-new',selected==='new');
 page.dataset.recordLayout=selected;
 for(const [key,button] of Object.entries(buttons)){
  const active=key===selected;
  button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',String(active));
 }
 try{localStorage.setItem(KEY,selected);}catch{}
 window.dispatchEvent(new CustomEvent('tracker:record-layout-changed',{detail:{layout:selected}}));
}
setLayout(selected);
})();
