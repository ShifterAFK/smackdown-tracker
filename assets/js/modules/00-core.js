// Module: core

'use strict';
const APP_VERSION='1.1.4';
function notifyDraftChanged(){window.dispatchEvent(new Event('tracker:draft-changed'));}

const PROJECT_URL='https://rwnbxhrkjjlfuljhwdpt.supabase.co';
const PUBLISHABLE_KEY='sb_publishable_K613s8nvoUQTzIc-BLn2VQ_8kfTLWAm';
const BASE='https://shifterafk.github.io/smackdown-tracker/portraits/';
const MAPS={"fierce-duel":"assets/img/maps/map-01-b8baf68da2.webp","tranquil-grounds":"assets/img/maps/map-02-76d5cac13c.webp","tactical-grounds":"assets/img/maps/map-03-3a28b367a0.webp","siegebreaker":"assets/img/maps/map-04-72872ff116.webp","top-defender":"assets/img/maps/map-05-67e379abc7.webp"};
const THEMES=[{id:'tranquil-grounds',name:'Tranquil Grounds'},{id:'top-defender',name:'Top Defender'},{id:'siegebreaker',name:'Siegebreaker'},{id:'fierce-duel',name:'Fierce Duel'},{id:'tactical-grounds',name:'Tactical Grounds'}];
const ROSTER={"Lightbearer": "Atalanta|Cassadee|Chippy|Cyran|Evie|Fay|Gwyneth|Hammie|Hugin|Korin|Lucca|Lucius|Marilee|Mirael|Orion|Peggy|Perseus|Rowan|Silven|Sinbad|Sonja|Temesia|Vala|Valen|Walker|Zanie|Estrilda", "Wilder": "Arden|Bryon|Damian|Eironn|Faramor|Florabelle|Granny Dahnie|Hewynn|Indris|Kafra|Lenya|Lily May|Lorsan|Lyca|Pang|Parisa|Pippa|Ravion|Solise|Tasi|Thador|Tilaya|Ulmus|Velara", "Mauler": "Alsa|Antandra|Brutus|Gala|Gerda|Hepler|Kazim|Koko|Kordan|Kruger|Lumont|Mikola|Nazrik|Odie|Rhys|Satrana|Seth|Shakir|Smokey & Meerky|Soren|Voracia|Zandrok", "Graveborn": "Baden|Bonnie|Callan|Carolina|Cecia|Daimon|Eryndor|Hodgkin|Igor|Isabella|Karma|Ludovic|Nara|Nerion|Niru|Salazer|Senea|Shadewing|Shemira|Silvina|Thoran|Valka|Viperian|Zorya", "Celestial": "Aliceth|Alna|Athalia|Aurora|Baelran|Dionel|Dunlingr|Elijah & Lailah|Marene|Rolan|Scarlita|Sylphira|Talene", "Hypogean": "Aster|Berial|Contess|Cryonaia|Gunnar|Harak|Kulu|Lamentis|Mehira|Phraesto|Reinier|Saida", "Dimensional": "Frieren|Himmel|Laios|Lucy|Marcille|Natsu|Pandora|Taichi|Yamato"};
const FACTIONS=Object.keys(ROSTER);
const $=id=>document.getElementById(id);
const PORTRAIT_ALIASES={'taichi':'taichi-agumon','yamato':'yamato-gabumon','gala':'galahad'};
const slug=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const BANNED_HERO_IDS = new Set(["chippy", "hammie", "zanie", "voracia", "eryndor", "senea", "baden", "elijah-lailah", "alna", "sylphira", "rolan", "marene", "phraesto", "saida", "mehira", "gunnar", "contess", "aster", "pandora", "frieren", "taichi"]);
const isBannedHero = h => BANNED_HERO_IDS.has(h.id) || BANNED_HERO_IDS.has(slug(h.name || "")) || ["roland","twins","taichi-agumon","taichi-and-agumon"].includes(slug(h.name || ""));
const fallbackHeroes=Object.entries(ROSTER).flatMap(([faction,names])=>names.split('|').map(name=>({id:slug(name),name,faction,portrait_url:BASE+(PORTRAIT_ALIASES[slug(name)]||slug(name))+'.webp',is_allowed:!BANNED_HERO_IDS.has(slug(name))})));
let config={event:{id:'showdown-current',name:'Showdown Smackdown',current_theme_id:'tranquil-grounds'},themes:THEMES,heroes:fallbackHeroes};
let lineup={BLUE:[null,null,null],RED:[null,null,null]};
let known={BLUE:true,RED:true};let phantimalOverride={BLUE:null,RED:null};
let active={side:'BLUE',index:0};
let winner='';
let factionFilter='';
let dragData=null;
let blockClickUntil=0;
let stats=null;
let statsRequest=0;
let configRequest=0;
let onlineCatalog=false;
const themeName=id=>(config.themes.find(t=>t.id===id)||THEMES.find(t=>t.id===id))?.name||id;
const heroById=id=>config.heroes.find(h=>h.id===id)||fallbackHeroes.find(h=>h.id===id);
function tell(id,text,error=false){$(id).textContent=text;$(id).classList.toggle('error',error)}
function safeURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
function normalizePhantimal(value){return ['Celestial','Hypogean','Celestial & Hypogean','Wedge of Matter'].includes(value)?'Wedge of Matter':value;}
function phantimalDisplay(value){return ({Lightbearer:'Gervan',Mauler:'Crystal Beetle',Wilder:'Seralyth',Graveborn:'Plague Creeper','Wedge of Matter':'Wedge of Matter',Unknown:'Unknown',None:'None'})[normalizePhantimal(value)]||value||'Unknown';}
function selectedPhantimal(side){return known[side]?derive(lineup[side],true):(phantimalOverride[side]||'Unknown');}
function derive(team,isKnown){if(!team.some(Boolean))return '';if(!isKnown)return 'Unknown';for(const id of team){if(!id)return '';const h=heroById(id);if(!h)return 'Unknown';if(h.faction!=='Dimensional')return normalizePhantimal(h.faction)}return 'None'}
function validTeams(teams){const values=[...teams.BLUE,...teams.RED].filter(Boolean);return values.length===new Set(values).size;}
function wilson(w,n){if(!n)return [0,1];const z=1.959963984540054,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,r=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [Math.max(0,c-r),Math.min(1,c+r)]}
async function rpc(name,body){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),18000);try{const response=await fetch(PROJECT_URL+'/rest/v1/rpc/'+name,{method:'POST',headers:{apikey:PUBLISHABLE_KEY,'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});const text=await response.text();let data;try{data=JSON.parse(text)}catch{throw Error('Unexpected server response ('+response.status+').')}if(!response.ok)throw Error(data?.message||'Request failed ('+response.status+').');return data}finally{clearTimeout(timer)}}
function localPortraitUrl(hero){const id=slug(hero?.id||hero?.name||'');if(!id)return hero?.portrait_url||'';return BASE+(PORTRAIT_ALIASES[id]||id)+'.webp'}
function portrait(h){const wrap=document.createElement('span');wrap.className='avatar';const fallback=()=>{wrap.replaceChildren();wrap.classList.add('fallback');wrap.textContent=(h.name||'?').split(/\s+/).slice(0,2).map(x=>x[0]).join('')};const url=safeURL(h.portrait_url||'');if(!url){fallback();return wrap}const image=document.createElement('img');image.alt=h.name;image.draggable=false;image.loading='eager';image.decoding='async';image.referrerPolicy='no-referrer';image.onerror=fallback;image.src=url;wrap.append(image);return wrap}
function renderThemes(){const old=$('theme').value,oldStats=$('statsTheme').value;for(const [id,all]of [['theme',false],['statsTheme',true]]){const select=$(id);select.replaceChildren();if(all){const option=new Option('Overall — all maps in this event','');select.add(option)}for(const theme of config.themes)select.add(new Option(theme.name,theme.id))}const defaultTheme=config.event.current_theme_id;$('theme').value=config.themes.some(t=>t.id===defaultTheme)?defaultTheme:'';$('statsTheme').value=oldStats||'';$('currentTheme').textContent='Current map: '+(defaultTheme?themeName(defaultTheme):'not configured')+'. Select the map used in this match.';renderMap();window.dispatchEvent(new Event('tracker:catalog-changed'));}
function renderMap(){const id=$('theme').value;const src=MAPS[id];$('mapPreview').src=src||'';$('mapPreview').alt=themeName(id)+' arena layout';$('mapOpen').disabled=!src;$('mapSelectedName').textContent=themeName(id);}
function renderFilters(){$('factionFilters').replaceChildren();for(const f of ['',...FACTIONS]){const b=document.createElement('button');b.className='filter';b.textContent=f||'All';b.classList.toggle('active',factionFilter===f);b.onclick=()=>{factionFilter=f;renderFilters();renderHeroes()};$('factionFilters').append(b)}}
function finishDrag(){dragData=null;blockClickUntil=Date.now()+180;document.querySelectorAll('.dragging,.drop-target').forEach(el=>el.classList.remove('dragging','drop-target'))}
function startDrag(e,data,el){dragData=data;blockClickUntil=Date.now()+500;e.dataTransfer.setData('text/plain',data.id||lineup[data.side][data.index]||'');e.dataTransfer.effectAllowed=data.kind==='hero'?'copy':'move';el.classList.add('dragging')}
function applyDrop(side,index){if(!dragData)return;const next={BLUE:[...lineup.BLUE],RED:[...lineup.RED]};if(dragData.kind==='hero'){if(!config.heroes.some(h=>h.id===dragData.id&&h.is_allowed))return;next[side][index]=dragData.id}else if(dragData.kind==='slot'){const source=dragData;if(!['BLUE','RED'].includes(source.side)||![0,1,2].includes(source.index))return;if(source.side===side&&source.index===index)return;const moving=next[source.side][source.index];if(!moving)return;next[source.side][source.index]=next[side][index];next[side][index]=moving}else return;if(!validTeams(next)){tell('entryStatus','That move would duplicate a hero across the two teams.',true);return}lineup=next;active={side,index};tell('entryStatus','');renderSlots();renderHeroes()}

function renderPhantimal(side){
 const box=$('phantimal'+side);box.replaceChildren();
 const selected=selectedPhantimal(side);
 const items=[['Lightbearer','Gervan','gervan-BgGlLpny'],['Mauler','Crystal Beetle','crystal-beetle-ul2ZX7WA'],['Wilder','Seralyth','seralyth-kRL1WHjs'],['Graveborn','Plague Creeper','plague-creeper-BQ1GVpoX'],['Wedge of Matter','Wedge of Matter','wedge-of-matter-Dy5TR7IM']];
 const label=document.createElement('span');label.className='ph-label';label.textContent='Phantimal';box.append(label);
 const row=document.createElement('div');row.className='ph-icons';row.setAttribute('role','group');row.setAttribute('aria-label',side+' Phantimal');box.append(row);
 for(const [key,name,asset] of items){
  const button=document.createElement('button');button.type='button';button.className='phantimal-chip';
  button.classList.toggle('active',selected===key);button.setAttribute('aria-pressed',String(selected===key));
  button.setAttribute('aria-label',name);button.title=name+(known[side]?' — automatic':' — select observed Phantimal');button.setAttribute('aria-disabled',String(known[side]));
  const image=document.createElement('img');image.src='https://afkstargazer.com/assets/'+asset+'.webp';image.alt='';image.width=26;image.height=26;image.draggable=false;button.append(image);
  button.onclick=()=>{if(known[side]||onlineBusy)return;phantimalOverride[side]=phantimalOverride[side]===key?null:key;renderPhantimal(side);};row.append(button);
 }
 const hint=document.createElement('small');hint.className='ph-status';hint.textContent=known[side]?(selected?('Automatic: '+phantimalDisplay(selected)):'Pick a hero to assign a Phantimal'):(selected==='Unknown'?'Select the Phantimal seen in battle or on the results screen, or leave it Unknown':('Manual: '+phantimalDisplay(selected)));box.append(hint);
}

function renderSlots(){for(const side of ['BLUE','RED']){const container=$('slots'+side);container.replaceChildren();lineup[side].forEach((id,index)=>{const b=document.createElement('button');b.className='slot';b.classList.toggle('active',active.side===side&&active.index===index);const label=document.createElement('small');label.textContent=(known[side]?'Pick ':'Slot ')+(index+1);label.title=known[side]?'Draft order — not battlefield position':'Draft order unknown';b.append(label);if(id)b.append(portrait(heroById(id)||{name:id}));const name=document.createElement('span');name.className='name';name.textContent=id?(heroById(id)?.name||id):'+';if(!id){name.classList.add('empty-slot-mark');b.setAttribute('aria-label','Select empty '+side+' slot '+(index+1));}b.append(name);b.draggable=Boolean(id);b.title=id?'Drag to move or swap':'Drop a hero here';b.ondragstart=e=>{if(!id){e.preventDefault();return}startDrag(e,{kind:'slot',side,index},b)};b.ondragend=finishDrag;b.ondragover=e=>{if(!dragData)return;e.preventDefault();e.dataTransfer.dropEffect=dragData.kind==='hero'?'copy':'move';b.classList.add('drop-target')};b.ondragleave=()=>b.classList.remove('drop-target');b.ondrop=e=>{e.preventDefault();applyDrop(side,index);finishDrag()};b.onclick=()=>{if(Date.now()<blockClickUntil)return;active={side,index};renderSlots()};const cell=document.createElement('div');cell.className='slot-cell';cell.append(b);if(id){const remove=document.createElement('button');remove.type='button';remove.className='slot-remove';remove.textContent='×';remove.title='Remove '+(heroById(id)?.name||id);remove.setAttribute('aria-label','Remove hero from '+side+' '+(index+1));remove.draggable=false;remove.onclick=e=>{e.preventDefault();e.stopPropagation();if(onlineBusy)return;lineup[side][index]=null;active={side,index};renderSlots();renderHeroes();tell('entryStatus','Hero removed.');};cell.append(remove)}container.append(cell)});$('known'+side).checked=known[side];renderPhantimal(side);$('win'+side).classList.toggle('chosen',winner===side)}$('activeLabel').value=active.side+' '+(active.index+1);notifyDraftChanged();}
function choose(id){if(onlineBusy)return;if(['BLUE','RED'].some(side=>lineup[side].some((x,i)=>x===id&&(side!==active.side||i!==active.index)))){tell('entryStatus','That hero is already drafted. Each hero can appear only once across both teams.',true);return}lineup[active.side][active.index]=id;const slots=['BLUE','RED'].flatMap(side=>[0,1,2].map(index=>({side,index})));const pos=slots.findIndex(s=>s.side===active.side&&s.index===active.index);const next=slots.slice(pos+1).concat(slots.slice(0,pos)).find(s=>!lineup[s.side][s.index]);if(next)active=next;tell('entryStatus','');$('search').value='';factionFilter='';renderFilters();renderSlots();window.dispatchEvent(new Event('tracker:draft-changed'));if(typeof window.renderHeroes==='function')window.renderHeroes();const catalog=$('heroes');if(catalog)catalog.scrollTop=0;}
function renderHeroes(){
 const query=$('search').value.trim().toLowerCase();const order=['Lightbearer','Wilder','Mauler','Graveborn','Celestial','Hypogean','Dimensional'];const rank=f=>{const i=order.indexOf(f);return i<0?order.length:i;};
 const heroes=config.heroes.filter(h=>h.is_allowed&&(!factionFilter||h.faction===factionFilter)&&h.name.toLowerCase().includes(query)).sort((a,b)=>rank(a.faction)-rank(b.faction)||a.name.localeCompare(b.name,'en',{sensitivity:'base'}));
 const container=$('heroes');container.replaceChildren();let previousFaction=null;
 for(const h of heroes){if(!factionFilter&&h.faction!==previousFaction){const title=document.createElement('div');title.className='hero-faction-heading';title.textContent=h.faction;title.setAttribute('role','heading');title.setAttribute('aria-level','3');container.append(title);previousFaction=h.faction;}
 const button=document.createElement('button');button.type='button';button.className='hero';button.title=h.name;button.setAttribute('aria-label',h.name);button.append(portrait(h));button.onclick=()=>{if(Date.now()<blockClickUntil)return;choose(h.id);};button.ondragstart=e=>startDrag(e,{kind:'hero',id:h.id},button);button.ondragend=finishDrag;
 const used=[...lineup.BLUE,...lineup.RED].includes(h.id);button.classList.toggle('used',used);button.disabled=used;button.draggable=!used;if(used)button.title=h.name+' — already drafted';container.append(button);}
 if(!heroes.length){const empty=document.createElement('p');empty.className='hero-search-empty';empty.textContent='No heroes match this search.';container.append(empty);}
 $('catalogInfo').textContent=heroes.length+' shown · '+config.heroes.filter(h=>h.is_allowed).length+' allowed · '+(onlineCatalog?'shared catalog':'built-in fallback catalog');
;notifyDraftChanged();}
function resetDraft(){window.dispatchEvent(new Event('tracker:draft-reset'));lineup={BLUE:[null,null,null],RED:[null,null,null]};known={BLUE:true,RED:true};phantimalOverride={BLUE:null,RED:null};active={side:'BLUE',index:0};winner='';$('notes').value='';renderSlots()}
async function loadConfig(){const request=++configRequest;try{const data=await rpc('ss_get_config',{});if(!data?.event?.id||!Array.isArray(data.heroes)||!Array.isArray(data.themes))throw Error('Invalid configuration.');if(data.heroes.some(h=>typeof h.id!=='string'||typeof h.name!=='string'||!FACTIONS.includes(h.faction))||data.themes.some(t=>typeof t.id!=='string'||typeof t.name!=='string'))throw Error('Invalid catalog records.');if(request!==configRequest)return;config={...data,heroes:data.heroes.map(h=>({...h,portrait_url:localPortraitUrl(h),is_allowed:h.is_allowed===true&&!isBannedHero(h)}))};onlineCatalog=true;$('connection').textContent='Live hero catalog loaded';config.heroes.forEach(h=>{const image=new Image();image.src=h.portrait_url});renderThemes();renderHeroes();renderSlots();}catch(e){if(request!==configRequest)return;$('connection').textContent=onlineCatalog?'Catalog refresh failed · using last loaded catalog':'Live hero catalog unavailable · using built-in event eligibility list';$('connection').title=e.message;renderHeroes()}}
async function loadStats(){if(window.TrackerSnapshot1323?.active)return;const request=++statsRequest;stats=null;renderStats();tell('statsStatus','Loading approved match statistics…');try{const data=await rpc('ss_get_stats',{p_theme_id:$('statsTheme').value||null,p_exclude_mirrors:$('excludeMirrors').checked});if(request!==statsRequest)return;if(!data?.summary||!Array.isArray(data.heroes)||!Array.isArray(data.duos)||!Array.isArray(data.phantimals))throw Error('Invalid statistics response.');stats=data;tell('statsStatus','Last calculated: '+new Date(data.generated_at).toLocaleString()+'. Server cache: up to 5 minutes.');renderStats()}catch(e){if(request!==statsRequest)return;stats=null;renderStats();tell('statsStatus','Unable to load statistics: '+e.message,true)}}
function heroLabel(id){const h=heroById(id)||{name:id};const wrap=document.createElement('span');wrap.className='mini-hero';wrap.append(portrait(h));const name=document.createElement('span');name.textContent=h.name;wrap.append(name);return wrap}

const STATS_PAGE_SIZE=10;
let statisticsPage=1,statisticsPageKey='';
function statisticsPageWindow(total,key){
 if(key!==statisticsPageKey){statisticsPage=1;statisticsPageKey=key;}
 const pages=Math.max(1,Math.ceil(total/STATS_PAGE_SIZE));
 statisticsPage=Math.max(1,Math.min(statisticsPage,pages));
 const start=(statisticsPage-1)*STATS_PAGE_SIZE;
 return {start,end:Math.min(start+STATS_PAGE_SIZE,total),pages};
}

function renderStats(){const summary=stats?.summary;$('statMatches').textContent=summary?.approved_matches??'—';$('statBlue').textContent=summary?.blue_wins??'—';$('statRed').textContent=summary?.red_wins??'—';const container=$('statsTable');container.replaceChildren();if(!stats)return;const category=$('statsCategory').value;const minimum=Math.max(1,Number($('minimum').value)||1);const sort=$('sort').value;const rows=stats[category].filter(r=>Number(r.appearances)>=minimum).map(r=>({...r,interval:wilson(Number(r.wins),Number(r.appearances))}));rows.sort((a,b)=>{const value=r=>sort==='confidence'?r.interval[0]:Number(r[sort]);return value(b)-value(a)||b.appearances-a.appearances});if(!rows.length){const p=document.createElement('p');p.className='empty';p.textContent=summary.approved_matches===0?'No matches yet.':'No results meet the filter. Try Minimum appearances = 1.';container.append(p);return}const pageKey=JSON.stringify([stats.generated_at,stats.theme_id,stats.exclude_mirrors,category,minimum,sort]);const page=statisticsPageWindow(rows.length,pageKey);const table=document.createElement('table');const thead=document.createElement('thead');const tr=document.createElement('tr');for(const title of ['#',category==='heroes'?'Hero':category==='duos'?'Duo':'Phantimal','Appearances','Wins','Losses','Win rate','95% interval']){const th=document.createElement('th');th.textContent=title;tr.append(th)}thead.append(tr);table.append(thead);const tbody=document.createElement('tbody');rows.slice(page.start,page.end).forEach((r,i)=>{const row=document.createElement('tr');const rank=document.createElement('td');rank.textContent=page.start+i+1;row.append(rank);const label=document.createElement('td');if(category==='heroes')label.append(heroLabel(r.hero_id));else if(category==='duos'){const pair=document.createElement('span');pair.className='duo mini-hero';pair.append(portrait(heroById(r.hero_1_id)||{name:r.hero_1_id}),portrait(heroById(r.hero_2_id)||{name:r.hero_2_id}));const names=document.createElement('span');names.className='names';names.textContent=(heroById(r.hero_1_id)?.name||r.hero_1_id)+' + '+(heroById(r.hero_2_id)?.name||r.hero_2_id);pair.append(names);label.append(pair)}else label.textContent=phantimalDisplay(r.faction);row.append(label);for(const value of [r.appearances,r.wins,r.losses,Number(r.win_rate).toFixed(1)+'%',(r.interval[0]*100).toFixed(1)+'–'+(r.interval[1]*100).toFixed(1)+'%']){const td=document.createElement('td');td.textContent=value;row.append(td)}tbody.append(row)});table.append(tbody);container.append(table);const navigation=document.createElement('nav');navigation.className='statistics-pagination';navigation.setAttribute('aria-label','Statistics pages');const info=document.createElement('span');info.setAttribute('role','status');info.textContent=(page.start+1)+'–'+page.end+' of '+rows.length+' · Page '+statisticsPage+' of '+page.pages;const previous=document.createElement('button');previous.type='button';previous.textContent='Previous';previous.disabled=statisticsPage===1;previous.onclick=()=>{statisticsPage--;renderStats();};const next=document.createElement('button');next.type='button';next.textContent='Next';next.disabled=statisticsPage===page.pages;next.onclick=()=>{statisticsPage++;renderStats();};navigation.append(info,previous,next);container.append(navigation)}

// Online submission: the secret key exists only in the Edge Function.
const TURNSTILE_SITE_KEY = '0x4AAAAAAF9GUMJ2VevBO2y8';
let captchaToken = '';
let captchaWidgetId = null;
let onlineBusy = false;
let pendingSubmission = null;

function updateSubmitButton() {
  $('submitOnline').disabled = onlineBusy || !captchaToken;
  $('submitOnline').textContent = onlineBusy ? 'Submitting…' : 'Submit match';
}
function resetCaptcha() {
  captchaToken = '';
  updateSubmitButton();
  if (captchaWidgetId !== null && window.turnstile) {
    window.turnstile.reset(captchaWidgetId);
    $('captchaStatus').textContent = 'Complete verification to submit a match.';
  }
}
window.initTurnstile = function () {
  try {
    captchaWidgetId = window.turnstile.render('#turnstileWidget', {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'dark',
      size: 'normal',
      callback: (token) => {
        captchaToken = token;
        $('captchaStatus').textContent = 'Verification ready.';
        updateSubmitButton();
      },
      'expired-callback': () => {
        captchaToken = '';
        $('captchaStatus').textContent = 'Verification expired. Please verify again.';
        updateSubmitButton();
      },
      'error-callback': () => {
        captchaToken = '';
        $('captchaStatus').textContent = 'Verification failed to load. Reload the page or check your blocker settings.';
        updateSubmitButton();
      },
    });
  } catch {
    $('captchaStatus').textContent = 'Could not initialize verification. Reload the page.';
  }
};
async function submitOnline() {
  let submissionAccepted=false;
  if (onlineBusy) return;
  if (!winner) { requestWinner(); return; }
  const theme = $('theme').value;
  if (!theme) return tell('entryStatus', 'Select a map.', true);
  if (![...lineup.BLUE, ...lineup.RED].every(Boolean))
    return tell('entryStatus', 'Fill all six slots.', true);
  if (!validTeams(lineup))
    return tell('entryStatus', 'A hero cannot appear twice across the two teams.', true);
  if ([...lineup.BLUE, ...lineup.RED].some(id => !config.heroes.some(h => h.id === id && h.is_allowed)))
    return tell('entryStatus', 'A selected hero is not in the allowed pool.', true);

  if (!captchaToken) return tell('entryStatus', 'Complete the anti-spam verification first.', true);
  if (!globalThis.crypto?.randomUUID)
    return tell('entryStatus', 'Online submission requires a modern browser over HTTPS.', true);

  const args = {
    p_theme_id: theme,
    p_blue_ids: [...lineup.BLUE],
    p_red_ids: [...lineup.RED],
    p_winner: winner,
    p_blue_draft_known: known.BLUE,
    p_red_draft_known: known.RED,
    p_blue_phantimal: known.BLUE ? null : selectedPhantimal('BLUE'),
    p_red_phantimal: known.RED ? null : selectedPhantimal('RED'),
    p_notes: $('notes').value.trim(),
  };
  const fingerprint = JSON.stringify(args);
  if (!pendingSubmission || pendingSubmission.fingerprint !== fingerprint) {
    pendingSubmission = { fingerprint, id: crypto.randomUUID() };
  }
  const payload = {
    ...args,
    p_submission_id: pendingSubmission.id,
    turnstileToken: captchaToken,
  };
  onlineBusy = true;
  const controls = [...$('page-entry').querySelectorAll('button, input, select')]
    .map(element => ({ element, disabled: element.disabled }));
  for (const { element } of controls) element.disabled = true;
  updateSubmitButton();
  tell('entryStatus', 'Verifying and submitting the match…');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(PROJECT_URL + '/functions/v1/submit-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: PUBLISHABLE_KEY },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    let result;
    try { result = JSON.parse(text); }
    catch { throw Error('Unexpected server response (' + response.status + ').'); }
    if (!response.ok || result?.success !== true) {
      throw Error(result?.error || result?.message || 'Submission failed (' + response.status + ').');
    }
    if (result.data && typeof result.data === 'object' && result.data.success === false) {
      throw Error(result.data.error || result.data.message || 'The database did not accept this match.');
    }
    pendingSubmission = null;
    submissionAccepted=true;
    resetDraft();
    tell('entryStatus', 'Match submitted successfully. Cached statistics may not include it yet; check the calculation time. Thank you for contributing.');

  } catch (error) {
    const message = error.name === 'AbortError'
      ? 'Request timed out; the server may have received it. Verify again and retry without changing the match to reuse its submission ID.'
      : error.message;
    tell('entryStatus', 'Online submission: ' + message + ' Your form has not been cleared.', true);
  } finally {
    clearTimeout(timer);
    onlineBusy = false;
    for (const { element, disabled } of controls) element.disabled = disabled;
    resetCaptcha();
    renderSlots();
    renderHeroes();
    window.dispatchEvent(new CustomEvent('tracker:submission-finished',{detail:{saved:submissionAccepted}}));
  }
}
$('submitOnline').onclick = submitOnline;
const captchaScript = document.createElement('script');
captchaScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=initTurnstile&render=explicit';
captchaScript.async = true;
captchaScript.defer = true;
captchaScript.onerror = () => {
  $('captchaStatus').textContent = 'Verification could not load. Check your connection or content blocker, then reload.';
};
document.head.append(captchaScript);


// Register presentation controls before the legacy startup routines.
const HELP_SEEN_KEY='afk-smackdown-help-seen-v1';
function markHelpSeen(){try{localStorage.setItem(HELP_SEEN_KEY,'1')}catch{}}
function closeInstructions(){markHelpSeen();$('helpDialog').close();}
$('openHelp').onclick=()=>{if(!$('helpDialog').open)$('helpDialog').showModal();};
$('closeHelp').onclick=closeInstructions;$('startUsing').onclick=closeInstructions;
$('helpDialog').addEventListener('cancel',markHelpSeen);
setTimeout(()=>{let seen=false;try{seen=localStorage.getItem(HELP_SEEN_KEY)==='1'}catch{}if(!seen&&!$('helpDialog').open)$('helpDialog').showModal();},150);
function drawMapChoices(){
 $('mapChoices').replaceChildren();
 for(const map of config.themes){
  const button=document.createElement('button');button.type='button';button.className='map-choice';button.setAttribute('aria-pressed',String(map.id===$('theme').value));
  const image=document.createElement('img');image.src=MAPS[map.id]||'';image.alt=map.name+' arena layout';
  const name=document.createElement('span');name.textContent=map.name;button.append(image,name);
  if(map.id===$('theme').value){const label=document.createElement('small');label.textContent='Selected';button.append(label);}
  button.onclick=()=>{if(onlineBusy)return;$('theme').value=map.id;$('theme').dispatchEvent(new Event('change'));$('mapPicker').close();$('chooseMap').focus();updateSubmitButton();};
  $('mapChoices').append(button);
 }
}
$('chooseMap').onclick=()=>{if(onlineBusy)return;drawMapChoices();$('mapPicker').showModal();};
$('closeMapPicker').onclick=()=>$('mapPicker').close();
$('mapPicker').onclick=e=>{if(e.target===$('mapPicker'))$('mapPicker').close();};
updateSubmitButton=function(){
 const ready=Boolean(captchaToken&&winner&&$('theme').value&&[...lineup.BLUE,...lineup.RED].every(Boolean)&&validTeams(lineup));
 $('submitOnline').disabled=onlineBusy;$('submitOnline').classList.toggle('ready-to-submit',ready&&!onlineBusy);
 $('submitOnline').textContent=onlineBusy?'Submitting…':'Submit match';
};
const originalRenderSlots=renderSlots;
renderSlots=function(){originalRenderSlots();renderHeroes();for(const side of ['BLUE','RED']){$('win'+side).setAttribute('aria-pressed',String(winner===side));$('winnerSelected'+side).hidden=winner!==side;}if(winner){$('winnerPicker').classList.remove('missing-winner');$('winnerWarning').hidden=true;}updateSubmitButton();};
function requestWinner(){$('winnerPicker').classList.add('missing-winner');$('winnerWarning').hidden=false;$('winnerPicker').scrollIntoView({behavior:'smooth',block:'center'});$('winBLUE').focus({preventScroll:true});tell('entryStatus','Select the winning team: BLUE or RED.',true);}
document.addEventListener('dragover',e=>{if(dragData&&!(e.target instanceof Element&&e.target.closest('.slot'))){e.preventDefault();e.dataTransfer.dropEffect='none';}},true);
document.addEventListener('drop',e=>{if(!dragData||e.target instanceof Element&&e.target.closest('.slot'))return;e.preventDefault();e.stopPropagation();finishDrag();},true);
$('search').addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation();if(e.dataTransfer)e.dataTransfer.dropEffect='none';});
$('search').addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();if(dragData)finishDrag();});

