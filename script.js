// DOM ELEMENTS

// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
// console.log(colorPieces);

// get new game button
const newGameButton = document.querySelector("#new-game");

// SIMON SIDE
// NOTE: The following lines are related to Simon and covers basic functionality of the game. Random numbers are being created. Those numbers are being translated to color strings.

// GLOBAL VARIABLES RELATED TO SIMON
// Simon sequence holder
let simonNumSequence = [];

// starting sequence length for Simon
let seqLength = 2;

// the index used to check player selection against simon sequence
let simonIndex = 0;

// generation block - part 1 of creating a sequence
// Simon sequence random num generator
function randomNumGen(count) {
  for (let i = 0; i < count; i++) {
    // random num is multipled by 31 to increase outcome of repeated color
    let genNum = Math.floor(Math.random() * 31);
    simonNumSequence.push(genNum);
  }
  return simonNumSequence;
}

// translation block - part 2 of creating a sequence
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

// run block - part 3 of creating a sequence
// putting it all together (num gen and translation)
function runSequence() {
  let randomNums = randomNumGen(seqLength);
  return numToColor(randomNums);
}

// generating simon sequence for first level
// will be updated to a longer sequence if player wins round
let simonColorSequence = runSequence();
console.log(simonColorSequence);

// PLAYER SIDE
// NOTE: Up to this point, Simon color sequence is already generated and awaiting user input to check

// checks if player color selection is correct
// 'slice' term is used to avoid excess use of 'color' and 'piece'
function seqChecker(slice) {
  // getting value, ex: "blue"
  let cPieceValue = slice.getAttribute("id");

  // checking player color selection against simon
  if (cPieceValue == simonColorSequence[simonIndex]) {
    if (simonIndex == simonColorSequence.length - 1) {
      console.log("nice, you won this round! get ready for the next one!");
      seqLength += 1;
      setTimeout(() => {
        simonColorSequence = numToColor(randomNumGen(seqLength));
        console.log(simonColorSequence);
      }, 3000);

      return (simonIndex = 0);
    }
    return simonIndex++;
  } else {
    console.log("you got it wrong, game over");
    seqLength = 2;

    simonColorSequence = numToColor(randomNumGen(seqLength));
    console.log(simonColorSequence);

    return (simonIndex = 0);
  }
}

// click event to start a new game
newGameButton.addEventListener("click", (event) => {
  event.preventDefault();
});

// click event added to each color piece for player functionality
colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();
    seqChecker(cPiece);
  });
});

// LEGACY (SAVE FOR BACKUP)
// // click event added to each color piece for player functionality
// colorPieces.forEach((cPiece) => {
//   cPiece.addEventListener("click", (event) => {
//     event.preventDefault();

//     // test to see if color being captured
//     // console.log(cPiece.getAttribute("id"));

//     let cPieceValue = cPiece.getAttribute("id");
//     // console.log(simonIndex);
//     // console.log(cPieceValue);
//     // console.log(simonStartColorSequence);

//     if (cPieceValue == simonStartColorSequence[simonIndex]) {
//       if (simonIndex == simonStartColorSequence.length - 1) {
//         console.log("nice, you won this round!");
//         sLength += 1;
//         // console.log(sLength);
//         simonStartColorSequence = numToColor(randomNum(sLength));
//         console.log(simonStartColorSequence);

//         return (simonIndex = 0);
//       }
//       return simonIndex++;
//     } else {
//       console.log("you got it wrong, game over");
//       sLength = 2;
//       // console.log((simonStartColorSequence = numToColor(randomNum(sLength))));
//       simonStartColorSequence = numToColor(randomNum(sLength));
//       console.log(simonStartColorSequence);
//       return (simonIndex = 0);
//     }
//     // running into issue with app recognizing user input on new sequence (says its wrong even though it looks right in cl)

//     // console.log(simonIndex);
//     // console.log(cPieceValue);

//     // new color sequence needs to start here and shown to player
//   });
// });
