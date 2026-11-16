// Module: assist-compact-layout-v3-script

(function(){
 const root=document.getElementById('draftAssist');if(!root)return;
 const toggle=root.querySelector('.da-toggle'),map=document.getElementById('daMapLabel');
 let toolbar=root.querySelector('.da-toolbar');if(!toolbar){toolbar=document.createElement('div');toolbar.className='da-toolbar';root.prepend(toolbar);}
 function relabel(label,text){if(!label)return;const input=label.querySelector('input');if(!input)return;label.replaceChildren(input,document.createTextNode(' '+text));}
 relabel(toggle,'Draft Assistant');relabel(map,'Only selected map');if(toggle)toolbar.append(toggle);if(map){map.title='Unchecked: Overall across all maps in the current event.';toolbar.append(map);}
 const body=document.getElementById('daBody');if(!body)return;
 let details=body.querySelector('.da-details');if(!details){details=document.createElement('details');details.className='da-details';const summary=document.createElement('summary');summary.textContent='Details · data and ranking';details.append(summary);body.append(details);}
 for(const p of Array.from(body.children)){if(p.matches('p.da-info'))details.append(p);}
 const status=document.getElementById('daStatus');if(status&&!details.contains(status))details.append(status);
 function compactS(){const s=document.getElementById('daOverallS');if(!s)return;const title=s.querySelector('.da-s-title'),row=s.querySelector('.da-s-row');if(!row)return;const empty=!row.querySelector('.da-s-hero');s.classList.toggle('da-s-empty',empty);if(empty&&title&&title.textContent!=='S Overall — no eligible heroes meet the S-tier criteria'){title.textContent='S Overall — no eligible heroes meet the S-tier criteria';}}
 compactS();const target=document.getElementById('daOverallS');if(target)new MutationObserver(compactS).observe(target,{childList:true,subtree:true});
})();
