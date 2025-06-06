let n = 250;
let inf = 10;
let b = 0.9;
let g = 0.15;
const tempsEtude = 100000;

//Query selectors
const btnI = document.querySelector(".i");
const btnN = document.querySelector(".n");
const btnB = document.querySelector(".b");
const btnG = document.querySelector(".g");
const btnR = document.querySelector(".r");
let points = 0;
//Donc R0 = 4/3

let etat = {
    s: n - inf,
    i: inf,
    tempsEcoule: 0
}

let va1 = 0;
//Base pour déterminer tempsInter

let va2 = 0;
//Base pour déterminer evenement

let tempsInter = 0;
/*
Variable aléatoire à loi exponentielle.
*/


let evenement = 0;
/*

Variable qui prend pour valeurs 
--> 0 si transition S->I
--> 1 si pas de transition
--> 2 si transition I->R

Loi de probabilité définie par :
--> P(evenement=0)=(b.s.i/n)/(b.s.i/n+g.i)
--> P(evenement=1)=(g.i)/(b.s.i/n+g.i)

*/


/*
Calcule l'état suivant
Paramètres :  Etat actuel
Retourne : Etat suivant
*/
function getI() {
    let choice = NaN;
    while (isNaN(choice) || choice <= 0) {
        choice = Number(window.prompt("Please enter a number greater than 0"));
    }
    inf = choice;
}
function getN() {
    let choice = NaN;
    while (isNaN(choice) || choice <= 0) {
        choice = Number(window.prompt("Please enter a number greater than 0"));
    }
    console.log('khara');
    n = choice;
}
function getB() {
    let choice = NaN;
    while (isNaN(choice) || choice <= 0) {
        choice = Number(window.prompt("Please enter a number greater than 0"));
    }
    b = choice;
}
function getG() {
    let choice = NaN;
    while (isNaN(choice) || choice <= 0) {
        choice = Number(window.prompt("Please enter a number greater than 0"));
    }
    g = choice;
}
function etatSuivant(etat) {
    //assigner une valeur aléatoire à va1 et va2
    va1 = Math.random();
    va2 = Math.random();
    //Déduire la valeur de dt
    tempsInter = -Math.log(va1) / ((b * (etat.s) * (etat.i)) / n + g * (etat.i));
    //Déduire la valeur de evenement
    if (va2 < ((b * (etat.s) * (etat.i) / n) / ((b * (etat.s) * (etat.i) / n) + g * (etat.i)))) {
        evenement = 0;
    }
    else {
        evenement = 1;
    }
    //Mettre à jour etat
    etat.tempsEcoule += tempsInter;
    switch (evenement) {
        case 0: //Transition S I
            etat.s--;
            etat.i++;
            break;
        case 1: //Transition I R
            etat.s = etat.s;
            etat.i--;
            break;
    }
    return etat;
}

/*
Place un point de coordonnées (t,i)
Paramètres : Etat actuel, fenetre temporelle
Retourne :  Rien
*/


function ajouterPoint(etat, fenetreTemps) {
    let graphe = document.querySelector("#graphe");

    let x = (etat.tempsEcoule / fenetreTemps); // Donner x entre 0 et 1
    let yr = (1 - etat.i / n);        // Donner y entre 0 et 1
    let yb = (1 - etat.s / n);        // Donner y entre 0 et 1
    let yv = (1 - (n - etat.i - etat.s) / n);        // Donner y entre 0 et 1

    let pointR = document.createElement("div");
    pointR.className = "point-rouge";
    pointR.style.left = `calc(${x}*80vw)`;
    pointR.style.top = `calc(${yr}*400px)`;
    pointR.innerHTML = "<table><tr><td>Infected :</td><td>" + etat.i + "</td></tr><tr><td>Time since beginning :</td><td>" + etat.tempsEcoule + "</td></tr></table>";
    let pointB = document.createElement("div");
    pointB.className = "point-bleu";
    pointB.style.left = `calc(${x}*80vw)`;
    pointB.style.top = `calc(${yb}*400px)`;
    pointB.innerHTML = "<table><tr><td>Not infected :</td><td>" + etat.s + "</td></tr><tr><td>Time since beginning :</td><td>" + etat.tempsEcoule + "</td></tr></table>";
    let pointV = document.createElement("div");
    pointV.className = "point-vert";
    pointV.style.left = `calc(${x}*80vw)`;
    pointV.style.top = `calc(${yv}*400px)`;
    pointV.innerHTML = "<table><tr><td>Cured :</td><td>" + (n - etat.i - etat.s) + "</td></tr><tr><td>Time since beginning :</td><td>" + etat.tempsEcoule + "</td></tr></table>";



    graphe.appendChild(pointR);
    graphe.appendChild(pointB);
    graphe.appendChild(pointV);
}


/*Trace un graphe à partir d'un array d'états
Paramètres : Array des etats
Retourne : Rien
*/


function tracerGraphe(arrayEtats) {
    let fenetreTemps = arrayEtats[arrayEtats.length - 1].tempsEcoule;
    let graphe = document.querySelector("#graphe");
    graphe.innerHTML = '<div class="graphLabel"><div><div class="point-rouge"></div><div class="meaning">  | Infected</div></div><div><div class="point-bleu"></div><div class="meaning">  | Not infected</div></div><div><div class="point-vert"></div><div class="meaning">  | Cured</div></div></div>';
    console.log("Largeur du graphe:", graphe.clientWidth);
    console.log("salut");
    for (let i = 0; arrayEtats[i] !== undefined; i++) {
        ajouterPoint(arrayEtats[i], fenetreTemps);
    }
}

/*Fait apparître les coordonnées d'un point survolé
Paramètres : Evènement
Retourne : Rien
*/
function labelPoint(e) {
    e.target.classList.toggle("active");
    console.log("hovered");
}


/*Lance l'épidémie: Calcule les états, trace le graphique, modifie le texte
Paramètres : Rien
Retourne : Rien
*/

function epidemic() {
    etat = {
        s: n - inf,
        i: inf,
        tempsEcoule: 0
    };

    let arrayEtats = [{
        s: etat.s,
        i: etat.i,
        tempsEcoule: etat.tempsEcoule
    }];
    while (etat.tempsEcoule < tempsEtude && etat.i > 0) {
        etat = etatSuivant(etat);
        arrayEtats.push({
            s: etat.s,
            i: etat.i,
            tempsEcoule: etat.tempsEcoule
        });
    }
    console.log(arrayEtats);
    tracerGraphe(arrayEtats);
    points = document.querySelectorAll('[class^="point"]');
    points.forEach(unPoint => {
        unPoint.addEventListener("mouseover", labelPoint);
        unPoint.addEventListener("mouseout", labelPoint);
    });
    const values = document.querySelector(".card p");
    values.innerHTML = "<b>The current values are :</b><br><ul><li><i>Initial infections : </i>" + inf + "</li><br><li><i>Population size : </i>" + n + "</li><br><li><i>Transmission rate β : </i>" + b + "</li><br><li><i>Healing rate γ : </i>" + g + "</li></ul>";
}

epidemic();

btnI.addEventListener("click", getI);
btnN.addEventListener("click", getN);
btnB.addEventListener("click", getB);
btnG.addEventListener("click", getG);
btnR.addEventListener("click", epidemic);

