(function(){
'use strict';
const openHeroes=()=>{const api=window.MobileDraft130;if(api&&typeof api.open==='function')queueMicrotask(()=>api.open('heroes'));};
document.addEventListener('click',event=>{
 if(!matchMedia('(max-width:1099px)').matches)return;
 const title=event.target.closest('.team-title');
 if(title){event.stopPropagation();event.preventDefault();return;}
 const slot=event.target.closest('#slotsBLUE .slot,#slotsRED .slot');
 if(!slot)return;
 if(event.target.closest('.slot-remove'))return;
 openHeroes();
},true);
})();