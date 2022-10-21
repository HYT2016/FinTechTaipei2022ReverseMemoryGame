const cards = document.querySelectorAll('.memory-card');
// 0826 add
const frontFaces = document.querySelectorAll('.front-face');
const backFaces = document.querySelectorAll('.back-face')
const cardImages = [
  "ESG_01.PNG"
  ,"ESG_02.PNG"
  ,"ESG_03.PNG"
  ,"ESG_04.PNG"
  ,"ESG_05.PNG"
];
const bgms = [
  "Action-Rock.mp3",
  "chael-sparks.mp3",
  "Feel-Good.mp3",
  "fm-freemusic-give-me-a-smile.mp3",
  "happy-clappy-ukulele.mp3",
  "keys-of-moon-cheer-up.mp3",
  "Luke-Bergs-Tropical-Soulmp3.mp3",
  "punch-deck-brazilian-street-fight.mp3",
  "Roa-Innocence.mp3",
  "roa-music-walk-around.mp3"
]
let bgmPlayingNow = null;

const selectCardImages = chooseN(cardImages, 5); //0905 6->5
console.log(selectCardImages);

var whichESGFile = String((Math.floor(Math.random()*72968)+1)%2);
function decideFrontFaceImg() {
  for (let i=1; i<selectCardImages.length; ++i) { //0905 0->1, i<s... => i<=
    frontFaces[2*i].src = './img/ESG' + whichESGFile + '/' + selectCardImages[i-1]; //0905 i->i-1
    frontFaces[2*i+1].src = './img/ESG' + whichESGFile + 'Ans/'+ selectCardImages[i-1];
    backFaces[2*i].src   = './img/mosquito/CardBackground.png';
    backFaces[2*i+1].src = './img/mosquito/CardBackground.4.png';
  }
  frontFaces[1].src  = './img/ESG' + whichESGFile + '/' + selectCardImages[selectCardImages.length-1];
  frontFaces[10].src = './img/ESG' + whichESGFile + 'Ans/' + selectCardImages[selectCardImages.length-1];
  backFaces[1].src   = './img/mosquito/CardBackground.png';
  backFaces[10].src = './img/mosquito/CardBackground.4.png';
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
  if (bgmPlayingNow == null) {
    bgmPlayingNow = new Audio('./bgm/' + chooseN(bgms, 1)[0]);
    bgmPlayingNow.currentTime = 0;
    bgmPlayingNow.volume = 0.3;
    bgmPlayingNow.play();
    bgmPlayingNow.loop = true;
  }
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
  playMatches();
  if (matches === maxMatches) {
    bgmPlayingNow.pause();
    passGame();
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
  // const shuffled = item.sort(() => 0.5 - Math.random());
  const shuffled = item.map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

  

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);
  return selected;
}

function shuffle() {
  /* origin order */
  // cards.forEach(card => {
  //   let randomPos = Math.floor(Math.random() * 16);
  //   console.log(randomPos);
  //   card.style.order = randomPos;
  // });
  /* 0905 new order */
  for (var card=1; card<cards.length-1; card++) {
    let randomPos = Math.floor(Math.random() * 12);
    cards[card].style.order = randomPos;
    console.log(randomPos);
  }
  cards[11].style.order = 1000;
}

(function startGame() {
  decideFrontFaceImg();
  shuffle();
})();

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', startCountDown));

// 0912 add
function playFlip() {
  var audio = new Audio('./sounds/flip.mp3');
  audio.currentTime = 0;
  audio.play();
}
function playMatches() {
  var audio = new Audio('./sounds/pianoB.mp3');
  audio.currentTime = 0;
  setTimeout(() => audio.play(), 300);
}
function passGame() {
  var audio = new Audio('./sounds/clapping_short.mp3');
  audio.currentTime = 0;
  audio.play();
}




cards.forEach(card => card.addEventListener('click', playFlip));
// 0912 add end


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

/*
// 0920 try to fetch local server data
(function() {
  fetch('http://127.0.0.1:5000/')
  .then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text);
  });
})();
*/

