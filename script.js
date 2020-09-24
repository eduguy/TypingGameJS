//TODO: find a way to scrape words from somewhere or create a more exhaustive list
let words = ['abc', 'bac', 'climb', 'rock', 'calculator', 'fds', 'fsa', 'bike', 'fork', 'mea', 
'dog','cat'];
let active = [];
let score = 0;
let time = 30;
let gameOn=false;
let interval;
let missedWords=0;

document.onkeydown = function(e) {
    if (e.key === 'Enter')
    {   
        if (gameOn) {

            let input = document.getElementById("input");
            let val = input.value.trim();
            let check = active.indexOf(val);
            if (check !== -1) {

                let rand = Math.floor(Math.random() * words.length);
                let str = words[rand];
                active[check]= str;
                
                words.splice(rand, 1);
                switchVal(check);
                score++;
                document.getElementById("score").innerHTML = "Current Score: " + score;
                // words.splice(check,1);
            }            
        }
        input.value = "";


    }
}

function switchVal(check) {
    let v = check+1;
    let val = document.getElementById("word" + v);
    val.innerHTML = active[check];
    setTimeout(fadeOut, 4000, val, check);
}

function fadeOut(elem, check) {
    //TODO::
    //fadeout
    //getnewword
    //elem is the word the element that needs to be faded
    console.log("fadeout");
    missedWords = missedWords +1;
}

function startGame() {
    
    initGrid();
    gameOn = true;
    document.getElementById("input").focus();
    interval = setInterval(decrementTime, 1000);
    setTimeout(endGame, 30000);
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


    updateGrid();
}
function updateGrid() {

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
    //TODO: popup box with score
    gameOn = false;
    clearInterval(interval);
}
