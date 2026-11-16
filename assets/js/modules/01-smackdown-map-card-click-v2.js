// Module: smackdown-map-card-click-v2

(function(){
 const card=document.querySelector('.map-area'),change=document.getElementById('chooseMap');
 if(!card||!change)return;
 card.addEventListener('click',function(event){
  if(event.target instanceof Element&&event.target.closest('button,a,input,select'))return;
  change.click();
 });
})();
