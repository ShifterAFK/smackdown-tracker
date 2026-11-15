(function(){
'use strict';
if(window.TrackerMapCountdown139)return;
const eyebrow=document.querySelector('.map-eyebrow');
if(eyebrow)eyebrow.textContent='CURRENT MODE MAP';
const heading=document.querySelector('.map-heading');
if(!heading)return;
let line=heading.querySelector('.map-next-change');
if(!line){line=document.createElement('p');line.className='caption map-next-change';line.setAttribute('role','status');const name=document.getElementById('mapSelectedName');if(name&&name.parentNode)name.parentNode.insertBefore(line,name.nextSibling);else heading.append(line);}
const start=Date.UTC(2026,10,14,0,0,0);
const cycle=3*24*60*60*1000;
const order=['top-defender','siegebreaker','fierce-duel','tactical-grounds','tranquil-grounds'];
function update(){
 const now=Date.now();
 const elapsed=Math.max(0,Math.floor((now-start)/cycle));
 const index=elapsed%order.length;
 const next=start+(elapsed+1)*cycle;
 const diff=Math.max(0,next-now);
 const days=Math.floor(diff/86400000);
 const hours=Math.floor((diff%86400000)/3600000);
 const minutes=Math.floor((diff%3600000)/60000);
 const parts=[];
 if(days)parts.push(days+(days===1?' day':' days'));
 parts.push(hours+(hours===1?' h':' h'));
 parts.push(minutes+(minutes===1?' min':' min'));
 line.textContent='
