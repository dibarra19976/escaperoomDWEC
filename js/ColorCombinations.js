//FUNCION PARA COMENZAR UNA INSTANCIA DEL JUEGO
function startColorCombination(game) {
  //comprueba que la instancia del juego no se haya pasado ya
  if (!game.beaten) {
    closeEndedPopup();
    let attempts = 1;
    let elcrono;
    const msg = document.getElementById("colors").querySelector(".message");
    let timeout;
    const colors = [
      "blue",
      "purple",
      "green",
      "yellow",
      "orange",
      "pink",
      "red",
      "cyan",
    ];
    const repeats = 3;
    let correctSequences = 0;
    const colorsMin = game.difficulty; // la dificultad son los colores disponibles para hacer combinaciones
    let colorsQty = game.difficulty;
    const minspeed = 1000;
    let speed = 1000;
    let id = game.id;
    //arrays
    let availableColors;
    let userColors = [];
    let colorSequence;
    let currentColor = 0;

    function turno() {
      //se quitan los botones
      removeButtons();
      currentColor = 0;
      //se randomiza el array de colores disponibles y se corta para conseguir el numero de colores necesarios
      availableColors = shuffleArray(colors).slice(0, colorsMin);
      userColors = new Array();
      colorSequence = new Array();
      //se genera la secuencia de colores
      for (let i = 0; i < colorsQty; i++) {
        colorSequence.push(
          availableColors[getRandom(0, availableColors.length - 1)]
        );
      }
      //se empieza un intervalo para ir mostrando los colores
      elcrono = setInterval(() => {
        showColor();
      }, speed);
      console.log(colorSequence);
    }

    function showColor() {
      showText("‎ ", msg);
      //se selecciona el elemento
      let mainColor = document
        .getElementById("colors")
        .querySelector(".mainColor");
      //se mira que los colores no se hayan terminado
      if (currentColor < colorsQty) {
        //Reproduce un sonido
        beep_Sound();
        //si NO es el primer color
        if (currentColor > 0) {
          //se quita el anterior
          mainColor.classList.remove(
            "color-" + colorSequence[currentColor - 1]
          );
          //si el anterior es igual al actual
          if (colorSequence[currentColor - 1] === colorSequence[currentColor]) {
            //se muestra una advertencia
            showText("!", msg);
          }
        }
        //se añade la clase de color y se aunemta el indice
        mainColor.classList.add("color-" + colorSequence[currentColor]);
        currentColor++;
      } // si ya no hay colores por mostrar
      else {
        //quita el color
        mainColor.classList.remove("color-" + colorSequence[currentColor - 1]);
        //muestra los botones
        addButtons();
        //quita el intervalo
        clearInterval(elcrono);
      }
    }

    //funcion para añadir los botones de colores
    function addButtons() {
      showText("Introduce la combinacion que acabas de ver", msg);
      let buttonsDiv = document
        .getElementById("colors")
        .querySelector(".buttons");
      let str = " ";
      //coge los colores dispobibles y crea un elemento con la clase correspondiente
      availableColors.forEach((e) => {
        str += `<button class="colorButton color-${e}" value="${e}"></button>`;
      });
      //se añaden los botones al elemento html
      buttonsDiv.innerHTML = str;
      buttonsDiv.querySelectorAll("button").forEach((e) => {
        e.addEventListener("click", btnPress);
      });
    }

    //funcion para quitar los botones
    function removeButtons() {
      let buttonsDiv = document
        .getElementById("colors")
        .querySelector(".buttons");
      let str = " ";
      buttonsDiv.innerHTML = str;
    }

    //funcion para procesrar un boton presionado
    function btnPress(element) {
      button_Sound();
      //mira que se puedan seguir añadiendo colores a la combinacion del usuario
      if (userColors.length < colorsQty) {
        //coge el valor y lo mete en el array de colores del uaurio
        userColors.push(element.target.value);
        //si ya hay suficientes comprueba la combinacion
        if (userColors.length == colorsQty) {
          checkCombinations();
        }
      }
    }

    //funcion para comprobar la combinacion
    function checkCombinations() {
      //comprueba que los dos arrays son iguales convirtiendolos en string
      if (JSON.stringify(userColors) == JSON.stringify(colorSequence)) {
        correctSequences++;
        //si las secuencias correctas son las necesarias para terminar
        if (correctSequences == repeats) {
          finish_Sound();
          //muestra un mensaje y se asigna como pasado el juego
          showText(`Has terminado!`, msg);
          setBeaten(id);
          calculateScore(attempts);
        } else {
          //si no se han hecho las suficcientes secuencias
          correct_Sound();
          //hace que tenga que salir un color mas
          colorsQty++;
          //aumenta la velocidad
          speed -= 175;
          showText(
            `Has adivnado la conmbinacion. Quedan ${
              repeats - correctSequences
            } combinaciones`,
            msg
          );
          //pasa al siguente turno
          turno();
        }
        //si no es correcto todo se reinicia
      } else {
        //añadimos intentos al contador
        attempts++;
        wrong_Sound();
        speed = minspeed;
        correctSequences = 0;
        colorsQty = colorsMin;
        showText(`Has fallado! `, msg);
        turno();
      }
      removeButtons();
    }

    //funcion para obtener un int aleatorio entre dos valores
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //funcion para mezclar el array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    //funcion para enseñar un mensaje por pantalla
    function showText(string, element) {
      element.textContent = string;
      element.classList.remove("hide");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        element.classList.add("hide");
      }, 2000);
    }

    turno();
  } else {
    openEndedPopup();
  }
}
