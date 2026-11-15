(function(){
'use strict';
if(window.TrackerMatchHistory)return;
const get=id=>document.getElementById(id),tabs=document.querySelector('.tabs');
if(!tabs||!get('page-statistics')||!get('entryStatus'))return;
const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
const button=(text,fn)=>{const node=el('button','',text);node.type='button';node.onclick=fn;return node;};
const style=el('style');style.textContent='#page-history{margin-top:12px}.mh-record{border:1px solid var(--line);border-radius:9px;padding:12px;margin:10px 0}.mh-meta{font-size:12px;color:var(--muted);line-height:1.6;overflow-wrap:anywhere}.mh-team{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-top:9px}.mh-team-label{min-width:46px;font-size:12px;font-weight:650}.mh-team[data-side="BLUE"] .mh-team-label{color:var(--blue)}.mh-team[data-side="RED"] .mh-team-label{color:var(--red)}.mh-player{display:inline-flex;align-items:center;gap:4px;font-size:11px}.mh-player .avatar{width:30px!important;height:30px!important;border-width:1px}.mh-player .avatar img{width:100%;height:100%}.mh-controls,.mh-pages{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.mh-pages{margin-top:12px}.mh-controls select{max-width:100%}#matchReceipt[hidden]{display:none!important}#matchReceipt{margin-top:12px;border:1px solid var(--green);border-radius:9px;padding:12px}#matchReceipt h3{margin:0 0 7px;font-size:15px}.mh-signature{margin-top:9px}.mh-signature label{display:flex;flex-direction:row;align-items:center;gap:8px;font-size:11px}.mh-signature input{flex:1;min-width:0;width:100%;padding:7px 8px;font-size:16px}.mh-signature .caption{font-size:10px;margin:4px 0}';document.head.append(style);
const signatureBox=el('div','mh-signature'),signatureLabel=el('label','','Nick (optional)'),signature=el('input');signature.id='submitterName';signature.type='text';signature.maxLength=24;signature.placeholder='anon';signature.autocomplete='off';signature.spellcheck=false;signature.setAttribute('aria-describedby','submitterNameHint');signatureLabel.htmlFor=signature.id;signatureLabel.append(signature);
const signatureHint=el('p','caption','Public in match history. Blank = anon. Use a nickname, not personal details. Inappropriate or unsupported signatures are replaced with anon.');signatureHint.id='submitterNameHint';signatureBox.append(signatureLabel,signatureHint);get('submitOnline').closest('.actions').before(signatureBox);
function valid(m){return m&&typeof m.id==='string'&&typeof m.theme_id==='string'&&['BLUE','RED'].includes(m.winner)&&['blue_ids','red_ids'].every(k=>Array.isArray(m[k])&&m[k].length===3&&m[k].every(id=>typeof id==='string'));}
function date(value){const d=new Date(value);return Number.isFinite(d.getTime())?d.toLocaleString():'Time unavailable';}
function record(m){
 const name=typeof m.submitter_name==='string'&&m.submitter_name.trim()?m.submitter_name:'anon';
 const card=el('article','mh-record');card.append(el('div','mh-meta',(m.theme_name||themeName(m.theme_id))+' | Submitted: '+date(m.created_at)+' | Winner: '+m.winner+' | '+m.status+' | Submitted by: '+name));
 for(const side of ['BLUE','RED']){
  const row=el('div','mh-team');row.dataset.side=side;row.append(el('span','mh-team-label',side));
  for(const id of m[side==='BLUE'?'blue_ids':'red_ids']){const hero=heroById(id)||{id,name:id};const entry=el('span','mh-player');entry.append(portrait(hero),el('span','',hero.name));row.append(entry);}
  card.append(row);
 }
 const order=[];if(m.blue_draft_known===false)order.push('BLUE');if(m.red_draft_known===false)order.push('RED');if(order.length)card.append(el('p','caption','Draft order unknown: '+order.join(', ')+'. Hero order is not battlefield placement.'));
 return card;
}
const receipt=el('section');receipt.id='matchReceipt';receipt.hidden=true;receipt.setAttribute('aria-label','Saved match confirmation');receipt.setAttribute('aria-live','polite');get('entryStatus').after(receipt);
function showReceipt(m,already){
 receipt.replaceChildren(el('h3','',already?'Previously received match confirmed':'Match saved — server confirmation'),record(m));
 const close=button('Dismiss',()=>{receipt.hidden=true;});receipt.append(close);receipt.hidden=false;
}
const tab=el('button','tab','Recent matches');tab.type='button';tab.dataset.page='history';tabs.insertBefore(tab,get('openHelp'));
const page=el('section','card hidden');page.id='page-history';page.append(el('h2','','Recent matches'),el('p','caption','Approved matches in the current event. Dates are submission times, shown in your local time. Nicknames are optional, public and not verified. No private notes.'));
get('page-statistics').after(page);
const controls=el('div','mh-controls'),label=el('label','','Map'),filter=el('select');filter.setAttribute('aria-label','Filter match history by map');label.append(filter);
const refresh=button('Refresh',()=>load(0));controls.append(label,refresh);page.append(controls);
const status=el('p','status');status.setAttribute('role','status');const list=el('div');page.append(status,list);
const navigation=el('nav','mh-pages');navigation.setAttribute('aria-label','Recent match pages');
let offset=0,hasMore=false,request=0,busy=false,lastReceipt=null;
const previous=button('Previous',()=>load(Math.max(0,offset-10))),next=button('Next',()=>load(offset+10)),pageLabel=el('span','caption','Page 1');navigation.append(previous,pageLabel,next);page.append(navigation);
function nav(){previous.disabled=busy||offset===0;next.disabled=busy||!hasMore||offset>=10000;refresh.disabled=busy;pageLabel.textContent='Page '+(Math.floor(offset/10)+1);}
function maps(){const old=filter.value;filter.replaceChildren(new Option('All maps',''));for(const t of config.themes)filter.add(new Option(t.name,t.id));if(Array.from(filter.options).some(o=>o.value===old))filter.value=old;}
async function load(wanted=0){
 const token=++request,theme=filter.value||null;busy=true;nav();page.setAttribute('aria-busy','true');status.classList.remove('error');status.textContent='Loading approved matches...';
 try{
  const data=await rpc('ss_get_recent_matches',{p_limit:10,p_offset:wanted,p_theme_id:theme});
  if(token!==request)return;
  if(!Array.isArray(data?.matches)||!data.matches.every(m=>valid(m)&&m.status==='approved')||typeof data.has_more!=='boolean')throw Error('Invalid match history response');
  offset=wanted;hasMore=data.has_more;list.replaceChildren(...data.matches.map(record));
  status.textContent=data.matches.length?'Loaded '+data.matches.length+' approved matches.':'No approved matches in this view.';
 }catch(error){if(token!==request)return;status.textContent='Unable to load history: '+error.message;status.classList.add('error');}
 finally{if(token===request){busy=false;page.removeAttribute('aria-busy');nav();}}
}
filter.onchange=()=>load(0);maps();nav();
document.addEventListener('click',event=>{
 const target=event.target instanceof Element?event.target.closest('.tabs .tab'):null;if(!target)return;
 if(target!==tab){page.classList.add('hidden');tab.classList.remove('active');return;}
 event.preventDefault();event.stopImmediatePropagation();
 for(const name of ['entry','tiers','statistics'])get('page-'+name)?.classList.add('hidden');
 for(const node of tabs.querySelectorAll('.tab'))node.classList.toggle('active',node===tab);
 page.classList.remove('hidden');load(0);
},true);
const originalFetch=window.fetch;
window.fetch=function(input,init){
 let isSubmit=false,options=init;
 try{
  const url=new URL(typeof input==='string'||input instanceof URL?String(input):input.url,document.baseURI);
  const endpoint=new URL(PROJECT_URL+'/functions/v1/submit-match');
  const method=String(init?.method||(input instanceof Request?input.method:'GET')).toUpperCase();
  isSubmit=url.origin===endpoint.origin&&url.pathname===endpoint.pathname&&method==='POST';
  if(isSubmit&&typeof init?.body==='string'){
   const body=JSON.parse(init.body);
   if(body&&typeof body==='object'&&!Array.isArray(body))options={...init,body:JSON.stringify({...body,p_submitter_name:signature.value.trim()||null})};
  }
 }catch(_){}
 const response=originalFetch.call(this,input,options);
 if(isSubmit)response.then(result=>{
  if(!result.ok)return;
  return result.clone().json().then(payload=>{
   const data=payload?.data,m=data?.match;
   if(payload?.success!==true||!valid(m)||data.id!==m.id)return;
   lastReceipt={match:m,already:data.already_received===true};showReceipt(m,lastReceipt.already);
  });
 }).catch(()=>{});
 return response;
};
window.addEventListener('tracker:catalog-changed',()=>{maps();if(lastReceipt)showReceipt(lastReceipt.match,lastReceipt.already);if(!page.classList.contains('hidden'))load(0);});
window.addEventListener('tracker:submission-finished',event=>{if(event.detail?.saved){signature.value='';if(!page.classList.contains('hidden'))load(0);}});
window.TrackerMatchHistory=Object.freeze({version:'1.1.0'});
})();