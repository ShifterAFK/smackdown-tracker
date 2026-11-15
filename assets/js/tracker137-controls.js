(function(){
const root=document.querySelector('.tabs')||document.querySelector('.header');if(!root||!window.TrackerView)return;
const label=document.createElement('label');label.id='trackerViewTools';const text=document.createElement('span');text.textContent='View';const select=document.createElement('select');select.id='trackerViewSelect';select.setAttribute('aria-label','Interface layout');for(const [value,name] of [['auto','Auto'],['mobile','Mobile'],['desktop','Desktop']]){const option=document.createElement('option');option.value=value;option.textContent=name;select.append(option);}select.value=window.TrackerView.get();select.addEventListener('change',()=>window.TrackerView.set(select.value));label.append(text,select);root.append(label);
})();
