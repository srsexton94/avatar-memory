function cloneCard(boardSize = 4) {
  const numberOfCopies = boardSize ** 2;
  const cardEl = document.querySelector(".card");
  const boardEl = document.querySelector(".board");

  boardEl.innerHTML = "";

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

function togglePlayer() {
  const [name1, name2] = ["Player One", "Player Two"];
  const playerNameEl = document.querySelector(".player-name");

  if (playerNameEl.innerHTML === name1) {
    playerNameEl.innerHTML = name2;
  } else {
    playerNameEl.innerHTML = name1;
  }
}

function expandCollapse() {
  const footerEl = document.querySelector("footer");
  const buttonEl = document.querySelector(".expand-collapse");
  const contentEl = document.querySelector("footer .content");

  if (buttonEl.innerHTML === "Collapse") {
    footerEl.style.bottom = "-5rem";
    contentEl.setAttribute("aria-hidden", "true");
    buttonEl.innerHTML = "Expand";
  } else {
    footerEl.style.bottom = "0";
    contentEl.setAttribute("aria-hidden", "false");
    buttonEl.innerHTML = "Collapse";
  }
}

function toggleGame() {
  const gameToggleEl = document.querySelector(".game-toggle");
  const selectEl = document.querySelector("#game-board-size");

  if (gameToggleEl.innerHTML === "Start Game") {
    gameToggleEl.innerHTML = "Quit Game";
    selectEl.disabled = true;
    expandCollapse();
  } else {
    gameToggleEl.innerHTML = "Start Game";
    selectEl.disabled = false;
  }
}

cloneCard(); // 4, 6, 8, 10, 12, 14

document
  .querySelector(".expand-collapse")
  .addEventListener("click", expandCollapse);

document.querySelector(".game-toggle").addEventListener("click", toggleGame);
