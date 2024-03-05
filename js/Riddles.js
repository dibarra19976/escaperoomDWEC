let json = {};
loadDoc((response) => {
  json = JSON.parse(response);
}, "/json/riddles.json");

function startRiddle(game) {
  if (!game.beaten) {
    closeEndedPopup();
    let attempts = 1;
    let riddle = "";
    let difficulty = game.difficulty;
    let id = game.id;

    loadDoc((response) => {
      json = JSON.parse(response);
      loadRiddle();
    }, "/json/riddles.json");

    function loadRiddle() {
      if (game.index === null) {
        getRandomRiddle(difficulty);
      }
      riddle = json[difficulty][game.index];
      console.log(riddle.answer);
      showRiddle(riddle);
    }

    function showRiddle(riddle) {
      let riddleText = document
        .getElementById("riddle")
        .querySelector(".riddleText");
      let userGuess = document.getElementById("userGuess");
      let checkBtn = document.getElementById("riddle").querySelector("button");

      userGuess.addEventListener("keydown", (e) => {
        keydown_Sound();
        if (e.key == "Enter") {
          checkAnswer(riddle, e.target.value);
        }
      });

      checkBtn.addEventListener("click", () => {
        checkAnswer(riddle, userGuess.value);
      });

      riddleText.innerText = riddle.riddle;
    }

    function checkAnswer(riddle, answer) {
      if (riddle.answer.toLowerCase() === answer.toLowerCase()) {
        correct_Sound();
        if(!game.beaten){
          calculateScore(attempts);
        }
        setBeaten(id);
      }
      else{
        attempts++;
        wrong_Sound();
      }
    }

    function getRandomRiddle(difficulty) {
      game.index = getRandom(0, json[difficulty].length-1);
    }

    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  } else {
    openEndedPopup();
  }
}

// Llamada a la funcion JSON
