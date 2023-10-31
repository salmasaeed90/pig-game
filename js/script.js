//select all element to here
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceImgEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

// btnHold.onclick = function () {
//   btnHold.classList.add("active");
// };
let scores, currentscore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  // if the mode of game is playing{true} all buttons will work
  playing = true;
  //2/ current => 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  //3/scores => 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceImgEl.classList.add("hidden");
  //4/remove winner player mode
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  //5/add active to player (0)
  player0El.classList.add("player--active");
  player1El.classList.remove("player--winner");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  // if the mode of game is playing all buttons will work
  if (playing) {
    //generate a rondom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceImgEl.classList.remove("hidden");
    diceImgEl.src = `images/dice-${dice}.png`;

    // check if rolled is (1)
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  // btnHold.addClass("active");
  if (playing) {
    // 1.add cuttrent score to active player`s score
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  2. check if active player`s score >=100
    if (scores[activePlayer] >= 20) {
      // => finish the Game
      playing = false;
      diceImgEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // => switch the game
      switchPlayer();
    }
  }
});

//to reset the game
//1/ click on btnNew
btnNew.addEventListener("click", init);
