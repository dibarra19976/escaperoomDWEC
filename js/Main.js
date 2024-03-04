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

document.querySelector(".menu").querySelectorAll("li").forEach((e) => {
  e.addEventListener("click", () => {
    select_Sound();
    e.classList.add("selected");
    setTimeout(()=>{
      e.classList.remove("selected");
    }, 200);
  });
})

function newGame(url){
  document.querySelectorAll(".continue").forEach((e)=>{
    e.addEventListener("click", ()=>{newGameLoad(url)})
  });
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let save = JSON.parse(logged).save;
    console.log(save);
    if(save !== null){
      overwriteSavePopUp(url);
    }
    else{
      newGameLoad(url);
    }
  }
  else{
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
}

function newGameLoad(url){
  localStorage.setItem("gameURL", url);
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let userLogged = JSON.parse(logged);
    userLogged.save = null;
    let allusers = JSON.parse(localStorage.getItem("users"));
    allusers[userLogged.email] = userLogged;
    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("loggedUser", JSON.stringify(userLogged));
  }
  location.href = "/html/Game.html";
}

function continueGame(){
  location.href = "/html/Game.html";
}

mainMenu_Song();
