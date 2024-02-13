function startMemory(max) {
  const MIN = 3; //3
  const MAX = max; //22
  const cardsDiv = document.querySelector(".cards");
  const msg = document.querySelector(".message");
  // With a function and the minimum and maximum constants we get a random number of pairs
  let pairs = getRandom(MIN, MAX);

  //We create a number array with a pair of each of the ids
  let num = new Array();
  for (let i = 1; i < pairs; i++) {
    num.push(i);
    num.push(i);
  }

  //We shuffle randomly the entire array
  //We use the sort function alongside the random function
  num = num.sort((a, b) => 0.5 - Math.random());


  //We create a variable for the elements
  let str = "";

  //We create the cards, going through the shuffled array we asign each element an id
  for (let i = 0; i < num.length; i++) {
    let number = num[i];
    str +=
      ' <div class="card "><div class="card-inner" id="' +
      number +
      '"><div class="back"><img src="/img/memory/back.png" alt="" /></div><div class="front"><img src="/img/memory/' +
      number +
      '.png" alt="" /></div></div></div>';
  }

  cardsDiv.innerHTML = str;

  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      let inner = this.querySelector(".card-inner");
      inner.classList.add("card-flipped");
      let flippedCards = cardsDiv.querySelectorAll(".card-flipped");
      if (flippedCards.length >= 2) {
        let allCards = document.querySelectorAll(".card");
        addDisable(allCards);

        let first = flippedCards[0].id;
        let second = flippedCards[1].id;
        if (first === second) {
          for (let i = 0; i < flippedCards.length; i++) {
            flippedCards[i].classList.add("card-guessed");
            flippedCards[i].classList.remove("card-flipped");
            setTimeout(function () {
              flippedCards[i].parentElement.classList.add("glow");
            }, 600);
          }

          let guessedCards = document.querySelectorAll(".card-guessed");
          if (guessedCards.length === allCards.length) {
            showText("You won!", msg);
          } else {
            showText("You guessed a pair correctly!", msg);
          }
        } else {
          for (let i = 0; i < flippedCards.length; i++) {
            showText("You guessed it wrong", msg);
            setTimeout(function () {
              flippedCards[i].classList.remove("card-flipped");
            }, 600);
            removeDisable(allCards);

          }
        }
      }
    });
  }
}

function addDisable(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].classList.add("disable");
  }

}

function removeDisable(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].classList.remove("disable");
  }
  
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showText(string, element) {
  element.textContent = string;
  element.classList.remove("hide");
  setTimeout(() => {
    element.classList.add("hide");
  }, 2000);
}
startMemory(10);
