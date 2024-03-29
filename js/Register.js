const form = document.getElementById("form");
const user = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("passwordRepeat");

const popup = document.getElementById("popup");
const index = document.getElementById("index");
const logout = document.getElementById("logoutBtn");

let users;

//event listener par ver si el usuario ha iniciado sesion y mostrar y ocultar elementos

window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    form.classList.add("hidden");
    popup.classList.remove("hidden");
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
  checkLength(user, 3, 15);
  checkLength(password, 6, 25);
  checkLength(passwordRepeat, 6, 25);
  checkValidEmail(email);
  checkUniqueEmail(email);
  checkSamePassword(password, passwordRepeat);
  checkRequired([user, email, password, passwordRepeat]);

  register();
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

//mira que las dos contraseñas introducidas sea la misma
function checkSamePassword(input1, input2) {
  if (input1.value !== input2.value) {
    let missatge = `La segunda contraseña no es igual`;
    showError(input2, missatge);
  } else {
    showCorrect(input2);
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

//mira que el email no este en uso
function checkUniqueEmail(input) {
  getUserArray();
  if (users.hasOwnProperty(input.value.trim())) {
    showError(input, "El correo ya esta en uso");
  }
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

//funcion para actualizar los usuarios en localstorage
function updateUsers() {
  let json = JSON.stringify(users);
  localStorage.setItem("users", json);
}

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

//funcion para registrarse
function register() {
  //mira que no haya errores con un queryselectorall
  let errors = document.querySelectorAll(".error").length;
  if (errors === 0) {
    getUserArray();
    //se crea un objeto de usuario
    users[email.value] = {
      email: email.value,
      user: user.value,
      password: password.value,
      save: null,
    };
    //se actualizan los usuarios
    updateUsers();
    //se inicia sesion 
    localStorage.setItem("loggedUser", JSON.stringify(users[email.value]));
    window.location.href = "/Index.html";
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  location.reload();
});
