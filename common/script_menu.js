// script écrit pour réagir aux sélections de la section menu de la page web
// variables déclarées globalement pour pouvoir y accéder des différentes fonctions

// initialisées à 0 pour éviter d'afficher NaN sur la facture lorsqu'une seule option est choisie
var prixEntree = 0;
var prixRepas = 0;

// menus en tableaux associatifs
var choix_entrees = {
    "Aucun": {image: "vide.png", prix: 0.00},
    "Escargot": {image: "escargot.jpg", prix: 4.95},
    "Salade" : {image: "salade.jpg", prix: 5.95}};

var choix_repas = {
    "Aucun": {image: "vide.png", prix: 0.00},
    "Spaghetti": {image: "spaghetti.jpg", prix: 8.95},
    "Lasagne": {image: "lasagne.jpg", prix: 9.95}};



/* ************************** début du code ************************** */

// fonction qui s'exécute à l'ouverture de la page
window.onload = function () {chargerSelect()};

// fonction qui remplit les balises <select> avec les valeurs des tableaux associatifs correspondants
function chargerSelect() {

    // obtenir une référence sur les éléments <select> et déclarer un élément <option> pour y ajouter des options
    var selectEntree = document.getElementById("entree");
    var selectRepas = document.getElementById("repas");
    var opt;

    // ajouter dynamiquement des options aux balises <select> à partir des tableaux associatifs
    for(var qqch in choix_entrees) {
        opt = document.createElement('option');
        opt.text = qqch;
        selectEntree.add(opt);
    }

    for(var choix in choix_repas) {
        opt = document.createElement('option');
        opt.text = choix;
        selectRepas.add(opt);
    }

    // mettre l'image vide et le prix à 0 lors du chargement de la page
    document.getElementById("imgEntree").src = "images/menu/vide.png";
    document.getElementById("imgRepas").src = "images/menu/vide.png";
    document.getElementById("prixEntree").innerHTML = "0$";
    document.getElementById("prixRepas").innerHTML = "0$";
}

// fonction qui se déclenche lorsqu'une sélection est faite dans le menu
function afficherInfos() {

    // variables qui seront attribuées selon les choix de l'utilisateur
    var baliseImg;
    var balisePrix;
    var nomFichierImg;
    var baliseNomPlat;

    // obtenir la référence de l'objet sélectionné
    var selection = event.target.options[event.target.selectedIndex].text;
    var baliseSelect = event.target.options[event.target.selectedIndex].parentNode;

    // afficher la facture dès qu'une sélection est faite
    document.getElementById("divFacture").style.display = "block";

    // si le choix est un élément de la liste des entrées
    if(baliseSelect.id.toString() == "entree")
    {
        // parcourir le tableau associatif pour trouver la sélection faite
        for(var choix in choix_entrees) {
            if (choix == selection) {
                // obtenir l'image et le prix correspondant au choix dans le tableau associatif
                baliseImg = document.getElementById("imgEntree");
                balisePrix = document.getElementById("prixEntree");

                // les placer dans les balises html
                nomFichierImg = "images/menu/" + choix_entrees[choix]['image'];
                baliseImg.src = nomFichierImg;
                prixEntree = choix_entrees[choix]['prix'];
                balisePrix.innerHTML = prixEntree + "$";

                // ajout des éléments à la facture papier
                baliseNomPlat = document.getElementById("nomEntreeFact")
                balisePrix = document.getElementById("prixEntreeFact");
                baliseNomPlat.innerText = selection;
                balisePrix.innerHTML = prixEntree + "$";
            }
        }
    }

    // on répète les mêmes étapes pour le cas où c'est la liste des repas qui est activée
    else if(baliseSelect.id.toString() == "repas")
    {
        for(var choix in choix_repas) {
            if (choix == selection) {
                baliseImg = document.getElementById("imgRepas");
                balisePrix = document.getElementById("prixRepas");
                nomFichierImg = "images/menu/" + choix_repas[choix]['image'];
                baliseImg.src = nomFichierImg;
                prixRepas = choix_repas[choix]['prix'];
                balisePrix.innerHTML =  prixRepas + "$";

                // ajout des éléments à la facture papier
                baliseNomPlat = document.getElementById("nomRepasFact")
                balisePrix = document.getElementById("prixRepasFact");
                baliseNomPlat.innerText = selection;
                balisePrix.innerHTML = prixRepas + "$";
            }
        }
    }

    // on calcule la facture à chaque fois qu'une sélection est faite
    calcul_facture();
}

// fonction qui affiche dans la section facture les prix des éléments
function calcul_facture() {

    // calcul des taxes et du total
    var sous_total = prixEntree + prixRepas;
    var taxes = sous_total * 0.05 + sous_total * 0.09975;
    var total = sous_total + taxes;
    var dt = new Date();

    // on récupère les balises où afficher les prix et on affiche
    baliseSousTotal = document.getElementById("ss_total");
    baliseTaxes = document.getElementById("taxes");
    baliseTotal = document.getElementById("total");
    baliseSousTotal.innerHTML = parseFloat(sous_total).toFixed(2) + "$";
    baliseTaxes.innerHTML = parseFloat(taxes).toFixed(2) + "$";
    baliseTotal.innerHTML = parseFloat(total).toFixed(2) + "$";

    // ajout de la date à la facture
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}
