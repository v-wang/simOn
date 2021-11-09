// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
// console.log(colorPieces);

// get new game button
const newGameButton = document.querySelector("#new-game");

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
// function runSequence() {
//   let randomNums = randomNumGen(seqLength);
//   return numToColor(randomNums);
// }

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

// runSequence().then((arr) => {
//   console.log("done", arr);
// });

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
    }
    timerElem.innerText = max;
    max -= 1;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}

function gameOver() {
  resetTimer();
  alert("game over");
  newGameButton.classList.toggle("bounce");
}

// let t = 0;
// function timer(limit) {
//   let timerElem = document.querySelector("#timer");
//   for (let i = limit; i >= 0; i--) {
//     setTimeout(() => {
//       timerElem.innerText = i;
//     }, 1000 * t);
//     t += 1;
//   }
// }

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
      resetTimer();
      startTimer(timeLeft);
      console.log("nice, you won this round! get ready for the next one!");

      // update player score after win
      playerScore += 10;
      playerLevel += 1;
      scoreNumElem.innerText = playerScore;
      levelElem.innerText = `Level ${playerLevel}`;

      // setting next level and increasing difficulty
      seqLength += 1;
      // runSequence()
      //   .then((arr) => {
      //     arr.forEach((color, i) => {
      //       let colorElem = document.querySelector(`#${color}`);
      //       let note = colorElem.getAttribute("data");
      //       let noteElem = document.querySelector(`#${note}`);
      //       setTimeout(() => {
      //         noteElem.play();
      //         animateColor(colorElem);
      //       }, 1000 * i);
      //     });
      //   })
      //   .then(() => {
      //     setTimeout(() => {
      //       startTimer(timeLeft);
      //     }, 800);
      //   });

      simonColorSequence = numToColor(randomNumGen(seqLength));
      console.log(simonColorSequence);

      // small pause before colors light up
      setTimeout(() => {
        simonColorSequence.forEach((color, i) => {
          let colorElem = document.querySelector(`#${color}`);

          // play audio for simon sequence
          let note = colorElem.getAttribute("data");
          let noteElem = document.querySelector(`#${note}`);
          setTimeout(() => {
            noteElem.play();
            animateColor(colorElem);
          }, i * 1000);
        });
      }, 1500);

      return (simonIndex = 0);
    }
    return simonIndex++;
  } else {
    console.log("you got it wrong, game over");

    // TODO: work on lost modal
    alert("you lost!");
    newGameButton.classList.toggle("bounce");
    // test code to auto reset after loss
    // seqLength = 2;
    // simonColorSequence = numToColor(randomNumGen(seqLength));
    // console.log(simonColorSequence);

    return (simonIndex = 0);
  }
}

// START NEW GAME ON CLICK
newGameButton.addEventListener("click", (event) => {
  event.preventDefault();

  // remove bounce effect
  newGameButton.classList.toggle("bounce");

  // reset score and level
  seqLength = 2;
  scoreNumElem.innerText = 0;
  levelElem.innerText = "Level 1";

  // sync function - run immediately to get simon sequence
  // simonColorSequence = runSequence();
  // console.log(simonColorSequence);

  runSequence()
    .then((arr) => {
      arr.forEach((color, i) => {
        let colorElem = document.querySelector(`#${color}`);
        let note = colorElem.getAttribute("data");
        let noteElem = document.querySelector(`#${note}`);
        setTimeout(() => {
          noteElem.play();
          animateColor(colorElem);
        }, 1000 * i);
      });
      return arr;
    })
    .then((arr) => {
      setTimeout(() => {
        startTimer(timeLeft);
      }, 800);
      return arr;
    })
    .then((arr) => {
      simonColorSequence = arr;
      console.log(simonColorSequence);
      colorPieces.forEach((cPiece) => {
        cPiece.addEventListener("click", (event) => {
          event.preventDefault();

          // play sound
          let notePiece = cPiece.getAttribute("data");
          document.getElementById(notePiece).play();

          seqChecker(cPiece);
        });
      });
    });
  // // animate
  // // 1.5 sec delay after click for piece to flash
  // setTimeout(() => {
  //   simonColorSequence.forEach((color, i) => {
  //     let colorElem = document.querySelector(`#${color}`);

  //     // play audio for simon sequence
  //     let note = colorElem.getAttribute("data");
  //     let noteElem = document.querySelector(`#${note}`);

  //     // setting timeout so that it doesn't play all at once
  //     setTimeout(() => {
  //       noteElem.play();
  //       animateColor(colorElem);
  //     }, 1000 * i);
  //     // start timer

  //     startTimer(timeLeft);
  //   });
  // }, 1500);
});

// CHECK PLAYER COLOR CHOICES ON CLICK
// colorPieces.forEach((cPiece) => {
//   cPiece.addEventListener("click", (event) => {
//     event.preventDefault();

//     // play sound
//     let notePiece = cPiece.getAttribute("data");
//     document.getElementById(notePiece).play();

//     seqChecker(cPiece);
//   });
// });

// RESEARCH PROMISES

// function reader(arr) {
//   return new Promise((resolve) => {
//     arr.forEach((element, index) => {
//       setTimeout(() => {
//         console.log(element);
//         if (index == arr.length - 1) {
//           resolve();
//         }
//       }, 1000 * index);
//     });
//   });
// }

// reader(colors).then(() => {
//   console.log("done");
// });
