// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
// console.log(colorPieces);

// get new game button
const newGameButton = document.querySelector("#new-game");

// SIMON SIDE
// NOTE: The following lines are related to Simon and covers basic functionality of the game. Random numbers are being created. Those numbers are being translated to color strings.

// GLOBAL VARIABLES RELATED TO SIMON
// starting sequence length for Simon
let seqLength = 2;

// Simon sequence holder
let simonNumSequence = [];

// color sequence holder
let simonColorSequence = [];

// the index used to check player selection against simon sequence
let simonIndex = 0;

// GENERATION BLOCK
// part 1 of creating simon sequence
// Simon sequence random num generator
function randomNumGen(count) {
  for (let i = 0; i < count; i++) {
    // random num is multipled by 31 to increase outcome of repeated color
    let genNum = Math.floor(Math.random() * 31);
    simonNumSequence.push(genNum);
  }
  return simonNumSequence;
}

// TRANSLATION BLOCK
// part 2 of creating simon sequence
// translating number sequence into color sequence
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
  let randomNums = randomNumGen(seqLength);
  return numToColor(randomNums);
}

// COLOR FLASHING EFFECT
function animateColor(color) {
  color.classList.add("shimmer");
  setTimeout(() => {
    color.classList.toggle("shimmer");
  }, 500);
}

// PLAYER SIDE
// NOTE: Up to this point, Simon color sequence is already generated and awaiting user input to check

// GLOBAL VARIABLES RELATED TO PLAYER
// get score num
let scoreNumElem = document.querySelector("#score-num");

// MAIN BLOCK FOR GAME LOGIC
// checks if player color selection is correct
function seqChecker(slice) {
  // getting value, ex: "blue"
  let cPieceValue = slice.getAttribute("id");
  let scoreNum = parseInt(scoreNumElem.innerText);
  // checking player color selection against simon
  if (cPieceValue == simonColorSequence[simonIndex]) {
    if (simonIndex == simonColorSequence.length - 1) {
      console.log("nice, you won this round! get ready for the next one!");
      scoreNum += 10;
      scoreNumElem.innerText = scoreNum;
      seqLength += 1;

      simonColorSequence = numToColor(randomNumGen(seqLength));
      console.log(simonColorSequence);
      setTimeout(() => {
        simonColorSequence.forEach((color, i) => {
          let colorElem = document.querySelector(`#${color}`);
          setTimeout(() => {
            animateColor(colorElem);
          }, i * 1000);
        });
      }, 1500);

      return (simonIndex = 0);
    }
    return simonIndex++;
  } else {
    console.log("you got it wrong, game over");

    // test code to auto reset after loss
    // seqLength = 2;
    // simonColorSequence = numToColor(randomNumGen(seqLength));
    // console.log(simonColorSequence);

    return (simonIndex = 0);
  }
}

// START NEW GAME
newGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  scoreNumElem.innerText = 0;
  simonColorSequence = runSequence();
  console.log(simonColorSequence);
  setTimeout(() => {
    simonColorSequence.forEach((color, i) => {
      let colorElem = document.querySelector(`#${color}`);
      setTimeout(() => {
        animateColor(colorElem);
      }, i * 1000);
    });
  }, 1500);
});

// PLAYER COLOR SELECTION
colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();
    seqChecker(cPiece);
  });
});
