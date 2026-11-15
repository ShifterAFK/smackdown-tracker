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
