let elcrono;
let TimingStarted = false;
let beep = new Audio("/sounds/Timing/beep.mp3");
let hitBeep = new Audio("/sounds/Timing/hit-beep.mp3");
let secondBeep = new Audio("/sounds/Timing/secondbeep.mp3");

function startTiming(pattern, id) {
  const gameElement = document.getElementById("gameElement");
  let count = 0;
  let hits = 0;
  let lastgreen = false;
  let hit = false;
  let repeats = 0;
  function advance() {
  }
  // switch patterns
  switch (pattern) {
    case 1:
      repeats = 3;
      advance = function () {
        count++;
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
        if (count == 3) {
          count = 0;
          green();
          clearInterval(elcrono);
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
        if (count == 3 ) {
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

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space") {
      checkHit();
    }
  };

  gameElement.onclick = function (e) {
    checkHit();
  };

  function green() {
    gameElement.classList.add("green");
    lastgreen = true;
    secondBeep.play();
  }

  function red() {
    gameElement.classList.add("red");
    beep.play();
    if (lastgreen == true && hit == false) {
      hits = 0;
    } else {
      hit = false;
      lastgreen = false;
    }
  }
  function removeColor() {
    gameElement.classList.remove("red");
    gameElement.classList.remove("green");
  }

  function checkHit() {
    if (gameElement.classList.contains("green") && !hit) {
      hitBeep.play();
      hits++;
      hit = true;
      console.log(hits);
      if (repeats == hits) {
        clearInterval(elcrono);
      }
    } else {
      hits = 0;
    }
  }
}

startTiming(3, 12);

function pause() {
  clearInterval(elcrono);
}
