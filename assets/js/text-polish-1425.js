(function(){
'use strict';
if(window.TrackerTextPolish1425)return;
const skip=new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','NOSCRIPT']);
const rules=[
 [/\b(BLUE|RED)\s*[-\u2013\u2014\u00b7:]*\s*Next picks?\b/gi,(m,side)=>side.toUpperCase()+' suggestions'],
 [/\bNext picks?\b/gi,'Suggestions'],
 [/\s[\u2013\u2014]\s/g,' - '],
 [/(\d)\s?[\u2013\u2014]\s?(\d|<)/g,'$1-$2'],
 [/[\u2013\u2014]/g,'-']
];
function clean(text){let out=text;for(const [pattern,value] of rules)out=out.replace(pattern,value);return out;}
const test=/[\u2013\u2014]|next pick/i;
function sweep(){
 if(document.body){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
   if(skip.has(node.parentNode?.nodeName)||!test.test(node.nodeValue))continue;
   const next=clean(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;
  }
  for(const element of document.body.querySelectorAll('[title],[aria-label],[placeholder],[alt]')){
   for(const name of ['title','aria-label','placeholder','alt']){
    const value=element.getAttribute(name);
    if(value&&test.test(value)){const next=clean(value);if(next!==value)element.setAttribute(name,next);}
   }
  }
 }
 if(test.test(document.title))document.title=clean(document.title);
}
let frame=0;
function schedule(){if(frame)return;frame=requestAnimationFrame(()=>{frame=0;sweep();});}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder','alt']});
window.TrackerTextPolish1425=Object.freeze({version:'1.4.25',sweep});
sweep();
})();
