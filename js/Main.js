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
const playing = `<i class="bi bi-volume-up-fill"></i>`;
const muted = `<i class="bi bi-volume-mute-fill"></i>`;
const muteButton = document.getElementById("mute");
muteButton.addEventListener("click", () => {
  muteButton.classList.toggle("muted");
  if(muteButton.classList.contains("muted")){
    muteButton.innerHTML = muted;
    mute_Song();
  }
  else{
    muteButton.innerHTML = playing;
    resume_Song();
  }
  
});

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



mainMenu_Song();
