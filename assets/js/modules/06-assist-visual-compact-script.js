// Module: assist-visual-compact-script
(function(){const root=document.getElementById('draftAssist');if(!root)return;const toggle=root.querySelector('.da-toggle'),map=document.getElementById('daMapLabel');if(!toggle||!map)return;let bar=root.querySelector('.da-toolbar');if(!bar){bar=document.createElement('div');bar.className='da-toolbar';root.prepend(bar);}bar.append(toggle,map);})();
