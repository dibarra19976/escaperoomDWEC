function startColorCombination(game){
  if(!game.beaten){
    let difficulty = game.difficulty;
    const colors = ["blue", "purple", "green", "yellow", "orange", "pink", "red", "cyan"];
    const repeats = 5;
    let colorsQty = game.difficulty; // max 8
    const colorsMin = game.difficulty; // 8
    let correctSequences = 0;
    let elcrono ; //= setInterval(advance, 300);
    let availableColors;
    let speed = 1000;
    const minspeed = 1000;

    function turno(){
      availableColors = shuffleArray(colors).slice(0 , difficulty );
      let buttonsDiv = document.getElementById("colors").querySelector(".buttons");
      let str = " ";
      availableColors.forEach((e) => {
        console.log(e);
        str += `<button class="colorButton color-${e}" value="${e}"></button>`;
      });
      buttonsDiv.innerHTML = str;
    }

    function showColor(){
      let mainColor = document.getElementById("colors").querySelector(".mainColor");
      
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
    turno();
  }
  else{

  }
}