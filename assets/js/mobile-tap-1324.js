(function(){
'use strict';
const openHeroes=()=>{const api=window.MobileDraft130;if(api&&typeof api.open==='function')queueMicrotask(()=>api.open('heroes'));};
document.addEventListener('click',event=>{
 if(!matchMedia('(max-width:1099px)').matches)return;
 const team=event.target.closest('.team.blue,.team.red');
 if(!team)return;
 const control=event.target.closest('.slot-remove,.phantimal-chip,input,select,label');
 if(control)return;
 const slot=event.target.closest('#slotsBLUE .slot,#slotsRED .slot');
 if(slot){openHeroes();return;}
 event.stopPropagation();
},true);
})();