let mutedSong = false;
let music = document.getElementById("music");

//CANCIONES
function mainMenu_Song() {
  music.setAttribute("src", "/sounds/background/mainmenu.mp3");
  music.loop = true;
  music.play();
  console.log(music);
}

function theme1_Song() {
  music.setAttribute("src", "/sounds/background/theme1.mp3");
  music.loop = true;
  music.play();
  console.log(music);
}

function theme2_Song() {
  music.setAttribute("src", "/sounds/background/theme2.mp3");
  music.loop = true;
  music.play();
  console.log(music);
}

function theme3_Song() {
  music.setAttribute("src", "/sounds/background/theme3.mp3");
  music.loop = true;
  music.play();
  console.log(music);
}
function mute_Song() {
  music.pause();
  music.currentTime = 0;
  mutedSong = true;
}

function pause_Song() {
  music.pause();
}

function resume_Song() {
  music.play();
  mutedSong = false;
}

//EFECTOS DE SONIDO
function secondBeep_Sound() {
  let secondBeep = new Audio("/sounds/Games/secondbeep.mp3");
  secondBeep.play();
}
function beep_Sound() {
  let beep = new Audio("/sounds/Games/beep.mp3");
  beep.play();
}
function correct_Sound() {
  let hitBeep = new Audio("/sounds/Games/hit-beep.mp3");
  hitBeep.play();
}
function wrong_Sound() {
  let miss = new Audio("/sounds/Games/miss.mp3");
  miss.play();
}
function finish_Sound() {
  let finish = new Audio("/sounds/Games/finish.mp3");
  finish.play();
}
function flip_Sound() {
  let flip = new Audio("/sounds/Games/flip.mp3");
  flip.play();
}
function button_Sound() {
  let button = new Audio("/sounds/Games/button.mp3");
  button.play();
}
function select_Sound() {
  let select = new Audio("/sounds/Ui/select.mp3");
  select.play();
}

function keydown_Sound() {
  let select = new Audio("/sounds/Ui/mech-keyboard-02-102918.mp3");
  select.play();
}

window.onfocus = function () {
  if (!mutedSong) {
    music.play();
  }
};

window.onblur = function () {
  music.pause();
};

const playing = `<i class="bi bi-volume-up-fill"></i>`;
const muted = `<i class="bi bi-volume-mute-fill"></i>`;
const muteButton = document.getElementById("mute");
muteButton.addEventListener("click", () => {
  muteButton.classList.toggle("muted");
  if (muteButton.classList.contains("muted")) {
    muteButton.innerHTML = muted;
    mute_Song();
  } else {
    muteButton.innerHTML = playing;
    resume_Song();
  }
});
