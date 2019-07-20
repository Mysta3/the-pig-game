/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Global Declarations of variables*/
var scores, roundScores, activePlayer, gamePlaying, lastScore, winningScore; 

//sets everything to 0. 
init(); 

//Roll Dice Button functionality
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //Display Second Dice
        var diceDOM = document.querySelector('#dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        
        //challenge 1: if a player rolls 6 back to back they lose their score and turn
        if (dice === 6 && lastScore === 6){
            //Player losses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        
        //3. Update the round score IF the rolled number was NOT a 1
        } else if (dice !== 1 && dice2 !== 1) {
        
            //Add score
            roundScores += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            //Next player
            nextPlayer();
        }
        lastScore = dice; 

    }    
});

//hold button functionality 
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScores;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //get set score from input field
        var input = document.querySelector('#scoreLimit').value;
        
        //Undefined, 0, null or "" are COERCED to false
        //Anything else is coerced to true 
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//Change Player functionality
function nextPlayer() {
     //Next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
     //If activePlayer = 0 then activePlayer = 1 else activePlayer = 0
     roundScores = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';


     //change active player
     document.querySelector('.player-0-panel').classList.toggle("active");
     document.querySelector('.player-1-panel').classList.toggle("active");
     

     document.querySelector('.dice').style.display = 'none';
     document.querySelector('#dice2').style.display = 'none';
};


//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

//New game function
function init(){
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/*challenge 2: Add an input fild to the HTML where players can set
their winning score*/