"use strict";
// Fait une recherche internet pour trouver comment convertir un nodelist en array
// Trouver l'information sur : https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array 
// et https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/from 
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// 
// ETAPES
const etape1 = document.getElementById("etape1");
const etape2 = document.getElementById("etape2");
const etape3 = document.getElementById("etape3");
const etape4 = document.getElementById("etape4");
const etapes = document.querySelectorAll("section");
let numEtape = 0;
let derniereEtapeValidee = 0;
const etapeNav = document.querySelectorAll("nav>ol>li");
const etapeNavLien = document.querySelectorAll("nav>ol>li>a");
// BOUTONS NAVIGATION
const btnPrecedent = document.getElementById("btnPrecedent");
const btnSuivant = document.getElementById("btnSuivant");
// SVG
const svgEtape1 = document.querySelector('nav>ol>li:first-child svg');
const svgEtape2 = document.querySelector('nav>ol>li:nth-child(2) svg');
const orteil1 = document.getElementById("patte" + numEtape + 1 + "orteil1");
const orteil2 = document.getElementById("patte" + numEtape + 1 + "orteil2");
const orteil3 = document.getElementById("patte" + numEtape + 1 + "orteil3");
const orteil4 = document.getElementById("patte" + numEtape + 1 + "orteil4");
// ARR SVG
const arrSvgPatte = document.querySelectorAll('nav>ol>li>svg.patte');
const arrSvgConfirmer = document.querySelectorAll('nav>ol>li>svg.svgConfirmer');
// MSG ERREURS
let messagesJson = null;
// MONTANT DON
const montantDonUnique = document.getElementById("listDonUnique");
const montantDonMensuel = document.getElementById("listDonMensuel");
let montantSelectionne = false;
// PARTIE CACHER FORMULAIRE
let estCacher = true;
let estCacherFormulaire2 = true;
// CHAMPS
const NomEtreCher = document.getElementById('nomEtreCher');
const nomPersNotifier = document.getElementById("nomPers");
const emailPersNotifier = document.getElementById("emailPers");
const nomEntreprise = document.getElementById("nomEntreprise");
const labelNomEntreprise = document.querySelector('label[for="nomEntreprise"]');
const champMontantDon = document.getElementById("montantDonBtn");
const infoPersonneNotifier = document.getElementById("infoPersonneNotifier");
const inputAutreUnique = document.getElementById("autreUnique");
const inputAutreMensuel = document.getElementById("autreMensuel");
const champsPrenomResumer = document.getElementById("resumePrenom");
const champCarteResumer = document.getElementById("resumerCarteCredit");
const prenomElement = document.getElementById('prenom');
const champMontantDonResumer = document.getElementById("montantDonResumer");
// FORMULAIRE
const formulaire = document.querySelector("form");
const btnEnvoyer = document.getElementById("envoyerDon");
const etiquetteDonUnique = document.querySelectorAll("#listDonUnique > div");
// BTN RADIOS
const btnRadioDonUnique = document.getElementById("donUnique");
const btnRadioDonMensuel = document.getElementById("donMensuel");
const btnRadioConsacrerOUI = document.getElementById("ouiEtreCher");
const btnRadioConsacrerNON = document.getElementById("nonEtreCher");
const btnRadioOuiNotifier = document.getElementById("ouiNotifier");
const btnRadioNonNotifier = document.getElementById("nonNotifier");
const btnRadioAutreUnique = document.getElementById('autreMontantUnique');
const btnRadioAutreMensuel = document.getElementById('autreMontantMensuel');
const btnRadioEntreprise = document.getElementById("entreprise");
const btnRadioPerso = document.getElementById("personnel");
const radiosMontantUnique = document.querySelectorAll('input[type="radio"][name="montantDonUnique"]');
const radiosMontantMensuel = document.querySelectorAll('input[type="radio"][name="montantDonMensuel"]');
const consacrerDon = document.getElementById("enHonneur");
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
btnRadioAutreMensuel?.addEventListener("click", validerBtnRadio);
btnRadioEntreprise?.addEventListener("click", validerBtnRadio);
btnRadioPerso?.addEventListener("click", validerBtnRadio);
btnEnvoyer?.addEventListener("click", validerEnvoieDon);
inputAutreMensuel.addEventListener("change", obtenirAutreMontant);
inputAutreUnique.addEventListener("change", obtenirAutreMontant);
// BOUCLES
// Pour chaque boutons radios ont attributs un eventListener
radiosMontantUnique.forEach(btnradio => {
    btnradio.addEventListener("click", obtenirAutreMontant);
});
radiosMontantMensuel.forEach(btnradio => {
    btnradio.addEventListener("click", obtenirAutreMontant);
});
etapeNavLien.forEach((etape, index) => {
    etape.addEventListener("click", function (e) {
        e.preventDefault();
        if (index <= numEtape) {
            numEtape = index;
            console.log(index + "index");
            console.log(numEtape + "numEtape");
            afficherEtape(index);
        }
    });
});
// FUNCTIONS
// Initialise le formulaire en cachant les parties ulterieur et en affichant uniquement le btn suivant.
function initialiser() {
    etape2?.classList.add("cacher");
    etape3?.classList.add("cacher");
    etape4?.classList.add("cacher");
    btnPrecedent?.classList.add("cacher");
    btnSuivant?.classList.remove("cacher");
    montantDonMensuel?.classList.add("cacher");
    consacrerDon?.classList.add("cacher");
    infoPersonneNotifier?.classList.add("cacher");
    inputAutreUnique?.classList.add("cacher");
    inputAutreMensuel.classList.add("cacher");
    arrSvgPatte[1].classList.add("patte--disabled");
    arrSvgPatte[2].classList.add("patte--disabled");
    arrSvgPatte[3].classList.add("patte--disabled");
    obtenirMessage();
    formulaire.noValidate = true;
}
// Permet la navigation en effectuant la validation de l'étape en cours. 
function naviguerSuivant() {
    if (validerEtape(numEtape) == false) {
        // rien
    }
    else {
        // incrémente le numêro d'etape.
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
        if (numEtape == 3) {
            btnSuivant?.classList.add("cacher");
        }
        ;
    }
}
// Permet la navigation à l'étape précédente et gère l'affiche des boutons selon le numéro d'étape. 
function naviguerPrecedent() {
    numEtape--;
    afficherEtape(numEtape);
    if (numEtape == 0) {
        btnPrecedent?.classList.add("cacher");
        btnSuivant?.classList.remove("cacher");
    }
    if (numEtape == 1) {
        btnPrecedent?.classList.remove("cacher");
        btnSuivant?.classList.remove("cacher");
    }
    if (numEtape == 2) {
        btnSuivant?.classList.remove("cacher");
    }
    if (numEtape == 3) {
        btnSuivant?.classList.add("cacher");
    }
}
// Permet d'afficher uniquement l'étape du formulaire qui correspond au numéro
function afficherEtape(numEtape) {
    etapes.forEach((etape, index) => {
        if (index == numEtape) {
            etape.classList.remove("cacher");
            arrSvgPatte[index].classList.remove("patte--disabled");
        }
        else {
            etape.classList.add("cacher");
        }
    });
}
;
// Permet d'obtenir les messages d'erreurs dans l'objet JSON
async function obtenirMessage() {
    const reponse = await fetch('objJSONMessages.json');
    messagesJson = await reponse.json();
}
// Permet de valider si le champs est compléter et de vérifier si le pattern est respecter, sinon affiche le message d'erreur.
function validerChamp(champ) {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement = document.getElementById(idMessageErreur);
    if (champ.validity.valueMissing && messagesJson[id].vide) {
        valide = false;
        erreurElement.innerText = messagesJson[id].vide;
        champ.classList.add("champErreur");
    }
    else if (champ.validity.typeMismatch && messagesJson[id].type) {
        valide = false;
        erreurElement.innerText = messagesJson[id].type;
        champ.classList.add("champErreur");
    }
    else if (champ.validity.patternMismatch && messagesJson[id].pattern) {
        valide = false;
        erreurElement.innerText = messagesJson[id].pattern;
        champ.classList.add("champErreur");
    }
    else {
        valide = true;
        erreurElement.innerText = "";
        champ.classList.remove("champErreur");
    }
    return valide;
}
// Permet de valider l'email en s'assurant qu'il n'est pas vide, que le pattern correspond et que l'extension soit accepté.
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
        valide = false;
        erreurElement.innerText = messagesJson[id].vide;
        champ.classList.add("champErreur");
    }
    else if (champ.validity.typeMismatch && messagesJson[id].type) {
        valide = false;
        erreurElement.innerText = messagesJson[id].type;
        champ.classList.add("champErreur");
    }
    else if (champ.validity.patternMismatch && messagesJson[id].pattern) {
        valide = false;
        erreurElement.innerText = messagesJson[id].pattern;
        champ.classList.add("champErreur");
    }
    else if (tldSuspicieux.some((tld => {
        const contientSuspect = leEmail.toLowerCase().endsWith(tld);
        if (contientSuspect) {
            valide = false;
            champ.classList.add("champErreur");
            if (messagesJson[id].tldSuspicieux) {
                erreurElement.innerText = messagesJson[id].tldSuspicieux;
            }
        }
        return contientSuspect;
    }))) {
        valide = false;
    }
    else {
        const valeursCles = Object.keys(erreursCommune);
        const erreurCle = valeursCles.find((domaine) => {
            return leEmail.toLowerCase().includes(domaine);
        });
        if (erreurCle) {
            const domaineCorrect = erreursCommune[erreurCle];
            const monMessage = messagesJson[id].erreursCommune.replace("{domaine}", domaineCorrect);
            valide = false;
            erreurElement.innerText = monMessage;
            champ.classList.add("champErreur");
        }
        else {
            erreurElement.innerText = "";
            valide = true;
            champ.classList.remove("champErreur");
        }
    }
    return valide;
}
// Permet de s'assurer que tout les champs sont valide afin de valider l'étape en cours. 
function validerEtape(etape) {
    let etapeValide = false;
    switch (etape) {
        case 0:
            // Vérification du montant sélectionné (unique ou mensuel)
            let montantErreurElement = document.getElementById("err-montant");
            const radioUniqueChecked = Array.from(radiosMontantUnique).some((btn) => btn.checked);
            const radioMensuelChecked = Array.from(radiosMontantMensuel).some((btn) => btn.checked);
            const dernierRadioUnique = radiosMontantUnique[radiosMontantUnique.length - 1];
            const dernierRadioMensuel = radiosMontantMensuel[radiosMontantMensuel.length - 1];
            montantSelectionne = radioUniqueChecked || radioMensuelChecked;
            if (!montantSelectionne) {
                etapeValide = false;
                montantErreurElement.innerText = "Veuillez sélectionner un montant de don.";
                break;
            }
            if (dernierRadioMensuel.checked && inputAutreMensuel.value == "") {
                // Affiche une erreur pour le montant mensuel
                montantErreurElement.innerText = "Veuillez entrez un montant de don.";
                break;
            }
            if (dernierRadioUnique.checked && inputAutreUnique.value == "") {
                // Affiche une erreur pour le montant unique
                montantErreurElement.innerText = "Veuillez entrez un montant de don.";
                break;
            }
            else {
                montantErreurElement.innerText = "";
            }
            if (estCacher === true && estCacherFormulaire2 === true) {
                etapeValide = true;
                arrSvgPatte[numEtape].classList.add("cacher");
                arrSvgConfirmer[numEtape].classList.remove("cacher");
                console.log("tout est good");
            }
            else if (estCacher === false) {
                const NomEtreCherValide = validerChamp(NomEtreCher);
                if (estCacherFormulaire2 === true) {
                    if (!NomEtreCherValide) {
                        etapeValide = false;
                    }
                    else {
                        etapeValide = true;
                        arrSvgPatte[numEtape].classList.add("cacher");
                        arrSvgConfirmer[numEtape].classList.remove("cacher");
                    }
                }
                else if (estCacherFormulaire2 === false) {
                    const nomPersNotifierValide = validerChamp(nomPersNotifier);
                    const emailPersNotifierValide = validerEmail(emailPersNotifier);
                    if (!NomEtreCherValide || !nomPersNotifierValide || !emailPersNotifierValide) {
                        etapeValide = false;
                    }
                    else {
                        etapeValide = true;
                        arrSvgPatte[numEtape].classList.add("cacher");
                        arrSvgConfirmer[numEtape].classList.remove("cacher");
                    }
                }
            }
            break;
        case 1:
            const nomElement = document.getElementById('nom');
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
            const nomEntrepriseValide = validerChamp(nomEntreprise);
            if (nomEntreprise.disabled == true) {
                if (!nomValide || !prenomValide || !emailValide || !adresseValide || !codePostalValide || !villeValide || !provinceValide) {
                    etapeValide = false;
                }
                else {
                    etapeValide = true;
                    arrSvgPatte[numEtape].classList.add("cacher");
                    arrSvgConfirmer[numEtape].classList.remove("cacher");
                }
            }
            else {
                if (!nomEntrepriseValide || !nomValide || !prenomValide || !emailValide || !adresseValide || !codePostalValide || !villeValide || !provinceValide) {
                    etapeValide = false;
                }
                else {
                    etapeValide = true;
                    arrSvgPatte[numEtape].classList.add("cacher");
                    arrSvgConfirmer[numEtape].classList.remove("cacher");
                }
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
                arrSvgPatte[numEtape].classList.add("cacher");
                arrSvgConfirmer[numEtape].classList.remove("cacher");
                afficherInformationsResumer(prenomElement.value, numCarte.value);
            }
            break;
    }
    return etapeValide;
}
// Permet de valider quel parti du formulaire afficher en fonctions du bouton radio sélectionner
function validerBtnRadio() {
    // Si le btn radio de don mensuel est sélectionner, ont cache la liste des dons uniques.
    if (btnRadioDonMensuel.checked) {
        montantDonMensuel?.classList.remove("cacher");
        montantDonUnique?.classList.add("cacher");
    }
    // Si le btn radio de don unique est sélectionner, ont cache la liste des dons mensuels.
    if (btnRadioDonUnique.checked) {
        montantDonMensuel?.classList.add("cacher");
        montantDonUnique?.classList.remove("cacher");
    }
    if (btnRadioConsacrerNON.checked) {
        consacrerDon?.classList.add("cacher");
        estCacher = true;
        NomEtreCher.disabled = true;
    }
    if (btnRadioConsacrerOUI.checked) {
        consacrerDon?.classList.remove("cacher");
        NomEtreCher.disabled = false;
        estCacher = false;
    }
    if (btnRadioNonNotifier.checked) {
        infoPersonneNotifier?.classList.add("cacher");
        estCacherFormulaire2 = true;
    }
    if (btnRadioOuiNotifier.checked) {
        infoPersonneNotifier?.classList.remove("cacher");
        nomPersNotifier.disabled = false;
        emailPersNotifier.disabled = false;
        estCacherFormulaire2 = false;
    }
    if (btnRadioPerso.checked) {
        nomEntreprise?.classList.add("cacher");
        labelNomEntreprise?.classList.add("cacher");
        nomEntreprise.disabled = true;
        const msgErreurNomEntreprise = document.getElementById("err-nomEntreprise");
        msgErreurNomEntreprise.innerText = "";
    }
    if (btnRadioEntreprise.checked) {
        nomEntreprise?.classList.remove("cacher");
        labelNomEntreprise?.classList.remove("cacher");
        nomEntreprise.disabled = false;
    }
}
// Permet d'afficher et de cacher le champs "Autre montant" correspondant au type de don sélectionner. 
function afficherChampsAutre() {
    const dernierRadioUnique = radiosMontantUnique[radiosMontantUnique.length - 1];
    const dernierRadioMensuel = radiosMontantMensuel[radiosMontantMensuel.length - 1];
    const premierBtnMensuel = radiosMontantMensuel[0];
    const premierBtnUnique = radiosMontantUnique[0];
    if (btnRadioDonMensuel.checked) {
        inputAutreUnique?.classList.add("cacher");
        if (dernierRadioMensuel.checked) {
            inputAutreMensuel.classList.remove("cacher");
        }
        else {
            inputAutreMensuel.classList.add("cacher");
            inputAutreMensuel.innerText = "";
        }
    }
    else if (btnRadioDonUnique.checked) {
        inputAutreMensuel.classList.add("cacher");
        if (dernierRadioUnique.checked) {
            inputAutreUnique?.classList.remove("cacher");
        }
        else {
            inputAutreUnique.classList.add("cacher");
            inputAutreUnique.innerText = "";
        }
    }
}
// Permet d'obtenir la valeur entrée dans le champs autre montant.
function obtenirAutreMontant(event) {
    afficherChampsAutre();
    let valeurMontant = event.currentTarget.value;
    champMontantDonResumer.innerText = "";
    if (event.currentTarget.value == "autreMontant") {
        valeurMontant = inputAutreMensuel.innerText;
    }
    else {
        champMontantDon.innerText = valeurMontant;
        champMontantDonResumer.innerText = valeurMontant;
    }
}
function afficherInformationsResumer(value, value2) {
    champsPrenomResumer.innerText = value;
    const dernierChiffreCarte = value2.substring(12);
    champCarteResumer.innerText = dernierChiffreCarte;
}
// Permet de valider que toutes les étapes ont été valider afin de permettre l'envoie du formulaire. 
function validerEnvoieDon(event) {
    if (numEtape < 3) {
        event.preventDefault();
    }
}
