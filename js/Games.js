let popupOpen = false;
let currentGame = 0;
let timer;
let score = 0;
let globalUrl = "";
// ELEMENTOS
const popup = document.getElementById("games");
let timing = document.getElementById("timing");
let memory = document.getElementById("memory");
let colors = document.getElementById("colors");
let riddle = document.getElementById("riddle");
let descriptionText = document.getElementById("descriptionText");

let gamesObj = [];


//funcion para abrir el minijuego
function openMinigame(id) {
  //se deseleccionan todos los botones
  blurButtons();
  //si el id es in indice valudo del array de juegos
  if (gamesObj.hasOwnProperty(id)) {
    //se cierran todos los juegos
    closeAllGames();
    //se abre el popup si no esta abierto
    openPopup();
    let game = gamesObj[id];
    let type = game.type;
    currentGame = id;
    //se mira el tipo del juego
    //dependiendo del tipo se abre un div u otro junto a la funcion para empezar una instancia del juego
    switch (type) {
      case "memory":
        memory.classList.remove("closed");
        memory.classList.add("fadeIn");
        startMemory(game);
        break;
      case "timing":
        timing.classList.remove("closed");
        timing.classList.add("fadeIn");
        startTiming(game);
        break;
      case "colors":
        colors.classList.remove("closed");
        colors.classList.add("fadeIn");
        startColorCombination(game);
        break;
      case "riddle":
        riddle.classList.remove("closed");
        riddle.classList.add("fadeIn");
        startRiddle(game);
        break;
      case "text":
        descriptionText.classList.remove("closed");
        descriptionText.classList.add("fadeIn");
        readText(game);
        break;
    }
  } else {
    console.log("ERROR");
  }
}

//funcion para cerrar todos los divs de los juegos
function closeAllGames() {
  let elements = document.querySelectorAll(".minigame");
  elements.forEach((element) => {
    element.classList.add("closed");
  });
}

//funcion para que un juego establezca como terminado
function setBeaten(id) {
  //se mira si esta el el array
  if (gamesObj.hasOwnProperty(id)) {
    gamesObj[id].beaten = true;
    setTimeout(advanceFlag, 1500);
  } else {
    console.log("ERROR");
  }
}


//funcion para evitar que los jugadores puedan usar la tecla tab para seleccionar elementos
document.addEventListener("keydown", function (objEvent) {
  if (objEvent.keyCode == 9) {
    objEvent.preventDefault();
  }
});

//FUNCION PARA MOSTRAR EL POPUP DE SALIR
function quitPopUp() {
  select_Sound();
  pause_Song();
  let quit = document.getElementById("quitPopUp");
  quit.classList.remove("closed");
  quit.classList.add("fadeIn");
  stopChrono();
}

//FUNCION PARA QUITAR EL POPUP DE SALIR
function quitPopUpHide() {
  if (!mutedSong) {
    resume_Song();
  }
  let quit = document.getElementById("quitPopUp");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
  startChrono();
}

function exit() {
  save();
  location.href = "/";
}

//FUNCION PARA MOSTRAR EL POPUP DE PISTAS Y SU INFORMACION
function hintPopUp() {
  //hace el sonido de popup
  select_Sound();
  //si el juego actual es nulo (no hay) no hace nada
  if (currentGame != null) {
    let text = document.getElementById("hintPopUp").querySelector("p");
    type = gamesObj[currentGame].type;
    //dependiendo del tipo da un mensaje o otro
    switch (type) {
      case "memory":
        text.innerText = "Encuentra todas las parejas de cartas";
        break;
      case "timing":
        text.innerText =
          "Presiona el boton en el momento correcto. Hazlo varias veces seguidas.";
        break;
      case "colors":
        text.innerText =
          "Acierta la combinacion de colores mostrada por pantalla.";
        break;
        case "text":
        text.innerText =
          "¿Para que necesitarias ayuda para leer un texto?";
        break;
      case "riddle":
        //si el tipo de juego es una adivinanza 
        //carga el archivo de adivinanzas
        loadDoc((response) => {
          let json = JSON.parse(response);
          //coge la adivinanza
          let riddle =
            json[gamesObj[currentGame].difficulty][gamesObj[currentGame].index];
          text.innerText = riddle.hint;
          //si no ha sido usada la pista para la instancia de la adivinanza se resta 100 puntos y se marca como usada
          //esto es para solo penalizar la primera consulta
          if (!gamesObj[currentGame].hintUsed) {
            gamesObj[currentGame].hintUsed = true;
            updateScore(-100);
          }
        }, "/json/riddles.json");
        break;
    }
    let quit = document.getElementById("hintPopUp");
    quit.classList.remove("closed");
    quit.classList.add("fadeIn");
  }
}

