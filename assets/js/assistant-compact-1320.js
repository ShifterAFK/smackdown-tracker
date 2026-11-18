// Presentation for the stable mobile catalog; rankings remain unchanged.
(function(){
'use strict';
if(window.TrackerAssistantCompact1320)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog?.classList.contains('md-fast'))return;
const head=dialog.querySelector('.md130head'),title=head?.querySelector('h2'),row=dialog.querySelector('.md-fast-status'),controls=dialog.querySelector('.md130controls');if(!head||!title||!row||!controls)return;
const make=(tag,cls)=>{const n=document.createElement(tag);n.className=cls;return n;};
const setText=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
// The engine retains its old status reference, but no longer writes visible text.
const oldStatus=row.querySelector('span'),caption=make('span','md-fast-caption');caption.setAttribute('role','status');caption.setAttribute('aria-live','polite');oldStatus?.replaceWith(caption);
const identity=make('div','md-fast-identity'),ownBadge=make('span','md-fast-own');title.before(identity);identity.append(title,ownBadge);
head.querySelector('.md135-solise')?.remove();
const art=make('img','md-fast-solise');art.alt='';art.setAttribute('aria-hidden','true');art.width=30;art.height=30;art.decoding='async';
art.onerror=()=>{art.hidden=true;};art.src=new URL('../img/ui/solise-assistant.webp',document.currentScript.src).href;identity.before(art);
const close=head.querySelector('button');if(close){setText(close,'×');close.setAttribute('aria-label','Close Assistant');close.title='Close';}
const info=make('details','md-fast-info'),summary=make('summary',''),panel=make('div','md-fast-info-panel'),explanation=make('p','');summary.textContent='Info';explanation.textContent='Letters show the Overall tier. N means preliminary results. TOP marks up to six current suggestions for your team, not the opponent. Suggestions are experimental; the tracker does not know the randomly drawn pool.';panel.append(explanation);const legend=dialog.querySelector('.md-fast-legend');if(legend)panel.append(legend);info.append(summary,panel);controls.append(info);
const colors={Lightbearer:'#d9ba62',Wilder:'#83bd90',Mauler:'#d79558',Graveborn:'#7abbb0',Celestial:'#e0d5a5',Hypogean:'#bf93df',Dimensional:'#9cb6eb'};
let frame=0;
function update(){
 for(const b of dialog.querySelectorAll('.md132gatebuttons button')){const side=/\b(BLUE|RED)\b/.exec(b.textContent)?.[1];if(side&&b.dataset.side!==side)b.dataset.side=side;}
 const own=dialog.dataset.suggestionSide||'',valid=own==='BLUE'||own==='RED';if(ownBadge.hidden===valid)ownBadge.hidden=!valid;if(ownBadge.dataset.side!==own)ownBadge.dataset.side=own;setText(ownBadge,valid?'Your team: '+own:'');
 for(const b of dialog.querySelectorAll('.md-fast-factions button')){const name=(b.getAttribute('aria-label')||'').replace(/^Jump to /,'');if(!name)continue;setText(b,name);if(b.dataset.faction!==name){b.dataset.faction=name;b.style.setProperty('--faction-label',colors[name]||'#d4ccba');}}
 const side=active.side,index=active.index,editing=Boolean(lineup[side]?.[index]);
 setText(caption,editing?'Editing: '+side+' '+(index+1):'Next: '+side+' '+(index+1)+(valid?(side===own?' — your turn':' — opponent turn'):''));
 if(close)close.setAttribute('aria-label',title.textContent==='Assistant'?'Close Assistant':'Close hero selection');
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;update();});}
const css=make('style','');css.id='mobile-catalog-clarity';css.textContent=`
html body #mobileDraft130.md-fast .md130head{display:flex!important;align-items:center!important;gap:6px!important;padding:2px 3px!important;min-height:44px!important;background:#173326!important}
html body #mobileDraft130.md-fast .md-fast-identity{display:flex;flex-direction:column;gap:1px;flex:1;min-width:0}
html body #mobileDraft130.md-fast .md-fast-identity h2{font-size:13px!important;line-height:16px!important;margin:0!important;flex:none!important}
html body #mobileDraft130.md-fast .md-fast-solise{position:static!important;width:30px!important;height:30px!important;min-width:30px!important;flex:0 0 30px;object-fit:cover;border-radius:50%;margin:0!important}
html body #mobileDraft130.md-fast .md-fast-solise[hidden]{display:none!important}
html body #mobileDraft130.md-fast .md-fast-own{display:block;line-height:13px;font-size:10px;font-weight:650;background:none;border:0;padding:0}
html body #mobileDraft130.md-fast .md-fast-own[data-side="BLUE"]{color:#9fd7ff}
html body #mobileDraft130.md-fast .md-fast-own[data-side="RED"]{color:#ffb0bd}
html body #mobileDraft130.md-fast .md-fast-own[hidden]{display:none!important}
html body #mobileDraft130.md-fast .md130head button{width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important;font-size:24px!important;line-height:1!important}
html body #mobileDraft130.md-fast .md-fast-status{min-height:28px!important}
html body #mobileDraft130.md-fast .md-fast-caption{font-size:11px;line-height:16px;font-weight:650}
html body #mobileDraft130.md-fast .md132gatebuttons button[data-side="BLUE"]{background:#14547e!important;border:2px solid #7ad6ff!important;color:#effbff!important}
html body #mobileDraft130.md-fast .md132gatebuttons button[data-side="RED"]{background:#7d2942!important;border:2px solid #ff9bb2!important;color:#fff0f4!important}
html body #mobileDraft130.md-fast .md130controls{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;position:relative!important;gap:3px!important}
html body #mobileDraft130.md-fast .md-fast-factions{display:contents!important}
html body #mobileDraft130.md-fast .md130controls>button,html body #mobileDraft130.md-fast .md-fast-factions button{width:100%!important;min-width:0!important;min-height:32px!important;height:32px!important;padding:2px!important;font-size:10px!important;white-space:normal!important;overflow-wrap:anywhere;line-height:12px!important}
html body #mobileDraft130.md-fast .md-fast-factions button{color:var(--faction-label,#d4ccba)!important;border-color:var(--faction-label,#75613a)!important;background:#232820!important}
html body #mobileDraft130.md-fast .md130controls input{grid-column:1/-1!important}
html body #mobileDraft130.md-fast .md-fast-info{position:static!important;font-size:10px;line-height:14px}
html body #mobileDraft130.md-fast .md-fast-info>summary{display:flex!important;align-items:center;justify-content:center;min-height:32px!important;height:32px!important;padding:2px!important;border:1px solid #75613a;border-radius:8px;cursor:pointer;font-size:10px!important;list-style:none}
html body #mobileDraft130.md-fast .md-fast-info>summary::-webkit-details-marker{display:none}
html body #mobileDraft130.md-fast .md-fast-info-panel{position:absolute;top:100%;left:0;right:0;z-index:5;max-height:180px;overflow:auto;padding:8px;background:#19261e;border:1px solid #75613a;border-radius:7px;box-shadow:none}
html body #mobileDraft130.md-fast .md-fast-info-panel p{margin:3px 0!important;font-size:11px!important;line-height:16px!important}
html body #mobileDraft130.md-fast .md-fast-info-panel .md-fast-legend{min-height:0!important}
html body #mobileDraft130.md-fast .md130pool{row-gap:2px!important;grid-auto-rows:max-content!important}
html body #mobileDraft130.md-fast .md-fast-faction{margin:3px 0 0!important;line-height:14px!important;font-size:11px!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool button.md130hero{height:64px!important;min-height:64px!important;max-height:64px!important;padding:8px 0 12px!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier{display:block!important;min-width:0!important;max-width:none!important;width:auto!important;height:auto!important;min-height:0!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;color:#b3bac3!important;font-size:13px!important;line-height:16px!important;font-weight:900!important;text-shadow:-1px -1px 0 #111,1px -1px 0 #111,-1px 1px 0 #111,1px 1px 0 #111}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier^="S"]{color:#f1cc73!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier^="A"]{color:#c7a0ee!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier="B"]{color:#8cc9f5!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier="C"]{color:#9bd6a8!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-top{display:block!important;box-sizing:border-box!important;width:auto!important;max-width:none!important;height:12px!important;min-height:12px!important;padding:0 4px!important;line-height:12px!important;font-size:9px!important;overflow:visible!important;white-space:nowrap!important;background:#c5d7e3!important;color:#17242e!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-top[hidden]{display:none!important}
`;document.head.append(css);
new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-side','data-suggestion-side']});
window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);
window.TrackerAssistantCompact1320=Object.freeze({version:'2.1.0'});update();
})();
