function startRiddle(game) {
  if (!game.beaten) {
    let json;
    let riddle;
    let difficulty = game.difficulty;
    loadDoc((response) => {
      json = JSON.parse(response);
      loadRiddle();
    }, "/json/riddles.json");

    function loadRiddle() {
      if (game.index === null) {
        getRandomRiddle(difficulty);
      }
      riddle = json[difficulty][game.index];
      console.log(riddle);
    }

    function getRandomRiddle(difficulty) {
        game.index = getRandom(0, json[difficulty].length);
    }
    
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
  } else {
    openEndedPopup();
  }
}

// Llamada a la funcion JSON
