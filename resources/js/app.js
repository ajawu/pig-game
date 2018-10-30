var scores, roundScore, activePlayer, gameActive;

scores = [0, 0]; //Players total score
roundScore = 0; //Round score for active player
activePlayer = 0;
gameActive = true;


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameActive) {
        // Roll Dice
        var firstDice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;
        var firstDiceDom = document.getElementById('dice-1');
        firstDiceDom.style.display = 'block';
        firstDiceDom.src = 'resources/img/dice-' + firstDice + '.png';
        var secondDiceDom = document.getElementById('dice-2');
        secondDiceDom.style.display = 'block';
        secondDiceDom.src = 'resources/img/dice-' + secondDice + '.png';

        // Switch player if score for two dice results in one
        if (firstDice !== 1 && secondDice !== 1) {
            roundScore += firstDice + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameActive) { // Update player score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var winningScore = document.getElementById('winning-score').value;
        if (!winningScore) {
            winningScore = 100;
        }

        // Check if player won the game then display winner or switch active player
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameActive = false;
        }
        else {
            switchPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    scores = [0, 0]; //Players total score
    roundScore = 0; //Round score for active player
    activePlayer = 0;
    gameActive = true;
    // Hide dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // Reset all elements to start state
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
});

function switchPlayer() {
    //Switch active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    //Reset roundscores
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Hide dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}