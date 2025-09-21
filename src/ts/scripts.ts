const btnPrecedent: HTMLElement | null = document.getElementById("btnPrecedent");
const btnSuivant: HTMLElement | null = document.getElementById("btnSuivant");
const etape1: HTMLElement | null = document.getElementById("etape1");
const etape2: HTMLElement | null = document.getElementById("etape2");
const etape3: HTMLElement | null = document.getElementById("etape3");
const etape4: HTMLElement | null = document.getElementById("etape4");


let etapes = document.querySelectorAll("section");
let numEtape: number = 0;
let messagesJson: any = null;
let montantDonUnique = document.getElementById("listDonUnique") as HTMLInputElement;
let montantDonMensuel = document.getElementById("listDonMensuel") as HTMLInputElement;
let consacrerDon = document.getElementById("enHonneur") as HTMLInputElement;
let infoPersonneNotifier = document.getElementById("infoPersonneNotifier") as HTMLInputElement;
let inputAutreUnique = document.getElementById("autreUnique") as HTMLInputElement;
let inputAutreMensuel = document.getElementById("autreMensuel") as HTMLInputElement;
const btnEnvoyer = document.getElementById("envoyerDon") as HTMLInputElement;
let estCacher = true;
let estCacherFormulaire2 = true;
const champMontantDon = document.getElementById("montantDonBtn") as HTMLElement;

// CHAMPS
const NomEtreCher = document.getElementById('nomEtreCher') as HTMLInputElement;
const nomPersNotifier = document.getElementById("nomPers") as HTMLInputElement;
const emailPersNotifier = document.getElementById("emailPers") as HTMLInputElement;
const nomEntreprise = document.getElementById("nomEntreprise") as HTMLInputElement;
const labelNomEntreprise = document.querySelector('label[for="nomEntreprise"]');



// VARIABLE BTN RADIOS
let btnRadioDonUnique: any = document.getElementById("donUnique");
let btnRadioDonMensuel: any = document.getElementById("donMensuel");
let btnRadioConsacrerOUI: any = document.getElementById("ouiEtreCher");
let btnRadioConsacrerNON: any = document.getElementById("nonEtreCher");
let btnRadioOuiNotifier: any = document.getElementById("ouiNotifier");
let btnRadioNonNotifier: any = document.getElementById("nonNotifier");
let btnRadioAutreUnique: any = document.getElementById('autreMontantUnique');
let btnRadioEntreprise: any = document.getElementById("entreprise");
let btnRadioPerso: any = document.getElementById("personnel");
const radiosMontantUnique = document.querySelectorAll('input[type="radio"][name="montantDonUnique"]');
const radiosMontantMensuel = document.querySelectorAll('input[type="radio"][name="montantDonMensuel"]');
const etiquetteDonUnique = document.querySelectorAll("#listDonUnique > div");
const formulaire = document.querySelector("form") as HTMLFormElement;


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
inputAutreMensuel.addEventListener("change", obtenirAutreMontant);
inputAutreUnique.addEventListener("change", obtenirAutreMontant);

radiosMontantUnique.forEach(btnradio => {
    btnradio.addEventListener("click", obtenirAutreMontant);
});
radiosMontantMensuel.forEach(btnradio => {
    btnradio.addEventListener("click", obtenirAutreMontant);
});




function initialiser() {
    etape2?.classList.add("cacher");
    etape3?.classList.add("cacher");
    etape4?.classList.add("cacher");
    btnPrecedent?.classList.add("cacher");
    btnSuivant?.classList.remove("cacher");
    montantDonMensuel?.classList.add("cacher");
    consacrerDon?.classList.add("cacher")
    infoPersonneNotifier?.classList.add("cacher");
    inputAutreUnique?.classList.add("cacher");
    inputAutreMensuel.classList.add("cacher");
    obtenirMessage();
    formulaire.noValidate = true;
}
function naviguerSuivant() {
    validerEtape(numEtape);
    if (validerEtape(numEtape) == false) {
    } else {

        numEtape++;
        afficherEtape(numEtape);


        if (numEtape == 0) {
            btnSuivant?.classList.remove("cacher");
        };
        if (numEtape == 1) {
            btnPrecedent?.classList.remove("cacher");
            validerBtnRadio();
        };

        if (numEtape == 3) {
            btnSuivant?.classList.add("cacher");
        };
    }
}


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

    if (numEtape == 3) {
        btnSuivant?.classList.add("cacher");

    }
}
function afficherEtape(numEtape: number) {
    etapes.forEach((etape, index) => {
        if (index == numEtape) {
            etape.classList.remove("cacher");
        }
        else {
            etape.classList.add("cacher");
        }
    });
};

