window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let logedout = document.querySelectorAll(".logedout");
    let logedin = document.querySelectorAll(".logedin");
    logedout.forEach((e) => { e.classList.add("closed")});
    logedin.forEach((e) => { e.classList.remove("closed")});
  }
};
document.getElementById("logout").addEventListener("click", () => {   localStorage.removeItem("loggedUser");
location.reload(); });