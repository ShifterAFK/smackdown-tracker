(function(){
 const picker=document.getElementById('winnerPicker');
 const heading=picker?Array.from(picker.children).find(element=>element.tagName==='SPAN'):null;
 if(heading)heading.textContent='ACTUAL MATCH WINNER';
})();
