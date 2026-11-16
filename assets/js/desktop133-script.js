(function(){
'use strict';
if(window.TrackerDesktop133)return;
const $=id=>document.getElementById(id),media=matchMedia('(min-width:1100px)');
const root=$('draftAssist'),catalog=$('heroes');if(!root||!catalog)return;
let own=null,enabled=false,frame=0,focusBack=null,lastTap=null;
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const button=(text,action)=>{const b=el('button','',text);b.type='button';b.onclick=action;return b;};
function decorate(b){
 b.classList.add('solise-help');b.replaceChildren();
 const img=el('img','solise-help-image');img.alt='';img.setAttribute('aria-hidden','true');img.referrerPolicy='no-referrer';img.onerror=()=>img.hidden=true;
 img.src=new URL('assets/img/ui/solise-assistant.webp',document.baseURI).href;
 const copy=el('span','solise-help-copy');copy.append(el('strong','','Assistant'),el('small','','i can help u pick'));b.append(img,copy);
 b.setAttribute('aria-label','Open Assistant and choose your team');return img;
}
const bar=el('div','desktop133bar'),open=button('',()=>askSide()),stop=button('Close Assistant',()=>finish());
const desktopImage=decorate(open);bar.append(open,stop);root.before(bar);
const mobileButton=document.querySelector('.md130dock button:last-child');const mobileImage=mobileButton?decorate(mobileButton):null;
const prompt=el('dialog','desktop133prompt');prompt.setAttribute('aria-labelledby','desktop133title');
const heading=el('h2','','Which side are you this round?');heading.id='desktop133title';
const options=el('div','desktop133options');
for(const side of ['BLUE','RED']){const b=button('I play '+side,()=>start(side));b.dataset.side=side;options.append(b);}
prompt.append(heading,el('p','','Suggestions are shown only for your side. Record both teams as usual.'),options,button('Cancel',()=>prompt.close()));document.body.append(prompt);
prompt.addEventListener('close',()=>{if(focusBack?.isConnected)focusBack.focus({preventScroll:true});});
function setEnabled(value){const toggle=$('daEnabled');if(toggle&&toggle.checked!==value){toggle.checked=value;toggle.dispatchEvent(new Event('change',{bubbles:true}));}}
function askSide(){if(!media.matches||onlineBusy)return;focusBack=document.activeElement;if(!prompt.open)prompt.showModal();}
function start(side){
 if(onlineBusy)return;own=side;enabled=true;document.body.dataset.desktop133Side=side;
 prompt.close();setEnabled(true);sync();root.scrollIntoView({block:'nearest',behavior:'auto'});
}
function finish(){own=null;enabled=false;delete document.body.dataset.desktop133Side;document.body.dataset.desktop133Ready='false';if(media.matches)setEnabled(false);sync();}
function full(){return ['BLUE','RED'].every(side=>lineup[side].every(Boolean));}
function anyPick(){return [...lineup.BLUE,...lineup.RED].some(Boolean);}
function paintCatalog(){
 for(const b of catalog.querySelectorAll('.hero')){
 const label=b.getAttribute('aria-label')||b.title?.replace(/ [-\u2014] already drafted$/,'');
 const hero=config.heroes.find(h=>h.name===label);if(hero)b.dataset.faction=hero.faction;
 }
}
function sync(){
 bar.hidden=!media.matches;stop.hidden=!enabled;
 document.body.classList.toggle('desktop133-enabled',enabled&&media.matches);
 document.body.dataset.desktop133Ready=String(Boolean(enabled&&own&&anyPick()));
 if(enabled&&full()){finish();return;}
 paintCatalog();
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;sync();});}
function openTeam(team){
 if(media.matches||onlineBusy)return;
 const side=team.classList.contains('red')?'RED':'BLUE';const index=lineup[side].findIndex(value=>!value);
 active={side,index:index<0?0:index};renderSlots();window.MobileDraft130?.open('heroes');
}

let pointerStart=null;
document.addEventListener('pointerdown',event=>{
 if(media.matches){pointerStart=null;return;}
 const team=event.target.closest?.('#page-entry .team');
 if(!team||event.target.closest('input,select,label,a,.slot-remove,.phantimal-chip')||(event.target.closest('button')&&!event.target.closest('.slot'))){pointerStart=null;return;}
 pointerStart={side:team.classList.contains('red')?'RED':'BLUE',x:event.clientX,y:event.clientY,time:Date.now(),pointerId:event.pointerId};
},true);
document.addEventListener('pointerup',event=>{
 const start=pointerStart;pointerStart=null;
 if(!start||media.matches||start.pointerId!==event.pointerId||Date.now()-start.time>550||Math.hypot(event.clientX-start.x,event.clientY-start.y)>14){lastTap=null;return;}
 const team=event.target.closest?.('#page-entry .team');if(!team){lastTap=null;return;}
 const side=team.classList.contains('red')?'RED':'BLUE';if(side!==start.side){lastTap=null;return;}
 const now=Date.now();
 if(lastTap&&lastTap.side===side&&now-lastTap.time<420&&Math.hypot(event.clientX-lastTap.x,event.clientY-lastTap.y)<32){lastTap=null;openTeam(team);}
 else lastTap={side,time:now,x:event.clientX,y:event.clientY};
},true);
document.addEventListener('pointercancel',()=>{pointerStart=null;lastTap=null;},true);
window.addEventListener('tracker:draft-changed',schedule);
window.addEventListener('tracker:catalog-changed',schedule);
window.addEventListener('tracker:draft-reset',()=>{if(enabled)finish();});
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved&&enabled)finish();});
new MutationObserver(schedule).observe(catalog,{childList:true,subtree:true});
media.addEventListener('change',()=>{if(enabled){own=null;enabled=false;setEnabled(false);}if(prompt.open)prompt.close();sync();});
window.TrackerDesktop133=Object.freeze({version:'1.3.5'});sync();
})();
