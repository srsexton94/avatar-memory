let images = [
  "aang1.webp",
  "aang2.jpg",
  "aang3.jpg",
  "appa1.webp",
  "azula1.jpeg",
  "cabbages1.avif",
  "elements1.jpg",
  "flying1.webp",
  "gang1.jpg",
  "gang2.webp",
  "gyatso.webp",
  "hama1.webp",
  "iroh1.jpeg",
  "iroh2.webp",
  "iroh3.png",
  "jeongjeong1.webp",
  "katara1.jpg",
  "katara2.webp",
  "momo1.webp",
  "ozai1.webp",
  "sokka1.webp",
  "sokka2.png",
  "toph1.jpg",
  "toph2.jpg",
  "yue1.webp",
  "zuko1.webp",
  "zuko2.webp",
];

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pairUpCards(numberOfPairs) {
  if (images.length < numberOfPairs) {
    const numToAdd = numberOfPairs - images.length;
    const cardsToAdd = images.slice(0, numToAdd);
    images = [...images, ...cardsToAdd];
    console.log(images.length, numberOfPairs);
  }
  const shuffledImages = shuffleCards(images);
  const cardsToPair = shuffledImages.slice(0, numberOfPairs);
  const pairedCards = [...cardsToPair, ...cardsToPair];

  return shuffleCards(pairedCards);
}

function setUpBoard(boardSize = 4) {
  const numberOfCopies = boardSize ** 2;
  const cardEl = document.querySelector(".card");
  const boardEl = document.querySelector(".board");

  const numberOfPairs = numberOfCopies / 2;
  const imagePairs = pairUpCards(numberOfPairs);

  boardEl.innerHTML = "";

  if (boardSize > 8) {
    cardEl.style.height = "5vw";
    cardEl.style.width = "5vw";
  }

  for (let i = 0; i < numberOfCopies; i++) {
    const clonedCard = cardEl.cloneNode(true);
    clonedCard.style.backgroundImage = `url("assets/${imagePairs[i]}")`;
    boardEl.appendChild(clonedCard);
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

setUpBoard(); // 4, 6, 8, 10

document
  .querySelector(".expand-collapse")
  .addEventListener("click", expandCollapse);

document.querySelector(".game-toggle").addEventListener("click", toggleGame);

document
  .querySelector("#game-board-size")
  .addEventListener("change", (event) => {
    setUpBoard(event.target.value);
  });
