//Query Selectors calculator buttons
const one=document.querySelector(".one");
const two=document.querySelector(".two");
const three=document.querySelector(".three");
const four=document.querySelector(".four");
const five=document.querySelector(".five");
const six=document.querySelector(".six");
const seven=document.querySelector(".seven");
const eight=document.querySelector(".eight");
const nine=document.querySelector(".nine");
const zero=document.querySelector(".zero");
const plus=document.querySelector(".plus");
const minus=document.querySelector(".minus");
const divide=document.querySelector(".divide");
const multiply=document.querySelector(".multiply");
const c=document.querySelector(".c");
const ac=document.querySelector(".ac");
const equal=document.querySelector(".equal");
const dot=document.querySelector(".dot");
const screenNew=document.querySelector(".screen .new")
const screenOld=document.querySelector(".screen .old")
const buttons=document.querySelectorAll(".calculator div div")

//Mémoire de la calculatrice
let memory=[];
let memoryPointer=0;

//functions
function operate(n1,n2,operation){
    switch(operation){
        case 0:
            return n1*n2;
            break;
        case 1: 
            return n1/n2;
            break;
        case 2:
            return n1+n2;
            break;
        case 3:
            return n1-n2;
            break;
    }
}
function showAnswer(answer){
    screenOld.textContent=screenNew.textContent;
    screenNew.textContent=answer;
}
function write(e){
    if(e.target===one||e.target===two||e.target===three||e.target===four||e.target===five||e.target===six||e.target===seven||e.target===eight||e.target===nine||e.target===zero||e.target===dot){
        let a=e.target.textContent;
        screenNew.textContent+=a;
    }else if(e.target===plus||e.target===minus||e.target===multiply||e.target===divide){
        let a=e.target.textContent;
        let number1=parseFloat(screenOld.textContent.slice(0,screenOld.textContent.length-1));
        let number2=parseFloat(screenNew.textContent);
        switch(screenOld.textContent[screenOld.textContent.length-1]){
            case "x":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,0);
                break;
            case "÷":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,1);
                break;
            case "+":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,2);
                break;
            case "-":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,3);
                break;
        }
        screenOld.textContent=(screenNew.textContent+a).slice(0,5);
        screenNew.textContent="";


    }else if(e.target===c){
        screenNew.textContent=screenNew.textContent.slice(0,screenNew.textContent.length-1);
    }else if(e.target===ac){
        screenNew.textContent="";
        screenOld.textContent="";
    }else if(e.target===equal){
        let number1=parseFloat(screenOld.textContent.slice(0,screenOld.textContent.length-1));
        let number2=parseFloat(screenNew.textContent);
        switch(screenOld.textContent[screenOld.textContent.length-1]){
            case "x":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,0);
                break;
            case "÷":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,1);
                break;
            case "+":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,2);
                break;
            case "-":
                screenOld.textContent="";
                screenNew.textContent=operate(number1,number2,3);
                break;
        }
        screenNew.textContent=screenNew.textContent.slice(0,5);
        screenOld.textContent=screenNew.textContent;
        screenNew.textContent="";
    }

}

//event listeners

buttons.forEach(button => {
    button.addEventListener("click", write);
});


