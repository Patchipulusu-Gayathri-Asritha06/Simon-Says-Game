let h2= document.querySelector('h2');
let span= document.querySelector('span');
let started= false;
let level= 0;
let highScore= 0;

let userSeq= [];
let gameSeq= [];

let btns= ["red", "green", "yellow", "purple"];

/* Starting the game */

document.addEventListener("keypress",function(){
    if(started== false){
        console.log("Game is started");
        started= true;
        levelUp();
    }
})

/* Flash Buttons and Level Up */

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

// function levelUp(){
//     level++;
//     h2.innerText= `Level ${level}`;
//     let randIdx= Math.floor(Math.random()* 3);
//     let randColor= btns[randIdx];
//     let randBtn= document.querySelector(`#${randColor}`);
//     gameFlash(randBtn);
// }

/* Button Event Listeners */

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout( () => {
        btn.classList.remove("userFlash");
    }, 250);
}

// function btnPress(){
//     console.log(this);
//     let btn= this;
//     userFlash(btn);
// }


let allBtns= document.querySelectorAll('.btn');

for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}


/* Matching Sequence */


function checkAns(idx){
    if(userSeq[idx]== gameSeq[idx]){
        if(userSeq.length== gameSeq.length){
            levelUp();
        }
    }
    else{
        h2.innerHTML= `Game Over! Your score was <b>${level- 1}</b>
        <br>  Press any key to start`;
        document.querySelector('body').style.backgroundColor= '#f00';
        setTimeout( () => {
            document.querySelector('body').style.backgroundColor= 'white';
        }, 150);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn= this;
    userFlash(btn);

    let userColor= btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length- 1);
}



function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    
    if(level > parseInt(span.innerText)){
        span.innerText= level- 1;
    }

    userSeq = []; 

    setTimeout(() => {
        let randIdx = Math.floor(Math.random() * 4); 
        let randColor = btns[randIdx];
        let randBtn = document.querySelector(`#${randColor}`);

        gameSeq.push(randColor);
        console.log("Game Sequence: ", gameSeq);

        gameFlash(randBtn);
    }, 1500); 
}


function reset(){
    userSeq= [];
    gameSeq= [];
    started= false;
    level= 0;
}