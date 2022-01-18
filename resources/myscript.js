
var gameOver, scores_main, scores_current, dice_num_0, dice_num_1, active_player;
var dices = document.querySelectorAll('.dice');


// Initializing the game
function init(){
	gameOver = false;
	scores_main = [0,0];
	document.getElementById('main-score-0').textContent = 0;
	document.getElementById('main-score-1').textContent = 0;

	scores_current = [0,0];
	document.getElementById('current-score-0').textContent = 0;
	document.getElementById('current-score-1').textContent = 0;

	dices[0].style.display = 'none';
	dices[1].style.display = 'none';

	document.querySelector("#player-panel-1").classList.remove("active");
	document.querySelector("#player-panel-0").classList.add("active");

	active_player = 0;	

	document.querySelector("#btn-roll").classList.remove('inactive');
	document.querySelector("#btn-hold").classList.remove('inactive');
	document.querySelector("#winner-0").style.display = 'none';
	document.querySelector("#winner-1").style.display = 'none';
	
	
}




function play(){
	//New Game
	document.querySelector('#btn-new-game').addEventListener('click', function(){
		main();
		return;
	})

	//Rolling the Dice
	document.querySelector('#btn-roll').addEventListener('click', function(){
		if (!gameOver){
			//Dice
			//Dice Random Number
			dice_num_0 = Math.floor((Math.random() * 6) + 1);
			dice_num_1 = Math.floor((Math.random() * 6) + 1);

			dices[0].src = 'resources/img/dice-' + dice_num_0 + '.png';	
			dices[1].src = 'resources/img/dice-' + dice_num_1 + '.png';	
			dices[0].style.display = 'inline-block';
			dices[1].style.display = 'inline-block';

			//Loosing (Toggling Active Player)
			if (dice_num_0 === dice_num_1) {
				toggleActivePlayer();

			} else{
				//Changing Current Score
				scores_current[active_player] += (dice_num_0 + dice_num_1);     
				document.getElementById('current-score-'+active_player).textContent = scores_current[active_player];
			}
		}

	});

	// Hold
	document.getElementById("btn-hold").addEventListener('click', function(){
		if (!gameOver) {
			//Updating Main Score
			scores_main[active_player] += scores_current[active_player];
			document.getElementById('main-score-'+active_player).textContent = scores_main[active_player];

			//Wheather won on this turn
			if (scores_main[active_player] >= 20) {
				win();
			}else{
				//If not win, change player
				toggleActivePlayer();
			}
		}
	})


}

//Toggling Active Player
function toggleActivePlayer(){
	//Resseting Current Score
	scores_current[active_player] = 0;
	document.getElementById('current-score-'+active_player).textContent = scores_current[active_player];
			
	document.querySelector("#player-panel-1").classList.toggle("active");
	document.querySelector("#player-panel-0").classList.toggle("active"); 
	active_player = (active_player === 0) ? 1 : 0;
}

//Win
function win(){
	document.getElementById('winner-'+active_player).style.display = 'inline-block';
	document.getElementById('btn-roll').classList.add('inactive');
	document.getElementById('btn-hold').classList.add('inactive');
	gameOver = true;
}

function main(){
	init();
	play();
}

main();
