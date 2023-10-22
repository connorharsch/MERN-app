var tele = document.querySelector('#telle');

tele.addEventListener("keyup", (e) => {
  if (e.target.value != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
  tele.value += '-';
  }
});