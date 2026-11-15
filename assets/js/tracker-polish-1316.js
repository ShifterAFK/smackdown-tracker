(function(){
'use strict';
if(window.TrackerPolish1316)return;
const order=document.querySelector('#mobileDraft130 .md130order');
if(order){
 const fragment=document.createDocumentFragment();
 fragment.append(document.createTextNode('Order: '));
 const sequence=[['BLUE',1],['RED',1],['RED',2],['BLUE',2],['BLUE',3],['RED',3]];
 sequence.forEach(([side,index],i)=>{
  if(i){const arrow=document.createElement('span');arrow.className='pick-order-arrow';arrow.textContent=' → ';fragment.append(arrow);}
  const span=document.createElement('span');span.className=side==='BLUE'?'pick-order-blue':'pick-order-red';span.textContent=side+' '+index;fragment.append(span);
 });
 order.replaceChildren(fragment);
}
window.TrackerPolish1316=Object.freeze({version:'1.3.16'});
})();
