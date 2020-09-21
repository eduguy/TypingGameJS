
document.onkeydown = function(e) {
    if (e.key === 'Enter')
    {
        var input = document.getElementById("input");
        //CHECK if this is one of the words
        //if so, points++ and change it to a new word

        input.value = "";

    }
}

function startGame() {
    decrementTime()
    // document.getElementById("input").value = "check";
    //set all the h2s with words scraped or hardcoded?
}

function decrementTime() {
    //decrement time by 1 if time is not already 0
    //once 0, end hte game
}
