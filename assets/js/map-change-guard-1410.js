(function(){
'use strict';
if(window.TrackerMapChangeGuard1410)return;
const choices=document.getElementById('mapChoices');
if(!choices)return;
choices.addEventListener('click',event=>{
 const button=event.target instanceof Element?event.target.closest('.map-choice'):null;
 if(!button||event.defaultPrevented)return;
 const name=button.querySelector('span')?.textContent||'this map';
 const message='Change the map for this match to '+name+'?';
 if(!window.confirm(message)){
  event.preventDefault();
  event.stopImmediatePropagation();
 }
},{capture:true});
window.TrackerMapChangeGuard1410=Object.freeze({version:'1.3.10'});
})();
