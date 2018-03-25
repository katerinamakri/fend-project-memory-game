/*
 * Create a list that holds all of your cards
 */

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

	//reset star rating

	//reset move counter
});


function initialiseGameBoard() {
	const icons = ["fa-anchor","fa-anchor", "fa-paper-plane-o","fa-paper-plane-o", "fa-diamond","fa-diamond", "fa-cube","fa-cube", "fa-leaf","fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle", "fa-bolt", "fa-bolt"]

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
let counter = 0;

function initialiseClickActions() {
	const deck = document.getElementById('game-board');

	deck.addEventListener('click', function(evt) {

		if(evt.target.tagName === "LI"){
			const currentCard = evt.target;
			let flag = true;
			var notCurrentCard;
		   
			//checks if the currentCard is open
			if (currentCard.classList.contains('open', 'show')){
				   
			   //increase move counter
				counter = counter + 1;
				document.getElementById("counter").textContent = counter;
				//close card
				currentCard.classList.remove('open','show');
				
				flag = false;
				console.log (currentCard)
			}; 
			
			if (flag === true){
				//open card
				currentCard.classList.add('open', 'show');  


				// console.log(currentCard)    

				//increace counter
				counter = counter + 1;
				// if (counter === 1){
				//     document.getElementById("counter").textContent = counter + " Move";
				// }                
				document.getElementById("counter").textContent = counter;
				//calculate stars
				/*
				 * code
				 * 
				 * */
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
					if(notCurrentCard /*&& !(notCurrentCard.classList.contains('match'))*/) {    	

						// have cards the same icon? (matched)
						if (notCurrentCard.querySelector("i").className === currentCard.querySelector("i").className) {
							notCurrentCard.classList.remove('open','show')
							notCurrentCard.classList.add('match')
							currentCard.classList.remove('open','show')
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
						}, 1000);
					}

					// console.log(notCurrentCard)
				}
			} 

		}

	});
}