// START_UI
for(const tab of document.querySelectorAll('[data-page]'))tab.onclick=()=>{for(const b of document.querySelectorAll('[data-page]'))b.classList.toggle('active',b===tab);for(const page of ['entry','tiers','tiers-side','statistics','model-comparison']){const panel=$('page-'+page);if(panel)panel.classList.toggle('hidden',page!==tab.dataset.page);}if(tab.dataset.page==='statistics')loadStats();if(tab.dataset.page==='tiers')loadTiers()};
for(const side of ['BLUE','RED']){$('win'+side).onclick=()=>{winner=side;renderSlots()};$('known'+side).onchange=e=>{known[side]=e.target.checked;renderSlots()}}
$('theme').onchange=renderMap;
$('search').oninput=renderHeroes;

$('reset').onclick=()=>{if(onlineBusy)return;if((winner||[...lineup.BLUE,...lineup.RED].some(Boolean))&&!confirm('Clear both teams and the selected winner?'))return;resetDraft();tell('entryStatus','Teams cleared. Map and draft-order settings are unchanged.')};
$('clearSlot').onclick=()=>{lineup[active.side][active.index]=null;renderSlots()};
$('mapOpen').onclick=()=>{const id=$('theme').value;$('largeMap').src=MAPS[id];$('largeMap').alt=themeName(id)+' arena preview';$('mapTitle').textContent=themeName(id);$('mapDialog').showModal()};
$('mapClose').onclick=()=>$('mapDialog').close();
$('mapDialog').onclick=e=>{if(e.target===$('mapDialog'))$('mapDialog').close()};
$('refreshStats').onclick=loadStats;
$('statsTheme').onchange=loadStats;
$('excludeMirrors').onchange=loadStats;
for(const id of ['minimum','sort','statsCategory'])$(id).onchange=renderStats;
document.addEventListener('dragend',finishDrag);

