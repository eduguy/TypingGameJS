//words taken from the first paragraph of: https://en.wikipedia.org/wiki/JavaScript
let words = ["a","abbreviated","all","alongside","also","although","an","and","any","apis","application","applications","are","as","behavior","between","browser","browsers","but","client-side","compiled","conforms","cordova","core","created","css","curly-bracket","data","dates","dedicated","design","differ","distinct","document","does","dom","dynamic","ecmascript","electron","embedded","enables","engine","engines","environment","essential","event-driven","execute","expressions","facilities","first-class","for","frameworks","functional","functions","graphics","greatly","has","have","high-level","host","however","html","i","imperative","in","include","including","input","interactive","interfaces","is","it","itself","java","javascript","js","just-in-time","language","languages","libraries","major","majority","model","multi-paradigm","name","networking","node","not","now","object","object-orientation","of","often","one","only","or","originally","output","page","pages","part","programming","prototype-based","provides","pt","regular","respective","servers","similarities","skr","some","specification","standard","storage","structures","styles","such","supports","syntax","technologies","text","that","the","there","they","those","to","two","typing","use","used","usually","variety","vast","via","web","websites","were","wide","with","working","world"]
let active = [];
let score = 0;
const wordTime = 4000;
const fadeTime = 3000;
const gameLength = 20;
let time = 0; //seconds
let gameOn=false;
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
                document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);
            }            
        }
        input.value = "";


    }
}

function switchVal(indexOfWord) {
    let v = indexOfWord+1;
    let val = document.getElementById("word" + v);
    val.innerHTML = active[indexOfWord];
    val.style.color="black";
    fadeOut(val, indexOfWord);
}
function fadeOut(elem, indexOfWord) {
   
    setTimeout(fade, fadeTime, elem, elem.innerHTML,indexOfWord);
    setTimeout(newWordTimeOut, wordTime, indexOfWord, elem.innerHTML);
}
function fade(val, origText, indexOfWord) {
    //if i pass the oriignal text here i can compare it?
    if (active[indexOfWord] === origText) {
        val.style.color = "red";

    }
}

function newWordTimeOut(indexOfWord, origText) {
    //if i pass the oriignal text here i can compare it so if the text has already changed,
    //then don't do anything
    if (active[indexOfWord] === origText) {
        console.log("fadeout");
        missedWords = missedWords + 1;
        let rand = Math.floor(Math.random() * words.length);
        let str = words[rand];
        active[indexOfWord] = str;
        document.getElementById("word"+(indexOfWord+1)).style.color="black";
        words.splice(rand, 1);
        switchVal(indexOfWord);
        document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);

    }
}

function startGame() {
    
    initGrid();
    document.getElementById("input").value="";

    time = gameLength;
    score=0;
    missedWords=0;
    document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);
    document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
    gameOn = true;
    document.getElementById("input").focus();
    setInterval(decrementTime, 1000);
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
    setTimeout(fadeOut, 1000, document.getElementById("word1"), 0)
    document.getElementById("word2").innerHTML = active[1];
    setTimeout(fadeOut, 1000, document.getElementById("word2"), 1)

    document.getElementById("word3").innerHTML = active[2];
    setTimeout(fadeOut, 1000, document.getElementById("word3"), 2)

    document.getElementById("word4").innerHTML = active[3];
    setTimeout(fadeOut, 1000, document.getElementById("word4"), 3)

    document.getElementById("word5").innerHTML = active[4];
    setTimeout(fadeOut, 1000, document.getElementById("word5"), 4)

    document.getElementById("word6").innerHTML = active[5];
    setTimeout(fadeOut, 1000, document.getElementById("word6"), 5)

    document.getElementById("word7").innerHTML = active[6];
    setTimeout(fadeOut, 1000, document.getElementById("word7"), 6)

    document.getElementById("word8").innerHTML = active[7];
    setTimeout(fadeOut, 1000, document.getElementById("word8"), 7)

    document.getElementById("word9").innerHTML = active[8];
    setTimeout(fadeOut, 1000, document.getElementById("word9"), 8)

}



function decrementTime() {
    time = time-1;
    document.getElementById("timeLeft").innerHTML="TIME LEFT: " + time;
}

function endGame() {
    gameOn = false;
    clearAll();
    window.alert("You typed "+score +" words in " + gameLength + " seconds for a WPM of: " + (score/gameLength));
    document.getElementById("score").innerHTML = "Final Score: " + (score-missedWords);



}
//https://stackoverflow.com/questions/3141064/how-to-stop-all-timeouts-and-intervals-using-javascript
function clearAll() {
    for (var i = setTimeout(function() {}, 0); i > 0; i--) {
      window.clearInterval(i);
      window.clearTimeout(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }
  }