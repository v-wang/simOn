// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
console.log(colorPieces);

colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

// test simon sequence
let testSeq = [1, 2];

// Simon sequence holder
let simonNumSequence = [];

// Simon sequence random num generator
function randomNum(num) {
  for (let i = 0; i < num; i++) {
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

console.log(numToColor(randomNum(2)));

// translating player color sequence to number sequence
// function colorToNum(arr) {}
