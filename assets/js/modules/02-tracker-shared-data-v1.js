// Module: tracker-shared-data-v1

(function(){
 const originalRPC=rpc,cache=new Map(),pending=new Map();let generation=0;
 function invalidate(){generation++;cache.clear();pending.clear();}
 rpc=async function(name,body){
  if(name!=='ss_get_stats')return originalRPC(name,body);
  const key=JSON.stringify([body?.p_theme_id||null,body?.p_exclude_mirrors===true]);
  const cached=cache.get(key);if(cached&&Date.now()-cached.at<60000)return cached.data;
  if(pending.has(key))return pending.get(key);
  const version=generation;
  const request=Promise.resolve().then(()=>originalRPC(name,body)).then(data=>{if(generation===version)cache.set(key,{data,at:Date.now()});return data;}).finally(()=>{if(pending.get(key)===request)pending.delete(key);});
  pending.set(key,request);return request;
 };
 window.trackerData={invalidate};
 window.addEventListener('tracker:submission-finished',event=>{
  if(!event.detail?.saved)return;invalidate();
  if(!$('page-statistics').classList.contains('hidden'))loadStats();
  if(typeof loadTiers==='function'&&document.getElementById('page-tiers')&&!document.getElementById('page-tiers').classList.contains('hidden'))loadTiers();
 });
})();
