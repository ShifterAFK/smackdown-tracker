(function(){
'use strict';
if(window.TrackerDraftRules1322)return;
const sequence=[['BLUE',0],['RED',0],['RED',1],['BLUE',1],['BLUE',2],['RED',2]];
let editing=null,suggestionSide=null;
const originalChoose=choose,originalDrop=applyDrop,originalRender=renderSlots;
function enabled(){
 const dialog=document.getElementById('mobileDraft130');
 return document.body.classList.contains('desktop133-enabled')||Boolean(dialog?.open&&dialog.dataset.mode==='assistant');
}
function next(){const slot=sequence.find(([side,index])=>!lineup[side][index]);return slot?{side:slot[0],index:slot[1]}:null;}
function target(){if(editing&&lineup[editing.side]?.[editing.index])return {...editing};editing=null;return next();}
function same(a,b){return Boolean(a&&b&&a.side===b.side&&a.index===b.index);}
function message(text){tell('entryStatus',text,true);const box=document.querySelector('#mobileDraft130 .md130message');if(box)box.textContent=text;}
function allowed(id){const h=heroById(id);return Boolean(h&&h.is_allowed&&!isBannedHero(h));}
function refresh(){const slot=target();if(slot)active=slot;originalRender();}
choose=function(id){
 if(!enabled())return originalChoose(id);
 if(onlineBusy||!allowed(id))return;
 const slot=target();if(!slot){message('Draft complete. Select an occupied slot to correct a pick.');return;}
 if(suggestionSide&&suggestionSide!==slot.side){message('These suggestions are for '+suggestionSide+'. Record the opponent from the full hero pool.');return;}
 if(Object.values(lineup).flat().some((value)=>value===id)){
  message('That hero is already drafted. Remove it before choosing it again.');return;
 }
 const before=JSON.stringify(lineup);active={...slot};originalChoose(id);
 if(JSON.stringify(lineup)!==before){editing=null;const following=next();if(following)active=following;originalRender();renderHeroes();}
};
applyDrop=function(side,index){
 if(!enabled())return originalDrop(side,index);
 if(onlineBusy||!dragData)return;
 if(dragData.kind!=='hero'){message('Moving drafted heroes is disabled in Assistant. Select an occupied slot to replace its hero, or close Assistant to rearrange freely.');return;}
 if(!allowed(dragData.id))return;
 const destination={side,index};
 if(!['BLUE','RED'].includes(side)||![0,1,2].includes(index))return;
 const expected=next();
 if(!lineup[side][index]&&!same(destination,expected)){
  message('Next pick: '+(expected?expected.side+' '+(expected.index+1):'draft complete')+'. Drop on that slot.');refresh();return;
 }
 if(lineup[side][index])editing=destination;
 else editing=null;
 choose(dragData.id);
};
renderSlots=function(){if(enabled()){const slot=target();if(slot)active=slot;}return originalRender();};
document.addEventListener('click',event=>{
 if(!enabled()){editing=null;return;}
 const element=event.target;
 const candidate=element.closest?.('.da-candidate');
 if(candidate){
  const own=document.body.dataset.desktop133Side||document.getElementById('mobileDraft130')?.dataset.suggestionSide;
  const side=candidate.closest('.da-side')?.classList.contains('da-red')?'RED':'BLUE';
  suggestionSide=own||side;
  queueMicrotask(()=>{suggestionSide=null;});
 }
 const slotButton=element.closest?.('#slotsBLUE .slot,#slotsRED .slot,#mobileDraft130 .md130slot');
 if(!slotButton)return;
 let side,index;
 if(slotButton.classList.contains('md130slot')){
  const group=slotButton.closest('.md130team');side=group?.dataset.side;index=Array.from(group?.querySelectorAll('.md130slot')||[]).indexOf(slotButton);
 }else{
  const group=slotButton.closest('#slotsBLUE,#slotsRED');side=group?.id==='slotsRED'?'RED':'BLUE';index=Array.from(group?.querySelectorAll('.slot')||[]).indexOf(slotButton);
 }
 if(!['BLUE','RED'].includes(side)||index<0||index>2)return;
 if(lineup[side][index]){editing={side,index};active={side,index};}
 else{
  editing=null;const slot=next();
  if(!same({side,index},slot)){event.preventDefault();event.stopImmediatePropagation();message('Assistant follows draft order. Next pick: '+(slot?slot.side+' '+(slot.index+1):'draft complete')+'.');refresh();}
 }
},true);
window.addEventListener('tracker:draft-reset',()=>{editing=null;suggestionSide=null;});
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved){editing=null;suggestionSide=null;}});
new MutationObserver(()=>{if(!enabled())editing=null;}).observe(document.body,{attributes:true,attributeFilter:['class']});
window.TrackerDraftRules1322=Object.freeze({version:'1.3.22',next});
})();
