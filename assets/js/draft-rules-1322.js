(function(){
'use strict';
const get=id=>document.getElementById(id);
const sequence=[['BLUE',0],['RED',0],['RED',1],['BLUE',1],['BLUE',2],['RED',2]];
let follow=true,frame=0,firstPicks=null,duos=null,loadState='loading';
const next=()=>{const s=sequence.find(([side,index])=>!lineup[side][index]);return s?{side:s[0],index:s[1]}:null;};
const nextFree=()=>{for(const side of ['BLUE','RED']){const index=lineup[side].findIndex(x=>!x);if(index>=0)return {side,index};}return null;};
const same=(a,b)=>a&&b&&a.side===b.side&&a.index===b.index;
const text=(n,v)=>{if(n&&n.textContent!==v)n.textContent=v;};
const attr=(n,k,v)=>{v=String(v);if(n.getAttribute(k)!==v)n.setAttribute(k,v);};
const style=document.createElement('style');
style.textContent=`
html body #draftAssist,html body .desktop133bar,html body .desktop133prompt,html body .md132sidegate,html body .md130sides,html body .md130recommendations,html body .solise-help,html body .md135-solise,html body .md130dock button:last-child{display:none!important}
.catalog-order-tools{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:8px 0;font-size:12px}.catalog-order-tools button{min-height:36px;padding:5px 9px}.catalog-order-status{margin:0}.catalog-top-legend{font-size:11px;line-height:1.5;margin:5px 0}
html body #heroes .hero{position:relative}
html body #heroes .catalog-tier{position:absolute;top:0;left:0;font-size:10px;line-height:14px;padding:0 3px;border-radius:3px;background:#292b25;color:#e5d7b6}
html body #heroes .catalog-top,html body #mobileDraft130.md-fast .md130pool .md130hero .md-fast-top{position:absolute!important;bottom:0!important;left:50%!important;transform:translateX(-50%)!important;white-space:nowrap!important;font-size:9px!important;line-height:13px!important;padding:0 3px!important;border-radius:3px!important;font-weight:800!important;background:#efd078!important;color:#302308!important}
html body #heroes .catalog-top[hidden],html body #mobileDraft130.md-fast .md130pool .md130hero .md-fast-top[hidden]{display:none!important}
html body #heroes [data-tier=SSS],html body #heroes [data-tier=SS],html body #heroes [data-tier='S+'],html body #heroes [data-tier=S]{color:#f0ce75;border:1px solid #b89948}
html body #heroes [data-tier='A+'],html body #heroes [data-tier=A]{color:#dcabff;border:1px solid #9467ad}
html body #heroes [data-tier=B]{color:#8ebfff;border:1px solid #5a7ea9}
html body #heroes [data-tier=C]{color:#a9d1ae;border:1px solid #6e9473}
html body #mobileDraft130 .catalog-order-tools{flex-shrink:0;margin:0;font-size:11px}
`;document.head.append(style);
const toolbars=[];
function toolbar(parent,before){
 if(!parent)return;const box=document.createElement('div');box.className='catalog-order-tools';
 const button=document.createElement('button');button.type='button';
 const status=document.createElement('p');status.className='catalog-order-status';status.setAttribute('role','status');
 button.onclick=()=>{if(onlineBusy)return;follow=!follow;if(follow){const slot=next();if(slot)active=slot;}renderSlots();schedule();};
 box.append(button,status);parent.insertBefore(box,before||null);toolbars.push({button,status});
}
const teams=document.querySelector('#page-entry .teams');if(teams)toolbar(teams.parentNode,teams);
const controls=document.querySelector('#mobileDraft130 .md130controls');if(controls)toolbar(controls.parentNode,controls);
const catalog=get('heroes');
if(catalog){const legend=document.createElement('p');legend.className='catalog-top-legend';legend.textContent='TOP: draft-context suggestions. First picks matter most; later picks and duo results are secondary.';catalog.before(legend);}
function wilson(w,n){if(!n)return 0;const z=1.959963984540054,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,r=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return Math.max(0,c-r)}
function pair(a,b){return [a,b].sort((x,y)=>x.localeCompare(y,'en')).join('||');}
function top(){
 if(!firstPicks)return new Set();
 const rows=new Map(firstPicks.map(r=>[r.hero_id,r])),used=new Set(Object.values(lineup).flat().filter(Boolean)),duoMap=new Map((duos||[]).map(r=>[pair(r.hero_1_id,r.hero_2_id),wilson(Number(r.wins),Number(r.appearances))]));
 return new Set(config.heroes.filter(h=>h.is_allowed&&!isBannedHero(h)&&!used.has(h.id)).map(h=>{const r=rows.get(h.id)||{};const fn=Math.max(0,Number(r.first_pick_blue_appearances||0)+Number(r.first_pick_red_appearances||0)),fw=Math.max(0,Number(r.first_pick_blue_wins||0)+Number(r.first_pick_red_wins||0)),ln=Math.max(0,Number(r.later_pick_appearances||0)),lw=Math.max(0,Number(r.later_pick_wins||0));const fs=wilson(fw,fn),ls=wilson(lw,ln);const base=fn>=5?0.8*fs+0.2*ls:0.5*fs+0.5*ls;const duos=lineup[active.side].filter(Boolean).map(id=>duoMap.get(pair(id,h.id))).filter(x=>x!==undefined);const duo=duos.length?duos.reduce((s,x)=>s+x,0)/duos.length:0;return {h,score:base+0.05*duo};}).sort((a,b)=>b.score-a.score||a.h.name.localeCompare(b.h.name,'en')).slice(0,6).map(x=>x.h.id));
}
function tierLabels(){
 const labels=new Map();if(!firstPicks)return labels;const rows=new Map(firstPicks.map(r=>[r.hero_id,r]));
 const items=config.heroes.map(hero=>{const r=rows.get(hero.id)||{};const n=Math.max(0,Number(r.first_pick_blue_appearances||0)+Number(r.first_pick_red_appearances||0)),w=Math.max(0,Number(r.first_pick_blue_wins||0)+Number(r.first_pick_red_wins||0));return {hero,n,score:wilson(w,n)};});
 const ranked=items.filter(x=>x.n>=10).sort((a,b)=>b.score-a.score||b.n-a.n||a.hero.name.localeCompare(b.hero.name,'en'));const top=new Set(ranked.slice(0,5).map(x=>x.hero.id));
 for(const x of items){if(x.n<10){labels.set(x.hero.id,'N');continue;}labels.set(x.hero.id,top.has(x.hero.id)?'S':x.score>=0.55?'A':x.score>=0.45?'B':'C');}return labels;
}
function badge(button,selector,cls){let n=button.querySelector(selector);if(!n){n=document.createElement('span');n.className=cls;button.append(n);}return n;}
function paint(){
 const topSet=top(),tiers=tierLabels(),used=new Set(Object.values(lineup).flat().filter(Boolean));
 for(const {button,status} of toolbars){text(button,'Set draft order '+(follow?'ON':'OFF'));attr(button,'aria-pressed',follow);button.disabled=onlineBusy;text(status,(lineup[active.side][active.index]?'Editing: ':'Next: ')+active.side+' '+(active.index+1));}
 const mobileStatus=document.querySelector('#mobileDraft130 .md-fast-status [role=status]');text(mobileStatus,(lineup[active.side][active.index]?'Editing: ':'Next: ')+active.side+' '+(active.index+1));
 const buttons=document.querySelectorAll('#heroes button.hero,#mobileDraft130 button.md130hero');
 for(const b of buttons){const h=b.dataset.heroId?heroById(b.dataset.heroId):config.heroes.find(h=>b.querySelector('img')?.alt===h.name||b.title===h.name||b.title.startsWith(h.name+' —')||b.title.startsWith(h.name+' |'));if(!h)continue;
 const mobile=b.classList.contains('md130hero'),topBadge=badge(b,mobile?'.md-fast-top':'.catalog-top',mobile?'md-fast-top':'catalog-top'),tierBadge=badge(b,mobile?'.md-fast-tier':'.catalog-tier',mobile?'md-fast-tier':'catalog-tier');
 const isTop=topSet.has(h.id),tier=tiers.get(h.id)||'-';
 text(topBadge,'TOP');topBadge.hidden=!(isTop&&!used.has(h.id));if(mobile){topBadge.style.setProperty('background','#efd078','important');topBadge.style.setProperty('color','#302308','important');}text(tierBadge,tier);attr(tierBadge,'data-tier',tier);
 b.dataset.heroId=h.id;const description=h.name+' | First-pick tier: '+(tier==='N'?'preliminary':tier)+(isTop?' | TOP':'')+(used.has(h.id)?' | Already drafted':'');attr(b,'aria-label',description);attr(b,'title',description);
 }
 const legend=document.querySelector('#mobileDraft130 .md-fast-legend');text(legend,'Tier: first picks · TOP: draft context'+(loadState==='ready'?'':' · '+loadState));
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;paint();});}
function selectSlot(e){const b=e.target.closest?.('#slotsBLUE .slot,#slotsRED .slot,#mobileDraft130 .md130slot');if(!b||!follow||onlineBusy)return;let side,index;if(b.classList.contains('md130slot')){const group=b.closest('.md130team');side=group.dataset.side;index=[...group.querySelectorAll('.md130slot')].indexOf(b);}else{const group=b.closest('#slotsBLUE,#slotsRED');side=group.id==='slotsRED'?'RED':'BLUE';index=[...group.querySelectorAll('.slot')].indexOf(b);}const slot={side,index};if(lineup[side]?.[index])return;const expected=next();if(expected&&!same(slot,expected)){e.preventDefault();e.stopImmediatePropagation();active=expected;renderSlots();window.MobileDraft130?.open('heroes');}}
document.addEventListener('click',selectSlot,true);
choose=function(id){if(onlineBusy)return;const h=heroById(id);if(!h?.is_allowed||isBannedHero(h))return;const target=follow&&!lineup[active.side][active.index]?next():active;if(!target)return;if(Object.entries(lineup).some(([side,ids])=>ids.some((x,index)=>x===id&&(side!==target.side||index!==target.index)))){tell('entryStatus','That hero is already drafted.',true);return;}lineup[target.side][target.index]=id;active=follow?(next()||target):(nextFree()||target);tell('entryStatus','');renderSlots();renderHeroes();schedule();};
const oldDrop=applyDrop;applyDrop=function(side,index){if(onlineBusy)return;if(follow&&dragData?.kind==='hero'){const target={side,index},expected=next();if(!lineup[side]?.[index]&&!same(target,expected)){tell('entryStatus','Follow draft order: select the next empty slot.',true);return;}active=target;choose(dragData.id);return;}oldDrop(side,index);const slot=follow?next():nextFree();if(slot){active=slot;renderSlots();}};
if(window.MobileDraft130){const old=window.MobileDraft130;window.MobileDraft130=Object.freeze({...old,open:()=>old.open('heroes')});}
const enabled=get('daEnabled');if(enabled?.checked){enabled.checked=false;enabled.dispatchEvent(new Event('change'));}
document.body.classList.remove('desktop133-enabled','da-expanded');delete document.body.dataset.desktop133Side;
for(const detail of document.querySelectorAll('#helpDialog details'))if(detail.querySelector('summary')?.textContent==='Draft Assistant'){detail.replaceChildren();const summary=document.createElement('summary');summary.textContent='First-pick results and TOP';const p=document.createElement('p');p.textContent='Tier List uses only first-pick appearances: BLUE 1 and RED 1. It ranks heroes by the conservative Wilson score, so a good result from few games does not outrank a reliable result. TOP uses draft context: first-pick results matter most, later picks have less weight, and duo results give a small bonus. Set draft order ON follows BLUE 1, RED 1, RED 2, BLUE 2, BLUE 3, RED 3. OFF fills BLUE 1, BLUE 2, BLUE 3, then RED 1, RED 2, RED 3.';detail.append(summary,p);}
window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);window.addEventListener('tracker:draft-reset',schedule);
for(const node of [get('heroes'),get('mobileDraft130')])if(node)new MutationObserver(schedule).observe(node,{childList:true,subtree:true,characterData:true});
async function load(){try{const data=await rpc('ss_get_first_pick_stats',{});if(!Array.isArray(data))throw Error();firstPicks=data;loadState='ready';}catch(_){firstPicks=null;loadState='unavailable';}schedule();try{const data=await rpc('ss_get_stats',{p_theme_id:null,p_exclude_mirrors:true});if(!Array.isArray(data?.duos))throw Error();duos=data.duos;}catch(_){duos=null;}schedule();}
window.TrackerDraftRules1322=Object.freeze({version:'2.1.0',next,nextFree});schedule();load();
})();