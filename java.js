let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");


// SOUND FUNCTION
function playSound(color) {

    let sounds = {
        red: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        green: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        yellow: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        purple: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        wrong: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    };

    let audio = new Audio(sounds[color]);
    audio.play();
}


// START BUTTON
startBtn.addEventListener("click", function () {

    if (started == false) {

        console.log("game is started");

        started = true;

        startBtn.style.display = "none";

        levelUp();
    }
});


function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp() {

    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    // PLAY SOUND
    playSound(randColor);

    console.log(gameSeq);

    gameFlash(randBtn);
}


function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {

            setTimeout(levelUp, 1000);
        }

    } else {

        // WRONG SOUND
        playSound("wrong");

        h2.innerHTML = `Game Over! Your score was <b>${level}</b>`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);

        // SHOW BUTTON AGAIN
        startBtn.style.display = "inline-block";

        startBtn.innerText = "Restart Game";

        reset();
    }
}


function btnPress() {

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    // BUTTON SOUND
    playSound(userColor);

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);
}


function reset() {

    started = false;

    gameSeq = [];

    userSeq = [];

    level = 0;
}