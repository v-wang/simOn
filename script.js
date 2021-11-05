// get all individual color pieces
const colorPieces = document.querySelectorAll(".color-piece");
console.log(colorPieces);

colorPieces.forEach((cPiece) => {
  cPiece.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

// Simon Sequence Generator
