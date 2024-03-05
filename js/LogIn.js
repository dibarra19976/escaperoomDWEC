const email = document.getElementById("email");
const password = document.getElementById("password");

const popup = document.getElementById("popup");
const index = document.getElementById("index");
const logout = document.getElementById("logoutBtn");

let users;

//EVENT LISTENERS

//event listener par ver si el usuario ha iniciado sesion y mostrar y ocultar elementos
window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    form.classList.add("hidden");
    popup.classList.remove("hidden");
    let logedout = document.querySelectorAll(".logedout");
    let logedin = document.querySelectorAll(".logedin");
    logedout.forEach((e) => { e.classList.add("closed")});
    logedin.forEach((e) => { e.classList.remove("closed")});
  }
};

index.addEventListener("click", (e) => {
  window.location.href = "/Index.html";
});

logout.addEventListener("click", (e) => {
  localStorage.removeItem("loggedUser");
  location.reload();
});

//event listener del form para hacer las comprobaciones necesarias
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLength(password, 6, 25);  
  checkValidEmail(email);
  checkRequired([email, password]);

  logIn();
});

//FUNCIONES DE COMPROBACION
//mira que los elementos del array que se le pase no esten vacios
function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `Es obligatorio`);
    }
  });
}

//mira que el elemento cumpla el minimo y maximo
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `Tiene que tener un minimo de ${min} caracteres`);
  } else if (input.value.trim().length > max) {
    showError(input, `Tiene que tener menos de ${max} caracteres`);
  } else {
    showCorrect(input);
  }
}

//comprueba con una expresion regular que el email sea valido
function checkValidEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showCorrect(input);
  } else {
    let missatge = `No es un correo electronico valido`;
    showError(input, missatge);
  }
}

//mira que el email sea de un usuario real
function emailExists(input) {
  getUserArray();
  return (users.hasOwnProperty(input.value.trim()));
  
}

//FUNCIONES PARA MOSTRAR INFORMACION
//funcion para mostrar un error en un input
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerHTML = ` ${message}`;
}
//funcion para mostrar que el input es correcto
function showCorrect(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control correct";
}


//FUNCIONES PARA EL MANEJO DE USUARIOS

//funcion para cargar los uuarios 
function getUserArray() {
  let json = localStorage.getItem("users");
  //si no hay objeto en localstorage se crea el objeto
  if (json === null || json === "") {
    localStorage.setItem("users", "{}");
    json = localStorage.getItem("users");
  }
  users = JSON.parse(json);
}

//Funcion para Iniciar Sesion
function logIn() {
  //mira que no haya errores con un queryselectorall
  let errors = document.querySelectorAll(".error").length;
  let bottom = document.getElementById("bottom");
  if (errors === 0) {
    getUserArray();
    //si el email existe y la contraseña es correcta
    if (emailExists(email) && users[email.value.trim()]["password"] === password.value.trim() ) {
      bottom.className = " hidden";
      //inicia sesion y guarda la informacion del usuario en localstorage en otro item
      localStorage.setItem("loggedUser", JSON.stringify(users[email.value]));
      window.location.href = "/Index.html";
    }
    else{
      bottom.className = " ";
      showError(email, "");
      showError(password, "");  
    }
  }
}

document.getElementById("logout").addEventListener("click", () => {   localStorage.removeItem("loggedUser");
location.reload(); });