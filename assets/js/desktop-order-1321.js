(function(){
'use strict';
if(window.TrackerDesktopOrder1321)return;
const root=document.getElementById('draftAssist');
if(!root)return;
const row=document.createElement('div');row.className='desktop-pick-order-1321';row.setAttribute('aria-label','Draft order: BLUE 1, RED 1, RED 2, BLUE 2, BLUE 3, RED 3');
const label=document.createElement('span');label.className='order-label';label.textContent='Pick order: ';row.append(label);
[['BLUE',1],['RED',1],['RED',2],['BLUE',2],['BLUE',3],['RED',3]].forEach(([side,index],i)=>{
 if(i){const arrow=document.createElement('span');arrow.className='order-arrow';arrow.textContent='→';row.append(arrow);}
 const item=document.createElement('span');item.className=side==='BLUE'?'order-blue':'order-red';item.textContent=side+' '+index;row.append(item);
});
root.prepend(row);
window.TrackerDesktopOrder1321=Object.freeze({version:'1.3.21'});
})();
