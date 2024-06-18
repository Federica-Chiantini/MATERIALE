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

//   #### selezionare taglia della scarpa e click tasto compra ###    //
let listaTaglie = document.querySelector(".taglie"); //ul taglie
let listaDonna = document.getElementById("taglieDonna"); // ul scarpa donna
let listaUomo = document.getElementById("taglieUomo"); // ul scarpa uomo

//creo i 10 li delle taglie con le misure dentro
if (listaDonna) { //se siamo pag scarpa donna
    for (let i = 33; i < 45; i++) {
        listaDonna.innerHTML += "<li>" + "EU" + " " + i + "</li>"
    };
} else { //se siamo pag scarpa uomo
    for (let i = 38; i < 50; i++) {
        listaUomo.innerHTML += "<li>" + "EU" + " " + i + "</li>"
    };
}

let liTaglie = document.querySelectorAll(".taglie li"); //nodelist degli li
const compra = document.querySelector("#compra"); //tasto compra
let tagliaSelezionata; 

for (let i = 0; i < liTaglie.length; i++) {
    liTaglie[i].onclick = function () {
        let controllo = document.querySelector(".tagliaSele"); //classe assegnata quando viene selezionata una taglia
        if (!controllo) { //NESSUN ELEMENTO CON TAGLIASELE
            this.classList.add("tagliaSele") 
            tagliaSelezionata = this; 
        } else { //ESISTE UN LI GIA' SELEZIONATO
            controllo.classList.remove("tagliaSele"); 
            this.classList.add("tagliaSele"); 
            tagliaSelezionata = this; 
        }
    }
};

let numScarpa = document.getElementById("numScarpa"); //span della taglia dentro carrello

compra.addEventListener("click", function () {
    if (tagliaSelezionata != undefined) { //TAGLIA SELEZIONATA HA UN VALORE
        tagliaSelezionata.style.borderColor = "#aaa"; 
        tagliaSelezionata.style.color = "rgb(22, 22, 22)";
        numScarpa.innerText = tagliaSelezionata.innerText; 

        //sotto rimuovo messaggio di errore
        document.querySelector("#taglieDiv span").innerHTML = " "
        document.querySelector("#taglieDiv span").classList.remove("errore");

        //compare schermo nero e carrello
        document.getElementById("sfondoNero").style.display = "block"
        document.getElementById("carrello").style.display = "block"

    }
    else { //TAGLIA SELEZIONATA = UNDEFINED
        //inserisco messaggio di errore
        document.querySelector("#taglieDiv span").innerHTML = "Devi selezionare una taglia"
        document.querySelector("#taglieDiv span").classList.add("errore")
    }
    tagliaSelezionata = ""; 
});
// ###         fine                #### //

// #### mouseover su icona carrello su header ### //
document.getElementById("borsetta").onmouseover = overInBorsetta;
document.getElementById("borsetta").onmouseleave = overOffBorsetta;

function overInBorsetta() { //funzione apparre carrello e sfondo nero
    document.getElementById("sfondoNero").style.display = "block"
    document.getElementById("carrello").style.display = "block"
}

function overOffBorsetta() { //funzione scompare carrello e sfondo nero
    document.getElementById("sfondoNero").style.display = "none"
    document.getElementById("carrello").style.display = "none"
}
// ###         fine                #### //

// #### mouseover su immagini laterali ### //
const lato = document.querySelectorAll("#topMain div"); //nodelist del contenitore dei div laterali (img e 1 video)
const immaginiLaterali = document.querySelectorAll("#topMain div img"); //nodelist delle img dentro i div
let immagine = document.querySelector("#centralMain div img"); //immagine grande al centro (di default display block)
const frame = document.querySelector("#frameVideo"); //iframe video grande al centro (di default display none)
const video = document.getElementById("videoS"); //ultimo div di const lato con video

//ciclo per far avvenire azioni diverse al passaggio del mouse sopra uno dei div di const lato
for (let i = 0; i < lato.length; i++) {
    lato[i].onmouseover = function () {
        if (!lato[i].classList.contains("scarpe")) { //SE NON CONTIENE LA CLASSE SCARPE(comune solo ai div con le img)
            video.onmouseover = function () { 
                immagine.style.display = "none";
                frame.style.display = "block"; 
            }
        } else { //SE CONTIENE CLASSE SCARPE
            for (let i = 0; i < immaginiLaterali.length; i++) { //ciclo per far passare icona mouse sopra una immagine
                immaginiLaterali[i].onmouseover = imgGrande; 
                immagine.style.display = "block"; 
                frame.style.display = "none"; 
            }

            function imgGrande() { //funzione per cambiare img grande al centro
                let link = this.getAttribute("src"); 
                immagine.setAttribute("src", link) 
            }
        }
    }
}
// ###         fine                #### //

// ####    Funzioni dei bottoni dentro al popup carrello     ### //
function VaiAPagamento() { //bottone pagamento
    location.href = "pagamentoOspite.html";
};

function VaiACarrello() { //bottone carrello
    location.href = "carrello.html";
};

function esci() { //bottone X (esci)
    document.getElementById("sfondoNero").style.display = "none"
    document.getElementById("carrello").style.display = "none"
};
// ###         fine            #### //