//TODO: find a way to scrape words from somewhere or create a more exhaustive list
let words = ['abc', 'bac', 'climb', 'rock', 'calculator', 'fds', 'fsa', 'bike', 'fork'];
let active = [];
let score = 0;
let time = 30;
let gameOn=false;


document.onkeydown = function(e) {
    if (e.key === 'Enter')
    {   
        if (gameOn) {

            let input = document.getElementById("input");
            let val = input.value.trim();
            let check = words.indexOf(val);
            if (check !== -1) {
                //TODO: remove word from the grid and replace it with next word
                score++;
                document.getElementById("score").innerHTML = "Current Score: " + score;
                words.splice(check,1);
            }            
        }
        input.value = "";


    }

}

function startGame() {
    
    initGrid();
    gameOn = true;
    setInterval(decrementTime, 1000);
    setTimeout(endGame, 30000);
}
//whenever you do an updating move (scoring, initilizng), call update word to match
//the array with the text
function initGrid() {
    let i = 1;
    while (i <= 9) {
        //TODO: no duplicates
        //rand from 1 to words.length
        let rand = Math.floor(Math.random() * words.length);
        //str should be pulled from the words and moved to active
        let str = words[rand];
        words.splice(rand, 1);
        active.push(str);
        // document.getElementById("word" + i).innerHTML = str;
        i = i + 1;
    }

    updateGrid;
}
function updateGrid() {
    document.getElementById("word1").innerHTML = active[0];
    //TODO: ETCCCC
}


function decrementTime() {
        time = time-1;
        document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
}

function endGame() {
    //TODO: disable text box, return score
}
