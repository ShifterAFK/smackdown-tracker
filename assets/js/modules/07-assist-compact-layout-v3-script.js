// Assistant presentation only: no ranking or tier changes.
(function(){
'use strict';
const root=document.getElementById('draftAssist'),body=document.getElementById('daBody');if(!root||!body)return;
const toggle=root.querySelector('.da-toggle');let toolbar=root.querySelector('.da-toolbar');if(!toolbar){toolbar=document.createElement('div');toolbar.className='da-toolbar';root.prepend(toolbar);}if(toggle)toolbar.append(toggle);
let details=body.querySelector('.da-details');if(!details){details=document.createElement('details');details.className='da-details';const summary=document.createElement('summary');summary.textContent='Details · data and ranking';details.append(summary);body.append(details);}for(const p of Array.from(body.children))if(p.matches('p.da-info'))details.append(p);
const notice=document.createElement('div');notice.className='da-experimental';const badge=document.createElement('strong');badge.textContent='Experimental';const text=document.createElement('span');text.textContent='Suggestions are experimental. Based on recorded team results; limited samples and team composition may affect accuracy.';notice.append(badge,text);body.prepend(notice);
const css=document.createElement('style');css.id='assistant-layout-1427';css.textContent=`
html body #draftAssist.da-clean .da-columns,html body #draftAssist.da-clean .da-side,html body #draftAssist.da-clean .da-candidates{height:auto!important;max-height:none!important;min-height:0!important;min-width:0!important;overflow:visible!important}
html body #draftAssist.da-clean .da-side{display:block!important;box-sizing:border-box!important;padding-bottom:12px!important}
html body #draftAssist.da-clean .da-side[hidden]{display:none!important}
html body #draftAssist.da-clean .da-candidates,html body #mobileDraft130 #draftAssist.da-clean .da-candidates{display:block!important;width:100%!important;columns:auto!important}
html body #draftAssist.da-clean .da-grid,html body #mobileDraft130 #draftAssist.da-clean .da-grid{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:flex-start!important;align-content:flex-start!important;justify-content:flex-start!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;height:auto!important;max-height:none!important;overflow:visible!important;position:static!important;gap:8px!important}
html body #draftAssist.da-clean .da-card,html body #mobileDraft130 #draftAssist.da-clean .da-card{position:relative!important;height:auto!important;min-height:0!important;flex:0 0 52px!important;width:52px!important;min-width:52px!important;margin:0!important;padding:0!important}
html body #draftAssist.da-clean .da-card>.da-candidate,html body #mobileDraft130 #draftAssist.da-clean .da-card>.da-candidate{position:relative!important;inset:auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;width:52px!important;height:auto!important;min-height:46px!important;box-sizing:border-box!important;padding:3px!important;margin:0!important}
html body #draftAssist.da-clean .da-card>.da-hide,html body #mobileDraft130 #draftAssist.da-clean .da-card>.da-hide{position:absolute!important;top:0!important;right:-3px!important;left:auto!important;bottom:auto!important}
html body #draftAssist.da-clean .da-candidate>small,html body #mobileDraft130 #draftAssist.da-clean .da-candidate>small{display:block!important;position:static!important;line-height:14px!important}
html body #draftAssist.da-clean .da-section-title{display:block!important;width:100%!important;position:static!important;clear:both!important}
html body #draftAssist.da-clean .da-expand{display:block!important;position:static!important;width:auto!important;clear:both!important}
#draftAssist .da-experimental{display:flex;flex-wrap:wrap;align-items:center;gap:5px 10px;margin:4px 0 8px;font-size:11px;line-height:1.4;color:#c9c0aa}
#draftAssist .da-experimental strong{padding:2px 7px;border:1px solid #ac8b4f;border-radius:5px;color:#ead39b;font-size:11px}
html body #mobileDraft130[data-mode="assistant"]{height:auto!important;max-height:94dvh!important;overflow:hidden!important}
html body #mobileDraft130[data-mode="assistant"] .md130shell{display:flex!important;flex-direction:column!important;height:88dvh!important;max-height:88dvh!important;min-height:0!important;overflow:hidden!important}
html body #mobileDraft130[data-mode="assistant"] .md130head,html body #mobileDraft130[data-mode="assistant"] .md132sidegate,html body #mobileDraft130[data-mode="assistant"] .md130preview,html body #mobileDraft130[data-mode="assistant"] .md130order,html body #mobileDraft130[data-mode="assistant"] .md130message{position:relative!important;flex:0 0 auto!important;height:auto!important;max-height:none!important}
html body #mobileDraft130[data-mode="assistant"] .md130content{display:block!important;position:relative!important;flex:1 1 0!important;height:auto!important;max-height:none!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain}
html body #mobileDraft130[data-mode="assistant"] .md130recommendations,html body #mobileDraft130[data-mode="assistant"] .md130assist{position:static!important;display:block!important;flex:none!important;width:100%!important;height:auto!important;max-height:none!important;min-height:0!important;min-width:0!important;overflow:visible!important;box-sizing:border-box!important}
html body #mobileDraft130[data-mode="assistant"] [hidden]{display:none!important}
`;document.head.append(css);
})();
