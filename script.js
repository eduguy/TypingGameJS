//words taken from the first paragraph of: https://en.wikipedia.org/wiki/JavaScript
let words = [];
const dict = ["a","abbreviated","all","alongside","also","although","an","and","any","apis","application","applications","are","as","behavior","between","browser","browsers","but","client-side","compiled","conforms","cordova","core","created","css","curly-bracket","data","dates","dedicated","design","differ","distinct","document","does","dom","dynamic","ecmascript","electron","embedded","enables","engine","engines","environment","essential","event-driven","execute","expressions","facilities","first-class","for","frameworks","functional","functions","graphics","greatly","has","have","high-level","host","however","html","i","imperative","in","include","including","input","interactive","interfaces","is","it","itself","java","javascript","js","just-in-time","language","languages","libraries","major","majority","model","multi-paradigm","name","networking","node","not","now","object","object-orientation","of","often","one","only","or","originally","output","page","pages","part","programming","prototype-based","provides","pt","regular","respective","servers","similarities","skr","some","specification","standard","storage","structures","styles","such","supports","syntax","technologies","text","that","the","there","they","those","to","two","typing","use","used","usually","variety","vast","via","web","websites","were","wide","with","working","world"];
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

                updateArrays(indexOfWord);
                switchVal(indexOfWord);
                score++;
                document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);
            }            
        }
    }
}

function updateArrays(indexOfWord) {
    let rand = Math.floor(Math.random() * words.length);
    let str = words[rand];
    active[indexOfWord] = str;
    words.splice(rand, 1);
}

function switchVal(indexOfWord) {
    let v = indexOfWord+1;
    let val = document.getElementById("word" + v);
    val.innerHTML = active[indexOfWord];
    val.style.color="black";
    initTimers(val, indexOfWord);
}
function initTimers(elem, indexOfWord) {
   
    setTimeout(switchColor, fadeTime, elem, elem.innerHTML,indexOfWord);
    setTimeout(newWordTimeOut, wordTime, indexOfWord, elem.innerHTML);
}
function switchColor(val, origText, indexOfWord) {
    if (active[indexOfWord] === origText) {
        val.style.color = "red";
    }
}

function newWordTimeOut(indexOfWord, origText) {
    if (active[indexOfWord] === origText) {
        missedWords = missedWords + 1;
        updateArrays(indexOfWord);
        document.getElementById("word"+(indexOfWord+1)).style.color="black";
        switchVal(indexOfWord);
        document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);

    }
}

function startGame() {
    words=dict;
    initGrid();
    document.getElementById("input").value="";
    disableButton();
    time = gameLength;
    score=0;
    missedWords=0;
    document.getElementById("score").innerHTML = "Current Score: " + (score-missedWords);
    document.getElementById("timeLeft").innerHTML="Time Left: " + time;
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
        let w = document.getElementById("word"+i);
        w.innerHTML=active[i-1];
        setTimeout(initTimers,1000,w,i-1)
        i = i + 1;
    }
}



function decrementTime() {
    time = time-1;
    document.getElementById("timeLeft").innerHTML="Time Left: " + time;
}

function endGame() {
    gameOn = false;
    clearAllIntervals();
    enableButton();
    window.alert("You typed "+score +" words in " + gameLength + " seconds for a WPM of: " + (score/gameLength));
    document.getElementById("score").innerHTML = "Final Score: " + (score-missedWords);
    resetGame();
}

function resetGame() {
    let i = 1;
    while (i<=9) {
        document.getElementById("word"+i).innerHTML="Word "+i;
        document.getElementById("word"+i).style.color="black";
        i = i+1;
    } 
}
//https://stackoverflow.com/questions/3141064/how-to-stop-all-timeouts-and-intervals-using-javascript
function clearAllIntervals() {
    for (var i = setTimeout(function() {}, 0); i > 0; i--) {
      window.clearInterval(i);
      window.clearTimeout(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }
  }
  function disableButton() {
    document.getElementById("start").style.opacity=".25";
    document.getElementById("start").disabled = true;

}
function enableButton() {
    document.getElementById("start").style.opacity="1";
    document.getElementById("start").disabled = false;
}