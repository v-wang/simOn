// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
console.log(colorPieces);

// click event added to each color piece for player functionality
colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

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

  let simonColorSequence = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 0 && arr[i] <= 5) {
      arr[i] = "purple";
      simonColorSequence.push(arr[i]);
    } else if (arr[i] > 5 && arr[i] <= 10) {
      arr[i] = "orange";
      simonColorSequence.push(arr[i]);
    } else if (arr[i] > 10 && arr[i] <= 15) {
      arr[i] = "red";
      simonColorSequence.push(arr[i]);
    } else if (arr[i] > 15 && arr[i] <= 20) {
      arr[i] = "blue";
      simonColorSequence.push(arr[i]);
    } else if (arr[i] > 20 && arr[i] <= 25) {
      arr[i] = "yellow";
      simonColorSequence.push(arr[i]);
    } else if (arr[i] > 25 && arr[i] <= 30) {
      arr[i] = "green";
      simonColorSequence.push(arr[i]);
    }
  }
  return simonColorSequence;
}

// test to see if numbers are translating correctly into an array of color strings
console.log(numToColor(randomNum(2)));

// PLAYER SIDE
// NOTE:

let playerPassSample = ["purple", "red"];
let playerFailSample = ["purple", "blue"];
