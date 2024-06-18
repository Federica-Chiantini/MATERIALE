// #### input barra di ricerca header ### //
let input = document.querySelector("#centralHead div:nth-child(3) input");

input.addEventListener("focusin", function () { //cambio font per togliere quello con le icone quando la barra é in focus
  input.setAttribute("placeholder", "Cerca")
  input.style.fontFamily = "Arial, Helvetica, sans-serif"
})

input.addEventListener("focusout", function () { //cambio font quando tolgo il focus
  let check = input.value; //salvo valore input dentro una variabile
  console.log(check)
  if (!check) { //se non ha valore reinserisco l'icona
    input.setAttribute("placeholder", "s  Cerca")
    input.style.fontFamily = "icone";
  }
  else { //se ha un valore lascio lo stesso font
    input.style.fontFamily = "Arial, Helvetica, sans-serif"
  }
})
// ###         fine                #### //

// ## SLIDER SCARPE ##//
//variabili dei 3 slider
const sliderScarpe = document.getElementById("scarpaMain");
const sliderSport = document.getElementById("sportMain");
const sliderMember = document.getElementById("memberMain");

function bottoneSlider(par) {// funzione assegnata onlick su index.html sui bottoni
  switch (par) { //par assume un valore diverso gia' assegnato come parametro nell'html
    case "scarpeUno":
      sliderScarpe.scrollLeft += -400;
      break;
    case "scarpeDue":
      sliderScarpe.scrollLeft += 400;
      break;
    case "sportUno":
      sliderSport.scrollLeft += -400;
      break;
    case "sportDue":
      sliderSport.scrollLeft += 400;
      break;
    case "memberUno":
      sliderMember.scrollLeft += -400;
      break;
    case "memberDue":
      sliderMember.scrollLeft += 400;
      break;
  }
}
// ###         fine                #### //