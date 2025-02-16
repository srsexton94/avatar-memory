let images = [
  {
    file: "aang1.webp",
    alt: "Aang softly smiling looking at the sky",
  },
  {
    file: "aang2.jpg",
    alt: "Aang in disguise with Appa's fur on his head and face",
  },
  {
    file: "aang3.jpg",
    alt: "Aang with hair in a fire nation disguise",
  },
  {
    file: "appa1.webp",
    alt: "Appa flying in clear skies",
  },
  {
    file: "azula1.jpeg",
    alt: "Azula scowling and looking forward",
  },
  {
    file: "cabbages1.avif",
    alt: "A man in a green turban caressing a cabbage",
  },
  {
    file: "elements1.jpg",
    alt: "The air, water, fire, and earth logos",
  },
  {
    file: "flying1.webp",
    alt: "Two air benders flying with orange gliders",
  },
  {
    file: "gang1.jpg",
    alt: "A group shot of Katara, Toph, Sokka, and Aang in fire nation disguises",
  },
  {
    file: "gang2.webp",
    alt: "A group shot of Appa, Momo, Aang, Katara, Sokka, and Toph embracing",
  },
  {
    file: "gyatso1.webp",
    alt: "Gyatso, an airbender master, looking somberly forward",
  },
  {
    file: "hama1.webp",
    alt: "Hama, a disheveled water bender, looking menacingly forward",
  },
  {
    file: "iroh1.jpeg",
    alt: "Uncle Iroh playing a table top game with a steaming pot of tea",
  },
  {
    file: "iroh2.webp",
    alt: "Uncle Iroh smiling widely and brandishing a playing token",
  },
  {
    file: "iroh3.png",
    alt: "Uncle Iroh singing quietly beneath a tree with a memorial for his son",
  },
  {
    file: "jeongjeong1.webp",
    alt: "Jeong Jeong, a man with disheveled white hair and two face scars, scowling",
  },
  {
    file: "katara1.jpg",
    alt: "Katara in a wide fighting stance bending water all around",
  },
  {
    file: "katara2.webp",
    alt: "Katara in a fire nation disguise looking forward and smiling softly",
  },
  {
    file: "momo1.webp",
    alt: "Momo, a large eared furry creature, looking forward with wide eyes",
  },
  {
    file: "ozai1.webp",
    alt: "Ozai, a fire nation ruler, looking forward and scowling",
  },
  {
    file: "sokka1.webp",
    alt: "Sokka in a fire nation disguise smiling goofily and leaning in close",
  },
  {
    file: "sokka2.png",
    alt: "Sokka squatting in a low fighting stance, holding a boomerang",
  },
  {
    file: "toph1.jpg",
    alt: "Toph standing squarely with hands raised in a earth bending stance",
  },
  {
    file: "toph2.jpg",
    alt: "Toph holding a large championship belt over her head, looking off in the distance",
  },
  {
    file: "yue1.webp",
    alt: "Yue, a water tribe princess, looking lovingly forward",
  },
  {
    file: "zuko1.webp",
    alt: "Zuko, with shaggy ear-length hair, looking forward with a serious expression",
  },
  {
    file: "zuko2.webp",
    alt: "Zuko, with shaggy ear-length hair and a sword on his back, fire bending a flame",
  },
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
  } else {
    cardEl.style.height = "10vw";
    cardEl.style.width = "10vw";
  }

  for (let i = 0; i < numberOfCopies; i++) {
    const clonedCard = cardEl.cloneNode(true);
    clonedCard.style.backgroundImage = `url("assets/${imagePairs[i].file}")`;
    clonedCard.setAttribute("alt", imagePairs[i].alt);
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

setUpBoard();

document
  .querySelector(".expand-collapse")
  .addEventListener("click", expandCollapse);

document.querySelector(".game-toggle").addEventListener("click", toggleGame);

document
  .querySelector("#game-board-size")
  .addEventListener("change", (event) => {
    setUpBoard(event.target.value);
  });
