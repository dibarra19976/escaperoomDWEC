function startMemory(game) {
  const cardsDiv = document.querySelector(".cards");
  if (!game.beaten) {
    closeEndedPopup();
    let attempts = 1;
    let timeout;
    const MIN = 4; //3
    const MAX = game.difficulty; //22
    const msg = document.getElementById("memory").querySelector(".message");

    let str = "";
    if (game.state == null) {
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

      game.state = str;
    } else {
      str = game.state;
    }
    cardsDiv.innerHTML = str;

    const cards = document.querySelectorAll(".card");
    console.log(cards);

    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        flip_Sound();
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
                removeDisable(allCards);
              }, 600);
            }

            let guessedCards = document.querySelectorAll(".card-guessed");
            if (guessedCards.length === allCards.length) {
              finish_Sound();
              showText("Has adivinado todas las parejas!", msg);
              setBeaten(game.id);
              calculateScore(attempts);
            } else {
              correct_Sound();
              showText("Has adivinado correctamente una pareja!", msg);
            }
          } else {
            for (let i = 0; i < flippedCards.length; i++) {
              showText("No has adivinado nuinguna pareja", msg);
              setTimeout(function () {
                wrong_Sound();
                flippedCards[i].classList.remove("card-flipped");
                removeDisable(allCards);
                attempts++;
              }, 600);
            }
          }
        }
        game.state = cardsDiv.innerHTML;
      });
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
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        element.classList.add("hide");
      }, 2000);
    }
  } else {
    cardsDiv.innerHTML = "";
    openEndedPopup();
  }
}

// startMemory(10);
