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
let simonSequence = [];

// Simon sequence random num generator
function randomNum(num) {
  for (let i = 0; i < num; i++) {
    let genNum = Math.floor(Math.random() * 31);
    simonSequence.push(genNum);
  }
}

randomNum(2);
console.log(simonSequence);
