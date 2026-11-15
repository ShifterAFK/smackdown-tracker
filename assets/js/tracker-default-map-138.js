(function(){
'use strict';
if(window.TrackerDefaultMap138)return;
const select=document.getElementById('theme');
if(!select)return;
let userChosen=false,applied=false;
select.addEventListener('change',()=>{userChosen=true;},{once:true,capture:true});
window.addEventListener('tracker:catalog-changed',async()=>{
 if(applied||userChosen)return;
 applied=true;
 try{
  const response=await fetch('https://rwnbxhrkjjlfuljhwdpt.supabase.co/rest/v1/rpc/ss_get_config',{method:'POST',headers:{apikey:'sb_publishable_K613s8nvoUQTzIc-BLn2VQ_8kfTLWAm','Content-Type':'application/json'},body:'{}'});
  if(!response.ok)return;
  const data=await response.json();
  const wanted=data&&data.event&&data.event.current_theme_id;
  if(!wanted||select.value===wanted)return;
  const exists=Array.from(select.options).some(option=>option.value===wanted);
  if(!exists)return;
  select.value=wanted;
  select.dispatchEvent(new Event('change',{bubbles:true}));
 }catch(_){}
});
window.TrackerDefaultMap138=Object.freeze({version:'1.3.8'});
})();
