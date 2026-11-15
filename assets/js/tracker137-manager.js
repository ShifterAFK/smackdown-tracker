(function(){
'use strict';if(window.TrackerView)return;
const native=window.matchMedia.bind(window),key='afk-tracker-view-v1';let mode='auto';
try{const saved=localStorage.getItem(key);if(['auto','mobile','desktop'].includes(saved))mode=saved;}catch(_){}
const proxies=new Set();document.documentElement.dataset.uiView=mode;
function relevant(query){return /(?:max-width\s*:\s*1099px|min-width\s*:\s*1100px)/i.test(query);}
function evaluate(query){if(mode==='auto')return native(query).matches;const width=mode==='mobile'?600:1440;return native(query.replace(/\(\s*(min|max)-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/gi,(_,kind,n)=>((kind.toLowerCase()==='min'?width>=Number(n):width<=Number(n))?'(min-width:0px)':'(max-width:0px)'))).matches;}
function notify(proxy){const next=evaluate(proxy.media);if(next===proxy.last)return;proxy.last=next;const event=new Event('change');Object.defineProperties(event,{matches:{value:next},media:{value:proxy.media}});proxy.target.dispatchEvent(event);if(typeof proxy.onchange==='function')proxy.onchange.call(proxy,event);}
window.matchMedia=function(query){query=String(query);if(!relevant(query))return native(query);const actual=native(query),target=new EventTarget();const proxy={media:query,last:evaluate(query),target,onchange:null,get matches(){return evaluate(query);},addEventListener(...args){target.addEventListener(...args);},removeEventListener(...args){target.removeEventListener(...args);},dispatchEvent(event){return target.dispatchEvent(event);},addListener(fn){target.addEventListener('change',fn);},removeListener(fn){target.removeEventListener('change',fn);}};actual.addEventListener('change',()=>notify(proxy));proxies.add(proxy);return proxy;};
function set(value){if(!['auto','mobile','desktop'].includes(value))return;mode=value;document.documentElement.dataset.uiView=mode;try{localStorage.setItem(key,mode);}catch(_){}for(const proxy of proxies)notify(proxy);const select=document.getElementById('trackerViewSelect');if(select)select.value=mode;}
window.TrackerView=Object.freeze({version:'1.3.7',set,get:()=>mode});
})();

// Run in head, before the fallback map can be painted.
(function(){
'use strict';
document.documentElement.dataset.mapPreviewState='loading';
document.documentElement.dataset.mapInitializing='true';
const style=document.createElement('style');
style.textContent='html[data-map-preview-state="loading"] #page-entry #mapOpen,html[data-map-preview-state="empty"] #page-entry #mapOpen,html[data-map-preview-state="error"] #page-entry #mapOpen{visibility:hidden!important}html[data-map-initializing="true"] #page-entry #mapSelectedName,html[data-map-initializing="true"] #page-entry .map-selected-line{visibility:hidden!important}';
document.head.append(style);
})();