//FUNCION PARA ESCONDER EL POPUP DE PISTAS
function hintPopUpHide() {
  let quit = document.getElementById("hintPopUp");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
}

//FUNCION PARA ACTUALIZAR LA PUNTUACION PASANDOLE UN NUMERO
function updateScore(num) {
  let scoreElement = document.getElementById("score").querySelector("span");
  score += num;
  scoreElement.innerText = score;
}

//FUNCION PARA CARGAR FICHEROS JSON O TXT MEDIANTE AJAX
function loadDoc(callback, file) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (callback && typeof callback === "function") {
      callback(this.responseText);
    }
  };

  xhttp.onerror = function () {
    console.error("Error al cargar el archivo:", file);
    // en caso de error lo vuelve intentar en 3 segundos
    setTimeout(function () {
      loadDoc(callback, file);
    }, 3000);
  };

  xhttp.open("GET", file, true);
  xhttp.send();
}

/*  CRONOMETRO  */

let chrono;
let mifecha = new Date();
let lahora = document.getElementById("timer");

mifecha.setHours(0, 0, 0, 0);

lahora.innerHTML = "00:00:00";

//funcion para actualizar el cronometro en pantalla
function crono() {
  let horas = mifecha.getHours();
  let minutos = mifecha.getMinutes();
  let segundos = mifecha.getSeconds();

  segundos += 1;

  if (segundos == 60) {
    segundos = 0;
    minutos += 1;
  }

  if (minutos == 60) {
    minutos = 0;
    horas += 1;
  }

  mifecha.setSeconds(segundos);
  mifecha.setMinutes(minutos);
  mifecha.setHours(horas);

  //para añadir un 0 delante si es necesario
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  lahora.innerHTML = horas + ":" + minutos + ":" + segundos;
}

//para cargar mediante un objeto un tiempo al cronometro
function loadTimeChrono(time) {
  mifecha.setHours(time.hours, time.minutes, time.seconds, time.milliseconds);
}

//para empezar el cronometro
function startChrono() {
  chrono = setInterval(crono, 1000);
}

//para parar el cronometro
function stopChrono() {
  clearInterval(chrono);
}

/* PUNTUACIONES */

//funcion para calcular puntuaciones en base a intentos
function calculateScore(attempts) {
  const maxScore = 1000;
  const punish = 50; // puntos restados por intento

  // calculo
  const finalScore = maxScore - (attempts - 1) * punish;

  //se actualiza la puntuacion
  updateScore(Math.max(finalScore, 0));
}

//funcion para mostrar un objeto tipo minijuego pero con texto
function readText(game) {
  if (!game.beaten) {
    closeEndedPopup();
    descriptionText.querySelector("p").innerText = game.content;
  } else {
    openEndedPopup();
  }
}

//funcion para avanzar de minijuego
function advanceFlag() {
  //se mira que el objecto actual sea un indice valido
  if (gamesObj.length - 1 > currentGame) {
    //se abre el siguente juego y se guarda
    currentGame++;
    openMinigame(currentGame);
    save();
    //si ya no hay minijuegos 
  } else {
    //se termina el nivel
    endGame();
  }
}

//funcion para empezar el nivel
function startLevel() {
  //se mira si esta el usuario con una sesion iniciada
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let user = JSON.parse(logged);
    //si el usuario no tiene ninguna partida guardada
    if (user.save == null) {
      //se coge la url del nivel
      globalUrl = localStorage.getItem("gameURL");
      //se carga el nivel
      loadLevel(globalUrl);
      //se muestra el nombre de usuario por pantalla
      let userSpan = document.getElementById("player").querySelector("span");
      userSpan.innerText = user.user;
      //se guarda la partida empezada
      save();
    } else {
      //si ya tiene una partida se carga
      loadSave();
    }
  } else {
    //si el usuario es aninimo se coge la url y se empieza
    globalUrl = localStorage.getItem("gameURL");
    loadLevel(globalUrl);
  }
}

