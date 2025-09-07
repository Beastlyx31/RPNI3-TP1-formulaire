"use strict";
// faire un array des sections pour verifier la longueur.
// etapes[0]
// champ a valider .disable = true => comme sa ne valide pas ce champ et si afficher mettre a false pour etre valider
// donc faire sa dans validerBtnRadio et dans valider champs faire => si x champs.disable = false {mettre validation si champ vide ou wrong pattern}
const btnPrecedent = document.getElementById("btnPrecedent");
const btnSuivant = document.getElementById("btnSuivant");
const etape1 = document.getElementById("etape1");
const etape2 = document.getElementById("etape2");
const etape3 = document.getElementById("etape3");
let etapes = document.querySelectorAll("section");
let numEtape = 0;
let messagesJson = null;
let montantDonUnique = document.getElementById("listDonUnique");
let montantDonMensuel = document.getElementById("listDonMensuel");
let consacrerDon = document.getElementById("enHonneur");
let infoPersonneNotifier = document.getElementById("infoPersonneNotifier");
let inputAutreUnique = document.getElementById("autreUnique");
// VARIABLE BTN RADIOS
let btnRadioDonUnique = document.getElementById("donUnique");
let btnRadioDonMensuel = document.getElementById("donMensuel");
let btnRadioConsacrerOUI = document.getElementById("ouiEtreCher");
let btnRadioConsacrerNON = document.getElementById("nonEtreCher");
let btnRadioOuiNotifier = document.getElementById("ouiNotifier");
let btnRadioNonNotifier = document.getElementById("nonNotifier");
let btnRadioAutreUnique = document.getElementById('autreMontantUnique');
// EVENTLISTENER
window.addEventListener("load", initialiser);
btnSuivant?.addEventListener("click", naviguerSuivant);
btnPrecedent?.addEventListener("click", naviguerPrecedent);
btnRadioDonUnique?.addEventListener("click", validerBtnRadio);
btnRadioDonMensuel?.addEventListener("click", validerBtnRadio);
btnRadioConsacrerNON?.addEventListener("click", validerBtnRadio);
btnRadioConsacrerOUI?.addEventListener("click", validerBtnRadio);
btnRadioOuiNotifier?.addEventListener("click", validerBtnRadio);
btnRadioNonNotifier?.addEventListener("click", validerBtnRadio);
btnRadioAutreUnique?.addEventListener("click", validerBtnRadio);
function initialiser() {
    etape2?.classList.add("cacher");
    etape3?.classList.add("cacher");
    btnPrecedent?.classList.add("cacher");
    btnSuivant?.classList.remove("cacher");
    montantDonMensuel?.classList.add("cacher");
    consacrerDon?.classList.add("cacher");
    infoPersonneNotifier?.classList.add("cacher");
    inputAutreUnique?.classList.add("cacher");
    obtenirMessage();
}
function naviguerSuivant() {
    console.log(numEtape);
    afficherEtape(numEtape);
    if (validerEtape(numEtape) != true) {
    }
    else {
        numEtape++;
        if (numEtape == 0) {
            btnSuivant?.classList.remove("cacher");
        }
        ;
        if (numEtape == 1) {
            btnPrecedent?.classList.remove("cacher");
        }
        ;
        if (numEtape == 2) {
            btnSuivant?.classList.add("cacher");
        }
        ;
    }
    // validerEtape(numEtape);
}
function naviguerPrecedent() {
    numEtape--;
    console.log(numEtape);
    afficherEtape(numEtape);
    if (numEtape == 1) {
        btnPrecedent?.classList.remove("cacher");
        btnSuivant?.classList.remove("cacher");
    }
    if (numEtape == 2) {
        btnSuivant?.classList.add("cacher");
    }
    if (numEtape == 0) {
        btnPrecedent?.classList.add("cacher");
        btnSuivant?.classList.remove("cacher");
    }
}
function afficherEtape(numEtape) {
    etapes.forEach((etape, index) => {
        if (index == numEtape) {
            etape.classList.remove("cacher");
        }
        else {
            etape.classList.add("cacher");
        }
    });
}
;
async function obtenirMessage() {
    const reponse = await fetch('objJSONMessages.json');
    //  au lieu de :
    //     const reponse = fetch('objJSONMessages.json')
    //     reponse.then(()=>{
    //     })
    messagesJson = await reponse.json();
    //  reponse.then(()=>)
    console.log(messagesJson);
}
function validerChamp(champ) {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement = document.getElementById(idMessageErreur);
    console.log('valider champ', champ.validity);
    if (champ.validity.valueMissing && messagesJson[id].vide) {
        console.log('erreur', id);
        valide = false;
        erreurElement.innerText = messagesJson[id].vide;
    }
    else if (champ.validity.typeMismatch && messagesJson[id].type) {
        valide = false;
        erreurElement.innerText = messagesJson[id].type;
    }
    else if (champ.validity.patternMismatch && messagesJson[id].pattern) {
        valide = false;
        erreurElement.innerText = messagesJson[id].pattern;
    }
    return valide;
}
function validerEtape(etape) {
    let etapeValide = false;
    switch (etape) {
        case 0:
            const NomEtreCher = document.getElementById('nomEtreCher');
            const NomEtreCherValide = validerChamp(NomEtreCher);
            if (!NomEtreCher) {
                etapeValide = false;
            }
            else {
                etapeValide = true;
            }
            break;
        case 1:
            const nomElement = document.getElementById('nom');
            const prenomElement = document.getElementById('prenom');
            const emailElement = document.getElementById('email');
            const adresseElement = document.getElementById('adresse');
            const nomValide = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const adresseValide = validerChamp(adresseElement);
            if (!nomValide || !prenomValide || !emailValide || !adresseValide) {
                etapeValide = false;
            }
            else {
                etapeValide = true;
            }
            break;
    }
    return etapeValide;
}
function validerBtnRadio() {
    console.log("testValiderBTn");
    if (btnRadioDonMensuel.checked) {
        montantDonMensuel?.classList.remove("cacher");
        montantDonUnique?.classList.add("cacher");
    }
    if (btnRadioDonUnique.checked) {
        montantDonMensuel?.classList.add("cacher");
        montantDonUnique?.classList.remove("cacher");
    }
    if (btnRadioConsacrerNON.checked) {
        consacrerDon?.classList.add("cacher");
    }
    if (btnRadioConsacrerOUI.checked) {
        consacrerDon?.classList.remove("cacher");
    }
    if (btnRadioNonNotifier.checked) {
        infoPersonneNotifier?.classList.add("cacher");
    }
    if (btnRadioOuiNotifier.checked) {
        infoPersonneNotifier?.classList.remove("cacher");
    }
    if (btnRadioAutreUnique.checked) {
        console.log("test Autre montant");
        inputAutreUnique?.classList.remove("cacher");
    }
    else if (!btnRadioAutreUnique.checked) {
        inputAutreUnique?.classList.add("cacher");
    }
}
