let rankings = {};
let newScore = {};
let gameURL = "";

//evento para mostar y ocultar los elementos de la pagina necesarios en caso de que el usuario si haya iniciado sesion
window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let logedout = document.querySelectorAll(".logedout");
    let logedin = document.querySelectorAll(".logedin");
    logedout.forEach((e) => {
      e.classList.add("closed");
    });
    logedin.forEach((e) => {
      e.classList.remove("closed");
    });
    
  }
};


//funcion para añadir la ultima partida a los rankings
function addToRanking() {
  //si se ha indicado que la partida se añada al ranking
  if (localStorage.getItem("addToRanking") === "true") {
    //coge los rankings de localstorage
    let ranking = localStorage.getItem("rankings");
    //si es null se crea el objeto, se guarda y se pide otravez
    if (ranking == null) {
      localStorage.setItem("rankings", "{}");
      ranking = localStorage.getItem("rankings");
    }
    //se convierte en objeto
    rankings = JSON.parse(ranking);
    //se pide la url que indica que nivel se ha jugado
    gameURL = localStorage.getItem("gameURL");
    //si el objeto no tiene una lista de rankings de ese nivel se crea 
    if (!rankings.hasOwnProperty(gameURL)) {
      rankings[gameURL] = [];
    }
    //se coge la informacion de la partida
    let userLogged = JSON.parse(localStorage.getItem("loggedUser"));

    //se hace un objeto para almacenar la partida
    newScore = {
      user: userLogged.user,
      score: userLogged.save.score,
      time: userLogged.save.time,
    };
    //se guarda la partida
    rankings[gameURL].push(newScore);

    //se borra la partida y se guarda todo en localstorage
    userLogged.save = null;
    let allusers = JSON.parse(localStorage.getItem("users"));
    allusers[userLogged.email] = userLogged;

    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("loggedUser", JSON.stringify(userLogged));
    localStorage.setItem("rankings", JSON.stringify(rankings));
    localStorage.removeItem("addToRanking");
  }
}

//funcion para mostrar los rankings
function showRankings() {
  gameURL = localStorage.getItem("gameURL");
  let table = document.getElementById("table");
  let num = 1;
  let ranking = localStorage.getItem("rankings");
  let clase = "";
  rankings = JSON.parse(ranking);
  //con una funcion se organiza el array
  rankings[gameURL].sort(compareObjects);
  table.innerHTML = "";
  //con un foreach se muestran todos
  rankings[gameURL].forEach((element) => {
    //se mira si el objeto es igual a la ultima partida para añadirle una clase
    if ((JSON.stringify(element) === JSON.stringify(newScore))){
      clase = "current";
    }
    else{
      clase = "";
    }
    if (element.time.hours < 10) {
      element.time.hours = "0" + element.time.hours;
    }
    if (element.time.minutes < 10) {
      element.time.minutes = "0" + element.time.minutes;
    }
    if (element.time.seconds < 10) {
      element.time.seconds = "0" + element.time.seconds;
    }
    table.innerHTML += `
    <tr class="${clase}">
    <td>${num}</td>
    <td>${element.user}</td>
    <td>${element.score}</td>
    <td>${element.time.hours}:${element.time.minutes}:${element.time.seconds}</td>
  </tr>`;
    num++;
  });
  if(table.innerHTML == null){
    console.log("AYO");
  }

}

//añadir boton de vuelta al inicio
//añadir el codigo del navbar de inicio

//funcion para ordenar los objetos basandose en la puntuacion
function compareObjects(a, b) {
  // compara las puntuaciones
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    // si son iguales compara el tiempo
    let aTime =
      parseInt(a.time.hours) * 3600 +
      parseInt(a.time.minutes) * 60 +
      a.time.seconds +
      a.time.milliseconds / 1000;
    let bTime =
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
showRankings();

