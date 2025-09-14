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
const btnEnvoyer = document.getElementById("envoyerDon");
// CHAMPS
const NomEtreCher = document.getElementById('nomEtreCher');
const nomPersNotifier = document.getElementById("nomPers");
const emailPersNotifier = document.getElementById("emailPers");
const nomEntreprise = document.getElementById("nomEntreprise");
// VARIABLE BTN RADIOS
let btnRadioDonUnique = document.getElementById("donUnique");
let btnRadioDonMensuel = document.getElementById("donMensuel");
let btnRadioConsacrerOUI = document.getElementById("ouiEtreCher");
let btnRadioConsacrerNON = document.getElementById("nonEtreCher");
let btnRadioOuiNotifier = document.getElementById("ouiNotifier");
let btnRadioNonNotifier = document.getElementById("nonNotifier");
let btnRadioAutreUnique = document.getElementById('autreMontantUnique');
let btnRadioEntreprise = document.getElementById("entreprise");
let btnRadioPerso = document.getElementById("personnel");
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
btnRadioEntreprise?.addEventListener("click", validerBtnRadio);
btnRadioPerso?.addEventListener("click", validerBtnRadio);
btnEnvoyer?.addEventListener("click", validerEnvoieDon);
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
    validerEtape(numEtape);
    if (validerEtape(numEtape) == false) {
    }
    else {
        numEtape++;
        afficherEtape(numEtape);
        if (numEtape == 0) {
            btnSuivant?.classList.remove("cacher");
        }
        ;
        if (numEtape == 1) {
            btnPrecedent?.classList.remove("cacher");
            validerBtnRadio();
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
}
function validerChamp(champ) {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement = document.getElementById(idMessageErreur);
    // console.log('valider champ', champ.validity);
    if (champ.validity.valueMissing && messagesJson[id].vide) {
        // console.log('erreur', id);
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
    else {
        valide = true;
        erreurElement.innerText = "";
    }
    return valide;
}
function validerEmail(champ) {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement = document.getElementById(idMessageErreur);
    const leEmail = champ.value;
    const tldSuspicieux = [
        ".ru",
        ".cn",
        ".click",
        ".party",
    ];
    const erreursCommune = {
        'hotnail': 'hotmail',
        'gnail': 'gmail'
    };
    if (champ.validity.valueMissing && messagesJson[id].vide) {
        // console.log('erreur', id);
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
    else if (tldSuspicieux.some((tld => {
        const contientSuspect = leEmail.toLowerCase().endsWith(tld);
        return contientSuspect;
    }))) {
        valide = false;
    }
    else {
        const valeursCles = Object.keys(erreursCommune);
        const erreurCle = valeursCles.find((domaine) => {
            return leEmail.toLowerCase().includes(domaine);
        });
        console.log(erreurCle);
        if (erreurCle) {
            const domaineCorrect = erreursCommune[erreurCle];
            const monMessage = messagesJson[id].erreursCommune.replace("{domaine}", domaineCorrect);
            valide = false;
            erreurElement.innerText = monMessage;
        }
        else {
            erreurElement.innerText = "";
            valide = true;
        }
    }
    return valide;
}
function validerEtape(etape) {
    let etapeValide = false;
    switch (etape) {
        case 0:
            const NomEtreCherValide = validerChamp(NomEtreCher);
            const nomPersNotifierValide = validerChamp(nomPersNotifier);
            const emailPersNotifierValide = validerEmail(emailPersNotifier);
            if (NomEtreCherValide == false || !nomPersNotifierValide || !emailPersNotifierValide) {
                etapeValide = false;
            }
            else {
                etapeValide = true;
                // const refLienEtape = document.getElementById("liste-Item_Lien0");
                // refLienEtape?.setAttribute("href","#etape1")  
            }
            break;
        case 1:
            const nomElement = document.getElementById('nom');
            const prenomElement = document.getElementById('prenom');
            const emailElement = document.getElementById('email');
            const adresseElement = document.getElementById('adresse');
            const codePostal = document.getElementById('codePostal');
            const ville = document.getElementById('ville');
            const province = document.getElementById('province');
            const nomValide = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerEmail(emailElement);
            const adresseValide = validerChamp(adresseElement);
            const codePostalValide = validerChamp(codePostal);
            const villeValide = validerChamp(ville);
            const provinceValide = validerChamp(province);
            if (!nomValide || !prenomValide || !emailValide || !adresseValide || !codePostalValide || !villeValide || !provinceValide) {
                etapeValide = false;
            }
            else {
                etapeValide = true;
            }
            break;
        case 2:
            const numCarte = document.getElementById('numCarte');
            const cvc = document.getElementById("cvc");
            const expirationCarte = document.getElementById("expirationCarte");
            const numCarteValide = validerChamp(numCarte);
            const cvcValide = validerChamp(cvc);
            const expirationCarteValide = validerChamp(expirationCarte);
            if (!numCarteValide || !cvcValide || !expirationCarteValide) {
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
        NomEtreCher.disabled = false;
    }
    if (btnRadioNonNotifier.checked) {
        infoPersonneNotifier?.classList.add("cacher");
    }
    if (btnRadioOuiNotifier.checked) {
        infoPersonneNotifier?.classList.remove("cacher");
        nomPersNotifier.disabled = false;
        emailPersNotifier.disabled = false;
    }
    if (btnRadioPerso.checked) {
        nomEntreprise?.classList.add("cacher");
    }
    if (btnRadioEntreprise.checked) {
        nomEntreprise?.classList.remove("cacher");
        nomEntreprise.disabled = false;
    }
    if (btnRadioAutreUnique.checked) {
        inputAutreUnique?.classList.remove("cacher");
    }
    else if (!btnRadioAutreUnique.checked) {
        inputAutreUnique?.classList.add("cacher");
    }
}
function validerEnvoieDon(event) {
    if (!validerEtape(numEtape)) {
        event.preventDefault();
    }
}
