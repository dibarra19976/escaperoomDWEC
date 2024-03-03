let popupOpen = false;
let currentGame = null;
let timer;
let score = 0;
// ELEMENTOS
const popup = document.getElementById("games");
let timing = document.getElementById("timing");
let memory = document.getElementById("memory");
let colors = document.getElementById("colors");
let riddle = document.getElementById("riddle");
let descriptionText = document.getElementById("descriptionText");

let gamesObj = [
  {
    id: 0,
    type: "memory",
    difficulty: 5,
    beaten: false,
    state: null,
  },
  {
    id: 1,
    type: "timing",
    difficulty: 4,
    beaten: false,
  },
  {
    id: 2,
    type: "colors",
    beaten: false,
    difficulty: 1,
  },
  {
    id: 3,
    type: "riddle",
    beaten: false,
    difficulty: 4,
    hintUsed: false,
    index: null,
  },
  {
    id: 4,
    type: "text",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quia placeat sint, necessitatibus, a repellat ducimus perspiciatis rerum sunt impedit corrupti qui praesentium! Doloremque modi ad quae animi ipsa expedita!",
    beaten: false,
  },
];

function goBack() {
  currentGame = null;
  pause();
  popup.classList.add("closed");
  popupOpen = false;
}

function openMinigame(id) {
  blurButtons();
  if (gamesObj.length > id && 0 <= id) {
    closeAllGames();
    openPopup();
    let game = gamesObj[id];
    let type = game.type;
    currentGame = id;
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

function closeAllGames() {
  let elements = document.querySelectorAll(".minigame");
  elements.forEach((element) => {
    element.classList.add("closed");
  });
}

function setBeaten(id) {
  if (gamesObj.hasOwnProperty(id)) {
    gamesObj[id].beaten = true;
    setTimeout(advanceFlag, 1500);
  } else {
    console.log("ERROR");
  }
}

function openPopup() {
  popup.classList.remove("closed");
  popupOpen = true;
}

function blurButtons() {
  let elements = document.querySelectorAll("button");
  elements.forEach((element) => {
    element.blur();
  });
}

document.addEventListener("keydown", function (objEvent) {
  if (objEvent.keyCode == 9) {
    //tab pressed
    objEvent.preventDefault(); // stops its action
  }
});

function openEndedPopup() {
  currentGame = null;
  let ended = document.getElementById("ended");
  ended.classList.remove("closed");
}

//FUNCION PARA CERRAR EL POPUP DE JUEGO FINALIZADO
function closeEndedPopup() {
  let ended = document.getElementById("ended");
  ended.classList.add("closed");
}

//FUNCION PARA DESHABILITAR LE BOTON DE VOLVER
function disableBack() {
  document.getElementById("backButton").disabled = true;
}

//FUNCION PARA HABILITAR EL BOTON DE VOLVER
function enableBack() {
  setTimeout(() => {
    document.getElementById("backButton").disabled = false;
  }, 600);
}

//FUNCION PARA MOSTRAR EL POPUP DE SALIR
function quitPopUp() {
  select_Sound();
  pause_Song();
  let quit = document.getElementById("quitPopUp");
  quit.classList.remove("closed");
  quit.classList.add("fadeIn");
}

//FUNCION PARA QUITAR EL POPUP DE SALIR
function quitPopUpHide() {
  if (!mutedSong) {
    resume_Song();
  }
  let quit = document.getElementById("quitPopUp");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
}

//FUNCION PARA MOSTRAR EL POPUP DE PISTAS Y SU INFORMACION
function hintPopUp() {
  select_Sound();
  if (currentGame != null) {
    let text = document.getElementById("hintPopUp").querySelector("p");
    type = gamesObj[currentGame].type;
    switch (type) {
      case "memory":
        break;
      case "timing":
        break;
      case "colors":
        break;
      case "riddle":
        loadDoc((response) => {
          let json = JSON.parse(response);
          let riddle =
            json[gamesObj[currentGame].difficulty][gamesObj[currentGame].index];
          text.innerText = riddle.hint;
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
  xhttp.open("GET", file, true);
  xhttp.send();
}

/*  CRONOMETRO  */

let chrono;
let mifecha = new Date();
let lahora = document.getElementById("timer");

mifecha.setHours(0, 0, 0, 0);

lahora.innerHTML = "00:00:00";

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

function loadTimeChrono(time) {
  mifecha.setHours(time.hours, time.minutes, time.seconds, time.milliseconds);
}

function startChrono() {
  chrono = setInterval(crono, 1000);
}

function stopChrono() {
  clearInterval(chrono);
}

/* PUNTUACIONES */

function calculateScore(attempts) {
  const puntajeMaximo = 1000;
  const penalizacionPorIntento = 50; // Cantidad de puntos que se restarán por cada intento adicional

  // Calcula la puntuación restando una penalización por cada intento adicional
  const puntajeFinal = puntajeMaximo - (attempts - 1) * penalizacionPorIntento;

  // Asegurarse de que el puntaje final no sea menor que 0
  updateScore(Math.max(puntajeFinal, 0));
}



function readText(game) {
  if (!game.beaten) {
    closeEndedPopup();
    descriptionText.querySelector("p").innerText = game.content;
    setBeaten(game.id);
    console.log(game);
  } else {
    openEndedPopup();
  }
}

function advanceFlag(){
  currentGame++;
  openMinigame(currentGame);
}

function loadLevel(file){
  openMinigame(0);
  loadDoc((response) => {
    let json = JSON.parse(response);
    gamesObj = json.games;
    eval(json.music);
    setBackground(json.background);
    
    currentGame = 0;

    openMinigame(currentGame);
    startChrono();
  }, file);
}

function setBackground(url){
  let bg = document.querySelector(".world").querySelector("img");
  bg.setAttribute("src", url);
}

function loadSave(){
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let userSpan = document.getElementById("player").querySelector("span");
    userSpan.innerText = JSON.parse(logged).user;
  }
}

function save(){
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let userSpan = document.getElementById("player").querySelector("span");
    userSpan.innerText = JSON.parse(logged).user;
  }
}