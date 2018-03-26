/*
 * Create a list that holds all of your cards
 */

const icons = ["fa-anchor","fa-anchor", "fa-paper-plane-o","fa-paper-plane-o", "fa-diamond","fa-diamond", "fa-cube","fa-cube", "fa-leaf","fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle", "fa-bolt", "fa-bolt"]

//reset board game
function generateCardTable(icons) {
	//shuffle icons array
	const cards = shuffle(icons)
	var uiCards = document.getElementsByClassName("card")

	for (var i = 0; i < cards.length; i++) {
		var card = uiCards[i]
		card.innerHTML = '<i class="fa ' + cards[i] + '"></i>'
		//close card
		card.className = "card"
	}

	return uiCards
}


//restart button
const restart = document.getElementById('button');

restart.addEventListener('click', function() {
	
	//reset board game
	generateCardTable(icons);

	//reset timer
	clearInterval(timer);
	timer = null

	// timer = 0
	// console.log('it works!')
	document.getElementById('timer').innerHTML = '00:00';

	
	//reset star rating
	document.getElementById("No3").style.display = "inline-block";
	document.getElementById("No2").style.display = "inline-block";

	//reset move counter
	resetCounter();
});

//reset move counter
const counter = document.getElementById("counter");

function resetCounter(){
	movecount = 0
	counter.textContent = movecount;
}

//timer BUGS
let timer;

function timerStarts(){

	// If a user is quick enough, they can restart the game faster than the completion of each setInterval and the timer will be run twice.
	// We can return early to fix this.
	
	if(timer) return;

	let start = Date.now();
    timer = setInterval(function(){

    	let sec = Math.round((Date.now() - start) / 1000) % 60;
		let min = Math.round((Date.now() - start) / 1000) / 60;
		min = Math.floor(min)


    	if (sec.toString().length == 1 && (min.toString().length == 1)){
    		document.getElementById('timer').innerHTML = '0' + min + ':0' + sec;
    	}
    	
    	if (sec.toString().length == 2 && (min.toString().length == 1)){

    		document.getElementById('timer').innerHTML = '0' + min + ':' + sec;
    	}
    	if (sec.toString().length == 1 && (min.toString().length == 2) ){

    		document.getElementById('timer').innerHTML = min + ':0' + sec;
    	}   
    	
    	if (sec.toString().length == 2 && (min.toString().length == 2) ){

    		document.getElementById('timer').innerHTML = min + ':' + sec;
    	}  

        //stops when all cards are matched
        if ($(".card.match").length === 16) {
            clearInterval(timer);
        }

    }, 1000);

}

//calculate stars NOT WORKING
function stars(count){

	if (movecount >= 16 && movecount <= 32) {
		document.getElementById("No3").style.display = "none";
		// console.log('it works!')
		// $('.score-panel .stars li')[2].css("display","none")

	} 
	if (movecount >= 33 && movecount <= 48) {
		document.getElementById("No3").style.display = "none";
		document.getElementById("No2").style.display = "none";
		// $('.score-panel .stars li')[1].css("display","none")
		
	} 
}



function initialiseGameBoard() {
	
	const cards = generateCardTable(icons)
	initialiseClickActions()
}

initialiseGameBoard()

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let movecount = 0;

function initialiseClickActions() {
	const deck = document.getElementById('game-board');

	deck.addEventListener('click', function(evt) {

		if(evt.target.tagName === "LI"){
			const currentCard = evt.target;
			var notCurrentCard;

			//timer starts
			if (document.getElementById('timer').innerHTML =='00:00'){
				timerStarts();
			}

		   
			//checks if the currentCard is open
			if (currentCard.classList.contains('open', 'show')){
				   
			   //increase move count
				movecount = movecount + 1;
				counter.textContent = movecount;
				//close card
				currentCard.classList.remove('open','show');

				//calculate stars
				stars(movecount);				
				
				// console.log (currentCard)
			} else {

				//open card
				currentCard.classList.add('open', 'show');  

				//increace count
				movecount = movecount + 1;
				counter.textContent = movecount;

				//calculate stars
				stars(movecount);
			}

			//checks if there is 2nd card
			if($(".card.open.show").length === 2){

				//checks if first or current card is open
				if ( $(".card.open.show")[0] === currentCard ||  $(".card.open.show")[1] === currentCard ){

					//define notCurrentCard
					if ($(".card.open.show")[0] === currentCard){
					   notCurrentCard = $(".card.open.show")[1]
					}
					if ($(".card.open.show")[1] === currentCard){
					   notCurrentCard = $(".card.open.show")[0]
					}
					
					// check if notCurrentCard is open and not
					if(notCurrentCard ) {    	

						// have cards the same icon? (matched)
						if (notCurrentCard.querySelector("i").className === currentCard.querySelector("i").className) {
							// notCurrentCard.classList.remove('open','show')
							notCurrentCard.classList.add('match')
							// currentCard.classList.remove('open','show')
							currentCard.classList.add('match')
						}

						//add notmatch class				
						if (!notCurrentCard.classList.contains('match') && !currentCard.classList.contains('match')){
							notCurrentCard.classList.add('notmatch')
							currentCard.classList.add('notmatch')
						}

						//close both open cards
						setTimeout(function () {
							notCurrentCard.classList.remove('notmatch','open','show')
							currentCard.classList.remove('notmatch','open','show') 
						}, 500);
					}

					// console.log(notCurrentCard)
				}

			} 

			// // if all cards are matched
			// if ($(".card.match").length === 16){
			// 	//timer stops
			// 	timerStops()
			// }

		}

		return movecount;

	});
}

