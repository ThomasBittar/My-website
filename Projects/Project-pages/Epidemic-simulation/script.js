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
Paramètres : Etat actuel
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


/*Trace un graphe à partir d'un array d'états*/
/*Version Thomas*/


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
function labelPoint(e) {
    e.target.classList.toggle("active");
    console.log("hovered");
}
/*Version ChatGPT*/
/*
function tracerGraphe(arrayEtats) {
    let graphe = document.querySelector("#graphe");
    graphe.innerHTML = ""; // vider le graphe

    // Trouver index du premier état où i = 0
    let idxZero = arrayEtats.findIndex(etat => etat.i === 0);
    if (idxZero === -1) idxZero = arrayEtats.length - 1;

    const tempsMax = arrayEtats[idxZero].tempsEcoule;
    const largeur = graphe.clientWidth;
    const hauteur = graphe.clientHeight;

    // Échelle X
    const scaleX = largeur / tempsMax;

    // Calcul max pour i, s et r
    const maxI = Math.max(...arrayEtats.map(e => e.i));
    const maxS = Math.max(...arrayEtats.map(e => e.s));
    const maxR = Math.max(...arrayEtats.map(e => n - (e.s + e.i)));
    const maxY = Math.max(maxI, maxS, maxR);

    // Échelle Y
    const scaleY = hauteur / maxY;

    // Fonction pour créer un point coloré
    function creerPoint(x, y, color) {
        const point = document.createElement("div");
        point.classList.add("point");
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        point.style.backgroundColor = color;
        graphe.appendChild(point);
    }
    
// Tracer S en bleu, I en rouge, R en vert
arrayEtats.forEach(etat => {
    const x = etat.tempsEcoule * scaleX;
    const yS = hauteur - (etat.s * scaleY);
    const yI = hauteur - (etat.i * scaleY);
    const r = n - (etat.s + etat.i);
    const yR = hauteur - (r * scaleY);

    creerPoint(x, yS, "blue");   // S en bleu
    creerPoint(x, yI, "red");    // I en rouge
    creerPoint(x, yR, "green");  // R en vert
});
}*/
function afficheCoordonnees(etat) {
    if (etat.target === "") {

    }
}





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
}

epidemic();

btnI.addEventListener("click", getI);
btnN.addEventListener("click", getN);
btnB.addEventListener("click", getB);
btnG.addEventListener("click", getG);
btnR.addEventListener("click", epidemic);

