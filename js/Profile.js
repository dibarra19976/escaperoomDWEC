const form = document.getElementById("form");
const user = document.getElementById("user");
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("passwordRepeat");

const logout = document.getElementById("logout");

let users;
let currentUser;
//EVENT LISTENERS

//event listener par ver si el usuario ha iniciado sesion y mostrar y ocultar elementos
window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    let logedout = document.querySelectorAll(".logedout");
    let logedin = document.querySelectorAll(".logedin");
    logedout.forEach((e) => { e.classList.add("closed")});
    logedin.forEach((e) => { e.classList.remove("closed")});
    currentUser = JSON.parse(localStorage.getItem("loggedUser"));
    user.value = currentUser.user;
    password.value = currentUser.password;
    passwordRepeat.value = currentUser.password;
  } else {
    window.location.href = "/Index.html";
  }
};

logout.addEventListener("click", (e) => {
  localStorage.removeItem("loggedUser");
  location.reload();
});


//event listener del form para hacer las comprobaciones necesarias
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLength(user, 3, 15);
  checkLength(password, 6, 25);
  checkLength(passwordRepeat, 6, 25);
  checkSamePassword(password, passwordRepeat);
  checkRequired([user, password, passwordRepeat]);

  saveChanges();
});

//FUNCIONES DE COMPROBACION
function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `Es obligatorio`);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `Tiene que tener un minimo de ${min} caracteres`);
  } else if (input.value.trim().length > max) {
    showError(input, `Tiene que tener menos de ${max} caracteres`);
  } else {
    showCorrect(input);
  }
}

function checkSamePassword(input1, input2) {
  if (input1.value !== input2.value) {
    let missatge = `La segunda contraseña no es igual`;
    showError(input2, missatge);
  } else {
    showCorrect(input2);
  }
}

//FUNCIONES PARA MOSTRAR INFORMACION
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerHTML = ` ${message}`;
}

function showCorrect(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control correct";
}

//FUNCIONES PARA EL MANEJO DE USUARIOS

//funcion para actualizar el localstorage de usuarios
function updateUsers() {
  let json = JSON.stringify(users);
  localStorage.setItem("users", json);
}

function getUserArray() {
  let json = localStorage.getItem("users");
  if (json === null || json === "") {
    localStorage.setItem("users", "{}");
    json = localStorage.getItem("users");
  }
  users = JSON.parse(json);
}

//funcion para guardar los cambios 
function saveChanges() {
    //mira que no haya errores con un queryselectorall
let errors = document.querySelectorAll(".error").length;
  if (errors === 0) {
    getUserArray();
    users[currentUser.email] = {
      email: currentUser.email,
      user: user.value,
      password: password.value,
      save: currentUser.save
    };
    updateUsers();
    localStorage.setItem("loggedUser", JSON.stringify(users[currentUser.email]));
    window.location.href = "/Index.html";
  }
}

document.getElementById("logout").addEventListener("click", () => {   localStorage.removeItem("loggedUser");
location.reload(); });