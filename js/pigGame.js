//declaration of necessary variables
		var score, roundScore, activePlayer, winnerName, playerOneName, playerTwoName; 

		score = [0, 0];
		activePlayer = 0;
		roundScore = 0;

		//Hide everything 
		document.getElementById('score-0').style.display = 'none';
		document.getElementById('score-1').style.display = 'none';
		document.getElementById('btn-new').style.display = 'none';
		document.getElementById('btn-roll').style.display = 'none';
		document.getElementById('btn-hold').style.display = 'none';
		document.getElementById('name-0').style.display = 'none';
		document.getElementById('name-1').style.display = 'none';
		currentBox = document.getElementsByClassName('player-current-box');

		for(let i = 0; i < currentBox.length; i++){
			currentBox[i].style.display = 'none';
		}


		//Display the rules


		//Button Play
		document.getElementById('play').addEventListener('click', ()=>{
			//Hide the rules
			document.getElementById('rules').style.display = 'none';
			//Get player name and display them in the UI
			playerOneName = prompt(" Player 1 : ");
			playerTwoName = prompt(" Player 2 : ");

			//Display the scores back into the UI
			document.getElementById('score-0').style.display = 'block';
			document.getElementById('score-1').style.display = 'block';
			document.getElementById('btn-hold').style.display = 'block';
			document.getElementById('btn-roll').style.display = 'block';
			document.getElementById('btn-new').style.display = 'block';
			document.getElementById('name-0').style.display = 'block';
			document.getElementById('name-1').style.display = 'block';
			document.getElementById("name-0").textContent = playerOneName;
			document.getElementById("name-1").textContent = playerTwoName;

			let boxes = document.getElementsByClassName('player-current-box');
			for(let j = 0; j < boxes.length; j++){
				boxes[j].style.display = 'block';
			} 
		});

		

		//Hide the dice at the beginning of the game
		document.getElementById('dice').style.display = 'none';



		//switch player function

		function switchPlayer(){
			//Next player
			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
			roundScore = 0;

			//Clear the current scores when switching players
			document.getElementById('current-0').textContent = 0;
			document.getElementById('current-1').textContent = 0;

			//toggle the Active class according the active player
			document.querySelector('.player-0-panel').classList.toggle('active');
			document.querySelector('.player-1-panel').classList.toggle('active'); 

			// Hide the dice for the next player to start afresh
			document.getElementById('dice').style.display = 'none';
		}

		//ROLL BUTTON 
		document.getElementById('btn-roll').addEventListener('click', function(){
		
		//generate a random number for the dice
		var dice = Math.floor(Math.random() * 6 ) + 1;

		//display the results
		var diceDOM = document.getElementById('dice');
		diceDOM.style.display = 'block';

		//display the image
		diceDOM.src = 'images/dice-' + dice + '.png';

		//update the round score IFF the rolled number is NOT equal to 1
		if (dice > 1) {
			//Add score
			roundScore += dice;
			//display the score in the UI
			document.getElementById('current-' + activePlayer).innerHTML = roundScore; 
		} else{
			//Next player
			switchPlayer();
		}

		});

		//Button HOLD

		document.getElementById('btn-hold').addEventListener('click', function(){
			// Add current score to global score
			score[activePlayer] += roundScore;

			//update the UI
			document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
			document.getElementById('current-' + activePlayer).textContent = '0';


			//CHECK FOR WINNER

			if (score[activePlayer] >= 100) {
				//This player has won
				winnerName = document.getElementById('name-' + activePlayer).textContent;
				//Display the winner's name on the UI
				document.getElementById('name-' + activePlayer).textContent = winnerName +' won the game.';
				document.getElementById('name-' + activePlayer).style.color = '#964f8e';
				document.getElementById('name-' + activePlayer).style.fontSize = '50px';
				//Display the explosion image after we have a winner
				document.getElementById('dice').src = 'images/happy3.gif';
				//Remove the active class from the winner's panel
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.getElementById('btn-roll').style.display = 'none';
				document.getElementById('btn-hold').style.display = 'none';
				//Remove the local score 
				removeScores();
				alert(" We have a winner!!! ");
			} else{
				//Next player
				switchPlayer();
			}
		});

		//New Game button
		document.getElementById('btn-new').addEventListener('click', function(){
			
			//clear the scores from the UI
			document.getElementById('current-0').textContent = 0;
			document.getElementById('current-1').textContent = 0;
			document.getElementById('score-0').textContent = 0;
			document.getElementById('score-1').textContent = 0;

			//Hide the dice
			document.getElementById('dice').style.display = 'none';

			//Get player name and display them in the UI
			playerOneName = prompt(" Player 1 : ");
			playerTwoName = prompt(" Player 2 : ");

			document.getElementById("name-0").textContent = playerOneName;
			document.getElementById("name-1").textContent = playerTwoName;

			//resurrect the Active class into the first player panel
			document.querySelector('.player-0-panel').classList.add('active');
			//make sure to REMOVE the Active class from the second player panel
			document.querySelector('.player-1-panel').classList.remove('active');

			//restore the name of last game's winner
			if (activePlayer === 0) {
				//Player ONE is the winner of the last game
				document.getElementById('name-' + activePlayer).textContent = playerOneName;
				document.getElementById('name-' + activePlayer).style.color = 'black';
			}
			else{
				document.getElementById('name-' + activePlayer).textContent = playerTwoName;
				document.getElementById('name-' + activePlayer).style.color = 'black';
			}

			//display the Roll button
			document.getElementById('btn-roll').style.display = 'block';

			//display the hold button
			document.getElementById('btn-hold').style.display = 'block';
			//clear the scores from the array and restore Active player
			score[0] = 0;
			score[1] = 0;
			activePlayer = 0;
			roundScore = 0;

			//Display the score boxes
			restoreScores();

		});


		function removeScores(){
			let scores = document.getElementsByClassName('player-current-box');
			for(let i = 0; i < scores.length; i++){
				scores[i].style.display = 'none';
			}
		}

		function restoreScores(){
			let scores = document.getElementsByClassName('player-current-box');
			for(let i = 0; i < scores.length; i++){
				scores[i].style.display = 'block';
			}
		}