//Declaration des constantes

//QuerySelectors
const body = document.querySelector("main");
const btn = document.querySelector("button");
const header = document.querySelector(".header");
//Declaration des fonctions

//Creation de la grille. createGrid(height,width); 
function boxHover(e) {
    console.log("being hovered");
    e.target.classList.toggle("activated");
    e.target.setAttribute("style", e.target.getAttribute("style") + "background-color: rgb(" + Math.random() * 100 + "%," + Math.random() * 100 + "%," + Math.random() * 100 + "%);")
}

function createGrid(height, width) {
    let oldContainer = document.querySelector(".container");
    if (oldContainer) {
        console.log("remove");
        body.removeChild(oldContainer);
    }
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    body.insertBefore(containerDiv, header);
    for (let i = 0; i < height * width; i++) {
        let div = document.createElement("div");
        div.classList.add("gridBox");
        div.setAttribute("style", "height:" + 60 / height + "vw; width:" + 60 / width + "vw;")
        containerDiv.appendChild(div);
        div.addEventListener("mouseover", boxHover);
    }
}

function changeGrid() {
    let value = 0;
    while (value > 100 || value < 1 || typeof value !== "number") {
        value = window.prompt("Enter a new value for the grid side that is below 100");
        value = parseInt(value);
        createGrid(value, value);
    }
}
btn.addEventListener("click", changeGrid);

function main() {
    createGrid(16, 16);

}
main()


