// Mobile catalog presentation only. No tier or recommendation ranking changes.
(function(){
'use strict';
if(window.TrackerAssistantCompact1320)return;
const dialog=document.getElementById('mobileDraft130');if(!dialog?.classList.contains('md-fast'))return;
const get=id=>document.getElementById(id),head=dialog.querySelector('.md130head'),title=head?.querySelector('h2');if(!head||!title)return;
const badge=document.createElement('span');badge.className='md-fast-own';badge.hidden=true;title.after(badge);
let frame=0;
function text(node,value){if(node&&node.textContent!==value)node.textContent=value;}
function update(){
 for(const b of dialog.querySelectorAll('.md132gatebuttons button')){const side=/\b(BLUE|RED)\b/.exec(b.textContent)?.[1];if(side&&b.dataset.side!==side)b.dataset.side=side;}
 const own=dialog.dataset.suggestionSide||'',valid=own==='BLUE'||own==='RED';
 if(badge.hidden===valid)badge.hidden=!valid;
 if(badge.dataset.side!==own)badge.dataset.side=own;
 text(badge,valid?'YOU: '+own:'');
 for(const b of dialog.querySelectorAll('.md-fast-factions button')){const name=(b.getAttribute('aria-label')||'').replace(/^Jump to /,'');if(name)text(b,name);}
 if(valid){
  const status=dialog.querySelector('.md-fast-status>span');
  const editing=Boolean(lineup[active.side]?.[active.index]);
  text(status,(editing?'Editing: ':active.side===own?'Your pick: ':'Opponent pick: ')+active.side+' '+(active.index+1));
 }
}
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;update();});}
const css=document.createElement('style');css.id='mobile-catalog-clarity';css.textContent=`
/* The repeated ID overrides legacy last-child signature/name hiding rules. */
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-top{display:block!important;box-sizing:border-box!important;width:auto!important;max-width:none!important;height:14px!important;min-height:14px!important;padding:1px 4px!important;line-height:12px!important;font-size:9px!important;overflow:visible!important;white-space:nowrap!important;background:#c5d7e3!important;color:#17242e!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-top[hidden]{display:none!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier{background:#52565d!important;border-color:#939aa5!important;color:#fff!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier^="S"]{background:#e4bd62!important;border-color:#ffe3a0!important;color:#211a0a!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier^="A"]{background:#b58bdf!important;border-color:#d9b8fb!important;color:#20102f!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier="B"]{background:#77b6e5!important;border-color:#b5dbf6!important;color:#102537!important}
html body #mobileDraft130#mobileDraft130.md-fast .md130pool .md130hero>span.md-fast-tier[data-tier="C"]{background:#88bd94!important;border-color:#c0e3c5!important;color:#122b19!important}
html body #mobileDraft130.md-fast .md-fast-own{display:inline-block;flex:0 0 auto;padding:4px 7px;border:1px solid;border-radius:5px;font-size:12px;line-height:18px;font-weight:800;white-space:nowrap}
html body #mobileDraft130.md-fast .md-fast-own[data-side="BLUE"]{background:#164f75;border-color:#8cceff;color:#eff8ff}
html body #mobileDraft130.md-fast .md-fast-own[data-side="RED"]{background:#793047;border-color:#ff9bb7;color:#fff0f5}
html body #mobileDraft130.md-fast .md-fast-own[hidden]{display:none!important}
html body #mobileDraft130.md-fast .md132gatebuttons button[data-side="BLUE"]{background:#14547e!important;border:2px solid #7ad6ff!important;color:#effbff!important}
html body #mobileDraft130.md-fast .md132gatebuttons button[data-side="RED"]{background:#7d2942!important;border:2px solid #ff9bb2!important;color:#fff0f4!important}
html body #mobileDraft130.md-fast .md-fast-factions{flex:1 1 0!important;min-width:0!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap;overscroll-behavior-x:contain;scrollbar-width:thin}
html body #mobileDraft130.md-fast .md-fast-factions button{flex:0 0 auto!important;width:auto!important;min-width:0!important;white-space:nowrap!important;font-size:11px!important;padding:4px 9px!important}
html body #mobileDraft130.md-fast .md-fast-status>span{font-size:12px;line-height:18px;font-weight:650}
`;document.head.append(css);
new MutationObserver(schedule).observe(dialog,{childList:true,subtree:true,characterData:true});
new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open','data-side','data-suggestion-side']});
window.addEventListener('tracker:draft-changed',schedule);window.addEventListener('tracker:catalog-changed',schedule);
window.TrackerAssistantCompact1320=Object.freeze({version:'2.0.1'});update();
})();
