'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const players = document.querySelectorAll('.player');

// Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;

let currentScore = 0;

let scores = [0, 0];
let activePlayer = 0;

let playing = true;

diceEl.classList.add('hidden');

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling the dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.ceil(Math.random() * 6);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];

    // Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore = 0;

  scores = [0, 0];

  playing = true;

  diceEl.classList.add('hidden');

  activePlayer = 0;

  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;


  for (let player of players) {
    player.classList.remove('player--winner');
  }

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');

});
