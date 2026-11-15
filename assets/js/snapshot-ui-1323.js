(function(){
'use strict';
if(!window.TrackerSnapshotUI1323){
 const dialog=document.getElementById('mobileDraft130');
 if(dialog)dialog.addEventListener('close',()=>{
  if(document.body.classList.contains('desktop133-enabled'))return;
  const toggle=document.getElementById('daEnabled');
  if(toggle?.checked){toggle.checked=false;toggle.dispatchEvent(new Event('change',{bubbles:true}));}
 });
 window.TrackerSnapshotUI1323={version:'1.3.23'};
}
if(window.TrackerTierListLoading||window.TrackerTransparentTiers)return;
window.TrackerTierListLoading=true;
const script=document.createElement('script');
script.src=new URL('tier-list.js?v=1.3.27-refactor',document.currentScript.src).href;
script.async=false;
script.onerror=()=>{
 window.TrackerTierListLoading=false;
 const status=document.getElementById('tierStatus');
 if(status){status.textContent='Tier list module could not load. Reload the page before using the ranking.';status.classList.add('error');}
};
document.body.append(script);
})();

(function(){
'use strict';
if(window.TrackerSkinHoverLoading||window.TrackerSkinHover)return;
window.TrackerSkinHoverLoading=true;
const script=document.createElement('script');
script.src=new URL('portrait-skin-hover.js?v=1',document.currentScript.src).href;
script.async=false;
script.onerror=()=>{window.TrackerSkinHoverLoading=false;};
document.body.append(script);
})();

(function(){
'use strict';
if(window.TrackerMatchHistoryLoading||window.TrackerMatchHistory)return;
window.TrackerMatchHistoryLoading=true;
const script=document.createElement('script');
script.src=new URL('match-history.js?v=1',document.currentScript.src).href;
script.async=false;
script.onerror=()=>{window.TrackerMatchHistoryLoading=false;};
document.body.append(script);
})();

(function(){
'use strict';
if(window.TrackerStatisticsLoading||window.TrackerStatisticsView)return;
window.TrackerStatisticsLoading=true;
const script=document.createElement('script');
script.src=new URL('statistics-view.js?v=1',document.currentScript.src).href;
script.async=false;
script.onerror=()=>{
 window.TrackerStatisticsLoading=false;
 const status=document.getElementById('statsStatus');
 if(status){status.textContent='Statistics module could not load. Reload the page.';status.classList.add('error');}
};
document.body.append(script);
})();