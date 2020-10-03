//TODO: find a way to scrape words from somewhere or create a more exhaustive list
let words = ['abc', 'bac', 'climb', 'rock', 'calculator', 'fds', 'fsa', 'bike', 'fork', 'mea', '123', 'aae', 
'dog','cat'];
let active = [];
let score = 0;
let time = 20; //seconds
let gameOn=false;
let interval;
let missedWords=0;

document.onkeydown = function(e) {
    if (e.key === 'Enter')
    {   
        if (gameOn) {

            let input = document.getElementById("input");
            let val = input.value.trim();
            let indexOfWord = active.indexOf(val);
            if (indexOfWord !== -1) {

                let rand = Math.floor(Math.random() * words.length);
                let str = words[rand];
                active[indexOfWord]= str;
                words.splice(rand, 1);
                switchVal(indexOfWord);
                score++;
                document.getElementById("score").innerHTML = "Current Score: " + score;
            }            
        }
        input.value = "";


    }
}

function switchVal(indexOfWord) {
    let v = indexOfWord+1;
    let val = document.getElementById("word" + v);
    val.innerHTML = active[indexOfWord];
    fadeOut(val, indexOfWord);
}
function fadeOut(elem, indexOfWord) {
    //TODO: when word is picked, reset this fade timeout because now it's stacking up
    setTimeout(fade, 3000, elem);
    setTimeout(newWordTimeOut, 4000, indexOfWord);
}
function fade(val) {
    val.style.color = "red";
    setTimeout(function(){ val.style.color="black"; }, 1000)
}

function newWordTimeOut(indexOfWord) {
    console.log("fadeout");
    missedWords = missedWords + 1;
    let rand = Math.floor(Math.random() * words.length);
    let str = words[rand];
    active[indexOfWord] = str;
    words.splice(rand, 1);
    switchVal(indexOfWord);
}

function startGame() {
    
    initGrid();
    document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
    gameOn = true;
    document.getElementById("input").focus();
    interval = setInterval(decrementTime, 1000);
    setTimeout(endGame, time*1000);
}

function initGrid() {
    let i = 1;
    while (i <= 9) {
        let rand = Math.floor(Math.random() * words.length);
        let str = words[rand];
        words.splice(rand, 1);
        active.push(str);
        i = i + 1;
    }
    document.getElementById("word1").innerHTML = active[0];
    document.getElementById("word2").innerHTML = active[1];
    document.getElementById("word3").innerHTML = active[2];
    document.getElementById("word4").innerHTML = active[3];
    document.getElementById("word5").innerHTML = active[4];
    document.getElementById("word6").innerHTML = active[5];
    document.getElementById("word7").innerHTML = active[6];
    document.getElementById("word8").innerHTML = active[7];
    document.getElementById("word9").innerHTML = active[8];
}



function decrementTime() {
    time = time-1;
    document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
}

function endGame() {
    gameOn = false;
    clearInterval(interval);
    let finalScore = score-missedWords;
    window.alert("Your final score (minus missed words) is: "+finalScore)
}