//funcion para cargar un nivel
function loadLevel(file) {
  //se carga el archivo pasandole la url a la funcion de carga
  loadDoc((response) => {
    //por si acaso se vuelve a poner la url en localstorage
    localStorage.setItem("gameURL", file);
    let json = JSON.parse(response);
    gamesObj = json.games;
    //se ejecuta la funcion de la cancion especificada en el json
    eval(json.music);
    //se cambia el fondo
    setBackground(json.background);
    //se abre el minijuego actual (por defecto es el 0)
    openMinigame(currentGame);
    //se empieza el cronometro
    startChrono();
  }, file);
}

//funcion para establecer un fondo
function setBackground(url) {
  let bg = document.querySelector(".world").querySelector("img");
  bg.setAttribute("src", url);
}

//funcion para cargar una partida
function loadSave() {
  //se revisa que el usuario haya iniciado sesion
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let user = JSON.parse(logged);
    //se muestra el nombre
    let userSpan = document.getElementById("player").querySelector("span");
    userSpan.innerText = user.user;
    //se coge la url de nivel la partida guardada
    globalUrl = user.save.level;
    //se coge el minijuego actual de la partida guardada
    currentGame = user.save.currentFlag;
    //se carga el tiempo con la funcion
    loadTimeChrono(user.save.time);
    //se actualiza la puntuacion
    updateScore(user.save.score);
    //se carga el nivel 
    loadLevel(globalUrl);
  }
}

//funcion para guardar
function save() {
  //comprueba que el usuario haya iniciado sesion
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    // se crea el objeto de partida guardada con la informacion necesaria
    let save = {
      level: globalUrl,
      currentFlag: currentGame,
      time: {
        hours: mifecha.getHours(),
        minutes: mifecha.getMinutes(),
        seconds: mifecha.getSeconds(),
        milliseconds: mifecha.getMilliseconds(),
      },
      score: score,
    };
    //se guarda en el json de usuario logeado y de todos los uuarios de localstorage
    let userLogged = JSON.parse(logged);
    userLogged.save = save;
    let allusers = JSON.parse(localStorage.getItem("users"));
    allusers[userLogged.email] = userLogged;
    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("loggedUser", JSON.stringify(userLogged));
  }
}

//funcion para terminar partida
function endGame() {
  //se guarda la partida
  save();
  //se vuelve a guardar la url
  localStorage.setItem("gameURL", globalUrl);
  //si esta logeado se establece en localstorage un item para saber que se tiene que guardar la partida en el rankings (para evitar a los usuarios anonimos)
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    localStorage.setItem("addToRanking", "true");
  }
  location.href = "/html/EndScreen.html";
}

/* FUNCIONES DESCARTADAS */
/* Estas funciones iban a ser usadas en caso de usar un fondo con iteractivo con map, para poder manejar los minijuegos de mejor forma*/

//funcion para abrir el popup
function openPopup() {
  popup.classList.remove("closed");
  popupOpen = true;
}

//funcion que abre el popup que se muestra en caso de que un juego ya haya sido pasado
function openEndedPopup() {
  currentGame = null;
  let ended = document.getElementById("ended");
  ended.classList.remove("closed");
}

//funcion para cerrar el popup de que un juego ya ha sido pasado
function closeEndedPopup() {
  let ended = document.getElementById("ended");
  ended.classList.add("closed");
}

//funcion para deshabilitar el boton de volver
function disableBack() {
  document.getElementById("backButton").disabled = true;
}

//funcion para habilitar el boton de volver
function enableBack() {
  setTimeout(() => {
    document.getElementById("backButton").disabled = false;
  }, 600);
}

//funcion para desenfocar todos los botones
function blurButtons() {
  let elements = document.querySelectorAll("button");
  elements.forEach((element) => {
    element.blur();
  });
}

//funcion para ir hacia atras
function goBack() {
  //se indica que ningun juego esta siendo juagadp
  currentGame = null;
  //se quita el interval de timing si esta abierto
  pause();
  //cierra el popup
  popup.classList.add("closed");
  popupOpen = false;
}
