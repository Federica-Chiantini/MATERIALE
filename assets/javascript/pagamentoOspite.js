// #### bottone pagamento da ospite che apre schermo per inserire dati ### //
document.querySelector("button").onclick = function () {
    document.getElementById("inizia").style.display = "none"; 
    document.getElementById("sectForm").style.display = "block" 
}
// ###         fine             #### //

//       ######## controllo del primo Form  ##########    //
document.querySelector("form").addEventListener("click", function (e) {
    e.preventDefault(); 

    const inputs = document.querySelectorAll("form input"); 

    //QUANDO CLICCO SU BOTTONE SALVA E CONTINUA
    //1. controllo di tutti gli input 
    for (const input of inputs) { 
        controllaInputs(input, input.name); 
    };//

    //2. controllo inputs - funzione verifica della regex
    function verificaRegEx(inputCampo, tipoRegex) {
        let regex; 
        let messaggio; //messaggio in caso di fallimento
        switch (tipoRegex) { 
            case "nome": 
                regex = /^[a-zA-Z]+[- ']{0,1}[a-zA-Z]+$/;
                messaggio = "errore";
                break;
            case "cognome":
                regex = /^[a-zA-Z]+[- ']{0,1}[a-zA-Z]+$/;
                messaggio = "errore";
                break;
            case "indirizzo":
                regex = /^(?:via|piazza|viale|corso|strada|lungomare|vicolo|piazzale|borgo|contrada|frazione|viale|rotatoria|quartiere|cascina|località|fraz.)\s[A-zÀ-ÿ0-9\s'’-]{2,}\s[0-9]{1,5}$/;
                messaggio = "errore";
                break;
            case "email":
                regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                messaggio = "errore";
                break;
            case "cap":
                regex = /^[0-9]{5}$/
                messaggio = "errore";
                break;
            case "citta":
                regex = /^[a-zA-Z]+[- ']{0,1}[a-zA-Z]+$/;
                messaggio = "errore";
                break;
            case "tel":
                regex = /^(?:\+39|0039)?\s?3\d{2}\s?\d{6,7}$/;
                messaggio = "errore";
                break;
        }
        if (!regex.test(inputCampo)) { //SE IL TEST TROVA ERRORE
            return messaggio; 
        }
    }//

    //3. controllo inputs post regex
    function controllaInputs(valore, regex) {
        let check = verificaRegEx(valore.value, regex); //controllo regex
        if (valore.value.trim() == 0 || check == "errore") { //SE NON SCRIVO NULLA O TROVA ERRORE NELLA REGEX
            document.querySelector("#testoErrore1").style.display = "block"; 
            valore.classList.add("inputErrore"); 
        } else { //NON CI SONO ERRORI
            valore.classList.remove("inputErrore"); 
        }//
    }//

    let errori = document.querySelectorAll(".inputErrore"); 
    if (errori.length == 0) { //SE NESSUN INPUT CONTIENE ERRORI
        document.getElementById("pagamento").classList.replace("chiudi", "apri"); 
        document.getElementById("bottone").style.display = "none"; 
        document.querySelector("#testoErrore1").style.display = "none";
    }//
});
// ###         fine             #### //

//    ########  schermata pagamento  #######    //
//CLICK BOTTONE ACQUISTA ORA
document.getElementById("fine").onclick = function () {

    let radio = document.querySelector('input[name="paga"]:checked') 

    //se nessun radiobutton e' stato selezionato esce errore
    radio != null ? document.querySelector("#testoErrore2").style.display = "none" : document.querySelector("#testoErrore2").style.display = "block";

    //variabili inputs carta di credito/debito
    const inputNumero = document.getElementById("number1");
    const inputData = document.getElementById("number2");
    const inputCVV = document.getElementById("number3");
    let messaggioErrore = document.querySelector("#testoErrore3"); 
    //

    //funzioni di controllo per ogni singolo input
    controlloNumeroCarta(inputNumero);
    controlloDataCarta(inputData);
    controlloCVV(inputCVV);
    //

    //funzione controllo numero carta
    function controlloNumeroCarta(input) {
        let valore = input.value;
        let regex = /^\d{16}$/;
        if (valore.trim() == 0) { //SE NON SCRIVO NULLA 
            messaggioErrore.style.display = "block"; 
            input.classList.add("inputErrore"); //aggiunge input bordo rosso
        } else { //SE HO SCRITTO QUALCOSA
            if (!regex.test(valore)) { //SE compare un errore con regex
                return; //esce fuori dalla funzione
            }
            else { //nessun errore
                input.classList.remove("inputErrore"); //rimuove input bordo rosso
            }
        }
    };//

    //funzione controllo data di scadenza
    function controlloDataCarta(input) {
        let valore = input.value;
        let regex = /^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/;
        if (valore.trim() == 0) {
            messaggioErrore.style.display = "block";
            input.classList.add("inputErrore");
        } else {
            if (!regex.test(valore)) {
                return;
            }
            else {
                input.classList.remove("inputErrore");
            }
        }
    };//

    //funzione di controllo CVV retro carta
    function controlloCVV(input) {
        let valore = input.value;
        let regex = /^\d{3}$/;
        if (valore.trim() == 0) {
            messaggioErrore.style.display = "block";
            input.classList.add("inputErrore");
        } else {
            if (!regex.test(valore)) {
                return;
            }
            else {
                input.classList.remove("inputErrore");
            }
        }
    };//

    let errori = document.querySelectorAll(".inputErrore"); 
    if (errori.length == 0 && radio != null) { //SE non ci sono elementi con class errore e radio ha un valore
        messaggioErrore.style.display = "none";
        setInterval(invioForm, 1000) //dopo 1s si riavvia la pagina
    }//

    function invioForm() { //INVIO FORM E ORDINE INVIATO - dentro setInterval
        document.getElementById("sectForm").style.display = "none";
        document.getElementById("testoFine").style.display = "block"; 
    }//
};
// ###         fine             #### //