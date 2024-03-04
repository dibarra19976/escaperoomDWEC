let rankings = {};
let newScore = {};
let gameURL = "";

function addToRanking() {
  if (localStorage.getItem("addToRanking") === "true") {
    let ranking = localStorage.getItem("rankings");
    if (ranking == null) {
      localStorage.setItem("rankings", "{}");
      ranking = localStorage.getItem("rankings");
    }
    rankings = JSON.parse(ranking);
    gameURL = localStorage.getItem("gameURL");
    if (!rankings.hasOwnProperty(gameURL)) {
      rankings[gameURL] = [];
    }

    let userLogged = JSON.parse(localStorage.getItem("loggedUser"));

    newScore = {
      user: userLogged.user,
      score: userLogged.save.score,
      time: userLogged.save.time,
    };
    rankings[gameURL].push(newScore);

    userLogged.save = null;
    let allusers = JSON.parse(localStorage.getItem("users"));
    allusers[userLogged.email] = userLogged;

    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("loggedUser", JSON.stringify(userLogged));
    localStorage.setItem("rankings", JSON.stringify(rankings));
    localStorage.removeItem("addToRanking");
    console.log(rankings);
  }
}

function enseñarRankings() {
  gameURL = localStorage.getItem("gameURL");
  let table = document.getElementById("table");
  let num = 1;
  let ranking = localStorage.getItem("rankings");
  rankings = JSON.parse(ranking);
  rankings[gameURL].sort(compareObjects);
  rankings[gameURL].forEach((element) => {
    if (element.time.hours < 10) {
      element.time.hours = "0" + element.time.hours;
    }
    if (element.time.minutes < 10) {
      element.time.minutes = "0" + element.time.minutes;
    }
    if (element.time.seconds < 10) {
      element.time.seconds = "0" + element.time.seconds;
    }
    console.log(newScore);
    console.log(element);
    table.innerHTML += `
    <tr class="${(JSON.stringify(element) === JSON.stringify(newScore)) ? 'current' : ' '}">
    <td>${num}</td>
    <td>${element.user}</td>
    <td>${element.score}</td>
    <td>${element.time.hours}:${element.time.minutes}:${element.time.seconds}</td>
  </tr>`;
    num++;
    console.log(element);
  });
}

//comparar con stringify para sacara la puntuacoin actual
//ordenar
//añadir boton de vuelta al inicio
//añadir el codigo del navbar de inicio


function compareObjects(a, b) {
  // Primero, compara las puntuaciones
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    // Si las puntuaciones son iguales, compara los tiempos
    var aTime =
      parseInt(a.time.hours) * 3600 +
      parseInt(a.time.minutes) * 60 +
      a.time.seconds +
      a.time.milliseconds / 1000;
    var bTime =
      parseInt(b.time.hours) * 3600 +
      parseInt(b.time.minutes) * 60 +
      b.time.seconds +
      b.time.milliseconds / 1000;

    if (aTime < bTime) {
      return -1;
    } else if (aTime > bTime) {
      return 1;
    } else {
      return 0;
    }
  }
}

end_Song();
addToRanking();
enseñarRankings();
