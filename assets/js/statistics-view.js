(function(){
'use strict';
if(window.TrackerStatisticsView)return;
const get=id=>document.getElementById(id),page=get('page-statistics');
if(!page||!get('statsStatus')||!get('statsTheme')||!get('excludeMirrors'))return;
let pending=null;
const visible=()=>!page.classList.contains('hidden');
loadStats=function(force=false){
 const body={p_theme_id:get('statsTheme').value||null,p_exclude_mirrors:get('excludeMirrors').checked};
 const key=JSON.stringify(body);
 if(force!==true&&pending?.key===key)return pending.promise;
 if(pending)pending.controller.abort();
 const token=++statsRequest,controller=new AbortController();
 const task={key,controller,promise:null};pending=task;
 task.promise=Promise.resolve().then(async()=>{
  const timer=setTimeout(()=>controller.abort(),18000);
  try{
   if(token!==statsRequest)return;
   page.setAttribute('aria-busy','true');stats=null;renderStats();tell('statsStatus','Loading approved match statistics...');
   const response=await fetch(PROJECT_URL+'/rest/v1/rpc/ss_get_stats',{
    method:'POST',headers:{apikey:PUBLISHABLE_KEY,'Content-Type':'application/json'},
    body:JSON.stringify(body),signal:controller.signal
   });
   const text=await response.text();let data;
   try{data=JSON.parse(text);}catch(_){throw Error('Unexpected server response ('+response.status+').');}
   if(!response.ok)throw Error(data?.message||'Request failed ('+response.status+').');
   if(!data?.summary||!Array.isArray(data.heroes)||!Array.isArray(data.duos)||!Array.isArray(data.phantimals))throw Error('Invalid statistics response.');
   if(token!==statsRequest)return;
   stats=data;renderStats();
   tell('statsStatus','Last calculated: '+(data.generated_at?new Date(data.generated_at).toLocaleString():'unknown')+'. Server cache: up to 5 minutes.');
  }catch(error){
   if(token!==statsRequest)return;
   stats=null;
   try{renderStats();}catch(_){}
   tell('statsStatus','Unable to load statistics: '+(error.name==='AbortError'?'Request timed out. Press Refresh to retry.':error.message),true);
  }finally{
   clearTimeout(timer);
   if(pending===task){pending=null;page.removeAttribute('aria-busy');}
  }
 });
 return task.promise;
};
get('refreshStats').onclick=()=>loadStats(true);
get('statsTheme').onchange=()=>loadStats();
get('excludeMirrors').onchange=()=>loadStats();
document.addEventListener('click',event=>{
 const button=event.target instanceof Element?event.target.closest('#refreshStats'):null;
 if(!button)return;event.preventDefault();event.stopImmediatePropagation();loadStats(true);
},true);
document.addEventListener('change',event=>{
 if(event.target!==get('statsTheme')&&event.target!==get('excludeMirrors'))return;
 event.stopImmediatePropagation();loadStats();
},true);
let wasVisible=visible();
new MutationObserver(()=>{
 const now=visible();if(now&&!wasVisible)loadStats();wasVisible=now;
}).observe(page,{attributes:true,attributeFilter:['class']});
window.addEventListener('tracker:catalog-changed',()=>{if(visible()&&!stats)loadStats();});
window.TrackerStatisticsView=Object.freeze({version:'1.0.0'});
if(visible())loadStats();
})();