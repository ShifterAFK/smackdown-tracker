(function(){
'use strict';
const openHeroes=()=>{const api=window.MobileDraft130;if(api&&typeof api.open==='function')queueMicrotask(()=>api.open('heroes'));};
document.addEventListener('click',event=>{
 if(!matchMedia('(max-width:1099px)').matches)return;
 if(event.target.closest('#page-tiers,#page-statistics'))return;
 const slot=event.target.closest('#slotsBLUE .slot,#slotsRED .slot');
 const team=event.target.closest('.team.blue,.team.red');
 if(!slot&&!team)return;
 if(event.target.closest('.slot-remove,.phantimal-chip,input,select,label'))return;
 openHeroes();
},true);
})();