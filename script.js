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
  console.log(simonNumSequence);

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
let simonColorSequence = numToColor(randomNum(2));
console.log(simonColorSequence);

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

    if (cPieceValue == simonColorSequence[simonIndex]) {
      if (simonIndex == simonColorSequence.length - 1) {
        console.log("nice, you won this round!");
        simonColorSequence = numToColor(randomNum(2 + 1));
        return (simonIndex = 0);
      }
      return simonIndex++;
    } else {
      console.log("you got it wrong");
    }
  });
});

let playerPassSample = ["purple", "red"];
let playerFailSample = ["purple", "blue"];

// function seqChecker(seq1, seq2, value) {
//   for ()
// }
