function cloneCard(boardSize = 4) {
  const numberOfCopies = boardSize ** 2 - 1;
  const cardEl = document.querySelector(".card");
  const boardEl = document.querySelector(".board");

  if (boardSize > 8) {
    cardEl.style.height = "5vw";
    cardEl.style.width = "5vw";
  }

  for (let i = 0; i < numberOfCopies; i++) {
    const clonedElement = cardEl.cloneNode(true);
    boardEl.appendChild(clonedElement);
  }

  boardEl.style["grid-template-columns"] = `repeat(${boardSize}, 1fr)`;
}

cloneCard(14); // 4, 6, 8, 10, 12, 14
