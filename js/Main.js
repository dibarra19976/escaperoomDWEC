//event listener par ver si el usuario ha iniciado sesion y mostrar y ocultar elementos
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
    //se mira si hay una partida guardada para mostrar el boton de continuar
    let save = JSON.parse(logged).save;
    if(save != null){
      document.getElementById("continue").classList.remove("closed");
      
    }
  }
};

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  location.reload();
});

//query selector para añadir el efecto de sonido a los botones del menu de inicio
document.querySelector(".menu").querySelectorAll("li").forEach((e) => {
  e.addEventListener("click", () => {
    select_Sound();
    e.classList.add("selected");
    setTimeout(()=>{
      e.classList.remove("selected");
    }, 200);
  });
})

//funcion para empezar una partida
function newGame(url){
  //se le añade un event listener a 2 botones que aparecen si:
  // hay una partida guardada ya
  // es anonimo

  document.querySelectorAll(".continue").forEach((e)=>{
    e.addEventListener("click", ()=>{newGameLoad(url)})
  });
  //se mira si el usuario ha iniciado sesion

  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    //se mira si hay una partda guardada
    let save = JSON.parse(logged).save;
    //si la hay se muestra un popup de advertencia
    if(save !== null){
      overwriteSavePopUp(url);
    }
    else{
      //si no hay se sigue
      newGameLoad(url);
    }
  }
  else{
    //si no hay nadie con una sesion abierta se muestra un popup avisando
    anonymousPopUp(url);
  }
}

function anonymousPopUp(url){
  let quit = document.getElementById("anonymousUser");
  quit.classList.remove("closed");
  quit.classList.add("fadeIn");
}

function anonymousPopUpHide(){
  let quit = document.getElementById("anonymousUser");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
  select_Sound();
}

function overwriteSavePopUp(url){
  let quit = document.getElementById("overwriteSave");
  quit.classList.remove("closed");
  quit.classList.add("fadeIn");
 
}

function overwriteSavePopUpHide(){
  let quit = document.getElementById("overwriteSave");
  quit.classList.add("closed");
  quit.classList.remove("fadeIn");
  select_Sound();
}

//funcion para iniciar la partida del todo
function newGameLoad(url){
  //se guarda la url del nivel
  localStorage.setItem("gameURL", url);
  let logged = localStorage.getItem("loggedUser");
  // se mira que el usuario haya iniciado sesion
  if (logged !== null) {
    //se borra la partida anterior y se guarda
    let userLogged = JSON.parse(logged);
    userLogged.save = null;
    let allusers = JSON.parse(localStorage.getItem("users"));
    allusers[userLogged.email] = userLogged;
    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("loggedUser", JSON.stringify(userLogged));
  }
  //se va a la pagina de juego
  setTimeout(()=>{  location.href = "/html/Game.html";},700);
}

//funcion para continuar
function continueGame(){
  //se va a la pagina de juego
  setTimeout(()=>{  location.href = "/html/Game.html";},700);
  //la url ya esta de por si en la partida guardada del usuario, se cargaria todo solo
}

mainMenu_Song();
