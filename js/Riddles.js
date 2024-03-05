let json = {};
loadDoc((response) => {
  json = JSON.parse(response);
}, "/json/riddles.json");

//funcion para empezar el minijuego
function startRiddle(game) {
  //comprueba que el juego no haya sido pasado ya
  if (!game.beaten) {
    document.getElementById("userGuess").value = "";
    closeEndedPopup();
    let attempts = 1;
    let riddle = "";
    let difficulty = game.difficulty;
    let id = game.id;

    //se carga el json por si no se habia cargado al inicio 
    loadDoc((response) => {
      json = JSON.parse(response);
      loadRiddle();
    }, "/json/riddles.json");

    //funcion para cargar la adivinanza
    function loadRiddle() {
      //si el elemento de juego no tiene ningun indice de adivinanza
      if (game.index === null) {
        //obtiene uno aleatorio de la dificultad indicada
        getRandomRiddle(difficulty);
      }
      //guardamos la adivinanza en una variable
      riddle = json[difficulty][game.index];
      console.log(riddle.answer);
      //la mostramos por pantalla
      showRiddle(riddle);
    }

    //funcion para mostrar la adivinanza
    function showRiddle(riddle) {
      let riddleText = document
        .getElementById("riddle")
        .querySelector(".riddleText");
      let userGuess = document.getElementById("userGuess");
      let checkBtn = document.getElementById("riddle").querySelector("button");

      //Añadimos un event listener para comprobar la palabra introducida por el usuario y añadir un sonido al escribir
      userGuess.addEventListener("keydown", (e) => {
        keydown_Sound();
        if (e.key == "Enter") {
          checkAnswer(riddle, e.target.value);
        }
      });

      //añadimos otro event listener para lo mismo pero con un boton
      checkBtn.addEventListener("click", () => {
        select_Sound();
        checkAnswer(riddle, userGuess.value);
      });

      //mostramos por pantalla la adivinanza
      riddleText.innerText = riddle.riddle;
    }

    //funcion para comp¡robar la respuesta
    function checkAnswer(riddle, answer) {
      //si es la misma
      if (riddle.answer.toLowerCase() === answer.toLowerCase().trim()) {
        correct_Sound();
        //miramos que no se haya pasado ya (para evitar que la puntuacion se calcule dos veces)
        if(!game.beaten){
          calculateScore(attempts);
        }
        //lo ponemos como pasado
        setBeaten(id);
      }
      //si no ha sido adivinado
      else{
        //aumentan los intentos
        attempts++;
        wrong_Sound();
      }
    }

    //funcion para obtener una adivinanza aleatoria
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
