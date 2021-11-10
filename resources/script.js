// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
// console.log(colorPieces);

// get new game button
const newGameButton = document.querySelector("#new-game");

// get start over button
const startOverButton = document.querySelectorAll(".start-over");

// get modal holder
const modalHolder = document.querySelector("#modal-holder");

// global timer elem
let timerElemTime = document.querySelector("#timer");

startOverButton.forEach((button) => {
  button.addEventListener("click", () => {
    modalHolder.classList.toggle("hide");
    if (
      button.parentElement.parentElement.getAttribute("id") == "welcome-back"
    ) {
      welcomeBackModal.classList.toggle("hide");
    } else if (
      button.parentElement.parentElement.getAttribute("id") == "game-over"
    ) {
      gameOverModal.classList.toggle("hide");
    }
    localStorage.clear();
    levelElem.innerText = playerLevel;
    scoreNumElem.innerText = 0;
    timerElemTime.innerText = 5;
  });
});

// get welcome back modal
const welcomeBackModal = document.querySelector("#welcome-back");

// get game over modal
const gameOverModal = document.querySelector("#game-over");

// SIMON SIDE
// NOTE: The following lines are related to Simon and covers basic functionality of the game. Random numbers are being created. Those numbers are being translated to color strings.

// GLOBAL VARIABLES RELATED TO SIMON
// starting sequence length for simon sequence
let seqLength = 2;

// simon number sequence holder
let simonNumSequence = [];

// simon color sequence holder
let simonColorSequence = [];

// the index used to check player selection against simon sequence
let simonIndex = 0;

// NUMBER GENERATION BLOCK
// part 1 of creating simon sequence
// Simon sequence random num generator
function randomNumGen(count) {
  for (let i = 0; i < count; i++) {
    // random num is multipled by 31 to increase outcome of color
    let genNum = Math.floor(Math.random() * 31);
    simonNumSequence.push(genNum);
  }
  return simonNumSequence;
}

// COLOR TRANSLATION BLOCK
// part 2 of creating simon sequence
// translating number sequence into color sequence
// tweak ranges later to change probability - can make range variables that change by level
function numToColor(arr) {
  let colorSequence = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 0 && arr[i] <= 5) {
      arr[i] = "purple";
      colorSequence.push(arr[i]);
    } else if (arr[i] > 5 && arr[i] <= 10) {
      arr[i] = "orange";
      colorSequence.push(arr[i]);
    } else if (arr[i] > 10 && arr[i] <= 15) {
      arr[i] = "red";
      colorSequence.push(arr[i]);
    } else if (arr[i] > 15 && arr[i] <= 20) {
      arr[i] = "blue";
      colorSequence.push(arr[i]);
    } else if (arr[i] > 20 && arr[i] <= 25) {
      arr[i] = "yellow";
      colorSequence.push(arr[i]);
    } else if (arr[i] > 25 && arr[i] <= 30) {
      arr[i] = "green";
      colorSequence.push(arr[i]);
    }
  }
  return colorSequence;
}

// RUN BLOCK
// part 3 of creating simon sequence
// putting it all together (num gen and translation)
function runSequence() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (true) {
        let randomNums = randomNumGen(seqLength);
        let colorArray = numToColor(randomNums);
        resolve(colorArray);
      }
    });
  });
}

// COLOR FLASHING EFFECT FOR PIECES
function animateColor(color) {
  color.classList.add("shimmer");
  setTimeout(() => {
    color.classList.toggle("shimmer");
  }, 500);
}

// PLAYER SIDE
// NOTE: Checking each element of simons sequence and progressing the player, or reset

// GLOBAL VARIABLES RELATED TO PLAYER
// get score num element
let scoreNumElem = document.querySelector("#score-num");

// get level elem
let levelElem = document.querySelector("#level");

// player level - default set to level 1
let playerLevel = 1;

// player score - default set to 0
let playerScore = 0;

