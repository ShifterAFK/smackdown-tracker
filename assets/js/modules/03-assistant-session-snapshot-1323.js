// Module: assistant-session-snapshot-1323
(function(){
'use strict';
const baseRPC=rpc;let active=false,epoch=0;const frozen=new Map();
function key(body){return JSON.stringify([body?.p_theme_id||null,body?.p_exclude_mirrors===true]);}
rpc=function(name,body){
 if(!active||name!=='ss_get_stats')return baseRPC(name,body);
 const k=key(body);if(frozen.has(k))return frozen.get(k);
 const version=epoch;
 const request=Promise.resolve().then(()=>baseRPC(name,body)).then(data=>{if(version!==epoch)throw Error('Assistant session ended');return data;});
 frozen.set(k,request);return request;
};
window.TrackerSnapshot1323={get active(){return active;},get epoch(){return epoch;},begin(){active=true;epoch++;frozen.clear();window.trackerData.invalidate();},end(){active=false;epoch++;frozen.clear();window.dispatchEvent(new Event('tracker:assistant-session-ended'));}};
})();
