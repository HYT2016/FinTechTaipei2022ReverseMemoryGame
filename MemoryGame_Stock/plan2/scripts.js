const cards = document.querySelectorAll('.memory-card');
// 0826 add
const frontFaces = document.querySelectorAll('.front-face');;
const cardImages = ["chewbacca.jpg", "css-logo.png", "docker-logo.jpg", "emperor.jpg", "leia.jpg", "lfz-card.jpg", "luke.png", "padme.jpg", "php-logo.jpeg", "react-logo.png", "vader.jpg", "yoda.jpg"];
const selectCardImages = chooseN(cardImages, 6);
console.log(selectCardImages);

function decideFrontFaceImg() {
  for (let i=0; i<selectCardImages.length; ++i) {
    frontFaces[2*i].src = '../img/cards/' + selectCardImages[i];
    frontFaces[2*i+1].src = '../img/cards/'+ selectCardImages[i];
  }
}
// 0822 add
const modalElement = document.querySelector('.modal');
const playAgainElement = document.querySelector('.playAgain');
matches = 0;
maxMatches = 6;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');


  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  // 0822 add caculated the matches and show the win text
  matches += 1;
  if (matches === maxMatches) {
    modalElement.classList.remove("hidden");
    playAgainElement.classList.remove("hidden");
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function chooseN(item, n) {
  // Shuffle array
  const shuffled = item.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);
  return selected;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

(function startGame() {
  decideFrontFaceImg();
  shuffle();
})();

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', startCountDown));



var timer = 600;
var started = false;
var timeoutID = -1;

function countDown() {
    console.log(--timer);
    document.querySelector(".timer").innerHTML = timer;
    if (timer == 0) {
      clearInterval(timeoutID);
      modalElement.classList.remove("hidden");
      playAgainElement.classList.remove("hidden");
    }
}

function startCountDown() {
  if (!started) {
    started = true;
    timeoutID = setInterval(countDown, 1000);
  }
}

