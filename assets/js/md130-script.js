(function(){
'use strict';
if(window.MobileDraft130)return;
const $=id=>document.getElementById(id),entry=$('page-entry');
if(!entry||typeof choose!=='function'||typeof lineup==='undefined')return;
const media=matchMedia('(max-width:1099px)');
const sequence=[['BLUE',0],['RED',0],['RED',1],['BLUE',1],['BLUE',2],['RED',2]];
let mode='heroes',query='',faction='',returnFocus=null,frame=0,assistantHome=null,mySide=null;
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const button=(text,fn)=>{const b=el('button','',text);b.type='button';b.onclick=fn;return b;};
const dialog=el('dialog','md130');dialog.id='mobileDraft130';dialog.setAttribute('aria-labelledby','md130title');
const shell=el('div','md130shell'),head=el('header','md130head'),title=el('h2','','Choose hero');title.id='md130title';
head.append(title,button('Close',close));
const preview=el('div','md130preview');preview.setAttribute('aria-label','Draft slots. Highlighted slot receives the next hero.');
const order=el('div','md130order','Order: BLUE 1 → RED 1 → RED 2 → BLUE 2 → BLUE 3 → RED 3');
const content=el('div','md130content'),search=el('input');search.type='search';search.placeholder='Search all heroes';search.setAttribute('aria-label','Search all heroes');
search.oninput=()=>{query=search.value;renderPool();};
const filters=el('select');filters.setAttribute('aria-label','Faction');
for(const f of ['',...FACTIONS]){const o=el('option','',f||'All factions');o.value=f;filters.append(o);}filters.onchange=()=>{faction=filters.value;renderPool();};
const controls=el('div','md130controls');controls.append(search,filters);
const pool=el('div','md130pool');pool.setAttribute('aria-label','Full allowed hero pool');
const recommendations=el('details','md130recommendations'),summary=el('summary','','Recommendations — optional');
const assistHost=el('div','hero-panel md130assist');recommendations.append(summary,assistHost);
const message=el('p','md130message');message.setAttribute('role','status');
const sideGate=el('section','md132sidegate');
sideGate.setAttribute('aria-label','Choose your side for this round');
sideGate.append(el('h3','','Which side are you this round?'),el('p','','Suggestions and counters will always be for your team.'));
const sideGateButtons=el('div','md132gatebuttons');
for(const side of ['BLUE','RED']){const b=button('I play '+side,()=>{mySide=side;message.textContent='';render();});b.dataset.side=side;sideGateButtons.append(b);}
sideGate.append(sideGateButtons);
const forgetMySide=()=>{mySide=null;schedule();};
window.addEventListener('tracker:draft-reset',forgetMySide);
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved)forgetMySide();});
content.append(recommendations,controls,pool);shell.append(head,sideGate,preview,order,message,content);dialog.append(shell);document.body.append(dialog);
const dock=el('nav','md130dock');dock.setAttribute('aria-label','Mobile draft actions');dock.append(button('Choose hero',()=>open('heroes')),button('Assistant',()=>open('assistant')));document.body.append(dock);
const sideControls=el('div','md130sides');sideControls.append(button('BLUE',()=>selectSide('BLUE')),button('RED',()=>selectSide('RED')));entry.querySelector('.teams')?.before(sideControls);
function nextSlot(){return sequence.find(([side,index])=>!lineup[side][index]);}
function complete(){return ['BLUE','RED'].every(side=>lineup[side].every(Boolean));}
function setTarget(side,index){active={side,index};renderSlots();}
function selectSide(side){const i=lineup[side].findIndex(x=>!x);setTarget(side,i<0?0:i);render();}
function open(nextMode){
 if(!media.matches||entry.classList.contains('hidden'))return;
 mode=nextMode;message.textContent='';
 if(mode==='assistant'&&mySide){const next=nextSlot();if(next)setTarget(...next);}
 returnFocus=document.activeElement;render();
 if(!dialog.open){dialog.showModal();document.body.classList.add('md130open');}
}
function close(){if(dialog.open)dialog.close();}
dialog.addEventListener('close',()=>{document.body.classList.remove('md130open');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
function commit(id){
 if(onlineBusy)return;
 const hero=heroById(id);if(!hero||!hero.is_allowed||isBannedHero(hero))return;
 if(Object.values(lineup).flat().includes(id)){message.textContent='That hero is already selected.';return;}
 const before=JSON.stringify(lineup);choose(id);
 if(before===JSON.stringify(lineup)){message.textContent=$('entryStatus')?.textContent||'Hero was not added.';return;}
 if(mode==='assistant'&&mySide){const next=nextSlot();if(next)active={side:next[0],index:next[1]};}
 renderSlots();renderHeroes();render();
 if(complete()){mySide=null;close();}
}
function thumb(id,name){
 const wrap=el('span','md130portrait');
 if(id){const h=heroById(id);const image=el('img');image.alt='';image.referrerPolicy='no-referrer';image.loading='lazy';
 try{const u=new URL(h?.portrait_url||'');if(['https:','http:'].includes(u.protocol))image.src=u.href;}catch(_){}
 image.onerror=()=>{image.remove();wrap.textContent=(name||'?').slice(0,2);};if(image.getAttribute('src'))wrap.append(image);else wrap.textContent=(name||'?').slice(0,2);
 }else wrap.textContent='+';
 return wrap;
}
function renderPreview(){
 preview.replaceChildren();
 for(const side of ['BLUE','RED']){const group=el('div','md130team');group.dataset.side=side;
 for(let index=0;index<3;index++){
 const id=lineup[side][index],name=id?(heroById(id)?.name||id):'Empty';
 const b=button('',()=>{if(onlineBusy)return;setTarget(side,index);render();});b.className='md130slot';
 const selected=active.side===side&&active.index===index;b.setAttribute('aria-pressed',String(selected));
 b.setAttribute('aria-label',side+' slot '+(index+1)+': '+name+(selected?' — selecting here':''));
 b.append(el('span','md130slotlabel',side+' '+(index+1)),thumb(id,name),el('span','md130name',name));group.append(b);
 }preview.append(group);}
 dialog.dataset.side=active.side;
 for(const [i,b] of Array.from(sideControls.querySelectorAll('button')).entries())b.setAttribute('aria-pressed',String(active.side===(i?'RED':'BLUE')));
}
let md136PoolKey='',md136PoolConfig=null;
function md136DisplayName(name){return ({'Granny Dahnie':'Granny','Smokey & Meerky':'Smokey'})[name]||name;}
function renderPool(){
 const key=JSON.stringify([active.side,active.index,query,faction,onlineBusy,lineup]);
 if(key===md136PoolKey&&md136PoolConfig===config.heroes)return;
 md136PoolKey=key;md136PoolConfig=config.heroes;
 pool.replaceChildren();const used=new Set(Object.values(lineup).flat().filter(Boolean));
 const factionOrder=['Lightbearer','Wilder','Mauler','Graveborn','Celestial','Hypogean','Dimensional'];
 const factionRank=value=>{const index=factionOrder.indexOf(value);return index<0?factionOrder.length:index;};
 const list=config.heroes.filter(h=>h.is_allowed&&!isBannedHero(h)&&(!faction||h.faction===faction)&&h.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>factionRank(a.faction)-factionRank(b.faction)||a.name.localeCompare(b.name,'en',{sensitivity:'base'}));
 for(const hero of list){const b=button('',()=>commit(hero.id));b.className='md130hero';b.dataset.faction=hero.faction;b.title=hero.name+' — '+hero.faction;b.disabled=onlineBusy||used.has(hero.id);b.setAttribute('aria-label','Select '+hero.name+' for '+active.side+' slot '+(active.index+1));b.append(thumb(hero.id,hero.name),el('span','',md136DisplayName(hero.name)));pool.append(b);}
 if(!list.length)pool.append(el('p','','No heroes match your filters.'));
}
function updateAssistantColumns(){
 const root=$('draftAssist');if(!root)return;
 const blue=root.querySelector('.da-side:not(.da-red)'),red=root.querySelector('.da-side.da-red');
 if(blue)blue.hidden=mySide==='RED';
 if(red)red.hidden=mySide==='BLUE';
}
function mountAssistant(){
 const assistant=$('draftAssist');if(!assistant)return;
 if(media.matches&&mode==='assistant'&&dialog.open){
  if(assistant.parentNode!==assistHost){assistantHome=document.createComment('md130 assistant home');assistant.before(assistantHome);assistHost.append(assistant);}
  const toggle=$('daEnabled')||assistant.querySelector('.da-toggle input[type=checkbox]');
  if(toggle&&!toggle.checked){toggle.checked=true;toggle.dispatchEvent(new Event('change',{bubbles:true}));}
  updateAssistantColumns();
 }else if(assistantHome?.parentNode&&assistant.parentNode===assistHost){assistantHome.replaceWith(assistant);assistantHome=null;}
}
assistHost.addEventListener('click',event=>{
 const candidate=event.target.closest('.da-candidate');if(!candidate)return;
 if(!mySide){event.preventDefault();event.stopImmediatePropagation();message.textContent='Choose your side first.';return;}
 event.preventDefault();event.stopImmediatePropagation();
 const name=candidate.querySelector('.da-name')?.textContent;const hero=config.heroes.find(h=>h.name===name);if(hero)commit(hero.id);
},true);
function render(){
 title.textContent=mode==='assistant'?'Assistant':'Choose hero';dialog.dataset.mode=mode;
 recommendations.open=mode==='assistant';dialog.dataset.started=String(Boolean(mySide));dialog.dataset.suggestionSide=mySide||'';dialog.dataset.waiting='false';assistHost.dataset.recommendationLabel=mySide?('Suggestions for '+mySide):'';
 const awaitingSide=mode==='assistant'&&!mySide;sideGate.hidden=!awaitingSide;preview.hidden=awaitingSide;content.hidden=awaitingSide;order.hidden=mode!=='assistant'||awaitingSide;
 order.hidden=mode!=='assistant';recommendations.hidden=mode!=='assistant';
 renderPreview();renderPool();
 mountAssistant();updateAssistantColumns();dock.hidden=!media.matches||entry.classList.contains('hidden');
 if(!media.matches){close();document.body.classList.remove('md130open');mountAssistant();}
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;render();});}
document.addEventListener('click',event=>{
 if(!media.matches||entry.classList.contains('hidden'))return;
 const slot=event.target.closest?.('#slotsBLUE .slot,#slotsRED .slot');
 if(slot){queueMicrotask(()=>open('heroes'));return;}
 const team=event.target.closest?.('.team.blue,.team.red');
 if(!team)return;
 const side=team.classList.contains('blue')?'BLUE':'RED';
 const control=event.target.closest?.('.slot-remove,.phantimal-chip,input,select,label');
 if(control)return;
 event.preventDefault();
 selectSide(side);
 queueMicrotask(()=>open('heroes'));
});
dialog.addEventListener('close',()=>mountAssistant());
new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open']});
new MutationObserver(schedule).observe(entry,{attributes:true,attributeFilter:['class']});
window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);media.addEventListener('change',schedule);
const annotate=()=>{const table=$('statsTable')?.querySelector('table');if(!table)return;const labels=Array.from(table.querySelectorAll('th')).map(n=>n.textContent);table.querySelectorAll('tbody tr').forEach(row=>Array.from(row.cells).forEach((td,i)=>td.dataset.md130Label=labels[i]||''));};if($('statsTable'))new MutationObserver(annotate).observe($('statsTable'),{childList:true,subtree:true});annotate();
window.MobileDraft130=Object.freeze({version:'1.3.9',open,close});render();
})();