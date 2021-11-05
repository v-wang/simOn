// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
console.log(colorPieces);

// SIMON SIDE
// NOTE: The following lines are related to Simon and covers basic functionality of the game. Random numbers are being created. Those numbers are being translated to color strings.

// test simon sequence
let testSeq = [1, 16];

// Simon sequence holder
let simonNumSequence = [];

// Simon sequence random num generator
function randomNum(num) {
  for (let i = 0; i < num; i++) {
    // random num is multipled by 31 to increase outcome of repeated color
    let genNum = Math.floor(Math.random() * 31);
    simonNumSequence.push(genNum);
  }
  return simonNumSequence;
}

// translating number sequence into color sequence
function numToColor(arr) {
  // console.log(simonNumSequence);

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

// test to see if numbers are translating correctly into an array of color strings
// console.log(numToColor(randomNum(2)));
let sLength = 2;
let simonStartColorSequence = numToColor(randomNum(sLength));
console.log(simonStartColorSequence);

// PLAYER SIDE
// NOTE:

// so we know when the user clicks on a piece, we can align that with the right color in the sequence
let simonIndex = 0;

// click event added to each color piece for player functionality
colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();

    // test to see if color being captured
    // console.log(cPiece.getAttribute("id"));

    let cPieceValue = cPiece.getAttribute("id");
    // console.log(simonIndex);
    // console.log(cPieceValue);
    // console.log(simonStartColorSequence);

    if (cPieceValue == simonStartColorSequence[simonIndex]) {
      if (simonIndex == simonStartColorSequence.length - 1) {
        console.log("nice, you won this round!");
        sLength += 1;
        // console.log(sLength);
        simonStartColorSequence = numToColor(randomNum(sLength));
        console.log(simonStartColorSequence);

        return (simonIndex = 0);
      }
      return simonIndex++;
    } else {
      console.log("you got it wrong, game over");
      sLength = 2;
      // console.log((simonStartColorSequence = numToColor(randomNum(sLength))));
      simonStartColorSequence = numToColor(randomNum(sLength));
      console.log(simonStartColorSequence);
      return (simonIndex = 0);
    }
    // running into issue with app recognizing user input on new sequence (says its wrong even though it looks right in cl)

    // console.log(simonIndex);
    // console.log(cPieceValue);

    // new color sequence needs to start here and shown to player
  });
});

let playerPassSample = ["purple", "red"];
let playerFailSample = ["purple", "blue"];

// function seqChecker(seq1, seq2, value) {
//   for ()
// }
