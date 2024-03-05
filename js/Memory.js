function startMemory(game) {
  const cardsDiv = document.querySelector(".cards");
  //comprueba que la instancia del juego no se haya pasado ya
  if (!game.beaten) {
    closeEndedPopup();
    let attempts = 1;
    let timeout;
    const MIN = game.difficulty - 3; //3
    const MAX = game.difficulty; //22
    const msg = document.getElementById("memory").querySelector(".message");

    let str = "";
    //si no hay nada guardado en el estado del juego
    if (game.state == null) {
      // se genera un numero de parejas alteatorios entre el minimo y maximo
      let pairs = getRandom(MIN, MAX);

      //sea crea un array de numeros para las cartas
      //se añaden dos veces el mismo numero para generar cada pareja
      let num = new Array();
      for (let i = 1; i < pairs; i++) {
        num.push(i);
        num.push(i);
      }

      //con la funcion sort mezclamos el array aleatoriamente
      num = num.sort((a, b) => 0.5 - Math.random());

      //creamos las cartas con un for
      for (let i = 0; i < num.length; i++) {
        let number = num[i];
        str +=
          ' <div class="card "><div class="card-inner" id="' +
          number +
          '"><div class="back"><img src="/img/memory/back.png" alt="" /></div><div class="front"><img src="/img/memory/' +
          number +
          '.png" alt="" /></div></div></div>';
      }
      //guardamos el estado en el elemento del juego
      game.state = str;
    } else {
      //si si lo hay en vez de generar los elementos lo cogemos del elemento del juego
      str = game.state;
    }
    //en el div de cartas añadimos el string con los elementos
    cardsDiv.innerHTML = str;

    const cards = document.querySelectorAll(".card");

    //añadimos un event listener a todas las cartas
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        flip_Sound();
        //añadimos una clase que gira la carta 
        let inner = this.querySelector(".card-inner");
        inner.classList.add("card-flipped");
        let flippedCards = cardsDiv.querySelectorAll(".card-flipped");
        //si hay dos cartas giradas
        if (flippedCards.length >= 2) {
          //seleccionamos las cartas y las deshabilitamos para evitar errores
          let allCards = document.querySelectorAll(".card");
          addDisable(allCards);
          //cogemos las ids de las dos cartas y las comparamos
          let first = flippedCards[0].id;
          let second = flippedCards[1].id;
          //si son iguales
          if (first === second) {
            //les quitamos la clase de giradas y le añadimos una que las deshabilita y las muestra como adivinadas
            for (let i = 0; i < flippedCards.length; i++) {
              flippedCards[i].classList.add("card-guessed");
              flippedCards[i].classList.remove("card-flipped");
              setTimeout(function () {
                flippedCards[i].parentElement.classList.add("glow");
                //habilitamos las cartas de nuevo
                removeDisable(allCards);
              }, 600);
            }
            //cogemos todas las cartas que han sido adivinadas y comprobamos si todas lo estan
            let guessedCards = document.querySelectorAll(".card-guessed");
            if (guessedCards.length === allCards.length) {
              //si todas han sido adivinadas acabamos el juego
              finish_Sound();
              showText("Has adivinado todas las parejas!", msg);
              setBeaten(game.id);
              calculateScore(attempts);
            } else {
              //si no han sido adivinadas todas mostramos un mensaje y continamos la partida
              correct_Sound();
              showText("Has adivinado correctamente una pareja!", msg);
            }
          } else {
            //si no eran iguales le quitamos la clase de girada y mostramos un mensaje por pantalla
            for (let i = 0; i < flippedCards.length; i++) {
              showText("No has adivinado ninguna pareja", msg);
              setTimeout(function () {
                wrong_Sound();
                flippedCards[i].classList.remove("card-flipped");
                removeDisable(allCards);
                //añadimos intentos al contador
                attempts++;
              }, 600);
            }
          }
        }
        game.state = cardsDiv.innerHTML;
      });
    }

    //funcion para deshabilitar las cartas
    function addDisable(array) {
      for (let i = 0; i < array.length; i++) {
        array[i].classList.add("disable");
      }
    }
//funcion para habilitar las cartas
    function removeDisable(array) {
      for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("disable");
      }
    }

    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //funcion para mostrar texto
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
