//Query Selectors

const project = document.querySelectorAll(".project")

//Variables

let currentImage = 0;
//Fonction

function changeSlide() {
    project[currentImage].classList.toggle("active");
    currentImage = (currentImage + 1) % 5;
    project[currentImage].classList.toggle("active");
    console.log("Execution");
}


setInterval(changeSlide, 5000);