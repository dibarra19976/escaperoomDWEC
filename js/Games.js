let popupOpen = false;
let currentGame;

// ELEMENTOS
const popup = document.getElementById("games");
let timing = document.getElementById("timing");
let memory = document.getElementById("memory");

let gamesObj = {
  1: {
    type: "memory",
    difficulty: 5,
    beaten: false,
    state: null,
    id: 1,
  },
  2: {
    id: 2,
    type: "timing",
    difficulty: 4,
    beaten: false,
  },
};

function goBack() {
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
    switch (type) {
      case "memory":
        memory.classList.remove("closed");
        startMemory(game);
        break;
      case "timing":
        timing.classList.remove("closed");
        startTiming(game);
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

function openPopup(){
  popup.classList.remove("closed");
  popupOpen = true;
}

function blurButtons(){
  let elements = document.querySelectorAll("button");
  elements.forEach((element) => {
    element.blur();
  });
}

document.addEventListener("keydown", function(objEvent) {
  if (objEvent.keyCode == 9) {  //tab pressed
      objEvent.preventDefault(); // stops its action
  }
})

function openEndedPopup() {
  let ended = document.getElementById("ended");
  ended.classList.remove("closed");
}

function disableBack() {
   document.getElementById("backButton").disabled = true; 
}

function enableBack() {

  setTimeout(() => {
    document.getElementById("backButton").disabled = false; 
  }, 600);

}