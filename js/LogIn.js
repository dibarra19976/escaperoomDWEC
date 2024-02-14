const email = document.getElementById("email");
const password = document.getElementById("password");

const popup = document.getElementById("popup");
const index = document.getElementById("index");
const logout = document.getElementById("logout");

let users;

//EVENT LISTENERS

window.onload = (event) => {
  let logged = localStorage.getItem("loggedUser");
  if (logged !== null) {
    form.classList.add("hidden");
    popup.classList.remove("hidden");
  }
};

index.addEventListener("click", (e) => {
  window.location.href = "/Index.html";
});

logout.addEventListener("click", (e) => {
  localStorage.removeItem("loggedUser");
  location.reload();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLength(password, 6, 25);  
  checkValidEmail(email);
  checkRequired([email, password]);

  logIn();
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

function emailExists(input) {
  getUserArray();
  return (users.hasOwnProperty(input.value.trim()));
  
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

// function getInputName(input) {
//   return input.parentElement.querySelector("label").innerText;
// }

//FUNCIONES PARA EL MANEJO DE USUARIOS

function getUserArray() {
  let json = localStorage.getItem("users");
  if (json === null || json === "") {
    localStorage.setItem("users", "{}");
    json = localStorage.getItem("users");
  }
  users = JSON.parse(json);
}

//Funcion para Iniciar Sesion

function logIn() {
  let errors = document.querySelectorAll(".error").length;
  let bottom = document.getElementById("bottom");
  if (errors === 0) {
    getUserArray();
    if (emailExists(email) && users[email.value.trim()]["password"] === password.value.trim() ) {
      bottom.className = " hidden";
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
