let elcrono;
let TimingStarted = false;
let beep = new Audio("/sounds/Timing/beep.mp3");
let hitBeep = new Audio("/sounds/Timing/hit-beep.mp3");
let secondBeep = new Audio("/sounds/Timing/secondbeep.mp3");

function startTiming(pattern, id)  {
  const gameElement = document.getElementById("gameElement");
  let count = 0;
  let hits = 0;
  let lastgreen = false;
  let hit = false;
// switch patterns
  const repeats = 3;
  elcrono = setInterval(advance, 700);

  function advance() {
    count++;
    if (count == 4) {
      count = 0;
      gameElement.classList.add("green");
      lastgreen = true;
      secondBeep.play();
    } else {
      gameElement.classList.add("red");
      beep.play();
      if (lastgreen == true && hit == false) {
        hits = 0;
      } else {
        hit = false;
        lastgreen = false;
      }
    }
    setTimeout(removeColor, 500);
  }

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space") {
      checkHit();
    }
  };

  gameElement.onclick = function (e) {
    checkHit();
  };

  function removeColor() {
    gameElement.classList.remove("red");
    gameElement.classList.remove("green");
  }

  function checkHit() {
    if (gameElement.classList.contains("green") && !hit) {
      hitBeep.play();
      hits++;
      hit = true;
      if (repeats == hits) {
        clearInterval(elcrono);
      }
      console.log(hits);
    } else {
      hits = 0;
    }
  }
}

startTiming(1);

function pause() {
  clearInterval(elcrono);
}

