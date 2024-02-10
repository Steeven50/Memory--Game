const gameContainer = document.getElementById("game");
let flippedCard = null;
let canFlip = true;

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (!canFlip) return;

  const clickedCard = event.target;

  if (clickedCard === flippedCard || clickedCard.classList.contains('matched')) return;

  clickedCard.style.backgroundColor = clickedCard.classList[1];

  if (!flippedCard) {
    flippedCard = clickedCard;
  } else {
    if (flippedCard.classList[1] !== clickedCard.classList[1]) {
      canFlip = false;
      setTimeout(() => {
        flippedCard.style.backgroundColor = '';
        clickedCard.style.backgroundColor = '';
        flippedCard = null;
        canFlip = true;
      }, 1000);
    } else {
      flippedCard.classList.add('matched');
      clickedCard.classList.add('matched');
      flippedCard = null;
    }
  }
}

createDivsForColors(shuffledColors);
