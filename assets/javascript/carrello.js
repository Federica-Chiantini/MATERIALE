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

// #### aggiungo options per selezionare taglia diversa ### //
let listaTaglie = document.getElementById("taglie");
let listaTaglie2 = document.getElementById("taglie2");

for (let i = 33; i < 45; i++) { //scarpa donna
  listaTaglie.innerHTML += `<option value="EU${i}">Taglia - EU${i}</option>`
};

for (let i = 38; i < 50; i++) { //scarpa uomo
  listaTaglie2.innerHTML += `<option value="EU${i}">Taglia - EU${i}</option>`
};
// ###         fine             #### //

// #### codice promozionale ### //
function promozioneInput() {
  let promozione = document.getElementById("promozione");
  let controllo = promozione.classList.contains("rimuovi"); 

  //verifica se contenga o meno la classe rimuovi 
  controllo ? document.getElementById("promozione").classList.remove("rimuovi") : document.getElementById("promozione").classList.add("rimuovi")
};
// ###         fine                #### //

// #### riepilogo prezzi ### //
let subtotale = document.getElementById("subtot"); //prezzo subt a #colonna1
let totale = document.getElementById("tot"); //prezzo tot a #colonna2
let cartellinoDonna = document.getElementById("prezzoDonna"); //tot prezzo del div #Uno (scarpa donna)
let cartellinoUomo = document.getElementById("prezzoUomo"); //tot prezzo del div #Due (scarpa uomo)

window.onload = () => {
  totaleSchermo(parseFloat(cartellinoDonna.innerHTML), parseFloat(cartellinoUomo.innerHTML)) 
};

//  ######## funzione che fa il conteggio finale con i due valori delle scarpe sempre aggiornati #######    //
function totaleSchermo(prezzoUno, prezzoDue) {//donna, uomo
  let prezzoEsposto = prezzoUno + prezzoDue;
  subtotale.innerText = `€${prezzoEsposto.toFixed(2)}`;
  //mostro solo 2 cifre decimali
  totale.innerText = `€${prezzoEsposto.toFixed(2)}`;
}
// ###         fine             #### //

//      ######## icona cestino elimina scarpa #######          //
let bins = document.querySelectorAll(".bin"); //icone con classe bin
for (const bin of bins) {
  let scarpaTot; 
  let scarpaEliminata;
  bin.addEventListener("click",
    function bin() {
      if (this.classList.contains("seconda")) { //classe inserita per riconoscere su quale bin stiamo premendo
        //SCARPA UOMO
        document.getElementById("Due").style.display = "none";
        scarpaEliminata = cartellinoUomo.innerHTML = 0;
        scarpaTot = parseFloat(cartellinoDonna.innerHTML);
      } else {
        //SCARPA DONNA
        document.getElementById("Uno").style.display = "none";
        scarpaEliminata = cartellinoDonna.innerHTML = 0;
        scarpaTot = parseFloat(cartellinoUomo.innerHTML);
      }

      totaleSchermo(scarpaTot, scarpaEliminata)
      return scarpaEliminata
    })
};
// ###         fine             #### //

/*    #####  seleziona quantita' di una scarpa e conteggio prezzo  ######    */
let totUomo = 1; //quantita' scarpa uomo default
let totDonna = 1; //quantita' scarpa donna default

function opzioneSelezionata(select) {
  let tDonna = 1; //valore scarpa donna
  let tUomo = 1;  //valore scarpa uomo

  select.name == "taglieDonna" ? totDonna = parseFloat(select.value) : totUomo = parseFloat(select.value)
  //assegno valore a totUomo o totDonna in base al name della select che stiamo cambiando il valore

  tDonna = totDonna * 89.99; //prende valore quantita scelta * prezzo di base
  tUomo = totUomo * 99.99;

  //condizione se una delle due scarpe viene eliminata
  if (cartellinoDonna.innerHTML == 0) { //DONNA ELIMINATA
    tDonna = 0; //valore di 0
    cartellinoDonna.innerHTML = tDonna; //0
    cartellinoUomo.innerHTML = tUomo.toFixed(2);
  } else if (cartellinoUomo.innerHTML == 0) { //UOMO ELIMINATO
    tUomo = 0;
    cartellinoUomo.innerHTML = tUomo;
    cartellinoDonna.innerHTML = tDonna.toFixed(2);
  } else { //NESSUNA DELLE DUE VIENE ELIMINATA
    cartellinoDonna.innerHTML = tDonna.toFixed(2);
    cartellinoUomo.innerHTML = tUomo.toFixed(2);
  }

  totaleSchermo(tDonna, tUomo)
};
// ###         fine             #### //