renderThemes();renderFilters();renderSlots();renderHeroes();


window.trackerConfigReady=loadConfig();
setInterval(()=>{if(!$('page-statistics').classList.contains('hidden')&&document.visibilityState==='visible')loadStats()},300000);

// Tier list uses the existing read-only statistics RPC.
let tierRequest=0,tierData=null;
window.getTierDataForPicker=()=>tierData;
window.getHeroCatalogForPicker=()=>config.heroes;
function tierBucket(rate,count){return count<10?'N':rate>85?'S':rate>=70?'A':rate>=50?'B':'C';}
function renderTierMaps(){const selected=$('tierMap').value;$('tierMap').replaceChildren();$('tierMap').add(new Option('Overall — all maps in this event',''));for(const map of config.themes)$('tierMap').add(new Option(map.name,map.id));$('tierMap').value=config.themes.some(t=>t.id===selected)?selected:'';}
function renderTierPreview(){const id=$('tierMap').value;$('tierMapPreview').hidden=!id;if(id){$('tierMapImage').src=MAPS[id]||'';$('tierMapImage').alt=themeName(id)+' arena layout';$('tierMapName').textContent=themeName(id);}}

function showTierHero(item){
 const {hero,n,wins,rate}=item;$('tierHeroTitle').textContent=hero.name;
 const area=$('tierHeroDetail');area.replaceChildren();const face=portrait(hero);if(!hero.is_allowed)face.style.filter='grayscale(1)';area.append(face);
 for(const text of [n?rate.toFixed(1)+'% win rate · '+wins+'W / '+(n-wins)+'L':'No recorded matches',n+' recorded appearances',n===0?'No data — 0 appearances.':n<10?'Small sample — '+n+'/10 required.':'Tier '+tierBucket(rate,n),hero.is_allowed?'Currently allowed':'Currently banned']){const p=document.createElement('p');p.textContent=text;area.append(p);}
 $('tierHeroDialog').showModal();
}
function renderTiers(){
 const root=$('tierRows');root.replaceChildren();if(!tierData)return;
 const byId=new Map(tierData.heroes.map(row=>[row.hero_id,row]));const buckets={S:[],A:[],B:[],C:[],N:[]};
 for(const hero of config.heroes){const row=byId.get(hero.id);const n=Math.max(0,Number(row?.appearances)||0),wins=Math.max(0,Number(row?.wins)||0);const rate=n?Math.min(100,100*wins/n):0;buckets[tierBucket(rate,n)].push({hero,n,wins,rate});}
 const ranked=['S','A','B','C'].reduce((sum,k)=>sum+buckets[k].length,0);
 if(!ranked){const p=document.createElement('p');p.className='tier-wait';p.textContent='No ranked heroes yet — more match results are needed.';root.append(p);}
 function fill(content,key){
  buckets[key].sort((a,b)=>key==='N'?b.n-a.n||a.hero.name.localeCompare(b.hero.name):b.rate-a.rate||b.n-a.n||a.hero.name.localeCompare(b.hero.name));
  for(const item of buckets[key]){
   const {hero,n,rate}=item;const card=document.createElement('button');card.type='button';card.className='tier-hero'+(!hero.is_allowed?' banned':'');
   const description=hero.name+' — '+(n?rate.toFixed(1)+'% · '+n+' appearances':'No data')+(!hero.is_allowed?' · Currently banned':'');
   card.title=description;card.setAttribute('aria-label',description);card.append(portrait(hero));
   const value=document.createElement('span');value.className='tier-rate';value.textContent=key==='N'?n+'/10':rate.toFixed(1)+'%';card.append(value);
   card.onclick=()=>showTierHero(item);content.append(card);
  }
 }
 for(const key of ['S','A','B','C']){
  const row=document.createElement('section');row.className='tier-row tier-'+key+(!buckets[key].length?' is-empty':'');
  const label=document.createElement('div');label.className='tier-label';label.textContent=key;
  const content=document.createElement('div');content.className='tier-content';fill(content,key);
  if(!buckets[key].length){const empty=document.createElement('span');empty.className='tier-empty';empty.textContent='—';content.append(empty);}
  row.append(label,content);root.append(row);
 }
 const more=document.createElement('details');more.className='tier-no-data';
 const summary=document.createElement('summary');summary.textContent='Below ranking threshold · '+buckets.N.length+' heroes · fewer than 10 appearances';
 const content=document.createElement('div');content.className='tier-content';more.append(summary,content);
 let populated=false;more.addEventListener('toggle',()=>{if(more.open&&!populated){fill(content,'N');populated=true;}});root.append(more);
}
async function loadTiers(force=false){if(window.TrackerSnapshot1323?.active&&!force)return;
 const request=++tierRequest;renderTierPreview();tierData=null;renderTiers();tell('tierStatus','Loading tier list…');
 try{
  const data=await rpc('ss_get_stats',{p_theme_id:$('tierMap').value||null,p_exclude_mirrors:false});
  if(request!==tierRequest)return;if(!data?.summary||!Array.isArray(data.heroes))throw Error('Invalid statistics response.');
  tierData=data;renderTiers();tell('tierStatus',(data.summary.approved_matches||0)+' approved matches in this view · '+(data.generated_at?'Calculated '+new Date(data.generated_at).toLocaleString():'Statistics loaded')+'.');
 }catch(error){if(request!==tierRequest)return;tierData=null;renderTiers();tell('tierStatus','Unable to load tier list: '+error.message,true);}
}
window.addEventListener('tracker:catalog-changed',()=>{renderTierMaps();if(!$('page-tiers').classList.contains('hidden')){renderTierPreview();renderTiers();}});
$('tierMap').onchange=loadTiers;$('refreshTiers').onclick=loadTiers;renderTierMaps();
setInterval(()=>{if(!$('page-tiers').classList.contains('hidden')&&document.visibilityState==='visible')loadTiers();},300000);

$('closeTierHero').onclick=()=>$('tierHeroDialog').close();