// timer
let timeLeft = 5;
let timer;
function startTimer(max) {
  let timerElem = document.querySelector("#timer");
  timer = setInterval(() => {
    if (max <= 0) {
      gameOver();
      clearInterval(timer);
    }
    timerElem.innerText = max;
    max -= 1;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  return startTimer(timeLeft);
}

function gameOver() {
  modalHolder.classList.toggle("hide");
  gameOverModal.classList.toggle("hide");
  newGameButton.classList.toggle("bounce");
}

// MAIN BLOCK FOR GAME LOGIC
// checks if player color selection is correct
function seqChecker(piece) {
  // getting color id, ex: "blue"
  let cPieceValue = piece.getAttribute("id");

  // checking player color selection against simon
  if (cPieceValue == simonColorSequence[simonIndex]) {
    resetTimer();

    // if it's the last color to check, move on to next round
    if (simonIndex == simonColorSequence.length - 1) {
      console.log("nice, you won this round! get ready for the next one!");
      clearInterval(timer);

      // update player score after win
      playerScore += 10;
      playerLevel += 1;
      scoreNumElem.innerText = playerScore;
      levelElem.innerText = playerLevel;

      // setting next level and increasing difficulty
      if (playerLevel % 3 == 0) {
        seqLength += 1;
      }

      saveToLocal();

      setTimeout(() => {
        runSequence()
          .then((arr) => {
            return new Promise((resolve) => {
              colorPieces.forEach((color, i) => {
                disableClick(color);
                if (i == colorPieces.length - 1) {
                  resolve(arr);
                }
              });
            });
          })
          .then((arr) => {
            return new Promise((resolve) => {
              arr.forEach((color, i) => {
                let colorElem = document.querySelector(`#${color}`);
                let note = colorElem.getAttribute("data");
                let noteElem = document.querySelector(`#${note}`);
                setTimeout(() => {
                  noteElem.play();
                  animateColor(colorElem);
                  if (i == arr.length - 1) {
                    colorPieces.forEach((color) => enableClick(color));

                    resolve(arr);
                  }
                }, 1000 * i);
              });
            });
          })
          .then((arr) => {
            // setTimeout(() => {
            startTimer(timeLeft);
            // }, 800);
            simonColorSequence = arr;
            console.log(simonColorSequence);
            return (simonIndex = 0);
          });
      }, 2000);
    }
    return simonIndex++;
  } else {
    clearInterval(timer);
    localStorage.clear();
    // wrong color choice - player losers
    modalHolder.classList.toggle("hide");
    gameOverModal.classList.toggle("hide");
    newGameButton.classList.toggle("bounce");

    simonColorSequence = [];
    return (simonIndex = 0);
  }
}

// prevent click event while simon goes
function disableClick(color) {
  color.classList.toggle("prevent-click");
}

// readd click event
function enableClick(button) {
  button.classList.toggle("prevent-click");
}

// START NEW GAME ON CLICK
newGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  colorPieces.forEach((color) => disableClick(color));
  disableClick(newGameButton);
  // in case user clicks new game button multiple times
  // stop timer & reset
  clearInterval(timer);
  timerElemTime.innerText = 5;

  // remove bounce effect
  newGameButton.classList.toggle("bounce");

  // reset score and level
  seqLength = 2;
  scoreNumElem.innerText = 0;
  levelElem.innerText = 1;

  runSequence()
    .then((arr) => {
      return new Promise((resolve) => {
        arr.forEach((color, i) => {
          let colorElem = document.querySelector(`#${color}`);
          let note = colorElem.getAttribute("data");
          let noteElem = document.querySelector(`#${note}`);
          setTimeout(() => {
            noteElem.play();
            animateColor(colorElem);
          }, 1000 * i);
          if (i == arr.length - 1) {
            resolve(arr);
          }
        });
      });
    })
    .then((arr) => {
      enableClick(newGameButton);
      colorPieces.forEach((color) => enableClick(color));
      startTimer(timeLeft);

      simonColorSequence = arr;
      console.log(simonColorSequence);
      return simonColorSequence;
    });
});

colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();

    if (simonColorSequence.length < 2) {
      console.log("start a new game first");
    } else {
      // play sound
      let notePiece = cPiece.getAttribute("data");
      document.getElementById(notePiece).play();

      seqChecker(cPiece);
    }
  });
});

// SAVING GAME DATA LOCALLY
// getting current status of the game
function getCurrentStats() {
  let currentLevel = levelElem.innerText;
  let currentScore = scoreNumElem.innerText;
  return { level: `${currentLevel}`, score: `${currentScore}`, seq: seqLength };
}

// save locally
function saveToLocal() {
  let currentStats = getCurrentStats();
  localStorage.setItem("level", `${currentStats.level}`);
  localStorage.setItem("score", `${currentStats.score}`);
  localStorage.setItem("seq", `${currentStats.seq}`);
}

// get local info after saving
function getLocal() {
  let lastLevel = localStorage.getItem("level");
  let lastScore = localStorage.getItem("score");
  let lastSeq = localStorage.getItem("seq");
  return { level: `${lastLevel}`, score: `${lastScore}`, seq: `${lastSeq}` };
}

// conditional to see if data exists to resume game
// if not, start new game
function resumeGameChecker() {
  let localData = getLocal();
  if (localData.level.includes("null")) {
    console.log("no record");
  } else {
    modalHolder.classList.toggle("hide");
    welcomeBackModal.classList.toggle("hide");
    levelElem.innerText = localData.level;
    scoreNumElem.innerText = localData.score;
  }
}
resumeGameChecker();

// TODO: refactor this and add to 'new button'
// CONTINUING THE GAME
const contGameButton = document.querySelector("#continue-game");

contGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  modalHolder.classList.toggle("hide");
  welcomeBackModal.classList.toggle("hide");

  // stop timer & reset
  // clearInterval(timer);
  timerElemTime.innerText = 5;

  // remove bounce effect
  newGameButton.classList.toggle("bounce");

  // set last stats
  let resumeStats = getLocal();
  seqLength = parseInt(resumeStats.seq);
  playerLevel = parseInt(resumeStats.level);
  playerScore = parseInt(resumeStats.score);
  scoreNumElem.innerText = resumeStats.score;
  levelElem.innerText = resumeStats.level;

  setTimeout(() => {
    runSequence()
      .then((arr) => {
        return new Promise((resolve) => {
          arr.forEach((color, i) => {
            let colorElem = document.querySelector(`#${color}`);
            let note = colorElem.getAttribute("data");
            let noteElem = document.querySelector(`#${note}`);
            setTimeout(() => {
              noteElem.play();
              animateColor(colorElem);
              if (i == arr.length - 1) {
                resolve(arr);
              }
            }, 1000 * i);
          });
        });
      })
      .then((arr) => {
        setTimeout(() => {
          startTimer(timeLeft);
        }, 800);
        simonColorSequence = arr;
        console.log(simonColorSequence);
        return simonColorSequence;
      });
  }, 2000);
});
