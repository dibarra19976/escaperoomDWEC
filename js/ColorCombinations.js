function startColorCombination(game) {
  if (!game.beaten) {
    closeEndedPopup();
    let attempts = 1;
    let elcrono; //= setInterval(advance, 300);
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
    const colorsMin = game.difficulty; // 8
    let colorsQty = game.difficulty; // max 8
    const minspeed = 1000;
    let speed = 1000;
    let id = game.id;
    //arrays
    let availableColors;
    let userColors = [];
    let colorSequence;
    let currentColor = 0;

    function turno() {
      removeButtons();
      currentColor = 0;
      availableColors = shuffleArray(colors).slice(0, colorsMin);
      userColors = new Array();
      colorSequence = new Array();
      for (let i = 0; i < colorsQty; i++) {
        colorSequence.push(
          availableColors[getRandom(0, availableColors.length - 1)]
        );
      }
      elcrono = setInterval(() => {
        showColor();
      }, speed);
      // console.log(getRandom(0,availableColors.length));
      console.log(colorSequence);
      // console.log(availableColors[getRandom(0,availableColors.length-1)]);
    }

    function btnPress(element) {
      button_Sound();
      if (userColors.length < colorsQty) {
        userColors.push(element.target.value);
        if (userColors.length == colorsQty) {
          checkCombinations();
        }
      }
    }

    function checkCombinations() {
      if (JSON.stringify(userColors) == JSON.stringify(colorSequence)) {
        correctSequences++;
        if (correctSequences == repeats) {
          finish_Sound();
          showText(`Has terminado!`, msg);
          setBeaten(id);
          calculateScore(attempts);
        } else {
          correct_Sound();
          colorsQty++;
          speed -= 175;
          showText(
            `Has adivnado la conmbinacion. Quedan ${
              repeats - correctSequences
            } combinaciones`,
            msg
          );
          turno();
        }
      } else {
        attempts++;
        wrong_Sound();
        speed = minspeed;
        correctSequences = 0;
        colorsQty = colorsMin;
        showText(`Has has fallado! `, msg);
        turno();
      }
      removeButtons();
    }

    function showColor() {
      showText("‎ ", msg);
      let mainColor = document
        .getElementById("colors")
        .querySelector(".mainColor");
      if (currentColor < colorsQty) {
        beep_Sound();
        // mainColor.classList.remove(".color-")
        if (currentColor > 0) {
          mainColor.classList.remove(
            "color-" + colorSequence[currentColor - 1]
          );
          if(colorSequence[currentColor - 1] === colorSequence[currentColor]){
            showText("!", msg);
          }
        }
        mainColor.classList.add("color-" + colorSequence[currentColor]);
        currentColor++;
       
        //ARREGLAR TIMEOUT
      } else {
        mainColor.classList.remove("color-" + colorSequence[currentColor - 1]);
        addButtons();
        clearInterval(elcrono);
        enableBack();
      }
    }

    function addButtons() {
      let buttonsDiv = document
        .getElementById("colors")
        .querySelector(".buttons");
      let str = " ";
      availableColors.forEach((e) => {
        str += `<button class="colorButton color-${e}" value="${e}"></button>`;
      });
      buttonsDiv.innerHTML = str;
      buttonsDiv.querySelectorAll("button").forEach((e) => {
        e.addEventListener("click", btnPress);
      });
    }

    function removeButtons() {
      let buttonsDiv = document
        .getElementById("colors")
        .querySelector(".buttons");
      let str = " ";
      buttonsDiv.innerHTML = str;
    }

    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

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
