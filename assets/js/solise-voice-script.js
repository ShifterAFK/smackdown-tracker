(function(){
'use strict';
if(window.SoliseVoice)return;
const payload=document.getElementById('solise-voice-data');if(!payload)return;
let data;try{data=JSON.parse(payload.textContent);}catch(_){return;}
if(typeof data.audio!=='string'||!/^data:audio\/[a-z0-9.+-]+;base64,/i.test(data.audio))return;
const key='afk-solise-voice-enabled-v1';
let enabled=true;try{enabled=localStorage.getItem(key)!=='off';}catch(_){}
const audio=new Audio(data.audio);audio.preload='auto';audio.volume=0.5;
const toggle=document.createElement('button');toggle.type='button';toggle.className='solise-voice-toggle';
const status=document.createElement('span');status.className='solise-voice-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
document.body.append(status);
function render(){toggle.textContent=enabled?'Voice on':'Voice off';toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'Mute Solise voice':'Enable Solise voice');toggle.title=enabled?'Solise voice enabled — click to mute':'Solise voice disabled — click to enable';}
function stop(){audio.pause();try{audio.currentTime=0;}catch(_){}}
async function play(){
 if(!enabled||!audio.paused)return;
 try{audio.currentTime=0;await audio.play();status.textContent='';}
 catch(_){status.textContent='Voice could not play. Assistant is still available.';}
}
toggle.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off');}catch(_){}if(!enabled)stop();status.textContent='';render();});
function mount(){
 const desktop=matchMedia('(min-width:1100px)').matches;
 const host=desktop?document.querySelector('.desktop133bar'):document.querySelector('.md130dock');
 if(host&&toggle.parentNode!==host)host.append(toggle);
 toggle.hidden=!host;
}
document.addEventListener('click',event=>{
 const target=event.target.closest?.('.solise-help');if(!target)return;
 if(!target.closest('.desktop133bar,.md130dock')||target.disabled)return;
 if(typeof onlineBusy!=='undefined'&&onlineBusy)return;
 const mobile=target.closest('.md130dock');
 if(mobile&&document.getElementById('mobileDraft130')?.open)return;
 if(!mobile&&document.querySelector('.desktop133prompt[open]'))return;
 // Call play in the original user gesture, before waiting on UI or network.
 void play();
},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
matchMedia('(min-width:1100px)').addEventListener('change',mount);
render();mount();window.SoliseVoice=Object.freeze({version:'1.0.0',stop});
})();
