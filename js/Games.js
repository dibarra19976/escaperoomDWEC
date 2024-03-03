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

let gamesObj = {
  1: {
    id: 1,
    type: "memory",
    difficulty: 5,
    beaten: false,
    state: null,
  },
  2: {
    id: 2,
    type: "timing",
    difficulty: 4,
    beaten: false,
  },
  3: {
    id: 3,
    type: "colors",
    beaten: false,
    difficulty: 1,
  },
  4: {
    id: 4,
    type: "riddle",
    beaten: false,
    difficulty: 4,
    hintUsed: false,
    index: null,
  },
};

function goBack() {
  currentGame = null;
  pause();
  popup.classList.add("closed");
  popupOpen = false;
}

function openMinigame(id) {
  blurButtons();
  if (gamesObj.hasOwnProperty(id)) {
    closeAllGames();
    openPopup();
    let game = gamesObj[id];
    let type = game.type;
    currentGame = id;
    switch (type) {
      case "memory":
        memory.classList.remove("closed");
        startMemory(game);
        break;
      case "timing":
        timing.classList.remove("closed");
        startTiming(game);
        break;
      case "colors":
        colors.classList.remove("closed");
        startColorCombination(game);
        break;
      case "riddle":
        riddle.classList.remove("closed");
        startRiddle(game);
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

function closeEndedPopup() {
  let ended = document.getElementById("ended");
  ended.classList.add("closed");
}

function disableBack() {
  document.getElementById("backButton").disabled = true;
}

function enableBack() {
  setTimeout(() => {
    document.getElementById("backButton").disabled = false;
  }, 600);
}

function quitPopUp() {
  select_Sound();
  pause_Song();
  let quit = document.getElementById("quitPopUp");
  quit.classList.remove("closed");
  quit.classList.add("fadeIn");
}

function quitPopUpHide() {
  if (!mutedSong) {
    resume_Song();
  }
  let quit = document.getElementById("quitPopUp");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
}

function hintPopUp() {
 if(currentGame != null){
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
        let riddle = json[gamesObj[currentGame].difficulty][gamesObj[currentGame].index];
        text.innerText = riddle.hint;
        if(!gamesObj[currentGame].hintUsed){
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

function hintPopUpHide() {
  let quit = document.getElementById("hintPopUp");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
}

function updateScore(num){
  let scoreElement = document.getElementById("score").querySelector("span");
  score += num;
  scoreElement.innerText = score;
}
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