async function obtenirMessage() {
    const reponse = await fetch('objJSONMessages.json')
    //  au lieu de :
    //     const reponse = fetch('objJSONMessages.json')
    //     reponse.then(()=>{
    //     })

    messagesJson = await reponse.json();
    //  reponse.then(()=>)
}

function validerChamp(champ: HTMLInputElement): boolean {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement: any = document.getElementById(idMessageErreur);



    if (champ.validity.valueMissing && messagesJson[id].vide) {

        valide = false;
        erreurElement.innerText = messagesJson[id].vide;
    } else if (champ.validity.typeMismatch && messagesJson[id].type) {

        valide = false;
        erreurElement.innerText = messagesJson[id].type;
    } else if (champ.validity.patternMismatch && messagesJson[id].pattern) {

        valide = false;
        erreurElement.innerText = messagesJson[id].pattern;
    } else {
        valide = true;
        erreurElement.innerText = "";

    }

    return valide;
}

function validerEmail(champ: HTMLInputElement) {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "err-" + id;
    const erreurElement: any = document.getElementById(idMessageErreur);
    const leEmail = champ.value;


    const tldSuspicieux = [
        ".ru",
        ".cn",
        ".click",
        ".party",
    ];
    const erreursCommune: any = {
        'hotnail': 'hotmail',
        'gnail': 'gmail'
    }

    if (champ.validity.valueMissing && messagesJson[id].vide) {

        valide = false;
        erreurElement.innerText = messagesJson[id].vide;
    } else if (champ.validity.typeMismatch && messagesJson[id].type) {

        valide = false;
        erreurElement.innerText = messagesJson[id].type;
    } else if (champ.validity.patternMismatch && messagesJson[id].pattern) {

        valide = false;
        erreurElement.innerText = messagesJson[id].pattern;
    } else if (tldSuspicieux.some((tld => {
        const contientSuspect = leEmail.toLowerCase().endsWith(tld);
        if (contientSuspect) {
            valide = false;
            if (messagesJson[id].tldSuspicieux) {
                erreurElement.innerText = messagesJson[id].tldSuspicieux;
            }
        }
        return contientSuspect;
    }))) {
        valide = false;
    }
    else {
        const valeursCles = Object.keys(erreursCommune)
        const erreurCle = valeursCles.find((domaine) => {
            return leEmail.toLowerCase().includes(domaine);
        })
        if (erreurCle) {
            const domaineCorrect = erreursCommune[erreurCle];
            const monMessage = messagesJson[id].erreursCommune.replace("{domaine}", domaineCorrect);
            valide = false;
            erreurElement.innerText = monMessage;
        } else {
            erreurElement.innerText = "";
            valide = true;
        }


    }
    return valide;

}
function validerEtape(etape: number): boolean {
    let etapeValide = false;


    switch (etape) {
        case 0:
            const NomEtreCherValide = validerChamp(NomEtreCher);
            const nomPersNotifierValide = validerChamp(nomPersNotifier);
            const emailPersNotifierValide = validerEmail(emailPersNotifier);

            if (estCacher === true && estCacherFormulaire2 === true) {
                console.log("tout cacher = valide ")
                etapeValide = true;
            } else if (!NomEtreCherValide) {
                etapeValide = false;
                console.log("nom pas correct = invalide ")
            } else if (estCacherFormulaire2 === false) {
                console.log("form 2 afficher")

                if (!nomPersNotifierValide || !emailPersNotifierValide) {
                    etapeValide = false;
                    console.log("1 des 2 champs est pas valide = Invalide")
                } else {
                    etapeValide = true;
                }
            } else {
                etapeValide = true;
                console.log("tout est good !")
            }
            break;

        case 1:
            const nomElement = document.getElementById('nom') as HTMLInputElement;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            const emailElement = document.getElementById('email') as HTMLInputElement;
            const adresseElement = document.getElementById('adresse') as HTMLInputElement;
            const codePostal = document.getElementById('codePostal') as HTMLInputElement;
            const ville = document.getElementById('ville') as HTMLInputElement;
            const province = document.getElementById('province') as HTMLInputElement;

            const nomValide = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerEmail(emailElement);
            const adresseValide = validerChamp(adresseElement);
            const codePostalValide = validerChamp(codePostal);
            const villeValide = validerChamp(ville);
            const provinceValide = validerChamp(province);
            const nomEntrepriseValide = validerChamp(nomEntreprise);

            if (nomEntreprise.disabled = false) {
                if (!nomValide || !prenomValide || !emailValide || !adresseValide || !codePostalValide || !villeValide || !provinceValide) {
                    etapeValide = false;
                } else {
                    etapeValide = true;
                }
            } else {
                if (!nomEntrepriseValide || !nomValide || !prenomValide || !emailValide || !adresseValide || !codePostalValide || !villeValide || !provinceValide) {
                    etapeValide = false;
                }else {
                    etapeValide = true;
                }
            }
            break;

        case 2:
            const numCarte = document.getElementById('numCarte') as HTMLInputElement;
            const cvc = document.getElementById("cvc") as HTMLInputElement;
            const expirationCarte = document.getElementById("expirationCarte") as HTMLInputElement;

            const numCarteValide = validerChamp(numCarte);
            const cvcValide = validerChamp(cvc);
            const expirationCarteValide = validerChamp(expirationCarte);

            if (!numCarteValide || !cvcValide || !expirationCarteValide) {
                etapeValide = false;
            } else {
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
        afficherChampsAutre();

    }
    if (btnRadioDonUnique.checked) {
        montantDonMensuel?.classList.add("cacher");
        montantDonUnique?.classList.remove("cacher");
        afficherChampsAutre();

    }
    if (btnRadioConsacrerNON.checked) {
        consacrerDon?.classList.add("cacher");
        estCacher = true;
        NomEtreCher.disabled = true;
        console.log(estCacher);

    }
    if (btnRadioConsacrerOUI.checked) {
        consacrerDon?.classList.remove("cacher");
        NomEtreCher.disabled = false;
        estCacher = false;
        console.log(estCacher);

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


    }
    if (btnRadioEntreprise.checked) {
        nomEntreprise?.classList.remove("cacher");
        labelNomEntreprise?.classList.remove("cacher");
        nomEntreprise.disabled = false;
    }

}
function afficherChampsAutre() {

    const dernierRadioUnique = radiosMontantUnique[radiosMontantUnique.length - 1] as HTMLInputElement;
    const dernierRadioMensuel = radiosMontantMensuel[radiosMontantMensuel.length - 1] as HTMLInputElement;
    const premierBtnMensuel = radiosMontantMensuel[0] as HTMLInputElement;
    const premierBtnUnique = radiosMontantUnique[0] as HTMLInputElement;


    if (btnRadioDonMensuel.checked) {
        premierBtnUnique.checked = true;
        inputAutreUnique?.classList.add("cacher");
        if (dernierRadioMensuel.checked) {
            inputAutreMensuel.classList.remove("cacher");
        }

    } else if (btnRadioDonUnique.checked) {
        premierBtnMensuel.checked = true;
        inputAutreMensuel.classList.add("cacher");
        if (dernierRadioUnique.checked) {
            inputAutreUnique?.classList.remove("cacher");
        }
    }
}

function obtenirAutreMontant(event: any) {
    console.log(event.currentTarget.value);
    // console.log(inputAutreMensuel.innerHTML);
    let valeurMontant = event.currentTarget.value;
    if (event.currentTarget.value == "autreMontant") {
        valeurMontant = inputAutreMensuel.innerText;
    } else {
        champMontantDon.innerText = valeurMontant;
    }
}

function validerEnvoieDon(event: any) {
    if (numEtape < 3) {
        event.preventDefault();
    }
}