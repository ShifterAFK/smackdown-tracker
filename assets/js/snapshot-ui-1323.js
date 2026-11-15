(function(){
'use strict';
if(window.TrackerSnapshotUI1323)return;
const dialog=document.getElementById('mobileDraft130');
// The original mobile dialog kept daEnabled checked on close. End the session explicitly.
if(dialog)dialog.addEventListener('close',()=>{
 if(document.body.classList.contains('desktop133-enabled'))return;
 const toggle=document.getElementById('daEnabled');
 if(toggle?.checked){toggle.checked=false;toggle.dispatchEvent(new Event('change',{bubbles:true}));}
});
window.TrackerSnapshotUI1323={version:'1.3.23'};
})();

// Tier thresholds 1.3.25: S and A use win rate plus the Wilson lower bound.
window.tierBucket=function(rate,n){
 if(!Number.isFinite(rate)||!Number.isFinite(n)||n<10)return 'N';
 const wins=Math.max(0,Math.min(n,Math.round(rate*n/100)));
 const lower=wilson(wins,n)[0];
 if(rate>=70&&lower>=0.5)return 'S';
 if(rate>=60&&lower>=0.4)return 'A';
 if(rate>=50)return 'B';
 return 'C';
};