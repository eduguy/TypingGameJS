//TODO: find a way to scrape words from somewhere or create a more exhaustive list
let words = ['abc', 'bac'];
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
    gameOn = true;
    setInterval(decrementTime, 1000);
    setTimeout(endGame, 30000);
}

function decrementTime() {
        time = time-1;
        document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
}

function endGame() {
    //TODO: disable text box, return score
}
