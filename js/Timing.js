//DEPENDENCIAS
//Games.js
//Sounds.js

let elcrono;
function startTiming(game) {
  closeEndedPopup();
  let timeout;
  let attempts = 1;
  let clear = game.beaten;
  let id = game.id;
  let pattern = game.difficulty; // la dificultad determina uno de 4 patrones
  const msg = document.getElementById("timing").querySelector(".message");

  //comprueba que la instancia del juego no se haya pasado ya
  if (!clear) {
    const gameElement = document.getElementById("gameElement");
    let count = 0;
    let hits = 0;
    let lastgreen = false;
    let hit = false;
    let repeats = 0;
    function advance() {}
    // switch patterns
    //cada patron determina una velocidad, repeticiones necesarias y mas
    //sobrescriben la funcion advance
    switch (pattern) {
      case 1:
        repeats = 3;
        advance = function () {
          count++;
          //si es la cuarta vez que avanza se muestra verde y se reinicia el contador
          if (count == 4) {
            green();
            count = 0;
          } else {
            red();
          }
          setTimeout(removeColor, 500);
        };
        elcrono = setInterval(advance, 700);
        break;
      case 2:
        repeats = 5;
        advance = function () {
          count++;
          //si es par se muestra verde
          if (count % 2 == 0) {
            green();
          } else {
            red();
          }
          setTimeout(removeColor, 300);
        };
        elcrono = setInterval(advance, 500);
        break;
      case 3:
        repeats = 6;
        advance = function () {
          count++;
          //si es la tercera vez que avanza se muestra verde y se reinicia el contador
          if (count == 3) {
            count = 0;
            green();
            clearInterval(elcrono);
            //tambien se para un tiempo de mas si aun no se ha terminado
            setTimeout(() => {
              if (hits != repeats) {
                elcrono = setInterval(advance, 400);
              }
            }, 300);
          } else {
            red();
          }
          setTimeout(removeColor, 250);
        };
        elcrono = setInterval(advance, 400);
        break;
      case 4:
        repeats = 7;
        advance = function () {
          count++;
          //a la tercera repeticion se pone verde 
          //a la caurta se pone rojo pero con un retraso
          if (count == 3) {
            green();
          } else {
            if (count == 4) {
              count = 0;
              clearInterval(elcrono);
              setTimeout(() => {
                if (hits != repeats) {
                  elcrono = setInterval(advance, 300);
                }
              }, 200);
            }
            red();
          }
          setTimeout(removeColor, 250);
        };
        elcrono = setInterval(advance, 300);
        break;
      default:
        break;
    }

    //event listener para que se pueda interactuar con el teclado
    document.body.onkeyup = function (e) {
      if (e.key == " " || e.code == "Space") {
        checkHit();
      }
    };

    //event listener on click
    gameElement.onclick = function (e) {
      checkHit();
    };

    //funcion para mostrar el color verde
    function green() {
      gameElement.classList.add("green");
      lastgreen = true;
      secondBeep_Sound();
    }

    //funcion para mostrar el color rojo
    function red() {
      gameElement.classList.add("red");
      beep_Sound();
      //si el ultimo fue verde y el usuario no le ha dado se reinicia las veces que le ha dado seguidas
      if (lastgreen == true && hit == false) {
        hits = 0;
      } else {
        //si si le ha dado o no fue verde el ultimo
        //se restablecen
        hit = false;
        lastgreen = false;
      }
    }
    
    //funcion para quitar los colores
    function removeColor() {
      gameElement.classList.remove("red");
      gameElement.classList.remove("green");
    }

    //funcion para comprobar si se le ha dado al elemento en el momento correcta
    function checkHit() {
      gameElement.classList.add("down");
      setTimeout(() => {
        gameElement.classList.remove("down");
      }, 100);
      //se mira si es verde y no le ha dado aun
      if (gameElement.classList.contains("green") && !hit) {
        hits++;
        hit = true;
        //si yale ha dado las veces necesarias acaba el juego
        if (repeats == hits) {
          finish_Sound();
          clearInterval(elcrono);
          showText("Has terminado!", msg);
          setBeaten(id);
          calculateScore(attempts);
        } else {
          //si le ha dado y aun tiene que darle mas muestra un mensaje por pantalla
          correct_Sound();
          showText(`Has acertado, queda darle ${repeats - hits} veces `, msg);
        }
        //si no le ha dado cuando toca se reinicia y suma un intento
      } else {
        wrong_Sound();
        showText("Has fallado", msg);
        hits = 0;
        attempts++;
      }
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
    openEndedPopup();
  }
}

//funcion para pausar el intervalo
function pause() {
  clearInterval(elcrono);
}
