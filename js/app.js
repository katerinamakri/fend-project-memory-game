const icons = [
  "fa-anchor",
  "fa-anchor",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-diamond",
  "fa-diamond",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bomb",
  "fa-bomb",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bolt",
  "fa-bolt"
];

//starting the game
function initialiseGameBoard() {
  const cards = generateCardTable(icons);
  initialiseClickActions();
}

//reset board game
function generateCardTable(icons) {
  //shuffle icons array
  const cards = shuffle(icons);
  var uiCards = document.getElementsByClassName("card");

  for (var i = 0; i < cards.length; i++) {
    var card = uiCards[i];
    card.innerHTML = '<i class="fa ' + cards[i] + '"></i>';
    //close card
    card.className = "card";
  }

  return uiCards;
}

//restart button
const restart = document.getElementById("restartbutton");

restart.addEventListener("click", startAgain);

function startAgain() {
  //reset board game
  generateCardTable(icons);

  //reset timer
  clearInterval(timer);
  timer = null;
  document.getElementById("timer").innerHTML = "00:00";

  //reset star rating
  document.getElementById("No3").style.display = "inline-block";
  document.getElementById("No2").style.display = "inline-block";

  //reset move counter
  resetCounter();
  document.getElementById("counter").innerHTML = "0 Moves";
}

//replay button
const replay = document.getElementById("replaybutton");

replay.addEventListener("click", function() {
  // close modal
  toggleOverlay();

  startAgain();
});

//reset move counter
const counter = document.getElementById("counter");

function resetCounter() {
  movecount = 0;
  counter.textContent = movecount;
}

//timer
let timer;
let sec;
let min;

function timerStarts() {
  // If a user is quick enough, they can restart the game faster than the completion of each setInterval and the timer will be run twice.
  // We can return early to fix this.

  if (timer) return;

  let start = Date.now();
  timer = setInterval(function() {
    sec = Math.round((Date.now() - start) / 1000) % 60;
    min = Math.round((Date.now() - start) / 1000) / 60;
    min = Math.floor(min);

    if (sec.toString().length == 1 && min.toString().length == 1) {
      document.getElementById("timer").innerHTML = "0" + min + ":0" + sec;
    }

    if (sec.toString().length == 2 && min.toString().length == 1) {
      document.getElementById("timer").innerHTML = "0" + min + ":" + sec;
    }
    if (sec.toString().length == 1 && min.toString().length == 2) {
      document.getElementById("timer").innerHTML = min + ":0" + sec;
    }

    if (sec.toString().length == 2 && min.toString().length == 2) {
      document.getElementById("timer").innerHTML = min + ":" + sec;
    }

    //stops when all cards are matched
    if ($(".card.match").length === 16) {
      clearInterval(timer);
    }
  }, 1000);
}

//calculate stars
let starsNum;

function calculateStars(movecount) {
  if (movecount < 20) {
    starsNum = 3;
  }

  if (movecount >= 20 && movecount < 38) {
    document.getElementById("No3").style.display = "none";
    starsNum = 2;
  }
  if (movecount >= 38) {
    document.getElementById("No3").style.display = "none";
    document.getElementById("No2").style.display = "none";
    starsNum = 1;
  }
}

//function for modal
function toggleOverlay() {
  const modal = document.getElementById("overlay");

  if (modal.style.visibility == "visible") {
    modal.style.visibility = "hidden";
    //enable restart button
    restart.addEventListener("click", startAgain);
  } else {
    modal.style.visibility = "visible";
    //disable restart button
    restart.removeEventListener("click", startAgain);
  }
}

function flipCard(card) {
  if (card.classList.contains("open", "show")) {
    card.classList.remove("notmatch", "open", "show");
  } else {
    card.classList.add("open", "show");
  }
}

function increaseMoveCounter() {
  movecount = movecount + 1;
  if (movecount == 1) {
    counter.innerHTML = movecount + " Move";
  } else {
    counter.innerHTML = movecount + " Moves";
  }
}

function finishGame() {
  if (starsNum == 3) {
    document.getElementById("overlay").querySelector("h3").textContent =
      "Excellent";
    document.getElementById("overlay").querySelector("p").textContent =
      "Your time was " +
      min +
      ":" +
      sec +
      " and you won " +
      starsNum +
      " Stars";
  } else if (starsNum == 2) {
    document.getElementById("overlay").querySelector("h3").textContent =
      "Well done";
    document.getElementById("overlay").querySelector("p").textContent =
      "Your time was " +
      min +
      ":" +
      sec +
      " and you won " +
      starsNum +
      " Stars";
  } else if (starsNum == 1) {
    document.getElementById("overlay").querySelector("h3").textContent =
      "Nice try";
    document.getElementById("overlay").querySelector("p").textContent =
      "Your time was " + min + ":" + sec + " and you won " + starsNum + " Star";
    document.getElementById("overlay").querySelector("button").textContent =
      "Try again";
  }

  toggleOverlay();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let movecount = 0;

initialiseGameBoard();

function initialiseClickActions() {
  const deck = document.getElementById("game-board");

  deck.addEventListener("click", function(evt) {
    // check that the target clicked is indeed a card. Could be the deck or some empty space
    if (evt.target.tagName === "LI") {
      const currentCard = evt.target;
      let anotherCard;
      let isCardAlreadyOpen = currentCard.classList.contains("open", "show");

      //timer starts
      if (document.getElementById("timer").innerHTML == "00:00") {
        timerStarts();
      }

      flipCard(currentCard);

      //increase move count
      increaseMoveCounter();
      //calculate stars
      calculateStars(movecount);

      //checks if the currentCard is already open
      if (isCardAlreadyOpen) {
        return;
      }

      //checks if there is 2nd card
      if ($(".card.open.show").length === 2) {
        //checks if first or current card is open
        if ($(".card.open.show").has(currentCard)) {
          //define anotherCard
          if ($(".card.open.show")[0] === currentCard) {
            anotherCard = $(".card.open.show")[1];
          } else {
            anotherCard = $(".card.open.show")[0];
          }

          // have cards the same icon? (matched)
          if (
            anotherCard.querySelector("i").className ===
            currentCard.querySelector("i").className
          ) {
            anotherCard.classList.add("match");
            currentCard.classList.add("match");
            flipCard(anotherCard);
            flipCard(currentCard);

            // if all cards are matched
            if ($(".card.match").length === 16) {
              finishGame();
            }
          } else {
            //add notmatch class
            anotherCard.classList.add("notmatch");
            currentCard.classList.add("notmatch");
          }

          //close both open cards
          setTimeout(function() {
            anotherCard.classList.remove("notmatch", "open", "show");
            currentCard.classList.remove("notmatch", "open", "show");
          }, 500);
        }
      }
    }

    return movecount;
  });
}
